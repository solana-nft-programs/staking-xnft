import { createStakeEntryAndStakeMint, stake } from '@cardinal/staking'
import { ReceiptType } from '@cardinal/staking/dist/cjs/programs/stakePool'
import { BN } from '@project-serum/anchor'
import { PublicKey, Signer, Transaction } from '@solana/web3.js'
import { executeAllTransactions } from '../utils/transactions'
import { useEnvironmentCtx } from '../providers/EnvironmentProvider'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AllowedTokenData } from '../hooks/useAllowedTokenDatas'
import { useStakePoolId } from '../hooks/useStakePoolId'
import { usePublicKey } from 'react-xnft'
import { iWallet } from '../utils/wallet'

export const useHandleStake = () => {
  const walletId = usePublicKey()
  const wallet = iWallet(walletId)
  const { connection } = useEnvironmentCtx()
  const queryClient = useQueryClient()
  const stakePoolId = useStakePoolId()

  return useMutation(
    async ({
      tokenDatas,
      receiptType = ReceiptType.Original,
    }: {
      tokenDatas: ({ amount?: BN } & Pick<
        AllowedTokenData,
        'tokenAccount' | 'stakeEntry'
      >)[]
      receiptType?: ReceiptType
    }): Promise<string[]> => {
      if (!stakePoolId) throw 'Stake pool not found'
      if (tokenDatas.length <= 0) throw 'No tokens selected'
      const initTxs: { tx: Transaction; signers: Signer[] }[] = []
      for (let i = 0; i < tokenDatas.length; i++) {
        try {
          const token = tokenDatas[i]!
          if (!token.tokenAccount) throw 'Token account invalid'
          if (receiptType === ReceiptType.Receipt) {
            console.log('Creating stake entry and stake mint...')
            const [initTx, , stakeMintKeypair] =
              await createStakeEntryAndStakeMint(connection, wallet, {
                stakePoolId: stakePoolId,
                originalMintId: new PublicKey(token.tokenAccount.parsed.mint),
              })
            if (initTx.instructions.length > 0) {
              initTxs.push({
                tx: initTx,
                signers: stakeMintKeypair ? [stakeMintKeypair] : [],
              })
            }
          }
        } catch (e) {
          // notify({
          //   message: `Failed to stake token ${tokens[
          //     i
          //   ]?.stakeEntry?.pubkey.toString()}`,
          //   description: `${e}`,
          //   type: 'error',
          // })
        }
      }

      if (initTxs.length > 0) {
        try {
          await executeAllTransactions(
            connection,
            wallet,
            initTxs.map(({ tx }) => tx),
            {
              signers: initTxs.map(({ signers }) => signers),
              throwIndividualError: true,
              notificationConfig: {
                message: `Successfully staked`,
                description: 'Stake progress will now dynamically update',
              },
            }
          )
        } catch (e) {}
      }

      const txs: (Transaction | null)[] = await Promise.all(
        tokenDatas.map(async (token) => {
          try {
            if (!token.tokenAccount) throw 'Token account invalid'
            // if (
            //   token.stakeEntry &&
            //   token.stakeEntry.parsed.amount.toNumber() > 0
            // ) {
            //   throw 'Fungible tokens already staked in the pool. Staked tokens need to be unstaked and then restaked together with the new tokens.'
            // }
            // const amount = token?.amount
            //   ? new BN(
            //       token?.amount && token.tokenListData
            //         ? parseMintNaturalAmountFromDecimal(
            //             token?.amount,
            //             token.tokenListData.decimals
            //           ).toString()
            //         : 1
            //     )
            //   : undefined
            // stake
            return stake(connection, wallet, {
              stakePoolId: stakePoolId,
              receiptType:
                (!token.amount ||
                  (token.amount &&
                    token.amount.eq(new BN(1)) &&
                    receiptType === ReceiptType.Receipt)) &&
                receiptType !== ReceiptType.None
                  ? receiptType
                  : undefined,
              originalMintId: new PublicKey(token.tokenAccount.parsed.mint),
              userOriginalMintTokenAccountId: token.tokenAccount.pubkey,
              amount: token.amount,
            })
          } catch (e) {
            console.log({
              message: `Failed to unstake token ${token?.stakeEntry?.pubkey.toString()}`,
              description: `${e}`,
              type: 'error',
            })
            return null
          }
        })
      )

      try {
        await executeAllTransactions(
          connection,
          wallet,
          txs.filter((tx): tx is Transaction => tx !== null),
          {
            notificationConfig: {
              message: `Successfully staked`,
              description: 'Stake progress will now dynamically update',
            },
          }
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
