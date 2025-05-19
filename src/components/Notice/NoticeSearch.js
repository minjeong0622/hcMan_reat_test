// src/components/Notice/NoticeSearch.jsx
import React, { useState } from "react";
import {
  Stack,
  TextField,
  Button,
  Select,
  MenuItem,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Typography,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { format } from "date-fns";

const NoticeSearch = ({ onSearch }) => {
  const [searchCond, setSearchCond] = useState({
    title: "",
    author: "",
    startDate: "",
    endDate: "",
    banner: "",
  });

  const handleQuickSelect = (range) => {
    const today = new Date();
    const endDate = format(today, "yyyy-MM-dd");
    let startDate = "";
    if (range === "today") {
      startDate = endDate;
    } else if (range === "last7") {
      const d = new Date();
      d.setDate(d.getDate() - 6);
      startDate = format(d, "yyyy-MM-dd");
    } else if (range === "last30") {
      const d = new Date();
      d.setDate(d.getDate() - 29);
      startDate = format(d, "yyyy-MM-dd");
    }
    setSearchCond((prev) => ({ ...prev, startDate, endDate }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchCond);
  };

  return (
    <form onSubmit={handleSearch}>
      <Stack direction="row" spacing={2} alignItems="center">
        {/* 제목 */}
        <Stack direction="row" alignItems="center" spacing={1}>
          <Typography variant="body2" sx={{ fontSize: "0.8rem" }}>
            제목
          </Typography>
          <OutlinedInput
            size="small"
            value={searchCond.title}
            onChange={(e) =>
              setSearchCond((prev) => ({ ...prev, title: e.target.value }))
            }
            placeholder="제목"
            sx={{ width: 200, fontSize: "0.8rem" }}
          />
        </Stack>
        {/* 작성자 */}
        <Stack direction="row" alignItems="center" spacing={1}>
          <Typography variant="body2" sx={{ fontSize: "0.8rem" }}>
            작성자
          </Typography>
          <OutlinedInput
            size="small"
            value={searchCond.author}
            onChange={(e) =>
              setSearchCond((prev) => ({ ...prev, author: e.target.value }))
            }
            placeholder="작성자"
            sx={{ width: 150, fontSize: "0.8rem" }}
          />
        </Stack>
        {/* 시작일 */}
        <Stack direction="row" alignItems="center" spacing={1}>
          <Typography variant="body2" sx={{ fontSize: "0.8rem" }}>
            시작일
          </Typography>
          <OutlinedInput
            type="date"
            size="small"
            value={searchCond.startDate}
            onChange={(e) =>
              setSearchCond((prev) => ({ ...prev, startDate: e.target.value }))
            }
            InputLabelProps={{ shrink: true }}
            sx={{ width: 130, fontSize: "0.8rem" }}
            endAdornment={
              searchCond.startDate && (
                <InputAdornment position="end">
                  <IconButton
                    size="small"
                    onClick={() =>
                      setSearchCond((prev) => ({ ...prev, startDate: "" }))
                    }
                  >
                    <ClearIcon fontSize="small" />
                  </IconButton>
                </InputAdornment>
              )
            }
          />
        </Stack>
        {/* 종료일 */}
        <Stack direction="row" alignItems="center" spacing={1}>
          <Typography variant="body2" sx={{ fontSize: "0.8rem" }}>
            종료일
          </Typography>
          <OutlinedInput
            type="date"
            size="small"
            value={searchCond.endDate}
            onChange={(e) =>
              setSearchCond((prev) => ({ ...prev, endDate: e.target.value }))
            }
            InputLabelProps={{ shrink: true }}
            sx={{ width: 130, fontSize: "0.8rem" }}
            endAdornment={
              searchCond.endDate && (
                <InputAdornment position="end">
                  <IconButton
                    size="small"
                    onClick={() =>
                      setSearchCond((prev) => ({ ...prev, endDate: "" }))
                    }
                  >
                    <ClearIcon fontSize="small" />
                  </IconButton>
                </InputAdornment>
              )
            }
          />
        </Stack>
        {/* 배너 */}
        <Stack direction="row" alignItems="center" spacing={1}>
          <Typography variant="body2" sx={{ fontSize: "0.8rem" }}>
            배너
          </Typography>
          <Select
            value={searchCond.banner}
            onChange={(e) =>
              setSearchCond((prev) => ({ ...prev, banner: e.target.value }))
            }
            displayEmpty
            size="small"
            sx={{ width: 100, fontSize: "0.8rem" }}
          >
            <MenuItem value="">전체 배너</MenuItem>
            <MenuItem value="true">배너</MenuItem>
            <MenuItem value="false">일반</MenuItem>
          </Select>
        </Stack>
        {/* 숨겨진 검색 버튼 */}
        <Button
          id="searchButton"
          type="submit"
          variant="contained"
          sx={{ display: "none" }}
        >
          검색
        </Button>
        {/* Quick Select 버튼 */}
        <Button
          variant="text"
          size="small"
          onClick={() => handleQuickSelect("today")}
          sx={{ fontSize: "0.7rem" }}
        >
          오늘
        </Button>
        <Button
          variant="text"
          size="small"
          onClick={() => handleQuickSelect("last7")}
          sx={{ fontSize: "0.7rem" }}
        >
          최근7일
        </Button>
        <Button
          variant="text"
          size="small"
          onClick={() => handleQuickSelect("last30")}
          sx={{ fontSize: "0.7rem" }}
        >
          최근30일
        </Button>
      </Stack>
    </form>
  );
};

export default NoticeSearch;
