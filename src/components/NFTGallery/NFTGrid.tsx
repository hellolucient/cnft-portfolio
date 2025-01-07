import React, { useState, useMemo } from 'react';
import { NFTCard } from './NFTCard';
import { NFT, SelectionState } from '../../types';
import './NFTGrid.css';

interface NFTGridProps {
  nfts: NFT[];
}

export const NFTGrid: React.FC<NFTGridProps> = ({ nfts }) => {
  const [selectedCollection, setSelectedCollection] = useState<string>('all');
  const [selectedWallet, setSelectedWallet] = useState<string>('all');
  const [selection, setSelection] = useState<SelectionState>({});

  // Get unique collections and wallets
  const { collections, wallets } = useMemo(() => {
    const symbols = new Set(nfts.map(nft => nft.symbol));
    const addresses = new Set(nfts.map(nft => nft.ownerAddress));
    return {
      collections: ['all', ...Array.from(symbols)],
      wallets: ['all', ...Array.from(addresses)]
    };
  }, [nfts]);

  // Filter NFTs
  const filteredNFTs = useMemo(() => {
    let filtered = nfts;

    if (selectedWallet !== 'all') {
      filtered = filtered.filter(nft => nft.ownerAddress === selectedWallet);
    }

    if (selectedCollection !== 'all') {
      filtered = filtered.filter(nft => nft.symbol === selectedCollection);
    }

    return filtered;
  }, [nfts, selectedCollection, selectedWallet]);

  // Selection handlers
  const toggleNFTSelection = (id: string) => {
    setSelection(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const selectAll = () => {
    const newSelection = { ...selection };
    filteredNFTs.forEach(nft => {
      newSelection[nft.id] = true;
    });
    setSelection(newSelection);
  };

  const selectNone = () => {
    const newSelection = { ...selection };
    filteredNFTs.forEach(nft => {
      newSelection[nft.id] = false;
    });
    setSelection(newSelection);
  };

  const selectByWallet = (wallet: string) => {
    const newSelection = { ...selection };
    nfts.filter(nft => nft.ownerAddress === wallet)
      .forEach(nft => {
        newSelection[nft.id] = true;
      });
    setSelection(newSelection);
  };

  const getSelectedCount = () => {
    return Object.values(selection).filter(Boolean).length;
  };

  return (
    <div className="nft-gallery-container">
      <div className="gallery-controls">
        <div className="control-group">
          <label>Wallet:</label>
          <select
            value={selectedWallet}
            onChange={(e) => setSelectedWallet(e.target.value)}
            className="gallery-select"
          >
            <option value="all">All Wallets</option>
            {wallets.map(wallet => (
              wallet !== 'all' && (
                <option key={wallet} value={wallet}>
                  {wallet.slice(0, 4)}...{wallet.slice(-4)}
                </option>
              )
            ))}
          </select>
        </div>

        <div className="control-group">
          <label>Collection:</label>
          <select 
            value={selectedCollection}
            onChange={(e) => setSelectedCollection(e.target.value)}
            className="gallery-select"
          >
            {collections.map(collection => (
              <option key={collection} value={collection}>
                {collection === 'all' ? 'All Collections' : collection}
              </option>
            ))}
          </select>
        </div>

        <div className="selection-controls">
          <button onClick={selectAll} className="select-btn">
            Select Current Filter ({filteredNFTs.length})
          </button>
          <button onClick={selectNone} className="select-btn">
            Clear Selection
          </button>
          <span className="selection-count">
            Selected: {getSelectedCount()}
          </span>
        </div>
      </div>

      <div className="nft-grid">
        {filteredNFTs.map(nft => (
          <div key={nft.id} className="nft-grid-item">
            <NFTCard 
              nft={nft}
              selected={!!selection[nft.id]}
              onSelect={toggleNFTSelection}
            />
          </div>
        ))}
      </div>
    </div>
  );
}; 