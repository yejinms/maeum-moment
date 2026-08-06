import {
  CATEGORIES,
  CATEGORY_ORDER,
  getQuestionById,
  getQuestions,
  validateQuestionSet,
} from "./data.js";
import {
  buildDifferenceSummary,
  buildShareText,
  buildTrackShareText,
  calculateTrackResult,
} from "./scoring.js";
import {
  getRemainingTrack,
  getResultOrder,
  isTrackComplete,
  resetTrackProgress,
} from "./flow.js";
import { clearState, loadState, saveState, STATE_VERSION } from "./storage.js";

const app = document.querySelector("#app");
const toast = document.querySelector("#toast");
const TRACK_LABELS = {
  receive: "사랑을 느끼는 순간",
  express: "사랑을 표현하는 순간",
};
const TRACK_SHORT_LABELS = {
  receive: "받을 때",
  express: "표현할 때",
};

function seededRandom(seed) {
  let value = seed % 2147483647;
  if (value <= 0) value += 2147483646;
  return () => {
    value = (value * 16807) % 2147483647;
    return (value - 1) / 2147483646;
  };
}

function seededShuffle(items, seed) {
  const result = [...items];
  const random = seededRandom(seed);
  for (let index = result.length - 1; index > 0; index -= 1) {
    const target = Math.floor(random() * (index + 1));
    [result[index], result[target]] = [result[target], result[index]];
  }
  return result;
}

