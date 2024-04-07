from fastapi import FastAPI, HTTPException
from solders.pubkey import Pubkey
from solders import system_program as sp
from solana.transaction import Transaction
from solders.keypair import Keypair

import config  # Import the config module
import json
from spl.token.client import Token
from spl.token.constants import TOKEN_PROGRAM_ID
from spl.token.instructions import mint_to_checked
from decimal import Decimal
from solana.rpc.api import Client
from solana.rpc.async_api import AsyncClient
import asyncio
from solana.rpc.async_api import AsyncClient
from moralis import sol_api

app = FastAPI()

# Use variables from config.py
RPC_URL = config.RPC_URL
RPC_URL_BACKUP = config.RPC_URL_BACKUP
API_KEY = config.API_KEY
SECRET_KEY_BYTES = bytes(config.SECRET_KEY)
SENDER_KEYPAIR = Keypair.from_bytes(SECRET_KEY_BYTES)
TOKEN_MINT_ADDRESS = config.TOKEN_MINT_ADDRESS
DECIMALS = 9  # Adjust based on your token's decimals
AMOUNT_TO_MINT = 1  # token amount to mint


async def fetch(wallet):
    # api_key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6ImFmZTliOTlmLTY1NWItNDRiYS05MGIxLTcwN2RmNTE2ODgyMiIsIm9yZ0lkIjoiMTE4Nzg4IiwidXNlcklkIjoiMTE4NDM0IiwidHlwZUlkIjoiOWYwNzFmY2QtNTg0Ni00MjU1LWE1ZDItMDc1ZDRmZTc4OGYxIiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE3MTI0NDI4ODcsImV4cCI6NDg2ODIwMjg4N30.fnFyQGUKXWPcIZy0s4KewWNh5mB32LOn7il1RSM3Wt8"
    code_rebels_mint=None
    params = {
        "network": "mainnet",
        "address": wallet
    }

    result = sol_api.account.get_nfts(
        api_key=API_KEY,
        params=params,
    )
    return result


@app.get("/get-client-status")
async def network_status():
    async with AsyncClient(RPC_URL) as client:
        con_one = await client.is_connected()

    # Alternatively, close the client explicitly instead of using a context manager:
    client = AsyncClient(RPC_URL_BACKUP)
    con_two = await client.is_connected()
    await client.close()
    return {"status": con_one, "backup status": con_two}


@app.post("/pre-mint/")
async def pre_mint(wallet_address: str):
    # Validate the wallet address
    try:
        recipient_public_key = Pubkey(wallet_address)
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid wallet address")

    # Initialize Solana client
    async with AsyncClient(RPC_URL) as client:
        # This is a simplified example. Adjust according to your token minting logic.
        # Normally, you'd interact with the token program to mint tokens.

        transaction = Transaction()
        transaction.add(
            sp.transfer(
                sp.TransferParams(
                    from_pubkey=SENDER_KEYPAIR.public_key,
                    to_pubkey=recipient_public_key,
                    lamports=AMOUNT_TO_MINT
                )
            )
        )

        # Assuming your minting process involves transferring lamports/tokens
        # For actual token minting, you'd use the spl-token commands or equivalent in solana-py
        try:
            # Sign and send the transaction
            response = await client.send_transaction(transaction, SENDER_KEYPAIR)
            return {"success": True, "response": response}
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))


async def regular_mint(wallet_address: str, amount: Decimal):
    # Validate the recipient wallet address
    try:
        recipient_public_key = Pubkey(wallet_address)
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid wallet address")

    async with AsyncClient(RPC_URL) as client:
        # Initialize the token instance
        token = Token(client, TOKEN_MINT_ADDRESS, TOKEN_PROGRAM_ID, SENDER_KEYPAIR)

        # Prepare the mint_to_checked transaction
        txn = Transaction()
        mint_to_instruction = mint_to_checked(
            token_program_id=TOKEN_PROGRAM_ID,
            mint=token.pubkey,
            dest=recipient_public_key,
            mint_authority=token.payer.public_key,
            amount=int(amount * (10 ** DECIMALS)),
            decimals=DECIMALS,
        )
        txn.add(mint_to_instruction)

        # Sign and send the transaction
        try:
            response = await client.send_transaction(txn, token.payer, skip_preflight=True)
            return {"success": True, "transaction": response['result']}
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))


@app.post("/transfer-nft/")
async def transfer_nft(nft_mint_address: str, recipient_wallet_address: str):
    # Validate the recipient wallet address
    try:
        recipient_public_key = Pubkey(recipient_wallet_address)
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid recipient wallet address")

    # Validate the NFT mint address
    try:
        nft_mint_public_key = Pubkey(nft_mint_address)
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid NFT mint address")

    async with AsyncClient(RPC_URL) as client:
        # Assuming the NFT follows standard SPL Token rules, with amount = 1 and decimals = 0 for NFTs
        amount = 1
        decimals = 0

        # Prepare the transfer_checked transaction
        txn = Transaction()
        transfer_instruction = sp.transfer_checked(
            sp.TransferCheckedParams(
                program_id=TOKEN_PROGRAM_ID,
                source=SENDER_KEYPAIR.public_key,
                mint=nft_mint_public_key,
                dest=recipient_public_key,
                owner=SENDER_KEYPAIR.public_key,
                amount=amount,
                decimals=decimals,
                signers=[SENDER_KEYPAIR]
            )
        )
        txn.add(transfer_instruction)

        # Sign and send the transaction
        try:
            response = await client.send_transaction(txn, SENDER_KEYPAIR, skip_preflight=True)
            return {"success": True, "transaction": response['result']}
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))


@app.get("/get-balance/{wallet_address}")
async def get_wallet_balance(wallet_address: str):
    async with AsyncClient(RPC_URL) as client:
        try:
            # Convert the string to a Pubkey object before using it
            public_key = Pubkey.from_string(wallet_address)
            balance_response = await client.get_balance(public_key)
            # Access the balance directly via the response's attribute
            balance_sol = balance_response.value / 1e9  # Convert lamports to SOL

            return {"balance_sol": balance_sol}
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))


@app.post("/fetch-nfts/{wallet_address}")
async def fetch_nfts(wallet_address: str):
    wallet_data = await fetch(wallet_address)
    return {"nfts": wallet_data}

@app.post("/fetch-nft/{wallet_address}/{name}")
async def fetch_nft_metadata(wallet_address: str, name: str):
    wallet_data = await fetch(wallet_address)
    print(type(wallet_data))

    mint_code = None

    for nft in wallet_data:
        if nft['name'] == name:
            mint_code = nft['mint']
            break

    # Print the mint value
    if mint_code:
        return {"Wallet address": wallet_address, "NFT mint token": mint_code}
    else:
        return {"NFT token mint not found": "None"}
#
#
# @app.post("/callback")
# async def fetch_nft(wallet_address: str):
#     # code here
#     print(wallet_address)


# @app.post("/nontransfearable")
# async def nftsrun(wallet_address: str):
#     # code here
#     print(wallet_address)
