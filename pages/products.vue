<script setup>
definePageMeta({
  layout: 'web',
})

// Configuración de WooCommerce usando runtimeConfig
const config = useRuntimeConfig()
const WOOCOMMERCE_CONFIG = {
  url: config.public.woocommerceUrl,
  consumerKey: config.woocommerceKey,
  consumerSecret: config.woocommerceSecret
}

// Estados reactivos
const productos = ref([])
const loading = ref(true)
const error = ref(null)
const currentPage = ref(1)
const searchTerm = ref('')
const isSearching = ref(false)

// Función para crear la autenticación básica (compatible con navegador)
const createAuthHeader = () => {
  const credentials = `${WOOCOMMERCE_CONFIG.consumerKey}:${WOOCOMMERCE_CONFIG.consumerSecret}`
  // Usar btoa() que está disponible en el navegador
  const auth = btoa(credentials)
  return `Basic ${auth}`
}

// Función para obtener productos directamente de WooCommerce
const fetchProductos = async (page = 1, search = '') => {
  try {
    loading.value = true
    error.value = null
    const url = `${WOOCOMMERCE_CONFIG.url}/wp-json/wc/v3/products`
    const params = {
      page: page,
      per_page: 12,
      status: 'publish'
    }
    
    if (search.trim()) {
      params.search = search
      isSearching.value = true
    } else {
      isSearching.value = false
    }
    
    // Usar $fetch para hacer la petición directa
    const response = await $fetch(url, {
      method: 'GET',
      query: params,
      headers: {
        'Authorization': createAuthHeader(),
        'Content-Type': 'application/json'
      }
    })
    
    productos.value = response || []
    currentPage.value = page
    
  } catch (err) {
    error.value = 'Error al cargar productos'
    console.error('Error fetching products:', err)
    productos.value = []
  } finally {
    loading.value = false
  }
}

// Función de búsqueda
const buscarProductos = async () => {
  currentPage.value = 1
  await fetchProductos(1, searchTerm.value)
}

// Función para limpiar búsqueda
const limpiarBusqueda = async () => {
  searchTerm.value = ''
  currentPage.value = 1
  await fetchProductos(1)
}

// Función para cambiar página
const cambiarPagina = async (page) => {
  await fetchProductos(page, searchTerm.value)
}

// Formatear precio
const formatPrice = (price) => {
  if (!price) return 'Precio no disponible'
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN'
  }).format(parseFloat(price))
}

// Cargar productos al montar el componente
onMounted(() => {
  fetchProductos()
})
</script>

