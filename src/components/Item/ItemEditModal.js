// src/components/Item/ItemEditModal.js
import React, { useState, useEffect } from "react";
import { Modal, Box, TextField, Button, Typography, FormControl, InputLabel, Select, MenuItem } from "@mui/material";

export const ItemEditModal = ({ open, onClose, initialData, onSave, unitCodes }) => {
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    if (initialData) {
      setFormData({ ...initialData });
    } else {
      setFormData({ itemName: "", unitCode: "" });
    }
  }, [initialData]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (!formData) return;
    onSave(formData);
  };

  if (!formData) return null;

  return (
    <Modal open={open} onClose={onClose} disableEscapeKeyDown>
      <Box sx={{
        position: "absolute", top: "50%", left: "50%",
        transform: "translate(-50%, -50%)", width: 400,
        bgcolor: "background.paper", boxShadow: 24, p: 4, borderRadius: 2
      }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          품목 {formData.id ? "수정" : "등록"}
        </Typography>
        <TextField
          fullWidth
          label="품목명"
          margin="dense"
          value={formData.itemName}
          onChange={(e) => handleChange("itemName", e.target.value)}
        />
        <FormControl fullWidth margin="dense">
          <InputLabel>단위</InputLabel>
          <Select
            label="단위"
            value={formData.unitCode}
            onChange={(e) => handleChange("unitCode", e.target.value)}
          >
            {unitCodes.map((code) => (
              <MenuItem key={code.codeId} value={code.codeId}>
                {code.codeName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
          <Button variant="contained" onClick={handleSubmit}>저장</Button>
          <Button variant="outlined" onClick={onClose}>닫기</Button>
        </Box>
      </Box>
    </Modal>
  );
};
