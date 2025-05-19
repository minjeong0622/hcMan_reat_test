// src/components/Layout/Layout.jsx
import React, { useState, useCallback, useEffect, useContext, useRef } from "react";
import {
  AppBar,
  Toolbar,
  Drawer,
  Box,
  Tabs,
  Tab,
  IconButton,
  MenuItem,
  Link,
  Button,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import { menuItems } from "../../data/menuItems";
import CloseIcon from "@mui/icons-material/Close";
import logo from "../../assets/images/company-logo.png";
import { AuthContext } from "../../context/AuthContext";

// ★ 추가: 글로벌 컨텍스트에서 purchaseOrderRegistrationFormData 초기화할 수 있도록 임포트
import { useGlobalState } from "../../context/GlobalContext";

const drawerWidth = 240;
const headerHeight = 40;
const logoBoxHeight = 40;

const menuItemStyles = {
  height: headerHeight,
  padding: "0 16px",
  minHeight: "unset",
  position: "relative",
  transform: "translateY(-12px)",
  "&::before": {
    content: '""',
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: "transparent",
    zIndex: 0,
    transition: "background-color 0.2s ease",
  },
  "&:hover::before": {
    backgroundColor: "rgba(255,255,255,0.3)",
  },
  "& > *": {
    position: "relative",
    zIndex: 1,
  },
};

const buttonStyles = {
  height: headerHeight,
  padding: "0 16px",
  minHeight: "unset",
  position: "relative",
  transform: "translateY(-12px)",
  color: "#fff",
  transition: "background-color 0.2s ease",
  "&:hover": {
    backgroundColor: "rgba(255,255,255,0.3)",
  },
};

// ★ 추가: purchase-order 등록 폼 초기값 (글로벌 상태를 리셋할 때 사용)
const initialPurchaseOrderForm = {
  buyerId: "",
  buyerName: "",
  supplierId: "",
  supplierName: "",
  dueDate: "",
  warehouseLocation: "",
  note: "",
  itemCode: "",
  itemName: "",
  unitCode: "",
  quantity: 0,
};

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useContext(AuthContext);

  // ★ 추가: 글로벌 상태에서 purchaseOrderRegistrationFormData를 reset하기 위해 사용
  const { setPurchaseOrderRegistrationFormData } = useGlobalState();

  const [tabs, setTabs] = useState([]);
  const [activeTabId, setActiveTabId] = useState(null);
  const [selectedTopMenu, setSelectedTopMenu] = useState(menuItems[1]);
  const orderTabHandledRef = useRef(false);

  const handleSetActiveTab = useCallback(
    (tab) => {
      setActiveTabId(tab.id);
      navigate(tab.path, { state: tab.tabState || null });
    },
    [navigate]
  );

  // 홈 클릭 시 탭 상태는 그대로 두고 "/home"으로 이동
  const handleHomeClick = () => {
    navigate("/home", { state: null });
  };

  const handleTopMenuClick = (menu) => {
    setSelectedTopMenu(menu);
    if (menu.path) {
      const existingTab = tabs.find(
        (tab) => tab.path === menu.path && !tab.mode
      );
      if (existingTab) {
        handleSetActiveTab(existingTab);
      } else {
        const newTab = { id: menu.id.toString(), title: menu.title, path: menu.path };
        setTabs((prevTabs) => [...prevTabs, newTab]);
        handleSetActiveTab(newTab);
      }
    }
  };

  const handleSideMenuClick = (menu) => {
    if (menu.path) {
      const existingTab = tabs.find(
        (tab) => tab.path === menu.path && !tab.mode
      );
      if (existingTab) {
        handleSetActiveTab(existingTab);
      } else {
        const newTab = { id: menu.id.toString(), title: menu.title, path: menu.path };
        setTabs((prevTabs) => [...prevTabs, newTab]);
        handleSetActiveTab(newTab);
      }
    }
  };

  const handleTabChange = (event, newValue) => {
    const targetTab = tabs.find((tab) => tab.id === newValue);
    if (targetTab) {
      handleSetActiveTab(targetTab);
    }
  };

  // ★ 수정: 탭을 닫을 때, 만약 purchaseOrderRegistrationFormData를 reset해야 하는 탭이면 초기화
  const handleCloseTab = (tabToClose, e) => {
    e.stopPropagation();
    setTabs((prevTabs) => {
      const newTabs = prevTabs.filter((tab) => tab.id !== tabToClose.id);

      // 탭 닫힘 시, 만약 "/purchase-order/registration" 이고 모드가 "new"라면 글로벌 상태 리셋
      // (Edit 탭은 로컬 상태로만 관리하므로 상관 없음)
      if (tabToClose.path === "/purchase-order/registration" && !tabToClose.mode) {
        setPurchaseOrderRegistrationFormData(initialPurchaseOrderForm);
      }

      // ★ 필요시 order/registration도 같은 방식으로 처리 가능
      // if (tabToClose.path === "/order/registration" && !tabToClose.mode) {
      //   setOrderRegistrationFormData(initialOrderForm);
      // }

      if (activeTabId === tabToClose.id) {
        if (newTabs.length > 0) {
          const lastTab = newTabs[newTabs.length - 1];
          handleSetActiveTab(lastTab);
        } else {
          setActiveTabId(null);
          navigate("/home", { state: null });
        }
      }
      return newTabs;
    });
  };

  useEffect(() => {
    // Order와 Purchase Order의 등록/수정 경로 모두 처리
    const registrationPaths = ["/order/registration", "/purchase-order/registration"];
    if (registrationPaths.includes(location.pathname) && location.state) {
      if (orderTabHandledRef.current) return;
      orderTabHandledRef.current = true;

      setTabs((prevTabs) => {
        if (location.state.mode === "edit") {
          let newTabId = "";
          let title = "";
          if (location.pathname === "/order/registration") {
            newTabId = `order_registration_edit_${location.state.id || ""}`;
            title = location.state.orderNo
              ? `발주 수정 (${location.state.orderNo})`
              : "발주 수정";
          } else if (location.pathname === "/purchase-order/registration") {
            newTabId = `purchase_order_registration_edit_${location.state.id || ""}`;
            title = location.state.purchaseNo
              ? `주문 수정 (${location.state.purchaseNo})`
              : "주문 수정";
          }
          const existingTab = prevTabs.find((tab) => tab.id === newTabId);
          if (!existingTab) {
            const newTab = {
              id: newTabId,
              title,
              path: location.pathname,
              mode: "edit",
              tabState: location.state,
            };
            handleSetActiveTab(newTab);
            return [...prevTabs, newTab];
          } else {
            handleSetActiveTab(existingTab);
            return prevTabs;
          }
        } else {
          let newTabId = "";
          let title = "";
          if (location.pathname === "/order/registration") {
            newTabId = "order_registration_new";
            title = "발주 등록";
          } else if (location.pathname === "/purchase-order/registration") {
            newTabId = "purchase_order_registration_new";
            title = "주문 등록";
          }
          const existingTab = prevTabs.find((tab) => tab.id === newTabId);
          if (!existingTab) {
            const newTab = {
              id: newTabId,
              title,
              path: location.pathname,
            };
            handleSetActiveTab(newTab);
            return [...prevTabs, newTab];
          } else {
            handleSetActiveTab(existingTab);
            return prevTabs;
          }
        }
      });
    } else if (!registrationPaths.includes(location.pathname)) {
      orderTabHandledRef.current = false;
    }
  }, [location.key, location.pathname, location.state, handleSetActiveTab]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh", // 전체 화면 높이 100vh
        overflow: "hidden",
      }}
    >
      {/* 좌측 사이드바 */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": { width: drawerWidth, boxSizing: "border-box" },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: logoBoxHeight,
            borderBottom: "1px solid #ddd",
            px: 2,
            backgroundColor: "#fff",
          }}
        >
          <Link
            onClick={handleHomeClick}
            sx={{ cursor: "pointer", width: "100%", textDecoration: "none" }}
          >
            <img src={logo} alt="회사 로고" style={{ maxWidth: "75%", height: "auto" }} />
          </Link>
        </Box>
        {selectedTopMenu.children ? (
          <Sidebar menu={{ children: selectedTopMenu.children }} onMenuClick={handleSideMenuClick} />
        ) : null}
      </Drawer>

      {/* 우측 영역: 상단 헤더(AppBar) + 탭 + 본문(children) */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        {/* 상단 AppBar */}
        <AppBar
          position="static"
          sx={{
            flexShrink: 0,
            height: headerHeight,
            backgroundColor: "#0070C0",
            borderBottom: "0px solid #ddd",
          }}
        >
          <Toolbar sx={{ height: headerHeight, minHeight: headerHeight, padding: 0 }}>
            <MenuItem onClick={handleHomeClick} sx={{ ...menuItemStyles, color: "#fff" }}>
              홈
            </MenuItem>
            {menuItems.slice(1).map((menu) => (
              <MenuItem
                key={menu.id}
                onClick={() => handleTopMenuClick(menu)}
                sx={{
                  ...menuItemStyles,
                  color: "#fff",
                  backgroundColor:
                    selectedTopMenu.id === menu.id ? "rgba(255,255,255,0.2)" : "inherit",
                }}
              >
                {menu.title}
              </MenuItem>
            ))}
            <Box sx={{ flexGrow: 1 }} />
            {user ? (
              <Button color="inherit" onClick={handleLogout} sx={buttonStyles}>
                Logout
              </Button>
            ) : (
              <Button color="inherit" onClick={() => navigate("/login")} sx={buttonStyles}>
                Login
              </Button>
            )}
          </Toolbar>
        </AppBar>

        {/* 탭 바: 열려있는 탭이 있을 경우에만 */}
        {tabs.length > 0 && (
          <Tabs
            value={activeTabId}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              mb: "3px",
              flexShrink: 0,
              minHeight: "32px",
              backgroundColor: "#fff",
              "& .MuiTab-root": { minHeight: "32px", padding: "0 16px" },
              "& .MuiTabs-indicator": { backgroundColor: "#0070C0" },
            }}
          >
            {tabs.map((tab) => (
              <Tab
                key={tab.id}
                value={tab.id}
                label={
                  <span
                    style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
                    onClick={() => handleSetActiveTab(tab)}
                  >
                    {tab.title}
                    <IconButton
                      size="small"
                      onClick={(e) => handleCloseTab(tab, e)}
                      sx={{
                        pointerEvents: "auto",
                        "&:hover": { background: "rgba(0, 0, 0, 0.1)", color: "red" },
                      }}
                    >
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  </span>
                }
                sx={{
                  color: "#000",
                  backgroundColor:
                    activeTabId === tab.id ? "rgba(0, 112, 192, 0.08)" : "inherit",
                }}
              />
            ))}
          </Tabs>
        )}

        {/* 실제 페이지 내용(children) */}
        <Box
          sx={{
            flex: 1,
            overflow: "auto",
            backgroundColor: "#f8f8f8",
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
