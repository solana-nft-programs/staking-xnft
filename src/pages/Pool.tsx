import { useEffect } from 'react'
import { Tab, Text, View } from 'react-xnft'
import { StakePoolMetadata } from '../config/config'
import { useStakePoolMetadata } from '../providers/StakePoolMetadataProvider'
import { ClaimRewards } from './ClaimRewards'
import { StakeUntake } from './StakeUnstake'

export function Pool({
  stakePoolMetadata,
}: {
  stakePoolMetadata: StakePoolMetadata
}) {
  const { setStakePoolMetadata } = useStakePoolMetadata()
  useEffect(() => {
    if (stakePoolMetadata) {
      setStakePoolMetadata(stakePoolMetadata)
    }
  }, [stakePoolMetadata.name])
  return (
    <View style={{ height: '100%' }}>
      <Tab.Navigator
        style={{}}
        options={({ route }) => {
          return {
            tabBarActiveTintColor: '#401a2f',
            tabBarInactiveTintColor: '#111',
            tabBarIcon: () => {
              if (route.name === 'stake') {
                return (
                  <Tab.Icon
                    element={
                      <View>
                        <Text>Stake</Text>
                      </View>
                    }
                  />
                )
              } else {
                return (
                  <Tab.Icon
                    element={
                      <View>
                        <Text>Claim</Text>
                      </View>
                    }
                  />
                )
              }
            },
          }
        }}
      >
        <Tab.Screen
          name="claim"
          disableLabel={true}
          component={() => <ClaimRewards />}
        />
        <Tab.Screen
          name="stake"
          disableLabel={true}
          component={() => <StakeUntake />}
        />
      </Tab.Navigator>
    </View>
  )
}
