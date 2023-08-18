<template>
  <div>
    <b-table hover :fields="tableFields" :items="cryptoList">
      <template #cell(logo)="data">
          <img :src="data.value" alt="crypto currency logo" width="50" />
      </template>
      <template #cell(percentChange24)="data">
        <i v-if="data.value > 0" class="bi bi-arrow-up arrow-up"  ></i>
        <i v-if="data.value < 0" class="bi bi-arrow-down arrow-down"  ></i>
        <span>{{formatPercentage(data.value)}}</span>
      </template>
    </b-table>
    <div v-if="isLoading" class="d-flex justify-content-center">
      <div class="spinner-border" role="status"></div>
    </div>
  </div>
</template>

<script>
import apiService from '@/services/apiService'
import { formatCurrency, formatNumber, formatPercentage, generateTableData } from '@/helpers'
import { ITEMS_PER_PAGE } from '@/constants'

export default {
  data() {
    return {
      cryptoList: [],
      isLoading: false,
      start: 1,
      tableFields: [
        { key: 'logo', label: '' },
        { key: 'name', label: 'Crypto', class: 'align-middle' },
        {
          key: 'price',
          label: 'Price',
          formatter: formatCurrency,
          class: 'd-none d-sm-table-cell text-right align-middle'
        },
        {
          key: 'volumeChange24',
          label: 'Volume 24 h',
          formatter: formatNumber,
          class: 'd-none d-sm-table-cell text-right align-middle'
        },
        {
          key: 'percentChange24',
          label: 'Change',
          class: 'align-middle'
        }
      ]
    }
  },
  async created() {
    await this.fetchListData()
    this.setupScrollListener()
  },
  methods: {
    formatPercentage,
    async fetchLogo(ids) {
      let logos = []
      try {
        const fetchedData = await apiService
          .get('v2/cryptocurrency/info', { id: ids })
          .then((res) => res.data)
        const data = Object.values(fetchedData)
        logos = data.map((item) => ({
          logo: item.logo,
          id: item.id
        }))
      } catch (error) {
        console.error(error)
      }
      return logos
    },
    async fetchListData() {
      try {
        this.isLoading = true
        const newData = await apiService.get('v1/cryptocurrency/listings/latest', {
          limit: ITEMS_PER_PAGE,
          start: this.start
        })
        const newDataIds = newData.data.map((item) => item.id).join(',')
        const newDataLogos = await this.fetchLogo(newDataIds)
        const newGeneratedData = generateTableData(newData.data, newDataLogos)

        this.cryptoList = [...this.cryptoList, ...newGeneratedData]
        this.start = this.start + ITEMS_PER_PAGE
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
.arrow-up {
  color: green;
}
.arrow-down {
  color: red;
}
</style>
