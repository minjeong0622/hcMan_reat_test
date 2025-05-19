// src/components/User/UserSearchModal.js
import React, { useState, useEffect, useCallback } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  IconButton,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Button,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import { searchUsers } from "../../services/userApi";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

const UserSearchModal = ({
  open,
  onClose,
  onSelect,
  searchQuery = "",
  placeholder = "사용자 검색",
}) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // 검색어가 빈값이어도 백엔드 API를 호출하도록 변경
  const handleSearch = useCallback(async () => {
    setLoading(true);
    try {
      const filteredUsers = await searchUsers(query);
      setResults(filteredUsers);
    } catch (err) {
      console.error("검색 오류:", err);
    } finally {
      setLoading(false);
    }
  }, [query]);

  // 모달 열릴 때, 전달받은 검색어로 내부 상태 초기화 후 즉시 검색 실행
  useEffect(() => {
    if (open) {
      setQuery(searchQuery); // buyerId나 buyerName 등 전달된 값 그대로 사용
      setResults([]);
      // 전달된 값이 빈값이어도 조회 (전체조회)하도록 함
      (async () => {
        setLoading(true);
        try {
          const filteredUsers = await searchUsers(searchQuery);
          setResults(filteredUsers);
        } catch (err) {
          console.error("초기 검색 오류:", err);
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [open, searchQuery]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h6" gutterBottom>
          {placeholder}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <TextField
            fullWidth
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="검색어 입력 후 Enter"
          />
          <IconButton onClick={handleSearch}>
            <SearchIcon />
          </IconButton>
          {query !== null && (
            <IconButton
              onClick={() => {
                setQuery("");
                setResults([]);
              }}
            >
              <ClearIcon />
            </IconButton>
          )}
        </Box>

        {loading ? (
          <CircularProgress />
        ) : (
          <List>
            {results.length > 0 ? (
              results.map((item) => (
                <ListItem
                  button
                  key={item.id}
                  onClick={() => onSelect(item)}
                  onDoubleClick={() => onSelect(item)}
                >
                  <ListItemText primary={`${item.username} (ID: ${item.id})`} />
                </ListItem>
              ))
            ) : (
              <Typography variant="body2" color="textSecondary">
                검색 결과가 없습니다.
              </Typography>
            )}
          </List>
        )}

        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
          <Button variant="outlined" onClick={onClose}>
            닫기
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default UserSearchModal;
