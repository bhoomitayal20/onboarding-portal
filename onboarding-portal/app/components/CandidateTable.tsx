type Candidate = {
    id: string;
    name: string;
    stage: string;
    status: "passed" | "pending" | "rejected";
  };
  
  const statusStyles = {
    passed: "bg-green-100 text-green-600",
    pending: "bg-yellow-100 text-yellow-600",
    rejected: "bg-red-100 text-red-600",
  };
  
  export default function CandidateTable({
    data,
  }: {
    data: Candidate[];
  }) {
    return (
      <div className="mt-10 bg-white border rounded-xl p-6 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">
            Recent Candidate Activity
          </h2>
  
          <button className="text-sm text-blue-600 hover:underline">
            View All
          </button>
        </div>
  
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b text-gray-500 text-left">
              <th className="pb-3">Candidate ID</th>
              <th className="pb-3">Name</th>
              <th className="pb-3">Stage</th>
              <th className="pb-3">Status</th>
            </tr>
          </thead>
  
          <tbody>
            {data.map((candidate) => (
              <tr key={candidate.id} className="border-b">
                <td className="py-3">{candidate.id}</td>
                <td className="py-3">{candidate.name}</td>
                <td className="py-3">{candidate.stage}</td>
                <td className="py-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${statusStyles[candidate.status]}`}
                  >
                    {candidate.status.toUpperCase()}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  