<template lang="pug">
  .modal-city
    .modal-city__header 
      h4.modal-city__title Выберите город
      .modal-city__close-button(@click="hide('city')")
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 17L9 9.08429L0.999999 0.999969" stroke="#7290A1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M17.0002 17L9.00024 9.08429L17.0002 0.999969" stroke="#7290A1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    .modal-city__line
    ul.modal-city__city-list
      li.modal-city__city(v-for="city in cityList" :class="active(city)") {{city}}
</template>
<script>
export default {
  // eslint-disable-next-line vue/require-prop-types
  props: ['activeCity', 'hide'],
  data() {
    return {
      cityList: [
        'Барнаул',
        'Воронеж',
        'Киров',
        'Краснодар',
        'Красноярск',
        'Крым',
        'Москва',
        'Новосибирск',
        'Орёл',
        'Пенза',
        'Пермь',
        'Рязань',
        'Санкт-Петербург',
        'Челябинск'
      ]
    }
  },
  methods: {
    active(city) {
      return {
        active: this.activeCity === city
      }
    }
  }
}
</script>
<style lang="scss">
.modal-city {
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 28px;
    height: 60px;
  }

  &__title {
    font-weight: bold;
    font-size: 16px;
    line-height: 24px;
    letter-spacing: 0.1px;
    color: $h4-color;
  }

  &__line {
    height: 1px;
    background: rgba(167, 203, 213, 0.1);
  }

  &__city-list {
    padding: 30px 30px 30px 24px;
    display: flex;
    flex-flow: column wrap;
    align-items: flex-start;
    max-height: 294px;

    li {
      margin-bottom: 16px;
      text-transform: none;
      cursor: pointer;
      &:hover,
      &:focus,
      .active {
        color: $font-hover-color;
      }
    }
  }

  &__close-button {
    cursor: pointer;
  }
}
.active {
  color: $font-hover-color;
}
</style>
