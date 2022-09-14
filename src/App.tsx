import ReactXnft, { Stack } from 'react-xnft'
import { StakedDetail } from './components/StakedDetail'
import { Home } from './pages/Home'
import { Pool } from './pages/Pool'

//
// On connection to the host environment, warm the cache.
//
ReactXnft.events.on('connect', () => {
  // no-op
})

export function App() {
  return (
    <Stack.Navigator
      style={{}}
      initialRoute={{ name: 'home' }}
      options={({ route }) => {
        switch (route.name) {
          case 'home':
            return {
              title: 'Select Pool',
            }
          case 'pool':
            return {
              title: route.props.stakePoolMetadata.displayName,
            }
          case 'stake-detail':
            return {
              title:
                route.props.tokenData.metadata?.parsed.name ||
                route.props.tokenData.metaplexData?.parsed.data.name,
            }
          default:
            throw new Error(`Unknown route: ${route.name}`)
        }
      }}
    >
      <Stack.Screen
        name={'home'}
        component={(props: any) => <Home {...props} />}
      />
      <Stack.Screen
        name={'pool'}
        component={(props: any) => <Pool {...props} />}
      />
      <Stack.Screen
        name={'stake-detail'}
        component={(props: any) => <StakedDetail {...props} />}
      />
    </Stack.Navigator>
  )
}
