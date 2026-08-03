import test from "node:test";
import assert from "node:assert/strict";
import {
  getRemainingTrack,
  getResultOrder,
  isTrackComplete,
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
