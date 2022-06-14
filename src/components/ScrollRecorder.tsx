import { useDebounceEffect, useScroll } from 'ahooks';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import historyState from '../lib/historyState';

const ScrollRecorder: React.FC = () => {
  const location = useLocation();
  const scroll = useScroll();

  useDebounceEffect(
    () => {
      historyState.setItem('scrollTop', document.documentElement.scrollTop);
    },
    [scroll],
    { wait: 100 }
  );

  useEffect(() => {
    window.scrollTo(0, historyState.getItem('scrollTop') || 0);
  }, [location]);

  return <></>;
};

export default ScrollRecorder;
