/* eslint-disable no-unused-vars */
<template>
  <!-- <div class="search-box-wrapper"> -->
  <div class="filter-search-box">
    <!-- fake filter-box-button -->
    <div class="filter-global-wrapper fake-filter">
      <div class="filter-title-box" @click="toggleAllFilters">
        <div class="filter-main-title">
          <span v-if="!isOpenAllFilters" class="close-filter">Фильтры</span>
          <span v-if="isOpenAllFilters" class="open-filter"
            >Свернуть фильтры</span
          >
        </div>
        <div class="filter-img-wrapper">
          <div v-if="countFilters" class="count-all-filters">
            {{ countFilters }}
          </div>
          <img src="/images/map-search/filters.svg" />
        </div>
      </div>
    </div>

    <div class="filter-global-wrapper">
      <div class="filter-main-content">
        <div
          class="filter-title-box filter-title-box--natural"
          @click="toggleAllFilters"
        >
          <div class="filter-main-title">
            <span v-if="!isOpenAllFiltersWith" class="close-filter"
              >Фильтры</span
            >
            <span v-if="isOpenAllFiltersWith" class="open-filter"
              >Свернуть фильтры</span
            >
          </div>
          <div class="filter-img-wrapper">
            <div v-if="countFilters" class="count-all-filters">
              {{ countFilters }}
            </div>
            <img src="/images/map-search/filters.svg" />
          </div>
        </div>
        <div
          v-show-slide="isOpenAllFiltersWith"
          class="filter-all-toggle"
          :class="{ 'all-filter-react': accordeonClassFilters }"
        >
          <div class="filter-box-wrapper">
            <div
              class="search-result"
              :class="{ 'search-result-show': filterNumber === 1 && isShowBtn }"
            >
              <ButtonRC
                :size="'xl'"
                :action="statusBtn"
                @click="showRcOnMap(getFilterRc.length)"
              >
                <span v-if="statusBtn !== 'loading' && getFilterRc.length"
                  >Показать {{ getFilterRc.length }}</span
                >
                <div
                  v-else-if="statusBtn !== 'loading' && !getFilterRc.length"
                  class="static-btn-text"
                >
                  <div class="static-btn-text__title">
                    Не найдено подходящих ЖК
                  </div>
                  <div class="static-btn-text__pretext">
                    Попробуйте изменить параметры поиска
                  </div>
                </div>
              </ButtonRC>
            </div>

            <div class="filter-box">
              <div class="filter-title" @click="toggleRoomsFilter">
                <div class="filter-name">Количество комнат</div>
                <div class="filter-close">
                  <span
                    v-if="activeRooms.length"
                    class="pretext-drop"
                    @click.stop="dropActiveRooms"
                    >Сбросить</span
                  >
                  <img
                    v-if="!activeRooms.length"
                    :class="{ arrowDurationUp: roomsFilterOpen }"
                    src="/images/map-search/arrow.svg"
                  />
                </div>
              </div>
              <div v-show-slide="roomsFilterOpen" class="filter-content">
                <div class="filter-content-box">
                  <div class="room-buttons-wrapper">
                    <ButtonRC
                      :text="'Все'"
                      :isactive="!activeRooms.length"
                      @click="chooseRooms(-1)"
                    ></ButtonRC>
                    <ButtonRC
                      v-for="(room, index) in roomsFilter"
                      :key="index"
                      :text="room.title"
                      :isactive="activeRooms.includes(room.range[0])"
                      @click="chooseRooms(room.range)"
                    ></ButtonRC>
                    <!-- <ButtonRC :text="'Студия'" :isactive="activeRooms.includes(0)" @click="chooseRooms(0)"></ButtonRC>
										<ButtonRC :text="'1-ком.'" :isactive="activeRooms.includes(1)" @click="chooseRooms(1)"></ButtonRC>
										<ButtonRC :text="'2-ком.'" :isactive="activeRooms.includes(2)" @click="chooseRooms(2)"></ButtonRC>
										<ButtonRC :text="'3-ком.'" :isactive="activeRooms.includes(3)" @click="chooseRooms(3)"></ButtonRC>
										<ButtonRC :text="'4-ком.+'" :isactive="activeRooms.includes(4)" @click="chooseRooms(4)"></ButtonRC>-->
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="filter-box-wrapper">
            <div
              class="search-result"
              :class="{ 'search-result-show': filterNumber === 2 && isShowBtn }"
            >
              <ButtonRC
                :size="'xl'"
                :action="statusBtn"
                @click="showRcOnMap(getFilterRc.length)"
              >
                <span v-if="statusBtn !== 'loading' && getFilterRc.length"
                  >Показать {{ getFilterRc.length }}</span
                >
                <div
                  v-else-if="statusBtn !== 'loading' && !getFilterRc.length"
                  class="static-btn-text"
                >
                  <div class="static-btn-text__title">
                    Не найдено подходящих ЖК
                  </div>
                  <div class="static-btn-text__pretext">
                    Попробуйте изменить параметры поиска
                  </div>
                </div>
              </ButtonRC>
            </div>

            <div class="filter-box">
              <div class="filter-title" @click="togglePriceFilter">
                <div class="filter-name">Стоимость</div>
                <div class="filter-close">
                  <span
                    v-if="!togglePrice"
                    class="pretext-drop"
                    @click.stop="dropPrice"
                    >Сбросить</span
                  >
                  <img
                    v-if="togglePrice"
                    :class="{ arrowDurationUp: priceFilterOpen }"
                    src="/images/map-search/arrow.svg"
                  />
                </div>
              </div>
              <div v-show-slide="priceFilterOpen" class="filter-content">
                <div class="filter-content-box">
                  <div class="price-filter-wrapper">
                    <div class="price-input-box">
                      <InputText
                        :value="minSum"
                        :type="'number'"
                        :inputtype="'rub'"
                        :default-value="defaultValueLeft"
                        @input="handlerInputMinPrice($event)"
                      ></InputText>
                    </div>
                    <div class="price-input-box">
                      <InputText
                        :value="maxSum"
                        :type="'number'"
                        :inputtype="'rub'"
                        :default-value="defaultValueRight"
                        @input="handlerInputMaxPrice($event)"
                      ></InputText>
                    </div>
                  </div>

                  <div>
                    <v-slider
                      v-model="rangeSum"
                      :height="'10px'"
                      :dot-size="25"
                      :tooltip="'none'"
                      :enable-cross="false"
                      :use-keyboard="true"
                      :min="allRcMinPrice"
                      :max="allRcMaxPrice"
                      :interval="100000"
                      :tooltip-formatter="(val) => val.toLocaleString('ru')"
                      @drag-end="setPriceFilter"
                    ></v-slider>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            v-if="completionYears.length"
            class="filter-box-wrapper filter-box-wrapper--more"
          >
            <div
              class="search-result"
              :class="{ 'search-result-show': filterNumber === 3 && isShowBtn }"
            >
              <ButtonRC
                :size="'xl'"
                :action="statusBtn"
                @click="showRcOnMap(getFilterRc.length)"
              >
                <span v-if="statusBtn !== 'loading' && getFilterRc.length"
                  >Показать {{ getFilterRc.length }}</span
                >
                <div
                  v-else-if="statusBtn !== 'loading' && !getFilterRc.length"
                  class="static-btn-text"
                >
                  <div class="static-btn-text__title">
                    Не найдено подходящих ЖК
                  </div>
                  <div class="static-btn-text__pretext">
                    Попробуйте изменить параметры поиска
                  </div>
                </div>
              </ButtonRC>
            </div>

            <div class="filter-box">
              <div class="filter-title" @click="toggleMoreFilter">
                <div class="filter-name">Дополнительно</div>
                <div class="filter-close">
                  <span
                    v-if="toggleAdditionally"
                    class="pretext-drop"
                    @click.stop="dropAdditionallyFilter"
                    >Сбросить</span
                  >
                  <img
                    v-if="!toggleAdditionally"
                    :class="{ arrowDurationUp: moreFilterOpen }"
                    src="/images/map-search/arrow.svg"
                  />
                </div>
              </div>
              <div
                v-show-slide="moreFilterOpen"
                class="filter-content"
                :class="{ 'all-filter-react': accordeonClassMore }"
              >
                <div class="filter-content-box">
                  <div class="more-filter-wrapper">
                    <div
                      class="more-filter"
                      :class="{ 'mob-active-additional': isMobDate }"
                    >
                      <div
                        class="more-filter-header"
                        @click="mobToggleAdditional('date')"
                      >
                        <div class="more-filter-title">Срок сдачи</div>
                        <div class="more-filter-change">
                          <img
                            v-if="!pointsDate.length"
                            class="open-point-filter-img"
                            src="/images/map-search/arrow.svg"
                          />
                          <div v-else class="count-filer-points">
                            {{ pointsDate.length }}
                          </div>
                        </div>
                      </div>
                      <div v-show-slide="compMobDate" class="more-filter-body">
                        <div class="more-filter-body-title">
                          Выберите один или несколько
                        </div>
                        <div class="more-filter-body-point-wrapper">
                          <div
                            v-for="(point, index) in completionYears"
                            :key="index"
                            class="more-filter-body-point"
                            @click="checkedDate(point)"
                          >
                            <div
                              class="checkbox-box"
                              :class="{
                                'checkbox-box--checked': pointsDate.includes(
                                  point
                                )
                              }"
                            ></div>
                            <div class="more-filter-body-point-name">
                              {{ point }}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      class="more-filter"
                      :class="{ 'mob-active-additional': isMobBay }"
                    >
                      <div
                        class="more-filter-header"
                        @click="mobToggleAdditional('bay')"
                      >
                        <div class="more-filter-title">Способы покупки</div>
                        <div class="more-filter-change">
                          <img
                            v-if="!pointsPaymentMethods.length"
                            class="open-point-filter-img"
                            src="/images/map-search/arrow.svg"
                          />
                          <div v-else class="count-filer-points">
                            {{ pointsPaymentMethods.length }}
                          </div>
                        </div>
                      </div>
                      <div v-show-slide="compMobBay" class="more-filter-body">
                        <div class="more-filter-body-title">
                          Выберите один или несколько
                        </div>
                        <div class="more-filter-body-point-wrapper">
                          <div
                            v-for="(point, index) in paymentMethods"
                            :key="index"
                            class="more-filter-body-point"
                            @click="checkedPaymentMethods(point.id)"
                          >
                            <div
                              class="checkbox-box"
                              :class="{
                                'checkbox-box--checked': pointsPaymentMethods.includes(
                                  point.id
                                )
                              }"
                            ></div>
                            <div class="more-filter-body-point-name">
                              {{ point.name }}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      class="more-filter"
                      :class="{ 'mob-active-additional': isMobMaterial }"
                    >
                      <div
                        class="more-filter-header"
                        @click="mobToggleAdditional('material')"
                      >
                        <div class="more-filter-title">Материал дома</div>
                        <div class="more-filter-change">
                          <img
                            v-if="!pointsMaterial.length"
                            class="open-point-filter-img"
                            src="/images/map-search/arrow.svg"
                          />
                          <div v-else class="count-filer-points">
                            {{ pointsMaterial.length }}
                          </div>
                        </div>
                      </div>
                      <div
                        v-show-slide="compMobDMaterial"
                        class="more-filter-body"
                      >
                        <div class="more-filter-body-title">
                          Выберите один или несколько
                        </div>
                        <div class="more-filter-body-point-wrapper">
                          <div
                            v-for="(point, index) in houseMaterials"
                            :key="index"
                            class="more-filter-body-point"
                            @click="checkedMaterial(point.id)"
                          >
                            <div
                              class="checkbox-box"
                              :class="{
                                'checkbox-box--checked': pointsMaterial.includes(
                                  point.id
                                )
                              }"
                            ></div>
                            <div class="more-filter-body-point-name">
                              {{ point.name }}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      class="more-filter"
                      :class="{ 'mob-active-additional': isMobDecoration }"
                    >
                      <div
                        class="more-filter-header"
                        @click="mobToggleAdditional('decor')"
                      >
                        <div class="more-filter-title">Отделка</div>
                        <div class="more-filter-change">
                          <img
                            v-if="!pointsDecoration.length"
                            class="open-point-filter-img"
                            src="/images/map-search/arrow.svg"
                          />
                          <div v-else class="count-filer-points">
                            {{ pointsDecoration.length }}
                          </div>
                        </div>
                      </div>
                      <div
                        v-show-slide="compMobDecoration"
                        class="more-filter-body"
                      >
                        <div class="more-filter-body-title">
                          Выберите один или несколько
                        </div>
                        <div class="more-filter-body-point-wrapper">
                          <div
                            v-for="(point, index) in decorationTypes"
                            :key="index"
                            class="more-filter-body-point"
                            @click="checkedDecoration(point.key)"
                          >
                            <div
                              class="checkbox-box"
                              :class="{
                                'checkbox-box--checked': pointsDecoration.includes(
                                  point.key
                                )
                              }"
                            ></div>
                            <div class="more-filter-body-point-name">
                              {{ point.value }}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      class="more-filter"
                      :class="{ 'mob-active-additional': isMobInfrastructure }"
                    >
                      <div
                        class="more-filter-header"
                        @click="mobToggleAdditional('infra')"
                      >
                        <div class="more-filter-title">Инфраструктура</div>
                        <div class="more-filter-change">
                          <img
                            v-if="!pointsInfrastructures.length"
                            class="open-point-filter-img"
                            src="/images/map-search/arrow.svg"
                          />
                          <div v-else class="count-filer-points">
                            {{ pointsInfrastructures.length }}
                          </div>
                        </div>
                      </div>
                      <div
                        v-show-slide="compMobInfrastructure"
                        class="more-filter-body"
                      >
                        <div class="more-filter-body-title">
                          Выберите один или несколько
                        </div>
                        <div class="more-filter-body-point-wrapper">
                          <div
                            v-for="(point, index) in infrastructures"
                            :key="index"
                            class="more-filter-body-point"
                            @click="checkedInfrastructures(point.id)"
                          >
                            <div
                              class="checkbox-box"
                              :class="{
                                'checkbox-box--checked': pointsInfrastructures.includes(
                                  point.id
                                )
                              }"
                            ></div>
                            <div class="more-filter-body-point-name">
                              {{ point.name }}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      class="more-filter"
                      :class="{ 'mob-active-additional': isMobParking }"
                    >
                      <div
                        class="more-filter-header"
                        @click="mobToggleAdditional('parking')"
                      >
                        <div class="more-filter-title">Тип парковки</div>
                        <div class="more-filter-change">
                          <img
                            v-if="!pointsParking.length"
                            class="open-point-filter-img"
                            src="/images/map-search/arrow.svg"
                          />
                          <div v-else class="count-filer-points">
                            {{ pointsParking.length }}
                          </div>
                        </div>
                      </div>
                      <div
                        v-show-slide="compMobParking"
                        class="more-filter-body"
                      >
                        <div class="more-filter-body-title">
                          Выберите один или несколько
                        </div>
                        <div class="more-filter-body-point-wrapper">
                          <div
                            v-for="(point, index) in parkingType"
                            :key="index"
                            class="more-filter-body-point"
                            @click="checkedParking(point.key)"
                          >
                            <div
                              class="checkbox-box"
                              :class="{
                                'checkbox-box--checked': pointsParking.includes(
                                  point.key
                                )
                              }"
                            ></div>
                            <div class="more-filter-body-point-name">
                              {{ point.value }}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        v-if="!isOpenAllFilters && residentials.length"
        class="slide-filtred-count"
      >
        <span>Показано {{ filtredRC.length }}</span>
        из {{ residentials.length }} объектов
      </div>
    </div>
    <div class="mob-count-rc">
      <ButtonRC
        :size="getFilterRc.length ? 'm' : 'xl'"
        :value="getFilterRc.length ? 'main' : ''"
        :action="statusBtn"
        @click="showRcOnMap(getFilterRc.length)"
      >
        <span v-if="statusBtn !== 'loading' && getFilterRc.length"
          >Показать
          <span class="bold-text">{{ getFilterRc.length }}</span> объектов</span
        >
        <div
          v-else-if="statusBtn !== 'loading' && !getFilterRc.length"
          class="static-btn-text"
        >
          <div class="static-btn-text__title">Не найдено подходящих ЖК</div>
          <div class="static-btn-text__pretext">
            Попробуйте изменить параметры поиска
          </div>
        </div>
      </ButtonRC>
    </div>
  </div>
  <!-- </div> -->
