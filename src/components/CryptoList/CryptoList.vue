<template>
  <div>
    <b-table hover :fields="tableFields" :items="cryptoList"></b-table>
    <div v-if="isLoading" class="d-flex justify-content-center">
      <div class="spinner-border" role="status"></div>
    </div>
  </div>
</template>

<script>
import apiService from '@/services/apiService'

export default {
  data() {
    return {
      cryptoList: [],
      isLoading: false,
      start: 1,
      tableFields: [
        { key: 'name', label: 'Crypto' },
        {
          key: 'price',
          label: 'Price',
          formatter: (value) => `${value.toFixed(4)} USD`,
          class: 'd-none d-sm-table-cell text-right'
        },
        {
          key: 'volumeChange24',
          label: 'Volume 24 h',
          formatter: (value) => value.toFixed(4),
          class: 'd-none d-sm-table-cell text-right'
        },
        { key: 'percentChange24', label: 'Change', formatter: (value) => `${Math.round(value)} %` }
      ]
    }
  },
  async created() {
    await this.fetchListData()
    this.setupScrollListener()
  },
  methods: {
    async fetchListData() {
      try {
        this.isLoading = true
        const newData = await apiService.get('v1/cryptocurrency/listings/latest', {
          limit: 20,
          start: this.start
        })
        const newFormattedData = newData.data.map((item) => ({
          name: item.name,
          price: item.quote.USD.price,
          percentChange24: item.quote.USD.percent_change_24h,
          volumeChange24: item.quote.USD.volume_change_24h
        }))
        console.log(newFormattedData)
        this.cryptoList = [...this.cryptoList, ...newFormattedData]
        this.start = this.start + 20
      } catch (error) {
        console.error(error)
      } finally {
        this.isLoading = false
      }
    },
    setupScrollListener() {
      window.addEventListener('scroll', this.handleScroll)
    },
    handleScroll() {
      if (
        Math.ceil(window.innerHeight + window.scrollY) >= document.body.offsetHeight &&
        !this.isLoading
      ) {
        this.fetchListData()
      }
    }
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }
}
</script>

<style>
td {
  padding: 16px 8px !important;
}
</style>
