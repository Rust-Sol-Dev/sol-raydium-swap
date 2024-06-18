import BgButton from "@/components/BgButton";
import { SendIcon, ShareIcon, SpinIcon, SwapIcon } from "@/components/svgIcons";
import TokenPopup from "@/components/tokens/tokenPopup";
import { STANDARD_TOKENS } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

// Define the type for your modal context
interface ConfirmModalContextType {
  openModal: (content: ReactNode) => void;
  closeModal: () => void;
  isVisible: boolean;
}

// Create the modal context
const ConfirmModalContext = createContext<ConfirmModalContextType | undefined>(
  undefined
);

// Define the modal provider component
export const ConfirmModalProvider = ({ children }: { children: ReactNode }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [content, setContent] = useState<ReactNode>();

  const openModal = (content: ReactNode) => {
    setContent(content);
    setIsVisible(true);
    document.body.classList.add("modal-open");
  };

  const closeModal = () => {
    setIsVisible(false);
    document.body.classList.remove("modal-open");
  };

  useEffect(() => {
    return () => {
      // Cleanup function to remove class when component unmounts
      document.body.classList.remove("modal-open");
    };
  }, []);

  return (
    <ConfirmModalContext.Provider
      value={{
        openModal,
        closeModal,
        isVisible,
      }}
    >
      {children}
      {isVisible && (
        <div className="fixed left-0 top-0 w-screen h-screen bg-black/40 backdrop-blur-sm grid place-content-center z-50">
          {content}

          {/* <div
            className="absolute left-0 top-0 w-full h-full"
            onClick={closeModal}
          /> */}
        </div>
      )}
    </ConfirmModalContext.Provider>
  );
};

// Custom hook to access the modal context
export const useConfirmModal = () => {
  const context = useContext(ConfirmModalContext);
  if (!context) {
    throw new Error(
      "useConfirmModal must be used within a ConfirmModalProvider"
    );
  }
  return context;
};
