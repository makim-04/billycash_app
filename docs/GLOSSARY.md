# BillyCash App — 용어 사전 & 데이터 클래스 정의서

## 1. 투자 용어 및 의미

### 상품 라이프사이클 (ProductStatus)

| 단계 | 영문 key | 한글명 | 의미 |
|------|----------|--------|------|
| 1 | `pending` | 모집중 | 투자자 모집이 진행 중인 상태. 투자 신청 가능 |
| 2 | `ready` | 모집완료 | 모집이 마감되어 토큰 발행을 대기하는 상태 |
| 3 | `live` | 투자중 | 토큰이 발행되어 실질적인 투자가 진행 중인 상태. 배당 발생 |
| 4 | `expired` | 만기 상환 | 투자 기간이 만료되어 원금 상환이 이루어지는 상태 |
| 추가 | `done` | 완제됨 | 원금과 배당이 모두 상환 완료된 상태 |
| 추가 | `delay` | 연체 | 상환이 지연되고 있는 상태 |

### 투자 관련 용어

| 용어 | 의미 |
|------|------|
| 토큰 | 투자 상품의 소유 단위. 1토큰 = 100,000원 (전 상품 동일) |
| 토큰 단가 | 토큰 1개의 가격. 현재 전 상품 100,000원 |
| 토큰 발행 | 모집 완료 후 투자 토큰이 발행되어 투자가 시작되는 시점 |
| 토큰 발행일 | 토큰이 발행된 날짜 (`issuedDate`) |
| 발행 예정일 | 모집중 상품의 토큰 발행 예정 날짜 (`expectedIssueDate`) |
| 투자 원금 | 투자자가 토큰 구매에 사용한 금액 (`purchasePrice`) |
| 투자 평가액 | 현재 시점의 투자 가치 (`currentValue`) |
| 배당금 | 투자 상품에서 발생한 수익 분배금 (`dividendHistory`) |
| 수익률 | (평가액 - 원금) / 원금 × 100 |
| 보유 토큰 | 투자중(live/delay) 상품에서 보유한 토큰 개수 |
| 만기일 | 투자 기간이 종료되는 날짜 (발행일 + 투자 기간) |

### 자산 관련 용어

| 용어 | 의미 |
|------|------|
| 총 자산 | 투자 원금 + 배당금 + 현금 |
| 현금 | 출금 가능한 원화 잔액 (`cashBalance`) |
| 현금성 자산 | 출금 가능 현금 + 보유 토큰 환산액 |
| 토큰 환산액 | 보유 토큰의 현재 평가 금액 합계 |
| 누적 수익률 | 전체 투자 대비 수익 비율 |

### 거래 유형

| 유형 | 의미 |
|------|------|
| 투자 | 투자 상품에 토큰 신청 (최초 매수) |
| 매수 | 기존 투자 상품에 추가 토큰 구매 |
| 만기 | 배당금 수령 |
| 입금 | 외부 계좌에서 현금 입금 |
| 출금 | 현금을 외부 계좌로 출금 |

---

## 2. TypeScript 인터페이스

### ProductStatus
```typescript
type ProductStatus = 'pending' | 'ready' | 'live' | 'expired' | 'done' | 'delay';
```

### InvestCard (투자 상품)
```typescript
interface InvestCard {
  id: number;                    // 상품 고유 ID
  cat: string;                   // 카테고리 (fnb, cafe, stay, kitchen, meal)
  emoji: string;                 // 카테고리 이모지
  catLabel: string;              // 카테고리 라벨 (F&B, 카페, 스테이 등)
  thumbCls: string;              // 썸네일 CSS 클래스
  productStatus: ProductStatus;  // 상품 라이프사이클 상태
  investors: string;             // 투자자 수 텍스트
  name: string;                  // 상품명
  sub: string;                   // 상품 설명
  pct: number;                   // 모집률 (0~100)
  minInvest: string;             // 토큰 단가 (₩100,000)
  rate: string;                  // 예상 수익률 (월 X.X%)
  reward: string;                // 리워드
  totalTokens: number;           // 총 발행 토큰 수
  img?: string;                  // 상품 이미지 URL
  periodMonths?: number;         // 투자 기간 (개월)
}
```

