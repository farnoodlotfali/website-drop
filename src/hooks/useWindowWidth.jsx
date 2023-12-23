import { useEffect, useState } from "react";

export const useWindowWidth = (minWidth) => {
  const [state, setState] = useState({
    windowWidth: typeof window !== "undefined" ? window.innerWidth : 0,
    isDesiredWidth: false,
  });

  useEffect(() => {
    const resizeHandler = () => {
      const currentWindowWidth = window.innerWidth;
      const isDesiredWidth = currentWindowWidth < minWidth;
      setState({ windowWidth: currentWindowWidth, isDesiredWidth });
    };
    window.addEventListener("resize", resizeHandler);
    return () => window.removeEventListener("resize", resizeHandler);
  }, [state.windowWidth]);

  return state;
};
