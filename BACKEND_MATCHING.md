# React ↔ Spring API 매칭표

## 회원

업로드된 `member-crud`의 `MemberController.java` 기준입니다.

| React 함수 | HTTP | Spring URL | Spring 메서드 |
|---|---|---|---|
| `getMembers()` | GET | `/api/members` | `findAll()` |
| `getMember(id)` | GET | `/api/members/{memberId}` | `findById()` |
| `createMember(member)` | POST | `/api/members` | `create()` |
| `updateMember(id, member)` | PUT | `/api/members/{memberId}` | `update()` |
| `deleteMember(id)` | DELETE | `/api/members/{memberId}` | `delete()` |

회원 등록/수정 JSON:

```json
{
  "email": "student@example.com",
  "name": "홍길동",
  "phone": "010-1234-5678"
}
```

## 게시글

DAY4 수업에서 만든 REST 구조 기준입니다.

| React 함수 | HTTP | Spring URL |
|---|---|---|
| `getPosts()` | GET | `/api/posts` |
| `getPost(id)` | GET | `/api/posts/{postId}` |
| `createPost(post)` | POST | `/api/posts` |
| `updatePost(id, post)` | PUT | `/api/posts/{postId}` |
| `deletePost(id, password)` | DELETE | `/api/posts/{postId}?password=...` |

게시글 등록/수정 JSON:

```json
{
  "title": "게시글 제목",
  "content": "게시글 내용",
  "writerId": 1,
  "password": "1234"
}
```

> 실제 수강생 프로젝트에서 URL이나 요청 JSON을 다르게 작성했다면 `src/api/postApi.js`를 해당 Controller에 맞게 수정하면 됩니다.
