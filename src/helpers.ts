import { DECIMALS_COUNT } from '@/constants'
import type { CryptoListData, Logo, TableDataItem } from '@/types'
import {NumberTypes} from "@/types";

export const generateTableData = (data: CryptoListData[], logos: Logo[]): TableDataItem[] => {
  if (!data) return []
  return data.map((item) => ({
    name: item.name,
    price: item.quote.USD.price,
    percentChange24: item.quote.USD.percent_change_24h,
    volumeChange24: item.quote.USD.volume_change_24h,
    logo: logos?.find((logo) => logo.id === item.id)?.logo
  }))
}

export const formatNumber = (value: unknown, type: NumberTypes) => {
  if (typeof value !== 'number') return '';

  switch (type) {
    case NumberTypes.Plain:
      return value.toFixed(DECIMALS_COUNT)
    case NumberTypes.Percentage:
      return `${Math.round(value)}%`
    case NumberTypes.UsdCurrency:
      return `${value.toFixed(DECIMALS_COUNT)} USD`
    default:
     return ''
  }

}
