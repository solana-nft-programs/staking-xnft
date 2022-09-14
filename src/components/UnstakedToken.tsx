import { View, Text, Button, Image, Loading, useNavigation } from 'react-xnft'
import { AllowedTokenData } from '../hooks/useAllowedTokenDatas'
import { useHandleStake } from '../handlers/useHandleStake'
import { useStakePoolMetadata } from '../providers/StakePoolMetadataProvider'

export function UnstakedToken({
  tokenData,
  isSelected,
  select,
}: {
  tokenData: AllowedTokenData
  isSelected: boolean
  select: (tokenData: AllowedTokenData) => void
}) {
  const { stakePoolMetadata } = useStakePoolMetadata()
  const handleStake = useHandleStake()
  const nav = useNavigation()
  return (
    <View
      style={{
        padding: '5px',
        borderRadius: '6px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        border: `1px solid ${isSelected ? '#4e9cdc' : 'transparent'}`,
      }}
    >
      <Button
        style={{
          borderRadius: '6px 6px 0px 0px',
          width: '100%',
          height: 'auto',
          maxWidth: '100%',
          minHeight: '150px',
          minWidth: '150px',
          position: 'relative',
          padding: '0px',
        }}
        onClick={() => select(tokenData)}
      >
        <Text
          style={{
            background: 'rgba(0, 0, 0, 0.7)',
            borderRadius: '6px',
            padding: '4px 6px',
            position: 'absolute',
            top: '3px',
            left: '3px',
            textAlign: 'left',
            maxWidth: '90%',
            overflow: 'hidden',
            fontSize: '12px',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {tokenData.metadata?.parsed.name ||
            tokenData.metaplexData?.parsed.data.name}
        </Text>
        <Image
          src={tokenData.metadata?.parsed.image}
          style={{
            borderRadius: '6px 6px 0px 0px',
            width: '100%',
          }}
        />
      </Button>

      <View
        style={{
          width: '100%',
          display: 'inline-flex',
          borderRadius: '0px 0px 6px 6px',
          overflow: 'hidden',
        }}
      >
        <Button
          style={{
            borderRadius: '0px',
            fontSize: '12px',
            padding: '4px 6px',
            width: '100%',
            height: 'auto',
            background: isSelected ? '#4e9cdc' : 'rgb(39 39 42)',
          }}
          onClick={() => select(tokenData)}
        >
          {isSelected ? 'Deselect' : 'Select'}
        </Button>
        <View
          style={{
            background: 'rgba(255,255,255,.3)',
            height: '100%',
            width: '2px',
          }}
        />
        <Button
          style={{
            borderRadius: '0px',
            fontSize: '12px',
            padding: '4px 6px',
            width: '100%',
            height: 'auto',
          }}
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
                height: '20px',
                width: '20px',
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
