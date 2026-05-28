# Cashta — Live Testnet Test (Sepolia)

This adds a **real** wallet-to-wallet test-USDT transfer on the Sepolia testnet,
so you and a friend can do a live transaction with **zero real money and zero legal risk**.

It lives at the route **`/testnet`** (e.g. `your-app.vercel.app/testnet`), separate
from the demo so the prototype is untouched.

> What this proves: real Privy login, real embedded wallets, real on-chain ERC-20
> transfer you can see on Etherscan.
> What it does NOT prove: true escrow (funds aren't held by a neutral contract here —
> that's the next build). This is "the plumbing works," not "the trust model works."

---

## 1. Install the new dependencies

```bash
npm install
```

(Adds `@privy-io/react-auth` and `viem`.)

## 2. Create a free Privy app

1. Go to **dashboard.privy.io** → sign up → New App.
2. Copy your **App ID**.
3. In Privy dashboard → Login methods: enable **Email** (and Google if you want).
4. In Privy dashboard → Chains/Networks: make sure **Sepolia** is enabled.

## 3. Get a test USDT token address (both of you must use the SAME token)

There's no official "USDT" on Sepolia, so pick one shared test token:

- **Easiest:** use a public faucet ERC-20. Search "Sepolia USDT faucet" / Aave Sepolia
  faucet, claim test USDT, and copy that **token contract address**.
- **Or** deploy your own simple ERC-20 test token and mint to both wallets.

Confirm the token's **decimals** (most test USDT = 6). If yours is 18, change
`TOKEN_DECIMALS` in `lib/testnet.js`.

## 4. Add environment variables

Create `.env.local` in the project root:

```
NEXT_PUBLIC_PRIVY_APP_ID=your-privy-app-id-here
NEXT_PUBLIC_TEST_USDT=0xYourTestUsdtTokenAddress
```

On Vercel: add these same two variables under Project → Settings → Environment Variables,
then redeploy.

## 5. Get Sepolia ETH for gas (both wallets)

Every transfer needs a little Sepolia ETH for gas:
- Log in once at `/testnet` to create your wallet, copy your address.
- Use a **Sepolia faucet** (e.g. sepoliafaucet.com, Alchemy faucet, Google Cloud faucet)
  to send test ETH to that address. Do this for both you and your friend.
- Also send some **test USDT** to whichever wallet will be sending.

## 6. Run the live test

1. Deploy (or `npm run dev`).
2. You open `/testnet` on your phone, friend opens it on theirs.
3. Both log in with email → each gets a Sepolia wallet.
4. Friend copies their address and sends it to you.
5. You paste it as recipient, enter an amount, hit **Send test USDT**.
6. You'll get a **Sepolia Etherscan** link — open it, watch it confirm.
7. Friend's wallet balance goes up. Real on-chain transfer, fake money. ✅

---

## Troubleshooting

- **"Privy not configured"** → `NEXT_PUBLIC_PRIVY_APP_ID` missing or not redeployed.
- **"set NEXT_PUBLIC_TEST_USDT"** → token address env var missing.
- **Transfer fails / insufficient funds** → sender needs Sepolia ETH for gas AND
  enough test USDT.
- **Wrong amount received** → token decimals mismatch; set `TOKEN_DECIMALS` correctly.

## What's next (when you want real escrow)

Replace the direct transfer with a Solidity escrow contract on Sepolia: funds lock in
the contract, release only on dual confirmation (the QR handshake). That's the version
that actually demonstrates Cashta's security model — say the word and we build it.
