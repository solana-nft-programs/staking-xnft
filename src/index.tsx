import ReactXnft, { AnchorDom } from 'react-xnft'
import { App } from './App'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { EnvironmentProvider } from './providers/EnvironmentProvider'
import { UTCNowProvider } from './providers/UTCNowProvider'
import { StakePoolMetadataProvider } from './providers/StakePoolMetadataProvider'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})

ReactXnft.render(
  <AnchorDom>
    <EnvironmentProvider defaultCluster="mainnet-beta">
      <UTCNowProvider>
        <QueryClientProvider client={queryClient}>
          <StakePoolMetadataProvider>
            <>
              <App />
              <ReactQueryDevtools initialIsOpen={false} />
            </>
          </StakePoolMetadataProvider>
        </QueryClientProvider>
      </UTCNowProvider>
    </EnvironmentProvider>
  </AnchorDom>
)
