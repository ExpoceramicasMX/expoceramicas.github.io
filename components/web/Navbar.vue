<template>
  <nav class="web-navbar fixed-top shadow-sm">
    <!-- Top Bar -->
    <div class="topbar">
      <div class="container d-flex align-items-center justify-content-between py-2">
        <!-- Brand -->
        <a class="navbar-brand d-flex align-items-center gap-2 text-dark text-decoration-none" href="/">
          <img src="/expo-logo.png" alt="Expoceramicas" height="28" class="d-none d-sm-inline" />
          <strong>Expoceramicas</strong>
        </a>

        <!-- Search + Categories -->
        <form class="flex-grow-1 d-none d-md-flex mx-3" @submit.prevent="onSearch">
          <div class="input-group search-group">
            <input v-model="query" type="search" class="form-control search-input" placeholder="Search" aria-label="Search" />
            <button class="btn btn-light dropdown-toggle category-btn" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              {{ categoryLabel }}
            </button>
            <ul class="dropdown-menu dropdown-menu-end">
              <li>
                <button class="dropdown-item" type="button" @click="selectCategory('all')">All categories</button>
              </li>
              <li v-for="c in categories" :key="c">
                <button class="dropdown-item" type="button" @click="selectCategory(c)">{{ c }}</button>
              </li>
            </ul>
            <button class="btn btn-light search-btn" type="submit" aria-label="Buscar">
              <i class="fa-solid fa-magnifying-glass"></i>
            </button>
          </div>
        </form>

        <!-- Icons / Actions -->
        <div class="d-flex align-items-center gap-3">
          <NuxtLink v-if="!user" to="/login" class="icon-link" aria-label="Account">
            <i class="fa-regular fa-user"></i>
          </NuxtLink>
          <NuxtLink v-else to="/my-account" class="icon-link" aria-label="My Account">
            <i class="fa-solid fa-user-check"></i>
          </NuxtLink>
          <a href="/favorites" class="icon-link" aria-label="Favorites">
            <i class="fa-regular fa-heart"></i>
          </a>
        <button type="button" class="btn cart-cta d-flex align-items-center gap-2" @click="isCartOpen = true" aria-haspopup="dialog" aria-expanded="false" aria-controls="cartDrawer">
           <i class="fa-solid fa-cart-shopping"></i>
           <span class="fw-semibold">{{ cartTotalLabel }}</span>
         </button>
          </div>
      </div>
    </div>

    <!-- Sub Nav -->
    <div class="subnav border-top">
      <div class="container">
        <ul class="list-inline mb-0 py-2 small">
          <!-- Browse Categories dropdown -->
          <li class="list-inline-item me-3 dropdown">
            <a href="#" class="subnav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              <i class="fa-solid fa-bars me-2"></i>
              Categorias
            </a>
            <ul class="dropdown-menu">
              <li>
                <button class="dropdown-item" type="button" @click="selectCategory('all')">All categories</button>
              </li>
              <li v-for="c in categories" :key="'sub-'+c">
                <button class="dropdown-item" type="button" @click="selectCategory(c)">{{ c }}</button>
              </li>
            </ul>
          </li>

          <!-- Woocommerce Layouts dropdown -->
          <li class="list-inline-item me-3 dropdown">
            <a href="#" class="subnav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Nuestras Marcas
            </a>
            <ul class="dropdown-menu">
              <li><NuxtLink class="dropdown-item" to="/products">Default Shop</NuxtLink></li>
              <li><NuxtLink class="dropdown-item" to="/products?view=grid">Grid View</NuxtLink></li>
              <li><NuxtLink class="dropdown-item" to="/products?view=list">List View</NuxtLink></li>
            </ul>
          </li>
          <li class="list-inline-item me-3">
            <a href="#" class="subnav-link">Wholesale list</a>
          </li>
          <li class="list-inline-item me-3">
            <a href="#" class="subnav-link">Alphabet Category</a>
          </li>
          <li class="list-inline-item">
            <a href="#" class="subnav-link">Tutorials <span class="badge bg-danger ms-2">HOT</span></a>
          </li>
        </ul>
      </div>
    </div>
   <CartDrawer v-model="isCartOpen" :items="cartItems" />
  </nav>
</template>

<script setup lang="ts">
import CartDrawer from './CartDrawer.vue'
import type { SupabaseClient, User } from '@supabase/supabase-js'
const nuxtApp = useNuxtApp()
const supabase = nuxtApp.$supabase as SupabaseClient | undefined

 const router = useRouter()
 const query = ref('')
 const selectedCategory = ref('all')
 const categories = ref([
   'Pisos y Recubrimientos',
   'Baños',
   'Cocina',
   'Griferia',
   'Material de Instalación'
 ])
const isCartOpen = ref(false)
// Global simple state for cart items; replace with Pinia if needed
const cartItems = useState('cartItems', () => [])
const cartTotal = computed(() => (cartItems.value || []).reduce((s, it) => s + (Number(it.price) || 0) * (it.qty || 1), 0))
const cartTotalLabel = computed(() => {
 try { return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(cartTotal.value) } catch (e) { return `$${(cartTotal.value||0).toFixed(2)}` }
})

const user = ref<User | null>(null)

onMounted(async () => {
  try {
    if (!supabase) return
    const { data } = await supabase.auth.getUser()
    user.value = data?.user || null
  } catch {}
})

 const categoryLabel = computed(() => selectedCategory.value === 'all' ? 'All categories' : selectedCategory.value)

 function selectCategory(c) {
   selectedCategory.value = c
 }

 function onSearch() {
   const q = query.value?.trim() || ''
   const cat = selectedCategory.value
   // Navigate to search page with query params. Implement results in pages/search.vue
   router.push({ path: '/search', query: { q, category: cat } })
 }
</script>

<style scoped>
.web-navbar { background: #ffffff; }
.web-navbar { background: #ffffff; }
.topbar { background: #ffffff; }
.navbar-brand { font-weight: 700; }
.search-group { background: #fff; border-radius: 10px; overflow: hidden; box-shadow: 0 0 0 1px rgba(0,0,0,0.06) inset; }
.search-input { border: none; padding: 0.75rem 1rem; }
.search-input:focus { box-shadow: none; }
.category-btn { border: none; border-left: 1px solid rgba(0,0,0,0.06); }
.search-btn { border: none; }
.icon-link { color: #202020; font-size: 1.25rem; }
.icon-link:hover { color: #000; }
.cart-cta { background: #7c2dff; color: #fff; border-radius: 10px; padding: 0.5rem 0.75rem; }
.cart-cta:hover { color: #fff; opacity: 0.95; }
.subnav { background: #1e3a8a; }
.subnav-link { color: #ffffff; text-decoration: none; }
.subnav-link:hover { color: #e2e8f0; }
.subnav .dropdown-menu { background: #ffffff; border: none; box-shadow: 0 8px 24px rgba(0,0,0,0.15); }
.subnav .dropdown-item { color: #1f2937; }
.subnav .dropdown-item:hover { background: #f1f5f9; }
</style>