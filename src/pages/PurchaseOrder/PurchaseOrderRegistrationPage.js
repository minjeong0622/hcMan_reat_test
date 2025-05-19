// src/pages/PurchaseOrder/PurchaseOrderRegistrationPage.jsx
import React from "react";
import { Container, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import PurchaseOrderRegistrationForm from "../../components/PurchaseOrder/PurchaseOrderRegistrationForm";

const PurchaseOrderRegistrationPage = () => {
  const location = useLocation();
  const initialData =
    location.state && location.state.mode === "edit"
      ? { mode: "edit", id: location.state.id }
      : null;
  const formKey = initialData ? `edit-${initialData.id}` : "new";

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        {/* 제목은 폼 내부에서 결정 */}
      </Typography>
      <PurchaseOrderRegistrationForm key={formKey} />
    </Container>
  );
};

export default PurchaseOrderRegistrationPage;
