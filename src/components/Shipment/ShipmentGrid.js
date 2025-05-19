// src/components/Shipment/ShipmentGrid.js
import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Typography } from "@mui/material";

export const ShipmentGrid = ({ data, onRowClick }) => {
  const columns = [
    {
      field: "id",
      headerName: "출고 ID",
      width: 90,
      renderCell: (params) => (
        <Typography
          sx={{
            color: "mediumpurple",
            fontWeight: "bold",
            cursor: "pointer",
            position: "relative",
            transition: "all 0.2s",
            "&:hover": {
              fontSize: "1.2rem",
              "&::after": {
                content: '""',
                position: "absolute",
                bottom: -2,
                left: 0,
                width: "100%",
                height: "2px",
                backgroundColor: "mediumpurple",
              },
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
    { field: "orderId", 
      headerName: "주문 ID", 
      width: 120, 
      valueGetter: (params) => params.row.order ? params.row.order.id : "" },
    {
      field: "shippedDate",
      headerName: "출고일",
      width: 200,
      valueGetter: (params) =>
        params.row.shippedDate
          ? new Date(params.row.shippedDate).toLocaleString()
          : "",
    },
    { field: "trackingNumber", headerName: "송장번호", width: 150 },
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
