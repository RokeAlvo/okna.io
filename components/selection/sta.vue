<template>
  <div class="cta">
    <div class="cta__text">
      Экономьте свои время, деньги и нервы с
      <span class="text--green">okna.io</span>
    </div>
    <a href="#" class="button button--green">Перейти к подборке</a>
    <div class="manager">
      <div class="manager__avatar"></div>
      <div class="manager__info">
        <span>Ваш менеджер</span>
        <div class="manager__name">Евгений Ололоев</div>
        <div class="manager__phone">+7 (383) 895-26-64</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.cta {
  display: flex;
  flex-direction: column;
  background: url('/img/select-bg-phone.jpg');
  background-repeat: no-repeat;
  background-size: cover;

  &__text {
    text-align: center;
    width: 93.75%;

    margin: 0 auto;
    margin-top: 150px;
    font-size: 26px;

    letter-spacing: 0.2px;

    color: #5a5863;
  }
}

.text--green {
  color: #5dbf16;
}

.manager {
  width: 278px;
  margin: 0 auto;
  margin-bottom: 20px;
  background: #fafbfb;
  opacity: 0.9; /* 16 px */
  box-shadow: 0px 16px 25px rgba(90, 88, 99, 0.1);
  border-radius: 8px;

  &__avatar {
    margin: 0 auto;
    margin-top: -58px;
    background: url('/img/user-undefind.png');
    width: 90px;
    height: 90px;
    box-shadow: 0px 16px 25px rgba(90, 88, 99, 0.1);
    border-radius: 50%;
  }

  &__info {
    text-align: center;

    span {
      font-size: 14px;
      line-height: 25px;
      letter-spacing: 0.1px;

      color: #3c4a54;
    }

    .manager__name {
      font-weight: 500;
      font-size: 16px;
      line-height: normal;
      letter-spacing: 0.1px;

      color: #5a5863;
      width: 187px;
      margin: 0 auto;
      margin-bottom: 11px;
      padding-bottom: 8px;
      border-bottom: 1px solid #dfe2e3;
    }

    .manager__phone {
      margin-bottom: 16px;
    }
  }
}
</style>
