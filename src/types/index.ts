export interface NFT {
  id: string
  name: string
  image: string
  symbol: string
  description: string
  assetId: string
  ownerAddress: string
  compression: {
    compressed: boolean
    proof?: string[]
    leafId?: number
    tree?: string
    root?: string
  }
}

export interface SelectionState {
  [key: string]: boolean; // key is NFT id, value is selected state
} 