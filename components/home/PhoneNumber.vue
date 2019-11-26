<template lang="pug">
    a(:href="phoneText")
      .phone
        .phone__icon
        .phone__number {{phoneNumber}}
</template>
<script>
export default {
  name: 'PhoneNumber',
  // eslint-disable-next-line vue/require-prop-types
  props: ['phoneNumber'],
  computed: {
    phoneText() {
      return 'tel: ' + this.phoneNumber.replace(/[()\s-]/g, '')
    }
  }
}
</script>
<style lang="scss">
.phone {
  display: flex;
  justify-content: flex-start;
  align-items: center;

  &__icon {
    background-image: url('~assets/images/phone.svg');
    background-size: contain;
    background-repeat: no-repeat;
    width: 1em;
    height: 1em;
  }

  &__number {
  }
}
</style>
