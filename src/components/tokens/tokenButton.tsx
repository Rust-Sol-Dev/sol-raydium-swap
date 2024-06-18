import { TokenMetadata } from "@/utils/types";
import React from "react";
import Image from "next/image";
import { useTokenList } from "@/context/TokenListProvider";
import { usePathname, useRouter } from "next/navigation";

export default function TokenButton(token: TokenMetadata) {
  const { image, name, symbol, mint } = token;
  const { closeModal: closeTokenModal } = useTokenList();
  const router = useRouter();
  const pathname = usePathname();

  const onSelect = () => {
    if (pathname === "/transfer") {
      router.push(`/transfer?token=${mint}`);
    }
    closeTokenModal();
  };

  return (
    <button
      className={`px-1.5 py-1 rounded-md flex items-center gap-1 border bg-white/10 text-sm cursor-pointer hover:bg-white/15 duration-200 text-white/80 border-white/20`}
      title={name}
      type="button"
      onClick={onSelect}
    >
      <div className="w-5 h-5 rounded-full overflow-hidden">
        <Image
          loading={"lazy"}
          src={image}
          unoptimized
          width={20}
          height={20}
          alt=""
        />
      </div>
      <span>{symbol}</span>
    </button>
  );
}
