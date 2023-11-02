import "@/styles/globals.css";
import { headers } from "next/headers";
import { TRPCReactProvider } from "@/trpc/react";
import { AppProvider } from "@/store/context";
import { ClerkProvider } from "@clerk/nextjs";
import { GeistMono, GeistSans } from "geist/font";

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
      <body
        className={`font-sans ${GeistSans.variable} ${GeistMono.variable} h-[100vh] w-full bg-gray-800`}
      >
        <TRPCReactProvider headers={headers()}>
          <ClerkProvider>
            <AppProvider>{children}</AppProvider>
          </ClerkProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
