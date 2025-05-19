// src/components/Inspection/InspectionContainer.js
import React from "react";
import { InspectionSearch } from "./InspectionSearch";
import { InspectionGrid } from "./InspectionGrid";
import InspectionEditModal from "./InspectionEditModal";
import {
  fetchInspections,
  updateInspection,
} from "../../services/InspectionApi";
import { useGlobalState } from "../../context/GlobalContext";

export const InspectionContainer = () => {
  const { inspectionData, setInspectionData } = useGlobalState();
  const [selectedInspection, setSelectedInspection] = React.useState(null);
  const [isModalOpen, setModalOpen] = React.useState(false);

  // 전체 검수 목록 조회
  const loadAllInspections = async () => {
    try {
      const data = await fetchInspections();
      setInspectionData(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("검수 목록 조회 실패:", error);
    }
  };

  // 검색 시 API 호출 후 조건에 맞게 필터링하여 GlobalContext의 inspectionData 업데이트
  const handleSearch = async (searchCond) => {
    try {
      const all = await fetchInspections();
      const filtered = all.filter((i) => {
        if (searchCond.orderId) {
          // 검사 결과가 order 객체로 포함되어 있다면 order.id 사용
          const orderId = i.order ? String(i.order.id) : String(i.orderId);
          if (orderId !== searchCond.orderId) return false;
        }
        if (
          searchCond.inspectedBy &&
          String(i.inspectedBy) !== searchCond.inspectedBy
        ) {
          return false;
        }
        return true;
      });
      setInspectionData(filtered);
    } catch (error) {
      console.error("검수 검색 중 오류:", error);
      setInspectionData([]);
    }
  };

  const handleRowClick = (inspection) => {
    setSelectedInspection(inspection);
    setModalOpen(true);
  };

  const handleSave = async (updatedData) => {
    try {
      await updateInspection(updatedData.id, updatedData);
      await loadAllInspections();
      setModalOpen(false);
      setSelectedInspection(null);
    } catch (error) {
      console.error("검수 수정 실패:", error);
    }
  };

  return (
    <>
      <InspectionSearch onSearch={handleSearch} />
      <InspectionGrid data={inspectionData} onRowClick={handleRowClick} />
      <InspectionEditModal
        open={isModalOpen}
        onClose={() => setModalOpen(false)}
        initialData={selectedInspection}
        onSave={handleSave}
      />
    </>
  );
};

export default InspectionContainer;
