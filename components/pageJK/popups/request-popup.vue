<template>
  <div class="fixed-overlay--off" @click.self="closeRequestCall">
    <div v-if="!isSend" class="request-popup--fixed">
      <div class="close-popup" @click="closeRequestCall"></div>

      <div class="request-popup-content">
        Сейчас мы не в офисе, но можем позвонить вам в рабочее время
      </div>
      <div class="request-popup-req">Введите номер телефона</div>
      <div class="popup__input">
        <input
          v-model="phone"
          v-mask="'+7 (999) 999-99-99'"
          autocomplete="off"
          class="input__phone"
          inputmode="numeric"
          type="text"
          placeholder="+7 (___) ___-__-__"
        />
      </div>

      <div class="jk-btn--green" @click="validatePhone()">
        <div class="brn-text__req">Позвоните мне</div>
      </div>
      <div class="popup-conf request-popup-conf">
        Отправляя форму, вы соглашаетесь с
        <a href="#">Политикой конфиденциальности</a>
      </div>
    </div>
    <div v-else class="request-popup--fixed">
      <div class="close-popup" @click="closeRequestCall"></div>
      <div class="request-popup-content">
        Спасибо за заявку!
      </div>
      <div class="request-popup-req">
        Наш менеджер позвонит вам в течение 10 минут в рабочее время
      </div>

      <div class="btn--white">
        <div>Закрыть</div>
      </div>
    </div>
  </div>
</template>

<script>
import { Utils } from '@/utils/utils.js'
import { HTTP, Routes } from '@/components/server/API.js'

export default {
  props: {
    popupsArr: Array
  },
  data() {
    return {
      phone: '',
      notificationSystem: Utils.notificationSystem,
      requestCall: false
    }
  },

  methods: {
    closeRequestCall() {
      this.requestCall = false
      $('body').css('overflow', 'auto')
    },
    postReq(type) {
      const paramsPostBody = {
        client_phone: this.phone.replace(/[-()+_ ]/g, ''),
        type: 1,
        residential_complex_id: this.$store.state.currentJK.id
      }
      return new Promise((resolve, reject) => {
        HTTP.post(Routes.postPhone, paramsPostBody)
          .then(({ data }) => {
            console.log('Post reqJK')
            resolve(data)
            // console.log(data);
          })
          .catch((error) => {
            reject(error)
            console.log(error)
          })
      })
    },
    validatePhone() {
      if (
        Utils.helpers.validate(
          event,
          this.$el,
          this.phone,
          this.$toast,
          this.notificationSystem.options.error
        ) &&
        !this.isSend
      ) {
        this.isSend = true
        this.postReq()
          .then((resolve) => {
            this.isPost = resolve
            this.isSend = false
            console.log('resolve-' + resolve)
          })
          .catch((error) => {
            this.isSend = false
            console.log(error)
          })
      }
    }
  }
}
</script>

<style lang="scss">
.request-popup {
  &--fixed {
    background: #efeff1;
    height: 430px;
    position: relative;
  }

  &-content {
    font-weight: 800;
    font-size: 20px;
    line-height: 29px;
    text-align: center;
    letter-spacing: 0.1px;
    color: #5a5863;
    margin-top: 68px;
    margin-bottom: 29px;
  }

  &-req {
    margin-bottom: 20px;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 22px;
    text-align: center;
    letter-spacing: 0.1px;
    color: rgba($color: #5a5863, $alpha: 0.6);
    mix-blend-mode: normal;
  }

  &-conf {
    color: rgba($color: #5a5863, $alpha: 0.6);
    a {
      color: inherit;
    }
    /* #5A5863 */
  }
}
</style>
