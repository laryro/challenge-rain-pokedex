import { useState, useEffect, useRef } from "react";

const useAvailableHeight = () => {
  const parentElementRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number>(window.innerHeight);

  const updateHeight = () => {
    if (parentElementRef.current) {
      const containerTop = parentElementRef.current.getBoundingClientRect().top;
      const availableHeight = window.innerHeight - containerTop;
      setHeight(availableHeight);
    }
  };

  useEffect(() => {
    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => {
      window.removeEventListener("resize", updateHeight);
    };
  }, []);

  return { parentElementRef, height };
};

export default useAvailableHeight;
