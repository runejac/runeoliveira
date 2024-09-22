import type { AppProps } from "next/app";
import PrimaryLayout from "../components/layouts/primary/PrimaryLayout";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "../styles/globals.scss";
import Script from "next/script";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <PrimaryLayout>
      <Script
        src={"https://umami-seven-sigma.vercel.app/script.js"}
        data-website-id={process.env.NEXT_PUBLIC_DATA_WEBSITE_ID}
        strategy="afterInteractive"
      />
      <Component {...pageProps} />
      <SpeedInsights />
    </PrimaryLayout>
  );
}
