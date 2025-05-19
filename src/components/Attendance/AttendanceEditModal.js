import React, { useState, useEffect } from "react";
import { Modal, Box, TextField, Button, Typography, CircularProgress } from "@mui/material";
import { LocalizationProvider, DatePicker, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import "dayjs/locale/ko";

export const AttendanceEditModal = ({ open, onClose, initialData, onSave }) => {
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    if (!initialData) return;

    setFormData({
      ...initialData,
      date: initialData.date ? dayjs(initialData.date, "YYYYMMDD") : dayjs(),
      startTime:
        initialData.startHourStr && initialData.startMinuteStr
          ? `${initialData.startHourStr.padStart(2, "0")}:${initialData.startMinuteStr.padStart(2, "0")}`
          : "00:00",
      endTime:
        initialData.endHourStr && initialData.endMinuteStr
          ? `${initialData.endHourStr.padStart(2, "0")}:${initialData.endMinuteStr.padStart(2, "0")}`
          : "00:00",
      in01: initialData.in01 ?? "", // ✅ 업무 내용 추가
    });
  }, [initialData]);

  const handleChange = (field, value) => {
    if (!formData) return;

    if (field === "date") {
      setFormData((prev) => ({ ...prev, [field]: value }));
    } else if (field === "startTime" || field === "endTime") {
      setFormData((prev) => ({ ...prev, [field]: value.format("HH:mm") }));
    } else {
      setFormData((prev) => ({ ...prev, [field]: value }));
    }
  };

  const handleSave = () => {
    if (!formData) return;

    const updatedData = {
      ...formData,
      date: dayjs(formData.date).format("YYYYMMDD"),
      startHourStr: formData.startTime.split(":")[0] ?? "00",
      startMinuteStr: formData.startTime.split(":")[1] ?? "00",
      endHourStr: formData.endTime.split(":")[0] ?? "00",
      endMinuteStr: formData.endTime.split(":")[1] ?? "00",
      in01: formData.in01, // ✅ 저장 시 업무 내용 포함
    };

    console.log("📌 [DEBUG] 저장 버튼 클릭됨, 데이터 저장:", updatedData);
    onSave(updatedData);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
      <Modal open={open} onClose={onClose} disableEscapeKeyDown>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          {formData ? (
            <>
              <Typography variant="h6" sx={{ mb: 2 }}>근태 정보 수정</Typography>
              <TextField fullWidth label="직원명" margin="dense" value={formData.employeeName} onChange={(e) => handleChange("employeeName", e.target.value)} />
              <TextField fullWidth label="부서명" margin="dense" value={formData.departmentName} onChange={(e) => handleChange("departmentName", e.target.value)} />
              <TextField fullWidth label="직급" margin="dense" value={formData.positionName} onChange={(e) => handleChange("positionName", e.target.value)} />

              <DatePicker
                label="날짜"
                format="YYYY/MM/DD"
                value={formData.date}
                onChange={(newValue) => handleChange("date", newValue)}
                sx={{ width: "100%", mt: 1 }}
              />
              <TimePicker
                label="시작 시간"
                value={dayjs(`2025-01-01 ${formData.startTime}`, "YYYY-MM-DD HH:mm")}
                format="A HH:mm" // ✅ "오전 08:30" 또는 "오후 02:00" 형태
                onChange={(newValue) => handleChange("startTime", newValue)}
                sx={{ width: "100%", mt: 1 }}
              />
              <TimePicker
                label="종료 시간"
                value={dayjs(`2025-01-01 ${formData.endTime}`, "YYYY-MM-DD HH:mm")}
                format="A HH:mm"
                onChange={(newValue) => handleChange("endTime", newValue)}
                sx={{ width: "100%", mt: 1 }}
              />

              <TextField
                fullWidth
                label="업무 내용"
                margin="dense"
                value={formData.in01}
                onChange={(e) => handleChange("in01", e.target.value)}
              />

              <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
                <Button variant="contained" color="primary" onClick={handleSave}>저장</Button>
                <Button variant="outlined" onClick={onClose}>닫기</Button>
              </Box>
            </>
          ) : (
            <CircularProgress />
          )}
        </Box>
      </Modal>
    </LocalizationProvider>
  );
};
