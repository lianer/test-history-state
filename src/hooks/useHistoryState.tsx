import { useEffect, useState } from 'react';
import historyState from '../lib/historyState';

function useHistoryState<S>(
  initialValue: S | (() => S),
  stateKey: string,
  disable: boolean = false
) {
  if (!disable) {
    initialValue = historyState.getItem(stateKey) ?? initialValue;
  }

  const [state, setState] = useState<S>(initialValue);

  useEffect(() => {
    if (!disable) {
      historyState.setItem(stateKey, state);
    }
  }, [state, stateKey, disable]);

  return [state, setState] as const;
}

export default useHistoryState;
