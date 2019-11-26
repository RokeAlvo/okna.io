<template lang="pug">
  .page
    Header(:city="city")
    .page__content
      h2.page__title Все застройщики {{city}}
      .page__input
        InputTextSearch(
          v-model="InputText" 
          placeholder="Поиск застройщика по названию")
      .page__cards
        DeveloperCard(v-for="(dev, index) in developers" :key="index" :developer="dev")
    Footer
</template>
<script>
import Faker from 'faker/locale/ru'
import InputTextSearch from '@/components/InputTextSearch'
import Header from '@/components/home/Header'
import DeveloperCard from '@/components/DeveloperCard'

export default {
  components: {
    InputTextSearch,
    Header,
    DeveloperCard
  },
  props: {
    city: {
      type: String,
      default: 'Новосибирск'
    }
  },
  computed: {
    // FIXME remove fake data
    developers() {
      return Array(10)
        .fill(0)
        .map((i) => {
          return {
            logoUrl: Faker.image.image(),
            developerName: Faker.company.companyName(),
            developerDescriptions: [
              Faker.lorem.words(),
              Faker.lorem.words(),
              Faker.lorem.words()
            ],
            isReliable: Faker.random.boolean(),
            developerOffer: 'Квартиры от ' + Faker.commerce.price()
          }
        })
    }
  },
  data() {
    return {
      InputText: ''
    }
  }
}
</script>
<style lang="scss" scoped>
.page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  &__content {
    padding: 0 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background: #f1f1f1;
    @media screen and (min-width: $screen-md) {
      padding: 40px;
    }
    @media screen and (min-width: $screen-xl) {
      padding: 0;
      // max-width: 1200px;
    }
  }

  &__title {
    align-self: center;
    margin: 90px 0 30px 0;
    font-weight: bold;
    font-size: 30px;
    color: rgba(#5a5863, 0.9);
    text-align: center;
  }

  &__input {
    align-self: center;
    max-width: 360px;
    width: 100%;
    margin-bottom: 90px;
  }
  &__cards {
    .developer-card {
      margin-bottom: 10px;
    }
    @media screen and (min-width: $screen-xl) {
      padding: 0;
      max-width: 1200px;
      margin: auto;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
    }
  }
}
</style>
