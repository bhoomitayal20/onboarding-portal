
"use client";

import useAuthGuard from "@/app/hooks/useAuthGuard";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Sidebar from "@/app/components/Sidebar";

type Candidate = {
  id: number;
  name: string;
  email: string;
  role: string;
  status: "Pending" | "Verified" | "Rejected";
};

type Documents = {
  aadhaar?: string;
  pan?: string;
  offerLetter?: string;
};
type Email = {
  id: string;
  subject: string;
  body: string;
  time: string;
  read: boolean;
};



export default function CandidateDetailsPage() {
  useAuthGuard(["recruiter"]);
  const { id } = useParams();

  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [documents, setDocuments] = useState<Documents>({});

  useEffect(() => {
    // Load candidate
    const storedCandidates = localStorage.getItem("candidates");
    if (storedCandidates) {
      const list: Candidate[] = JSON.parse(storedCandidates);
      const found = list.find(
        (c: Candidate) => c.id === Number(id)
      );
      setCandidate(found || null);
    }

    // Load documents
    const storedDocs = localStorage.getItem("documentsByCandidate");
    if (storedDocs) {
      const allDocs = JSON.parse(storedDocs);
      setDocuments(allDocs[id as string] || {});
    }
  }, [id]);

  if (!candidate) {
    return (
      <div className="p-8">
        <p>Loading...</p>
      </div>
    );
  }
const updateStatus = (status: "Verified" | "Rejected") => {
  if (!candidate) return;

  /* -------------------------
     1️⃣ Update candidate status
  ------------------------- */
  const storedCandidates = localStorage.getItem("candidates");
  if (!storedCandidates) return;

  const updatedCandidates: Candidate[] = JSON.parse(storedCandidates).map(
    (c: Candidate) =>
      c.id === candidate.id ? { ...c, status } : c
  );

  localStorage.setItem(
    "candidates",
    JSON.stringify(updatedCandidates)
  );

  setCandidate({ ...candidate, status });

  /* -------------------------
     2️⃣ Notifications
  ------------------------- */
  const notificationKey = `candidate_${candidate.id}`;
  const storedNotifications =
    localStorage.getItem("notificationsByUser");

  const notificationsByUser = storedNotifications
    ? JSON.parse(storedNotifications)
    : {};

  notificationsByUser[notificationKey] = [
    {
      id: Date.now(),
      message:
        status === "Verified"
          ? "Your profile has been approved 🎉"
          : "Your profile has been rejected ❌",
      read: false,
      time: new Date().toISOString(),
    },
    ...(notificationsByUser[notificationKey] || []),
  ];

  localStorage.setItem(
    "notificationsByUser",
    JSON.stringify(notificationsByUser)
  );

  /* -------------------------
     3️⃣ Emails
  ------------------------- */
  const storedEmails = localStorage.getItem("emailsByUser");
  const emailsByUser: Record<string, Email[]> = storedEmails
    ? JSON.parse(storedEmails)
    : {};

  const email: Email = {
    id: `${Date.now()}_${Math.random()}`,
    subject:
      status === "Verified"
        ? "Offer Confirmation"
        : "Application Status Update",
    body:
      status === "Verified"
        ? `Dear ${candidate.name},

Congratulations! 🎉

Your application has been approved. Our HR team will reach out shortly with onboarding steps and further details.

Best regards,
HR Team`
        : `Dear ${candidate.name},

Thank you for taking the time to apply.

After careful consideration, we regret to inform you that your application has not been approved at this stage.

We wish you all the best.

Best regards,
HR Team`,
    time: new Date().toISOString(),
    read: false,
  };

  emailsByUser[notificationKey] = [
    email,
    ...(emailsByUser[notificationKey] || []),
  ];

  localStorage.setItem(
    "emailsByUser",
    JSON.stringify(emailsByUser)
  );

  /* -------------------------
     4️⃣ Activity Logs
  ------------------------- */
  const storedLogs = localStorage.getItem("activityLogs");
  const activityLogs = storedLogs
    ? JSON.parse(storedLogs)
    : [];

  activityLogs.unshift({
    id: Date.now(),
    message:
      status === "Verified"
        ? `Recruiter approved ${candidate.name}`
        : `Recruiter rejected ${candidate.name}`,
    role: "recruiter",
    time: new Date().toISOString(),
  });

  localStorage.setItem(
    "activityLogs",
    JSON.stringify(activityLogs)
  );
};


  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <main className="flex-1 p-8">
        <div className="bg-white p-8 rounded-xl shadow-sm max-w-xl">
          <h1 className="text-2xl font-bold mb-2">
            {candidate.name}
          </h1>

          <p className="text-gray-600">{candidate.email}</p>
          <p className="text-gray-600">{candidate.role}</p>

          {/* Status badge */}
          <span
            className={`inline-block mt-4 px-3 py-1 rounded-full text-sm ${
              candidate.status === "Verified"
                ? "bg-green-100 text-green-700"
                : candidate.status === "Rejected"
                ? "bg-red-100 text-red-700"
                : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {candidate.status}
          </span>
          {/* Approve / Reject buttons (Recruiter only) */}
<div className="mt-4 space-x-4">
  <button
    onClick={() => updateStatus("Verified")}
    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
  >
    Approve
  </button>

  <button
    onClick={() => updateStatus("Rejected")}
    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
  >
    Reject
  </button>
</div>


          {/* Documents section */}
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-3">
              Uploaded Documents
            </h2>

            <ul className="space-y-2 text-sm">
              <li>
                Aadhaar:{" "}
                {documents.aadhaar ? (
                  <span className="text-green-600">
                    {documents.aadhaar}
                  </span>
                ) : (
                  <span className="text-red-600">
                    Not uploaded
                  </span>
                )}
              </li>

              <li>
                PAN:{" "}
                {documents.pan ? (
                  <span className="text-green-600">
                    {documents.pan}
                  </span>
                ) : (
                  <span className="text-red-600">
                    Not uploaded
                  </span>
                )}
              </li>

              <li>
                Offer Letter:{" "}
                {documents.offerLetter ? (
                  <span className="text-green-600">
                    {documents.offerLetter}
                  </span>
                ) : (
                  <span className="text-red-600">
                    Not uploaded
                  </span>
                )}
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
