import { AppProps } from "next/app";
import "../styles/globals.css";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Head from "next/head";

// Import SidebarProvider
import { SidebarProvider } from '@/context/sidebarContext';

const App = ({ Component, pageProps }: AppProps) => {
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Head>
        <link rel="icon" href="/Icon.png" />
        <title>Money Laundry » Admin</title>
      </Head>
      <SidebarProvider> {/* Wrap the app with SidebarProvider */}
        <ReactQueryDevtools />
        <Component {...pageProps} />
      </SidebarProvider>
    </QueryClientProvider>
  );
};

export default App;
