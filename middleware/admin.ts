import type { SupabaseClient } from '@supabase/supabase-js'
export default defineNuxtRouteMiddleware(async (to) => {
  const nuxtApp = useNuxtApp()
  const supabase = nuxtApp.$supabase as SupabaseClient

  try {
    const { data } = await supabase.auth.getUser()
    const user = data?.user
    const role = user?.user_metadata?.role
    if (!user || role !== 'admin') {
      return navigateTo('/')
    }
  } catch (e) {
    return navigateTo('/')
  }
})