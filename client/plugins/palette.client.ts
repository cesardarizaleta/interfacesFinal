import { usePalette } from '~/composables/usePalette'

export default defineNuxtPlugin(() => {
  // No cargar paleta automáticamente al inicializar
  // La carga se hará manualmente en páginas específicas
  const { applyColorsToPage, activePalette } = usePalette()

  // Solo aplicar colores predeterminados inicialmente
  applyColorsToPage(activePalette.value)
})
