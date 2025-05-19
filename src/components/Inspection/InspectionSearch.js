// src/components/Inspection/InspectionSearch.js
import React, { useState } from "react";
import { Box, TextField, Button, IconButton, InputAdornment } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

export const InspectionSearch = ({ onSearch }) => {
  const [orderId, setOrderId] = useState("");
  const [inspectedBy, setInspectedBy] = useState("");

  const handleSearch = () => {
    onSearch({
      orderId: orderId.trim(),
      inspectedBy: inspectedBy.trim(),
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
        label="검수 담당자 ID"
        value={inspectedBy}
        onChange={(e) => setInspectedBy(e.target.value)}
        InputProps={{
          endAdornment: inspectedBy && (
            <InputAdornment position="end">
              <IconButton onClick={() => setInspectedBy("")} edge="end">
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

export default InspectionSearch;
