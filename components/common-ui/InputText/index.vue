<template>
  <div class="input-wrapper">
    <img
      v-if="inputtype === 'rub'"
      class="rub-img"
      src="/images/map-search/rub.svg"
    />
    <input
      v-mask="mask"
      :value="value"
      class="input-text"
      :placeholder="placeholder"
      :type="type"
      :class="{
        'size-s': size === 's',
        'size-m': size === 'm',
        phone: inputtype === 'phone',
        rub: inputtype === 'rub',
        invalid: invalid,
        'default-value': defaultValue
      }"
      :max="maxNumber"
      @input="input"
      @change="change"
      @focus="focus"
      @blur="blur"
    />
  </div>
  <!-- v-money="inputtype === 'rub' ? money : null" -->
</template>

<script>
import { VMoney } from 'v-money'
export default {
  directives: { money: VMoney },
  props: {
    defaultValue: {
      type: Boolean,
      default: false
    },
    maxNumber: {
      type: Number,
      default: null
    },
    value: {
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    placeholder: {
      type: String,
      default: ''
    },
    mask: {
      type: String,
      default: ''
    },
    inputtype: {
      type: String,
      default: ''
    },
    invalid: {
      type: Boolean,
      default: false
    },

    size: {
      type: String,
      default: 's'
    },
    icon: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      money: {
        thousands: ' ',

        precision: 0,
        masked: false
      }
    }
  },
  methods: {
    input(event) {
      if (this.inputtype === 'rub') {
        // event.target.value = event.target.value.slice(0, 15);
        // event.target.value = event.target.value.toLocaleString('ru');
      }

      this.$emit('input', event.target.value)
    },
    change(event) {
      this.$emit('change', event.target.value)
    },
    focus(event) {},
    blur(event) {}
  }
}
</script>

<style lang="scss" scoped>
.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  max-width: 260px;
}
.input-text {
  width: 100%;
  min-height: 42px;
  padding: 3px 20px;
  background: #fdfdfd;
  border: 1px solid rgba(167, 203, 213, 0.1);
  box-shadow: inset 0px 0px 4px rgba(90, 88, 99, 0.15);
  border-radius: 100px;
  color: #6a6872;
  font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 25px;
  letter-spacing: 0.1px;
  font-family: 'Montserrat', sans-serif;
  transition: 0.1s;
  &::placeholder {
    color: #bcbbc0;
    font-weight: normal;
  }
  &:hover {
    border: 1px solid rgba(167, 203, 213, 0.3);
    color: #9b9aa0;
  }
  &:focus {
    border: 1px solid rgba(167, 203, 213, 0.5);
    color: #6a6872;
  }
}
.invalid {
  border: 1px solid rgba(185, 86, 15, 0.3);
  color: #ba8968;
  &:hover {
    border: 1px solid rgba(185, 86, 15, 0.4);
    color: #ba8968;
  }
  &:focus {
    border: 1px solid rgba(185, 86, 15, 0.5);
    color: #ba8968;
  }
}
.size-m {
  min-height: 50px;
  font-size: 18px;
}
.phone {
  text-align: center;
  color: #777580;
  &:focus {
    color: #6a6872;
  }
}
.rub-img {
  position: absolute;
  right: 20px;
  z-index: 1;
}
.rub {
  padding-right: 35px;
}
.default-value {
  border: 1px solid rgba(167, 203, 213, 0.1);
  box-shadow: inset 0px 0px 4px rgba(90, 88, 99, 0.15);
  border-radius: 100px;
  color: #bcbbc0;
}
</style>
