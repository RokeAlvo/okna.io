<template>
  <div class="main">
    <div class="title-wrapper">
      <div class="title">
        <span>Даем зеленый свет ипотеке -</span>
        <span class="name-company">
          okna
          <sup>.io</sup>
        </span>
      </div>
    </div>

    <div class="content">
      <div class="answer-wrapper">
        <div class="answer answer--1-1">
          Введите стоимость выбранной квартиры
        </div>
        <span>и рассчитайте ежемесячный платёж</span>
      </div>

      <div class="sum">
        <div class="sum__input">
          <input
            v-model="inputValue"
            v-money="inputValue !== null ? money : null"
            placeholder="Введите сумму"
            type="text"
            @input="setSum"
          />
        </div>

        <div class="svg-container">
          <svg
            class="icon-rub"
            width="13"
            height="14"
            viewBox="0 0 13 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              opacity="0.3"
              d="M4.594 8.931V9.993H8.59V11.019H4.594V13.125H2.776V11.019H0.94V9.993H2.776V0.524999H7.726C9.37 0.524999 10.654 0.890999 11.578 1.623C12.502 2.343 12.964 3.375 12.964 4.719C12.964 6.075 12.502 7.119 11.578 7.851C10.654 8.571 9.37 8.931 7.726 8.931H4.594ZM11.146 4.737C11.146 3.885 10.852 3.231 10.264 2.775C9.676 2.319 8.83 2.091 7.726 2.091H4.594V7.437H7.726C8.818 7.437 9.658 7.203 10.246 6.735C10.846 6.255 11.146 5.589 11.146 4.737Z"
              fill="#42484D"
            ></path>
          </svg>
        </div>
        <span @click.capture="checkPrice">
          <router-link
            :to="{ name: 'oneTwo' }"
            type="submit"
            class="calc__btn btn btn--green"
            >Рассчитать платёж</router-link
          >
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { VMoney } from 'v-money'
export default {
  directives: { money: VMoney },
  data() {
    return {
      inputValue: null,

      money: {
        thousands: ' ',

        precision: 0,
        masked: false
      }
    }
  },

  mounted() {
    this.checkPrice()
  },

  methods: {
    setSum() {
      this.inputValue = this.inputValue.slice(0, 15)
    },
    checkPrice() {
      if (this.inputValue === null) {
        this.$store.commit('addCurrentPrice', this.$store.state.minPriceState)
        this.$store.commit(
          'setCurrentPriceState',
          this.$store.state.minPriceState
        )
      } else {
        const currentPrice =
          Math.floor(
            parseInt(this.inputValue.replace(/[($)\s\._\-]+/g, ''), 10) / 1000
          ).toFixed(3) * 1000

        if (currentPrice >= this.$store.state.minPriceState) {
          this.$store.commit('addCurrentPrice', currentPrice)
          this.$store.commit('setCurrentPriceState', currentPrice)
        } else {
          this.$store.commit('addCurrentPrice', this.$store.state.minPriceState)
          this.$store.commit(
            'setCurrentPriceState',
            this.$store.state.minPriceState
          )
        }
      }
    }
  }
}
</script>

<style lang="scss">
.content {
  margin-top: 40px;
  text-align: center;
}

.answer-wrapper {
  text-align: center;
  padding: 0 20px;

  span {
    line-height: 20px;
    font-size: 14px;
    text-align: center;

    color: #5a5863;

    opacity: 0.6;
  }

  .answer {
    margin: 0 auto;
    font-weight: 300;
    line-height: 28px;
    font-size: 24px;
    text-align: center;
    letter-spacing: 0.2px;
    color: #5a5863;
    opacity: 0.9;
    margin-bottom: 10px;
  }

  .answer--1-1 {
    max-width: 376px;
  }
}

