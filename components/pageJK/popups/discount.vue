<template>
  <div class="discount--t__wrapper">
    <div class="discount--t__title">акция до {{ discountFinish }}</div>

    <div
      v-if="this.$store.state.dataStateJK.discount_title"
      class="discount--t__content"
    >
      {{ this.$store.state.dataStateJK.discount_title }}
    </div>
    <div class="discount--t__bot-container">
      <div class="discount--t__detail">
        Подробности акции уточняйте в
        <span class="sale-departes discount--t-sale-departes"
          >отделе продаж</span
        >
      </div>
      <div class="discount--t__phone">
        <a
          href
          class="change-phone discount__link-phone"
          @click="$metrika.reachGoal('click-phone-discount')"
          >+7 (383) 388-4896</a
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    discountFinish: String
  }
}
</script>

<style lang="scss">
// @import '../../../sass/mixin';
@import '@/../sass/app.scss';
.discount--t {
  &__wrapper {
    position: relative;
    max-width: 558px;
    width: calc(66% - 10px);
    margin: 0 5px;
    background: linear-gradient(85.05deg, #c0c335 34.25%, #b6ce25 100%);
    box-shadow: 0px 8px 15px rgba(66, 72, 77, 0.1);
    border-radius: 8px;
    height: 270px;
    margin-top: 10px;
    border-radius: 8px;
    @include respond-to(pc) {
      width: calc(50% - 10px);
    }

    @include respond-to(pc-md) {
      width: calc(40% - 20px);
      margin: 20px 10px 0 10px;
    }
  }

  &__title {
    font-weight: 400;
    letter-spacing: 0.5px;

    font-size: 16px;
    line-height: 25px;

    text-transform: uppercase;
    color: #ffffff;
    margin-top: 27px;
    margin-left: 30px;
    margin-bottom: 15px;
  }

  &__content {
    font-weight: 800;

    color: #ffffff;
    width: 370px;
    margin-left: 30px;
    font-size: 24px;
    line-height: 30px;
    letter-spacing: 0.3px;
  }

  &__bot-container {
    display: flex;
    justify-content: space-between;
    margin-left: 30px;
    position: absolute;
    bottom: 34px;
  }

  &__detail {
    font-size: 14px;
    line-height: 22px;

    color: #fdfdfd;
    mix-blend-mode: normal;
    width: 37%;

    font-weight: 300;
    letter-spacing: 0.3px;
  }

  &__phone {
    margin-top: 3px;
    width: 59.5%;
    height: 60px;
    background: #fdfdfd;
    mix-blend-mode: normal;
    border-radius: 30px 0px 0px 30px;
    display: flex;

    a {
      position: relative;
      font-weight: 500;
      font-size: 18px;
      line-height: 24px;
      text-align: center;

      color: #5a5863;
      width: 246px;
      padding: 18px 0 18px 41px;
      letter-spacing: 0.4px;
      &::before {
        content: '';
        display: block;
        position: absolute;
        width: 20px;
        height: 20px;
        background: url('/img/phone.svg') no-repeat;
        left: 29px;
        top: 20px;
        background-size: 21px;
      }
    }
  }
}
</style>
