import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

type OpenModalContextProps = {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  openModal: () => void;
};

type OpenModalProviderProps = {
  children: ReactNode;
};

export const OpenModalContext = createContext<OpenModalContextProps>(
  {} as OpenModalContextProps,
);

const OpenModalProvider = ({ children }: OpenModalProviderProps) => {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal((prevState) => !prevState);
  };

  return (
    <OpenModalContext.Provider value={{ showModal, setShowModal, openModal }}>
      {children}
    </OpenModalContext.Provider>
  );
};

export default OpenModalProvider;
