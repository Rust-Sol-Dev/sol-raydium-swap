import Image from "next/image";
import { FC, useEffect, useState } from "react";
import {
  CloseIcon,
  DownArrowIcon,
  SendIcon,
  ShareIcon,
  SpinIcon,
  TransferIcon,
} from "./svgIcons";
import { useSearchParams } from "next/navigation";
import { STANDARD_TOKENS } from "@/constants";
import { getMetadata } from "@/utils/util";
import { TokenMetadata } from "@/utils/types";
import { useTokenList } from "@/context/TokenListProvider";
import { useConfirmModal } from "@/context/ConfirmModalProvider";
import BgButton from "./BgButton";
import Link from "next/link";

const TransferForm: FC = () => {
  const { openModal: openTokenModal } = useTokenList();
  const { openModal: openConfirmModal, closeModal: closeConfirmModal } =
    useConfirmModal();
  const [isTokenGetting, setIsTokenGetting] = useState(false);
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState(17);

  const [selected, setSelected] = useState<TokenMetadata>(STANDARD_TOKENS[0]);

  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const getTokenData = async (token: string) => {
    try {
      setIsTokenGetting(true);
      const data = await getMetadata(token);
      if (data) {
        setSelected(data);
      }
    } catch (error) {
      console.log(error);
    }
    setIsTokenGetting(false);
  };

  const handleTransfer = async () => {
    openConfirmModal(<ConfirmContent />);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  useEffect(() => {
    if (token) {
      getTokenData(token);
    }
  }, [token]);

  const ConfirmContent: FC = () => {
    const [step, setStep] = useState("pending");
    return (
      <div className="w-[360px] bg-gray-950 rounded-xl py-4 border-2 border-primary-100/20 relative z-50">
        {step === "pending" && (
          <div>
            <div className="text-primary-100 text-center text-xl font-medium px-6 border-b pb-3 border-b-primary-100/30 mx-4 mb-3">
              Confirm Transfer
              <button
                className="w-6 h-6 rounded-lg bg-white/10 grid place-content-center hover:opacity-80 duration-200 group absolute right-3 top-4"
                onClick={closeConfirmModal}
              >
                <CloseIcon
                  className="w-4 h-4 group-hover:rotate-90 duration-200"
                  fill="#ffffff80"
                />
              </button>
            </div>
            <div className="w-14 h-14 mx-auto bg-gray-700 grid place-content-center rounded-full mt-5">
              <SendIcon className="w-6 h-6" fill="#f2dbab" />
            </div>
            <div className="flex items-end justify-center p-4 pb-10 text-primary-100 text-4xl font-medium">
              15.55{" "}
              <span className="uppercase text-xl font-medium ml-1">Beet</span>
            </div>
            <div className="flex items-center justify-between text-white px-5 bg-white/5 mx-4 text-sm py-4 border-b border-b-white/20 rounded-t-xl">
              <div className="opacity-60">To:</div>
              <div className="font-medium">A8rg...ESMeu</div>
            </div>
            <div className="flex items-center justify-between text-white px-5 bg-white/5 mx-4 text-sm py-4  rounded-b-xl">
              <div className="opacity-60">Fee:</div>
              <div className="font-medium">0.04 USD</div>
            </div>
            <div className="grid gap-3 grid-cols-2 px-4 items-center mt-12">
              <button
                className="rounded-lg bg-gradient-to-b from-white/30 to-white/50 h-10 text-white uppercase font-bold border-2 border-black/30 text-xs hover:opacity-80 duration-200"
                onClick={closeConfirmModal}
              >
                cancel
              </button>
              <button
                className="rounded-lg bg-gradient-to-b from-pink-700 to-pink-900 h-10 text-white uppercase border-2 border-primary-100/80 font-bold text-xs hover:opacity-80 duration-200"
                onClick={() => {
                  setStep("confirmed");
                }}
              >
                send
              </button>
            </div>
          </div>
        )}

        {step === "confirmed" && (
          <>
            <div className="w-14 h-14 mx-auto bg-gray-700 grid place-content-center rounded-full mt-5">
              <SpinIcon className="animate-spin w-8 h-8" fill="#f2dbab" />
            </div>
            <div className="flex items-end justify-center p-4 pb-2 text-primary-100 text-2xl font-medium">
              Sending...
            </div>
            <p className="text-white/60 px-4 text-center">
              15.55 BEETs to A8rg...ESMeu
            </p>
            <Link href={`#`}>
              <div className="text-center text-primary-50 font-bold capitalize mt-2 hover:underline">
                view transaction
              </div>
            </Link>
            <div className="w-full px-4 mt-20 pt-20">
              <button
                className="rounded-lg w-full bg-gradient-to-b from-white/30 to-white/50 h-10 text-white uppercase font-bold border-2 border-black/30 text-xs hover:opacity-80 duration-200"
                onClick={closeConfirmModal}
              >
                cancel
              </button>
            </div>
          </>
        )}
      </div>
    );
  };

  // useEffect(() => {
  //   const handleEscape = (event: KeyboardEvent) => {
  //     if (event.key === "Escape" || event.key === "Esc") {
  //       closeConfirmModal();
  //     }
  //   };

  //   document.addEventListener("keydown", handleEscape);

  //   return () => {
  //     document.removeEventListener("keydown", handleEscape);
  //   };
  // }, [closeConfirmModal]);

  return (
    <>
      <div className="w-full sm:w-[480px] mx-auto relative z-30">
        <h2 className="text-lg text-primary-100 font-bold">Token Transfer</h2>
        <div className="mt-2 p-4 bg-black/40 rounded-xl backdrop-blur-sm">
          <h3 className="text-sm md:text-md text-white">Recipient Wallet</h3>
          <div className="bg-black/60 p-2 sm:p-3 rounded-lg flex mt-2 h-14 items-center">
            <input
              className="w-full outline-none h-full bg-transparent placeholder:text-white/50 text-primary-100 text-sm"
              placeholder="Enter or paste the recipient wallet address."
            />
          </div>
          <h3 className="text-sm md:text-md text-white mt-2">
            Select Token and amount
          </h3>
          <div className="bg-black/60 p-2 sm:p-3 rounded-lg flex mt-2">
            {isTokenGetting ? (
              <div className="animate-pulse bg-white/20 h-[38px] w-[106px] rounded-lg" />
            ) : (
              <button
                className="px-1.5 py-1 rounded-lg flex items-center gap-1 border bg-white/10 text-sm md:text-md  hover:bg-white/15 text-white border-white/15 uppercase duration-200 w-1/2 sm:w-1/4 justify-between max-w-[110px]"
                onClick={openTokenModal}
              >
                <div className="w-7 h-7 rounded-full overflow-hidden">
                  <Image
                    loading={"lazy"}
                    src={selected.image}
                    unoptimized
                    width={28}
                    height={28}
                    alt=""
                  />
                </div>
                <span className="">{selected.symbol}</span>
                <DownArrowIcon className="w-4 h-4" fill="#ffffff80" />
              </button>
            )}

            <div className="w-1/2 sm:w-3/4">
              <input
                className="w-full text-right outline-none text-xl h-full bg-transparent placeholder:text-white/50 text-white"
                placeholder="0.00"
              />
            </div>
          </div>
          <BgButton
            loading={loading}
            handleClick={handleTransfer}
            icon={<TransferIcon fill="white" className="w-5 h-5" />}
            title="Transfer"
          />
        </div>
      </div>
    </>
  );
};

export default TransferForm;
