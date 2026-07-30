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
  calculateTrackResult,
} from "./scoring.js";
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
    context: null,
    activeTrack: "receive",
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
        내 마음의 순서 찾기
        <span aria-hidden="true">→</span>
      </button>
      <div class="trust-row">
        <span>약 7분</span>
        <span>40개 장면</span>
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

function renderContext() {
  return `
    <section class="screen" aria-labelledby="app-title">
      <div class="step-kicker">준비 · 1분</div>
      <h1 id="app-title">누구를 떠올리며<br />선택할까요?</h1>
      <p class="section-copy">
        같은 행동도 관계와 시기에 따라 다르게 느껴질 수 있어요.
        한 사람 또는 한 가지 관계 상황을 끝까지 유지해주세요.
      </p>
      <div class="context-grid">
        <button class="context-card" data-action="choose-context" data-context="specific">
          <span class="context-card__icon" aria-hidden="true">♥</span>
          <strong>특정한 사람</strong>
          <span>현재 연인이나 마음에 둔 한 사람을 떠올릴게요.</span>
        </button>
        <button class="context-card" data-action="choose-context" data-context="general">
          <span class="context-card__icon" aria-hidden="true">✦</span>
          <strong>일반적인 연인</strong>
          <span>앞으로 만나고 싶은 관계를 상상하며 답할게요.</span>
        </button>
      </div>
      <button class="text-button" data-action="back-welcome">← 처음으로</button>
    </section>
  `;
}

