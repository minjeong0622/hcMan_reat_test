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

const PurchaseOrderSearch = ({ onSearch }) => {
  const [searchCond, setSearchCond] = useState({
    buyer: "",
    supplier: "",
    startDate: "",
    endDate: "",
    orderStatus: "",
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
        {/* 발주일 */}
        <Stack direction="row" alignItems="center" spacing={1}>
          <Typography variant="body2" sx={{ fontSize: "0.8rem" }}>
            발주일
          </Typography>
          <OutlinedInput
            type="date"
            size="small"
            value={searchCond.startDate}
            onChange={(e) => setSearchCond((prev) => ({ ...prev, startDate: e.target.value }))}
            endAdornment={
              searchCond.startDate && (
                <InputAdornment position="end">
                  <IconButton
                    size="small"
                    onClick={() => setSearchCond((prev) => ({ ...prev, startDate: "" }))}
                  >
                    <ClearIcon fontSize="small" />
                  </IconButton>
                </InputAdornment>
              )
            }
            sx={{ width: 130, fontSize: "0.8rem" }}
          />
          <Typography variant="body2" sx={{ fontSize: "0.8rem" }}>
            ~
          </Typography>
          <OutlinedInput
            type="date"
            size="small"
            value={searchCond.endDate}
            onChange={(e) => setSearchCond((prev) => ({ ...prev, endDate: e.target.value }))}
            endAdornment={
              searchCond.endDate && (
                <InputAdornment position="end">
                  <IconButton
                    size="small"
                    onClick={() => setSearchCond((prev) => ({ ...prev, endDate: "" }))}
                  >
                    <ClearIcon fontSize="small" />
                  </IconButton>
                </InputAdornment>
              )
            }
            sx={{ width: 130, fontSize: "0.8rem" }}
          />
          <Button variant="text" size="small" onClick={() => handleQuickSelect("today")} sx={{ fontSize: "0.7rem" }}>
            오늘
          </Button>
          <Button variant="text" size="small" onClick={() => handleQuickSelect("last7")} sx={{ fontSize: "0.7rem" }}>
            최근7일
          </Button>
          <Button variant="text" size="small" onClick={() => handleQuickSelect("last30")} sx={{ fontSize: "0.7rem" }}>
            최근30일
          </Button>
        </Stack>

        {/* 발주자 */}
        <Stack direction="row" alignItems="center" spacing={1}>
          <Typography variant="body2" sx={{ fontSize: "0.8rem" }}>
            발주자
          </Typography>
          <OutlinedInput
            size="small"
            placeholder="발주자명/ID"
            value={searchCond.buyer}
            onChange={(e) => setSearchCond((prev) => ({ ...prev, buyer: e.target.value }))}
            sx={{ width: 100, fontSize: "0.8rem" }}
          />
        </Stack>

        {/* 발주처 */}
        <Stack direction="row" alignItems="center" spacing={1}>
          <Typography variant="body2" sx={{ fontSize: "0.8rem" }}>
            발주처
          </Typography>
          <OutlinedInput
            size="small"
            placeholder="발주처명/ID"
            value={searchCond.supplier}
            onChange={(e) => setSearchCond((prev) => ({ ...prev, supplier: e.target.value }))}
            sx={{ width: 100, fontSize: "0.8rem" }}
          />
        </Stack>

        {/* 상태 */}
        <Stack direction="row" alignItems="center" spacing={1}>
          <Typography variant="body2" sx={{ fontSize: "0.8rem" }}>
            상태
          </Typography>
          <Select
            native
            size="small"
            value={searchCond.orderStatus}
            onChange={(e) => setSearchCond((prev) => ({ ...prev, orderStatus: e.target.value }))}
            sx={{ width: 100, fontSize: "0.8rem" }}
          >
            <option value="">전체</option>
            <option value="PENDING">대기</option>
            <option value="APPROVED">승인됨</option>
            <option value="SHIPPED">출고됨</option>
            <option value="DELIVERED">배송 완료</option>
            <option value="INSPECTED">검수 완료</option>
            <option value="PAID">결제 완료</option>
            <option value="COMPLETED">최종 완료</option>
            <option value="CANCELED">취소됨</option>
          </Select>
        </Stack>

        {/* 숨겨진 검색 버튼 (onSubmit 트리거) */}
        <Button id="searchButton" type="submit" variant="contained" style={{ display: "none" }}>
          검색
        </Button>
      </Stack>
    </form>
  );
};

export default PurchaseOrderSearch;
