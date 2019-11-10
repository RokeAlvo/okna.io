<template lang="pug">
    section.section6
      h2.section6__header Лучшие предложения от застройщиков за апрель
      article.section6__cards
        ul
          li.zhk-card
            .zhk-card__img(style="")
              .zhk-card__promo  
                p Скидка до 3 000 ₽ на м
                  sup 2
            h3.zhk-card__title На Песочной
            p.zhk-card__description от 3 705 232 ₽
          li.zhk-card
            .zhk-card__img(style="")
              .zhk-card__promo  
                p Скидка до 3 000 ₽ на м
                  sup 2
            h3.zhk-card__title На Песочной
            p.zhk-card__description от 3 705 232 ₽
          li.zhk-card
            .zhk-card__img(style="")
              .zhk-card__promo  
                p Скидка до 3 000 ₽ на м
                  sup 2
            h3.zhk-card__title На Песочной
            p.zhk-card__description от 3 705 232 ₽
          li.zhk-card
            .zhk-card__img(style="")
              .zhk-card__promo  
                p Скидка до 3 000 ₽ на м
                  sup 2
            h3.zhk-card__title На Песочной
            p.zhk-card__description от 3 705 232 ₽
      .section6__button
        Button(title='Показать ещё 4 из 26', mods='secondary-color')
</template>
<script>
export default {
  components: {
    // Button
  }
}
</script>
<style lang="scss">
.section6 {
  padding: 127px 20px 0 20px;

  &__header {
    margin-bottom: 46px;
    text-align: center;
    font-style: normal;
    font-weight: normal;
    font-size: 24/14 * 1rem;
    line-height: 35/24 * 1em;
    color: $font-main2-color;
  }

  &__cards {
    margin-bottom: 80px;
    @media screen and (max-width: $screen-sm) {
      margin-bottom: 60px;
    }

    ul {
      display: flex;
      justify-content: center;
      margin-left: -10px;
      padding: 0;

      @media screen and (min-width: $screen-xs) and (max-width: $screen-xl - 1px) {
        flex-wrap: wrap;
      }

      li {
        margin-left: 10px;
        margin-bottom: 20px;
      }
    }
  }

  &__button {
    margin: auto;
    margin-bottom: 80px;
    width: 280px;
    height: 50px;
  }
}
// TODO вынести в отдельный компонент
.zhk-card {
  position: relative;
  width: 293px;
  box-shadow: 0px 16px 25px rgba(90, 88, 99, 0.1);
  border-radius: 4px;
  cursor: pointer;

  &:hover,
  &:focus,
  &:active {
    box-shadow: 0px 2px 4px rgba(66, 72, 77, 0.1);
  }

  &__img {
    width: 293px;
    height: 280px;
    border-radius: 4px 4px 0 0;
    margin-bottom: 20px;
    background-image: url('~static/images/na-pesochnoy.jpg');
  }

  &__promo {
    position: absolute;
    top: 10px;
    padding: 11px 14px 8px 19px;
    background: linear-gradient(101.5deg, #5dbf16 0%, #60d40c 100%);
    border-radius: 0px 4px 4px 0px;

    p {
      font-style: normal;
      font-weight: 500;
      font-size: 1rem;
      line-height: 20/14 * 1em;
      letter-spacing: 0.2px;
      color: #ffffff;
    }
  }

  &__title {
    font-style: normal;
    font-weight: 500;
    font-size: 18/14 * 1rem;
    line-height: 20/18 * 1em;
    letter-spacing: 0.1px;
    color: $font-main2-color;
    margin-bottom: 6px;
    padding-left: 20px;
  }

  &__description {
    border-radius: 0 0 4px 4px;
    font-style: normal;
    font-weight: normal;
    font-size: 1rem;
    line-height: 24/14 * 1em;
    color: $button-outlined-color;
    margin-bottom: 10px;
    padding-left: 20px;
  }
}
</style>
