# relationship-preference-map - Design Document (Starter)

> Version: 1.0.0 | Date: 2026-07-29 | Status: Approved for implementation
> Level: Starter | Plan: `docs/01-plan/features/relationship-preference-map.plan.md`

---

## 1. Overview

`마음의 순간`은 사용자가 특정 상대 또는 일반적인 연인을 떠올리며 장면형
밸런스 게임을 진행하고, 받는 사랑과 표현하는 사랑의 상대적 우선순위를 확인하는
모바일 우선 단일 페이지 웹앱이다.

애플리케이션은 서버 없이 동작한다. 문항 데이터, 상태 관리, 점수 계산, 결과
렌더링을 각각 분리하고 브라우저 `localStorage`에 진행 상태를 저장한다.

## 2. Information Architecture

### 2.1 App States

| State | Purpose | Entry Condition |
|---|---|---|
| `welcome` | 가치 제안, 소요 시간, 비진단 안내 | 첫 방문 또는 초기화 |
| `context` | 평가 대상 맥락 선택 | 시작 버튼 |
| `chapter-intro` | 받기/표현 트랙 설명 | 맥락 선택 또는 첫 트랙 완료 |
| `question` | 장면과 두 선택지 제시 | 트랙 시작 |
| `confidence` | 선택 강도 기록 | A/B 선택 직후 |
| `chapter-complete` | 한 트랙 중간 결과 | 20문항 완료 |
| `result` | 통합 결과 및 행동 카드 | 두 트랙 완료 |

### 2.2 Primary Flow

`welcome → context → receive intro → 20 questions → receive summary →
express intro → 20 questions → result`

### 2.3 Recovery Flow

- 진행 중 재접속: 저장된 화면과 문항 번호를 복원
- 한 트랙 완료 후 재접속: 다음 트랙 소개 또는 결과 복원
- 저장 데이터 버전 불일치: 안전하게 초기 상태로 이동

## 3. Visual Design

### 3.1 Concept

- 키워드: 따뜻함, 솔직함, 사적인 메모, 선택의 긴장
- 모티프: 종이 카드, 형광펜 밑줄, 작은 별표, 손글씨 메모
- 영업중 콘텐츠의 명확한 VS 구도는 참고하되 방송 화면이나 에셋은 복제하지 않는다.

### 3.2 Layout

- 전체 배경: 따뜻한 크림색
- 중앙 앱 셸: 최대 760px
- 질문 화면: 상단 진행 정보, 장면 카드, VS 선택 카드 2개, 하단 뒤로가기
- 데스크톱: 선택 카드 2열
- 모바일: 선택 카드 세로 배치, 하단 진행 제어 고정
- 결과: 핵심 요약 → 받기/표현 비교 → 순위 → 행동 카드 → 공유/초기화

### 3.3 Design Tokens

| Token | Value | Usage |
|---|---|---|
| `--paper` | `#fffaf1` | app surface |
| `--ink` | `#27231f` | primary text |
| `--muted` | `#746d65` | secondary text |
| `--coral` | `#ef6a62` | receive/accent |
| `--lime` | `#c9dc68` | express/accent |
| `--lavender` | `#b9a8e8` | supportive accent |
| `--line` | `#ded5c8` | borders |
| `--shadow` | `0 18px 50px rgba(65, 48, 35, .12)` | cards |

Font stack:
`Pretendard Variable, Pretendard, "Noto Sans KR", system-ui, sans-serif`.
External font requests are not required.

### 3.4 Breakpoints

- Base: 360px–719px
- Tablet: 720px–1023px
- Desktop: 1024px+

### 3.5 Motion

- 화면 전환: 180ms opacity + translate
- 선택 카드: 120ms border/background response
- 순위 막대: 결과 진입 시 500ms width transition
- `prefers-reduced-motion: reduce`: transitions and animations disabled

## 4. Components

| Component | Responsibility |
|---|---|
| `AppShell` | header, main live region, footer |
| `BrandMark` | 독자 워킹 타이틀 표현 |
| `ProgressHeader` | chapter, count, progress bar |
| `SceneCard` | 시간·사건·감정이 포함된 장면 |
| `ChoiceCard` | A/B 행동 선택, 범주명 비노출 |
| `ConfidencePanel` | 간발의 차이/확실히 선택 |
| `ChapterSummary` | 한 트랙의 상위 범주와 다음 행동 |
| `RankingList` | 1~5위, 점수, 동점 표시 |
| `DifferenceCard` | 받기와 표현의 차이 문장 |
| `ActionCards` | 사용자가 실제 선택한 행동 예시 |
| `PrivacyNote` | 로컬 저장·비진단 안내 |
| `Toast` | 복사 성공 등 상태 피드백 |

