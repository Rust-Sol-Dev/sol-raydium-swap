import { VersionedTransaction } from "@solana/web3.js";
import { solConnection } from "./util";

interface Blockhash {
  blockhash: string;
  lastValidBlockHeight: number;
}

export const execute = async (
  transaction: VersionedTransaction,
  latestBlockhash: Blockhash,
  isBuy: boolean = true
) => {

  const signature = await solConnection.sendRawTransaction(
    transaction.serialize(),
    { skipPreflight: true }
  );
  const confirmation = await solConnection.confirmTransaction({
    signature,
    lastValidBlockHeight: latestBlockhash.lastValidBlockHeight,
    blockhash: latestBlockhash.blockhash,
  });

  if (confirmation.value.err) {
    console.log("Confrimtaion error");
    return "";
  } else {
    if (isBuy)
      console.log(
        `Success in buy transaction: https://solscan.io/tx/${signature}`
      );
    else
      console.log(
        `Success in Sell transaction: https://solscan.io/tx/${signature}`
      );
  }
  return signature;
};
