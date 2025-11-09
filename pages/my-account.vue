<template>
  <div>
    <NuxtLayout name="web">
      <div class="container py-5">
        <div class="row">
          <div class="col-12 d-flex justify-content-between align-items-center mb-4">
            <h1 class="h3 mb-0">Mi Cuenta</h1>
            <button class="btn btn-outline-danger" @click="logout">Cerrar sesión</button>
          </div>
        </div>

        <div class="row g-4">
          <div class="col-lg-6">
            <div class="card">
              <div class="card-body">
                <h2 class="h5">Perfil</h2>
                <p class="mb-1"><strong>Nombre:</strong> {{ profileName }}</p>
                <p class="mb-1"><strong>Email:</strong> {{ user?.email }}</p>
                <p class="mb-0"><strong>Rol:</strong> {{ user?.user_metadata?.role || 'cliente' }}</p>
              </div>
            </div>
          </div>

          <div class="col-lg-6">
            <div class="card">
              <div class="card-body">
                <h2 class="h5">Acciones</h2>
                <NuxtLink v-if="isAdmin" to="/admin/products" class="btn btn-primary">Ir al Administrador</NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </NuxtLayout>
  </div>
</template>

<script setup>
definePageMeta({ middleware: ['auth'] })

const nuxtApp = useNuxtApp()
const supabase = nuxtApp.$supabase

const { data } = await supabase.auth.getUser()
const user = data?.user
const isAdmin = computed(() => user?.user_metadata?.role === 'admin')
const profileName = computed(() => user?.user_metadata?.name || user?.email)

useHead({ title: 'Mi Cuenta - Expo Cerámicas' })

async function logout() {
  await supabase.auth.signOut()
  await navigateTo('/')
}
</script>