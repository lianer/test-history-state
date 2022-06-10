class HistoryState {
  setItem(key: string, value: any) {
    const oldState = window.history.state || {};
    oldState[key] = value;
    window.history.replaceState(oldState, document.title);
  }

  getItem(key: string) {
    const oldState = window.history.state || {};
    return oldState[key];
  }

  removeItem(key: string) {
    const oldState = window.history.state || {};
    delete oldState[key];
    window.history.replaceState(oldState, document.title);
  }
}

const historyState = new HistoryState();

export default historyState;
