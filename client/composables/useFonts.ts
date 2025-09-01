import { ref, computed } from 'vue'

export interface Font {
  id: string
  name: string
  fontFamily: string
  fontType: 'title' | 'subtitle' | 'paragraph' | 'general'
  fontFilePath: string | null
  fontWeight: string
  fontStyle: string
  fontFormat: string
  userId: string
  uploadedAt: string
  lastUsedAt: string | null
}

export interface AssignedFonts {
  title?: Font
  subtitle?: Font
  paragraph?: Font
}

const fonts = ref<Font[]>([])
const assignedFonts = ref<AssignedFonts>({})
const isLoading = ref(false)
const error = ref<string | null>(null)

export const useFonts = () => {
  const API_BASE = 'http://localhost:4000/api'

  const loadFonts = async () => {
    try {
      isLoading.value = true
      error.value = null

      const token = localStorage.getItem('token')
      if (!token) {
        throw new Error('No authentication token found')
      }

      const response = await fetch(`${API_BASE}/fonts`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (!response.ok) {
        throw new Error('Failed to load fonts')
      }

      const data = await response.json()
      fonts.value = data
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load fonts'
      console.error('Error loading fonts:', err)
    } finally {
      isLoading.value = false
    }
  }

  const loadAssignedFonts = async () => {
    try {
      const token = localStorage.getItem('token')
      if (!token) return

      const response = await fetch(`${API_BASE}/fonts/user/assigned`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        const data = await response.json()
        assignedFonts.value = data
      }
    } catch (err) {
      console.error('Error loading assigned fonts:', err)
    }
  }

  const assignFontType = async (fontId: string, fontType: string) => {
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        throw new Error('No authentication token found')
      }

      const response = await fetch(`${API_BASE}/fonts/${fontId}/assign-type`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ fontType })
      })

      if (!response.ok) {
        throw new Error('Failed to assign font type')
      }

      const updatedFont = await response.json()

      // Update local state
      const index = fonts.value.findIndex(f => f.id === fontId)
      if (index !== -1) {
        fonts.value[index] = updatedFont
      }

      // Reload assigned fonts
      await loadAssignedFonts()

      return updatedFont
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to assign font type'
      throw err
    }
  }

  const uploadFont = async (formData: FormData) => {
    try {
      isLoading.value = true
      error.value = null

      const token = localStorage.getItem('token')
      if (!token) {
        throw new Error('No authentication token found')
      }

      const response = await fetch(`${API_BASE}/fonts`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Failed to upload font')
      }

      const newFont = await response.json()
      fonts.value.push(newFont)

      return newFont
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to upload font'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const deleteFont = async (fontId: string) => {
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        throw new Error('No authentication token found')
      }

      const response = await fetch(`${API_BASE}/fonts/${fontId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (!response.ok) {
        throw new Error('Failed to delete font')
      }

      // Remove from local state
      fonts.value = fonts.value.filter(f => f.id !== fontId)

      // Reload assigned fonts in case the deleted font was assigned
      await loadAssignedFonts()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to delete font'
      throw err
    }
  }

  const applyFontsToPage = () => {
    if (typeof document === 'undefined') return

    const root = document.documentElement

    // Reset to defaults
    root.style.setProperty('--font-title', 'var(--font-default)')
    root.style.setProperty('--font-subtitle', 'var(--font-default)')
    root.style.setProperty('--font-paragraph', 'var(--font-default)')

    // Apply assigned fonts
    if (assignedFonts.value.title) {
      const fontUrl = `${API_BASE.replace('/api', '')}/${assignedFonts.value.title.fontFilePath}`
      const fontFace = `
        @font-face {
          font-family: '${assignedFonts.value.title.fontFamily}';
          src: url('${fontUrl}') format('${assignedFonts.value.title.fontFormat}');
          font-weight: ${assignedFonts.value.title.fontWeight};
          font-style: ${assignedFonts.value.title.fontStyle};
        }
      `
      const styleId = 'dynamic-font-title'
      let styleElement = document.getElementById(styleId) as HTMLStyleElement
      if (!styleElement) {
        styleElement = document.createElement('style')
        styleElement.id = styleId
        document.head.appendChild(styleElement)
      }
      styleElement.textContent = fontFace
      root.style.setProperty('--font-title', assignedFonts.value.title.fontFamily)
    }

    if (assignedFonts.value.subtitle) {
      const fontUrl = `${API_BASE.replace('/api', '')}/${assignedFonts.value.subtitle.fontFilePath}`
      const fontFace = `
        @font-face {
          font-family: '${assignedFonts.value.subtitle.fontFamily}';
          src: url('${fontUrl}') format('${assignedFonts.value.subtitle.fontFormat}');
          font-weight: ${assignedFonts.value.subtitle.fontWeight};
          font-style: ${assignedFonts.value.subtitle.fontStyle};
        }
      `
      const styleId = 'dynamic-font-subtitle'
      let styleElement = document.getElementById(styleId) as HTMLStyleElement
      if (!styleElement) {
        styleElement = document.createElement('style')
        styleElement.id = styleId
        document.head.appendChild(styleElement)
      }
      styleElement.textContent = fontFace
      root.style.setProperty('--font-subtitle', assignedFonts.value.subtitle.fontFamily)
    }

    if (assignedFonts.value.paragraph) {
      const fontUrl = `${API_BASE.replace('/api', '')}/${assignedFonts.value.paragraph.fontFilePath}`
      const fontFace = `
        @font-face {
          font-family: '${assignedFonts.value.paragraph.fontFamily}';
          src: url('${fontUrl}') format('${assignedFonts.value.paragraph.fontFormat}');
          font-weight: ${assignedFonts.value.paragraph.fontWeight};
          font-style: ${assignedFonts.value.paragraph.fontStyle};
        }
      `
      const styleId = 'dynamic-font-paragraph'
      let styleElement = document.getElementById(styleId) as HTMLStyleElement
      if (!styleElement) {
        styleElement = document.createElement('style')
        styleElement.id = styleId
        document.head.appendChild(styleElement)
      }
      styleElement.textContent = fontFace
      root.style.setProperty('--font-paragraph', assignedFonts.value.paragraph.fontFamily)
    }
  }

  const getFontsByType = (type: string) => {
    return computed(() => fonts.value ? fonts.value.filter(font => font && font.fontType === type) : [])
  }

  const getUnassignedFonts = () => {
    return computed(() => fonts.value ? fonts.value.filter(font => font && font.fontType === 'general') : [])
  }

  return {
    fonts: computed(() => fonts.value),
    assignedFonts: computed(() => assignedFonts.value),
    isLoading: computed(() => isLoading.value),
    error: computed(() => error.value),
    loadFonts,
    loadAssignedFonts,
    assignFontType,
    uploadFont,
    deleteFont,
    applyFontsToPage,
    getFontsByType,
    getUnassignedFonts
  }
}
