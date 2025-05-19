// src/components/Shipment/ShipmentContainer.js
import React from "react";
import { ShipmentSearch } from "./ShipmentSearch";
import { ShipmentGrid } from "./ShipmentGrid";
import { ShipmentEditModal } from "./ShipmentEditModal";
import { fetchShipments, updateShipment } from "../../services/shipmentApi";
import { useGlobalState } from "../../context/GlobalContext";

export const ShipmentContainer = () => {
  // GlobalContext에서 shipmentData를 가져오면, 다른 탭에서도 값이 유지됩니다.
  const { shipmentData, setShipmentData } = useGlobalState();
  const [selectedShipment, setSelectedShipment] = React.useState(null);
  const [isModalOpen, setModalOpen] = React.useState(false);

  // 전체 출고 조회 API 호출 (검색 버튼 없이도 호출 가능하게 할 경우, 컴포넌트 마운트 시 호출)
  const loadShipments = async () => {
    try {
      const shipments = await fetchShipments();
      setShipmentData(Array.isArray(shipments) ? shipments : []);
    } catch (error) {
      console.error("출고 목록 조회 실패:", error);
    }
  };

  // 검색 버튼 클릭 시 API 호출하여 GlobalContext의 shipmentData를 갱신
  const handleSearch = async (searchCond) => {
    try {
      const all = await fetchShipments();
      const filtered = all.filter((s) => {
        // 주문 ID는 s.order가 존재할 경우 s.order.id 로 가져옵니다.
        if (searchCond.orderId) {
          const orderId = s.order ? String(s.order.id) : "";
          if (orderId !== searchCond.orderId) return false;
        }
        if (
          searchCond.trackingNumber &&
          !String(s.trackingNumber).includes(searchCond.trackingNumber)
        )
          return false;
        return true;
      });
      setShipmentData(filtered);
    } catch (error) {
      console.error("출고 검색 실패:", error);
      setShipmentData([]);
    }
  };

  const handleRowClick = (shipment) => {
    setSelectedShipment(shipment);
    setModalOpen(true);
  };

  const handleSave = async (updatedData) => {
    try {
      await updateShipment(updatedData.id, updatedData);
      // 수정 후 다시 전체 출고 목록을 불러와 GlobalContext의 shipmentData를 업데이트
      await loadShipments();
      setModalOpen(false);
      setSelectedShipment(null);
    } catch (error) {
      console.error("출고 수정 실패:", error);
    }
  };

  return (
    <>
      <ShipmentSearch onSearch={handleSearch} />
      <ShipmentGrid data={shipmentData} onRowClick={handleRowClick} />
      <ShipmentEditModal
        open={isModalOpen}
        onClose={() => setModalOpen(false)}
        initialData={selectedShipment}
        onSave={handleSave}
      />
    </>
  );
};

export default ShipmentContainer;
