<template>
  <div class="not-found">
    <a :href="linkMain" class="link-logo">
      <img src="/images/logo.svg" />
    </a>
    <div class="not-found__content">
      <div class="nf-img-wrapper">
        <img src="/images/404/404.svg" />
      </div>
      <div class="nf-title">Такой страницы больше нет</div>
      <div class="nf-text">Давайте попробуем сначала</div>
      <a :href="linkMain" class="nf-button">
        <ButtonRC
          :size="'m'"
          :value="'main'"
          :text="'Перейти на главную'"
        ></ButtonRC>
      </a>
    </div>
  </div>
</template>

<script>
import ButtonRC from '@/components/common-ui/ButtonRC'
export default {
  components: {
    ButtonRC
  },
  data() {
    return {
      linkMain:
        window.location.origin + '/' + window.location.pathname.split('/')[1]
    }
  }
}
</script>

<style lang="scss">
.not-found {
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: 999999;
  background: url('/images/404/dog.jpg') bottom no-repeat,
    linear-gradient(
      90deg,
      #f2f2f2 0%,
      #f2f2f2 16.29%,
      #e0dcd9 90.93%,
      #e0dcd9 100%
    );
  background-size: contain;
  display: flex;
  align-items: center;
  font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  .main-btn {
    letter-spacing: 0.4px;
  }
  &__content {
    display: flex;
    flex-direction: column;
    margin-left: 30%;
    align-items: center;
    .nf-title {
      font-size: 22px;
      line-height: 27px; /* identical to box height */
      text-transform: uppercase;
      color: #5a5863;
      opacity: 0.7;
      margin: 10px 0 60px;
    }
    .nf-text {
      font-weight: 500;
      font-size: 20px;
      line-height: 24px;
      color: #5a5863;
      opacity: 0.9;
      margin-bottom: 25px;
    }
  }
}
.link-logo {
  position: fixed;
  left: 40px;
  top: 25px;
}
@media (max-width: 1550px) {
  .not-found__content {
    margin-left: 10%;
  }
}
@media (max-width: 769px) {
  .not-found__content {
    margin-left: 0%;
  }
  .not-found {
    justify-content: center;
    background: linear-gradient(
      90deg,
      #f2f2f2 0%,
      #f2f2f2 16.29%,
      #e0dcd9 90.93%,
      #e0dcd9 100%
    );
  }
  .link-logo {
    left: unset;
  }
}
@media (max-width: 450px) {
  .nf-img-wrapper img {
    width: 280px;
  }
  .not-found__content .nf-title {
    font-size: 16px;
    line-height: 20px;
  }
  .not-found__content .nf-text {
    font-weight: 400;
    margin-bottom: 20px;
    font-size: 16px;
    line-height: 20px;
  }
  .not-found__content {
    margin-left: 0%;
  }
  .not-found {
    justify-content: center;
    background: linear-gradient(
      90deg,
      #f2f2f2 0%,
      #f2f2f2 16.29%,
      #e0dcd9 90.93%,
      #e0dcd9 100%
    );
  }
  .link-logo {
    left: unset;
  }
}
</style>