<template>
  <div>
    <!-- Header Section -->
    <section>
      <div class="container-fluid bg-primary text-white py-5 mt-5">
        <div class="row">
          <div class="col-md-8 mx-auto">
            <h1 class="display-4">Productos</h1>
            <p class="lead">Descubre nuestra amplia gama de productos</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Search Section -->
    <section class="py-4 bg-light">
      <div class="container">
        <div class="row">
          <div class="col-md-6 mx-auto">
            <div class="d-flex gap-2">
              <input 
                v-model="searchTerm" 
                type="text" 
                class="form-control" 
                placeholder="Buscar productos..."
                @keyup.enter="buscarProductos"
              >
              <button 
                @click="buscarProductos" 
                class="btn btn-primary"
                :disabled="loading"
              >
                🔍
              </button>
              <button 
                v-if="isSearching" 
                @click="limpiarBusqueda" 
                class="btn btn-outline-secondary"
              >
                ✖
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Products Section -->
    <section>
      <div class="container py-5">
        <!-- Loading State -->
        <div v-if="loading" class="text-center py-5">
          <div class="spinner-border text-primary" role="status" style="width: 3rem; height: 3rem;">
            <span class="visually-hidden">Cargando...</span>
          </div>
          <p class="mt-3">Cargando productos...</p>
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="alert alert-danger" role="alert">
          <h4 class="alert-heading">Error</h4>
          <p>{{ error }}</p>
          <button @click="fetchProductos()" class="btn btn-outline-danger">
            Intentar de nuevo
          </button>
        </div>

        <!-- Empty State -->
        <div v-else-if="!productos.length" class="text-center py-5">
          <div style="font-size: 3rem; color: #6c757d; margin-bottom: 1rem;">📦</div>
          <h3>No se encontraron productos</h3>
          <p class="text-muted">
            {{ isSearching ? 'No hay productos que coincidan con tu búsqueda.' : 'No hay productos disponibles en este momento.' }}
          </p>
          <button v-if="isSearching" @click="limpiarBusqueda" class="btn btn-primary">
            Ver todos los productos
          </button>
        </div>

        <!-- Products Grid -->
        <div v-else>
          <!-- Search Results Info -->
          <div v-if="isSearching" class="mb-4">
            <p class="text-muted">
              Resultados de búsqueda para: <strong>"{{ searchTerm }}"</strong>
              ({{ productos.length }} productos encontrados)
            </p>
          </div>

          <div class="row">
            <div 
              v-for="producto in productos" 
              :key="producto.id" 
              class="col-lg-3 col-md-4 col-sm-6 mb-4"
            >
              <div class="card h-100 shadow-sm product-card">
                <!-- Product Image -->
                <div class="position-relative image-container">
                  <img 
                    :src="producto.images?.[0]?.src || 'https://via.placeholder.com/300x250?text=Sin+Imagen'" 
                    :alt="producto.name"
                    class="card-img-top product-image"
                  >
                  <span 
                    v-if="producto.on_sale" 
                    class="badge bg-danger position-absolute top-0 end-0 m-2"
                  >
                    Oferta
                  </span>
                  <span 
                    v-if="producto.stock_status === 'outofstock'" 
                    class="badge bg-secondary position-absolute top-0 start-0 m-2"
                  >
                    Agotado
                  </span>
                </div>

                <!-- Product Info -->
                <div class="card-body d-flex flex-column">
                  <h5 class="card-title">{{ producto.name }}</h5>
                  <div 
                    class="card-text text-muted small flex-grow-1" 
                    v-html="producto.short_description || 'Sin descripción disponible'"
                  ></div>
                  
                  <!-- Price -->
                  <div class="mb-3">
                    <div v-if="producto.on_sale && producto.regular_price">
                      <span class="text-decoration-line-through text-muted me-2">
                        {{ formatPrice(producto.regular_price) }}
                      </span>
                      <span class="fw-bold text-danger fs-5">
                        {{ formatPrice(producto.price) }}
                      </span>
                    </div>
                    <div v-else>
                      <span class="fw-bold text-primary fs-5">
                        {{ formatPrice(producto.price) }}
                      </span>
                    </div>
                  </div>

                  <!-- Stock Info -->
                  <div class="mb-2">
                    <small class="text-muted">
                      Stock: {{ producto.stock_status === 'instock' ? 'Disponible' : 'Agotado' }}
                    </small>
                  </div>

                  <!-- Actions -->
                  <div class="d-grid gap-2">
                    <NuxtLink 
                      :to="`/product/${producto.id}`" 
                      class="btn btn-outline-primary btn-sm"
                    >
                      Ver detalles
                    </NuxtLink>
                    <button 
                      class="btn btn-primary btn-sm"
                      :disabled="producto.stock_status === 'outofstock'"
                      @click="agregarAlCarrito(producto)"
                    >
                      {{ producto.stock_status === 'outofstock' ? 'Agotado' : 'Agregar al carrito' }}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Simple Pagination -->
          <nav v-if="productos.length === 12" class="mt-4">
            <div class="d-flex justify-content-center gap-2">
              <button 
                class="btn btn-outline-primary" 
                @click="cambiarPagina(currentPage - 1)"
                :disabled="currentPage === 1"
              >
                ← Anterior
              </button>
              <span class="btn btn-light">Página {{ currentPage }}</span>
              <button 
                class="btn btn-outline-primary" 
                @click="cambiarPagina(currentPage + 1)"
              >
                Siguiente →
              </button>
            </div>
          </nav>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.product-card {
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  border: none;
  border-radius: 12px;
  overflow: hidden;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.image-container {
  overflow: hidden;
  height: 250px;
}

.product-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.product-card:hover .product-image {
  transform: scale(1.05);
}

.card-body {
  padding: 1.25rem;
}

.card-title {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.spinner-border {
  width: 3rem;
  height: 3rem;
}

.badge {
  font-size: 0.7rem;
  padding: 0.4rem 0.6rem;
}
</style>