정적 구현에서는 위 구성요소를 JavaScript 렌더 함수로 만든다.

## 5. Data Model

### 5.1 Category

```js
{
  id: "words",
  name: "인정하는 말",
  shortName: "말",
  icon: "“ ”",
  description: "구체적인 칭찬, 감사, 응원과 애정 표현"
}
```

허용 ID: `words`, `time`, `gifts`, `service`, `touch`

### 5.2 Question

```js
{
  id: "receive-words-touch-01",
  track: "receive",
  pair: ["words", "touch"],
  context: "회복",
  scene: "회사에서 크게 실수하고 집에 온 날...",
  a: {
    category: "words",
    text: "내가 잘한 점과 노력한 부분을 구체적으로 말해준다."
  },
  b: {
    category: "touch",
    text: "말없이 안아주고 내가 놓을 때까지 기다린다."
  }
}
```

### 5.3 Answer

```js
{
  questionId: "receive-words-touch-01",
  selected: "words",
  confidence: "clear",
  answeredAt: "2026-07-29T00:00:00.000Z"
}
```

### 5.4 App State

```js
{
  version: 1,
  view: "question",
  context: "specific",
  activeTrack: "receive",
  questionIndex: 0,
  order: {
    receive: ["..."],
    express: ["..."]
  },
  answers: {
    receive: {},
    express: {}
  },
  completedTracks: [],
  seed: 123456
}
```

## 6. Question Set Design

### 6.1 Pair Matrix

각 트랙에 아래 10개 조합을 정확히 두 번 포함한다.

`words-time`, `words-gifts`, `words-service`, `words-touch`,
`time-gifts`, `time-service`, `time-touch`, `gifts-service`,
`gifts-touch`, `service-touch`

### 6.2 Context Distribution

- 위로·회복
- 평범한 일상
- 축하·성취
- 기념일·기억
- 바쁨·아픔
- 재회·거리
- 새로운 도전
- 갈등 이후

### 6.3 Editorial Checklist

- 장면만 읽어도 시간과 사건을 상상할 수 있는가?
- A와 B가 같은 사람의 동일한 순간에 가능한가?
- 비용, 시간, 노력, 친밀도 차이가 한쪽으로 과도하게 기울지 않는가?
- 한 선택지에 두 개 이상의 범주가 섞이지 않았는가?
- 성 역할, 경제력, 동거 여부를 불필요하게 전제하지 않는가?
- 접촉은 명시적으로 동의된 비성적 행동인가?
- 받기 문항과 표현 문항의 주어가 혼동되지 않는가?

## 7. Business Logic

### 7.1 Ordering

1. 최초 시작 시 정수 시드를 생성한다.
2. 시드 기반 Fisher–Yates shuffle로 각 트랙 문항 순서를 만든다.
3. 각 문항의 A/B 위치도 같은 시드에서 결정한다.
4. 저장된 순서를 재사용해 새로고침 후 문항이 바뀌지 않게 한다.

### 7.2 Scoring

```text
선택 점수 = close ? 1.0 : clear ? 1.25 : 1.0
범주 원점수 = 해당 범주가 선택된 모든 문항의 선택 점수 합
범주 최대점수 = 해당 범주가 등장한 문항 수 × 1.25
표시 점수 = round(범주 원점수 / 범주 최대점수 × 100)
```

- 점수 내림차순으로 정렬한다.
- 동점은 기본 선택 수, 최초 선택 시점, 고정 범주 순서로 안정 정렬한다.
- 1위와 2위가 5점 미만이면 `공동 핵심`으로 표시한다.
- 같은 범주 쌍의 2개 문항에서 승자가 다르면 그 쌍은 `contextSplit`으로 기록한다.
- `contextSplit`이 4쌍 이상이면 결과에 상황 의존성이 높다는 안내를 표시한다.

### 7.3 Difference Summary

- receive 1위 = express 1위: “느끼는 방식과 표현하는 방식의 중심이 같습니다.”
- 서로 다름: “나는 {express}로 표현하지만 {receive}에서 사랑을 더 선명하게 느낍니다.”
- 공동 핵심 포함: 단일 유형 대신 두 항목을 병렬로 설명한다.

### 7.4 Persistence

- key: `maeum-moment-state-v1`
- 저장 시점: 맥락 선택, 문항 선택, 확신도 선택, 이전 이동, 트랙 완료
- 개인정보나 자유 입력 텍스트는 수집하지 않는다.
- 초기화는 확인 대화상자 후 해당 키만 삭제한다.

