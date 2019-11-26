<template>
  <div class="popup-placeholder-wrapper">
    <!-- <div class="popup-layout-close">
			<img src="/images/map-search/close-white.svg">
		</div> -->
    <div class="popup-placeholder-content">
      <PlaceholderLayout :header="false" :is-detail="true"></PlaceholderLayout>

      <div class="popup-placeholder-main-info">
        <div v-for="n in 3" :key="n" class="popup-placeholder-item">
          <div class="popup-placeholder-item-logo"></div>
          <div class="popup-placeholder-main-data">
            <div class="popup-placeholder-data-title"></div>
            <div class="popup-placeholder-data-value"></div>
          </div>
        </div>
      </div>

      <div class="popup-placeholder-more">
        <div class="popup-placeholder-more-header">
          <div class="popup-placeholder-more-title"></div>
          <div class="popup-placeholder-more-btn"></div>
        </div>
        <div class="popup-placeholder-more-info">
          <div v-for="n in 5" :key="n" class="popup-placeholder-more-item">
            <div class="placeholder-more-rooms"></div>
            <div class="placeholder-more-square"></div>
            <div class="placeholder-more-price"></div>
          </div>
        </div>
      </div>
      <div class="placeholder-btn-rc-wrapper">
        <div class="placeholder-btn-rc"></div>
      </div>
    </div>
  </div>
</template>

<script>
import PlaceholderLayout from './placeholderLayout'
export default {
  components: {
    PlaceholderLayout
  }
}
</script>

<style lang="scss">
.popup-placeholder-content {
  display: flex;
  flex-direction: column;
  height: 100%;
  .placeholder {
    height: 270px;
  }
}
.popup-placeholder-wrapper {
  position: fixed;
  z-index: 2;
  top: 65px;
  left: 0;
  bottom: 0;
  background: #fbfcfd;
  width: 360px;
  .popup-layout-close {
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
  }
}
.popup-placeholder-main-info {
  height: 220px;
  background: #f5f6f9;
  padding: 30px 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-shrink: 0;
  .popup-placeholder-item {
    height: 40px;
    display: flex;
    &:first-child .popup-placeholder-data-value {
      width: 100% !important;
    }
    .popup-placeholder-item-logo {
      width: 40px;
      height: 100%;
      border-radius: 50%;
      background: #626c7a;
      opacity: 0.2;
      margin-right: 15px;
      flex-shrink: 0;
    }
    .popup-placeholder-main-data {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 100%;
      .popup-placeholder-data-title {
        background: #babfc6;
        opacity: 0.1;
        border-radius: 4px;
        width: 90px;
        height: 8px;
        margin: 3px 0;
      }
      .popup-placeholder-data-value {
        width: 110px;
        height: 10px;
        background: #6e6b75;
        opacity: 0.1;
        border-radius: 4px;
        margin: 3px 0;
      }
    }
  }
}

.popup-placeholder-more {
  padding: 40px 20px 17px;
  background: #fbfcfd;
  .popup-placeholder-more-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 20px;
    border-bottom: 1px solid #f6f8f8;
    .popup-placeholder-more-title {
      width: 180px;
      height: 10px;
      background: #6e6b75;
      opacity: 0.2;
      border-radius: 5px;
    }
    .popup-placeholder-more-btn {
      width: 84px;
      height: 8px;
      background: #babfc6;
      opacity: 0.2;
      border-radius: 4px;
    }
  }
  .popup-placeholder-more-info {
    padding-top: 22px;
    .popup-placeholder-more-item {
      display: flex;
      margin-bottom: 25px;
      &:last-child {
        margin-bottom: 0;
      }
      // justify-content: space-between;
      .placeholder-more-rooms {
        width: 52px;
        height: 10px;
        background: #babfc6;
        opacity: 0.1;
        border-radius: 5px;
        margin-right: 45px;
      }
      .placeholder-more-square {
        width: 72px;
        height: 10px;
        background: #babfc6;
        opacity: 0.1;
        border-radius: 5px;
        margin-right: 35px;
        flex: 1 0 auto;
      }
      .placeholder-more-price {
        width: 112px;
        height: 10px;
        background: #babfc6;
        opacity: 0.3;
        border-radius: 5px;
      }
    }
  }
}
.placeholder-btn-rc-wrapper {
  background: #fbfcfd;
  padding: 30px 20px;
  flex: 1 0 auto;
  display: flex;
  // align-items: flex-end;
  .placeholder-btn-rc {
    width: 100%;
    height: 68px;
    background: #f5f6f9;
    border-radius: 30px;
  }
}
</style>
