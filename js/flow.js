export const TRACKS = ["receive", "express"];

export function getRemainingTrack(completedTracks = []) {
  return TRACKS.find((track) => !completedTracks.includes(track)) ?? null;
}

export function getResultOrder(completedTracks = [], activeTrack = null) {
  const completed = TRACKS.filter((track) => completedTracks.includes(track));
  if (!activeTrack || !completed.includes(activeTrack)) {
    return [...completed].reverse();
  }
  return [activeTrack, ...completed.filter((track) => track !== activeTrack)];
}

export function isTrackComplete(answerMap = {}, requiredAnswers = 20) {
  return Object.keys(answerMap).length >= requiredAnswers;
}
