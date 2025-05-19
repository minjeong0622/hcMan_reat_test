// src/pages/Payment/PaymentSearchPage.js
import React from "react";
import { Container, Typography } from "@mui/material";
import { PaymentContainer } from "../../components/Payment/PaymentContainer";

const PaymentSearchPage = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>결제 관리</Typography>
      <PaymentContainer />
    </Container>
  );
};

export default PaymentSearchPage;
