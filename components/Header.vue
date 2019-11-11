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
            //- <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            //-   <path fill-rule="evenodd" clip-rule="evenodd" d="M20.5053 19.264L19.0641 20.7055C18.8068 20.9625 18.0533 21.1228 18.0291 21.1228C13.4697 21.1625 9.07969 19.3716 5.85415 16.1458C2.61979 12.9096 0.826797 8.50395 0.874949 3.9292C0.874949 3.9292 1.03996 3.19527 1.29704 2.94064L2.7382 1.49926C3.26558 0.96944 4.27863 0.730015 4.9883 0.967437L5.29146 1.06856C5.99906 1.30576 6.74197 2.08814 6.93747 2.80894L7.66243 5.4697C7.85793 6.19257 7.59424 7.22098 7.06701 7.74836L6.10471 8.71081C7.0495 12.2085 9.79389 14.9534 13.2922 15.9005L14.2541 14.9378C14.7839 14.408 15.812 14.1445 16.5333 14.3397L19.1937 15.0673C19.9146 15.2654 20.6969 16.0036 20.934 16.711L21.0351 17.0185C21.2702 17.7262 21.0326 18.739 20.5053 19.264Z" fill="#5DBF16"/>
            //- </svg>
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
.phone {
  display: flex;
  justify-content: flex-start;
  align-items: center;

  &__icon {
    background-image: url('~assets/images/phone.svg');
    background-size: contain;
    background-repeat: no-repeat;
    width: 1em;
    height: 1em;
  }

  &__number {
  }
}
</style>
