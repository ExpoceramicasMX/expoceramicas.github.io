<script setup lang="ts">
definePageMeta({
  layout: 'web',
  middleware: 'auth'
})

const { user, updateProfile } = useAuthStore()

const form = reactive({
  name: user.value?.name || '',
  email: user.value?.email || '',
  phone: user.value?.phone || '',
  address: user.value?.address || ''
})

const loading = ref(false)
const success = ref(false)

const updateUserProfile = async () => {
  loading.value = true
  success.value = false
  
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    updateProfile({
      name: form.name,
      email: form.email,
      phone: form.phone,
      address: form.address
    })
    
    success.value = true
    setTimeout(() => {
      success.value = false
    }, 3000)
  } catch (error) {
    console.error('Profile update failed:', error)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-8">My Profile</h1>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Profile Navigation -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-lg shadow-sm p-6">
            <div class="text-center mb-6">
              <div class="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <UIcon name="i-heroicons-user" class="w-10 h-10 text-blue-600" />
              </div>
              <h2 class="text-lg font-medium text-gray-900">{{ user?.name }}</h2>
              <p class="text-gray-600">{{ user?.email }}</p>
            </div>
            
            <nav class="space-y-2">
              <a href="#profile" class="flex items-center px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-md">
                <UIcon name="i-heroicons-user" class="w-5 h-5 mr-3" />
                Profile Information
              </a>
              <NuxtLink to="/orders" class="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md">
                <UIcon name="i-heroicons-shopping-bag" class="w-5 h-5 mr-3" />
                Order History
              </NuxtLink>
            </nav>
          </div>
        </div>

        <!-- Profile Form -->
        <div class="lg:col-span-2">
          <div class="bg-white rounded-lg shadow-sm p-6">
            <div class="flex items-center justify-between mb-6">
              <h2 class="text-lg font-medium text-gray-900">Profile Information</h2>
              <UAlert 
                v-if="success"
                color="green"
                variant="soft"
                title="Profile updated successfully!"
              />
            </div>

            <form @submit.prevent="updateUserProfile" class="space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label for="name" class="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <UInput
                    id="name"
                    v-model="form.name"
                    type="text"
                    required
                    :disabled="loading"
                  />
                </div>

                <div>
                  <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <UInput
                    id="email"
                    v-model="form.email"
                    type="email"
                    required
                    :disabled="loading"
                  />
                </div>

                <div>
                  <label for="phone" class="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <UInput
                    id="phone"
                    v-model="form.phone"
                    type="tel"
                    :disabled="loading"
                  />
                </div>

                <div class="md:col-span-2">
                  <label for="address" class="block text-sm font-medium text-gray-700 mb-2">
                    Address
                  </label>
                  <UTextarea
                    id="address"
                    v-model="form.address"
                    rows="3"
                    :disabled="loading"
                  />
                </div>
              </div>

              <div class="flex justify-end space-x-3">
                <UButton
                  type="button"
                  variant="outline"
                  :disabled="loading"
                  @click="Object.assign(form, { name: user?.name || '', email: user?.email || '', phone: user?.phone || '', address: user?.address || '' })"
                >
                  Reset
                </UButton>
                <UButton
                  type="submit"
                  :loading="loading"
                  color="blue"
                >
                  Update Profile
                </UButton>
              </div>
            </form>
          </div>

          <!-- Account Settings -->
          <div class="bg-white rounded-lg shadow-sm p-6 mt-6">
            <h2 class="text-lg font-medium text-gray-900 mb-4">Account Settings</h2>
            
            <div class="space-y-4">
              <div class="flex items-center justify-between py-3 border-b">
                <div>
                  <h3 class="text-sm font-medium text-gray-900">Change Password</h3>
                  <p class="text-sm text-gray-600">Update your account password</p>
                </div>
                <UButton variant="outline" size="sm">
                  Change
                </UButton>
              </div>

              <div class="flex items-center justify-between py-3 border-b">
                <div>
                  <h3 class="text-sm font-medium text-gray-900">Email Notifications</h3>
                  <p class="text-sm text-gray-600">Receive order updates and promotions</p>
                </div>
                <UToggle />
              </div>

              <div class="flex items-center justify-between py-3">
                <div>
                  <h3 class="text-sm font-medium text-gray-900">Delete Account</h3>
                  <p class="text-sm text-gray-600">Permanently delete your account and data</p>
                </div>
                <UButton color="red" variant="outline" size="sm">
                  Delete
                </UButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>