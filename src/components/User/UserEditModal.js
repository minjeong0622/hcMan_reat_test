// src/components/User/UserEditModal.js
import React, { useReducer, useEffect, useCallback } from "react";
import {
  Modal,
  Box,
  TextField,
  Button,
  Typography,
  CircularProgress,
} from "@mui/material";

const initialState = {
  formData: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_FORM_DATA":
      return { ...state, formData: action.payload };
    case "UPDATE_FIELD":
      return { 
        ...state, 
        formData: { ...state.formData, [action.field]: action.value } 
      };
    case "RESET":
      return initialState;
    default:
      return state;
  }
};

const UserEditModal = React.memo(({ open, onClose, initialData, onSave }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { formData } = state;

  useEffect(() => {
    if (initialData) {
      dispatch({ type: "SET_FORM_DATA", payload: initialData });
    }
  }, [initialData]);

  const handleFieldChange = useCallback((field, value) => {
    dispatch({ type: "UPDATE_FIELD", field, value });
  }, []);

  const handleClose = useCallback(() => {
    onClose();
    dispatch({ type: "RESET" });
  }, [onClose]);

  const handleSave = useCallback(() => {
    if (!formData) return;
    onSave(formData);
  }, [formData, onSave]);

  if (!formData) {
    return (
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <CircularProgress />
        </Box>
      </Modal>
    );
  }

  return (
    <Modal open={open} onClose={handleClose} disableEscapeKeyDown>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 500,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" sx={{ mb: 2 }}>
          사용자 수정
        </Typography>
        {/* 사용자 ID는 읽기 전용 */}
        <TextField
          fullWidth
          label="사용자 ID"
          margin="dense"
          value={formData.id}
          InputProps={{ readOnly: true }}
        />
        <TextField
          fullWidth
          label="사용자 이름"
          margin="dense"
          value={formData.username}
          onChange={(e) => handleFieldChange("username", e.target.value)}
        />
        <TextField
          fullWidth
          label="역할"
          margin="dense"
          value={formData.role}
          onChange={(e) => handleFieldChange("role", e.target.value)}
        />
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
          <Button variant="outlined" onClick={handleSave}>
            수정 내용 저장
          </Button>
          <Button variant="outlined" onClick={handleClose} sx={{ ml: 2 }}>
            닫기
          </Button>
        </Box>
      </Box>
    </Modal>
  );
});

export default UserEditModal;
