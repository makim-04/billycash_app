# Typography Guide — BillyCash App

## Font Family

```
Pretendard Variable, Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif
```

- **Primary**: Pretendard Variable (CDN, dynamic subset)
- **Source**: `https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/variable/pretendardvariable-dynamic-subset.min.css`

---

## Type Scale (4px increments, min 12px)

| Token | CSS Variable | Size | 역할 |
|-------|-------------|------|------|
| `xs` | `--font-xs` | **12px** | 태그, 라벨, 범례, 날짜, 필터/탭, 메타 라벨 |
| `sm` | `--font-sm` | **16px** | 본문 기본, 카드 이름, 버튼, 설명, 입력 필드 |
| `md` | `--font-md` | **20px** | 섹션 타이틀, 통계 수치, 스텝 넘버, 폼 제목 |
| `lg` | `--font-lg` | **24px** | 페이지 히어로 타이틀, 토큰 수치 |
| `xl` | `--font-xl` | **28px** | 홈 히어로 타이틀, 모집 퍼센트 |

---

## Font Weight (200 increments)

| Weight | 역할 |
|--------|------|
| **800** | 타이틀, 카드 이름, 수치 강조, Q 마크 |
| **600** | 버튼, 필터, 태그, 라벨, 날짜, 메타 정보 |
| 400 | 입력 필드, 테이블 데이터 |
| **200** | 본문 기본, 설명 텍스트, 서브텍스트, FAQ 답변 |

---

## Line Height

| Value | 용도 |
|-------|------|
| `1.0` | 숫자, 아이콘 |
| `1.3` | 타이틀 (lg, xl) |
| `1.4` | 카드 타이틀, FAQ 질문 |
| `1.5` | 짧은 설명 텍스트 |
| `1.6` | 본문 기본, 스텝 설명 |
| `1.7` | 섹션 설명, FAQ 답변 |
| `1.8` | 공지 본문 상세 |

---

## Letter Spacing

| Value | 용도 |
|-------|------|
| `-.02em` | 타이틀, 카드 이름, 큰 수치 |
| `.03em` | 태그 |
| `.08em` | 섹션 라벨 (uppercase) |
| 0 | 그 외 모든 텍스트 |

---

## Usage by Component

### Hero (홈)
```
타이틀:    xl(28) / 800 / 1.3 / -.02em
설명:      sm(16) / 200 / 1.7
뱃지:      xs(12) / 600
통계 수치: md(20) / 800
통계 라벨: xs(12) / 200
```

### Page Hero (서브페이지)
```
라벨:   xs(12) / 600 / .08em / uppercase
타이틀: lg(24) / 800 / 1.3 / -.02em
설명:   sm(16) / 200 / 1.6
```

### Card (icard)
```
이름:      sm(16) / 800 / -.02em
서브:      xs(12) / 200
퍼센트:    md(20) / 800
상태/태그: xs(12) / 600
메타 라벨: xs(12) / 600
메타 값:   sm(16) / 800
```

### Button
```
Primary: sm(16) / 600
Outline: sm(16) / 600
Small:   xs(12) / 600
```

### Tag / Filter / Tab
```
전부 xs(12) / 600
```

### Form (Auth)
```
제목:   md(20) / 800
설명:   sm(16) / 200
라벨:   xs(12) / 600
입력:   sm(16) / 400
에러:   xs(12) / 600
```

### MyPage
```
헤더 이름:   md(20) / 800
헤더 이메일: xs(12) / 200
블록 타이틀: sm(16) / 800
토큰 수치:   lg(24) / 800
테이블 값:   sm(16) / 800
테이블 라벨: sm(16) / 600
```

---

## Principles

1. **5단계 사이즈** — 12, 16, 20, 24, 28px (4px 간격)
2. **4단계 웨이트** — 800(강조), 600(인터랙티브/라벨), 400(입력/데이터), 200(본문/설명)
3. **CSS 변수 사용 필수** — 하드코딩된 px 값 대신 `var(--font-*)` 사용
4. **최소 사이즈 12px** — 접근성을 위해 12px 미만 사용 금지
