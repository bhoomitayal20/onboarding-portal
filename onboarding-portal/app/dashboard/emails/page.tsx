"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/app/components/Sidebar";

type Email = {
  id: string;
  subject: string;
  body: string;
  time: string;
  read: boolean;
};


export default function EmailsPage() {
  const [emails, setEmails] = useState<Email[]>([]);
  const markAsRead = (id: string) => {
    const updated = emails.map((e) =>
      e.id === id ? { ...e, read: true } : e
    );
  
    setEmails(updated);
  
    const candidateId = localStorage.getItem("candidateId");
    if (!candidateId) return;
  
    const stored = localStorage.getItem("emailsByUser");
    if (!stored) return;
  
    const all = JSON.parse(stored);
    all[`candidate_${candidateId}`] = updated;
  
    localStorage.setItem(
      "emailsByUser",
      JSON.stringify(all)
    );
  
    // 🔥 MANUALLY DISPATCH STORAGE EVENT
    window.dispatchEvent(new Event("storage"));
  };
  
  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "candidate") {
      window.location.href = "/dashboard";
      return;
    }

    const candidateId = localStorage.getItem("candidateId");
    if (!candidateId) return;

    const stored = localStorage.getItem("emailsByUser");
    if (!stored) return;

    const all = JSON.parse(stored);
    const list = all[`candidate_${candidateId}`] || [];

    setEmails(list);
  }, []);


  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <main className="flex-1 p-8 max-w-2xl">
        <h1 className="text-2xl font-bold mb-6">Emails</h1>

        {emails.length === 0 ? (
          <p className="text-gray-500">No emails yet</p>
        ) : (
          <div className="space-y-6">
           {emails.map((email) => (
  <div
    key={email.id}
    onClick={() => markAsRead(email.id)}
    className={`bg-white p-6 rounded-xl shadow-sm cursor-pointer ${
      email.read === false
        ? "border-l-4 border-blue-600"
        : "opacity-70"
    }`}
  >

               <h2
  className={`font-semibold ${
    email.read === false ? "font-bold text-black" : "text-gray-600"
  }`}
>
  {email.subject}
</h2>

                <p className="text-xs text-gray-500 mb-2">
                  {new Date(email.time).toLocaleString()}
                </p>

                <pre className="text-sm whitespace-pre-wrap text-gray-700">
                  {email.body}
                </pre>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
