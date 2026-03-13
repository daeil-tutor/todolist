# Design Token 최종 기준표

> 소스 비교: **노션** (CONTEXT.md — PRD v2.0 + UI 디자인 프롬프트 v2.1) vs **피그마** (노드 `1:2` "Body" — TaskMaster 앱 전체 화면)
> 작성일: 2026-03-13 | 원칙: 피그마 값 우선 채택

---

## Colors

| 역할 | 노션 값 | 피그마 값 | 최종 채택값 | 비고 |
|---|---|---|---|---|
| Background (Body) | `#FFFFFF` | `#f6f6f8` | `#f6f6f8` | 피그마 채택 — 콘텐츠 영역과 패널 배경 구분 |
| Background (Panel) | `#FFFFFF` | `#FFFFFF` | `#FFFFFF` | 일치 |
| Surface / Input bg | `#F9FAFB` | `#f1f5f9` | `#f1f5f9` | 피그마 채택 — Slate 계열로 통일 |
| Border | `#E5E7EB` | `#e2e8f0` | `#e2e8f0` | 피그마 채택 — Slate 200으로 통일 |
| Text Primary | `#111827` | `#0f172a` | `#0f172a` | 피그마 채택 — Gray 900 → Slate 900 |
| Text Secondary | `#9CA3AF` | `#64748b` | `#64748b` | 피그마 채택 — Gray 400 → Slate 500 (더 높은 대비) |
| Text Disabled | `#D1D5DB` | `#94a3b8` | `#94a3b8` | 피그마 채택 — Slate 400 |
| Accent Default | `#6366F1` | `#0d16ff` | `#0d16ff` | 피그마 채택 — Indigo → Electric Blue (브랜드 컬러 변경) |
| Accent Hover | `#4F46E5` | 미확인 | `#0a12cc` | 노션 기준 유지 (Accent 20% 어둡게 적용) |
| Accent Surface | `#EEF2FF` | `rgba(17,50,212,0.1)` | `rgba(17,50,212,0.1)` | 피그마 채택 — 활성 nav 배경 |
| Danger Default | `#F87171` | `#dc2626` | `#dc2626` | 피그마 채택 — Red 400 → Red 600 (접근성 개선) |
| Danger Surface | `#FEF2F2` | `#fee2e2` | `#fee2e2` | 피그마 채택 — 실제 사용된 값 |
| Checkbox Border | `#D1D5DB` | `#cbd5e1` | `#cbd5e1` | 피그마 채택 — Slate 300 |
| Cat. 리서치 bg | `#EDE9FE` | `#EDE9FE` | `#EDE9FE` | 일치 |
| Cat. 와이어프레임 bg | `#DBEAFE` | `#dbeafe` | `#dbeafe` | 일치 |
| Cat. 디자인 bg | `#D1FAE5` | `#f3e8ff` | `#f3e8ff` | 피그마 채택 — Emerald → Purple 100 (Figma 실제 사용값) |
| Cat. 프로토타입 bg | `#FEF3C7` | `#FEF3C7` | `#FEF3C7` | 문서 기준 유지 (피그마 미확인) |
| Cat. 디자인 리뷰 bg | `#FEE2E2` | `#fee2e2` | `#fee2e2` | 일치 |
| Cat. 협업 bg | `#FFEDD5` | `#FFEDD5` | `#FFEDD5` | 문서 기준 유지 (피그마 미확인) |
| Cat. 디자인 text | Emerald 700 | `#9333ea` | `#9333ea` | 피그마 채택 — bg 변경에 따른 텍스트 색상 변경 |
| Cat. 디자인 리뷰 text | Red 700 | `#dc2626` | `#dc2626` | 피그마 채택 |
| Cat. 와이어프레임 text | Blue 700 | `#2563eb` | `#2563eb` | 피그마 채택 |

---

## Typography

