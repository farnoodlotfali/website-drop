import AppState from "@/Context/AppState";
import "@/styles/globals.css";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Head from "next/head";
import NextNProgress from "nextjs-progressbar";
import React from "react";
import "swiper/css";
import Toast from "@/Components/Toast";

export default function App({ Component, pageProps }) {
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            //5 minutes
            staleTime: 5 * 60 * 1000,
            refetchOnWindowFocus: false,
            keepPreviousData: true,
            retry: 1,
            retryDelay: 1.5 * 1000,
          },
        },
      })
  );
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <AppState>
          <Head>
            <meta
              name="viewport"
              content="initial-scale=1, width=device-width"
            />
            <title> دراپ </title>
          </Head>
          <NextNProgress
            height={8}
            color={"#202c43"}
            showOnShallow={true}
            startPosition={0.3}
          />
          {Component.PageLayout ? (
            <Component.PageLayout>
              <Component {...pageProps} />
            </Component.PageLayout>
          ) : (
            <Component {...pageProps} />
          )}
          <Toast />
        </AppState>
      </Hydrate>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
