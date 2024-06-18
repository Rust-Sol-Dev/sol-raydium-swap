import { FC, useEffect } from "react";
import { CloseIcon, SearchIcon } from "../svgIcons";
import { STANDARD_TOKENS } from "@/constants";
import TokenLine from "./tokenLine";
import TokenButton from "./tokenButton";
import { useTokenList } from "@/context/TokenListProvider";

const TokenPopup: FC = () => {
  const { isVisible, closeModal: closeTokenModal } = useTokenList();

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" || event.key === "Esc") {
        closeTokenModal();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [closeTokenModal]);
  return (
    <div
      className="fixed left-0 top-0 h-screen w-screen bg-black/20 backdrop-blur-sm z-50 grid place-content-center duration-200"
      style={{
        opacity: isVisible ? 1 : 0,
        pointerEvents: isVisible ? "all" : "none",
      }}
    >
      <div
        className="hidden sm:block absolute left-0 top-0 w-full h-full z-10"
        onClick={closeTokenModal}
      />
      <div
        className="w-screen sm:w-[440px] relative z-10 sm:rounded-2xl bg-[#1e1e1e] h-screen sm:min-h-[480px] p-2 sm:p-5 sm:max-h-[80vh] duration-300 delay-150"
        style={{
          transform: `translateY(${!isVisible ? "-100vh" : 0})`,
        }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center w-[calc(100%-32px)]">
            <SearchIcon className="w-5 h-5 mr-2" fill="#ffffff50" />
            <input
              className="w-[calc(100%-32px)] py-1 bg-transparent text-white/80 text-sm outline-none placeholder:text-white/50"
              placeholder="Search by token or paste address"
            />
          </div>
          <button
            className="w-6 h-6 rounded-lg bg-white/10 grid place-content-center hover:opacity-80 duration-200 group"
            onClick={closeTokenModal}
          >
            <CloseIcon
              className="w-4 h-4 group-hover:rotate-90 duration-200"
              fill="#ffffff80"
            />
          </button>
        </div>
        {/* Standard Tokens */}
        <div className="flex gap-2 flex-wrap my-4">
          {STANDARD_TOKENS.map((token, index) => (
            <TokenButton {...token} key={`${token.mint}-${index}`} />
          ))}
        </div>
        {/* Token List */}
        {STANDARD_TOKENS.map((token, index) => (
          <TokenLine {...token} key={`${token.mint}-${index}`} />
        ))}
      </div>
    </div>
  );
};

export default TokenPopup;
