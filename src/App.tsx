import React from 'react';
import { useNFTs } from './hooks/useNFTs';
import { useWalletAddresses } from './hooks/useWalletAddresses';
import { useWallet } from '@solana/wallet-adapter-react';
import { NFTGrid } from './components/NFTGallery/NFTGrid';
import { WalletManager } from './components/WalletManager/WalletManager';
import { WalletConnectionProvider } from './components/WalletConnection/WalletConnectionProvider';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import './App.css';

function AppContent() {
  const { connected } = useWallet();
  const { addresses, mainWallet, addAddress, removeAddress } = useWalletAddresses();
  const { nfts, loading, error } = useNFTs(addresses);

  if (!connected) {
    return (
      <div className="App">
        <header className="App-header">
          <h1>cNFT Portfolio</h1>
          <WalletMultiButton />
        </header>
        <main className="connect-prompt">
          <h2>Connect your wallet to view your cNFTs</h2>
        </main>
      </div>
    );
  }

  if (loading) return <div>Loading your NFTs...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="App">
      <header className="App-header">
        <h1>cNFT Portfolio</h1>
        <WalletMultiButton />
      </header>
      <main>
        <WalletManager
          addresses={addresses}
          mainWallet={mainWallet}
          onAddAddress={addAddress}
          onRemoveAddress={removeAddress}
        />
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