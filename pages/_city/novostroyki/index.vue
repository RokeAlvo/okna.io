<template>
  <div class="wrapper-search-on-map">
    <Menu></Menu>
    <div
      id="map-search-wrapper"
      class="map-search-wrapper"
      @scroll="preloadLayouts"
    >
      <div class="mobile-header">
        <div class="mob-main-head">
          <img
            class="mob-menu-open"
            src="/images/map-search/burger.svg"
            @click="openMenu"
          />
          <img src="/images/map-search/logo-mob.svg" />

          <div class="mob-name-search-comp">
            <InputSearch
              @show-by-name="showFiltredByName"
              @apply-filter="showFiltredRc"
              @open-mob-search="openMobSearch"
              @close-name-search="closeMobSearch"
            >
            </InputSearch>
          </div>
        </div>
        <div
          class="mob-choose-title"
          :class="{ 'mob-title--hidden': isMobTitle }"
        >
          <div
            class="mob-choose"
            :class="{ 'mob-choose--active': viewActive === 1 }"
            @click="chooseView(1)"
          >
            Список
          </div>
          <div
            class="mob-choose"
            :class="{ 'mob-choose--active': viewActive === 2 }"
            @click="chooseView(2)"
          >
            Карта
          </div>
        </div>
      </div>

      <div class="tablet-head-fake"></div>

      <div class="open-filter-btn" @click="openMobFilters">
        <img src="/images/map-search/filters-white.svg" />
        <div
          v-if="!countFilters || !residentials.length"
          class="mob-filter-title"
        >
          Фильтры
        </div>
        <div v-else class="mob-filters-count">{{ countFilters }}</div>
      </div>

      <div
        class="mob-filters-wrapper"
        :class="{ 'mob-filter-open': isOpenMobFilers }"
      >
        <filterRC
          @show-rc="showFiltredRc"
          @mob-title="mobTitleOpen"
          @count-filters="handlerCountFilters"
        ></filterRC>
      </div>
      <div
        class="search-wrapper"
        :class="{
          'top-scroll': isMobTitle,
          'changed-view-list': viewActive === 2
        }"
      >
        <!-- <div> -->
        <div class="pc-filters-wrapper">
          <filterRC
            @show-rc="showFiltredRc"
            @drop-name="dropChildSearchName"
          ></filterRC>
        </div>
        <div
          id="all-layouts-wrapper"
          class="all-layouts-wrapper"
          @scroll="preloadLayouts"
        >
          <div v-if="residentials.length" class="mob-filtred-count">
            <span>Показано {{ filtredRC.length }}</span>
            из {{ residentials.length }} объектов
          </div>
          <Layouts
            :lazy-residentials="lazyResidentials"
            @residential-data="toggleMarkerPopup($event)"
          ></Layouts>
        </div>
      </div>
      <div
        class="map-wrapper"
        :class="{
          'top-scroll': isMobTitle,
          'changed-view-map': viewActive === 2,
          'changed-z-map': isSetZIndex
        }"
      >
        <div class="map-box">
          <div class="zoom-control-wrapper">
            <div class="zoom-control zoom-plus" @click="zoom(+1)">
              <img src="/images/map-search/plus-gray.svg" />
            </div>
            <div class="zoom-control zoom-minus" @click="zoom(-1)">
              <img src="/images/map-search/minus-gray.svg" />
            </div>
          </div>
          <div
            class="name-search-comp"
            :class="{ 'name-search-comp--open-card': isOpenCard }"
          >
            <InputSearch
              ref="search"
              @show-by-name="showFiltredByName"
              @apply-filter="showFiltredRc"
              @open-mob-search="openMobSearch"
              @close-name-search="closeMobSearch"
            >
            </InputSearch>
          </div>
          <div id="map" class="maps" style="width:100%; height:100%"></div>
        </div>
      </div>

      <PopupLayout
        v-if="1"
        ref="popup"
        :price-min="getCurrentResidential ? getCurrentResidential.price_min : 0"
        :img="getCurrentResidential ? getCurrentResidential.thumbnail : ''"
        :name="getCurrentResidential ? getCurrentResidential.title : ''"
        :developer="
          getCurrentResidential ? getCurrentResidential.developer.name : ''
        "
        :address="getCurrentResidential ? getCurrentResidential.address : ''"
        :material="getCurrentResidential ? getCurrentResidential.materials : ''"
        :date-min="
          getCurrentResidential
            ? getCurrentResidential.completion_deadline_min
            : {}
        "
        :date-max="
          getCurrentResidential
            ? getCurrentResidential.completion_deadline_max
            : {}
        "
        :ranges="
          getCurrentResidential
            ? getCurrentResidential.apartments_formatted
            : []
        "
        :coordinates="
          getCurrentResidential
            ? [getCurrentResidential.latitude, getCurrentResidential.longitude]
            : []
        "
        :link="getCurrentResidential ? getCurrentResidential.link : ''"
        :is-open-rc="isOpenRc"
        :is-re-open-rc="isReOpenRc"
        :view-active="viewActive"
        @close-popup="close"
      ></PopupLayout>

      <Loader v-if="!residentials.length"></Loader>
    </div>
    <!-- <NotFound></NotFound> -->
  </div>
