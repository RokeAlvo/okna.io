<template>
  <div class="footer">
    <div class="footer__phone">+7 (383) 895-26-64</div>
    <div class="footer__adress">Нарымская, 27, 10-й этаж</div>
    <div class="footer__logo"></div>
    <a class="conf" href="#">Политика конфиденциальности</a>
  </div>
</template>

<style lang="scss" scoped>
.footer {
  background: #302e35;
  text-align: center;
  padding: 35px 0;

  &__phone {
    font-weight: 500;
    font-size: 20px;
    line-height: normal;
    text-align: center;
    letter-spacing: 0.5px;

    color: #ffffff;
    margin-bottom: 5px;
  }

  &__adress {
    font-size: 14px;
    line-height: 20px;
    text-align: center;
    letter-spacing: 0.3px;

    color: rgba($color: #fdfdfd, $alpha: 0.5);
    margin-bottom: 30px;
  }

  &__logo {
    background-image: url('/img/logo-light.svg');
    background-repeat: no-repeat;

    width: 105px;
    margin: 0 auto;
    height: 33px;
  }

  .conf {
    font-size: 12px;
    line-height: 16px;
    letter-spacing: 0.1px;
    text-decoration-line: underline;

    color: rgba($color: #fdfdfd, $alpha: 0.5);
  }
}
</style>
