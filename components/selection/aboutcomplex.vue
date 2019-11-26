<template>
  <modal
    name="example-adaptive"
    transition="nice-modal-fade"
    :min-width="200"
    :min-height="200"
    :delay="100"
    :adaptive="true"
  >
    <div class="about">
      <div class="head">
        <div class="jk__name">Ядринцевский квартал</div>
        <div class="icon-close"></div>
      </div>
      <div class="main">
        <h1>О комплексе</h1>
        <ul class="complex__list">
          <li class="complex__lits-item">
            <div class="item-icon"></div>
            <div class="item__text">
              <span class="text__title">Адрес</span>
              <div class="text__text">Ядринцевская, 54</div>
            </div>
          </li>
          <li class="complex__lits-item">
            <div class="item-icon"></div>
            <div class="item__text">
              <span class="text__title">Материал дома</span>
              <div class="text__text">Монолит-кирпич</div>
            </div>
          </li>
          <li class="complex__lits-item">
            <div class="item-icon"></div>
            <div class="item__text">
              <span class="text__title">Срок сдачи</span>
              <div class="text__text">Сдан – II 2020</div>
            </div>
          </li>
          <li class="complex__lits-item">
            <div class="item-icon"></div>
            <div class="item__text">
              <span class="text__title">Этажность</span>
              <div class="text__text">22</div>
            </div>
          </li>
        </ul>
        <div class="about-jk">
          «Ядринцевский квартал» это расположенный в центральном районе города
          Новосибирска дом повышенного комфорта, а соответственно, и высокого
          качества строительства. Дом сразу же привлекает внимание, благодаря
          своему архитектурному дизайну и благоустроенной территорией комплекса.
          Отличительной чертой комплекса является то, что все планировки
          квартир-это просторные студии, которое позволят распоряжаться
          пространством по своему усмотрению.
        </div>
      </div>
      <button>Свернуть описание</button>
    </div>
  </modal>
</template>

<script>
export default {
  name: 'ModalAdaptive'
}
</script>
