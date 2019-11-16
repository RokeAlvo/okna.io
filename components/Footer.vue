<template lang="pug">
  footer.footer
    .footer__main
      .footer__logo
        Logo
      .footer__city.nav
        .nav__item.nav__item_selectable(@click='showCity') Новосибирск
      nav.footer__nav
        ul.nav
          li.nav__item.nav__item_active
            a(href="#") Главная
          li.nav__item 
            a(href="#") Новостройки
          li.nav__item 
            a(href="#") Застройщики
          li.nav__item 
            a(href="#") Ипотека
      .footer__phone
        a(href="tel: +73838952664")
          .phone
            .phone__icon
            .phone__number +7 (383) 895-26-64
    .footer__aside
      router-link(to="/oferta")
        p.footer__policy Политика конфиденциальности
      ul.footer__social
        li
          <svg width="10" height="20" viewBox="0 0 10 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path opacity="0.8" fill-rule="evenodd" clip-rule="evenodd" d="M9.23454 3.22365C9.23454 3.22365 6.9636 2.98622 6.39511 3.89533C6.08394 4.39206 6.2874 5.6201 6.25748 6.66667C7.25083 6.66667 8.28009 6.66667 9.27344 6.66667C9.01912 7.88819 8.81865 8.94386 8.63015 9.9998C7.77144 9.9998 6.22457 9.9998 6.22457 9.9998V20C6.22457 20 3.38514 20 2.04771 20C2.0507 16.9197 2.04771 13.3207 2.04771 10.0404C1.40143 10.0404 0.919714 10.0404 0.273438 10.0404C0.273438 8.88762 0.29139 7.81946 0.29139 6.66667C0.919714 6.66667 1.41639 6.66667 2.04771 6.66667C2.13747 4.36421 2.15243 2.31454 3.24751 1.15238C4.47723 -0.15036 5.6501 0.00584403 9.23454 0.00584403C9.23454 1.15863 9.23454 3.22365 9.23454 3.22365Z" fill="#5DBF16"/>
          </svg>
        li
          <svg width="28" height="15" viewBox="0 0 28 15" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path opacity="0.8" fill-rule="evenodd" clip-rule="evenodd" d="M13.4835 14.9372H15.0974C15.0974 14.9372 15.5849 14.8851 15.8338 14.6238C16.0628 14.3839 16.0555 13.9335 16.0555 13.9335C16.0555 13.9335 16.024 11.8246 17.0291 11.514C18.0198 11.2081 19.2921 13.5522 20.6406 14.4535C21.6603 15.1357 22.4352 14.9861 22.4352 14.9861L26.0409 14.9372C26.0409 14.9372 27.9271 14.824 27.0328 13.3798C26.9595 13.2617 26.5119 12.3115 24.3519 10.3589C22.091 8.31539 22.3938 8.64592 25.1172 5.11103C26.7758 2.95826 27.4389 1.64396 27.2318 1.08105C27.0342 0.544904 25.8144 0.686614 25.8144 0.686614L21.7545 0.711244C21.7545 0.711244 21.4536 0.671265 21.2304 0.801195C21.0123 0.928627 20.8719 1.22561 20.8719 1.22561C20.8719 1.22561 20.2293 2.89151 19.3724 4.30825C17.5646 7.29772 16.8417 7.45549 16.5463 7.26988C15.859 6.83725 16.0306 5.53188 16.0306 4.60452C16.0306 1.7075 16.4818 0.499572 15.152 0.186883C14.7107 0.0830096 14.3859 0.0144748 13.2573 0.00340934C11.8087 -0.0112257 10.5826 0.00769234 9.88841 0.338944C9.42657 0.559183 9.07029 1.04999 9.28728 1.07819C9.55559 1.11317 10.1633 1.23775 10.4855 1.66502C10.9015 2.21615 10.8869 3.45406 10.8869 3.45406C10.8869 3.45406 11.1259 6.86438 10.3286 7.28808C9.78138 7.57864 9.0307 6.98539 7.41901 4.27327C6.59319 2.88401 5.9697 1.3484 5.9697 1.3484C5.9697 1.3484 5.84947 1.06141 5.63504 0.907924C5.3748 0.721952 5.01119 0.662699 5.01119 0.662699L1.15331 0.687328C1.15331 0.687328 0.574175 0.703035 0.361579 0.94826C0.172443 1.16636 0.346551 1.61755 0.346551 1.61755C0.346551 1.61755 3.36687 8.49886 6.78672 11.9666C9.9225 15.146 13.4835 14.9372 13.4835 14.9372Z" fill="#5DBF16"/>
          </svg>
        li
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path opacity="0.8" fill-rule="evenodd" clip-rule="evenodd" d="M5.62765 0H14.3719C16.073 0 16.866 0.153135 17.6891 0.593359C18.4281 0.988573 19.011 1.57152 19.4062 2.31051C19.8464 3.13366 19.9996 3.92665 19.9996 5.62777V14.3722C19.9996 16.0733 19.8464 16.8663 19.4062 17.6895C19.011 18.4285 18.4281 19.0114 17.6891 19.4066C16.866 19.8469 16.073 20 14.3719 20H5.62765C3.92657 20 3.13359 19.8469 2.31046 19.4066C1.57149 19.0114 0.988552 18.4285 0.593346 17.6895C0.153132 16.8663 0 16.0733 0 14.3722V5.62777C0 3.92665 0.153132 3.13366 0.593346 2.31051C0.988552 1.57152 1.57149 0.988573 2.31046 0.593359C3.13359 0.153135 3.92657 0 5.62765 0ZM16.1109 3.33317C17.0314 3.33317 17.7775 4.07934 17.7775 4.99978C17.7775 5.92022 17.0314 6.66638 16.1109 6.66638C15.1905 6.66638 14.4443 5.92022 14.4443 4.99978C14.4443 4.07934 15.1905 3.33317 16.1109 3.33317ZM14.4432 9.99956C14.4432 7.54506 12.4535 5.55529 9.99896 5.55529C7.54446 5.55529 5.55469 7.54506 5.55469 9.99956C5.55469 12.4541 7.54446 14.4438 9.99896 14.4438C12.4535 14.4438 14.4432 12.4541 14.4432 9.99956Z" fill="#5DBF16"/>
          </svg>