</template>

<script>
import { setTimeout } from 'timers'
import { createNamespacedHelpers } from 'vuex'
// eslint-disable-next-line no-unused-vars
import { async } from 'q'
// import PlaceholderLayout from './placeholderLayout'
import InputText from '@/components/common-ui/InputText'
import ButtonRC from '@/components/common-ui/ButtonRC'
const {
  mapState,
  mapGetters,
  // mapActions,
  mapMutations
} = createNamespacedHelpers('mapSearch')

export default {
  data() {
    return {
      // allFiltersOpen: false,
      roomsFilterOpen: true,
      priceFilterOpen: true,
      moreFilterOpen: false,
      // accordeonClass: false,
      accordeonClassMore: false,
      activeRooms: [],
      // staticMinSum: 800000,
      // staticMaxSum: 3000000,
      minSum: 1000000,
      maxSum: 8000000,
      // statusBtn: "loading1",
      filterNumber: 1,
      fakeListHeader: [
        'Срок сдачи',
        'Способы покупки',
        'Материал дома',
        'Отделка',
        'Инфраструктура',
        'Тип парковки'
      ],
      fakeListPoints: [
        'Панель',
        'Кирпич',
        'Газобетон',
        'Монолит',
        'Монолит-кирпич'
      ],
      pointsDate: [],
      pointsPaymentMethods: [],
      pointsMaterial: [],
      pointsDecoration: [],
      pointsInfrastructures: [],
      pointsParking: [],
      screenWidth: null,

      isMobDate: false,
      isMobBay: false,
      isMobMaterial: false,
      isMobDecoration: false,
      isMobInfrastructure: false,
      isMobParking: false,
      isShowBtn: false
    }
  },
  computed: {
    ...mapState({
      residentials: (state) => state.residentials,
      currentResidentialId: (state) => state.currentResidentialId,
      roomsFilter: (state) => state.roomsFilter,
      activeFilterRooms: (state) => state.activeFilterRooms,
      completionYears: (state) => state.completionYears,
      decorationTypes: (state) => state.decorationTypes,
      houseMaterials: (state) => state.houseMaterials,
      infrastructures: (state) => state.infrastructures,
      paymentMethods: (state) => state.paymentMethods,
      parkingType: (state) => state.parkingType,
      allRcMinPrice: (state) => state.allRcMinPrice,
      allRcMaxPrice: (state) => state.allRcMaxPrice,
      filtredRC: (state) => state.filtredRC,
      isOpenAllFilters: (state) => state.isOpenAllFilters,
      isOpenSearch: (state) => state.isOpenSearch,
      accordeonClassFilters: (state) => state.accordeonClassFilters,
      isIpotekaPrice: (state) => state.isIpotekaPrice,
      maxPriceFilter: (state) => state.maxPriceFilter,
      nameSearch: (state) => state.nameSearch
    }),
    ...mapGetters(['getCurrentResidential', 'getFilterRc']),
    isOpenAllFiltersWith() {
      if (this.screenWidth <= 500) {
        return true
      } else return this.isOpenAllFilters
    },
    statusBtn() {
      if (!this.getFilterRc.length) return 'disabled'
      else return 'static'
    },
    rangeSum: {
      get() {
        const rangeSum = [this.minSum, this.maxSum]
        return rangeSum
      },
      set(value) {
        this.minSum = value[0]
        this.maxSum = value[1]
      }
    },
    togglePrice() {
      return (
        this.minSum === this.allRcMinPrice && this.maxSum === this.allRcMaxPrice
      )
    },
    toggleAdditionally() {
      return (
        this.pointsDate.length ||
        this.pointsPaymentMethods.length ||
        this.pointsMaterial.length ||
        this.pointsDecoration.length ||
        this.pointsInfrastructures.length ||
        this.pointsParking.length
      )
    },
    defaultValueLeft() {
      return this.minSum === this.allRcMinPrice
    },
    defaultValueRight() {
      return this.maxSum === this.allRcMaxPrice
    },
    anyFilterActive() {
      return (
        this.minSum !== this.allRcMinPrice ||
        this.maxSum !== this.allRcMaxPrice ||
        this.pointsDate.length ||
        this.pointsPaymentMethods.length ||
        this.pointsMaterial.length ||
        this.pointsDecoration.length ||
        this.pointsInfrastructures.length ||
        this.pointsParking.length
      )
    },
    countFilters() {
      let count = 0
      if (this.activeRooms.length) count++
      if (
        this.minSum !== this.allRcMinPrice ||
        this.maxSum !== this.allRcMaxPrice
      )
        count++
      if (this.toggleAdditionally) count++
      this.$emit('count-filters', count)
      return count
    },
    compMobDate() {
      return this.screenWidth > 500 ? true : this.isMobDate
    },
    compMobBay() {
      return this.screenWidth > 500 ? true : this.isMobBay
    },
    compMobDMaterial() {
      return this.screenWidth > 500 ? true : this.isMobMaterial
    },
    compMobDecoration() {
      return this.screenWidth > 500 ? true : this.isMobDecoration
    },
    compMobInfrastructure() {
      return this.screenWidth > 500 ? true : this.isMobInfrastructure
    },
    compMobParking() {
      return this.screenWidth > 500 ? true : this.isMobParking
    }
  },
  methods: {
    ...mapMutations([
      'setActiveFilterRooms',
      'setMinPriceFilter',
      'setMaxPriceFilter',
      'setCheckedDate',
      'setCheckedPaymentMethods',
      'setCheckedMaterials',
      'setCheckedDecoration',
      'setCheckedInfrastructures',
      'setСheckedParking',
      'setIsOpenSearch',
      'setIsOpenAllFilters',
      'setAccordeonClassFilters',
      'setNameSearch',
      'setActualRangePriceByRooms'
    ]),
    toggleAllFilters() {
      this.isShowBtn = false

      // сброс поиска по названию
      if (!this.isOpenAllFilters && this.nameSearch) {
        this.$emit('show-rc', 10)
        this.$emit('drop-name')
      }

      if (!this.isOpenAllFiltersWith) {
        document.querySelector('.map-search-wrapper').scrollTop = 0
        this.setIsOpenAllFilters(!this.isOpenAllFiltersWith)
        this.setNameSearch('')
        setTimeout(() => {
          this.setAccordeonClassFilters(true)
        }, 250)
        this.setIsOpenSearch(false)
      } else {
        this.setAccordeonClassFilters(false)
        this.setIsOpenAllFilters(!this.isOpenAllFiltersWith)
      }
    },
    toggleRoomsFilter() {
      if (this.activeRooms.length) {
        return
      }
      this.roomsFilterOpen = !this.roomsFilterOpen
    },
    togglePriceFilter() {
      if (!this.togglePrice) {
        return
      }
      this.priceFilterOpen = !this.priceFilterOpen
    },
    toggleMoreFilter() {
      if (this.toggleAdditionally) {
        return
      }

      // this.moreFilterOpen = !this.moreFilterOpen;
      if (!this.moreFilterOpen) {
        this.moreFilterOpen = !this.moreFilterOpen
        setTimeout(() => {
          this.accordeonClassMore = true
        }, 250)
      } else {
        this.accordeonClassMore = false
        this.moreFilterOpen = !this.moreFilterOpen
      }
    },
    chooseRooms(index) {
      this.isShowBtn = true
      this.dropPrice()
      // удаление из массива кнопки все, если она уже была нажата(нажатие на нее) и удаление всех остальных если впервые нажата
      if (index === -1) {
        this.activeRooms = []
        this.filterNumber = 1
        this.setActiveFilterRooms(this.activeRooms)

        this.setActualRangePriceByRooms()
        setTimeout(() => this.dropPrice(), 200)
      } else {
        // удаление кнопки если нажата
        if (this.activeRooms.includes(index[0])) {
          const indexRoom = this.activeRooms.indexOf(index[0])
          const lengthRooms = index.length
          this.activeRooms.splice(indexRoom, lengthRooms)
          this.filterNumber = 1
          this.setActiveFilterRooms(this.activeRooms)

          this.setActualRangePriceByRooms()

          setTimeout(() => this.dropPrice(), 200)
          return
        }
        // добавление копки
        this.activeRooms.push(...index)
        this.filterNumber = 1
        this.setActiveFilterRooms(this.activeRooms)

        this.setActualRangePriceByRooms()

        setTimeout(() => this.dropPrice(), 200)
      }
    },
    dropActiveRooms() {
      this.filterNumber = 1
      this.activeRooms = []
      this.setActiveFilterRooms(this.activeRooms)
    },
    handlerInputMinPrice(value) {
      // this.strMinSum = String(value).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 ');

      // value = value.replace(/[^0-9]/gim,'')
      // value = value.slice(0, 8);
      // this.strMinSum = Number(value).toLocaleString('ru')
      // console.log('this.strMinSum: ', this.strMinSum);

      // let numberValue = Number(value.replace(/[^0-9]/gim,''))
      // console.log('numberValue: ', numberValue);

      if (this.allRcMinPrice > value || this.allRcMaxPrice < value) return
      // this.minSum = numberValue
      this.minSum = value
      this.setMinPriceFilter(value)
      this.filterNumber = 2
      this.isShowBtn = true
    },
    handlerInputMaxPrice(value) {
      // value = value.slice(0, 8);

      if (this.allRcMinPrice > value || this.allRcMaxPrice < value) return
      this.maxSum = value
      this.setMaxPriceFilter(value)
      this.filterNumber = 2
      this.isShowBtn = true
    },
    dropPrice() {
      this.filterNumber = 1
      this.minSum = this.allRcMinPrice
      this.setMinPriceFilter(this.allRcMinPrice)
      this.maxSum = this.allRcMaxPrice
      this.setMaxPriceFilter(this.allRcMaxPrice)
    },
    setPriceFilter() {
      this.setMinPriceFilter(this.minSum)
      this.setMaxPriceFilter(this.maxSum)
      this.filterNumber = 2
      this.isShowBtn = true
      console.log('setPriceFilter')
    },
    checkedDate(point) {
      // if(point === "Сдан") point = -1
      if (this.pointsDate.includes(point)) {
        const pointIndex = this.pointsDate.indexOf(point)
        this.pointsDate.splice(pointIndex, 1)
        this.setCheckedDate(this.pointsDate)
      } else {
        this.pointsDate.push(point)
        this.setCheckedDate(this.pointsDate)
      }
      this.isShowBtn = true
      this.filterNumber = 3
    },
    checkedPaymentMethods(id) {
      if (this.pointsPaymentMethods.includes(id)) {
        const idIndex = this.pointsPaymentMethods.indexOf(id)
        this.pointsPaymentMethods.splice(idIndex, 1)
        this.setCheckedPaymentMethods(this.pointsPaymentMethods)
      } else {
        this.pointsPaymentMethods.push(id)
        this.setCheckedPaymentMethods(this.pointsPaymentMethods)
      }
      this.isShowBtn = true
      this.filterNumber = 3
    },
    checkedMaterial(id) {
      if (this.pointsMaterial.includes(id)) {
        const idIndex = this.pointsMaterial.indexOf(id)
        this.pointsMaterial.splice(idIndex, 1)
        this.setCheckedMaterials(this.pointsMaterial)
      } else {
        this.pointsMaterial.push(id)
        this.setCheckedMaterials(this.pointsMaterial)
      }
      this.isShowBtn = true
      this.filterNumber = 3
    },
    checkedDecoration(id) {
      if (this.pointsDecoration.includes(id)) {
        const idIndex = this.pointsDecoration.indexOf(id)
        this.pointsDecoration.splice(idIndex, 1)
        this.setCheckedDecoration(this.pointsDecoration)
      } else {
        this.pointsDecoration.push(id)
        this.setCheckedDecoration(this.pointsDecoration)
      }
      this.isShowBtn = true
      this.filterNumber = 3
    },
    checkedInfrastructures(id) {
      if (this.pointsInfrastructures.includes(id)) {
        const idIndex = this.pointsInfrastructures.indexOf(id)
        this.pointsInfrastructures.splice(idIndex, 1)
        this.setCheckedInfrastructures(this.pointsInfrastructures)
      } else {
        this.pointsInfrastructures.push(id)
        this.setCheckedInfrastructures(this.pointsInfrastructures)
      }
      this.isShowBtn = true
      this.filterNumber = 3
    },
    checkedParking(id) {
      if (this.pointsParking.includes(id)) {
        const idIndex = this.pointsParking.indexOf(id)
        this.pointsParking.splice(idIndex, 1)
        this.setСheckedParking(this.pointsParking)
      } else {
        this.pointsParking.push(id)
        this.setСheckedParking(this.pointsParking)
      }
      this.isShowBtn = true
      this.filterNumber = 3
    },
    dropAdditionallyFilter() {
      // FIXME
      // ;(this.filterNumber = 3),
      //   (this.isShowBtn = true),
      //   (this.pointsDate = []),
      //   (this.pointsPaymentMethods = []),
      //   (this.pointsMaterial = []),
      //   (this.pointsDecoration = []),
      //   (this.pointsInfrastructures = []),
      //   (this.pointsParking = []),
      //   this.setCheckedDate([]),
      //   this.setCheckedPaymentMethods([]),
      //   this.setCheckedMaterials([]),
      //   this.setCheckedDecoration([]),
      //   this.setCheckedInfrastructures([]),
      //   this.setСheckedParking([])
    },
    showRcOnMap(length) {
      this.$emit('show-rc', length)
      if (length) {
        this.toggleAllFilters()
        this.setIsOpenSearch(false)
        this.setNameSearch('')
        this.$emit('mob-title')
        if (this.screenWidth < 500)
          document.querySelector('.all-layouts-wrapper').scrollTop = 0
      }
    },
    onResize() {
      this.screenWidth = window.innerWidth
    },
    mobToggleAdditional(type) {
      if (type === 'date') {
        this.isMobDate = !this.isMobDate
      } else if (type === 'bay') {
        this.isMobBay = !this.isMobBay
      } else if (type === 'material') {
        this.isMobMaterial = !this.isMobMaterial
      } else if (type === 'decor') {
        this.isMobDecoration = !this.isMobDecoration
      } else if (type === 'infra') {
        this.isMobInfrastructure = !this.isMobInfrastructure
      } else if (type === 'parking') {
        this.isMobParking = !this.isMobParking
      }
    },
    dropStartFilter() {
      // await this.allRcMinPrice
      // await this.filtredRC.length
      this.dropPrice()
      this.$emit('show-rc', 1)
    }
  },
  updated() {},
  created() {
    // eslint-disable-next-line nuxt/no-globals-in-created
    window.addEventListener('resize', this.onResize)
    this.onResize()
  },

  mounted() {
    // this.dropStartFilter();
    setTimeout(() => {
      if (!this.isIpotekaPrice) {
        this.dropPrice()
      } else {
        this.activeRooms = this.activeFilterRooms
        if (this.maxPriceFilter >= this.allRcMaxPrice) {
          this.maxSum = this.allRcMaxPrice
        } else {
          this.maxSum = this.maxPriceFilter
        }
      }
      this.$emit('show-rc', 1)
    }, 6000)
  },
  components: {
    ButtonRC,
    InputText
    // PlaceholderLayout
  }
}
</script>

