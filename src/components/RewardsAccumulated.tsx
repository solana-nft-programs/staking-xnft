import { View } from 'react-xnft'
import { useRewardDistributorData } from '../hooks/useRewardDistributorData'
import { useRewardMintInfo } from '../hooks/useRewardMintInfo'
import { useRewards } from '../hooks/useRewards'
import { useRewardsRate } from '../hooks/useRewardsRate'
import { formatAmountAsDecimal } from '../common/units'

export function RewardsAccumulated() {
  const rewards = useRewards()
  const rewardDistributorData = useRewardDistributorData()
  const rewardsRate = useRewardsRate()
  const rewardMintInfo = useRewardMintInfo()
  if (
    !rewardsRate.data ||
    !rewardMintInfo.data ||
    !rewardDistributorData.data ||
    !rewards.data
  ) {
    return <View></View>
  }
  return (
    <View
      style={{
        display: 'flex',
        gap: '1px',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {formatAmountAsDecimal(
        rewardMintInfo.data.mintInfo.decimals,
        rewards.data?.claimableRewards,
        Math.min(rewardMintInfo.data.mintInfo.decimals, 6)
      )}{' '}
      {rewardMintInfo.data.tokenListData?.name ||
        rewardMintInfo.data.metaplexMintData?.data.name ||
        '???'}
    </View>
  )
}
