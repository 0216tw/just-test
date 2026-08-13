import { useEffect, useState } from "react";
import {
  createPost,
  deletePost,
  getPost,
  getPosts,
  updatePost,
} from "../api/postApi.js";
import Notice from "./Notice.jsx";

const EMPTY_POST = {
  title: "",
  content: "",
  writerId: "",
  password: "",
};

function PostSection() {
  const [posts, setPosts] = useState([]);
  const [form, setForm] = useState(EMPTY_POST);
  const [editingId, setEditingId] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function loadPosts() {
    setLoading(true);
    setError("");

    try {
      const data = await getPosts();
      setPosts(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadPosts();
  }, []);

  function changeForm(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  function resetForm() {
    setForm(EMPTY_POST);
    setEditingId(null);
  }

  async function submitPost(event) {
    event.preventDefault();
    setError("");
    setMessage("");

    // input의 값은 문자열로 들어오기 때문에 writerId만 숫자로 바꿔서 보냅니다.
    const requestBody = {
      title: form.title,
      content: form.content,
      writerId: Number(form.writerId),
      password: form.password,
    };

    try {
      if (editingId === null) {
        await createPost(requestBody);
        setMessage("게시글 등록이 완료되었습니다.");
      } else {
        // DAY4 수업 코드에서는 수정 시 패스워드가 필요합니다.
        await updatePost(editingId, requestBody);
        setMessage(`${editingId}번 게시글 수정이 완료되었습니다.`);
      }

      resetForm();
      await loadPosts();
    } catch (err) {
      setError(err.message);
    }
  }

  async function showDetail(postId) {
    setError("");

    try {
      const post = await getPost(postId);
      setSelectedPost(post);
    } catch (err) {
      setError(err.message);
    }
  }

  function startEdit(post) {
    setEditingId(post.postId);
    setForm({
      title: post.title ?? "",
      content: post.content ?? "",
      writerId: post.writerId ?? "",
      // 조회 결과에는 패스워드를 내려주지 않는 것이 정상적이므로 빈 값으로 둡니다.
      password: "",
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function removePost(post) {
    // 수업에서 만든 DELETE /api/posts/{postId}?password=... 와 연결됩니다.
    const password = window.prompt(`${post.postId}번 게시글의 패스워드를 입력하세요.`);

    if (!password) return;

    setError("");
    setMessage("");

    try {
      await deletePost(post.postId, password);
      setMessage(`${post.postId}번 게시글 삭제가 완료되었습니다.`);

      if (selectedPost?.postId === post.postId) {
        setSelectedPost(null);
      }

      await loadPosts();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <section className="content-grid">
      <aside className="form-card">
        <div className="section-heading">
          <div>
            <span className="section-kicker">POST</span>
            <h2>{editingId === null ? "게시글 생성" : "게시글 수정"}</h2>
          </div>
          {editingId !== null && (
            <button className="text-button" onClick={resetForm} type="button">
              수정 취소
            </button>
          )}
        </div>

        <p className="muted">
          {editingId === null
            ? "POST /api/posts 요청을 보냅니다."
            : `PUT /api/posts/${editingId} 요청을 보냅니다. 패스워드가 필요합니다.`}
        </p>

        <form onSubmit={submitPost} className="form-stack">
          <label>
            <span>제목</span>
            <input
              name="title"
              value={form.title}
              onChange={changeForm}
              placeholder="게시글 제목"
              required
            />
          </label>

          <label>
            <span>내용</span>
            <textarea
              name="content"
              value={form.content}
              onChange={changeForm}
              placeholder="게시글 내용을 입력하세요."
              rows="6"
              required
            />
          </label>

          <div className="two-columns">
            <label>
              <span>작성자 ID</span>
              <input
                name="writerId"
                type="number"
                min="1"
                value={form.writerId}
                onChange={changeForm}
                placeholder="1"
                required
              />
            </label>

            <label>
              <span>패스워드</span>
              <input
                name="password"
                type="password"
                value={form.password}
                onChange={changeForm}
                placeholder="수정·삭제 확인용"
                required
              />
            </label>
          </div>

          <button className="primary-button" type="submit">
            {editingId === null ? "게시글 등록하기" : "수정 내용 저장"}
          </button>
        </form>

        <div className="mini-code-map">
          <strong>바이브코딩할 때 볼 파일</strong>
          <code>PostSection.jsx</code>
          <span>게시글 화면·입력·버튼</span>
          <code>postApi.js</code>
          <span>게시글 REST API 주소</span>
        </div>
      </aside>

      <div className="list-card">
        <div className="section-heading list-heading">
          <div>
            <span className="section-kicker">GET /api/posts</span>
            <h2>게시글 목록</h2>
          </div>
          <button className="secondary-button" onClick={loadPosts} type="button">
            새로고침
          </button>
        </div>

        <Notice type="success">{message}</Notice>
        <Notice type="error">{error}</Notice>

        {loading ? (
          <div className="empty-state">게시글을 불러오는 중입니다...</div>
        ) : posts.length === 0 ? (
          <div className="empty-state">
            게시글이 없습니다. PostController 또는 Network 요청을 확인해주세요.
          </div>
        ) : (
          <div className="post-list">
            {posts.map((post) => (
              <article className="post-card" key={post.postId}>
                <div className="post-card-top">
                  <span className="post-number">#{post.postId}</span>
                  <span className="post-date">{post.createdAt || "작성일시 없음"}</span>
                </div>

                <h3>{post.title}</h3>
                <p>{post.content}</p>

                <div className="post-meta">
                  <span>작성자 ID · {post.writerId}</span>
                </div>

                <div className="post-actions">
                  <button onClick={() => showDetail(post.postId)} type="button">
                    한 건 조회
                  </button>
                  <button onClick={() => startEdit(post)} type="button">
                    수정
                  </button>
                  <button
                    className="danger-text"
                    onClick={() => removePost(post)}
                    type="button"
                  >
                    삭제
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}

        {selectedPost && (
          <div className="detail-panel">
            <div>
              <span className="section-kicker">GET /api/posts/{selectedPost.postId}</span>
              <h3>게시글 한 건 조회 결과</h3>
            </div>
            <dl>
              <div><dt>게시글 ID</dt><dd>{selectedPost.postId}</dd></div>
              <div><dt>제목</dt><dd>{selectedPost.title}</dd></div>
              <div><dt>내용</dt><dd>{selectedPost.content}</dd></div>
              <div><dt>작성자 ID</dt><dd>{selectedPost.writerId}</dd></div>
              <div><dt>작성일시</dt><dd>{selectedPost.createdAt || "-"}</dd></div>
            </dl>
          </div>
        )}
      </div>
    </section>
  );
}

export default PostSection;
