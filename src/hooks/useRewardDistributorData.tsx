import type { AccountData } from '@cardinal/common'
import type { RewardDistributorData } from '@cardinal/staking/dist/cjs/programs/rewardDistributor'
import { getRewardDistributor } from '@cardinal/staking/dist/cjs/programs/rewardDistributor/accounts'
import { findRewardDistributorId } from '@cardinal/staking/dist/cjs/programs/rewardDistributor/pda'
import { useEnvironmentCtx } from '../providers/EnvironmentProvider'
import { useQuery } from '@tanstack/react-query'

import { useStakePoolId } from './useStakePoolId'

export const useRewardDistributorData = () => {
  const stakePoolId = useStakePoolId()
  const { connection } = useEnvironmentCtx()
  return useQuery<AccountData<RewardDistributorData> | undefined>(
    ['useRewardDistributorData', stakePoolId?.toString()],
    async () => {
      if (!stakePoolId) return
      const [rewardDistributorId] = await findRewardDistributorId(stakePoolId)
      return getRewardDistributor(connection, rewardDistributorId)
    },
    { enabled: !!stakePoolId, retry: false }
  )
}
