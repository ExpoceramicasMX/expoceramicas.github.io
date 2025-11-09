<template>
  <div>
    <NuxtLayout name="web">
      <div class="container py-5" style="min-height: 70vh;">
        <div class="row justify-content-center">
          <div class="col-md-6 col-lg-5">
            <div class="card shadow-sm">
              <div class="card-body p-4">
                <h1 class="h4 mb-3">Iniciar sesión</h1>
                <p class="text-muted mb-4">Accede a tu cuenta para gestionar tus pedidos.</p>

                <form @submit.prevent="login">
                  <div class="mb-3">
                    <label for="email" class="form-label">Email</label>
                    <input id="email" v-model="email" type="email" class="form-control" required />
                  </div>
                  <div class="mb-3">
                    <label for="password" class="form-label">Contraseña</label>
                    <input id="password" v-model="password" type="password" class="form-control" required />
                  </div>
                  <button type="submit" class="btn btn-primary w-100" :disabled="loading">
                    <span v-if="loading" class="spinner-border spinner-border-sm me-2" />
                    {{ loading ? 'Entrando...' : 'Entrar' }}
                  </button>
                </form>

                <div v-if="error" class="alert alert-danger mt-3">{{ error }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import type { SupabaseClient } from '@supabase/supabase-js'
const nuxtApp = useNuxtApp()
const route = useRoute()
const supabase = nuxtApp.$supabase as SupabaseClient | undefined

const email = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')

useHead({ title: 'Login - Expo Cerámicas' })

async function login() {
  error.value = ''
  loading.value = true
  try {
    if (!supabase) {
      throw new Error('Supabase no está configurado. Contacta al administrador.')
    }
    const { data, error: authError } = await supabase.auth.signInWithPassword({ email: email.value, password: password.value })
    if (authError) throw authError
    const redirect = route.query.redirect || '/my-account'
    await navigateTo(String(redirect))
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Error al iniciar sesión'
  } finally {
    loading.value = false
  }
}
</script>
