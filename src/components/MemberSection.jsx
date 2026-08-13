import { useEffect, useState } from "react";
import {
  createMember,
  deleteMember,
  getMember,
  getMembers,
  updateMember,
} from "../api/memberApi.js";
import Notice from "./Notice.jsx";

const EMPTY_FORM = {
  email: "",
  name: "",
  phone: "",
};

function MemberSection() {
  // 서버에서 조회한 회원 목록을 화면에 보관합니다.
  const [members, setMembers] = useState([]);

  // 등록/수정 입력창의 값을 하나의 객체로 관리합니다.
  const [form, setForm] = useState(EMPTY_FORM);

  // null이면 회원 등록, 값이 있으면 해당 회원 수정 모드입니다.
  const [editingId, setEditingId] = useState(null);

  // "한 명 조회" API 결과를 별도로 보여주기 위한 값입니다.
  const [selectedMember, setSelectedMember] = useState(null);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function loadMembers() {
    setLoading(true);
    setError("");

    try {
      const data = await getMembers();
      setMembers(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  // 화면이 처음 열렸을 때 전체 회원 조회 API를 한 번 실행합니다.
  useEffect(() => {
    loadMembers();
  }, []);

  function changeForm(event) {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  }

  function resetForm() {
    setForm(EMPTY_FORM);
    setEditingId(null);
  }

  async function submitMember(event) {
    event.preventDefault();
    setError("");
    setMessage("");

    try {
      if (editingId === null) {
        await createMember(form);
        setMessage("회원 등록이 완료되었습니다.");
      } else {
        await updateMember(editingId, form);
        setMessage(`${editingId}번 회원 수정이 완료되었습니다.`);
      }

      resetForm();
      await loadMembers();
    } catch (err) {
      setError(err.message);
    }
  }

  async function showDetail(memberId) {
    setError("");

    try {
      // GET /api/members/{memberId} 호출
      const member = await getMember(memberId);
      setSelectedMember(member);
    } catch (err) {
      setError(err.message);
    }
  }

  function startEdit(member) {
    setEditingId(member.memberId);
    setForm({
      email: member.email ?? "",
      name: member.name ?? "",
      phone: member.phone ?? "",
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function removeMember(member) {
    const ok = window.confirm(
      `${member.name} 회원(${member.memberId})을 정말 탈퇴 처리할까요?`
    );

    if (!ok) return;

    setError("");
    setMessage("");

    try {
      await deleteMember(member.memberId);
      setMessage(`${member.name} 회원 탈퇴 처리가 완료되었습니다.`);

      if (selectedMember?.memberId === member.memberId) {
        setSelectedMember(null);
      }

      await loadMembers();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <section className="content-grid">
      <aside className="form-card">
        <div className="section-heading">
          <div>
            <span className="section-kicker">MEMBER</span>
            <h2>{editingId === null ? "회원 등록" : "회원 수정"}</h2>
          </div>
          {editingId !== null && (
            <button className="text-button" onClick={resetForm} type="button">
              수정 취소
            </button>
          )}
        </div>

        <p className="muted">
          {editingId === null
            ? "POST /api/members 요청을 보냅니다."
            : `PUT /api/members/${editingId} 요청을 보냅니다.`}
        </p>

        <form onSubmit={submitMember} className="form-stack">
          <label>
            <span>이메일</span>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={changeForm}
              placeholder="student@example.com"
              required
            />
          </label>

          <label>
            <span>이름</span>
            <input
              name="name"
              value={form.name}
              onChange={changeForm}
              placeholder="홍길동"
              required
            />
          </label>

          <label>
            <span>전화번호</span>
            <input
              name="phone"
              value={form.phone}
              onChange={changeForm}
              placeholder="010-1234-5678"
            />
          </label>

          <button className="primary-button" type="submit">
            {editingId === null ? "회원 등록하기" : "수정 내용 저장"}
          </button>
        </form>

        <div className="mini-code-map">
          <strong>바이브코딩할 때 볼 파일</strong>
          <code>MemberSection.jsx</code>
          <span>화면·버튼·입력값</span>
          <code>memberApi.js</code>
          <span>URL·GET/POST/PUT/DELETE</span>
        </div>
      </aside>

      <div className="list-card">
        <div className="section-heading list-heading">
          <div>
            <span className="section-kicker">GET /api/members</span>
            <h2>회원 목록</h2>
          </div>
          <button className="secondary-button" onClick={loadMembers} type="button">
            새로고침
          </button>
        </div>

        <Notice type="success">{message}</Notice>
        <Notice type="error">{error}</Notice>

        {loading ? (
          <div className="empty-state">서버에서 회원을 불러오는 중입니다...</div>
        ) : members.length === 0 ? (
          <div className="empty-state">
            회원이 없습니다. 서버 실행 여부 또는 Network 탭을 확인해주세요.
          </div>
        ) : (
          <div className="member-table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>회원</th>
                  <th>연락처</th>
                  <th>작업</th>
                </tr>
              </thead>
              <tbody>
                {members.map((member) => (
                  <tr key={member.memberId}>
                    <td className="id-cell">#{member.memberId}</td>
                    <td>
                      <strong>{member.name}</strong>
                      <small>{member.email}</small>
                    </td>
                    <td>{member.phone || "-"}</td>
                    <td>
                      <div className="row-actions">
                        <button onClick={() => showDetail(member.memberId)} type="button">
                          조회
                        </button>
                        <button onClick={() => startEdit(member)} type="button">
                          수정
                        </button>
                        <button
                          className="danger-text"
                          onClick={() => removeMember(member)}
                          type="button"
                        >
                          탈퇴
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {selectedMember && (
          <div className="detail-panel">
            <div>
              <span className="section-kicker">
                GET /api/members/{selectedMember.memberId}
              </span>
              <h3>한 명 조회 결과</h3>
            </div>
            <dl>
              <div><dt>회원 ID</dt><dd>{selectedMember.memberId}</dd></div>
              <div><dt>이메일</dt><dd>{selectedMember.email}</dd></div>
              <div><dt>이름</dt><dd>{selectedMember.name}</dd></div>
              <div><dt>전화번호</dt><dd>{selectedMember.phone || "-"}</dd></div>
              <div><dt>가입일시</dt><dd>{selectedMember.createdAt || "-"}</dd></div>
            </dl>
          </div>
        )}
      </div>
    </section>
  );
}

export default MemberSection;
