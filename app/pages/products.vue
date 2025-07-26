<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Hero Section -->
    <div class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 class="text-3xl font-bold text-gray-900">Our Products</h1>
        <p class="mt-2 text-gray-600">Discover our beautiful collection of ceramic pieces</p>
      </div>
    </div>

    <!-- Filters and Search -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <!-- Search -->
          <div class="md:col-span-2">
            <label for="search" class="block text-sm font-medium text-gray-700 mb-2">Search Products</label>
            <input
              id="search"
              v-model="searchQuery"
              type="text"
              placeholder="Search by name, description, or category..."
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <!-- Category Filter -->
          <div>
            <label for="category" class="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select
              id="category"
              v-model="selectedCategory"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="All">All Categories</option>
              <option v-for="category in categories" :key="category" :value="category">
                {{ category }}
              </option>
            </select>
          </div>

          <!-- Sort -->
          <div>
            <label for="sort" class="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
            <select
              id="sort"
              v-model="sortOption"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="name-asc">Name (A-Z)</option>
              <option value="name-desc">Name (Z-A)</option>
              <option value="price-asc">Price (Low to High)</option>
              <option value="price-desc">Price (High to Low)</option>
              <option value="rating-desc">Rating (High to Low)</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Results Count -->
      <div class="mb-6">
        <p class="text-gray-600">
          Showing {{ filteredProducts.length }} of {{ products.length }} products
        </p>
      </div>

      <!-- Products Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <div
          v-for="product in filteredProducts"
          :key="product.id"
          class="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
        >
          <div class="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-t-lg bg-gray-200">
            <img
              :src="product.image"
              :alt="product.name"
              class="h-48 w-full object-cover object-center group-hover:opacity-75"
            />
          </div>
          <div class="p-4">
            <div class="flex items-center justify-between mb-2">
              <span class="text-xs font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded">
                {{ product.category }}
              </span>
              <div v-if="product.featured" class="text-xs font-medium text-yellow-600 bg-yellow-100 px-2 py-1 rounded">
                Featured
              </div>
            </div>
            <h3 class="text-lg font-medium text-gray-900 mb-2">{{ product.name }}</h3>
            <p class="text-sm text-gray-600 mb-3 line-clamp-2">{{ product.description }}</p>
            
            <!-- Rating -->
            <div class="flex items-center mb-3">
              <div class="flex items-center">
                <span v-for="i in 5" :key="i" class="text-yellow-400">
                  {{ i <= product.rating ? '★' : '☆' }}
                </span>
              </div>
              <span class="ml-2 text-sm text-gray-600">({{ product.reviews }})</span>
            </div>

            <div class="flex items-center justify-between">
              <span class="text-xl font-bold text-gray-900">${{ product.price }}</span>
              <button
                @click="addToCart(product)"
                class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="filteredProducts.length === 0" class="text-center py-12">
        <div class="text-gray-400 text-6xl mb-4">🔍</div>
        <h3 class="text-lg font-medium text-gray-900 mb-2">No products found</h3>
        <p class="text-gray-600">Try adjusting your search or filter criteria</p>
      </div>
    </div>
  </div>
</template>

<script setup>
const { filteredProducts, products, selectedCategory, searchQuery, sortBy, sortOrder, searchProducts, setCategory, setSorting } = useProductStore()
const { addToCart } = useCartStore()

// Get unique categories
const categories = computed(() => {
  const cats = [...new Set(products.value.map(p => p.category))]
  return cats.sort()
})

// Handle search input
watch(searchQuery, (newQuery) => {
  searchProducts(newQuery)
})

// Handle category selection
watch(selectedCategory, (newCategory) => {
  setCategory(newCategory)
})

// Handle sorting
const sortOption = ref('name-asc')
watch(sortOption, (newSort) => {
  const [field, order] = newSort.split('-')
  setSorting(field, order)
})

// SEO
useHead({
  title: 'Products - Expo Ceramicas',
  meta: [
    { name: 'description', content: 'Browse our beautiful collection of ceramic products including vases, dinnerware, and decorative items.' }
  ]
})
</script>