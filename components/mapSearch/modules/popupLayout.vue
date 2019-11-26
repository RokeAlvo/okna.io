/* eslint-disable no-undef */
<template>
  <div
    class="popup-rc-wrapper"
    :class="{ 'popup-rc-active': isOpenRc, 'popup-rc-two-active': isReOpenRc }"
  >
    <div class="mob-popup-header">
      <div class="mob-popup-back" @click="close">
        <img src="/images/map-search/back.svg" />
      </div>
      <div class="mob-popup-title">
        <div class="img-box">
          <img src="/images/map-search/phone-icon.svg" />
        </div>
        <a class="mob-popup-text" href="tel:+73838952664">+7 (383) 895-26-64</a>
      </div>
    </div>

    <div class="popup-rc-layout-close" @click="close">
      <img src="/images/map-search/close-white.svg" />
    </div>
    <div class="popup-rc-content">
      <Layout
        :img="img"
        :header="false"
        :is-detail="true"
        :name="name"
        :developer="developer"
        @click="linkUp"
      ></Layout>

      <div class="popup-rc-main-info">
        <div class="popup-rc-item">
          <div class="popup-rc-item-logo">
            <img src="/images/map-search/gps-icon.svg" />
          </div>
          <div class="popup-rc-main-data">
            <div class="popup-rc-data-title">Адрес</div>
            <div class="popup-rc-data-value">{{ address }}</div>
          </div>
        </div>
        <div class="popup-rc-item">
          <div class="popup-rc-item-logo">
            <img src="/images/map-search/material-icon.svg" />
          </div>
          <div class="popup-rc-main-data">
            <div class="popup-rc-data-title">Материал дома</div>
            <div class="popup-rc-data-value">{{ material }}</div>
          </div>
        </div>
        <div class="popup-rc-item">
          <div class="popup-rc-item-logo">
            <img src="/images/map-search/calendar-icon.svg" />
          </div>
          <div class="popup-rc-main-data">
            <div class="popup-rc-data-title">Срок сдачи</div>
            <div class="popup-rc-data-value">
              {{
                dateMin.key === dateMax.key
                  ? dateMin.value
                  : dateMin.value + ' - ' + dateMax.value
              }}
            </div>
          </div>
        </div>
      </div>

      <div class="popup-rc-more">
        <div class="popup-rc-more-header">
          <div class="popup-rc-more-title">Квартиры в продаже</div>
          <div class="popup-rc-more-btn" @click="linkUp">Смотреть все</div>
        </div>
        <div class="popup-rc-more-info">
          <div
            v-for="(range, index) in ranges"
            :key="index"
            class="popup-rc-more-item"
          >
            <div class="popup-more-rooms">{{ range.title }}</div>
            <div class="popup-more-square">
              {{ Math.round(range.area_min) }} –
              {{ Math.round(range.area_max) }} м
              <sup>2</sup>
            </div>
            <div class="popup-more-price">
              от {{ Number(range.price_min).toLocaleString('ru') }} ₽
            </div>
          </div>
        </div>
      </div>

      <div
        class="mob-map-wrapper"
        :class="{ 'mob-popup-with-map': viewActive === 2 }"
      >
        <div class="mob-zoom-control-wrapper">
          <div class="mob-zoom-control" @click="zoom(+1)">
            <img src="/images/map-search/plus-gray.svg" />
          </div>
          <div class="mob-zoom-control" @click="zoom(-1)">
            <img src="/images/map-search/minus-gray.svg" />
          </div>
        </div>
        <div
          id="map-popup"
          class="mob-maps"
          style="width:100%; height:100%"
        ></div>
      </div>

      <div
        class="popup-btn-rc-wrapper"
        :class="{ 'popup-btn-rc-wrapper--map': viewActive === 2 }"
      >
        <div class="btb-rc-box">
          <ButtonRC
            :text="'Подробно о комплексе'"
            :size="'m'"
            :width="'100%'"
            :value="'main'"
            @click="linkUp"
          ></ButtonRC>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import Layout from './layout'
