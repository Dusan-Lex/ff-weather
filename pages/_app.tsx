import "../styles/flagicon/css/flag-icons.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import BaseStyles from "../styles/BaseStyles";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Simple Weather App</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
      </Head>
      <BaseStyles />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
