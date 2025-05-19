import React from "react";
import { Container, Typography, Paper, Box } from "@mui/material";

const HomePage = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Paper sx={{ p: 4, textAlign: "center" }}>
        <Typography variant="h4" component="h1" gutterBottom>
          hcMan 시스템에 오신 것을 환영합니다!
        </Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          좌측 메뉴에서 원하는 기능을 선택하여 업무를 시작하세요.
        </Typography>
      </Paper>

      {/* 추가적인 대시보드 요소 예시 */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>📊 주요 업무 요약</Typography>
        <Typography variant="body1">오늘 출근한 직원 수: 120명</Typography>
        <Typography variant="body1">진행 중인 외근 신청: 15건</Typography>
      </Box>
    </Container>
  );
};

export default HomePage;
