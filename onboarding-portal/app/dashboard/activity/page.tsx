"use client";

import Sidebar from "@/app/components/Sidebar";
import useAuthGuard from "@/app/hooks/useAuthGuard";
import { useEffect, useState } from "react";

type Activity = {
  id: number;
  message: string;
  role: string;
  time: string;
};

export default function ActivityPage() {
  useAuthGuard(["recruiter"]);

  const [logs, setLogs] = useState<Activity[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const stored = localStorage.getItem("activityLogs");
      if (stored) {
        setLogs(JSON.parse(stored));
      }
    }, 2000); // refresh every 2 seconds
  
    return () => clearInterval(interval);
  }, []);
  

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <main className="flex-1 p-8 max-w-3xl">
        <h1 className="text-2xl font-bold mb-6">System Activity</h1>

        {logs.length === 0 ? (
          <p className="text-gray-500">No activity yet</p>
        ) : (
          <ul className="space-y-4">
            {logs.map((log) => (
              <li
                key={log.id}
                className="bg-white p-4 rounded-xl shadow-sm"
              >
                <p className="font-medium">{log.message}</p>

                <p className="text-xs text-gray-500 mt-1">
                  {log.role} • {new Date(log.time).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}
