// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint', '@nuxt/ui', '@nuxt/image'],
  css: ['~/app/assets/css/main.css'],
  
  // Static site generation for GitHub Pages
  nitro: {
    prerender: {
      routes: ['/']
    }
  },
  
  // GitHub Pages deployment configuration
  // For user/organization sites (username.github.io), baseURL should be '/'
  app: {
    baseURL: '/',
    buildAssetsDir: 'assets/'
  },
  
  // SSR configuration for static generation
  ssr: true,
  
  ui: {
    prefix: 'Nuxt'
  }
})