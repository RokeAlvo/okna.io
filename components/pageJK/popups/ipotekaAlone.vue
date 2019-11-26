<template>
  <div class="popups-wrapper popups-wrapper--alone">
    <div
      class="popups-item"
      :class="[
        weight < 1224
          ? 'popups-item--' + this.popupsArr[0].name
          : 'popups-item--' + this.popupsArr[0].name + '--alone'
      ]"
    >
      <div
        v-if="weight < 1224"
        class="popups-item-overlay"
        :class="'popups-item-overlay--' + this.popupsArr[0].name"
        @click="
          showPopup(popupsArr[0])
          $metrika.reachGoal('click-mortgage')
        "
      >
        <div class="popup-title">{{ this.popupsArr[0].title }}</div>
        <div
          :id="this.popupsArr[0].name"
          class="button__detail"
          :class="'button__detail--' + this.popupsArr[0].name"
          @click="showPopup(popupsArr[0])"
        >
          Подробнее
        </div>
      </div>
      <!-- else -->
      <div
        v-else
        class="popups-item-overlay popups-item-overlay--ipoteka popups-item-overlay--ipoteka--alone"
      >
        <div class="ipoteka-alone-left">
          <div class="ipoteka-alone__title">Одобрим ипотеку от 6% за 2 дня</div>
          <ul class="ipoteka-advantages-list">
            <li class="ipoteka-advantages-list__item">
              Бесплатное оформление без визита в банк
            </li>
            <li class="ipoteka-advantages-list__item">
              Одобрение в 98% случаев, даже если был отказ
            </li>
            <li class="ipoteka-advantages-list__item">
              Подадим за вас заявку во все ведущие банки
            </li>
          </ul>
        </div>

        <div class="ipoteka-alone-right">
          <div class="popup-req">Введите номер телефона</div>
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

          <div
            class="btn--orange"
            @click="
              validatePhone()
              $metrika.reachGoal('submit-mortgage')
            "
          >
            <div>Одобрить ипотеку</div>
          </div>
          <div class="popup-conf">
            Отправляя форму, вы соглашаетесь с
            <a href="/oferta.pdf" target="_blank"
              >Политикой конфиденциальности</a
            >
          </div>
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

          <div
            class="btn--orange"
            @click="
              validatePhone()
              $metrika.reachGoal('submit-mortgage')
            "
          >
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
      btnOrangeText: '',
      background: '',
      isShow: false,
      isPost: false,
      textWelcome: '',
      textWelcomeManager: '',
      textWelcomeBtnText: '',
      isSend: false,
      weight: 0
    }
  },

  updated() {
    this.elWei()
  },

  mounted() {
    this.elWei()
    window.addEventListener('resize', this.elWei)
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
          // paramsPostBody
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
    },

    postReq() {
      const paramsPostBody = {
        client_phone: this.phone.replace(/[-()+_ ]/g, ''),
        type: 2,
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
    elWei() {
      this.weight = this.$root.$el.clientWidth
    }
  }
}
</script>

<style lang="scss">
@import '@/../sass/app.scss';

.ipoteka-advantages-list {
  padding-left: 41px;
  &__item {
    position: relative;
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    letter-spacing: 0.1px;
    color: #ffffff;
    padding-left: 32px;
    margin-bottom: 9px;
    &::before {
      content: '';
      display: block;
      position: absolute;
      width: 20px;
      height: 21px;
      background: url(/img/jk-check--yelow.svg) no-repeat center;
      background-size: 18px;
      left: 0;
    }
  }
}

