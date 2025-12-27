import type React from "react";

import { useCallback, useState } from "react";
import * as XLSX from "xlsx";
import { initialDataClean } from "../../utility/dataClean";
import { useStore, type StoreState } from "../../store/global";
import { Upload, FileSpreadsheet, AlertCircle } from "lucide-react";

const FileInput = () => {
  const setUpload = useStore((state: StoreState) => state.setUpload);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

  const processFile = useCallback(
    (file: File) => {
      setError(null);
      setFileName(file.name);

      const validTypes = [
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      ];

      if (!validTypes.includes(file.type)) {
        setError("Invalid file type. Please upload a .xls or .xlsx file.");
        setFileName(null);
        return;
      }

      const reader = new FileReader();

      reader.onload = (e) => {
        try {
          const data = new Uint8Array(e.target?.result as ArrayBuffer);
          const workbook = XLSX.read(data, { type: "array" });

          if (workbook.SheetNames.length === 0) {
            setError("The Excel file does not contain any sheets.");
            setFileName(null);
            return;
          }

          const sheet = workbook.Sheets[workbook.SheetNames[0]];
          const rows = XLSX.utils.sheet_to_json(sheet, {
            header: 1,
          }) as string[][];

          if (rows.length === 0) {
            setError("The Excel sheet is empty.");
            setFileName(null);
            return;
          }

          const cleanedData = initialDataClean(rows);

          if (!cleanedData || cleanedData.length === 0) {
            setError("The file was read but contains no usable data.");
            setFileName(null);
            return;
          }

          setUpload(cleanedData);
        } catch (err) {
          console.error("Error reading Excel file:", err);
          setError(
            "An error occurred while processing the file. Please try again."
          );
          setFileName(null);
        }
      };

      reader.onerror = () => {
        setError("Failed to read the file.");
        setFileName(null);
      };

      reader.readAsArrayBuffer(file);
    },
    [setUpload]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);

      const file = e.dataTransfer.files?.[0];
      if (file) {
        processFile(file);
      }
    },
    [processFile]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        processFile(file);
      }
    },
    [processFile]
  );

  return (
    <div className="w-full">
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`
          relative border-2 border-dashed rounded-xl p-8 transition-all duration-200
          ${
            isDragging
              ? "border-[#D06718] bg-orange-50"
              : "border-gray-300 hover:border-gray-400 bg-gray-50"
          }
        `}
      >
        <input
          type="file"
          id="fileInput"
          onChange={handleFileSelect}
          className="hidden"
          accept=".xls,.xlsx"
          aria-label="Upload Excel file"
        />

        <div className="flex flex-col items-center gap-4 text-center">
          <div className="p-4 bg-white rounded-full shadow-sm">
            {fileName ? (
              <FileSpreadsheet className="w-8 h-8 text-green-600" />
            ) : (
              <Upload className="w-8 h-8 text-gray-400" />
            )}
          </div>

          {fileName ? (
            <div className="space-y-2">
              <p className="text-sm font-medium text-green-700">
                File uploaded successfully!
              </p>
              <p className="text-xs text-gray-600">{fileName}</p>
            </div>
          ) : (
            <>
              <div className="space-y-2">
                <p className="text-base font-semibold text-gray-700">
                  {isDragging
                    ? "Drop your file here"
                    : "Upload your Excel file"}
                </p>
                <p className="text-sm text-gray-500">
                  Drag and drop or click to browse
                </p>
              </div>

              <button
                type="button"
                onClick={() => document.getElementById("fileInput")?.click()}
                className="px-6 py-3 bg-[#D06718] text-white rounded-lg font-medium hover:bg-[#b65714] transition-colors shadow-sm"
              >
                Choose File
              </button>
            </>
          )}

          <p className="text-xs text-gray-500">
            Supports{" "}
            <code className="bg-gray-200 px-1.5 py-0.5 rounded text-xs">
              .xlsx
            </code>{" "}
            or{" "}
            <code className="bg-gray-200 px-1.5 py-0.5 rounded text-xs">
              .xls
            </code>{" "}
            from MyOUSL
          </p>
        </div>
      </div>

      {error && (
        <div
          className="mt-4 flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-lg"
          role="alert"
        >
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-red-800 font-medium">{error}</p>
        </div>
      )}
    </div>
  );
};

export default FileInput;
