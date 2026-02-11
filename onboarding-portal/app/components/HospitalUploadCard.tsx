"use client";

import { useState } from "react";
import Papa from "papaparse";

type Props = {
  title: string;
};

type UploadHistoryItem = {
  fileName: string;
  date: string;
};

export default function HospitalUploadCard({ title }: Props) {
  const [fileName, setFileName] = useState<string | null>(null);
  const [previewData, setPreviewData] = useState<any[]>([]);
  const [history, setHistory] = useState<UploadHistoryItem[]>([]);

  const handleFile = (file: File) => {
    setFileName(file.name);

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results: Papa.ParseResult<any>) => {
        setPreviewData(results.data.slice(0, 5)); // show first 5 rows
      },
    });
  };

  const handleConfirmUpload = () => {
    if (!fileName) return;

    const newUpload = {
      fileName,
      date: new Date().toLocaleString(),
    };

    setHistory((prev) => [newUpload, ...prev]);
    setPreviewData([]);
    setFileName(null);
  };

  return (
    <div className="bg-white border rounded-xl p-6 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold">{title}</h3>
        <button className="text-sm text-blue-600 hover:underline">
          Template
        </button>
      </div>

      {/* Upload Box */}
      <div className="border-2 border-dashed rounded-lg p-8 text-center">
        <input
          type="file"
          accept=".csv"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFile(file);
          }}
          className="hidden"
          id={title}
        />

        <label
          htmlFor={title}
          className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-lg text-sm"
        >
          Click to Upload CSV
        </label>

        <p className="text-gray-500 text-sm mt-3">
          or drag and drop file here
        </p>

        {fileName && (
          <p className="text-green-600 text-sm mt-3">
            Selected: {fileName}
          </p>
        )}
      </div>

      {/* Preview Section */}
      {previewData.length > 0 && (
        <div className="mt-6">
          <h4 className="font-medium mb-2">Preview (First 5 Rows)</h4>

          <div className="overflow-x-auto border rounded-lg">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-100 text-left">
                  {Object.keys(previewData[0]).map((key) => (
                    <th key={key} className="p-2">
                      {key}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {previewData.map((row, index) => (
                  <tr key={index} className="border-t">
                    {Object.values(row).map((value: any, i) => (
                      <td key={i} className="p-2">
                        {value}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <button
            onClick={handleConfirmUpload}
            className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700"
          >
            Confirm Upload
          </button>
        </div>
      )}

      {/* Upload History */}
      {history.length > 0 && (
        <div className="mt-8">
          <h4 className="font-medium mb-3">Upload History</h4>

          <ul className="space-y-2 text-sm">
            {history.map((item, index) => (
              <li
                key={index}
                className="border rounded-lg p-3 flex justify-between"
              >
                <span>{item.fileName}</span>
                <span className="text-gray-500">{item.date}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
