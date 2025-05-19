// src/pages/Partner/PartnerSearchPage.js
import React from "react";
import { Container, Typography } from "@mui/material";
import { PartnerContainer } from "../../components/Partner/PartnerContainer";

const PartnerSearchPage = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>거래처 관리</Typography>
      <PartnerContainer />
    </Container>
  );
};

export default PartnerSearchPage;
