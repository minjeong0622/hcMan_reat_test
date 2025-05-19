import React, { useReducer, useEffect, useCallback, useState } from "react";
import {
  Modal,
  Box,
  TextField,
  Button,
  Typography,
  CircularProgress,
} from "@mui/material";
import dayjs from "dayjs";
import UserSearchModal from "../User/UserSearchModal";
import PartnerSearchModal from "../Partner/PartnerSearchModal";

const initialState = {
  formData: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_FORM_DATA":
      return { ...state, formData: action.payload };
    case "UPDATE_FIELD":
      return {
        ...state,
        formData: { ...state.formData, [action.field]: action.value },
      };
    case "RESET":
      return initialState;
    default:
      return state;
  }
};

const OrderEditModal = React.memo(({ open, onClose, initialData, onSave }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { formData } = state;

  const [openBuyerModal, setOpenBuyerModal] = useState(false);
  const [buyerSearchMode, setBuyerSearchMode] = useState("name");
  const [openSupplierModal, setOpenSupplierModal] = useState(false);
  const [supplierSearchMode, setSupplierSearchMode] = useState("name");

  useEffect(() => {
    if (initialData) {
      // orderDate 포맷 변경 등 초기 데이터 가공 (없으면 빈 문자열)
      const formattedData = {
        ...initialData,
        orderDate: initialData.orderDate
          ? dayjs(initialData.orderDate).format("YYYY-MM-DD HH:mm")
          : "",
      };
      dispatch({ type: "SET_FORM_DATA", payload: formattedData });
    }
  }, [initialData]);

  const handleFieldChange = useCallback((field, value) => {
    dispatch({ type: "UPDATE_FIELD", field, value });
  }, []);

  const handleClose = useCallback(() => {
    onClose();
    dispatch({ type: "RESET" });
  }, [onClose]);

  const handleSave = useCallback(() => {
    if (!formData) return;
    onSave(formData);
  }, [formData, onSave]);

  if (!formData) {
    return (
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <CircularProgress />
        </Box>
      </Modal>
    );
  }

  return (
    <>
      <Modal open={open} onClose={handleClose} disableEscapeKeyDown>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 500,
            maxHeight: "80vh",
            overflowY: "auto",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" sx={{ mb: 2 }}>
            발주 수정
          </Typography>

          <TextField
            fullWidth
            label="발주 ID"
            margin="dense"
            value={formData.id}
            InputProps={{ readOnly: true }}
          />
          <TextField
            fullWidth
            label="발주일"
            margin="dense"
            value={formData.orderDate}
            InputProps={{ readOnly: true }}
          />
          <TextField
            fullWidth
            label="상태"
            margin="dense"
            value={formData.status}
            InputProps={{ readOnly: true }}
          />

          <TextField
            fullWidth
            label="발주자 ID"
            margin="dense"
            value={formData.buyerId || ""}
            onChange={(e) => {
              const value = e.target.value;
              if (!value || /^\d+$/.test(value)) {
                handleFieldChange("buyerId", value);
              }
            }}
            onDoubleClick={() => {
              setBuyerSearchMode("id");
              setOpenBuyerModal(true);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setBuyerSearchMode("id");
                setOpenBuyerModal(true);
              }
            }}
            helperText="숫자만 입력 (더블클릭 시 검색모달 열림)"
          />
          <TextField
            fullWidth
            label="발주자 이름"
            margin="dense"
            value={formData.buyerName || ""}
            onChange={(e) => handleFieldChange("buyerName", e.target.value)}
            onDoubleClick={() => {
              setBuyerSearchMode("name");
              setOpenBuyerModal(true);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setBuyerSearchMode("name");
                setOpenBuyerModal(true);
              }
            }}
            helperText="발주자 이름 (더블클릭 시 검색모달 열림)"
          />

          <TextField
            fullWidth
            label="발주처 ID"
            margin="dense"
            value={formData.supplierId || ""}
            onChange={(e) => {
              const value = e.target.value;
              if (!value || /^\d+$/.test(value)) {
                handleFieldChange("supplierId", value);
              }
            }}
            onDoubleClick={() => {
              setSupplierSearchMode("id");
              setOpenSupplierModal(true);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setSupplierSearchMode("id");
                setOpenSupplierModal(true);
              }
            }}
            helperText="숫자만 입력 (더블클릭 시 검색모달 열림)"
          />
          <TextField
            fullWidth
            label="발주처 이름"
            margin="dense"
            value={formData.supplierName || ""}
            onChange={(e) => handleFieldChange("supplierName", e.target.value)}
            onDoubleClick={() => {
              setSupplierSearchMode("name");
              setOpenSupplierModal(true);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setSupplierSearchMode("name");
                setOpenSupplierModal(true);
              }
            }}
            helperText="발주처 이름 (더블클릭 시 검색모달 열림)"
          />

          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
            <Button variant="outlined" onClick={handleSave}>
              수정 내용 저장
            </Button>
            <Button variant="outlined" onClick={handleClose} sx={{ ml: 2 }}>
              닫기
            </Button>
          </Box>
        </Box>
      </Modal>

      <UserSearchModal
        open={openBuyerModal}
        onClose={() => setOpenBuyerModal(false)}
        onSelect={(selected) => {
          handleFieldChange("buyerId", selected.id);
          handleFieldChange("buyerName", selected.username);
          setOpenBuyerModal(false);
        }}
        searchQuery={buyerSearchMode === "id" ? formData.buyerId : formData.buyerName}
        placeholder="발주자 검색"
      />

      <PartnerSearchModal
        open={openSupplierModal}
        onClose={() => setOpenSupplierModal(false)}
        onSelect={(selected) => {
          handleFieldChange("supplierId", selected.id);
          handleFieldChange("supplierName", selected.partnerName);
          setOpenSupplierModal(false);
        }}
        searchQuery={supplierSearchMode === "id" ? formData.supplierId : formData.supplierName}
        placeholder="발주처 검색"
      />
    </>
  );
});

export default OrderEditModal;
