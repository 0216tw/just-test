import { request } from "./apiClient.js";

// 이 파일에는 "회원 관련 URL과 HTTP Method"만 모아둡니다.
// 회원 API가 안 맞는 것 같다면 이 파일과 Spring의 MemberController.java를 나란히 비교하면 됩니다.

export function getMembers() {
  return request("/api/members");
}

export function getMember(memberId) {
  return request(`/api/members/${memberId}`);
}

export function createMember(member) {
  return request("/api/members", {
    method: "POST",
    body: JSON.stringify(member),
  });
}

export function updateMember(memberId, member) {
  return request(`/api/members/${memberId}`, {
    method: "PUT",
    body: JSON.stringify(member),
  });
}

export function deleteMember(memberId) {
  return request(`/api/members/${memberId}`, {
    method: "DELETE",
  });
}
