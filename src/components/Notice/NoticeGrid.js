// src/components/Notice/NoticeGrid.jsx
import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material";

const NoticeGrid = ({ data, onRowClick, selectedIds, setSelectedIds }) => {
  const columns = [
    { field: "id", headerName: "ID", width: 80 },
    { field: "title", headerName: "제목", width: 200 },
    { field: "author", headerName: "작성자", width: 150 },
    {
      field: "startDate",
      headerName: "시작일",
      width: 120,
      valueGetter: (params) =>
        params.row.startDate ? new Date(params.row.startDate).toLocaleDateString() : "",
    },
    {
      field: "endDate",
      headerName: "종료일",
      width: 120,
      valueGetter: (params) =>
        params.row.endDate ? new Date(params.row.endDate).toLocaleDateString() : "",
    },
    {
      field: "priority",
      headerName: "우선순위",
      width: 100,
    },
    {
      field: "banner",
      headerName: "배너",
      width: 80,
      valueGetter: (params) => (params.row.banner ? "예" : "아니오"),
    },
  ];

  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <DataGrid
        rows={data}
        columns={columns}
        getRowId={(row) => row.id}
        checkboxSelection
        selectionModel={selectedIds}
        onRowSelectionModelChange={(newSelection) => {
          const convertedSelection = newSelection.map((id) => Number(id));
          setSelectedIds(convertedSelection);
        }}
        disableRowSelectionOnClick
        pageSize={5}
        rowsPerPageOptions={[5, 10, 20]}
        onCellClick={(params) => {
          if (params.field !== "id") onRowClick(params.row);
        }}
        sx={{
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#f5f5f5",
            borderBottom: "1px solid #ddd",
          },
        }}
      />
    </Box>
  );
};

export default NoticeGrid;
