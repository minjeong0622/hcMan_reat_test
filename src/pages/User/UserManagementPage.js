// src/pages/User/UserManagementPage.js
import React from "react";
import { Container, Typography } from "@mui/material";
import UserManagementContainer from "../../components/User/UserManagementContainer";

const UserManagementPage = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        사용자 관리
      </Typography>
      <UserManagementContainer />
    </Container>
  );
};

export default UserManagementPage;
