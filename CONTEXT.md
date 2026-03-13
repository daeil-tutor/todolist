# CONTEXT.md — To-Do List for Product Designers

> 이 파일은 **PRD v2.0**과 **UI 디자인 프롬프트 v2.1** Notion 페이지를 통합한 프로젝트 컨텍스트 문서입니다.
> AI 코딩 어시스턴트 및 개발자가 프로젝트 전반을 빠르게 파악할 수 있도록 작성되었습니다.

---

## 절대 규칙 (Non-Negotiable)

- **라이트모드 전용** — 다크모드 미지원, 예외 없음
- **CSS 변수 전용 스타일** — 색상·간격·타이포그래피 모두 CSS custom property로 정의
- **폰트:** Pretendard (한글 포함 시), Inter (영문 전용 시)
- **저장소:** localStorage 전용 (클라이언트 단 저장)
- **프레임워크 선택:** Vanilla JS 또는 React (규모에 따라 결정)

---

## 1. 프로젝트 개요

| 항목 | 내용 |
|------|------|
| 제품명 | To-Do List for Product Designers |
| 목적 | 프로덕트 디자이너가 업무 흐름에 맞게 작업 태스크를 빠르게 기록·관리하는 반응형 웹 앱 |
| 디자인 컨셉 | Clean Minimal — 작업에 집중할 수 있는 여백 중심 |
| 레퍼런스 | Linear, Craft, Notion |
| 배포 타겟 | GitHub Pages / Vercel (정적 파일 배포) |

### 제품 목표

- 3초 이내 첫 할 일 등록이 가능한 직관적인 인터페이스
- 프로덕트 디자이너 업무 특성에 맞는 카테고리 기본값 제공
- 모바일 → 데스크톱 전 해상도에서 레이아웃 깨짐 없는 반응형 구현

---

## 2. 타겟 사용자

| 구분 | 설명 |
|------|------|
| 주요 타겟 | **프로덕트 디자이너** |
| 경력 | Junior ~ Senior 전 레벨 |
| 환경 | 피그마, 노션, Jira 등 협업 툴과 병행 사용 |
| 특징 | 멀티태스킹, 짧은 집중 사이클, 시각적 정리 선호 |

---

## 3. 기능 요구사항

### Must Have

- **할 일 CRUD:** 추가 / 목록 조회 / 완료 토글 / 삭제
- **필터링:** 전체 / 미완료 / 완료 / 카테고리별
- **데이터 유지:** localStorage 저장
- **카테고리 관리:**
  - 카테고리 추가 / 삭제 / 이름 변경
  - 카테고리별 색상 구분 태그 (Pill)
  - 카테고리별 그룹핑 뷰 ↔ 전체 뷰 전환

### Should Have

- 할 일 텍스트 인라인 편집
- 남은 할 일 개수 표시
- 드래그 앤 드롭 순서 변경
- 빈 상태(Empty State) 안내 메시지

### Nice to Have (향후 검토)

- 마감일(Due Date) 설정 및 알림
- 피그마 플러그인 연동
- 클라우드 동기화

---

## 4. 기본 카테고리 6종

| 카테고리 | 설명 | 대표 색상 (dot) | Pill 배경 | Pill 텍스트 |
|----------|------|:--------------:|-----------|-------------|
| 리서치 | 사용자 인터뷰, 경쟁사 분석 등 | `#A78BFA` | `#EDE9FE` (Violet 100) | Violet 700 |
| 와이어프레임 | 초안 설계, 플로우 정리 | `#60A5FA` | `#DBEAFE` (Blue 100) | Blue 700 |
| 디자인 | UI 작업, 컴포넌트 제작 | `#34D399` | `#D1FAE5` (Emerald 100) | Emerald 700 |
| 프로토타입 | 인터랙션, 시연 준비 | `#FBBF24` | `#FEF3C7` (Amber 100) | Amber 700 |
| 디자인 리뷰 | 내부 리뷰, QA 피드백 반영 | `#F87171` | `#FEE2E2` (Red 100) | Red 700 |
| 협업/커뮤니케이션 | 회의, 핸드오프, 슬랙 응답 | `#FB923C` | `#FFEDD5` (Orange 100) | Orange 700 |

