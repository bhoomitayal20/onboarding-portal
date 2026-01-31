"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/app/components/Sidebar";

type Notification = {
  id: number;
  message: string;
  read: boolean;
  time: string;
};

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "candidate") {
      window.location.href = "/dashboard";
      return;
    }

    const candidateId = localStorage.getItem("candidateId");
    if (!candidateId) return;

    const stored = localStorage.getItem("notificationsByUser");
    if (!stored) return;

    const all = JSON.parse(stored);
    const list = all[`candidate_${candidateId}`] || [];

    // mark as read
    const updated = list.map((n: Notification) => ({
      ...n,
      read: true,
    }));

    all[`candidate_${candidateId}`] = updated;
    localStorage.setItem("notificationsByUser", JSON.stringify(all));

    setNotifications(updated);
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <main className="flex-1 p-8 max-w-xl">
        <h1 className="text-2xl font-bold mb-6">
          Notifications
        </h1>

        {notifications.length === 0 ? (
          <p className="text-gray-500">No notifications yet</p>
        ) : (
          <ul className="space-y-4">
            {notifications.map((n) => (
              <li
                key={n.id}
                className="bg-white p-4 rounded-xl shadow-sm"
              >
                <p>{n.message}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {new Date(n.time).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}
