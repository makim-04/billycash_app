# Typography Guide — BillyCash App

## Font Family

```
Pretendard Variable, Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif
```

- **Primary**: Pretendard Variable (CDN, dynamic subset)
- **Fallback**: System fonts
- **Source**: `https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/variable/pretendardvariable-dynamic-subset.min.css`

---

## Type Scale

앱 전체에서 사용하는 폰트 사이즈 체계입니다.

| Token | Size | 용도 |
|-------|------|------|
| `3xl` | **28px** | 대형 숫자 (모집 퍼센트 등) |
| `2xl` | **24px** | 홈 히어로 타이틀 |
| `xl` | **22px** | 페이지 히어로 타이틀, 큰 수치 |
| `lg` | **18px** | 섹션 타이틀, 헤더 이름, 강조 수치 |
| `md` | **16px** | 블록 타이틀, 중요 CTA 텍스트 |
| `base` | **15px** | 본문 기본, 카드 이름, 테이블 값 |
| `sm` | **14px** | 버튼, 입력 필드, 공지 타이틀, 본문 보조 |
| `xs` | **13px** | 설명 텍스트, 서브텍스트, FAQ 질문, 메타 값 |
| `2xs` | **12px** | 라벨, 필터 버튼, 날짜, 카테고리, FAQ 답변 |
| `3xs` | **11px** | 태그, 뱃지, 섹션 라벨, 상태바, 범례 |
| `4xs` | **10px** | 탭 라벨, 메타 라벨, 카드 썸네일 태그, 최소 텍스트 |

---

## Font Weight

| Weight | Token | 용도 |
|--------|-------|------|
| **900** | `black` | 완료 아이콘, Q 마크 |
| **800** | `extrabold` | 타이틀, 카드 이름, 수치 강조, 블록 제목 |
| **700** | `bold` | 버튼, 필터, 태그, FAQ 질문, 서브 타이틀 |
| **600** | `semibold` | 라벨, 날짜, 상태바 시간, 메타 정보 |
| 400 | `regular` | 일반 본문 (기본값, 명시적 선언 없음) |

> **참고**: Weight 500(medium)은 현재 사용하지 않습니다.

---

## Line Height

| Value | 용도 |
|-------|------|
| `1.0` | 숫자, 아이콘 |
| `1.3` | 타이틀 (히어로, 페이지 제목) |
| `1.4` | 카드 타이틀, FAQ 질문 |
| `1.5` | 공지 미리보기, 설명 텍스트 짧은 것 |
| `1.6` | 본문 기본, step 설명, about 카드 |
| `1.7` | 섹션 설명, FAQ 답변, 히어로 설명 |
| `1.8` | 공지 본문 상세 |

---

## Letter Spacing

| Value | 용도 |
|-------|------|
| `-.02em` | 타이틀, 카드 이름, 큰 수치 (타이트) |
| `-.03em` | 홈 히어로 타이틀 (최대 타이트, 사이트 계승 — 현재 미사용) |
| `.03em` | 태그 |
| `.08em` | 섹션 라벨 (uppercase) |
| 0 (기본) | 그 외 모든 텍스트 |

---

## Usage by Component

### Hero
```
타이틀:  24px / 800 / 1.3 / -.02em
설명:    13px / 400 / 1.7
뱃지:    11px / 700
통계 수치: 18px / 800
통계 라벨: 10px / 400
```

### Page Hero
```
라벨:    11px / 700 / .08em / uppercase
타이틀:  22px / 800 / 1.3 / -.02em
설명:    13px / 400 / 1.6
```

### Card (icard)
```
이름:        15px / 800 / -.02em
서브:        11px / 400
퍼센트:      18px / 800 / -.02em
퍼센트 sup:  11px / 700
상태:        11px / 700
메타 라벨:   10px / 600
메타 값:     13px / 800
카테고리 태그: 10px / 700
```

### Button
```
Primary:  14px / 700
Outline:  13px / 700
Small:    12px / 700
```

### Tag
```
기본:  11px / 700 / .03em
```

### Filter / Tab
```
필터 버튼:  12px / 700
마이 탭:    12px / 700
```

### Section
```
타이틀:  18px / 800
라벨:    11px / 700 / .08em / uppercase
설명:    13px / 400 / 1.7
```

### Form (Auth)
```
카드 타이틀:  20px / 800
카드 설명:    13px / 400
라벨:         12px / 700
입력:         14px / 400
에러:         12px / 600
링크:         13px / 400 (링크부분 700)
```

### MyPage
```
헤더 이름:    18px / 800
헤더 이메일:  12px / 400
블록 타이틀:  16px / 800
서브 타이틀:  13px / 700
토큰 수치:    22px / 800
테이블 값:    15px / 800
테이블 라벨:  13px / 600
```

### Notice
```
타이틀:      14px / 700 / 1.4
미리보기:    12px / 400 / 1.5
날짜:        11px / 400
상세 타이틀: 18px / 800 / 1.3
상세 본문:   14px / 400 / 1.8
```

### FAQ
```
그룹 타이틀:  14px / 800
질문:         13px / 700 / 1.4
답변:         13px / 400 / 1.7
검색 입력:    14px / 400
```

---

## Principles

1. **크기 단계는 최소 1px 차이** — 10, 11, 12, 13, 14, 15, 16, 18, 20, 22, 24, 28px
2. **Weight는 역할 기반** — 타이틀=800, 인터랙티브=700, 라벨=600, 본문=400
3. **Letter spacing은 크기에 비례** — 큰 텍스트는 타이트(-.02em), 작은 대문자는 와이드(.08em)
4. **Line height는 용도에 따라** — 숫자/아이콘은 1.0, 타이틀은 1.3~1.4, 본문은 1.6~1.8
