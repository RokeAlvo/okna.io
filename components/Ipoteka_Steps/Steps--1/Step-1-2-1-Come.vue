<template>
  <div class="flowers-wrapper">
    <!-- <router-link :to="{name:'oneTwo'}" class="btn__back"></router-link> -->
    <div class="flowers-top">
      <div class="flowers-title">
        Ипотека с okna
        <sup>.io</sup>
      </div>

      <ul class="flowers-list">
        <li class="flowers-list__item">
          Бесплатное оформление без визита в банк
        </li>
        <li class="flowers-list__item">
          Получение ипотечного решения за 2 дня
        </li>
        <li class="flowers-list__item">Одобрение в 98% случаев</li>
        <li class="flowers-list__item">Подача заявки во все крупные банки</li>
      </ul>
    </div>
    <div class="flowers-bottom">
      <div class="credit-text">
        Получите одобрение по ипотеке от 6% в любом банке за 48 часов
      </div>

      <div class="request-text">
        Оставьте заявку и наш специалист поможет получить ипотеку по самой
        низкой ставке
      </div>

      <div class="input">
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
      <span class="ok__btn-container" @click.capture="validatePhone">
        <a class="ok__btn btn btn--green">Одобрить ипотеку</a>
      </span>

      <div class="rules-text">
        Оставляя заявку, вы соглашаетесь с
        <a href="#">Политикой конфиденциальности</a> сервиса okna.io
      </div>
    </div>
  </div>
</template>

<script>
import { HTTP, Routes } from '@/components/server/API.js'
import { Utils } from '@/utils/utils.js'

export default {
  data() {
    return {
      phone: '',
      notificationSystem: Utils.notificationSystem,
      isSend: false
    }
  },
  methods: {
    postReq() {
      const paramsPostBody = {
        client_phone: this.phone.replace(/[-()+_ ]/g, ''),
        type: 2
      }
      return new Promise((resolve, reject) => {
        HTTP.post(Routes.postPhone, paramsPostBody)
          .then(({ data }) => {
            console.log('Post reqJK')
            resolve(data)
          })
          .catch((error) => {
            reject(error)
            console.log(error)
          })
      })
    },
    checkRooms(e) {
      if (this.isLoading) {
        e.preventDefault()
      }
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
            this.$router.push({ name: 'welcome' })
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
.flowers-wrapper {
  margin-bottom: 30px;
}
.flowers-top {
  width: 100%;
  background: #f9f9f9 url('/img/ipoteka-modal-back.png') no-repeat center top;
  background-size: cover;
  padding-bottom: 60px;
  padding-top: 130px;
}

.flowers-title {
  font-weight: 300;
  line-height: 47px;
  font-size: 35px;
  text-align: center;

  color: #5dbf16;
}

.flowers-list {
  width: 250px;
  margin: 0 auto;
}

.flowers-list__item {
  position: relative;
  display: flex;
  line-height: 20px;
  font-size: 14px;

  color: #5d6369;

  margin-top: 14px;
  &::before {
    content: '';
    display: block;
    width: 14px;
    height: 12px;

    background-image: url('/img/check.svg');
    background-repeat: no-repeat;
    position: absolute;
    top: 3px;
    left: -20px;
  }
}

.flowers-bottom {
  width: 88%;
  margin: 0 auto;
  margin-top: 36px;
}

.credit-text {
  font-weight: 500;
  line-height: 27px;
  font-size: 20px;
  text-align: center;

  color: #5a5863;

  /* #5A5863 */
  opacity: 0.9;

  margin-bottom: 15px;
}

.request-text {
  line-height: 20px;
  font-size: 14px;
  text-align: center;

  color: #5a5863;

  /* #5A5863 */
  opacity: 0.7;
  margin-bottom: 30px;
}

.input {
  order: 2;
  height: 50px;
  text-align: center;
  margin-bottom: 20px;

  .input__phone {
    width: 100%;
    max-width: 320px;
    background: #fdfdfd;

    border-radius: 100px;
    padding: 12px 70px;
    line-height: 24px;
    font-size: 18px;
  }

  .input__error {
    border: 1px solid rgba(185, 86, 15, 0.3);
    color: #b37d57;

    opacity: 0.9;
  }
}

.ok__btn-container {
  order: 4;
}

.ok__btn {
  display: block;
  width: 300px;
  margin: 0 auto;

  padding: 16px 9px;
}

.rules-text {
  line-height: 16px;
  font-size: 12px;
  text-align: center;

  color: rgba(66, 72, 77, 0.5);
  margin-top: 68px;
  a {
    color: inherit;
    text-decoration: underline;
  }
}

@media (min-width: 768px) {
  .flowers-wrapper {
    width: 100%;

    margin-bottom: 32px;
  }
  .flowers-top {
    width: 100%;
    background: #fdfdfd url('/img/ipoteka-modal-back-2.png') no-repeat right;
    height: 479px;
    padding-top: 68px;
    margin-top: 60px;
  }

  .flowers-bottom {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 708px;
    margin-bottom: 21px;

    .credit-text {
      order: 1;
      line-height: 29px;
      font-size: 22px;
      width: 393px;
      letter-spacing: 0.3px;
      text-align: left;
    }

    .input {
      order: 2;
      width: 260px;
      input {
        width: 260px;
        padding: 16px 45px;
      }
    }
    .ok__btn {
      width: 260px;
      height: 50px;
      margin: 0;
    }

    .request-text {
      position: relative;
      order: 3;
      width: 48%;
      text-align: left;
      letter-spacing: 0.1px;
      &::after {
        content: '';
        position: absolute;
        display: block;
        width: 100px;
        height: 50px;
        background-image: url(/img/ipoteka-arrow.png);
        background-repeat: no-repeat;
        background-size: 119px;
        right: -102px;
        background-position-x: right;
        bottom: 24px;
      }
    }

    .rules-text {
      order: 5;
      margin: 0 auto;
      margin-top: 98px;
    }
  }

  .flowers-list {
    max-width: 643px;
    margin: 0 auto;
    width: 100%;
  }

  .flowers-title {
    text-align: left;
    font-weight: 300;
    font-size: 35px;
    letter-spacing: 0.5px;
    color: #5dbf16;
    padding-top: 63px;
    max-width: 712px;
    margin: 0 auto;
  }
}

@media (min-width: 1240px) {
  .flowers-title {
    font-weight: 300;
    font-size: 35px;
    letter-spacing: 0.5px;
    color: #5dbf16;

    text-align: left;
    padding-top: 52px;
    margin-left: 38px;
    margin-bottom: 29px;
  }
  .flowers-list {
    margin-left: 55px;
  }

  .flowers-wrapper {
    margin-bottom: 0;
  }

  .flowers-top {
    width: 100%;
    height: 300px;
    padding: 0;
    background: #f9f9f9 url('/img/ipoteka-modal-back.png') no-repeat center top;
    background-size: cover;

    border-radius: 16px 16px 0 0;
    margin: 0;
  }

  .flowers-bottom {
    width: 800px;
    .request-text {
      width: 43%;

      &::after {
        width: 155px;
        height: 92px;

        background-size: 152px;
        right: -150px;
        bottom: -17px;
      }
    }

    .input {
      width: 300px;
      input {
        width: 300px;
        padding: 12px 45px;
        padding-left: 78px;
      }
    }

    .ok__btn {
      width: 300px;
    }
  }
}
</style>
