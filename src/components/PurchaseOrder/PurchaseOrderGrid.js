// src/components/PurchaseOrder/PurchaseOrderGrid.jsx
import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Typography } from "@mui/material";

const PurchaseOrderGrid = ({
  data,
  onPrimaryKeyClick,
  onRowClick,
  selectedIds,
  setSelectedIds,
}) => {
  const columns = [
    {
      field: "id",
      headerName: "발주ID",
      width: 80,
      headerAlign: "center",
      renderCell: (params) => (
        <Typography
          sx={{
            color: "mediumpurple",
            fontWeight: "bold",
            cursor: "pointer",
            "&:hover": { textDecoration: "underline" },
          }}
          onClick={(e) => {
            // 체크박스 이벤트와 충돌하지 않도록 이벤트 전파 중지
            e.stopPropagation();
            onPrimaryKeyClick(params.row);
          }}
        >
          {params.value}
        </Typography>
      ),
    },
    { field: "buyerId", headerName: "발주자ID", hide: true },
    { field: "buyerName", headerName: "발주자", width: 100, headerAlign: "center" },
    { field: "purchaseNo", headerName: "발주번호", width: 180, headerAlign: "center" },
    {
      field: "purchaseDate",
      headerName: "발주일",
      width: 160,
      headerAlign: "center",
      valueGetter: (params) =>
        params.row.purchaseDate ? new Date(params.row.purchaseDate).toLocaleString() : "",
    },
    { field: "supplierId", headerName: "발주처ID", hide: true },
    { field: "supplierName", headerName: "발주처", width: 120, headerAlign: "center" },
    {
      field: "dueDate",
      headerName: "납기일자",
      width: 120,
      headerAlign: "center",
      valueGetter: (params) =>
        params.row.dueDate ? new Date(params.row.dueDate).toLocaleDateString() : "",
    },
    { field: "itemCode", headerName: "품목코드", width: 100, headerAlign: "center" },
    { field: "itemName", headerName: "품목명", width: 120, headerAlign: "center" },
    { field: "unitCode", headerName: "단위", width: 60, headerAlign: "center" },
    { field: "quantity", headerName: "수량", width: 80, headerAlign: "center" },
    { field: "warehouseLocation", headerName: "입고장소", width: 120, headerAlign: "center" },
    { field: "note", headerName: "비고", width: 150, headerAlign: "center" },
    { field: "status", headerName: "상태", width: 100, headerAlign: "center" },
  ];

  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <DataGrid
        rows={data}
        columns={columns}
        getRowId={(row) => row.id}
        checkboxSelection
        selectionModel={selectedIds}
        // 최신 API prop를 사용하여 체크박스 선택 업데이트
        onRowSelectionModelChange={(newSelection) => {
          const convertedSelection = newSelection.map((id) => Number(id));
          console.log("선택된 ID (변환 후):", convertedSelection);
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

export default PurchaseOrderGrid;
