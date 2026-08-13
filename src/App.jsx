import { useState } from "react";
import MemberSection from "./components/MemberSection.jsx";
import PostSection from "./components/PostSection.jsx";
import { API_BASE_URL } from "./api/apiClient.js";

function App() {
  // 현재 어떤 화면을 보여줄지 저장합니다.
  // 복잡한 Router를 배우지 않아도 되도록 탭 방식으로 단순하게 구성했습니다.
  const [activeTab, setActiveTab] = useState("members");

  return (
    <div className="app-shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">JAVA · SPRING · VIBE CODING</p>
          <h1>Member CRUD Console</h1>
          <p className="topbar-copy">
            React 화면에서 Spring Boot REST API를 호출하는 흐름을 확인하는 실습 프로젝트
          </p>
        </div>

        <div className="server-badge" title=".env.local의 VITE_API_BASE_URL 값입니다.">
          <span className="server-dot" />
          <div>
            <small>게시글을조회하는화면입니다.</small>
            <strong>{API_BASE_URL}</strong>
          </div>
        </div>
      </header>

      <main className="workspace">
        <section className="learning-card">
          <div>
            <span className="learning-number">DAY 5</span>
            <h2>화면보다 먼저 흐름을 보세요.</h2>
          </div>
          <div className="flow-line" aria-label="프론트엔드와 백엔드 호출 흐름">
            <span>React 화면</span>
            <b>→</b>
            <span>api/*.js</span>
            <b>→</b>
            <span>Spring Controller</span>
            <b>→</b>
            <span>Service / MyBatis</span>
            <b>→</b>
            <span>Oracle DB</span>
          </div>
        </section>

        <nav className="tabs" aria-label="기능 선택">
          <button
            className={activeTab === "members" ? "tab active" : "tab"}
            onClick={() => setActiveTab("members")}
          >
            회원 관리
          </button>
          <button
            className={activeTab === "posts" ? "tab active" : "tab"}
            onClick={() => setActiveTab("posts")}
          >
            게시글 관리
          </button>
        </nav>

        {activeTab === "members" ? <MemberSection /> : <PostSection />}
      </main>

      <footer className="footer">
        <span>오류가 나면: Network → Console → Spring Boot 터미널 → Swagger 순서로 확인</span>
      </footer>
    </div>
  );
}

export default App;
