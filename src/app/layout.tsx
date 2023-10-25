import "@/styles/globals.css";

import { Inter } from "next/font/google";
import { headers } from "next/headers";

import { TRPCReactProvider } from "@/trpc/react";
import { AppProvider } from "@/store/context";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Drafter.io",
  description: "League of Legends Draft Simulator",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable} bg-gray-800 w-full h-[100vh]`}>
        <TRPCReactProvider headers={headers()}>
          <AppProvider>
          {children}
          </AppProvider>
          </TRPCReactProvider>
      </body>
    </html>
  );
}
