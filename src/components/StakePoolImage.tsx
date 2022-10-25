import { CSSProperties } from 'react'
import { Text, useMetadata, View } from 'react-xnft'
import { dark4 } from '../config/colors'
import { StakePool, stakePoolDisplayName } from '../hooks/useAllStakePools'

export function StakePoolImage({
  width = 50,
  style,
  stakePool,
}: {
  width?: number
  style?: CSSProperties
  stakePool: StakePool
}) {
  const { stakePoolMetadata } = stakePool
  const { isDarkMode } = useMetadata()
  return stakePoolMetadata?.imageUrl &&
    stakePoolMetadata.imageUrl.includes('https') ? (
    <View
      style={{
        backgroundColor:
          ((stakePoolMetadata.darkBg && isDarkMode) ||
            (stakePoolMetadata.lightBg && !isDarkMode)) &&
          dark4(isDarkMode),
        padding: stakePoolMetadata.logoPadding && '5px',
        borderRadius: '6px',
        maxWidth: `${width}px`,
        width: '100%',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: '0% 50%',
        height: '100%',
        overflow: 'hidden',
        ...style,
      }}
    >
      <View
        style={{
          backgroundImage: `url("${stakePoolMetadata.imageUrl}")`,
          width: '100%',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: '0% 50%',
          height: '100%',
        }}
      />
    </View>
  ) : (
    <View
      style={{
        width: `${width}px`,
        height: `${width}px`,
        background: 'rgba(0,0,0,0.5)',
        borderRadius: '6px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        ...style,
      }}
    >
      <Text
        style={{
          fontSize: `${0.5 * width}px`,
        }}
      >
        {stakePoolDisplayName(stakePool).slice(0, 1)}
      </Text>
    </View>
  )
}
