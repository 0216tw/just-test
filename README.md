# member-front

`member-crud` Spring Boot 프로젝트를 **React 화면에서 호출해보기 위한 DAY5 실습용 프론트 프로젝트**입니다.

React 문법을 깊게 배우기보다 다음 흐름을 눈으로 확인하는 데 초점을 맞췄습니다.

```text
React 화면
  ↓
src/api/*.js
  ↓
Spring Controller
  ↓
Service
  ↓
MyBatis
  ↓
Oracle DB
```

## 구현된 기능

### 회원

- 전체 회원 조회
- 회원 한 명 조회
- 회원 등록
- 회원 수정
- 회원 탈퇴

업로드한 `member-crud`의 `MemberController.java`와 동일한 API를 사용합니다.

```text
GET    /api/members
GET    /api/members/{memberId}
POST   /api/members
PUT    /api/members/{memberId}
DELETE /api/members/{memberId}
```

### 게시글

DAY4 수업에서 만든 Post API를 기준으로 작성했습니다.

```text
GET    /api/posts
GET    /api/posts/{postId}
POST   /api/posts
PUT    /api/posts/{postId}
DELETE /api/posts/{postId}?password=...
```

> 최초 업로드된 `member-crud.zip`에는 Post 관련 Java 파일이 아직 없었습니다.  
> 따라서 게시글 부분은 DAY4에서 수업 중 만든 `PostController / PostService / PostMapper` 구조와 맞췄습니다.

---

# 1. 실행 방법

## 1) 먼저 Spring Boot 실행

`member-crud`를 실행합니다.

기본 서버 주소:

```text
http://localhost:8095
```

Swagger가 열리는지 먼저 확인하면 가장 좋습니다.

```text
http://localhost:8095/swagger-ui.html
```

## 2) 프론트 프로젝트 열기

VS Code에서 이 `member-front` 폴더를 엽니다.

터미널에서 실행합니다.

```bash
npm install
```

설치가 끝나면

```bash
npm run dev
```

터미널에 출력되는 주소로 접속합니다.

일반적으로 다음 주소입니다.

```text
http://localhost:5173
```

---

# 2. 학생들이 우선 볼 파일

React 전체를 이해할 필요는 없습니다. 아래 파일의 **역할만 먼저 구분**하세요.

```text
src
├─ main.jsx
├─ App.jsx
├─ styles.css
│
├─ api
│  ├─ apiClient.js
│  ├─ memberApi.js
│  └─ postApi.js
│
└─ components
   ├─ MemberSection.jsx
   ├─ PostSection.jsx
   └─ Notice.jsx
```

## `main.jsx`

React 프로그램의 시작점입니다.

```text
Spring Boot → MemberCrudApplication.java
React       → main.jsx
```

수업에서는 거의 수정하지 않습니다.

## `App.jsx`

전체 화면의 큰 구조입니다.

- 상단 제목
- 회원 / 게시글 탭
- 어떤 Component를 보여줄지 결정

화면 전체 구조를 바꾸고 싶을 때 확인합니다.

## `components/MemberSection.jsx`

회원 화면입니다.

```text
회원 목록
회원 등록
회원 한 명 조회
회원 수정
회원 탈퇴
```

**"회원 화면에 버튼을 하나 추가해줘"** 같은 바이브코딩을 할 때 가장 먼저 볼 파일입니다.

## `components/PostSection.jsx`

게시글 화면입니다.

```text
게시글 목록
게시글 생성
게시글 한 건 조회
게시글 수정
게시글 삭제
```

게시글 UI 관련 수정은 여기서 시작합니다.

## `api/memberApi.js`

회원 REST API의 URL과 HTTP Method가 있습니다.

예:

```javascript
return request("/api/members");
```

```javascript
method: "POST"
```

Spring의 `MemberController.java`와 나란히 비교하면 이해하기 쉽습니다.

## `api/postApi.js`

게시글 REST API 주소가 있습니다.

Spring의 `PostController.java`와 서로 맞아야 합니다.

