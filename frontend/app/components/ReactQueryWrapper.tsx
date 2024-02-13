"use client";

import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "react-query";

interface IReactQueryWrapperProps {
  children: React.ReactNode;
}

const ReactQueryWrapper: React.FC<IReactQueryWrapperProps> = (props) => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      {props.children}
      <Toaster />
    </QueryClientProvider>
  );
};

export default ReactQueryWrapper;
