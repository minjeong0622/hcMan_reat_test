// src/components/Order/OrderGrid.jsx
import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Typography } from "@mui/material";

const OrderGrid = ({
  data,
  onPrimaryKeyClick,
  onRowClick,
  setSelectedOrderIds,
  selectedOrderIds,
}) => {
  const columns = [
    {
      field: "id",
      headerName: "발주 ID",
      width: 90,
      headerAlign: "center", // 헤더 텍스트 중앙 정렬
      renderCell: (params) => (
        <Typography
          sx={{
            color: "mediumpurple",
            fontWeight: "bold",
            cursor: "pointer",
            position: "relative",
            transition: "all 0.2s",
            fontSize: "0.875rem",
            "&:hover": {
              fontSize: "0.95rem",
              "&::after": {
                content: '""',
                position: "absolute",
                left: 0,
                bottom: -2,
                width: "100%",
                height: "2px",
                backgroundColor: "mediumpurple",
              },
            },
          }}
          onClick={(e) => {
            e.stopPropagation();
            onPrimaryKeyClick(params.row);
          }}
        >
          {params.value}
        </Typography>
      ),
    },
    { field: "buyerId", headerName: "발주자 ID", hide: true },
    {
      field: "buyerName",
      headerName: "발주자",
      width: 100,
      headerAlign: "center",
    },
    {
      field: "orderNo",
      headerName: "발주번호",
      width: 200,
      headerAlign: "center",
    },
    {
      field: "orderDate",
      headerName: "발주일",
      width: 180,
      headerAlign: "center",
      valueGetter: (params) =>
        params.row.orderDate
          ? new Date(params.row.orderDate).toLocaleString()
          : "",
    },
    { field: "supplierId", headerName: "발주처 ID", hide: true },
    {
      field: "supplierName",
      headerName: "발주처",
      width: 120,
      headerAlign: "center",
    },
    {
      field: "dueDate",
      headerName: "납기일자",
      width: 120,
      headerAlign: "center",
      valueGetter: (params) =>
        params.row.dueDate
          ? new Date(params.row.dueDate).toLocaleDateString()
          : "",
    },
    {
      field: "warehouseLocation",
      headerName: "입고장소",
      width: 120,
      headerAlign: "center",
    },
    {
      field: "note",
      headerName: "비고",
      width: 150,
      headerAlign: "center",
    },
    {
      field: "status",
      headerName: "상태",
      width: 100,
      headerAlign: "center",
    },
  ];

  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <DataGrid
        rows={data}
        columns={columns}
        getRowId={(row) => row.id}
        pageSize={5}
        rowsPerPageOptions={[5, 10, 20]}
        checkboxSelection
        disableRowSelectionOnClick
        selectionModel={selectedOrderIds}
        autoHeight={false}
        pagination
        rowHeight={30}       // 행 높이 조정
        headerHeight={10}    // 헤더 높이 (필요시 조정)
        initialState={{
          columns: {
            columnVisibilityModel: {
              buyerId: false,
              supplierId: false,
            },
          },
        }}
        sx={{
          "& .MuiDataGrid-columnHeaders": {
            minHeight: "0px !important",
            maxHeight: "30px !important",
            height: "30px !important",
            padding: 0,
            borderRight: "1px solid rgba(224,224,224,1)",
            backgroundColor: "#f5f5f5", // 헤더 배경색 지정
          },
          "& .MuiDataGrid-columnHeader": {
            minHeight: "0px !important",
            maxHeight: "30px !important",
            height: "30px !important",
            padding: 0,
            borderRight: "1px solid rgba(224,224,224,1)",
            backgroundColor: "#f5f5f5", // 헤더 배경색 지정
          },
          "& .MuiDataGrid-cell": {
            borderRight: "1px solid rgba(224,224,224,1)",
            py: 0.5,
          },
          "& .MuiDataGrid-row": {
            borderBottom: "1px solid rgba(224,224,224,1)",
          },
        }}
        onCellClick={(params) => {
          if (params.field !== "id") {
            onRowClick(params.row);
          }
        }}
        onRowSelectionModelChange={(newSelection) => {
          setSelectedOrderIds(newSelection.map((id) => Number(id)));
        }}
      />
    </Box>
  );
};

export default OrderGrid;
