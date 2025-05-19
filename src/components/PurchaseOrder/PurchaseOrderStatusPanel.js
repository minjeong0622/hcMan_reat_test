import React from "react";
import { Box, Typography } from "@mui/material";
import PurchaseOrderProcessStepper from "./PurchaseOrderProcessStepper";

const PurchaseOrderStatusPanel = ({ purchaseOrder }) => {
  if (!purchaseOrder) {
    return (
      <Box sx={{ p: 2 }}>
        <Typography variant="body2" color="text.secondary">
          발주를 선택해주세요.
        </Typography>
      </Box>
    );
  }

  const isCanceled = purchaseOrder.status === "CANCELED";
  const lastStatus = isCanceled ? purchaseOrder.preCancelStatus : null;

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        진행 현황
      </Typography>
      <PurchaseOrderProcessStepper
        status={purchaseOrder.status}
        isCanceled={isCanceled}
        lastStatus={lastStatus}
      />
    </Box>
  );
};

export default PurchaseOrderStatusPanel;
