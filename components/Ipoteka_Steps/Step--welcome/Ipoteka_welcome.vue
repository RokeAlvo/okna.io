<template>
  <div class="flowers-wrapper">
    <!-- <router-link :to="{name:'main'}" class="btn__back"></router-link> -->
    <div class="flowers-top">
      <div class="flowers-title">
        Ипотека с okna
        <sup>.io</sup>
      </div>

      <ul class="flowers-list">
        <li class="flowers-list__item">
          Бесплатное оформление без визита в банк
        </li>
        <li class="flowers-list__item">
          Получение ипотечного решения за 2 дня
        </li>
        <li class="flowers-list__item">Одобрение в 98% случаев</li>
        <li class="flowers-list__item">Подача заявки во все крупные банки</li>
      </ul>
    </div>
    <div class="welcome-bottom">
      <div class="welcome-text">Спасибо за заявку!</div>
      <div class="welcome-call">
        Наш специалист свяжется с вами в рабочее время с 9:00 до 18:00
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.welcome-bottom {
  display: flex;
  flex-direction: column;
  width: 261px;
  margin: 0 auto;
  text-align: center;
}

.welcome-text {
  margin-top: 53px;
  font-weight: 500;
  line-height: 29px;
  font-size: 22px;

  color: #5a5863;

  /* #5A5863 */
  opacity: 0.9;
}

.welcome-call {
  margin-top: 15px;
  line-height: 20px;
  font-size: 14px;

  color: #5a5863;

  /* #5A5863 */
  opacity: 0.7;
}
</style>
