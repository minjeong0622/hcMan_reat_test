// src/components/Shipment/ShipmentSearch.js
import React, { useState } from "react";
import { Box, TextField, Button, IconButton, InputAdornment } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

export const ShipmentSearch = ({ onSearch }) => {
  const [orderId, setOrderId] = useState("");
  const [trackingNumber, setTrackingNumber] = useState("");

  const handleSearch = () => {
    onSearch({
      orderId: orderId.trim(),
      trackingNumber: trackingNumber.trim(),
    });
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
      <TextField
        label="송장번호"
        value={trackingNumber}
        onChange={(e) => setTrackingNumber(e.target.value)}
        InputProps={{
          endAdornment: trackingNumber && (
            <InputAdornment position="end">
              <IconButton onClick={() => setTrackingNumber("")} edge="end">
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
