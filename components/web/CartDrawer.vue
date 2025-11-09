<template>
  <Teleport to="body">
    <Transition name="cart-overlay" appear>
      <div v-if="modelValue" class="cart-overlay" role="dialog" aria-modal="true" aria-labelledby="cartTitle">
        <Transition name="cart-backdrop" appear>
          <div v-if="modelValue" class="cart-backdrop" @click="close" aria-hidden="true"></div>
        </Transition>
        <Transition name="cart-drawer" appear>
          <aside v-if="modelValue" class="cart-drawer" tabindex="-1">
            <header class="cart-header d-flex align-items-center justify-content-between">
              <h2 id="cartTitle" class="h5 mb-0">Tu carrito</h2>
              <button class="btn btn-link text-dark" @click="close" aria-label="Cerrar carrito">
                <i class="fa-solid fa-xmark"></i>
              </button>
            </header>

            <section class="cart-body">
              <div v-if="items.length === 0" class="text-center text-muted py-4">
                <i class="fa-regular fa-cart-shopping mb-2"></i>
                <p class="mb-0">No hay productos en el carrito.</p>
              </div>

              <ul v-else class="list-unstyled mb-0">
                <li v-for="(it, idx) in items" :key="it.id ?? idx" class="cart-item d-flex align-items-center">
                  <img v-if="it.image" :src="it.image" :alt="it.title" class="cart-thumb" />
                  <div class="flex-grow-1">
                    <div class="d-flex align-items-center justify-content-between">
                      <strong class="cart-title">{{ it.title }}</strong>
                      <span class="cart-line-price">{{ currency(it.price * (it.qty || 1)) }}</span>
                    </div>
                    <div class="d-flex align-items-center justify-content-between mt-1">
                      <div class="qty-group" aria-label="Controles de cantidad">
                        <button
                          class="qty-btn"
                          type="button"
                          :disabled="(it.qty || 1) <= 1"
                          @click="decreaseQty(idx)"
                          aria-label="Disminuir cantidad"
                        >
                          –
                        </button>
                        <span class="qty-value" aria-live="polite">{{ it.qty || 1 }}</span>
                        <button
                          class="qty-btn"
                          type="button"
                          @click="increaseQty(idx)"
                          aria-label="Aumentar cantidad"
                        >
                          +
                        </button>
                      </div>
                      <button
                        class="btn btn-link text-danger p-0"
                        type="button"
                        @click="removeItem(idx)"
                        aria-label="Eliminar del carrito"
                      >
                        <i class="fa-solid fa-trash"></i>
                      </button>
                    </div>
                  </div>
                </li>
              </ul>
            </section>

            <footer class="cart-footer">
              <div class="d-flex align-items-center justify-content-between mb-3">
                <span class="fw-semibold">Total</span>
                <span class="fw-bold">{{ currency(total) }}</span>
              </div>
              <div class="d-flex gap-2">
                <button class="btn btn-outline-secondary w-100" @click="seguirComprando">
                  Seguir comprando
                </button>
                <NuxtLink
                  to="/checkout"
                  class="btn btn-primary w-100 text-decoration-none"
                  @click="close"
                >
                  <i class="fa-solid fa-credit-card me-2"></i>
                  Proceder al Checkout
                </NuxtLink>
              </div>
            </footer>
          </aside>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { computed, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from '#imports'

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  items: { type: Array, default: () => [] },
})
const emit = defineEmits(['update:modelValue'])

const router = useRouter()

const total = computed(() => {
  return (props.items || []).reduce((sum, it) => sum + (Number(it.price) || 0) * (it.qty || 1), 0)
})

function currency(n) {
  try {
    return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(n || 0)
  } catch (e) {
    return `$${(n || 0).toFixed(2)}`
  }
}

function close() {
  emit('update:modelValue', false)
}
function seguirComprando() {
  close()
  router.push('/')
}
function proceedToCheckout() {
  // Aquí iría la lógica para proceder al checkout
  console.log('Proceeding to checkout with items:', props.items)
  close()
}

// Estado global del carrito para actualizar cantidades y eliminar
const cartItemsState = useState('cartItems', () => [])

function increaseQty(idx) {
  const items = [...cartItemsState.value]
  const it = items[idx]
  if (!it) return
  it.qty = (it.qty || 1) + 1
  cartItemsState.value = items
}

function decreaseQty(idx) {
  const items = [...cartItemsState.value]
  const it = items[idx]
  if (!it) return
  const next = Math.max(1, (it.qty || 1) - 1)
  it.qty = next
  cartItemsState.value = items
}

function removeItem(idx) {
  const items = cartItemsState.value.filter((_, i) => i !== idx)
  cartItemsState.value = items
}

function onKey(e) {
  if (e.key === 'Escape') close()
}

onMounted(() => {
  document.addEventListener('keydown', onKey)
})
onBeforeUnmount(() => {
  document.removeEventListener('keydown', onKey)
})
</script>

<style scoped>
.cart-overlay { position: fixed; inset: 0; z-index: 1050; }
.cart-backdrop { position: absolute; inset: 0; background: rgba(0,0,0,0.4); }
.cart-drawer { position: absolute; right: 0; top: 0; height: 100%; width: 380px; max-width: 100%; background: #fff; box-shadow: -4px 0 24px rgba(0,0,0,0.15); display: flex; flex-direction: column; }
.cart-header { padding: 1rem; border-bottom: 1px solid #eee; }
.cart-body { padding: 1rem; flex: 1; overflow-y: auto; }
.cart-footer { padding: 1rem; border-top: 1px solid #eee; }
.cart-item { gap: 12px; padding: 8px 0; border-bottom: 1px solid #f2f2f2; }
.cart-item:last-child { border-bottom: none; }
.cart-thumb { width: 56px; height: 56px; object-fit: cover; border-radius: 8px; background: #f8f8f8; }
.cart-title { font-weight: 600; }
.cart-line-price { color: #111; }
@media (max-width: 480px) { .cart-drawer { width: 100%; } }

/* Animation transitions */
.cart-overlay-enter-active, .cart-overlay-leave-active {
  transition: opacity 0.3s ease;
}
.cart-overlay-enter-from, .cart-overlay-leave-to {
  opacity: 0;
}

.cart-backdrop-enter-active, .cart-backdrop-leave-active {
  transition: opacity 0.3s ease;
}
.cart-backdrop-enter-from, .cart-backdrop-leave-to {
  opacity: 0;
}

.cart-drawer-enter-active, .cart-drawer-leave-active {
  transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
.cart-drawer-enter-from, .cart-drawer-leave-to {
  transform: translateX(100%);
}

/* Quantity controls */
.qty-group { display: inline-flex; align-items: center; border: 1px solid #ddd; border-radius: 8px; overflow: hidden; }
.qty-btn { width: 32px; height: 32px; display: inline-flex; align-items: center; justify-content: center; background: #fff; color: #333; border: none; }
.qty-btn:hover { background: #f5f5f5; }
.qty-btn:disabled { opacity: 0.5; cursor: not-allowed; }
.qty-value { min-width: 28px; text-align: center; font-weight: 600; color: #111; }
</style>