<style lang="scss">
.count-all-filters {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #71a24e;
  // opacity: 0.5;
  font-weight: 500;
  font-size: 15px;
  line-height: normal;
  text-align: center;
  letter-spacing: 0.2px;
  color: #ffffff;
  border-radius: 50%;
}
.filter-search-box {
  background: #f5f6f9;
  // width: 360px;
  // height: 100%;
}
.filter-global-wrapper {
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.1px;
  color: #8b8a91;
  padding: 10px;
}

.filter-title-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #ffffff;
  box-shadow: 0px 5px 20px rgba(66, 72, 77, 0.15);
  border-radius: 8px;
  padding: 5px 20px;
  padding-right: 10px;
  margin: 10px 0;
  .filter-main-title {
    font-size: 16px;
    color: #5d6369;
    .open-filter {
      font-size: 14px;
      color: #9ea2a5;
      letter-spacing: 0.2px;
      font-weight: 400;
    }
  }
  .filter-img-wrapper {
    height: 100%;
    display: flex;
    align-items: center;
    // width: 40px;
    // height: 40px;
    opacity: 0.5;
    cursor: pointer;
    user-select: none;
  }
}
.filter-box-wrapper {
  margin-bottom: 10px;
  position: relative;
  .search-result {
    position: absolute;
    left: 98%;
    top: 0;
    display: none;
    .button-rc {
      width: max-content;
      min-width: auto;
      padding: 5px 25px;
      padding-left: 30px;
      border-radius: 8px;
      min-width: 160px;
    }
  }
}
.filter-box {
  // padding: 15px 20px 20px;
  background: #fdfdfd;
  box-shadow: 0px 10px 30px rgba(89, 88, 92, 0.07);
  border-radius: 4px;
  margin-bottom: 10px;
  position: relative;
  .filter-title {
    min-height: 70px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5px 20px;
    padding-right: 10px;
    font-size: 16px;
    letter-spacing: 0.3px;
    color: #626c7a;
    .filter-close {
      display: flex;
      height: 100%;
      align-items: center;
      // width: 40px;
      // height: 40px;
      opacity: 0.5;
      cursor: pointer;
      user-select: none;
      .pretext-drop {
        color: #afb4bb;
        font-weight: 500;
        font-size: 12px;
        text-align: center;
        letter-spacing: 0.1px;
      }
      img {
        transition: 0.2s;
        // transform: rotate(180deg);
      }
    }
  }
  .filter-content {
    .filter-content-box {
      padding: 25px 0px 25px;
      margin: 0 20px;
      // margin-top: 5px;
      border-top: 1px solid #f4f7f8;
    }
  }
}
.room-buttons-wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .button-rc {
    margin-bottom: 10px;
  }
}
.room-plus-img {
  width: 14px;
  height: 14px;
  opacity: 0.3;

  // filter: invert(100%);
}
.rooms-plus {
  font-weight: 200;
  font-size: 30px;
  /* opacity: 0.5; */
  color: #cfcfd1;
  &:active {
    color: #ceecb9;
  }
}
.arrowDurationUp {
  transform: rotate(180deg);
}

