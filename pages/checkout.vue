<template>
  <div>
    <NuxtLayout name="web">
      <div class="checkout-page">
        <div class="container py-5">
          <div class="row">
            <div class="col-12">
              <nav aria-label="breadcrumb" class="mb-4">
                <ol class="breadcrumb">
                  <li class="breadcrumb-item">
                    <NuxtLink to="/" class="text-decoration-none">Inicio</NuxtLink>
                  </li>
                  <li class="breadcrumb-item active" aria-current="page">Checkout</li>
                </ol>
              </nav>
              <h1 class="h2 mb-4">Finalizar Compra</h1>
            </div>
          </div>

          <div class="row g-4">
            <!-- Formulario de checkout -->
            <div class="col-lg-8">
              <form @submit.prevent="processOrder" class="checkout-form">
                <!-- Información del cliente -->
                <div class="card mb-4">
                  <div class="card-header">
                    <h3 class="h5 mb-0">
                      <i class="fa-solid fa-user me-2"></i>
                      Información del Cliente
                    </h3>
                  </div>
                  <div class="card-body">
                    <div class="row g-3">
                      <div class="col-md-6">
                        <label for="firstName" class="form-label">Nombre *</label>
                        <input
                          id="firstName"
                          v-model="form.firstName"
                          type="text"
                          class="form-control"
                          :class="{ 'is-invalid': errors.firstName }"
                          required
                        />
                        <div v-if="errors.firstName" class="invalid-feedback">
                          {{ errors.firstName }}
                        </div>
                      </div>
                      <div class="col-md-6">
                        <label for="lastName" class="form-label">Apellidos *</label>
                        <input
                          id="lastName"
                          v-model="form.lastName"
                          type="text"
                          class="form-control"
                          :class="{ 'is-invalid': errors.lastName }"
                          required
                        />
                        <div v-if="errors.lastName" class="invalid-feedback">
                          {{ errors.lastName }}
                        </div>
                      </div>
                      <div class="col-md-6">
                        <label for="email" class="form-label">Email *</label>
                        <input
                          id="email"
                          v-model="form.email"
                          type="email"
                          class="form-control"
                          :class="{ 'is-invalid': errors.email }"
                          required
                        />
                        <div v-if="errors.email" class="invalid-feedback">
                          {{ errors.email }}
                        </div>
                      </div>
                      <div class="col-md-6">
                        <label for="phone" class="form-label">Teléfono *</label>
                        <input
                          id="phone"
                          v-model="form.phone"
                          type="tel"
                          class="form-control"
                          :class="{ 'is-invalid': errors.phone }"
                          required
                        />
                        <div v-if="errors.phone" class="invalid-feedback">
                          {{ errors.phone }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Dirección de envío -->
                <div class="card mb-4">
                  <div class="card-header">
                    <h3 class="h5 mb-0">
                      <i class="fa-solid fa-truck me-2"></i>
                      Dirección de Envío
                    </h3>
                  </div>
                  <div class="card-body">
                    <div class="row g-3">
                      <div class="col-12">
                        <label for="address" class="form-label">Dirección *</label>
                        <input
                          id="address"
                          v-model="form.address"
                          type="text"
                          class="form-control"
                          :class="{ 'is-invalid': errors.address }"
                          placeholder="Calle, número, colonia"
                          required
                        />
                        <div v-if="errors.address" class="invalid-feedback">
                          {{ errors.address }}
                        </div>
                      </div>
                      <div class="col-md-4">
                        <label for="city" class="form-label">Ciudad *</label>
                        <input
                          id="city"
                          v-model="form.city"
                          type="text"
                          class="form-control"
                          :class="{ 'is-invalid': errors.city }"
                          required
                        />
                        <div v-if="errors.city" class="invalid-feedback">
                          {{ errors.city }}
                        </div>
                      </div>
                      <div class="col-md-4">
                        <label for="state" class="form-label">Estado *</label>
                        <select
                          id="state"
                          v-model="form.state"
                          class="form-select"
                          :class="{ 'is-invalid': errors.state }"
                          required
                        >
                          <option value="">Seleccionar estado</option>
                          <option v-for="state in mexicanStates" :key="state" :value="state">
                            {{ state }}
                          </option>
                        </select>
                        <div v-if="errors.state" class="invalid-feedback">
                          {{ errors.state }}
                        </div>
                      </div>
                      <div class="col-md-4">
                        <label for="zipCode" class="form-label">Código Postal *</label>
                        <input
                          id="zipCode"
                          v-model="form.zipCode"
                          type="text"
                          class="form-control"
                          :class="{ 'is-invalid': errors.zipCode }"
                          pattern="[0-9]{5}"
                          maxlength="5"
                          required
                        />
                        <div v-if="errors.zipCode" class="invalid-feedback">
                          {{ errors.zipCode }}
                        </div>
                      </div>
                      <div class="col-12">
                        <label for="notes" class="form-label">Notas adicionales</label>
                        <textarea
                          id="notes"
                          v-model="form.notes"
                          class="form-control"
                          rows="3"
                          placeholder="Referencias, instrucciones especiales, etc."
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Método de pago -->
                <div class="card mb-4">
                  <div class="card-header">
                    <h3 class="h5 mb-0">
                      <i class="fa-solid fa-credit-card me-2"></i>
                      Método de Pago
                    </h3>
                  </div>
                  <div class="card-body">
                    <div class="row g-3">
                      <div class="col-12">
                        <div class="form-check mb-3">
                          <input
                            id="paymentCard"
                            v-model="form.paymentMethod"
                            class="form-check-input"
                            type="radio"
                            value="card"
                          />
                          <label class="form-check-label" for="paymentCard">
                            <i class="fa-solid fa-credit-card me-2"></i>
                            Tarjeta de Crédito/Débito
                          </label>
                        </div>
                        <div class="form-check mb-3">
                          <input
                            id="paymentTransfer"
                            v-model="form.paymentMethod"
                            class="form-check-input"
                            type="radio"
                            value="transfer"
                          />
                          <label class="form-check-label" for="paymentTransfer">
                            <i class="fa-solid fa-building-columns me-2"></i>
                            Transferencia Bancaria
                          </label>
                        </div>
                        <div class="form-check">
                          <input
                            id="paymentCash"
                            v-model="form.paymentMethod"
                            class="form-check-input"
                            type="radio"
                            value="cash"
                          />
                          <label class="form-check-label" for="paymentCash">
                            <i class="fa-solid fa-money-bills me-2"></i>
                            Pago en Efectivo (Contra entrega)
                          </label>
                        </div>
                      </div>

                      <!-- Información de tarjeta (solo si se selecciona tarjeta) -->
                      <div v-if="form.paymentMethod === 'card'" class="col-12 mt-4">
                        <div class="card bg-light">
                          <div class="card-body">
                            <div class="row g-3">
                              <div class="col-12">
                                <label for="cardNumber" class="form-label">Número de Tarjeta *</label>
                                <input
                                  id="cardNumber"
                                  v-model="form.cardNumber"
                                  type="text"
                                  class="form-control"
                                  placeholder="1234 5678 9012 3456"
                                  maxlength="19"
                                  @input="formatCardNumber"
                                />
                              </div>
                              <div class="col-md-6">
                                <label for="cardExpiry" class="form-label">Fecha de Vencimiento *</label>
                                <input
                                  id="cardExpiry"
                                  v-model="form.cardExpiry"
                                  type="text"
                                  class="form-control"
                                  placeholder="MM/AA"
                                  maxlength="5"
                                  @input="formatCardExpiry"
                                />
                              </div>
                              <div class="col-md-6">
                                <label for="cardCvv" class="form-label">CVV *</label>
                                <input
                                  id="cardCvv"
                                  v-model="form.cardCvv"
                                  type="text"
                                  class="form-control"
                                  placeholder="123"
                                  maxlength="4"
                                />
                              </div>
                              <div class="col-12">
                                <label for="cardName" class="form-label">Nombre en la Tarjeta *</label>
                                <input
                                  id="cardName"
                                  v-model="form.cardName"
                                  type="text"
                                  class="form-control"
                                  placeholder="Como aparece en la tarjeta"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <!-- Información de transferencia -->
                      <div v-if="form.paymentMethod === 'transfer'" class="col-12 mt-4">
                        <div class="alert alert-info">
                          <h6><i class="fa-solid fa-info-circle me-2"></i>Datos para Transferencia</h6>
                          <p class="mb-2"><strong>Banco:</strong> BBVA Bancomer</p>
                          <p class="mb-2"><strong>Cuenta:</strong> 0123456789</p>
                          <p class="mb-2"><strong>CLABE:</strong> 012345678901234567</p>
                          <p class="mb-0"><strong>Beneficiario:</strong> Expo Cerámicas S.A. de C.V.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>

            <!-- Resumen del pedido -->
            <div class="col-lg-4">
              <div class="card sticky-top" style="top: 2rem;">
                <div class="card-header">
                  <h3 class="h5 mb-0">
                    <i class="fa-solid fa-shopping-bag me-2"></i>
                    Resumen del Pedido
                  </h3>
                </div>
                <div class="card-body">
                  <!-- Items del carrito -->
                  <div v-if="cartItems.length === 0" class="text-center text-muted py-4">
                    <i class="fa-regular fa-cart-shopping mb-2 d-block"></i>
                    <p class="mb-0">No hay productos en el carrito</p>
                    <NuxtLink to="/products" class="btn btn-outline-primary btn-sm mt-2">
                      Ver productos
                    </NuxtLink>
                  </div>

                  <div v-else>
                    <div v-for="(item, idx) in cartItems" :key="item.id ?? idx" class="d-flex align-items-center mb-3 pb-3 border-bottom">
                      <img
                        v-if="item.image"
                        :src="item.image"
                        :alt="item.title"
                        class="checkout-thumb me-3"
                      />
                      <div class="flex-grow-1">
                        <h6 class="mb-1">{{ item.title }}</h6>
                        <small class="text-muted">Cantidad: {{ item.qty || 1 }}</small>
                        <div class="fw-semibold">{{ currency(item.price * (item.qty || 1)) }}</div>
                      </div>
                    </div>

                    <!-- Totales -->
                    <div class="border-top pt-3">
                      <div class="d-flex justify-content-between mb-2">
                        <span>Subtotal:</span>
                        <span>{{ currency(subtotal) }}</span>
                      </div>
                      <div class="d-flex justify-content-between mb-2">
                        <span>Envío:</span>
                        <span>{{ currency(shippingCost) }}</span>
                      </div>
                      <div class="d-flex justify-content-between mb-2">
                        <span>IVA (16%):</span>
                        <span>{{ currency(tax) }}</span>
                      </div>
                      <hr />
                      <div class="d-flex justify-content-between fw-bold h5">
                        <span>Total:</span>
                        <span>{{ currency(total) }}</span>
                      </div>
                    </div>

                    <!-- Botón de finalizar compra -->
                    <button
                      type="submit"
                      form="checkout-form"
                      class="btn btn-primary w-100 mt-3"
                      :disabled="isProcessing || cartItems.length === 0"
                      @click="processOrder"
                    >
                      <span v-if="isProcessing" class="spinner-border spinner-border-sm me-2" role="status"></span>
                      {{ isProcessing ? 'Procesando...' : 'Finalizar Compra' }}
                    </button>

                    <div class="text-center mt-3">
                      <small class="text-muted">
                        <i class="fa-solid fa-lock me-1"></i>
                        Compra 100% segura
                      </small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </NuxtLayout>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

// Meta tags
useHead({
  title: 'Checkout - Expo Cerámicas',
  meta: [
    { name: 'description', content: 'Finaliza tu compra de productos cerámicos de alta calidad' }
  ]
})

// Estado del carrito
const cartItems = useState('cartItems', () => [])

// Estado del formulario
const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  state: '',
  zipCode: '',
  notes: '',
  paymentMethod: 'card',
  cardNumber: '',
  cardExpiry: '',
  cardCvv: '',
  cardName: ''
})

