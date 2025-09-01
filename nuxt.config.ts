// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  
  modules: [
    '@nuxtjs/google-fonts',
    '@vueuse/nuxt',
    '@pinia/nuxt',
    '@nuxt/image',
    '@nuxtjs/device',
    '@nuxtjs/color-mode'
  ],
  
  css: [
    'bootstrap/dist/css/bootstrap.min.css',
    '@fortawesome/fontawesome-free/css/all.min.css',
    'aos/dist/aos.css',
    'swiper/css',
    'swiper/css/navigation',
    'swiper/css/pagination',
    'assets/css/main.css'
  ],
  
  plugins: [
    '~/plugins/bootstrap.js',
    '~/plugins/aos.client.js',
    '~/plugins/swiper.client.js'
  ],
  
  googleFonts: {
    families: {
      Inter: [300, 400, 500, 600, 700],
      Poppins: [300, 400, 500, 600, 700]
    }
  },
  
  colorMode: {
    preference: 'light',
    fallback: 'light',
    classSuffix: ''
  },
  
  image: {
    quality: 80,
    format: ['webp']
  }

  
})