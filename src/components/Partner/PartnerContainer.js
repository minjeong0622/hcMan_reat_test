// src/components/Partner/PartnerContainer.js
import React, { useState } from "react";
import { PartnerSearch } from "./PartnerSearch";
import { PartnerGrid } from "./PartnerGrid";
import { PartnerEditModal } from "./PartnerEditModal";
import { fetchPartners, createPartner, updatePartner, deletePartner } from "../../services/partnerApi";
import { useGlobalState } from "../../context/GlobalContext";

export const PartnerContainer = () => {
  const { partnerData, setPartnerData } = useGlobalState();
  const [isModalOpen, setModalOpen] = useState(false);
  const [editingData, setEditingData] = useState(null);

  // 검색 버튼 클릭 시 API 호출하여 전역 partnerData 업데이트
  const handleSearch = async (searchCond) => {
    try {
      const all = await fetchPartners();
      const filtered = all.filter((p) => {
        if (searchCond.partnerName && !p.partnerName.includes(searchCond.partnerName)) {
          return false;
        }
        return true;
      });
      setPartnerData(filtered);
    } catch (error) {
      console.error("거래처 검색 실패:", error);
    }
  };

  const handleAdd = () => {
    setEditingData({ partnerName: "", address: "", partnerType: "" });
    setModalOpen(true);
  };

  const handleRowClick = (partner) => {
    setEditingData(partner);
    setModalOpen(true);
  };

  // 저장 시 전체 재조회 없이 수정된 항목만 업데이트
  const handleSave = async (formData) => {
    try {
      if (formData.id) {
        // 수정 시 API 호출
        await updatePartner(formData.id, formData);
        // 전역 상태에서 해당 항목 업데이트
        setPartnerData((prev) =>
          prev.map((p) => (p.id === formData.id ? { ...formData } : p))
        );
      } else {
        // 신규 등록 시 API 호출 후 결과를 전역 상태에 추가
        const newPartner = await createPartner(formData);
        setPartnerData((prev) => [...prev, newPartner]);
      }
      setModalOpen(false);
      setEditingData(null);
    } catch (error) {
      console.error("거래처 저장 실패:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;
    try {
      await deletePartner(id);
      setPartnerData((prev) => prev.filter((p) => p.id !== id));
    } catch (error) {
      console.error("거래처 삭제 실패:", error);
    }
  };

  return (
    <>
      <PartnerSearch onSearch={handleSearch} onAdd={handleAdd} />
      <PartnerGrid data={partnerData} onRowClick={handleRowClick} onDelete={handleDelete} />
      <PartnerEditModal
        open={isModalOpen}
        onClose={() => setModalOpen(false)}
        initialData={editingData}
        onSave={handleSave}
      />
    </>
  );
};
