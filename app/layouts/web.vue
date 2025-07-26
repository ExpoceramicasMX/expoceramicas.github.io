<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <Navbar />

    <!-- Main Content -->
    <main class="flex-1">
      <slot />
    </main>

    <!-- Footer -->
    <Footer />
  </div>
</template>