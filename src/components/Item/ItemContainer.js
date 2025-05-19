// src/components/Item/ItemContainer.js
import React, { useState } from "react";
import { ItemSearch } from "./ItemSearch";
import { ItemGrid } from "./ItemGrid";
import { ItemEditModal } from "./ItemEditModal";
import { fetchItems, createItem, updateItem, deleteItem } from "../../services/itemApi";
import { fetchCodes } from "../../services/codeApi"; // 단위코드 조회

export const ItemContainer = () => {
  const [items, setItems] = useState([]);
  const [unitCodes, setUnitCodes] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const loadItems = async () => {
    try {
      const data = await fetchItems();
      setItems(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("품목 조회 실패:", error);
    }
  };

  const loadUnitCodes = async () => {
    try {
      // 상위코드 "UNIT" 사용
      const data = await fetchCodes("UNIT");
      setUnitCodes(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("단위 코드 조회 실패:", error);
    }
  };

  // 검색 시에만 품목 목록(및 필요 시 단위코드)을 조회
  const handleSearch = async (searchCond) => {
    try {
      // 단위코드가 없으면 한번 로드 (필요한 경우)
      if (unitCodes.length === 0) {
        await loadUnitCodes();
      }
      const all = await fetchItems();
      const filtered = all.filter((item) => {
        if (searchCond.itemName && !item.itemName.includes(searchCond.itemName)) {
          return false;
        }
        return true;
      });
      setItems(filtered);
    } catch (error) {
      console.error("품목 검색 실패:", error);
    }
  };

  const handleAdd = () => {
    setEditingItem({ itemName: "", unitCode: "" });
    setModalOpen(true);
  };

  const handleRowClick = (item) => {
    setEditingItem(item);
    setModalOpen(true);
  };

  const handleSave = async (formData) => {
    try {
      if (formData.id) {
        await updateItem(formData.id, formData);
      } else {
        await createItem(formData);
      }
      setModalOpen(false);
      setEditingItem(null);
      loadItems();
    } catch (error) {
      console.error("품목 저장 실패:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("삭제하시겠습니까?")) return;
    try {
      await deleteItem(id);
      loadItems();
    } catch (error) {
      console.error("품목 삭제 실패:", error);
    }
  };

  return (
    <>
      <ItemSearch onSearch={handleSearch} onAdd={handleAdd} />
      <ItemGrid data={items} onRowClick={handleRowClick} onDelete={handleDelete} />
      <ItemEditModal
        open={isModalOpen}
        onClose={() => setModalOpen(false)}
        initialData={editingItem}
        onSave={handleSave}
        unitCodes={unitCodes}
      />
    </>
  );
};
