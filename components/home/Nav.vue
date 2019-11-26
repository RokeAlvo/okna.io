<template lang="pug">
   ul.nav
        li.nav__item(:class="{'nav__item_active': pageName==='city'}")
          router-link(:to="'/city'") Главная
        li.nav__item(:class="{'nav__item_active': pageName==='city-novostroyki'}")
          router-link(:to="'/city/novostroyki'") Новостройки
        li.nav__item(:class="{'nav__item_active': pageName==='developers'}")
          router-link(:to="'/city/developers'") Застройщики
        li.nav__item 
          a(href="#") Ипотека
</template>
<script>
export default {
  computed: {
    pageName() {
      const currentRoute = this.$route.path
      const pageName = currentRoute.slice(currentRoute.lastIndexOf('/') + 1)
      return pageName
    }
  }
}
</script>
<style lang="scss">
footer .nav {
  margin: 0;
  @media screen and (min-width: $screen-xs) and (max-width: $screen-xl - 1px) {
    ul {
      flex-direction: column;
    }

    li {
      margin: 0;
      margin-bottom: 34px;
    }
  }
}
</style>
