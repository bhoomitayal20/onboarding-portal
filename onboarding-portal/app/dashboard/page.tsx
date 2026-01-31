"use client";
import { useEffect, useState } from "react";


import Sidebar from "@/app/components/Sidebar";


export default function DashboardPage() {
    const [role, setRole] = useState<string | null>(null);
    const [candidates, setCandidates] = useState<any[]>([]);


useEffect(() => {
  const savedRole = localStorage.getItem("role");

  if (!savedRole) {
    window.location.href = "/login";
    return;
  }

  setRole(savedRole);

  const storedCandidates = localStorage.getItem("candidates");
  if (storedCandidates) {
    setCandidates(JSON.parse(storedCandidates));
  }
}, []);
const totalCandidates = candidates.length;

const verifiedCount = candidates.filter(
  (c) => c.status === "Verified"
).length;

const pendingCount = candidates.filter(
  (c) => c.status === "Pending"
).length;

const rejectedCount = candidates.filter(
  (c) => c.status === "Rejected"
).length;


  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-6">
          Dashboard
        </h1>

        {/* Stats */}
        {/* Role-based Dashboard */}

{role === "recruiter" && (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <p className="text-sm text-gray-500">Total Candidates</p>
      <p className="text-2xl font-semibold mt-2">
  {totalCandidates}
</p>

    </div>

    <div className="bg-white p-6 rounded-xl shadow-sm">
      <p className="text-sm text-gray-500">Verified</p>
      <p className="text-2xl font-semibold mt-2">
  {verifiedCount}
</p>

    </div>

    <div className="bg-white p-6 rounded-xl shadow-sm">
      <p className="text-sm text-gray-500">Pending</p>
      <p className="text-2xl font-semibold mt-2">
  {pendingCount}
</p>

    </div>
  </div>
)}

{role === "candidate" && (
  <div className="bg-white p-6 rounded-xl shadow-sm max-w-xl">
    <h2 className="text-xl font-semibold mb-2">
      Application Status
    </h2>

    <p className="text-gray-600">
      Status:{" "}
      <span
        className={`font-medium ${
          candidates[0]?.status === "Verified"
            ? "text-green-600"
            : candidates[0]?.status === "Rejected"
            ? "text-red-600"
            : "text-yellow-600"
        }`}
      >
        {candidates[0]?.status || "Pending"}
      </span>
    </p>
  </div>
)}



      </main>
    </div>
  );
}
