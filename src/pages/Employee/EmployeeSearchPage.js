import React from "react";
import { Container, Typography } from "@mui/material";
// import { useGlobalState } from "../../context/GlobalContext"; // 공용 Context 사용

const EmployeeSearchPage = () => {
  // const { employeeData, setEmployeeData } = useGlobalState();

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        직원 조회
      </Typography>
      {/* 직원 조회 관련 컴포넌트 및 employeeData 활용 */}
    </Container>
  );
};

export default EmployeeSearchPage;
