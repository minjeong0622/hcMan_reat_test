// src/components/Order/OrderRegistrationForm.jsx
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Stack,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useLocation, useNavigate } from "react-router-dom";

import UserSearchModal from "../User/UserSearchModal";
import PartnerSearchModal from "../Partner/PartnerSearchModal";
import ItemSearchModal from "../Item/ItemSearchModal";
import { useGlobalState } from "../../context/GlobalContext";
import { createOrder, fetchOrder, updateOrder } from "../../services/orderApi";

const defaultRows = [
  { id: 1, itemCode: "", itemName: "", unit: "", quantity: 0 },
  { id: 2, itemCode: "", itemName: "", unit: "", quantity: 0 },
  { id: 3, itemCode: "", itemName: "", unit: "", quantity: 0 },
];

const initialFormData = {
  buyerId: "",
  buyerName: "",
  supplierId: "",
  supplierName: "",
  dueDate: "",
  warehouseLocation: "",
  rows: defaultRows,
};

const OrderRegistrationForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // 글로벌 상태에서 주문 등록용 상태(orderRegistrationFormData)를 사용합니다.
  const { orderRegistrationFormData, setOrderRegistrationFormData, setSelectedOrder } = useGlobalState();

  // location.state로부터 모드 및 주문 기본키 받아오기 ("edit"이면 수정 모드)
  const mode = location.state?.mode; // "edit"이면 수정 모드
  const orderId = location.state?.id;

  // 신규 등록이면 이전 데이터가 남지 않도록 초기화 (편집 중이면 기존 입력 데이터를 유지)
  useEffect(() => {
    if (mode !== "edit") {
      setOrderRegistrationFormData(initialFormData);
    }
  }, [mode, setOrderRegistrationFormData]);

  // 수정 모드인 경우, 한 번만 백엔드에서 데이터를 불러와 글로벌 폼에 저장
  const [dataFetched, setDataFetched] = useState(false);
  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        const fetchedData = await fetchOrder(orderId);
        // 백엔드 응답에서 품목 정보는 items 필드로 전달된다고 가정
        const mappedData = {
          buyerId: fetchedData.buyerId || "",
          buyerName: fetchedData.buyerName || "",
          supplierId: fetchedData.supplierId || "",
          supplierName: fetchedData.supplierName || "",
          dueDate: fetchedData.dueDate || "",
          warehouseLocation: fetchedData.warehouseLocation || "",
          rows:
            (fetchedData.items && fetchedData.items.length > 0)
              ? fetchedData.items.map((item, index) => ({
                  id: item.id || index + 1,
                  itemCode: item.itemCode || "",
                  itemName: item.itemName || "",
                  unit: item.unitCode || "",
                  quantity: item.orderQuantity ?? 0,
                }))
              : defaultRows,
        };
        setOrderRegistrationFormData(mappedData);
        setDataFetched(true);
      } catch (error) {
        console.error("주문 데이터 불러오기 실패:", error);
      }
    };

    if (mode === "edit" && orderId && !dataFetched) {
      fetchOrderData();
    }
  }, [mode, orderId, dataFetched, setOrderRegistrationFormData]);

  // orderRegistrationFormData의 값을 구조분해 할당 (초기값 보장을 위해 기본값 지정)
  const { buyerId, buyerName, supplierId, supplierName, dueDate, warehouseLocation, rows } = orderRegistrationFormData || {
    buyerId: "",
    buyerName: "",
    supplierId: "",
    supplierName: "",
    dueDate: "",
    warehouseLocation: "",
    rows: [],
  };

  const [selectionModel, setSelectionModel] = useState([]);
  const [openBuyerModal, setOpenBuyerModal] = useState(false);
  const [openSupplierModal, setOpenSupplierModal] = useState(false);
  const [openItemModal, setOpenItemModal] = useState(false);
  const [targetRowId, setTargetRowId] = useState(null);

  // updateField 함수로 입력 필드 변경 시 글로벌 상태에 업데이트
  const updateField = (field, value) => {
    setOrderRegistrationFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAddRow = () => {
    const newId = rows.length > 0 ? Math.max(...rows.map(r => r.id)) + 1 : 1;
    const newRow = { id: newId, itemCode: "", itemName: "", unit: "", quantity: 0 };
    updateField("rows", [...rows, newRow]);
  };

  const columns = [
    {
      field: "itemName",
      headerName: "품목명",
      width: 150,
      editable: true,
      renderCell: (params) => {
        const handleClick = () => {
          setTargetRowId(params.row.id);
          setOpenItemModal(true);
        };
        return (
          <Box
            sx={{ cursor: "pointer", color: params.value ? "inherit" : "gray" }}
            onDoubleClick={handleClick}
          >
            {params.value || "(품목 선택)"}
          </Box>
        );
      }
    },
    {
      field: "itemCode",
      headerName: "품목코드",
      width: 120,
      editable: true,
    },
    {
      field: "unit",
      headerName: "단위",
      width: 80,
      editable: true,
    },
    {
      field: "quantity",
      headerName: "수량",
      width: 80,
      type: "number",
      editable: true,
    }
  ];

  const handleCellEditCommit = (params) => {
    setOrderRegistrationFormData(prev => {
      const updatedRows = prev.rows.map(row =>
        row.id === params.id ? { ...row, [params.field]: params.value } : row
      );
      return { ...prev, rows: updatedRows };
    });
  };

  const handleCellKeyDown = (params, event) => {
    if (params.field === "itemName" && event.key === "Enter") {
      setTargetRowId(params.row.id);
      setOpenItemModal(true);
    }
  };

  const handleDeleteSelected = () => {
    if (selectionModel.length === 0) return;
    const updatedRows = rows.filter(row => {
      const rowIdStr = String(row.id);
      return !(selectionModel.includes(rowIdStr) || selectionModel.includes(row.id));
    });
    setOrderRegistrationFormData(prev => ({ ...prev, rows: updatedRows }));
    setSelectionModel([]);
  };

  // 저장 버튼 클릭 시 API 호출 후 성공하면 폼을 초기화(화면 리셋)
  const handleRegister = async () => {
    const validRows = rows.filter(row => {
      if (!row.itemName || row.itemName.trim() === "") {
        if (row.quantity > 0) {
          alert(`수량이 입력되었으나 품목명이 누락되었습니다. 행 id: ${row.id}`);
          throw new Error("유효하지 않은 행 발견");
        }
        return false;
      }
      return true;
    });

    // itemsToSend 생성 시 수량이 null 또는 undefined면 0으로 처리
    const itemsToSend = validRows.map(row => ({
      itemId: row.itemId,
      itemCode: row.itemCode ?? "",
      itemName: row.itemName ?? "",
      unitCode: row.unit ?? "",
      orderQuantity: row.quantity ?? 0,
    }));

    const registrationData = {
      buyerId,
      buyerName,
      supplierId,
      supplierName,
      dueDate,
      warehouseLocation,
      items: itemsToSend,
    };

    try {
      if (mode === "edit" && orderId) {
        const response = await updateOrder(orderId, registrationData);
        console.log("수정 완료:", response);
        alert("수정이 완료되었습니다.");
        setSelectedOrder(null);
      } else {
        const response = await createOrder(registrationData);
        console.log("등록 완료:", response);
        alert("등록이 완료되었습니다.");
      }
      // 저장 성공 후 폼을 초기화하여 화면을 리셋함 (입력 데이터 삭제)
      setOrderRegistrationFormData(initialFormData);
      setDataFetched(false);
      navigate("/order/registration", { state: {} });
    } catch (error) {
      console.error(mode === "edit" ? "수정 실패:" : "등록 실패:", error);
      alert(mode === "edit" ? "수정 중 오류가 발생했습니다." : "등록 중 오류가 발생했습니다.");
    }
  };

  const handleSelectBuyer = (selected) => {
    updateField("buyerId", selected.id);
    updateField("buyerName", selected.username);
    setOpenBuyerModal(false);
  };

  const handleSelectSupplier = (selected) => {
    updateField("supplierId", selected.id);
    updateField("supplierName", selected.partnerName);
    setOpenSupplierModal(false);
  };

  const handleSelectItem = (selected) => {
    setOrderRegistrationFormData(prev => {
      const updatedRows = prev.rows.map(row =>
        row.id === targetRowId
          ? {
              ...row,
              itemId: selected.id,
              itemCode: selected.itemCode,
              itemName: selected.itemName,
              unit: selected.unit,
            }
          : row
      );
      return { ...prev, rows: updatedRows };
    });
    setOpenItemModal(false);
  };

  return (
    <Box sx={{ p: 2, backgroundColor: "#e0e0e0", boxSizing: "border-box", height: "100%" }}>
      {/* 상단 발주정보 영역 */}
      <Box sx={{ backgroundColor: "#fff", p: 2, mb: 2, borderRadius: 2, border: "1px solid #ddd" }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          {mode === "edit" ? "발주 수정" : "발주 등록"}
        </Typography>
        <Stack direction="row" spacing={4} sx={{ mb: 2 }}>
          <Stack spacing={1}>
            <Typography variant="body2">발주자</Typography>
            <Stack direction="row" spacing={1}>
              <TextField
                label="발주자ID"
                size="small"
                value={buyerId}
                onChange={(e) => updateField("buyerId", e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") setOpenBuyerModal(true); }}
                onDoubleClick={() => setOpenBuyerModal(true)}
                sx={{ width: 100 }}
              />
              <TextField
                label="발주자"
                size="small"
                value={buyerName}
                onChange={(e) => updateField("buyerName", e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") setOpenBuyerModal(true); }}
                onDoubleClick={() => setOpenBuyerModal(true)}
                sx={{ width: 100 }}
              />
            </Stack>
          </Stack>
          <Stack spacing={1}>
            <Typography variant="body2">발주처</Typography>
            <Stack direction="row" spacing={1}>
              <TextField
                label="발주처ID"
                size="small"
                value={supplierId}
                onChange={(e) => updateField("supplierId", e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") setOpenSupplierModal(true); }}
                onDoubleClick={() => setOpenSupplierModal(true)}
                sx={{ width: 100 }}
              />
              <TextField
                label="발주처"
                size="small"
                value={supplierName}
                onChange={(e) => updateField("supplierName", e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") setOpenSupplierModal(true); }}
                onDoubleClick={() => setOpenSupplierModal(true)}
                sx={{ width: 100 }}
              />
            </Stack>
          </Stack>
        </Stack>
        <Stack direction="row" spacing={4}>
          <Stack spacing={1}>
            <Typography variant="body2">납기일자</Typography>
            <TextField
              type="date"
              size="small"
              value={dueDate}
              onChange={(e) => updateField("dueDate", e.target.value)}
              sx={{ width: 150 }}
              InputLabelProps={{ shrink: true }}
            />
          </Stack>
          <Stack spacing={1}>
            <Typography variant="body2">입고장소</Typography>
            <TextField
              size="small"
              value={warehouseLocation}
              onChange={(e) => updateField("warehouseLocation", e.target.value)}
              sx={{ width: 150 }}
            />
          </Stack>
        </Stack>
      </Box>

      {/* 하단 품목정보 DataGrid 영역 */}
      <Box sx={{ backgroundColor: "#fff", borderRadius: 2, border: "1px solid #ddd", p: 2, mb: 2, height: 300 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
          <Typography variant="subtitle1">품목 정보</Typography>
          <Stack direction="row" spacing={1}>
            <Button variant="outlined" color="error" size="small" onClick={handleDeleteSelected}>
              선택행 삭제
            </Button>
            <Button variant="contained" size="small" onClick={handleAddRow}>
              행 추가
            </Button>
          </Stack>
        </Stack>
        <DataGrid
          getRowId={(row) => row.id}
          rows={orderRegistrationFormData.rows}
          columns={columns}
          checkboxSelection
          selectionModel={selectionModel}
          onRowSelectionModelChange={(newSelection) => {
            setSelectionModel(newSelection);
          }}
          onCellEditCommit={handleCellEditCommit}
          onCellKeyDown={handleCellKeyDown}
          density="compact"
        />
      </Box>

      <Button variant="contained" onClick={handleRegister}>
        {mode === "edit" ? "수정" : "등록"}
      </Button>

      {/* 모달들 */}
      <UserSearchModal
        open={openBuyerModal}
        onClose={() => setOpenBuyerModal(false)}
        onSelect={handleSelectBuyer}
        searchQuery={buyerId || buyerName}
        placeholder="발주자 검색"
      />
      <PartnerSearchModal
        open={openSupplierModal}
        onClose={() => setOpenSupplierModal(false)}
        onSelect={handleSelectSupplier}
        searchQuery={supplierId || supplierName}
        placeholder="발주처 검색"
      />
      <ItemSearchModal
        open={openItemModal}
        onClose={() => setOpenItemModal(false)}
        onSelect={handleSelectItem}
        searchQuery=""
        placeholder="품목 검색"
      />
    </Box>
  );
};

export default OrderRegistrationForm;
