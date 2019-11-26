<template lang="pug">
    section.section4
      Hooper(:settings="hooperSettings")
        Slide
          PromoCard(
            title="Всегда актуальная база новостроек Новосибирска"
            article="Все свежие предложения от надёжных застройщиков для объективного выбора"
            imgId="1"
            )
        Slide
          PromoCard(
            title="Оформление ипотеки без очередей и визита в банк"
            article="Отправляем документы за вас в несколько банков, чтобы выбрать лучшее решение"
            imgId=2
            )
        Slide
          PromoCard(
            title="Прозрачное участие без договоров и комиссии"
            article="Вы не подписываете ничего с нами и покупаете квартиру напрямую у застройщика"
            imgId=3
            )
        Slide
          PromoCard(
            title="Бесплатное юридическое сопровождение сделки"
            article="Помогаем и консультируем на всём пути от выбора к оформлению покупки"
            imgId=4
            )
</template>
<script>
import { Hooper, Slide } from 'hooper'
import 'hooper/dist/hooper.css'
import PromoCard from '@/components/home/PromoCard'

export default {
  components: {
    Hooper,
    Slide,
    PromoCard
  },
  data() {
    return {
      hooperSettings: {
        itemsToShow: 4,
        centerMode: false,
        infiniteScroll: true,
        breakpoints: {
          300: {
            itemsToShow: 1,
            centerMode: true
          },
          700: {
            itemsToShow: 2
          },
          1000: {
            itemsToShow: 3,
            pagination: 'fraction'
          },
          1200: {
            itemsToShow: 4,
            pagination: 'fraction'
          }
        }
      }
    }
  }
}
</script>
<style lang="scss">
.section4 {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 500px;

  &__content {
    width: 1200px;
    display: flex;
    justify-content: space-between;

    .slick-list {
      width: 100%;
      .slick-track {
        width: 100% !important;
        display: flex;
        justify-content: space-between;
        transform: translate3d(0, 0, 0) !important;
      }
    }
  }

  .hooper {
    height: auto;
    max-width: 1200px;
    margin: auto;
  }
  .is-current {
    margin-left: 50px;
    @media screen and (max-width: 800px) {
      margin-left: 100px;
    }
    @media screen and (max-width: 400px) {
      margin-left: 80px;
    }
  }
}
</style>
