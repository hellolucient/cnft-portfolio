import { useState, useEffect, useCallback } from 'react'
import { useWallet } from '@solana/wallet-adapter-react'
import { NFT } from '../types'

export function useNFTs(additionalAddresses: string[] = []) {
  const [nfts, setNfts] = useState<NFT[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const { publicKey } = useWallet()

  const fetchNFTsForAddress = useCallback(async (address: string) => {
    try {
      const response = await fetch(
        'https://mainnet.helius-rpc.com/?api-key=' + process.env.REACT_APP_RPC_URL?.split('api-key=')[1],
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            jsonrpc: '2.0',
            id: 'my-id',
            method: 'getAssetsByOwner',
            params: {
              ownerAddress: address,
              page: 1,
              limit: 1000
            }
          })
        }
      )

      const responseData = await response.json()
      
      // Filter for ONLY compressed NFTs
      const compressedNfts = (responseData.result?.items || []).filter((asset: any) => 
        asset.compression?.compressed === true
      )

      // Map to our format
      return compressedNfts.map((nft: any) => ({
        id: nft.id,
        name: nft.content?.metadata?.name || 'Unnamed',
        symbol: nft.content?.metadata?.symbol || '',
        image: nft.content?.files?.[0]?.uri || nft.content?.links?.image || '',
        description: nft.content?.metadata?.description || '',
        assetId: nft.id,
        ownerAddress: address, // Add owner address to track which wallet owns it
        compression: {
          compressed: true,
          proof: nft.compression?.proof,
          leafId: nft.compression?.leaf_id,
          tree: nft.compression?.tree_id,
          root: nft.compression?.root
        }
      }))
    } catch (err) {
      console.error(`Error fetching NFTs for address ${address}:`, err)
      throw err
    }
  }, [])

  const fetchAllNFTs = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const addresses = [...additionalAddresses]
      if (publicKey) {
        addresses.push(publicKey.toString())
      }

      if (addresses.length === 0) {
        setNfts([])
        return
      }

      const allNFTs = await Promise.all(
        addresses.map(address => 
          fetchNFTsForAddress(address).catch(err => {
            console.error(`Failed to fetch NFTs for ${address}:`, err)
            return []
          })
        )
      )

      setNfts(allNFTs.flat())
    } catch (err) {
      console.error('Error fetching NFTs:', err)
      setError(err instanceof Error ? err : new Error('Failed to fetch NFTs'))
    } finally {
      setLoading(false)
    }
  }, [publicKey, additionalAddresses, fetchNFTsForAddress])

  useEffect(() => {
    fetchAllNFTs()
  }, [fetchAllNFTs])

  return { nfts, loading, error, refreshNFTs: fetchAllNFTs }
} 