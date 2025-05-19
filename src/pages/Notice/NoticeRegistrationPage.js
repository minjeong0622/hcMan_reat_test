import React from "react";
import { Container, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import NoticeRegistrationForm from "../../components/Notice/NoticeRegistrationForm";

const NoticeRegistrationPage = () => {
  const location = useLocation();
  const formKey = location.state && location.state.mode === "edit" 
    ? `edit-${location.state.id}` 
    : "new";
    
  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        공지사항 {location.state && location.state.mode === "edit" ? "수정" : "등록"}
      </Typography>
      <NoticeRegistrationForm key={formKey} />
    </Container>
  );
};

export default NoticeRegistrationPage;