</template>

<script>
// import { createNamespacedHelpers } from 'vuex'

import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
import InputSearch from '@/components/mapSearch/modules/inputSearch'
import Loader from '@/components/mapSearch/modules/Loader'
import PopupLayout from '@/components/mapSearch/modules/popupLayout'
import filterRC from '@/components/mapSearch/modules/filter'
import Layouts from '@/components/mapSearch/modules/layouts'
import Menu from '@/components/Header_Footer/Head'
// import InputText from '@/components/common-ui/InputText'
// import NotFound from '@/components/not-found/index.vue'

// const {
//   mapState,
//   mapGetters,
//   mapActions,
//   mapMutations
// } = createNamespacedHelpers('mapSearch')

const DG = require('2gis-maps')
export default {
  data() {
    return {
      dataRequest: null,
      map: null,
      markers: null,
      popups: null,
      popupMap: null,
      coordinates: null,
      switchOnZoom: 14,
      oldZoom: null,
      isOpenRc: false,
      isReOpenRc: false,
      countFunctionMarker: 0,
      lazyResidentials: 6,
      isMobTitle: false,
      isMobNameOpen: false,
      lastScrollTop: 0,
      isActiveView: false,
      viewActive: 2,
      isSetZIndex: false,
      isOpenMobFilers: false,
      countFilters: 0
    }
  },
  computed: {
    ...mapState('mapSearch', {
      residentials: (state) => state.residentials,
      currentResidentialId: (state) => state.currentResidentialId,
      filtredRC: (state) => state.filtredRC,
      filtredRcByName: (state) => state.filtredRcByName,
      isOpenAllFilters: (state) => state.isOpenAllFilters,
      activeFilterRooms: (state) => state.activeFilterRooms,
      maxPriceFilter: (state) => state.maxPriceFilter,
      isOpenCard: (state) => state.isOpenCard
    }),
    ...mapGetters('mapSearch', ['getCurrentResidential', 'getFilterRc'])
  },
  methods: {
    dropChildSearchName() {
      this.$refs.search.dropName()
    },
    closeMobSearch() {
      this.isMobNameOpen = false
      this.isMobTitle = false
    },
    openMobSearch() {
      this.isMobTitle = true
      this.isMobNameOpen = true
    },
    close() {
      this.isOpenRc = !this.isOpenRc
      this.map.closePopup()
    },
    preloadLayouts() {
      if (!this.isMobNameOpen) {
        // если открыт поиск по имени
        let scrolled = document.querySelector('#map-search-wrapper').scrollTop
        if (window.innerWidth < 500)
          scrolled = document.querySelector('#all-layouts-wrapper').scrollTop
        if (scrolled > this.lastScrollTop + 30) {
          this.isMobTitle = true
        } else if (scrolled < this.lastScrollTop - 60 || scrolled <= 150) {
          this.isMobTitle = false
        }
        this.lastScrollTop = scrolled
      }

      if (
        document.querySelector('.map-search-wrapper').scrollTop >
        document.documentElement.clientHeight
      ) {
        this.setAccordeonClassFilters(false)
        this.setIsOpenAllFilters(false)
      }

      if (!this.residentials.length) {
        return
      }
      const heightOfWindow =
        document.getElementById('map-search-wrapper').scrollTop +
        window.innerHeight
      const bottomOfWindow =
        heightOfWindow + 1000 >=
        document.getElementById('map-search-wrapper').scrollHeight
      if (bottomOfWindow) {
        this.lazyResidentials += 6
      }
    },
    preloadLayoutsNew() {
      // console.log('index root: ', index)
    },
    toggleMarkerPopup(data) {
      const index = data.index
      const marker = this.markers.getLayers()[index]
      const isOpen = marker._popup.isOpen()

      marker[isOpen ? 'closePopup' : 'openPopup']()
      if (!isOpen) {
        this.map.panTo(marker.getLatLng())

        this.setResidentialId(data.id)

        // добавление класса с задержкой для ожидания создания данных
        if (this.countFunctionMarker === 0) {
          setTimeout(() => (this.isOpenRc = true), 200)
        } else {
          this.isOpenRc = true
        }
        this.countFunctionMarker++
      }
      if (window.innerWidth < 500)
        // this.$refs.popup.setMarker()
        setTimeout(() => this.$refs.popup.setMarker(), 250)
    },
    setMiniMarker(data) {
      const priceMinFormatted = Number(data.price_min).toLocaleString('ru')

      return `<div class="marker-wrapper" data-id="${data.id}">
                    <div class="mini-marker-wrapper">
                      <div class="mini-marker"></div>
                    </div>
                    <div class="marker-info-wrapper">
                      <div class="marker-title">${data.title}</div>
                      <div class="marker-price">от ${priceMinFormatted} ₽</div>
                      <div class="marker-decor"></div>
                    </div>
                  </div>`
    },
    setZoomMarker(data) {
      const priceMinFormatted = Number(data.price_min).toLocaleString('ru')

      return `<div class="marker-wrapper-zoom" data-id="${data.id}">
                    <div class="marker-info-wrapper-zoom">
                      <div class="marker-title">${data.title}</div>
                      <div class="marker-price">от ${priceMinFormatted} ₽</div>
                      <div class="marker-decor"></div>
                    </div>
                  </div>`
    },
    setPopupMarker(data) {
      const priceMinFormatted = Number(data.price_min).toLocaleString('ru')

      return `<div class="marker-wrapper-zoom" data-id="${data.id}">
                    <div class="marker-info-wrapper-zoom popup-marker">
                      <div class="marker-title">${data.title}</div>
                      <div class="marker-price">от ${priceMinFormatted} ₽</div>
                      <div class="marker-decor"></div>
                    </div>
                  </div>`
    },
    onZoomStart(e) {
      this.oldZoom = this.map.getZoom()
    },
    onZoomEnd(e) {
      const { oldZoom } = this
      const newZoom = this.map.getZoom()

      const template =
        oldZoom > this.switchOnZoom && newZoom <= this.switchOnZoom
          ? this.setMiniMarker
          : oldZoom <= this.switchOnZoom && newZoom > this.switchOnZoom
          ? this.setZoomMarker
          : null
      if (template) {
        Object.values(this.markers._layers).forEach((marker, i) => {
          marker._icon.innerHTML = template(this.filtredRC[i])
        })
      }
    },

    zoom(change) {
      this.map.setZoom(this.map.getZoom() + change)
      console.log('this.map.getZoom(): ', this.map.getZoom())
    },
    setMarkers(rcs) {
      rcs.forEach((residential) => {
        const myDivIcon = DG.divIcon({
          iconSize: [30, 30],
          className: 'marker-custom',
          html: this.setMiniMarker(residential)
        })

        this.popupMap = DG.popup({
          className: 'test-name',
          closeButton: false,
          offset: DG.point(0, 1),
          setZoomMarker: false
        }).setContent(this.setPopupMarker(residential))

        this.coordinates = [residential.latitude, residential.longitude]
        DG.marker(this.coordinates, { icon: myDivIcon })
          .addTo(this.markers)
          .bindPopup(this.popupMap)
      })

      this.markers.addTo(this.map)

      this.map.fitBounds(this.markers.getBounds())

      this.markers.on('click', (event) => {
        // при наведении.mouseover, click на маркер
        if (this.isOpenAllFilters) {
          this.setAccordeonClassFilters(false)
          this.setIsOpenAllFilters(false)
        }
        this.setIsOpenCard(true)

        if (event.originalEvent.target.closest('[data-id]')) {
          const residentialId = Number(
            event.originalEvent.target.closest('[data-id]').dataset.id
          )
          this.setResidentialId(residentialId)

          // добавление класса с задержкой для ожидания создания данных
          if (this.countFunctionMarker === 0) {
            setTimeout(() => (this.isOpenRc = true), 200)
          } else {
            this.isOpenRc = true
          }
          this.countFunctionMarker++
        }

        if (window.innerWidth < 500)
          // для избежания ошибки отсутсвия маркера
          setTimeout(() => this.$refs.popup.setMarker(), 250)
      })

      if (this.filtredRC.length === 1) {
        this.map.setZoom(13)
      }
    },
    showFiltredByName() {
      this.markers.eachLayer((n) => this.markers.removeLayer(n))
      this.setMarkers(this.filtredRC)
      this.onZoomEnd()
    },
    showFiltredRc(length) {
      if (!length) return
      // this.markers.removeFrom(this.map);
      this.markers.eachLayer((n) => this.markers.removeLayer(n))
      this.filter()
      this.setMarkers(this.filtredRC)
      this.onZoomEnd()
      this.isOpenMobFilers = false
    },
    openMenu() {
      document.querySelector('.nav').classList.toggle('nav-z')
      document.querySelector('#nav-toggle').checked = !document.querySelector(
        '#nav-toggle'
      ).checked
    },
    chooseView(view) {
      this.viewActive = view
      if (view === 1) {
        setTimeout(() => (this.isSetZIndex = true), 500)
      } else this.isSetZIndex = false
    },
    openMobFilters() {
      this.setNameSearch('')
      this.isOpenMobFilers = true
    },
    mobTitleOpen() {
      this.isMobTitle = false
      console.log('this.isMobTitle: ', this.isMobTitle)
    },
    handlerCountFilters(count) {
      this.countFilters = count
    },
    fetchData() {
      this.dataRequest
        .then((response) => {
          this.filter() // для планировок экшен
          this.setMarkers(this.filtredRC)

          this.map.on('zoomstart', this.onZoomStart)
          this.map.on('zoomend', this.onZoomEnd)
        })
        .catch((error) => {
          console.log(error)
          setTimeout(() => {
            this.dataRequest = this.getAllData()
            this.fetchData()
          }, 5000)
        })
    },
    ...mapActions('mapSearch', ['getAllData', 'filter']),
    ...mapMutations('mapSearch', [
      'getSelectedResidential',
      'setResidentialId',
      'setIsOpenAllFilters',
      'setAccordeonClassFilters',
      'setNameSearch',
      'setIsOpenCard'
    ])
  },
  created() {
    this.dataRequest = this.getAllData()
    // console.log(this.activeFilterRooms);
    // console.log(this.maxPriceFilter);
    // console.log('created- ----');
  },
  updated() {
    // console.log('getCurrentResidential', this.getCurrentRe'', idential);
    // Выводим title и description
    // console.log(this.activeFilterRooms);
    // console.log(this.maxPriceFilter);
  },
  mounted() {
    console.log('вот эта   ', this.residentials.length)
    // console.log(this.maxPriceFilter);
    const _desc = 'Удобный поиск новостроек без комиссии'

    document.title = 'Удобный поиск новостроек без комиссии'
    document
      .querySelector('meta[name="description"]')
      .setAttribute('content', _desc)

    this.markers = DG.featureGroup()
    this.popups = DG.featureGroup()

    this.map = DG.map('map', {
      center: [54.98, 82.89],
      zoom: 9,
      minZoom: 7,
      zoomControl: false,
      fullscreenControl: false
    })

    // this.dataRequest.then(response => {
    //   this.filter()
    //   this.setMarkers(this.residentials)

    //   this.map.on("zoomstart", this.onZoomStart);
    //   this.map.on("zoomend", this.onZoomEnd);

    // })
    // .catch(error => {
    //   console.log(error);
    //   location.reload()
    // });

    this.fetchData()
  },
  components: {
    // InputText,
    filterRC,
    Layouts,
    PopupLayout,
    Loader,
    InputSearch,
    Menu
    // NotFound
  }
}
</script>