.test__test {
  width: 420px;
  height: 440px;
  background: red;
}
.fixed-overlay--off {
  display: flex;
  background: rgba($color: #2d3038, $alpha: 0.8);
  // background: rgba($color: #2d3038, $alpha: 0.8);
  height: 100%;
  position: fixed;
  bottom: 0;
  width: 100%;
  left: 0;
  z-index: 103;

  flex-direction: column;
  justify-content: flex-end;
}

.fixed-overlay--on {
  display: flex;
}

.popup__input {
  max-width: 273px;
  margin: 0 auto;
  margin-bottom: 15px;

  .input__error {
    border: 1px solid rgba(185, 86, 15, 0.3);
    color: #b37d57;
  }
}

.popup-conf {
  width: 195px;
  margin: 0 auto;

  font-weight: 500;
  font-size: 10px;
  line-height: 16px;
  text-align: center;
  letter-spacing: 0.1px;

  color: #fdfdfd;
  a {
    color: #fdfdfd;
    text-decoration: underline;
  }
}

.btn--orange {
  width: 272px;
  margin: 0 auto;
  margin-bottom: 28px;
  border-radius: 100px;
  div {
    padding: 15px 30px;
    widows: 100%;
    background: #edd819;
    mix-blend-mode: normal;
    box-shadow: 0px 8px 15px rgba(66, 72, 77, 0.1);
    border-radius: 68px;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    text-align: center;
    letter-spacing: 0.1px;

    color: rgba($color: #5a5863, $alpha: 0.8);

    /* #5A5863 */
  }
}

.btn--white {
  width: 272px;
  margin: 0 auto;
  margin-bottom: 28px;
  border-radius: 100px;
  div {
    padding: 15px 30px;
    widows: 100%;
    background: #ffffff;
    /* 16 px */
    box-shadow: 0px 16px 25px rgba(66, 72, 77, 0.1);
    border-radius: 100px;
    mix-blend-mode: normal;

    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    text-align: center;
    letter-spacing: 0.1px;

    color: rgba($color: #5a5863, $alpha: 0.5);

    /* #5A5863 */
  }
}

.popup-content {
  margin: 0 auto;
  max-width: 301px;
  margin-bottom: 37px;
  font-weight: 800;
  font-size: 20px;
  line-height: 29px;
  text-align: center;
  letter-spacing: 0.1px;

  color: #ffffff;

  mix-blend-mode: normal;

  &--welcome {
    margin: 0 auto;
    margin-top: 92px;
    margin-bottom: 32px;

    max-width: 301px;
    margin-bottom: 37px;
    font-weight: 800;
    font-size: 20px;
    line-height: 29px;
    text-align: center;
    letter-spacing: 0.1px;

    color: #ffffff;

    mix-blend-mode: normal;
  }
}

.popup-req {
  margin-bottom: 20px;
  font-weight: 500;
  font-size: 14px;
  line-height: 22px;
  text-align: center;
  letter-spacing: 0.1px;

  color: #fdfdfd;

  /* #FDFDFD */
  mix-blend-mode: normal;

  &--welcome {
    font-weight: 500;
    font-size: 14px;
    line-height: 22px;
    text-align: center;
    letter-spacing: 0.1px;

    color: #fdfdfd;

    /* #FDFDFD */
    mix-blend-mode: normal;
    max-width: 300px;
    margin: 0 auto;
    margin-bottom: 103px;
  }
}

.popup--fixed {
  position: fixed;
  height: 430px;
  text-align: center;
  bottom: 0;
  width: 100%;
  left: 0;
  z-index: 99999;

  @include respond-to(tablet) {
    width: 420px;
    height: 440px;
    position: fixed;
    top: calc(50% - 220px);
    left: calc(50% - 210px);
    border-radius: 8px;
  }

  &--ipoteka {
    background: linear-gradient(
      87.31deg,
      #3fcd5e 34.25%,
      #26c051 99.99%,
      #26c051 100%
    );
  }
}

.close-popup {
  cursor: pointer;
  position: absolute;
  display: block;
  width: 40px;
  height: 40px;
  background: url('/img/close-icon.svg') no-repeat center;
  left: calc(50% - 20px);
  top: -50px;

  @include respond-to(tablet) {
    background: url('/img/close-icon--dark.svg') no-repeat center;
    top: 0;
    right: 0;
    left: unset;
  }
}

.popups-item {
  width: 100%;
  max-width: 590px;
  margin: 0 auto;
  height: 180px;
  margin-bottom: 10px;
  border-radius: 8px;
  @include respond-to(pc-md) {
    height: 200px;
  }
  &-overlay {
    display: none;
    width: 100%;
    height: 100%;
    border-radius: 8px;

    display: flex;
    flex-direction: column;
    justify-content: flex-end;

    &--ipoteka {
      background: linear-gradient(
        84.25deg,
        rgba(63, 205, 94, 0.92) 34.25%,
        rgba(38, 192, 81, 0.63) 100%
      );

      &--alone {
        flex-direction: row;
        justify-content: space-between;
      }
    }
  }
  &--ipoteka {
    background: url('/img/popup-ipoteka-bg.jpg') no-repeat center;

    &--alone {
      max-width: 1200px;
      height: 310px;
      background: url('/img/ipoteka-alone.jpg') no-repeat center;
    }
  }
}

.ipoteka-alone {
  &__title {
    font-weight: 800;
    font-size: 34px;
    line-height: 50px;
    letter-spacing: 0.1px;
    color: #ffffff;
    width: 390px;
    padding: 36px 0 39px 40px;
  }
  &-right {
    width: 32.75%;
    background: linear-gradient(
      86.27deg,
      #3fcd5e 34.25%,
      #26c051 99.99%,
      #26c051 100%
    );
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-radius: 0px 8px 8px 0px;
  }

  &-left {
    position: relative;
    width: 61%;
    &::after {
      cursor: pointer;
      content: '';
      position: absolute;
      display: block;
      width: 252px;
      height: 100px;
      background: url(/img/arrow-yellow.svg) no-repeat center;
      right: 0;
      top: 68px;
      background-size: 253px;
    }
  }
}

.popup-title {
  font-weight: 800;
  font-size: 26px;
  line-height: 30px;
  letter-spacing: 0.2px;

  color: #ffffff;

  text-shadow: 0px 14px 25px rgba(27, 27, 30, 0.2);
  padding-bottom: 9px;
  padding-left: 20px;

  &--fixed {
    padding-top: 31px;
    margin-bottom: 33px;
    font-weight: 500;
    font-size: 16px;
    line-height: 25px;
    text-align: center;
    letter-spacing: 0.1px;
    text-transform: uppercase;

    color: #ffffff;
  }
}

.button__detail {
  cursor: pointer;
  position: relative;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.1px;

  color: #fdfdfd;
  width: 115px;
  /* #FDFDFD */
  opacity: 0.8;
  // padding: 0 0 24px 20px;
  margin: 0 0 24px 20px;

  &::after {
    content: '';
    position: absolute;
    display: block;
    width: 86px;
    height: 1px;
    background: url('/img/underline.svg') center;
    right: 28px;
  }

  &::before {
    content: '';
    position: absolute;
    display: block;
    width: 20px;
    height: 20px;
    background: url('/img/arrow-jk.svg') no-repeat center;
    right: 0;
  }
}

@media (min-width: 768px) {
  .popup-title {
    font-size: 22px;
    line-height: 30px;
  }
}
</style>
