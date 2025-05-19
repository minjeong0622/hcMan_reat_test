// src/context/GlobalContext.jsx
import React, { createContext, useContext, useState } from "react";

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  // Order 관련 상태
  const [orderData, setOrderData] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderRegistrationFormData, setOrderRegistrationFormData] = useState({
    buyerId: "",
    buyerName: "",
    supplierId: "",
    supplierName: "",
    dueDate: "",
    warehouseLocation: "",
    rows: [
      { id: 1, itemCode: "", itemName: "", unit: "", quantity: 0 },
      { id: 2, itemCode: "", itemName: "", unit: "", quantity: 0 },
      { id: 3, itemCode: "", itemName: "", unit: "", quantity: 0 },
    ],
  });

  // Purchase Order 관련 상태
  const [purchaseOrderData, setPurchaseOrderData] = useState([]);
  const [selectedPurchaseOrder, setSelectedPurchaseOrder] = useState(null);
  const [purchaseOrderRegistrationFormData, setPurchaseOrderRegistrationFormData] = useState({
    buyerId: "",
    buyerName: "",
    supplierId: "",
    supplierName: "",
    dueDate: "",
    warehouseLocation: "",
    rows: [
      { id: 1, itemCode: "", itemName: "", unit: "", quantity: 0 },
      { id: 2, itemCode: "", itemName: "", unit: "", quantity: 0 },
      { id: 3, itemCode: "", itemName: "", unit: "", quantity: 0 },
    ],
  });

    // Notice 관련 상태
    const [noticeData, setNoticeData] = useState([]);
    const [selectedNotice, setSelectedNotice] = useState(null);
    const [noticeRegistrationFormData, setNoticeRegistrationFormData] = useState({
      title: "",
      content: "",
      author: "",
      startDate: "",
      endDate: "",
      priority: 5,
      banner: false,
    });

  return (
    <GlobalContext.Provider value={{
      // Order 관련
      orderData,
      setOrderData,
      selectedOrder,
      setSelectedOrder,
      orderRegistrationFormData,
      setOrderRegistrationFormData,
      // Purchase Order 관련
      purchaseOrderData,
      setPurchaseOrderData,
      selectedPurchaseOrder,
      setSelectedPurchaseOrder,
      purchaseOrderRegistrationFormData,
      setPurchaseOrderRegistrationFormData,
      // Notice 관련 상태들
      noticeData,
      setNoticeData,
      selectedNotice,
      setSelectedNotice,
      noticeRegistrationFormData,
      setNoticeRegistrationFormData,
    }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalState = () => useContext(GlobalContext);
