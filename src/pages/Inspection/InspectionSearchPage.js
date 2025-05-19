// src/pages/Inspection/InspectionSearchPage.js
import React from "react";
import { Container, Typography } from "@mui/material";
import { InspectionContainer } from "../../components/Inspection/InspectionContainer";

const InspectionSearchPage = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>검수 관리</Typography>
      <InspectionContainer />
    </Container>
  );
};

export default InspectionSearchPage;