import ButtonRC from '@/components/common-ui/ButtonRC'
const {
  mapState,
  mapGetters,
  // mapActions,
  mapMutations
} = createNamespacedHelpers('mapSearch')
export default {
  props: {
    isOpenRc: {
      type: Boolean,
      default: false
    },
    isReOpenRc: {
      type: Boolean,
      default: false
    },
    img: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
    developer: {
      type: String,
      default: ''
    },
    address: {
      type: String,
      default: ''
    },
    material: {
      type: String,
      default: ''
    },
    dateMin: {
      type: Object,
      default() {
        return {}
      }
    },
    dateMax: {
      type: Object,
      default() {
        return {}
      }
    },
    ranges: {
      type: Array,
      default() {
        return []
      }
    },
    coordinates: {
      type: Array,
      default() {
        return []
      }
    },
    priceMin: {
      default: 0
    },
    link: {
      type: String,
      default: ''
    },
    viewActive: {
      type: Number,
      default: 2
    }
  },
  data() {
    return {
      map: null,
      oldZoom: null,
      marker: null,
      popupMap: null,
      switchOnZoom: 14
    }
  },
  // watch:{
  //   coordinates(){
  //     this.setMarker()
  //   }
  // },
  methods: {
    ...mapMutations(['setIsOpenCard']),
    close() {
      this.$emit('close-popup', this.isOpenRc)
      this.setIsOpenCard(false)

      document.querySelector('.popup-rc-content').scrollTop = 0
      if (window.innerWidth < 500) {
        this.marker.remove()
      }
    },
    linkUp() {
      location.href = this.link
    },

    setMiniMarker() {
      const priceMinFormatted = Number(this.priceMin).toLocaleString('ru')

      return `<div class="marker-wrapper">
                    <div class="mini-marker-wrapper">
                      <div class="mini-marker"></div>
                    </div>
                    <div class="marker-info-wrapper">
                      <div class="marker-title">${this.name}</div>
                      <div class="marker-price">от ${priceMinFormatted} ₽</div>
                      <div class="marker-decor"></div>
                    </div>
                  </div>`
    },
    setZoomMarker() {
      const priceMinFormatted = Number(this.priceMin).toLocaleString('ru')

      return `<div class="marker-wrapper-zoom">
                    <div class="marker-info-wrapper-zoom">
                      <div class="marker-title">${this.name}</div>
                      <div class="marker-price">от ${priceMinFormatted} ₽</div>
                      <div class="marker-decor"></div>
                    </div>
                  </div>`
    },
    setPopupMarker() {
      const priceMinFormatted = Number(this.priceMin).toLocaleString('ru')

      return `<div class="marker-wrapper-zoom">
                    <div class="marker-info-wrapper-zoom popup-marker">
                      <div class="marker-title">${this.name}</div>
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
        // Object.values(this.markers._layers).forEach((marker, i) => {
        this.marker._icon.innerHTML = template()
        // });
      }
    },
    zoom(change) {
      this.map.setZoom(this.map.getZoom() + change)
      console.log('this.map.getZoom(): ', this.map.getZoom())
    },
    async setMarker() {
      // eslint-disable-next-line no-undef
      const myDivIcon = DG.divIcon({
        iconSize: [30, 30],
        className: 'marker-custom',
        html: this.setMiniMarker()
      })
      await this.coordinates
      // eslint-disable-next-line no-undef
      this.popupMap = DG.popup({
        className: 'test-name',
        closeButton: false,
        // eslint-disable-next-line no-undef
        offset: DG.point(0, 1),
        setZoomMarker: false
      })
        .setLatLng(this.coordinates)
        .setContent(this.setPopupMarker())

      // eslint-disable-next-line no-undef
      this.marker = DG.marker(this.coordinates, { icon: myDivIcon })
        .addTo(this.map)
        .bindPopup(this.popupMap)
      this.onZoomEnd()
      // this.map.setZoom(13)
      // setTimeout(()=>{ this.map.setView(this.coordinates)},1000)
      this.map.setView(this.coordinates)
      this.popupMap.openOn(this.map)
      // this.map.setZoom(13)
    }
  },
  computed: {
    ...mapState({
      roomsFilter: (state) => state.roomsFilter
    }),
    ...mapGetters(['getLabelRooms'])
  },
  mounted() {
    // eslint-disable-next-line no-undef
    this.markers = DG.featureGroup()
    // eslint-disable-next-line no-undef
    this.popups = DG.featureGroup()

    // eslint-disable-next-line no-undef
    this.map = DG.map('map-popup', {
      center: [54.98, 82.89],
      zoom: 15,
      minZoom: 7,
      zoomControl: false,
      fullscreenControl: false,
      touchZoom: false,
      scrollWheelZoom: false
    })

    this.map.on('zoomstart', this.onZoomStart)
    this.map.on('zoomend', this.onZoomEnd)

    //  setTimeout(()=>this.setMarker(),8000)
  },
  components: {
    Layout,
    ButtonRC
  }
}
</script>

<style lang="scss">
.popup-rc-content {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-y: scroll;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE 10+ */
  &::-webkit-scrollbar {
    /* WebKit */
    width: 0px;
  }
}
.popup-rc-wrapper {
  position: fixed;
  z-index: 2;
  top: 65px;
  left: 0;
  bottom: 0;
  background: #fbfcfd;
  width: 360px;
  transition: 0.2s;
  transform: translateX(-100%);
  .popup-rc-layout-close {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 50px;
    background: rgba(31, 34, 37, 0.7);
    box-shadow: 0px 4px 10px rgba(66, 72, 77, 0.15);
    border-radius: 30px;
    position: absolute;
    right: -70px;
    top: 20px;
    transition: 0.3s;
    opacity: 0;
    visibility: hidden;
  }
}
.popup-rc-main-info {
  // height: 220px;
  background: #f5f6f9;
  padding: 30px 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-shrink: 0;
  .popup-rc-item {
    margin-bottom: 20px;
    display: flex;
    &:last-child {
      margin-bottom: 0;
    }
    .popup-rc-item-logo {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: #babfc6;
      margin-right: 15px;
      flex-shrink: 0;
    }
    .popup-rc-main-data {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 100%;
      .popup-rc-data-title {
        color: #abb1b9;
        font-weight: normal;
        font-size: 12px;
        line-height: 16px;
        letter-spacing: 0.1px;
        // margin: 3px 0;
      }
      .popup-rc-data-value {
        color: #696771;
        font-weight: normal;
        font-size: 14px;
        line-height: 25px;
        letter-spacing: 0.1px;
        // margin: 3px 0;
      }
    }
  }
}

.popup-rc-more {
  padding: 35px 20px 40px;
  background: #fbfcfd;
  .popup-rc-more-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 15px;
    border-bottom: 1px solid #f6f8f8;
    .popup-rc-more-title {
      font-weight: 500;
      font-size: 16px;
      line-height: 24px;
      letter-spacing: 0.2px;
      color: #5a5863;
    }
    .popup-rc-more-btn {
      cursor: pointer;
      color: #afb4bb;
      font-weight: 400;
      font-size: 12px;
      line-height: 16px;
      text-align: center;
      letter-spacing: 0.1px;
      text-decoration-line: underline;
    }
  }
  .popup-rc-more-info {
    padding-top: 15px;
    .popup-rc-more-item {
      display: flex;
      margin-bottom: 8px;
      color: #a0a6ae;
      font-weight: normal;
      font-size: 14px;
      line-height: 25px;
      letter-spacing: 0.1px;
      &:last-child {
        margin-bottom: 0;
      }
      .popup-more-rooms {
        margin-right: 40px;
        min-width: 60px;
        display: flex;
        align-items: center;
      }
      .popup-more-square {
        margin-right: 20px;
        flex: 1 0 auto;
      }
      .popup-more-price {
        color: #6a6872;
        font-weight: normal;
        font-size: 14px;
        line-height: 25px;
        text-align: right;
        letter-spacing: 0.1px;
      }
    }
  }
}
.popup-btn-rc-wrapper {
  padding: 0px 20px 30px;
  flex: 1 0 auto;
  display: flex;
  position: sticky;
  bottom: 0;
  align-items: flex-start;
  z-index: 3;
  .button-rc {
    height: auto;
  }
}

.popup-rc-active {
  transform: translateX(0%);
  .popup-rc-layout-close {
    opacity: 1;
    visibility: visible;
  }
}
.popup-rc-two-active {
  transition: 0.4s;
}
.mob-popup-header {
  display: none;
}

// for mobile
.mob-map-wrapper {
  display: none;
  position: relative;
  width: 100%;
  height: 400px;
  background: yellow;
}
.mob-zoom-control-wrapper {
  position: absolute;
  right: 20px;
  top: 50%;
  margin-top: -55px;
  z-index: 2;
  .mob-zoom-control {
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
.btb-rc-box {
  width: 100%;
}
.mob-popup-with-map {
  opacity: 0;
  position: absolute;
  z-index: -1;
}
@media (max-width: 768px) {
  .popup-rc-wrapper {
    top: 70px;
  }
}
@media (max-width: 500px) {
  .popup-rc-wrapper {
    z-index: 2300;
    top: 0;
    left: 0;
    bottom: 0;
    width: 100%;
  }
  .popup-rc-active .popup-rc-layout-close {
    display: none;
  }
  .mob-popup-header {
    display: flex;
    position: fixed;
    top: 0;
    z-index: 2;
    width: 100%;
    background: #fdfdfd;
    box-shadow: 0px 4px 10px rgba(66, 72, 77, 0.15);
    min-height: 50px;
  }
  .popup-rc-content .layout-wrapper {
    margin-top: 50px;
  }
  .mob-popup-back {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 60px;
    min-height: 100%;
    background: #5dbf16;
    flex-shrink: 0;
    img {
      filter: brightness(0) invert(1);
    }
  }
  .mob-popup-title {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding-right: 20px;
    img {
      margin-right: 8px;
      margin-top: 3px;
    }
    .mob-popup-text {
      color: #6a6872;
      font-weight: 500;
      font-size: 20px;
      line-height: normal;
      text-align: center;
      letter-spacing: 0.5px;
    }
  }
  .mob-map-wrapper {
    display: block;
  }
  .popup-btn-rc-wrapper {
    margin-top: -80px;
    padding: 0;
  }
  .popup-btn-rc-wrapper--map {
    margin-top: 0px;
  }
  .btb-rc-box {
    background: linear-gradient(
      180deg,
      rgba(241, 241, 241, 0) 0%,
      rgba(241, 241, 241, 0.89) 68.51%,
      #f1f1f1 100%,
      #f1f1f1 100%
    );
    padding: 0px 20px 30px;
  }
}
@media (max-width: 350px) {
  .popup-rc-more .popup-rc-more-info .popup-rc-more-item .popup-more-rooms {
    margin-right: 22px;
    min-width: 55px;
  }
  .popup-rc-more .popup-rc-more-info .popup-rc-more-item .popup-more-square {
    margin-right: 15px;
  }
}
</style>
