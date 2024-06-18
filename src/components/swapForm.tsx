import Image from "next/image";
import { FC, useCallback, useState } from "react";
import { DownArrowIcon, SpinIcon, SwapIcon, TransferIcon } from "./svgIcons";
// import { useSearchParams } from "next/navigation";
import { STANDARD_TOKENS } from "@/constants";
// import { getMetadata } from "@/utils/util";
import { TokenMetadata } from "@/utils/types";
import { useTokenList } from "@/context/TokenListProvider";
import simulateSwap from "@/helper/simulateSwap";
import { useWallet } from "@solana/wallet-adapter-react";
import useBalances from "@/hooks/useBalances";
import swap from "@/helper/swap";
import { toast } from "react-toastify";

const SwapForm: FC = () => {
  const { openModal: openTokenModal } = useTokenList();
  const [isTokenGetting, setIsTokenGetting] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pay, setPay] = useState<TokenMetadata>(STANDARD_TOKENS[0]);
  const [receive, setReceive] = useState<TokenMetadata>(STANDARD_TOKENS[1]);
  const [qouteAmount, setQouteAmount] = useState("0.00");
  const [baseAmount, setBaseAmount] = useState("0.00");

  const wallet = useWallet();
  const { balance } = useBalances(
    wallet?.publicKey ? wallet.publicKey.toBase58() : ""
  );

  // const searchParams = useSearchParams();
  // const payToken = searchParams.get("pay-token");
  // const receiveToken = searchParams.get("receive-token");

  // const getTokenData = async (token: string) => {
  //   try {
  //     setIsTokenGetting(true);
  //     const data = await getMetadata(token);
  //     if (data) {
  //       setPay(data);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  //   setIsTokenGetting(false);
  // };

  const handleSwap = useCallback(async () => {
    const amount = parseFloat(qouteAmount);

    if (pay.mint === STANDARD_TOKENS[0].mint) {
      if (amount > (balance?.sol || 0)) {
        toast.error("Insufficient SOL balance");
        return;
      }
    } else {
      if (amount > (balance?.usdc || 0)) {
        toast.error("Insufficient USDC balance");
        return;
      }
    }

    setLoading(true);

    swap(
      wallet,
      pay.mint,
      amount,
      (result: string) => {
        console.log("==> swap completed", result);
        toast.success(`Swap completed: ${result}`);
        setLoading(false);
      },
      (error: string) => {
        console.log("==> swap failed");
        toast.error(`Swap failed: ${error}`);
        setLoading(false);
      }
    );
  }, [pay, receive, qouteAmount, baseAmount, balance]);

  const handleSwitch = () => {
    setReceive(pay);
    setPay(receive);
    setQouteAmount(baseAmount);
    setBaseAmount(qouteAmount);
  };

  const handleBaseChanged = (e: any) => {
    const value = e.target.value;
    // Regular expression to allow floats with optional decimal places
    const floatRegex = /^\d*\.?\d*$/;

    if (floatRegex.test(value) || value === "") {
      setBaseAmount(value);
    } else {
      e.preventDefault();
    }
  };

  const handleQouteChanged = (e: any) => {
    const value = e.target.value;
    // Regular expression to allow floats with optional decimal places
    const floatRegex = /^\d*\.?\d*$/;

    if (floatRegex.test(value) || value === "") {
      setQouteAmount(value);
      if (value !== "")
        simulateSwap(wallet, pay.mint, parseFloat(value), (amountOut) =>
          setBaseAmount(amountOut)
        );
    } else {
      e.preventDefault();
    }
  };

  // useEffect(() => {
  //   if (payToken) {
  //     getTokenData(payToken);
  //   }
  // }, [payToken, receiveToken]);

  return (
    <div className="w-full sm:w-[480px] mx-auto relative z-30">
      <h2 className="text-lg text-primary-100 font-bold">Swap tokens</h2>
      <div className="mt-2 p-4 bg-black/40 rounded-xl backdrop-blur-sm">
        <h3 className="text-sm md:text-md text-white">
          Select Token and amount
        </h3>
        <div className="bg-black/30 p-2 sm:p-3 rounded-lg flex mt-2">
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
                  src={pay.image}
                  unoptimized
                  width={28}
                  height={28}
                  alt=""
                />
              </div>
              <span className="">{pay.symbol}</span>
              <DownArrowIcon className="w-4 h-4" fill="#ffffff80" />
            </button>
          )}

          <div className="w-1/2 sm:w-3/4">
            <input
              className="w-full text-right outline-none text-xl h-full bg-transparent placeholder:text-white/50 text-white"
              type="number"
              placeholder="0.00"
              value={qouteAmount}
              onChange={handleQouteChanged}
            />
          </div>
        </div>
        <div className="h-12 relative">
          <div className="absolute border-b w-full top-6 left-0 border-b-white/10" />
          <button
            className="w-7 h-7 rounded-full border-2 border-primary-100 p-0.5 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-btn grid place-content-center duration-200 hover:opacity-80 active:opacity-60"
            onClick={handleSwitch}
          >
            <SwapIcon className="rotate-90 h-4 w-4" fill="white" />
          </button>
        </div>
        <div className="bg-black/30 p-2 sm:p-3 rounded-lg flex">
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
                  src={receive.image}
                  unoptimized
                  width={28}
                  height={28}
                  alt=""
                />
              </div>
              <span className="">{receive.symbol}</span>
              <DownArrowIcon className="w-4 h-4" fill="#ffffff80" />
            </button>
          )}

          <div className="w-1/2 sm:w-3/4">
            <input
              className="w-full text-right outline-none text-xl h-full bg-transparent placeholder:text-white/50 text-white"
              type="number"
              placeholder="0.00"
              disabled={true}
              value={baseAmount}
              onChange={handleBaseChanged}
            />
          </div>
        </div>
        <button
          className="rounded-lg h-14 text-center grid place-content-center relative w-full mt-4 group uppercase text-sm md:text-md font-bold text-white disabled:opacity-80 disabled:pointer-events-none"
          disabled={loading}
          onClick={handleSwap}
        >
          {loading ? (
            <div className="relative z-10 flex items-center justify-center gap-2">
              <SpinIcon
                className="w-6 h-6 relative z-30 animate-spin"
                fill="white"
              />
              Swaping...
            </div>
          ) : (
            <div className="relative w-full h-full z-[3] flex items-center justify-center gap-2 duration-200">
              <SwapIcon fill="white" className="w-5 h-5" />
              Swap
            </div>
          )}
          <div className="absolute w-[calc(100%-8px)] h-[calc(100%-8px)] z-[2] bg-gradient-btn m-1 rounded-[9px] group-hover:opacity-80 duration-300" />
          <div className="absolute w-full h-full z-[1] bg-gradient-border rounded-xl" />
        </button>
      </div>
    </div>
  );
};

export default SwapForm;
