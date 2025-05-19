// src/components/Payment/PaymentGrid.js
import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Typography } from "@mui/material";

export const PaymentGrid = ({ data, onRowClick }) => {
  const columns = [
    {
      field: "id",
      headerName: "결제 ID",
      width: 90,
      renderCell: (params) => (
        <Typography
          sx={{
            color: "darkgreen",
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
                backgroundColor: "darkgreen",
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
    {
      field: "orderId",
      headerName: "주문 ID",
      width: 120,
      valueGetter: (params) =>
        params.row.order ? params.row.order.id : ""
    },
    {
      field: "paymentDate",
      headerName: "결제일",
      width: 200,
      valueGetter: (params) =>
        params.row.paymentDate
          ? new Date(params.row.paymentDate).toLocaleString()
          : "",
    },
    { field: "amount", headerName: "결제 금액", width: 120 },
    { field: "paymentStatus", headerName: "결제 상태", width: 120 },
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

export default PaymentGrid;
