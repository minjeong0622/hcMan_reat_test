// src/components/Order/OrderSearch.jsx
import React, { useState } from "react";
import {
  Stack,
  Button,
  Typography,
  FormControl,
  OutlinedInput,
  MenuItem,
  Select,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { format } from "date-fns";
import ClearIcon from "@mui/icons-material/Clear";

export const OrderSearch = ({ onSearch }) => {
  const [searchCond, setSearchCond] = useState({
    buyer: "",
    supplier: "",
    startDate: "",
    endDate: "",
    orderStatus: "",
  });

  // 빠른 기간 선택 (오늘, 최근7일, 최근30일)
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

  // 날짜 클리어 버튼 (발주일 전체)
  const handleClearDate = () => {
    setSearchCond((prev) => ({ ...prev, startDate: "", endDate: "" }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchCond);
  };

  return (
    <form onSubmit={handleSearch}>
      <Stack direction="row" spacing={2} alignItems="center">
        {/* 발주일 그룹 */}
        <Stack direction="row" alignItems="center" spacing={1}>
          <Typography variant="body2" sx={{ fontSize: "0.8rem" }}>
            발주일
          </Typography>
          <FormControl variant="outlined" size="small">
            <OutlinedInput
              type="date"
              value={searchCond.startDate}
              onChange={(e) =>
                setSearchCond((prev) => ({ ...prev, startDate: e.target.value }))
              }
              sx={{
                "& .MuiOutlinedInput-input": {
                  fontSize: "0.8rem", // 여기서 글자 크기 조절
                  padding: "4px 8px",
                  height: "15px",
                  lineHeight: "25px",
                },
              }}
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
          </FormControl>
          <Typography variant="body2" sx={{ fontSize: "0.8rem" }}>
            ~
          </Typography>
          <FormControl variant="outlined" size="small">
            <OutlinedInput
              type="date"
              value={searchCond.endDate}
              onChange={(e) =>
                setSearchCond((prev) => ({ ...prev, endDate: e.target.value }))
              }
              sx={{
                "& .MuiOutlinedInput-input": {
                  fontSize: "0.8rem", // 여기서 글자 크기 조절
                  padding: "4px 8px",
                  height: "15px",
                  lineHeight: "15px",
                },
              }}
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
          </FormControl>
          {/* 빠른 기간 선택 및 날짜 전체 클리어 */}
          <Stack direction="row" spacing={1}>
            <Button variant="text" onClick={() => handleQuickSelect("today")} sx={{ fontSize: "0.7rem" }}>
              오늘
            </Button>
            <Button variant="text" onClick={() => handleQuickSelect("last7")} sx={{ fontSize: "0.7rem" }}>
              최근7일
            </Button>
            <Button variant="text" onClick={() => handleQuickSelect("last30")} sx={{ fontSize: "0.7rem" }}>
              최근30일
            </Button>
            {/* <IconButton size="small" onClick={handleClearDate}>
              <ClearIcon fontSize="small" />
            </IconButton> */}
          </Stack>
        </Stack>
        {/* 발주자 */}
        <Stack direction="row" alignItems="center" spacing={1}>
          <Typography variant="body2" sx={{ fontSize: "0.8rem" }}>
            발주자
          </Typography>
          <FormControl variant="outlined" size="small">
            <OutlinedInput
              placeholder="발주자명/ID"
              value={searchCond.buyer}
              onChange={(e) =>
                setSearchCond((prev) => ({ ...prev, buyer: e.target.value }))
              }
              sx={{
                "& .MuiOutlinedInput-input": {
                  fontSize: "0.8rem", // 여기서 글자 크기 조절
                  padding: "4px 8px",
                  height: "15px",
                  lineHeight: "15px",
                },
              }}
            />
          </FormControl>
        </Stack>
        {/* 발주처 */}
        <Stack direction="row" alignItems="center" spacing={1}>
          <Typography variant="body2" sx={{ fontSize: "0.8rem" }}>
            발주처
          </Typography>
          <FormControl variant="outlined" size="small">
            <OutlinedInput
              placeholder="발주처명/ID"
              value={searchCond.supplier}
              onChange={(e) =>
                setSearchCond((prev) => ({ ...prev, supplier: e.target.value }))
              }
              sx={{
                "& .MuiOutlinedInput-input": {
                  fontSize: "0.8rem", // 여기서 글자 크기 조절
                  padding: "4px 8px",
                  height: "15px",
                  lineHeight: "15px",
                },
              }}
            />
          </FormControl>
        </Stack>
        {/* 상태 */}
        <Stack direction="row" alignItems="center" spacing={1}>
          <Typography variant="body2" sx={{ fontSize: "0.8rem" }}>
            상태
          </Typography>
          <FormControl variant="outlined" size="small">
            <Select
              value={searchCond.orderStatus}
              onChange={(e) =>
                setSearchCond((prev) => ({ ...prev, orderStatus: e.target.value }))
              }
              displayEmpty
              renderValue={(selected) => {
                if (!selected) {
                  return (
                    <span style={{ color: "#aaa", display: "flex", alignItems: "center", height: "100%" }}>
                      전체
                    </span>
                  );
                }
                const mapping = {
                  PENDING: "대기",
                  APPROVED: "승인됨",
                  SHIPPED: "출고됨",
                  DELIVERED: "배송 완료",
                  INSPECTED: "검수 완료",
                  PAID: "결제 완료",
                  COMPLETED: "최종 완료",
                  CANCELED: "취소됨",
                };
                return (
                  <span style={{ display: "flex", alignItems: "center", height: "100%" }}>
                    {mapping[selected] || selected}
                  </span>
                );
              }}
              sx={{
                minWidth: "100px",
                "& .MuiSelect-select": {
                  fontSize: "0.8rem", // 여기서 글자 크기 조절
                  padding: "4px 8px",
                  height: "15px",
                  lineHeight: "15px",
                  display: "flex",
                  alignItems: "center",
                },
              }}
            >
              <MenuItem value=""><em>전체</em></MenuItem>
              <MenuItem value="PENDING">대기</MenuItem>
              <MenuItem value="APPROVED">승인됨</MenuItem>
              <MenuItem value="SHIPPED">출고됨</MenuItem>
              <MenuItem value="DELIVERED">배송 완료</MenuItem>
              <MenuItem value="INSPECTED">검수 완료</MenuItem>
              <MenuItem value="PAID">결제 완료</MenuItem>
              <MenuItem value="COMPLETED">최종 완료</MenuItem>
              <MenuItem value="CANCELED">취소됨</MenuItem>
            </Select>
          </FormControl>
        </Stack>
        {/* 실제 검색 버튼 (보이지 않음) */}
        <Button id="searchButton" type="submit" variant="contained" style={{ display: "none" }}>
          검색
        </Button>
      </Stack>
    </form>
  );
};

export default OrderSearch;
