"use client";

import { encodeFunctionData, parseUnits } from "viem";

/*
  Sepolia test USDT transfer helper.

  IMPORTANT: There is no single canonical "USDT" on Sepolia. You and your friend
  must both use the SAME test ERC-20 token contract. Options:
    1. Use a public faucet test-USDT (e.g. Aave's faucet USDT on Sepolia), OR
    2. Deploy your own simple test token and mint to both wallets.
  Put that token address in NEXT_PUBLIC_TEST_USDT below (see SETUP-TESTNET.md).

  Most test-USDT use 6 decimals (like real USDT). Confirm your token's decimals
  and set TOKEN_DECIMALS accordingly.
*/

export const TEST_USDT_ADDRESS = process.env.NEXT_PUBLIC_TEST_USDT || "";
export const TOKEN_DECIMALS = 6; // change to 18 if your test token uses 18

const ERC20_TRANSFER_ABI = [
  {
    name: "transfer",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [
      { name: "to", type: "address" },
      { name: "amount", type: "uint256" },
    ],
    outputs: [{ name: "", type: "bool" }],
  },
];

/**
 * Build the calldata + target for an ERC-20 transfer of test USDT.
 * Pass the result to Privy's sendTransaction.
 * @param {string} toAddress recipient wallet (0x...)
 * @param {number|string} amount human amount, e.g. 99.5
 */
export function buildUsdtTransfer(toAddress, amount) {
  if (!TEST_USDT_ADDRESS) throw new Error("NEXT_PUBLIC_TEST_USDT not set");
  const data = encodeFunctionData({
    abi: ERC20_TRANSFER_ABI,
    functionName: "transfer",
    args: [toAddress, parseUnits(String(amount), TOKEN_DECIMALS)],
  });
  return { to: TEST_USDT_ADDRESS, data, value: 0n };
}

export const SEPOLIA_EXPLORER = "https://sepolia.etherscan.io/tx/";
