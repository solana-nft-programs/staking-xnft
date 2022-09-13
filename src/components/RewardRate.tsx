import { View } from 'react-xnft'
import { useRewardDistributorData } from '../hooks/useRewardDistributorData'
import { useRewardMintInfo } from '../hooks/useRewardMintInfo'
import { useRewardsRate } from '../hooks/useRewardsRate'
import { formatAmountAsDecimal } from '../common/units'

export function RewardRate() {
  const rewardDistributorData = useRewardDistributorData()
  const rewardsRate = useRewardsRate()
  const rewardMintInfo = useRewardMintInfo()
  if (
    !rewardsRate.data ||
    !rewardMintInfo.data ||
    !rewardDistributorData.data
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
