import React, { useState } from 'react';
import './WalletManager.css';

interface WalletManagerProps {
  addresses: string[];
  mainWallet: string | null;
  onAddAddress: (address: string) => void;
  onRemoveAddress: (address: string) => void;
}

export const WalletManager: React.FC<WalletManagerProps> = ({
  addresses,
  mainWallet,
  onAddAddress,
  onRemoveAddress
}) => {
  const [newAddress, setNewAddress] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newAddress.trim()) {
      onAddAddress(newAddress.trim());
      setNewAddress('');
    }
  };

  return (
    <div className="wallet-manager">
      <form onSubmit={handleSubmit} className="wallet-form">
        <input
          type="text"
          value={newAddress}
          onChange={(e) => setNewAddress(e.target.value)}
          placeholder="Enter wallet address"
          className="wallet-input"
        />
        <button type="submit" className="wallet-add-btn">Add Wallet</button>
      </form>
      
      <div className="wallet-list">
        {addresses.map(address => (
          <div key={address} className={`wallet-item ${address === mainWallet ? 'main-wallet' : ''}`}>
            <span className="wallet-address">
              {address === mainWallet && <span className="main-label">Main</span>}
              {address.slice(0, 4)}...{address.slice(-4)}
            </span>
            <button
              onClick={() => onRemoveAddress(address)}
              className="wallet-remove-btn"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}; 