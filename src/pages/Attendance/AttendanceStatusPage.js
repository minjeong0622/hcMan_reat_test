// src/pages/AttendanceStatusPage.js
import React from "react";
import { Container, Typography } from "@mui/material";

const AttendanceStatusPage = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        근태 현황
      </Typography>
      {/* 근태 현황 관련 컴포넌트나 내용 */}
    </Container>
  );
};

export default AttendanceStatusPage;
