// import { GridColDef } from "@mui/x-data-grid";
import { useStore } from "../../store/global";
// import MUIDataTable from "./MUIDataTable";
// import { useEffect, useState } from "react";
import { InputResultType } from "../../App";

const headers = [
  { name: "code", title: "Course Code" },
  { name: "name", title: "Course Name" },
  { name: "credit", title: "Credit" },
  { name: "level", title: "Level" },
  { name: "category", title: "Category" },
  { name: "progress", title: "Progress Status" },
  { name: "grade", title: "Grade" },
  { name: "attempt", title: "Attempts" },
];

const DataTable = () => {
  const data = useStore((state: any) => state.data);

  return (
    <div className="mt-8 rounded-xl shadow-md max-h-[400px] overflow-auto border border-gray-200">
      <table className="min-w-full table-auto bg-white">
        <thead className="bg-gray-100 sticky top-0 z-10">
          <tr>
            {headers.map((h, i) => (
              <th
                key={i}
                className="bg-white px-4 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap border-b-1 border-b-gray-300"
              >
                {h.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {data && data.length > 0 ? (
            data.map((row: InputResultType, index: number) => (
              <tr key={index} className="hover:bg-gray-50 transition duration-150">
                {headers.map((h, i) => (
                  <td
                    key={i}
                    className="px-4 py-3 whitespace-nowrap text-sm text-gray-700"
                  >
                    {row[h.name as keyof InputResultType] ?? "-"}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={headers.length}
                className="text-center text-gray-400 py-6 text-sm"
              >
                No data available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

// const DataTable = () => {
//   const _data = useStore((state: any) => state.data)
//   const [data, setData] = useState([])

//   useEffect(() => {
//     setData(_data)
//   }, [_data])


//   const headersMUI: GridColDef[] = [
//     { field: "code", headerName: "Course Code" },
//     { field: "name", headerName: "Course Name", width: 290 },
//     { field: "credit", headerName: "Credit" },
//     { field: "level", headerName: "Level" },
//     { field: "category", headerName: "Category" },
//     { field: "progress", headerName: "Progress Status" },
//     { field: "grade", headerName: "Grade" },
//     { field: "attempt", headerName: "Attempts" },
//   ];
//   return (
//     <MUIDataTable
//       column={headersMUI}
//       rows={data}
//     />
//   )
// }

export default DataTable;