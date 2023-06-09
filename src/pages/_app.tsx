import "../styles/globals.css";
import type { AppProps } from "next/app";
import { trpc } from "@/utils/trpc";
import { ClerkProvider } from "@clerk/nextjs";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ClerkProvider {...pageProps}>
      <Component {...pageProps} />
    </ClerkProvider>
  );
}
export default trpc.withTRPC(MyApp);