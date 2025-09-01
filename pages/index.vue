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
            <img src="#" alt="Slide 1">
            <div class="slide-content">
              <h1>Welcome to Expoceramicas</h1>
              <p>Discover our exclusive collection of ceramic tiles</p>
              <NuxtLink to="/products" class="btn btn-primary">View Products</NuxtLink>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div class="slide">
            <img src="#" alt="Slide 2">
            <div class="slide-content">
              <h1>Premium Quality Ceramics</h1>
              <p>For your home and commercial projects</p>
              <NuxtLink to="/contact" class="btn btn-primary">Contact Us</NuxtLink>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div class="slide">
            <img src="#" alt="Slide 3">
            <div class="slide-content">
              <h1>Expert Design Consultation</h1>
              <p>Let us help you find the perfect tiles</p>
              <NuxtLink to="/services" class="btn btn-primary">Our Services</NuxtLink>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </section>

    <section>
      <div class="container-fluid-custom">
        <div class="row">
          <div class="col-12">
            <h2>Productos Destacados</h2>
          </div>
          <div class="col-12">
            <div class="row">
              <Swiper
                :modules="[Autoplay, Pagination, Navigation]"
                :slides-per-view="4"
                :space-between="30"
                :loop="true"
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
                    <img src="#" :alt="`Product ${i}`" />
                    <h3>Product {{ i }}</h3>
                    <p>Descripción del producto {{ i }}</p>
                    <a href="#">Ver más</a>
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section>
      <div class="container">
        <div class="row">
          <div class="col-12">
            <h2>Productos Destacados</h2>
          </div>

        </div>
        <div class="row">
          <div class="col-md-6">
            <div class="product card">
              <div class="card-body">
                <img src="#" alt="Product 1" />
              <h3 class="card-title">Product 1</h3>

              <p class="card-text">Descripción del producto 1</p>

              <a href="#">Ver más</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
