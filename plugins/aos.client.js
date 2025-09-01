import AOS from 'aos'

export default defineNuxtPlugin(() => {
  if (process.client) {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
      mirror: false,
      offset: 100
    })
  }
})