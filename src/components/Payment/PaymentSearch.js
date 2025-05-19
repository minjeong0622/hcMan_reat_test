// src/components/Payment/PaymentSearch.js
import React, { useState } from "react";
import { Box, TextField, Button, IconButton, InputAdornment } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

export const PaymentSearch = ({ onSearch }) => {
  const [orderId, setOrderId] = useState("");

  const handleSearch = () => {
    const params = {};
    if (orderId.trim() !== "") {
      params.orderId = orderId.trim();
    }
    onSearch(params);
  };

  return (
    <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
      <TextField
        label="주문 ID"
        value={orderId}
        onChange={(e) => setOrderId(e.target.value)}
        InputProps={{
          endAdornment: orderId && (
            <InputAdornment position="end">
              <IconButton onClick={() => setOrderId("")} edge="end">
                <ClearIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <Button variant="contained" onClick={handleSearch}>
        검색
      </Button>
    </Box>
  );
};

export default PaymentSearch;
