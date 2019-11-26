<template>
  <div class="selection">
    <modal-j-k />
    <div :class="[isFavorites ? 'header--sticky' : 'header--none']">
      <div class="logo"></div>
      <div class="favorites">
        <div class="star">
          <Star />
        </div>
        <div class="favorites__text">
          Избранное:
          <span class="favorites__num">0</span>
        </div>
      </div>
    </div>
    <div class="selection-wrapper">
      <div class="welcome">
        <div class="welcome__user">Добрый день, Ратибор!</div>
        <div class="welcome__select">
          Мы подобрали для вас 18 квартир в 4 комплексах
        </div>
      </div>
      <div
        class="scrolling-wrapper"
        :class="{ 'scrolling-wrapper--sticky': isFavorites }"
      >
        <div class="item">
          <div class="item__text">Ядринцевский квартал – 5</div>
        </div>
        <div class="item">
          <div class="item__text">Ядринцевский квартал – 5</div>
        </div>
        <div class="item">
          <div class="item__text">Ядринцевский квартал – 5</div>
        </div>
        <div class="item">
          <div class="item__text">Ядринцевский квартал – 5</div>
        </div>
        <div class="item">
          <div class="item__text">Ядринцевский квартал – 5</div>
        </div>
        <div class="item">
          <div class="item__text">Ядринцевский квартал – 5</div>
        </div>
        <div class="item">
          <div class="item__text">Ядринцевский квартал – 5</div>
        </div>
        <div class="item">
          <div class="item__text">Ядринцевский квартал – 5</div>
        </div>
      </div>
      <div class="jk">
        <div class="jk__img">
          <div class="is-gorizontal">
            <button class="about-jk" @click="$modal.show('example-adaptive')">
              оs комплексе
            </button>
          </div>
          <div class="jk-name">
            ГринАрт
            <span>СибирьИнвест</span>
          </div>
        </div>
        <div class="jk__apartments">
          <div class="apartments__count">Квартиры: 6</div>
          <div class="apartments-wrapper">
            <div class="apartments__item">
              <div class="apartments__top"></div>
              <div class="apartments__bottom">
                <div class="apartments__info">
                  <div class="rooms">2-ком. ст.</div>
                  <div class="price">от 22 390 000 ₽</div>
                </div>
                <div class="star">
                  <icon-star />
                </div>
              </div>
            </div>
            <div class="apartments__item">
              <div class="apartments__top"></div>
              <div class="apartments__bottom">
                <div class="apartments__info">
                  <div class="rooms">2-ком. ст.</div>
                  <div class="price">от 22 390 000 ₽</div>
                </div>
                <div class="star">
                  <icon-star />
                </div>
              </div>
            </div>
            <div class="apartments__item">
              <div class="apartments__top"></div>
              <div class="apartments__bottom">
                <div class="apartments__info">
                  <div class="rooms">2-ком. ст.</div>
                  <div class="price">от 22 390 000 ₽</div>
                </div>
                <div class="star">
                  <icon-star />
                </div>
              </div>
            </div>
            <div class="apartments__item">
              <div class="apartments__top"></div>
              <div class="apartments__bottom">
                <div class="apartments__info">
                  <div class="rooms">2-ком. ст.</div>
                  <div class="price">от 22 390 000 ₽</div>
                </div>
                <div class="star">
                  <icon-star />
                </div>
              </div>
            </div>
          </div>
          <div class="actual-price">Указанные цены актуальны на 30.02.2019</div>
        </div>
      </div>

      <div class="jk">
        <div class="jk__img">
          <div class="is-gorizontal">
            <div class="about-jk">о комплексе</div>
          </div>
          <div class="jk-name">
            ГринАрт
            <span>СибирьИнвест</span>
          </div>
        </div>
        <div class="jk__apartments">
          <div class="apartments__count">Квартиры: 6</div>
          <div class="apartments-wrapper">
            <div class="apartments__item">
              <div class="apartments__top"></div>
              <div class="apartments__bottom">
                <div class="apartments__info">
                  <div class="rooms">2-ком. ст.</div>
                  <div class="price">от 22 390 000 ₽</div>
                </div>
                <div class="star">
                  <icon-star />
                </div>
              </div>
            </div>
            <div class="apartments__item">
              <div class="apartments__top"></div>
              <div class="apartments__bottom">
                <div class="apartments__info">
                  <div class="rooms">2-ком. ст.</div>
                  <div class="price">от 22 390 000 ₽</div>
                </div>
                <div class="star">
                  <icon-star />
                </div>
              </div>
            </div>
            <div class="apartments__item">
              <div class="apartments__top"></div>
              <div class="apartments__bottom">
                <div class="apartments__info">
                  <div class="rooms">2-ком. ст.</div>
                  <div class="price">от 22 390 000 ₽</div>
                </div>
                <div class="star">
                  <icon-star />
                </div>
              </div>
            </div>
            <div class="apartments__item">
              <div class="apartments__top"></div>
              <div class="apartments__bottom">
                <div class="apartments__info">
                  <div class="rooms">2-ком. ст.</div>
                  <div class="price">от 22 390 000 ₽</div>
                </div>
                <div class="star">
                  <icon-star />
                </div>
              </div>
            </div>
          </div>
          <div class="actual-price">Указанные цены актуальны на 30.02.2019</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Star from './icons/iconStar.vue'