.sum {
  margin: 0 auto;
  margin-bottom: 35px;
  margin-top: 47px;
  position: relative;
  width: 300px;

  .sum__input {
    padding-bottom: 35px;
    input {
      width: 100%;

      position: relative;
      padding: 15px 34px 15px 30px;
      background: #fdfdfd;
      border-radius: 50px;

      font-size: 18px;
      line-height: 20px;
      letter-spacing: 0.1px;
      outline: none;

      color: #5a5863;

      background: #fdfdfd;
      opacity: 0.8;

      border: 1px solid rgba(167, 203, 213, 0.1);
      box-shadow: inset 0px 0px 4px rgba(90, 88, 99, 0.15);
      border-radius: 100px;

      &:hover {
        border: 1px solid rgba(167, 203, 213, 0.3);
        &::placeholder {
          color: #5a5863;

          opacity: 0.6;
        }
      }

      &:focus {
        border: 1px solid rgba(167, 203, 213, 0.5);
        box-shadow: unset;
        color: #5a5863;

        opacity: 0.9;
      }

      &::placeholder {
        color: #5a5863;

        opacity: 0.4;
      }
    }
  }
}

.icon-rub {
  position: absolute;
  top: 20px;
  right: 30px;
}

.sum__btn {
  width: 300px;
  margin: 0 auto;
  margin-top: 20px;
  padding: 13px 69px;
}

.calc__btn {
  padding: 16px 67px;
  text-transform: unset;
}

@media (min-width: 768px) {
  .title-wrapper {
    width: 88%;
    margin: 0 auto;
    border-bottom: 1px solid rgba(167, 203, 213, 0.1);
  }
  .content {
    margin-top: 40px;
    text-align: center;
  }

  .answer-wrapper {
    text-align: center;
    span {
      line-height: 20px;
      font-size: 14px;
      text-align: center;

      color: #5a5863;

      /* #5A5863 */
      opacity: 0.6;
    }

    .answer {
      font-weight: 300;
      line-height: 34px;
      font-size: 30px;
      text-align: center;

      color: #5a5863;

      /* #5A5863 */
      opacity: 0.9;
    }
  }

  .answer {
    text-align: center;
    &-wrapper {
      span {
        line-height: 24px;
        font-size: 16px;
        text-align: center;

        color: #5a5863;
        opacity: 0.6;
      }
    }
  }

  .sum__input {
    input {
      width: 100%;
      position: relative;
      padding: 15px 34px 15px 30px;
      background: #fdfdfd;
      border-radius: 50px;

      font-size: 18px;
      outline: none;

      color: #5a5863;

      opacity: 0.4;
    }
  }

  .sum {
    margin: 0 auto;
    margin-bottom: 40px;
    margin-top: 47px;
    position: relative;
    width: 300px;
  }

  .icon-rub {
    position: absolute;
    top: 20px;
    right: 30px;
  }

  .calc__btn {
    margin-top: 20px;
    padding: 15px 69px;
  }

  .btn__back {
    top: 30px;
  }
}

@media (min-width: 1240px) {
  .title-wrapper {
    margin: 0 auto;
    border-bottom: 1px solid rgba(167, 203, 213, 0.1);
  }

  .content {
    margin: 0;
  }

  .answer {
    margin: 0 auto;
    font-weight: 300;
    font-size: 30px;

    color: #5a5863;
  }

  .text__bottom {
    margin-top: 13px;
    font-size: 12px;
    color: #5a5863;
    opacity: 0.5;
    text-align: center;
  }

  .answer-wrapper {
    padding-top: 42px;
    .answer--1-1 {
      font-size: 30px;
      line-height: 37px;
      font-weight: 300;
    }
  }

  .question-container {
    display: flex;
    flex-direction: column;
  }

  // .question__btn {
  //   padding: 13px 87px;
  //   text-transform: uppercase;
  // }
  .btn__back {
    top: 220px;
    left: -70px;
  }

  .sum {
    .sum__input {
      padding-bottom: 30px;
    }
  }
}
</style>
