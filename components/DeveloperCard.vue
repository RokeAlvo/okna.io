<template lang="pug">
  .developer-card(@mouseenter="isHover=true" @mouseleave="isHover=false")
    img.developer-card__logo(:src="developer.logoUrl" :alt="'Логотип '+developer.developerName")
    h3.developer-card__name {{ developer.developerName }}
    .developer-card__separator
    .developer-card__label-reliable(v-if="developer.isReliable") Надежный
    .developer-card__description-list
      p.developer-card__description(
        v-for="(description, index) in developer.developerDescriptions" :key="index") {{ description }}
    p.developer-card__button(:class="{'developer-card__button_hover': isHover}") {{ developer.developerOffer }}
</template>
<style lang="sass">
.developer-card
  padding: 30px 20px
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center
  background: #FDFDFD
  box-shadow: 0px 8px 15px rgba(66, 72, 77, 0.1)
  border-radius: 8px
  cursor: pointer
  @media screen and (min-width: 768px)
    padding: 30px 40px
    align-items: flex-start
    position: relative
  @media screen and (min-width: 1200px)
    max-width: 590px
    min-width: 590px

  .developer-card__logo
    object-fit: cover
    max-width: 100%
    max-height: 60px
    min-height: 60px
    margin-bottom: 30px
    @media screen and (min-width: 768px)
      margin-bottom: 0

  .developer-card__name
    font-weight: bold
    font-size: 20px
    line-height: 24px
    text-align: center
    letter-spacing: 0.1px
    color: rgba(#5A5863, 0.9)
    margin-bottom: 16px
    @media screen and (min-width: 768px)
      font-size: 26px
      min-height: 74px
      max-height: 74px
      display: flex
      flex-direction: column
      justify-content: flex-end
  .developer-card__separator
    width: 100%
    min-height: 1px
    background-color: rgba(#5A5863, 0.1)
    margin-bottom: 5px
  .developer-card__label-reliable
    width: 109px
    height: 24px
    background: #60CE78
    border-radius: 2px
    font-weight: 600
    font-size: 12px
    line-height: 24px
    text-align: center
    letter-spacing: 0.1px
    color: #FDFDFD
    margin: 18px 0 36px 0
    @media screen and (min-width: 768px)
      position: absolute
      right: 0
      top: 0
      margin: 30px 40px 0 0
  .developer-card__description-list
    margin-bottom: 36px
    @media screen and (min-width: 768px)
      margin: 0
      height: 114px
      display: flex
      flex-direction: column
      justify-content: flex-end
    @media screen and (min-width: 1200px)
      max-width: 250px
  .developer-card__description
    font-weight: 500
    font-size: 14px
    line-height: 140%
    text-align: center
    letter-spacing: 0.1px
    color: rgba(#5A5863, 0.7)
    padding-bottom: 16px
    @media screen and (min-width: 768px)
      text-align: left
      &:last-of-type
        padding-bottom: 0

  .developer-card__button
    background: #F4F4F5
    border-radius: 30px
    min-height: 50px
    min-width: 240px
    font-weight: 500
    font-size: 14px
    line-height: 20px
    display: flex
    align-items: center
    justify-content: center
    text-align: center
    letter-spacing: 0.1px
    color: rgba(#5A5863, 0.8)
    @media screen and (min-width: 768px)
      position: absolute
      bottom: 0
      right: 0
      margin: 0 40px 30px 0

    &_hover
      background: #60CE78
      color: #FDFDFD
</style>
<script>
export default {
  props: {
    developer: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      isHover: false
    }
  }
}
</script>