//filter price
.price-filter-wrapper {
  width: 100%;
  display: flex;
  justify-content: space-between;
  position: relative;
  margin-bottom: 25px;
  &::after {
    content: '';
    width: 12px;
    border-top: 1px solid #d6e6eb;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -6px;
  }
  .price-input-box {
    width: 135px;
  }
}
.all-filter-react {
  overflow: visible !important;
}
.static-btn-text {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .static-btn-text__title {
    font-size: 17px;
    line-height: 24px;
    text-align: center;
    letter-spacing: 0.2px;
  }
  .static-btn-text__pretext {
    font-weight: normal;
    font-size: 12px;
    line-height: 16px;
    text-align: center;
    color: #eceeee;
  }
}
.search-result-show {
  display: block !important;
}
.filter-box-wrapper--more .filter-content-box {
  margin: 0 !important;
  padding: 0px 0px 15px !important;
}
.more-filter-wrapper {
  position: relative;
  .more-filter {
    border-bottom: 1px solid #f4f7f8;
    // position: relative;
    .more-filter-header {
      min-height: 50px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      padding: 5px 14px 5px 30px;
      .more-filter-change {
        display: flex;
        align-items: center;
        justify-content: center;
        .count-filer-points {
          display: flex;
          justify-content: center;
          align-items: center;
          background: #b6cfa5;
          font-weight: 500;
          font-size: 15px;
          line-height: normal;
          text-align: center;
          letter-spacing: 0.2px;
          color: #ffffff;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          margin-right: 10px;
        }
      }
    }
    .more-filter-body {
      position: absolute;
      left: 100%;
      top: 0px;
      background: #fafafb;
      box-shadow: 10px 5px 10px rgba(90, 88, 99, 0.1);
      border-radius: 0px 8px 8px 0px;
      min-width: 240px;
      visibility: hidden;
      padding-bottom: 10px;
      // display: none;

      .more-filter-body-title {
        color: #bdc1c8;
        font-weight: 400;
        font-size: 12px;
        line-height: 16px;
        letter-spacing: 0.2px;
        padding: 18px 0px;
        margin: 0 20px 15px;
        border-bottom: 1px solid #f2f5f6;
      }
      .more-filter-body-point-wrapper {
        padding-bottom: 10px;

        max-height: 300px;
        overflow-y: scroll;
        scrollbar-width: none; /* Firefox */
        -ms-overflow-style: none; /* IE 10+ */
        &::-webkit-scrollbar {
          width: 0px;
        }
        .more-filter-body-point {
          display: flex;
          cursor: pointer;
          padding: 13px 20px 12px 30px;
          height: 46px;
          &:hover {
            color: #5a5863;
          }
        }
      }
    }
  }
}
.open-point-filter-img {
  opacity: 0.2;
  transform: rotate(-90deg);
  transition: 0.2s;
}

