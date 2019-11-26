<template>
  <div class="main-calc">
    <!-- <router-link :to="{name:'twoOne'}" class="btn__back"></router-link> -->
    <div class="top-wrapper">
      <div class="sliders">
        <div class="slider-container">
          <div class="slider-text">
            <span>Ежемесячный платёж</span>
            <div class="price-container">
              <div class="price">
                {{
                  valueMonthPay.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
                }}
                ₽
              </div>
            </div>
          </div>
          <v-slider
            v-model="valueMonthPay"
            style="padding:0"
            :min="0"
            :max="maxMonthPay"
            v-bind="options"
            @drag-end="getCountJK"
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
            v-model="valueFirstDeposit"
            style="padding:0"
            :min="0"
            :max="Math.pow(10, 7)"
            :interval="1000"
            v-bind="options"
            @drag-end="getCountJK"
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
            @drag-end="getCountJK"
          ></v-slider>
        </div>
      </div>

      <div class="ipateka-total">
        <div class="ipateka-total-wrapper">
          <div class="ipateka-total__title">
            Вам доступны квартиры стоимостью до
          </div>
          <div class="ipateka-total__price" @click="getCountJK">
            {{ UnitPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') }} ₽
          </div>

          <div class="ipateka-total__info">
            Используйте фильтры и настройте удобный размер платежа
          </div>
        </div>
      </div>

      <div class="selection-jk">
        Мы подобрали {{ this.$store.state.countJK }} ЖК в этой ценовой категории
      </div>

      <div class="calc__control">
        <router-link
          v-if="this.$store.state.countJK > 5"
          class="no-payment__btn btn"
          :to="{ name: 'twoThree' }"
          @click.native="writeUnitSum"
          >Выбрать кол-во комнат</router-link
        >
        <div class="come__btn btn btn--green" @click="goToSearch">
          Посмотреть все
        </div>
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
  <!-- </div> -->
</template>

<script>
import { createNamespacedHelpers } from 'vuex'

import axios from 'axios'
import { Utils } from '@/utils/utils.js'
import { HTTP, Routes } from '@/components/server/API.js'
const {
  mapState,
  mapGetters,
  mapActions,
  mapMutations
} = createNamespacedHelpers('mapSearch')

export default {
  data() {
    return {
      dateCredits: 10,

      valueFirstDeposit: 0,

      minMonthPay: this.$store.state.currentSumState,
      // maxValue: this.$store.state.currentSum * 10,

      options: {
        dotSize: 26,

        height: 10,
        tooltip: 'none'
      }
    }
  },

  computed: {
    ...mapState({
      residentials: (state) => state.residentials,
      currentResidentialId: (state) => state.currentResidentialId,
      roomsFilter: (state) => state.roomsFilter,
      completionYears: (state) => state.completionYears,
      decorationTypes: (state) => state.decorationTypes,
      houseMaterials: (state) => state.houseMaterials,
      infrastructures: (state) => state.infrastructures,
      paymentMethods: (state) => state.paymentMethods,
      parkingType: (state) => state.parkingType,
      allRcMinPrice: (state) => state.allRcMinPrice,
      allRcMaxPrice: (state) => state.allRcMaxPrice,
      filtredRC: (state) => state.filtredRC,
      isOpenAllFilters: (state) => state.isOpenAllFilters,
      isOpenSearch: (state) => state.isOpenAllFilters,
      accordeonClassFilters: (state) => state.accordeonClassFilters,
      allRcMinPrice: (state) => state.allRcMinPrice
    }),
    ...mapGetters(['getCurrentResidential', 'getFilterRc']),
    changeTitles() {
      return Utils.helpers.FNumber(this.$data.dateCredits, [
        'год',
        'года',
        'лет'
      ])
    },
    UnitPrice() {
      return (
        Math.floor(Utils.helpers.FSum(this.valueMonthPay, this.dateCredits)) +
        this.valueFirstDeposit
      )
    },

    valueMonthPay: {
      get() {
        console.log('get - valueMonthPay-' + this.$store.state.currentSum)

        return Math.floor(this.$store.state.currentSum / 100).toFixed(2) * 100
      },
      set(newValue) {
        console.log('set - newValue valueMonthPay -' + newValue)
        this.$store.commit('setCurrentSum', newValue)
      }
    },

    maxMonthPay() {
      return this.$store.state.currentSumState * 3
    }
  },

  methods: {
    ...mapMutations([
      'setActiveFilterRooms',
      'setMinPriceFilter',
      'setMaxPriceFilter',
      'setIsIpotekaPrice',
      'setCheckedDate',
      'setCheckedPaymentMethods',
      'setCheckedMaterials',
      'setCheckedDecoration',
      'setCheckedInfrastructures',
      'setСheckedParking',
      'setIsOpenSearch',
      'setIsOpenAllFilters',
      'setAccordeonClassFilters',
      'setNameSearch'
    ]),
    getCountJK() {
      HTTP.post(
        Routes.getHandlerRooms,
        {},
        {
          params: {
            rooms_list: [],
            price_from: this.UnitPrice
          }
        }
      )
        .then(({ data }) => {
          // console.log("GetCount-");
          // console.log(data);
          this.$store.state.countJK = data
        })
        .catch((error) => {
          console.log(error)
        })
    },
    writeUnitSum() {
      this.$store.commit('setcurrentUnitSumm', this.UnitPrice)
    },

    goToSearch() {
      if (this.$store.state.countJK > 5) {
        this.setMaxPriceFilter(this.UnitPrice)
        this.setIsIpotekaPrice(true)
        this.$router.push({ name: 'mapSearch' })
      }

      this.setIsIpotekaPrice(true)
      this.$router.push({ name: 'mapSearch' })
    }
  }
}
</script>

<style lang="scss">
.selection-jk {
  width: 88%;
  margin: 0 auto;
  margin-top: 33px;
  font-weight: 300;
  line-height: 24px;
  font-size: 18px;
  text-align: center;

  color: #5d6369;

  opacity: 0.9;
}

.btn__back {
  top: 100px;
}

@media (min-width: 1240px) {
  .selection-jk {
    width: 530px;
    margin-top: 0;
    font-weight: 300;
    line-height: 27px;
    font-size: 20px;
    text-align: center;
    letter-spacing: 0.2px;

    color: #5d6369;

    opacity: 0.9;
  }
}
</style>
