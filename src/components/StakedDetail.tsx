import { View, Image, Loading } from 'react-xnft'
import { Button } from '../common/Button'
import { Text } from '../common/Text'
import { useHandleClaimRewards } from '../handlers/useHandleClaimRewards'
import { useHandleUnstake } from '../handlers/useHandleUnstake'
import { StakeEntryTokenData } from '../hooks/useStakedTokenDatas'
import { StakedStats } from './StakedStats'

export function StakedDetail({
  tokenData,
}: {
  tokenData: StakeEntryTokenData
}) {
  const handleUnstake = useHandleUnstake()
  const handleClaimRewards = useHandleClaimRewards()
  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        padding: '5px 25px',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <Image
        src={tokenData.metadata?.parsed.image}
        style={{
          borderRadius: '10px',
          width: '100%',
          height: 'auto',
        }}
      />
      <View
        style={{
          marginTop: '10px',
          display: 'flex',
          flexDirection: 'column',
          gap: '15px',
          width: '100%',
        }}
      >
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '5px',
          }}
        >
          <Text
            style={{
              textAlign: 'left',
              overflow: 'hidden',
              fontSize: '18px',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {tokenData.metadata?.parsed.name ||
              tokenData.metaplexData?.parsed.data.name}
          </Text>
          <Text
            style={{
              textAlign: 'left',
              overflow: 'hidden',
              fontSize: '12px',
              opacity: '.5',
            }}
          >
            {tokenData.metadata?.parsed.description}
          </Text>
        </View>
        <StakedStats tokenData={tokenData} />
        <View
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '8px',
            overflow: 'hidden',
          }}
        >
          <Button
            style={{ width: '100%', borderRadius: '0px' }}
            onClick={() => {
              handleUnstake.mutate({ tokenDatas: [tokenData] })
            }}
          >
            {handleUnstake.isLoading ? (
              <Loading
                style={{
                  height: '25px',
                  width: '25px',
                }}
              />
            ) : (
              'Unstake'
            )}
          </Button>
          <View
            style={{
              background: 'rgba(255,255,255,.3)',
              height: '100%',
              width: '2px',
            }}
          />
          <Button
            style={{ width: '100%', borderRadius: '0px' }}
            onClick={() => {
              handleClaimRewards.mutate({ tokenDatas: [tokenData] })
            }}
          >
            {handleClaimRewards.isLoading ? (
              <Loading
                style={{
                  height: '25px',
                  width: '25px',
                }}
              />
            ) : (
              'Claim Rewards'
            )}
          </Button>
        </View>
      </View>
    </View>
  )
}
