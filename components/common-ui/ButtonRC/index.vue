<template>
  <div
    :class="{
      activeButton: isactive,
      'size-s': size === 's',
      'size-m': size === 'm',
      'main-btn': value === 'main',
      secondary: value === 'second',
      'size-xl': size === 'xl',
      static: action === 'static',
      loading: action === 'loading',
      disabled: action === 'disabled',
      square: square
    }"
    class="button-rc"
    :style="{ width: width }"
    @click="handleClick($event)"
  >
    {{ text }}
    <img
      v-if="action === 'loading'"
      class="loading-img"
      src="/images/map-search/loading.svg"
    />
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: ''
    },
    isactive: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: 's'
    },
    value: {
      type: String,
      default: ''
    },
    // main: {
    // 	type: Boolean,
    // 	default: false
    // },
    action: {
      type: String,
      default: ''
    },
    square: {
      type: Boolean,
      default: false
    },
    width: {
      type: String,
      default: ''
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
.button-rc {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: max-content;
  background: #f5f6f9;
  border: 1px solid rgba(167, 203, 213, 0.2);
  border-radius: 100px;
  font-family: 'Montserrat', sans-serif;
  font-style: normal;
  text-align: center;
  color: #898890;
  transition: 0.2s;
  user-select: none;
  cursor: pointer;
  // img {
  // 	&:hover {
  //     filter: invert(100%);
  // 	}
  // 	&:active {
  //     filter: invert(100%);

  // 	}
  // }
}
.size-s {
  // background: #f5f6f9;
  background: #fdfdfd;
  min-height: 40px;
  padding: 5px;
  width: max-content;
  min-width: 93px;
  font-weight: 500;
  font-size: 14px;
  letter-spacing: 0.1px;
  &:hover {
    background: #eff5f7;
  }
  &:active {
    background: #5dbf16;
    color: #ceecb9;
  }
  &.activeButton {
    background: #5dbf16;
    color: #ceecb9;
  }
}
.size-m {
  min-height: 50px;
  min-width: 275px;
  padding: 13px 10px;
}
.main-btn {
  background: #5dbf16;
  color: #fafbfb;
  font-size: 16px;
  box-shadow: 0px 10px 20px rgba(66, 72, 77, 0.2),
    0px 9px 40px rgba(96, 189, 30, 0.2);
  border-radius: 30px;
  &:hover {
    background: #6ca100;
    box-shadow: 0px 4px 10px rgba(66, 72, 77, 0.1);
  }
  &:active {
    box-shadow: none;
  }
}
.secondary {
  background: #ffffff;
  font-size: 16px;
  color: #acabb1;
  box-shadow: 0px 16px 25px rgba(66, 72, 77, 0.1);
  &:hover {
    box-shadow: 0px 4px 10px rgba(66, 72, 77, 0.1);
  }
  &:active {
    box-shadow: none;
  }
}
.size-xl {
  background: #5dbf16;
  box-shadow: 0px 8px 20px rgba(108, 161, 0, 0.2);
  font-size: 16px;
  color: #acabb1;
  min-height: 70px;
  min-width: 360px;
  padding: 5px 10px;
  border-radius: 0;
  &:hover {
    background: #6ca100;
    box-shadow: 0px 4px 10px rgba(66, 72, 77, 0.1);
  }
  &:active {
    box-shadow: none;
  }
}
.size-xl {
  background: #5dbf16;
  box-shadow: 0px 8px 20px rgba(108, 161, 0, 0.2);
  font-size: 16px;
  color: #ffffff;
  min-height: 70px;
  min-width: 360px;
  padding: 5px 10px;
  border-radius: 0;
}
.loading {
  background: #5dbf16;
  cursor: default;
  box-shadow: 0px 8px 20px rgba(108, 161, 0, 0.2);
  &:hover {
    background: #5dbf16;
    box-shadow: 0px 8px 20px rgba(108, 161, 0, 0.2);
  }
  &:active {
    box-shadow: 0px 8px 20px rgba(108, 161, 0, 0.2);
  }
}
.loading-img {
  padding: 5px;
  animation: loading 1s linear infinite;
}
.disabled {
  cursor: default;
  background: #a8b2b2;
  box-shadow: none;
  &:hover {
    background: #a8b2b2;
    box-shadow: none;
  }
  &:active {
    background: #a8b2b2;
    box-shadow: none;
  }
}
.square {
  border-radius: 0;
}
@keyframes loading {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
