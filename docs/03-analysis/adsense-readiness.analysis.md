# Gap Analysis: adsense-readiness

> Date: 2026-08-12 | Design: `docs/02-design/features/adsense-readiness.design.md`

---

## Match Rate: 87%

## Summary

사이트 심사 전에 코드와 공개 배포로 완료할 수 있는 정보 구조, 개인정보 고지,
크롤링 파일, 루트 도메인과 검증을 완료했다. 총 15개 설계 항목 중 13개가
구현·검증되었다. 남은 2개는 계정 소유자의 약관·수취인 국가 확인과 그 뒤에만
발급되는 게시자 ID가 필요하므로 임의로 완료할 수 없다.

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
- [x] 신규 준비 테스트 포함 전체 22개 자동 테스트 통과
- [x] GitHub Pages 6개 URL HTTP 200 및 최신 문구 확인

## Missing Items

- [ ] 계정 소유자의 AdSense 약관 동의, 대한민국 수취인 국가 확정, 이메일 수신 선택
- [ ] 발급된 게시자 ID로 각 페이지의 AdSense 코드와 루트 `ads.txt` 적용 및 CMP 설정

## Changed Items (Deviations from Design)

- [x] 정보 페이지는 동일한 정적 HTML을 사용하되, 기존 Cloudflare 서버 빌드와의
  충돌을 막기 위해 다중 페이지 입력을 `client` 환경에만 적용했다.
- [x] AdSense의 주 등록 주소는 프로젝트 하위 경로가 아닌 새 무료 루트 주소
  `https://yejinms.github.io/`로 정했다.

## Verification Evidence

- `npm test`: 22/22 passed
- `npm run build`: server/client production build passed
- GitHub Pages workflow: `31569789807`, success, commit `ea791d8`
- Root Pages workflow: `31570069088`, success, commit `ea9acff`
- Sites version 2 deployment: success
- Public checks: root, app, about, methodology, privacy, contact, robots all HTTP 200

## Next Steps

1. 계정 소유자에게 세 가지 계정 결정을 확인한다.
2. AdSense 계정 생성과 사이트 등록을 완료해 실제 게시자 ID를 확보한다.
3. ID를 코드와 루트 `ads.txt`에 반영하고 다시 테스트·배포한다.
4. AdSense의 개인정보 보호 메시지에서 Google 인증 CMP를 설정한다.
5. 심사 상태와 공개된 `ads.txt`를 확인한 뒤 PDCA Check/Report를 완료한다.
