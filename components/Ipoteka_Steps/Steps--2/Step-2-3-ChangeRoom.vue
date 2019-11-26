<template>
  <div class="main-room">
    <!-- <router-link :to="{name:'twoTwo'}" class="btn__back"></router-link> -->

    <div class="content">
      <div class="answer-wrapper change-room__answer-wrapper">
        <div class="answer">Выберите количество комнат</div>
      </div>

      <form class="form__room">
        <ul class="form__list">
          <li
            v-for="idRoom in idRooms"
            :key="idRoom.title"
            class="form__list-item"
          >
            <input
              :id="'room-' + idRoom.range[0]"
              v-model="arrRooms"
              name="rooms[]"
              :value="idRoom.range"
              class="visually-hidden"
              type="checkbox"
            />
            <label
              class="form__list-item--checkbox"
              :for="'room-' + idRoom.range[0]"
              @click="checkRooms"
              >{{ idRoom.title }}</label
            >
          </li>
        </ul>
      </form>

      <div class="room-bot">
        <div class="find-text">
          Найден{{ changeFind }}
          <div v-if="!isLoading" class="number--green">
            {{ this.$store.state.countJK }}
          </div>
          <div v-if="isLoading" class="loader"></div>
          жил{{ changeEndsJK }} комплекс{{ changeEndsComplex }}, подходящих по
          цене
        </div>
        <div class="find-req">
          Оставьте свой номер телефона и получите подборку прямо сейчас
        </div>
        <div class="input">
          <input
            v-model="phone"
            v-mask="'+7 (999) 999-99-99'"
            autocomplete="off"
            class="input__phone"
            inputmode="numeric"
            type="text"
            placeholder="+7 (___) ___-__-__"
          />
        </div>

        <div class="ok__btn btn btn--green" @click.capture="validatePhone">
          Посмотреть подборку
        </div>
        <div class="rules-text">
          Оставляя заявку, вы соглашаетесь с
          <a href="#">Политикой конфиденциальности</a> сервиса okna.io
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import { HTTP, Routes } from '@/components/server/API.js'
import FNumber from '@/app.js'
import { Utils } from '@/utils/utils.js'

const {
  mapState,
  mapGetters,
  mapActions,
  mapMutations
} = createNamespacedHelpers('mapSearch')

