import { useState, useEffect, useMemo } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';

interface LinkedWallets {
  mainWallet: string | null;
  linkedWallets: string[];
}

export function useWalletAddresses() {
  const { publicKey } = useWallet();
  const [walletData, setWalletData] = useState<LinkedWallets>(() => {
    const saved = localStorage.getItem('linkedWallets');
    return saved ? JSON.parse(saved) : { mainWallet: null, linkedWallets: [] };
  });

  // Update main wallet when first connecting
  useEffect(() => {
    if (publicKey && !walletData.mainWallet) {
      setWalletData(prev => ({
        ...prev,
        mainWallet: publicKey.toString()
      }));
    }
  }, [publicKey, walletData.mainWallet]);

  // Save to localStorage whenever walletData changes
  useEffect(() => {
    localStorage.setItem('linkedWallets', JSON.stringify(walletData));
  }, [walletData]);

  const addAddress = (address: string) => {
    if (!walletData.mainWallet) {
      // If no main wallet, set this as main
      setWalletData({
        mainWallet: address,
        linkedWallets: []
      });
    } else if (!walletData.linkedWallets.includes(address) && address !== walletData.mainWallet) {
      // Add to linked wallets if not already included
      setWalletData(prev => ({
        ...prev,
        linkedWallets: [...prev.linkedWallets, address]
      }));
    }
  };

  const removeAddress = (address: string) => {
    if (address === walletData.mainWallet) {
      // If removing main wallet, promote first linked wallet to main if available
      const [newMain, ...remainingWallets] = walletData.linkedWallets;
      setWalletData({
        mainWallet: newMain || null,
        linkedWallets: remainingWallets
      });
    } else {
      // Remove from linked wallets
      setWalletData(prev => ({
        ...prev,
        linkedWallets: prev.linkedWallets.filter(w => w !== address)
      }));
    }
  };

  // Get all addresses (main wallet + linked wallets)
  const allAddresses = useMemo(() => {
    return walletData.mainWallet 
      ? [walletData.mainWallet, ...walletData.linkedWallets]
      : walletData.linkedWallets;
  }, [walletData]);

  return { 
    addresses: allAddresses,
    mainWallet: walletData.mainWallet,
    linkedWallets: walletData.linkedWallets,
    addAddress, 
    removeAddress 
  };
} 