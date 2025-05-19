// src/components/User/UserGrid.js
import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Typography } from "@mui/material";

const UserGrid = ({ data, onRowClick, selectedUserIds, setSelectedUserIds }) => {
  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 70,
      renderCell: (params) => (
        <Typography
          sx={{
            color: "blue",
            fontWeight: "bold",
            cursor: "pointer",
            transition: "all 0.2s",
            "&:hover": {
              fontSize: "1.2rem",
              textDecoration: "underline",
            },
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
    { field: "username", headerName: "사용자 이름", width: 200 },
    { field: "role", headerName: "역할", width: 150 },
  ];

  return (
    <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
        rows={data}
        columns={columns}
        checkboxSelection
        rowSelectionModel={selectedUserIds}
        onRowSelectionModelChange={(newSelection) => {
            console.log("Selected IDs:", newSelection);
            setSelectedUserIds(newSelection);
        }}
        getRowId={(row) => row.id}
        />
    </Box>
  );
};

export default UserGrid;
