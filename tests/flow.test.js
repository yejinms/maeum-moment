import test from "node:test";
import assert from "node:assert/strict";
import {
  getRemainingTrack,
  getResultOrder,
  isTrackComplete,
  resetTrackProgress,
} from "../js/flow.js";

test("either track can be selected first", () => {
  assert.equal(getRemainingTrack([]), "receive");
  assert.equal(getRemainingTrack(["receive"]), "express");
  assert.equal(getRemainingTrack(["express"]), "receive");
  assert.equal(getRemainingTrack(["receive", "express"]), null);
});

test("latest completed track is shown before the earlier result", () => {
  assert.deepEqual(
    getResultOrder(["receive", "express"], "express"),
    ["express", "receive"],
  );
  assert.deepEqual(
    getResultOrder(["express", "receive"], "receive"),
    ["receive", "express"],
  );
});

test("a track becomes complete after all 20 answers", () => {
  const answers = Object.fromEntries(
    Array.from({ length: 20 }, (_, index) => [`question-${index}`, {}]),
  );
  assert.equal(isTrackComplete(answers), true);
  delete answers["question-19"];
  assert.equal(isTrackComplete(answers), false);
});

test("resetting one track preserves the other track result", () => {
  const state = {
    view: "result",
    activeTrack: "express",
    questionIndex: 19,
    pendingChoice: "words",
    answers: {
      receive: { "receive-1": { selected: "time" } },
      express: { "express-1": { selected: "words" } },
    },
    completedTracks: ["receive", "express"],
    order: { receive: ["receive-1"], express: ["express-1"] },
    seed: 123,
  };

  const nextState = resetTrackProgress(state, "express");

  assert.deepEqual(nextState.answers.express, {});
  assert.deepEqual(nextState.answers.receive, state.answers.receive);
  assert.deepEqual(nextState.completedTracks, ["receive"]);
  assert.equal(nextState.activeTrack, "express");
  assert.equal(nextState.view, "chapter-intro");
  assert.equal(nextState.questionIndex, 0);
  assert.equal(nextState.pendingChoice, null);
  assert.deepEqual(nextState.order, state.order);
  assert.equal(nextState.seed, 123);
});

test("an unknown track cannot clear saved progress", () => {
  const state = { answers: {}, completedTracks: [] };
  assert.equal(resetTrackProgress(state, "unknown"), state);
});
