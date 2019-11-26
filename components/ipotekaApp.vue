<template>
  <div>
    <Header />
    <div class="app-overlay app-overlay--calc">
      <div class="app-wrapper">
        <div class="main-wrapper">
          <a
            v-if="this.$router.history.current.name != 'main'"
            class="btn__back"
            @click="$router.go(-1)"
          ></a>
          <transition name="component-fade" mode="out-in">
            <keep-alive>
              <router-view />
            </keep-alive>
          </transition>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from './Header_Footer/header-v2.vue'

import Footer from './Header_Footer/Footer.vue'
export default {
  components: {
    Header,
    Footer
  },
  updated() {
    this.phoneChange()
    this.setTitle_Description()
  },

  created() {
    this.$router.replace({ name: 'main' })
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
    },

    setTitle_Description() {
      const desc = 'Ипотека от ведущих банков за 2 дня'

      document.title = 'Ипотека на новостройки - okna.io'
      document
        .querySelector('meta[name="description"]')
        .setAttribute('content', desc)
    }
  }
}
</script>

<style lang="scss">
* {
  box-sizing: border-box;
}

header {
  box-shadow: 0px 16px 25px rgba(66, 72, 77, 0.1);
}

body {
  height: 100%;
  padding: 0;
  margin: 0;

  font-family: 'Montserrat', sans-serif;
  font-weight: 300;
}

.component-fade-enter-active,
.component-fade-leave-active {
  transition: 0.3s ease;
}
.component-fade-enter,
.component-fade-leave-to {
  opacity: 0;
}

a {
  text-decoration: none;
  // color: #000000;
}

ul {
  margin: 0;
  padding: 0;
}

li {
  list-style: none;
}

input {
  font-family: 'Montserrat', sans-serif;
  border: 1px solid rgba(167, 203, 213, 0.1);
  box-shadow: inset 0px 0px 4px rgba(90, 88, 99, 0.15);
  outline: none;
  &:hover {
    border: 1px solid rgba(167, 203, 213, 0.3);
    &::placeholder {
      color: #5a5863;

      /* #5A5863 */
      opacity: 0.6;
    }
  }

  &:focus {
    border: 1px solid rgba(167, 203, 213, 0.5);
    box-shadow: unset;
    color: #5a5863;

    /* #5A5863 */
    opacity: 0.9;
  }

  &::placeholder {
    color: #5a5863;

    /* #5A5863 */
    opacity: 0.4;
  }
}

input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  margin: 0;
}

#app {
  .app-overlay {
    background: url('/img/mortbg.jpg') no-repeat center;
    background-size: cover;
  }
}

.main-wrapper {
  width: 100%;
  height: 100%;
  background: rgba($color: #fdfdfd, $alpha: 0.7);
}

.main-block {
  width: 100%;
}

.answer {
  font-weight: 300;
  line-height: 28px;
  font-size: 24px;
  text-align: center;
  color: rgba($color: #5a5863, $alpha: 0.9);

  /* #5A5863 */
}

.btn {
  text-align: center;
  background: #5dbf16;
  box-shadow: 0px 10px 20px rgba(66, 72, 77, 0.2),
    0px 9px 40px rgba(96, 189, 30, 0.2);
  border-radius: 100px;
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  color: #fafbfb;
  cursor: pointer;
}

.btn--green {
  background: #5dbf16;
  transition: 0.3s ease-in;
}

.btn__back {
  display: block;
  position: absolute;
  width: 8px;
  height: 14px;

  background: url('/img/arrow-left.png') no-repeat center;
  cursor: pointer;
  top: 100px;
  left: 30px;
}

@media (min-width: 768px) {
  .btn__back {
    border: 1px solid rgba(167, 203, 213, 0.2);
    border-radius: 100px;
    width: 50px;
    height: 50px;
    background-size: 8px 12px;

    top: 111px;
    left: 29px;

    &:hover {
      background-color: #eff5f7;
    }
  }

  .btn--green:hover {
    background: #6ca100;
    box-shadow: 0px 4px 10px rgba(66, 72, 77, 0.1);
    transition: 0.3s ease-in;
  }

  .btn--green:active {
    background: #6ca100;
    box-shadow: none;
  }

  html {
    height: 100%;
  }
  #app {
    .app-overlay--calc {
      height: 100vh;
      min-height: 887px;
    }

    .app-wrapper {
      display: flex;
      flex-direction: column;
      height: 100%;
    }
  }
}

@media (min-width: 1240px) {
  #app {
    .app-overlay {
      height: 100vh;
    }
    .app-wrapper {
      justify-content: center;
    }
  }

  .main-wrapper {
    box-shadow: 0px 16px 25px rgba(90, 88, 99, 0.1);
    border-radius: 16px;
    width: 887px;
    height: 500px;
    margin: 0 auto;
    position: relative;
  }

  .answer {
    text-align: center;
    margin: 0 auto;
    font-weight: 300;
    font-size: 30px;

    color: rgba($color: #5a5863, $alpha: 0.9);
  }

  .btn {
    background: #5dbf16;
    box-shadow: 0px 10px 20px rgba(66, 72, 77, 0.2),
      0px 9px 40px rgba(96, 189, 30, 0.2);
    border-radius: 100px;
    font-size: 16px;
    font-weight: 500;
    line-height: 24px;
    color: #fafbfb;
  }

  .btn__back {
    left: -70px;
    top: calc(50% - 24px);
  }

  .main-block {
    background: #fdfdfd;
    box-shadow: 0px 16px 25px rgba(90, 88, 99, 0.1);
    border-radius: 16px;
    width: 887px;
    height: 500px;
    margin: 0 auto;
    position: relative;
  }
}
</style>
