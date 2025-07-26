<script setup lang="ts">
definePageMeta({
  layout: 'web'
})

const { register } = useAuthStore()

const form = reactive({
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
})

const loading = ref(false)
const error = ref('')

const handleRegister = async () => {
  loading.value = true
  error.value = ''
  
  try {
    if (form.password !== form.confirmPassword) {
      error.value = 'Passwords do not match'
      return
    }

    if (form.password.length < 6) {
      error.value = 'Password must be at least 6 characters'
      return
    }
    
    const success = register(form.email, form.password, form.name)
    
    if (success) {
      await navigateTo('/')
    } else {
      error.value = 'Registration failed. Please try again.'
    }
  } catch (err) {
    error.value = 'An error occurred during registration'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <h2 class="mt-6 text-center text-3xl font-bold text-gray-900">
        Create your account
      </h2>
      <p class="mt-2 text-center text-sm text-gray-600">
        Or
        <NuxtLink to="/auth/login" class="font-medium text-blue-600 hover:text-blue-500">
          sign in to your existing account
        </NuxtLink>
      </p>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form @submit.prevent="handleRegister" class="space-y-6">
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <div class="mt-1">
              <UInput
                id="name"
                v-model="form.name"
                type="text"
                required
                placeholder="Enter your full name"
                :disabled="loading"
              />
            </div>
          </div>

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

          <div>
            <label for="confirmPassword" class="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <div class="mt-1">
              <UInput
                id="confirmPassword"
                v-model="form.confirmPassword"
                type="password"
                required
                placeholder="Confirm your password"
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
              Create Account
            </UButton>
          </div>
        </form>

        <div class="mt-6">
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-300" />
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-2 bg-white text-gray-500">Terms</span>
            </div>
          </div>

          <div class="mt-4 text-center">
            <p class="text-xs text-gray-500">
              By creating an account, you agree to our 
              <a href="#" class="text-blue-600 hover:text-blue-500">Terms of Service</a>
              and 
              <a href="#" class="text-blue-600 hover:text-blue-500">Privacy Policy</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>