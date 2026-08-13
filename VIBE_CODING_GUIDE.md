# 바이브코딩용 코드 지도

React 문법을 전부 암기하는 대신 **"무슨 문제가 생겼을 때 어떤 파일을 AI에게 보여줄 것인가"**를 먼저 익히는 자료입니다.

## 1. 화면 모양을 바꾸고 싶다

주로 확인:

```text
src/components/MemberSection.jsx
src/components/PostSection.jsx
src/styles.css
```

프롬프트 예:

```text
회원 CRUD 기능은 이미 정상 동작해.
API 호출 코드는 변경하지 말고 MemberSection.jsx와 styles.css만 수정해서
회원 목록을 좀 더 보기 좋은 카드 UI로 바꿔줘.
모바일에서도 깨지지 않게 해줘.
```

## 2. API 주소가 이상하다

확인:

```text
.env.local
src/api/memberApi.js
src/api/postApi.js
src/api/apiClient.js
```

Spring 쪽과 비교:

```text
MemberController.java
PostController.java
```

프롬프트 예:

```text
React에서 회원 수정 요청이 404가 나.
MemberController.java와 memberApi.js를 비교해서
URL과 HTTP Method가 일치하는지 확인해줘.
다른 기능은 수정하지 마.
```

## 3. 등록 버튼을 눌렀는데 400 오류

먼저 브라우저 Network에서 `Payload`를 복사합니다.

그리고 Spring의 Domain/DTO와 비교합니다.

```text
Member.java
Post.java
```

프롬프트 예:

```text
회원 등록이 400 오류가 나.
아래는 Network Payload와 Member.java야.
JSON key, 자료형, Validation 조건이 맞는지 비교해줘.
원인을 먼저 설명하고 최소 수정만 해줘.
```

## 4. 버튼을 눌렀는데 요청 자체가 안 보인다

확인:

```text
MemberSection.jsx
PostSection.jsx
Browser Console
```

버튼의 `onClick` 또는 form의 `onSubmit` 부분을 봅니다.

## 5. CORS 오류

확인 순서:

```text
Console에 CORS 문구가 있는가?
↓
Spring CORS 설정이 있는가?
↓
allowedOrigins가 http://localhost:5173 인가?
```

프롬프트 예:

```text
React는 localhost:5173, Spring은 localhost:8095야.
Console에 blocked by CORS policy가 나와.
현재 Spring 설정을 보고 개발환경에서만 5173을 허용하도록 수정해줘.
```

## 6. 백엔드에서 500 오류

React 코드를 먼저 크게 고치지 않습니다.

확인:

```text
Spring Boot Terminal Stack Trace
Controller
Service
Mapper
SQL
```

DAY6에서 더 자세히 다룰 영역입니다.

---

# 기능 추가용 프롬프트 예시

## 회원 이름 검색

```text
member-front 프로젝트에서 회원 이름 검색 기능을 추가해줘.

조건:
1. 백엔드는 수정하지 않는다.
2. getMembers() 결과를 React에서 필터링한다.
3. MemberSection.jsx 위주로 수정한다.
4. 기존 등록/수정/탈퇴 기능을 깨뜨리지 않는다.
5. 수정한 파일과 이유를 마지막에 짧게 정리한다.
```

## 게시글 제목 검색

```text
PostSection.jsx에 게시글 제목 검색 기능을 추가해줘.
백엔드 API 추가 없이 현재 getPosts() 결과를 프론트에서 필터링해줘.
현재 디자인 톤은 유지해줘.
```

## 디자인만 변경

```text
기능 코드는 건드리지 말고 styles.css 위주로만 수정해줘.
현재 회원/게시글 CRUD 버튼과 API 호출은 그대로 유지해야 해.
깔끔한 기업용 관리자 화면 느낌으로 만들어줘.
```

---

# AI 수정 후 반드시 확인할 것

```text
1. npm run dev가 정상 실행되는가?
2. 화면이 열리는가?
3. Network의 API URL/Method가 그대로인가?
4. 회원 CRUD가 모두 되는가?
5. 게시글 CRUD가 모두 되는가?
6. Console 오류가 없는가?
7. git diff로 AI가 어떤 파일을 바꿨는가?
```

특히 마지막 `git diff`가 중요합니다.

AI가 의도하지 않은 파일까지 수정했다면 Commit하기 전에 발견할 수 있습니다.
