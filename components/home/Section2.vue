<template lang="pug">
    section.section2
      .section2__slogan
        h2.section2__header Бесплатный подбор квартиры в один клик
        article.section2__article 
          | Отсейте все неподходящие варианты одним махом 
          | и получите персональную подборку подходящих ЖК с планировками и ценами
      .section2__triangle
      .section2__form
        FeedbackForm
      .section2__image
</template>
<script>
import FeedbackForm from '@/components/Feedback-form.vue'

export default {
  components: {
    FeedbackForm
  }
}
</script>
<style lang="scss">
.section2 {
  position: absolute;
  top: 690px;
  left: calc(100vw / 2 - 600px);
  margin: auto;
  height: 330px;
  width: 1200px;
  box-shadow: 0px 16px 25px rgba(90, 88, 99, 0.1);
  border-radius: 8px;
  display: flex;
  background: #f1f1f1;

  @media screen and (min-width: $screen-md) and (max-width: $screen-xl - 1px) {
    display: block;
    width: calc(100vw - 80px);
    max-height: 620px;
    left: 40px;
    margin: auto;
    height: auto;
  }

  &__slogan {
    min-width: 531px;
    height: 100%;
    width: 531px;
    padding: 75px 0 0 67px;
    background: $bg-light;

    @media screen and (min-width: $screen-md) and (max-width: $screen-xl - 1px) {
      width: 100%;
      display: block;
      padding-bottom: 51px;
    }
  }

  &__header {
    max-width: 406px;
    font-style: normal;
    font-weight: normal;
    font-size: 30/14 * 1rem;
    line-height: 44/30 * 1em;
    color: #5a5863;
    margin-bottom: 12/14 * 1rem;
  }

  &__article {
    max-width: 406px;
    font-style: normal;
    font-weight: normal;
    font-size: 16/14 * 1rem;
    line-height: 27/16em;
    color: rgba($color: #5a5863, $alpha: 0.7);

    @media screen and (min-width: $screen-md) and (max-width: $screen-xl - 1px) {
    }
  }

  &__triangle {
    width: 0;
    height: 0;
    border: 165px solid transparent;
    border-left: 26px solid $bg-light;

    @media screen and (min-width: $screen-md) and (max-width: $screen-xl - 1px) {
      border-left: calc(50vw - 40px) solid transparent;
      border-right: calc(50vw - 40px) solid transparent;
      border-top: 26px solid $bg-light;
    }
  }

  &__form {
    position: relative;
    left: 53 - 153px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    @media screen and (min-width: $screen-md) and (max-width: $screen-xl - 1px) {
      position: relative;
      left: -25vw;
      top: -130px;
      display: flex;
      justify-content: flex-start;

      .feedback-form {
      }
    }
  }

  &__image {
    display: inline-block;
    min-width: 460px;
    min-height: 546px;
    background-image: url('~assets/home/section2/phone.png');
    position: relative;
    left: -10.67%;
    top: -15.15%;
    // bottom: -50.3%;

    @media screen and (min-width: $screen-md) and (max-width: $screen-xl - 1px) {
      top: -550px;
      left: 45vw;
    }
  }
}
</style>
