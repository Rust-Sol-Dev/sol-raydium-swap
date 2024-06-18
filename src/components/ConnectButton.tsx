"use client";

import { FC } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { WalletIcon, CloseIcon, DownArrowIcon } from "./svgIcons";

const ConnectButton: FC = () => {
  const { setVisible } = useWalletModal();
  const { publicKey, disconnect } = useWallet();

  return (
    <button className="rounded-lg border shadow-btn-inner font-bold py-2 px-2 w-[140px] lg:w-[160px] group relative">
      {publicKey ? (
        <>
          <div className="flex items-center justify-center text-sm text-white">
            {publicKey.toBase58().slice(0, 4)}....
            {publicKey.toBase58().slice(-4)}
          </div>
          <div className="w-[160px] absolute right-0 top-9 hidden group-hover:block shadow-md">
            <ul className="border border-gray-500 rounded-lg bg-white p-2 mt-1">
              <li>
                <div
                  className="flex gap-2 items-center mb-1 text-sm hover:text-blue-400"
                  onClick={() => setVisible(true)}
                >
                  <WalletIcon className="brightness-200" /> Change Wallet
                </div>
              </li>
              <li>
                <div
                  className="flex gap-2 items-center text-sm hover:text-blue-400 cursor-pointer"
                  onClick={disconnect}
                >
                  <CloseIcon className="brightness-200" /> Disconnect
                </div>
              </li>
            </ul>
          </div>
        </>
      ) : (
        <div
          className="flex items-center justify-center gap-1 text-sm hover:text-yellow-400 text-white"
          onClick={() => setVisible(true)}
        >
          Connect wallet <DownArrowIcon fill="white" />
        </div>
      )}
    </button>
  );
};

export default ConnectButton;
