"use client";

import ServerStateProvider from "./client/context";
import Layout from "./components/Layout";
import ReactQueryWrapper from "./components/ReactQueryWrapper";
import { CookiesProvider } from "react-cookie";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <ReactQueryWrapper>
      <ServerStateProvider>
        <CookiesProvider>
          <Layout>{children}</Layout>
        </CookiesProvider>
      </ServerStateProvider>
    </ReactQueryWrapper>
  );
}
