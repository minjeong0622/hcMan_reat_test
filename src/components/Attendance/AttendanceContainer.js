import React, { useState } from "react";
import { AttendanceGrid } from "./AttendanceGrid";
import { AttendanceEditModal } from "./AttendanceEditModal";
import { AttendanceSearch } from "./AttendanceSearch";
import { useGlobalState } from "../../context/GlobalContext";
import { updateAttendance, searchAttendance } from "../../services/attendanceApi";

export const AttendanceContainer = () => {
  const { attendanceData, setAttendanceData } = useGlobalState();
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedData, setSelectedData] = useState(null);

  // 🔹 검색 실행
  const handleSearch = async (searchCond) => {
    try {
      const data = await searchAttendance(searchCond);
      setAttendanceData(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("검색 중 오류 발생:", error);
      setAttendanceData([]);
    }
  };

  // 🔹 ID 클릭 시 모달 열기
  const handleRowClick = (row) => {
    setSelectedData(row); // 선택된 데이터 설정
    setModalOpen(true); // 모달 열기
  };

  // 🔹 데이터 저장 후 갱신 (전체 조회 X, 수정된 데이터만 반영)
  const handleSave = async (updatedData) => {
    try {
      console.log("📌 [DEBUG] 업데이트할 데이터:", updatedData);
      await updateAttendance(updatedData);

      // 기존 데이터에서 해당 데이터만 업데이트
      setAttendanceData((prev) =>
        prev.map((item) => (item.id === updatedData.id ? updatedData : item))
      );

      console.log("✅ [DEBUG] 수정 완료: 데이터 반영됨");
      setModalOpen(false); // 모달 닫기
      setSelectedData(null); // 선택 데이터 초기화
    } catch (error) {
      console.error("❌ [ERROR] 데이터 업데이트 실패:", error);
    }
  };

  return (
    <>
      <AttendanceSearch onSearch={handleSearch} />
      <AttendanceGrid data={attendanceData} onRowClick={handleRowClick} />
      <AttendanceEditModal open={isModalOpen} onClose={() => setModalOpen(false)} initialData={selectedData} onSave={handleSave} />
    </>
  );
};