| 요소 | 노션 값 | 피그마 값 | 최종 채택값 | 비고 |
|---|---|---|---|---|
| 앱 타이틀 | 20px / 600 / `#111827` | 20px / 700 / `#0f172a` | 20px / 700 / `#0f172a` | 피그마 채택 — Bold로 상향 |
| 섹션 헤딩 | 미정의 | 30px / 700 / `#0f172a` | 30px / 700 / `#0f172a` | 신규 발견 |
| 할 일 본문 | 14px / 400 / `#111827` | 14px / 600 / `#0f172a` | 14px / 600 / `#0f172a` | 피그마 채택 — Regular → SemiBold (가독성 강화) |
| 완료된 항목 | 14px / 400 / `#D1D5DB` + 취소선 | 미확인 | 14px / 400 / `#94a3b8` + 취소선 | 노션 기준 + 색상 토큰 업데이트 |
| 카테고리 태그 | 11px / 500 / 카테고리색 | 12px / 500 / 카테고리색 | 12px / 500 / 카테고리색 | 피그마 채택 — 11px → 12px |
| 카운터 / 보조 | 12px / 400 / `#9CA3AF` | 12px / 400 / `#64748b` | 12px / 400 / `#64748b` | 피그마 채택 — 색상 토큰 변경 |
| 필터 탭 (활성) | 13px / 600 / `#6366F1` | 14px / 500 / `#0d16ff` | 14px / 600 / `#0d16ff` | 피그마 크기·색상 채택, weight는 노션 600 유지 |
| 필터 탭 (비활성) | 13px / 400 / Gray 500 | 14px / 500 / `#0f172a` | 14px / 400 / `#64748b` | 피그마 크기 채택, style은 노션 기준 유지 |
| 날짜 부제목 | 미정의 | 16px / 400 / `#64748b` | 16px / 400 / `#64748b` | 신규 발견 |
| 패널 타이틀 | 미정의 | 16px / 700 / `#0f172a` | 16px / 700 / `#0f172a` | 신규 발견 |
| 섹션 레이블 (uppercase) | 미정의 | 12px / 600 / `#94a3b8` + tracking 0.6px + uppercase | 12px / 600 / `#94a3b8` + tracking 0.6px | 신규 발견 |
| 소형 메타 텍스트 | 미정의 | 10px / 400 / `#94a3b8` | 10px / 400 / `#94a3b8` | 신규 발견 (activity timestamp 등) |

---

## Spacing

| 토큰 | 노션 값 | 피그마 값 | 최종 채택값 | 비고 |
|---|---|---|---|---|
| space-1 | 4px | 4px (태그 내부) | 4px | 일치 |
| space-2 | 8px | 8px (버튼 패딩 y) | 8px | 일치 |
| space-3 | 12px | 12px (nav 아이템 패딩, task 간격) | 12px | 일치 |
| space-4 | 16px | 16px (nav 좌우 패딩, task 내부 gap) | 16px | 일치 |
| space-6 | 24px | 24px (sidebar logo 패딩, 패널 패딩) | 24px | 일치 |
| space-8 | 32px | 32px (메인 콘텐츠 패딩) | 32px | 일치 |
| space-10 | 미정의 | 40px (섹션 간 gap) | 40px | 신규 발견 |
| space-48 | 미정의 | 48px (상하 패딩 Desktop) | 48px | 문서 기준 유지 (피그마 확인) |

---

## Border Radius

| 컴포넌트 | 노션 값 | 피그마 값 | 최종 채택값 | 비고 |
|---|---|---|---|---|
| 입력창 | 8px | 8px | 8px | 일치 |
| 버튼 | 미정의 | 8px | 8px | 신규 발견 |
| 필터 탭 (활성) | 6px | 8px | 8px | 피그마 채택 — nav item과 통일 |
| Task 카드 | 미정의 | 12px | 12px | 신규 발견 — 카드 컴포넌트 radius |
| 카테고리 태그 Pill | 4px | 9999px | 9999px | 피그마 채택 — sharp pill → full pill |
| 체크박스 | 4px | 4px | 4px | 일치 |
| 삭제 버튼 | 4px | 4px | 4px | 일치 |
| Progress bar | 미정의 | 9999px | 9999px | 신규 발견 |
| Avatar | 미정의 | 9999px | 9999px | 신규 발견 |
| 사용자 카드 | 미정의 | 12px | 12px | 신규 발견 |
| 앱 로고 배경 | 미정의 | 8px | 8px | 신규 발견 |

---

## Component Dimensions

| 컴포넌트 | 노션 값 | 피그마 값 | 최종 채택값 | 비고 |
|---|---|---|---|---|
| 헤더 높이 | 56px | 64px | 64px | 피그마 채택 — 여유 높이 반영 |
| 입력창 높이 | 44px | 미측정 (비율 기준) | 44px | 문서 기준 유지 |
| 필터 탭 높이 | 32px | 미측정 | 32px | 문서 기준 유지 |
| 할 일 아이템 최소 높이 | 48px | 54px (padding 17px×2) | 54px | 피그마 채택 |
| 체크박스 크기 | 18×18px | 20×20px | 20×20px | 피그마 채택 |
| 추가 버튼 | 44×44px | 미측정 | 44×44px | 문서 기준 유지 (터치 타겟) |
| 삭제 버튼 | 24×24px | 미측정 | 24×24px | 문서 기준 유지 |

