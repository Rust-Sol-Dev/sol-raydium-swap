import { useState, useEffect } from "react";
import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { getAssociatedTokenAddress } from "@solana/spl-token";
import { USDC_MINT } from "@/constants";
import { solConnection } from "@/utils/util";

interface Balance {
  sol: number;
  usdc: number;
}

const useBalances = (wallet: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [balance, setBalance] = useState<Balance | undefined>(undefined);

  const getBalances = async () => {
    if (!wallet) return;

    setIsLoading(true);
    try {
      const solBal =
        (await solConnection.getBalance(new PublicKey(wallet))) /
        LAMPORTS_PER_SOL;
      const ata = await getAssociatedTokenAddress(
        new PublicKey(USDC_MINT),
        new PublicKey(wallet)
      );

      let usdc = 0;
      const ataInfo = await solConnection.getAccountInfo(ata);
      if (ataInfo) usdc = (await solConnection.getTokenAccountBalance(ata)).value.uiAmount ?? 0;

      setBalance({ sol: solBal, usdc});
    } catch (error) {
      console.error("Failed to fetch balances", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getBalances();
  }, [wallet]);

  return { isLoading, balance, getBalances };
};

export default useBalances;
