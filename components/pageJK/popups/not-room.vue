<template>
  <div class="not-room">
    <div class="not-room__label">Сейчас таких квартир нет в наличии</div>
    <div class="not-room__text">
      Возможно, они забронированы и скоро появятся в продаже
    </div>
    <div class="not-room__container">
      <div
        v-for="popup in popup_notFind"
        :key="popup.btnText"
        class="not-room__item"
        @click="showPopup(popup)"
      >
        <div class="not-room__item__text">{{ popup.label }}</div>
      </div>
    </div>
    <transition name="overlay">
      <div
        v-if="isShow"
        class="fixed-overlay--off"
        @click.self="closePop"
      ></div>
    </transition>
    <transition name="fade-popup">
      <div v-if="isShow" class="popup--fixed not-room__popup--fixed">
        <div class="close-popup" @click="closePop"></div>
        <div v-if="!isPost">
          <div class="not-room__popup__title">{{ this.title }}</div>
          <div class="not-room__popup__req">Введите номер телефона</div>
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
            class="jk-btn--green not-room__btn--green"
            @click="validatePhone(typePop)"
          >
            <div>{{ this.btnText }}</div>
          </div>
          <div class="popup-conf not-room__conf">
            Отправляя форму, вы соглашаетесь с
            <a href="/oferta.pdf" target="_blank"
              >Политикой конфиденциальности</a
            >
          </div>
        </div>
        <div v-else class="popup--fixed not-room__popup--fixed">
          <div class="close-popup" @click="closePop"></div>
          <div class="not-room__label-welcome">Спасибо за заявку!</div>
          <div class="not-room__text-welcome">{{ this.textWelcome }}</div>
          <div class="btn--white not-room__btn--white" @click="closePop">
            <div>Закрыть</div>
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
  data() {
    return {
      popup_notFind: [
        {
          typePop: 13,
          label: 'Сообщить о появлении квартир в продаже',
          popupTitle:
            'Узнайте сразу, как только нужная квартира снова появится в продаже',
          popupText:
            'Узнайте сразу, как только нужная квартира снова появится в продаже',
          btnText: 'Проверить бронирования',
          textWelcome:
            'Менеджер проверит актуальные брони и сообщит вам результаты в течение 10 минут в рабочее время'
        },
        {
          typePop: 14,
          label: 'Найти предложения инвесторов в этом ЖК',
          popupTitle:
            'Найдём нужный вариант среди предложений инвесторов в этом ЖК',
          popupText:
            'Найдём нужный вариант среди предложений инвесторов в этом ЖК',
          btnText: 'Найти квартиры от инвесторов',
          textWelcome:
            'Менеджер проверит все предложения инвесторов на вторичном рынке по этому комплексу и сообщит вам результаты в течение 10 минут в рабочее время'
        },
        {
          typePop: 15,
          label: 'Подобрать похожие квартиры поблизости',
          popupTitle: 'Получите подборку похожих вариантов в других комплексах',
          popupText: 'Получите подборку похожих вариантов в других комплексах',
          btnText: 'Сделать подборку',
          textWelcome:
            'Менеджер позвонит вам в течение 10 минут в рабочее время, чтобы уточнить параметры для поиска и пожелания по квартире'
        }
      ],
      phone: '',
      notificationSystem: Utils.notificationSystem,
      isShow: false,
      isPost: false,
      textWelcome: '',
      textWelcomeManager: '',
      textWelcomeBtnText: '',
      isSend: false,
      popupTitle: '',
      textWelcome: '',
      typePop: '',
      btnText: ''
    }
  },

  methods: {
    showPopup(item) {
      this.title = item.popupTitle
      this.content = item.content
      this.textWelcome = item.textWelcome
      this.btnText = item.btnText
      this.typePop = item.typePop
      this.isShow = true
      $('body').css('overflow', 'hidden')
    },
    closePop(e) {
      this.phone = null
      this.isShow = false

      this.isPost = false

      $('body').css('overflow', 'auto')
    },
    validatePhone(type) {
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
        this.postReq(type)
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

    postReq(type_req) {
      const paramsPostBody = {
        client_phone: this.phone.replace(/[-()+_ ]/g, ''),
        type: type_req,
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
@import '@/../sass/app.scss';

.not-room {
  display: none;

  background: rgba(90, 88, 99, 0.05);
  border-radius: 8px;
  padding: 120px 20px;
  margin: 0 40px;
  @include respond-to(tablet) {
    display: block;
  }

  @include respond-to(pc-md) {
    max-width: 1200px;
    margin: 0 auto;
  }

  &__label {
    font-weight: bold;
    font-size: 28px;
    line-height: 41px;
    text-align: center;
    letter-spacing: 0.1px;

    color: #5a5863;

    /* #5A5863 */
    mix-blend-mode: normal;
    opacity: 0.9;
    margin-bottom: 10px;
  }

  &__text {
    text-align: center;
    letter-spacing: 0.1px;

    color: #5a5863;

    /* #5A5863 */
    mix-blend-mode: normal;
    opacity: 0.7;
    max-width: 519px;
    margin-bottom: 50px;
    font-size: 16px;
    line-height: 25px;
    margin: 0 auto;
    margin-bottom: 28px;
  }

  &__container {
    display: flex;
    width: 100%;
    max-width: 750px;
    margin: 0 auto;
    justify-content: space-between;
  }

  &__item {
    cursor: pointer;
    background: linear-gradient(78.64deg, #3fcd5e 34.25%, #26c051 100%);
    opacity: 0.8;
    box-shadow: 0px 4px 8px rgba(66, 72, 77, 0.06);
    border-radius: 8px;
    width: 31.18%;
    max-width: 250px;

    &:active {
      transform: scale(0.95);
    }

    &__text {
      max-width: 210px;
      margin: 0 auto;
      font-style: normal;
      font-weight: 500;
      font-size: 14px;
      line-height: 20px;
      text-align: center;
      letter-spacing: 0.1px;

      color: #fdfdfd;

      padding: 20px 0;
    }
  }

  &__popup--fixed {
    // position: relative;
    background: #efeff1;
  }

  &__popup__title {
    font-weight: 800;
    font-size: 20px;
    line-height: 29px;
    text-align: center;
    letter-spacing: 0.1px;
    color: #5a5863;
    mix-blend-mode: normal;
    opacity: 0.9;
    width: 320px;
    margin: 0 auto;
    margin-top: 62px;
    margin-bottom: 31px;
  }

  &__popup__req {
    font-weight: 500;
    font-size: 14px;
    line-height: 22px;
    text-align: center;
    letter-spacing: 0.1px;
    color: #5a5863;
    mix-blend-mode: normal;
    opacity: 0.6;
    margin-bottom: 20px;
  }

  &__btn--green {
    div {
      background: #5dbf16;
      border-radius: 68px;
      padding: 15px 0;
      font-weight: 500;
      font-size: 14px;
      line-height: 20px;
      text-align: center;
      letter-spacing: 0.1px;
      color: #fdfdfd;
    }
  }

  &__btn--white {
    position: absolute;
    bottom: 0;
    left: calc(50% - 136px);
  }

  &__conf {
    color: #5a5863;
    opacity: 0.6;
    a {
      color: inherit;
    }
  }

  &__label-welcome {
    font-weight: 800;
    font-size: 24px;
    line-height: 35px;
    text-align: center;
    letter-spacing: 0.1px;

    color: #5a5863;

    /* #5A5863 */
    mix-blend-mode: normal;
    opacity: 0.9;
    margin-top: 82px;
    margin-bottom: 33px;
  }

  &__text-welcome {
    font-weight: 500;
    font-size: 14px;
    line-height: 22px;
    text-align: center;
    letter-spacing: 0.1px;

    color: #5a5863;

    /* #5A5863 */
    mix-blend-mode: normal;
    opacity: 0.6;
    min-width: 273px;
    width: 84%;
    max-width: 331px;
    margin: 0 auto;
  }
}
</style>