---

## 5. 데이터 구조

```json
{
  "categories": [
    { "id": "uuid", "name": "리서치", "color": "#A78BFA" },
    { "id": "uuid", "name": "와이어프레임", "color": "#60A5FA" },
    { "id": "uuid", "name": "디자인", "color": "#34D399" },
    { "id": "uuid", "name": "프로토타입", "color": "#FBBF24" },
    { "id": "uuid", "name": "디자인 리뷰", "color": "#F87171" },
    { "id": "uuid", "name": "협업/커뮤니케이션", "color": "#FB923C" }
  ],
  "todos": [
    {
      "id": "uuid-v4",
      "text": "할 일 내용",
      "categoryId": "uuid",
      "completed": false,
      "createdAt": "2026-03-13T09:00:00Z",
      "updatedAt": "2026-03-13T09:00:00Z"
    }
  ]
}
```

---

## 6. 기술 스택

| 항목 | 선택 | 비고 |
|------|------|------|
| 마크업 | HTML5 | 시맨틱 태그 |
| 스타일 | CSS3 / Flexbox, Grid | CSS 변수, 라이트모드 전용 |
| 로직 | Vanilla JS 또는 React | 규모에 따라 결정 |
| 데이터 | localStorage | 클라이언트 단 저장 |
| 배포 | GitHub Pages / Vercel | 정적 파일 배포 |

---

## 7. 반응형 브레이크포인트

| 구간 | 해상도 | 레이아웃 |
|------|--------|----------|
| Mobile | ~ 767px | 단일 컬럼, 하단 고정 입력창 (fixed, safe-area-inset-bottom 대응) |
| Tablet | 768px ~ 1023px | 단일 컬럼, 좌우 패딩 32px |
| Desktop | 1024px ~ | 중앙 정렬 컨테이너 (max-width 680px), 상하 패딩 48px |

---

## 8. 디자인 토큰

### 8.1 색상 시스템

```css
/* 기본 팔레트 */
--color-bg:              #FFFFFF;   /* 전체 배경 */
--color-surface:         #F9FAFB;   /* 카드, 입력창 배경 */
--color-border:          #E5E7EB;   /* 구분선, 입력창 테두리 */
--color-text-primary:    #111827;   /* 할 일 본문 텍스트 */
--color-text-secondary:  #9CA3AF;   /* 플레이스홀더, 보조 텍스트 */
--color-text-disabled:   #D1D5DB;   /* 완료된 항목 취소선 텍스트 */
--color-accent:          #6366F1;   /* 주요 버튼, 활성 필터 탭, 체크박스 */
--color-accent-hover:    #4F46E5;   /* 버튼 hover 상태 */
--color-accent-subtle:   #EEF2FF;   /* 활성 필터 탭 배경 (Indigo 50) */
--color-danger:          #F87171;   /* 삭제 버튼 hover */
--color-danger-subtle:   #FEF2F2;   /* 삭제 버튼 hover 배경 (Red 50) */

/* 카테고리 Pill */
--cat-research-bg:       #EDE9FE;
--cat-research-text:     #6D28D9;
--cat-wireframe-bg:      #DBEAFE;
--cat-wireframe-text:    #1D4ED8;
--cat-design-bg:         #D1FAE5;
--cat-design-text:       #065F46;
--cat-prototype-bg:      #FEF3C7;
--cat-prototype-text:    #92400E;
--cat-review-bg:         #FEE2E2;
--cat-review-text:       #B91C1C;
--cat-collab-bg:         #FFEDD5;
--cat-collab-text:       #C2410C;
```

