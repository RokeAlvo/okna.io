<template lang="pug">
  .page
    Header(:city='this.$route.params.city')
    Section1(class="page__section1")
    Section2
    Section3
    Section4
    Section5
    Section6
    Footer
</template>

<script>
import Section1 from '@/components/home/Section1.vue'
import Header from '@/components/home/Header'
import Section2 from '@/components/home/Section2.vue'
import Section3 from '@/components/home/Section3.vue'
import Section4 from '@/components/home/Section4.vue'
import Section5 from '@/components/home/Section5.vue'
import Section6 from '@/components/home/Section6.vue'

export default {
  components: {
    Header,
    Section1,
    Section2,
    Section3,
    Section4,
    Section5,
    Section6
  }
}
</script>

<style>
.page {
  overflow-x: hidden;
  max-width: 100vw;
}
</style>
