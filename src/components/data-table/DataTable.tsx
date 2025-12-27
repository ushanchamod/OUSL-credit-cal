import { useStore } from "../../store/global";
import type { InputResultType } from "../../App";
import { Table } from "lucide-react";

const headers = [
  { name: "code", title: "Course Code" },
  { name: "name", title: "Course Name" },
  { name: "isCompulsory", title: "Type" },
  { name: "credit", title: "Credit" },
  { name: "level", title: "Level" },
  { name: "category", title: "Category" },
  { name: "progress", title: "Status" },
  { name: "grade", title: "Grade" },
  { name: "loy", title: "Year" },
  { name: "attempt", title: "Attempts" },
];

const DataTable = () => {
  const data = useStore((state) => state.data);

  const formattedData = data?.map((row: InputResultType) => ({
    ...row,
    isCompulsory:
      row.isCompulsory === "compulsory"
        ? "Compulsory"
        : row.isCompulsory === "optional"
        ? "Optional"
        : "-",
  }));

  return (
    <div className="w-full bg-white shadow-sm rounded-xl border border-gray-200 overflow-hidden">
      <div className="p-5 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center gap-2">
          <Table className="w-5 h-5 text-gray-700" />
          <h3 className="text-lg font-bold text-gray-900">Course Details</h3>
        </div>
        <p className="text-sm text-gray-600 mt-1">
          {formattedData?.length || 0} courses displayed
        </p>
      </div>

      <div className="overflow-x-auto max-h-[500px] overflow-y-auto">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-50 sticky top-0 z-10 border-b-2 border-gray-200">
            <tr>
              {headers.map((h, i) => (
                <th
                  key={i}
                  className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider whitespace-nowrap"
                >
                  {h.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {formattedData && formattedData.length > 0 ? (
              formattedData.map(
                (row: Record<string, unknown>, index: number) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    {headers.map((h, i) => (
                      <td
                        key={i}
                        className="px-4 py-3 whitespace-nowrap text-sm text-gray-700"
                      >
                        {String(row[h.name] ?? "-")}
                      </td>
                    ))}
                  </tr>
                )
              )
            ) : (
              <tr>
                <td
                  colSpan={headers.length}
                  className="text-center text-gray-500 py-12 text-sm"
                >
                  No data available. Please upload a file to view your courses.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;
