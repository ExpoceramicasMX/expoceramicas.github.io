// ~/plugins/bootstrap.js
export default defineNuxtPlugin(() => {
  // Solo ejecutar en el lado del cliente
  if (process.client) {
    // Importar el bundle (incluye Popper) para garantizar dropdowns/tooltip/popover
    import('bootstrap/dist/js/bootstrap.bundle.min.js').then((bootstrap) => {
      // Bootstrap está disponible globalmente
      // Inicializar tooltips automáticamente
      const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
      const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => 
        new bootstrap.Tooltip(tooltipTriggerEl)
      )
      
      // Inicializar popovers automáticamente
      const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
      const popoverList = [...popoverTriggerList].map(popoverTriggerEl => 
        new bootstrap.Popover(popoverTriggerEl)
      )

      // Garantizar dropdowns funcionales: crear instancias si existen
      const dropdownTriggerList = document.querySelectorAll('[data-bs-toggle="dropdown"]')
      dropdownTriggerList.forEach(el => {
        bootstrap.Dropdown.getOrCreateInstance(el)
      })
    }).catch((error) => {
      console.error('Error loading Bootstrap:', error)
    })
  }
})