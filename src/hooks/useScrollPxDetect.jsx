import { useEffect, useMemo, useState } from "react";

export const useScrollPxDetect = (numberPx, ref) => {
  const element = useMemo(() => ref ?? window, [ref]);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    element.addEventListener("scroll", handleScroll);

    return () => {
      // Cleanup after the component is unmounted
      element.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return {
    IsDetect: scrollPosition > numberPx,
    scrollPosition,
  };
};
