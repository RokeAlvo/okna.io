<template lang="pug">
  .input-text-search
    .input-text-search__input-field(:class="hoverClass")
      input(
        ref="input"
        type="text"
        :placeholder="placeholder" 
        :value='value'
        v-on:input="$emit('input', $event.target.value)"
        @focus="hoverClass='input-text-search__input-field_hover'"
        @blur="hoverClass=''")
      <svg @click="onClickFromSearchButton" class="empty-color" v-if="value===''" width="22" height="21" viewBox="0 0 22 21" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M9 16C12.866 16 16 12.866 16 9C16 5.13401 12.866 2 9 2C5.13401 2 2 5.13401 2 9C2 12.866 5.13401 16 9 16ZM9 18C13.9706 18 18 13.9706 18 9C18 4.02944 13.9706 0 9 0C4.02944 0 0 4.02944 0 9C0 13.9706 4.02944 18 9 18Z" />
        <path fill-rule="evenodd" clip-rule="evenodd" d="M14.4379 13.8314C14.8284 13.4408 15.4616 13.4408 15.8521 13.8314L20.8995 18.8787C21.29 19.2692 21.29 19.9024 20.8995 20.2929C20.5089 20.6834 19.8758 20.6834 19.4852 20.2929L14.4379 15.2456C14.0474 14.8551 14.0474 14.2219 14.4379 13.8314Z" />
      </svg>
      <svg @click="onClickFromClearButton" class="active-color" v-else width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 17L9 9.08432L0.999999 1"  stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M17 17L9 9.08432L17 1"  stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    .input-text-search__search-result
</template>

<style lang="sass" scoped>
$bg: #fdfdfd
$border-color: rgba(167, 203, 213, 0.1)
$border-color-hover: rgba($border-color, 0.3)
$shadow: inset 0px 0px 4px rgba(90, 88, 99, 0.15)
$font-color: #5A5863

.input-text-search
  width: 100%

  &__input-field
    border: 1px solid $border-color
    box-shadow: $shadow
    border-radius: 100px
    padding: 0 20px
    background: $bg
    height: 50px
    display: flex
    align-items: center
    width: 100%

    &:hover,
    &:focus,
    &:active,
    &_hover
      border-color: $border-color-hover


    input
      border: 0
      margin: auto
      font-weight: normal
      font-size: 14px
      line-height: 25px
      display: flex
      align-items: center
      letter-spacing: 0.1px
      color: rgba($font-color, 0.9)
      width: 100%

      &::placeholder
        font-weight: normal
        font-size: 14px
        line-height: 25px
        display: flex
        align-items: center
        letter-spacing: 0.1px
        color: rgba($font-color, 0.5)
        text-overflow: ellipsis
    svg
      margin-left: 10px
      cursor: pointer

    .empty-color
      fill: rgba($font-color, 0.5)

    .active-color
      stroke: rgba($font-color, 0.9)
</style>

<script>
export default {
  props: {
    placeholder: {
      type: String,
      default: 'Placeholder'
    },
    value: {
      type: [String, Number],
      default: ''
    }
  },
  data() {
    return {
      hoverClass: '',
      notEmpty: false
    }
  },
  methods: {
    onClickFromClearButton() {
      this.$emit('input', '')
    },
    onClickFromSearchButton() {
      this.$refs.input.focus()
    }
  }
}
</script>
