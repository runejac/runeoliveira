import { createContext, type ReactNode } from "react";
import { useWindowWidth } from "@/hooks/useWindowWidth";

export const WindowWidthContext = createContext<number | undefined>(undefined);

type WindowWidthContextProviderProps = {
  children: ReactNode;
};

const WindowWidthProvider = ({ children }: WindowWidthContextProviderProps) => {
  const windowWidth = useWindowWidth();
  return (
    <WindowWidthContext.Provider value={windowWidth}>
      {children}
    </WindowWidthContext.Provider>
  );
};

export default WindowWidthProvider;
