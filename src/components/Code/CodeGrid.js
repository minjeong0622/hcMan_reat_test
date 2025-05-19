// src/components/Code/CodeGrid.js
import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material";

export const CodeGrid = ({ data, onRowClick }) => {
  const columns = [
    { field: "codeId", headerName: "코드ID", width: 120 },
    { field: "parentCode", headerName: "상위코드", width: 120 },
    { field: "codeName", headerName: "코드명", width: 150 },
    { field: "useYn", headerName: "사용여부", width: 80 },
  ];

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={data}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        getRowId={(row) => row.codeId}
        disableSelectionOnClick
        onRowClick={(params) => onRowClick(params.row)}
      />
    </Box>
  );
};