<style lang="scss">
.all-layouts-wrapper {
  flex-shrink: 1;
  height: 100%;
  background: #2b2e2f;
}
.leaflet-popup-content-wrapper {
  background: transparent;
  overflow: initial;

  max-height: 32px;
  min-width: 0px;
  min-height: 0px;
  width: 50px !important;
}
.leaflet-popup-content-wrapper:before {
  display: none;
}
.leaflet-map-pane .leaflet-popup-tip-container_svg {
  display: none;
}

.map-search-wrapper {
  height: 100%;
  display: flex;
  overflow-y: scroll;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE 10+ */
  &::-webkit-scrollbar {
    /* WebKit */
    width: 0px;
  }
}
.search-wrapper {
  position: relative;
  z-index: 2;
  width: 360px;
  background: #f5f6f9;
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: 0.2s;
}
.map-wrapper {
  // width: 100%;
  background: #cbd3ba;
  // position: sticky;
  // top: 0;

  position: fixed;
  top: 65px;
  left: 360px;
  bottom: 0;
  right: 0;
  transition: 0.2s;

  .map-box {
    width: 100%;
    height: 100%;
    position: relative;
  }
}
.marker-custom {
  &:hover {
    z-index: 9000 !important;
  }
}
.zoom-control-wrapper {
  position: absolute;
  z-index: 1000;
  right: 10px;
  top: 50%;
  margin-top: -50px;
  .zoom-control {
    user-select: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 46px;
    height: 46px;
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
.marker-wrapper-zoom {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  //  &:hover{
  //    z-index: 9999;
  // }
  &:hover .marker-decor {
    border-top: 8px solid #4a7176;
  }
  &:hover .marker-info-wrapper-zoom {
    // display: flex;
    background: #4a7176;
  }
  // &:hover .mini-marker-wrapper{
  //   opacity: 0;
  // }
}
.popup-marker {
  background: #4a7176;
  .marker-decor {
    border-top: 8px solid #4a7176;
  }
}
.marker-info-wrapper-zoom {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 100%;
  min-width: 160px;
  background: #68a500;
  box-shadow: 0px 16px 45px rgba(66, 72, 77, 0.2);
  border-radius: 4px;
  font-weight: 500;
  font-size: 14px;
  line-height: 19px;
  text-align: center;
  letter-spacing: 0.2px;
  margin-bottom: -8px;
  font-weight: normal;
  line-height: normal;
  font-size: 14px;
  color: #fdfdfd;
  letter-spacing: 0.2px;
  padding: 12px 18px 10px;
  transition: 0.2s;
}
.popup-marker {
  background: #4a7176;
}
.marker-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover .marker-decor {
    border-top: 8px solid #4a7176;
  }
  &:hover .marker-info-wrapper {
    display: flex;
    background: #4a7176;
  }
  &:hover .mini-marker-wrapper {
    opacity: 0;
  }
}
.mini-marker-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 30px;
  .mini-marker {
    width: 16px;
    height: 16px;
    background: #68a500;
    border: 1px solid #fdfdfd;
    box-shadow: 0px 4px 10px rgba(66, 72, 77, 0.15);
    border-radius: 50%;
  }
}
.marker-info-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 100%;
  min-width: 160px;
  background: #68a500;
  box-shadow: 0px 16px 45px rgba(66, 72, 77, 0.2);
  border-radius: 4px;
  font-weight: 500;
  font-size: 14px;
  line-height: 19px;
  text-align: center;
  letter-spacing: 0.2px;
  margin-bottom: -8px;
  font-weight: normal;
  line-height: normal;
  font-size: 14px;
  color: #fdfdfd;
  letter-spacing: 0.2px;
  padding: 12px 18px 10px;
  display: none;
  transition: 0.2s;
}
.marker-decor {
  position: absolute;
  top: 100%;
  width: 0;
  height: 0;
  border-left: 14px solid transparent;
  border-right: 14px solid transparent;
  border-top: 8px solid #68a500;
  box-shadow: 0px 16px 45px rgba(66, 72, 77, 0.2);
  transition: 0.2s;
}
.marker-title {
  font-weight: 400;
  font-family: Montserrat, sans-serif;
  letter-spacing: 0.2px;
  opacity: 0.9;
  margin-bottom: 4px;
  white-space: nowrap;
}
.marker-price {
  letter-spacing: 0.3px;
  font-family: Montserrat, sans-serif;
  font-weight: 300;
  opacity: 0.7;
  color: #dfe2e3;
}
.mobile-header {
  display: none;
}
.nav-z {
  z-index: 4000;
}
.tablet-head-fake {
  display: none;
  width: 100%;
  height: 70px;
  background: white;
  position: fixed;
  z-index: 199;
}
.mob-title--hidden {
  transform: translateY(-100%);
}
.name-search-comp {
  position: absolute;
  left: 20px;
  top: 20px;
  z-index: 2;
}
.name-search-comp--open-card {
  visibility: hidden;
  opacity: 0;
}
.mob-filters-wrapper {
  display: none;
}
.mob-filtred-count {
  display: none;
  color: #a7a7ae;
  background: #f5f6f9;
  box-shadow: 0px 16px 25px rgba(90, 88, 99, 0.1);
  text-align: center;
  padding: 11px;
  font-size: 14px;
  align-items: center;
  justify-content: center;
  letter-spacing: 0.2px;
  span {
    font-weight: 500;
    color: #696771;
    margin-right: 5px;
  }
}
.open-filter-btn {
  display: none;
}
.wrapper-search-on-map {
  display: flex;
  flex-direction: column;
  height: 100%;
}

