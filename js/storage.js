const STORAGE_KEY = "maeum-moment-state-v1";
const STATE_VERSION = 4;

export function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const state = JSON.parse(raw);
    if (state?.version !== STATE_VERSION) {
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }
    return state;
  } catch {
    localStorage.removeItem(STORAGE_KEY);
    return null;
  }
}

export function saveState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // The app remains usable when storage is unavailable.
  }
}

export function clearState() {
  localStorage.removeItem(STORAGE_KEY);
}

export { STATE_VERSION, STORAGE_KEY };
