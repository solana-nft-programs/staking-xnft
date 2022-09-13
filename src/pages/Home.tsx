import { Text, useNavigation, View } from 'react-xnft'
import { StakePoolImage } from '../components/StakePoolImage'
import { stakePoolMetadatas } from '../config/config'

export function Home() {
  const nav = useNavigation()
  return (
    <View
      style={{
        padding: '0px 20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
      }}
    >
      {stakePoolMetadatas.map((stakePoolMetadata) => (
        <View
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0px 0px',
            cursor: 'pointer',
            height: '50px',
          }}
          onClick={() => nav.push('pool', { stakePoolMetadata })}
        >
          <StakePoolImage stakePoolMetadata={stakePoolMetadata} />
          <Text>{stakePoolMetadata.displayName}</Text>
        </View>
      ))}
    </View>
  )
}
