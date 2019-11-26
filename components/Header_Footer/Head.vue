<template>
  <header>
    <div class="header-wrapper">
      <div class="logo"></div>
      <div class="change-phone phone-toggle">+7 (383) 388-48-96</div>
      <input id="nav-toggle" type="checkbox" hidden />

      <div class="nav">
        <label for="nav-toggle" class="nav-toggle" @click="close"></label>
        <a href="#" class="logo-menu"></a>

        <!-- <v-select value="Новосибирск" label="cityName" :options="options"></v-select> -->

        <ul class="menu">
          <li v-for="(item, index) in menu" :key="index" class="menu-item">
            <a :href="item.route">{{ item.title }}</a>
          </li>
        </ul>

        <!-- <ul class="menu">
          <li class="menu-item">
            <a href="#">Главная</a>
          </li>
          <li class="menu-item">
            <a href="#">Новостройки</a>
          </li>
          <li class="menu-item">
            <a href="#">Застройщики</a>
          </li>
          <li class="menu-item">
            <a href="#">Ипотека</a>
          </li>
        </ul> -->

        <div class="header-phone phone menu-phone">
          <a class="change-phone header-phone_number phone_number"
            >+7 (383) 388-48-96</a
          >
        </div>
      </div>
      <div class="mask-content"></div>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      options: [
        { cityCode: 'NSK', cityName: 'Москва' },
        { cityCode: 'NSK', cityName: 'Санкт-Петербург' },
        { cityCode: 'NSK', cityName: 'Новосибирск' },
        { cityCode: 'NSK', cityName: 'Красноярск' },
        { cityCode: 'NSK', cityName: 'Барнаул' },
        { cityCode: 'NSK', cityName: 'Пермь' },
        { cityCode: 'NSK', cityName: 'Рязань' }
      ]
    }
  },
  computed: {
    menu() {
      return this.$store.state.menuList
    }
  },
  methods: {
    close() {
      setTimeout(
        () => document.querySelector('.nav').classList.remove('nav-z'),
        200
      )
    }
  }
}
</script>

<style lang="scss">
.header-phone_number {
  color: #5a5863;
  opacity: 0.9;
}
.v-select .dropdown-menu {
  box-shadow: 0px 16px 25px rgba(90, 88, 99, 0.1);
  border: none;
  border-radius: 8px;
}

.v-select.open .open-indicator::before {
  display: none;
}

.v-select.single .selected-tag {
  font-size: 14px;

  color: #626c7a;
  opacity: unset;
}

.v-select .clear {
  display: none;
}

.v-select .dropdown-menu a {
  margin-bottom: 10px;
}

.v-select .dropdown-menu .active > a {
  color: #5dbf16;
  background: inherit;
}

.v-select .dropdown-menu .highlight > a {
  background: #dfe2e3;
  color: #626c7a;

  /* #626C7A */
  opacity: 0.7;
}
.nav {
  width: 320px;
  min-width: 320px;
  height: 100%;

  position: fixed;
  top: 0;
  bottom: 0;
  margin: 0;
  left: -320px;

  transition: left 0.3s;

  background: #fdfdfd;

  z-index: 2000;
  display: flex;
  flex-direction: column;
}

.nav-toggle {
  position: absolute;
  left: 320px;
  top: 10px;
  padding: 12px 22px;
  background: #5dbf16;
  box-shadow: 0px 16px 25px rgba(66, 72, 77, 0.1);
  color: #ffffff;
  cursor: pointer;
  font-size: 22px;
  z-index: 2001;
  border-top-right-radius: 40px;
  border-bottom-right-radius: 40px;
  transition: color 0.25s ease-in-out;
}

.nav-toggle:after {
  content: '\2630';
  text-decoration: none;
}

[id='nav-toggle'] {
  position: absolute;
  display: none;
}

[id='nav-toggle']:checked + .nav {
  .nav-toggle {
    left: auto;
    right: 2px;
    transform: matrix(-1, 0, 0, 1, 0, 0);
  }
}

[id='nav-toggle']:checked + .nav {
  left: 0;
  box-shadow: 4px 0px 20px 0px rgba(0, 0, 0, 0.5);
  overflow-y: auto;
}

[id='nav-toggle']:checked + .nav {
  .nav-toggle {
    background: rgba(237, 237, 238, 1);
  }
  .nav-toggle:after {
    content: '\2715';
    color: #5a5863;
  }
}

.mask-content {
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  visibility: hidden;
  opacity: 0;
}

[id='nav-toggle']:checked ~ .mask-content {
  visibility: visible;
  opacity: 1;
  transition: opacity 0.5s, visibility 0.5s;
}

.logo-menu {
  background-image: url('/img/logo-2.png');
  background-repeat: no-repeat;
  height: 33px;
  width: 115px;
  margin-top: 23px;
  margin-left: 20px;
  margin-bottom: 31px;
}

.v-select {
  margin: 0 20px;
  .dropdown-toggle {
    border-radius: 8px;
  }

  .dropdown-menu {
    overflow-y: unset;
  }
}

