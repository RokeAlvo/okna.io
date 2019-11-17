<template lang="pug">
  .input-text
    .input-text__wrap
      the-mask(:type='type', :placeholder='placeholder' masked=true mask="+7(###)###-##-##" required).input-text__input
</template>
<script>
import { TheMask } from 'vue-the-mask'

export default {
  components: { TheMask },
  // eslint-disable-next-line vue/require-prop-types
  props: ['type', 'placeholder']
}
</script>
<style lang="scss">
.input-text {
  &__input {
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 24px;
    letter-spacing: 1px;

    width: calc(100% - 58 / 14 * 2rem);
    border: 0;
    padding: 0;
    margin: 12/14 * 1em 15/14 * 1em 12/14 * 1em 15/14 * 1em;
    box-sizing: border-box;
    color: rgba($color: $font-main2-color, $alpha: 0.7);
    background: $bg-light;

    &::placeholder {
      color: rgba($color: $font-main2-color, $alpha: 0.4);
    }

    &:hover,
    &:focus {
      // color: $color-Dark75;
    }
  }

  &__wrap {
    width: 280px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: $bg-light;
    border: 1px solid rgba(167, 203, 213, 0.1);
    box-shadow: inset 0px 0px 4px rgba(90, 88, 99, 0.15);
    border-radius: 100px;
    box-sizing: border-box;
    &:hover {
      border-color: gray;
    }
  }
}
</style>
