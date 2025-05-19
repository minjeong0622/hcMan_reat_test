import React, { useState, useEffect } from "react";
import { Box, TextField, Button, Typography, Stack, Switch, FormControlLabel } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { createNotice, updateNotice, fetchNotice } from "../../services/noticeApi";
import { useGlobalState } from "../../context/GlobalContext";

const initialFormData = {
  title: "",
  content: "",
  author: "",
  startDate: "",
  endDate: "",
  priority: 5,
  banner: false,
};

const NoticeRegistrationForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isEditMode = location.state && location.state.mode === "edit";
  const { noticeRegistrationFormData, setNoticeRegistrationFormData } = useGlobalState();

  const [form, setForm] = useState(() => {
    if (isEditMode && location.state.id) {
      return { ...initialFormData };
    }
    return noticeRegistrationFormData || initialFormData;
  });
  const [dataFetched, setDataFetched] = useState(false);

  // 수정 모드: 상세 데이터 로딩
  useEffect(() => {
    if (isEditMode && location.state.id && !dataFetched) {
      const loadData = async () => {
        try {
          const fetchedData = await fetchNotice(location.state.id);
          setForm({
            title: fetchedData.title,
            content: fetchedData.content,
            author: fetchedData.author,
            startDate: fetchedData.startDate ? fetchedData.startDate.split("T")[0] : "",
            endDate: fetchedData.endDate ? fetchedData.endDate.split("T")[0] : "",
            priority: fetchedData.priority,
            banner: fetchedData.banner,
          });
          setDataFetched(true);
        } catch (error) {
          console.error("데이터 로드 실패:", error);
        }
      };
      loadData();
    }
  }, [isEditMode, location.state, dataFetched]);

  const handleFieldChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    const payload = {
      ...form,
      priority: Number(form.priority),
    };

    try {
      if (isEditMode && location.state.id) {
        await updateNotice(location.state.id, payload);
        alert("수정 완료!");
      } else {
        await createNotice(payload);
        alert("등록 완료!");
      }
      navigate("/notices");
    } catch (err) {
      alert("에러 발생: " + err.message);
    }
  };

  return (
    <Box sx={{ p: 3, backgroundColor: "#e0e0e0", minHeight: "100vh" }}>
      <Box sx={{ backgroundColor: "#fff", p: 3, borderRadius: 2, maxWidth: 600, margin: "0 auto" }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          {isEditMode ? "공지사항 수정" : "공지사항 등록"}
        </Typography>
        <Stack spacing={2}>
          <TextField
            label="제목"
            value={form.title}
            onChange={(e) => handleFieldChange("title", e.target.value)}
            fullWidth
          />
          <TextField
            label="내용"
            value={form.content}
            onChange={(e) => handleFieldChange("content", e.target.value)}
            fullWidth
            multiline
            rows={4}
          />
          <TextField
            label="작성자"
            value={form.author}
            onChange={(e) => handleFieldChange("author", e.target.value)}
            fullWidth
          />
          <Stack direction="row" spacing={2}>
            <TextField
              label="공지 시작일"
              type="date"
              value={form.startDate}
              onChange={(e) => handleFieldChange("startDate", e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="공지 종료일"
              type="date"
              value={form.endDate}
              onChange={(e) => handleFieldChange("endDate", e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </Stack>
          <TextField
            label="우선순위"
            type="number"
            value={form.priority}
            onChange={(e) => handleFieldChange("priority", e.target.value)}
            fullWidth
          />
          <FormControlLabel
            control={
              <Switch
                checked={form.banner}
                onChange={(e) => handleFieldChange("banner", e.target.checked)}
              />
            }
            label="배너 표시 여부"
          />
          <Button variant="contained" onClick={handleSubmit}>
            {isEditMode ? "수정" : "등록"}
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default NoticeRegistrationForm;
