# Gap Analysis: adsense-readiness

> Date: 2026-08-12 | Design: `docs/02-design/features/adsense-readiness.design.md`

---

## Match Rate: 100%

## Summary

사이트 심사에 필요한 정보 구조, 개인정보 고지, 루트 도메인, 계정 및 지급 정보
등록을 완료했다. 실제 게시자 ID로 사이트 코드와 `ads.txt`를 공개 배포했고,
소유권 확인·검토 요청·Google 인증 CMP 설정까지 총 15개 설계 항목을 모두
구현했다. Google의 사이트 승인 결과만 외부 검토 상태로 남아 있다.

## Implemented Items

- [x] 테스트 로직과 저장 방식을 변경하지 않고 공통 탐색 추가
- [x] 서비스 목적과 독자적 콘텐츠를 설명하는 `about.html`
- [x] 두 트랙, 20문항 구성, 점수와 한계를 설명하는 `methodology.html`
- [x] 현재 로컬 저장과 향후 광고 쿠키를 구분한 `privacy.html`
- [x] Google 광고 설정과 제3자 맞춤 광고 거부 링크
- [x] Google 인증 CMP가 필요한 지역 안내
- [x] 공개 문의 및 광고 운영 원칙을 제공하는 `contact.html`
- [x] 모바일 대응 공통 정보 페이지 디자인
- [x] Vite 클라이언트 다중 HTML 빌드
- [x] 프로젝트 경로와 루트 도메인의 `robots.txt`, `sitemap.xml`
- [x] `yejinms.github.io` 루트 사용자 Pages 사이트 생성·배포
- [x] 신규 준비 테스트 포함 전체 23개 자동 테스트 통과
- [x] GitHub Pages 6개 URL HTTP 200 및 최신 문구 확인
- [x] AdSense 계정 생성, 약관 동의, 대한민국 수취인 국가와 이메일 미수신 설정
- [x] 실제 게시자 ID `pub-1147778292873954` 확보 및 코드·`ads.txt` 적용
- [x] 공개 루트 `ads.txt`와 모든 HTML의 게시자 코드 확인
- [x] AdSense 사이트 소유권 확인 및 사이트 검토 요청
- [x] Google 인증 CMP의 동의·거부·옵션 관리 메시지 설정
- [x] 회사 결제 프로필 연결, SMS 전화번호 인증 및 지급 정보 확인

## Missing Items

- 없음. 단, 광고 게재 승인은 Google 외부 검토 결과에 따르며 아직 `준비 중`이다.

## Changed Items (Deviations from Design)

- [x] 정보 페이지는 동일한 정적 HTML을 사용하되, 기존 Cloudflare 서버 빌드와의
  충돌을 막기 위해 다중 페이지 입력을 `client` 환경에만 적용했다.
- [x] AdSense의 주 등록 주소는 프로젝트 하위 경로가 아닌 새 무료 루트 주소
  `https://yejinms.github.io/`로 정했다.

## Verification Evidence

- `npm test`: 23/23 passed
- `npm run build`: server/client production build passed
- GitHub Pages workflow: `31570795156`, success, commit `fa2d40d`
- Root Pages workflow: `31570800059`, success, commit `cb22420`
- Sites version 3 deployment: success
- Public checks: root/app HTML에 게시자 코드 1회, 루트/앱 `ads.txt` HTTP 200
- AdSense UI: `모든 단계를 완료했습니다`, `정보를 확인했습니다`
- Site review UI: `사이트의 광고 게재 가능 여부 검토 중`

## Next Steps

1. Google의 사이트 승인 결과를 기다린다.
2. 승인 후 자동 광고의 위치와 테스트 흐름 침범 여부를 확인한다.
3. 수익이 발생해 지급 기준에 가까워지면 세금 정보와 지급 수단 요구를 확인한다.

## 2026-08-13 Policy Review Iteration

첫 검토는 `게시자 콘텐츠가 없는 화면에 Google 게재 광고` 사유로 반려됐다.
AdSense 코드가 독자 설명 페이지뿐 아니라 다음 기능성 화면에도 공통 삽입된 것이
정책 위험이었다.

- JavaScript가 내용을 렌더링하기 전 빈 앱 셸을 제공하는 테스트 화면
- 문의 제출로 이동하는 행동 중심 화면
- 개인정보 안내를 목적으로 하는 유틸리티 화면

수정 후 광고 코드는 충분한 독자 설명 콘텐츠가 있는 루트, 서비스 소개, 검사 원리
페이지에만 남겼다. 테스트, 문의, 개인정보 페이지에서는 광고 스크립트와 게시자
ID를 모두 제거했다. 루트 페이지에는 관계 선호의 맥락, 받기와 표현의 차이,
결과 활용법과 비진단 한계를 설명하는 독자 콘텐츠를 추가했다.

재검토 전 검증 결과:

- `npm test`: 23/23 passed
- `npm run build`: passed
- Main Pages workflow `31679392860`: success, commit `4cec087`
- Root Pages workflow `31679399260`: success, commit `be9b151`
- 공개 테스트·문의·개인정보 페이지: 게시자 ID 0회
- 공개 루트·소개·원리 페이지: 게시자 ID 각각 1회
- 공개 루트 본문 추출 길이: 7,561 characters
