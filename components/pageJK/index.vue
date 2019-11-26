<template>
  <div class="new-jk">
    <section class="header-menu">
      <div class="jk-menu">
        <div
          class="menu__strok"
          @click="
            openLeftMenu()
            $metrika.reachGoal('click-menu-btn')
          "
        ></div>
      </div>
      <a
        :href="currentPath"
        class="header-menu__logo header-menu__logo--test"
      ></a>
      <nav>
        <ul class="header-menu__list">
          <li class="header-menu__list__item header-menu__list__item--circles">
            <div
              v-if="!showNavigationLinks"
              class="circles header-menu__circles"
              @click="showNavigationLinks = true"
            ></div>

            <div
              v-else
              class="crest"
              @click="showNavigationLinks = false"
            ></div>
          </li>
          <li class="header-menu__list__item">
            <a class="" href="#photos">Фотографии</a>
          </li>
          <li class="header-menu__list__item">
            <a href="#about-jk">О комплексе</a>
          </li>
          <li class="header-menu__list__item">
            <a href="#apartments">Квартиры</a>
          </li>

          <li class="header-menu__list__item">
            <a href="#location">Расположение</a>
          </li>
          <li
            v-if="isDiscount"
            class="header-menu__list__item header-menu__list__item--discount"
          >
            <div
              @click="
                openDiscount()
                $metrika.reachGoal('click-discount')
              "
            >
              Акция
            </div>
          </li>
        </ul>
        <transition name="fade-desc">
          <ul
            v-if="showNavigationLinks"
            class="header-menu__list header-menu__list--bottom"
          >
            <li
              v-for="(item, index) in menu"
              :key="index"
              class="header-menu__list__item"
            >
              <a :href="item.route">{{ item.title }}</a>
            </li>
          </ul>
        </transition>
      </nav>
      <a
        href="tel:+73833884896"
        class="change-phone header-menu__phone"
        @click="$metrika.reachGoal('click-call-btn-header.number')"
        >+7 (383) 388-48-96
      </a>
    </section>

    <transition name="overlay">
      <div
        v-show="showLeftMenu"
        class="left-menu__overlay"
        @click.self="closeLeftMenu"
      ></div>
    </transition>

    <transition name="fade-left-menu">
      <div v-show="showLeftMenu" class="left-menu__wrapper">
        <div class="left-menu__wrappers">
          <div class="close-left-menu" @click="closeLeftMenu"></div>
          <div class="left-menu">
            <div class="left-menu__logo-container">
              <a :href="currentPath" class="left-menu__logo"></a>
              <div class="left-menu__name-complex">{{ getTitle }}</div>
            </div>

            <ul class="left-menu__list">
              <li class="left-menu__list__item">
                <a href="#photos" @click="closeLeftMenu">Фотографии</a>
              </li>
              <li class="left-menu__list__item">
                <a href="#about-jk" @click="closeLeftMenu">О комплексе</a>
              </li>
              <li class="left-menu__list__item">
                <a href="#apartments" @click="closeLeftMenu">Квартиры</a>
              </li>

              <li class="left-menu__list__item">
                <a href="#location" @click="closeLeftMenu">Расположение</a>
              </li>
              <li
                v-if="isDiscount"
                class="left-menu__list__item left-menu__list__item--discount"
              >
                <a
                  @click="
                    openDiscount()
                    closeLeftMenu()
                    $metrika.reachGoal('click-discount')
                  "
                  >Акция</a
                >
              </li>
              <li class="left-menu__list__item">
                <div
                  v-if="!showNavigationLinks"
                  class="left-menu__circles circles"
                  @click="showNavigationLinks = true"
                ></div>
              </li>
            </ul>
            <ul
              v-if="showNavigationLinks"
              class="left-menu__list left-menu__list--hidden"
            >
              <li
                v-for="(item, index) in menu"
                :key="index"
                class="left-menu__list__item left-menu__list--hidden__item"
              >
                <a :href="item.route">{{ item.title }}</a>
              </li>
            </ul>
            <div class="number-phone__text--link left-menu__text--link">
              <a
                href="tel:+73833884896"
                class="change-phone jk-left-menu__text-link"
                >+7 (383) 388-48-96</a
              >
            </div>
          </div>
        </div>
      </div>
    </transition>

    <section id="photos" class="slider-jk">
      <transition name="overlay">
        <div
          v-show="showDiscount"
          class="discount-popup--overlay"
          @click.self="closeDiscount"
        ></div>
      </transition>
      <transition name="fade-popup">
        <div v-show="showDiscount" class="discount-popup--fixed">
          <div class="close-popup" @click="closeDiscount"></div>
          <div class="discount-popup__title">
            акция до {{ this.discountFinish }}
          </div>
          <div class="discount-popup__img"></div>

          <div
            v-if="this.$store.state.dataStateJK.discount_title"
            class="discount-popup__content"
          >
            {{ this.$store.state.dataStateJK.discount_title }}
          </div>
          <div class="discount-popup__req">
            Подробности акции уточняйте в отделе продаж
          </div>

          <div class="discount__phone">
            <a
              href="tel:+73833884896"
              class="change-phone"
              @click="$metrika.reachGoal('click-phone-discount')"
              >+7 (383) 388-48-96</a
            >
          </div>
        </div>
      </transition>

      <swiper v-if="this.$store.state.currentJK" :options="swiperOption">
        <swiper-slide>
          <div
            v-if="this.$store.state.currentJK.bg_image_original"
            v-lazy:background-image="
              this.$store.state.currentJK.bg_image_original
            "
            class="slide-img"
          ></div>
        </swiper-slide>
        <swiper-slide>
          <div
            v-if="this.$store.state.currentJK.main_image"
            v-lazy:background-image="this.$store.state.currentJK.main_image"
            class="slide-img"
          ></div>
        </swiper-slide>
        <swiper-slide
          v-for="slider in this.$store.state.dataStateJK.images"
          :key="slider.id"
        >
          <div v-lazy:background-image="slider.main" class="slide-img"></div>
        </swiper-slide>

        <div
          slot="pagination"
          class="swiper-pagination swiper-pagination-bullets"
        ></div>
        <div slot="button-prev" class="swiper-button swiper-button-prev">
          <div class="swiper-button--arrow"></div>
        </div>
        <div slot="button-next" class="swiper-button swiper-button-next">
          <div class="swiper-button--arrow"></div>
        </div>
      </swiper>
      <div v-else>
        <content-loader :height="400"></content-loader>
      </div>
    </section>

    <section id="about-jk" class="jk-info">
      <div
        v-if="isDiscount"
        class="discount__button"
        @click="
          openDiscount()
          $metrika.reachGoal('click-discount')
        "
      >
        <span>Акция</span>
      </div>

      <a href="#apartments" class="btn--to-room">
        <span>Выбрать квартиру</span>
      </a>
      <div v-if="this.$store.state.currentJK" class="jk-name">
        ЖК {{ getTitle }}
      </div>
      <div v-else class="jk-name">
        <content-loader :height="40"></content-loader>
      </div>
      <ul class="desc-list">
        <li class="desc-list__item desc-list__item--apartments">
          <span class="item-heandle">Квартиры</span>
          <div v-if="this.$store.state.currentJK" class="item-text">
            от
            {{ butyNumber(this.$store.state.dataStateJK.apartments_price_min) }}
            ₽
          </div>
          <div v-else class="item-text">
            <content-loader :height="20"></content-loader>
          </div>
        </li>
        <li class="desc-list__item desc-list__item--deadline">
          <span class="item-heandle">Сдача</span>
          <div v-if="this.$store.state.currentJK" class="item-text">
            {{ this.$store.state.dataStateJK.completion_date_full }}
          </div>
          <div v-else class="item-text">
            <content-loader :height="20"></content-loader>
          </div>
        </li>
        <li class="desc-list__item desc-list__item--location">
          <span class="item-heandle">Адрес</span>
          <div v-if="this.$store.state.currentJK" class="item-text">
            {{ this.$store.state.dataStateJK.address }}
          </div>
          <div v-else class="item-text">
            <content-loader :height="20"></content-loader>
          </div>
        </li>
      </ul>

      <div
        v-if="!isDesc"
        class="btn__show-all"
        @click="
          isDesc = !isDesc
          $metrika.reachGoal('click-more')
        "
      >
        Развернуть описание
      </div>

      <div
        v-else
        class="btn__show-all"
        @click="
          isDesc = !isDesc
          $metrika.reachGoal('click-more')
        "
      >
        Свернуть описание
      </div>
      <transition name="fade-desc">
        <div v-show="isDesc" class="advantages">
          <ul class="advantages-list">
            <li class="advantages-list__item">
              <span>Материал дома</span>
              <div>{{ this.$store.state.dataStateJK.materials }}</div>
            </li>
            <li class="advantages-list__item">
              <span>Кол-во этажей</span>
              <div>{{ this.$store.state.dataStateJK.floor_max }}</div>
            </li>
            <li
              v-if="
                this.$store.state.dataStateJK.count_parking &&
                  this.$store.state.dataStateJK.count_underground_parking
              "
              class="advantages-list__item"
            >
              <span>Парковка</span>
              <div class="item--parking">
                <span
                  v-if="this.$store.state.dataStateJK.count_parking"
                  class="item--parking__text"
                  >на территории&nbsp;-&nbsp;{{
                    this.$store.state.dataStateJK.count_parking
                  }}</span
                >
                <span
                  v-if="this.$store.state.dataStateJK.count_underground_parking"
                  class="item--parking__text"
                  >подземная&nbsp;-&nbsp;{{
                    this.$store.state.dataStateJK.count_underground_parking
                  }}</span
                >
              </div>
            </li>
            <li
              v-if="this.$store.state.dataStateJK.metro_station"
              class="advantages-list__item"
            >
              <span>Метро</span>
              <div class="item--metro">
                <span>{{
                  this.$store.state.dataStateJK.metro_station.name
                }}</span>
                <span v-if="this.$store.state.dataStateJK.minutes_to_metro"
                  >&nbsp;-&nbsp;{{
                    this.$store.state.dataStateJK.minutes_to_metro
                  }}
                  мин.</span
                >
              </div>
            </li>
          </ul>

          <div class="about-jk">
            {{ this.$store.state.dataStateJK.description }}
          </div>
          <div
            v-for="futer in this.$store.state.dataStateJK.features"
            :key="futer.id"
            class="advantages-info-wrapper"
          >
            <div class="advantages-info-name">
              {{ futer.title }} {{ futer.subtitle }}
            </div>
            <div class="advantages-text">{{ futer.text }}</div>
          </div>
        </div>
      </transition>
    </section>

    <section class="popups-list">
      <keep-alive>
        <ipoteka-alone
          v-if="
            !this.$store.state.dataStateJK.installment &&
              !this.$store.state.dataStateJK.trade_in
          "
          :popups-arr="popupsArr"
        />
        <Ipoteka v-else :popups-arr="popupsArr" />
      </keep-alive>
      <PayPopup
        v-if="this.$store.state.dataStateJK.installment"
        :popups-arr="popupsArr"
      />
      <TradeIn
        v-if="this.$store.state.dataStateJK.trade_in"
        :popups-arr="popupsArr"
      />
      <div class="hidden-block"></div>
    </section>

    <section id="apartments" class="apartments">
      <h2 class="apartments-title">
        Квартиры от
        {{ butyNumber(this.$store.state.dataStateJK.apartments_price_min) }} ₽
      </h2>
      <div
        v-for="(layout, index) in sortList"
        :key="index"
        class="apartments-slider-wrapper"
      >
        <div class="apartments-heandler">
          <span class="apartments-heandler--room">{{ layout.title }}</span>
          <span
            v-if="layout.min_area === layout.max_area"
            class="apartments-heandler--metr"
          >
            {{ layout.min_area }} м<sup>2</sup>
          </span>

          <span v-else class="apartments-heandler--metr">
            {{ layout.min_area }} – {{ layout.max_area }} м<sup>2</sup>
          </span>
          <span class="apartments-heandler--price">
            от
            {{ butyNumber(layout.min_price) }} ₽
          </span>
        </div>
        <div v-if="testPlane === 1" class="apartments-wrapper">
          <div
            v-for="room in layout.layouts"
            :key="room.id"
            class="apartments__item"
            @click="
              openRoom(room)
              $metrika.reachGoal('open-plan')
            "
          >
            <div class="apartments__img">
              <div
                v-lazy:background-image="room.thumbnail"
                class="plane-jk__img"
                alt="plane"
              ></div>
            </div>
            <div class="apartments__bot">
              <div class="meter">{{ room.area }} м<sup>2</sup></div>
              <div
                v-if="room.apartments.length <= 5 && room.apartments.length > 0"
                class="leavings"
              >
                Остал{{ changeEndLeavingsText(room.apartments.length) }}
                {{ room.apartments.length }}
              </div>
            </div>
          </div>

          <div class="margin-rig" style="width:10px; height:1px; opacity:0;">
            T
          </div>
        </div>
        <div v-else class="apartments-wrapper">
          <div
            v-for="room in layout.layouts"
            :key="room.id"
            class="apartments__item"
            @click="
              openRoom(room)
              $metrika.reachGoal('open-plan-v2')
            "
          >
            <div class="apartments__img">
              <div
                v-lazy:background-image="room.thumbnail"
                class="plane-jk__img"
              ></div>
            </div>
            <div class="apartments__bot">
              <div class="meter">{{ room.area }} м<sup>2</sup></div>
              <div
                v-if="room.apartments.length <= 5 && room.apartments.length > 0"
                class="leavings"
              >
                Остал{{ changeEndLeavingsText(room.apartments.length) }}
                {{ room.apartments.length }}
              </div>
            </div>
          </div>

          <div class="margin-rig" style="width:10px; height:1px; opacity:0;">
            T
          </div>
        </div>
      </div>

      <!-- FILTER -->
      <div v-if="this.$store.state.dataStateJK" class="apartments-filter">
        <ul class="apartments-filter__wrapper">
          <li class="apartments-filter__item apartments-filter__item--all">
            <input
              id="filter--all"
              name="filter[]"
              class="visually-hidden"
              type="radio"
              :checked="allRoomCheckbox"
            />
            <label
              class="apartments-filter__item--checkbox apartments-filter__item--radio--all"
              for="filter--all"
              @click="resetFilter"
              >Все квартиры</label
            >
          </li>
          <li
            v-for="(filter, index) in this.$store.state.dataStateJK
              .ranges_formatted"
            :key="filter.title"
            class="apartments-filter__item"
          >
            <input
              :id="'filter--' + index"
              v-model="labelFilter"
              name="filter[]"
              :value="filter.title"
              class="visually-hidden"
              type="checkbox"
            />
            <label
              :for="'filter--' + index"
              :class="[
                filter.layouts.length === 0
                  ? 'apartments-filter__item--checkbox--empty'
                  : ''
              ]"
              class="apartments-filter__item--checkbox"
              @click="filterApartments"
              >{{ filter.title }}</label
            >
          </li>
          <div class="hidden-block"></div>
        </ul>
        <div
          v-if="!(!allRoomCheckbox && !this.lengthLayouts)"
          class="apartments-filter__ranges"
        >
          <span v-if="min_area === max_area" class="ranges-m"
            >{{ min_area }} м<sup>2</sup></span
          >
          <span v-else class="ranges-m"
            >{{ min_area }} – {{ max_area }} м<sup>2</sup></span
          >
          <span>{{ min_price }} – {{ max_price }} ₽</span>
        </div>
      </div>

      <not-room v-if="!this.lengthLayouts && !allRoomCheckbox" />

      <div class="apartments-sorted__list">
        <Discount
          v-if="!(!allRoomCheckbox && !this.lengthLayouts) && isDiscount"
          id="discountpc"
          :discount-finish="discountFinish"
        />
        <div
          v-for="room in filterApart"
          :key="room.id"
          class="apartments-sorted__list__item"
          @click="
            openRoom(room)
            $metrika.reachGoal('open-plan')
          "
        >
          <div class="apartments-sorted__list__item__img">
            <div
              v-lazy:background-image="room.thumbnail"
              class="plane-jk__img"
              alt="plane"
            ></div>
          </div>
          <div class="apartments-sorted__list__item__bot">
            <div class="meter">
              {{ room.room_label_short }}
              <span>{{ room.area }} м<sup>2</sup></span>
            </div>
            <div
              v-if="room.apartments.length <= 5 && room.apartments.length > 0"
              class="leavings"
            >
              Остал{{ changeEndLeavingsText(room.apartments.length) }}
              {{ room.apartments.length }}
            </div>
            <div class="plane-zoom">Увеличить</div>
          </div>
        </div>
      </div>

      <transition name="overlay">
        <div
          v-show="showRoom"
          class="room-popup-overlay"
          @click.self="closePop"
        ></div>
      </transition>
      <transition name="fade-room">
        <div v-show="showRoom" class="room-popup-wrapper">
          <div class="room-popup-wrappers">
            <div
              class="close-popup room-popup-close"
              @click.self="closePop"
            ></div>
            <div class="room-popup">
              <div class="room-popup__top">
                <div class="room-popup__img">
                  <img :src="this.roomImg" alt="img" />
                </div>
                <div class="room-popup__info-wrapper">
                  <div class="room-popup__info">
                    <div class="info-wrapper">
                      <div class="info__title">Комнат</div>
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
                <div v-if="testPlane === 1" class="number-title">
                  Узнайте актуальную цену прямо сейчас
                </div>
                <div v-else class="number-title">
                  Хотите узнать актуальную цену?
                </div>
                <div class="number-request">Введите номер телефона</div>
                <div class="number-request number-request--tablet">
                  Оставьте свой номер телефона и получите ответы на все
                  интересующие вас вопросы
                </div>
                <div class="number__controller-container">
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
                    v-if="testPlane === 1"
                    class="number__know-price"
                    @click="validatePhone(1, 1)"
                  >
                    <span>Узнать точную цену</span>
                  </div>

                  <div
                    v-else
                    class="number__know-price"
                    @click="validatePhone(1, 2)"
                  >
                    <span>Узнать точную цену</span>
                  </div>
                </div>
                <div class="number__conf popup-conf">
                  Отправляя форму, вы соглашаетесь с
                  <a href="/oferta.pdf" target="_blank" class="confend"
                    >Политикой конфиденциальности</a
                  >
                </div>
                <div class="number__phone-link">
                  <a
                    href="tel:+73833884896"
                    class="change-phone"
                    @click="$metrika.reachGoal('click-phone-plan')"
                    >+7 (383) 388-48-96</a
                  >
                </div>
              </div>
              <div v-else class="room-popup__welcome">
                <div class="room-popup__welcome--text">Спасибо за заявку!</div>
                <div class="room-popup__welcome--content">
                  Наш менеджер свяжется с вами в течение 10 минут в рабочее
                  время и ответит на все вопросы
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
      <!-- <not-find /> -->
    </section>
    <section v-if="isDiscount" id="discount" class="discount">
      <div class="discount__overlay-off">
        <div class="discount__wrapper">
          <div class="discount__title-wrapper">
            <div class="discount__title">
              акция до {{ this.discountFinish }}
            </div>
          </div>
          <div class="discount__img"></div>
          <div
            v-if="this.$store.state.dataStateJK.discount_title"
            class="discount__content"
          >
            {{ this.$store.state.dataStateJK.discount_title }}
          </div>
          <div class="discount__detail">
            Подробности акции уточняйте в
            <span class="sale-departes discount-sale-departes"
              >отделе продаж</span
            >
          </div>
          <div class="discount__phone">
            <a
              href
              class="change-phone"
              @click="$metrika.reachGoal('click-phone-discount')"
              >+7 (383) 388-48-96</a
            >
          </div>
        </div>
      </div>
    </section>

    <section id="location" class="map">
      <h2 class="map__title">Расположение</h2>

      <div id="map-comp" class="map__jk" style="width:100%;">
        <div></div>
        <div class="jk-map__zoom-control-wrapper">
          <div class="jk-map__zoom-control zoom-plus" @click="zoom(+1)">
            <img src="/images/map-search/plus.svg" />
          </div>
          <div class="jk-map__zoom-control zoom-minus" @click="zoom(-1)">
            <img src="/images/map-search/minus.svg" />
          </div>
        </div>
      </div>

      <div class="infrastructure">
        <div class="infrastructure__title">В зоне пешей доступности</div>
        <ul class="infrastructure__list">
          <li
            v-for="infrastructure in this.$store.state.dataStateJK
              .infrastructures"
            :key="infrastructure.id"
            class="infrastructure__list-item"
          >
            <span>{{ infrastructure.name }}</span>
          </li>
        </ul>
      </div>
    </section>

    <!-- <section class="closest-residentials">
      <div class="closest-residentials__title">
        Похожие комплексы поблизости
      </div>
      <div class="closest-residentials-wrapper">
        <div
          v-for="residential in this.closestResidentials"
          :key="residential.id"
          v-lazy:background="residential.thumbnail"
          class="closest-residentials-item"
        >
          <a
            :href="currentPath + '/novostroyki/' + residential.alias"
            class="closest-residentials-overlay"
          >
            <div class="closest-residentials-item__angle">
              <span class="closest-residentials-item__angle-wrap"></span>
              <div class="closest-residentials__price">
                от {{ butyNumber(residential.price_min) }} ₽
              </div>
            </div>

            <div class="closest-residentials-item__text">
              <div class="closest-residentials-item__text__name">
                {{ residential.title }}
              </div>
              <div class="closest-residentials-item__text__builder">
                {{ residential.developer.name }}
              </div>
            </div>
          </a>
        </div>
        <div class="closest-residentials__more">
          <div class="btn__more"></div>
          <div class="more__text">Посмотреть все</div>
        </div>
        <div class="hidden-block"></div>
      </div>
    </section> -->

    <section class="jk-footer">
      <ul class="jk-footer-list">
        <li class="jk-footer-list__item">
          <a href="#photos">Фотографии</a>
        </li>
        <li class="jk-footer-list__item">
          <a href="#about-jk">О комплексе</a>
        </li>
        <li class="jk-footer-list__item">
          <a href="#apartments">Квартиры</a>
        </li>
        <li class="jk-footer-list__item">
          <a href="#location">Расположение</a>
        </li>
        <li
          v-if="isDiscount"
          class="jk-footer-list__item jk-footer-list__item--discount"
        >
          <a
            href="#discount"
            @click="
              openDiscount()
              $metrika.reachGoal('click-discount')
            "
            >Акция</a
          >
        </li>
      </ul>
      <div class="jk-footer__number">
        <a
          class="change-phone phone-number main-phone mgo-number"
          href="tel:+73833884896"
          @click="$metrika.reachGoal('click-phone-footer')"
          >+7 (383) 388-48-96</a
        >
      </div>
      <div class="jk-footer__conf">
        Представленная на сайте информация не является публичной офертой
      </div>
      <a href="/oferta.pdf" target="_blank" class="confend"
        >Политика конфиденциальности</a
      >
      <div>
        <a
          :href="this.$store.state.dataStateJK.project_declaration"
          class="confend declaration"
          >Проектная декларация</a
        >
      </div>
    </section>
  </div>
