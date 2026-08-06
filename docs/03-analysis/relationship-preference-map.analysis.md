# Gap Analysis: relationship-preference-map

> Date: 2026-07-29
> Design: `docs/02-design/features/relationship-preference-map.design.md`
> Implementation: `index.html`, `css/`, `js/`, `tests/`

---

## Match Rate: 100%

`40 implemented design checkpoints / 40 total design checkpoints × 100 = 100%`

## Summary

2026-08-03 Act에서는 40문항을 순서대로 강제하던 흐름을 두 개의 독립 테스트로
분리했다. 첫 선택 화면에서 받기/표현 중 원하는 테스트를 고르고, 20문항 완료 즉시
단독 결과를 확인한다. 사용자가 추가 테스트를 선택해 완료하면 방금 결과, 이전 결과,
두 방향의 통합본을 한 화면에 이어서 제공한다. 특정 인물 여부 선택과 중간 완료
화면은 제거했다.

2026-08-06 Act에서는 결과 카드마다 해당 테스트만 다시 하는 제어를 추가했다.
선택한 트랙의 응답과 완료 상태만 제거하고, 다른 트랙 결과와 기존 문항 순서는
유지하도록 상태 전이를 분리했다. 전체 초기화는 별도 버튼으로 명확히 구분했다.

Plan과 Design에서 정의한 Starter 정적 MVP 범위를 모두 구현했다. 실제 브라우저에서
온보딩부터 40문항 완주, 중간 챕터, 결과 화면까지 검증했으며 새로고침 후 진행 상태
복구도 확인했다. 390px, 768px, 1280px 너비에서 가로 오버플로가 발생하지 않았다.

사용자 피드백에서 퇴근 후 위로, 생일, 재회처럼 비슷한 시간·사건이 반복되고
받기/표현 트랙이 같은 장면을 뒤집어 사용한다는 콘텐츠 갭을 확인했다. 2차 Act에서
40개 문항을 모두 서로 다른 관계 상황으로 교체하고, 갈등·돈·가사·가족·거리·건강·
경계·취미·창작 등 실제 연인이 조율하는 맥락으로 분포를 넓혔다.

3차 Act에서는 특수한 취미·위기 상황과 범주별 문장 공식이 다시 공감도를 낮춘다는
피드백을 반영했다. 접촉 선택지 16개 중 13개에 반복되던 확인 질문을 챕터 공통
전제로 옮겼고, 손 접촉은 11개에서 5개로 줄였다. 선물의 `작은`과 `건넨다`,
도움의 계획표·알림·정리 같은 반복 표현도 제거하거나 분산했다.

첫 브라우저 검증에서 마지막 챕터 안내 문구와 복수 상위 항목의 한국어 조사가
어색한 문제를 발견해 즉시 보완했다. 클립보드 접근 실패 시 직접 복사할 수 있는
텍스트 영역도 설계대로 구현했다.

## Match Matrix

| Area | Design Items | Implemented | Match |
|---|---:|---:|---:|
| Information architecture and flow | 7 | 7 | 100% |
| Question data and editorial structure | 6 | 6 | 100% |
| State, ordering, scoring and persistence | 9 | 9 | 100% |
| UI components, visual system and responsive layout | 7 | 7 | 100% |
| Accessibility, error handling, privacy and IP boundaries | 7 | 7 | 100% |
| Automated tests and project operation | 4 | 4 | 100% |
| **Total** | **40** | **40** | **100%** |

## Implemented Items

### Information Architecture and Flow — 7/7

- [x] Welcome, track select, chapter intro, question, confidence, result states
- [x] Receive/express independent first-test selection
- [x] Immediate single-track result and optional remaining test
- [x] Latest result, previous result and integrated result ordering
- [x] 20 questions per track
- [x] Previous question and choice revision
- [x] Chapter intermediate summary
- [x] Incomplete result access recovery

### Question Data and Editorial Structure — 6/6

