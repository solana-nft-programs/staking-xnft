import { View } from 'react-xnft'
import { StakePoolMetadata } from '../config/config'
import { useStakePoolEntryCounts } from '../hooks/useStakePoolEntryCounts'

export const TotalStaked = ({
  stakePoolMetadata,
  style,
}: {
  stakePoolMetadata: StakePoolMetadata
  style?: any
}) => {
  const stakePoolEntryCounts = useStakePoolEntryCounts()
  return (
    <View style={style}>
      {stakePoolEntryCounts.data &&
      stakePoolEntryCounts.data[stakePoolMetadata.stakePoolAddress.toString()]
        ? `${
            stakePoolEntryCounts.data[
              stakePoolMetadata.stakePoolAddress.toString()
            ]
          }`
        : '0'}{' '}
      Total
    </View>
  )
}
