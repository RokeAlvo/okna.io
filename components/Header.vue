<template lang="pug">
  .header
    .header__burger(@click='showNav')
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g opacity="0.5">
      <path d="M8.90566 13H31.0943C31.5943 13 32 12.552 32 12C32 11.448 31.5943 11 31.0943 11H8.90566C8.40574 11 8 11.448 8 12C8 12.552 8.40574 13 8.90566 13Z" fill="#5A5863"/>
      <path d="M8.90566 21H31.0943C31.5943 21 32 20.552 32 20C32 19.448 31.5943 19 31.0943 19H8.90566C8.40574 19 8 19.448 8 20C8 20.552 8.40574 21 8.90566 21Z" fill="#5A5863"/>
      <path d="M8.90566 29H31.0943C31.5943 29 32 28.552 32 28C32 27.448 31.5943 27 31.0943 27H8.90566C8.40574 27 8 27.448 8 28C8 28.552 8.40574 29 8.90566 29Z" fill="#5A5863"/>
      </g>
      </svg>
    .header__logo
      Logo
    .header__city.nav
      .nav__item.nav__item_selectable(@click='showCity') {{city}}
    nav.header__nav
     Nav
    .header__phone
      phone-number(phoneNumber='+7 (383) 895-26-64')
    modal(name="nav" :maxWidth='393' :height="'100%'" :adaptive='true' :reset='true' :pivotX='0' :pivotY='0')
      .modal-nav
        .modal-nav__column
          .modal-nav__logo
            Logo
            .nav__item.nav__item_selectable(@click='showCity') Новосибирск
          Nav
          .modal-nav__phone
            phone-number(phoneNumber='+7 (383) 895-26-64')
        .modal-nav__close-aria(@click='hideNav')
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 17L9 9.08429L0.999999 0.999968" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M17.0002 17L9.00024 9.08429L17.0002 0.999968" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
    modal(name='city' adaptive :width='500' :minHeight='354' )
      ModalCity(activeCity='Новосибирск' :hide='hideCity')

</template>
<script>
import Logo from '~/components/Logo'
import Nav from '~/components/Nav'
import PhoneNumber from '~/components/PhoneNumber'
import ModalCity from '~/components/ModalCity'

export default {
  components: {
    Logo,
    Nav,
    PhoneNumber,
    ModalCity
  },
  props: {
    city: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      open: false
    }
  },
  methods: {
    showNav() {
      this.$modal.show('nav')
    },
    hideNav() {
      this.$modal.hide('nav')
    },
    showCity() {
      this.hideNav()
      this.$modal.show('city')
    },
    hideCity() {
      this.$modal.hide('city')
    }
  }
}
</script>

<style lang="scss">
.header {
  height: 60px;
  position: sticky;
  top: 0;
  z-index: 10;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background: $bg-light;
  text-transform: uppercase;
  min-height: 100%;
  box-shadow: 0px 16px 25px rgba(66, 72, 77, 0.05);
  color: $font-main2-color;
  font-weight: 500;

  &__burger {
    display: none;
    cursor: pointer;
    margin-left: 12px;

    @media screen and (min-width: $screen-xs) and (max-width: $screen-xl - 1px) {
      display: block;
    }

    &:hover svg path {
      fill: $font-hover-color;
    }
  }

  &__logo {
    margin-left: 40px;

    @media screen and (min-width: $screen-xs) and (max-width: $screen-xl - 1px) {
      display: none;
    }
  }

  &__city {
    margin-left: 24px;
    @media screen and (min-width: $screen-xs) and (max-width: $screen-xl - 1px) {
      display: none;
    }
  }

  &__nav {
    margin-left: 90px;

    @media screen and (min-width: $screen-xs) and (max-width: $screen-xl - 1px) {
      display: none;
    }
  }

  &__phone {
    margin: 0 40px 0 auto;
    a,
    a.text:active,
    a.text:hover,
    a.text {
      color: inherit;
      text-decoration: inherit;
    }

    @media screen and (min-width: $screen-xs) and (max-width: $screen-xl - 1px) {
      margin: 0 20px 0 auto;
    }
  }
}
.nav {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  list-style: none;
  padding: 0;
  @media screen and (max-width: $screen-xl) {
    flex-direction: column;
  }
  &__item {
    margin-left: 32px;

    &:hover {
      color: $font-hover-color;
      cursor: pointer;
    }

    &_active {
      color: $font-hover-color;
    }

    &_selectable {
      display: flex;
      justify-content: flex-start;
      align-items: center;

      &::after {
        width: 1em;
        height: 1em;
        content: '';
        background: url('~assets/expand.svg') no-repeat center center;
        display: block;
        margin-left: 8px;
      }
    }

    a,
    a.text:active,
    a.text:hover,
    a.text {
      color: inherit;
      text-decoration: inherit;
    }
  }

  &__item:first-child {
    margin-left: 0;
  }
}

.modal-nav {
  display: flex;
  flex-flow: row nowrap;
  height: 100%;
  * {
    margin: 0;
    align-self: flex-start;
  }

  &__column {
    min-width: 270px;
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  &__logo {
    width: 100%;
    padding: 26px 40px 0 40px;
    background: radial-gradient(90% 90% at 35.17% 0%, #fdfdfd 0%, #f1f1f1 100%);

    & svg {
      margin-bottom: 30px;
    }
  }

  .nav {
    padding: 40px;
    margin-bottom: auto;

    &__item {
      margin-bottom: 37px;
    }
  }
  &__phone {
    margin-top: auto;
    align-self: center;
    margin-bottom: 40px;
    font-size: 20px;
    a {
      text-decoration: none;
      color: inherit;
    }
  }

  &__close-aria {
    background: #2d3038;
    opacity: 0.7;
    min-width: 393px - 270px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    svg {
      margin: auto auto;
    }
  }
}
</style>
