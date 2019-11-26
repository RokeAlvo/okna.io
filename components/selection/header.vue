<template>
  <div class="header">
    <div class="logo"></div>
    <div class="favorites">
      <div class="star">
        <Star />
      </div>
      <div class="favorites__text">
        Избранное:
        <span class="favorites__num">0</span>
      </div>
    </div>
  </div>
</template>

<script>
import Star from './icons/iconStar.vue'
export default {
  components: {
    Star
  },
  data() {
    return {
      isFavorites: false
    }
  },

  mounted() {
    window.addEventListener('scroll', this.stickyHead)
  },
  methods: {
    stickyHead() {
      if (document.documentElement.scrollTop > 1500) {
        this.isFavorites = true
      } else if (document.documentElement.scrollTop < 2700) {
        this.isFavorites = false
      }

      // console.log(document.documentElement.scrollTop);
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  background: #ffffff;
  box-shadow: 0px 8px 15px rgba(129, 134, 138, 0.1);
  height: 50px;
  display: flex;
}

.logo {
  background-image: url('/img/lightLogo.svg');
  background-repeat: no-repeat;
  height: 26px;
  width: 85px;
  margin: 10px auto 10px 10px;
}

.favorites {
  display: flex;
  align-items: center;
  margin-right: 10px;

  &__text {
    font-size: 14px;
    line-height: 25px;
    letter-spacing: 0.1px;

    color: #5a5863;
  }
}

.star {
  margin-right: 6px;
}
</style>
