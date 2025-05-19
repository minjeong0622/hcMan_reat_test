// src/components/Partner/PartnerGrid.js
import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, Typography } from "@mui/material";

export const PartnerGrid = ({ data, onRowClick, onDelete }) => {
  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 90,
      renderCell: (params) => (
        <Typography
          sx={{
            color: "mediumpurple",
            fontWeight: "bold",
            cursor: "pointer",
            fontSize: "1rem",
            position: "relative", // 언더바 효과를 위한 설정
            transition: "all 0.2s",
            "&:hover": {
              fontSize: "1.3rem", // 확대 효과
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
          onClick={(event) => {
            event.stopPropagation(); // 체크박스 선택 방지
            onRowClick(params.row);
          }}
        >
          {params.value}
        </Typography>
      ),
    },
    { field: "partnerName", headerName: "거래처명", width: 150 },
    { field: "address", headerName: "주소", width: 200 },
    { field: "partnerType", headerName: "구분", width: 100 },
    {
      field: "actions",
      headerName: "액션",
      width: 150,
      renderCell: (params) => (
        <>
          <Button
            size="small"
            variant="contained"
            onClick={() => onRowClick(params.row)}
            sx={{ mr: 1 }}
          >
            수정
          </Button>
          <Button
            size="small"
            variant="outlined"
            color="error"
            onClick={() => onDelete(params.row.id)}
          >
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
        checkboxSelection
        disableSelectionOnClick
      />
    </Box>
  );
};