import ModalJK from './aboutcomplex.vue'
export default {
  components: {
    Star,
    ModalJK
  },
  data() {
    return {
      isFavorites: false,
      isAboutComplex: false
    }
  },

  computed: {},

  mounted() {
    window.addEventListener('scroll', this.stickyHead)
  },
  methods: {
    stickyHead() {
      if (
        document.documentElement.scrollTop > 1500 &&
        document.documentElement.scrollTop < 2841
      ) {
        this.isFavorites = true
      } else {
        this.isFavorites = false
      }
    },
    openAboutComplex() {
      this.isAboutComplex = !this.isAboutComplex
      // console.log(this.isAboutComplex);
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  &--none {
    display: none;
  }

  &--sticky {
    position: sticky;
    top: 0;
    z-index: 1;
    background: #ffffff;
    box-shadow: 0px 8px 15px rgba(129, 134, 138, 0.1);
    height: 50px;
    display: flex;
    .logo {
      background-image: url('/img/lightLogo.svg');
      background-repeat: no-repeat;
      height: 26px;
      width: 85px;
      margin: 10px auto 10px 10px;
    }

    .favorites {
      display: flex;
      align-items: center;
      margin-right: 10px;

      &__text {
        font-size: 14px;
        line-height: 25px;
        letter-spacing: 0.1px;

        color: #5a5863;
      }
    }

    .star {
      margin-right: 6px;
    }
  }
}

.scrolling-wrapper--sticky {
  position: sticky;
  top: 50px;
  z-index: 1;
  background: #f1f1f1;
}

.selection {
  background: #f1f1f1;
  padding-bottom: 50px;
}

.welcome {
  width: 300px;
  margin: 0 auto;
  margin-bottom: 30px;

  .welcome__user {
    font-weight: 300;
    font-size: 22px;
    line-height: 40px;
    text-align: center;
    letter-spacing: 0.1px;

    color: #5a5863;

    /* #5A5863 */
    opacity: 0.9;
    padding-top: 79px;
  }

  .welcome__select {
    font-weight: 500;
    font-size: 20px;
    line-height: 30px;
    text-align: center;
    letter-spacing: 0.2px;

    color: #5a5863;

    /* #5A5863 */
    opacity: 0.9;
    padding-bottom: 8px;
    border-bottom: 1px solid #dfe2e3;
  }
}

.scrolling-wrapper {
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  margin-bottom: 40px;
  padding: 10px 0;

  .item {
    flex: 0 0 auto;
    margin-right: 10px;
    background: #ffffff;
    /* 2 px */
    box-shadow: 0px 2px 4px rgba(66, 72, 77, 0.1);
    border-radius: 100px;

    &:first-child {
      margin-left: 10px;
    }

    &__text {
      padding: 12px 15px;
      font-weight: 500;
      font-size: 12px;
      line-height: 16px;
      text-align: center;
      letter-spacing: 0.1px;

      color: #5a5863;

      /* #5A5863 */
      opacity: 0.7;
    }
  }

  &::-webkit-scrollbar {
    display: none;
  }
}

.jk {
  width: 93.75%;
  margin: 0 auto;
  background: #fdfdfd;
  /* 8 px */
  box-shadow: 0px 8px 15px rgba(66, 72, 77, 0.1);
  border-radius: 8px;
  &__img {
    height: 280px;
    background: url('/img/bg-select.png');
    position: relative;
    border-radius: 8px 8px 0 0;
  }

  &-name {
    font-weight: 300;
    font-size: 20px;
    line-height: 20px;
    letter-spacing: 0.1px;

    color: #ffffff;

    text-shadow: 0px 0px 10px #17191a;
    padding-top: 225px;
    padding-left: 25px;
    display: flex;
    flex-direction: column;

    span {
      font-size: 12px;
      line-height: 20px;

      color: #f5f6f9;
      margin-top: 3px;
      /* #F5F6F9 */
      opacity: 0.6;
      text-shadow: 0px 0px 15px rgba(23, 25, 26, 0.7);
    }
  }

  &__apartments {
    position: relative;
  }
}

.is-gorizontal {
  position: relative;
}

.about-jk {
  cursor: pointer;
  // position: absolute;
  width: 250px;
  height: 50px;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  letter-spacing: 0.5px;
  text-transform: uppercase;

  // top: 115px;
  // left: 150px;
  padding-top: 17px;
  color: #fdfdfd;
  background: #5dbf16;
  // box-shadow: 0px 16px 25px rgba(66, 72, 77, 0.1);
  border-radius: 8px 8px 0px 0px;
  // transform: translate(40px, 30px) rotate(-90deg);

  position: absolute;
  right: -60px;
  top: 85px;
  transform: translate(40px, 30px) rotate(-90deg);
}

.apartments {
  &-wrapper {
    display: flex;
    flex-wrap: nowrap;
    overflow-x: auto;
    margin-bottom: 50px;
    padding-bottom: 20px;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  &__item {
    width: 200px;
    height: 250px;
    flex: 0 0 auto;
    margin-right: 10px;

    border: 1px solid #eff0f1;
    box-sizing: border-box;
    border-radius: 8px;

    &:first-child {
      margin-left: 20px;
    }
  }

  &__count {
    margin: 16px 13px 14px;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: 0.1px;

    color: rgba($color: #5a5863, $alpha: 0.9);

    /* #5A5863 */
  }

  &__top {
    height: 180px;
    width: 170px;
    margin: 0 auto;
    background: url('/img/12.jpg');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    border-bottom: 1px solid #eff0f1;
  }

  &__bottom {
    display: flex;
    width: 160px;
    margin: 0 auto;
    margin-top: 18px;
    justify-content: space-between;

    .star {
      align-self: flex-end;
    }
  }

  &__info {
    .rooms {
      font-weight: 500;
      font-size: 12px;
      line-height: 16px;
      letter-spacing: 0.1px;

      color: #5a5863;

      opacity: 0.6;
      margin-bottom: 4px;
    }

    .price {
      font-weight: 500;
      font-size: 12px;
      line-height: 16px;
      letter-spacing: 0.1px;

      color: #5a5863;

      opacity: 0.9;
    }
  }
}

.actual-price {
  position: absolute;
  bottom: -26px;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0.1px;
  right: 0;
  color: #626c7a;

  /* #626C7A */
  opacity: 0.5;
}
</style>
