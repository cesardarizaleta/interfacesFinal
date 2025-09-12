import { usePalette } from '~/composables/usePalette'

export default defineNuxtPlugin(() => {
  const { applyColorsToPage, activePalette, loadFromServer } = usePalette()

  // Aplicar colores iniciales
  applyColorsToPage(activePalette.value)

  // Intentar cargar colores del usuario si está autenticado
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token')
    const user = localStorage.getItem('user')

    if (token && user) {
      try {
        const userData = JSON.parse(user)
        loadFromServer(userData.id).then(() => {
          console.log('User colors loaded successfully')
          // Los colores ya se aplicaron dentro de loadFromServer
          console.log('Colors applied to page in plugin')
        }).catch((error) => {
          console.warn('Failed to load user colors in plugin:', error)
        })
      } catch (error) {
        console.warn('Error parsing user data in plugin:', error)
      }
    }
  }
})
