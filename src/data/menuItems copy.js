export const menuItems = [
  {
    id: 0,
    title: "홈",
    path: "/home",
  },
  {
    id: 1,
    title: "인사총무",
    children: [
      {
        id: 11,
        title: "직원관리",
        children: [
          { id: 111, title: "직원등록", path: "/employee/register" },
          { id: 112, title: "직원조회", path: "/employee/search" }
        ]
      },
      {
        id: 12,
        title: "근태관리",
        children: [
          { id: 121, title: "외근신청조회", path: "/attendance/search" },
          { id: 122, title: "근태현황", path: "/attendance/status" }
        ]
      }
    ]
  },
  {
    id: 2,
    title: "SCM",
    children: [
      {
        id: 21,
        title: "발주관리",
        children: [
          { id: 211, title: "발주등록", path: "/order/registration" },
          { id: 212, title: "발주조회", path: "/order/search" }
        ]
      },
      {
        id: 25,
        title: "주문관리",
        children: [
          { id: 251, title: "주문등록", path: "/purchase-order/registration" },
          { id: 252, title: "주문조회", path: "/purchase-order/search" }
        ]
      },
      {
        id: 22,
        title: "출고관리",
        path: "/shipment/search",
      },
      {
        id: 23,
        title: "검수관리",
        path: "/inspection/search",
      },
      {
        id: 24,
        title: "결제관리",
        path: "/payment/search",
      },
    ],
  },
  {
    id: 3,
    title: "기준정보",
    children: [
      { id: 31, title: "거래처관리", path: "/partner/search" },
      { id: 32, title: "품목관리", path: "/item/search" },
      { id: 33, title: "공통코드관리", path: "/code/management" },
      { id: 34, title: "사용자관리", path: "/user/search" },
    ],
  },
];
