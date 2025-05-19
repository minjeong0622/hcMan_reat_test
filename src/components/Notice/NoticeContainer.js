// src/components/Notice/NoticeContainer.jsx
import React from "react";
import { Box, Stack, Button, Divider } from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";
import NoticeSearch from "./NoticeSearch";
import NoticeGrid from "./NoticeGrid";
import { fetchNotices, fetchNotice, deleteNotice } from "../../services/noticeApi";
import { useNavigate } from "react-router-dom";
import { useGlobalState } from "../../context/GlobalContext";

const NoticeContainer = () => {
  const navigate = useNavigate();
  const { noticeData, setNoticeData, selectedNotice, setSelectedNotice } = useGlobalState();
  const [selectedIds, setSelectedIds] = React.useState([]);

  // --- 검색 ---
  const handleSearch = async (searchCond) => {
    try {
      const data = await fetchNotices(searchCond);
      setNoticeData(data);
    } catch (error) {
      console.error("검색 실패:", error);
    }
  };

  // --- 행 클릭 시 상세 조회 ---
  const handleRowClick = async (row) => {
    try {
      const fullData = await fetchNotice(row.id);
      setSelectedNotice(fullData);
    } catch (err) {
      console.error("상세 조회 실패:", err);
    }
  };

  // --- 삭제 (Bulk 삭제 포함) ---
  const handleDelete = async () => {
    if (!selectedIds.length) {
      alert("선택된 항목이 없습니다.");
      return;
    }
    if (window.confirm("선택한 공지사항을 삭제하시겠습니까?")) {
      try {
        for (const id of selectedIds) {
          await deleteNotice(id);
        }
        setNoticeData((prev) => prev.filter((n) => !selectedIds.includes(n.id)));
        if (selectedNotice && selectedIds.includes(selectedNotice.id)) {
          setSelectedNotice(null);
        }
        alert("삭제 완료!");
      } catch (error) {
        alert("삭제에 실패했습니다.");
      }
    }
  };

  // PurchaseOrderContainer와 동일한 공통 버튼 스타일
  const commonButtonStyles = {
    borderColor: "rgba(255,255,255,0.6)",
    color: "#fff",
    fontSize: "0.8rem",
    height: "30px",
    minWidth: "60px",
    padding: "6px 12px",
    backgroundColor: "transparent",
    transition: "background-color 0.2s, border-color 0.2s",
    ":hover": {
      backgroundColor: "rgba(255,255,255,0.3)",
      borderColor: "rgba(255,255,255,0.9)",
    },
    ":active": { backgroundColor: "rgba(255,255,255,0.35)" },
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        backgroundColor: "#e0e0e0",
        boxSizing: "border-box",
      }}
    >
      {/* 탭/버튼 영역 */}
      <Box
        sx={{
          backgroundColor: "#0070C0",
          p: 0.5,
          borderRadius: 1,
          mb: 1,
        }}
      >
        <Stack direction="row" spacing={2} sx={{ width: "100%" }}>
          <Box sx={{ display: "flex", gap: 1 }}>
            <Button
              variant="outlined"
              startIcon={<CreateIcon />}
              onClick={() =>
                navigate("/notice/registration", { state: { mode: "new" } })
              }
              sx={commonButtonStyles}
            >
              신규
            </Button>
            <Button
              variant="outlined"
              startIcon={<SearchIcon />}
              onClick={() => document.getElementById("searchButton")?.click()}
              sx={commonButtonStyles}
            >
              조회
            </Button>
            <Button
              variant="outlined"
              startIcon={<DeleteIcon />}
              onClick={handleDelete}
              sx={commonButtonStyles}
            >
              삭제
            </Button>
          </Box>
          <Divider
            orientation="vertical"
            flexItem
            sx={{
              mx: 1,
              borderColor: "rgba(255,255,255,0.3)",
              alignSelf: "stretch",
            }}
          />
          {/* Bulk 액션 버튼 영역은 공지사항에서는 필요에 따라 추가 */}
        </Stack>
      </Box>

      {/* 검색 조건 영역 */}
      <Box sx={{ backgroundColor: "#fff", p: 1, borderRadius: 2, mb: 1 }}>
        <NoticeSearch onSearch={handleSearch} />
      </Box>

      {/* 목록 그리드 영역 */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "row",
          gap: 2,
          backgroundColor: "#fff",
          p: 1,
          borderRadius: 1,
          overflow: "hidden",
          minHeight: 0,
        }}
      >
        {/* 좌측: 단일 통합 테이블 영역 */}
        <Box
          sx={{
            flex: 1,
            overflow: "auto",
            border: "1px solid #ddd",
            borderRadius: 1,
            minHeight: 0,
          }}
        >
          <NoticeGrid
            data={noticeData}
            onRowClick={handleRowClick}
            selectedIds={selectedIds}
            setSelectedIds={setSelectedIds}
          />
        </Box>
        {/* 우측: 진행 현황 패널(필요시 추가) */}
      </Box>

      {/* 숨겨진 검색 버튼 */}
      <Button id="searchButton" type="submit" variant="contained" style={{ display: "none" }}>
        검색
      </Button>
    </Box>
  );
};

export default NoticeContainer;
