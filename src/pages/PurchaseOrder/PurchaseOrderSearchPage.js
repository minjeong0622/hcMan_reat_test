// src/pages/PurchaseOrder/PurchaseOrderSearchPage.jsx
import React from "react";
import { Box } from "@mui/material";
import PurchaseOrderContainer from "../../components/PurchaseOrder/PurchaseOrderContainer";

const PurchaseOrderSearchPage = () => {
  return (
    <Box sx={{ width: "100%", height: "100%", overflow: "hidden" }}>
      <PurchaseOrderContainer />
    </Box>
  );
};

export default PurchaseOrderSearchPage;
