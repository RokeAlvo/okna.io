<template>
  <div class="popups-wrapper">
    <div class="popups-item" :class="'popups-item--' + this.popupsArr[2].name">
      <div
        class="popups-item-overlay"
        :class="'popups-item-overlay--' + this.popupsArr[2].name"
        @click="
          showPopup(popupsArr[2])
          $metrika.reachGoal('click-tradein')
        "
      >
        <div class="popup-title">{{ this.popupsArr[2].title }}</div>
        <div
          :id="this.popupsArr[2].name"
          class="button__detail"
          :class="'button__detail--' + this.popupsArr[2].name"
          @click="showPopup(popupsArr[2])"
        >
          Подробнее
        </div>
      </div>
    </div>
    <transition name="overlay">
      <div
        v-show="isShow"
        class="fixed-overlay--off"
        :class="'fixed-overlay-' + this.name"
        @click.self="closePop"
      ></div>
    </transition>
    <transition name="fade-popup">
      <div
        v-if="isShow"
        class="popup--fixed"
        :class="'popup--fixed--' + this.name"
      >
        <div class="close-popup" @click="closePop"></div>
        <div v-if="!isPost">
          <div class="popup-title--fixed">{{ this.title }}</div>
          <div class="popup-content">{{ this.content }}</div>
          <div class="popup-req">{{ this.reqText }}</div>
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

          <div class="btn--orange" @click="validatePhone()">
            <div>{{ this.btnOrangeText }}</div>
          </div>
          <div class="popup-conf">
            Отправляя форму, вы соглашаетесь с
            <a href="/oferta.pdf" target="_blank"
              >Политикой конфиденциальности</a
            >
          </div>
        </div>

        <div v-else class="popup--fixed" :class="'popup--fixed--' + this.name">
          <div class="close-popup" @click="closePop"></div>

          <div class="popup-content--welcome">{{ this.textWelcome }}</div>
          <div class="popup-req--welcome">{{ this.textWelcomeManager }}</div>

          <div class="btn--white" @click="closePop">
            <div>{{ this.textWelcomeBtnText }}</div>
          </div>
        </div>
      </div>
    </transition>
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
      testIpo: false,
      name: '',
      title: '',
      content: '',
      reqText: '',
      btnText: '',
      background: '',
      isShow: false,
      isPost: false,
      textWelcome: '',
      textWelcomeManager: '',
      textWelcomeBtnText: '',
      isSend: false
    }
  },

  methods: {
    showPopup(item) {
      this.name = item.name
      this.title = item.title
      this.content = item.content
      this.reqText = item.reqText
      this.btnOrangeText = item.btnOrangeText
      this.background = item.bg
      this.textWelcome = item.textWelcome
      this.textWelcomeManager = item.textWelcomeManager
      this.textWelcomeBtnText = item.textWelcomeBtnText
      this.isShow = true
      $('body').css('overflow', 'hidden')
    },

    closePop(e) {
      this.phone = null
      this.isShow = false
      this.name = null
      this.title = null
      this.content = null
      this.reqText = null
      this.btnOrangeText = null
      this.background = null
      this.textWelcome = null
      this.textWelcomeManager = null
      this.textWelcomeBtnText = null
      this.isPost = false
      $('body').css('overflow', 'auto')
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
            this.$metrika.reachGoal('submit-tradein')
          })
          .catch((error) => {
            this.isSend = false
            console.log(error)
          })
      }
    },

    postReq() {
      const paramsPostBody = {
        client_phone: this.phone.replace(/[-()+_ ]/g, ''),
        type: 12,
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
    }
  }
}
</script>

<style lang="scss">
.popup--fixed {
  &--trade-in {
    background: linear-gradient(87.31deg, #a194d9 34.25%, #d060d2 100%);
  }
}

.popups-item {
  &-overlay {
    &--trade-in {
      background: linear-gradient(
        84.25deg,
        rgba(161, 148, 217, 0.92) 34.25%,
        rgba(231, 125, 233, 0.63) 100%
      );
    }
  }

  &--trade-in {
    background: url('/img/popup-trade-in-bg.jpg') no-repeat center;
  }
}
</style>
