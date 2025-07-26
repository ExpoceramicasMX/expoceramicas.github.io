<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div class="bg-white rounded-lg shadow-sm p-8 text-center">
        <!-- Success Icon -->
        <div class="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
          <svg class="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>

        <!-- Success Message -->
        <h1 class="text-3xl font-bold text-gray-900 mb-4">Order Confirmed!</h1>
        <p class="text-lg text-gray-600 mb-8">
          Thank you for your purchase. Your order has been successfully placed.
        </p>

        <!-- Order Details -->
        <div v-if="order" class="bg-gray-50 rounded-lg p-6 mb-8">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
            <div>
              <h3 class="text-sm font-medium text-gray-500 uppercase tracking-wide">Order Number</h3>
              <p class="mt-1 text-lg font-semibold text-gray-900">{{ order.id }}</p>
            </div>
            <div>
              <h3 class="text-sm font-medium text-gray-500 uppercase tracking-wide">Order Date</h3>
              <p class="mt-1 text-lg font-semibold text-gray-900">
                {{ new Date(order.createdAt).toLocaleDateString() }}
              </p>
            </div>
            <div>
              <h3 class="text-sm font-medium text-gray-500 uppercase tracking-wide">Total Amount</h3>
              <p class="mt-1 text-lg font-semibold text-gray-900">${{ order.total.toFixed(2) }}</p>
            </div>
            <div>
              <h3 class="text-sm font-medium text-gray-500 uppercase tracking-wide">Tracking Number</h3>
              <p class="mt-1 text-lg font-semibold text-gray-900">{{ order.trackingNumber }}</p>
            </div>
          </div>
        </div>

        <!-- Order Items -->
        <div v-if="order" class="mb-8">
          <h3 class="text-lg font-medium text-gray-900 mb-4">Order Items</h3>
          <div class="space-y-4">
            <div
              v-for="item in order.items"
              :key="item.product.id"
              class="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div class="flex items-center space-x-4">
                <img
                  :src="item.product.image"
                  :alt="item.product.name"
                  class="h-16 w-16 rounded-md object-cover"
                />
                <div class="text-left">
                  <h4 class="font-medium text-gray-900">{{ item.product.name }}</h4>
                  <p class="text-sm text-gray-600">{{ item.product.category }}</p>
                  <p class="text-sm text-gray-600">Quantity: {{ item.quantity }}</p>
                </div>
              </div>
              <span class="font-semibold text-gray-900">
                ${{ (item.product.price * item.quantity).toFixed(2) }}
              </span>
            </div>
          </div>
        </div>

        <!-- Next Steps -->
        <div class="bg-blue-50 rounded-lg p-6 mb-8">
          <h3 class="text-lg font-medium text-blue-900 mb-2">What's Next?</h3>
          <ul class="text-sm text-blue-800 space-y-1">
            <li>• You'll receive an email confirmation shortly</li>
            <li>• Your order will be processed within 1-2 business days</li>
            <li>• Shipping typically takes 3-5 business days</li>
            <li>• You can track your order using the tracking number above</li>
          </ul>
        </div>

        <!-- Action Buttons -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <NuxtLink
            to="/products"
            class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            Continue Shopping
          </NuxtLink>
          <NuxtLink
            to="/orders"
            class="inline-flex items-center px-6 py-3 border border-blue-600 text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50"
          >
            View All Orders
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'web'
})

const route = useRoute()
const { orders } = useOrderStore()

// Get order from query parameter
const orderId = route.query.orderId as string
const order = computed(() => {
  if (orderId) {
    return orders.value.find(o => o.id === orderId)
  }
  return null
})

// Redirect if no order found
if (!order.value && orderId) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Order not found'
  })
}

// SEO
useHead({
  title: 'Order Confirmed - Expo Ceramicas',
  meta: [
    { name: 'description', content: 'Your order has been successfully placed. Thank you for shopping with us!' }
  ]
})
</script>