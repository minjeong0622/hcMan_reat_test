// src/pages/Shipment/ShipmentSearchPage.js
import React from "react";
import { Container, Typography } from "@mui/material";
import { ShipmentContainer } from "../../components/Shipment/ShipmentContainer";

const ShipmentSearchPage = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>출고/배송 관리</Typography>
      <ShipmentContainer />
    </Container>
  );
};

export default ShipmentSearchPage;