function hashString(value) {
  let hash = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function createInitialState(seed = Date.now() % 2147483647) {
  return {
    version: STATE_VERSION,
    view: "welcome",
    activeTrack: null,
    questionIndex: 0,
    order: {
      receive: seededShuffle(
        getQuestions("receive").map((item) => item.id),
        seed + 101,
      ),
      express: seededShuffle(
        getQuestions("express").map((item) => item.id),
        seed + 202,
      ),
    },
    answers: {
      receive: {},
      express: {},
    },
    completedTracks: [],
    pendingChoice: null,
    seed,
  };
}

let state = loadState() ?? createInitialState();

function persist() {
  saveState(state);
}

function setView(view) {
  state.view = view;
  persist();
  render();
}

function shouldFlip(questionId) {
  return (hashString(`${state.seed}-${questionId}`) & 1) === 1;
}

function getDisplayChoices(question) {
  return shouldFlip(question.id)
    ? [
        { ...question.b, label: "A" },
        { ...question.a, label: "B" },
      ]
    : [
        { ...question.a, label: "A" },
        { ...question.b, label: "B" },
      ];
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("toast--visible");
  window.setTimeout(() => toast.classList.remove("toast--visible"), 2200);
}

function trackProgress(track) {
  return Object.keys(state.answers[track]).length;
}

function iconStrip() {
  return CATEGORY_ORDER.map(
    (id) =>
      `<span class="concept-pill"><span aria-hidden="true">${CATEGORIES[id].icon}</span>${CATEGORIES[id].shortName}</span>`,
  ).join("");
}

function renderWelcome() {
  return `
    <section class="screen screen--welcome" aria-labelledby="app-title">
      <div class="eyebrow">구체적인 장면으로 찾는 나의 우선순위</div>
      <div class="hero-symbol" aria-hidden="true">
        <span>말</span><span>시간</span><strong>VS</strong><span>도움</span><span>접촉</span>
      </div>
      <h1 id="app-title">나는 어떤 순간에<br /><em>사랑을 실감할까?</em></h1>
      <p class="hero-copy">
        추상적인 성향 질문 대신, 실제로 일어날 법한 연애 장면에서
        두 행동 중 더 마음이 움직이는 쪽을 골라보세요.
      </p>
      <div class="concept-strip" aria-label="비교할 다섯 가지 행동">${iconStrip()}</div>
      <button class="primary-button primary-button--hero" data-action="begin">
        테스트 시작하기
        <span aria-hidden="true">→</span>
      </button>
      <div class="trust-row">
        <span>테스트당 약 4분</span>
        <span>하나씩 선택 가능</span>
        <span>기기에만 저장</span>
      </div>
      <aside class="soft-note">
        <strong>먼저 알아두세요</strong>
        <p>
          이 결과는 심리 진단이나 궁합 판정이 아니에요. 지금의 관계에서
          어떤 행동이 더 와닿는지 대화하기 위한 개인적인 선호 지도입니다.
        </p>
      </aside>
    </section>
  `;
}

function renderTrackSelect() {
  return `
    <section class="screen screen--track-select" aria-labelledby="app-title">
      <div class="step-kicker">먼저 하나만 골라요</div>
      <h1 id="app-title">어떤 테스트를<br />먼저 해볼까요?</h1>
      <p class="section-copy">
        두 테스트는 따로 진행할 수 있어요. 하나를 마치면 바로 결과를 보고,
        원할 때 나머지 테스트를 이어서 통합 결과를 확인할 수 있습니다.
      </p>
      <div class="context-grid track-select-grid">
        <button class="context-card track-select-card track-select-card--receive" data-action="choose-track" data-track="receive">
          <span class="context-card__icon" aria-hidden="true">♥</span>
          <span class="track-select-card__meta">20개 장면 · 약 4분</span>
          <strong>내가 사랑을<br />느끼는 언어</strong>
          <span>상대가 어떻게 해줄 때 사랑이 가장 선명하게 와닿는지 알아봐요.</span>
        </button>
        <button class="context-card track-select-card track-select-card--express" data-action="choose-track" data-track="express">
          <span class="context-card__icon" aria-hidden="true">✦</span>
          <span class="track-select-card__meta">20개 장면 · 약 4분</span>
          <strong>내가 사랑을<br />표현하는 언어</strong>
          <span>내가 상대에게 자연스럽게 먼저 해주고 싶은 행동을 알아봐요.</span>
        </button>
      </div>
      <button class="text-button" data-action="back-welcome">← 처음으로</button>
    </section>
  `;
}

function renderChapterIntro() {
  const isReceive = state.activeTrack === "receive";
  const hasPreviousResult = state.completedTracks.length > 0;
  return `
    <section class="screen screen--chapter ${isReceive ? "accent-receive" : "accent-express"}" aria-labelledby="app-title">
      <div class="chapter-count">20개 장면 · 약 4분</div>
      <div class="chapter-orbit" aria-hidden="true">
        <span>${isReceive ? "받기" : "표현"}</span>
      </div>
      <h1 id="app-title">${TRACK_LABELS[state.activeTrack]}</h1>
      <p class="section-copy section-copy--narrow">
        ${
          isReceive
            ? "상대가 둘 중 한 행동만 해줄 수 있다면, 어느 쪽에서 사랑을 더 선명하게 느끼는지 골라보세요."
            : "상대가 같은 상황에 놓였을 때, 내가 더 먼저 하고 싶고 나답다고 느끼는 행동을 골라보세요."
        }
      </p>
      <ul class="chapter-rules">
        <li>두 선택지 모두 좋더라도 조금 더 마음이 가는 쪽을 선택해요.</li>
        <li>선택한 뒤 ‘간발의 차이’인지 ‘확실히 이쪽’인지 알려주세요.</li>
        <li>접촉 선택지는 서로 편안하고 동의된 관계 상황을 전제로 해요.</li>
        <li>이전 장면으로 돌아가 답을 바꿀 수 있어요.</li>
      </ul>
      <button class="primary-button" data-action="start-track">
        20개 장면 시작하기 <span aria-hidden="true">→</span>
      </button>
      <button class="text-button chapter-back" data-action="${hasPreviousResult ? "back-result" : "back-track-select"}">
        ← ${hasPreviousResult ? "이전 결과로 돌아가기" : "다른 테스트 고르기"}
      </button>
    </section>
  `;
}

function renderProgress(track, index) {
  const percent = Math.round((index / 20) * 100);
  return `
    <div class="progress-header">
      <div>
        <span class="progress-header__track">${TRACK_SHORT_LABELS[track]}</span>
        <strong>${String(index + 1).padStart(2, "0")} <small>/ 20</small></strong>
      </div>
      <div
        class="progress-bar"
        role="progressbar"
        aria-label="${TRACK_LABELS[track]} 진행률"
        aria-valuemin="0"
        aria-valuemax="20"
        aria-valuenow="${index}"
      >
        <span style="width:${percent}%"></span>
      </div>
    </div>
  `;
}

function renderQuestion() {
  const track = state.activeTrack;
  const questionId = state.order[track][state.questionIndex];
  const question = getQuestionById(questionId);
  if (!question) return renderDataError();
  const choices = getDisplayChoices(question);

  return `
    <section class="screen screen--question" aria-labelledby="app-title">
      ${renderProgress(track, state.questionIndex)}
      <div class="scene-card">
        <span class="scene-card__tag">${question.context}</span>
        <h1 id="app-title">${question.scene}</h1>
      </div>
      <p class="choice-prompt">${track === "receive" ? "더 사랑받는다고 느끼는 쪽은?" : "내가 더 먼저 하고 싶은 행동은?"}</p>
      <div class="choice-grid">
        ${choices
          .map(
            (choice) => `
              <button
                class="choice-card"
                data-action="select-choice"
                data-category="${choice.category}"
              >
                <span class="choice-card__label">${choice.label}</span>
                <span class="choice-card__text">${choice.text}</span>
                <span class="choice-card__arrow" aria-hidden="true">↗</span>
              </button>
            `,
          )
          .join("")}
      </div>
      <button class="text-button question-back" data-action="previous-question">
        ← 이전 장면
      </button>
    </section>
  `;
}

function renderConfidence() {
  const track = state.activeTrack;
  const questionId = state.order[track][state.questionIndex];
  const question = getQuestionById(questionId);
  const selectedCategory = state.pendingChoice;
  const selected =
    question?.a.category === selectedCategory
      ? question.a
      : question?.b.category === selectedCategory
        ? question.b
        : null;

  if (!question || !selected) {
    state.pendingChoice = null;
    state.view = "question";
    persist();
    return renderQuestion();
  }

  return `
    <section class="screen screen--confidence" aria-labelledby="app-title">
      ${renderProgress(track, state.questionIndex)}
      <div class="selected-recap">
        <span>나의 선택</span>
        <p>${selected.text}</p>
      </div>
      <h1 id="app-title">어느 정도로<br />마음이 기울었나요?</h1>
      <div class="confidence-grid">
        <button class="confidence-card" data-action="set-confidence" data-confidence="close">
          <span aria-hidden="true">≈</span>
          <strong>간발의 차이</strong>
          <small>둘 다 좋지만 조금 더 이쪽</small>
        </button>
        <button class="confidence-card confidence-card--clear" data-action="set-confidence" data-confidence="clear">
          <span aria-hidden="true">!</span>
          <strong>확실히 이쪽</strong>
          <small>고민 없이 이 행동이 더 와닿음</small>
        </button>
      </div>
      <button class="text-button" data-action="change-choice">← 선택 다시 보기</button>
    </section>
  `;
}

function topCategoryMarkup(result) {
  return result.topCategories
    .map((id) => `<span>${CATEGORIES[id].icon} ${CATEGORIES[id].name}</span>`)
    .join("");
}

function rankingMarkup(result, track) {
  return `
    <div class="ranking-card ranking-card--${track}">
      <div class="ranking-card__head">
        <span>${track === "receive" ? "받을 때" : "표현할 때"}</span>
        <strong>${TRACK_LABELS[track]}</strong>
      </div>
      <ol class="ranking-list">
        ${result.ranking
          .map(
            (item, index) => `
              <li>
                <span class="rank-number">${index + 1}</span>
                <span class="rank-icon" aria-hidden="true">${CATEGORIES[item.category].icon}</span>
                <div class="rank-body">
                  <div><strong>${CATEGORIES[item.category].name}</strong><span>${item.score}</span></div>
                  <div class="rank-track" aria-label="${CATEGORIES[item.category].name} 상대 점수 ${item.score}">
                    <span style="width:${item.score}%"></span>
                  </div>
                </div>
              </li>
            `,
          )
          .join("")}
      </ol>
    </div>
  `;
}

function getFeaturedActions(result) {
  const primary = result.selectedActions.filter((item) =>
    result.topCategories.includes(item.category),
  );
  return [...primary]
    .sort((a, b) => (a.confidence === b.confidence ? 0 : a.confidence === "clear" ? -1 : 1))
    .slice(0, 3);
}

function actionGroupMarkup(track, result) {
  const label =
    track === "receive"
      ? "나에게 해주면 좋은 행동"
      : "내가 자연스럽게 하는 행동";
  const actions = getFeaturedActions(result);
  return `
    <div class="action-group action-group--single">
      <h3>${label}</h3>
      <div class="action-card-list">
        ${actions
          .map(
            (item) => `
              <article class="action-card action-card--${track}">
                <span>${item.context} · ${CATEGORIES[item.category].name}</span>
                <p>${item.text}</p>
              </article>
            `,
          )
          .join("")}
      </div>
    </div>
  `;
}

function resultInsightMarkup(track, result) {
  const contextDependent = result.contextSplitCount >= 4;
  return `
    <div class="result-insight result-insight--${track}">
      <span aria-hidden="true">✦</span>
      <div>
        <strong>${contextDependent ? "한 가지 답보다 상황이 중요해요" : "선택의 중심이 비교적 선명해요"}</strong>
        <p>
          ${
            contextDependent
              ? "같은 두 행동도 장면에 따라 선택이 달랐어요. 고정 유형보다 그날 필요한 행동을 함께 이야기해보세요."
              : track === "receive"
                ? "상대에게 바라는 모든 행동이 중요해도, 지금은 이 순서로 사랑이 더 또렷하게 와닿았어요."
                : "여러 방식으로 마음을 표현하지만, 지금은 이 순서의 행동을 더 자연스럽게 먼저 선택했어요."
          }
        </p>
      </div>
    </div>
  `;
}

function trackResultMarkup(track, result, positionLabel) {
  return `
    <section class="track-result-block track-result-block--${track}">
      <div class="track-result-block__head">
        <span>${positionLabel}</span>
        <h2>${TRACK_LABELS[track]}</h2>
        <div class="top-category">${topCategoryMarkup(result)}</div>
      </div>
      ${resultInsightMarkup(track, result)}
      <div class="single-ranking">
        ${rankingMarkup(result, track)}
      </div>
      <div class="result-section result-section--actions">
        <div class="result-section__head">
          <span>내 답에서 꺼낸 문장</span>
          <h2>추상적인 유형보다<br />이 행동을 기억하세요.</h2>
        </div>
        ${actionGroupMarkup(track, result)}
      </div>
      <div class="track-reset-panel">
        <p>이 테스트의 답만 지우고 처음부터 다시 선택할 수 있어요.</p>
        <button class="secondary-button" data-action="reset-track" data-track="${track}">
          다시 테스트하기
        </button>
      </div>
    </section>
  `;
}

function combinedResultMarkup(receiveResult, expressResult) {
  const difference = buildDifferenceSummary(receiveResult, expressResult);
  const contextDependent =
    receiveResult.contextSplitCount >= 4 || expressResult.contextSplitCount >= 4;
  return `
    <section class="combined-result" aria-labelledby="combined-title">
      <div class="eyebrow">두 결과 통합본</div>
      <h2 id="combined-title">느끼는 방식과 표현하는 방식을<br />함께 보면</h2>
      <p class="combined-result__summary">${difference}</p>
      <div class="combined-top-grid">
        <div>
          <span>사랑을 느낄 때</span>
          <div class="top-category">${topCategoryMarkup(receiveResult)}</div>
        </div>
        <div>
          <span>사랑을 표현할 때</span>
          <div class="top-category">${topCategoryMarkup(expressResult)}</div>
        </div>
      </div>
      <div class="result-insight">
        <span aria-hidden="true">✦</span>
        <div>
          <strong>${contextDependent ? "관계에서는 그날의 상황도 중요해요" : "두 방향의 차이를 대화에 활용해보세요"}</strong>
          <p>
            ${
              contextDependent
                ? "같은 행동도 장면에 따라 선택이 달라졌어요. 순위를 고정된 유형으로 보기보다 그날 필요한 행동을 묻는 출발점으로 사용하세요."
                : "내가 자주 해주는 행동이 상대에게서 가장 받고 싶은 행동과 같지는 않을 수 있어요. 두 결과의 차이를 그대로 알려주세요."
            }
          </p>
        </div>
      </div>
    </section>
  `;
}

function additionalTestMarkup(track) {
  const isReceive = track === "receive";
  return `
    <section class="continue-panel continue-panel--${track}">
      <div>
        <span>여기서 끝내도 괜찮아요</span>
        <h2>${isReceive ? "사랑을 느끼는 언어" : "사랑을 표현하는 언어"}도 알아볼까요?</h2>
        <p>20개 장면을 더 선택하면 두 결과의 차이를 합쳐서 보여드려요.</p>
      </div>
      <button class="primary-button" data-action="start-remaining-track" data-track="${track}">
        추가 테스트 하기 <span aria-hidden="true">→</span>
      </button>
    </section>
  `;
}

function renderResult() {
  const completedTracks = state.completedTracks.filter((track) =>
    isTrackComplete(state.answers[track]),
  );
  if (completedTracks.length === 0) {
    state.activeTrack = null;
    state.view = "track-select";
    persist();
    return renderTrackSelect();
  }

  const resultOrder = getResultOrder(completedTracks, state.activeTrack);
  const results = Object.fromEntries(
    completedTracks.map((track) => [
      track,
      calculateTrackResult(track, state.answers[track]),
    ]),
  );
  const allComplete = completedTracks.length === 2;
  const remainingTrack = getRemainingTrack(completedTracks);
  const shareText = allComplete
    ? buildShareText(results.receive, results.express)
    : buildTrackShareText(results[resultOrder[0]]);

  return `
    <section class="screen screen--result" aria-labelledby="app-title">
      <div class="result-hero">
        <div class="eyebrow">${allComplete ? "두 가지 테스트 완료" : "첫 번째 테스트 완료"}</div>
        <h1 id="app-title">${allComplete ? "두 방향의 결과를<br /><em>모두 찾았어요.</em>" : "한 가지 결과를<br /><em>먼저 확인해요.</em>"}</h1>
        <p>
          ${
            allComplete
              ? "방금 마친 결과부터 먼저 보여드리고, 앞서 완료한 결과와 두 방향을 합친 통합본을 이어서 정리했어요."
              : "지금 마친 테스트만으로도 결과를 볼 수 있어요. 나머지 테스트는 원할 때 이어서 진행하세요."
          }
        </p>
      </div>

      <div class="result-stack">
        ${resultOrder
          .map((track, index) =>
            trackResultMarkup(
              track,
              results[track],
              allComplete
                ? index === 0
                  ? "방금 마친 테스트 결과"
                  : "먼저 마친 테스트 결과"
                : "이번 테스트 결과",
            ),
          )
          .join("")}
      </div>

      ${allComplete ? combinedResultMarkup(results.receive, results.express) : additionalTestMarkup(remainingTrack)}

      <div class="share-panel">
        <div>
          <strong>상대와 이야기해보고 싶다면</strong>
          <p>${allComplete ? "두 테스트의 순위와 차이" : "이번 테스트의 순위"}를 텍스트로 공유할 수 있어요.</p>
        </div>
        <div class="share-actions">
          <button class="primary-button" data-action="share-result">결과 공유하기</button>
          <button class="secondary-button" data-action="copy-result">텍스트 복사</button>
        </div>
        <label class="copy-fallback" hidden>
          <span>아래 텍스트를 직접 선택해 복사해주세요.</span>
          <textarea readonly>${shareText}</textarea>
        </label>
      </div>

      <aside class="soft-note soft-note--result">
        <strong>결과 해석의 범위</strong>
        <p>
          이 순위는 다른 사람과 비교하는 점수나 심리 진단이 아닙니다.
          지금 장면들에서의 상대적인 선택이며 시간이 지나면 달라질 수 있어요.
          응답은 이 브라우저에만 저장됩니다.
        </p>
      </aside>
      <button class="text-button danger-link" data-action="reset">두 테스트 응답 모두 지우기</button>
    </section>
  `;
}

function renderDataError() {
  return `
    <section class="screen" aria-labelledby="app-title">
      <h1 id="app-title">문항을 불러오지 못했어요.</h1>
      <p class="section-copy">페이지를 새로고침하거나 저장된 응답을 초기화해주세요.</p>
      <button class="primary-button" data-action="reset">처음부터 다시 시작</button>
    </section>
  `;
}

function render() {
  const renderers = {
    welcome: renderWelcome,
    "track-select": renderTrackSelect,
    "chapter-intro": renderChapterIntro,
    question: renderQuestion,
    confidence: renderConfidence,
    result: renderResult,
  };

  const renderer = renderers[state.view] ?? renderWelcome;
  app.innerHTML = renderer();
  window.scrollTo({ top: 0, behavior: "instant" });
  const title = app.querySelector("#app-title");
  if (title) {
    title.setAttribute("tabindex", "-1");
    title.focus({ preventScroll: true });
  }
}

function handleChoice(category) {
  state.pendingChoice = category;
  setView("confidence");
}

function commitAnswer(confidence) {
  const track = state.activeTrack;
  const questionId = state.order[track][state.questionIndex];
  state.answers[track][questionId] = {
    questionId,
    selected: state.pendingChoice,
    confidence,
    answeredAt: new Date().toISOString(),
  };
  state.pendingChoice = null;

  if (state.questionIndex >= state.order[track].length - 1) {
    if (!state.completedTracks.includes(track)) state.completedTracks.push(track);
    state.view = "result";
  } else {
    state.questionIndex += 1;
    state.view = "question";
  }
  persist();
  render();
}

async function copyText(text) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }
  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.setAttribute("readonly", "");
  textArea.style.position = "fixed";
  textArea.style.opacity = "0";
  document.body.append(textArea);
  textArea.select();
  document.execCommand("copy");
  textArea.remove();
}

