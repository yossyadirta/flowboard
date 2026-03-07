"use client";

import { RefObject, useEffect, useState } from "react";

export const useIsOverflow = (ref: RefObject<HTMLElement | null>) => {
  const [overflow, setOverflow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const check = () => {
      const isOverflowing = el.scrollWidth > el.clientWidth;
      setOverflow(isOverflowing);
    };

    const raf = requestAnimationFrame(check);

    const resizeObserver = new ResizeObserver(check);
    resizeObserver.observe(el);

    return () => {
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
    };
  }, [ref]);

  return overflow;
};
