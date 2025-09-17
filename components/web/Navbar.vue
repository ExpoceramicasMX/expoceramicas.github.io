<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-white fixed-top shadow-sm">
    <div class="container">
      <!-- Logo -->
      <a class="navbar-brand" href="#">
        Expoceramicas MX
      </a>

      <!-- Hamburger button for mobile -->
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent">
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- Navigation content -->
      <div class="collapse navbar-collapse" id="navbarContent">
        <!-- Navigation Links -->
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link" href="/">Inicio</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/productos">Productos</a>
          </li>
          <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" id="dropdown-menu" data-bs-toggle="dropdown"
                            aria-haspopup="true" aria-expanded="false">Categoria</a>
                        <div class="dropdown-menu" aria-labelledby="dropdown-menu">
                            <a class="dropdown-item" href="#">Pisos y Recubrimientos</a>
                            <a class="dropdown-item" href="#">Baños</a>
                            <a class="dropdown-item" href="#">Cocina</a>
                            <a class="dropdown-item" href="#">Griferia</a>
                            <a class="dropdown-item" href="#">Material de Instalación</a>
                        </div>
                    </li>
          <li class="nav-item">
            <a class="nav-link" href="/inspirate">Inspirate</a>
          </li>
        </ul>

        <!-- Search Form -->
        <form class="d-flex me-3">
          <input class="form-control" type="search" placeholder="Buscar producto..." aria-label="Search">
        </form>

        <!-- Cart Button -->
        <div class="d-flex align-items-center">
          <button class="btn btn-link position-relative me-3">
            <i class="fa-solid fa-cart-shopping"></i>
            <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              0
            </span>
          </button>

          <!-- User Account Button -->
          <button class="btn btn-link">
            <i class="bi bi-person"></i>
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>