<template>
  <div class="main-calc">
    <!-- <router-link :to="{name:'oneOne'}" class="btn__back"></router-link> -->
    <div class="top-wrapper">
      <div class="sliders">
        <div class="slider-container">
          <div class="slider-text">
            <span>Стоимость квартиры</span>
            <div class="price-container">
              <div class="price">
                {{
                  valueApartament
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
                }}
                ₽
              </div>
            </div>
          </div>
          <v-slider
            v-model="valueApartament"
            style="padding:0"
            :min="minPriceApartament"
            :max="maxPriceApartament"
            :interval="1000"
            v-bind="options"
          ></v-slider>
        </div>
        <div class="slider-container">
          <div class="slider-text">
            <span>Первоначальный взнос</span>
            <div class="price-container">
              <div class="price">
                {{
                  valueFirstDeposit
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
                }}
                ₽
              </div>
            </div>
          </div>

          <v-slider
            v-model="valueFirstDepositRange"
            style="padding:0"
            :min="10"
            :max="100"
            v-bind="options"
          ></v-slider>
        </div>
        <div class="slider-container">
          <div class="slider-text">
            <span>Срок кредитования</span>
            <div class="years">
              {{ dateCredits.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') }}
              {{ changeTitles }}
            </div>
          </div>

          <v-slider
            v-model="dateCredits"
            style="padding:0"
            :min="1"
            :max="40"
            v-bind="options"
          ></v-slider>
        </div>
      </div>

      <div class="ipateka-total">
        <div class="ipateka-total-wrapper">
          <div class="ipateka-total__title">
            Ежемесячный платёж по ипотеке составит
          </div>
          <div class="ipateka-total__price">
            {{ UnitPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') }} ₽
          </div>

          <div class="ipateka-total__info">
            Используйте фильтры и настройте удобный размер платежа
          </div>
        </div>
      </div>

      <div class="calc__control">
        <router-link class="no-payment__btn btn" :to="{ name: 'oneTwoTwo' }"
          >Нет первоначального взноса</router-link
        >
        <router-link
          class="come__btn btn btn--green"
          :to="{ name: 'oneTwoOne' }"
          >Мне подходит</router-link
        >
      </div>
    </div>

    <div class="bot-wrapper">
      <div class="info">
        Данный калькулятор рассчитывает приблизительный ежемесячный платёж с
        учётом средней ставки 9,75% в год. Для точного расчёта обратитесь к
        специалистам okna.io по телефону
        <a class="change-phone">+7 (383) 895-26-64</a>
      </div>
    </div>
  </div>
</template>

<script>
import { Utils } from '@/utils/utils.js'

export default {
  data() {
    return {
      dateCredits: 10,
      valueFirstDepositRange: 10,
      minFirstDeposit: this.$store.state.minPriceState / 10,
      minPriceApartament: this.$store.state.minPriceState,

      options: {
        dotSize: 26,
        height: 10,
        tooltip: 'none'
      }
    }
  },

  computed: {
    valueFirstDeposit() {
      return (
        Math.floor(
          (this.$store.state.currentPrice * this.valueFirstDepositRange) /
            100000
        ).toFixed(3) * 1000
      )
    },
    UnitPrice() {
      return Math.floor(
        Utils.helpers.FPay(
          this.valueApartament - this.valueFirstDeposit,
          this.dateCredits
        )
      )
    },
    changeTitles() {
      return Utils.helpers.FNumber(this.$data.dateCredits, [
        'год',
        'года',
        'лет'
      ])
    },

    valueApartament: {
      get() {
        return (
          Math.floor(this.$store.state.currentPrice / 1000).toFixed(3) * 1000
        )
      },
      set(newValue) {
        this.$store.commit('addCurrentPrice', newValue)
      }
    },

    maxPriceApartament() {
      return this.$store.state.currentPriceState * 2
    }
  }

  // created() {
  //   this.$attrs.isCalcCopm = true;
  // }
}
</script>

<style lang="scss">
.vue-slider {
  background: inherit;
  padding: 0;
  margin: 0;
}

.vue-slider-rail {
  background: #e3e6e9;
  box-shadow: inset 0px 0px 4px rgba(66, 72, 77, 0.25);
  border-radius: 30px;
}

.vue-slider-process {
  background: #5dbf16;
  box-shadow: inset 0px 0px 4px rgba(66, 72, 77, 0.25);
  border-radius: 30px;
}

.vue-slider-dot {
  background: #ffffff;
  width: 26px;
  height: 26px;
  border: 1px solid #e9edee;
  cursor: pointer;
  box-shadow: 0px 2px 4px rgba(66, 72, 77, 0.1);
  border-radius: 50px;
}
.btn__back {
  top: 100px;
}

.slider-text {
  padding-bottom: 10px;
}

.calc-wrapper {
  align-self: flex-end;
}

.main-calc {
  margin: 0;
  min-height: 1077px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-top: 152px;
}
.top-wrapper {
  display: flex;
  flex-direction: column;
}

.slider-container {
  margin: 0 auto;
  margin-bottom: 30px;
  width: 270px;
}

.sliders {
  display: flex;
  flex-direction: column;
  margin-bottom: 40px;
}

.slider-text {
  span {
    line-height: 20px;
    font-size: 14px;

    color: #5a5863;

    opacity: 0.5;
  }
  .price {
    font-weight: 500;
    font-size: 18px;

    color: #5a5863;

    opacity: 0.9;
  }

  .years {
    font-weight: 500;
    font-size: 18px;

    color: #5a5863;

    opacity: 0.9;
  }

  .price-container {
    display: flex;
    margin-top: 6px;

    .svg-container {
      display: flex;
    }

    .icon-rub {
      align-self: center;
      width: 17px;
      height: 15px;
    }
  }
}

.ipateka-total {
  padding: 0 20px;
  margin-bottom: 40px;
}

.ipateka-total-wrapper {
  display: flex;
  flex-direction: column;
  background: rgba($color: #dfe2e3, $alpha: 0.5);
  border-radius: 8px;

  .ipateka-total__title {
    padding: 30px 37px 0;
    font-weight: 300;
    letter-spacing: 0.2px;

    line-height: 21px;
    font-size: 16px;
    text-align: center;

    color: rgba($color: #5d6369, $alpha: 0.78);
  }

  .ipateka-total__price {
    margin-top: 10px;
    align-self: center;
    font-weight: 300;
    line-height: 54px;
    font-size: 40px;

    color: #5a5863;

    /* #5A5863 */
    opacity: 0.9;
  }

  .ipateka-total__info {
    margin-top: 7px;
    width: 258px;
    text-align: center;
    align-self: center;
    line-height: 20px;
    font-size: 12px;
    font-weight: normal;
    letter-spacing: 0.2px;

    color: rgba($color: #5a5863, $alpha: 0.5);

    padding-bottom: 40px;
    padding-top: 7px;
  }
}

.calc__control {
  width: 320px;
  margin: 0 auto;
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  padding: 0 20px 44px;

  .no-payment__btn {
    order: 2;
    background: #ffffff;
    color: #5a5863;
    padding: 14px 9px;
    /* #5A5863 */
    opacity: 0.5;
    margin-top: 21px;
  }

  .come__btn {
    padding: 14px 9px;
  }
}

.bot-wrapper {
  border-top: 1px solid #ececec;
}

.info {
  width: 88.88%;
  margin: 28px auto;
  line-height: 17px;
  font-size: 10px;
  text-align: center;
  font-weight: normal;
  letter-spacing: 0.2px;
  color: rgba(90, 88, 99, 0.5);
  a {
    display: inline-block;
    color: rgba(90, 88, 99, 1);
  }
}

@media (min-width: 768px) {
  .btn__back {
    top: 30px;
  }

  .slider-container {
    width: 30%;
    margin: 0 auto;
    &:last-child {
      margin: 0;
      margin-left: auto;
    }
  }

  .main-calc {
    min-height: 774px;
    height: 100%;
    padding: 0;
  }
  .sliders {
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    margin: 0 auto 42px;
    padding: 0 30px;
  }

  .ipateka-total {
    padding: 0 30px;
  }

  .years {
    margin-top: 6px;

    font-weight: 500;
    font-size: 18px;

    color: #5a5863;

    opacity: 0.9;
  }

  .calc__control {
    flex-direction: row;
    justify-content: space-evenly;
    width: 65%;
    max-width: 501px;
    .no-payment__btn {
      order: 1;
      width: 63%;
      max-width: 270px;
      margin-top: 0;
    }

    .come__btn {
      order: 2;
      width: 36%;
      max-width: 184px;
      margin: 0;
    }
  }

  .info {
    font-size: 12px;
    margin: 0 auto;
    padding: 0 30px;
    padding-top: 28px;
    width: 100%;
  }

  .top-wrapper {
    padding-top: 191px;
  }
}
@media (min-width: 1240px) {
  .main-calc {
    position: relative;
    padding: 0;
    margin: 0;
    display: block;
    height: 500px;
    min-height: unset;
  }
  .top-wrapper {
    width: 887px;
    height: 408px;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    margin-bottom: 0;
    padding-top: 0;
  }

  .bot-wrapper {
    border: none;
  }

  .slider-container {
    width: 270px;
    margin-bottom: 48px;
  }

  .sliders {
    max-width: 270px;
    margin-top: 40px;
    margin-left: 35px;
    display: flex;
    flex-direction: column;
    padding: 0;
  }

  .slider-text {
    padding-bottom: 20px;
    span {
      line-height: 20px;
      font-size: 14px;

      color: #5a5863;

      opacity: 0.5;
    }
    .price {
      font-size: 18px;

      color: #5a5863;

      opacity: 0.9;
    }

    .price-container {
      display: flex;
      margin-top: 6px;

      .svg-container {
        display: flex;
      }

      .icon-rub {
        align-self: center;
        width: 17px;
        height: 15px;
      }
    }
  }

  .years {
    font-weight: 500;
    font-size: 18px;
    color: #5a5863;
    opacity: 0.9;
  }

  .ipateka-total {
    padding: 0;
    margin: 40px 0 60px 20px;
    width: 505px;
  }

  .ipateka-total-wrapper {
    display: flex;
    flex-direction: column;
    padding: 20px 0 0px;

    .ipateka-total__title {
      padding: 0;
      padding-top: 0;
      font-weight: 300;
      line-height: 21px;
      font-size: 16px;
      text-align: center;

      color: #5d6369;
      opacity: 0.78;
    }

    .ipateka-total__price {
      margin-top: 10px;
      align-self: center;
      font-weight: 300;
      line-height: 54px;
      font-size: 40px;

      color: #5a5863;

      opacity: 0.9;
    }

    .ipateka-total__info {
      padding-bottom: 18px;
      width: 258px;
      text-align: center;
      align-self: center;
      line-height: 20px;
      font-size: 12px;

      color: #5a5863;

      opacity: 0.5;
      margin-top: 0;
    }
  }

  .calc__control {
    margin-top: 103px;
    justify-content: space-between;
    margin-right: 35px;
    margin-top: 44px;
    padding: 0;
    max-width: 505px;

    .no-payment__btn {
      width: 306px;
      background: #ffffff;
      color: #5a5863;
      padding: 13px 9px;
      /* #5A5863 */
      opacity: 0.5;
      margin-right: 15px;
      max-width: 306px;
      width: 306px;
      margin: 0;
    }

    .come__btn {
      width: 184px;
      padding: 14px 9px;
    }
  }

  .info {
    width: 768px;
    border-top: 1px solid #ececec;
    margin: 0 auto;
    line-height: 20px;
    font-size: 12px;
    text-align: center;
    letter-spacing: 0.2px;

    color: rgba(90, 88, 99, 0.5);
    padding-top: 28px;
    margin-bottom: 23px;
    mark {
      background: inherit;
    }
  }

  .btn__back {
    top: 220px;
  }
}
</style>