// Errores de validación
const errors = ref({})

// Estado de procesamiento
const isProcessing = ref(false)

// Estados de México
const mexicanStates = [
  'Aguascalientes', 'Baja California', 'Baja California Sur', 'Campeche',
  'Chiapas', 'Chihuahua', 'Ciudad de México', 'Coahuila', 'Colima',
  'Durango', 'Estado de México', 'Guanajuato', 'Guerrero', 'Hidalgo',
  'Jalisco', 'Michoacán', 'Morelos', 'Nayarit', 'Nuevo León', 'Oaxaca',
  'Puebla', 'Querétaro', 'Quintana Roo', 'San Luis Potosí', 'Sinaloa',
  'Sonora', 'Tabasco', 'Tamaulipas', 'Tlaxcala', 'Veracruz', 'Yucatán', 'Zacatecas'
]

// Cálculos
const subtotal = computed(() => {
  return cartItems.value.reduce((sum, item) => sum + (Number(item.price) || 0) * (item.qty || 1), 0)
})

const shippingCost = computed(() => {
  return subtotal.value > 2000 ? 0 : 150 // Envío gratis en compras mayores a $2000
})

const tax = computed(() => {
  return subtotal.value * 0.16 // IVA 16%
})

const total = computed(() => {
  return subtotal.value + shippingCost.value + tax.value
})

