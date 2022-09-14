import { View, Text, Button, Image, Loading } from 'react-xnft'
import { AllowedTokenData } from '../hooks/useAllowedTokenDatas'
import { useHandleStake } from '../handlers/useHandleStake'
import { useStakePoolMetadata } from '../providers/StakePoolMetadataProvider'

export function StakeToken({ tokenData }: { tokenData: AllowedTokenData }) {
  const { stakePoolMetadata } = useStakePoolMetadata()
  const handleStake = useHandleStake()
  return (
    <View
      style={{
        padding: '5px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <Image
        src={tokenData.metadata?.parsed.image}
        style={{
          borderRadius: '6px',
          maxWidth: 'calc(100% - 10px)',
          minHeight: '150px',
          minWidth: '150px',
        }}
      />
      <View
        style={{
          marginTop: '3px',
          display: 'flex',
          flexDirection: 'column',
          gap: '5px',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text>{tokenData.metaplexData?.parsed.data.name}</Text>
        <Button
          onClick={() => {
            handleStake.mutate({
              tokenDatas: [tokenData],
              receiptType: stakePoolMetadata?.receiptType,
            })
          }}
        >
          {handleStake.isLoading ? (
            <Loading
              style={{
                height: '25px',
                width: '25px',
              }}
            />
          ) : (
            'Stake'
          )}
        </Button>
      </View>
    </View>
  )
}
