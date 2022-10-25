import { View } from 'react-xnft'
import { useRewardDistributorData } from '../hooks/useRewardDistributorData'
import { useRewardMintInfo } from '../hooks/useRewardMintInfo'
import { useRewards } from '../hooks/useRewards'
import { formatAmountAsDecimal } from '../common/units'
import { useStakePoolMetadata } from '../providers/StakePoolMetadataProvider'
import { PercentStaked } from './PercentStaked'
import { Loading } from '../common/Loading'

export function RewardsAccumulated({ size = 30 }) {
  const rewards = useRewards()
  const rewardDistributorData = useRewardDistributorData()
  const rewardMintInfo = useRewardMintInfo()
  const { stakePoolMetadata } = useStakePoolMetadata()

  const loading = <Loading size={size} />
  if (!rewardDistributorData.isFetched) return loading
  if (!rewardDistributorData.data && stakePoolMetadata) {
    return (
      <PercentStaked
        stakePoolMetadata={stakePoolMetadata}
        style={{
          fontSize: `${size}px`,
          display: 'flex',
          lineHeight: '1.25',
          gap: '1px',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      />
    )
  }
  if (!rewardMintInfo.data?.mintInfo || !rewards.data) return loading
  return (
    <View
      style={{
        fontSize: `${size}px`,
        display: 'flex',
        lineHeight: '1.25',
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
