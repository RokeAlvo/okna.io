<template>
  <div class="isquestion">
    <div class="isquestion__title">
      Остались ещё вопросы?
      <div>Задайте их своему персональному менеджеру:</div>
    </div>
    <div class="manager">
      <div class="manager__avatar"></div>
      <div class="manager__info">
        <span>Ваш менеджер</span>
        <div class="manager__name">Евгений Ололоев</div>
        <div class="manager__phone button button--green">
          +7 (383) 895-26-64
        </div>
        <div class="manager__order-call button button--white">
          Заказать звонок
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.isquestion {
  background: #fdfdfd;

  height: 100vh;
  // min-height: calc(100vh - 201px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  &__title {
    width: 68%;
    margin: 0 auto;
    margin-bottom: 24px;
    // padding-top: 70px;
    font-weight: 300;
    font-size: 30px;
    line-height: 35px;
    text-align: center;
    letter-spacing: 0.2px;

    color: #5a5863;
    div {
      margin-top: 24px;
      font-weight: 300;
      font-size: 16px;
      line-height: 25px;
      text-align: center;
      letter-spacing: 0.1px;

      color: #5a5863;

      /* #5A5863 */
      opacity: 0.9;
    }
  }
  .manager {
    margin: 0 auto;
    background: none;
    opacity: 1;

    box-shadow: none;

    &__avatar {
      margin: 0 auto;
    }

    &__name {
      border-bottom: none;
    }

    .manager__phone {
      box-shadow: 0px 16px 25px rgba(66, 72, 77, 0.1);
      width: 253px;
    }

    .manager__order-call {
      width: 203px;
      background: #fdfcfe;
      box-shadow: 0px 16px 25px rgba(66, 72, 77, 0.1);
      font-weight: 500;
      font-size: 16px;
      line-height: 24px;
      text-align: center;
      letter-spacing: 0.1px;
      padding: 16px 31px;
      margin: 0 auto;
      color: rgba($color: #5a5863, $alpha: 0.5);
    }
  }
}
</style>
