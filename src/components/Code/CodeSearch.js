// src/components/Code/CodeSearch.js
import React from "react";
import { Box, TextField, Button } from "@mui/material";

export const CodeSearch = ({ parent, onSearch, onAdd }) => {
  return (
    <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
      <TextField
        label="상위코드"
        value={parent}
        onChange={(e) => onSearch(e.target.value)}
      />
      <Button variant="contained" onClick={() => onSearch(parent)}>
        조회
      </Button>
      <Button variant="outlined" onClick={onAdd}>
        신규 등록
      </Button>
    </Box>
  );
};
