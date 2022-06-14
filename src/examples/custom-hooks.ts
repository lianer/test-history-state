import { Dispatch, SetStateAction, useState } from 'react';

type R1 = null extends any ? 1 : 0;

function useTest<S>(initialValue: S | (() => S)): [S, Dispatch<SetStateAction<S>>];
// function useTest<S>(initialValue: S | (() => S)): ReturnType<typeof useState<S>>;
function useTest(): null;

function useTest<S>(initialValue?: S | (() => S)) {
  const [state, setState] = useState<S>(initialValue!);

  if (!initialValue) return null;

  return [state, setState] as const;
}

function TestComponent() {
  const [count, setCount] = useTest<number>(1);

  const a = count + 1;
}

export {};
