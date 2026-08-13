// 이 파일은 모든 REST API 호출이 공통으로 거쳐가는 파일입니다.
// "서버 주소는 어디에 있지?", "HTTP 오류를 어디서 처리하지?"가 궁금하면 먼저 이 파일을 봅니다.

export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8095";

function makeErrorMessage(body, status) {
  // Spring의 Validation 오류는 { email: "...", name: "..." }처럼 올 수 있습니다.
  if (body && typeof body === "object") {
    if (body.message) return body.message;

    const messages = Object.values(body).filter(Boolean);
    if (messages.length > 0) return messages.join(" / ");
  }

  if (typeof body === "string" && body.trim()) return body;

  return `요청 처리에 실패했습니다. (HTTP ${status})`;
}

export async function request(path, options = {}) {
  const url = `${API_BASE_URL}${path}`;

  // body가 있을 때는 JSON으로 보낸다고 서버에 알려줍니다.
  const headers = {
    ...(options.body ? { "Content-Type": "application/json" } : {}),
    ...options.headers,
  };

  let response;

  try {
    response = await fetch(url, {
      ...options,
      headers,
    });
  } catch (error) {
    // 이 구간은 서버가 꺼졌거나, CORS 때문에 브라우저가 요청을 막았을 때 자주 들어옵니다.
    throw new Error(
      "서버에 연결할 수 없습니다. Spring Boot 실행 여부와 브라우저 Console의 CORS 오류를 확인해주세요."
    );
  }

  // 204 No Content는 응답 본문이 없으므로 바로 끝냅니다.
  if (response.status === 204) {
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return null;
  }

  const contentType = response.headers.get("content-type") || "";
  let body = null;

  // 백엔드가 JSON을 주면 JSON으로, 문자열을 주면 문자열로 읽습니다.
  // member-crud와 수업용 post API가 서로 다른 응답 형식을 사용해도 처리할 수 있게 만든 부분입니다.
  if (contentType.includes("application/json")) {
    body = await response.json();
  } else {
    body = await response.text();
  }

  if (!response.ok) {
    throw new Error(makeErrorMessage(body, response.status));
  }

  return body;
}
