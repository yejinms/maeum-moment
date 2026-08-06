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

export function resetTrackProgress(state, track) {
  if (!TRACKS.includes(track)) return state;

  return {
    ...state,
    view: "chapter-intro",
    activeTrack: track,
    questionIndex: 0,
    pendingChoice: null,
    answers: {
      ...state.answers,
      [track]: {},
    },
    completedTracks: state.completedTracks.filter(
      (completedTrack) => completedTrack !== track,
    ),
  };
}
