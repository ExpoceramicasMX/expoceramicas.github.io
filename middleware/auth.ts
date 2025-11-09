import type { SupabaseClient } from '@supabase/supabase-js'
export default defineNuxtRouteMiddleware(async (to) => {
  // Páginas que requieren autenticación
  const protectedRoutes = ['/my-account', '/admin']
  const isProtected = protectedRoutes.some((p) => to.path.startsWith(p))

  if (!isProtected) return

  const nuxtApp = useNuxtApp()
  const supabase = nuxtApp.$supabase as SupabaseClient

  try {
    const { data } = await supabase.auth.getUser()
    const user = data?.user
    if (!user) {
      return navigateTo({ path: '/login', query: { redirect: to.fullPath } })
    }
  } catch (e) {
    return navigateTo({ path: '/login', query: { redirect: to.fullPath } })
  }
})