### 8.2 간격 토큰

```css
--space-1: 4px;   /* 태그 내부 패딩 */
--space-2: 8px;   /* 아이템 내부 간격 */
--space-3: 12px;  /* 섹션 내 요소 간격 */
--space-4: 16px;  /* 컴포넌트 간 기본 간격 */
--space-6: 24px;  /* 섹션 간 간격 */
--space-8: 32px;  /* 그룹 간 간격 */
```

### 8.3 타이포그래피

| 요소 | 폰트 | 크기 | 굵기 | 색상 |
|------|------|------|------|------|
| 앱 타이틀 | Pretendard / Inter | 20px | 600 | Gray 900 |
| 할 일 본문 | Pretendard / Inter | 14px | 400 | Gray 900 |
| 완료된 항목 | Pretendard / Inter | 14px | 400 | Gray 300 + 취소선 |
| 카테고리 태그 | Pretendard / Inter | 11px | 500 | 카테고리별 색상 |
| 카운터 / 보조 | Pretendard / Inter | 12px | 400 | Gray 400 |
| 필터 탭 (활성) | Pretendard / Inter | 13px | 600 | Indigo 500 |
| 필터 탭 (비활성) | Pretendard / Inter | 13px | 400 | Gray 500 |

---

## 9. 컴포넌트 스펙

### 9.1 헤더

```
높이: 56px
내용: 앱 타이틀 (좌측 정렬)
배경: #FFFFFF
하단 border: 1px solid #E5E7EB
```

### 9.2 입력창 (Task Input)

```
높이: 44px
배경: #F9FAFB
테두리: 1px solid #E5E7EB, border-radius 8px
focus: border 1px solid #6366F1, box-shadow 0 0 0 3px rgba(99,102,241,0.1)
플레이스홀더: "할 일을 입력하세요..." — Gray 400
카테고리 셀렉터: 입력창 왼쪽, 드롭다운, 기본값 "카테고리"
추가 버튼 [+]: 오른쪽, 44×44px, 배경 Indigo 500 (#6366F1)
```

### 9.3 필터 탭

```
탭 높이: 32px
활성: 배경 Indigo 50 (#EEF2FF), 텍스트 Indigo 500, border-radius 6px
비활성: 배경 없음, 텍스트 Gray 500
hover: 배경 Gray 100
탭 간격: gap 4px
모바일: 가로 스크롤 (overflow-x: auto, 스크롤바 숨김)
```

### 9.4 할 일 아이템 (Todo Item)

```
높이: 최소 48px (멀티라인 가능)
배경: #FFFFFF / hover: #F9FAFB
border-bottom: 1px solid #E5E7EB

[체크박스]
크기: 18×18px, border-radius 4px
기본: 테두리 1.5px solid Gray 300
완료: 배경 Indigo 500, 흰색 체크 아이콘

[카테고리 태그]
height: 20px, padding: 0 6px, border-radius 4px
폰트: 11px weight 500

[삭제 버튼]
크기: 24×24px, border-radius 4px
desktop: hover 시에만 노출 (opacity 전환)
mobile: 항상 노출
hover: 배경 Red 50 (#FEF2F2), 아이콘 Red 400
```

### 9.5 카테고리 그룹 헤더

```
높이: 32px
폰트: 12px, weight 600, Gray 500
카테고리 색상 dot: 8×8px 원형, 왼쪽
상단 margin: 24px
```

### 9.6 하단 상태바 (Footer)

```
높이: 40px
상단 border: 1px solid #E5E7EB
왼쪽: "N개 남음" — 12px Gray 400
오른쪽: "완료 항목 삭제" — 12px Gray 400, hover 시 Red 400
```

---

## 10. 인터랙션 & 애니메이션