.more-filter {
  &:hover .more-filter-body {
    visibility: visible;
    // display: block;
  }
  &:hover .open-point-filter-img {
    transform: rotate(90deg);
  }
  &:hover .more-filter-header {
    background: #fafafb;
  }
  &:nth-child(5):hover .more-filter-body,
  &:last-child:hover .more-filter-body {
    bottom: 0;
    top: unset;
  }
}
.checkbox-box {
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #e3e6e9;
  box-shadow: inset 0px 0px 4px rgba(66, 72, 77, 0.25);
  border-radius: 30px;
  margin-right: 10px;
}
.checkbox-box--checked {
  background: url('/images/map-search/checked.svg') center no-repeat, #9cb76e;
}
.slide-filtred-count {
  color: #a7a7ae;
  text-align: center;
  padding: 5px;
  padding-top: 7px;
  span {
    color: #696771;
  }
}
.fake-filter {
  position: fixed;
  width: 360px;
  background: #f5f6f9;
  z-index: 8;
  padding-bottom: 0px;
}
.filter-title-box--natural {
  box-shadow: none;
}
.mob-count-rc {
  display: none;
}

@media (max-width: 500px) {
  .fake-filter {
    display: none;
  }
  .filter-title-box {
    display: none;
  }
  .filter-search-box {
    height: 100vh;
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 30px 0;
  }
  .slide-filtred-count {
    display: none;
  }
  .search-result-show {
    display: none !important;
  }
  .test-fil {
    position: fixed;
    bottom: 20px;
    left: 50%;
    width: 50px;
    height: 50px;
  }
  .mob-count-rc {
    display: flex;
    justify-content: center;
    // margin-bottom: 30px;
    .button-rc {
      font-size: 16px;
      line-height: normal;
      text-align: center;
      letter-spacing: 0.1px;
      .bold-text {
        font-weight: 500;
      }
    }
  }
  .filter-global-wrapper {
    // margin-top: 30px;
  }

  .more-filter-wrapper {
    position: relative;
    .more-filter {
      border-bottom: 1px solid #f4f7f8;
      // position: relative;
      .more-filter-header {
        min-height: 50px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        padding: 5px 10px 5px 30px;
        .more-filter-change {
          display: flex;
          align-items: center;
          justify-content: center;
          .count-filer-points {
            display: flex;
            justify-content: center;
            align-items: center;
            background: #b6cfa5;
            font-weight: 500;
            font-size: 15px;
            line-height: normal;
            text-align: center;
            letter-spacing: 0.2px;
            color: #ffffff;
            width: 24px;
            height: 24px;
            border-radius: 50%;
            margin-right: 10px;
          }
        }
      }
      .more-filter-body {
        position: static;
        // left: 100%;
        // top: 8px;
        background: #fafafb;
        box-shadow: none;
        border-radius: 0px 8px 8px 0px;
        min-width: 240px;
        visibility: visible;
        // display: none;

        .more-filter-body-title {
          color: #bdc1c8;
          font-weight: 500;
          font-size: 12px;
          line-height: 16px;
          letter-spacing: 0.1px;
          padding: 18px 0px;
          margin: 0 20px;
          border-bottom: 1px solid #f2f5f6;
        }
        .more-filter-body-point-wrapper {
          padding-bottom: 10px;

          max-height: unset;
          overflow-y: scroll;
          scrollbar-width: none; /* Firefox */
          -ms-overflow-style: none; /* IE 10+ */
          &::-webkit-scrollbar {
            width: 0px;
          }
          .more-filter-body-point {
            display: flex;
            cursor: pointer;
            padding: 10px 20px 12px 30px;
            &:hover {
              color: #5a5863;
            }
          }
        }
      }
    }
  }
  .open-point-filter-img {
    opacity: 0.2;
    transform: none;
    transition: 0.2s;
    cursor: pointer;
  }
  .more-filter {
    &:hover .more-filter-body {
      visibility: visible;
      // display: block;
    }
    &:hover .open-point-filter-img {
      transform: none;
    }
    &:hover .more-filter-header {
      background: inherit;
    }
    &:nth-child(5):hover .more-filter-body,
    &:last-child:hover .more-filter-body {
      bottom: 0;
      top: unset;
    }
  }
  .mob-active-additional {
    .more-filter-header {
      background: #fafafb !important;
    }
    .open-point-filter-img {
      transform: rotate(180deg) !important;
    }
  }
  .button-rc.size-xl {
    min-width: 100%;
  }
}
@media (max-width: 360px) {
  .button-rc.size-s {
    min-width: 80px;
  }
}
</style>
