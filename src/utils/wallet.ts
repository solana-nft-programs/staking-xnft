import { PublicKey, Transaction } from '@solana/web3.js'

export function iWallet(publicKey: PublicKey) {
  return {
    signTransaction: async (tx: Transaction) => {
      // @ts-ignore
      window.xnft.signTransaction(tx)
      return tx
    },
    signAllTransactions: async (txs: Transaction[]) => {
      // @ts-ignore
      await window.xnft.signAllTransactions(txs)
      return txs
    },
    publicKey: publicKey,
  }
}
