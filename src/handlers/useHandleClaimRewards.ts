import { claimRewards } from '@cardinal/staking'
import { BN } from '@project-serum/anchor'
import { Transaction } from '@solana/web3.js'
import { executeAllTransactions } from '../utils/transactions'
import { useEnvironmentCtx } from '../providers/EnvironmentProvider'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AllowedTokenData } from '../hooks/useAllowedTokenDatas'
import { useConnection, usePublicKey } from 'react-xnft'
import { iWallet } from '../utils/wallet'
import { useRewardDistributorData } from '../hooks/useRewardDistributorData'
import { withFindOrInitAssociatedTokenAccount } from '@cardinal/common'
import { useStakePoolData } from '../hooks/useStakePoolData'

export const useHandleClaimRewards = () => {
  const walletId = usePublicKey()
  const wallet = iWallet(walletId)
  const conn = useConnection()
  const { connection } = useEnvironmentCtx()
  const queryClient = useQueryClient()
  const { data: stakePool } = useStakePoolData()
  const rewardDistributorData = useRewardDistributorData()

  return useMutation(
    async ({
      tokenDatas,
    }: {
      tokenDatas: ({ amount?: BN } & Pick<
        AllowedTokenData,
        'tokenAccount' | 'stakeEntry'
      >)[]
    }): Promise<void> => {
      if (!wallet) throw 'Wallet not found'
      if (!stakePool) throw 'No stake pool found'

      const ataTx = new Transaction()
      if (rewardDistributorData.data && rewardDistributorData.data.parsed) {
        // create user reward mint ata
        await withFindOrInitAssociatedTokenAccount(
          ataTx,
          connection,
          rewardDistributorData.data.parsed.rewardMint,
          wallet.publicKey!,
          wallet.publicKey!
        )
      }

      const tokensToStake = tokenDatas
      const txs: Transaction[] = (
        await Promise.all(
          tokensToStake.map(async (token, i) => {
            try {
              if (!token || !token.stakeEntry) {
                throw new Error('No stake entry for token')
              }
              const transaction = new Transaction()
              if (i === 0 && ataTx.instructions.length > 0) {
                transaction.instructions = ataTx.instructions
              }
              const claimTx = await claimRewards(connection, wallet, {
                stakePoolId: stakePool.pubkey,
                stakeEntryId: token.stakeEntry.pubkey,
                skipRewardMintTokenAccount: true,
              })
              transaction.instructions = [
                ...transaction.instructions,
                ...claimTx.instructions,
              ]
              return transaction
            } catch (e) {
              return null
            }
          })
        )
      ).filter((x): x is Transaction => x !== null)

      const [firstTx, ...remainingTxs] = txs
      await executeAllTransactions(
        connection,
        wallet,
        ataTx.instructions.length > 0 ? remainingTxs : txs,
        {
          notificationConfig: {
            message: 'Successfully claimed rewards',
            description: 'These rewards are now available in your wallet',
          },
        },
        ataTx.instructions.length > 0 ? firstTx : undefined
      )
    },
    {
      onSuccess: () => {
        queryClient.resetQueries()
      },
      onError: (e) => {
        console.log(`[staking-error] ${e}`)
      },
    }
  )
}
