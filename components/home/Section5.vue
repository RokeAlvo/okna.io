<template lang="pug">
    section.section5
      .section5__main
        .section5__promo
          h2.section5__header Одобрим ипотеку от 6% за 2 дня
          ul.section5__article
            li.section5__row 
              Icon(iconName="checkedIcon")
              p Бесплатное оформление без визита в банк
            li.section5__row 
              Icon(iconName="checkedIcon")
              p Одобрение в 98% случаев, даже если был отказ 
            li.section5__row
              Icon(iconName="checkedIcon")
              p Подадим за вас заявку во все ведущие банки
        .section5__arrow
          <svg width="263" height="50" viewBox="0 90 263 50" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M261.226 121.765C149.473 152.425 68.8545 126.484 1.44393 87.5643" stroke="#60CE78" stroke-width="2" stroke-linecap="round"/>
          <path d="M238.799 117.022C246.548 118.112 254.228 119.411 261.849 121.156" stroke="#60CE78" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M261.682 121.508C253.492 129.525 244.513 136.382 235.244 143.092" stroke="#60CE78" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        .section5__form
          FeedbackForm(formId='form2')
      .section5__logos 
        a(href="#")
          img(src="@/assets/home/images/sber.png")
        a(href="#")
          img(src="@/assets/home/images/vtb.png")
        a(href="#")
          img(src="@/assets/home/images/otkririe.png")
        a(href="#")
          img(src="@/assets/home/images/gazprom.png")
        a(href="#")
          img(src="@/assets/home/images/raifaizen.png")
        a(href="#")
          img(src="@/assets/home/images/alfa.png")
        //- a(href="#") 
        //-   p И еще 10+
</template>
<script>
import Icon from '@/components/Icon'
import FeedbackForm from '@/components/Feedback-form'

export default {
  components: {
    FeedbackForm,
    Icon
  }
}
</script>
<style lang="scss">
.section5 {
  width: 100%;
  min-height: 650px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-image: url('~assets/home/images/bg-image-sc5.jpg');

  @media screen and (min-width: $screen-xs) and (max-width: $screen-xl - 1px) {
    .feedback-form {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      align-items: flex-end;
      width: 100%;

      &__input-wrap {
        margin-right: 10px;
      }

      &__button {
        width: 280px;
        margin-bottom: 15px;
        margin-left: 10px;
      }

      &__policy {
        width: 100%;
        text-align: center;
      }
    }
  }

  &__main {
    max-width: 1200px;
    display: flex;
    margin-top: 130px;

    @media screen and (min-width: $screen-xs) and (max-width: $screen-xl - 1px) {
      display: flex;
      flex-direction: column;
      padding: 0 40px;
    }
    @media screen and (max-width: $screen-sm - 1px) {
      padding: 90px 21px;
      width: 100%;
    }
  }

  &__promo {
    width: 438px;

    @media screen and (min-width: $screen-md) and (max-width: $screen-xl - 1px) {
      display: flex;
      width: 100%;
    }
    @media screen and (max-width: $screen-sm) {
      flex-direction: column;
      width: 100%;
      max-width: 337px;
      margin-bottom: 51px;
    }
  }

  &__header {
    width: 420px;
    font-style: normal;
    font-weight: bold;
    font-size: 40/14 * 1rem;
    line-height: 54/40 * 1em;
    margin-bottom: 32px;
    color: $h4-color;
    @media screen and (max-width: $screen-sm) {
      width: 100%;
      font-size: 30/14 * 1rem;
    }
  }

  &__article {
    font-weight: 500;
    font-size: 16/14 * 1rem;
    line-height: 28/16 * 1em;
    color: $button-outlined-color;
    @media screen and (max-width: $screen-sm) {
      padding: 0;
    }

    p {
      margin-left: 12px;
      @media screen and (max-width: $screen-sm) {
        line-height: 23/14 * 1rem;
      }
    }
  }

  &__row {
    display: flex;
    align-items: center;
    @media screen and (max-width: $screen-sm) {
      padding: 0;
      margin-bottom: 10px;
      align-items: baseline;
    }

    p {
      color: $button-outlined-color;
    }
  }

  &__arrow {
    margin: 88px 0 0 auto;

    @media screen and (min-width: $screen-xs) and (max-width: $screen-xl - 1px) {
      display: none;
    }
  }

  &__form {
    justify-self: flex-end;
    margin-left: 30px;
    background: $bg-light;
    box-shadow: 0px 16px 25px rgba(90, 88, 99, 0.1);
    border-radius: 8px;
    padding: 24px 54px;

    @media screen and (max-width: $screen-sm - 1) {
      margin: 0;
      padding: 24px 20px 44px 20px;
    }
    @media screen and (min-width: $screen-sm) and (max-width: $screen-xl - 1px) {
      margin: 0;
      padding: 26px 54px 50px 54px;
    }

    .feedback-form__button {
      width: 100%;
      margin-left: 0;
    }

    .feedback-form__input-wrap {
      margin-right: 0;
    }
  }

  &__logos {
    display: flex;
    width: 1200px;
    justify-content: space-between;
    align-items: center;
    margin: 154px auto 88px auto;

    a,
    a.text:active,
    a.text:hover,
    a.text {
      color: inherit;
      text-decoration: inherit;
    }

    p {
      text-transform: uppercase;
    }

    @media screen and (min-width: $screen-xs) and (max-width: $screen-xl - 1px) {
      display: none;
    }
  }
}
</style>
