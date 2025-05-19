// src/components/PurchaseOrder/PurchaseOrderRegistrationForm.jsx
import React, { useEffect, useState } from "react";
import { Box, Typography, TextField, Button, Stack } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { createPurchaseOrder, fetchPurchaseOrder, updatePurchaseOrder } from "../../services/purchaseOrderApi";
import UserSearchModal from "../User/UserSearchModal";
import PartnerSearchModal from "../Partner/PartnerSearchModal";
import ItemSearchModal from "../Item/ItemSearchModal";
import { useGlobalState } from "../../context/GlobalContext";

const initialFormData = {
  buyerId: "",
  buyerName: "",
  supplierId: "",
  supplierName: "",
  dueDate: "",
  warehouseLocation: "",
  note: "",
  // 단일 품목 입력 예시. 여러 행의 품목정보를 관리하려면 DataGrid 등을 사용하세요.
  itemCode: "",
  itemName: "",
  unitCode: "",
  quantity: 0,
};

const PurchaseOrderRegistrationForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // 신규 등록 모드(new)에서는 글로벌 상태를 사용합니다.
  const {
    purchaseOrderRegistrationFormData,
    setPurchaseOrderRegistrationFormData,
  } = useGlobalState();

  // location.state.mode가 "edit"이면 수정 모드, 아니면 신규 등록(new) 모드
  const initData =
    location.state && location.state.mode === "edit" ? location.state : null;
  const isEditMode = !!initData;

  // 신규 등록 모드(new): 글로벌 상태에 값이 없으면 초기값을 세팅 (탭 전환 중에는 값이 유지됨)
  useEffect(() => {
    if (!isEditMode && !purchaseOrderRegistrationFormData.buyerId) {
      setPurchaseOrderRegistrationFormData(initialFormData);
    }
  }, [isEditMode, purchaseOrderRegistrationFormData, setPurchaseOrderRegistrationFormData]);

  // ※ 아래 cleanup useEffect를 제거하여 탭 전환 시 데이터가 초기화되지 않도록 합니다.
  // useEffect(() => {
  //   return () => {
  //     if (!isEditMode) {
  //       setPurchaseOrderRegistrationFormData(initialFormData);
  //     }
  //   };
  // }, [isEditMode, setPurchaseOrderRegistrationFormData]);

  // 수정 모드(edit)는 글로벌 신규 등록 데이터와 분리되어 로컬 상태로 관리합니다.
  const [localForm, setLocalForm] = useState(() => {
    if (isEditMode) {
      return {
        buyerId: initData?.buyerId || "",
        buyerName: initData?.buyerName || "",
        supplierId: initData?.supplierId || "",
        supplierName: initData?.supplierName || "",
        dueDate: initData?.dueDate ? initData.dueDate.split("T")[0] : "",
        warehouseLocation: initData?.warehouseLocation || "",
        note: initData?.note || "",
        itemCode: initData?.itemCode || "",
        itemName: initData?.itemName || "",
        unitCode: initData?.unitCode || "",
        quantity: initData?.quantity || 0,
      };
    }
    return null;
  });

  // 수정 모드에서는 API로부터 상세 데이터를 한 번만 가져와 로컬 상태에 반영합니다.
  const [dataFetched, setDataFetched] = useState(false);
  useEffect(() => {
    if (isEditMode && initData?.id && !dataFetched) {
      const fetchData = async () => {
        try {
          const fetchedData = await fetchPurchaseOrder(initData.id);
          setLocalForm({
            buyerId: fetchedData.buyerId || "",
            buyerName: fetchedData.buyerName || "",
            supplierId: fetchedData.supplierId || "",
            supplierName: fetchedData.supplierName || "",
            dueDate: fetchedData.dueDate ? fetchedData.dueDate.split("T")[0] : "",
            warehouseLocation: fetchedData.warehouseLocation || "",
            note: fetchedData.note || "",
            itemCode: fetchedData.itemCode || "",
            itemName: fetchedData.itemName || "",
            unitCode: fetchedData.unitCode || "",
            quantity: fetchedData.quantity || 0,
          });
          setDataFetched(true);
        } catch (error) {
          console.error("발주 데이터 불러오기 실패:", error);
        }
      };
      fetchData();
    }
  }, [isEditMode, initData, dataFetched]);

  // 현재 사용 중인 폼 데이터: 신규 등록은 글로벌 상태, 수정은 로컬 상태 사용
  const currentForm = isEditMode ? localForm : purchaseOrderRegistrationFormData;

  // 변경 이벤트 핸들러 (신규 등록 모드: 글로벌 상태 업데이트, 수정 모드: 로컬 상태 업데이트)
  const handleFieldChange = (field, value) => {
    if (isEditMode) {
      setLocalForm((prev) => ({ ...prev, [field]: value }));
    } else {
      setPurchaseOrderRegistrationFormData((prev) => ({ ...prev, [field]: value }));
    }
  };

  // 모달 선택 핸들러
  const handleSelectUser = (selected) => {
    handleFieldChange("buyerId", selected.id);
    handleFieldChange("buyerName", selected.username);
    setOpenUserModal(false);
  };

  const handleSelectPartner = (selected) => {
    handleFieldChange("supplierId", selected.id);
    handleFieldChange("supplierName", selected.partnerName);
    setOpenPartnerModal(false);
  };

  const handleSelectItem = (selected) => {
    handleFieldChange("itemCode", selected.itemCode);
    handleFieldChange("itemName", selected.itemName);
    handleFieldChange("unitCode", selected.unit);
    setOpenItemModal(false);
  };

  // 추출: 현재 폼에서 각 필드 값을 읽어옵니다.
  const { buyerId, buyerName, supplierId, supplierName, dueDate, warehouseLocation, note, itemCode, itemName, unitCode, quantity } = currentForm || {};

  // 저장 처리: API 호출 후 성공 시, 신규 등록 모드라면 글로벌 상태를 초기값으로 리셋(탭 닫힘 시 처리)하고, 수정 모드라면 로컬 상태를 초기화합니다.
  const handleSubmit = async () => {
    const data = {
      buyerId: buyerId ? Number(buyerId) : null,
      buyerName,
      supplierId: supplierId ? Number(supplierId) : null,
      supplierName,
      dueDate: dueDate || null,
      warehouseLocation,
      note,
      itemCode,
      itemName,
      unitCode,
      quantity: quantity === "" || quantity === null ? 0 : Number(quantity),
    };

    try {
      if (isEditMode && initData?.id) {
        await updatePurchaseOrder(initData.id, data);
        alert("발주 수정 완료");
      } else {
        await createPurchaseOrder(data);
        alert("발주 등록 완료");
      }
      if (isEditMode) {
        setLocalForm(initialFormData);
      } else {
        setPurchaseOrderRegistrationFormData(initialFormData);
        navigate("/purchase-order/registration", { state: {} });
      }
    } catch (err) {
      alert("에러 발생: " + err.message);
    }
  };

  // 모달 제어 상태
  const [openUserModal, setOpenUserModal] = useState(false);
  const [openPartnerModal, setOpenPartnerModal] = useState(false);
  const [openItemModal, setOpenItemModal] = useState(false);

  return (
    <Box sx={{ width: "100%", height: "100%", backgroundColor: "#e0e0e0", p: 2 }}>
      <Box sx={{ backgroundColor: "#fff", p: 2, mb: 2, borderRadius: 2, border: "1px solid #ddd", maxWidth: 600, margin: "0 auto" }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          {isEditMode ? "발주 수정" : "발주 등록"}
        </Typography>

        <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
          <Stack spacing={1}>
            <Typography variant="body2">발주자</Typography>
            <Stack direction="row" spacing={1}>
              <TextField
                label="발주자ID"
                size="small"
                value={buyerId || ""}
                onChange={(e) => handleFieldChange("buyerId", e.target.value)}
                onDoubleClick={() => setOpenUserModal(true)}
                sx={{ width: 100 }}
              />
              <TextField
                label="발주자"
                size="small"
                value={buyerName || ""}
                onChange={(e) => handleFieldChange("buyerName", e.target.value)}
                onDoubleClick={() => setOpenUserModal(true)}
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
                value={supplierId || ""}
                onChange={(e) => handleFieldChange("supplierId", e.target.value)}
                onDoubleClick={() => setOpenPartnerModal(true)}
                sx={{ width: 100 }}
              />
              <TextField
                label="발주처"
                size="small"
                value={supplierName || ""}
                onChange={(e) => handleFieldChange("supplierName", e.target.value)}
                onDoubleClick={() => setOpenPartnerModal(true)}
                sx={{ width: 100 }}
              />
            </Stack>
          </Stack>
        </Stack>

        <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
          <Stack spacing={1}>
            <Typography variant="body2">납기일자</Typography>
            <TextField
              type="date"
              size="small"
              value={dueDate || ""}
              onChange={(e) => handleFieldChange("dueDate", e.target.value)}
              sx={{ width: 150 }}
              InputLabelProps={{ shrink: true }}
            />
          </Stack>
          <Stack spacing={1}>
            <Typography variant="body2">입고장소</Typography>
            <TextField
              size="small"
              value={warehouseLocation || ""}
              onChange={(e) => handleFieldChange("warehouseLocation", e.target.value)}
              sx={{ width: 150 }}
            />
          </Stack>
        </Stack>

        <Stack spacing={1} sx={{ mb: 2 }}>
          <Typography variant="body2">비고</Typography>
          <TextField
            multiline
            rows={2}
            size="small"
            value={note || ""}
            onChange={(e) => handleFieldChange("note", e.target.value)}
          />
        </Stack>

        <Typography variant="subtitle1" sx={{ mt: 2 }}>
          품목 정보
        </Typography>
        <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
          <TextField
            label="품목코드"
            size="small"
            value={currentForm?.rows ? currentForm.rows[0]?.itemCode || "" : ""}
            onChange={(e) => {
              if (isEditMode) {
                setLocalForm((prev) => {
                  const updatedRows = prev.rows.map((row, idx) =>
                    idx === 0 ? { ...row, itemCode: e.target.value } : row
                  );
                  return { ...prev, rows: updatedRows };
                });
              } else {
                setPurchaseOrderRegistrationFormData((prev) => {
                  const updatedRows = prev.rows.map((row, idx) =>
                    idx === 0 ? { ...row, itemCode: e.target.value } : row
                  );
                  return { ...prev, rows: updatedRows };
                });
              }
            }}
            sx={{ width: 120 }}
          />
          <TextField
            label="품목명"
            size="small"
            value={currentForm?.rows ? currentForm.rows[0]?.itemName || "" : ""}
            onChange={(e) => {
              if (isEditMode) {
                setLocalForm((prev) => {
                  const updatedRows = prev.rows.map((row, idx) =>
                    idx === 0 ? { ...row, itemName: e.target.value } : row
                  );
                  return { ...prev, rows: updatedRows };
                });
              } else {
                setPurchaseOrderRegistrationFormData((prev) => {
                  const updatedRows = prev.rows.map((row, idx) =>
                    idx === 0 ? { ...row, itemName: e.target.value } : row
                  );
                  return { ...prev, rows: updatedRows };
                });
              }
            }}
            onDoubleClick={() => setOpenItemModal(true)}
            sx={{ width: 160 }}
          />
          <TextField
            label="단위"
            size="small"
            value={currentForm?.rows ? currentForm.rows[0]?.unit || "" : ""}
            onChange={(e) => {
              if (isEditMode) {
                setLocalForm((prev) => {
                  const updatedRows = prev.rows.map((row, idx) =>
                    idx === 0 ? { ...row, unit: e.target.value } : row
                  );
                  return { ...prev, rows: updatedRows };
                });
              } else {
                setPurchaseOrderRegistrationFormData((prev) => {
                  const updatedRows = prev.rows.map((row, idx) =>
                    idx === 0 ? { ...row, unit: e.target.value } : row
                  );
                  return { ...prev, rows: updatedRows };
                });
              }
            }}
            sx={{ width: 80 }}
          />
          <TextField
            label="수량"
            size="small"
            type="number"
            value={currentForm?.rows ? currentForm.rows[0]?.quantity || 0 : 0}
            onChange={(e) => {
              if (isEditMode) {
                setLocalForm((prev) => {
                  const updatedRows = prev.rows.map((row, idx) =>
                    idx === 0 ? { ...row, quantity: e.target.value } : row
                  );
                  return { ...prev, rows: updatedRows };
                });
              } else {
                setPurchaseOrderRegistrationFormData((prev) => {
                  const updatedRows = prev.rows.map((row, idx) =>
                    idx === 0 ? { ...row, quantity: e.target.value } : row
                  );
                  return { ...prev, rows: updatedRows };
                });
              }
            }}
            sx={{ width: 80 }}
          />
        </Stack>

        <Button variant="contained" onClick={handleSubmit}>
          {isEditMode ? "수정" : "등록"}
        </Button>
      </Box>

      {/* 모달 컴포넌트 */}
      <UserSearchModal
        open={openUserModal}
        onClose={() => setOpenUserModal(false)}
        onSelect={handleSelectUser}
        placeholder="발주자 검색"
      />
      <PartnerSearchModal
        open={openPartnerModal}
        onClose={() => setOpenPartnerModal(false)}
        onSelect={handleSelectPartner}
        placeholder="발주처 검색"
      />
      <ItemSearchModal
        open={openItemModal}
        onClose={() => setOpenItemModal(false)}
        onSelect={handleSelectItem}
        placeholder="품목 검색"
      />
    </Box>
  );
};

export default PurchaseOrderRegistrationForm;
