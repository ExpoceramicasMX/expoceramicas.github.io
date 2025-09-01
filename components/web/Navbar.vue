<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
    <div class="container">
      <!-- Logo -->
      <a class="navbar-brand" href="#">
        <img src="#" alt="Store Logo" height="32">
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
            <a class="nav-link" href="#">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Shop</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Categories</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Deals</a>
          </li>
        </ul>

        <!-- Search Form -->
        <form class="d-flex me-3">
          <input class="form-control" type="search" placeholder="Search..." aria-label="Search">
        </form>

        <!-- Cart Button -->
        <div class="d-flex align-items-center">
          <button class="btn btn-link position-relative me-3">
            <i class="bi bi-cart"></i>
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