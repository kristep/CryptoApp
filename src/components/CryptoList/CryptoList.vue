<template>
  <div>
    <b-table hover :fields="tableFields" :items="cryptoList">
      <template #cell(logo)="{ value }">
        <img :src="value?.toString()" alt="crypto currency logo" width="50" />
      </template>
      <template #cell(percentChange24)="{ value }">
        <i v-if="typeof value === 'number' && value > 0" class="bi bi-arrow-up arrow-up"></i>
        <i v-if="typeof value === 'number' && value < 0" class="bi bi-arrow-down arrow-down"></i>
        <span>{{ formatNumber(value, NumberTypes.Percentage) }}</span>
      </template>
    </b-table>
    <div v-if="isLoading" class="d-flex justify-content-center">
      <div class="spinner-border" role="status"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

import apiService from '@/services/apiService'
import { formatNumber, generateTableData } from '@/helpers'
import { ITEMS_PER_PAGE } from '@/constants'
import type { CryptoInfoResponse, CryptoListResponse, Logo, TableDataItem } from '@/types'
import { NumberTypes } from '@/types'
import type { TableField } from 'bootstrap-vue-next'

let isLoading = ref<boolean>(false)
let queryStart = ref<number>(1)
let cryptoList = ref<TableDataItem[]>([])

const tableFields: TableField[] = [
  { key: 'logo', label: '' },
  { key: 'name', label: 'Crypto', class: 'align-middle' },
  {
    key: 'price',
    label: 'Price',
    formatter: (value) => formatNumber(value, NumberTypes.UsdCurrency),
    class: 'd-none d-sm-table-cell text-right align-middle'
  },
  {
    key: 'volumeChange24',
    label: 'Volume 24 h',
    formatter: (value) => formatNumber(value, NumberTypes.Plain),
    class: 'd-none d-sm-table-cell text-right align-middle'
  },
  {
    key: 'percentChange24',
    label: 'Change',
    class: 'align-middle'
  }
]

onMounted(async () => {
  await fetchListData()
  setupScrollListener()
})

const fetchLogo = async (ids: string) => {
  let logos: Logo[] = []
  try {
    const fetchedData: CryptoInfoResponse = await apiService
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
}
const fetchListData = async () => {
  try {
    isLoading.value = true
    const newData: CryptoListResponse = await apiService.get('v1/cryptocurrency/listings/latest', {
      limit: ITEMS_PER_PAGE,
      start: queryStart.value
    })
    const newDataIds = newData.data.map((item) => item.id).join(',')
    const newDataLogos = await fetchLogo(newDataIds)
    const newGeneratedData: TableDataItem[] = generateTableData(newData.data, newDataLogos)

    cryptoList.value = [...cryptoList.value, ...newGeneratedData]
    queryStart.value = queryStart.value + ITEMS_PER_PAGE
  } catch (error) {
    console.error(error)
  } finally {
    isLoading.value = false
  }
}
const setupScrollListener = () => {
  window.addEventListener('scroll', handleScroll)
}
const handleScroll = () => {
  if (
    Math.ceil(window.innerHeight + window.scrollY) >= document.body.offsetHeight &&
    !isLoading.value
  ) {
    fetchListData()
  }
}

onBeforeUnmount(() => window.removeEventListener('scroll', handleScroll))
</script>

<style>
@import 'src/assets/variables.css';

.arrow-up {
  color: var(--success-color);
}
.arrow-down {
  color: var(--danger-color);
}
</style>
