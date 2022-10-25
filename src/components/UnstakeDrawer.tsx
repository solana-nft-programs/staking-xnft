import { Loading, useMetadata, View } from 'react-xnft'
import { Button } from '../common/Button'
import { Text } from '../common/Text'
import { dark1 } from '../config/colors'
import { useHandleClaimRewards } from '../handlers/useHandleClaimRewards'
import { useHandleUnstake } from '../handlers/useHandleUnstake'
import { AllowedTokenData } from '../hooks/useAllowedTokenDatas'

export function UnstakeDrawer({
  selectedTokens,
  cancel,
  selectAll,
}: {
  selectedTokens: AllowedTokenData[]
  cancel: () => void
  selectAll: () => void
}) {
  const handleUnstake = useHandleUnstake()
  const handleClaimRewards = useHandleClaimRewards()
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
      <View style={{ display: 'flex', gap: '5px' }}>
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
      <View
        style={{
          width: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '10px',
          overflow: 'hidden',
        }}
      >
        <Button
          style={{ width: '100%', borderRadius: '0px' }}
          onClick={() => {
            handleUnstake.mutate({ tokenDatas: selectedTokens })
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
            handleClaimRewards.mutate({ tokenDatas: selectedTokens })
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
            'Claim'
          )}
        </Button>
      </View>
    </View>
  )
}
