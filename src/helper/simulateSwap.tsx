import { PublicKey } from "@solana/web3.js";
import { NATIVE_MINT, TOKEN_PROGRAM_ID } from "@solana/spl-token";
import {
  Liquidity,
  Token,
  Percent,
  LiquidityPoolKeys,
  jsonInfo2PoolKeys,
  CurrencyAmount,
  SOL,
  Currency,
} from "@raydium-io/raydium-sdk";

import { solConnection } from "@/utils/util";
import { WalletContextState } from "@solana/wallet-adapter-react";
import { SOL_USDC_PAIR, STANDARD_TOKENS, USDC_MINT } from "@/constants";
import { formatAmmKeysById } from "@/utils/swapOnlyAmm";

const simulateSwap = async (
  wallet: WalletContextState,
  inputToken: string,
  inputAmount: number,
  updateReceive: (amountOut: string) => void
) => {
  if (!wallet?.publicKey) return;

  // for SOL-USDC pair
  const solCurrency = new Token(
    TOKEN_PROGRAM_ID,
    new PublicKey(STANDARD_TOKENS[0].mint),
    STANDARD_TOKENS[0].decimals
  );
  const usdcCurrency = new Token(
    TOKEN_PROGRAM_ID,
    new PublicKey(STANDARD_TOKENS[1].mint),
    STANDARD_TOKENS[1].decimals
  );

  let reverse = true;
  if (inputToken === NATIVE_MINT.toString()) {
    reverse = false;
  }

  try {
    console.log("Simulating output amount..");
    const poolInfos = await formatAmmKeysById(solConnection, SOL_USDC_PAIR);
    const poolKeys = jsonInfo2PoolKeys(poolInfos) as LiquidityPoolKeys;
    if (poolKeys == null) {
      console.error("Failed to fetch pool info");
      return;
    }

    const poolInfo = await Liquidity.fetchInfo({
      connection: solConnection,
      poolKeys,
    });

    if (reverse) {
      // default slippage
      const slippage = new Percent(1, 100);

      const amountIn = Math.floor(inputAmount * 10 ** usdcCurrency.decimals);
      console.log("amountOut", amountIn);
      const currencyOut = new CurrencyAmount(
        new Currency(
          usdcCurrency.decimals,
          usdcCurrency.symbol,
          usdcCurrency.name
        ),
        amountIn
      );

      const { minAmountOut } = Liquidity.computeAmountOut({
        poolKeys: poolKeys,
        poolInfo: poolInfo,
        amountIn: currencyOut,
        currencyOut: solCurrency,
        slippage: slippage,
      });

      const outputAmount =
        parseFloat(minAmountOut.raw) * 50 / 10 ** solCurrency.decimals;
      console.log("minAmountOut", outputAmount);

      updateReceive(outputAmount.toFixed(5));
    } else {
      // default slippage
      const slippage = new Percent(1, 100);

      const amountIn = Math.floor(inputAmount * 10 ** solCurrency.decimals);
      console.log("amountIn", amountIn);
      const currencyIn = new CurrencyAmount(SOL, amountIn);

      const { minAmountOut } = Liquidity.computeAmountOut({
        poolKeys: poolKeys,
        poolInfo: poolInfo,
        amountIn: currencyIn,
        currencyOut: usdcCurrency,
        slippage: slippage,
      });

      const outputAmount =
        parseFloat(minAmountOut.raw) / 10 ** usdcCurrency.decimals;
      console.log("minAmountOut", outputAmount);

      updateReceive(outputAmount.toFixed(5));
    }
  } catch (error) {
    console.error("Failed to simulate swap", error);
  }
};

export default simulateSwap;