// Funciones de formato
function currency(amount) {
  try {
    return new Intl.NumberFormat('es-MX', { 
      style: 'currency', 
      currency: 'MXN' 
    }).format(amount || 0)
  } catch (e) {
    return `$${(amount || 0).toFixed(2)}`
  }
}

function formatCardNumber(event) {
  let value = event.target.value.replace(/\s/g, '').replace(/[^0-9]/gi, '')
  const matches = value.match(/\d{4,16}/g)
  const match = matches && matches[0] || ''
  const parts = []
  
  for (let i = 0, len = match.length; i < len; i += 4) {
    parts.push(match.substring(i, i + 4))
  }
  
  if (parts.length) {
    form.value.cardNumber = parts.join(' ')
  } else {
    form.value.cardNumber = value
  }
}

function formatCardExpiry(event) {
  let value = event.target.value.replace(/\D/g, '')
  if (value.length >= 2) {
    value = value.substring(0, 2) + '/' + value.substring(2, 4)
  }
  form.value.cardExpiry = value
}

// Validación
function validateForm() {
  errors.value = {}
  
  if (!form.value.firstName.trim()) {
    errors.value.firstName = 'El nombre es requerido'
  }
  
  if (!form.value.lastName.trim()) {
    errors.value.lastName = 'Los apellidos son requeridos'
  }
  
  if (!form.value.email.trim()) {
    errors.value.email = 'El email es requerido'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email)) {
    errors.value.email = 'El email no es válido'
  }
  
  if (!form.value.phone.trim()) {
    errors.value.phone = 'El teléfono es requerido'
  }
  
  if (!form.value.address.trim()) {
    errors.value.address = 'La dirección es requerida'
  }
  
  if (!form.value.city.trim()) {
    errors.value.city = 'La ciudad es requerida'
  }
  
  if (!form.value.state) {
    errors.value.state = 'El estado es requerido'
  }
  
  if (!form.value.zipCode.trim()) {
    errors.value.zipCode = 'El código postal es requerido'
  } else if (!/^\d{5}$/.test(form.value.zipCode)) {
    errors.value.zipCode = 'El código postal debe tener 5 dígitos'
  }
  
  return Object.keys(errors.value).length === 0
}

