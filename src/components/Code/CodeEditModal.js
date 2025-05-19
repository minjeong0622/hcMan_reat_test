// src/components/Code/CodeEditModal.js
import React, { useState, useEffect } from "react";
import { Modal, Box, TextField, Button, Typography } from "@mui/material";

export const CodeEditModal = ({ open, onClose, initialData, onSave }) => {
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    if (initialData) {
      setFormData({ ...initialData });
    } else {
      setFormData({ codeId: "", parentCode: "", codeName: "", useYn: "Y" });
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
          공통코드 {formData.codeId ? "수정" : "등록"}
        </Typography>
        <TextField
          fullWidth
          label="코드ID"
          margin="dense"
          value={formData.codeId}
          onChange={(e) => handleChange("codeId", e.target.value)}
          disabled={!!formData.codeId}
        />
        <TextField
          fullWidth
          label="상위코드"
          margin="dense"
          value={formData.parentCode}
          onChange={(e) => handleChange("parentCode", e.target.value)}
        />
        <TextField
          fullWidth
          label="코드명"
          margin="dense"
          value={formData.codeName}
          onChange={(e) => handleChange("codeName", e.target.value)}
        />
        <TextField
          fullWidth
          label="사용여부 (Y/N)"
          margin="dense"
          value={formData.useYn}
          onChange={(e) => handleChange("useYn", e.target.value)}
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
