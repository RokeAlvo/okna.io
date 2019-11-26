<template>
  <div class="placeholder" :class="{ 'is-detail': isDetail }">
    <div class="placeholder__header">
      <div v-if="header" class="header-content">
        <div class="header-title"></div>
        <div class="header-decor"></div>
      </div>
    </div>
    <div class="placeholder__footer">
      <div class="footer-title"></div>
      <div class="footer-text"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    header: {
      type: Boolean,
      default: true
    },
    isDetail: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
.placeholder {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 240px;
  width: 100%;
  margin-bottom: 2px;
  background: #3b4546;
  .placeholder__header {
    display: flex;
    justify-content: flex-end;
    height: 40px;
    .header-content {
      background: #4d5758;
      width: 140px;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      position: relative;
      padding-right: 20px;
    }
    .header-decor {
      position: absolute;
      left: -20px;
      top: 0;
      width: 0;
      height: 0;
      border-left: 20px solid transparent;
      border-right: 0px solid transparent;
      border-top: 40px solid #4d5758;
    }
    .header-title {
      width: 100px;
      height: 10px;
      background: #5d6768;
      border-radius: 41px;
    }
  }
}
.placeholder__footer {
  padding: 20px;
  .footer-title {
    width: 243px;
    height: 14px;
    margin-bottom: 14px;
    background: #60686a;
    border-radius: 41px;
  }
  .footer-text {
    width: 137px;
    height: 9px;
    background: #4d5758;
    border-radius: 41px;
  }
}
.is-detail {
  height: 270px;
  margin-bottom: 0;
}
</style>
