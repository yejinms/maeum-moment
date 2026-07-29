import test from "node:test";
import assert from "node:assert/strict";
import { CATEGORIES, getQuestions } from "../js/data.js";
import {
  buildDifferenceSummary,
  buildShareText,
  calculateTrackResult,
} from "../js/scoring.js";

function answersFavoring(track, category, confidence = "clear") {
  const answers = {};
  for (const item of getQuestions(track)) {
    const selected = item.pair.includes(category)
      ? category
      : item.a.category;
    answers[item.id] = {
      questionId: item.id,
      selected,
      confidence,
      answeredAt: "2026-07-29T00:00:00.000Z",
    };
  }
  return answers;
}

test("a consistently favored category ranks first", () => {
  const result = calculateTrackResult(
    "receive",
    answersFavoring("receive", "service"),
  );
  assert.equal(result.ranking[0].category, "service");
  assert.equal(result.ranking[0].score, 100);
  assert.equal(result.answeredCount, 20);
});

test("clear choices score more than close choices", () => {
  const questions = getQuestions("receive");
  const target = questions[0];
  const closeResult = calculateTrackResult("receive", {
    [target.id]: {
      questionId: target.id,
      selected: target.a.category,
      confidence: "close",
    },
  });
  const clearResult = calculateTrackResult("receive", {
    [target.id]: {
      questionId: target.id,
      selected: target.a.category,
      confidence: "clear",
    },
  });
  const closeScore = closeResult.ranking.find(
    (item) => item.category === target.a.category,
  ).rawScore;
  const clearScore = clearResult.ranking.find(
    (item) => item.category === target.a.category,
  ).rawScore;
  assert.equal(closeScore, 1);
  assert.equal(clearScore, 1.25);
});

test("split winners in repeated pair count as context dependent", () => {
  const pairQuestions = getQuestions("receive").filter(
    (item) => item.pair.join("|") === "time|words",
  );
  const answers = {
    [pairQuestions[0].id]: {
      questionId: pairQuestions[0].id,
      selected: "words",
      confidence: "close",
    },
    [pairQuestions[1].id]: {
      questionId: pairQuestions[1].id,
      selected: "time",
      confidence: "close",
    },
  };
  const result = calculateTrackResult("receive", answers);
  assert.equal(result.contextSplitCount, 1);
});

test("difference summary names distinct receive and express preferences", () => {
  const receive = calculateTrackResult(
    "receive",
    answersFavoring("receive", "words"),
  );
  const express = calculateTrackResult(
    "express",
    answersFavoring("express", "service"),
  );
  const summary = buildDifferenceSummary(receive, express);
  assert.match(summary, new RegExp(CATEGORIES.service.name));
  assert.match(summary, new RegExp(CATEGORIES.words.name));
});

test("share text contains both ordered sections and disclaimer", () => {
  const receive = calculateTrackResult(
    "receive",
    answersFavoring("receive", "time"),
  );
  const express = calculateTrackResult(
    "express",
    answersFavoring("express", "gifts"),
  );
  const text = buildShareText(receive, express);
  assert.match(text, /사랑을 느끼는 순서/);
  assert.match(text, /사랑을 표현하는 순서/);
  assert.match(text, /진단이 아니라/);
});

