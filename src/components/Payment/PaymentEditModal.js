// src/components/Payment/PaymentEditModal.js
import React, { useState, useEffect } from "react";
import { Modal, Box, TextField, Button, Typography, CircularProgress } from "@mui/material";
import dayjs from "dayjs";

export const PaymentEditModal = ({ open, onClose, initialData, onSave }) => {
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        paymentDate: initialData.paymentDate
          ? dayjs(initialData.paymentDate).format("YYYY-MM-DD HH:mm")
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
      // read-only 필드(paymentDate, order)는 업데이트 요청에 포함하지 않습니다.
      onSave(formData);
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
      <Box sx={{ 
            position: "absolute", 
            top: "50%", 
            left: "50%", 
            transform: "translate(-50%, -50%)", 
            width: 500, 
            bgcolor: "background.paper", 
            boxShadow: 24, 
            p: 4, 
            borderRadius: 2 
          }}>
        <Typography variant="h6" sx={{ mb: 2 }}>결제 상세</Typography>
        <TextField fullWidth label="결제 ID" margin="dense" value={formData.id} InputProps={{ readOnly: true }} />
        <TextField 
          fullWidth 
          label="주문 ID" 
          margin="dense" 
          value={formData.order ? formData.order.id : ""} 
          InputProps={{ readOnly: true }} 
        />
        <TextField fullWidth label="결제일" margin="dense" value={formData.paymentDate} InputProps={{ readOnly: true }} />
        <TextField 
          fullWidth 
          label="결제 금액" 
          margin="dense" 
          value={formData.amount || ""} 
          onChange={(e) => handleChange("amount", e.target.value)} 
        />
        <TextField 
          fullWidth 
          label="결제 상태" 
          margin="dense" 
          value={formData.paymentStatus || ""} 
          onChange={(e) => handleChange("paymentStatus", e.target.value)} 
        />
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
          <Button variant="contained" color="primary" onClick={handleSave}>저장</Button>
          <Button variant="outlined" onClick={handleClose}>닫기</Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default PaymentEditModal;
