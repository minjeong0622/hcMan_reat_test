// src/components/User/UserManagementContainer.js
import React, { useState, useEffect } from "react";
import { Container, Typography, Button, Stack } from "@mui/material";
import UserRegistrationModal from "./UserRegistrationModal";
import UserSearch from "./UserSearch";
import UserGrid from "./UserGrid";
import UserEditModal from "./UserEditModal";
import { getUsers, deleteUser } from "../../services/userApi";

const UserManagementContainer = () => {
  // 1) 초기 상태를 localStorage에서 불러옴
  const [users, setUsers] = useState(() => {
    const stored = localStorage.getItem("users");
    return stored ? JSON.parse(stored) : []; // 없으면 빈 배열
  });

  const [selectedUserIds, setSelectedUserIds] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  // 2) users 상태가 바뀔 때마다 localStorage에 저장
  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  // 검색 버튼을 눌렀을 때만 서버에서 사용자 목록 가져오기
  const handleSearch = async (searchCond) => {
    try {
      const allUsers = await getUsers(); 
      const filtered = allUsers.filter((user) => {
        if (searchCond.username && !user.username.includes(searchCond.username)) {
          return false;
        }
        return true;
      });
      setUsers(filtered);
      setSelectedUserIds([]);
    } catch (error) {
      console.error("검색 중 오류 발생:", error);
      setUsers([]);
    }
  };

  // 신규 등록 시 기존 users에 추가
  const handleRegistered = (newUser) => {
    setUsers((prev) => [...prev, newUser]);
  };

  // 행(ID) 클릭 시 수정 모달 열기
  const handleRowClick = (user) => {
    setEditingUser(user);
  };

  // 수정 내용 저장 시, 기존 users 상태 갱신
  const handleSave = (updatedUser) => {
    setUsers((prev) =>
      prev.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
    setEditingUser(null);
  };

  // 단일 삭제
  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      setUsers((prev) => prev.filter((user) => user.id !== id));
    } catch (error) {
      console.error("삭제 실패:", error);
    }
  };

  // 체크박스 여러 개 선택 후 일괄 삭제
  const handleBulkDelete = () => {
    if (selectedUserIds.length === 0) {
      alert("삭제할 사용자를 선택해주세요.");
      return;
    }
    selectedUserIds.forEach((id) => handleDelete(id));
    setSelectedUserIds([]);
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        사용자 관리
      </Typography>

      {/* 사용자 등록 모달 버튼 */}
      <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
        <UserRegistrationModal onRegistered={handleRegistered} />
      </Stack>

        //test
      {/* 검색 폼 */}
      <UserSearch onSearch={handleSearch} />

      {/* 일괄 삭제 버튼 */}
      <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
        <Button variant="contained" color="error" onClick={handleBulkDelete}>
          삭제
        </Button>
      </Stack>

      {/* 사용자 그리드 */}
      <UserGrid
        data={users}
        onRowClick={handleRowClick}
        selectedUserIds={selectedUserIds}
        setSelectedUserIds={setSelectedUserIds}
      />

      {/* 사용자 수정 모달 */}
      <UserEditModal
        open={Boolean(editingUser)}
        onClose={() => setEditingUser(null)}
        initialData={editingUser}
        onSave={handleSave}
      />
    </Container>
  );
};

export default UserManagementContainer;
