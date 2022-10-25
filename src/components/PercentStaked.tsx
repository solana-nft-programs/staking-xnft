import { View } from 'react-xnft'
import { StakePool } from '../hooks/useAllStakePools'
import {
  percentStaked,
  totalStaked,
  useStakePoolEntryCounts,
} from '../hooks/useStakePoolEntryCounts'

export const PercentStaked = ({
  stakePool,
  style,
}: {
  stakePool: StakePool
  style?: any
}) => {
  const stakePoolEntryCounts = useStakePoolEntryCounts()
  const { stakePoolMetadata, stakePoolData } = stakePool
  const poolId =
    stakePoolMetadata?.stakePoolAddress.toString() ??
    stakePoolData?.pubkey.toString() ??
    ''
  return (
    <View style={style}>
      {stakePoolMetadata?.maxStaked &&
      stakePoolEntryCounts.data &&
      stakePoolEntryCounts.data[poolId] ? (
        <View>
          <View>
            {(
              percentStaked(stakePoolMetadata, stakePoolEntryCounts.data) ?? 0
            ).toFixed(2)}
            %
          </View>
        </View>
      ) : (
        totalStaked(stakePoolMetadata, stakePoolEntryCounts.data ?? {})
      )}
    </View>
  )
}
