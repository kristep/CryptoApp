<template>
  <header class="header px-3 py-1 sticky-top">
    <h1 class="text-center">{{ text }}</h1>
  </header>
</template>

<script>
export default {
  props: {
    text: String
  }
}
</script>

<style>
@import 'src/assets/variables.css';

.header {
  border-bottom: 2px solid var(--primary-color);
  background-color: var(--background-main);
  margin-bottom: 30px;
}
</style>

