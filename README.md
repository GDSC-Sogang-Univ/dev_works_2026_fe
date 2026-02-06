# 서강마켓 (Sogang Market) — Dev Works 2026 FE

대학생 패션 중심 중고거래 플랫폼 프론트엔드 프로젝트입니다.

---

## 🚀 실행 방법

```bash
npm install
npm run dev
# → http://localhost:3000 에서 확인
```

---

## 🗺️ 라우팅 목록

| 경로            | 설명                                           |
| --------------- | ---------------------------------------------- |
| `/`             | 메인 랜딩 페이지 (로그인 상태에 따라 CTA 분기) |
| `/login`        | 로그인 페이지                                  |
| `/signup`       | 회원가입 페이지                                |
| `/verify-email` | 이메일 인증 페이지 (선택 기능)                 |
| `/dashboard`    | 로그인 후 대시보드 (인증 필요)                 |
| `/precheck`     | API 연결 테스트 페이지 (디버깅용)              |

---

## 📡 API 목록 (Mock)

모든 API는 `/api/auth/*` 경로의 Next.js Route Handler로 제공됩니다.

### 회원가입

```
POST /api/auth/signup
Body: { "email": "user@example.com", "password": "password123" }
성공: { "success": true }
실패: { "success": false, "errorCode": "EMAIL_ALREADY_EXISTS", "message": "..." }
```

### 로그인

```
POST /api/auth/login
Body: { "email": "user@example.com", "password": "password123" }
성공: { "success": true, "accessToken": "mock-token-..." }
실패: { "success": false, "errorCode": "INVALID_CREDENTIALS", "message": "..." }
```

### 이메일 인증 코드 발송 (선택)

```
POST /api/auth/email/send-code
Body: { "email": "user@example.com" }
성공: { "success": true }
```

### 이메일 인증 코드 검증 (선택)

```
POST /api/auth/email/verify
Body: { "email": "user@example.com", "code": "123456" }
성공: { "success": true }
실패: { "success": false, "errorCode": "INVALID_OR_EXPIRED_CODE" }
```

> 💡 행사용 힌트: 이메일 인증 코드는 항상 **123456** 입니다.

### 에러 코드 목록

| 코드                      | 설명                   |
| ------------------------- | ---------------------- |
| `EMAIL_ALREADY_EXISTS`    | 이미 가입된 이메일     |
| `INVALID_CREDENTIALS`     | 이메일/비밀번호 불일치 |
| `USER_NOT_FOUND`          | 존재하지 않는 사용자   |
| `EMAIL_NOT_VERIFIED`      | 이메일 미인증          |
| `INVALID_OR_EXPIRED_CODE` | 인증 코드 오류/만료    |
| `MISSING_FIELDS`          | 필수 필드 누락         |

---

## ✅ 구현해야 할 TODO 체크리스트

### 로그인 페이지 (`/login`)

- [ ] 이메일·비밀번호 validation (이메일 형식, 비번 8자 이상)
- [ ] 로딩 상태 처리 (API 호출 중 버튼 비활성화 + 스피너)
- [ ] 에러 메시지 매핑 (에러코드 → 사용자 친화적 메시지)
- [ ] 성공 시 토큰 저장 + 대시보드 라우팅

### 회원가입 페이지 (`/signup`)

- [ ] 이메일·비밀번호·비밀번호 확인 validation
- [ ] 로딩 상태 처리
- [ ] 에러 메시지 매핑
- [ ] 성공 시 로그인 페이지 또는 이메일 인증 페이지로 이동

### 이메일 인증 페이지 (`/verify-email`) — 선택

- [ ] 코드 발송 버튼 & 타이머 UX (재발송 쿨다운)
- [ ] 코드 입력 검증
- [ ] 실패(만료/불일치) 에러 처리
- [ ] 인증 성공 후 로그인 페이지 연결

### UX 개선 (보너스)

- [ ] 각 TextField에 실시간 인라인 에러 표시
- [ ] 비밀번호 보기/숨기기 토글
- [ ] 폼 제출 시 Enter 키 지원 확인
- [ ] 다크 모드 대응 확인

---

## 📁 프로젝트 구조 (주요 파일)

```
src/
├── app/
│   ├── layout.tsx                  # 전역 레이아웃 (AuthProvider + NavBar)
│   ├── AuthProviderWrapper.tsx     # Client Component 래퍼
│   ├── page.tsx                    # 메인 랜딩 페이지
│   ├── (auth)/
│   │   ├── login/page.tsx          # 🔧 로그인 (TODO 포함)
│   │   ├── signup/page.tsx         # 🔧 회원가입 (TODO 포함)
│   │   └── verify-email/page.tsx   # 🔧 이메일 인증 (TODO 포함)
│   ├── dashboard/page.tsx          # 로그인 후 페이지
│   ├── precheck/page.tsx           # API 디버깅 페이지
│   └── api/auth/
│       ├── signup/route.ts         # 회원가입 API
│       ├── login/route.ts          # 로그인 API
│       └── email/
│           ├── send-code/route.ts  # 인증 코드 발송 API
│           └── verify/route.ts     # 인증 코드 검증 API
├── components/
│   ├── TextField.tsx               # 라벨+인풋+에러 컴포넌트
│   ├── Button.tsx                  # 로딩 지원 버튼
│   ├── Alert.tsx                   # 에러/성공/안내 알림
│   └── NavBar.tsx                  # 내비게이션 바
├── features/auth/
│   ├── AuthContext.tsx              # 인증 상태 Context
│   ├── useAuth.ts                  # 인증 훅
│   ├── authStorage.ts              # 토큰 localStorage 관리
│   └── RequireAuth.tsx             # 인증 필요 페이지 래퍼
├── lib/
│   ├── api.ts                      # API 클라이언트 함수
│   └── apiTypes.ts                 # API 응답 타입
└── server/
    ├── mockDb.ts                   # 인-메모리 Mock DB
    └── errors.ts                   # 에러 응답 헬퍼
```

---

## 🛠️ 기술 스택

- **Next.js 16** (App Router)
- **React 19**
- **TypeScript**
- **Tailwind CSS 4**
- **Mock API** (Next.js Route Handlers — 외부 서버 불필요)

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
