import { ref, computed } from 'vue'

interface Palette {
  colorPrimary: string
  colorSecondary: string
  colorAccent: string
  colorText: string
  backgroundNeutral: string
}

const activePalette = ref<Palette>({
  colorPrimary: '#292524',
  colorSecondary: '#57534e',
  colorAccent: '#000000',
  colorText: '#78716c',
  backgroundNeutral: '#e5e5e5'
})

const defaultPalette: Palette = {
  colorPrimary: '#292524',
  colorSecondary: '#57534e',
  colorAccent: '#000000',
  colorText: '#78716c',
  backgroundNeutral: '#e5e5e5'
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

      Object.entries(colors).forEach(([key, value]) => {
        const cssVar = colorMapping[key as keyof Palette]
        if (cssVar && value) {
          root.style.setProperty(cssVar, value)
        }
      })

      // Aplicar colores derivados
      if (colors.colorPrimary) {
        root.style.setProperty('--bg-primary', colors.colorPrimary)
        root.style.setProperty('--border-primary', colors.colorPrimary)
      }
      if (colors.colorSecondary) {
        root.style.setProperty('--bg-secondary', colors.colorSecondary)
        root.style.setProperty('--border-secondary', colors.colorSecondary)
      }
      if (colors.colorAccent) {
        root.style.setProperty('--bg-accent', colors.colorAccent)
        root.style.setProperty('--border-accent', colors.colorAccent)
      }
      if (colors.backgroundNeutral) {
        root.style.setProperty('--bg-neutral', colors.backgroundNeutral)
      }
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
  }

  return {
    activePalette: computed(() => activePalette.value),
    setActivePalette,
    resetToDefault,
    getActivePalette,
    loadFromStorage,
    defaultPalette,
    applyColorsToPage
  }
}