### TokenHolding (보유 투자 내역)
```typescript
interface TokenHolding {
  investCardId: number;          // 연결된 InvestCard ID
  tokenName: string;             // 토큰 명칭 (MSDM-007 등)
  storeName: string;             // 매장명
  category: string;              // 카테고리
  tokensOwned: number;           // 보유 토큰 수
  totalTokens: number;           // 상품 총 토큰 수
  purchasePrice: number;         // 투자 원금 (원)
  currentValue: number;          // 현재 평가액 (원)
  monthlyYield: string;          // 월 배당률
  lastDividend: number;          // 최근 배당금
  status: '찜' | '투자중' | '투자 종료';
  phase?: '모집중' | '투자중';
  periodMonths?: number;         // 투자 기간 (개월)
  elapsedMonths?: number;        // 경과 개월
  issuedDate?: string;           // 토큰 발행일 (YYYY-MM-DD)
  appliedDate?: string;          // 신청일 (YYYY-MM-DD)
  expectedIssueDate?: string;    // 발행 예정일 (YYYY-MM-DD)
  dividendHistory?: MonthlyRecord[];  // 월별 배당 내역
  storeRevenue?: MonthlyRecord[];     // 월별 매장 매출
}
```

### MonthlyRecord
```typescript
interface MonthlyRecord {
  month: string;   // YYYY-MM
  amount: number;  // 금액 (원)
}
```

### Transaction (거래 내역)
```typescript
interface Transaction {
  id: string;
  date: string;                                          // YYYY-MM-DD
  type: '투자' | '매수' | '만기' | '출금' | '입금';
  storeName: string;
  amount: number;                                        // 금액 (원)
  tokenCount?: number;                                   // 토큰 수
  yieldRate?: string;                                    // 수익률
  status: '발행' | '모집중' | '처리중' | '취소' | '';
}
```

### TokenTransaction (토큰 거래 내역)
```typescript
interface TokenTransaction {
  id: string;
  date: string;
  type: '충전' | '출금' | '투자' | '배당 수령' | '환급';
  description: string;
  tokenAmount: number;
  balance: number;
}
```

### Portfolio (포트폴리오)
```typescript
interface Portfolio {
  totalInvested: number;              // 전체 투자 원금 합계
  currentValue: number;               // 전체 현재 평가액 합계
  totalDividends: number;             // 전체 누적 배당 합계
  cashBalance: number;                // 출금 가능 현금 (원)
  holdings: TokenHolding[];
  transactions: Transaction[];
  tokenTransactions: TokenTransaction[];
}
```

### User
```typescript
interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  joinDate: string;
  kycLevel: number;
}
```

---

## 3. CSS 클래스 체계

### 상태 뱃지 (`.status-*`)

| 클래스 | 배경색 | 글자색 |
|--------|--------|--------|
| `.status-pending` | #FFCE30 (노랑) | #231F20 |
| `.status-ready` | rgba(0,0,0,.4) | rgba(255,255,255,.7) |
| `.status-live` | #3ABF47 (초록) | #FFF |
| `.status-expired` | #F59E0B (주황) | #FFF |
| `.status-done` | #3ABF47 (초록) | #FFF |
| `.status-delay` | #EB5757 (빨강) | #FFF |

### 텍스트 컬러 (`.ps-*`, `.accent-*`)

| 상태 | ps / accent 컬러 |
|------|-----------------|
| pending | var(--green) #3ABF47 |
| ready | var(--light) #999 |
| live | var(--green) #3ABF47 |
| expired | var(--black) #231F20 |
| done | var(--green) #3ABF47 |
| delay | var(--red) #EB5757 |

