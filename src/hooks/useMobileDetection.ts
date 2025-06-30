import { useEffect, useState } from "react";

export function useMobileDetection(breakpoint: number = 768) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(globalThis.innerWidth < breakpoint);
    };

    checkScreenSize();
    globalThis.addEventListener("resize", checkScreenSize);
    return () => globalThis.removeEventListener("resize", checkScreenSize);
  }, [breakpoint]);

  return isMobile;
}
