// src/components/Item/ItemGrid.js
import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button } from "@mui/material";

export const ItemGrid = ({ data, onRowClick, onDelete }) => {
  const columns = [
    { field: "id", headerName: "품목ID", width: 90 },
    { field: "itemName", headerName: "품목명", width: 150 },
    {
      field: "unitCode",
      headerName: "단위",
      width: 120,
      renderCell: (params) => <span>{params.value}</span>,
    },
    {
      field: "actions",
      headerName: "액션",
      width: 150,
      renderCell: (params) => (
        <>
          <Button variant="contained" size="small" onClick={() => onRowClick(params.row)} sx={{ mr: 1 }}>
            수정
          </Button>
          <Button variant="outlined" color="error" size="small" onClick={() => onDelete(params.row.id)}>
            삭제
          </Button>
        </>
      ),
    },
  ];

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={data}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
      />
    </Box>
  );
};
