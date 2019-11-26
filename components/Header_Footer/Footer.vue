<template>
  <div class="ipoteka-footer">
    <a class="footer__logo-link"> </a>

    <!-- <ul class="footer-list">
      <li class="footer-list__item menu__item">
        <a href="#">Главная</a>
      </li>
      <li class="footer-list__item menu__item">
        <a href="#">Новостройки</a>
      </li>
      <li class="footer-list__item menu__item">
        <a href="#">Застройщики</a>
      </li>
      <li class="footer-list__item menu__item">
        <a href="#">Ипотека</a>
      </li>
      <li class="footer-list__item menu__item">
        <a href="#">Контакты</a>
      </li>
    </ul> -->
    <ul class="footer-list">
      <li v-for="(item, index) in menu" :key="index" class="footer-list__item">
        <a :href="item.route">{{ item.title }}</a>
      </li>
    </ul>
    <a
      href="tel:+73833884896"
      class="change-phone footer-menu__phone"
      @click="$metrika.reachGoal('click-call-btn-header.number')"
      >+7 (383) 388-48-96</a
    >

    <a href="/oferta.pdf" target="_blank" class="confend footer-confend"
      >Политика конфиденциальности</a
    >
  </div>
</template>

<script>
export default {
  computed: {
    menu() {
      return this.$store.state.menuList
    }
  },
  updated() {
    this.phoneChange()
  },
  methods: {
    phoneChange() {
      setTimeout(function() {
        const phone = document.getElementsByClassName(
          'phone-number main-phone'
        )[0].textContent
        const tel = phone.replace(/[^0-9]/gi, '')
        const inPhone = document.getElementsByClassName('change-phone')
        const inPhoneText = document.getElementsByClassName(
          'change-phone--text'
        )
        for (let i = 0; i < inPhone.length; i++) {
          inPhone[i].innerHTML = ''
          inPhone[i].innerHTML = phone
          inPhone[i].setAttribute('href', 'tel:+' + tel)
        }
        for (let i = 0; i < inPhoneText.length; i++) {
          inPhoneText[i].setAttribute('href', 'tel:+' + tel)
        }
      }, 1500)
    }
  }
}
</script>

<style lang="scss">
@import '@/../sass/app.scss';

.ipoteka-footer {
  height: 580px;
  background: #fdfdfd;
  display: flex;
  flex-direction: column;
  align-items: center;
  @include respond-to(pc-md) {
    flex-direction: row;
    flex-wrap: wrap;
    height: 140px;
    max-width: 1280px;
    margin: 0 auto;
    align-items: flex-start;
  }
}

.footer {
  &__logo-link {
    display: block;
    background: url('/img/light-logo.svg') no-repeat top;

    height: 33px;
    width: 105px;
    margin-bottom: 60px;
    margin-top: 40px;
    margin-left: 22px;

    @include respond-to(pc-md) {
      margin: 21px 59px 0px 38px;
    }
  }

  &-list {
    line-height: 25px;
    font-size: 16px;
    text-align: center;
    margin-bottom: 30px;

    @include respond-to(pc-md) {
      display: flex;
      margin-bottom: 0;
      margin-top: 16px;
      width: 48%;
      margin-right: auto;
      margin-top: 35px;
    }

    &__item {
      font-weight: 500;
      font-size: 16px;
      line-height: 25px; /* identical to box height */
      text-align: center;
      letter-spacing: 0.2px;
      text-transform: uppercase;
      margin-bottom: 34px;

      @include respond-to(pc-md) {
        font-size: 14px;
        line-height: 22px;

        margin-bottom: 0;
        margin-right: 41px;
      }

      a {
        color: rgba($color: #5a5863, $alpha: 0.8);

        /* #5A5863 */
      }

      &:hover {
        opacity: 0.5;
      }
    }
  }

  &-menu__phone {
    position: relative;
    font-size: 26px;
    font-weight: 500;
    line-height: 24px; /* or 92% */
    display: flex;
    align-items: flex-end;
    text-align: right;
    letter-spacing: 0.1px;
    padding-left: 31px;

    color: #5a5863;

    /* #5A5863 */
    opacity: 0.9;

    @include respond-to(pc-md) {
      font-size: 20px;
      line-height: 24px;
      margin-right: 48px;
      margin-top: 33px;
    }

    &::before {
      content: '';
      display: block;
      position: absolute;

      height: 25px;
      background: url(/img/phone-icon.svg) no-repeat center;
      width: 25px;
      top: 0px;
      left: 0px;
      background-size: 25px;

      @include respond-to(pc-md) {
        top: 0px;
        left: 0px;
        background-size: 20px;
      }
    }
  }

  &-confend {
    margin-top: 41px;
    @include respond-to(pc-md) {
      font-size: 14px;
      line-height: 16px;

      margin: 15px 0 0 41px;
    }
  }
}

.logo-text {
  padding-top: 33px;
  margin-left: 23px;
  display: flex;
  flex-direction: column;
}

.footer__confend {
  font-size: 12px;

  text-decoration: underline;

  color: #fdfdfd;
  opacity: 0.5;

  &:hover {
    color: #a9a9a9;
  }
}

.footer-list .footer-phone {
  display: flex;
  flex-direction: column;
  margin-left: 24px;
}

.footer-phone_number {
  font-weight: 500;
  font-size: 20px;
  letter-spacing: 0.5px;

  color: #ffffff;
}

.phone_number--bot {
  line-height: 20px;
  font-size: 14px;

  color: #fdfdfd;

  /* #FDFDFD */
  opacity: 0.5;
}
</style>
