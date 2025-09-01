// ~/plugins/bootstrap.js
export default defineNuxtPlugin(() => {
  // Solo ejecutar en el lado del cliente
  if (process.client) {
    // Importar Bootstrap JavaScript de forma dinámica
    import('bootstrap').then((bootstrap) => {
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
    }).catch((error) => {
      console.error('Error loading Bootstrap:', error)
    })
  }
})