import Providers from "./providers";

export const metadata = {
  title: "Cashta — Trusted Value Movement",
  description: "Swap physical cash and stablecoins through verified local merchants. Escrow-protected, reputation-scored.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, minHeight: "100vh", WebkitFontSmoothing: "antialiased" }}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
