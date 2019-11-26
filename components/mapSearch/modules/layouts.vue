/* eslint-disable no-unused-vars */
<template>
  <div class="layouts-wrapper">
    <div class="layouts-box">
      <div v-if="!residentials.length">
        <PlaceholderLayout v-for="n in 4" :key="n"></PlaceholderLayout>
      </div>
      <div v-if="filtredRC.length">
        <Layout
          v-for="(residential, index) in filtredRC.slice(0, lazyResidentials)"
          :key="index"
          :img="residential.thumbnail"
          :price="residential.price_min"
          :name="residential.title"
          :developer="residential.developer.name"
          :opacity="layoutIsOpasity"
          @click="handlerLayout(index, residential.id)"
        ></Layout>
        <!-- :isHide="!filtredIdsRC.includes(residential.id)" -->
      </div>
    </div>
    <div
      v-if="filtredRC.length < residentials.length"
      class="text-change-parametrs"
    >
      Измените параметры поиска, чтобы увидеть больше ЖК
    </div>

    <!-- <PopupLayoutPlaceholder></PopupLayoutPlaceholder> -->
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'

import PlaceholderLayout from './placeholderLayout'
// import PopupLayoutPlaceholder from './popupLayoutPlaceholder'
// import PopupLayout from './popupLayout'
import Layout from './layout'
const {
  mapState,
  // mapGetters,
  // mapActions,
  mapMutations
} = createNamespacedHelpers('mapSearch')
export default {
  props: {
    lazyResidentials: {
      type: Number,
      default: 6
    }
  },
  methods: {
    ...mapMutations([
      'setAccordeonClassFilters',
      'setIsOpenAllFilters',
      'setIsOpenCard'
    ]),
    handlerLayout(index, id) {
      this.$emit('residential-data', {
        index,
        id
      })

      // закрытие фильтров
      if (this.isOpenAllFilters) {
        this.setAccordeonClassFilters(false)
        this.setIsOpenAllFilters(false)
      }
      this.setIsOpenCard(true)
    }
  },
  computed: {
    ...mapState({
      residentials: (state) => state.residentials,
      currentResidentialId: (state) => state.currentResidentialId,
      filtredRC: (state) => state.filtredRC,
      filtredIdsRC: (state) => state.filtredIdsRC,
      isOpenAllFilters: (state) => state.isOpenAllFilters
    }),
    layoutIsOpasity() {
      return false
    }
  },
  components: {
    PlaceholderLayout,
    Layout
    // PopupLayoutPlaceholder,
    // PopupLayout
  }
}
</script>

<style lang="scss">
.layouts-wrapper {
  padding: 0px 0 10px;
  background: #2b2e2f;
  justify-content: space-between;
  flex: 1 0 auto;
}
.text-change-parametrs {
  background: #2b2e2f;
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  text-align: center;
  letter-spacing: 0.1px;
  color: #959797;
  text-align: center;
  display: flex;
  align-items: center;
  padding: 10px 65px;
  // height: 65px;
}
</style>
