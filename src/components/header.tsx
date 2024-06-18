import Link from "next/link";
import Image from "next/image";
import { CheckedIcon, CopyIcon, SolanaIcon } from "./svgIcons";
import { FC, useEffect, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import useBalances from "@/hooks/useBalances";
import ConnectButton from "./ConnectButton";
import { useWallet } from "@solana/wallet-adapter-react";
import { STANDARD_TOKENS } from "@/constants";

interface HeaderProps {
  wallet: string;
  username: string;
  authToken: string | null;
  loading: boolean;
}

const Header: FC<HeaderProps> = ({ wallet, username, authToken, loading }) => {
  const { publicKey, connected } = useWallet();

  const { isLoading, balance, getBalances } = useBalances(
    publicKey?.toBase58() || ""
  );

  useEffect(() => {
    getBalances();
  }, [publicKey, connected]);

  return (
    <header className="p-5 bg-white/5">
      <div className="container mx-auto flex items-center justify-between">
        <Link href={"/"}>
          <div className="flex items-center gap-2 text-white">
            <span className="hidden md:block text-primary-100 font-ubuntu italic font-medium text-3xl">
              DEX Demo
            </span>
          </div>
        </Link>
        <div className="flex items-center gap-2">
          {connected && (
            <div className="flex items-center gap-6">
              {isLoading ? (
                <div className="animate-pulse">
                  <div className="rounded bg-white/20 w-20 h-3" />
                  <div className="rounded bg-white/20 w-20 h-2 mt-1" />
                </div>
              ) : (
                <div className="">
                  <div className="flex items-center gap-1 text-sm text-primary-100 font-medium">
                    <SolanaIcon className="w-5 h-5" />
                    {balance?.sol.toLocaleString()}
                    {/* 1.25 */}
                  </div>
                  <div className="flex items-center gap-1 text-sm text-primary-100 font-medium mt-1">
                    <Image
                      className="w-5 h-5"
                      width={16}
                      height={16}
                      alt=""
                      src={STANDARD_TOKENS[1].image}
                    />
                    {balance?.usdc.toLocaleString()}
                    {/* 13,500.54 */}
                  </div>
                </div>
              )}
            </div>
          )}
          <ConnectButton />
        </div>
      </div>
    </header>
  );
};

export default Header;
