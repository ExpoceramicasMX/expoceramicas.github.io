<script setup lang="ts">
definePageMeta({
  layout: 'web'
})

const { featuredProducts } = useProductStore()
const { addToCart, isInCart, getItemQuantity } = useCartStore()
const toast = useToast()

const addToCartHandler = (product: any) => {
  try {
    addToCart(product)
    
    // Show success toast notification
    toast.add({
      title: 'Added to Cart!',
      description: `${product.name} has been added to your cart`,
      icon: 'i-heroicons-shopping-cart',
      color: 'green',
      timeout: 3000
    })
  } catch (error) {
    // Show error toast with specific error message
    toast.add({
      title: 'Cannot Add to Cart',
      description: error.message || 'Failed to add item to cart. Please try again.',
      icon: 'i-heroicons-exclamation-triangle',
      color: 'red',
      timeout: 4000
    })
  }
}
</script>

<template>
  <div>
    <!-- Hero Section -->
    <section class="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div class="text-center">
          <h1 class="text-4xl md:text-6xl font-bold mb-6">
            Premium Ceramic Collection
          </h1>
          <p class="text-xl md:text-2xl mb-8 text-blue-100">
            Discover handcrafted ceramics that bring elegance to your home
          </p>
          <div class="space-x-4">
            <UButton 
              to="/products" 
              size="lg" 
              color="white" 
              variant="solid"
              class="text-blue-600"
            >
              Shop Now
            </UButton>
            <UButton 
              to="/about" 
              size="lg" 
              color="white" 
              variant="outline"
            >
              Learn More
            </UButton>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Products -->
    <section class="py-16 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">Featured Products</h2>
          <p class="text-lg text-gray-600">Discover our most popular ceramic pieces</p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div 
            v-for="product in featuredProducts" 
            :key="product.id"
            class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div class="aspect-w-1 aspect-h-1 relative">
              <NuxtImg 
                :src="product.image" 
                :alt="product.name"
                class="w-full h-64 object-cover"
              />
              <!-- Stock badge -->
              <div class="absolute top-2 right-2">
                <UBadge 
                  v-if="product.stock <= 5 && product.stock > 0"
                  color="orange"
                  variant="solid"
                  size="sm"
                >
                  Only {{ product.stock }} left
                </UBadge>
                <UBadge 
                  v-else-if="product.stock === 0"
                  color="red"
                  variant="solid"
                  size="sm"
                >
                  Out of Stock
                </UBadge>
              </div>
              <!-- In cart indicator -->
              <div v-if="isInCart(product.id)" class="absolute top-2 left-2">
                <UBadge 
                  color="green"
                  variant="solid"
                  size="sm"
                >
                  {{ getItemQuantity(product.id) }} in cart
                </UBadge>
              </div>
            </div>
            <div class="p-6">
              <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ product.name }}</h3>
              <p class="text-gray-600 mb-4">{{ product.description }}</p>
              <div class="flex items-center justify-between mb-4">
                <span class="text-2xl font-bold text-blue-600">${{ product.price }}</span>
                <div class="flex items-center space-x-1">
                  <UIcon name="i-heroicons-star-solid" class="w-4 h-4 text-yellow-400" />
                  <span class="text-sm text-gray-600">{{ product.rating }} ({{ product.reviews }})</span>
                </div>
              </div>
              <UButton 
                @click="addToCartHandler(product)"
                :disabled="product.stock === 0"
                :color="product.stock === 0 ? 'gray' : 'blue'"
                size="sm"
                block
              >
                <UIcon 
                  :name="product.stock === 0 ? 'i-heroicons-x-circle' : 'i-heroicons-shopping-cart'" 
                  class="w-4 h-4 mr-2" 
                />
                {{ product.stock === 0 ? 'Out of Stock' : 'Add to Cart' }}
              </UButton>
            </div>
          </div>
        </div>
        
        <div class="text-center mt-12">
          <UButton to="/products" size="lg" variant="outline">
            View All Products
          </UButton>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-16 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">Why Choose Us</h2>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="text-center">
            <div class="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <UIcon name="i-heroicons-hand-raised" class="w-8 h-8 text-blue-600" />
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">Handcrafted</h3>
            <p class="text-gray-600">Each piece is carefully handcrafted by skilled artisans</p>
          </div>
          
          <div class="text-center">
            <div class="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <UIcon name="i-heroicons-truck" class="w-8 h-8 text-blue-600" />
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">Fast Shipping</h3>
            <p class="text-gray-600">Free shipping on orders over $50</p>
          </div>
          
          <div class="text-center">
            <div class="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <UIcon name="i-heroicons-shield-check" class="w-8 h-8 text-blue-600" />
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">Quality Guarantee</h3>
            <p class="text-gray-600">30-day money-back guarantee on all products</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
