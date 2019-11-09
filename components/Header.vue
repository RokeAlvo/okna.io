<template lang="pug">
  .header
    .header__burger
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
      .nav__item.nav__item_selectable 
        a(href="#") Новосибирск
    nav.header__nav
      ul.nav
        li.nav__item.nav__item_active
          a(href="#") Главная
        li.nav__item 
          a(href="#") Новостройки
        li.nav__item 
          a(href="#") Застройщики
        li.nav__item 
          a(href="#") Ипотека
    .header__phone
      a(href="tel: +73838952664")
        .phone
          .phone__icon
          .phone__number +7 (383) 895-26-64</template>
<script>
import Logo from '~/components/Logo'

export default {
  components: {
    Logo
  }
}
</script>

<style lang="scss">
/* @import '~/assets/variables.scss'; */

.header {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background: $bg-light;
  text-transform: uppercase;
  min-height: 100%;
  box-shadow: 0px 16px 25px rgba(66, 72, 77, 0.05);

  &__burger {
    display: none;
    cursor: pointer;
    margin-left: 12px;

    @media screen and (min-width: $screen-xs) and (max-width: $screen-xl - 1px) {
      display: block;
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
</style>
