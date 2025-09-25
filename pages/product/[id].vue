<script setup>
definePageMeta({
  layout: 'web',
})

// Obtener el ID del producto desde la URL
const route = useRoute()
const productId = route.params.id

// Configuración de WooCommerce usando runtimeConfig
const config = useRuntimeConfig()
const WOOCOMMERCE_CONFIG = {
  url: config.public.woocommerceUrl,
  consumerKey: config.woocommerceKey,
  consumerSecret: config.woocommerceSecret
}

// Estados reactivos
const producto = ref(null)
const loading = ref(true)
const error = ref(null)
const selectedImage = ref(0)
const quantity = ref(1)
const selectedVariation = ref(null)

// Función para crear la autenticación básica (compatible con navegador)
const createAuthHeader = () => {
  const credentials = `${WOOCOMMERCE_CONFIG.consumerKey}:${WOOCOMMERCE_CONFIG.consumerSecret}`
  const auth = btoa(credentials)
  return `Basic ${auth}`
}

// Función para obtener producto individual
const fetchProducto = async () => {
  try {
    loading.value = true
    error.value = null
    
    const url = `${WOOCOMMERCE_CONFIG.url}/wp-json/wc/v3/products/${productId}`
    
    const response = await $fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': createAuthHeader(),
        'Content-Type': 'application/json'
      }
    })
    
    producto.value = response
    
    // Si tiene imágenes, seleccionar la primera
    if (response.images && response.images.length > 0) {
      selectedImage.value = 0
    }
    
  } catch (err) {
    error.value = 'Producto no encontrado o error al cargar'
    console.error('Error fetching product:', err)
  } finally {
    loading.value = false
  }
}

// Formatear precio
const formatPrice = (price) => {
  if (!price) return 'Precio no disponible'
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN'
  }).format(parseFloat(price))
}

// Función para cambiar imagen seleccionada
const selectImage = (index) => {
  selectedImage.value = index
}

// Función para aumentar cantidad
const increaseQuantity = () => {
  quantity.value++
}

// Función para disminuir cantidad
const decreaseQuantity = () => {
  if (quantity.value > 1) {
    quantity.value--
  }
}

// Función para agregar al carrito (placeholder)
const addToCart = () => {
  // Aquí implementarías la lógica del carrito
  alert(`Agregado al carrito: ${quantity.value} x ${producto.value.name}`)
}

// Obtener categorías como string
const getCategoriesString = (categories) => {
  if (!categories || categories.length === 0) return 'Sin categoría'
  return categories.map(cat => cat.name).join(', ')
}

// Cargar producto al montar el componente
onMounted(() => {
  if (productId) {
    fetchProducto()
  } else {
    error.value = 'ID de producto no válido'
    loading.value = false
  }
})
</script>

