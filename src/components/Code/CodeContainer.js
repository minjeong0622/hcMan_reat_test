// src/components/Code/CodeContainer.js
import React, { useState } from "react";
import { CodeSearch } from "./CodeSearch";
import { CodeGrid } from "./CodeGrid";
import { CodeEditModal } from "./CodeEditModal";
import { fetchCodes, createOrUpdateCode } from "../../services/codeApi";

export const CodeContainer = () => {
  const [parent, setParent] = useState("UNIT");
  const [codes, setCodes] = useState([]);
  const [selectedCode, setSelectedCode] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const loadCodes = async (p) => {
    try {
      const data = await fetchCodes(p);
      setCodes(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("코드 조회 실패:", error);
    }
  };

  // 검색 시에만 parent 값을 변경하고 API 호출
  const handleSearch = (newParent) => {
    setParent(newParent);
    loadCodes(newParent);
  };

  const handleOpen = (code) => {
    setSelectedCode(
      code
        ? { ...code }
        : { codeId: "", parentCode: parent, codeName: "", useYn: "Y" }
    );
    setModalOpen(true);
  };

  const handleSave = async (formData) => {
    try {
      await createOrUpdateCode(formData);
      setModalOpen(false);
      setSelectedCode(null);
      loadCodes(parent);
    } catch (error) {
      console.error("코드 저장 실패:", error);
    }
  };

  return (
    <>
      <CodeSearch parent={parent} onSearch={handleSearch} onAdd={() => handleOpen(null)} />
      <CodeGrid data={codes} onRowClick={handleOpen} />
      <CodeEditModal
        open={isModalOpen}
        onClose={() => setModalOpen(false)}
        initialData={selectedCode}
        onSave={handleSave}
      />
    </>
  );
};
