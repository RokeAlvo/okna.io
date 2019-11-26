<template>
  <div class="advantages">
    <div class="content">
      <div class="content__title">Что такое okna.io</div>
      <ul class="advantages__list">
        <li class="advantages__list__item">
          <div class="advantages__list__item__text">
            Всегда актуальная база новостроек Новосибирска
            <span
              >Все свежие предложения от надёжных застройщиков для объективного
              выбора</span
            >
          </div>
        </li>
        <li class="advantages__list__item">
          <div class="advantages__list__item__text">
            Прозрачное участие без посреднических договоров
            <span
              >Вы не подписываете ничего с нами и покупаете квартиру напрямую у
              застройщика</span
            >
          </div>
        </li>
        <li class="advantages__list__item">
          <div class="advantages__list__item__text">
            Оформление ипотеки без очередей и визита в банк
            <span
              >Мы отправляем документы за вас в несколько банков, чтобы выбрать
              лучшее решение</span
            >
          </div>
        </li>
        <li class="advantages__list__item">
          <div class="advantages__list__item__text">
            Бесплатное юридическое сопровождение сделки
            <span
              >Помогаем и консультируем на всём пути от выбора к оформлению
              покупки</span
            >
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.advantages {
  background: #fdfdfd;
}

.advantages__list {
  margin-bottom: 52px;
}

.content__title {
  font-weight: 500;
  font-size: 20px;
  line-height: 30px;
  letter-spacing: 0.2px;

  color: #1dba36;

  opacity: 0.9;

  margin-bottom: 32px;
}

.advantages__list__item {
  width: 250px;
  margin: 0 auto;
}

.advantages__list__item__text {
  display: flex;
  flex-direction: column;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  text-align: center;
  letter-spacing: 0.1px;
  opacity: 0.9;
  color: #5a5863;
  margin-bottom: 33px;
  span {
    padding-top: 8px;
    font-size: 14px;
    line-height: 20px;
    text-align: center;
    letter-spacing: 0.1px;

    color: #5a5863;
    opacity: 0.6;
  }
}
</style>
