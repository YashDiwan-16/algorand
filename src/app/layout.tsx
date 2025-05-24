'use client';

import { Inter } from "next/font/google";
import "./globals.css";
import { WalletProvider } from "@/providers/WalletContext";
import { SnackbarProvider } from "notistack";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>Consent Manager on Algorand</title>
        <meta name="description" content="A blockchain-powered consent management system built on Algorand" />
      </head>
      <body className={inter.className}>
        <SnackbarProvider maxSnack={3} autoHideDuration={5000}>
          <WalletProvider>
            {children}
          </WalletProvider>
        </SnackbarProvider>
      </body>
    </html>
  );
}
