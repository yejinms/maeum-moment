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
