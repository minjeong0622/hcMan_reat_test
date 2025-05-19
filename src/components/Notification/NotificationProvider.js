// src/components/NotificationProvider.js
import React, { useState, useEffect } from "react";
import { Snackbar, Alert } from "@mui/material";
import { setNotifier } from "../../services/NotificationService";

const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "error",
  });

  useEffect(() => {
    // setNotifier에 알림을 띄울 함수를 등록
    setNotifier((message, severity = "error") => {
      setNotification({ open: true, message, severity });
    });
  }, []);

  const handleClose = () => {
    setNotification((prev) => ({ ...prev, open: false }));
  };

  return (
    <>
      {children}
      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity={notification.severity} variant="filled">
          {notification.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default NotificationProvider;
