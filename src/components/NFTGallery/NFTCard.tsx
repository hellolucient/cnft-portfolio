import React, { useState } from 'react';
import { NFT } from '../../types';
import './NFTCard.css';

interface NFTCardProps {
  nft: NFT;
  selected: boolean;
  onSelect: (id: string) => void;
}

export const NFTCard: React.FC<NFTCardProps> = ({ nft, selected, onSelect }) => {
  const [imageError, setImageError] = useState(false);
  const fallbackImage = '/images/cnft-fail-whale.png';

  return (
    <div 
      className={`nft-card ${selected ? 'selected' : ''}`}
      onClick={() => onSelect(nft.id)}
    >
      <div className="nft-image-container">
        <img 
          src={imageError ? fallbackImage : nft.image}
          alt={nft.name}
          className="nft-image"
          onError={() => setImageError(true)}
        />
        {selected && <div className="selected-overlay">✓</div>}
      </div>
      <div className="nft-info">
        <h3 className="nft-name">{nft.name}</h3>
        <p className="nft-symbol">{nft.symbol}</p>
        <p className="nft-wallet">
          {nft.ownerAddress.slice(0, 4)}...{nft.ownerAddress.slice(-4)}
        </p>
      </div>
    </div>
  );
}; 