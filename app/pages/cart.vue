<script setup lang="ts">
definePageMeta({
  layout: 'web'
})

const { items, totalItems, totalPrice, updateQuantity, removeFromCart, clearCart } = useCartStore()
const { isLoggedIn } = useAuthStore()

const shipping = ref(9.99)
const tax = computed(() => totalPrice.value * 0.08) // 8% tax
const finalTotal = computed(() => totalPrice.value + shipping.value + tax.value)

const proceedToCheckout = () => {
  if (!isLoggedIn.value) {
    navigateTo('/auth/login?redirect=/checkout')
  } else {
    navigateTo('/checkout')
  }
}
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

      <div v-if="items.length === 0" class="text-center py-12">
        <UIcon name="i-heroicons-shopping-bag" class="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h2 class="text-xl font-medium text-gray-900 mb-2">Your cart is empty</h2>
        <p class="text-gray-600 mb-6">Start shopping to add items to your cart</p>
        <UButton to="/products" size="lg">Continue Shopping</UButton>
      </div>

      <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Cart Items -->
        <div class="lg:col-span-2">
          <div class="bg-white rounded-lg shadow-sm">
            <div class="p-6 border-b">
              <div class="flex justify-between items-center">
                <h2 class="text-lg font-medium text-gray-900">Cart Items</h2>
                <UButton 
                  @click="clearCart"
                  variant="ghost"
                  color="red"
                  size="sm"
                >
                  Clear Cart
                </UButton>
              </div>
            </div>

            <div class="divide-y">
              <div 
                v-for="item in items" 
                :key="item.product.id"
                class="p-6 flex items-center space-x-4"
              >
                <div class="flex-shrink-0">
                  <NuxtImg 
                    :src="item.product.image" 
                    :alt="item.product.name"
                    class="w-20 h-20 object-cover rounded-lg"
                  />
                </div>

                <div class="flex-1 min-w-0">
                  <h3 class="text-lg font-medium text-gray-900">{{ item.product.name }}</h3>
                  <p class="text-gray-600">{{ item.product.category }}</p>
                  <p class="text-lg font-semibold text-blue-600">${{ item.product.price }}</p>
                </div>

                <div class="flex items-center space-x-3">
                  <UButton 
                    @click="updateQuantity(item.product.id, item.quantity - 1)"
                    variant="outline"
                    size="sm"
                    square
                    :disabled="item.quantity <= 1"
                  >
                    <UIcon name="i-heroicons-minus" />
                  </UButton>
                  
                  <span class="w-12 text-center font-medium">{{ item.quantity }}</span>
                  
                  <UButton 
                    @click="updateQuantity(item.product.id, item.quantity + 1)"
                    variant="outline"
                    size="sm"
                    square
                    :disabled="item.quantity >= item.product.stock"
                  >
                    <UIcon name="i-heroicons-plus" />
                  </UButton>
                </div>

                <div class="text-right">
                  <p class="text-lg font-semibold text-gray-900">
                    ${{ (item.product.price * item.quantity).toFixed(2) }}
                  </p>
                  <UButton 
                    @click="removeFromCart(item.product.id)"
                    variant="ghost"
                    color="red"
                    size="sm"
                  >
                    Remove
                  </UButton>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Order Summary -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-lg shadow-sm p-6 sticky top-8">
            <h2 class="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
            
            <div class="space-y-3 mb-6">
              <div class="flex justify-between">
                <span class="text-gray-600">Subtotal</span>
                <span class="font-medium">${{ totalPrice.toFixed(2) }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Shipping</span>
                <span class="font-medium">${{ shipping.toFixed(2) }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Tax</span>
                <span class="font-medium">${{ tax.toFixed(2) }}</span>
              </div>
              <div class="border-t pt-3">
                <div class="flex justify-between">
                  <span class="text-lg font-semibold text-gray-900">Total</span>
                  <span class="text-lg font-semibold text-gray-900">${{ finalTotal.toFixed(2) }}</span>
                </div>
              </div>
            </div>

            <UButton 
              @click="proceedToCheckout"
              color="blue"
              size="lg"
              block
            >
              Proceed to Checkout
            </UButton>

            <UButton 
              to="/products"
              variant="outline"
              size="lg"
              block
              class="mt-3"
            >
              Continue Shopping
            </UButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>