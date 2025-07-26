<script setup lang="ts">
definePageMeta({
  layout: 'web',
  middleware: 'auth'
})

const { items, totalPrice, clearCart } = useCartStore()
const { user } = useAuthStore()
const { createOrder } = useOrderStore()

const form = reactive({
  firstName: user.value?.name?.split(' ')[0] || '',
  lastName: user.value?.name?.split(' ')[1] || '',
  email: user.value?.email || '',
  phone: '',
  address: '',
  city: '',
  state: '',
  zipCode: '',
  paymentMethod: 'card',
  cardNumber: '',
  expiryDate: '',
  cvv: '',
  nameOnCard: ''
})

const loading = ref(false)
const orderComplete = ref(false)
const orderId = ref('')

const shipping = 9.99
const tax = computed(() => totalPrice.value * 0.08)
const finalTotal = computed(() => totalPrice.value + shipping + tax.value)

const processOrder = async () => {
  loading.value = true
  
  try {
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Create order
    const shippingAddress = `${form.address}, ${form.city}, ${form.state} ${form.zipCode}`
    const order = createOrder([...items.value], shippingAddress, user.value!.id)
    
    orderId.value = order.id
    clearCart()
    orderComplete.value = true
  } catch (error) {
    console.error('Order processing failed:', error)
  } finally {
    loading.value = false
  }
}

// Redirect if cart is empty and order not complete
watchEffect(() => {
  if (items.value.length === 0 && !orderComplete.value) {
    navigateTo('/cart')
  }
})
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Order Complete -->
      <div v-if="orderComplete" class="max-w-2xl mx-auto text-center">
        <div class="bg-white rounded-lg shadow-sm p-8">
          <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <UIcon name="i-heroicons-check" class="w-8 h-8 text-green-600" />
          </div>
          <h1 class="text-2xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
          <p class="text-gray-600 mb-4">Thank you for your purchase. Your order has been successfully placed.</p>
          <p class="text-sm text-gray-500 mb-6">Order ID: {{ orderId }}</p>
          <div class="space-x-4">
            <UButton to="/orders" color="blue">View Orders</UButton>
            <UButton to="/store" variant="outline">Continue Shopping</UButton>
          </div>
        </div>
      </div>

      <!-- Checkout Form -->
      <div v-else>
        <h1 class="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- Checkout Form -->
          <div class="space-y-6">
            <!-- Shipping Information -->
            <div class="bg-white rounded-lg shadow-sm p-6">
              <h2 class="text-lg font-medium text-gray-900 mb-4">Shipping Information</h2>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <UInput v-model="form.firstName" required />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <UInput v-model="form.lastName" required />
                </div>
                <div class="md:col-span-2">
                  <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <UInput v-model="form.email" type="email" required />
                </div>
                <div class="md:col-span-2">
                  <label class="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <UInput v-model="form.phone" type="tel" required />
                </div>
                <div class="md:col-span-2">
                  <label class="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <UInput v-model="form.address" required />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">City</label>
                  <UInput v-model="form.city" required />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">State</label>
                  <UInput v-model="form.state" required />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">ZIP Code</label>
                  <UInput v-model="form.zipCode" required />
                </div>
              </div>
            </div>

            <!-- Payment Information -->
            <div class="bg-white rounded-lg shadow-sm p-6">
              <h2 class="text-lg font-medium text-gray-900 mb-4">Payment Information</h2>
              
              <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
                <URadioGroup 
                  v-model="form.paymentMethod"
                  :options="[
                    { value: 'card', label: 'Credit/Debit Card' },
                    { value: 'paypal', label: 'PayPal' }
                  ]"
                />
              </div>

              <div v-if="form.paymentMethod === 'card'" class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                  <UInput v-model="form.cardNumber" placeholder="1234 5678 9012 3456" required />
                </div>
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                    <UInput v-model="form.expiryDate" placeholder="MM/YY" required />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                    <UInput v-model="form.cvv" placeholder="123" required />
                  </div>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Name on Card</label>
                  <UInput v-model="form.nameOnCard" required />
                </div>
              </div>

              <div v-else class="p-4 bg-blue-50 rounded-lg">
                <p class="text-sm text-blue-800">You will be redirected to PayPal to complete your payment.</p>
              </div>
            </div>
          </div>

          <!-- Order Summary -->
          <div>
            <div class="bg-white rounded-lg shadow-sm p-6 sticky top-8">
              <h2 class="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
              
              <!-- Items -->
              <div class="space-y-3 mb-6">
                <div 
                  v-for="item in items" 
                  :key="item.product.id"
                  class="flex items-center space-x-3"
                >
                  <NuxtImg 
                    :src="item.product.image" 
                    :alt="item.product.name"
                    class="w-12 h-12 object-cover rounded"
                  />
                  <div class="flex-1 min-w-0">
                    <p class="text-sm font-medium text-gray-900 truncate">{{ item.product.name }}</p>
                    <p class="text-sm text-gray-500">Qty: {{ item.quantity }}</p>
                  </div>
                  <p class="text-sm font-medium text-gray-900">
                    ${{ (item.product.price * item.quantity).toFixed(2) }}
                  </p>
                </div>
              </div>

              <!-- Totals -->
              <div class="space-y-2 mb-6 border-t pt-4">
                <div class="flex justify-between text-sm">
                  <span class="text-gray-600">Subtotal</span>
                  <span>${{ totalPrice.toFixed(2) }}</span>
                </div>
                <div class="flex justify-between text-sm">
                  <span class="text-gray-600">Shipping</span>
                  <span>${{ shipping.toFixed(2) }}</span>
                </div>
                <div class="flex justify-between text-sm">
                  <span class="text-gray-600">Tax</span>
                  <span>${{ tax.toFixed(2) }}</span>
                </div>
                <div class="flex justify-between text-lg font-semibold border-t pt-2">
                  <span>Total</span>
                  <span>${{ finalTotal.toFixed(2) }}</span>
                </div>
              </div>

              <UButton 
                @click="processOrder"
                :loading="loading"
                color="blue"
                size="lg"
                block
              >
                {{ loading ? 'Processing...' : 'Place Order' }}
              </UButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>