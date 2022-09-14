import { PublicKey, Transaction } from '@solana/web3.js'

export function iWallet(publicKey: PublicKey) {
  return {
    signTransaction: async (tx: Transaction) => {
      // @ts-ignore
      window.xnft.signTransaction(tx)
      return tx
    },
    signAllTransactions: async (txs: Transaction[]) => {
      console.log('11111111', txs)
      if (txs.length > 1) {
        throw 'Error'
      }
      // @ts-ignore
      await window.xnft.signTransaction(txs[0])
      return txs
    },
    publicKey: publicKey,
  }
}
