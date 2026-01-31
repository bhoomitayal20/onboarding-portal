
"use client";

import { logActivity } from "@/app/utils/activityLogger";
import useAuthGuard from "@/app/hooks/useAuthGuard";

import { useEffect, useState } from "react";
import Sidebar from "@/app/components/Sidebar";

type DocumentState = {
  aadhaar?: string;
  pan?: string;
  offerLetter?: string;
};

export default function DocumentsPage() {
  useAuthGuard(["candidate"]);
  const [documents, setDocuments] = useState<DocumentState>({});

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "candidate") {
      window.location.href = "/dashboard";
    }

    const candidateId = localStorage.getItem("candidateId");
if (!candidateId) return;

const stored = localStorage.getItem("documentsByCandidate");
if (stored) {
  const allDocs = JSON.parse(stored);
  setDocuments(allDocs[candidateId] || {});
}

  }, []);

  const handleUpload = (key: keyof DocumentState, file: File | null) => {
  if (!file) return;

  const candidateId = localStorage.getItem("candidateId");
  if (!candidateId) return;

  // 📄 Load existing documents
  const stored = localStorage.getItem("documentsByCandidate");
  const allDocs = stored ? JSON.parse(stored) : {};

  const updatedCandidateDocs = {
    ...allDocs[candidateId],
    [key]: file.name,
  };

  allDocs[candidateId] = updatedCandidateDocs;
  setDocuments(updatedCandidateDocs);

  localStorage.setItem(
    "documentsByCandidate",
    JSON.stringify(allDocs)
  );

  // 🧾 ACTIVITY LOG
  const logs = JSON.parse(
    localStorage.getItem("activityLogs") || "[]"
  );

  logs.unshift({
    id: Date.now(),
    role: "candidate",
    action: "document_uploaded",
    message: `Uploaded ${key.toUpperCase()}`,
    candidateId,
    time: new Date().toISOString(),
  });

  localStorage.setItem(
    "activityLogs",
    JSON.stringify(logs)
  );
};


  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-6">
          Upload Documents
        </h1>

        <div className="space-y-6 max-w-xl">
          {/* Aadhaar */}
          <DocumentUpload
            label="Aadhaar Card"
            fileName={documents.aadhaar}
            onUpload={(file) => handleUpload("aadhaar", file)}
          />

          {/* PAN */}
          <DocumentUpload
            label="PAN Card"
            fileName={documents.pan}
            onUpload={(file) => handleUpload("pan", file)}
          />

          {/* Offer Letter */}
          <DocumentUpload
            label="Offer Letter / Resume"
            fileName={documents.offerLetter}
            onUpload={(file) => handleUpload("offerLetter", file)}
          />
        </div>
      </main>
    </div>
  );
}

function DocumentUpload({
  label,
  fileName,
  onUpload,
}: {
  label: string;
  fileName?: string;
  onUpload: (file: File | null) => void;
}) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <p className="font-medium mb-2">{label}</p>

      {fileName ? (
        <p className="text-green-600 text-sm">
          Uploaded: {fileName}
        </p>
      ) : (
        <p className="text-gray-500 text-sm">Not uploaded</p>
      )}

      <input
        type="file"
        className="mt-3 text-sm"
        onChange={(e) => onUpload(e.target.files?.[0] || null)}
      />
    </div>
  );
}
