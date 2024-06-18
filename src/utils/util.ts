import { SOLANA_RPC } from "@/constants";
import { Connection } from "@solana/web3.js";
import { TokenMetadata } from "./types";
export const solConnection = new Connection(SOLANA_RPC);

export async function getMetadata(
  tokenMint: string
): Promise<TokenMetadata | null> {
  const url = SOLANA_RPC;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: "usdc",
      method: "getAsset",
      params: {
        id: tokenMint,
        displayOptions: {
          showFungible: true,
        },
      },
    }),
  });

  const data = await response.json();

  if (!data.result) {
    return null;
  } else {
    const { token_info, id, mutable, content } = data.result;
    return {
      mint: id,
      image: content.links.image,
      name: content.metadata.name,
      symbol: content.metadata.symbol,
      price: {
        pricePerToken: token_info.price_info.price_per_token,
        currency: token_info.price_info.currency,
      },
      tokenProgram: token_info.token_program,
      mutable,
      decimals: token_info.decimals,
    };
  }
}
