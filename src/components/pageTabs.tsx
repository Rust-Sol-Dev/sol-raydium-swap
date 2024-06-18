import { FC } from "react";
import { SwapIcon, TransferIcon } from "./svgIcons";
import { usePathname } from "next/navigation";
import Link from "next/link";

const PageTabs: FC = () => {
  const pathname = usePathname();
  return (
    <div className="bg-white/10 border-b border-white/10">
      <div className="max-w-[600px] mx-auto grid grid-cols-2 -mb-[1px]">
        {/* <Link href={"/transfer"}> */}
          <div
            className={`text-white py-3 flex items-center duration-300 hover:bg-white/10 px-3 tab-${
              pathname === "/transfer" ? "active" : "inactive"
            }`}
          >
            <div className="flex gap-2">
              <div className="bg-gradient-btn md:w-10 md:h-10 w-8 h-8 rounded-lg grid place-content-center border border-primary-100">
                <TransferIcon className="w-5 h-5" fill="#ffffff" />
              </div>
              <div className="">
                <p className="text-sm md:text-md text-primary-100 font-bold">Transfer</p>
                <p className="text-[10px] sm:text-xs opacity-70">Tranfer Tokens</p>
              </div>
            </div>
          </div>
        {/* </Link> */}
        <Link href={"/swap"}>
          <div
            className={`text-white py-3 flex items-center duration-300 hover:bg-white/10 px-3 tab-${
              pathname === "/swap" ? "active" : "inactive"
            }`}
          >
            <div className="flex gap-2">
              <div className="bg-gradient-btn md:w-10 md:h-10 w-8 h-8 rounded-lg grid place-content-center border border-primary-100">
                <SwapIcon className="w-5 h-5" fill="#ffffff" />
              </div>
              <div className="">
                <p className="text-sm md:text-md text-primary-100 font-bold">Swap</p>
                <p className="text-[10px] sm:text-xs opacity-70">Swap Tokens</p>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default PageTabs;
