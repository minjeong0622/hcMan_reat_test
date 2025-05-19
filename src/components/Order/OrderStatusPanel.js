import React from "react";
import { Box, Typography } from "@mui/material";
import OrderProcessStepper from "./OrderProcessStepper";

const OrderStatusPanel = ({ order }) => {
  if (!order) {
    return (
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ display: "flex", alignItems: "center", height: "100%" }}
      >
        주문을 선택해주세요.
      </Typography>
    );
  }

  const isCanceled = order.status === "CANCELED";
  const lastStatus = isCanceled ? order.preCancelStatus : null;

  return (
    <Box
      sx={{
        borderLeft: "1px solid #ddd",
        borderRadius: 1,
        p: 2,
      }}
    >
      <Typography variant="h6" sx={{ mb: 2 }}>
        주문 진행 현황
      </Typography>
      <OrderProcessStepper status={order.status} isCanceled={isCanceled} lastStatus={lastStatus} />
    </Box>
  );
};

export default OrderStatusPanel;
