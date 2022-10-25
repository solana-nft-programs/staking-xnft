import { useState } from 'react'
import { TextField, useMetadata, useNavigation, View } from 'react-xnft'
import { PercentStaked } from '../components/PercentStaked'
import { StakePoolImage } from '../components/StakePoolImage'
import { Text } from '../common/Text'
import { stakePoolMetadatas } from '../config/config'
import {
  percentStaked,
  totalStaked,
  useStakePoolEntryCounts,
} from '../hooks/useStakePoolEntryCounts'
import { StakePool, stakePoolDisplayName } from '../hooks/useAllStakePools'

export function Home() {
  const nav = useNavigation()
  const stakePoolEntryCounts = useStakePoolEntryCounts()
  const theme = useMetadata()
  const [searchTerm, setSearchTerm] = useState<string>()
  const stakePools: StakePool[] = stakePoolMetadatas.map((s) => ({
    stakePoolMetadata: s,
  }))
  return (
    <View>
      <TextField
        placeholder="Search"
        onChange={(e: any) => setSearchTerm(e.target.value)}
        value={searchTerm}
        style={{
          display: 'flex',
          width: '100%',
          padding: '0px 12px 12px 12px',
        }}
      />
      {!stakePoolEntryCounts.isFetched ? (
        <View
          style={{
            padding: '0px 12px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}
        >
          {new Array(12).fill(
            <View
              style={{
                display: 'flex',
                width: '100%',
                borderRadius: '6px',
                minHeight: '50px',
                background: theme.isDarkMode ? '#222' : '#CCC',
              }}
            ></View>
          )}
        </View>
      ) : (
        <View
          style={{
            padding: '0px 12px',
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
          }}
        >
          {stakePools
            .sort((a, b) => {
              const pctAMin = percentStaked(
                a.stakePoolMetadata,
                stakePoolEntryCounts.data ?? {},
                100
              )
              const pctA = percentStaked(
                a.stakePoolMetadata,
                stakePoolEntryCounts.data ?? {}
              )
              const pctBMin = percentStaked(
                b.stakePoolMetadata,
                stakePoolEntryCounts.data ?? {},
                100
              )
              const pctB = percentStaked(
                b.stakePoolMetadata,
                stakePoolEntryCounts.data ?? {}
              )
              const totalA = totalStaked(
                a.stakePoolMetadata,
                stakePoolEntryCounts.data ?? {}
              )
              const totalB = totalStaked(
                b.stakePoolMetadata,
                stakePoolEntryCounts.data ?? {}
              )
              return pctAMin && pctBMin
                ? pctBMin - pctAMin
                : pctAMin
                ? -1
                : pctBMin
                ? 1
                : pctA
                ? -1
                : pctB
                ? 1
                : totalB - totalA
            })
            .filter((s) =>
              searchTerm && searchTerm.length > 0
                ? s.stakePoolMetadata?.name.startsWith(searchTerm) ||
                  s.stakePoolMetadata?.stakePoolAddress
                    .toString()
                    .startsWith(searchTerm) ||
                  s.stakePoolData?.pubkey.toString().startsWith(searchTerm)
                : true
            )
            .map((stakePool, i) => (
              <View
                key={
                  stakePool.stakePoolMetadata?.name ??
                  stakePool.stakePoolData?.pubkey.toString()
                }
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '0px 0px',
                  gap: '10px',
                  cursor: 'pointer',
                  height: '50px',
                }}
                onClick={() =>
                  nav.push('pool', {
                    stakePoolMetadata: stakePool.stakePoolMetadata,
                  })
                }
              >
                {/* <Text>{i + 1}</Text> */}
                <View
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    textAlign: 'left',
                    flexGrow: '1',
                    gap: '20px',
                    height: '50px',
                  }}
                >
                  <StakePoolImage stakePool={stakePool} />
                  <Text>{stakePoolDisplayName(stakePool)}</Text>
                </View>
                {!stakePoolEntryCounts.isFetched ? (
                  <View></View>
                ) : (
                  <Text style={{ opacity: 0.5 }}>
                    <PercentStaked stakePool={stakePool} />
                  </Text>
                )}
              </View>
            ))}
        </View>
      )}
    </View>
  )
}
