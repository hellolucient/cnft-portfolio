# cNFT Portfolio

A React application for viewing compressed Solana NFTs in your wallet.

## Setup

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file based on `.env.example`:
```bash
cp .env.example .env.local
```

4. Add your Helius API key and fee wallet address to `.env.local`

5. Start the development server:
```bash
npm start
```

## Environment Variables

- `REACT_APP_RPC_URL`: Your Helius RPC URL with API key
- `REACT_APP_FEE_WALLET`: Wallet address for fees

## Features

- Connect your Solana wallet
- View your compressed NFTs
- Filter NFTs by collection
- Responsive grid layout
