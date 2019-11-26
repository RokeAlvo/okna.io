<template lang="pug">
  form(v-on:submit.prevent='onSubmit' :id='formId').feedback-form
    .feedback-form__input-wrap
      h3.feedback-form__input-title Введите номер телефона
      .feedback-form__input-phone
        InputText(type='tel' placeholder='+7 (___) ___-__-__'  )
    .feedback-form__button
      Button(title='Получить подборку' mods='main-color,raised' )
    .feedback-form__policy Отправляя форму, вы соглашаетесь с 
      i 
        <router-link to="/oferta">Политикой конфиденциальности</router-link>
</template>
<script>
import InputText from '@/components/home/InputText'

export default {
  components: {
    InputText
  },
  // eslint-disable-next-line vue/require-prop-types
  props: ['formId'],
  methods: {
    onSubmit(e) {
      const URL = ''
      const phone = e.target[0].value
      fetch(URL, {
        method: 'POST',
        body: JSON.stringify({ phone }),
        headers: { 'content-type': 'application/json' }
      })
    }
  }
}
</script>
<style lang="scss">
.feedback-form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 280px;

  @media screen and (max-width: $screen-sm) {
    width: auto;
    max-width: 280px;
  }

  &__input-title {
    margin-bottom: 26px;
    text-align: center;
  }

  &__input-phone {
    margin-bottom: 15px;
  }

  &__button {
    width: 100%;
    margin-bottom: 26px;
  }

  &__policy {
    width: 195px;
    font-style: normal;
    font-weight: 500;
    font-size: 10/14 * 1rem;
    line-height: 1.6em;
    letter-spacing: 0.1px;

    /* #5A5863 */
    color: rgba($color: $font-main2-color, $alpha: 0.6);
  }
}
</style>
