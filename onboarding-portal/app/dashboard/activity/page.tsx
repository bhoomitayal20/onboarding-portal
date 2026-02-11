"use client";

import { useState } from "react";
import FeatureCard from "@/app/components/FeatureCard";
import CandidateTable from "@/app/components/CandidateTable";


type Candidate = {
  id: string;
  name: string;
  stage: string;
  status: "registered" | "assigned" | "approved" | "rejected";

  policeStation?: {
    name: string;
    city: string;
    status: "pending" | "approved" | "rejected";
  };
};

export default function ActivityPage() {
  const [candidates, setCandidates] = useState<Candidate[]>([
    {
      id: "RP-2025-813",
      name: "Amit Sharma",
      stage: "Medical Examination",
      status: "registered",
    },
    {
      id: "RP-2025-124",
      name: "Priya Singh",
      stage: "Background Verification",
      status: "registered",
    },
    {
      id: "RP-2025-559",
      name: "Rahul Verma",
      stage: "Final Clearance",
      status: "registered",
    },
    {
      id: "RP-2025-999",
      name: "Neha Patel",
      stage: "Joining Letters",
      status: "registered",
    },
  ]);

  // 🔹 Assign Police Station
  const handleAssignPolice = (candidateId: string) => {
    setCandidates((prev) =>
      prev.map((c) =>
        c.id === candidateId
          ? {
              ...c,
              policeStation: {
                name: "Central Police Station",
                city: "Delhi",
                status: "pending",
              },
              status: "assigned",
            }
          : c
      )
    );
  };

  // 🔹 Approve Police Verification
  const handleApprovePolice = (candidateId: string) => {
    setCandidates((prev) =>
      prev.map((c) =>
        c.id === candidateId && c.policeStation
          ? {
              ...c,
              policeStation: {
                ...c.policeStation,
                status: "approved",
              },
              status: "approved",
            }
          : c
      )
    );
  };

  // 🔹 Reject Police Verification
  const handleRejectPolice = (candidateId: string) => {
    setCandidates((prev) =>
      prev.map((c) =>
        c.id === candidateId && c.policeStation
          ? {
              ...c,
              policeStation: {
                ...c.policeStation,
                status: "rejected",
              },
              status: "rejected",
            }
          : c
      )
    );
  };

  // Dashboard Counts
  const medicalCount = candidates.filter(
    (c) => c.stage === "Medical Examination"
  ).length;

  const backgroundCount = candidates.filter(
    (c) => c.stage === "Background Verification"
  ).length;

  const finalClearanceCount = candidates.filter(
    (c) => c.stage === "Final Clearance"
  ).length;

  const joiningCount = candidates.filter(
    (c) => c.stage === "Joining Letters"
  ).length;

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Recruitment Overview</h1>
          <p className="text-sm text-gray-500 mt-1">
            Managing Batch:
            <span className="ml-2 bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs font-medium">
              AD-2025-01
            </span>
          </p>
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <FeatureCard
          title="Medical Examination"
          count={medicalCount}
          status="action"
        />
        <FeatureCard
          title="Background Verification"
          count={backgroundCount}
          status="processing"
        />
        <FeatureCard
          title="Final Clearance"
          count={finalClearanceCount}
          status="review"
        />
        <FeatureCard
          title="Joining Letters"
          count={joiningCount}
          status="ready"
        />
      </div>

      {/* 🔥 Police Verification Section */}
      <div className="bg-white border rounded-xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold mb-4">
          Police Verification Management
        </h2>

        {candidates.map((candidate) => (
          <div
            key={candidate.id}
            className="border rounded-lg p-4 mb-4"
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">{candidate.name}</p>
                <p className="text-sm text-gray-500">
                  ID: {candidate.id}
                </p>
              </div>

              {!candidate.policeStation && (
                <button
                  onClick={() => handleAssignPolice(candidate.id)}
                  className="bg-blue-600 text-white px-3 py-2 rounded text-sm"
                >
                  Assign Police Station
                </button>
              )}
            </div>

            {candidate.policeStation && (
              <div className="mt-4 bg-gray-50 p-4 rounded-lg">
                <p className="text-sm">
                  <strong>Station:</strong>{" "}
                  {candidate.policeStation.name} (
                  {candidate.policeStation.city})
                </p>

                <p className="text-sm mt-1">
                  <strong>Status:</strong>{" "}
                  {candidate.policeStation.status.toUpperCase()}
                </p>

                {candidate.policeStation.status === "pending" && (
                  <div className="flex gap-3 mt-3">
                    <button
                      onClick={() =>
                        handleApprovePolice(candidate.id)
                      }
                      className="bg-green-600 text-white px-3 py-2 rounded text-sm"
                    >
                      Approve
                    </button>

                    <button
                      onClick={() =>
                        handleRejectPolice(candidate.id)
                      }
                      className="bg-red-600 text-white px-3 py-2 rounded text-sm"
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Existing Candidate Table */}
      <div className="mt-10">
        <CandidateTable data={candidates as any} />
      </div>
    </div>
  );
}
