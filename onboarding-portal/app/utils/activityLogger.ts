export type Activity = {
  id: number;
  actor: "candidate" | "recruiter";
  actorId: string;
  action: string;
  target?: string;
  time: string;
};

export function logActivity(
  actor: "candidate" | "recruiter",
  action: string,
  target?: string
) {
  if (typeof window === "undefined") return;

  const actorId =
    actor === "candidate"
      ? localStorage.getItem("candidateId") || "unknown"
      : "recruiter";

  const newActivity: Activity = {
    id: Date.now(),
    actor,
    actorId,
    action,
    target,
    time: new Date().toISOString(),
  };

  const stored = localStorage.getItem("activityLogs");
  const logs = stored ? JSON.parse(stored) : [];

  localStorage.setItem(
    "activityLogs",
    JSON.stringify([newActivity, ...logs])
  );
}
