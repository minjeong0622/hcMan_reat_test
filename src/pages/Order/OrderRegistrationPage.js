// src/pages/Order/OrderRegistrationPage.jsx
import React from "react";
import { Container, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import OrderRegistrationForm from "../../components/Order/OrderRegistrationForm";

const OrderRegistrationPage = () => {
  const location = useLocation();
  // 편집 모드 여부
  const initialData =
    location.state && location.state.mode === "edit"
      ? { mode: "edit", id: location.state.id }
      : null;

  const formKey = initialData ? `edit-${initialData.id}` : "new";

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        {/* {initialData ? "발주 수정" : "발주 등록"} */}
      </Typography>
      <OrderRegistrationForm key={formKey} initialData={initialData} />
    </Container>
  );
};

export default OrderRegistrationPage;
