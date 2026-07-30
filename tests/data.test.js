import test from "node:test";
import assert from "node:assert/strict";
import {
  CATEGORIES,
  CATEGORY_ORDER,
  QUESTIONS,
  getQuestions,
  validateQuestionSet,
} from "../js/data.js";

test("five categories are defined in stable order", () => {
  assert.equal(CATEGORY_ORDER.length, 5);
  assert.deepEqual(Object.keys(CATEGORIES), CATEGORY_ORDER);
});

test("question set is internally valid", () => {
  const validation = validateQuestionSet();
  assert.equal(validation.valid, true, validation.errors.join("\n"));
  assert.deepEqual(validation.errors, []);
});

test("each track contains 20 questions", () => {
  assert.equal(getQuestions("receive").length, 20);
  assert.equal(getQuestions("express").length, 20);
  assert.equal(QUESTIONS.length, 40);
});

test("each category pair appears exactly twice per track", () => {
  for (const track of ["receive", "express"]) {
    const counts = new Map();
    for (const item of getQuestions(track)) {
      const key = item.pair.join("|");
      counts.set(key, (counts.get(key) ?? 0) + 1);
    }
    assert.equal(counts.size, 10);
    for (const count of counts.values()) assert.equal(count, 2);
  }
});

test("all 40 questions use distinct relationship contexts", () => {
  const contexts = QUESTIONS.map((item) => item.context);
  assert.equal(new Set(contexts).size, 40);

  for (const track of ["receive", "express"]) {
    const trackContexts = getQuestions(track).map((item) => item.context);
    assert.equal(new Set(trackContexts).size, 20);
  }
});

test("category choices avoid repetitive editorial formulas", () => {
  const choiceTexts = QUESTIONS.flatMap((item) => [item.a, item.b]);
  const count = (category, phrase) =>
    choiceTexts.filter(
      (choice) =>
        choice.category === category && choice.text.includes(phrase),
    ).length;

  assert.ok(count("touch", "묻") <= 3, "touch choices overuse consent prompts");
  assert.ok(count("touch", "손") <= 6, "touch choices overuse hand contact");
  assert.ok(count("touch", "어깨") <= 4, "touch choices overuse shoulder contact");
  assert.ok(count("touch", "소파") <= 3, "touch choices overuse one setting");
  assert.ok(count("gifts", "작은") <= 4, "gift choices overuse 'small'");
  assert.ok(count("gifts", "건넨") <= 4, "gift choices overuse 'hand over'");
  assert.ok(count("service", "정리") <= 3, "service choices overuse organizing");
  assert.ok(count("words", "구체적") <= 3, "word choices overuse one formula");
});
