// src/components/Inspection/InspectionGrid.js
import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Typography } from "@mui/material";

export const InspectionGrid = ({ data, onRowClick }) => {
  const columns = [
    {
      field: "id",
      headerName: "검수 ID",
      width: 90,
      renderCell: (params) => (
        <Typography
          sx={{
            color: "mediumpurple",
            fontWeight: "bold",
            cursor: "pointer",
            "&:hover": { textDecoration: "underline" },
          }}
          onClick={(e) => {
            e.stopPropagation();
            onRowClick(params.row);
          }}
        >
          {params.value}
        </Typography>
      ),
    },
    {
      field: "orderId",
      headerName: "주문 ID",
      width: 120,
      valueGetter: (params) => {
        return params.row.order ? params.row.order.id : params.row.orderId || "";
      },
    },
    { field: "inspectedBy", headerName: "검수 담당자 ID", width: 140 },
    {
      field: "inspectionDate",
      headerName: "검수일",
      width: 200,
      valueGetter: (params) =>
        params.row.inspectionDate
          ? new Date(params.row.inspectionDate).toLocaleString()
          : "",
    },
    { field: "inspectionResult", headerName: "검수 결과", width: 130 },
  ];

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={data}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
      />
    </Box>
  );
};

export default InspectionGrid;
