// src/components/User/UserRegistrationModal.js
import React, { useState } from "react";
import { Modal, Box, Button, Typography } from "@mui/material";
import UserRegistrationForm from "./UserRegistrationForm";

const UserRegistrationModal = ({ onRegistered = () => {} }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button variant="contained" onClick={handleOpen}>
        사용자 등록
      </Button>
      <Modal open={open} onClose={handleClose}>
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
            신규 사용자 등록
          </Typography>
          <UserRegistrationForm
            onRegistered={(newUser) => {
              onRegistered(newUser);
              handleClose();
            }}
          />
          <Button variant="outlined" onClick={handleClose} sx={{ mt: 2 }}>
            닫기
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default UserRegistrationModal;
