import { ref, computed } from 'vue'

interface Palette {
  id?: string
  name?: string
  colorPrimary: string
  colorSecondary: string
  colorAccent: string
  colorText: string
  backgroundNeutral: string
  isDefault?: boolean
  isActive?: boolean
}

const activePalette = ref<Palette>({
  colorPrimary: '#8B4513',
  colorSecondary: '#FFFFFF',
  colorAccent: '#DAA520',
  colorText: '#2F1B14',
  backgroundNeutral: '#F5F5DC'
})

const defaultPalette: Palette = {
  colorPrimary: '#8B4513',
  colorSecondary: '#FFFFFF',
  colorAccent: '#DAA520',
  colorText: '#2F1B14',
  backgroundNeutral: '#F5F5DC'
}

export const usePalette = () => {
  const setActivePalette = (palette: Partial<Palette> | undefined) => {
    if (palette) {
      activePalette.value = {
        colorPrimary: palette.colorPrimary || defaultPalette.colorPrimary,
        colorSecondary: palette.colorSecondary || defaultPalette.colorSecondary,
        colorAccent: palette.colorAccent || defaultPalette.colorAccent,
        colorText: palette.colorText || defaultPalette.colorText,
        backgroundNeutral: palette.backgroundNeutral || defaultPalette.backgroundNeutral
      }

      // Guardar en localStorage
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('activePalette', JSON.stringify(activePalette.value))
      }
    }
  }

  const applyColorsToPage = (colors: Palette) => {
    if (typeof document !== 'undefined') {
      const root = document.documentElement
      const colorMapping = {
        colorPrimary: '--color-primary',
        colorSecondary: '--color-secondary',
        colorAccent: '--color-accent',
        colorText: '--color-text',
        backgroundNeutral: '--background-neutral'
      }

      // Función para convertir hex a RGB
      const hexToRgb = (hex: string) => {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
        return result ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16)
        } : null
      }

      Object.entries(colors).forEach(([key, value]) => {
        const cssVar = colorMapping[key as keyof typeof colorMapping]
        if (cssVar && value) {
          root.style.setProperty(cssVar, value)

          // Aplicar también la versión RGB para rgba() dinámico
          const rgb = hexToRgb(value)
          if (rgb) {
            root.style.setProperty(`${cssVar}-rgb`, `${rgb.r}, ${rgb.g}, ${rgb.b}`)
          }
        }
      })

      // Aplicar colores derivados
      if (colors.colorPrimary) {
        root.style.setProperty('--bg-primary', colors.colorPrimary)
        root.style.setProperty('--border-primary', colors.colorPrimary)
        root.style.setProperty('--text-primary', colors.colorPrimary)
      }
      if (colors.colorSecondary) {
        root.style.setProperty('--bg-secondary', colors.colorSecondary)
        root.style.setProperty('--border-secondary', colors.colorSecondary)
        root.style.setProperty('--text-secondary', colors.colorSecondary)
      }
      if (colors.colorAccent) {
        root.style.setProperty('--bg-accent', colors.colorAccent)
        root.style.setProperty('--border-accent', colors.colorAccent)
        root.style.setProperty('--text-accent', colors.colorAccent)
      }
      if (colors.colorText) {
        root.style.setProperty('--text-primary', colors.colorText)
      }
      if (colors.backgroundNeutral) {
        root.style.setProperty('--bg-neutral', colors.backgroundNeutral)
        // Aplicar background al body también
        document.body.style.background = colors.backgroundNeutral
      }

      console.log('Colors applied globally:', colors)
    }
  }

  const resetToDefault = () => {
    activePalette.value = { ...defaultPalette }

    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('activePalette')
    }
  }

  const getActivePalette = () => {
    return activePalette.value
  }

  const loadFromServer = async (userId: string) => {
    try {
      const token = localStorage.getItem('token')
      if (!token) return

      const config = useRuntimeConfig()
      const response = await fetch(`${config.public.BACKEND_URL}/api/profile/lastColorUsed`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        const palette = await response.json()
        if (palette) {
          setActivePalette(palette)
          applyColorsToPage(activePalette.value)
        }
      }
    } catch (error) {
      console.warn('Error loading palette from server:', error)
    }
  }

  const activatePalette = async (paletteId: string, userId: string) => {
    try {
      const token = localStorage.getItem('token')
      if (!token) return

      const config = useRuntimeConfig()
      const response = await fetch(`${config.public.BACKEND_URL}/api/colors/${paletteId}/activate`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      if (response.ok) {
        const palette = await response.json()
        setActivePalette(palette)
        applyColorsToPage(activePalette.value)
        return palette
      }
    } catch (error) {
      console.error('Error activating palette:', error)
    }
  }

  const deactivatePalette = async (paletteId: string, userId: string) => {
    try {
      const token = localStorage.getItem('token')
      if (!token) return

      const config = useRuntimeConfig()
      const response = await fetch(`${config.public.BACKEND_URL}/api/colors/${paletteId}/deactivate`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      if (response.ok) {
        const palette = await response.json()
        // Si se desactiva la paleta actual, cargar la predeterminada
        if (activePalette.value.id === paletteId) {
          await loadFromServer(userId)
        }
        return palette
      }
    } catch (error) {
      console.error('Error deactivating palette:', error)
    }
  }

  const loadFromStorage = () => {
    if (typeof localStorage !== 'undefined') {
      const stored = localStorage.getItem('activePalette')
      if (stored) {
        try {
          const parsed = JSON.parse(stored) as Partial<Palette>
          setActivePalette(parsed)
        } catch (error) {
          console.warn('Error loading palette from storage:', error)
        }
      }
    }
  }

  // Cargar desde localStorage al inicializar
  if (typeof window !== 'undefined') {
    loadFromStorage()

    // Intentar cargar desde servidor si hay token
    const token = localStorage.getItem('token')
    const user = localStorage.getItem('user')
    if (token && user) {
      try {
        const userData = JSON.parse(user)
        // Cargar colores del servidor inmediatamente
        loadFromServer(userData.id).then(() => {
          console.log('Colors loaded from server:', activePalette.value)
        }).catch((error) => {
          console.warn('Failed to load colors from server:', error)
        })
      } catch (error) {
        console.warn('Error parsing user data:', error)
      }
    }
  }

  return {
    activePalette: computed(() => activePalette.value),
    setActivePalette,
    resetToDefault,
    getActivePalette,
    loadFromStorage,
    loadFromServer,
    activatePalette,
    deactivatePalette,
    defaultPalette,
    applyColorsToPage
  }
}
