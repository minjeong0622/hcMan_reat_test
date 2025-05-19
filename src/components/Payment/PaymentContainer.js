// src/components/Payment/PaymentContainer.js
import React from "react";
import { PaymentSearch } from "./PaymentSearch";
import { PaymentGrid } from "./PaymentGrid";
import PaymentEditModal from "./PaymentEditModal";
import { useGlobalState } from "../../context/GlobalContext";
import { fetchPayments, updatePayment } from "../../services/paymentApi";

export const PaymentContainer = () => {
  const { paymentData, setPaymentData } = useGlobalState();
  const [selectedPayment, setSelectedPayment] = React.useState(null);
  const [isModalOpen, setModalOpen] = React.useState(false);

  const handleSearch = async (searchCond) => {
    try {
      // 주문ID가 빈 문자열이면 파라미터를 전달하지 않음
      const params = {};
      if (searchCond.orderId && searchCond.orderId.trim() !== "") {
        params.orderId = searchCond.orderId.trim();
      }
      const payments = await fetchPayments(params);
      setPaymentData(payments);
    } catch (error) {
      console.error("결제 검색 실패:", error);
      setPaymentData([]);
    }
  };

  const handleRowClick = (payment) => {
    setSelectedPayment(payment);
    setModalOpen(true);
  };

  const handleSave = async (updatedData) => {
    try {
      // read-only 필드(paymentDate, order)는 업데이트 대상에서 제외
      const payload = {
        id: updatedData.id,
        amount: updatedData.amount,
        paymentStatus: updatedData.paymentStatus,
      };
      const updatedPayment = await updatePayment(payload.id, payload);
      setPaymentData((prev) =>
        prev.map((p) =>
          p.id === updatedPayment.id ? { ...p, ...updatedPayment } : p
        )
      );
      setModalOpen(false);
      setSelectedPayment(null);
    } catch (error) {
      console.error("결제 수정 실패:", error);
    }
  };

  return (
    <>
      <PaymentSearch onSearch={handleSearch} />
      <PaymentGrid data={paymentData} onRowClick={handleRowClick} />
      <PaymentEditModal
        open={isModalOpen}
        onClose={() => setModalOpen(false)}
        initialData={selectedPayment}
        onSave={handleSave}
      />
    </>
  );
};

export default PaymentContainer;
