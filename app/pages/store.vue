<script setup lang="ts">
definePageMeta({
  layout: 'web'
})

const { mockProducts } = await import('~/composables/useStore')
const { addToCart } = useCartStore()

const searchQuery = ref('')
const selectedCategory = ref('all')
const sortBy = ref('name')

// Get unique categories
const categories = computed(() => {
  const cats = ['all', ...new Set(mockProducts.map(p => p.category))]
  return cats
})

// Filter and sort products
const filteredProducts = computed(() => {
  let products = mockProducts

  // Filter by search query
  if (searchQuery.value) {
    products = products.filter(p => 
      p.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }

  // Filter by category
  if (selectedCategory.value !== 'all') {
    products = products.filter(p => p.category === selectedCategory.value)
  }

  // Sort products
  products = [...products].sort((a, b) => {
    switch (sortBy.value) {
      case 'price-low':
        return a.price - b.price
      case 'price-high':
        return b.price - a.price
      case 'name':
      default:
        return a.name.localeCompare(b.name)
    }
  })

  return products
})

const addToCartHandler = (product: any) => {
  addToCart(product)
}
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Page Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-4">Our Store</h1>
        <p class="text-lg text-gray-600">Discover our complete collection of premium ceramics</p>
      </div>

      <!-- Filters and Search -->
      <div class="bg-white rounded-lg shadow-sm p-6 mb-8">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <!-- Search -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Search Products</label>
            <UInput 
              v-model="searchQuery"
              placeholder="Search products..."
              icon="i-heroicons-magnifying-glass"
            />
          </div>

          <!-- Category Filter -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <USelect 
              v-model="selectedCategory"
              :options="categories.map(cat => ({ label: cat === 'all' ? 'All Categories' : cat, value: cat }))"
            />
          </div>

          <!-- Sort -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
            <USelect 
              v-model="sortBy"
              :options="[
                { label: 'Name', value: 'name' },
                { label: 'Price: Low to High', value: 'price-low' },
                { label: 'Price: High to Low', value: 'price-high' }
              ]"
            />
          </div>
        </div>
      </div>

      <!-- Products Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <div 
          v-for="product in filteredProducts" 
          :key="product.id"
          class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
        >
          <div class="aspect-w-1 aspect-h-1">
            <NuxtImg 
              :src="product.image" 
              :alt="product.name"
              class="w-full h-48 object-cover"
            />
          </div>
          <div class="p-4">
            <div class="mb-2">
              <span class="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                {{ product.category }}
              </span>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ product.name }}</h3>
            <p class="text-gray-600 text-sm mb-3 line-clamp-2">{{ product.description }}</p>
            
            <div class="flex items-center justify-between mb-3">
              <span class="text-xl font-bold text-blue-600">${{ product.price }}</span>
              <span class="text-sm text-gray-500">{{ product.stock }} in stock</span>
            </div>

            <UButton 
              @click="addToCartHandler(product)"
              :disabled="product.stock === 0"
              color="blue"
              block
              size="sm"
            >
              {{ product.stock === 0 ? 'Out of Stock' : 'Add to Cart' }}
            </UButton>
          </div>
        </div>
      </div>

      <!-- No Results -->
      <div v-if="filteredProducts.length === 0" class="text-center py-12">
        <UIcon name="i-heroicons-magnifying-glass" class="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 class="text-lg font-medium text-gray-900 mb-2">No products found</h3>
        <p class="text-gray-600">Try adjusting your search or filter criteria</p>
      </div>
    </div>
  </div>
</template>