<template>
  <div>
    <!-- Loading State -->
    <div v-if="loading" class="container py-5">
      <div class="text-center py-5">
        <div class="spinner-border text-primary" role="status" style="width: 3rem; height: 3rem;">
          <span class="visually-hidden">Cargando...</span>
        </div>
        <p class="mt-3">Cargando producto...</p>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="container py-5">
      <div class="alert alert-danger" role="alert">
        <h4 class="alert-heading">Error</h4>
        <p>{{ error }}</p>
        <NuxtLink to="/products" class="btn btn-primary">
          ← Volver a productos
        </NuxtLink>
      </div>
    </div>

    <!-- Product Detail -->
    <div v-else-if="producto" class="container py-5">
      <!-- Breadcrumb -->
      <nav aria-label="breadcrumb" class="mb-4">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <NuxtLink to="/">Inicio</NuxtLink>
          </li>
          <li class="breadcrumb-item">
            <NuxtLink to="/productos">Productos</NuxtLink>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            {{ producto.name }}
          </li>
        </ol>
      </nav>

      <div class="row">
        <!-- Product Images -->
        <div class="col-md-6">
          <div class="product-images">
            <!-- Main Image -->
            <div class="main-image mb-3">
              <img
                :src="producto.images?.[selectedImage]?.src || 'https://via.placeholder.com/600x600?text=Sin+Imagen'"
                :alt="producto.name"
                class="img-fluid rounded shadow main-product-image"
              >
              
              <!-- Sale Badge -->
              <span 
                v-if="producto.on_sale" 
                class="badge bg-danger position-absolute top-0 end-0 m-3 fs-6"
              >
                ¡Oferta!
              </span>
            </div>

            <!-- Thumbnail Images -->
            <div v-if="producto.images && producto.images.length > 1" class="thumbnail-images">
              <div class="d-flex gap-2 flex-wrap">
                <img
                  v-for="(image, index) in producto.images"
                  :key="index"
                  :src="image.src"
                  :alt="`${producto.name} - imagen ${index + 1}`"
                  class="thumbnail-img"
                  :class="{ active: selectedImage === index }"
                  @click="selectImage(index)"
                >
              </div>
            </div>
          </div>
        </div>

        <!-- Product Info -->
        <div class="col-md-6">
          <div class="product-info">
            <!-- Product Title -->
            <h1 class="product-title mb-3">{{ producto.name }}</h1>

            <!-- Product Categories -->
            <p class="text-muted mb-3">
              <small>
                <strong>Categoría:</strong> {{ getCategoriesString(producto.categories) }}
              </small>
            </p>

            <!-- Product Price -->
            <div class="price-section mb-4">
              <div v-if="producto.on_sale && producto.regular_price">
                <span class="regular-price text-decoration-line-through text-muted me-3">
                  {{ formatPrice(producto.regular_price) }}
                </span>
                <span class="sale-price text-danger fw-bold fs-2">
                  {{ formatPrice(producto.price) }}
                </span>
                <span class="badge bg-success ms-2">
                  Ahorras {{ formatPrice(producto.regular_price - producto.price) }}
                </span>
              </div>
              <div v-else>
                <span class="current-price text-primary fw-bold fs-2">
                  {{ formatPrice(producto.price) }}
                </span>
              </div>
            </div>

            <!-- Stock Status -->
            <div class="stock-status mb-4">
              <span 
                v-if="producto.stock_status === 'instock'"
                class="badge bg-success fs-6"
              >
                ✓ En stock
              </span>
              <span 
                v-else
                class="badge bg-danger fs-6"
              >
                ✗ Agotado
              </span>
              
              <span v-if="producto.stock_quantity" class="text-muted ms-2">
                ({{ producto.stock_quantity }} disponibles)
              </span>
            </div>

            <!-- Product Description -->
            <div class="product-description mb-4">
              <h5>Descripción</h5>
              <div 
                v-if="producto.description"
                v-html="producto.description"
                class="description-content"
              ></div>
              <div 
                v-else-if="producto.short_description"
                v-html="producto.short_description"
                class="description-content"
              ></div>
              <p v-else class="text-muted">Sin descripción disponible</p>
            </div>

            <!-- Quantity and Add to Cart -->
            <div v-if="producto.stock_status === 'instock'" class="purchase-section">
              <div class="row align-items-center mb-3">
                <div class="col-auto">
                  <label for="quantity" class="form-label mb-0">Cantidad:</label>
                </div>
                <div class="col-auto">
                  <div class="quantity-controls d-flex align-items-center">
                    <button 
                      @click="decreaseQuantity" 
                      class="btn btn-outline-secondary btn-sm"
                      :disabled="quantity <= 1"
                    >
                      -
                    </button>
                    <input 
                      v-model="quantity" 
                      type="number" 
                      min="1" 
                      class="form-control form-control-sm text-center mx-2" 
                      style="width: 80px;"
                      id="quantity"
                    >
                    <button 
                      @click="increaseQuantity" 
                      class="btn btn-outline-secondary btn-sm"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              <div class="d-grid gap-2">
                <button 
                  @click="addToCart" 
                  class="btn btn-primary btn-lg"
                >
                  🛒 Agregar al carrito - {{ formatPrice(producto.price * quantity) }}
                </button>
                <button class="btn btn-success btn-lg">
                  ⚡ Comprar ahora
                </button>
              </div>
            </div>

            <!-- Out of Stock Message -->
            <div v-else class="alert alert-warning">
              <h5>Producto agotado</h5>
              <p>Este producto no está disponible en este momento.</p>
            </div>

            <!-- Product Details -->
            <div class="product-details mt-4">
              <h5>Detalles del producto</h5>
              <ul class="list-unstyled">
                <li><strong>SKU:</strong> {{ producto.sku || 'No disponible' }}</li>
                <li><strong>Peso:</strong> {{ producto.weight ? `${producto.weight} kg` : 'No especificado' }}</li>
                <li v-if="producto.dimensions && (producto.dimensions.length || producto.dimensions.width || producto.dimensions.height)">
                  <strong>Dimensiones:</strong> 
                  {{ producto.dimensions.length || 0 }} × {{ producto.dimensions.width || 0 }} × {{ producto.dimensions.height || 0 }} cm
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- Additional Product Information Tabs -->
      <div class="row mt-5">
        <div class="col-12">
          <ul class="nav nav-tabs" id="productTabs" role="tablist">
            <li class="nav-item" role="presentation">
              <button 
                class="nav-link active" 
                id="description-tab" 
                data-bs-toggle="tab" 
                data-bs-target="#description" 
                type="button" 
                role="tab"
              >
                Descripción completa
              </button>
            </li>
            <li class="nav-item" role="presentation">
              <button 
                class="nav-link" 
                id="additional-tab" 
                data-bs-toggle="tab" 
                data-bs-target="#additional" 
                type="button" 
                role="tab"
              >
                Información adicional
              </button>
            </li>
          </ul>
          
          <div class="tab-content mt-3" id="productTabsContent">
            <div class="tab-pane fade show active" id="description" role="tabpanel">
              <div 
                v-if="producto.description"
                v-html="producto.description"
                class="description-content"
              ></div>
              <p v-else class="text-muted">No hay descripción completa disponible.</p>
            </div>
            
            <div class="tab-pane fade" id="additional" role="tabpanel">
              <table class="table">
                <tbody>
                  <tr v-if="producto.sku">
                    <td><strong>SKU</strong></td>
                    <td>{{ producto.sku }}</td>
                  </tr>
                  <tr v-if="producto.weight">
                    <td><strong>Peso</strong></td>
                    <td>{{ producto.weight }} kg</td>
                  </tr>
                  <tr v-if="producto.dimensions && (producto.dimensions.length || producto.dimensions.width || producto.dimensions.height)">
                    <td><strong>Dimensiones</strong></td>
                    <td>{{ producto.dimensions.length || 0 }} × {{ producto.dimensions.width || 0 }} × {{ producto.dimensions.height || 0 }} cm</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.product-images {
  position: relative;
}

.main-product-image {
  width: 100%;
  height: 500px;
  object-fit: cover;
  cursor: zoom-in;
}

.thumbnail-img {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border: 2px solid transparent;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.thumbnail-img:hover {
  border-color: #007bff;
  transform: scale(1.05);
}

.thumbnail-img.active {
  border-color: #007bff;
  box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
}

.product-title {
  font-size: 2rem;
  font-weight: 600;
  color: #333;
  line-height: 1.3;
}

.price-section {
  padding: 1rem 0;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
}

.regular-price {
  font-size: 1.2rem;
}

.sale-price,
.current-price {
  font-size: 2rem;
}

.quantity-controls input {
  max-width: 80px;
}

.description-content {
  line-height: 1.6;
}

.description-content img {
  max-width: 100%;
  height: auto;
}

.purchase-section {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 12px;
  border: 1px solid #dee2e6;
}

.product-details {
  background: #fff;
  padding: 1rem;
  border: 1px solid #dee2e6;
  border-radius: 8px;
}
</style>