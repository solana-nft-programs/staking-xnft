import { View } from 'react-xnft'
import { useRewardDistributorData } from '../hooks/useRewardDistributorData'
import { useRewardMintInfo } from '../hooks/useRewardMintInfo'
import { useRewardsRate } from '../hooks/useRewardsRate'
import { formatAmountAsDecimal } from '../common/units'
import { useStakePoolMetadata } from '../providers/StakePoolMetadataProvider'
import { TotalStaked } from './TotalStaked'
import { Loading } from '../common/Loading'

export function RewardRate({ size = 18 }) {
  const rewardDistributorData = useRewardDistributorData()
  const rewardsRate = useRewardsRate()
  const rewardMintInfo = useRewardMintInfo()
  const { stakePoolMetadata } = useStakePoolMetadata()
  const loading = <Loading size={size} />
  if (!rewardDistributorData.isFetched) return loading
  if (!rewardDistributorData.data && stakePoolMetadata) {
    return (
      <TotalStaked
        stakePoolMetadata={stakePoolMetadata}
        style={{
          display: 'flex',
          gap: '1px',
          lineHeight: '1.25',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      />
    )
  }
  if (!rewardMintInfo.data || !rewardsRate.data) return loading
  return (
    <View
      style={{
        display: 'flex',
        gap: '1px',
        lineHeight: '1.25',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {formatAmountAsDecimal(
        rewardMintInfo.data.mintInfo.decimals,
        rewardsRate.data.dailyRewards,
        // max of 5 decimals
        Math.min(rewardMintInfo.data.mintInfo.decimals, 5)
      )}{' '}
      {rewardMintInfo.data.tokenListData?.symbol ||
        rewardMintInfo.data.metaplexMintData?.data.symbol ||
        '???'}{' '}
      / Day
    </View>
  )
}
