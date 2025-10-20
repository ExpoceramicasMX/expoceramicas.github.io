<template>
   <div>
   <Analytics/>
    <Navbar />
    <slot />
    <Footer />
   </div>
</template>

<script setup>
import Navbar from '~/components/web/Navbar.vue'
import Footer from '~/components/web/Footer.vue'
import { Analytics } from '@vercel/analytics/nuxt'
</script>