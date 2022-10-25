import { Loading, useMetadata, View } from 'react-xnft'
import { Button } from '../common/Button'
import { Text } from '../common/Text'
import { dark1 } from '../config/colors'
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
  const { isDarkMode } = useMetadata()
  return (
    <View
      style={{
        width: '100%',
        background: dark1(isDarkMode),
        position: 'absolute',
        bottom: selectedTokens.length > 0 ? '0px' : '-60px',
        padding: '10px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <View style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
        <Button
          style={{
            background: 'none',
            padding: '5px',
            width: 'auto',
            cursor: 'pointer',
          }}
          onClick={() => cancel()}
        >
          <Text>Cancel</Text>
        </Button>
        <Button
          style={{
            padding: '5px',
            background: 'none',
            width: 'auto',
            cursor: 'pointer',
          }}
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