---

## Shadow & Effects

| 컴포넌트 | 노션 값 | 피그마 값 | 최종 채택값 | 비고 |
|---|---|---|---|---|
| 입력창 focus shadow | `0 0 0 3px rgba(99,102,241,0.1)` | 미확인 | `0 0 0 3px rgba(13,22,255,0.1)` | Accent 색상 변경에 따라 업데이트 |
| 기본 버튼 shadow | 미정의 | `0px 1px 2px 0px rgba(0,0,0,0.05)` | `0px 1px 2px rgba(0,0,0,0.05)` | 신규 발견 |
| 헤더 backdrop blur | 미정의 | `rgba(255,255,255,0.8)` + blur 6px | `rgba(255,255,255,0.8)` + blur 6px | 신규 발견 |

---

## 신규 발견 항목

피그마에서만 발견된 값들입니다.

### 색상 신규 발견

| 항목 | 값 | 용도 |
|---|---|---|
| Body background | `#f6f6f8` | 전체 앱 배경 (패널 제외) |
| User card bg | `#f8fafc` | 사이드바 하단 사용자 정보 카드 |
| Progress track | `#f1f5f9` | 진행률 바 배경 |
| Activity dot — success | `#22c55e` | 완료 활동 인디케이터 |
| Activity dot — info | `#3b82f6` | 추가 활동 인디케이터 |
| Progress fill — purple | `#a855f7` | Design Review 진행률 바 색상 |
| Accent overlay (5%) | `rgba(17,50,212,0.05)` | 강조 카드 배경 |
| Accent overlay (10%) | `rgba(17,50,212,0.1)` | 활성 nav 배경, 강조 카드 border |
| Secondary text (muted) | `#475569` | 상세 패널 본문 텍스트 |

### 타이포그래피 신규 발견

| 항목 | 값 | 용도 |
|---|---|---|
| Section heading | 30px / Bold(700) / `#0f172a` / tracking -0.75px | 메인 콘텐츠 페이지 타이틀 |
| Date subtitle | 16px / Regular(400) / `#64748b` | 날짜 표시 부제목 |
| Panel title | 16px / Bold(700) / `#0f172a` | 우측 패널 섹션 타이틀 |
| Section label | 12px / SemiBold(600) / `#94a3b8` / uppercase / tracking 0.6px | "PROJECTS", "RECENT ACTIVITY" 레이블 |
| Micro text | 10px / Regular(400) / `#94a3b8` | activity timestamp 등 |

### 간격 신규 발견

| 항목 | 값 | 용도 |
|---|---|---|
| space-10 | 40px | 섹션 간 gap (scrollable content) |

### 컴포넌트 신규 발견

| 항목 | 값 | 용도 |
|---|---|---|
| 사이드바 너비 | 256px | 좌측 내비게이션 패널 |
| 우측 패널 너비 | 320px | 상세 정보 패널 |
| Progress bar 높이 | 8px | 프로젝트 진행률 바 |
| Avatar 크기 | 40×40px | 사용자 프로필 이미지 |
| App 로고 배경 크기 | 32×32px | 사이드바 앱 아이콘 |
| Header backdrop blur | blur(6px) | 스크롤 시 헤더 배경 블러 |

---

## 문서 기준 유지 항목

노션 문서에만 있고 피그마에서 미확인된 항목들입니다.

| 항목 | 노션 값 | 유지 이유 |
|---|---|---|
| Cat. 프로토타입 bg/text | `#FEF3C7` / Amber 700 | 피그마 미확인 — 노션 기준 유지 |
| Cat. 협업/커뮤니케이션 bg/text | `#FFEDD5` / Orange 700 | 피그마 미확인 — 노션 기준 유지 |
| Cat. 리서치 text | Violet 700 | 피그마 미확인 — 노션 기준 유지 |
| Cat. 와이어프레임 text | Blue 700 | 피그마에서 `#2563eb`로 확인 후 채택 |
| Accent Hover | `#4F46E5` | 피그마 미확인 — Accent 변경 시 `#0a12cc` 검토 필요 |
| 모바일 fixed 입력창 | safe-area-inset-bottom 대응 | 피그마가 Desktop 기준 — 노션 기준 유지 |
| 빈 상태 (Empty State) | 중앙 정렬, margin 64px | 피그마 미포함 — 노션 기준 유지 |

---

## 참조 파일

- `CONTEXT.md` — 노션 PRD 통합 문서
- `src/styles/tokens.css` — 이 파일을 기준으로 CSS 변수 정의 예정
