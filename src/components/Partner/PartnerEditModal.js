// src/components/Partner/PartnerEditModal.js
import React, { useState, useEffect } from "react";
import { Modal, Box, TextField, Button, Typography } from "@mui/material";

export const PartnerEditModal = ({ open, onClose, initialData, onSave }) => {
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    if (initialData) {
      setFormData({ ...initialData });
    } else {
      setFormData(null);
    }
  }, [initialData]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (!formData) return;
    onSave(formData);
  };

  if (!formData) {
    return null;
  }

  return (
    <Modal open={open} onClose={onClose} disableEscapeKeyDown>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" sx={{ mb: 2 }}>
          거래처 {formData.id ? "수정" : "등록"}
        </Typography>
        <TextField
          fullWidth
          label="거래처명"
          margin="dense"
          value={formData.partnerName || ""}
          onChange={(e) => handleChange("partnerName", e.target.value)}
        />
        <TextField
          fullWidth
          label="주소"
          margin="dense"
          value={formData.address || ""}
          onChange={(e) => handleChange("address", e.target.value)}
        />
        <TextField
          fullWidth
          label="구분 (매입/매출)"
          margin="dense"
          value={formData.partnerType || ""}
          onChange={(e) => handleChange("partnerType", e.target.value)}
        />
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
          <Button variant="contained" onClick={handleSubmit}>
            저장
          </Button>
          <Button variant="outlined" onClick={onClose}>
            닫기
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
