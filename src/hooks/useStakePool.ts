import { useStakePoolData } from './useStakePoolData'
import { useStakePoolMetadata } from '../providers/StakePoolMetadataProvider'
import { StakePool } from './useAllStakePools'

export const useStakePool = (): StakePool => {
  const stakePoolData = useStakePoolData()
  const { stakePoolMetadata } = useStakePoolMetadata()
  return {
    stakePoolData: stakePoolData.data,
    stakePoolMetadata: stakePoolMetadata ?? undefined,
  }
}
