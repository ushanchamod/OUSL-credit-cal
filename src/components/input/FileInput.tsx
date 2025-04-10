import { useEffect, useRef, useCallback } from "react";
import * as XLSX from "xlsx";
import { initialDataClean } from "../../utility/dataClean";
import { useStore } from "../../store/global";
import { MdUploadFile } from "react-icons/md";


const FileInput = () => {
  const fileRef = useRef<HTMLInputElement | null>(null);
  const setUpload = useStore((state: any) => state.setUpload);

  const handleFileChange = useCallback(
    (event: Event) => {
      const target = event.target as HTMLInputElement;
      if (target.files && target.files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const data = new Uint8Array(e.target?.result as ArrayBuffer);
          const workbook = XLSX.read(data, { type: "array" });
          const sheetName = workbook.SheetNames[0];
          const sheet = workbook.Sheets[sheetName];
          const rows = XLSX.utils.sheet_to_json(sheet, {
            header: 1,
          }) as unknown as string[][];

          setUpload(initialDataClean(rows));
        };
        reader.readAsArrayBuffer(target.files[0]);
      }
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
        <p className="text-sm text-gray-400">
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
      </div>
    </form>
  );
};

export default FileInput;
