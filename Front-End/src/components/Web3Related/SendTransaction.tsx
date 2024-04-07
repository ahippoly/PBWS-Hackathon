import { Button } from '@mui/material'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import type { TransactionSignature } from '@solana/web3.js'
import { PublicKey, Transaction, TransactionInstruction } from '@solana/web3.js'
import type { FC } from 'react'
import { useCallback, useState } from 'react'
import { useNotify } from '@/components/General/notify'
import { LoadingButton } from '@mui/lab'
import idl from './idl.json'

export const SendTransaction: FC = () => {
  const { connection } = useConnection()
  const { publicKey, sendTransaction } = useWallet()
  const [loadingTransact, setLoadingTransact] = useState(false)
  const notify = useNotify()

  const onClick = useCallback(async () => {
    let signature: TransactionSignature | undefined

    const PrivateKye = JSON.parse(import.meta.env.VITE_PRIVATE_KEY)
    console.log('🚀 ~ onClick ~ private_key:', PrivateKye)

    try {
      setLoadingTransact(true)
      if (!publicKey) throw new Error('Wallet not connected!')

      const {
        context: { slot: minContextSlot },
        value: { blockhash, lastValidBlockHeight },
      } = await connection.getLatestBlockhashAndContext()

      const transaction = new Transaction({
        feePayer: publicKey,
        recentBlockhash: blockhash,
      }).add(
        new TransactionInstruction({
          data: Buffer.from('Hello, from the Solana Wallet Adapter example app!'),
          keys: [],
          programId: new PublicKey('MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr'),
        }),
      )

      signature = await sendTransaction(transaction, connection, { minContextSlot })
      notify('info', 'Transaction sent:', signature)

      await connection.confirmTransaction({ blockhash, lastValidBlockHeight, signature })
      notify('success', 'Transaction successful!', signature)
      //   notify('success', 'Transaction successful!', 'ApTt1TTWLkcW8fGEWAa98SHcEnYPMRXut4WTUuYZhoDTau7Yp1Ck8RAbuehxG6wQHWmLFRksxra64S8NkTQC3AN')
      setLoadingTransact(false)
    } catch (error: any) {
      setLoadingTransact(false)
      notify('error', `Transaction failed! ${error?.message}`, signature)
    }
  }, [publicKey, connection, sendTransaction, notify])

  return (
    <LoadingButton
      variant='contained' onClick={onClick} disabled={!publicKey}
      loading={loadingTransact}
    >
      Mint all
    </LoadingButton>

  )
}
