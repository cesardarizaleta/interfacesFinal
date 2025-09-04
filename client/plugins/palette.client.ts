import { usePalette } from '~/composables/usePalette'

export default defineNuxtPlugin(() => {
  // Aplicar paleta guardada al inicializar la aplicación
  const { loadFromStorage, applyColorsToPage, activePalette } = usePalette()
  loadFromStorage()
  // Aplicar los colores a la página
  applyColorsToPage(activePalette.value)
})
