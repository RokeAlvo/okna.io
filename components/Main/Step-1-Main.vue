<template>
  <div v-if="tt < 10" class="main">
    <div v-if="this.ready" class="title-wrapper">
      <div class="title title-main">
        <span>Даем зеленый свет ипотеке -</span>
        <span class="name-company">
          okna
          <sup>.io</sup>
        </span>
      </div>
    </div>

    <div v-if="this.ready" class="content-main">
      <div class="answer" @click="tt++">Уже выбрали квартиру?</div>

      <div class="questions-container">
        <div class="question-container">
          <span>
            <router-link
              :to="{ name: 'oneOne' }"
              class="question__btn btn btn--green"
            >
              Да
            </router-link>
          </span>
          <span class="text__bottom">Рассчитать платёж</span>
        </div>

        <div class="question-container">
          <span>
            <router-link
              :to="{ name: 'twoOne' }"
              class="question__btn btn btn--green"
            >
              Нет
            </router-link>
          </span>
          <span class="text__bottom">Рассчитать сумму</span>
        </div>
      </div>
    </div>
    <Loader v-else />
  </div>
  <div v-else class="tt">TEST FMS</div>
</template>

<script>
import { HTTP, Routes } from '@/components/server/API.js'
import { Utils } from '@/utils/utils.js'
import Loader from '@/utils/components/Loader.vue'
export default {
  components: {
    Loader
  },
  data() {
    return {
      minPrice: null,
      minSumm: null,
      ready: false,
      notificationSystem: Utils.notificationSystem,
      tt: 0
    }
  },
  mounted() {
    this.getParams()
  },

  methods: {
    getParams() {
      HTTP.post(Routes.getParamsIpoteka, {})
        .then(({ data }) => {
          console.log('GetParams-')
          console.log(data)
          this.minPriceState = data.minPrice

          this.$store.commit('setIdRooms', data.rooms)
          this.$store.commit('setMinPriceState', this.minPriceState)
          this.ready = true
        })
        .catch((error) => {
          console.log(error)
          this.$toast.error(
            'No data',
            'Error',
            this.notificationSystem.options.error
          )
        })
    }
  }
}
</script>

<style lang="scss">
.tt {
  position: fixed;
  top: 50%;
  left: calc(50% - 70px);
  font-weight: 300;
  font-size: 30px;
  line-height: 28px;
  letter-spacing: 0.2px;
}
.main {
  margin: 0;
  width: 100%;
  height: 100vh;
  min-height: 661px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.title-main {
  width: 100%;
  padding: 0 20px 24px 20px;
  border-bottom: 1px solid rgba(167, 203, 213, 0.1);
}

.title-wrapper {
  display: flex;
  justify-content: center;
}

.title {
  font-weight: 300;
  line-height: 27px;
  font-size: 20px;
  text-align: center;
  letter-spacing: 0.2px;
  color: #8dae54;
  padding: 0 20px 24px;
  margin: 0 auto;
  .name-company {
    display: inline-block;
  }
}

.content-main {
  margin: 0;
  padding: 75px 20px 0 20px;
}

.question__btn {
  display: block;
  padding: 13px 40px;
  text-transform: uppercase;
  text-align: center;
}

.questions-container {
  max-width: 320px;
  display: flex;
  margin: 0 auto;
  margin-top: 51px;
  justify-content: space-between;
}

.question-container {
  display: flex;
  flex-direction: column;
  width: 49%;
  max-width: 155px;
}

.text__bottom {
  margin-top: 13px;
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  text-align: center;
  letter-spacing: 0.1px;

  color: rgba($color: #5a5863, $alpha: 0.5);

  /* #5A5863 */
}

@media (min-width: 768px) {
  .main {
    margin-bottom: 0;
  }
  .title {
    margin: 0 auto;
    width: 456px;
    padding: 36px 0 40px 30px;
  }

  .question-container {
    max-width: 200px;
    display: flex;
    flex-direction: column;
  }

  .questions-container {
    display: flex;
    max-width: 420px;
    margin: 0 auto;
    margin-top: 51px;
    justify-content: space-between;
  }

  .question__btn {
    padding: 13px 80px;
    text-transform: uppercase;
  }
}

@media (min-width: 1240px) {
  .main {
    position: relative;
    margin: 0;
    display: block;
    min-height: unset;
    height: unset;
  }
  .title-wrapper {
    margin: 0 auto;
    border-bottom: 1px solid rgba(167, 203, 213, 0.1);
  }

  .title-main {
    width: 456px;
    padding: 36px 0 40px 30px;
  }

  .content-main {
    padding-top: 92px;
  }

  .text__bottom {
    margin-top: 5px;
    font-size: 12px;
    color: #5a5863;
    opacity: 0.5;
    text-align: center;
  }

  .questions-container {
    display: flex;
    // width: 420px;
    margin: 0 auto;
    margin-top: 45px;
    justify-content: space-between;
  }

  .question__btn {
    text-transform: uppercase;
    margin-bottom: 0;
  }
}
</style>
