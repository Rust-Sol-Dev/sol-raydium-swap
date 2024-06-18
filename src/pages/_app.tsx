import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "@/styles/globals.css";
import { ConfirmModalProvider } from "@/context/ConfirmModalProvider";
import { TokenListProvider } from "@/context/TokenListProvider";
import { SolanaWalletProvider } from "@/context/SolanaWalletProvider";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SolanaWalletProvider>
      <ConfirmModalProvider>
        <TokenListProvider>
          <Component {...pageProps} />
        </TokenListProvider>
        <ToastContainer pauseOnFocusLoss={false} theme="colored" />
      </ConfirmModalProvider>
    </SolanaWalletProvider>
  );
}
