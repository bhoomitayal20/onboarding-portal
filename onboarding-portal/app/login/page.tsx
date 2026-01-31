"use client";

import { useState, useEffect } from "react";

type Candidate = {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
};

export default function LoginPage() {
  const [role, setRole] = useState<"candidate" | "recruiter">("candidate");
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [selectedCandidateId, setSelectedCandidateId] = useState("");

  // Load candidates
  useEffect(() => {
    const stored = localStorage.getItem("candidates");

    if (stored) {
      const list = JSON.parse(stored);
      setCandidates(list);
      if (list.length > 0) setSelectedCandidateId(String(list[0].id));
    } else {
      const defaultCandidates = [
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

      localStorage.setItem("candidates", JSON.stringify(defaultCandidates));
      setCandidates(defaultCandidates);
      setSelectedCandidateId("1");
    }
  }, []);

  const addCandidate = () => {
    const name = prompt("Enter candidate name");
    if (!name) return;

    const id = Date.now();

    const newCandidate = {
      id,
      name,
      email: `${name.replace(" ", "").toLowerCase()}@mail.com`,
      role: "New Candidate",
      status: "Pending",
    };

    const updated = [...candidates, newCandidate];

    setCandidates(updated);
    setSelectedCandidateId(String(id));

    localStorage.setItem("candidates", JSON.stringify(updated));

    alert("Candidate added successfully ✅");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white w-full max-w-md p-8 rounded-xl shadow-md">

        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        {/* Role Toggle */}
        <div className="flex mb-6 border rounded-md overflow-hidden">
          <button
            onClick={() => setRole("candidate")}
            className={`w-1/2 py-2 ${
              role === "candidate"
                ? "bg-blue-600 text-white"
                : "bg-gray-100"
            }`}
          >
            Candidate
          </button>

          <button
            onClick={() => setRole("recruiter")}
            className={`w-1/2 py-2 ${
              role === "recruiter"
                ? "bg-blue-600 text-white"
                : "bg-gray-100"
            }`}
          >
            Recruiter
          </button>
        </div>

        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();

            localStorage.setItem("role", role);

            if (role === "candidate") {
              localStorage.setItem("candidateId", selectedCandidateId);
            }

            window.location.href = "/dashboard";
          }}
        >

          {role === "candidate" && (
            <>
              <select
                className="w-full border px-3 py-2 rounded-md"
                value={selectedCandidateId}
                onChange={(e) => setSelectedCandidateId(e.target.value)}
              >
                {candidates.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>

              <button
                type="button"
                onClick={addCandidate}
                className="text-blue-600 text-sm hover:underline"
              >
                + Add New Candidate
              </button>
            </>
          )}

          <input
            placeholder="Email"
            className="w-full border px-3 py-2 rounded-md"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border px-3 py-2 rounded-md"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
