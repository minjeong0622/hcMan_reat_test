import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // 앱 시작 시 저장된 토큰으로 프로필 조회
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get(`${process.env.REACT_APP_API_BASE_URL}/auth/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setUser(response.data);
        })
        .catch((error) => {
          localStorage.removeItem("token");
          setUser(null);
          alert("서버에 문제가 발생했습니다. 관리자에게 문의하세요.");
        });
    }
  }, []);

  const login = (token) => {
    localStorage.setItem("token", token);
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/auth/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setUser(response.data);
        navigate("/home", { replace: true });
      })
      .catch((error) => {
        localStorage.removeItem("token");
        setUser(null);
        alert("로그인 중 서버 문제가 발생했습니다. 잠시 후 다시 시도해주세요.");
      });
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    setUser(null);
    navigate("/login", { replace: true });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
