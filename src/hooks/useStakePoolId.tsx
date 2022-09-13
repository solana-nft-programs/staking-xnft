import { useStakePoolMetadata } from '../providers/StakePoolMetadataProvider'

export const useStakePoolId = () => {
  const { stakePoolMetadata } = useStakePoolMetadata()
  return stakePoolMetadata?.stakePoolAddress
}
