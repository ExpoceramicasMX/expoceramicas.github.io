<template>
  <div>
    <NuxtLayout name="web">
      <div class="container py-5">
        <div class="d-flex justify-content-between align-items-center mb-4">
          <h1 class="h4">Administrador de Productos</h1>
          <NuxtLink to="/my-account" class="btn btn-outline-secondary">Volver</NuxtLink>
        </div>

        <div class="card mb-4">
          <div class="card-body">
            <h2 class="h6 mb-3">Crear/Editar producto</h2>
            <form @submit.prevent="saveProduct" class="row g-3">
              <div class="col-md-6">
                <label class="form-label">Título</label>
                <input v-model="form.title" type="text" class="form-control" required />
              </div>
              <div class="col-md-3">
                <label class="form-label">Precio</label>
                <input v-model.number="form.price" type="number" step="0.01" class="form-control" required />
              </div>
              <div class="col-md-3">
                <label class="form-label">Stock</label>
                <input v-model.number="form.stock" type="number" min="0" class="form-control" />
              </div>
              <div class="col-12">
                <label class="form-label">Imagen (URL)</label>
                <input v-model="form.image" type="url" class="form-control" />
              </div>
              <div class="col-12">
                <label class="form-label">Descripción</label>
                <textarea v-model="form.description" rows="3" class="form-control"></textarea>
              </div>
              <div class="col-12 d-flex gap-2">
                <button type="submit" class="btn btn-primary" :disabled="saving">
                  <span v-if="saving" class="spinner-border spinner-border-sm me-2" />
                  {{ form.id ? 'Actualizar' : 'Crear' }}
                </button>
                <button type="button" class="btn btn-secondary" @click="resetForm">Limpiar</button>
              </div>
            </form>
          </div>
        </div>

        <div class="card">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-center mb-3">
              <h2 class="h6">Listado de productos</h2>
              <button class="btn btn-outline-primary btn-sm" @click="fetchProducts">Recargar</button>
            </div>
            <div v-if="loading" class="text-muted">Cargando productos...</div>
            <div v-else>
              <div class="table-responsive">
                <table class="table table-striped align-middle">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Título</th>
                      <th>Precio</th>
                      <th>Stock</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="p in products" :key="p.id">
                      <td>{{ p.id }}</td>
                      <td>{{ p.title }}</td>
                      <td>{{ currency(p.price) }}</td>
                      <td>{{ p.stock ?? '-' }}</td>
                      <td class="text-end">
                        <button class="btn btn-sm btn-outline-secondary me-2" @click="editProduct(p)">Editar</button>
                        <button class="btn btn-sm btn-outline-danger" @click="deleteProduct(p.id)">Eliminar</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ middleware: ['auth', 'admin'] })

useHead({ title: 'Administrador de Productos - Expo Cerámicas' })

type Product = {
  id: number
  title: string
  price: number
  stock?: number | null
  image?: string | null
  description?: string | null
}

type ProductForm = {
  id: number | null
  title: string
  price: number
  stock: number
  image: string
  description: string
}

const products = ref<Product[]>([])
const loading = ref(false)
const saving = ref(false)
const form = ref<ProductForm>({ id: null, title: '', price: 0, stock: 0, image: '', description: '' })

function currency(amount: number) {
  try { return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(amount || 0) }
  catch { return `$${(amount || 0).toFixed(2)}` }
}

async function fetchProducts() {
  loading.value = true
  try {
    const { data, error } = await useFetch<Product[]>('/api/products')
    if (error.value) throw error.value
    products.value = data.value || []
  } catch (e) {
    console.error(e)
    alert('Error cargando productos')
  } finally {
    loading.value = false
  }
}

async function saveProduct() {
  saving.value = true
  try {
    if (form.value.id) {
      const { error } = await useFetch(`/api/products/${form.value.id}`, { method: 'PUT', body: form.value })
      if (error.value) throw error.value
    } else {
      const { error } = await useFetch('/api/products', { method: 'POST', body: form.value })
      if (error.value) throw error.value
    }
    await fetchProducts()
    resetForm()
  } catch (e) {
    console.error(e)
    alert('Error guardando producto')
  } finally {
    saving.value = false
  }
}

function editProduct(p: Product) {
  form.value = { id: p.id, title: p.title, price: p.price, stock: Number(p.stock || 0), image: p.image || '', description: p.description || '' }
}

function resetForm() {
  form.value = { id: null, title: '', price: 0, stock: 0, image: '', description: '' }
}

async function deleteProduct(id: number) {
  if (!confirm('¿Eliminar producto?')) return
  try {
    const { error } = await fetch(`/api/products/${id}`, { method: 'DELETE' })
    if (error.value) throw error.value
    await fetchProducts()
  } catch (e) {
    console.error(e)
    alert('Error eliminando producto')
  }
}

onMounted(fetchProducts)
</script>