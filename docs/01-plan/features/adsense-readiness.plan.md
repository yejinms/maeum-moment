# adsense-readiness - Plan Document

> Version: 1.0.0 | Date: 2026-08-12 | Status: Approved for implementation
> Level: Starter | Product: 마음의 순간

---

## 1. Overview

### 1.1 Purpose

`마음의 순간`을 Google AdSense 사이트 심사와 광고 운영에 필요한 기본 정보 구조,
개인정보 고지, 검색·크롤링 파일을 갖춘 공개 사이트로 정비한다.

### 1.2 Background

현재 서비스는 독창적인 40개 관계 장면과 결과 기능을 제공하지만 테스트 외의
서비스 설명, 운영 주체 문의 경로, 개인정보처리방침, 검색엔진용 사이트맵이 없다.
또한 공개 주소가 GitHub Pages 프로젝트 하위 경로이므로 AdSense의 루트 도메인
확인과 `ads.txt` 게시를 별도로 해결해야 한다.

## 2. Goals

### 2.1 Primary Goals

- [ ] 서비스 소개, 검사 원리, 한계와 독창성을 설명하는 정보 페이지를 제공한다.
- [ ] 로컬 저장 및 Google 광고 쿠키를 포함한 개인정보처리방침을 제공한다.
- [ ] 공개 문의 경로와 광고·제휴 고지를 제공한다.
- [ ] `robots.txt`와 `sitemap.xml`을 배포한다.
- [ ] AdSense 게시자 ID를 받은 뒤 코드와 `ads.txt`를 안전하게 넣을 수 있게 한다.

### 2.2 Non-Goals

- Google 계정 소유자를 대신한 약관 동의, 지급 국가 확정, 세금·은행 정보 제출
- 승인이나 광고 수익 보장
- 사용자 응답의 서버 수집 또는 광고 타기팅 데이터로의 전송
- 승인 전 가짜 게시자 ID 또는 빈 광고 슬롯 노출

## 3. Scope

### 3.1 In Scope

- 기존 테스트 화면과 결과 로직 유지
- 공통 헤더·푸터의 정보 페이지 탐색 링크
- `about.html`, `methodology.html`, `privacy.html`, `contact.html`
- 한국어 중심의 원문 콘텐츠와 비진단적 한계 안내
- Google/서드 파티 광고 쿠키, 개인 맞춤 광고 거부 방법 고지
- GitHub Issues 기반 문의 경로
- 다중 HTML 빌드, 검색 크롤링 파일, 자동 무결성 테스트
- 루트 도메인 확보 방안과 AdSense 계정 연결 체크리스트

### 3.2 Out of Scope

- 게시자 ID 발급 전 AdSense 실행 스크립트와 `ads.txt` 게시
- 별도 CMP를 직접 구현하는 것
- 맞춤 도메인 구매 및 결제
- 유료 트래픽 확보 또는 광고 클릭 유도

## 4. Success Criteria

- [ ] 모든 정보 페이지가 모바일과 데스크톱에서 읽을 수 있다.
- [ ] 모든 페이지에서 테스트, 소개, 원리, 개인정보, 문의로 이동할 수 있다.
- [ ] 개인정보처리방침이 현재 로컬 저장과 향후 Google 광고 쿠키를 구분한다.
- [ ] 빌드 산출물에 모든 HTML, `robots.txt`, `sitemap.xml`이 포함된다.
- [ ] 기존 17개 테스트와 신규 사이트 준비 테스트가 모두 통과한다.
- [ ] 배포 후 모든 정보 페이지가 HTTP 200으로 공개된다.
- [ ] 계정 소유자만 가능한 결정과 남은 설정이 정확히 분리되어 있다.

## 5. Schedule

| Phase | Target Date | Status |
|---|---|---|
| Plan | 2026-08-12 | Complete |
| Design | 2026-08-12 | Pending |
| Implementation | 2026-08-12 | Pending |
| Review & deploy | 2026-08-12 | Pending |

## 6. Risks & Mitigations

| Risk | Impact | Probability | Mitigation |
|---|---|---|---|
| 낮은 가치 콘텐츠로 심사 거절 | High | Medium | 테스트 밖의 독창적 설명·방법론·한계 페이지 추가 |
| GitHub Pages 하위 경로 때문에 루트 검증 실패 | High | High | `yejinms.github.io` 루트 사이트 또는 맞춤 도메인 확보 |
| 잘못된 게시자 ID 게시 | High | Low | 계정 생성 후 Google이 제공한 값을 그대로 사용 |
| 개인정보 고지와 실제 동작 불일치 | High | Medium | 승인 전/활성화 후 동작을 구분하고 광고 활성화 시 재검토 |
| EEA·영국·스위스 동의 요건 위반 | High | Medium | AdSense Privacy & messaging의 Google 인증 CMP 사용 |
| 수익 과대 기대 | Medium | High | 트래픽·광고 수요에 따라 달라지며 승인·수익을 보장하지 않음 |

## 7. References

- Google AdSense 자격 요건: https://support.google.com/adsense/answer/9724?hl=ko
- AdSense 코드 위치: https://support.google.com/adsense/answer/9274516?hl=ko
- Google 광고 쿠키 필수 고지: https://support.google.com/adsense/answer/1348695?hl=ko
- ads.txt 가이드: https://support.google.com/adsense/answer/12171612?hl=ko
- Google 인증 CMP 요건: https://support.google.com/adsense/answer/13554116?hl=ko
