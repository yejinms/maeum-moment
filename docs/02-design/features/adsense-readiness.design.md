# adsense-readiness - Design Document (Starter)

> Version: 1.0.0 | Date: 2026-08-12 | Status: Approved
> Level: Starter | Plan: `docs/01-plan/features/adsense-readiness.plan.md`

---

## 1. Overview

기존 테스트 흐름은 그대로 두고, 서비스의 목적·제작 방식·개인정보 처리·문의
경로를 설명하는 정적 정보 페이지를 추가한다. AdSense 게시자 ID가 발급되기 전에는
광고 스크립트나 `ads.txt` 값을 추측해서 넣지 않는다.

## 2. Information Architecture

| Route | Purpose | Required content |
|---|---|---|
| `/maeum-moment/` | 테스트 진입 | 기존 앱, 공통 정보 링크 |
| `/maeum-moment/about.html` | 서비스 소개 | 대상, 가치, 독창적 장면, 비진단 고지 |
| `/maeum-moment/methodology.html` | 검사 원리 | 두 트랙, 문항 구성, 점수, 한계 |
| `/maeum-moment/privacy.html` | 개인정보처리방침 | 로컬 저장, 광고 쿠키, 선택권, 문의 |
| `/maeum-moment/contact.html` | 문의 | GitHub Issues, 광고·제휴 고지 |
| `/robots.txt` | 크롤러 안내 | 사이트맵 위치, 허용 범위 |
| `/sitemap.xml` | 검색 색인 | 다섯 공개 페이지의 절대 URL |

AdSense 사이트 등록은 무료로 확보 가능한 사용자 Pages 루트
`https://yejinms.github.io/`를 사용하고, 실제 앱은 `/maeum-moment/`에서 제공한다.
향후 게시자 ID가 생기면 루트의 `ads.txt`와 각 HTML `<head>`에 동일 ID를 적용한다.

## 3. Page Design

### 3.1 Shared layout

- 기존 브랜드·색상·타이포그래피를 유지한다.
- 헤더에는 핵심 탐색만 두고, 푸터에 소개·원리·개인정보·문의 전체 링크를 둔다.
- 정보 페이지 본문은 최대 760px, 한 문단은 읽기 쉬운 폭으로 제한한다.
- 모바일에서는 헤더 탐색을 축약하고 푸터 링크를 줄바꿈한다.

### 3.2 Content hierarchy

- 상단: 페이지 성격을 알리는 eyebrow, 명확한 H1, 한 문단 요약
- 본문: H2 단위 카드/섹션, 짧은 문단과 목록
- 중요 고지: 색 배경과 테두리를 사용한 `.info-callout`
- 하단: 테스트 시작 CTA와 공통 푸터

### 3.3 Accessibility

- 의미 있는 `header`, `nav`, `main`, `article`, `footer`를 사용한다.
- 현재 페이지 링크에 `aria-current="page"`를 설정한다.
- 포커스 스타일과 충분한 색 대비를 기존 디자인에서 계승한다.
- 광고가 추가되더라도 테스트 선택 버튼 사이에는 삽입하지 않는다.

## 4. Privacy and Ad Boundaries

- 현재 응답은 `localStorage`에만 저장되며 서버로 전송하지 않는다.
- AdSense 활성화 이후 Google 및 제3자 광고 사업자가 쿠키를 사용할 수 있음을
  사전에 명시하고 Google 광고 설정의 거부 링크를 제공한다.
- 검사 응답은 광고 개인화 데이터로 의도적으로 전송하지 않는다.
- EEA·영국·스위스 방문자 동의는 자체 배너가 아니라 AdSense의 Google 인증 CMP를
  설정한다.
- 약관 동의, 대한민국 수취인 확정, 지급·세금 정보는 계정 소유자 확인 후 진행한다.

## 5. Build and Deployment

- Vite 다중 페이지 입력에 다섯 HTML 문서를 명시한다.
- `public/robots.txt`와 `public/sitemap.xml`은 빌드 시 정적 복사한다.
- GitHub Actions가 테스트 후 `dist/client`를 Pages에 배포한다.
- 신규 루트 Pages 저장소는 앱 링크와 서비스 설명을 제공하고, 게시자 ID 발급 후
  루트 `ads.txt`의 배포 지점이 된다.

## 6. Verification

1. 자동 테스트로 페이지, 필수 고지, 빌드 입력, 크롤링 파일을 확인한다.
2. `npm test`와 프로덕션 `npm run build`를 실행한다.
3. 산출물에 모든 HTML과 정적 파일이 있는지 확인한다.
4. GitHub Actions 완료 후 공개 URL이 200인지 확인한다.
5. 게시자 ID 발급 뒤 스크립트와 `ads.txt` 값이 정확히 일치하는지 다시 확인한다.

## 7. Implementation Order

1. 공통 헤더·푸터 탐색과 정보 페이지 HTML
2. 정보 페이지 반응형 스타일
3. Vite 다중 페이지 빌드와 검색 파일
4. 무결성 테스트와 문서 갱신
5. GitHub Pages 배포 및 공개 URL 검증
6. 계정 소유자 확인 후 AdSense 등록 완료

## 8. Constraints

- 공식 Five Love Languages 검사 문항이나 결과 문구를 복제·각색하지 않는다.
- 결과를 심리 진단으로 표현하지 않는다.
- 승인이나 수익을 보장하는 문구, 광고 클릭 유도 문구를 사용하지 않는다.
- 실제 게시자 ID 없이 AdSense 코드를 만들지 않는다.
