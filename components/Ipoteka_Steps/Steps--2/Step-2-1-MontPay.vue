<template>
  <div class="main">
    <!-- <router-link :to="{name:'main'}" class="btn__back"></router-link> -->
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
        <div class="answer answer--2-1">Введите удобный месячный платёж</div>
        <span>и рассчитайте стоимость вашей будущей квартиры</span>
      </div>

      <div class="sum">
        <div class="sum__input">
          <input
            v-model="inputValue"
            v-money="inputValue !== null ? money : null"
            class="sum__input"
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
        <div>
          <span @click.capture="checkInput">
            <router-link
              :to="{ name: 'twoTwo' }"
              class="sum__btn btn btn--green"
              >Рассчитать сумму</router-link
            >
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { VMoney } from 'v-money'
import { HTTP, Routes } from '@/components/server/API.js'
import { Utils } from '@/utils/utils.js'
export default {
  directives: { money: VMoney },
  data() {
    return {
      inputValue: null,
      money: {
        thousands: ' ',

        precision: 0,
        masked: false
      },
      postBody: {
        rooms_list: [],
        price_from: 800000
      },

      notificationSystem: Utils.notificationSystem
    }
  },

  methods: {
    setSum() {
      this.inputValue = this.inputValue.slice(0, 15)
    },

    checkInput(e) {
      if (this.inputValue === null) {
        e.preventDefault()
        this.$toast.error(
          'Введите удобный месячный платеж',
          'Ошибка',
          this.notificationSystem.options.error
        )
      } else {
        const currentSum = parseInt(
          this.inputValue.replace(/[($)\s\._\-]+/g, ''),
          10
        )
        this.$store.commit('setCurrentSum', currentSum)
        this.$store.commit('setCurrentSumState', currentSum)
        this.requestCountJK()
      }
    },

    requestCountJK() {
      HTTP.post(
        Routes.getHandlerRooms,
        {},
        {
          params: {
            rooms_list: [],
            price_from: Math.floor(
              Utils.helpers.FSum(this.$store.state.currentSum, 10)
            )
          }
        }
      )
        .then(({ data }) => {
          this.$store.commit('setCountJK', data)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
}
</script>

<style lang="scss">
.sum__input {
  padding-bottom: 35px;
  input {
    position: relative;
    // margin-bottom: 40px;
    padding: 15px 34px 15px 30px;
    background: #fdfdfd;
    border-radius: 50px;

    font-size: 18px;
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
}

.sum {
  margin: 0 auto;
  margin-top: 47px;
  margin-bottom: 40px;
  position: relative;
  width: 300px;
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
  padding: 16px 69px;
}

@media (min-width: 768px) {
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

  .sum__btn {
    margin-top: 20px;
    padding: 13px 69px;
  }

  .btn__back {
    top: -210px;
    left: 20px;
  }
}

@media (min-width: 1240px) {
  .title-wrapper {
    margin: 0 38px;
    border-bottom: 1px solid rgba(167, 203, 213, 0.1);
  }

  .btn__back {
    top: 200px;
    left: -70px;
  }

  .sum__btn {
    padding: 16px 73px;
  }

  .answer--2-1 {
    max-width: 594px;
    width: 594px;
    font-size: 30px;
    line-height: 37px;
    font-weight: 300;
  }
}
</style>