## `api/apiClient.js`

모든 API 호출이 공통으로 사용하는 파일입니다.

다음을 확인하고 싶을 때 봅니다.

```text
백엔드 주소가 어디인가?
fetch는 어디서 실행되는가?
HTTP 오류는 어디서 처리되는가?
JSON은 어디서 읽는가?
```

## `styles.css`

색상, 간격, 카드 디자인 등 **화면 모양**만 담당합니다.

기능은 그대로 두고 디자인만 변경하고 싶다면 이 파일 위주로 AI에게 요청하면 됩니다.

---

# 3. 서버 주소 변경

`.env.local` 파일을 확인합니다.

```text
VITE_API_BASE_URL=http://localhost:8095
```

Spring Boot 포트를 바꿨다면 이 값도 변경합니다.

예:

```text
VITE_API_BASE_URL=http://localhost:8080
```

변경 후에는 React 개발 서버를 다시 실행하는 것이 안전합니다.

---

# 4. 오류가 발생하면 어디부터 볼까?

순서를 정해두면 편합니다.

```text
1. Swagger
2. Browser Network
3. Browser Console
4. Spring Boot Terminal
5. 코드
```

## 1) Swagger에서 먼저 같은 API 호출

예를 들어 회원 조회가 안 된다면 Swagger에서 먼저 실행합니다.

```text
GET /api/members
```

### Swagger에서도 실패

React 문제가 아닐 가능성이 큽니다.

```text
Spring Controller
Service
Mapper
DB
```

쪽을 확인합니다.

### Swagger에서는 성공, React에서만 실패

다음을 확인합니다.

```text
React API 주소
HTTP Method
Request JSON
CORS
```

---

# 5. Chrome Network 탭 보는 법

개발자도구를 엽니다.

```text
F12
```

`Network` 탭을 선택합니다.

화면에서 조회/등록 버튼을 누릅니다.

다음 항목을 확인합니다.

```text
Request URL
Request Method
Status Code
Payload
Response
```

예를 들어 회원 등록이라면:

```text
Request URL
http://localhost:8095/api/members

Request Method
POST

Payload
{
  "email": "test@test.com",
  "name": "테스트",
  "phone": "010-1234-5678"
}
```

이 내용이 Spring의 Controller와 맞는지 확인합니다.

---

# 6. Console은 언제 볼까?

Chrome 개발자도구의 `Console`에서는 주로 다음 오류를 확인합니다.

```text
JavaScript 오류
CORS 오류
서버 연결 실패
```

대표적으로 다음과 비슷한 문구가 보이면 CORS를 의심할 수 있습니다.

```text
blocked by CORS policy
```

---

# 7. CORS 오류가 발생한다면

React 기본 개발 서버와 Spring 서버는 포트가 다릅니다.

```text
React  : http://localhost:5173
Spring : http://localhost:8095
```

Spring 프로젝트의 `config` 패키지에 `CorsConfig.java`를 추가할 수 있습니다.

예시는 `docs/CorsConfig.java.example` 파일에 넣어두었습니다.

---

# 8. 바이브코딩할 때 요청 범위를 좁히기

나쁜 예:

```text
React 화면 좀 좋게 만들어줘.
```

AI가 여러 파일을 한꺼번에 크게 수정할 수 있습니다.

조금 더 좋은 예:

```text
MemberSection.jsx에서 회원 목록 부분만 수정해줘.
현재 REST API 호출 함수는 바꾸지 말고,
회원 이름과 이메일이 더 잘 보이는 카드 형태로 변경해줘.
styles.css 수정은 가능해.
```

또는

```text
PostSection.jsx에 제목 검색 입력창을 추가해줘.
백엔드 API는 수정하지 말고,
현재 getPosts()로 받아온 목록을 프론트에서 필터링해줘.
```

핵심은 **어떤 파일과 어떤 기능을 바꿀지 범위를 지정하는 것**입니다.

더 많은 예시는 `VIBE_CODING_GUIDE.md`를 확인하세요.
