import { CSSProperties } from 'react'
import { Text, View } from 'react-xnft'
import { StakePoolMetadata } from '../config/config'

export function StakePoolImage({
  width = 50,
  style,
  stakePoolMetadata,
}: {
  width?: number
  style?: CSSProperties
  stakePoolMetadata?: StakePoolMetadata | null
}) {
  return stakePoolMetadata?.imageUrl &&
    stakePoolMetadata.imageUrl.includes('https') ? (
    <View
      style={{
        backgroundImage: `url("${stakePoolMetadata.imageUrl}")`,
        borderRadius: '6px',
        maxWidth: `${width}px`,
        width: '100%',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: '0% 50%',
        height: '100%',
        ...style,
      }}
    />
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
        {stakePoolMetadata?.displayName.slice(0, 1)}
      </Text>
    </View>
  )
}