export default {
  data() {
    return {
      phone: '',
      studio: false,
      oneRooms: false,
      twoRooms: false,
      threeRooms: false,
      fourPlusRooms: false,
      arrRooms: [],
      isLoading: false,
      isSend: false,

      idRooms: this.$store.state.idRooms,

      notificationSystem: {
        options: {
          show: {
            theme: 'dark',
            icon: 'icon-person',
            position: 'topCenter',
            progressBarColor: 'rgb(0, 255, 184)',

            onOpening(instance, toast) {
              console.info('callback abriu!')
            },
            onClosing(instance, toast, closedBy) {
              console.info('closedBy: ' + closedBy)
            }
          },
          error: {
            position: 'topCenter'
          },
          question: {
            timeout: 20000,
            close: false,
            overlay: true,
            toastOnce: true,
            id: 'question',
            zindex: 999,
            position: 'center',

            onClosing(instance, toast, closedBy) {
              console.info('Closing | closedBy: ' + closedBy)
            },
            onClosed(instance, toast, closedBy) {
              console.info('Closed | closedBy: ' + closedBy)
            }
          }
        }
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
    changeEndsJK() {
      return Utils.helpers.FNumber(this.$store.state.countJK, [
        'ой',
        'ых',
        'ых'
      ])
    },

    changeEndsComplex() {
      return Utils.helpers.FNumber(this.$store.state.countJK, ['', 'а', 'ов'])
    },

    changeFind() {
      return Utils.helpers.FNumber(this.$store.state.countJK, ['', 'о', 'о'])
    }
  },

  watch: {
    arrRooms() {
      this.isLoading = true
      const paramsPostBody = {
        price_from: this.$store.state.currentUnitSumm
      }

      if (this.arrRooms.filter((room) => room.length).length) {
        paramsPostBody.rooms_list = [].concat(
          this.arrRooms.join(',').split(',')
        )
      }
      HTTP.post(
        Routes.getHandlerRooms,
        {},
        {
          params: paramsPostBody
        }
      )
        .then(({ data }) => {
          console.log('GetCount-')
          console.log(data)
          this.$store.state.countJK = data
          this.isLoading = false
        })
        .catch((error) => {
          console.log(error)
        })
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
    postReq() {
      const paramsPostBody = {
        client_phone: this.phone.replace(/[-()+_ ]/g, ''),
        type: 2
      }
      return new Promise((resolve, reject) => {
        HTTP.post(Routes.postPhone, paramsPostBody)
          .then(({ data }) => {
            console.log('Post reqJK')
            resolve(data)
            // console.log(data);
          })
          .catch((error) => {
            reject(error)
            console.log(error)
          })
      })
    },
    checkRooms(e) {
      if (this.isLoading) {
        e.preventDefault()
      }
    },
    validatePhone() {
      if (
        Utils.helpers.validate(
          event,
          this.$el,
          this.phone,
          this.$toast,
          this.notificationSystem.options.error
        ) &&
        !this.isSend
      ) {
        this.isSend = true
        let num = []
        const ssss = [this.arrRooms.join()]
        console.log(ssss)
        this.arrRooms.forEach((el) => {
          num = num.concat(el)
        })

        console.log('---')
        console.log(num)
        console.log(this.arrRooms)

        if (this.$store.state.countJK) {
          this.setMaxPriceFilter(this.$store.state.currentUnitSumm)
          this.setActiveFilterRooms(num)
          this.setIsIpotekaPrice(true)
        }
        this.$router.push({ name: 'mapSearch' })

        this.postReq()
          .then((resolve) => {
            this.isPost = resolve
            this.isSend = false
          })
          .catch((error) => {
            this.isSend = false
            console.log(error)
          })
      }
    }
  }
}
</script>

<style lang="scss">
.loader {
  display: inline-block;
  border: 5px solid #f3f3f3;
  border-radius: 50%;
  border-top: 5px solid #5dbf16;
  width: 21px;
  height: 21px;

  animation: spin 2s linear infinite;
}
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.visually-hidden {
  display: none;
}

.main-room {
  margin-top: 50px;
  margin-bottom: 30px;
}

.form__room {
  margin-top: 45px;
}

.form__list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 88%;
  margin: 0 auto;
  border-bottom: 1px solid rgba(167, 203, 213, 0.1);

  .form__list-item {
    position: relative;
    margin-bottom: 45px;
    width: 49%;
    display: flex;

    &:last-child {
      width: 100%;
      .form__list-item--checkbox {
        padding: 16px 100px;
      }
    }

    .form__list-item--checkbox {
      cursor: pointer;
      text-align: center;
      padding: 16px 40px;
      border: 1px solid rgba(167, 203, 213, 0.2);
      border-radius: 100px;
      width: 100%;
      user-select: none;
    }
  }
}

input[type='checkbox']:checked + .form__list-item--checkbox {
  transition: 0.3s ease-in-out;
  background: #5dbf16;
  color: #ffffff;
}

.input {
  height: 50px;
  margin: 15px auto;
  text-align: center;

  input {
    // width: 320px;
    background: #fdfdfd;
    border-radius: 100px;
    padding: 16px 80px;
    line-height: 24px;
    font-size: 18px;
  }

  .input__error {
    border: 1px solid rgba(185, 86, 15, 0.3);
    color: #b37d57;

    opacity: 0.9;
  }
}

.ok__btn {
  width: 100%;
  max-width: 320px;
  margin: 0 auto;

  padding: 16px 9px;
}

.number--green {
  display: inline-block;
  color: #5dbf16;
}

.room-bot {
  margin-top: 35px;
  padding: 0 20px;
  .find-text {
    font-weight: 500;
    line-height: 27px;
    font-size: 20px;
    text-align: center;

    color: #5a5863;

    /* #5A5863 */
    opacity: 0.9;
  }

  .find-req {
    position: relative;
    text-align: center;
    line-height: 20px;
    font-size: 14px;
    color: #5a5863;

    /* #5A5863 */
    opacity: 0.7;
  }
}

.change-room__answer-wrapper {
  padding-top: 93px;
}

.rules-text {
  line-height: 16px;
  font-size: 12px;
  text-align: center;

  color: rgba(66, 72, 77, 0.5);
  margin-top: 68px;
  a {
    color: inherit;
    text-decoration: underline;
  }
}

@media (min-width: 768px) {
  .visually-hidden {
    display: none;
  }

  .form__list {
    flex-direction: row;
    justify-content: space-between;
    margin: 0 auto;
    flex-wrap: nowrap;
    padding-bottom: 130px;
    width: 708px;

    .form__list-item {
      position: relative;
      width: 127px;

      &:last-child {
        width: 127px;
        .form__list-item--checkbox {
          padding: 16px 30px;
        }
      }

      .form__list-item--checkbox {
        text-align: center;
        padding: 16px 34px;
        border: 1px solid rgba(167, 203, 213, 0.2);
        border-radius: 100px;
        width: 100%;
        font-weight: 500;
        line-height: 20px;
        font-size: 14px;
        color: #5a5863;
      }
    }
  }

  .input {
    order: 2;
    height: 50px;
    margin-bottom: 15px;

    input {
      width: 300px;
      background: #fdfdfd;

      border-radius: 100px;
      padding: 13px 68px;
    }
  }

  .ok__btn {
    width: 300px;
    order: 4;
    padding: 16px 9px;
  }

  .room-bot {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 668px;
    margin: 30px auto;
    padding: 0;

    .find-text {
      order: 1;
      line-height: 29px;
      font-size: 22px;
      width: 385px;
      text-align: left;

      line-height: 29px;
      font-weight: 500;

      font-size: 22px;

      color: #5a5863;

      /* #5A5863 */
      opacity: 0.9;
    }

    .input {
      order: 2;
      width: 260px;
      margin: 0;
      input {
        width: 260px;
        padding: 12px 45px;
      }
    }
    .ok__btn {
      width: 260px;
      height: 50px;
      margin: 0;
    }

    .find-req {
      position: relative;
      order: 3;
      width: 50%;
      text-align: left;

      line-height: 20px;
      font-size: 14px;

      color: #5a5863;

      /* #5A5863 */
      opacity: 0.7;
      order: 3;

      margin-top: 10px;
      &::after {
        content: '';
        position: absolute;
        display: block;
        width: 100px;
        height: 32px;
        background-image: url('/img/ipoteka-arrow.png');
        background-repeat: no-repeat;
        background-size: contain;
        right: -93px;
        bottom: 26px;
      }
    }
    .rules-text {
      order: 5;
      margin: 0 auto;
      margin-top: 98px;
    }
  }
}

@media (min-width: 1240px) {
  .room-bot {
    width: 800px;

    .input {
      width: 300px;
      margin-bottom: 20px;
      input {
        width: 300px;
        padding: 12px 70px;
        padding-right: 65px;
      }
    }

    .ok__btn {
      width: 300px;
    }

    .rules-text {
      margin-top: 165px;
    }
    .find-req {
      width: 41%;
      &::after {
        width: 155px;
        height: 92px;

        background-size: 152px;
        right: -172px;
        bottom: -17px;
      }
    }
  }
  .main-room {
    position: relative;

    margin: 0;
  }

  .change-room__answer-wrapper {
    padding-top: 86px;
  }

  .form__room {
    margin-top: 30px;
  }

  .form__list {
    padding-bottom: 42px;
    width: 810px;
  }

  .form__list-item--checkbox {
    &:hover {
      background: #eff5f7;
    }
  }
}
</style>
