// src/components/User/UserSearch.js
import React, { useState } from "react";
import { Box, TextField, Button, IconButton, InputAdornment } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

const UserSearch = ({ onSearch }) => {
  const [username, setUsername] = useState("");

  const handleSearch = () => {
    onSearch({ username });
  };

  return (
    <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
      <TextField
        label="사용자 이름"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        InputProps={{
          endAdornment: username && (
            <InputAdornment position="end">
              <IconButton onClick={() => setUsername("")} edge="end">
                <ClearIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <Button variant="contained" onClick={handleSearch}>
        검색
      </Button>
    </Box>
  );
};

export default UserSearch;
