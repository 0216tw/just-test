import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./styles.css";

// React 프로그램의 시작점입니다.
// Spring Boot의 MemberCrudApplication.java처럼 "앱을 시작하는 파일" 정도로 이해하면 됩니다.
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
