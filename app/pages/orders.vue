<script setup lang="ts">
definePageMeta({
  layout: 'web',
  middleware: 'auth'
})

const { user } = useAuthStore()
const { getUserOrders } = useOrderStore()

const orders = computed(() => getUserOrders(user.value?.id || ''))

const getStatusColor = (status: string) => {
  switch (status) {
    case 'pending':
      return 'yellow'
    case 'processing':
      return 'blue'
    case 'shipped':
      return 'purple'
    case 'delivered':
      return 'green'
    default:
      return 'gray'
  }
}

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date)
}
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="flex items-center justify-between mb-8">
        <h1 class="text-3xl font-bold text-gray-900">Order History</h1>
        <UButton to="/store" variant="outline">
          Continue Shopping
        </UButton>
      </div>

      <div v-if="orders.length === 0" class="text-center py-12">
        <UIcon name="i-heroicons-shopping-bag" class="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h2 class="text-xl font-medium text-gray-900 mb-2">No orders yet</h2>
        <p class="text-gray-600 mb-6">Start shopping to see your orders here</p>
        <UButton to="/store" size="lg">Browse Products</UButton>
      </div>

      <div v-else class="space-y-6">
        <div 
          v-for="order in orders" 
          :key="order.id"
          class="bg-white rounded-lg shadow-sm overflow-hidden"
        >
          <!-- Order Header -->
          <div class="px-6 py-4 border-b bg-gray-50">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="text-lg font-medium text-gray-900">Order #{{ order.id }}</h3>
                <p class="text-sm text-gray-600">Placed on {{ formatDate(order.createdAt) }}</p>
              </div>
              <div class="text-right">
                <UBadge 
                  :color="getStatusColor(order.status)"
                  variant="soft"
                  size="lg"
                >
                  {{ order.status.charAt(0).toUpperCase() + order.status.slice(1) }}
                </UBadge>
                <p class="text-lg font-semibold text-gray-900 mt-1">${{ order.total.toFixed(2) }}</p>
              </div>
            </div>
          </div>

          <!-- Order Items -->
          <div class="px-6 py-4">
            <div class="space-y-4">
              <div 
                v-for="item in order.items" 
                :key="item.product.id"
                class="flex items-center space-x-4"
              >
                <div class="flex-shrink-0">
                  <NuxtImg 
                    :src="item.product.image" 
                    :alt="item.product.name"
                    class="w-16 h-16 object-cover rounded-lg"
                  />
                </div>
                <div class="flex-1 min-w-0">
                  <h4 class="text-sm font-medium text-gray-900">{{ item.product.name }}</h4>
                  <p class="text-sm text-gray-600">{{ item.product.category }}</p>
                  <p class="text-sm text-gray-600">Quantity: {{ item.quantity }}</p>
                </div>
                <div class="text-right">
                  <p class="text-sm font-medium text-gray-900">
                    ${{ (item.product.price * item.quantity).toFixed(2) }}
                  </p>
                  <p class="text-xs text-gray-500">${{ item.product.price }} each</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Order Footer -->
          <div class="px-6 py-4 border-t bg-gray-50">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm text-gray-600">
                  <span class="font-medium">Shipping Address:</span>
                  {{ order.shippingAddress }}
                </p>
              </div>
              <div class="flex space-x-3">
                <UButton variant="outline" size="sm">
                  View Details
                </UButton>
                <UButton 
                  v-if="order.status === 'delivered'"
                  variant="outline" 
                  size="sm"
                >
                  Reorder
                </UButton>
                <UButton 
                  v-if="order.status === 'shipped'"
                  variant="outline" 
                  size="sm"
                >
                  Track Package
                </UButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>