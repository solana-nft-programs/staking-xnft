import { View, Text, Button, Image, Loading } from 'react-xnft'
import { AllowedTokenData } from '../hooks/useAllowedTokenDatas'
import { useHandleUnstake } from '../handlers/useHandleUnstake'

export function UnstakeToken({ tokenData }: { tokenData: AllowedTokenData }) {
  const handleUnstake = useHandleUnstake()
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
      </View>
    </View>
  )
}
