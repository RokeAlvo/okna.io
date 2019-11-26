<template>
  <div class="room-popup-wrapper-main">
    <div class="close-popup room-popup-close" @click.self="closePop"></div>
    <div class="room-popup-overlay" @click.self="closePop">
      <div class="room-popup-wrapper">
        <div class="room-popup--top">
          <div class="room-popup__img">
            <img :src="this.roomImg" alt="img" />
          </div>
          <div class="room-popup__info-wrapper">
            <div class="room-popup__info">
              <div class="info-wrapper">
                <div class="info__title">Комнат:</div>
                <div class="info__text">{{ this.roomTitle }}</div>
              </div>
              <div class="info-wrapper">
                <div class="info__title">Площадь</div>
                <div class="info__text">{{ this.m }} м<sup>2</sup></div>
              </div>
              <div class="info-wrapper">
                <div class="info__title">Отделка</div>
                <div class="info__text">{{ this.finish }}</div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="leavings" class="room-popup__leavings">
          Остал{{ changeEndLeavingsText(this.leavings) }}
          {{ this.leavings }} квартир{{ chengEndLeavings }}
        </div>

        <div v-if="!this.isPost" class="room-popup__number">
          <div class="number-title">
            Узнайте актуальную цену прямо сейчас
          </div>
          <div class="number-request">Введите номер телефона</div>
          <div class="number__input popup__input">
            <input
              v-model="phone"
              v-mask="'+7 (999) 999-99-99'"
              autocomplete="off"
              class="input__phone"
              inputmode="numeric"
              type="text"
              placeholder="+7 (___) ___-__-__"
            />
          </div>

          <div
            class="number__know-price"
            @click="
              validatePhone(1)
              $metrika.reachGoal('submit-cost')
            "
          >
            <span>Узнать точную цену</span>
          </div>

          <div class="number__conf popup-conf">
            Отправляя форму, вы соглашаетесь с
            <a href="/oferta.pdf" target="_blank" class="confend"
              >Политика конфиденциальности</a
            >
          </div>
          <div class="number__phone-link">
            <a
              href
              class="change-phone"
              @click="$metrika.reachGoal('click-phone-plan')"
              >+7 (383) 456-87-46</a
            >
          </div>
        </div>
        <div v-else class="room-popup__welcome">
          <div class="room-popup__welcome--text">Спасибо за заявку!</div>
          <div class="room-popup__welcome--content">
            Наш менеджер свяжется с вами в течение 10 минут в рабочее время и
            ответит на все вопросы
          </div>
        </div>
        <div v-if="isWork" class="call-depart">
          <a
            href
            class="call-depart__wrapper change-phone--text"
            @click="$metrika.reachGoal('click-call-btn-plan')"
          >
            <span>Позвонить</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
