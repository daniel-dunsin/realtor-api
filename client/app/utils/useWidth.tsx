'use client';

import { useEffect, useState } from 'react';

const useWidth = (): number => {
  const [width, setWidth] = useState(window?.innerWidth || 0);

  const resize = () => setWidth(window.innerWidth);

  useEffect(() => {
    window.addEventListener('resize', resize);

    return () => window.removeEventListener('resize', resize);
  }, []);

  return width;
};

export default useWidth;
