import type { GridColDef } from "@mui/x-data-grid";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";

const paginationModel = { page: 0, pageSize: 5 };

interface Props {
  column: GridColDef[];
  rows: unknown[];
}

export default function MUIDataTable({ column, rows }: Props) {
  return (
    <div className="w-full overflow-x-auto p-4">
      <Paper
        elevation={3}
        sx={{
          width: "100%",
          minWidth: "800px",
          maxWidth: "1200px",
          mx: "auto",
          borderRadius: "16px",
          padding: "8px",
        }}
      >
        <DataGrid
          rows={rows}
          columns={column}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10, 25, 50]}
          sx={{
            border: 0,
            maxHeight: "300px",
          }}
          disableColumnFilter
          disableRowSelectionOnClick
          disableColumnMenu
        />
      </Paper>
    </div>
  );
}
