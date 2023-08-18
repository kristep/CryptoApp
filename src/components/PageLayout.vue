<template>
  <div>
    <header-component :text="'Crypto single-page application'" />
    <main class="container">
      <slot></slot>
    </main>
  </div>
</template>

<script>
import HeaderComponent from '@/components/HeaderComponent.vue'
export default {
  components: {
    HeaderComponent
  }
}
</script>


