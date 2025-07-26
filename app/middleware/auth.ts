export default defineNuxtRouteMiddleware((to, from) => {
  const { isLoggedIn } = useAuthStore()
  
  if (!isLoggedIn.value) {
    return navigateTo(`/auth/login?redirect=${to.path}`)
  }
})