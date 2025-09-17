<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

definePageMeta({
  layout: 'web'
})
</script>

<template>
  <main>
    <section class="hero-slider">
      <Swiper
      id="header-slider"
        :modules="[Autoplay, Pagination, Navigation]"
        :slides-per-view="1"
        :loop="true"
        :autoplay="{
          delay: 5000,
          disableOnInteraction: false,
        }"
        :pagination="{
          clickable: true,
        }"
        :navigation="true"
      >
        <SwiperSlide>
          <div class="slide">
            <img src="https://porcelanite.com.mx/wp-content/uploads/3149_PORCELANITE_LAURET_HQ.webp" alt="Slide 1">
            <div class="slide-content text-white shadow">
              <h1 class="shdaow">Bienvenido a Expoceramicas</h1>
              <p class="shadow">Tu lugar para conocer mas sobre como renovar tu hogar.</p>
              <NuxtLink to="/products" class="btn btn-primary">Ver Productos</NuxtLink>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div class="slide">
            <img src="https://porcelanite.com.mx/wp-content/uploads/CARRARA_NEW_PORCELANITE_HQ.webp" alt="Slide 2">
            <div class="slide-content text-white shadow">
              <h1>Encuentra las mejores marcas y mejores productos</h1>
              <p>Conoce mas antes de comprar lo que no necesitas.</p>
              <NuxtLink to="/inspirate" class="btn btn-primary">Ver Mas</NuxtLink>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div class="slide">
            <img src="https://porcelanite.com.mx/wp-content/uploads/NATURAWOOD_20x90_NEW_PORCELANITE_HQ.webp" alt="Slide 3">
            <div class="slide-content text-white shadow">
              <h1><em>Inspirate</em> con nuestro blog</h1>
              <p>Encuentra la inspiracion que necesitas para crear los mejores espacios.</p>
              <NuxtLink to="/services" class="btn btn-primary">Visita el blog</NuxtLink>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </section>

    <section>
      <div class="container-fluid-custom">
        <div class="row">
          <div class="col-12 py-5">
            <h2>Productos Populares</h2>
          </div>
          <div class="col-12">
            <div class="row">
              <Swiper
                id="product-slider"
                :modules="[Autoplay, Pagination, Navigation]"
                :slides-per-view="4"
                :space-between="30"
                :loop="true"
                :navigation="true"
                :autoplay="{
                  delay: 3000,
                  disableOnInteraction: false
                }"
                :breakpoints="{
                  320: {
                    slidesPerView: 1,
                    spaceBetween: 20
                  },
                  640: {
                    slidesPerView: 2,
                    spaceBetween: 20
                  },
                  768: {
                    slidesPerView: 3,
                    spaceBetween: 30
                  },
                  1024: {
                    slidesPerView: 4,
                    spaceBetween: 30
                  }
                }"
              >
                <SwiperSlide v-for="i in 8" :key="i">
                  <div class="product">
                    <img src="https://porcelanite.com.mx/wp-content/uploads/LAURET-CAFE_01-1-1024x1024.webp" :alt="`Product ${i}`" />
                    <h3>Lauret {{ i }}</h3>
                    <p>Descripción del producto {{ i }}</p>
                    <a href="#" class="btn btn-primary">Ver más</a>
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="productos-populares">
      <div class="container py-5">
        <div class="row">
          <div class="col-12">
            <h2>Productos Destacados</h2>
          </div>

        </div>
        <div class="row">
          <div class="col-md-3 mb-5" v-for="i in 8" :key="i">
            <div class="product card" >
              <div class="card-body">
                <img src="https://porcelanite.com.mx/wp-content/uploads/LAURET-CAFE_01-1-1024x1024.webp"  class="img-fluid" :alt="`Product ${i}`" />
              <h3 class="card-title">Product {{ i }}</h3>

              <p class="card-text">Descripción del producto {{ i }}</p>

              <a class="btn btn-primary" href="#">Ver más</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
