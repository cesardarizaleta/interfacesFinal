import { usePalette } from '~/composables/usePalette'

export default defineNuxtPlugin(() => {
  // Aplicar paleta guardada al inicializar la aplicación
  const { loadFromStorage } = usePalette()
  loadFromStorage()
})
