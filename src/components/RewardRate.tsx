import { View } from 'react-xnft'
import { useRewardDistributorData } from '../hooks/useRewardDistributorData'
import { useRewardMintInfo } from '../hooks/useRewardMintInfo'
import { useRewardsRate } from '../hooks/useRewardsRate'
import { formatAmountAsDecimal } from '../common/units'

export function RewardRate({ size = 18 }) {
  const rewardDistributorData = useRewardDistributorData()
  const rewardsRate = useRewardsRate()
  const rewardMintInfo = useRewardMintInfo()
  const loading = (
    <View
      style={{
        margin: `0px auto`,
        borderRadius: '6px',
        height: `${size * 1.15}px`,
        width: `${size * 4}px`,
        backgroundColor: 'rgba(255,255,255,.1)',
      }}
    />
  )
  if (!rewardDistributorData.isFetched) return loading
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
