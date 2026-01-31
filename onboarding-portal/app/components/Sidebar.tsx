"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Sidebar() {
  const router = useRouter();

  const [role, setRole] = useState<string | null>(null);
  const [unreadNotifications, setUnreadNotifications] = useState(0);
  const [unreadEmails, setUnreadEmails] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const role = localStorage.getItem("role");
      setRole(role);
  
      if (role === "candidate") {
        const candidateId = localStorage.getItem("candidateId");
        if (!candidateId) return;
  
        // Emails
        const storedEmails = localStorage.getItem("emailsByUser");
        if (storedEmails) {
          const all = JSON.parse(storedEmails);
          const list = all[`candidate_${candidateId}`] || [];
          setUnreadEmails(list.filter((e: any) => !e.read).length);
        }
  
        // Notifications
        const storedNotifs = localStorage.getItem("notificationsByUser");
        if (storedNotifs) {
          const all = JSON.parse(storedNotifs);
          const list = all[`candidate_${candidateId}`] || [];
          setUnreadNotifications(
            list.filter((n: any) => !n.read).length
          );
        }
      }
    }, 2000);
  
    return () => clearInterval(interval);
  }, []);
  
  

  const handleLogout = () => {
    localStorage.removeItem("role");
    localStorage.removeItem("candidateId");
    router.push("/login");
  };

  return (
    <aside className="w-64 bg-white border-r p-6 flex flex-col justify-between">
      <div>
        <h2 className="text-xl font-bold text-blue-600 mb-8">
          RecruitPortal
        </h2>

        <nav className="flex flex-col gap-4">
          <Link
            href="/dashboard"
            className="text-gray-700 hover:text-blue-600"
          >
            Dashboard
          </Link>

          {role === "recruiter" && (
            <Link
              href="/dashboard/candidates"
              className="text-gray-700 hover:text-blue-600"
            >
              Candidates
            </Link>
          )}
          {role === "recruiter" && (
  <>
    <Link
      href="/dashboard/candidates"
      className="text-gray-700 hover:text-blue-600"
    >
      Candidates
    </Link>

    <Link
      href="/dashboard/activity"
      className="text-gray-700 hover:text-blue-600"
    >
      Activity
    </Link>
  </>
)}



          {role === "candidate" && (
            <>
              <Link
                href="/dashboard/documents"
                className="text-gray-700 hover:text-blue-600"
              >
                Documents
              </Link>
              
              <Link
               href="/dashboard/timeline"
               className="text-gray-700 hover:text-blue-600"
              >
               Timeline
              </Link>
              
              <Link
                href="/dashboard/notifications"
                className="flex items-center justify-between text-gray-700 hover:text-blue-600"
              >
                <span>Notifications</span>

                {unreadNotifications > 0 && (
                  <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                    {unreadNotifications}
                  </span>
                )}
              </Link>

              <Link
  href="/dashboard/emails"
  className="flex items-center justify-between text-gray-700 hover:text-blue-600"
>
  <span>Emails</span>

  {unreadEmails > 0 && (
    <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
      {unreadEmails}
    </span>
  )}
</Link>

            </>
          )}
        </nav>
      </div>

      <button
        onClick={handleLogout}
        className="mt-8 text-red-600 font-medium hover:underline text-left"
      >
        Logout
      </button>
    </aside>
  );
}
