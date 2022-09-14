import { unstake } from '@cardinal/staking'
import { BN } from '@project-serum/anchor'
import { Transaction } from '@solana/web3.js'
import { executeAllTransactions } from '../utils/transactions'
import { useEnvironmentCtx } from '../providers/EnvironmentProvider'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AllowedTokenData } from '../hooks/useAllowedTokenDatas'
import { useStakePoolId } from '../hooks/useStakePoolId'
import { usePublicKey } from 'react-xnft'
import { withFindOrInitAssociatedTokenAccount } from '@cardinal/common'
import { useStakePoolData } from '../hooks/useStakePoolData'
import { useRewardDistributorData } from '../hooks/useRewardDistributorData'
import { iWallet } from '../utils/wallet'

export const useHandleUnstake = () => {
  const walletId = usePublicKey()
  const wallet = iWallet(walletId)
  const { connection } = useEnvironmentCtx()
  const queryClient = useQueryClient()
  const { data: stakePool } = useStakePoolData()
  const rewardDistributorData = useRewardDistributorData()
  const stakePoolId = useStakePoolId()

  return useMutation(
    async ({
      tokenDatas,
    }: {
      tokenDatas: ({ amount?: BN } & Pick<
        AllowedTokenData,
        'tokenAccount' | 'stakeEntry'
      >)[]
    }): Promise<string[]> => {
      if (!stakePoolId) throw 'Stake pool not found'
      if (!stakePool) throw 'Stake pool not found'

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

      let coolDown = false
      const txs: Transaction[] = (
        await Promise.all(
          tokenDatas.map(async (token, i) => {
            try {
              if (!token || !token.stakeEntry) {
                throw new Error('No stake entry for token')
              }
              if (
                stakePool.parsed.cooldownSeconds &&
                !token.stakeEntry?.parsed.cooldownStartSeconds &&
                !stakePool.parsed.minStakeSeconds
              ) {
                // notify({
                //   message: `Cooldown period will be initiated for ${token.metaplexData?.data.data.name} unless minimum stake period unsatisfied`,
                //   type: 'info',
                // })
                coolDown = true
              }
              const transaction = new Transaction()
              if (i === 0 && ataTx.instructions.length > 0) {
                transaction.instructions = ataTx.instructions
              }
              const unstakeTx = await unstake(connection, wallet, {
                stakePoolId: stakePoolId,
                originalMintId: token.stakeEntry.parsed.originalMint,
              })
              transaction.instructions = [
                ...transaction.instructions,
                ...unstakeTx.instructions,
              ]
              return transaction
            } catch (e) {
              // notify({
              //   message: `${e}`,
              //   description: `Failed to unstake token ${token?.stakeEntry?.pubkey.toString()}`,
              //   type: 'error',
              // })
              return null
            }
          })
        )
      ).filter((x): x is Transaction => x !== null)

      try {
        const [firstTx, ...remainingTxs] = txs
        await executeAllTransactions(
          connection,
          wallet,
          ataTx.instructions.length > 0 ? remainingTxs : txs,
          {
            notificationConfig: {
              message: `Successfully ${
                coolDown ? 'initiated cooldown' : 'unstaked'
              }`,
              description: 'These tokens are now available in your wallet',
            },
          },
          ataTx.instructions.length > 0 ? firstTx : undefined
        )
      } catch (e) {}
      return []
    },
    {
      onSuccess: () => {
        queryClient.resetQueries()
      },
    }
  )
}
