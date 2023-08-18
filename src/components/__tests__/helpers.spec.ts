import { describe, expect, it } from 'vitest'

import { formatNumber, generateTableData } from '../../helpers'
import { NumberTypes } from '../../types'

describe('helper methods', () => {
  it('generatedData - should generate data for the table', () => {
    const data = [
      {
        circulating_supply: 29460706,
        cmc_rank: 3,
        date_added: '2010-07-13T00:00:00.000Z',
        id: 2,
        infinite_supply: false,
        last_updated: '2023-08-18T05:48:00.000Z',
        max_supply: 21000000,
        name: 'Crypto name 2',
        num_market_pairs: 20392,
        platform: null,
        quote: {
          USD: {
            fully_diluted_market_cap: 655272184172.66,
            last_updated: '2023-08-18T05:48:00.000Z',
            market_cap: 6145708921.99896,
            market_cap_dominance: 68.6085,
            percent_change_1h: 0.77854554,
            percent_change_7d: -11.03479407,
            percent_change_24h: -8.58855243,
            percent_change_30d: -13.12733326,
            percent_change_60d: -0.02722321,
            percent_change_90d: -1.70601192,
            price: 36441.532579650448,
            tvl: null,
            volume_24h: 43054618179.167778,
            volume_change_24h: 98.2591
          }
        },
        self_reported_circulating_supply: null,
        self_reported_market_cap: null,
        slug: '2',
        symbol: 'ABC',
        tags: [
          'mineable',
          'pow',
          'sha-256',
          'store-of-value',
          'state-channel',
          'coinbase-ventures-portfolio'
        ],
        total_supply: 19460706,
        tvl_ratio: null
      },
      {
        circulating_supply: 19460706,
        cmc_rank: 1,
        date_added: '2010-07-13T00:00:00.000Z',
        id: 1,
        infinite_supply: false,
        last_updated: '2023-08-18T05:48:00.000Z',
        max_supply: 21000000,
        name: 'Crypto name 1',
        num_market_pairs: 10392,
        platform: null,
        quote: {
          USD: {
            fully_diluted_market_cap: 555272184172.66,
            last_updated: '2023-08-18T05:48:00.000Z',
            market_cap: 5145708721.99896,
            market_cap_dominance: 48.6085,
            percent_change_1h: 0.67854554,
            percent_change_7d: -10.03479407,
            percent_change_24h: -7.58855243,
            percent_change_30d: -12.12733326,
            percent_change_60d: -0.01722321,
            percent_change_90d: -1.60601192,
            price: 26441.532579650448,
            tvl: null,
            volume_24h: 33054618179.167778,
            volume_change_24h: 99.2591
          }
        },
        self_reported_circulating_supply: null,
        self_reported_market_cap: null,
        slug: '1',
        symbol: 'CDE',
        tags: [
          'mineable',
          'pow',
          'sha-256',
          'store-of-value',
          'state-channel',
          'coinbase-ventures-portfolio'
        ],
        total_supply: 19460706,
        tvl_ratio: null
      }
    ]
    const logos = [
      { id: 1, logo: 'path/to/logo/1.png' },
      { id: 2, logo: 'path/to/logo/2.png' }
    ]

    const generatedData = generateTableData(data, logos)
    expect(generatedData).toStrictEqual([
      {
        name: 'Crypto name 2',
        percentChange24: -8.58855243,
        price: 36441.532579650448,
        volumeChange24: 98.2591,
        logo: 'path/to/logo/2.png'
      },
      {
        name: 'Crypto name 1',
        percentChange24: -7.58855243,
        price: 26441.532579650448,
        volumeChange24: 99.2591,
        logo: 'path/to/logo/1.png'
      }
    ])
  })

  it('formatNumber - formats number to percentage format', () => {
    expect(formatNumber(-7.58855243, NumberTypes.Percentage)).toBe('-8%')
    expect(formatNumber(7.158855243, NumberTypes.Percentage)).toBe('7%')
    expect(formatNumber(0, NumberTypes.Percentage)).toBe('0%')
    expect(formatNumber('1', NumberTypes.Percentage)).toBe('')
    expect(formatNumber(undefined, NumberTypes.Percentage)).toBe('')
  })

  it('formatNumber - formats number in plain format', () => {
    expect(formatNumber(-7.58855243, NumberTypes.Plain)).toBe('-7.5886')
    expect(formatNumber(7.158855243, NumberTypes.Plain)).toBe('7.1589')
    expect(formatNumber('1', NumberTypes.Plain)).toBe('')
    expect(formatNumber(undefined, NumberTypes.Plain)).toBe('')
  })

  it('formatNumber - formats number in USD currency format', () => {
    expect(formatNumber(-7.58855243, NumberTypes.UsdCurrency)).toBe('-7.5886 USD')
    expect(formatNumber(7.158855243, NumberTypes.UsdCurrency)).toBe('7.1589 USD')
    expect(formatNumber('1', NumberTypes.UsdCurrency)).toBe('')
    expect(formatNumber(undefined, NumberTypes.UsdCurrency)).toBe('')
  })
})
