<template lang="pug">
  section.section1
    article.section1__content
      h2.section1__slogan Экономьте время и деньги на поиск лучшего жилья в новостройке 
      p.section1__description Выбирайте из 13 164 квартир в 123 ЖК Новосибирска
      .section1__button
        Button( title="Перейти в поиск" mods="raised,main-color")
</template>
<script>
import Button from '@/components/home/Button.vue'
export default {
  components: {
    Button
  }
}
</script>
<style lang="scss">
.section1 {
  box-sizing: border-box;
  background-size: cover;

  @media screen and (min-width: $screen-md) {
    background-image: url('~assets/section1/firs-screen.jpg');
    width: 100%;
    height: 740px;
    background-position: right;
  }

  @media screen and (min-width: $screen-xs) and (max-width: $screen-md - 1px) {
    background-image: url('~assets/section1/first screen img phone.jpg');
    height: calc(100vh - 50px);
    width: 100%;
    // background-size: contain;
    background-position: 0 0;
    background-repeat: no-repeat;
  }

  @media screen and (max-width: $screen-md - 1px) {
    background-size: cover;
  }

  &__content {
    display: inline-block;
    position: relative;
    top: 169/740 * 100%;
    left: 360/1920 * 100%;

    @media screen and (min-width: $screen-xl) {
      top: 169/740 * 100%;
      left: 360/1920 * 100%;
    }

    @media screen and (min-width: $screen-md) and (max-width: $screen-xl - 1px) {
      top: 169/740 * 100%;
      left: 40px;
    }

    @media screen and (min-width: $screen-xs) and (max-width: $screen-md - 1px) {
      position: static;
      // display: block;
      padding-left: 32/360 * 100%;
      padding-right: 32/360 * 100%;
      text-align: center;
    }
  }

  &__slogan {
    /* Экономьте время и деньги на поиск лучшего жилья в новостройке */
    font-weight: bold;
    font-size: 40/14 * 1rem;
    line-height: 54/40 * 1em;

    width: 602px;
    margin-bottom: 31/14 * 1rem;

    @media screen and (min-width: $screen-xs) and (max-width: $screen-md - 1px) {
      display: flex;
      width: 100%;
      font-size: 26/14 * 1rem;
      line-height: 35/26 * 1em;
      margin-top: calc(50vh - 151px);
    }
  }

  &__description {
    /* Выбирайте из 13 164 квартир в 123 ЖК Новосибирска */
    font-style: normal;
    font-weight: 500;
    font-size: 20/14 * 1rem;
    line-height: 27/20 * 1em;
    margin-bottom: 33/14 * 1rem;
  }

  &__button {
    width: 260px;
    @media screen and (min-width: $screen-xs) and (max-width: $screen-md - 1px) {
      margin: auto;
    }
  }
}
</style>
