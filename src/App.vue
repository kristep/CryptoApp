<script>
import PageLayout from '@/components/PageLayout.vue'
import CryptoList from '@/components/CryptoList/CryptoList.vue'

export default {
  components: {
    CryptoList,
    PageLayout
  }
}
</script>

<template>
  <page-layout>
    <crypto-list></crypto-list>
  </page-layout>
</template>
