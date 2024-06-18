import { TokenMetadata } from "@/utils/types";
import Link from "next/link";
import React from "react";
import { ShareIcon } from "../svgIcons";
import Image from "next/image";
import { useTokenList } from "@/context/TokenListProvider";
import { usePathname, useRouter } from "next/navigation";

export default function TokenButton(token: TokenMetadata) {
  const { image, mint, name, symbol } = token;
  const { closeModal: closeTokenModal } = useTokenList();
  const router = useRouter();
  const pathname = usePathname();

  const onSelect = () => {
    if (pathname === "/transfer") {
      router.push(`/transfer?token=${mint}`);
    } else if(pathname==="/swap") {
      
    }
    closeTokenModal();
  };
  return (
    <div
      className={`mb-1 hover:bg-white/5 px-1.5 py-2 rounded-lg duration-200 border-l-2 border-l-transparent`}
      onClick={onSelect}
    >
      <div className="flex items-center justify-between">
        <div className="flex gap-3 items-center relative">
          <div className="w-7 h-7 rounded-full overflow-hidden">
            <Image
              loading={"lazy"}
              src={image}
              unoptimized
              width={28}
              height={28}
              alt=""
            />
          </div>
          <div className="">
            <div className="text-white/80 text-sm flex gap-2">
              {symbol}
              <Link href={`https://solscan.io/token/${mint}`} target="_blank">
                <div className="flex gap-0.5 items-center rounded leading-[1] py-0.5 px-1 bg-white/10 text-white/80 text-[10px]">
                  {`${mint.slice(0, 4)}...${mint.slice(-4)}`}
                  <ShareIcon className="w-3 h-3" fill="#ffffffbb" />
                </div>
              </Link>
            </div>
            <div className="uppercase text-white/50 text-[10px]">{name}</div>
          </div>
        </div>
        <div />
      </div>
    </div>
  );
}
