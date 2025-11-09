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
      ],
      // Vercel Web Analytics & Speed Insights
      script: [
{ innerHTML: "window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };" },
        { defer: true, src: "/_vercel/insights/script.js" },
        { innerHTML: "window.si = window.si || function () { (window.siq = window.siq || []).push(arguments); };" },
        { defer: true, src: "/_vercel/speed-insights/script.js" }
      ]
    }
  },

  modules: [
    '@nuxtjs/google-fonts',
    '@vueuse/nuxt',
    '@pinia/nuxt',
    '@nuxt/image',
    '@nuxtjs/device',
    '@nuxtjs/color-mode',
    '@nuxtjs/supabase'
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
  
  runtimeConfig: {
    // Variables privadas (solo servidor)
    woocommerceKey: process.env.NUXT_WOOCOMMERCE_KEY,
    woocommerceSecret: process.env.NUXT_WOOCOMMERCE_SECRET,
    // Supabase service role (solo servidor)
    supabaseServiceKey: process.env.SUPABASE_SERVICE_ROLE || '',
    public: {
      // Variables públicas (cliente y servidor)
      woocommerceUrl: process.env.NUXT_PUBLIC_WOOCOMMERCE_URL,
      gaId: process.env.NUXT_PUBLIC_GA_ID,
      // Supabase públicos
      supabaseUrl: process.env.NUXT_PUBLIC_SUPABASE_URL || '',
      supabaseAnonKey: process.env.NUXT_PUBLIC_SUPABASE_ANON_KEY || ''
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