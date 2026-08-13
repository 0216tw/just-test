import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Vite가 React 코드를 개발 서버에서 실행할 수 있도록 하는 기본 설정입니다.
// 수업에서는 이 파일을 자주 수정할 필요가 없습니다.
export default defineConfig({
  plugins: [react()],
});
