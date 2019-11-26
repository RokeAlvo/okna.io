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
        Что делать, если нет первоначального взноса?
      </div>

      <div class="request-text">
        Оставьте заявку и наш специалист расскажет о способах решения этой
        ситуации
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
            // console.log(data);
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
            this.$router.push({ name: 'welcome' })
            this.isSend = false
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
  margin: 0;
  height: 100vh;
  min-height: 942px;
}

@media (min-width: 768px) {
  .flowers-wrapper {
    width: 100%;

    margin-bottom: 0;
  }

  .flowers-list__item {
    position: relative;
    line-height: 20px;
    font-size: 14px;

    display: flex;

    color: #5d6369;

    margin-top: 14px;
    &::before {
      content: '';
      display: block;
      width: 14px;
      height: 12px;
      align-self: center;
      margin-right: 10px;
      background-image: url('/img/check.svg');
      background-repeat: no-repeat;
    }
  }

  .flowers-bottom {
    width: 708px;
    margin: 0 auto;
    padding-top: 31px;
    .input {
      margin: 0;
    }
  }

  .credit-text {
    order: 1;
    line-height: 29px;
    font-size: 22px;
    width: 385px;
    text-align: left;
    letter-spacing: 0.3px;
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

  .rules-text {
    order: 5;
    margin: 0 auto;
    margin-top: 98px;
  }
}

@media (min-width: 1240px) {
  .flowers-wrapper {
    margin-bottom: 0;
    height: unset;
    min-height: unset;

    .btn__back {
      top: 240px;
    }
  }

  .ok__btn {
    width: 300px;
  }

  .credit-text {
    text-align: left;
  }

  .flowers-bottom {
    width: 800px;
    .request-text {
      width: 42%;

      &::after {
        width: 155px;
        height: 92px;

        background-size: 152px;
        right: -150px;
        bottom: -17px;
      }
    }
  }

  .input {
    width: 300px;
    input {
      width: 300px;
      padding: 12px 45px;
    }
  }
}
</style>
