<template>
  <div class="select">
    <Header />

    <CTA />
    <Advantages />

    <Selection />
    <Favorites />
    <Steps />
    <isQuestion />
    <Footer />
  </div>
</template>

<script>
import Header from './header.vue'
import CTA from './sta.vue'
import Advantages from './advantages.vue'
import Selection from './selection.vue'
import Favorites from './favorites.vue'
import Steps from './steps.vue'
import isQuestion from './isQuestion.vue'
import Footer from './footer.vue'
export default {
  components: {
    Header,
    CTA,
    Advantages,

    Selection,
    Favorites,
    Steps,
    isQuestion,
    Footer
  }
}
</script>

<style lang="scss">
.select {
  //   max-width: 320px;
  margin: 0 auto;
}
.button {
  padding: 14px 47px;

  box-shadow: 0px 10px 20px rgba(66, 72, 77, 0.2),
    0px 9px 40px rgba(96, 189, 30, 0.2);
  border-radius: 30px;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  letter-spacing: 0.1px;
}

.button--green {
  width: 250px;
  margin: 0 auto;
  margin-top: 37px;
  margin-bottom: 110px;
  background: #5dbf16;
  color: #fdfdfd;
}
</style>
