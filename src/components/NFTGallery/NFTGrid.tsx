import React, { useState, useMemo } from 'react';
import { NFTCard } from './NFTCard';
import { NFT } from '../../types';
import './NFTGrid.css';

interface NFTGridProps {
  nfts: NFT[];
}

export const NFTGrid: React.FC<NFTGridProps> = ({ nfts }) => {
  const [selectedCollection, setSelectedCollection] = useState<string>('all');

  // Get unique collections
  const collections = useMemo(() => {
    const symbols = new Set(nfts.map(nft => nft.symbol));
    return ['all', ...Array.from(symbols)];
  }, [nfts]);

  // Filter NFTs by collection
  const filteredNFTs = useMemo(() => {
    if (selectedCollection === 'all') return nfts;
    return nfts.filter(nft => nft.symbol === selectedCollection);
  }, [nfts, selectedCollection]);

  return (
    <div className="nft-gallery-container">
      <div className="collection-filter">
        <select 
          value={selectedCollection}
          onChange={(e) => setSelectedCollection(e.target.value)}
          className="collection-select"
        >
          {collections.map(collection => (
            <option key={collection} value={collection}>
              {collection === 'all' ? 'All Collections' : collection}
            </option>
          ))}
        </select>
      </div>

      <div className="nft-grid">
        {filteredNFTs.map(nft => (
          <div key={nft.id} className="nft-grid-item">
            <NFTCard nft={nft} />
          </div>
        ))}
      </div>
    </div>
  );
}; 