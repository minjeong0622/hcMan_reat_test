// src/pages/Order/OrderSearchPage.js
import React from "react";
import { Box } from "@mui/material";
import { OrderContainer } from "../../components/Order/OrderContainer";

const OrderSearchPage = () => {
  return (
    // 100%로 확장 + overflow: hidden (상위 Layout에서 이미 스크롤 처리)
    <Box
      sx={{
        width: "100%",
        height: "100%",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <OrderContainer showRegistration={false} />
    </Box>
  );
};

export default OrderSearchPage;
