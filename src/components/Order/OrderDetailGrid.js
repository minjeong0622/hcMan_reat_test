// src/components/Order/OrderDetailGrid.jsx
import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material";

const OrderDetailGrid = ({ items }) => {
  const columns = [
    { field: "id", headerName: "발주품목ID", width: 110, headerAlign: "center" },
    { field: "itemCategory", headerName: "품목구분", width: 100, headerAlign: "center" },
    { field: "itemCode", headerName: "품목코드", width: 100, headerAlign: "center" },
    { field: "itemName", headerName: "품목명", width: 120, headerAlign: "center" },
    { field: "unitCode", headerName: "단위", width: 80, headerAlign: "center" },
    { field: "orderQuantity", headerName: "발주수량", width: 100, headerAlign: "center" },
  ];

  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <DataGrid
        rows={items}
        columns={columns}
        getRowId={(row) => row.id || Math.random()}
        pageSize={5}
        rowsPerPageOptions={[5, 10]}
        disableRowSelectionOnClick
        autoHeight={false}
        pagination
        rowHeight={25}  // 셀 높이를 25px로 조정
        headerHeight={30} // 헤더 높이 조정
        sx={{
          "& .MuiDataGrid-columnHeaders": {
            minHeight: "0px !important",
            maxHeight: "30px !important",
            height: "30px !important",
            padding: 0,
            backgroundColor: "#f5f5f5", // 헤더 배경색 지정
            borderRight: "1px solid rgba(224,224,224,1)",
          },
          "& .MuiDataGrid-columnHeader": {
            minHeight: "0px !important",
            maxHeight: "30px !important",
            height: "30px !important",
            padding: 0.5,
            borderRight: "1px solid rgba(224,224,224,1)",
          },
          "& .MuiDataGrid-cell": {
            borderRight: "1px solid rgba(224,224,224,1)",
            py: 0.5,
          },
          "& .MuiDataGrid-row": {
            borderBottom: "1px solid rgba(224,224,224,1)",
          },
        }}
      />
    </Box>
  );
};

export default OrderDetailGrid;
