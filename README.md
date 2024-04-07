
# *CR3DENTIAL*

A platform to issue credentials on-chain facilitate by a Python-based API and a UI application designed to interact with the Solana blockchain.

## Requirements

    Python 3.7+
    fastapi
    solana (including solana.rpc.async_api and solders)
    spl-token
    moralis (optional, for NFT fetching)
    requests (optional, for external API communication)

## Installation

    Create a virtual environment to isolate project dependencies:
    Bash

    python -m venv venv
    source venv/bin/activate  # Windows: venv\Scripts\activate


### Install required packages:

pip install -r requirements.txt

## Configuration

The project relies on a config.py file to store sensitive information. Create this file in your project's root directory with the following content, replacing placeholders with your actual values:
Python

```
RPC_URL = "https://api.mainnet-beta.solana.com"  # Replace with your desired RPC endpoint
RPC_URL_BACKUP = "https://api.devnet.solana.com"  # Optional, backup endpoint
API_KEY = "YOUR_MORALIS_API_KEY"  # for NFT fetching using Moralis
SECRET_KEY = "YOUR_SOLANA_WALLET_SECRET_KEY"  # Base64-encoded private key
TOKEN_MINT_ADDRESS = "YOUR_TOKEN_MINT_ADDRESS"  # Public key of the token you want to mint
DECIMALS = 9  # Adjust based on your token's decimal places
AMOUNT_TO_MINT = 1  # Default amount for pre-minting (lamports)
```

## Usage

    Start the application:

    uvicorn main:app --host 0.0.0.0 --port 8000  # Replace with your desired port
    The API will be available at http://127.0.0.1:8000.

    API Endpoints:
        GET /get-client-status: Check the network status of the Solana RPC client.
        POST /pre-mint/: Endpoint for pre-mint operations, accepts wallet_address in the request body.
        POST /regular-mint/: Mint tokens regularly by providing wallet_address and amount in the request body.
        POST /mint/: create non-transferable wallet and include custum metadata 
        POST /transfer-nft/: Transfer an NFT to another wallet, requires nft_mint_address and recipient_wallet_address in the request body.
        POST /bulk-transfer: Transfer multiple NFTs to multiple wallets
        GET /get-balance/{wallet_address}: Get the SOL balance of a wallet.
        POST /fetch-nfts/{wallet_address}: Fetch all NFTs associated with a wallet address.
        POST /fetch-nft/{wallet_address}/{name}: Fetch metadata for a specific NFT by name and wallet address.
        
## Security Considerations

    Do not commit your secret key (SECRET_KEY) to a public repository. Store it securely using environment variables or add it to your local config file.
    Consider rate limiting or access control mechanisms for certain API endpoints to prevent misuse.
