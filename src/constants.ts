import { TokenMetadata } from "./utils/types";

export const SOLANA_RPC = process.env.NEXT_PUBLIC_SOLANA_RPC ?? "";
export const SOL_PRICE_API =
  "https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd";

export const USDC_MINT = "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v";
export const SOL_USDC_PAIR = "58oQChx4yWmvKdwLLZzBi4ChoCc2fqCUWBkwMihLYQo2";

export const STANDARD_TOKENS: TokenMetadata[] = [
  {
    mint: "So11111111111111111111111111111111111111112",
    image:
      "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png",
    name: "Wrapped SOL",
    symbol: "SOL",
    price: {
      pricePerToken: 159.42,
      currency: "USDC",
    },
    tokenProgram: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
    mutable: true,
    decimals: 9,
  },
  {
    mint: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
    image:
      "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png",
    name: "USD Coin",
    symbol: "USDC",
    price: {
      pricePerToken: 1,
      currency: "USDC",
    },
    tokenProgram: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
    mutable: true,
    decimals: 6,
  },
];