.menu {
  margin: 0 auto;
  margin-top: 54px;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1 0 auto;

  border-bottom: 1px solid #f6f8f8;

  width: 78%;

  .menu-item {
    margin-bottom: 28px;
    font-weight: 500;
    line-height: 22px;
    font-size: 14px;
    text-transform: uppercase;
    opacity: 0.7;

    &:hover {
      opacity: 0.4;
    }
    a {
      color: #5a5863;
    }
  }
}

.menu-phone {
  flex-grow: 0;
  font-weight: 500;
  font-size: 18px;

  color: #5a5863;

  opacity: 0.9;
  align-self: center;
  margin-bottom: 31px;
  margin-top: 23px;
  position: relative;

  .header-phone_number::before {
    display: block;
    content: '';
    position: absolute;
    background-image: url('/img/phone.svg');
    background-repeat: no-repeat;
    width: 21px;
    height: 21px;
    right: 170px;
    top: 3px;
  }
}

.phone-toggle {
  position: fixed; //absolute
  top: 10px;
  right: 0;
  padding: 16px 24px 16px 54px;
  background: #fdfdfd;

  box-shadow: 0px 16px 25px rgba(66, 72, 77, 0.1);
  border-radius: 40px 0px 0px 40px;

  font-weight: 500;
  opacity: 0.9;
  font-size: 18px;
  text-align: center;

  color: #4f4f4f;

  z-index: 200;

  &::before {
    display: block;
    content: '';
    position: absolute;
    background-image: url('/img/phone.svg');
    background-repeat: no-repeat;
    width: 21px;
    height: 21px;
    right: 201px;
    bottom: 20px;
  }
}

@media (min-width: 768px) {
  header {
    flex: 0 0 auto;
  }

  .header-wrapper {
    width: 100%;
    background: #fdfdfd;
    min-height: 70px;
    position: relative;
    z-index: 2000;
  }

  .phone-toggle {
    box-shadow: none;
    position: absolute;
    font-size: 20px;
    margin: 0;
    /* margin-right: 29px; */
    letter-spacing: 0.5px;
    padding: 14px 10px 16px 54px;
    &::before {
      right: 214px;
      bottom: 20px;
    }
  }

  .logo {
    background-image: url('/img/logo-2.png');
    background-repeat: no-repeat;
    height: 33px;
    width: 115px;
    position: absolute;
    top: 18px;
    left: 84px;
  }
}

@media (min-width: 1024px) {
}

@media (min-width: 1280px) {
  .nav {
    position: relative;
    flex-direction: row;
    align-self: center;
    left: 0;
    width: 100%;
  }

  .header-wrapper {
    width: 100%;
    background: #fdfdfd;
    display: flex;
    min-height: 65px;
  }

  .logo {
    display: none;
  }

  /////
  .nav-toggle {
    display: none;
  }

  .menu-phone {
    display: block;
    // align-self: center;
    // margin-right: 37px;
    font-size: 20px;
    margin: 0;
    margin-right: 29px;
    letter-spacing: 0.5px;
    .header-phone_number::before {
      width: 23px;
      height: 23px;
      top: 0px;
      right: 200px;
    }
  }

  .phone_number {
    font-size: 20px;
  }

  .header-phone_number {
    position: relative;
    color: #5a5863;

    opacity: 0.9;
  }

  .phone-toggle {
    display: none;
  }

  .logo-menu {
    width: 112px;
    margin: 0;
    margin-left: 37px;
  }

  .menu {
    flex-direction: row;
    flex: 0 0 auto;
    margin: 0 auto;
    /* margin: 0; */
    width: 600px;

    padding: 0 13px;
    border: none;

    margin-right: auto;
    .menu-item {
      letter-spacing: 0.3px;
      margin: 0;

      margin-right: 45px;
    }
  }

  /////

  .v-select {
    width: 180px;
    align-self: center;
    margin-right: 0;
    margin-left: 30px;
  }

  .v-select .dropdown-menu {
    background: #fdfdfd;
    li {
      background: #fdfdfd;
    }
  }

  .v-select.single .selected-tag {
    font-size: 14px;
    letter-spacing: 0.002em;
    padding: 0 0 0 15px;
    color: #626c7a;
    margin-top: 8px;
  }

  .v-select .clear {
    display: none;
  }

  .v-select .open-indicator {
    width: 20px;
  }

  .v-select .dropdown-toggle {
    position: relative;
    align-self: center;
    margin-right: auto;
    border: 1px solid rgba(167, 203, 213, 0.2);
    border-radius: 8px;
    height: 40px;
    font-size: 14px;

    color: #626c7a;
  }

  .v-select .open-indicator:before {
    border-color: #5dbf16;
  }

  .select {
    display: none;
    position: absolute;
    top: 44px;
    right: 0;
    background: #fdfdfd;
    border: 1px solid rgba(167, 203, 213, 0.2);
    border-radius: 8px;
  }

  .select-item {
    list-style: none;
    width: 180px;
    border-bottom: 1px solid rgba(167, 203, 213, 0.2);
    padding: 11px 58px 11px 20px;
  }
}
</style>
