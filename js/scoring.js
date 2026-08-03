import {
  CATEGORIES,
  CATEGORY_ORDER,
  getQuestionById,
  getQuestions,
} from "./data.js";

export const CONFIDENCE_WEIGHTS = {
  close: 1,
  clear: 1.25,
};

function emptyScore(category) {
  return {
    category,
    score: 0,
    rawScore: 0,
    appearances: 0,
    wins: 0,
    clearWins: 0,
  };
}

export function calculateTrackResult(track, answerMap = {}) {
  const questions = getQuestions(track);
  const scores = Object.fromEntries(
    CATEGORY_ORDER.map((category) => [category, emptyScore(category)]),
  );

  for (const item of questions) {
    scores[item.a.category].appearances += 1;
    scores[item.b.category].appearances += 1;

    const answer = answerMap[item.id];
    if (!answer || !scores[answer.selected]) continue;

    const weight = CONFIDENCE_WEIGHTS[answer.confidence] ?? 1;
    const selectedScore = scores[answer.selected];
    selectedScore.rawScore += weight;
    selectedScore.wins += 1;
    if (answer.confidence === "clear") selectedScore.clearWins += 1;
  }

  const ranking = CATEGORY_ORDER.map((category) => {
    const item = scores[category];
    const maxScore = item.appearances * CONFIDENCE_WEIGHTS.clear;
    return {
      ...item,
      score: maxScore ? Math.round((item.rawScore / maxScore) * 100) : 0,
    };
  }).sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    if (b.wins !== a.wins) return b.wins - a.wins;
    if (b.clearWins !== a.clearWins) return b.clearWins - a.clearWins;
    return CATEGORY_ORDER.indexOf(a.category) - CATEGORY_ORDER.indexOf(b.category);
  });

  const pairWinners = new Map();
  for (const item of questions) {
    const answer = answerMap[item.id];
    if (!answer) continue;
    const key = item.pair.join("|");
    if (!pairWinners.has(key)) pairWinners.set(key, new Set());
    pairWinners.get(key).add(answer.selected);
  }

  const contextSplitCount = [...pairWinners.values()].filter(
    (winners) => winners.size > 1,
  ).length;
  const topGap = ranking.length > 1 ? ranking[0].score - ranking[1].score : 100;
  const topCategories =
    ranking.length > 1 && topGap < 5
      ? [ranking[0].category, ranking[1].category]
      : [ranking[0].category];

  const selectedActions = Object.values(answerMap)
    .map((answer) => {
      const item = getQuestionById(answer.questionId);
      if (!item) return null;
      const option =
        item.a.category === answer.selected
          ? item.a
          : item.b.category === answer.selected
            ? item.b
            : null;
      return option
        ? {
            questionId: item.id,
            context: item.context,
            category: option.category,
            text: option.text,
            confidence: answer.confidence,
          }
        : null;
    })
    .filter(Boolean);

  return {
    track,
    answeredCount: Object.keys(answerMap).length,
    ranking,
    topCategories,
    contextSplitCount,
    selectedActions,
  };
}

function categoryPhrase(categoryIds) {
  return categoryIds.map((id) => CATEGORIES[id].name).join("과 ");
}

export function buildDifferenceSummary(receiveResult, expressResult) {
  const receiveTop = receiveResult.topCategories;
  const expressTop = expressResult.topCategories;
  const same =
    receiveTop.length === expressTop.length &&
    receiveTop.every((category) => expressTop.includes(category));

  if (same) {
    return `사랑을 느끼는 방식과 표현하는 방식 모두 ${categoryPhrase(receiveTop)}에 중심이 있어요.`;
  }

  return `주로 마음을 표현하는 방식은 ${categoryPhrase(expressTop)}이고, 사랑을 더 선명하게 느끼는 방식은 ${categoryPhrase(receiveTop)}입니다.`;
}

export function buildTrackShareText(result) {
  const label =
    result.track === "receive" ? "사랑을 느끼는 순서" : "사랑을 표현하는 순서";
  const names = result.ranking
    .map((item, index) => `${index + 1}. ${CATEGORIES[item.category].name}`)
    .join("\n");

  return [
    "마음의 순간 — 나의 관계 선호 지도",
    "",
    `[${label}]`,
    names,
    "",
    "이 결과는 진단이 아니라 대화를 위한 개인 내 상대 순위예요.",
  ].join("\n");
}

export function buildShareText(receiveResult, expressResult) {
  const receiveNames = receiveResult.ranking
    .map((item, index) => `${index + 1}. ${CATEGORIES[item.category].name}`)
    .join("\n");
  const expressNames = expressResult.ranking
    .map((item, index) => `${index + 1}. ${CATEGORIES[item.category].name}`)
    .join("\n");

  return [
    "마음의 순간 — 나의 관계 선호 지도",
    "",
    buildDifferenceSummary(receiveResult, expressResult),
    "",
    "[사랑을 느끼는 순서]",
    receiveNames,
    "",
    "[사랑을 표현하는 순서]",
    expressNames,
    "",
    "이 결과는 진단이 아니라 대화를 위한 개인 내 상대 순위예요.",
  ].join("\n");
}
