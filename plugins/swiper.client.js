import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules'

export default defineNuxtPlugin((nuxtApp) => {
  if (process.client) {
    nuxtApp.vueApp.component('Swiper', Swiper)
    nuxtApp.vueApp.component('SwiperSlide', SwiperSlide)
  }
})

export { Navigation, Pagination, Autoplay, EffectFade }