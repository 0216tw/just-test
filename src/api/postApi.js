import { request } from "./apiClient.js";

// DAY4에서 만든 PostController의 REST API와 매칭되는 파일입니다.
// PostController의 URL이나 HTTP Method를 바꾸면 이 파일도 함께 확인합니다.

export function getPosts() {
  return request("/api/posts");
}

export function getPost(postId) {
  return request(`/api/posts/${postId}`);
}

export function createPost(post) {
  return request("/api/posts", {
    method: "POST",
    body: JSON.stringify(post),
  });
}

export function updatePost(postId, post) {
  return request(`/api/posts/${postId}`, {
    method: "PUT",
    body: JSON.stringify(post),
  });
}

export function deletePost(postId, password) {
  // Query Parameter에 특수문자가 들어가도 URL이 깨지지 않도록 인코딩합니다.
  const encodedPassword = encodeURIComponent(password);

  return request(`/api/posts/${postId}?password=${encodedPassword}`, {
    method: "DELETE",
  });
}
