import { View, Text, Loading } from 'react-xnft'
import {
  StakeEntryTokenData,
  useStakedTokenDatas,
} from '../hooks/useStakedTokenDatas'
import {
  AllowedTokenData,
  useAllowedTokenDatas,
} from '../hooks/useAllowedTokenDatas'
import { UnstakedToken } from '../components/UnstakedToken'
import { StakedToken } from '../components/StakedToken'
import { useEffect, useMemo, useState } from 'react'
import { StakeDrawer } from '../components/StakeDrawer'
import { UnstakeDrawer } from '../components/UnstakeDrawer'

export function tokenId(tokenData: AllowedTokenData | StakeEntryTokenData) {
  return tokenData.metaplexData?.parsed.mint.toString() ?? ''
}

export function StakeUntake() {
  const [selectedStakedTokens, setSelectedStakedTokens] = useState<
    StakeEntryTokenData[]
  >([])
  const [selectedUnstakedTokens, setSelectedUnstakedTokens] = useState<
    AllowedTokenData[]
  >([])
  const allowedTokens = useAllowedTokenDatas(true)
  const stakedTokenDatas = useStakedTokenDatas()

  useMemo(() => {
    setSelectedUnstakedTokens([])
  }, [allowedTokens.data?.map((t) => tokenId(t)).join(',')])

  useMemo(() => {
    setSelectedStakedTokens([])
  }, [stakedTokenDatas.data?.map((t) => tokenId(t)).join(',')])

  return (
    <View style={{ height: '100%' }}>
      <View
        style={{
          padding: '5px 10px',
          width: '100%',
          height: '100%',
        }}
      >
        {!allowedTokens.isFetched || !stakedTokenDatas.isFetched ? (
          <View
            style={{
              display: 'grid',
              width: '100%',
              gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
              marginTop: '8px',
              justifyContent: 'space-between',
            }}
          >
            <View
              style={{
                padding: '5px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
              }}
            >
              <View
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '100%',
                  maxWidth: 'calc(100% - 10px)',
                  borderRadius: '6px',
                  minHeight: '150px',
                  minWidth: '150px',
                  background: '#111',
                }}
              >
                <Loading />
              </View>
            </View>
            <View
              style={{
                padding: '5px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
              }}
            >
              <View
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '100%',
                  maxWidth: 'calc(100% - 10px)',
                  borderRadius: '6px',
                  minHeight: '150px',
                  minWidth: '150px',
                  background: '#111',
                }}
              >
                <Loading />
              </View>
            </View>
            <View
              style={{
                padding: '5px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
              }}
            >
              <View
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '100%',
                  maxWidth: 'calc(100% - 10px)',
                  borderRadius: '6px',
                  minHeight: '150px',
                  minWidth: '150px',
                  background: '#111',
                }}
              >
                <Loading />
              </View>
            </View>
            <View
              style={{
                padding: '5px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
              }}
            >
              <View
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '100%',
                  maxWidth: 'calc(100% - 10px)',
                  borderRadius: '6px',
                  minHeight: '150px',
                  minWidth: '150px',
                  background: '#111',
                }}
              >
                <Loading />
              </View>
            </View>
          </View>
        ) : allowedTokens.data?.length === 0 &&
          stakedTokenDatas.data?.length === 0 ? (
          <View style={{ textAlign: 'center', margin: '20px', opacity: '.5' }}>
            <Text>No tokens found</Text>
          </View>
        ) : (
          <View
            style={{
              display: 'grid',
              width: '100%',
              gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
              marginTop: '8px',
              justifyContent: 'space-between',
            }}
          >
            {allowedTokens.data?.map((tokenData) => (
              <UnstakedToken
                tokenData={tokenData}
                isSelected={selectedUnstakedTokens.some(
                  (s) => tokenId(s) === tokenId(tokenData)
                )}
                select={(tokenData) => {
                  setSelectedStakedTokens([])
                  setSelectedUnstakedTokens((selected) =>
                    selected.some((t) => tokenId(t) === tokenId(tokenData))
                      ? selected.filter(
                          (t) => tokenId(t) !== tokenId(tokenData)
                        )
                      : [...selected, tokenData]
                  )
                }}
              />
            ))}
            {stakedTokenDatas.data?.map((tokenData) => (
              <StakedToken
                tokenData={tokenData}
                isSelected={selectedStakedTokens.some(
                  (s) => tokenId(s) === tokenId(tokenData)
                )}
                select={(tokenData) => {
                  setSelectedUnstakedTokens([])
                  setSelectedStakedTokens((selected) =>
                    selected.some((t) => tokenId(t) === tokenId(tokenData))
                      ? selected.filter(
                          (t) => tokenId(t) !== tokenId(tokenData)
                        )
                      : [...selected, tokenData]
                  )
                }}
              />
            ))}
          </View>
        )}
      </View>
      <StakeDrawer
        selectedTokens={selectedUnstakedTokens}
        cancel={() => setSelectedUnstakedTokens([])}
        selectAll={() => setSelectedUnstakedTokens(allowedTokens.data ?? [])}
      />
      <UnstakeDrawer
        selectedTokens={selectedStakedTokens}
        cancel={() => setSelectedStakedTokens([])}
        selectAll={() => setSelectedStakedTokens(stakedTokenDatas.data ?? [])}
      />
    </View>
  )
}