- [x] Five stable category identifiers and Korean display metadata
- [x] 40 original scenario questions
- [x] Ten unique category pairs exactly twice per track
- [x] Forty distinct context labels without receive/express scene mirroring
- [x] Common relationship situations replacing niche hobbies and forced emergencies
- [x] Shared consent premise with boundary-specific explicit confirmation
- [x] Automated caps for repeated category wording
- [x] Time, event and emotional context in every scene
- [x] Receive/express subject direction separated
- [x] Consensual and non-sexual touch wording

### State, Ordering, Scoring and Persistence — 9/9

- [x] Seed-based deterministic question shuffle
- [x] Seed-based deterministic A/B position flip
- [x] Close 1.0 / clear 1.25 confidence weights
- [x] Category-relative 0–100 display score
- [x] Stable five-category ranking
- [x] Under-five-point co-primary preference rule
- [x] Repeated-pair context split detection
- [x] Receive/express difference summary
- [x] Versioned localStorage save, recovery and reset

### UI and Responsive Design — 7/7

- [x] Warm paper-card visual system and design tokens
- [x] Mobile-first single-column choice layout
- [x] Desktop two-column choice and ranking layout
- [x] Progress, scene, choice and confidence components
- [x] Ranking, difference and concrete action result components
- [x] Share, copy and reset controls
- [x] Reduced-motion handling

### Accessibility, Error, Privacy and IP — 7/7

- [x] Semantic headings, buttons, ordered ranking lists and landmarks
- [x] Progress bar ARIA metadata and polite live regions
- [x] Screen title focus after state transitions
- [x] Visible focus treatment and non-color-only selection cues
- [x] Missing data, storage failure, Web Share and clipboard fallbacks
- [x] Local-only data and non-diagnostic disclaimers
- [x] Original product name, copy and visual assets

### Tests and Operations — 4/4

- [x] Data count, unique ID and pair distribution tests
- [x] Score weight, rank and context split tests
- [x] Difference summary and share text tests
- [x] README start/test/privacy instructions

## Verification Evidence

### Automated

- Command: `npm test`
- Result: 17 passed, 0 failed
- Command: `git diff --check`
- Result: no whitespace errors

### Browser

- Start → track select → express 20 → single result → receive 20 → integrated result completed
- Single result displayed the optional remaining-test CTA without forcing continuation
- Final result order: latest receive result → earlier express result → integrated summary
- With both results present, resetting express removed only express and returned to its intro
- Returning to results preserved receive and exposed express as the remaining test
- Choice → confidence → next question transition completed
- Reload on question 2 restored the identical question
- Result rankings, difference summary and selected-action cards rendered
- Viewport overflow:
  - 390×844: none (`scrollWidth` 390px)
  - 768×1024: none
  - 1280×800: none

## Changed Items (Resolved During Check)

| Finding | Resolution |
|---|---|
| Last chapter reused a “next chapter” message | Added final-chapter-specific completion copy |
| Korean postposition was awkward for a co-primary result | Rephrased the difference sentence without variable postpositions |
| Clipboard failure only showed a toast | Added a selectable fallback textarea |
| Browser requested a missing favicon | Added an inline SVG favicon |
| 질문 장면이 퇴근·기념일·재회에 편중됨 | 40개 고유 맥락으로 전면 교체하고 중복 방지 테스트 추가 |
| 접촉 16개 중 13개가 확인 질문으로 시작함 | 동의 전제를 챕터 안내로 옮기고 접촉 행동을 다변화 |
| 선물·도움·말 선택지가 같은 문장 공식 반복 | 80개 선택지를 재편집하고 반복 빈도 테스트 추가 |
| 특수 취미와 위기 상황이 공감과 균형을 저해 | 일상적인 휴일·자취·여행·요리·악몽·영화 장면으로 교체 |

## Missing Items

None within the approved MVP scope.

## Remaining Product Risks

- The item set has structural balance but has not been validated with real users.
- Effort and desirability balance between choices needs pilot interviews and response-time review.
- Service naming and category wording require a separate trademark review before commercial launch.
- The simple score is appropriate only for within-person reflection, not population comparison.

## Recommendation

Match rate is above 90%. Proceed to completion report and use a small pilot as the next
product discovery cycle rather than adding backend scope.
