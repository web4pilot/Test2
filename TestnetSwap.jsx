"use client";

import React, { useState } from "react";
import { usePrivy, useWallets, useLoginWithEmail, useSendTransaction } from "@privy-io/react-auth";
import { buildUsdtTransfer, SEPOLIA_EXPLORER, TEST_USDT_ADDRESS } from "../lib/testnet";

/*
  A REAL testnet transfer panel (separate from the demo flow).
  Flow: log in with email -> embedded Sepolia wallet -> send test USDT to a
  recipient address -> see the tx on Sepolia Etherscan.

  This is the "live with my friend" test:
   - You log in on your phone, your friend on theirs.
   - One of you pastes the other's wallet address as recipient.
   - Hit send. Real test USDT moves on Sepolia. No real money, real blockchain.
*/

const G = "#0E9E68", INK = "#0A2F22", LINE = "#E7ECE6", LO = "#7C8B83";

export default function TestnetSwap() {
  const { ready, authenticated, user, logout } = usePrivy();
  const { wallets } = useWallets();
  const { sendCode, loginWithCode } = useLoginWithEmail();
  const { sendTransaction } = useSendTransaction();

  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [codeSent, setCodeSent] = useState(false);
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("10");
  const [txHash, setTxHash] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  const wallet = wallets?.find((w) => w.walletClientType === "privy") || wallets?.[0];
  const myAddress = wallet?.address || user?.wallet?.address || "";

  const card = { background: "#fff", border: `1.5px solid ${LINE}`, borderRadius: 18, padding: 18, marginBottom: 14 };
  const input = { width: "100%", padding: "13px 14px", borderRadius: 12, border: `1.5px solid ${LINE}`, fontSize: 15, outline: "none", boxSizing: "border-box" };
  const btn = (disabled) => ({ width: "100%", height: 50, borderRadius: 13, border: "none", background: disabled ? "#cfd8d2" : G, color: "#fff", fontWeight: 800, fontSize: 15, cursor: disabled ? "not-allowed" : "pointer", marginTop: 10 });

  if (!process.env.NEXT_PUBLIC_PRIVY_APP_ID) {
    return <Wrap><div style={card}><b>Privy not configured.</b><p style={{ color: LO, fontSize: 14 }}>Add NEXT_PUBLIC_PRIVY_APP_ID to .env.local — see SETUP-TESTNET.md.</p></div></Wrap>;
  }
  if (!ready) return <Wrap><p style={{ color: LO }}>Loading…</p></Wrap>;

  // --- not logged in: email OTP ---
  if (!authenticated) {
    return (
      <Wrap>
        <h2 style={{ fontSize: 22, color: INK, margin: "0 0 4px" }}>Testnet sign-in</h2>
        <p style={{ color: LO, fontSize: 14, marginTop: 0 }}>Email login creates your Sepolia wallet.</p>
        <div style={card}>
          {!codeSent ? (
            <>
              <input style={input} placeholder="you@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />
              <button style={btn(!email)} disabled={!email} onClick={async () => { setErr(""); try { await sendCode({ email }); setCodeSent(true); } catch (e) { setErr(String(e.message || e)); } }}>Send code</button>
            </>
          ) : (
            <>
              <input style={input} placeholder="6-digit code" value={code} onChange={(e) => setCode(e.target.value)} />
              <button style={btn(!code)} disabled={!code} onClick={async () => { setErr(""); try { await loginWithCode({ code }); } catch (e) { setErr(String(e.message || e)); } }}>Verify & log in</button>
            </>
          )}
          {err && <p style={{ color: "#c0593f", fontSize: 13, marginTop: 8 }}>{err}</p>}
        </div>
      </Wrap>
    );
  }

  // --- logged in: wallet + send ---
  return (
    <Wrap>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <h2 style={{ fontSize: 22, color: INK, margin: 0 }}>Your testnet wallet</h2>
        <button onClick={logout} style={{ border: `1.5px solid ${LINE}`, background: "#fff", borderRadius: 10, padding: "6px 12px", fontSize: 13, cursor: "pointer", color: LO }}>Log out</button>
      </div>

      <div style={card}>
        <div style={{ fontSize: 12, color: LO, fontWeight: 600 }}>Your address (share with your friend)</div>
        <div style={{ fontFamily: "monospace", fontSize: 13, color: INK, wordBreak: "break-all", marginTop: 6 }}>{myAddress || "creating wallet…"}</div>
        <div style={{ fontSize: 12, color: LO, marginTop: 10 }}>Network: <b style={{ color: G }}>Sepolia testnet</b> · Token: {TEST_USDT_ADDRESS ? <span style={{ fontFamily: "monospace" }}>{TEST_USDT_ADDRESS.slice(0, 10)}…</span> : <b style={{ color: "#c0593f" }}>set NEXT_PUBLIC_TEST_USDT</b>}</div>
      </div>

      <div style={card}>
        <div style={{ fontSize: 12, color: LO, fontWeight: 600, marginBottom: 6 }}>Send test USDT to</div>
        <input style={input} placeholder="0x… friend's address" value={to} onChange={(e) => setTo(e.target.value)} />
        <div style={{ height: 10 }} />
        <div style={{ fontSize: 12, color: LO, fontWeight: 600, marginBottom: 6 }}>Amount (test USDT)</div>
        <input style={input} inputMode="decimal" value={amount} onChange={(e) => setAmount(e.target.value.replace(/[^\d.]/g, ""))} />
        <button
          style={btn(busy || !to || !amount || !TEST_USDT_ADDRESS)}
          disabled={busy || !to || !amount || !TEST_USDT_ADDRESS}
          onClick={async () => {
            setErr(""); setTxHash(""); setBusy(true);
            try {
              const txReq = buildUsdtTransfer(to.trim(), amount);
              const receipt = await sendTransaction(txReq);
              setTxHash(receipt?.transactionHash || receipt?.hash || "");
            } catch (e) { setErr(String(e.message || e)); }
            setBusy(false);
          }}>
          {busy ? "Sending…" : "Send test USDT"}
        </button>
        {err && <p style={{ color: "#c0593f", fontSize: 13, marginTop: 8, wordBreak: "break-all" }}>{err}</p>}
        {txHash && (
          <div style={{ marginTop: 12, padding: 12, background: `${G}12`, borderRadius: 12 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: G }}>✓ Sent on Sepolia</div>
            <a href={SEPOLIA_EXPLORER + txHash} target="_blank" rel="noreferrer" style={{ fontSize: 12, color: INK, wordBreak: "break-all" }}>View on Etherscan ↗</a>
          </div>
        )}
      </div>

      <p style={{ fontSize: 12, color: LO, lineHeight: 1.5 }}>
        You'll need a little Sepolia ETH for gas in your wallet — grab some from a faucet (see SETUP-TESTNET.md). This is test money only; nothing here touches real funds.
      </p>
    </Wrap>
  );
}

function Wrap({ children }) {
  return <div style={{ maxWidth: 420, margin: "0 auto", padding: 20, fontFamily: "'Satoshi','Inter Tight',system-ui,sans-serif" }}>{children}</div>;
}
