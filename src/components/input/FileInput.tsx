import { useEffect, useRef, useCallback, useState } from "react";
import * as XLSX from "xlsx";
import { initialDataClean } from "../../utility/dataClean";
import { useStore } from "../../store/global";
import { MdUploadFile } from "react-icons/md";

const FileInput = () => {
  const fileRef = useRef<HTMLInputElement | null>(null);
  const setUpload = useStore((state: any) => state.setUpload);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = useCallback(
    (event: Event) => {
      const target = event.target as HTMLInputElement;
      const file = target.files?.[0];
      setError(null); // Clear previous errors

      if (!file) {
        setError("No file selected.");
        return;
      }

      const validTypes = ["application/vnd.ms-excel", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"];
      if (!validTypes.includes(file.type)) {
        setError("Invalid file type. Please upload a .xls or .xlsx file.");
        return;
      }

      const reader = new FileReader();

      reader.onload = (e) => {
        try {
          const data = new Uint8Array(e.target?.result as ArrayBuffer);
          const workbook = XLSX.read(data, { type: "array" });

          if (workbook.SheetNames.length === 0) {
            setError("The Excel file does not contain any sheets.");
            return;
          }

          const sheet = workbook.Sheets[workbook.SheetNames[0]];
          const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 }) as string[][];

          if (rows.length === 0) {
            setError("The Excel sheet is empty.");
            return;
          }

          const cleanedData = initialDataClean(rows);

          if (!cleanedData || cleanedData.length === 0) {
            setError("The file was read but contains no usable data.");
            return;
          }

          setUpload(cleanedData);
        } catch (err) {
          console.error("Error reading Excel file:", err);
          setError("An error occurred while processing the file. Please try again.");
        }
      };

      reader.onerror = () => {
        setError("Failed to read the file.");
      };

      reader.readAsArrayBuffer(file);
    },
    [setUpload]
  );

  useEffect(() => {
    const fileInput = fileRef.current;
    if (fileInput) {
      fileInput.addEventListener("change", handleFileChange);
    }
    return () => {
      if (fileInput) {
        fileInput.removeEventListener("change", handleFileChange);
      }
    };
  }, [handleFileChange]);

  return (
    <form className="max-w-md mx-auto mt-10 p-8 bg-white rounded-lg shadow-lg border border-gray-200">
      <div className="flex flex-col items-center gap-6">
        {/* Hidden file input */}
        <input
          type="file"
          id="fileInput"
          ref={fileRef}
          className="hidden"
          accept=".xls,.xlsx"
        />

        {/* Styled button with icon */}
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          className="flex items-center gap-2 px-6 py-3 bg-[#D06718] text-white rounded-md shadow-md hover:bg-[#d05218] transition duration-200 cursor-pointer"
        >
          <MdUploadFile className="text-[23px]" />
          Upload Excel File
        </button>

        {/* File Upload Info */}
        <p className="text-sm text-gray-600">
          Only{" "}
          <code className="bg-gray-100 p-0.5 px-2 rounded-md text-gray-800">xlsx</code> or{" "}
          <code className="bg-gray-100 p-0.5 px-2 rounded-md text-gray-800">xls</code> files are supported.
        </p>
        <p className="text-sm text-gray-400 text-center">
          You can download the Excel file from{" "}
          <a
            target="_blank"
            href="http://myousl.ou.ac.lk/"
            className="text-blue-500 hover:underline"
          >
            myousl
          </a>{" "}
          website and simply upload it here.
        </p>

        {/* Error message */}
        {error && (
          <p className="text-sm text-white font-medium text-center bg-red-500 px-2 py-1.5 rounded-sm animate-pulse ease-in-out">{error}</p>
        )}
      </div>
    </form>
  );
};

export default FileInput;
