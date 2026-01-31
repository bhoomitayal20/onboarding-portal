"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/app/components/Sidebar";

type TimelineStep = {
  title: string;
  completed: boolean;
  description?: string;
};

export default function TimelinePage() {
  const [steps, setSteps] = useState<TimelineStep[]>([]);

  useEffect(() => {
    const loadTimeline = () => {
      const role = localStorage.getItem("role");
      if (role !== "candidate") {
        window.location.href = "/dashboard";
        return;
      }
  
      const candidateId = localStorage.getItem("candidateId");
      if (!candidateId) return;
  
      const profileCreated = true;
  
      const docs = JSON.parse(
        localStorage.getItem("documentsByCandidate") || "{}"
      );
      const uploadedDocs = docs[candidateId];
      const documentsUploaded =
        uploadedDocs &&
        (uploadedDocs.aadhaar ||
          uploadedDocs.pan ||
          uploadedDocs.offerLetter);
  
      const candidates = JSON.parse(
        localStorage.getItem("candidates") || "[]"
      );
      const candidate = candidates.find(
        (c: any) => c.id === Number(candidateId)
      );
  
      const verified = candidate?.status === "Verified";
      const rejected = candidate?.status === "Rejected";
  
      const emails = JSON.parse(
        localStorage.getItem("emailsByUser") || "{}"
      );
      const emailSent =
        emails[`candidate_${candidateId}`]?.length > 0;
  
      const completed = verified && documentsUploaded && emailSent;
  
      setSteps([
        { title: "Profile Created", completed: profileCreated },
        {
          title: "Documents Uploaded",
          completed: !!documentsUploaded,
          description: documentsUploaded
            ? "All required documents uploaded"
            : "Upload your documents",
        },
        {
          title: rejected
            ? "Verification Rejected"
            : "Recruiter Verification",
          completed: verified,
          description: rejected
            ? "Application rejected"
            : verified
            ? "Approved by recruiter"
            : "Pending approval",
        },
        {
          title: "Email Sent",
          completed: emailSent,
          description: emailSent
            ? "Recruiter has sent an email"
            : "Waiting for recruiter email",
        },
        { title: "Onboarding Complete", completed },
      ]);
    };
  
    loadTimeline();
  
    window.addEventListener("storage", loadTimeline);
  
    return () => {
      window.removeEventListener("storage", loadTimeline);
    };
  }, []);
  

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <main className="flex-1 p-8 max-w-xl">
        <h1 className="text-2xl font-bold mb-6">
          Onboarding Progress
        </h1>

        <div className="space-y-6">
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex items-start gap-4"
            >
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs text-white ${
                  step.completed
                    ? "bg-green-600"
                    : "bg-gray-400"
                }`}
              >
                {step.completed ? "✓" : index + 1}
              </div>

              <div>
                <h2 className="font-semibold">
                  {step.title}
                </h2>

                {step.description && (
                  <p className="text-sm text-gray-600">
                    {step.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
