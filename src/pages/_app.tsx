import { AppProps } from "next/app";
import { ProviderAuth } from "@/hooks/useAuth";
import MainLayout from "@/layout/MainLayout";
import "@/styles/index.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ProviderAuth>
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      </ProviderAuth>
    </>
  );
}
