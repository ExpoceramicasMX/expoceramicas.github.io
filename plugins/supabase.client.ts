import { createClient, type SupabaseClient } from '@supabase/supabase-js'

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()
  const url = config.public.supabaseUrl
  const key = config.public.supabaseAnonKey

  if (!url || !key) {
    if (process.dev) {
      console.warn('[Supabase] Falta NUXT_PUBLIC_SUPABASE_URL o NUXT_PUBLIC_SUPABASE_ANON_KEY')
    }
    return
  }

  const supabase = createClient(url, key)
  nuxtApp.provide('supabase', supabase)
})

declare module '#app' {
  interface NuxtApp {
    $supabase: SupabaseClient
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $supabase: SupabaseClient
  }
}