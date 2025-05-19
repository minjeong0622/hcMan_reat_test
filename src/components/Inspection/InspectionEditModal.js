// src/components/Inspection/InspectionEditModal.js
import React, { useState, useEffect } from "react";
import { Modal, Box, TextField, Button, Typography, CircularProgress } from "@mui/material";
import dayjs from "dayjs";

export const InspectionEditModal = ({ open, onClose, initialData, onSave }) => {
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        orderId: initialData.order ? initialData.order.id : initialData.orderId,
        inspectionDate: initialData.inspectionDate
          ? dayjs(initialData.inspectionDate).format("YYYY-MM-DD HH:mm")
          : "",
      });
    }
  }, [initialData]);

  const handleChange = (field, value) => {
    if (!formData) return;
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    if (formData) {
      const { id, orderId, inspectedBy, inspectionResult } = formData;
      onSave({ id, orderId, inspectedBy, inspectionResult });
    }
  };

  const handleClose = () => {
    onClose();
    setFormData(null);
  };

  if (!formData) {
    return (
      <Modal open={open} onClose={handleClose}>
        <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
          <CircularProgress />
        </Box>
      </Modal>
    );
  }

  return (
    <Modal open={open} onClose={handleClose} disableEscapeKeyDown>
      <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 500, bgcolor: "background.paper", boxShadow: 24, p: 4, borderRadius: 2 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>검수 상세</Typography>
        <TextField fullWidth label="검수 ID" margin="dense" value={formData.id} InputProps={{ readOnly: true }} />
        <TextField fullWidth label="주문 ID" margin="dense" value={formData.orderId} InputProps={{ readOnly: true }} />
        <TextField fullWidth label="검수 담당자 ID" margin="dense" value={formData.inspectedBy || ""} onChange={(e) => handleChange("inspectedBy", e.target.value)} />
        <TextField fullWidth label="검수일" margin="dense" value={formData.inspectionDate} InputProps={{ readOnly: true }} />
        <TextField fullWidth label="검수 결과" margin="dense" value={formData.inspectionResult || ""} onChange={(e) => handleChange("inspectionResult", e.target.value)} />
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
          <Button variant="contained" color="primary" onClick={handleSave}>저장</Button>
          <Button variant="outlined" onClick={handleClose}>닫기</Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default InspectionEditModal;
