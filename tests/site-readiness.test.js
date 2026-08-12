import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const rootUrl = new URL("../", import.meta.url);
const read = (path) => readFile(new URL(path, rootUrl), "utf8");

const pages = [
  ["index.html", "마음의 순간 — 관계 선호 밸런스 게임"],
  ["about.html", "서비스 소개 — 마음의 순간"],
  ["methodology.html", "검사 원리 — 마음의 순간"],
  ["privacy.html", "개인정보처리방침 — 마음의 순간"],
  ["contact.html", "문의 — 마음의 순간"],
];

test("all public pages have metadata and shared information navigation", async () => {
  for (const [path, title] of pages) {
    const html = await read(path);
    assert.match(html, new RegExp(`<title>${title}</title>`));
    assert.match(html, /name="description"/);
    assert.match(html, /rel="canonical"/);
    assert.match(html, /href="\.\/privacy\.html"/);
    assert.match(html, /href="\.\/contact\.html"/);
  }
});

test("privacy notice describes local answers and active AdSense connection", async () => {
  const privacy = await read("privacy.html");
  assert.match(privacy, /localStorage/);
  assert.match(privacy, /Google AdSense 연결 코드가 설치되어 있으며 사이트는 검토 중입니다/);
  assert.match(privacy, /제3자 광고 사업자/);
  assert.match(privacy, /https:\/\/adssettings\.google\.com\//);
  assert.match(privacy, /답변과 결과를 광고 개인화 정보로 의도적으로 전송하지 않습니다/);
  assert.match(privacy, /Google이 인증한 동의 관리 플랫폼\(CMP\)/);
});

test("Vite includes every HTML page in the production build", async () => {
  const config = await read("vite.config.js");
  for (const [path] of pages) {
    assert.match(config, new RegExp(`resolve\\(import\\.meta\\.dirname, "${path}"\\)`));
  }
});

test("crawler files point to the deployed GitHub Pages paths", async () => {
  const [robots, sitemap] = await Promise.all([
    read("public/robots.txt"),
    read("public/sitemap.xml"),
  ]);
  assert.match(robots, /Sitemap: https:\/\/yejinms\.github\.io\/maeum-moment\/sitemap\.xml/);
  for (const [path] of pages) {
    const suffix = path === "index.html" ? "" : path;
    assert.match(sitemap, new RegExp(`https://yejinms\\.github\\.io/maeum-moment/${suffix}`));
  }
});

test("all pages use the issued AdSense publisher id", async () => {
  for (const [path] of pages) {
    const html = await read(path);
    assert.match(html, /pagead2\.googlesyndication\.com\/pagead\/js\/adsbygoogle\.js\?client=ca-pub-1147778292873954/);
    assert.equal((html.match(/ca-pub-1147778292873954/g) ?? []).length, 1);
  }
});

test("ads.txt uses the exact issued publisher id", async () => {
  assert.equal(
    await read("public/ads.txt"),
    "google.com, pub-1147778292873954, DIRECT, f08c47fec0942fa0\n",
  );
});
