<template lang="pug">
  <button class="button" v-bind:class="modsToClass">{{title}}</button>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: 'Отправить'
    },
    mods: {
      type: String,
      default() {
        return ''
      }
    }
  },
  computed: {
    modsToClass() {
      return this.mods.split(',').reduce((prev, cur) => {
        return prev + ' button_' + cur
      }, '')
    }
  }
}
</script>
<style lang="scss">
.button {
  height: 50px;
  width: 100%;
  border-radius: 30px;
  border: 0;
  cursor: pointer;

  &_raised {
    box-shadow: 0px 10px 20px rgba(66, 72, 77, 0.2),
      0px 9px 40px rgba(96, 189, 30, 0.2);

    &:hover,
    &:active {
      box-shadow: 0px 4px 10px rgba(66, 72, 77, 0.1);
    }
  }

  &_outlined {
    background: inherit;
    box-shadow: 0px 16px 25px rgba(66, 72, 77, 0.1);
    border-radius: 100px;
    color: $button-outlined-color;

    &:hover,
    &:active,
    &:focus {
      box-shadow: none;
    }
  }

  &_main-color {
    background-color: $button-main-color;
    color: $button-text-main-color;

    font-style: normal;
    font-weight: 500;
    font-size: 14/16 * 1rem;
    line-height: 24/16 * 1em;
    letter-spacing: 0.1px;

    &:hover,
    &:active {
      background-color: $hover-button-main-color;
    }
  }

  &_secondary-color {
    background-color: $button-secondary-color;
    color: $button-secondary-font-color;

    &:hover,
    &:active {
      background-color: $hover-button-secondary-color;
      color: $hover-button-secondary-font-color;
    }
  }
}
</style>
