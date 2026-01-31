"use client";

import useAuthGuard from "@/app/hooks/useAuthGuard";
import { useEffect, useState } from "react";
import Sidebar from "@/app/components/Sidebar";

type Candidate = {
  id: number;
  name: string;
  email: string;
  role: string;
  status: "Pending" | "Verified" | "Rejected";
};

export default function CandidatesPage() {
  useAuthGuard(["recruiter"]);

  // -------------------- STATE --------------------
  const [mounted, setMounted] = useState(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "All" | "Pending" | "Verified" | "Rejected"
  >("All");

  const [candidates, setCandidates] = useState<Candidate[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("candidates");
      if (saved) return JSON.parse(saved);
    }

    return [
      {
        id: 1,
        name: "Aarav Sharma",
        email: "aarav@gmail.com",
        role: "Software Engineer",
        status: "Pending",
      },
      {
        id: 2,
        name: "Isha Verma",
        email: "isha@gmail.com",
        role: "UI/UX Designer",
        status: "Verified",
      },
      {
        id: 3,
        name: "Rohan Mehta",
        email: "rohan@gmail.com",
        role: "Backend Developer",
        status: "Pending",
      },
    ];
  });

  // -------------------- FILTER --------------------
  const filteredCandidates = candidates.filter((c: Candidate) => {
    const matchesSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || c.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // -------------------- EFFECTS --------------------
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    localStorage.setItem("candidates", JSON.stringify(candidates));
  }, [candidates]);

  // -------------------- ACTIONS --------------------
  const updateStatus = (
    id: number,
    status: "Verified" | "Rejected"
  ) => {
    setCandidates((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, status } : c
      )
    );
  };

  if (!mounted) return null;

  // -------------------- UI --------------------
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-6">Candidates</h1>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="flex gap-4 mb-6 p-6">
            <input
              type="text"
              placeholder="Search by name or email"
              className="border px-3 py-2 rounded-md w-1/2"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <select
              className="border px-3 py-2 rounded-md"
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value as any)
              }
            >
              <option value="All">All</option>
              <option value="Pending">Pending</option>
              <option value="Verified">Verified</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          <table className="w-full border-collapse">
            <thead className="bg-gray-50 text-left">
              <tr>
                <th className="px-6 py-3 text-sm font-medium text-gray-600">
                  Name
                </th>
                <th className="px-6 py-3 text-sm font-medium text-gray-600">
                  Email
                </th>
                <th className="px-6 py-3 text-sm font-medium text-gray-600">
                  Role
                </th>
                <th className="px-6 py-3 text-sm font-medium text-gray-600">
                  Status
                </th>
                <th className="px-6 py-3 text-sm font-medium text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredCandidates.map((candidate) => (
                <tr
                  key={candidate.id}
                  onClick={() =>
                    window.location.href = `/dashboard/candidates/${candidate.id}`
                  }
                  className="border-t hover:bg-gray-50 cursor-pointer"
                >
                  <td className="px-6 py-4">{candidate.name}</td>
                  <td className="px-6 py-4 text-gray-600">
                    {candidate.email}
                  </td>
                  <td className="px-6 py-4">{candidate.role}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 text-sm rounded-full ${
                        candidate.status === "Verified"
                          ? "bg-green-100 text-green-700"
                          : candidate.status === "Rejected"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {candidate.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 space-x-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        updateStatus(candidate.id, "Verified");
                      }}
                      className="text-green-600 text-sm hover:underline"
                    >
                      Approve
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        updateStatus(candidate.id, "Rejected");
                      }}
                      className="text-red-600 text-sm hover:underline"
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
