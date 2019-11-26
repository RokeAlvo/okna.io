<template>
  <div class="popups-wrapper">
    <div
      v-for="popup in popupsArr"
      :key="popup.name"
      class="popups-item"
      :class="'popups-item--' + popup.name"
    >
      <div
        class="popups-item-overlay"
        :class="'popups-item-overlay--' + popup.name"
      >
        <div class="popup-title">{{ popup.title }}</div>
        <div
          :id="popup.name"
          class="button__detail"
          :class="'button__detail--' + popup.name"
          @click="showPopup(popup)"
        >
          Подробнее
        </div>
      </div>
    </div>
    <transition name="fade">
      <div
        v-if="isShow"
        class="fixed-overlay--off"
        :class="'fixed-overlay-' + this.name"
        @click.self="closePop"
      >
        <div class="popup--fixed" :class="'popup--fixed--' + this.name">
          <!-- v-click-outside="test" -->
          <div class="close-popup" @click="closePop">
            <label hidden="true"></label>
          </div>
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

          <div class="btn--orange">
            <div>{{ this.btnText }}</div>
          </div>
          <div class="popup-conf">
            Отправляя форму, вы соглашаетесь с
            <a href="#">Политикой конфиденциальности</a>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { clickOutSide } from './clickOutside.js'
export default {
  props: {
    popupsArr: Array
  },
  data() {
    return {
      phone: '',
      testIpo: false,
      name: '',
      title: '',
      content: '',
      reqText: '',
      btnText: '',
      background: '',
      isShow: false
    }
  },

  methods: {
    showPopup(item) {
      console.log(item)
      this.name = item.name
      this.title = item.title
      this.content = item.content
      this.reqText = item.reqText
      this.btnText = item.btnText
      this.background = item.bg
      this.isShow = true
      // $("body").css("overflow", "hidden");
    },
    // bad function
    closePop(e) {
      // console.log(e);
      // console.log(e.target.childElementCount);
      // if (e.target.childElementCount === 1) {
      //   this.isShow = false;
      //   // $("body").css("overflow", "auto");
      // }
      this.isShow = false
      $('body').css('overflow', 'auto')
      console.log('test')
    }
  }
}
</script>

<style lang="scss">
.fixed-overlay--off {
  display: flex;
  // display: none;
  // background: rgba($color: #2d3038, $alpha: 0.7);
  background: rgba($color: #2d3038, $alpha: 0.8);
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

  input {
    padding: 12px 30px;
    background: #fdfdfd;
    border: 1px solid rgba(167, 203, 213, 0.1);
    box-shadow: inset 0px 0px 4px rgba(90, 88, 99, 0.15);
    border-radius: 100px;
    width: 100%;
    font-size: 18px;
    line-height: 24px;
    text-align: center;
    letter-spacing: 1px;
    color: #5a5863;
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
}

.popup--fixed {
  position: relative;
  height: 430px;
  text-align: center;

  &--ipoteka {
    background: linear-gradient(
      87.31deg,
      #3fcd5e 34.25%,
      #26c051 99.99%,
      #26c051 100%
    );
  }

  &--payments {
    background: linear-gradient(87.31deg, #c0c335 34.25%, #b6ce25 100%);
  }

  &--trade-in {
    background: linear-gradient(87.31deg, #a194d9 34.25%, #d060d2 100%);
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
}

.popups-item {
  width: 100%;
  max-width: 352px;
  margin: 0 auto;
  height: 180px;
  margin-bottom: 10px;
  border-radius: 8px;

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
    }

    &--payments {
      background: linear-gradient(
        84.25deg,
        rgba(211, 214, 96, 0.92) 34.25%,
        rgba(183, 204, 55, 0.63) 100%
      );
    }

    &--trade-in {
      background: linear-gradient(
        84.25deg,
        rgba(161, 148, 217, 0.92) 34.25%,
        rgba(231, 125, 233, 0.63) 100%
      );
    }
  }
  &--ipoteka {
    background: url('/img/popup-ipoteka-bg.png') no-repeat;
  }
  &--payments {
    background: url('/img/popup-payments-bg.png') no-repeat;
  }
  &--trade-in {
    background: url('/img/popup-trade-in-bg.png') no-repeat;
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
    background: url('/img/underline.png') center;
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
</style>
