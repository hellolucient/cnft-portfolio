import React, { useState } from 'react';
import { NFT } from '../../types';
import './NFTCard.css';

interface NFTCardProps {
  nft: NFT;
}

export const NFTCard: React.FC<NFTCardProps> = ({ nft }) => {
  const [imageError, setImageError] = useState(false);
  const fallbackImage = '/images/cnft-fail-whale.png';

  return (
    <div className="nft-card">
      <div className="nft-image-container">
        <img 
          src={imageError ? fallbackImage : nft.image}
          alt={nft.name}
          className="nft-image"
          onError={() => setImageError(true)}
        />
      </div>
      <div className="nft-info">
        <h3 className="nft-name">{nft.name}</h3>
        <p className="nft-symbol">{nft.symbol}</p>
      </div>
    </div>
  );
}; 