<template>
  <footer class="bg-white border-t mt-auto">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Expoceramicas</h3>
          <p class="text-gray-600">Premium ceramic products for your home and lifestyle.</p>
        </div>
        <div>
          <h4 class="text-md font-medium text-gray-900 mb-4">Quick Links</h4>
          <ul class="space-y-2">
            <li><NuxtLink to="/" class="text-gray-600 hover:text-gray-900">Home</NuxtLink></li>
            <li><NuxtLink to="/store" class="text-gray-600 hover:text-gray-900">Store</NuxtLink></li>
            <li><NuxtLink to="/about" class="text-gray-600 hover:text-gray-900">About</NuxtLink></li>
          </ul>
        </div>
        <div>
          <h4 class="text-md font-medium text-gray-900 mb-4">Contact</h4>
          <p class="text-gray-600">Email: info@expoceramicas.com</p>
          <p class="text-gray-600">Phone: (555) 123-4567</p>
        </div>
      </div>
      <div class="border-t mt-8 pt-8 text-center text-gray-600">
        <p>&copy; 2024 Expoceramicas. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>