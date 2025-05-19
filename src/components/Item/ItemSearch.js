// src/components/Item/ItemSearch.js
import React, { useState } from "react";
import { Box, TextField, Button } from "@mui/material";

export const ItemSearch = ({ onSearch, onAdd }) => {
  const [itemName, setItemName] = useState("");

  const handleSearch = () => {
    onSearch({ itemName });
  };

  return (
    <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
      <TextField
        label="품목명"
        value={itemName}
        onChange={(e) => setItemName(e.target.value)}
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
