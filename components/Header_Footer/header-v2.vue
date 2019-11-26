<template>
  <div>
    <section class="header-menu">
      <div class="ipoteka-menu">
        <div class="menu__strok" @click="openLeftMenu"></div>
      </div>
      <a
        :href="currentPath"
        class="header-menu__logo header-menu__logo--test ipoteka-header__logo"
      ></a>

      <ul class="ipoteka-menu__list">
        <li
          v-for="(item, index) in menu"
          :key="index"
          class="ipoteka-menu__list__item menu-item"
        >
          <a :href="item.route">{{ item.title }}</a>
        </li>
      </ul>

      <a
        href="tel:+73833884896"
        class="change-phone phone-number main-phone mgo-number header__phone--icon"
        >+7 (383) 388-48-96</a
      >
    </section>
    <transition name="overlay">
      <div
        v-show="showLeftMenu"
        class="left-menu__overlay"
        @click.self="closeLeftMenu"
      ></div>
    </transition>

    <transition name="fade-left-menu">
      <div
        v-show="showLeftMenu"
        class="left-menu__wrapper ipoteka-left-menu__wrapper"
      >
        <div class="left-menu__wrappers">
          <div class="close-left-menu" @click="closeLeftMenu"></div>
          <div class="left-menu ipoteka__left-menu">
            <div class="ipoteka-left-menu__logo-container">
              <a
                :href="currentPath"
                class="left-menu__logo ipoteka-left-menu__logo"
              ></a>
            </div>
            <ul class="ipoteka-left-menu">
              <li
                v-for="(item, index) in menu"
                :key="index"
                class="ipoteka-left-menu__item left-menu__list__item"
              >
                <a :href="item.route">{{ item.title }}</a>
              </li>
            </ul>

            <div
              class="number-phone__text--link left-menu__text--link ipoteka-left-menu__phone"
            >
              <a
                href="tel:+73833884896"
                class="change-phone ipoteka-left-menu__phone__text"
                >+7 (383) 388-48-96</a
              >
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showLeftMenu: false,
      currentPath:
        window.location.origin + '/' + window.location.pathname.split('/')[1]
    }
  },
  computed: {
    menu() {
      return this.$store.state.menuList
    }
  },
  methods: {
    openLeftMenu() {
      $('body').css('overflow', 'hidden')
      this.showLeftMenu = true
    },

    closeLeftMenu() {
      this.showLeftMenu = false
      $('body').css('overflow', 'auto')
    }
  }
}
</script>

<style lang="scss">
@import '@/../sass/app.scss';

.ipoteka-menu__list {
  display: none;
  @include respond-to(pc-md) {
    display: flex;
    width: 63%;
  }

  &__item {
    font-weight: 500;
    font-size: 14px;
    line-height: 22px;
    display: flex;
    align-items: center;
    text-align: center;

    margin-right: 40px;
    a {
      text-transform: uppercase;
      color: rgba($color: #5a5863, $alpha: 0.7);
    }

    &:last-child {
      a {
        color: #60ce78;
      }
    }
  }
}

.ipoteka-left-menu__item {
  text-align: left;
  margin-bottom: 38px;
  margin-top: 13px;
  margin-left: 20px;
  a {
    font-size: 14px;
    line-height: 22px;
  }
}

.ipoteka-left-menu__wrapper {
  background: #fdfdfd;
  max-width: 270px;
}

.ipoteka-left-menu__phone {
  position: absolute;
  bottom: 46px;
  left: calc(50% - 120px);
  width: 240px;
  /* left: 0; */
  padding-left: 40px;
  border-top: 1px solid #f1f1f1;
  padding-top: 40px;

  &::before {
    content: '';
    display: block;
    position: absolute;
    height: 25px;
    background: url(/img/phone-icon.svg) no-repeat center;
    width: 25px;
    top: 39px;
    left: 7px;
    background-size: 20px;
  }

  &__text {
    font-weight: 500;
    font-size: 20px;
    line-height: 24px;
    letter-spacing: 0.5px;

    text-align: center;

    color: #5a5863;

    /* #5A5863 */
    opacity: 0.9;
  }
}

.ipoteka__left-menu {
  align-items: unset;
}

.ipoteka-left-menu__logo {
  margin-bottom: 120px;
  background: url('/img/light-logo.svg') no-repeat;
  background-size: 110px;
  display: block;
  margin: 0;
  margin-left: 30px;
  margin-top: 18px;
  &-container {
    height: 80px;

    background: radial-gradient(72px at 35.17% 0%, #fdfdfd 0%, #f1f1f1 100%);
    margin-bottom: 40px;
  }
}

.ipoteka-left-menu {
  width: 230px;
  margin: 0 auto;
}

.header__phone--icon {
  position: relative;
  font-size: 0;
  margin: 0 20px 0 auto;

  @include respond-to(tablet) {
    font-size: 20px;
    font-weight: 500;

    line-height: 24px;
    text-align: center;
    letter-spacing: 0.5px;

    color: #5a5863;

    /* #5A5863 */
    opacity: 0.9;
  }

  @include respond-to(pc-md) {
    margin: 0 39px 0 auto;
  }

  &::before {
    content: '';
    display: block;
    position: absolute;

    height: 21px;
    background: url(/img/phone-icon.svg) no-repeat center;
    width: 23px;
    top: -11px;
    left: -22px;
    background-size: 21px;
    @include respond-to(tablet) {
      content: '';

      width: 23px;
      top: 3px;
      left: -29px;
    }
  }
}

.ipoteka-header__logo {
  display: block;
  background-size: 88px;
  width: 88px;
  @include respond-to(tablet) {
    width: 110px;
    background-size: 100px;
  }
}

.ipoteka-menu {
  padding: 0;
  opacity: 0.5;
  margin-right: auto;
  @include respond-to(tablet) {
    margin-right: 0;
    width: unset;
  }
  @include respond-to(pc-md) {
    display: none;
  }
}
</style>
