<template lang="pug">
  .page
    Header
    Section1(class="page__section1")
    Section2
</template>

<script>
import Section1 from '@/components/home/Section1.vue'
import Header from '~/components/Header'
import Section2 from '@/components/home/Section2.vue'

export default {
  components: {
    Header,
    Section1,
    Section2
  }
}
</script>

<style>
.page {
  /* overflow-x: hidden; */
  max-width: 100vw;
}
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