function revealCopyFallback(text) {
  const fallback = app.querySelector(".copy-fallback");
  const textArea = fallback?.querySelector("textarea");
  if (!fallback || !textArea) return;
  fallback.hidden = false;
  textArea.value = text;
  textArea.focus();
  textArea.select();
}

function currentShareText() {
  const completedTracks = state.completedTracks.filter((track) =>
    isTrackComplete(state.answers[track]),
  );
  if (completedTracks.length === 2) {
    return buildShareText(
      calculateTrackResult("receive", state.answers.receive),
      calculateTrackResult("express", state.answers.express),
    );
  }
  const track = getResultOrder(completedTracks, state.activeTrack)[0];
  return track
    ? buildTrackShareText(calculateTrackResult(track, state.answers[track]))
    : "";
}

app.addEventListener("click", async (event) => {
  const button = event.target.closest("[data-action]");
  if (!button) return;
  const action = button.dataset.action;

  if (action === "begin") setView("track-select");
  if (action === "back-welcome") setView("welcome");
  if (action === "choose-track") {
    const track = button.dataset.track;
    if (!["receive", "express"].includes(track)) return;
    state.activeTrack = track;
    state.questionIndex = 0;
    setView("chapter-intro");
  }
  if (action === "back-track-select") {
    state.activeTrack = null;
    setView("track-select");
  }
  if (action === "back-result") {
    state.activeTrack = state.completedTracks.at(-1) ?? null;
    setView("result");
  }
  if (action === "start-track") {
    state.questionIndex = Math.min(trackProgress(state.activeTrack), 19);
    setView("question");
  }
  if (action === "select-choice") handleChoice(button.dataset.category);
  if (action === "change-choice") {
    state.pendingChoice = null;
    setView("question");
  }
  if (action === "set-confidence") commitAnswer(button.dataset.confidence);
  if (action === "previous-question") {
    if (state.questionIndex === 0) {
      setView("chapter-intro");
    } else {
      state.questionIndex -= 1;
      setView("question");
    }
  }
  if (action === "start-remaining-track") {
    const track = button.dataset.track;
    if (track !== getRemainingTrack(state.completedTracks)) return;
    state.activeTrack = track;
    state.questionIndex = trackProgress(track);
    setView("chapter-intro");
  }
  if (action === "reset-track") {
    const track = button.dataset.track;
    if (!["receive", "express"].includes(track)) return;
    const trackName = track === "receive" ? "느끼는 언어" : "표현하는 언어";
    const confirmed = window.confirm(
      `${trackName} 응답만 지우고 다시 할까요? 다른 테스트 응답은 그대로 유지됩니다.`,
    );
    if (confirmed) {
      state = resetTrackProgress(state, track);
      persist();
      render();
      showToast(`${trackName} 응답만 지웠어요.`);
    }
  }
  if (action === "copy-result") {
    try {
      await copyText(currentShareText());
      showToast("결과를 클립보드에 복사했어요.");
    } catch {
      revealCopyFallback(currentShareText());
      showToast("아래 결과 텍스트를 직접 복사해주세요.");
    }
  }
  if (action === "share-result") {
    const text = currentShareText();
    try {
      if (navigator.share) {
        await navigator.share({ title: "마음의 순간", text });
      } else {
        await copyText(text);
        showToast("공유용 결과를 복사했어요.");
      }
    } catch (error) {
      if (error?.name !== "AbortError") {
        revealCopyFallback(text);
        showToast("아래 결과 텍스트를 직접 복사해주세요.");
      }
    }
  }
  if (action === "reset") {
    const confirmed = window.confirm("저장된 응답을 모두 지우고 처음부터 시작할까요?");
    if (confirmed) {
      clearState();
      state = createInitialState();
      render();
      showToast("응답을 모두 지웠어요.");
    }
  }
});

const validation = validateQuestionSet();
if (!validation.valid) {
  console.error("Question data validation failed", validation.errors);
  app.innerHTML = renderDataError();
} else {
  render();
}

export { createInitialState, seededShuffle };
