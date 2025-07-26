<script setup lang="ts">
definePageMeta({
  layout: 'web'
})
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-gray-900 mb-4">About Expoceramicas</h1>
        <p class="text-xl text-gray-600">Crafting beautiful ceramics since 1985</p>
      </div>

      <div class="bg-white rounded-lg shadow-sm p-8 mb-8">
        <div class="prose prose-lg max-w-none">
          <p class="text-gray-700 mb-6">
            At Expoceramicas, we believe that ceramics are more than just functional objects – they are expressions of art, culture, and craftsmanship. For over three decades, we have been dedicated to creating beautiful, high-quality ceramic pieces that bring elegance and warmth to homes around the world.
          </p>

          <h2 class="text-2xl font-bold text-gray-900 mb-4">Our Story</h2>
          <p class="text-gray-700 mb-6">
            Founded in 1985 by master ceramicist Maria Rodriguez, Expoceramicas began as a small studio in the heart of Mexico. What started as a passion project has grown into a renowned ceramics company, known for our commitment to traditional techniques and innovative designs.
          </p>

          <h2 class="text-2xl font-bold text-gray-900 mb-4">Our Craft</h2>
          <p class="text-gray-700 mb-6">
            Every piece in our collection is handcrafted by skilled artisans who have honed their craft over years of dedicated practice. We use only the finest clay and glazes, ensuring that each item is not only beautiful but also durable and functional.
          </p>

          <h2 class="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
          <p class="text-gray-700">
            We are committed to preserving traditional ceramic techniques while embracing modern design sensibilities. Our mission is to create pieces that enhance daily life, bringing beauty and functionality to every home.
          </p>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="text-center">
          <div class="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <UIcon name="i-heroicons-hand-raised" class="w-8 h-8 text-blue-600" />
          </div>
          <h3 class="text-lg font-semibold text-gray-900 mb-2">Handcrafted Excellence</h3>
          <p class="text-gray-600">Each piece is carefully crafted by skilled artisans using traditional techniques passed down through generations.</p>
        </div>

        <div class="text-center">
          <div class="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <UIcon name="i-heroicons-globe-americas" class="w-8 h-8 text-blue-600" />
          </div>
          <h3 class="text-lg font-semibold text-gray-900 mb-2">Global Reach</h3>
          <p class="text-gray-600">Our ceramics are loved by customers worldwide, bringing Mexican craftsmanship to homes across the globe.</p>
        </div>

        <div class="text-center">
          <div class="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <UIcon name="i-heroicons-heart" class="w-8 h-8 text-blue-600" />
          </div>
          <h3 class="text-lg font-semibold text-gray-900 mb-2">Made with Love</h3>
          <p class="text-gray-600">Every piece is created with passion and attention to detail, ensuring the highest quality and beauty.</p>
        </div>
      </div>
    </div>
  </div>
</template>