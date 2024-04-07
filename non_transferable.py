from solana.rpc.async_api import AsyncClient
from solana.rpc.types import TxOpts
from spl.token.constants import TOKEN_PROGRAM_ID
from solders import system_program as sp
from solana.transaction import Transaction
from solders.keypair import Keypair
from spl.token.instructions import (
    initialize_mint,
    mint_to,
    create_associated_token_account,
    transfer,
    burn,
    close_account, MintToParams, InitializeMintParams,
)
import config
import asyncio

# keypair for Mint Account and Payer
SECRET_KEY_BYTES = bytes(config.SECRET_KEY)
SENDER_KEYPAIR = Keypair.from_bytes(SECRET_KEY_BYTES)
keypair = Keypair.from_base58_string(str(SENDER_KEYPAIR))

mint = keypair
payer = keypair


async def cl():
    async with AsyncClient(config.RPC_URL) as client:
        con_one = await client.is_connected()
        if con_one is True:
            print("connection is establish")
            return client


async def main():
    # Connection to devnet cluster
    client = AsyncClient(config.RPC_URL)
    # payer = Keypair()  # Load or generate your payer Keypair

    # Example of an awaited call
    balance = await client.get_balance(payer.pubkey())
    print("balance_sol", balance.value / 1e9)  # Convert lamports to SOL

    # Decimals for Mint Account
    dec = 2
    create, init = create_initial_mint(mint, dec)
    print(create)
    print(init)
    await transact(create, init)

    # Ensure to close the client
    await client.close()


def create_initial_mint(mint, decimals):
    # Amount to airdrop (in lamports; 1 SOL = 1,000,000,000 lamports)
    lamports = 1000000000

    create_mint_account_ix = sp.create_account(
        sp.CreateAccountParams(
            from_pubkey=payer.pubkey(),
            new_account_pubkey=mint.pubkey(),
            lamports=lamports,
            space=100000000,
            program_id=TOKEN_PROGRAM_ID,
            to_pubkey=mint.pubkey(),
            owner=mint.pubkey()
        )
    )

    # Initialize Mint Account
    initialize_mint_ix = initialize_mint(
        InitializeMintParams(
            mint=mint.pubkey(),
            decimals=decimals,
            mint_authority=mint.pubkey(),
            freeze_authority=None,
            program_id=TOKEN_PROGRAM_ID,
        )
    )

    return create_mint_account_ix, initialize_mint_ix


async def transact(create_mint_ix, initiate_mint_ix):
    client = AsyncClient(config.RPC_URL)
    transaction = Transaction().add(create_mint_ix, initiate_mint_ix)
    await client.send_transaction(transaction, payer, mint, opts=TxOpts(skip_preflight=True, skip_confirmation=False))
    print("jhjh", transaction)
    print(client.send_transaction)
    # Additional SPL Token operations (mint_to, transfer, burn, close_account) follow similar patterns
    # For example, minting tokens to a specific account:
    mint_to_ix = mint_to(
        MintToParams(
            mint=mint.pubkey(),
            dest=payer.pubkey(),  # The public key of the destination account
            amount=100,
            mint_authority=mint.pubkey(),
            program_id=TOKEN_PROGRAM_ID,
        )
    )
    print(mint_to_ix)
    transaction = Transaction().add(mint_to_ix)
    await client.send_transaction(transaction, payer, opts=TxOpts(skip_preflight=True, skip_confirmation=False))


# Run the main function
if __name__ == "__main__":
    asyncio.run(main())

