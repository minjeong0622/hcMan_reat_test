// src/components/Item/ItemSearchModal.js
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
import { searchItems } from "../../services/itemApi"; // 품목 검색 API 호출

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

const ItemSearchModal = ({
  open,
  onClose,
  onSelect,
  searchQuery = "",
  placeholder = "품목 검색",
}) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // 검색어가 빈값이어도 API 호출하도록 처리
  const handleSearch = useCallback(async () => {
    setLoading(true);
    try {
      const filteredItems = await searchItems(query);
      setResults(filteredItems);
    } catch (error) {
      console.error("Item 검색 오류:", error);
    } finally {
      setLoading(false);
    }
  }, [query]);

  useEffect(() => {
    if (open) {
      setQuery(searchQuery);
      setResults([]);
      (async () => {
        setLoading(true);
        try {
          const filteredItems = await searchItems(searchQuery);
          setResults(filteredItems);
        } catch (error) {
          console.error("초기 Item 검색 오류:", error);
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
          {query && (
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
                  <ListItemText primary={`${item.itemName} (ID: ${item.id})`} />
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

export default ItemSearchModal;
