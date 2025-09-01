<template>
   <div>
    <Navbar />
    <slot />
    <Footer />
   </div>
</template>

<script setup>
import Navbar from '~/components/web/Navbar.vue'
import Footer from '~/components/web/Footer.vue'
</script>