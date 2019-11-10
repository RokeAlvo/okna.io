<template lang="pug">
    section.section3__wrap
      .section3
        .section3__article
          h2.section3__header 
            span okna.io 
            |— самая полная в Новосибирске база новостроек с актуальными ценами
            | и акциями напрямую от застройщиков
          article.section3__description Благодаря партнёрским соглашениям
            | с застройщиками услуги портала для вас 
            span абсолютно бесплатны
        .section3__logos
          .section3__logos-row
            .section3__logo-item
              BuilderLogo.builder-logo_brusnika
            .section3__logo-item
              BuilderLogo.builder-logo_strizhi
            .section3__logo-item
              BuilderLogo.builder-logo_sibir
          .section3__logos-row
            .section3__logo-item
              BuilderLogo.builder-logo_vira-stroy
            .section3__logo-item
              BuilderLogo.builder-logo_stroitel
            .section3__button
              Button(title='50+ партнёров', mods='outlined')
</template>
<script>
import BuilderLogo from '~/components/BuilderLogo/BuilderLogo'
export default {
  components: {
    BuilderLogo
  }
}
</script>
<style lang="scss">
.section3 {
  width: 1200px;
  display: flex;
  margin-bottom: 124px;

  @media screen and (min-width: $screen-xs) and (max-width: $screen-xl - 1px) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  @media screen and (max-width: $screen-md - 1px) {
    padding: 0 20px;
  }

  &__article {
    width: 560px;
    min-width: 560px;
    @media screen and (max-width: $screen-md - 1px) {
      min-width: 0;
      width: 100%;
      font-size: 20/14 * 1rem;
    }
  }

  &__header {
    font-size: 24/14 * 1rem;
    line-height: 35/24 * 1em;
    margin-bottom: 29px;
    @media screen and (max-width: $screen-md - 1px) {
      font-size: 20/14 * 1rem;
    }

    span {
      color: $font-logo-color;
    }

    @media screen and (min-width: $screen-xs) and (max-width: $screen-xl - 1px) {
      text-align: center;
    }
  }

  &__description {
    max-width: 500px;
    font-size: 16/14 * 1rem;
    line-height: 25/16 * 1em;
    letter-spacing: 0.2px;
    font-weight: normal;

    span {
      font-weight: bold;
      font-style: normal;
      color: rgba($color: #5a5863, $alpha: 0.9);
    }

    @media screen and (min-width: $screen-xs) and (max-width: $screen-xl - 1px) {
      text-align: center;
      margin: auto;
      margin-bottom: 44px;
    }
  }

  &__logos {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding-left: 70px;

    @media screen and (min-width: $screen-xs) and (max-width: $screen-xl - 1px) {
      padding: 0;
    }
  }

  &__logos-row {
    width: 100%;
    height: 55px;
    margin-bottom: 38px;
    display: flex;
    justify-content: space-between;

    @media screen and (min-width: $screen-xs) and (max-width: $screen-xl - 1px) {
      margin: 0;
      &:first-child {
        display: none;
      }
    }
  }

  &__button {
    width: 200px;

    @media screen and (min-width: $screen-xs) and (max-width: $screen-xl - 1px) {
      margin: auto;
    }
    @media screen and (max-width: $screen-md - 1px) {
      margin: auto;
      width: 280px;
    }
  }

  &__wrap {
    height: 669px;
    background-image: radial-gradient(
      86.58% 86.58% at 50% 50%,
      #fdfdfd 0%,
      #f1f1f1 100%
    );
    display: flex;
    justify-content: center;
    align-items: flex-end;

    @media screen and (min-width: $screen-xs) and (max-width: $screen-xl - 1px) {
      max-width: 100%;
      height: 1010px;
    }
  }

  &__logo-item {
    @media screen and (min-width: $screen-xs) and (max-width: $screen-xl - 1px) {
      display: none;
    }
  }
}
</style>