function renderChapterIntro() {
  const isReceive = state.activeTrack === "receive";
  const completed = state.completedTracks.length;
  return `
    <section class="screen screen--chapter ${isReceive ? "accent-receive" : "accent-express"}" aria-labelledby="app-title">
      <div class="chapter-count">CHAPTER ${completed + 1} / 2</div>
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

function renderChapterComplete() {
  const track = state.activeTrack;
  const result = calculateTrackResult(track, state.answers[track]);
  const isLast = track === "express";
  return `
    <section class="screen screen--chapter-complete" aria-labelledby="app-title">
      <div class="completion-burst" aria-hidden="true">✦</div>
      <div class="eyebrow">${TRACK_LABELS[track]} 완료</div>
      <h1 id="app-title">지금까지 가장<br />마음이 간 행동은</h1>
      <div class="top-category">${topCategoryMarkup(result)}</div>
      <p class="section-copy section-copy--narrow">
        ${
          isLast
            ? "두 방향을 모두 확인했어요. 이제 순위와 차이, 실제로 선택한 행동을 한눈에 정리해드릴게요."
            : result.contextSplitCount >= 4
            ? "상황에 따라 선택이 꽤 달랐어요. 이것도 중요한 결과이므로 마지막에 함께 보여드릴게요."
            : "선택의 흐름이 조금씩 보이기 시작했어요. 다음 챕터에서 반대 방향도 확인해볼게요."
        }
      </p>
      <button class="primary-button" data-action="${isLast ? "show-result" : "next-track"}">
        ${isLast ? "내 관계 선호 지도 보기" : "표현하는 순간으로"} <span aria-hidden="true">→</span>
      </button>
    </section>
  `;
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

function actionCardsMarkup(receiveResult, expressResult) {
  const groups = [
    { label: "나에게 해주면 좋은 행동", track: "receive", actions: getFeaturedActions(receiveResult) },
    { label: "내가 자연스럽게 하는 행동", track: "express", actions: getFeaturedActions(expressResult) },
  ];

  return groups
    .map(
      (group) => `
        <div class="action-group">
          <h3>${group.label}</h3>
          ${group.actions
            .map(
              (item) => `
                <article class="action-card action-card--${group.track}">
                  <span>${item.context} · ${CATEGORIES[item.category].name}</span>
                  <p>${item.text}</p>
                </article>
              `,
            )
            .join("")}
        </div>
      `,
    )
    .join("");
}

function renderResult() {
  const receiveResult = calculateTrackResult("receive", state.answers.receive);
  const expressResult = calculateTrackResult("express", state.answers.express);
  if (receiveResult.answeredCount < 20 || expressResult.answeredCount < 20) {
    state.activeTrack = receiveResult.answeredCount < 20 ? "receive" : "express";
    state.questionIndex = trackProgress(state.activeTrack);
    state.view = "question";
    persist();
    return renderQuestion();
  }

  const difference = buildDifferenceSummary(receiveResult, expressResult);
  const contextDependent =
    receiveResult.contextSplitCount >= 4 || expressResult.contextSplitCount >= 4;

  return `
    <section class="screen screen--result" aria-labelledby="app-title">
      <div class="result-hero">
        <div class="eyebrow">나의 관계 선호 지도</div>
        <h1 id="app-title">마음이 움직이는<br /><em>순서를 찾았어요.</em></h1>
        <p>${difference}</p>
      </div>

      <div class="result-insight">
        <span aria-hidden="true">✦</span>
        <div>
          <strong>${contextDependent ? "한 가지 답보다 상황이 중요해요" : "두 방향의 차이를 기억해두세요"}</strong>
          <p>
            ${
              contextDependent
                ? "같은 두 행동도 장면에 따라 선택이 달랐어요. 고정 유형보다 그날의 필요를 묻는 대화가 잘 맞을 수 있어요."
                : "내가 자주 해주는 행동이 상대에게서 가장 받고 싶은 행동과 같지는 않을 수 있어요."
            }
          </p>
        </div>
      </div>

      <div class="ranking-grid">
        ${rankingMarkup(receiveResult, "receive")}
        ${rankingMarkup(expressResult, "express")}
      </div>

      <section class="result-section">
        <div class="result-section__head">
          <span>내 답에서 꺼낸 문장</span>
          <h2>추상적인 유형보다<br />이 행동을 기억하세요.</h2>
        </div>
        <div class="action-grid">
          ${actionCardsMarkup(receiveResult, expressResult)}
        </div>
      </section>

      <div class="share-panel">
        <div>
          <strong>상대와 이야기해보고 싶다면</strong>
          <p>순위와 차이 요약만 텍스트로 공유할 수 있어요.</p>
        </div>
        <div class="share-actions">
          <button class="primary-button" data-action="share-result">결과 공유하기</button>
          <button class="secondary-button" data-action="copy-result">텍스트 복사</button>
        </div>
        <label class="copy-fallback" hidden>
          <span>아래 텍스트를 직접 선택해 복사해주세요.</span>
          <textarea readonly>${buildShareText(receiveResult, expressResult)}</textarea>
        </label>
      </div>

      <aside class="soft-note soft-note--result">
        <strong>결과 해석의 범위</strong>
        <p>
          이 순위는 다른 사람과 비교하는 점수나 심리 진단이 아닙니다.
          현재 떠올린 관계와 장면 안에서의 상대적인 선택이며 시간이 지나면 달라질 수 있어요.
          응답은 이 브라우저에만 저장됩니다.
        </p>
      </aside>
      <button class="text-button danger-link" data-action="reset">응답을 지우고 다시 시작</button>
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
    context: renderContext,
    "chapter-intro": renderChapterIntro,
    question: renderQuestion,
    confidence: renderConfidence,
    "chapter-complete": renderChapterComplete,
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
    state.view = "chapter-complete";
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
  return buildShareText(
    calculateTrackResult("receive", state.answers.receive),
    calculateTrackResult("express", state.answers.express),
  );
}

app.addEventListener("click", async (event) => {
  const button = event.target.closest("[data-action]");
  if (!button) return;
  const action = button.dataset.action;

  if (action === "begin") setView("context");
  if (action === "back-welcome") setView("welcome");
  if (action === "choose-context") {
    state.context = button.dataset.context;
    state.activeTrack = "receive";
    state.questionIndex = 0;
    setView("chapter-intro");
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
  if (action === "next-track") {
    state.activeTrack = "express";
    state.questionIndex = 0;
    setView("chapter-intro");
  }
  if (action === "show-result") setView("result");
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
