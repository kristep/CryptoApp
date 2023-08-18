export type CryptoListData = {
  id: number
  name: string
  symbol: string
  slug: string
  cmc_rank: number
  num_market_pairs: number
  circulating_supply: number
  total_supply: number
  max_supply: number
  infinite_supply: boolean
  last_updated: string
  date_added: string
  tags: string[]
  platform: string | null
  self_reported_circulating_supply: null
  self_reported_market_cap: null
  quote: {
    USD: {
      price: number
      volume_24h: number
      volume_change_24h: number
      percent_change_1h: number
      percent_change_24h: number
      percent_change_7d: number
      market_cap: number
      market_cap_dominance: number
      fully_diluted_market_cap: number
      last_updated: string
    }
  }
}

export type CryptoListResponse = {
  data: CryptoListData[]
  status: {
    credit_count: number
    elapsed: number
    error_code: number
    error_message: string | null
    notice: string | null
    timestamp: string
    total_count: number
  }
}

export type CryptoInfo = {
  urls: {
    website: string[]
    technical_doc: string[]
    twitter: string[]
    reddit: string[]
    message_board: string[]
    announcement: string[]
    chat: string[]
    explorer: string[]
    source_code: string[]
  }
  logo: string
  id: number
  name: string
  symbol: string
  slug: string
  description: string
  date_added: string
  date_launched: string
  tags: string[]
  platform: string | null
  category: string
}

export type CryptoInfoResponse = {
  [id: string]: CryptoInfo
}

export type Logo = {
  id: number
  logo: string
}

export type TableDataItem = {
  name: string
  price: number
  percentChange24: number
  volumeChange24: number
  logo?: string
}

export enum NumberTypes  {
  Percentage = 'percentage',
  Plain = 'plain',
  UsdCurrency = 'usd_currency'
}