@media (max-width: 768px) {
  .map-wrapper {
    top: 70px;
  }
  .search-wrapper {
    top: 70px;
  }
  .tablet-head-fake {
    display: block;
  }
}

@media (max-width: 500px) {
  .mobile-header {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 2200;
    width: 100%;
    height: 50px;
    .mob-main-head {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 50px;
      background: #fdfdfd;
      position: relative;
      z-index: 3;
      .mob-menu-open {
        cursor: pointer;
        position: absolute;
        left: 15px;
        opacity: 0.7;
      }
    }
    .mob-choose-title {
      display: flex;
      width: 100%;
      height: 50px;
      font-weight: 500;
      font-size: 14px;
      line-height: 22px;
      text-align: center;
      text-transform: uppercase;
      color: rgba(90, 88, 99, 0.7);
      transition: 0.2s;
      position: relative;
      background: #fdfdfd;
      box-shadow: 0px 4px 10px rgba(66, 72, 77, 0.15);
      z-index: 2;
      border-top: 1px solid #f4f4f5;

      .mob-choose {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-grow: 1;
        height: 100%;
        cursor: pointer;
        border-bottom: 2px solid #fdfdfd;
      }

      .mob-choose--active {
        color: #60ce78;
        border-bottom: 2px solid #60ce78;
      }
    }
  }
  .map-wrapper {
    top: 100px;
  }
  .search-wrapper {
    position: fixed;
    top: 100px;
    width: 100vw;
    height: calc(100vh - 100px);
  }
  .changed-view-list {
    transform: translateX(-100%);
  }

  .top-scroll {
    top: 50px;
    height: calc(100vh - 50px);
  }
  .tablet-head-fake {
    display: none;
  }
  .map-search-wrapper {
    position: relative;
    z-index: 3000;
    display: flex;
    justify-content: center;
  }
  .map-wrapper {
    position: fixed;
    z-index: 2190;
    transform: translateX(100%);
    left: 0;
  }
  .changed-z-map {
    z-index: 2180;
  }
  .changed-view-map {
    transform: translateX(0%);
  }
  .name-search-comp {
    display: none;
    position: fixed;
    left: unset;
    top: 0px;
    z-index: 2;
    right: 0;
  }
  .mob-name-search-comp {
    position: fixed;
    left: unset;
    top: 0px;
    z-index: 2;
    right: 0;
  }
  .pc-filters-wrapper {
    display: none;
  }
  .mob-filters-wrapper {
    display: block;
    position: fixed;
    z-index: 2300;
    bottom: 0;
    min-height: 100vh;
    background: #f5f6f9;
    transition: 0.2s;
    transform: translateY(100%);
  }
  .mob-filter-open {
    transform: translateY(0%);
  }
  .mob-filtred-count {
    display: flex;
  }
  .open-filter-btn {
    cursor: pointer;
    background: #5dbf16;
    box-shadow: 0px 5px 20px rgba(66, 72, 77, 0.15);
    border-radius: 30px;
    display: flex;
    align-items: center;
    justify-items: center;
    position: fixed;
    z-index: 2200;
    bottom: 30px;
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    text-align: center;
    letter-spacing: 0.1px;
    padding: 5px 22px;
    padding-left: 18px;
    transition: 0.2s;

    color: #fafbfb;
    &:active {
      background: #68a500;
    }
    img {
      margin-right: 5px;
    }
    .mob-filters-count {
      width: 24px;
      height: 24px;
      font-size: 15px;
      line-height: normal;
      text-align: center;
      letter-spacing: 0.2px;
      color: #60ce78;
      background: #fdfdfd;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  .all-layouts-wrapper {
    overflow-y: scroll;
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE 10+ */
    &::-webkit-scrollbar {
      /* WebKit */
      width: 0px;
    }
  }
}
</style>
