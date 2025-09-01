<script setup>
definePageMeta({
  layout: 'web'
})
</script>

<template>
  <main>
    <section id="slider">
      <div class="swiper">
        <div class="swiper-wrapper">
          <div class="swiper-slide">
            <img src="#" alt="Slide 1" />
          </div>
          <div class="swiper-slide">
            <img src="#" alt="Slide 2" />
          </div>
          <div class="swiper-slide">
            <img src="#" alt="Slide 3" />
          </div>
        </div>
      </div>
      <div class="swiper-pagination"></div>
    </section>
    
    <section>
      <div class="container-fluid-custom">
        <div class="row">
          <div class="col-12">
            <h2>Productos Destacados</h2>
          </div>
          <div class="col-12">
            <div class="row">
              <div class="col-4">
                <div class="product">
                  <img src="#" alt="Product 1" />
                  <h3>Product 1</h3>
                  <p>Descripción del producto 1</p>
                  <a href="#">Ver más</a>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

    </section>
  </main>
</template>
