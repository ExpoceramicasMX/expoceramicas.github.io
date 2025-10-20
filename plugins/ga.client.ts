export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()
  const id = config.public.gaId

  if (!id) {
    if (process.dev) {
      console.warn('[GA4] Missing NUXT_PUBLIC_GA_ID. Skipping analytics.')
    }
    return
  }

  // Load gtag script
  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`
  document.head.appendChild(script)

  // Initialize dataLayer and gtag
  ;(window as any).dataLayer = (window as any).dataLayer || []
  function gtag(...args: any[]) { (window as any).dataLayer.push(args) }
  ;(window as any).gtag = gtag

  gtag('js', new Date())
  // Disable automatic page_view to control via router hook
  gtag('config', id, { send_page_view: false })

  // Track initial page
  function sendPageView() {
    gtag('event', 'page_view', {
      page_title: document.title,
      page_location: window.location.href,
      page_path: window.location.pathname + window.location.search,
    })
  }

  // Send pageview after each navigation
  nuxtApp.hook('page:finish', () => {
    sendPageView()
  })

  // Also send once on load
  if (document.readyState === 'complete') {
    sendPageView()
  } else {
    window.addEventListener('load', sendPageView, { once: true })
  }
})