<template lang="pug">
  .page
    Header
    Section1(class="page__section1")
    Section2
    Section3
</template>

<script>
import Section1 from '@/components/home/Section1.vue'
import Header from '~/components/Header'
import Section2 from '@/components/home/Section2.vue'
import Section3 from '@/components/home/Section3.vue'

export default {
  components: {
    Header,
    Section1,
    Section2,
    Section3
  }
}
</script>

<style>
.page {
  /* overflow-x: hidden; */
  /* max-width: 100vw; */
}
</style>
