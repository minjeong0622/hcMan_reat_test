const express = require("express");
const path = require("path");

const app = express();

// (0) 로깅 미들웨어 먼저 등록
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] Request URL: ${req.url}`);
  next();
});

// (1) 빌드된 정적 파일 서빙
const buildPath = path.join(__dirname, "build");
app.use(express.static(buildPath));
console.log("Serving static files from:", buildPath);

// (2) 그 외 모든 요청은 index.html 반환 (React 라우터 대응)
app.get("*", (req, res) => {
  const indexFile = path.join(buildPath, "index.html");
  console.log("Sending index.html file from:", indexFile);
  res.sendFile(indexFile, (err) => {
    if (err) {
      console.error("Error sending index.html:", err);
      res.status(500).send(err);
    }
  });
});

// (3) 서버 구동
const PORT = process.env.PORT || 3333;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`\n[INFO] Server is running on port ${PORT}\n`);
});
