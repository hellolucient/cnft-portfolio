import React from 'react';
import { useNFTs } from './hooks/useNFTs';
import { NFTGrid } from './components/NFTGallery/NFTGrid';
import { WalletConnectionProvider } from './components/WalletConnection/WalletConnectionProvider';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import './App.css';

function AppContent() {
  const { nfts, loading, error } = useNFTs();

  if (loading) return <div>Loading your NFTs...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="App">
      <header className="App-header">
        <h1>cNFT Portfolio</h1>
        <WalletMultiButton />
      </header>
      <main>
        <NFTGrid nfts={nfts} />
      </main>
    </div>
  );
}

function App() {
  return (
    <WalletConnectionProvider>
      <AppContent />
    </WalletConnectionProvider>
  );
}

export default App; 