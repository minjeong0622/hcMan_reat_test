import React, { useState, useContext, useEffect } from "react";
import {
  Box,
  Container,
  Grid,
  Paper,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Link,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Divider,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { AuthContext } from "../../context/AuthContext";
import { loginUser } from "../../services/authApi";
import logo from "../../assets/images/company-logo.png";
import bannerCubes from "../../assets/images/banner-cubes.png";

const LoginPage = () => {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState(() => localStorage.getItem("savedUsername") || "");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const { data } = await loginUser(username, password);
      login(data.token);
      if (remember) {
        localStorage.setItem("savedUsername", username);
      } else {
        localStorage.removeItem("savedUsername");
      }
    } catch (err) {
      setError("로그인 실패: " + (err.response?.data?.message || err.message));
    }
  };

  useEffect(() => {
    if (localStorage.getItem("savedUsername")) {
      setRemember(true);
    }
  }, []);

  const notices = [
    { title: "[중요] 2025년 4월 결산 조기종료 일정 공지", date: "2025-04-04" },
    { title: "[중요] 4/1일부 납품예정정보, SRM 리버부착 시행 안내", date: "2025-03-18" },
    { title: "4/2 SRM 한시 가동중단 안내", date: "2025-04-02" },
  ];

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f5f5f5" }}>
      {/* 헤더 */}
      <Box
        component="header"
        sx={{
          height: 56,
          display: "flex",
          alignItems: "center",
          px: 3,
          bgcolor: "#fff",
          borderBottom: "1px solid #ddd",
        }}
      >
        <img src={logo} alt="희창유업 로고" style={{ height: 50 }} />
        <Typography
          variant="h6"
          sx={{
            ml: 2,
            fontWeight: 600,
            fontSize: "20px",
            lineHeight: "56px",
          }}
        >
          희창유업 구매시스템
        </Typography>
      </Box>

      <Container maxWidth="lg" sx={{ py: 3 }}>
        {/* 배너 + 로그인 */}
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <Box
              sx={{
                position: "relative",
                height: 200,
                bgcolor: "#0072CE",
                color: "#fff",
                p: 3,
                overflow: "hidden",
                borderRadius: 2,
              }}
            >
              <Typography variant="h6" sx={{ mb: 0.5 }}>
                Welcome to
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                HEE CHANG Purchasing System
              </Typography>
              <Box
                component="img"
                src={bannerCubes}
                alt="banner cubes"
                sx={{
                  position: "absolute",
                  right: 16,
                  bottom: 16,
                  width: 120,
                }}
              />
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper
              sx={{
                p: 3,
                height: 200,
                border: "none",
                boxShadow: "none",
                borderRadius: 2,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  fontFamily: "'Montserrat', sans-serif",
                  color: "#0072CE",
                  fontWeight: 700,
                  fontSize: "1.5rem",
                  mb: 2,
                }}
              >
                Login
              </Typography>

              <form onSubmit={handleSubmit} style={{ width: "100%" }}>
                <TextField
                  label="아이디를 입력하세요"
                  variant="outlined"
                  size="small"
                  fullWidth
                  sx={{ mb: 1 }}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                  label="비밀번호를 입력하세요"
                  type="password"
                  variant="outlined"
                  size="small"
                  fullWidth
                  sx={{ mb: 1 }}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {error && (
                  <Typography variant="body2" color="error" sx={{ mb: 1 }}>
                    {error}
                  </Typography>
                )}

                {/* 체크박스 + 링크 정렬 */}
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={remember}
                        onChange={(e) => setRemember(e.target.checked)}
                        size="small"
                        sx={{
                          color: "#0072CE",
                          "&.Mui-checked": {
                            color: "#0072CE",
                          },
                        }}
                      />
                    }
                    label="아이디 저장"
                    sx={{
                      mr: 2,
                      "& .MuiFormControlLabel-label": {
                        fontSize: 14,
                        color: "#0072CE",
                      },
                    }}
                  />
                  <Link
                    underline="none"
                    sx={{
                      ml: "auto",
                      fontSize: 14,
                      color: "#0072CE",
                      cursor: "pointer",
                    }}
                  >
                    아이디/비밀번호 찾기
                  </Link>
                </Box>

                <Button type="submit" variant="contained" fullWidth>
                  로그인
                </Button>
              </form>
            </Paper>
          </Grid>
        </Grid>

        {/* 공지사항 + 신규업체등록 */}
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={12} md={8}>
            <Paper
              sx={{
                p: 2,
                borderStyle: "solid",
                borderWidth: 1,
                borderColor: "#ddd",
                borderRadius: 2,
                boxShadow: 1,
              }}
            >
              <Box sx={{ px: 2, py: 1, borderBottom: "1px solid #ddd" }}>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  공지사항
                </Typography>
              </Box>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>번호</TableCell>
                    <TableCell>제목</TableCell>
                    <TableCell>작성일</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {notices.map((n, i) => (
                    <TableRow key={i} hover>
                      <TableCell>{i + 1}</TableCell>
                      <TableCell>{n.title}</TableCell>
                      <TableCell>{n.date}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card
              sx={{
                p: 2,
                borderStyle: "solid",
                borderWidth: 1,
                borderColor: "#ddd",
                borderRadius: 2,
                boxShadow: 1,
              }}
            >
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    신규업체등록
                  </Typography>
                  <OpenInNewIcon fontSize="small" />
                </Box>
                <Divider sx={{ mb: 1 }} />
                <Typography variant="body2" color="text.secondary">
                  희창유업 구매시스템은 업체등록 후 사용하실 수 있습니다.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default LoginPage;
