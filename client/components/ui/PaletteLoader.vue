<template>
  <div v-if="isLoading" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg p-6 shadow-xl">
      <div class="flex items-center space-x-3">
        <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
        <p class="text-dark">Aplicando paleta de colores...</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const isLoading = ref(true)

onMounted(() => {
  // Simular tiempo de carga para mostrar el indicador
  setTimeout(() => {
    isLoading.value = false
  }, 1000)
})

// Escuchar evento de actualización de colores
if (typeof window !== 'undefined') {
  window.addEventListener('colorsUpdated', () => {
    isLoading.value = false
  })
}
</script>

<style scoped>
.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
</style>
