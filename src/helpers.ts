import {DECIMALS_COUNT} from "@/constants";

export const generateTableData = (data, logos) => {
    if (!data) return []
    return data.map((item) => ({
        name: item.name,
        price: item.quote.USD.price,
        percentChange24: item.quote.USD.percent_change_24h,
        volumeChange24: item.quote.USD.volume_change_24h,
        logo: logos.find(logo => logo.id === item.id).logo
    }))
}

export const formatPercentage = (value) => `${Math.round(value)}%`
export const formatNumber = (value) => value.toFixed(DECIMALS_COUNT)
export const formatCurrency = (value) => `${value.toFixed(DECIMALS_COUNT)} USD`
