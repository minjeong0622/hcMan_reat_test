import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Typography } from "@mui/material";

export const AttendanceGrid = ({ data, onRowClick }) => {
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
            position: "relative", // 🔹 언더바 효과를 위한 설정
            "&:hover": {
              fontSize: "1.3rem", // 🔹 즉시 확대
              "&::after": {
                content: '""',
                position: "absolute",
                left: 0,
                bottom: -2,
                width: "100%",
                height: "2px",
                backgroundColor: "mediumpurple", // 🔹 언더바 색상
              },
            },
          }}
          onClick={(event) => {
            event.stopPropagation(); // 🔹 체크박스 선택 방지
            onRowClick(params.row);
          }}
        >
          {params.value}
        </Typography>
      ),
    },
    { field: "employeeName", headerName: "직원명", width: 130 },
    { field: "departmentName", headerName: "부서명", width: 130 },
    { field: "positionName", headerName: "직급", width: 130 },
    {
      field: "date",
      headerName: "날짜",
      width: 130,
      valueGetter: (params) => {
        return params.row.date
          ? params.row.date.substring(0, 4) +
              "-" +
              params.row.date.substring(4, 6) +
              "-" +
              params.row.date.substring(6, 8)
          : "";
      },
    },
    {
      field: "startTime",
      headerName: "시작 시간",
      width: 130,
      valueGetter: (params) =>
        params.row.startHourStr && params.row.startMinuteStr
          ? `${params.row.startHourStr.padStart(2, "0")}:${params.row.startMinuteStr.padStart(2, "0")}`
          : "",
    },
    {
      field: "endTime",
      headerName: "종료 시간",
      width: 130,
      valueGetter: (params) =>
        params.row.endHourStr && params.row.endMinuteStr
          ? `${params.row.endHourStr.padStart(2, "0")}:${params.row.endMinuteStr.padStart(2, "0")}`
          : "",
    },
    { field: "in01", headerName: "업무 내용", width: 130 },
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
