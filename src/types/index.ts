export interface NFT {
  id: string
  name: string
  image: string
  symbol: string
  description: string
  assetId: string
  compression: {
    compressed: boolean
    proof?: string[]
    leafId?: number
    tree?: string
    root?: string
  }
} 