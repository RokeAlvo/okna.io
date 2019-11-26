<template>
  <div class="steps">
    <div class="steps__title">
      6 бесплатных шагов к новой квартире с okna.io
    </div>
    <ul class="steps__list">
      <li>
        <div class="step__number">
          <div>1</div>
        </div>
        <div class="step__text">
          <div class="step__text__title">Консультация</div>
          <span class="step__text__desc"
            >Подробно рассказываем об интересных ЖК, ценах и вариантах
            оплаты</span
          >
        </div>
      </li>
      <li>
        <div class="step__number">
          <div>2</div>
        </div>
        <div class="step__text">
          <div class="step__text__title">Подбор вариантов</div>
          <span class="step__text__desc"
            >Отбираем лучшие предложения только от надёжных застройщиков</span
          >
        </div>
      </li>
      <li>
        <div class="step__number">
          <div>3</div>
        </div>
        <div class="step__text">
          <div class="step__text__title">Экскурсия</div>
          <span class="step__text__desc"
            >Выезжаем с вами на интересующие объекты и показываем квартиры</span
          >
        </div>
      </li>
      <li>
        <div class="step__number">
          <div>4</div>
        </div>
        <div class="step__text">
          <div class="step__text__title">Выбор квартиры</div>
          <span class="step__text__desc"
            >Бесплатно бронируем за вами понравившуюся квартиру</span
          >
        </div>
      </li>
      <li>
        <div class="step__number">
          <div>5</div>
        </div>
        <div class="step__text">
          <div class="step__text__title">Получение ипотеки</div>
          <span class="step__text__desc"
            >Отправляем документы за вас и выбираем лучшее ипотечное
            решение</span
          >
        </div>
      </li>
      <li>
        <div class="step__number">
          <div>6</div>
        </div>
        <div class="step__text">
          <div class="step__text__title">Заключение сделки</div>
          <span class="step__text__desc"
            >Помогаем подготовить необходимые документы и сопровождаем
            сделку</span
          >
        </div>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.steps {
  background: linear-gradient(90deg, #f2f2f2 0%, #dcd7d3 100%);
  padding-bottom: 50px;
  &__title {
    font-weight: 500;
    font-size: 20px;
    line-height: normal;
    letter-spacing: 0.2px;

    color: #5a5863;

    /* #5A5863 */
    opacity: 0.9;
    width: 289px;
    padding-top: 77px;
    margin: 0 auto 70px 10px;
  }
}

.steps__list {
  margin: 0 10px;
  li {
    display: flex;
    margin-bottom: 40px;
  }

  li:last-child {
    margin: 0;
  }
}

.step__number {
  width: 60px;
  height: 60px;
  background: #fdfdfd;
  opacity: 0.8; /* 16 px */
  box-shadow: 0px 16px 25px rgba(90, 88, 99, 0.1);
  display: flex;
  align-self: center;

  align-items: center;
  justify-content: center;
  border-radius: 50%;

  div {
    font-weight: 800;
    font-size: 40px;
    line-height: 24px;
    text-align: center;
    letter-spacing: 0.1px;

    color: #eae8e7;
  }
}

.step__text {
  width: 73%;
  margin: 0 auto 0 20px;

  &__title {
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    letter-spacing: 0.1px;

    color: rgba($color: #5a5863, $alpha: 0.9);
    margin-bottom: 7px;

    /* #5A5863 */
  }

  &__desc {
    font-size: 14px;
    line-height: 20px;
    letter-spacing: 0.1px;

    color: rgba($color: #5a5863, $alpha: 0.7);

    /* #5A5863 */
  }
}
</style>
