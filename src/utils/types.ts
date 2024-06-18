export interface TokenMetadata {
  mint: string;
  image: string;
  name: string;
  symbol: string;
  price: {
    pricePerToken: number;
    currency: string;
  };
  tokenProgram: string;
  mutable: boolean;
  decimals: number;
}

export type TokenSelectType = {
  type?: "pay" | "receive" | "transfer";
};
