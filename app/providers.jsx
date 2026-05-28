"use client";

import { PrivyProvider } from "@privy-io/react-auth";
import { sepolia } from "viem/chains";

/*
  Wraps the app in Privy, configured for Sepolia testnet only.
  - Email login -> embedded wallet auto-created
  - No mainnet: defaultChain + supportedChains are Sepolia, so test funds only
  Set NEXT_PUBLIC_PRIVY_APP_ID in your .env.local (see SETUP-TESTNET.md)
*/
export default function Providers({ children }) {
  const appId = process.env.NEXT_PUBLIC_PRIVY_APP_ID;

  // if no app id yet, render children without Privy so the prototype still works
  if (!appId) return children;

  return (
    <PrivyProvider
      appId={appId}
      config={{
        loginMethods: ["email", "google"],
        embeddedWallets: { createOnLogin: "users-without-wallets" },
        defaultChain: sepolia,
        supportedChains: [sepolia],
        appearance: { theme: "light", accentColor: "#0E9E68" },
      }}
    >
      {children}
    </PrivyProvider>
  );
}
