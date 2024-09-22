import { useEffect, useState } from "react";

export const useWindowWidth = () => {
  const [width, setWidth] = useState<number | undefined>();

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);
      handleResize();
    }

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return width;
};
