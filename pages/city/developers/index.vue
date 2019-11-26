<template lang="pug">
  .page
    Header(:city="city")
    .page__content
      h2.page__title Все застройщики {{city}}
      .page__input
        InputTextSearch(
          v-model="inputText" 
          placeholder="Поиск застройщика по названию")
      .page__cards
        DeveloperCard(v-for="(dev, index) in filteredDevelopers" :key="index" :developer="dev")
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
    },
    developers: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      inputText: ''
    }
  },
  computed: {
    filteredDevelopers() {
      const filteredDevelopers = this.developers.filter((dev) => {
        return ~dev.developerName
          .toLowerCase()
          .indexOf(this.inputText.toLowerCase())
      })
      return filteredDevelopers
    }
  },
  created() {
    // FIXME remove fake data
    this.developers = Array(10)
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
    margin-bottom: 60px;
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
      width: 100%;
      margin: auto;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
    }
  }
}
</style>
