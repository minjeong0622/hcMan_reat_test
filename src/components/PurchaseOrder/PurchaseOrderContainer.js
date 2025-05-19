// src/components/PurchaseOrder/PurchaseOrderContainer.jsx
import React from "react";
import { Box, Stack, Button, Divider } from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";
import PrintIcon from "@mui/icons-material/Print";
import PurchaseOrderSearch from "./PurchaseOrderSearch";
import PurchaseOrderGrid from "./PurchaseOrderGrid";
import PurchaseOrderStatusPanel from "./PurchaseOrderStatusPanel";
import {
  fetchPurchaseOrders,
  fetchPurchaseOrder,
  approvePurchaseOrder,
  shipPurchaseOrder,
  deliverPurchaseOrder,
  inspectPurchaseOrder,
  payPurchaseOrder,
  completePurchaseOrder,
  cancelPurchaseOrder,
} from "../../services/purchaseOrderApi";
import { useNavigate } from "react-router-dom";
import { useGlobalState } from "../../context/GlobalContext";

const PurchaseOrderContainer = () => {
  const navigate = useNavigate();
  const { 
    purchaseOrderData, 
    setPurchaseOrderData, 
    selectedPurchaseOrder, 
    setSelectedPurchaseOrder 
  } = useGlobalState();
  const [selectedIds, setSelectedIds] = React.useState([]);

  // --- 검색 ---
  const handleSearch = async (searchCond) => {
    try {
      const data = await fetchPurchaseOrders(searchCond);
      setPurchaseOrderData(data);
    } catch (error) {
      console.error("검색 실패:", error);
    }
  };

  // --- 행 클릭 시 상세 조회 ---
  const handleRowClick = async (row) => {
    try {
      const fullData = await fetchPurchaseOrder(row.id);
      setSelectedPurchaseOrder(fullData);
    } catch (err) {
      console.error("상세 조회 실패:", err);
    }
  };

  // --- Bulk 액션 핸들러들 ---
  const handleBulkApprove = async () => {
    if (!selectedIds.length) {
      alert("선택된 항목이 없습니다.");
      return;
    }
    try {
      for (const id of selectedIds) {
        await approvePurchaseOrder(id);
      }
      setPurchaseOrderData((prev) =>
        prev.map((po) =>
          selectedIds.includes(po.id) ? { ...po, status: "APPROVED" } : po
        )
      );
      if (selectedPurchaseOrder && selectedIds.includes(selectedPurchaseOrder.id)) {
        const fullData = await fetchPurchaseOrder(selectedPurchaseOrder.id);
        setSelectedPurchaseOrder(fullData);
      }
      alert("발주 승인 완료!");
    } catch (error) {
      alert("현재 상태에서는 발주 승인을 수행할 수 없습니다.");
    }
  };

  const handleBulkShip = async () => {
    if (!selectedIds.length) {
      alert("선택된 항목이 없습니다.");
      return;
    }
    try {
      const trackingNumber = "TRACK1234"; // 필요시 동적으로 입력받기
      for (const id of selectedIds) {
        await shipPurchaseOrder(id, trackingNumber);
      }
      setPurchaseOrderData((prev) =>
        prev.map((po) =>
          selectedIds.includes(po.id) ? { ...po, status: "SHIPPED" } : po
        )
      );
      alert("출고 처리 완료!");
    } catch (error) {
      alert("현재 상태에서는 출고 처리를 수행할 수 없습니다.");
    }
  };

  const handleBulkDeliver = async () => {
    if (!selectedIds.length) {
      alert("선택된 항목이 없습니다.");
      return;
    }
    try {
      for (const id of selectedIds) {
        await deliverPurchaseOrder(id);
      }
      setPurchaseOrderData((prev) =>
        prev.map((po) =>
          selectedIds.includes(po.id) ? { ...po, status: "DELIVERED" } : po
        )
      );
      alert("배송 완료 처리 완료!");
    } catch (error) {
      alert("현재 상태에서는 배송 완료 처리를 수행할 수 없습니다.");
    }
  };

  const handleBulkInspect = async () => {
    if (!selectedIds.length) {
      alert("선택된 항목이 없습니다.");
      return;
    }
    try {
      const inspectionResult = "검수 완료"; // 실제 결과 반영
      for (const id of selectedIds) {
        await inspectPurchaseOrder(id, 1, inspectionResult);
      }
      setPurchaseOrderData((prev) =>
        prev.map((po) =>
          selectedIds.includes(po.id) ? { ...po, status: "INSPECTED" } : po
        )
      );
      alert("검수 처리 완료!");
    } catch (error) {
      alert("현재 상태에서는 검수 처리를 수행할 수 없습니다.");
    }
  };

  const handleBulkPay = async () => {
    if (!selectedIds.length) {
      alert("선택된 항목이 없습니다.");
      return;
    }
    try {
      const amount = 1000; // 예시 금액, 필요시 동적 처리
      for (const id of selectedIds) {
        await payPurchaseOrder(id, amount);
      }
      setPurchaseOrderData((prev) =>
        prev.map((po) =>
          selectedIds.includes(po.id) ? { ...po, status: "PAID" } : po
        )
      );
      alert("결제 처리 완료!");
    } catch (error) {
      alert("현재 상태에서는 결제 처리를 수행할 수 없습니다.");
    }
  };

  const handleBulkComplete = async () => {
    if (!selectedIds.length) {
      alert("선택된 항목이 없습니다.");
      return;
    }
    try {
      for (const id of selectedIds) {
        await completePurchaseOrder(id);
      }
      setPurchaseOrderData((prev) =>
        prev.map((po) =>
          selectedIds.includes(po.id) ? { ...po, status: "COMPLETED" } : po
        )
      );
      alert("최종 완료 처리 완료!");
    } catch (error) {
      alert("현재 상태에서는 최종 완료를 수행할 수 없습니다.");
    }
  };

  const handleBulkCancel = async () => {
    if (!selectedIds.length) {
      alert("선택된 항목이 없습니다.");
      return;
    }
    try {
      for (const id of selectedIds) {
        await cancelPurchaseOrder(id);
      }
      setPurchaseOrderData((prev) =>
        prev.map((po) =>
          selectedIds.includes(po.id) ? { ...po, status: "CANCELED" } : po
        )
      );
      alert("주문 취소 처리 완료!");
    } catch (error) {
      alert("현재 상태에서는 주문 취소를 수행할 수 없습니다.");
    }
  };

  // 공통 버튼 스타일
  const commonButtonStyles = {
    borderColor: "rgba(255,255,255,0.6)",
    color: "#fff",
    fontSize: "0.8rem",
    height: "30px",
    minWidth: "60px",
    padding: "6px 12px",
    backgroundColor: "transparent",
    transition: "background-color 0.2s, border-color 0.2s",
    ":hover": {
      backgroundColor: "rgba(255,255,255,0.3)",
      borderColor: "rgba(255,255,255,0.9)",
    },
    ":active": { backgroundColor: "rgba(255,255,255,0.35)" },
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        backgroundColor: "#e0e0e0",
        boxSizing: "border-box",
      }}
    >
      {/* 상단 버튼 영역 */}
      <Box
        sx={{
          backgroundColor: "#0070C0",
          p: 0.5,
          borderRadius: 1,
          mb: 1,
        }}
      >
        <Stack direction="row" spacing={2} sx={{ width: "100%" }}>
          <Box sx={{ display: "flex", gap: 1 }}>
            <Button
              variant="outlined"
              startIcon={<CreateIcon />}
              onClick={() =>
                navigate("/purchase-order/registration", { state: { mode: "new" } })
              }
              sx={commonButtonStyles}
            >
              신규
            </Button>
            <Button
              variant="outlined"
              startIcon={<SearchIcon />}
              onClick={() => document.getElementById("searchButton")?.click()}
              sx={commonButtonStyles}
            >
              조회
            </Button>
            <Button variant="outlined" startIcon={<DeleteIcon />} sx={commonButtonStyles}>
              삭제
            </Button>
            <Button variant="outlined" startIcon={<PrintIcon />} sx={commonButtonStyles}>
              인쇄
            </Button>
          </Box>
          <Divider
            orientation="vertical"
            flexItem
            sx={{
              mx: 1,
              borderColor: "rgba(255,255,255,0.3)",
              alignSelf: "stretch",
            }}
          />
          {/* Bulk 액션 버튼 영역 */}
          <Box
            sx={{
              display: "flex",
              gap: 1,
              flex: 1,
              justifyContent: "flex-start",
              overflowX: "auto",
              flexWrap: "nowrap",
            }}
          >
            <Button variant="outlined" sx={commonButtonStyles} onClick={handleBulkApprove}>
              발주 승인
            </Button>
            <Button variant="outlined" sx={commonButtonStyles} onClick={handleBulkShip}>
              출고 처리
            </Button>
            <Button variant="outlined" sx={commonButtonStyles} onClick={handleBulkDeliver}>
              배송 완료
            </Button>
            <Button variant="outlined" sx={commonButtonStyles} onClick={handleBulkInspect}>
              검수 처리
            </Button>
            <Button variant="outlined" sx={commonButtonStyles} onClick={handleBulkPay}>
              결제 처리
            </Button>
            <Button variant="outlined" sx={commonButtonStyles} onClick={handleBulkComplete}>
              최종 완료
            </Button>
            <Button
              variant="outlined"
              sx={{
                ...commonButtonStyles,
                ":hover": {
                  backgroundColor: "rgba(255,0,0,0.3)",
                  borderColor: "rgba(255,0,0,0.9)",
                },
              }}
              onClick={handleBulkCancel}
            >
              주문 취소
            </Button>
          </Box>
        </Stack>
      </Box>

      {/* 검색 조건 영역 */}
      <Box sx={{ backgroundColor: "#fff", p: 1, borderRadius: 2, mb: 1 }}>
        <PurchaseOrderSearch onSearch={handleSearch} />
      </Box>

      {/* 메인 레이아웃: 좌측은 통합 테이블, 우측은 진행 현황 패널 */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "row",
          gap: 2,
          backgroundColor: "#fff",
          p: 1,
          borderRadius: 1,
          overflow: "hidden",
          minHeight: 0,
        }}
      >
        {/* 좌측: 단일 통합 테이블 */}
        <Box
          sx={{
            flex: 1,
            overflow: "auto",
            border: "1px solid #ddd",
            borderRadius: 1,
            minHeight: 0,
          }}
        >
          <PurchaseOrderGrid
            data={purchaseOrderData}
            onPrimaryKeyClick={(row) =>
              navigate("/purchase-order/registration", { state: { ...row, mode: "edit" } })
            }
            onRowClick={handleRowClick}
            selectedIds={selectedIds}
            setSelectedIds={setSelectedIds}
          />
        </Box>

        {/* 우측: 진행 현황 패널 */}
        <Box
          sx={{
            width: 300,
            flexShrink: 0,
            overflow: "auto",
            border: "1px solid #ddd",
            borderRadius: 1,
          }}
        >
          <PurchaseOrderStatusPanel purchaseOrder={selectedPurchaseOrder} />
        </Box>
      </Box>

      {/* 숨겨진 검색 버튼 */}
      <Button id="searchButton" type="submit" variant="contained" style={{ display: "none" }}>
        검색
      </Button>
    </Box>
  );
};

export default PurchaseOrderContainer;