</template>
<script>
export default {
  methods: {
    showCity() {
      this.$modal.show('city')
    },
    hideCity() {
      this.$modal.hide('city')
    }
  }
}
</script>
<style lang="scss">
.footer {
  padding: 20px 20px;
  max-width: 1200px;
  margin: auto;

  &__main {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 37px;
    background: $bg-light;
    text-transform: uppercase;

    @media screen and (min-width: $screen-xs) and (max-width: $screen-xl - 1px) {
      flex-direction: column;
      margin: 0;
    }
  }

  &__burger {
    display: none;
    cursor: pointer;
    margin-left: 12px;

    @media screen and (min-width: $screen-xs) and (max-width: $screen-xl - 1px) {
    }
  }

  &__logo {
    // margin-left: 40px;

    @media screen and (min-width: $screen-xs) and (max-width: $screen-xl - 1px) {
      margin-bottom: 66px;
    }
  }

  &__city {
    margin-left: 24px;

    @media screen and (min-width: $screen-xs) and (max-width: $screen-xl - 1px) {
      margin-bottom: 66px;
    }
  }

  &__nav {
    margin-left: 90px;

    @media screen and (min-width: $screen-xs) and (max-width: $screen-xl - 1px) {
      margin: 0;

      ul {
        flex-direction: column;
      }

      li {
        margin: 0;
        margin-bottom: 34px;
      }
    }
  }

  &__phone {
    margin: 0 0 0 auto;

    a,
    a.text:active,
    a.text:hover,
    a.text {
      color: inherit;
      text-decoration: inherit;
    }

    @media screen and (min-width: $screen-xs) and (max-width: $screen-xl - 1px) {
      margin: 49px 0 41px 0;
    }
  }

  &__aside {
    display: flex;
    justify-content: space-between;

    @media screen and (min-width: $screen-xs) and (max-width: $screen-xl - 1px) {
      flex-direction: column;
      align-items: center;
    }
  }

  &__policy {
    font-style: normal;
    font-weight: normal;
    font-size: 1rem;
    line-height: 16/14 * 1em;
    letter-spacing: 0.1px;
    text-decoration-line: underline;
    color: $font-main2-color-50;

    @media screen and (min-width: $screen-xs) and (max-width: $screen-xl - 1px) {
      margin-bottom: 31px;
    }
  }

  &__social {
    display: flex;

    li {
      margin-left: 32px;
      display: flex;
      align-items: center;
    }
  }
}
</style>
