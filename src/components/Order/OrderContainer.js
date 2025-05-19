// src/components/Order/OrderContainer.jsx
import React from "react";
import { useGlobalState } from "../../context/GlobalContext";
import {
  fetchOrders,
  fetchOrder,
  approveOrder,
  shipOrder,
  deliverOrder,
  inspectOrder,
  payOrder,
  completeOrder,
  cancelOrder,
} from "../../services/orderApi";
import { Button, Stack, Box, Divider } from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";
import PrintIcon from "@mui/icons-material/Print";
import { useNavigate } from "react-router-dom";
import OrderSearch from "./OrderSearch";
import OrderGrid from "./OrderGrid";
import OrderDetailGrid from "./OrderDetailGrid";
import OrderStatusPanel from "./OrderStatusPanel";

export const OrderContainer = ({ showRegistration = false }) => {
  const { orderData, setOrderData, selectedOrder, setSelectedOrder } = useGlobalState();
  const [selectedOrderIds, setSelectedOrderIds] = React.useState([]);

  const navigate = useNavigate();

  // --- 검색 ---
  const handleSearch = async (searchCond) => {
    try {
      const filtered = await fetchOrders(searchCond);
      setOrderData(filtered);
    } catch (error) {
      console.error("검색 실패:", error);
    }
  };

  // --- 헤더 그리드 클릭 시 상세 재조회 ---
  const handleRowClick = (order) => {
    fetchOrder(order.id)
      .then((fullOrder) => setSelectedOrder(fullOrder))
      .catch((error) => console.error("주문 상세 조회 실패:", error));
  };

  // --- Bulk 액션들 ---
  const handleBulkApprove = async () => {
    if (!selectedOrderIds.length) return;
    try {
      for (const id of selectedOrderIds) {
        await approveOrder(id);
      }
      setOrderData((prev) =>
        prev.map((order) =>
          selectedOrderIds.includes(order.id)
            ? { ...order, status: "APPROVED" }
            : order
        )
      );
      if (selectedOrder && selectedOrderIds.includes(selectedOrder.id)) {
        const fullOrder = await fetchOrder(selectedOrder.id);
        setSelectedOrder(fullOrder);
      }
    } catch (error) {
      alert("현재 상태에서는 발주 승인을 수행할 수 없습니다.");
    }
  };

  const handleBulkShip = async () => {
    if (!selectedOrderIds.length) return;
    try {
      const trackingNumber = "TRACK1234";
      for (const id of selectedOrderIds) {
        await shipOrder(id, trackingNumber);
      }
      setOrderData((prev) =>
        prev.map((order) =>
          selectedOrderIds.includes(order.id)
            ? { ...order, status: "SHIPPED" }
            : order
        )
      );
    } catch (error) {
      alert("현재 상태에서는 출고 처리를 수행할 수 없습니다.");
    }
  };

  const handleBulkDeliver = async () => {
    if (!selectedOrderIds.length) return;
    try {
      for (const id of selectedOrderIds) {
        await deliverOrder(id);
      }
      setOrderData((prev) =>
        prev.map((order) =>
          selectedOrderIds.includes(order.id)
            ? { ...order, status: "DELIVERED" }
            : order
        )
      );
    } catch (error) {
      alert("현재 상태에서는 배송 완료 처리를 수행할 수 없습니다.");
    }
  };

  const handleBulkInspect = async () => {
    if (!selectedOrderIds.length) return;
    try {
      const result = "검수 완료";
      for (const id of selectedOrderIds) {
        await inspectOrder(id, 1, result);
      }
      setOrderData((prev) =>
        prev.map((order) =>
          selectedOrderIds.includes(order.id)
            ? { ...order, status: "INSPECTED" }
            : order
        )
      );
    } catch (error) {
      alert("현재 상태에서는 검수 처리를 수행할 수 없습니다.");
    }
  };

  const handleBulkPay = async () => {
    if (!selectedOrderIds.length) return;
    try {
      const amount = 1000;
      for (const id of selectedOrderIds) {
        await payOrder(id, amount);
      }
      setOrderData((prev) =>
        prev.map((order) =>
          selectedOrderIds.includes(order.id)
            ? { ...order, status: "PAID" }
            : order
        )
      );
    } catch (error) {
      alert("현재 상태에서는 결제 처리를 수행할 수 없습니다.");
    }
  };

  const handleBulkComplete = async () => {
    if (!selectedOrderIds.length) return;
    try {
      for (const id of selectedOrderIds) {
        await completeOrder(id);
      }
      setOrderData((prev) =>
        prev.map((order) =>
          selectedOrderIds.includes(order.id)
            ? { ...order, status: "COMPLETED" }
            : order
        )
      );
    } catch (error) {
      alert("현재 상태에서는 최종 완료를 수행할 수 없습니다.");
    }
  };

  const handleBulkCancel = async () => {
    if (!selectedOrderIds.length) return;
    try {
      for (const id of selectedOrderIds) {
        await cancelOrder(id);
      }
      setOrderData((prev) =>
        prev.map((order) =>
          selectedOrderIds.includes(order.id)
            ? { ...order, status: "CANCELED" }
            : order
        )
      );
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
        height: "100%", // 상위에서 이미 높이 보장 -> 여기서도 100%
        backgroundColor: "#e0e0e0",
        boxSizing: "border-box",
      }}
    >
      {/* (1) 상단 버튼 영역 */}
      <Box
        sx={{
          backgroundColor: "#0070C0",
          p: 0.5,
          borderRadius: 1,
          mb: 1,
        }}
      >
        <Stack direction="row" spacing={2} sx={{ width: "100%" }}>
          {/* 왼쪽 버튼 그룹 */}
          <Box sx={{ display: "flex", gap: 1 }}>
            <Button
              variant="outlined"
              startIcon={<CreateIcon />}
              onClick={() => navigate("/order/registration", { state: { mode: "new" } })}
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

      {/* (2) 검색 조건 영역 */}
      <Box sx={{ backgroundColor: "#fff", p: 1, borderRadius: 2, mb: 1 }}>
        <Box sx={{ px: 1 }}>
          <OrderSearch onSearch={handleSearch} />
        </Box>
      </Box>

      {/* (3) 메인 레이아웃 (헤더그리드 + 디테일 + 오른쪽 패널) */}
      <Box
        sx={{
          flex: 1, // 상단(버튼/검색)을 제외한 나머지 전체
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
        {/* 왼쪽 (헤더 그리드 + 디테일 그리드), 세로 분할 3:2 */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: 2,
            overflow: "hidden",
            minHeight: 0,
          }}
        >
          {/* (3-1) 위쪽: 헤더 그리드 (flex:3) */}
          <Box
            sx={{
              flex: 3,
              overflow: "auto",
              minHeight: 0,
              minWidth: 0,
              border: "1px solid #ddd",
              borderRadius: 1,
            }}
          >
            <OrderGrid
              data={orderData}
              onPrimaryKeyClick={(order) =>
                navigate("/order/registration", { state: { ...order, mode: "edit" } })
              }
              onRowClick={handleRowClick}
              setSelectedOrderIds={setSelectedOrderIds}
              selectedOrderIds={selectedOrderIds}
            />
          </Box>

          {/* (3-2) 아래쪽: 디테일 그리드 (flex:2) */}
          <Box
            sx={{
              flex: 2,
              overflow: "auto",
              minHeight: 0,
              minWidth: 0,
              border: "1px solid #ddd",
              borderRadius: 1,
            }}
          >
            {selectedOrder ? (
              <OrderDetailGrid items={selectedOrder.items || []} />
            ) : (
              <Box sx={{ p: 2 }}>주문을 선택해주세요.</Box>
            )}
          </Box>
        </Box>

        {/* 오른쪽: 주문현황 패널 (고정 폭 300px) */}
        <Box
          sx={{
            width: "300px",
            flexShrink: 0,
            overflow: "auto",
            border: "1px solid #ddd",
            borderRadius: 1,
          }}
        >
          <OrderStatusPanel order={selectedOrder} />
        </Box>
      </Box>

      {/* 숨겨진 검색 버튼 (엔터키나 onSubmit 등으로 트리거) */}
      <Button id="searchButton" type="submit" variant="contained" style={{ display: "none" }}>
        검색
      </Button>
    </Box>
  );
};

export default OrderContainer;
