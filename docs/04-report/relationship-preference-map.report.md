# Completion Report: relationship-preference-map

> Date: 2026-07-29 | Level: Starter
> Product working title: 마음의 순간

---

## 1. Summary

### 1.1 Feature Overview

구체적인 연애 장면의 두 행동을 비교해 사용자가 사랑을 받을 때와 표현할 때의
상대적 우선순위를 발견하는 정적 웹앱 MVP를 완성했다.

받기와 표현하기 각각 20문항으로 구성되며, 다섯 범주의 모든 10개 조합을
트랙별로 정확히 두 번 비교한다. 사용자의 선택 강도와 상황에 따른 선택 차이를
반영하고, 최종 결과에서 두 방향의 순위와 실제 선택 행동을 제공한다.

### 1.2 Final Match Rate

**100%** (Target: 90%)

### 1.3 PDCA Progress

`[Plan] done → [Design] done → [Do] done → [Check] done → [Report] done`

코드 갭이 없고 Check 중 발견한 네 가지 품질 이슈를 즉시 보완했으므로 별도 Act
반복은 수행하지 않았다.

## 2. Completed Items

- [x] 독자 서비스 컨셉과 `마음의 순간` 워킹 타이틀
- [x] Starter 수준의 Plan 및 Design 문서
- [x] 받는 사랑 20개 독자 문항
- [x] 표현하는 사랑 20개 독자 문항
- [x] 받기/표현을 통틀어 중복 없는 40개 관계 상황
- [x] 접촉의 동의 전제를 공통 안내로 제공하고 경계 문항에만 절차 표현 유지
- [x] 범주별 반복 동사와 행동 패턴을 제한하는 편집 테스트
- [x] 전체 범주 쌍 균형 검증
- [x] 시드 기반 문항 순서 및 A/B 위치 분산
- [x] 선택 확신도 가중치
- [x] 트랙별 순위 및 공동 핵심 표시
- [x] 상황 의존성 신호 계산
- [x] 받기/표현 차이 요약
- [x] 선택 행동 카드
- [x] 로컬 저장 및 재접속 복구
- [x] 공유, 복사, 복사 실패 fallback
- [x] 응답 초기화
- [x] 모바일·태블릿·데스크톱 반응형 디자인
- [x] 키보드 접근 가능한 네이티브 컨트롤
- [x] 비진단·로컬 저장·IP 경계 안내
- [x] 데이터 및 점수 자동 테스트
- [x] README 실행 및 검증 안내

## 3. Deviations from Design

승인된 MVP 기능 범위의 미구현 항목은 없다.

구현 검증 과정에서 아래 내용을 설계 의도에 맞게 강화했다.

- 마지막 챕터 전용 완료 문구 추가
- 복수 상위 범주에서도 자연스러운 결과 문장으로 변경
- 클립보드 실패 시 직접 선택 가능한 결과 텍스트 제공
- 네트워크 요청 없는 inline SVG favicon 제공

## 4. Metrics

| Metric | Value |
|---|---:|
| Final match rate | 100% |
| Automated tests | 11 passed / 0 failed |
| Source and test lines | 2,830 |
| Project files excluding `.git` | 16 |
| Scenario questions | 40 distinct contexts |
| Category pairs per track | 10 × 2 repetitions |
| Browser flow | 40 questions completed |
| Responsive widths | 390, 768, 1280px |
| Horizontal overflow failures | 0 |
| PDCA analysis iterations | 1 |

## 5. Quality Evidence

- `npm test`: 11/11 pass
- `git diff --check`: pass
- first visit and context selection: pass
- choice and confidence transition: pass
- question 2 reload recovery: pass
- receive 20 and express 20 completion: pass
- result rank, summary and action cards: pass
- 390×844 result screen visual review: pass
- 390/768/1280 document width check: pass

## 6. Learnings

### Keep

- 추상적 분류명을 숨기고 장면과 행동만 제시하면 선택 경험이 훨씬 구체적이다.
- 같은 범주 쌍을 다른 맥락에서 반복하면 단순 순위와 상황 의존성을 함께 설명할 수 있다.
- 받기와 표현하기를 별도 챕터로 나누면 서비스의 핵심 차이가 결과에서 선명해진다.

### Problem

- 선택 문항이 40개라 실제 사용자에게는 피로가 생길 수 있다.
- 구조적 균형은 검증했지만 선택지의 노력·비용·매력도 균형은 사용자 데이터가 필요하다.
- 단순 가중 점수는 자기성찰에는 적합하지만 모집단 비교나 심리측정에는 사용할 수 없다.

### Iteration

- 첫 버전의 퇴근 후 위로·생일·재회 중심 장면을 전면 재작성했다.
- 갈등, 경제, 생활 분담, 가족, 거리, 건강, 경계, 취미 등 40개 고유 맥락으로 확장했다.
- 받기와 표현 트랙이 같은 사건을 주어만 바꿔 반복하지 않도록 데이터 검사를 추가했다.
- 기존 문항 선택이 새 장면에 이어지지 않도록 저장 상태 버전을 올렸다.
- 특수 취미·돌발 위기 중심 문항을 보편적인 연애 일상으로 다시 교체했다.
- 접촉 16개 중 확인 질문은 경계 문항에만 남기고 손잡기 중심 행동을 분산했다.
- 선물·도움·말·시간 선택지의 반복 문장 구조를 전면 에디팅했다.

### Try

- 5~8명 파일럿에서 문항별 응답 시간, 망설임, “둘 다 이상함” 피드백을 수집한다.
- 이탈 구간과 반복 쌍 불일치를 바탕으로 24~30문항 적응형 버전을 실험한다.
- 커플 모드보다 먼저 결과 설명과 행동 카드의 대화 유용성을 검증한다.

## 7. Recommended Next Cycle

다음 PDCA는 `question-pilot-validation`을 별도 기능으로 진행한다.

1. 대상: 연애 경험이 있는 성인 5~8명
2. 과업: 특정 상대를 떠올려 전체 평가 완료
3. 수집: 이탈 시점, 문항별 망설임, 선택 이유, 부자연스러운 선택지
4. 완료 조건:
   - 치명적으로 이해되지 않는 문항 0개
   - 선택지 강도 불균형 문항 식별 및 수정
   - 전체 완료 중앙값 8분 이하
   - 결과 설명을 자신의 말로 재진술할 수 있는 사용자 80% 이상

## 8. Run

```bash
npm start
```

브라우저에서 `http://localhost:4173`을 연다.
