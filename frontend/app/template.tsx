"use client";

import ServerStateProvider from "./client/context";
import Layout from "./components/Layout";
import ReactQueryWrapper from "./components/ReactQueryWrapper";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <ReactQueryWrapper>
      <ServerStateProvider>
        <Layout>{children}</Layout>
      </ServerStateProvider>
    </ReactQueryWrapper>
  );
}
