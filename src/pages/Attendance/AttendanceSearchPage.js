import React from "react";
import { Container, Typography } from "@mui/material";
import { AttendanceContainer } from "../../components/Attendance/AttendanceContainer";

const AttendanceSearchPage = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>외근 신청 조회</Typography>
      <AttendanceContainer />
    </Container>
  );
};

export default AttendanceSearchPage;