// Procesar pedido
async function processOrder() {
  if (!validateForm()) {
    return
  }
  
  if (cartItems.value.length === 0) {
    alert('No hay productos en el carrito')
    return
  }
  
  isProcessing.value = true
  
  try {
    // Simular procesamiento del pedido
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Aquí iría la lógica real de procesamiento del pedido
    // Por ejemplo, enviar datos a una API
    
    const orderData = {
      customer: {
        firstName: form.value.firstName,
        lastName: form.value.lastName,
        email: form.value.email,
        phone: form.value.phone
      },
      shipping: {
        address: form.value.address,
        city: form.value.city,
        state: form.value.state,
        zipCode: form.value.zipCode,
        notes: form.value.notes
      },
      payment: {
        method: form.value.paymentMethod
      },
      items: cartItems.value,
      totals: {
        subtotal: subtotal.value,
        shipping: shippingCost.value,
        tax: tax.value,
        total: total.value
      }
    }
    
    console.log('Orden procesada:', orderData)
    
    // Limpiar carrito
    cartItems.value = []
    
    // Mostrar mensaje de éxito
    alert('¡Pedido realizado con éxito! Recibirás un email de confirmación.')
    
    // Redirigir a página de confirmación
    await navigateTo('/')
    
  } catch (error) {
    console.error('Error al procesar el pedido:', error)
    alert('Hubo un error al procesar tu pedido. Por favor intenta de nuevo.')
  } finally {
    isProcessing.value = false
  }
}

// Cargar datos de prueba si el carrito está vacío
onMounted(() => {
  if (cartItems.value.length === 0) {
    cartItems.value = [
      {
        id: 1,
        title: 'Azulejo Cerámico Premium',
        price: 120,
        qty: 2,
        image: '/expo-logo.png'
      },
      {
        id: 2,
        title: 'Piso Porcelánico',
        price: 250,
        qty: 1,
        image: '/expo-logo.png'
      }
    ]
  }
})
</script>

<style scoped>
.checkout-page {
  background-color: #f8f9fa;
  min-height: 100vh;
}

.checkout-thumb {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 8px;
  background: #f8f8f8;
}

.card {
  border: none;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.card-header {
  background: #fff;
  border-bottom: 1px solid #eee;
  font-weight: 600;
}

.form-control:focus,
.form-select:focus {
  border-color: #0d6efd;
  box-shadow: 0 0 0 0.2rem rgba(13, 110, 253, 0.25);
}

.btn-primary {
  background: linear-gradient(135deg, #0d6efd 0%, #0056b3 100%);
  border: none;
  padding: 12px 24px;
  font-weight: 600;
}

.btn-primary:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(13, 110, 253, 0.3);
}

.sticky-top {
  position: sticky;
}

@media (max-width: 768px) {
  .sticky-top {
    position: static;
  }
}
</style>