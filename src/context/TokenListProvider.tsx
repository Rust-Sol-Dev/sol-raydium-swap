import TokenPopup from "@/components/tokens/tokenPopup";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

// Define the type for your modal context
interface TokenListContextType {
  openModal: () => void;
  closeModal: () => void;
  isVisible: boolean;
  type?: "pay" | "receive" | "transfer";
}

// Create the modal context
const TokenListContext = createContext<TokenListContextType | undefined>(
  undefined
);

// Define the modal provider component
export const TokenListProvider = ({ children }: { children: ReactNode }) => {
  const [isVisible, setIsVisible] = useState(false);

  const openModal = () => {
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
    <TokenListContext.Provider
      value={{
        openModal,
        closeModal,
        isVisible,
      }}
    >
      {children}
      <TokenPopup />
    </TokenListContext.Provider>
  );
};

// Custom hook to access the modal context
export const useTokenList = () => {
  const context = useContext(TokenListContext);
  if (!context) {
    throw new Error("useTokenList must be used within a TokenListProvider");
  }
  return context;
};
