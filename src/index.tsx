import ReactXnft, { AnchorDom } from "react-xnft";
import { App } from "./App";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

ReactXnft.render(
  <AnchorDom>
    <QueryClientProvider client={queryClient}>
      <>
        <App />
        <ReactQueryDevtools initialIsOpen={false} />
      </>
    </QueryClientProvider>
  </AnchorDom>
);
