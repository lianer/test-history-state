import PQueue from 'p-queue';

/*
两种方式设置 history.state
1. 通过 PQueue 实现 history.state 的防抖（容易出现超限问题 30s 触发 100 次，防抖仅间隔一个微任务，setState 后立即页面将会失效）
2. 通过劫持 history.pushState/replaceState 实现（该方法不是万能的，如果用户操作浏览器前进、后退，则无法实现在跳转前存储当前页面的数据）
*/

export enum ApplyPlan {
  hijack = 'hijack',
  defer = 'defer',
}

class HistoryState {
  plan: ApplyPlan;
  rawPushState: History['pushState'];
  rawReplaceState: History['replaceState'];
  queue: PQueue;

  constructor(plan: ApplyPlan = ApplyPlan.defer) {
    this.plan = plan;
    this.rawReplaceState = window.history.replaceState;
    this.rawPushState = window.history.pushState;
    this.queue = new PQueue({ concurrency: 1 });

    if (this.plan === ApplyPlan.hijack) {
      window.history.replaceState = (...args) => {
        this.applyStateSync();
        this.rawReplaceState.call(window.history, ...args);
      };
      window.history.pushState = (...args) => {
        this.applyStateSync();
        this.rawPushState.call(window.history, ...args);
      };
    } else {
      window.history.replaceState = (...args) => {
        this.queue.clear();
        this.rawReplaceState.call(window.history, ...args);
      };
      window.history.pushState = (...args) => {
        this.queue.clear();
        this.rawPushState.call(window.history, ...args);
      };
    }
  }

  setItem(key: string, value: any) {
    let state: Record<PropertyKey, any> = {};
    if (Object.prototype.toString.call(window.history.state) === '[object Object]') {
      state = window.history.state;
    }
    state[key] = value;
    if (this.plan === ApplyPlan.defer) {
      this.applyState();
    }
  }

  getItem(key: string) {
    const oldState = window.history.state || {};
    return oldState[key];
  }

  removeItem(key: string) {
    const oldState = window.history.state || {};
    delete oldState[key];
    if (this.plan === ApplyPlan.defer) {
      this.applyState();
    }
  }

  applyState(state?: Record<PropertyKey, any>) {
    this.queue.clear();
    this.queue.add(() => {
      this.applyStateSync(state);
    });
  }

  applyStateSync(state?: Record<PropertyKey, any>) {
    this.rawReplaceState.call(window.history, state ?? window.history.state, document.title);
  }
}

const historyState = new HistoryState();

export default historyState;
