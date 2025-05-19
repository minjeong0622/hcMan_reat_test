import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";

export const AttendanceSearch = ({ onSearch }) => {
  const [employeeName, setEmployeeName] = useState("");
  const [date, setDate] = useState("");

  const handleSearch = () => {
    const formattedDate = date.replace(/-/g, ""); // yyyyMMdd 형식으로 변환
    const searchCond = { employeeName, date: formattedDate }; // 객체로 묶음
    onSearch(searchCond); // 부모 컴포넌트로 전달
  };

  return (
    <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
      <TextField
        label="직원 이름"
        value={employeeName}
        onChange={(e) => setEmployeeName(e.target.value)}
      />
      <TextField
        label="날짜"
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        InputLabelProps={{ shrink: true }}
      />
      <Button variant="contained" onClick={handleSearch}>
        검색
      </Button>
    </Box>
  );
};
