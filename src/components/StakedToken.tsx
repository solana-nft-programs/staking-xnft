import { View, Text, Button, Image, useNavigation } from 'react-xnft'
import { AllowedTokenData } from '../hooks/useAllowedTokenDatas'

export function StakedToken({ tokenData }: { tokenData: AllowedTokenData }) {
  const nav = useNavigation()
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
      <Button
        style={{
          borderRadius: '6px',
          width: '100%',
          height: 'auto',
          maxWidth: '100%',
          minHeight: '150px',
          minWidth: '150px',
          position: 'relative',
          padding: '0px',
        }}
        onClick={() => nav.push('stake-detail', { tokenData })}
      >
        <View
          style={{
            position: 'absolute',
            bottom: '3px',
            right: '3px',
            background: 'rgba(0, 0, 0, 0.7)',
            borderRadius: '6px',
            padding: '4px 6px',
          }}
        >
          Staked
        </View>
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
          }}
        >
          Select
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
          onClick={() => nav.push('stake-detail', { tokenData })}
        >
          Details
        </Button>
      </View>
    </View>
  )
}
