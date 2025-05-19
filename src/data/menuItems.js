export const menuItems = [
  {
    id: 0,
    title: "홈",
    path: "/home",
  },
  {
    id: 1,
    title: "기준정보",
    children: [
      {
        id: 11,
        title: "공지사항",
        path: "/notice/search",
      },
      {
        id: 12,
        title: "Q&A",
        path: "/inspection/search",
      },
      {
        id: 13,
        title: "정보확인",
        path: "/inspection/search",
      },
      {
        id: 14,
        title: "사용자관리",
        path: "/inspection/search",
      },
      {
        id: 15,
        title: "자재현황",
        path: "/inspection/search",
      }
    ]
  },
  {
    id: 2,
    title: "수주현황",
    children: [
      {
        id: 21,
        title: "수주접수(발주서)",
        path: "/inspection/search",
      },
      {
        id: 22,
        title: "수주진행현황",
        path: "/inspection/search",
      },
      {
        id: 23,
        title: "납품등록/관리현황",
        path: "/shipment/search",
        path: "/inspection/search",
      },
      {
        id: 24,
        title: "입고현황",
        path: "/inspection/search",
      },
      {
        id: 25,
        title: "전표마감리스트",
        path: "/payment/search",
      },
    ],
  },
  {
    id: 3,
    title: "환경설정",
    children: [
      { id: 31, title: "거래처관리", path: "/partner/search" },
      { id: 32, title: "품목관리", path: "/item/search" },
      { id: 33, title: "공통코드관리", path: "/code/management" },
      { id: 34, title: "사용자관리", path: "/user/search" },
    ],
  },
  {
    id: 4,
    title: "SCM",
    children: [
      {
        id: 41,
        title: "발주관리",
        children: [
          { id: 411, title: "발주등록", path: "/order/registration" },
          { id: 412, title: "발주조회", path: "/order/search" }
        ]
      },
      {
        id: 42,
        title: "주문관리",
        children: [
          { id: 421, title: "주문등록", path: "/purchase-order/registration" },
          { id: 422, title: "주문조회", path: "/purchase-order/search" }
        ]
      },
      {
        id: 43,
        title: "출고관리",
        path: "/shipment/search",
      },
      {
        id: 44,
        title: "검수관리",
        path: "/inspection/search",
      },
      {
        id: 45,
        title: "결제관리",
        path: "/payment/search",
      },
    ],
  },
];
