import ReactXnft, { AnchorDom } from "react-xnft";
import { App } from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { EnvironmentProvider } from "./providers/EnvironmentProvider";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

ReactXnft.render(
  <AnchorDom>
    <EnvironmentProvider defaultCluster="mainnet-beta">
      <QueryClientProvider client={queryClient}>
        <>
          <App />
          <ReactQueryDevtools initialIsOpen={false} />
        </>
      </QueryClientProvider>
    </EnvironmentProvider>
  </AnchorDom>
);
