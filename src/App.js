import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/layout/Layout";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/Login/LoginPage";
import AttendanceSearchPage from "./pages/Attendance/AttendanceSearchPage";
import AttendanceStatusPage from "./pages/Attendance/AttendanceStatusPage";
import EmployeeRegisterPage from "./pages/Employee/EmployeeRegisterPage";
import EmployeeSearchPage from "./pages/Employee/EmployeeSearchPage";
import OrderSearchPage from "./pages/Order/OrderSearchPage";
import OrderRegistrationPage from "./pages/Order/OrderRegistrationPage";
// PurchaseOrder 관련 페이지
import PurchaseOrderSearchPage from "./pages/PurchaseOrder/PurchaseOrderSearchPage";
import PurchaseOrderRegistrationPage from "./pages/PurchaseOrder/PurchaseOrderRegistrationPage";
import InspectionSearchPage from "./pages/Inspection/InspectionSearchPage";
import PaymentSearchPage from "./pages/Payment/PaymentSearchPage";
import ShipmentSearchPage from "./pages/Shipment/ShipmentSearchPage";
import PartnerSearchPage from "./pages/Partner/PartnerSearchPage";
import ItemSearchPage from "./pages/Item/ItemSearchPage";
import CodeManagementPage from "./pages/Code/CodeManagementPage";
import UserManagementPage from "./pages/User/UserManagementPage";
// Notice 관련 페이지 추가
import NoticeSearchPage from "./pages/Notice/NoticeSearchPage";
import NoticeRegistrationPage from "./pages/Notice/NoticeRegistrationPage";

import { GlobalProvider } from "./context/GlobalContext";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import NotificationProvider from "./components/Notification/NotificationProvider";

function AppContent() {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <LoginPage />;
  }

  return (
    <Layout>
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/attendance/search" element={<AttendanceSearchPage />} />
        <Route path="/attendance/status" element={<AttendanceStatusPage />} />
        <Route path="/employee/register" element={<EmployeeRegisterPage />} />
        <Route path="/employee/search" element={<EmployeeSearchPage />} />
        <Route path="/order/search" element={<OrderSearchPage />} />
        <Route path="/order/registration" element={<OrderRegistrationPage />} />
        <Route path="/purchase-order/search" element={<PurchaseOrderSearchPage />} />
        <Route path="/purchase-order/registration" element={<PurchaseOrderRegistrationPage />} />
        <Route path="/inspection/search" element={<InspectionSearchPage />} />
        <Route path="/payment/search" element={<PaymentSearchPage />} />
        <Route path="/shipment/search" element={<ShipmentSearchPage />} />
        <Route path="/partner/search" element={<PartnerSearchPage />} />
        <Route path="/item/search" element={<ItemSearchPage />} />
        <Route path="/code/management" element={<CodeManagementPage />} />
        <Route path="/user/search" element={<UserManagementPage />} />
        {/* Notice 관련 라우트 추가 */}
        <Route path="/notice/search" element={<NoticeSearchPage />} />
        <Route path="/notice/registration" element={<NoticeRegistrationPage />} />
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </Layout>
  );
}

function App() {
  return (
    <AuthProvider>
      <GlobalProvider>
        <NotificationProvider>
          <AppContent />
        </NotificationProvider>
      </GlobalProvider>
    </AuthProvider>
  );
}

export default App;
