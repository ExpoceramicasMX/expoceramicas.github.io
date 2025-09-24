// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  
  app: {
    head: {
      title: 'Expoceramcias', // default fallback title
      htmlAttrs: {
        lang: 'en',
      },
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ]
    }
  },

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
    'assets/css/main.css',
    'assets/css/swiper.css',
    'assets/css/all.min.css',
    'assets/css/aos.css'
  ],
  
  plugins: [
    '~/plugins/bootstrap.js',
    '~/plugins/aos.client.js',
    '~/plugins/swiper.client.js',
    '~/plugins/popper.min.js'
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
  },

 runtimeConfig: {
    // Variables privadas (solo servidor)
    woocommerceUrl: process.env.WOOCOMMERCE_URL,
    woocommerceKey: process.env.WOOCOMMERCE_KEY,
    woocommerceSecret: process.env.WOOCOMMERCE_SECRET,
    public: {
      // Variables públicas (cliente y servidor)
      apiBase: '/api'
    }
  },

    nitro: {
    experimental: {
      wasm: true
    }
  },
  vite: {
    define: {
      global: 'globalThis',
    },
    optimizeDeps: {
      include: ['@woocommerce/woocommerce-rest-api']
    },
    build: {
      rollupOptions: {
        external: ['form-data']
      }
    }
  },

  
})