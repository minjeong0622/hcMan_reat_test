// src/components/Partner/PartnerSearch.js
import React, { useState } from "react";
import { Box, TextField, Button } from "@mui/material";

export const PartnerSearch = ({ onSearch, onAdd }) => {
  const [partnerName, setPartnerName] = useState("");

  const handleSearch = () => {
    onSearch({ partnerName });
  };

  return (
    <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
      <TextField
        label="거래처명"
        value={partnerName}
        onChange={(e) => setPartnerName(e.target.value)}
      />
      <Button variant="contained" onClick={handleSearch}>
        검색
      </Button>
      <Button variant="outlined" onClick={onAdd}>
        신규 등록
      </Button>
    </Box>
  );
};
