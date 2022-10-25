import { getBatchedMultipleAccounts } from '@cardinal/common'
import { findStatsEntryId } from '@cardinal/stats/dist/cjs/programs/cardinalStats/pda'
import { useEnvironmentCtx } from '../providers/EnvironmentProvider'
import { useQuery } from '@tanstack/react-query'

import { StakePoolMetadata, stakePoolMetadatas } from '../config/config'
import { BorshAccountsCoder } from '@project-serum/anchor'
import {
  StatsEntryData,
  STATS_IDL,
} from '@cardinal/stats/dist/cjs/programs/cardinalStats'

export const statName = (poolId: string) => {
  return `sp-${poolId.slice(-3)}`
}

export const percentStaked = (
  stakePoolMetadata: StakePoolMetadata | undefined,
  stakePoolEntryCounts: {
    [poolId: string]: number
  },
  minimum = 0
) => {
  return stakePoolMetadata?.maxStaked && stakePoolMetadata?.maxStaked > minimum
    ? ((stakePoolEntryCounts[stakePoolMetadata?.stakePoolAddress.toString()] ??
        0) *
        100) /
        stakePoolMetadata?.maxStaked
    : undefined
}

export const totalStaked = (
  stakePoolMetadata: StakePoolMetadata | undefined,
  stakePoolEntryCounts: {
    [poolId: string]: number
  }
) => {
  return (
    stakePoolEntryCounts[
      stakePoolMetadata?.stakePoolAddress.toString() ?? ''
    ] ?? 0
  )
}

export const useStakePoolEntryCounts = () => {
  const { connection } = useEnvironmentCtx()
  const stakePoolIds = stakePoolMetadatas.map((m) => m.stakePoolAddress)
  return useQuery<{ [poolId: string]: number }>(
    ['useStakePoolEntryCounts', stakePoolIds.map((i) => i?.toString())],
    async () => {
      const statNames = stakePoolIds.map((i) => statName(i.toString()))
      const accountIds = await Promise.all(
        statNames.map(async (s) => (await findStatsEntryId(s))[0])
      )
      const statEntries = await getBatchedMultipleAccounts(
        connection,
        accountIds
      )
      const poolIdToStatValue = statEntries.reduce((acc, accountInfo, i) => {
        const stakePoolId = stakePoolIds[i]!
        try {
          const type = 'statsEntry'
          const coder = new BorshAccountsCoder(STATS_IDL)
          const parsed = coder.decode(
            type,
            accountInfo?.data as Buffer
          ) as StatsEntryData
          acc[stakePoolId.toString()] = parseInt(parsed.value)
        } catch (e) {}
        return acc
      }, {} as { [poolId: string]: number })

      return poolIdToStatValue
    }
  )
}