</template>

<script>
import './swiper.css'

import { swiper, swiperSlide } from 'vue-awesome-swiper'

// Popups
import Discount from './popups/discount.vue'
// const Discount = require('./popups/discount.vue');
import PayPopup from './popups/payments.vue'
import TradeIn from './popups/trade-in.vue'
import Ipoteka from './popups/ipoteka.vue'
import IpotekaAlone from './popups/ipotekaAlone.vue'
import { titlePopups } from './testData.js'
import NotFind from './popups/not-find.vue'
import NotRoom from './popups/not-room.vue'
import { Utils } from '@/utils/utils.js'
import { HTTP, Routes } from '@/components/server/API.js'

const DG = require('2gis-maps')

export default {
  components: {
    swiper,
    swiperSlide,

    PayPopup,
    TradeIn,
    Ipoteka,
    IpotekaAlone,
    NotFind,
    NotRoom,

    Discount
  },
  data() {
    return {
      swiperOption: {
        slidesPerView: 'auto',
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
          renderBullet(index, className) {
            return `<span class="${className} swiper-pagination-bullet-custom"></span>`
          }
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      },

      popupsArr: titlePopups,
      isDesc: false,
      phone: '',
      notificationSystem: Utils.notificationSystem,
      roomTitle: '',
      m: '',
      finish: '',
      roomImg: null,
      leavings: null,
      layout_id: null,
      showRoom: false,
      showDiscount: false,
      showLeftMenu: false,
      isPost: false,
      map: null,
      reqParams: null,
      isReq: true,
      isWork: true,
      isSend: false,
      isGeo: false,
      showNavigationLinks: false,
      testPlane: 1,

      closestResidentials: [],

      labelFilter: [],
      lengthLayouts: 1,

      currentPath:
        window.location.origin + '/' + window.location.pathname.split('/')[1]
    }
  },

  computed: {
    menu() {
      return this.$store.state.menuList
    },
    allRoomCheckbox() {
      return this.labelFilter.length === 0
    },
    filterApart() {
      let s = []
      let rs = []
      if (this.$store.state.currentJK) {
        const ars = this.$store.state.currentJK.ranges_formatted.forEach(
          (element) => {
            rs = rs.concat(element.layouts)
            this.labelFilter.forEach((label) => {
              if (this.labelFilter.length) {
                if (element.title === label) {
                  s = s.concat(element.layouts)
                  this.lengthLayouts = s.length
                }
              }
            })
          }
        )
        if (this.labelFilter.length) {
          return s
        } else {
          return rs
        }
      }
      return s
    },

    min_area() {
      let s = []
      let min = 0
      if (this.$store.state.currentJK) {
        if (this.labelFilter.length) {
          const ars = this.$store.state.currentJK.ranges_formatted.forEach(
            (element) => {
              this.labelFilter.forEach((label) => {
                if (this.labelFilter.length) {
                  if (element.title === label && element.layouts.length) {
                    s = s.concat(element.min_area)
                    min = Math.min.apply(null, s)
                  }
                }
              })
            }
          )
          return min
        } else {
          return this.$store.state.dataStateJK.apartments_area_min
        }
      }
      return min
    },

    max_area() {
      let s = []
      let max = 0
      if (this.$store.state.currentJK) {
        if (this.labelFilter.length) {
          const ars = this.$store.state.currentJK.ranges_formatted.forEach(
            (element) => {
              this.labelFilter.forEach((label) => {
                if (this.labelFilter.length) {
                  if (element.title === label && element.layouts.length) {
                    s = s.concat(element.max_area)
                    max = Math.max.apply(null, s)
                  }
                }
              })
            }
          )
          return max
        } else {
          return this.$store.state.dataStateJK.apartments_area_max
        }
      }
      return max
    },
    min_price() {
      let s = []
      let min = 0
      if (this.$store.state.currentJK) {
        if (this.labelFilter.length) {
          const ars = this.$store.state.currentJK.ranges_formatted.forEach(
            (element) => {
              this.labelFilter.forEach((label) => {
                if (this.labelFilter.length) {
                  if (element.title === label && element.layouts.length) {
                    s = s.concat(element.min_price)
                    min = Math.min.apply(null, s)
                  }
                }
              })
            }
          )

          return Utils.helpers.trimmer(min)
        } else {
          return this.butyNumber(
            this.$store.state.dataStateJK.apartments_price_min
          )
        }
      }
      return min
    },
    max_price() {
      let s = []
      let max = 0
      if (this.$store.state.currentJK) {
        if (this.labelFilter.length) {
          const ars = this.$store.state.currentJK.ranges_formatted.forEach(
            (element) => {
              this.labelFilter.forEach((label) => {
                if (this.labelFilter.length) {
                  if (element.title === label && element.layouts.length) {
                    s = s.concat(element.max_price)
                    max = Math.max.apply(null, s)
                  }
                }
              })
            }
          )

          return Utils.helpers.trimmer(max)
        } else {
          return this.butyNumber(
            this.$store.state.dataStateJK.apartments_price_max
          )
        }
      }
      return max
    },
    sortList() {
      const arr = []
      if (this.$store.state.dataStateJK.ranges_formatted) {
        return this.$store.state.currentJK.ranges_formatted.filter((item) => {
          return (
            item.layouts.length != 0 &&
            item.layouts.sort((a, b) => {
              return a.area - b.area
            })
          )
        })
      } else {
        return arr
      }
    },

    getTitle() {
      if (this.$store.state.currentJK) {
        return this.$store.state.currentJK.title
      } else {
        return ''
      }
    },

    chengEndLeavings() {
      return Utils.helpers.FNumber(this.leavings, ['а', 'ы', ''])
    },

    isDiscount() {
      if (this.$store.state.dataStateJK.discount_title) {
        const discountTitle = this.$store.state.currentJK.discount_title
        const dateNow = new Date()
        const discountStart = this.$store.state.currentJK.discount_start
          ? new Date(this.$store.state.currentJK.discount_start)
          : null
        const discountFinish = this.$store.state.currentJK.discount_finish
          ? new Date(this.$store.state.currentJK.discount_finish)
          : null
        const isActiveDiscount =
          discountTitle &&
          ((discountFinish >= dateNow &&
            (discountStart <= dateNow || discountStart === null)) ||
            ((discountFinish >= dateNow || discountFinish === null) &&
              discountStart <= dateNow) ||
            (discountFinish === null && discountStart === null))
        return isActiveDiscount
      }
      return false
    },

    discountFinish() {
      if (this.$store.state.dataStateJK.discount_title) {
        const options = {
          month: 'long',
          day: 'numeric'
        }
        const date = new Date()
        const y = date.getFullYear()
        const m = date.getMonth()
        const discoutTo = this.$store.state.currentJK.discount_finish
          ? new Date(
              this.$store.state.currentJK.discount_finish
            ).toLocaleString('ru', options)
          : new Date(y, m + 1, 0).toLocaleString('ru', options)
        return discoutTo
      }
      return false
    }
  },
  updated() {
    this.phoneChange()
    this.setTitle_Description()
  },

  created() {
    this.getParams()
    if (sessionStorage.getItem('test')) {
      this.testPlane = parseInt(sessionStorage.getItem('test'), 10)
    } else {
      const testConst = Math.floor(Math.random() * 2)
      sessionStorage.setItem('test', testConst)
      this.testPlane = testConst
    }
  },

  mounted() {
    window.addEventListener('scroll', this.loadingMap, false)
    window.addEventListener('scroll', this.activeSection, false)
    window.addEventListener('touchmove', this.loadingMap, false)
  },

  methods: {
    activeSection() {
      const sections = $('section')
      const nav = $('nav')

      const cur_pos = $(window).scrollTop()

      sections.each(function() {
        const top = $(this).offset().top
        const bottom = top + $(this).outerHeight()

        if (cur_pos >= top && cur_pos <= bottom) {
          nav.find('a').removeClass('a--active')
          sections.removeClass('active')
          $(this).addClass('active')
          nav
            .find('a[href="#' + $(this).attr('id') + '"]')
            .addClass('a--active')
        }
      })
    },
    getParams() {
      return new Promise((resolve, reject) => {
        HTTP.post(
          `/residential-complex/` + window.location.pathname.split('/')[3],
          {
            residential_alias: window.location.pathname.split('/')[3]
          }
        )
          .then(({ data }) => {
            console.log('GetParams-')

            console.log(data)
            this.isWork = data.isWorkTime
            this.closestResidentials = data.closestResidentials
            this.$store.commit('setCurrentJk', data.residential)
            this.$store.commit('addStateDate', data.residential)
            resolve(data.residential)
          })
          .catch((error) => {
            reject(error)
            console.log(error)
          })
      })
    },
    loadingMap() {
      const heightOfWindow = document.documentElement.scrollTop

      const tt = document.getElementsByClassName('apartments')

      if (
        (heightOfWindow > tt[0].offsetTop ||
          document.body.scrollTop > tt[0].offsetTop) &&
        this.$store.state.dataStateJK.latitude &&
        !this.isGeo
      ) {
        this.isGeo = true
        const myIcons = DG.divIcon({
          iconSize: [30, 30],
          className: 'my-icons'
        })
        this.map = DG.map('map-comp', {
          center: [
            this.$store.state.dataStateJK.latitude,
            this.$store.state.dataStateJK.longitude
          ],
          zoom: 15,
          fullscreenControl: false,
          zoomControl: false
        })
        DG.marker(
          [
            this.$store.state.dataStateJK.latitude,
            this.$store.state.dataStateJK.longitude
          ],
          { icon: myIcons }
        ).addTo(this.map)
      }
    },

    postReq() {
      const paramsPostBody = {
        client_phone: this.phone.replace(/[-()+_ ]/g, ''),
        type: 2,
        residential_complex_id: this.$store.state.currentJK.id
      }
      HTTP.post(Routes.postPhone, {}, { params: paramsPostBody })
        .then(({ data }) => {
          console.log('Post reqJK')
          console.log(data)
        })
        .catch((error) => {
          console.log(error)
        })
      return true
    },

    phoneChange() {
      setTimeout(function() {
        const phone = document.getElementsByClassName(
          'phone-number main-phone'
        )[0].textContent
        const tel = phone.replace(/[^0-9]/gi, '')
        const inPhone = document.getElementsByClassName('change-phone')
        const inPhoneText = document.getElementsByClassName(
          'change-phone--text'
        )
        for (let i = 0; i < inPhone.length; i++) {
          inPhone[i].innerHTML = ''
          inPhone[i].innerHTML = phone
          inPhone[i].setAttribute('href', 'tel:+' + tel)
        }
        for (let i = 0; i < inPhoneText.length; i++) {
          inPhoneText[i].setAttribute('href', 'tel:+' + tel)
        }
      }, 1500)
    },

    postReq(type_req) {
      switch (type_req) {
        case 1:
          const paramsPostBody = {
            client_phone: this.phone.replace(/[-()+_ ]/g, ''),
            type: type_req,
            residential_complex_id: this.$store.state.currentJK.id,
            layout_id: this.layout_id
          }
          return new Promise((resolve, reject) => {
            HTTP.post(Routes.postPhone, paramsPostBody)
              .then(({ data }) => {
                console.log('Post reqJK')
                resolve(data)
                // console.log(data);
              })
              .catch((error) => {
                reject(error)
                console.log(error)
              })
          })
          break
        case 3:
          const paramsPostBodyy = {
            client_phone: this.phone.replace(/[-()+_ ]/g, ''),
            type: type_req,
            residential_complex_id: this.$store.state.currentJK.id
          }
          return new Promise((resolve, reject) => {
            HTTP.post(Routes.postPhone, paramsPostBodyy)
              .then(({ data }) => {
                console.log('Post reqJK')
                resolve(data)
                // console.log(data);
              })
              .catch((error) => {
                reject(error)
                console.log(error)
              })
          })
          break
        default:
          alert('Я таких значений не знаю')
      }
    },
    validatePhone(type, version) {
      console.log('version: ', version)
      console.log('type: ', type)
      if (
        Utils.helpers.validate(
          event,
          this.$el,
          this.phone,
          this.$toast,
          this.notificationSystem.options.error
        ) &&
        !this.isSend
      ) {
        this.isSend = true
        this.postReq(type)
          .then((resolve) => {
            this.isPost = resolve
            this.isSend = false
            if (version === 1) {
              this.$metrika.reachGoal('submit-cost')
            } else if (version === 2) {
              this.$metrika.reachGoal('submit-cost-v2')
            }
          })
          .catch((error) => {
            this.isSend = false
            console.log(error)
          })
      }
    },
    openRoom(room) {
      $('body').css('overflow', 'hidden')
      this.roomTitle = room.room_label
      this.m = room.area
      this.finish = room.decoration
      this.roomImg = room.main_image
      this.layout_id = room.id
      if (room.apartments.length <= 5 && room.apartments.length > 0) {
        this.leavings = room.apartments.length
      }
      this.showRoom = !0
    },

    closePop() {
      this.phone = null
      this.roomTitle = null
      this.m = null
      this.finish = null
      this.leavings = null
      this.isPost = false
      this.showRoom = false
      $('input').removeClass('input__error')
      $('body').css('overflow', 'auto')
    },

    openLeftMenu() {
      $('body').css('overflow', 'hidden')
      this.showLeftMenu = true
    },

    closeLeftMenu() {
      this.showLeftMenu = false
      $('body').css('overflow', 'auto')
    },

    openDiscount() {
      $('body').css('overflow', 'hidden')
      this.showDiscount = true
    },
    closeDiscount(e) {
      this.showDiscount = false
      $('body').css('overflow', 'auto')
    },
    butyNumber(min) {
      if (min) {
        return Utils.helpers.trimmer(min)
      }
    },

    zoom(change) {
      this.map.setZoom(this.map.getZoom() + change)
    },
    isLeavingRoom(roomArr) {
      return roomArr.filter((room) => {
        return room.apartments.length != 0
      })
    },
    changeEndLeavingsText(length) {
      return Utils.helpers.FNumber(length, ['ась', 'ось', 'ось'])
    },

    // Filter
    filterApartments() {
      $('#filter--all').prop('checked', false)
      this.lengthLayouts = this.$store.state.dataStateJK.layouts.length
    },

    resetFilter() {
      this.labelFilter = []
    },

    setTitle_Description() {
      const desc =
        'Квартиры в ЖК «' +
        this.$store.state.currentJK.title +
        '» без комиссии напрямую от застройщика'

      document.title =
        'ЖК «' +
        this.$store.state.currentJK.title +
        '» - квартиры от застройщика - okna.io'
      document
        .querySelector('meta[name="description"]')
        .setAttribute('content', desc)
    }
  }
}
</script>

