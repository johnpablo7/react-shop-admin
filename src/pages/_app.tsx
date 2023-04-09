import { AppProps } from "next/app";
import MainLayout from "@/layout/MainLayout";

import "@/styles/index.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </>
  );
}
