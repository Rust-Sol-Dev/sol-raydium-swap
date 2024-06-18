import { FC, ReactNode, useEffect, useState } from "react";
import Header from "../header";
import PageTabs from "../pageTabs";
import Image from "next/image";

interface LayoutProps {
  children?: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      const storedToken = localStorage.getItem("authToken");
      if (storedToken) {
        setAuthToken(storedToken);
        setIsLoading(false);
      } else {
        const code = new URLSearchParams(window.location.search).get("code");
        if (!code) {
          setIsLoading(false);
        }
      }
    };

    initializeAuth();
  }, []);

  const [userID, setUserID] = useState<string>("");
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [activeTab, setActiveTab] = useState<string>("transfer");

  return (
    <main className="min-h-screen bg-black/90">
      <Header
        loading={isFetching}
        username={userID}
        authToken={authToken}
        wallet={walletAddress}
      />
      <PageTabs />
      <div className="py-10 md:py-20 min-h-[calc(100vh-156px)] relative">
        {children}
      </div>
    </main>
  );
};

export default Layout;
