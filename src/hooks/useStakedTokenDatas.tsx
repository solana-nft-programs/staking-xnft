import { getBatchedMultipleAccounts, AccountData } from '@cardinal/common'
import type { StakeEntryData } from '@cardinal/staking/dist/cjs/programs/stakePool'
import { getStakeEntriesForUser } from '@cardinal/staking/dist/cjs/programs/stakePool/accounts'
import * as metaplex from '@metaplex-foundation/mpl-token-metadata'
import type { Connection, PublicKey } from '@solana/web3.js'
import { useEnvironmentCtx } from '../providers/EnvironmentProvider'
import { useQuery } from '@tanstack/react-query'

import { useStakePoolId } from './useStakePoolId'
import { useWalletId } from './useWalletId'

export type StakeEntryTokenData = {
  metaplexData?: AccountData<metaplex.MetadataData>
  metadata: AccountData<any> | null
  stakeEntry: AccountData<StakeEntryData> | null | undefined
}

export async function getStakeEntryDatas(
  connection: Connection,
  stakePoolId: PublicKey,
  userId: PublicKey
): Promise<StakeEntryTokenData[]> {
  const stakeEntries = (
    await getStakeEntriesForUser(connection, userId)
  ).filter((entry) => entry.parsed.pool.toString() === stakePoolId.toString())

  const metaplexIds = await Promise.all(
    stakeEntries.map(
      async (stakeEntry) =>
        (
          await metaplex.MetadataProgram.findMetadataAccount(
            stakeEntry.parsed.originalMint
          )
        )[0]
    )
  )
  const metaplexAccountInfos = await getBatchedMultipleAccounts(
    connection,
    metaplexIds
  )
  const metaplexData = metaplexAccountInfos.reduce(
    (acc, accountInfo, i) => {
      try {
        acc[stakeEntries[i]!.pubkey.toString()] = {
          pubkey: metaplexIds[i]!,
          ...accountInfo,
          parsed: metaplex.MetadataData.deserialize(
            accountInfo?.data as Buffer
          ) as metaplex.MetadataData,
        }
      } catch (e) {}
      return acc
    },
    {} as {
      [stakeEntryId: string]: {
        pubkey: PublicKey
        parsed: metaplex.MetadataData
      }
    }
  )

  const metadata = await Promise.all(
    Object.values(metaplexData).map(async (md, i) => {
      try {
        if (!md) return null
        const json = await fetch(md.parsed.data.uri).then((r) => r.json())
        return {
          pubkey: md.pubkey!,
          parsed: json,
        }
      } catch (e) {
        return null
      }
    })
  )

  return stakeEntries.map((stakeEntry) => ({
    stakeEntry,
    metaplexData: metaplexData[stakeEntry.pubkey.toString()],
    metadata:
      metadata.find((data) =>
        data
          ? data.pubkey.toBase58() ===
            metaplexData[stakeEntry.pubkey.toString()]?.pubkey.toBase58()
          : null
      ) ?? null,
  }))
}

export const useStakedTokenDatas = () => {
  const stakePoolId = useStakePoolId()
  const walletIds = [useWalletId()]
  const { connection } = useEnvironmentCtx()
  return useQuery<StakeEntryTokenData[] | undefined>(
    ['stakedTokenDatas', stakePoolId?.toString(), walletIds.join(',')],
    async () => {
      if (!stakePoolId || !walletIds || walletIds.length <= 0) return
      const stakeEntryDataGroups = await Promise.all(
        walletIds.map((walletId) =>
          getStakeEntryDatas(connection, stakePoolId, walletId)
        )
      )
      const tokenDatas = stakeEntryDataGroups.flat()
      const hydratedTokenDatas = tokenDatas.reduce((acc, tokenData) => {
        acc.push({
          ...tokenData,
        })
        return acc
      }, [] as StakeEntryTokenData[])
      return hydratedTokenDatas
    },
    { enabled: !!stakePoolId && walletIds.length > 0 }
  )
}
