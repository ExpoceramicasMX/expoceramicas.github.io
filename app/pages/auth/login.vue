<script setup lang="ts">
definePageMeta({
  layout: 'web'
})

const { login } = useAuthStore()
const route = useRoute()

const form = reactive({
  email: '',
  password: ''
})

const loading = ref(false)
const error = ref('')

const handleLogin = async () => {
  loading.value = true
  error.value = ''
  
  try {
    const success = login(form.email, form.password)
    
    if (success) {
      const redirect = route.query.redirect as string || '/'
      await navigateTo(redirect)
    } else {
      error.value = 'Invalid email or password'
    }
  } catch (err) {
    error.value = 'An error occurred during login'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <h2 class="mt-6 text-center text-3xl font-bold text-gray-900">
        Sign in to your account
      </h2>
      <p class="mt-2 text-center text-sm text-gray-600">
        Or
        <NuxtLink to="/auth/register" class="font-medium text-blue-600 hover:text-blue-500">
          create a new account
        </NuxtLink>
      </p>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form @submit.prevent="handleLogin" class="space-y-6">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <div class="mt-1">
              <UInput
                id="email"
                v-model="form.email"
                type="email"
                required
                placeholder="Enter your email"
                :disabled="loading"
              />
            </div>
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div class="mt-1">
              <UInput
                id="password"
                v-model="form.password"
                type="password"
                required
                placeholder="Enter your password"
                :disabled="loading"
              />
            </div>
          </div>

          <UAlert 
            v-if="error"
            color="red"
            variant="soft"
            :title="error"
            class="mb-4"
          />

          <div>
            <UButton
              type="submit"
              :loading="loading"
              color="blue"
              size="lg"
              block
            >
              Sign in
            </UButton>
          </div>
        </form>

        <div class="mt-6">
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-300" />
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-2 bg-white text-gray-500">Demo Credentials</span>
            </div>
          </div>

          <div class="mt-4 p-4 bg-gray-50 rounded-md">
            <p class="text-sm text-gray-600 mb-2">For demo purposes, use any email and password:</p>
            <p class="text-xs text-gray-500">Email: demo@example.com</p>
            <p class="text-xs text-gray-500">Password: password</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>