| 인터랙션 | 동작 | 스펙 |
|----------|------|------|
| 할 일 추가 | 목록 상단 슬라이드 인 | opacity 0→1, translateY -8px→0, 150ms ease-out |
| 완료 체크 | 체크박스 + 취소선 | 200ms ease-in-out |
| 항목 삭제 | 슬라이드 아웃 + fade | opacity 1→0, height 축소, 200ms |
| 필터 전환 | 탭 배경 이동 | 150ms ease |
| 삭제 버튼 노출 | hover fade-in | 100ms |
| 입력창 focus | border + shadow | 150ms |

---

## 11. 빈 상태 (Empty State)

```
[모든 할 일 완료 시]
아이콘: 체크 완료 일러스트 (SVG, 48×48px, Gray 200)
텍스트: "모든 할 일을 완료했어요! 🎉" — 16px weight 500 Gray 400
서브: "새로운 태스크를 추가해보세요" — 13px Gray 300

[할 일 자체가 없으면]
아이콘: 빈 목록 일러스트 (SVG)
텍스트: "아직 할 일이 없어요"
서브: "위 입력창에서 첫 번째 태스크를 추가해보세요"

공통: 중앙 정렬, 상하 margin 64px
```

---

## 12. 화면 구성 (와이어프레임)

```
┌──────────────────────────────┐
│       헤더 / 타이틀           │
├──────────────────────────────┤
│  카테고리 ▼  [ 입력창  ] [+] │
├──────────────────────────────┤
│  [전체] [미완료] [완료]       │
│  [리서치] [디자인] [리뷰] …  │
├──────────────────────────────┤
│  🟣 디자인                   │
│    ☐ 메인 화면 컴포넌트 정리  [x] │
│  🔵 디자인 리뷰              │
│    ☑ QA 피드백 반영    [x]   │
├──────────────────────────────┤
│  4개 남음 | 완료 항목 삭제    │
└──────────────────────────────┘
```

---

## 13. 비기능 요구사항 (성능)

- 초기 로딩 2초 이내 (3G 기준)
- 인터랙션 응답 100ms 이내
- 최대 500개 항목 렌더링 유지

---

## 14. 개발 일정

| 단계 | 내용 | 기간 |
|------|------|------|
| M1 | UI 디자인 및 마크업 완성 | 1주 |
| M2 | 핵심 기능 구현 (CRUD + 카테고리 + 필터) | 1주 |
| M3 | 반응형 CSS 및 접근성 적용 | 3일 |
| M4 | 테스트 및 버그 수정 | 2일 |
| M5 | 배포 및 최종 검수 | 1일 |

---

## 15. 구현 체크리스트

- [ ] 색상 토큰 CSS 변수로 정의 (`src/styles/tokens.css`)
- [ ] 카테고리 pill 컴포넌트 구현
- [ ] 체크박스 커스텀 스타일 적용
- [ ] 입력창 focus 상태 구현
- [ ] 필터 탭 활성/비활성 전환
- [ ] 카테고리 그룹핑 / 전체 뷰 토글
- [ ] 아이템 추가/삭제 애니메이션
- [ ] 빈 상태 화면
- [ ] 모바일 fixed 입력창 + safe-area 대응
- [ ] 카테고리 필터 가로 스크롤 (모바일)

---

## 16. 미결 사항

- [ ] React vs Vanilla JS 최종 기술 스택 결정
- [ ] 카테고리 색상 팔레트 최종 확정
- [ ] 피그마 플러그인 연동을 v1 범위에 포함할지 검토
- [ ] PWA 적용 여부

---

## 참조 문서

- Notion PRD v2.0: [v2.0 — 타겟 변경 및 카테고리 추가](https://www.notion.so/3224759a92b6818dae42ce408f53cdd3)
- Notion UI 디자인 프롬프트 v2.1: [v2.1 — UI 디자인 프롬프트](https://www.notion.so/3224759a92b681a4be4dfb0fc5899f65)
- `docs/design-tokens.md` (이후 생성 예정)
- `src/styles/tokens.css` (이후 생성 예정)
