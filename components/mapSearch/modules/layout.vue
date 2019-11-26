<template>
  <div
    class="layout-wrapper"
    :style="background"
    :class="{
      'layout-filter-open': opacity,
      'is-detail': isDetail,
      'hide-rc': isHide
    }"
    @click="handleClick($event)"
  >
    <div class="layout__header">
      <div v-if="header" class="layout-header-content">
        <div v-if="price" class="layout-header-title">
          от {{ priceLocal }} ₽
        </div>
        <div class="layout-header-decor"></div>
      </div>
    </div>
    <div class="layout__footer">
      <div class="layout-footer-title">{{ name }}</div>
      <div class="layout-footer-text">{{ developer }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: ''
    },
    developer: {
      type: String,
      default: ''
    },
    price: {
      default: ''
    },
    img: {
      type: String,
      default: ''
    },
    opacity: {
      type: Boolean,
      default: false
    },
    header: {
      type: Boolean,
      default: true
    },
    isDetail: {
      type: Boolean,
      default: false
    },
    isHide: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    priceLocal() {
      // if(this.price == 0) return ''
      return Number(this.price).toLocaleString('ru')
    },
    background() {
      const background = {
        background:
          'linear-gradient(202.39deg, rgba(45, 48, 56, 0) 8.25%, rgba(39, 45, 57, 0.8) 85%) 0% 0%, url(' +
          this.img +
          ') center no-repeat',
        'background-size': 'cover' // почему то не добавляется это свойство
      }
      return background
    }
  },
  methods: {
    handleClick(e) {
      this.$emit('click', e)
    }
  }
}
</script>

<style lang="scss" scoped>
.layout-wrapper {
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-shrink: 0;
  height: 240px;
  width: 100%;
  margin-bottom: 2px;
  background: #3b4546;
  background-size: cover !important;
  .layout__header {
    display: flex;
    justify-content: flex-end;
    height: 40px;
    .layout-header-content {
      min-width: 140px;
      font-weight: 400;
      font-size: 14px;
      letter-spacing: 0.3px;
      color: #ffffff;
      background: #4d5758;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      position: relative;
      padding-left: 20px;
      padding-right: 20px;
      background: #5eae24;
      opacity: 0.98;
    }
    .layout-header-decor {
      position: absolute;
      left: -20px;
      top: 0;
      width: 0;
      height: 0;
      border-left: 20px solid transparent;
      border-right: 0px solid transparent;
      border-top: 40px solid #5eae24;
    }
    .layout-header-title {
      opacity: 0.8;
    }
  }
}
.layout__footer {
  padding: 11px 20px;
  .layout-footer-title {
    font-weight: 300;
    font-size: 20px;
    line-height: 20px;
    letter-spacing: 0.2px;
    color: #ffffff;
    text-shadow: 0px 0px 10px #17191a;
    margin-bottom: 4px;
  }
  .layout-footer-text {
    font-weight: 300;
    font-size: 13px;
    line-height: 20px;
    color: #fff;
    opacity: 0.5;
    letter-spacing: 0.2px;
    text-shadow: 0px 0px 15px rgba(23, 25, 26, 0.7);
  }
}
.layout-filter-open {
  opacity: 0.5;
}
.is-detail {
  height: 270px;
  margin-bottom: 0;
}
.hide-rc {
  display: none;
}
</style>