## 8. Interface Contracts

MVP에는 네트워크 API가 없다.

### 8.1 Module Interfaces

```js
createInitialState(seed) -> AppState
loadState() -> AppState | null
saveState(state) -> void
getQuestions(track) -> Question[]
validateQuestionSet(questions) -> { valid, errors }
calculateTrackResult(track, answers) -> TrackResult
buildDifferenceSummary(receiveResult, expressResult) -> string
buildShareText(results) -> string
```

### 8.2 TrackResult

```js
{
  track: "receive",
  ranking: [
    { category: "words", score: 75, wins: 6, clearWins: 3 }
  ],
  topCategories: ["words"],
  contextSplitCount: 2,
  selectedActions: [
    { questionId: "...", category: "words", text: "..." }
  ]
}
```

## 9. Accessibility

- `main` 영역을 화면 전환 시 포커스한다.
- 진행률은 시각적 막대와 `aria-valuenow`를 함께 제공한다.
- 선택 카드는 네이티브 `button`으로 구현한다.
- A/B 선택 후 확신도 패널로 포커스를 이동한다.
- 현재 선택은 아이콘, 테두리, 텍스트를 함께 사용한다.
- 토스트는 `aria-live="polite"`로 알린다.
- 결과 순위는 순서 목록으로 제공한다.
- 최소 터치 타깃 44px, 본문 최소 16px를 유지한다.

## 10. Error & Empty States

- 저장 데이터 파싱 실패: 저장 키 삭제 후 welcome으로 복구
- 문항 데이터 불완전: 사용자에게 새로고침 안내, 콘솔에 검증 오류 출력
- 공유 API 미지원: 클립보드 복사로 자동 대체
- 클립보드 실패: 선택 가능한 결과 텍스트 영역 제공
- 트랙 답변 부족: 결과 화면 대신 미응답 첫 문항으로 이동

## 11. File Structure

```text
.
├── index.html
├── css/
│   └── styles.css
├── js/
│   ├── app.js
│   ├── data.js
│   ├── scoring.js
│   └── storage.js
├── tests/
│   ├── data.test.js
│   └── scoring.test.js
├── docs/
│   ├── 01-plan/features/
│   ├── 02-design/features/
│   ├── 03-analysis/
│   └── 04-report/
├── AGENTS.md
├── README.md
└── package.json
```

## 12. Test Plan

### 12.1 Automated

| ID | Test |
|---|---|
| T-01 | 각 트랙에 문항이 정확히 20개 존재 |
| T-02 | 각 트랙의 10개 범주 쌍이 정확히 2회씩 등장 |
| T-03 | 모든 질문 ID가 유일하고 선택 범주가 pair에 포함 |
| T-04 | 모든 선택지가 단일 범주를 가짐 |
| T-05 | 전부 한 범주를 선택했을 때 해당 범주가 1위 |
| T-06 | close/clear 가중치가 각각 1/1.25로 반영 |
| T-07 | 동일 입력에서 순위가 결정적으로 재현 |
| T-08 | 분할 선택에서 `contextSplitCount`가 계산 |
| T-09 | 받기/표현 1위가 다를 때 차이 문장 생성 |

### 12.2 Manual

- 360×800, 768×1024, 1280×800 레이아웃
- 키보드만으로 전체 플로우 완료
- 새로고침 후 문항/선택 복구
- 한 트랙 완료 후 다음 트랙 이동
- Web Share 지원/미지원 분기
- `prefers-reduced-motion` 확인
- 긴 한국어 문장에서 카드 높이 및 버튼 잘림 확인

## 13. Implementation Order

1. 문항 데이터와 범주 메타데이터
2. 점수·일관성·차이 요약 순수 함수
3. 저장과 초기 상태
4. HTML 앱 셸
5. 화면별 렌더러와 이벤트
6. 모바일 우선 스타일
7. 공유·복사·초기화
8. 자동 테스트와 수동 반응형 검증
9. 디자인-코드 갭 분석 및 보완

## 14. Privacy, Evidence, IP

- 모든 데이터는 사용자 기기에만 저장됨을 첫 화면과 결과에 표시한다.
- 본 결과는 자기성찰용이며 심리 진단이 아님을 명시한다.
- 독자 문항과 결과 표현만 사용한다.
- 공식 브랜드 로고, 색상, 검사 문장, 보고서 문구를 사용하지 않는다.
- 출시 전 서비스명 및 카테고리 표현에 대한 별도 상표 검토가 필요하다.