### 프로그레스 바 (`.prog-bar-*`)

| 클래스 | 색상 | 사용처 |
|--------|------|--------|
| `.prog-bar-green` | #3ABF47 | pending, live |
| `.prog-bar-gray` | #999 | ready, done |
| `.prog-bar-black` | #231F20 | expired |
| `.prog-bar-red` | #EB5757 | delay |
| `.prog-bar-blue` | #3B82F6 | (미사용) |
| `.prog-bar-orange` | #F59E0B | (미사용) |

---

## 4. 페이지 & 라우트

### 인증 불필요
| 라우트 | 컴포넌트 | 설명 |
|--------|----------|------|
| `/login` | LoginPage | 로그인 |
| `/signup` | SignupPage | 회원가입 |

### 인증 필요
| 라우트 | 컴포넌트 | 설명 |
|--------|----------|------|
| `/` | HomePage | 메인 홈 |
| `/invest` | InvestPage | 투자 상품 목록 (모집중/내 투자 탭) |
| `/invest/:id` | InvestDetailPage | 투자 상품 상세 |
| `/invest/:id/apply` | InvestApplyPage | 투자 신청 |
| `/wallet` | WalletPage | 입출금 |
| `/notice` | NoticePage | 공지사항 |
| `/faq` | FAQPage | FAQ |
| `/my` | MyPage | 마이페이지 |
| `/menu` | MenuPage | 메뉴 & 설정 |
| `/search` | SearchPage | 검색 |
| `/pin-setup` | PinSetupPage | 간편 비밀번호 설정 |
| `/account` | AccountPage | 계정 관리 |
| `/asset` | AssetDetailPage | 자산 상세 |
| `/tx-history` | TxHistoryPage | 투자 내역 |
| `/holdings` | HoldingsListPage | 보유 상품 리스트 |

---

## 5. 컴포넌트

| 컴포넌트 | 위치 | 설명 |
|----------|------|------|
| AppShell | components/ | 앱 컨테이너 (StatusBar + TabBar 관리) |
| StatusBar | components/ | iOS 스타일 상태바 |
| TabBar | components/ | 하단 네비게이션 (홈, 투자, 공지, MY) |
| PageHeader | components/ | 페이지 헤더 (제목 + 입출금/검색/메뉴 아이콘) |
| HomeTopBar | components/ | 홈 전용 헤더 (로고 + 유저명 + 아이콘) |
| InvestCard | components/ | 투자 상품 카드 (상태별 뱃지/프로그레스/메타) |

---

## 6. 디자인 토큰

### 색상
| 변수 | 값 | 용도 |
|------|-----|------|
| `--billy` | #FFD400 | 브랜드 노랑 |
| `--billy-light` | #FFF3B0 | 연한 노랑 |
| `--billy-dark` | #E6BF00 | 진한 노랑 |
| `--black` | #231F20 | 기본 텍스트 |
| `--dark` | #333 | 서브 텍스트 |
| `--mid` | #666 | 보조 텍스트 |
| `--light` | #999 | 캡션 텍스트 |
| `--green` | #3ABF47 | 수익/긍정 |
| `--blue` | #3B82F6 | 정보 |
| `--red` | #EB5757 | 손실/경고 |

### 타이포그래피
| 역할 | 크기 | 두께 | 색상 |
|------|------|------|------|
| Label/Caption | 12px | 500 (Medium) | #6B7280 |
| Body-sub | 12px | 300 (Light) | #6B7280 |
| Body | 16px | 300 (Light) | #6B7280 |
| Button/Card | 16px | 400 (Regular) | #231F20 |
| Title-sm | 16px | 600 (SemiBold) | #231F20 |
| Title | 20px | 400 (Regular) | #231F20 |
| Display | 28px | 400 (Regular) | #231F20 |
