import { Button, Loading, Text, View } from 'react-xnft'
import { useHandleStake } from '../handlers/useHandleStake'
import { AllowedTokenData } from '../hooks/useAllowedTokenDatas'

export function StakeDrawer({
  selectedTokens,
  cancel,
  selectAll,
}: {
  selectedTokens: AllowedTokenData[]
  cancel: () => void
  selectAll: () => void
}) {
  const handleStake = useHandleStake()

  return (
    <View
      style={{
        width: '100%',
        background: '#111',
        position: 'absolute',
        bottom: selectedTokens.length > 0 ? '0px' : '-60px',
        padding: '10px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <View style={{ display: 'flex', gap: '10px' }}>
        <Button
          style={{ background: 'none', padding: '0px', width: 'auto' }}
          onClick={() => cancel()}
        >
          <Text>Cancel</Text>
        </Button>
        <Button
          style={{ background: 'none', padding: '0px', width: 'auto' }}
          onClick={() => selectAll()}
        >
          <Text>Select all</Text>
        </Button>
      </View>
      <Button
        onClick={() => {
          handleStake.mutate({ tokenDatas: selectedTokens })
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
  )
}
