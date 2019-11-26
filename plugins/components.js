import Vue from 'vue'

import VueIziToast from 'vue-izitoast'
import 'izitoast/dist/css/iziToast.css'
import vSelect from 'vue-select'
import vSlider from 'vue-slider-component'
// import VModal from 'vue-js-modal';
import VShowSlide from 'v-show-slide'
import { ContentLoader } from 'vue-content-loader'
import ModalAdaptive from '@/components/home/Modal-adaptive'
import Logo from '@/components/home/Logo'
import Footer from '@/components/home/Footer'
import Button from '@/components/home/Button'
import Star from '@/components/selection/icons/iconStar.vue'
import Whatsup from '@/components/selection/icons/whatsup.vue'
import Viber from '@/components/selection/icons/viber.vue'
import Telegram from '@/components/selection/icons/telegram.vue'
// import Vk from '@/components/selection/icons/vk.vue'
import Icons from '@/components/selection/icons/icons-share.vue'
const VueInputMask = require('vue-inputmask').default

Vue.component('icon-star', Star)
Vue.component('icon-whatsup', Whatsup)
Vue.component('icon-viber', Viber)
Vue.component('icon-telegram', Telegram)
Vue.component('icons-share', Icons)
Vue.component('Button', Button)
Vue.component('Footer', Footer)
Vue.component('Logo', Logo)
Vue.component('ModalAdaptive', ModalAdaptive)
Vue.use(VShowSlide)
Vue.use(VueInputMask)
Vue.use(VueIziToast)
// Vue.use(VModal);
Vue.component('v-select', vSelect)
Vue.component('v-slider', vSlider)
Vue.component('content-loader', ContentLoader)
