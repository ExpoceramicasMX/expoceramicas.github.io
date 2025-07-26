<script setup lang="ts">
const { user, isLoggedIn, logout } = useAuthStore()
const { totalItems } = useCartStore()

const navigation = [
  { name: 'Home', to: '/' },
  { name: 'Products', to: '/products' },
]

const userNavigation = computed(() => {
  if (isLoggedIn.value) {
    return [
      { name: 'Profile', to: '/profile' },
      { name: 'Orders', to: '/orders' },
      { name: 'Logout', action: logout }
    ]
  }
  return [
    { name: 'Login', to: '/auth/login' },
    { name: 'Register', to: '/auth/register' }
  ]
})
</script>

<template>
  <header class="bg-white shadow-sm border-b">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center">
          <h1 class="text-2xl font-bold text-gray-900">Expoceramicas</h1>
        </NuxtLink>

        <!-- Navigation -->
        <nav class="hidden md:flex space-x-8">
          <NuxtLink 
            v-for="item in navigation" 
            :key="item.name"
            :to="item.to"
            class="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors"
            active-class="text-blue-600 font-semibold"
          >
            {{ item.name }}
          </NuxtLink>
        </nav>

        <!-- Right side -->
        <div class="flex items-center space-x-4">
          <!-- Cart -->
          <NuxtLink to="/cart" class="relative p-2 text-gray-700 hover:text-gray-900">
            <UIcon name="i-heroicons-shopping-bag" class="w-6 h-6" />
            <span 
              v-if="totalItems > 0"
              class="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
            >
              {{ totalItems }}
            </span>
          </NuxtLink>

          <!-- User Menu -->
          <div class="relative">
            <UButton 
              v-if="!isLoggedIn"
              to="/auth/login"
              variant="ghost" 
              label="Login"
            />
            <UDropdown v-else :items="[userNavigation]" :popper="{ placement: 'bottom-end' }">
              <UButton 
                variant="ghost" 
                :label="user?.name || 'Account'"
                trailing-icon="i-heroicons-chevron-down-20-solid"
              />
            </UDropdown>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>