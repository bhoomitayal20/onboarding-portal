type FeatureCardProps = {
  title: string;
  count: number;
  status: "action" | "processing" | "review" | "ready";
  onManage?: () => void;
};

export default function FeatureCard({
  title,
  count,
  status,
  onManage,
}: FeatureCardProps) {
  const statusStyles = {
    action: "bg-red-100 text-red-600",
    processing: "bg-blue-100 text-blue-600",
    review: "bg-yellow-100 text-yellow-600",
    ready: "bg-green-100 text-green-600",
  };

  const statusLabel = {
    action: "Action Required",
    processing: "Processing",
    review: "Review",
    ready: "Ready",
  };

  return (
    <div className="bg-white border rounded-xl p-6 shadow-sm hover:shadow-md transition">
      
      {/* Status Badge */}
      <div
        className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${statusStyles[status]}`}
      >
        {statusLabel[status]}
      </div>

      {/* Title */}
      <h4 className="text-lg font-semibold mt-4">{title}</h4>

      {/* Count */}
      <p className="text-3xl font-bold mt-2">{count}</p>
      <p className="text-gray-500 text-sm">Candidates Pending</p>

      {/* Button */}
      <button
        onClick={onManage}
        className="mt-4 text-sm font-medium text-blue-600 hover:underline"
      >
        Manage Queue →
      </button>
    </div>
  );
}
