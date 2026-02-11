import HospitalUploadCard from "@/app/components/HospitalUploadCard";

export default function HospitalImportPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-2">
        Hospital Data Import
      </h1>

      <p className="text-gray-500 mb-8">
        Upload CSV files to stage and validate hospital records before committing to the database.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <HospitalUploadCard title="Hospital Master" />
        <HospitalUploadCard title="Hospital Addresses" />
      </div>

      {/* Upload History Section */}
      <div className="mt-10 bg-white border rounded-xl p-6 shadow-sm">
        <h3 className="font-semibold">
          Uploaded Documents History
        </h3>
        <p className="text-gray-500 text-sm mt-2">
          No uploads yet.
        </p>
      </div>
    </div>
  );
}