<style lang="scss">
@import '@/../sass/app.scss';

html {
  scroll-behavior: smooth;
}
.discount-popup {
  &--overlay {
    display: flex;
    background: rgba($color: #2d3038, $alpha: 0.7);
    height: 100%;
    position: fixed;
    bottom: 0;
    width: 100%;
    left: 0;
    z-index: 103;
    flex-direction: column;
    justify-content: flex-end;
  }

  &--fixed {
    position: fixed;
    z-index: 9999;
    bottom: 0;
    width: 100%;
    height: 430px;
    text-align: center;
    background: linear-gradient(87.31deg, #c0c335 34.25%, #b6ce25 100%);
    @include respond-to(tablet) {
      border-radius: 8px;
      width: 420px;
      height: 440px;
      top: calc(50% - 220px);
      left: calc(50% - 210px);
    }
  }

  &__title {
    padding-top: 31px;
    margin-bottom: 33px;
    font-weight: 500;
    font-size: 16px;
    line-height: 25px;
    text-align: center;
    letter-spacing: 0.1px;
    text-transform: uppercase;
    color: #ffffff;

    @include respond-to(tablet) {
      font-weight: 400;
      letter-spacing: 0.4px;
    }
  }

  &__content {
    margin: 0 auto 10px auto;
    max-width: 301px;
    font-weight: 800;
    font-size: 20px;
    line-height: 29px;
    text-align: center;
    letter-spacing: 0.1px;
    color: #ffffff;
    mix-blend-mode: normal;
    @include respond-to(tablet) {
      font-size: 24px;
      line-height: 30px;
      letter-spacing: 0.3px;
    }
  }

  &__img {
    margin: 0 auto 28px auto;
    background: url('/img/procent-discount.svg') no-repeat;
    width: 155px;
    height: 91px;
  }

  &__req {
    width: 247px;
    font-weight: normal;
    font-size: 16px;
    line-height: 21px;
    text-align: center;
    letter-spacing: 0.1px;
    color: #fdfdfd;
    /* #FDFDFD */
    mix-blend-mode: normal;
    margin: 0 auto 28px auto;

    @include respond-to(tablet) {
      width: 225px;
      font-weight: 300;
      font-size: 14px;
      line-height: 22px;
      letter-spacing: 0.3px;
    }
  }
}

.btn__discount {
  background: #ffffff;
  mix-blend-mode: normal;
  box-shadow: 0px 8px 15px rgba(66, 72, 77, 0.1);
  border-radius: 68px;
  padding: 15px;
  width: 266px;
  height: 50px;
  margin: 0 auto;
  a {
    font-weight: 500;
    font-size: 18px;
    line-height: 24px;
    text-align: center;
    letter-spacing: 0.1px;
    color: #5a5863;
    /* #5A5863 */
    opacity: 0.9;

    &::before {
      content: '';
      display: block;
      position: absolute;
      width: 40px;
      height: 40px;
      background: url('/img/phone.svg') no-repeat;
    }
  }
}

.room-popup-overlay {
  display: flex;
  background: rgba($color: #2d3038, $alpha: 0.7);
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  z-index: 9999;
  overflow-y: auto;
  overflow-x: hidden;
  justify-content: flex-end;
}

.room-popup-wrapper {
  position: fixed;
  height: 100vh;
  top: 0px;
  right: 0px;
  z-index: 9999;
  width: 84%;
  background: #f1f1f1;
  min-height: 100vh;
  &-main {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 9999;
  }

  .call-depart {
    width: 84%;

    &__wrapper {
      transition: 0.1s;
      max-width: 273px;
      span {
        padding-left: 33px;

        &::before {
          left: 4px;
          top: -1px;
        }
      }

      &:active {
        transform: scale(0.95);
      }
    }
  }
}

.room-popup-wrappers {
  height: 100%;
  overflow: auto;
  @include respond-to(tablet) {
    position: relative;
  }
}

.room-popup {
  &__top {
    background: #ffffff;
  }
  &__img {
    width: 85vw;
    max-width: 100%;
    height: 85vw;
    min-height: 35vh;
    padding: 25px 15px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      max-width: 100%;
      max-height: 100%;
      mix-blend-mode: multiply;
    }
  }

  &__info {
    border-top: 1px solid #f1f1f1;
    display: flex;
    justify-content: space-between;
    align-content: stretch;
    padding: 10px 0 17px 0;
    margin: 0 auto;
    width: 88%;
  }

  &-close {
    top: calc(50% - 20px);
    left: -47px;
    z-index: 10000;

    @include respond-to(tablet) {
      top: 10px;
      left: unset;
      right: 10px;
    }
  }

  &__leavings {
    background: #60ce78;
    font-weight: 600;
    font-size: 10px;
    line-height: 20px;
    text-align: center;
    letter-spacing: 0.1px;
    color: #fdfdfd;

    @include respond-to(phone) {
      background: #60ce78;
      height: 20px;
      padding: 0;
      font-size: 10px;
    }
  }

  &__number {
    padding-top: 26px;
    text-align: center;
    .number__phone-link {
      padding-bottom: 20px;
    }

    .number-title {
      font-weight: bold;
      font-size: 20px;
      line-height: 25px;
      text-align: center;
      letter-spacing: 0.1px;
      margin: 0 auto 20px auto; /*для компов тоже*/
      color: #5a5863;
      opacity: 0.9;

      @include respond-to(phone) {
        max-width: 280px; /*только для телефонов*/
      }
    }

    .number-request {
      font-size: 14px;
      line-height: 24px;
      text-align: center;
      letter-spacing: 0.1px;
      color: #5a5863;
      margin-bottom: 16px;
      /* #5A5863 */
      opacity: 0.8;

      &--tablet {
        display: none;
      }
    }

    .number__input {
      width: 89.3%;
      max-width: 273px;
    }

    .number__know-price {
      width: 89.3%;
      margin: 0 auto 15px auto;
      padding: 12px 0 14px 0;
      text-align: center;
      background: #ffffff;
      box-shadow: 0px 16px 25px rgba(66, 72, 77, 0.1);
      border-radius: 100px;
      max-width: 273px;
      transition: 0.2s;

      @include respond-to(tablet) {
        background: #5dbf16;
        box-shadow: 0px 8px 15px rgba(66, 72, 77, 0.1);
        border-radius: 68px;
      }
      span {
        font-weight: 500;
        font-size: 14px;
        line-height: 20px;
        text-align: center;
        letter-spacing: 0.1px;
        color: rgba($color: #5a5863, $alpha: 0.8);
        /* #5A5863 */

        @include respond-to(tablet) {
          color: #fafbfb;
        }
      }

      &:active {
        transform: scale(0.95);
      }
    }
  }

  &__welcome {
    &--text {
      margin: 42px 0 13px 0;
      font-weight: 800;
      font-size: 20px;
      line-height: 29px;
      text-align: center;
      letter-spacing: 0.1px;
      color: #5a5863;
      /* #5A5863 */
      mix-blend-mode: normal;
      opacity: 0.9;
    }

    &--content {
      width: 273px;
      margin: 0 auto;
      font-weight: 500;
      font-size: 14px;
      line-height: 22px;
      text-align: center;
      letter-spacing: 0.1px;
      color: #5a5863;
      /* #5A5863 */
      mix-blend-mode: normal;
      opacity: 0.6;
      padding-bottom: 86px;
    }
  }
}

.info__title {
  font-weight: normal;
  font-size: 10px;
  line-height: 16px;
  letter-spacing: 0.1px;
  color: #5a5863;
  /* #5A5863 */
  opacity: 0.9;
}

.info__text {
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0.1px;
  color: #5a5863;
  /* #5A5863 */
  opacity: 0.8;
}

.number__conf {
  font-weight: 500;
  font-size: 10px;
  line-height: 16px;
  text-align: center;
  letter-spacing: 0.1px;
  margin-bottom: 18px;
  color: rgba($color: #5a5863, $alpha: 0.5);

  .confend {
    display: inline-block;
    font-weight: 500;
    font-size: 10px;
    line-height: 16px;
    text-align: center;
    letter-spacing: 0.1px;
    color: #5a5863;
    /* #5A5863 */
    opacity: 0.5;
  }

  /* #5A5863 */
}

.info-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &:last-child {
    text-align: right;
  }
}

.number__phone-link {
  a {
    font-weight: 500;
    font-size: 20px;
    line-height: 24px;
    text-align: center;
    letter-spacing: 0.1px;
    color: rgba($color: #5a5863, $alpha: 0.9);
  }
}

.new-jk {
  position: relative;
  scroll-behavior: smooth;
  // @include respond-to(tablet) {
  //   width: 100vw;
  //   // overflow: overlay;
  // }
}

.crest {
  background: url('/img/crest.svg') no-repeat center;
  width: 100%;
  height: 100%;
  opacity: 0.5;
}

.header-menu {
  position: fixed;
  z-index: 101;
  display: flex;
  width: 100%;
  background: #fdfdfd;
  box-shadow: 0px 2px 4px rgba(66, 72, 77, 0.1);
  height: 50px;
  justify-content: space-between;
  padding-left: 22px;
  align-items: center;

  &__phone {
    position: relative;
    margin: 0 20px 0 0;
    display: block;
    font-weight: 500;
    font-size: 20px;
    line-height: normal;
    text-align: center;
    letter-spacing: 0.5px;
    color: #5a5863;
    opacity: 0.9;

    &::before {
      content: '';
      display: block;
      position: absolute;
      width: 20px;
      height: 20px;
      background: url('/img/phone-icon.svg') no-repeat center;
      top: 1px;
      left: -27px;
    }

    &--none {
      margin: 0;
      font-size: 0;

      &::before {
        top: -25px;
        background-size: 22px;
        left: -51px;
        width: 60px;
        height: 50px;
      }
    }
  }

  &__logo {
    background: url('/img/light-logo.svg') no-repeat top;
    width: 115px;
    height: 35px;
    background-size: 100px;
    background-position: top left;

    &--test {
      display: none;
    }
  }

  &__list {
    display: none;

    @include respond-to(pc-md) {
      display: flex;
      width: 63%;
      justify-content: flex-start;
      min-width: 835px;
      height: 100%;
      max-width: 1200px;
    }

    &__item {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 148px;
      font-weight: 500;
      font-size: 14px;
      line-height: 22px;
      text-align: center;
      text-transform: uppercase;

      position: relative;

      a {
        padding: 19px 10px;
        color: rgba($color: #5a5863, $alpha: 0.8);
        &::after {
          display: block;
          position: absolute;
          content: '';
          width: 100%;
          height: 5px;
          height: 2px;
          left: 0;
          bottom: 0;
        }
      }

      &:hover {
        a {
          color: #5a5863;
          &::after {
            animation: line_underground 0.3s;
            background: rgba($color: #5a5863, $alpha: 0.2);
          }
        }
      }

      // &:active {
      //   .a--active {
      //     color: #60ce78;
      //     &::after {
      //       background: #60ce78;
      //     }
      //   }
      // }
      &--discount {
        div {
          cursor: pointer;
          color: #5dbf16;
        }
      }

      &--circles {
        width: 70px;
      }
    }

    &--bottom {
      position: absolute;

      width: 530px;
      min-width: unset;
      background: #fdfdfd;
      box-shadow: 0px 16px 25px rgba(66, 72, 77, 0.1);
    }
  }

  .a--active {
    color: #60ce78;
    &::after {
      background: #60ce78;
    }
  }

  &__circles {
    width: 100%;
    height: 100%;
    background-position: center;
  }
}

.jk-menu {
  padding: 0;
  opacity: 0.5;

  @include respond-to(pc-md) {
    display: none;
  }
}

.menu__strok {
  width: 24px;
  height: 18px;
  background: url('/img/menu-stroke--dark.svg');
}
.slider-jk {
  padding-top: 50px;
  margin-bottom: 36px;
  position: relative;

  @include respond-to(tablet) {
    padding-top: 60px;
    margin-bottom: 60px;
  }

  @include respond-to(pc-md) {
    margin-bottom: 0;
  }
}

.discount__button {
  cursor: pointer;
  z-index: 2;
  position: absolute;
  top: -55px;
  left: 20px;
  background: linear-gradient(0deg, #cdd02d, #cdd02d);
  border-radius: 30px;
  max-width: 120px;
  max-height: 40px;
  padding: 8px 33px;
  transition: 0.1s;
  @include respond-to(tablet) {
    top: -80px;
    left: 40px;
  }
  @include respond-to(pc-md) {
    left: 0;
    top: -20px;
  }
  span {
    font-weight: 400;
    letter-spacing: 0.4px;
    font-size: 14px;
    line-height: 25px;
    text-align: center;

    text-transform: uppercase;
    color: #fdfcfe;
  }

  &:active {
    transform: scale(0.95);
  }
}

.jk-name {
  font-weight: bold;
  font-size: 24px;
  line-height: 30px;
  border-bottom: 1px solid rgba($color: #5a5863, $alpha: 0.1);
  color: #5a5863;
  padding-bottom: 13px;
}

.jk-info {
  position: relative;
  padding: 0 20px;
  @include respond-to(tablet) {
    padding: 0 40px;
  }
  @include respond-to(pc-md) {
    max-width: 1200px;
    margin: 0 auto;
    padding: 60px 0 0 0;
  }
}

.desc-list {
  padding: 25px 0 40px 0;
}

.desc-list__item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  @include respond-to(tablet) {
    &:last-child {
      max-width: 450px;
      width: 100%;

      .item-heandle {
        min-width: 90px;
      }
    }
  }

  .item-heandle {
    font-size: 14px;
    line-height: 20px;
    letter-spacing: 0.1px;
    padding-left: 35px;
    color: #5a5863;
    /* #5A5863 */
    opacity: 0.7;
    width: 74px;
  }

  .item-text {
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: 0.1px;
    color: #5a5863;
    /* #5A5863 */
    opacity: 0.9;
    width: 57%;
    min-width: 153px;
  }

  &::before {
    content: '';
    display: block;
    position: absolute;
    width: 40px;
    height: 40px;
    opacity: 0.5;
    left: 12px;
    @include respond-to(tablet) {
      left: -8px;
    }
  }
  &--apartments {
    &::before {
      background: url('/img/apartments.svg') no-repeat center;
    }

    .item-heandle {
      @include respond-to(tablet) {
        padding-left: 35px;
      }
    }
  }

  &--deadline {
    &::before {
      background: url('/img/key.svg') no-repeat center;
    }
    .item-heandle {
      @include respond-to(tablet) {
        padding-left: 5px;
      }
    }
  }

  &--location {
    &::before {
      background: url('/img/geolocation.svg') no-repeat center;
    }

    .item-heandle {
      @include respond-to(tablet) {
        min-width: 90px;
        padding-left: 30px;
      }
    }
  }
}

.btn--to-room {
  display: none;
}

.btn__show-all {
  cursor: pointer;
  font-weight: 600;
  letter-spacing: 0.3px;
  padding-bottom: 40px;
  font-size: 14px;
  line-height: 24px;

  text-decoration-line: underline;
  text-transform: uppercase;

  color: #5a5863;

  /* #5A5863 */
  opacity: 0.9;
}

.about-jk {
  font-size: 14px;
  line-height: 25px;
  letter-spacing: 0.1px;
  color: #5a5863;
  /* #5A5863 */
  opacity: 0.9;
  padding-top: 46px;
  border-bottom: 1px solid rgba($color: #5a5863, $alpha: 0.1);
  padding-bottom: 36px;
}
//Animation
@keyframes over {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

@keyframes line_underground {
  0% {
    transform: scaleX(0);
  }

  100% {
    transform: scaleX(100%);
  }
}

@keyframes fadeIn {
  0% {
    transform: scale(0);
    opacity: 0;
  }

  100% {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes jump {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

@keyframes dow {
  0% {
    transform: translateY(0%);
    opacity: 1;
  }

  100% {
    transform: translateY(200%);
    opacity: 0;
  }
}

///
.overlay-enter-active {
  animation: over 0.1s;
}

.overlay-leave-active {
  animation: over 0.1s reverse;
}

.overlay-enter, .overlay-leave-to /* .list-leave-active до версии 2.1.8 */ {
  transition: 0.1s;
}

.fade-popup-enter-active {
  transition: 0.3s ease-in-out;

  @include respond-to(tablet) {
    animation: fadeIn 0.3s;
  }
}

.fade-popup-leave-active {
  transition: 0.3s ease-in-out;
  @include respond-to(tablet) {
    animation: fadeIn 0.3s reverse;
  }
}

.fade-popup-enter, .fade-popup-leave-to /* .list-leave-active до версии 2.1.8 */ {
  transform: translateY(100%);
}

.fade-left-menu-enter-active,
.fade-left-menu-leave-active {
  transition: 0.3s ease-in-out;
}

.fade-left-menu-enter, .fade-left-menu-leave-to /* .list-leave-active до версии 2.1.8 */ {
  transform: translateX(-100%);
}

.fade-room-enter-active,
.fade-room-leave-active {
  transition: 0.3s ease-in-out;
}

.fade-room-enter, .fade-room-leave-to /* .list-leave-active до версии 2.1.8 */ {
  transform: translateX(100%);
}

.fade-desc-enter-active,
.fade-desc-leave-active {
  transition: opacity 0.3s ease;
}
.fade-desc-enter, .fade-desc-leave-to
/* .component-fade-leave-active до версии 2.1.8 */ {
  opacity: 0;
}
//
.advantages {
  &-list {
    border-bottom: 1px solid rgba($color: #5a5863, $alpha: 0.1);
    &__item {
      display: flex;
      justify-content: space-between;
      height: 40px;
      margin-bottom: 7px;
      span {
        font-size: 14px;
        line-height: 20px;
        letter-spacing: 0.1px;
        color: #5a5863;
        min-width: 126px;
        /* #5A5863 */
        opacity: 0.7;
      }

      div {
        font-weight: 500;
        font-size: 14px;
        line-height: 20px;
        letter-spacing: 0.1px;
        min-width: 154px;
        width: 57%;
        color: #5a5863;
        /* #5A5863 */
        opacity: 0.9;
        @include respond-to(pc-md) {
          width: 60%;
        }
      }

      .item--parking {
        &__text {
          font-weight: 500;
          font-size: 14px;
          line-height: 20px;
          letter-spacing: 0.1px;
          min-width: 154px;
          width: 57%;
          color: #5a5863;
          /* #5A5863 */
          opacity: 1;
        }
      }

      .item--metro {
        span {
          font-weight: 500;
          font-size: 14px;
          line-height: 20px;
          letter-spacing: 0.1px;
          min-width: 154px;
          width: 57%;
          color: #5a5863;
          /* #5A5863 */
          opacity: 1;
        }
      }
    }
  }

  &-info-wrapper {
    padding-top: 34px;
    &:last-child {
      padding-bottom: 40px;
    }
  }

  &-info-name {
    font-weight: bold;
    font-size: 20px;
    line-height: 24px;
    letter-spacing: 0.1px;
    padding-bottom: 12px;

    color: #5a5863;
  }

  &-text {
    font-size: 14px;
    line-height: 25px;
    letter-spacing: 0.1px;

    color: #5a5863;

    /* #5A5863 */
    opacity: 0.9;
  }
}

.popups-list {
  margin-bottom: 39px;
  padding: 0 20px;

  @include respond-to(pc) {
    max-width: 1200px;
    margin: 0 auto 60px auto;
    padding: 0;
  }
}

.hidden-block {
  display: none;
}

.apartments {
  background: #f1f1f1;
  // padding: 0 20px;
  padding-top: 53px;
  padding-bottom: 50px;

  @include respond-to(tablet) {
    padding-top: 95px;
  }

  &-wrapper {
    display: flex;
    flex-wrap: nowrap;
    overflow-x: auto;

    padding-bottom: 47px;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  &__item {
    cursor: pointer;
    width: 140px;
    height: 175px;
    flex: 0 0 auto;
    margin-right: 10px;

    background: #fdfdfd;
    box-shadow: 0px 10px 20px rgba(66, 72, 77, 0.1);
    border-radius: 8px;
    transition: 0.2s;
    &:first-child {
      margin-left: 20px;
    }
    &:last-child {
      margin-right: 20px;
    }
    &:active {
      transform: scale(0.95);
    }
  }

  &__count {
    margin: 16px 13px 14px;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: 0.1px;

    color: rgba($color: #5a5863, $alpha: 0.9);

    /* #5A5863 */
  }

  &__img {
    padding: 25px 10px;
    height: 85%;
    display: flex;
    justify-content: center;
  }

  &__bot {
    display: flex;
    justify-content: space-between;
    padding-left: 10px;
    .meter {
      font-weight: 400;
      letter-spacing: 0.2px;
      opacity: 0.7;
      font-size: 12px;
      line-height: 16px;

      color: #5a5863;

      /* #5A5863 */
    }

    .leavings {
      background: #60ce78;
      border-radius: 2px 0px 0px 2px;

      font-size: 10px;
      line-height: 20px;
      text-align: center;

      color: #fdfdfd;

      /* #FDFDFD */
      font-weight: 500;
      letter-spacing: 0.2px;
      width: 80px;
    }
  }

  &__info {
    .rooms {
      font-weight: 500;
      font-size: 12px;
      line-height: 16px;
      letter-spacing: 0.1px;

      color: #5a5863;

      opacity: 0.6;
      margin-bottom: 4px;
    }

    .price {
      font-weight: 500;
      font-size: 12px;
      line-height: 16px;
      letter-spacing: 0.1px;

      color: #5a5863;

      opacity: 0.9;
    }
  }

  &-filter {
    display: none;
  }
}
.plane-jk__img {
  height: 100%;
  width: 100%;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
}
.apartments-sorted__list {
  display: none;
}

.apartments-title {
  padding: 0 20px;
  font-weight: bold;
  font-size: 20px;
  line-height: 30px;

  color: #5a5863;
  margin-bottom: 35px;
}

.apartments-heandler {
  font-size: 14px;
  padding: 0 20px;

  text-align: right;

  color: rgba($color: #5a5863, $alpha: 0.5);
  font-weight: 400;
  letter-spacing: 0.2px;
  margin-bottom: 20px;

  &--room {
    float: left;
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    letter-spacing: 0.3px;

    color: #5a5863;

    /* #5A5863 */
    opacity: 0.9;
  }

  &--metr {
    padding-right: 15px;
  }

  &--price {
    line-height: 25px;
  }
}

.discount {
  width: 100%;
  height: 430px;
  background: linear-gradient(87.31deg, #c0c335 34.25%, #b6ce25 100%);
  &__overlay-off {
    width: 100%;
    height: 430px;
  }

  &__wrapper {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
  }

  &__title {
    font-weight: 500;
    font-size: 16px;
    line-height: 25px;
    letter-spacing: 0.1px;
    text-transform: uppercase;
    color: #ffffff;
  }

  &__content {
    padding: 0 20px;

    font-size: 20px;
    line-height: 29px;
    text-align: center;

    color: #fdfdfd;
    /* #FDFDFD */
    mix-blend-mode: normal;
    font-weight: 700;
    letter-spacing: 0.3px;
  }

  &__img {
    background: url('/img/procent-discount.svg') no-repeat;
    width: 155px;
    height: 91px;
  }

  &__detail {
    width: 223px;
    font-weight: 300;
    letter-spacing: 0.2px;
    font-size: 14px;
    line-height: 20px;
    text-align: center;

    color: #fdfdfd;
    mix-blend-mode: normal;

    span {
      font-weight: 600;
    }
  }
}

.discount__phone {
  display: block;
  text-decoration: none;
  width: 266px;
  cursor: pointer;
  background: #ffffff;
  box-shadow: 0px 8px 15px rgba(66, 72, 77, 0.1);
  border-radius: 68px;
  margin: 0 auto;
  position: relative;
  max-width: 273px;
  text-align: center;

  a {
    font-weight: 500;
    font-size: 18px;
    line-height: 24px;
    letter-spacing: 0.1px;
    color: #5a5863;
    display: block;
    padding: 13px 0 13px 20px;

    @include respond-to(tablet) {
      letter-spacing: 0.3px;
    }
  }
}

.discount__phone::before {
  content: '';
  width: 20px;
  height: 24px;
  background: url('/img/phone-icon.svg');
  background-repeat: no-repeat;
  background-size: 20px;
  position: absolute;
  left: 22px;
  top: 16px;
}

.map {
  position: relative;
  padding: 50px 20px 30px 20px;
  background: #f1f1f1;

  &__title {
    font-size: 20px;
    line-height: 30px;
    color: #5a5863;
    /* #5A5863 */
    opacity: 0.9;
    margin: 0;
    padding: 45px 0 35px 0;
  }
}

.map__jk {
  width: 100%;
  height: 430px;
  border-radius: 8px 8px 0 0;
}

.infrastructure {
  background: linear-gradient(
    87.03deg,
    #3fcd5e 34.25%,
    #26c051 99.99%,
    #26c051 100%
  );
  border-radius: 0px 0px 8px 8px;
  padding: 31px 20px;
  &__title {
    line-height: 24px;

    color: #fdfdfd;
    opacity: 0.5;
    /* #5A5863 */

    font-weight: 600;
    font-size: 20px;
    letter-spacing: 0.3px;
    margin-bottom: 30px;
  }

  &__list {
    display: flex;
    flex-wrap: wrap;
    &-item {
      // width: 60%;
      max-width: 168px;
      position: relative;
      font-weight: normal;
      font-size: 14px;
      line-height: 20px;
      letter-spacing: 0.1px;

      color: #fdfdfd;

      width: 200px;
      margin-bottom: 18px;

      span {
        padding-left: 20px;
      }

      &::before {
        content: '';
        display: block;
        position: absolute;
        width: 14px;
        height: 20px;
        background: url('/img/jk-check--yelow.svg') no-repeat center;
      }
    }
  }
}

.is-question {
  background: #f1f1f1;
  padding: 61px 20px 0 20px;

  &__title {
    margin: 0;
    font-weight: bold;
    font-size: 20px;
    line-height: 30px;
    text-align: center;
    letter-spacing: 0.1px;
    color: #5a5863;
    /* #5A5863 */
    mix-blend-mode: normal;
  }

  &-wrapper {
    text-align: center;

    padding-bottom: 50px;

    .write-us {
      display: inline-block;
      font-weight: 500;
      font-size: 16px;
      line-height: 24px;
      text-align: center;
      letter-spacing: 0.1px;
      color: #5a5863;
      /* #5A5863 */
      mix-blend-mode: normal;
      margin-bottom: 24px;
    }
  }
}

.jk-footer {
  background: #fdfdfd;
  padding-top: 45px;
  text-align: center;
  padding-bottom: 20px;

  &-list {
    text-align: center;

    a {
      font-weight: 500;
      font-size: 16px;
      line-height: 25px;
      letter-spacing: 0.2px;
      text-transform: uppercase;
      color: rgba($color: #5a5863, $alpha: 0.8);
    }

    /* #5A5863 */

    &__item {
      margin-bottom: 34px;

      &:last-child {
        margin-bottom: 40px;
      }

      &--discount {
        a {
          color: #5dbf16;
        }
      }
    }
  }

  &__conf {
    width: 268px;
    margin: 0 auto;
    margin-bottom: 9px;
    font-weight: normal;
    font-size: 12px;
    line-height: 19px;
    text-align: center;
    letter-spacing: 0.1px;

    color: #5a5863;

    /* #5A5863 */
    opacity: 0.5;
  }

  &__number {
    padding-bottom: 40px;
    a {
      // font-size: 34px;
      padding-left: 32px;
      position: relative;
      font-weight: normal;
      font-size: 26px;
      line-height: 24px;
      text-align: right;
      letter-spacing: 0.1px;
      color: #5a5863;
      opacity: 0.9;

      @include respond-to(tablet) {
        letter-spacing: 0.3px;
      }

      &::before {
        content: '';
        display: block;
        position: absolute;
        width: 24px;
        height: 24px;
        background: url(/img/phone-icon.svg) no-repeat;
        background-size: 23px;
        left: 0px;
        top: 5px;
      }
    }
  }
}

.confend {
  display: block;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0.1px;
  text-decoration-line: underline;
  color: #5a5863;
  /* #5A5863 */
  opacity: 0.5;
  margin-bottom: 15px;
}

.call-depart {
  background: linear-gradient(
    180deg,
    rgba(241, 241, 241, 0) 0%,
    rgba(241, 241, 241, 0.89) 68.51%,
    #f1f1f1 100%,
    #f1f1f1 100%
  );
  position: fixed;
  bottom: -1px;
  width: 100%;
  padding-bottom: 20px;
  z-index: 2;
  &__wrapper {
    display: block;
    width: 89%;
    margin: 0 auto;
    padding: 15px 0;
    text-align: center;
    background: #5dbf16;
    box-shadow: 0px 10px 20px rgba(66, 72, 77, 0.2),
      0px 9px 40px rgba(96, 189, 30, 0.2);
    border-radius: 30px;
    transition: 0.1s;
    &:active {
      transform: scale(0.95);
    }
    span {
      position: relative;

      font-size: 14px;
      line-height: 20px;
      text-align: center;

      color: #fafbfb;
      padding-left: 29px;

      font-weight: 400;
      letter-spacing: 0.3px;
      &::before {
        content: '';
        display: block;
        position: absolute;
        width: 20px;
        height: 20px;
        background: url('/img/white-phone.svg') no-repeat;
        left: -5px;
        top: -1px;
      }
    }

    div {
      font-style: normal;
      font-weight: 500;
      font-size: 14px;
      line-height: 20px;
      text-align: center;
      letter-spacing: 0.1px;
      color: #fafbfb;
    }
  }
}

.left-menu {
  display: flex;
  flex-direction: column;
  height: 100%;

  &__wrapper {
    z-index: 99999;
    position: fixed;
    top: 0;
    height: 100vh;
    width: 84.375%;
    min-width: 270px;
    max-width: 270px;
    background: #fdfdfd;
    box-shadow: 0px 16px 25px rgba(90, 88, 99, 0.1);
  }

  &__wrappers {
    height: 100%;
    overflow: auto;
  }

  &__overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 103;
    background: rgba($color: #2d3038, $alpha: 0.7);
  }

  &__logo {
    background: url('/img/light-logo.svg') no-repeat;
    width: 113px;
    height: 34px;
    display: block;
    margin: 18px 0 10px 30px;

    &-container {
      background: radial-gradient(99px at 35.17% 0%, #fdfdfd 0%, #f1f1f1 100%);
      height: 110px;
      margin-bottom: 40px;
    }
  }

  &__name-complex {
    margin-left: 30px;
    margin-bottom: 25px;
    letter-spacing: 0.1px;
    font-weight: bold;
    font-size: 16px;
    line-height: 23px;
    color: rgba($color: #5a5863, $alpha: 0.8);
    /* #5A5863 */
  }

  &__border-bot {
    width: 86%;
    margin: 0 auto;
    margin-bottom: 45px;
    height: 1px;
    background: #5a5863;
    opacity: 0.1;
  }

  &__list {
    text-align: left;
    margin-bottom: 16px;
    height: 100%;
    &__item {
      margin: 12px 0 38px 40px;
      a {
        font-weight: 500;
        font-size: 14px;
        line-height: 22px;
        text-align: center;
        letter-spacing: 0.2px;
        text-transform: uppercase;
        color: #5a5863;
        /* #5A5863 */
        opacity: 0.8;
      }

      &--discount {
        a {
          color: #5dbf16;
        }
      }
    }

    &--hidden {
      height: 100%;
      width: 230px;
      margin: 0 auto;
      border-top: 1px solid #f1f1f1;
      padding-top: 42px;
      padding-bottom: 40px;

      &__item {
        margin: 12px 0 38px 20px;
      }
    }
  }

  &__text--link {
    position: relative;
    bottom: 46px;
    left: calc(50% - 120px);
    width: 240px;

    padding-left: 40px;
    border-top: 1px solid #f1f1f1;
    padding-top: 39px;
  }

  &__circles {
    height: 25px;
    width: 200px;
    background-position: left;
  }
}

.circles {
  background-image: url('/img/circles.svg');
  background-repeat: no-repeat;
}

.close-left-menu {
  cursor: pointer;
  position: absolute;
  display: block;
  width: 40px;
  height: 40px;
  background: url(/img/close-icon.svg) no-repeat center;
  right: -45px;
  top: calc(50% - 20px);
}

.phone-depart__text {
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  letter-spacing: 0.1px;
  color: #5a5863;
  /* #5A5863 */
  opacity: 0.6;
}

.number-phone__text--link {
  .jk-left-menu__text-link {
    font-weight: 500;
    font-size: 20px;
    line-height: 24px;
    text-align: center;
    letter-spacing: 0.1px;
    color: #5a5863;
    /* #5A5863 */
    opacity: 0.9;

    &::before {
      content: '';
      display: block;
      position: absolute;
      height: 25px;
      background: url(/img/phone-icon.svg) no-repeat center;
      width: 25px;
      top: 39px;
      left: 7px;
      background-size: 20px;
    }
  }
}

.leaflet-bottom {
  display: none !important;
}

.my-icons {
  width: 39px !important;
  height: 49px !important;
  background: url('/img/marker-gis.svg');
  background-size: cover;
  background-position: center;
  pointer-events: none;
}

.jk-map__zoom-control-wrapper {
  position: absolute;
  z-index: 999;
  top: calc(50% - 50px);
  right: 10px;

  .jk-map__zoom-control {
    user-select: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 45px;
    height: 45px;
    background: #ffffff;
    box-shadow: 0px 5px 20px rgba(66, 72, 77, 0.25);
    border-radius: 50px;
    transition: 0.1s;
    &:hover {
      opacity: 0.94;
    }
    &:active {
      transform: scale(0.95);
      box-shadow: none;
    }
    &:first-child {
      margin-bottom: 10px;
    }
  }
}
.request-popup {
  &--fixed {
    background: #f1f1f1;
    height: 430px;
    position: relative;
  }

  &-content {
    width: 273px;
    margin: 68px auto 29px auto;
    font-weight: 800;
    font-size: 20px;
    line-height: 29px;
    text-align: center;
    letter-spacing: 0.1px;
    color: #5a5863;

    &--welcome {
      margin-top: 82px;
    }
  }

  &-req {
    margin-bottom: 20px;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 22px;
    text-align: center;
    letter-spacing: 0.1px;
    color: rgba($color: #5a5863, $alpha: 0.6);
    mix-blend-mode: normal;
    &--welcome {
      width: 300px;
      margin: 0 auto 130px auto;
    }
  }

  &-conf {
    color: rgba($color: #5a5863, $alpha: 0.6);
    a {
      color: inherit;
    }
    /* #5A5863 */
  }
}

.jk-btn--green {
  cursor: pointer;
  mix-blend-mode: normal;
  box-shadow: 0px 8px 15px rgba(66, 72, 77, 0.1);
  border-radius: 68px;
  width: 273px;
  margin: 0 auto 15px auto;

  .btn-text__req {
    background: #5dbf16;
    border-radius: 68px;
    padding: 15px 0;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    text-align: center;
    letter-spacing: 0.1px;
    color: #fdfdfd;
  }
}

.closest-residentials {
  border-bottom: 1px solid rgba($color: #5a5863, $alpha: 0.1);
  &-wrapper {
    display: flex;
    flex-wrap: nowrap;
    overflow-x: auto;
    padding: 40px 0 72px 0;

    @include respond-to(pc-md) {
      padding-top: 60px;
      padding-bottom: 80px;
      max-width: 1200px;
      margin: 0 auto;
    }

    &::-webkit-scrollbar {
      display: none;
    }
  }

  &-overlay {
    display: block;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      198.88deg,
      rgba(45, 48, 56, 0) 22.25%,
      rgba(39, 45, 57, 0.86) 75.59%
    );
  }
  &__title {
    font-weight: bold;
    font-size: 20px;
    line-height: 30px;
    color: #5a5863;
    opacity: 0.9;
    margin-top: 47px;

    padding: 0 20px;
  }

  &-item {
    overflow: hidden;
    position: relative;
    width: 240px;
    height: 240px;
    border-radius: 8px;
    margin-right: 10px;
    flex: 0 0 auto;

    &:first-child {
      margin-left: 20px;
    }

    &:last-child {
      margin-right: 20px;
    }

    &__angle {
      right: 0;
      position: absolute;
      opacity: 0.95;
      width: 159px;
      height: 40px;

      &-wrap {
        overflow: hidden;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        &::before {
          content: '';
          position: absolute;
          top: 0;
          bottom: 0;
          background: rgba($color: #5eae24, $alpha: 0.95);
          clip: rect(0px, auto, auto, auto);
          transform: skewX(31deg);
          right: -14px;
          left: 12px;
        }
      }
    }

    &__text {
      position: absolute;
      bottom: 15px;
      left: 20px;

      &__name {
        font-size: 20px;

        letter-spacing: 0.1px;

        color: #ffffff;

        text-shadow: 0px 0px 10px #17191a;

        font-weight: 300;
        line-height: 25px;
        margin-bottom: 5px;
      }

      &__builder {
        font-weight: normal;
        font-size: 12px;
        line-height: 20px;

        color: rgba($color: #f5f6f9, $alpha: 0.6);

        /* #F5F6F9 */

        text-shadow: 0px 0px 15px rgba(23, 25, 26, 0.7);
      }
    }
  }

  &__price {
    position: absolute;
    width: 120px;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: 0.2px;
    color: #ffffff;
    opacity: 0.8;
    right: 5px;
    top: 9px;
  }

  &__more {
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 240px;
    height: 240px;
    left: 520px;
    top: 4368px;
    flex: 0 0 auto;

    background: #f5f5f5;
    border-radius: 4px;

    @include respond-to(pc-md) {
      width: 170px;
    }
    &:active {
      transform: scale(0.95);
    }
    .btn__more {
      background: #fdfdfd url('/img/arrow-stroke.svg') no-repeat center;
      width: 50px;
      height: 50px;
      // background-size: 14px;
      border: 1px solid rgba(167, 203, 213, 0.2);
      border-radius: 100px;
      margin-bottom: 15px;
    }

    .more__text {
      font-weight: 500;
      font-size: 12px;
      line-height: 19px;
      text-align: center;
      text-transform: uppercase;
      color: #5a5863;
      /* #5A5863 */
      opacity: 0.7;
    }

    &:hover {
      background: #60ce78;
      transition: 0.3s;

      .more__text {
        color: #fdfdfd;
      }
    }
  }
}

@media (min-width: 768px) {
  .header-menu {
    align-items: center;
    justify-content: none;
    height: 60px;
    /* 16 px */
    box-shadow: 0px 16px 25px rgba(66, 72, 77, 0.1);

    @include respond-to(pc-md) {
      padding-left: 0;
    }

    &__list {
      &__item {
        letter-spacing: 0.2px;
      }
    }

    &__logo {
      margin-left: 30px;
      width: 110px;
      height: 40px;

      &--test {
        display: block;
      }

      @include respond-to(pc-md) {
        margin: 5px auto 0 37px;
      }
    }

    &__phone {
      margin: 0 40px 0 auto;

      &::before {
        width: 21px;
        height: 21px;
        background-size: 21px;
        top: 3px;
        left: -29px;
      }
    }
  }

  .btn--to-room {
    @include respond-to(pc-md) {
      display: block;
      right: 0;
      top: 40px;
      position: absolute;
      background: #5dbf16;
      box-shadow: 0px 10px 20px rgba(66, 72, 77, 0.2),
        0px 9px 40px rgba(96, 189, 30, 0.2);
      border-radius: 30px;
      padding: 13px 60px;
      span {
        font-weight: 500;
        font-size: 16px;
        line-height: 24px;
        text-align: center;
        letter-spacing: 0.1px;
        color: #fafbfb;
        border-radius: 25px;
      }
    }

    &:hover {
      box-shadow: none;
      transition: 0.3s ease-in-out;
    }
  }

  .jk-button-whatsup {
    display: none;
  }

  .jk-name {
    font-size: 44px;
    border: none;
    padding: 0;
  }

  .desc-list {
    display: flex;
    flex-wrap: wrap;
    padding: 35px 0 30px;

    &__item {
      justify-content: unset;

      position: relative;

      .item-heandle {
        min-width: 120px;
        max-width: 150px;
        font-weight: 400;
        letter-spacing: 0.2px;
        padding-left: 35px;
      }

      &:nth-child(2) {
        .item-heandle {
          padding-left: 35px;
          min-width: 95px;
        }
      }
    }
  }

  .btn__show-all {
    display: none;
  }
  .advantages {
    display: flex !important;
    flex-direction: row-reverse;
    justify-content: space-between;
    border-top: 1px solid rgba(90, 88, 99, 0.1);
    padding: 48px 0 96px;
    &-info-wrapper {
      display: none;
    }

    &-list {
      border: none;
      width: 44%;
      @include respond-to(pc) {
        width: 31.5%;
      }

      &__item {
        span {
          letter-spacing: 0.2px;
          font-weight: 400;
        }

        div {
          font-weight: 500;
          letter-spacing: 0.2px;
        }
      }
    }
  }

  .about-jk {
    padding: 0;
    width: 44.4%;
    border: none;
    font-weight: 400;
    letter-spacing: 0.2px;
    @include respond-to(pc) {
      width: 53%;
    }
  }

  .popups-list {
    display: flex;
    flex-wrap: nowrap;
    overflow-x: auto;
    width: 100%;
    padding: 0;
    margin-bottom: 48px;
    &::-webkit-scrollbar {
      display: none;
    }
  }

  .popups-wrapper {
    cursor: pointer;
    width: 34%;
    flex: 1 1 590px;
    min-width: 280px;
    margin-right: 20px;

    &:first-child {
      margin-left: 40px;
      @include respond-to(pc-md) {
        margin-left: 0;
      }
    }

    &:nth-child(3) {
      margin-right: 0;
    }

    &--alone {
      margin: 0;
      &:first-child {
        margin: 0;
      }
    }
  }

  .hidden-block {
    display: block;
    width: 40px;
    height: 40px;
    flex: 0 0 auto;
    @include respond-to(pc) {
      display: none;
    }
  }

  .apartments {
    @include respond-to(pc-md) {
      padding-top: 120px;
    }
    &-title {
      font-size: 34px;
      padding-left: 40px;
      margin-bottom: 57px;
      color: rgba($color: #5a5863, $alpha: 0.9);
      /* #5A5863 */

      @include respond-to(pc-md) {
        max-width: 1200px;

        margin: 0 auto 60px auto;
        padding: 0;
      }
    }

    &-slider-wrapper {
      display: none;
    }

    &-filter {
      display: block;

      @include respond-to(pc-md) {
        display: flex;
        align-items: center;
        max-width: 1200px;
        margin: 0 auto;
      }
      &__wrapper {
        display: flex;
        flex-wrap: nowrap;
        overflow-x: auto;
        padding-bottom: 5px;
        margin-bottom: 25px;
        &::-webkit-scrollbar {
          display: none;
        }
      }

      &__item {
        flex: 0 0 auto;
        margin-right: 10px;
        &:first-child {
          margin-left: 40px;
          @include respond-to(pc-md) {
            margin-left: 0;
          }
        }
        &--checkbox {
          cursor: pointer;
          display: block;
          height: 50px;
          background: #fdfdfd;
          padding: 14px 25px 12px 26px;
          box-shadow: 0px 2px 4px rgba(66, 72, 77, 0.1);
          border-radius: 30px;

          font-size: 16px;
          line-height: 24px;
          text-align: center;

          color: rgba($color: #5a5863, $alpha: 0.8);
          /* #5A5863 */
          border-radius: 30px;
          font-weight: 500;
          letter-spacing: 0.3px;
          &--empty {
            opacity: 0.5;
          }
          &:hover {
            box-shadow: none;
            transition: 0.3s;
          }
        }
      }

      &__ranges {
        padding-left: 40px;

        font-size: 20px;
        line-height: 24px;

        color: #5a5863;

        margin-bottom: 30px;
        font-weight: 400;
        letter-spacing: 0.3px;
        opacity: 0.8;

        @include respond-to(pc-md) {
          font-size: 16px;
          margin-left: auto;
        }

        .ranges-m {
          margin-right: 20px;
        }
      }
    }
  }

  input[type='checkbox']:checked + .apartments-filter__item--checkbox {
    background: #60ce78;
    font-weight: 500;
    color: #fafbfb;
  }

  input[type='radio']:checked + .apartments-filter__item--radio--all {
    background: #60ce78;
    font-weight: 500;
    color: #fafbfb;
  }

  .apartments-sorted__list {
    display: flex;
    flex-wrap: wrap;
    margin: 0 35px;
    @include respond-to(pc-md) {
      max-width: 1220px;
      margin: 0 auto;
    }
    &__item {
      cursor: pointer;
      display: flex;
      flex-direction: column;
      position: relative;
      height: 270px;
      width: calc(33% - 10px);
      max-width: 274px;
      margin: 0 5px;
      margin-top: 10px;
      background: #fdfdfd;
      box-shadow: 0px 10px 20px rgba(66, 72, 77, 0.1);
      border-radius: 8px;
      transition: 0.3s ease-in-out;
      @include respond-to(pc) {
        width: calc(25% - 10px);
      }

      @include respond-to(pc-md) {
        margin: 20px 10px 0 10px;
        width: calc(20% - 20px);
      }

      .plane-zoom {
        display: none;
        opacity: 0;

        background: #f4f4f5;
        border-radius: 8px;
        padding: 10px 52px;

        font-size: 14px;
        letter-spacing: 0.3px;
        color: rgba(90, 88, 99, 0.8);
        font-weight: 500;
      }

      &:hover {
        box-shadow: none;
        transition: 0.3s;

        .meter {
          display: none;
          opacity: 0;
        }

        .leavings {
          display: none;
          opacity: 0;
        }

        .plane-zoom {
          opacity: 1;
          display: block;
          animation: jump 0.2s ease-in-out;
        }
      }

      &:active {
        transition: 0.2s ease-in;
        transform: scale(0.95);
      }
      &__img {
        margin: 43px auto 0 auto;
        width: 140px;
        height: 140px;
        display: flex;
        justify-content: center;

        img {
          max-width: 100%;
          max-height: 100%;
        }
      }

      &__bot {
        position: absolute;
        width: 100%;
        bottom: 15px;

        display: flex;
        flex-direction: column-reverse;
        align-items: center;

        .leavings {
          background: #60ce78;
          border-radius: 2px;
          width: 109px;
          text-align: center;

          font-size: 12px;
          line-height: 24px;

          color: #fdfdfd;

          font-weight: 400;
          letter-spacing: 0.4px;
          animation: jump 0.3s ease-in-out;
        }

        .meter {
          font-weight: 500;
          font-size: 16px;
          line-height: 20px;
          text-align: center;

          color: rgba($color: #5a5863, $alpha: 0.8);
          /* #5A5863 */
          margin-top: 4px;

          letter-spacing: 0.2px;

          animation: jump 0.3s ease-in-out;

          span {
            opacity: 0.8;
          }
        }
      }
    }
  }

  .call-depart {
    display: flex;
    padding: 0 113px;
    padding-bottom: 20px;
    justify-content: center;
    position: absolute;

    &__wrapper {
      width: 353px;
      margin: 0 10px 0 0;
    }

    .button-whatsapp {
      display: flex;
      margin: 0;
    }
  }

  .room-popup {
    &-wrapper {
      // background: #f5fafe;
      width: 630px;
      .call-depart {
        display: none;
      }
    }

    // &__top {
    //   padding-top: 50px;
    // }

    &__img {
      width: 450px;
      height: 300px;

      padding: 0;
      padding-top: 50px;
      margin-bottom: 50px;
    }

    &__info {
      padding: 24px 0 20px 0;
    }

    &__leavings {
      height: 30px;
      padding: 5px 0 5px 0;
      font-weight: 400;
      font-size: 14px;
      letter-spacing: 0.3px;
    }

    &__number {
      position: relative;
      width: 100%;
      margin: 0 auto 25px auto;
      background: #f1f1f1;
      padding-top: 40px;

      .number-title {
        font-weight: 700;
        font-size: 22px;
        letter-spacing: 0.3px;
      }

      .number__phone-link {
        padding: 12px 0 20px 35px;

        a {
          font-weight: 400;
          letter-spacing: 0.3px;
          position: relative;
          font-size: 26px;
          line-height: 24px;
          &::before {
            content: '';
            display: block;
            position: absolute;
            width: 24px;
            height: 24px;
            background: url(/img/phone-icon.svg) no-repeat;
            background-size: 24px;
            left: -31px;
            top: 4px;
          }
        }
      }

      .number-request {
        font-size: 16px;
        line-height: 24px;
        display: none;
        width: 440px;
        letter-spacing: 0.2px;
        &--tablet {
          display: block;
          width: 446px;
          margin: 0 auto 30px auto;
        }
      }
      .number__know-price {
        cursor: pointer;
        span {
          font-size: 16px;
          line-height: 24px;
        }

        &:hover {
          box-shadow: none;
          transition: 0.3s;
        }
      }

      .number__input {
        width: 237px;
        margin: 0;
      }

      .number__controller-container {
        display: flex;
        padding: 0 50px 5px;
      }
    }
  }

  .number__conf {
    width: 100%;
    font-size: 12px;
    font-weight: 400;
    letter-spacing: 0.2px;
    margin-bottom: 10px;

    .confend {
      font-size: 12px;
    }
  }

  .info__title {
    font-size: 14px;
    line-height: 25px;
    font-weight: 300;
    letter-spacing: 0.3px;
    opacity: 0.7;
  }

  .info__text {
    font-size: 22px;
    letter-spacing: 0.2px;
  }

  #discount {
    display: none;
  }

  .map {
    padding: 0 40px;
    padding-bottom: 60px;
    &__title {
      font-size: 34px;
      line-height: 30px;
      @include respond-to(pc-md) {
        max-width: 1200px;

        padding: 72px 0 60px;
        margin: 0 auto;
      }
    }
  }

  .infrastructure {
    padding-left: 40px;
    @include respond-to(pc-md) {
      max-width: 1200px;
      margin: 0 auto;
      display: flex;
    }
    &__title {
      font-size: 30px;
      line-height: 40px;
      letter-spacing: 0.3px;

      margin-bottom: 20px;

      @include respond-to(pc-md) {
        margin: 0;
      }
    }

    &__list-item {
      margin-bottom: 0;

      line-height: 40px;

      font-weight: 300;
      letter-spacing: 0.2px;
      @include respond-to(pc-md) {
        max-width: 200px;
      }

      &::before {
        top: 10px;
      }
    }

    &__list {
      width: 100%;
    }
  }

  .map__jk {
    height: 500px;
    @include respond-to(pc-md) {
      max-width: 1200px;
      margin: 0 auto;
    }
  }

  .closest-residentials {
    @include respond-to(pc-md) {
      max-width: unset;
    }
    &__title {
      font-size: 34px;
      padding-left: 40px;
      margin-top: 120px;
      @include respond-to(pc-md) {
        padding: 0;
        /* margin-top: 123px; */
        max-width: 1200px;
        margin: 123px auto 0 auto;
      }
    }

    &-item {
      width: 270px;
      border-radius: 4px;
      @include respond-to(pc-md) {
        width: 325px;
        margin-right: 20px;
      }
      &:first-child {
        margin-left: 40px;
        @include respond-to(pc-md) {
          margin-left: 0;
        }
      }

      &__text {
        &__name {
          font-weight: 400;
          letter-spacing: 0.2px;
        }

        &__builder {
          font-weight: 300;
          letter-spacing: 0.2px;
        }
      }
    }

    &__price {
      font-weight: 300;
      letter-spacing: 0.4px;
      opacity: 0.9;
    }

    &__more {
      width: 165px;
      border-radius: 4px;
    }
  }

  .is-question {
    &__title {
      font-size: 34px;
      margin-bottom: 27px;
    }

    &-wrapper {
      .write-us {
        font-size: 20px;
      }
    }
  }
}

@media (min-width: 1240px) {
  .jk-footer {
    display: flex;
    flex-wrap: wrap;
    // width: 80%;
    margin: 0 auto;
    max-width: 1200px;

    &-list {
      display: flex;
      width: 72%;

      &__item {
        width: 160px;
      }
    }

    &__number {
      width: 28%;
      text-align: right;
    }

    &__conf {
      margin: 0;
      width: 547px;
      font-size: 14px;
      line-height: 16px;
      margin-right: auto;
    }

    .confend {
      font-size: 14px;
      margin-right: 41px;
    }

    .declaration {
      margin: 0;
    }
  }

  .call-depart {
    display: none;
  }
}
</style>
