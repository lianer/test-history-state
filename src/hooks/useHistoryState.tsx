import React, { useEffect, useState } from 'react';
import historyState from '../lib/historyState';

// function useState<S>(initialState: S | (() => S)): [S, Dispatch<SetStateAction<S>>];
// function useState<S = undefined>(): [S | undefined, Dispatch<SetStateAction<S | undefined>>];

// function useHistoryState<S>(
//   initialValue: S | (() => S),
//   stateKey?: string
// ): ReturnType<typeof useState<S>>;

function useHistoryState<S>(
  initialValue: S | (() => S),
  stateKey: string,
  disableHistoryState: boolean = false
) {
  if (!disableHistoryState) {
    initialValue = historyState.getItem(stateKey) ?? initialValue;
  }

  const ret = useState<S>(initialValue);

  useEffect(() => {
    if (!disableHistoryState) {
      historyState.setItem(stateKey, ret[0]);
    }
  }, [ret[0]]);

  return ret;
}

export default useHistoryState;