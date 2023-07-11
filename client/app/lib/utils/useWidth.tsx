'use client';

import { useEffect, useState } from 'react';

const useWidth = (): number => {
  const windowWidth = typeof window !== 'undefined' ? window.innerWidth : 0;

  const [width, setWidth] = useState(windowWidth);

  const resize = () => setWidth(window.innerWidth);

  useEffect(() => {
    window.addEventListener('resize', resize);

    return () => window.removeEventListener('resize', resize);
  }, []);

  return width;
};

export default useWidth;
