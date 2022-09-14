import { View, Text, Button, Image, Loading } from 'react-xnft'
import { useStakedTokenDatas } from '../hooks/useStakedTokenDatas'
import { useAllowedTokenDatas } from '../hooks/useAllowedTokenDatas'
import { StakeToken } from '../components/StakeToken'
import { UnstakeToken } from '../components/UnstakeToken'

export function StakeUntake() {
  const allowedTokens = useAllowedTokenDatas(true)
  const stakedTokenDatas = useStakedTokenDatas()
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
              <StakeToken tokenData={tokenData} />
            ))}
            {stakedTokenDatas.data?.map((tokenData) => (
              <UnstakeToken tokenData={tokenData} />
            ))}
          </View>
        )}
      </View>
    </View>
  )
}
