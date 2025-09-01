<template>
  <div class="container py-5">
    <div class="row justify-content-center">
      <div class="col-md-8 col-lg-6">
        <div class="card shadow-lg border-0">
          <div class="card-header bg-primary text-white text-center py-4">
            <h2 class="mb-0">Create Your Account</h2>
          </div>
          <div class="card-body p-5">
            <form @submit.prevent="handleSubmit">
              <div class="mb-4">
                <label for="fullName" class="form-label">Full Name</label>
                <input 
                  type="text" 
                  class="form-control" 
                  id="fullName" 
                  v-model="form.fullName"
                  required
                >
              </div>

              <div class="mb-4">
                <label for="email" class="form-label">Email Address</label>
                <input 
                  type="email" 
                  class="form-control" 
                  id="email" 
                  v-model="form.email"
                  required
                >
              </div>

              <div class="mb-4">
                <label for="password" class="form-label">Password</label>
                <input 
                  type="password" 
                  class="form-control" 
                  id="password" 
                  v-model="form.password"
                  required
                >
              </div>

              <div class="mb-4">
                <label for="phone" class="form-label">Phone Number</label>
                <input 
                  type="tel" 
                  class="form-control" 
                  id="phone" 
                  v-model="form.phone"
                  required
                >
              </div>

              <div class="mb-4">
                <label for="address" class="form-label">Shipping Address</label>
                <textarea 
                  class="form-control" 
                  id="address" 
                  rows="3"
                  v-model="form.address"
                  required
                ></textarea>
              </div>

              <div class="mb-4 form-check">
                <input 
                  type="checkbox" 
                  class="form-check-input" 
                  id="terms"
                  v-model="form.terms"
                  required
                >
                <label class="form-check-label" for="terms">
                  I agree to the Terms and Conditions
                </label>
              </div>

              <button type="submit" class="btn btn-primary w-100 py-2">
                Create Account
              </button>
            </form>

            <div class="text-center mt-4">
              <p class="mb-0">Already have an account? 
                <nuxt-link to="/login" class="text-primary">Sign In</nuxt-link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        fullName: '',
        email: '',
        password: '',
        phone: '',
        address: '',
        terms: false
      }
    }
  },
  methods: {
    handleSubmit() {
      // Handle form submission logic here
      console.log('Form submitted:', this.form)
    }
  }
}
</script>

<style scoped>
.card {
  border-radius: 1rem;
}

.card-header {
  border-radius: 1rem 1rem 0 0 !important;
}

.form-control:focus {
  box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
  border-color: #86b7fe;
}

.btn-primary {
  font-weight: 600;
  letter-spacing: 0.5px;
}

.btn-primary:hover {
  transform: translateY(-1px);
  transition: transform 0.2s;
}
</style>
