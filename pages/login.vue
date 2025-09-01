<template>
  <div class="container-fluid">
    <div class="row min-vh-100">
      <!-- Left side with image -->
      <div class="col-md-6 d-none d-md-flex bg-primary align-items-center justify-content-center">
        <div class="text-center text-white">
          <h1 class="display-2 fw-bold mb-4">Welcome Back!</h1>
          <p class="lead">Access your account to explore our amazing products</p>
          <img src="" alt="Shopping illustration" class="img-fluid w-75">
        </div>
      </div>

      <!-- Right side with login form -->
      <div class="col-md-6 d-flex align-items-center justify-content-center">
        <div class="card border-0 shadow-lg w-75">
          <div class="card-body p-5">
            <h2 class="text-center mb-5 fw-bold">Sign In</h2>
            
            <form @submit.prevent="handleLogin">
              <div class="mb-4">
                <label for="email" class="form-label">Email address</label>
                <div class="input-group">
                  <span class="input-group-text">
                    <i class="bi bi-envelope"></i>
                  </span>
                  <input 
                    type="email" 
                    class="form-control" 
                    id="email" 
                    v-model="email"
                    placeholder="name@example.com"
                    required
                  >
                </div>
              </div>

              <div class="mb-4">
                <label for="password" class="form-label">Password</label>
                <div class="input-group">
                  <span class="input-group-text">
                    <i class="bi bi-lock"></i>
                  </span>
                  <input 
                    type="password" 
                    class="form-control" 
                    id="password"
                    v-model="password" 
                    placeholder="Enter your password"
                    required
                  >
                </div>
              </div>

              <div class="mb-4 d-flex justify-content-between">
                <div class="form-check">
                  <input type="checkbox" class="form-check-input" id="remember">
                  <label class="form-check-label" for="remember">Remember me</label>
                </div>
                <a href="#" class="text-primary text-decoration-none">Forgot password?</a>
              </div>

              <button type="submit" class="btn btn-primary w-100 py-2 mb-4">
                Sign In
              </button>

              <div class="text-center">
                <p class="mb-0">Don't have an account? 
                  <a href="#" class="text-primary text-decoration-none">Sign up</a>
                </p>
              </div>
            </form>
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
      email: '',
      password: ''
    }
  },
  methods: {
    handleLogin() {
      // Handle login logic here
      console.log('Login attempt with:', this.email)
    }
  }
}
</script>

<style scoped>
.bg-primary {
  background: linear-gradient(135deg, #0d6efd 0%, #0dcaf0 100%);
}

.card {
  border-radius: 1rem;
}

.input-group-text {
  background-color: transparent;
}

.btn-primary {
  border-radius: 2rem;
  font-weight: 600;
  font-size: 1.1rem;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(13, 110, 253, 0.4);
  transition: all 0.3s ease;
}
</style>
