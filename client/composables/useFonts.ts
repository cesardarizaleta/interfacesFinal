import { ref, computed } from 'vue'

export interface Font {
  id: string
  name: string
  fontFamily: string
  fontType: 'title' | 'subtitle' | 'paragraph' | 'general' | 'active'
  fontFilePath: string | null
  fontWeight: string
  fontStyle: string
  fontFormat: string
  userId: string
  uploadedAt: string
  lastUsedAt: string | null
}

export interface AssignedFonts {
  active?: Font
}

const fonts = ref<Font[]>([])
const assignedFonts = ref<AssignedFonts>({})
const isLoading = ref(false)
const error = ref<string | null>(null)

export const useFonts = () => {
  const config = useRuntimeConfig()
  const API_BASE = `${config.public.BACKEND_URL || 'http://localhost:3000'}/api`

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

      const response = await fetch(`${API_BASE}/fonts`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        const allFonts = await response.json()
        // Find the active font
        const activeFont = allFonts.find((font: Font) => font.fontType === 'active')
        assignedFonts.value = activeFont ? { active: activeFont } : {}
        applyFontsToPage()
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
      applyFontsToPage()

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

    // Remove any existing active font styles
    const existingStyle = document.getElementById('dynamic-active-font')
    if (existingStyle) {
      existingStyle.remove()
    }

    // Reset all text elements to default font
    const allTextElements = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, span, div, li, td, th, label, a, button')
    allTextElements.forEach((element) => {
      (element as HTMLElement).style.fontFamily = ''
    })

    // Apply active font globally to all text elements if one exists
    if (assignedFonts.value.active) {
      const fontUrl = `${API_BASE.replace('/api', '')}/${assignedFonts.value.active.fontFilePath}`
      const fontFace = `
        @font-face {
          font-family: '${assignedFonts.value.active.fontFamily}';
          src: url('${fontUrl}') format('${assignedFonts.value.active.fontFormat}');
          font-weight: ${assignedFonts.value.active.fontWeight};
          font-style: ${assignedFonts.value.active.fontStyle};
        }
      `
      const styleId = 'dynamic-active-font'
      let styleElement = document.getElementById(styleId) as HTMLStyleElement
      if (!styleElement) {
        styleElement = document.createElement('style')
        styleElement.id = styleId
        document.head.appendChild(styleElement)
      }
      styleElement.textContent = fontFace

      // Apply font globally to all text elements
      allTextElements.forEach((element) => {
        (element as HTMLElement).style.fontFamily = assignedFonts.value.active!.fontFamily
      })
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
