// src/pages/Code/CodeManagementPage.js
import React from "react";
import { Container, Typography } from "@mui/material";
import { CodeContainer } from "../../components/Code/CodeContainer";

const CodeManagementPage = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>공통코드 관리</Typography>
      <CodeContainer />
    </Container>
  );
};

export default CodeManagementPage;
