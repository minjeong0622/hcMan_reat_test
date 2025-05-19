// src/components/User/UserRegistrationForm.js
import React, { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import { createUser } from "../../services/userApi";

const UserRegistrationForm = ({ onRegistered = () => {} }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async () => {
    if (!username || !password || !role) {
      setError("모든 필드를 입력하세요.");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const newUser = { username, password, role };
      const response = await createUser(newUser);
      onRegistered(response);
      setUsername("");
      setPassword("");
      setRole("");
    } catch (err) {
      setError("등록 실패: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: 2, border: "1px solid #ddd", borderRadius: 2, mb: 2 }}>
      <Typography variant="h6" gutterBottom>
        신규 사용자 등록
      </Typography>
      <TextField
        label="사용자 이름"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="비밀번호"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="역할 (예: ROLE_ADMIN, ROLE_USER 등)"
        value={role}
        onChange={(e) => setRole(e.target.value)}
        fullWidth
        margin="normal"
      />
      {error && (
        <Typography color="error" variant="body2">
          {error}
        </Typography>
      )}
      <Button
        variant="contained"
        onClick={handleRegister}
        disabled={loading}
        sx={{ mt: 2 }}
      >
        {loading ? "등록중..." : "등록"}
      </Button>
    </Box>
  );
};

export default UserRegistrationForm;
