<template>
  <section
    class="min-h-screen px-4 sm:px-6 md:px-10 lg:px-24 py-12 bg-gradient-to-br from-stone-50 to-stone-200 text-stone-800 font-sans relative"
  >
    <!-- Loading Overlay -->
    <div v-if="isLoading" class="loading-overlay">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
    </div>

    <!-- Background -->
    <div class="absolute inset-0 overflow-hidden opacity-10 -z-10">
      <img
        src="@/assets/image.jpg"
        alt="Fondo decorativo"
        class="w-full h-full object-cover scale-110 blur-sm"
      />
    </div>

    <!-- Volver -->
    <div class="relative flex items-center justify-center mb-8">
      <NuxtLink
        to="/config"
        class="absolute left-0 top-1/2 -translate-y-1/2 flex items-center text-stone-600 hover:text-stone-800 transition-colors duration-200 p-2 rounded-full hover:bg-stone-200"
        aria-label="Volver"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M10 22L0 12L10 2l1.775 1.775L3.55 12l8.225 8.225z"
          />
        </svg>
      </NuxtLink>
      <h1 class="uppercase text-3xl font-extrabold text-center text-stone-900 font-title">
        Gestión de Fuentes
      </h1>
    </div>

    <!-- Error Message -->
    <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
      {{ error }}
    </div>

    <!-- Upload Section -->
    <div class="bg-white rounded-xl shadow-lg p-6 mb-8 border border-stone-200">
      <h2 class="text-2xl font-bold mb-6 text-center font-subtitle">
        Subir Nueva Fuente
      </h2>

      <!-- Drag and Drop Area -->
      <div class="mb-6">
        <div
          @dragover="handleDragOver"
          @dragleave="handleDragLeave"
          @drop="handleDrop"
          class="relative border-2 border-dashed border-stone-300 rounded-lg p-8 text-center transition-colors hover:border-stone-400"
          :class="{ 'border-blue-400 bg-blue-50': isDragOver }"
        >
          <input
            type="file"
            accept=".ttf,.otf,.woff,.woff2"
            @change="handleFileSelect"
            class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            ref="fileInput"
          />
          <div v-if="!selectedFile" class="space-y-4">
            <svg class="mx-auto h-12 w-12 text-stone-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
              <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
            </svg>
            <div>
              <p class="text-lg font-medium text-stone-900 font-paragraph">Arrastra y suelta tu fuente aquí</p>
              <p class="text-stone-500 font-paragraph">o <span class="text-blue-600 hover:text-blue-500 cursor-pointer">haz clic para seleccionar</span></p>
            </div>
            <p class="text-sm text-stone-400 font-paragraph">Formatos soportados: TTF, OTF, WOFF, WOFF2 (máx. 10MB)</p>
          </div>

          <div v-else class="space-y-4">
            <div class="flex items-center justify-center space-x-4">
              <svg class="h-8 w-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <div class="text-left">
                <p class="font-medium text-stone-900">{{ selectedFile.name }}</p>
                <p class="text-sm text-stone-500">{{ (selectedFile.size / 1024 / 1024).toFixed(2) }} MB</p>
              </div>
            </div>
            <button
              @click="clearFile"
              class="text-red-600 hover:text-red-700 text-sm font-medium"
            >
              Cambiar archivo
            </button>
          </div>
        </div>
      </div>

      <!-- Font Preview -->
      <div v-if="selectedFile && fontPreview" class="mb-6 p-4 bg-stone-50 rounded-lg">
        <h3 class="font-medium text-stone-900 mb-3">Vista Previa</h3>
        <div class="space-y-3">
          <div :style="{ fontFamily: fontPreview.fontFamily, fontWeight: fontPreview.fontWeight, fontStyle: fontPreview.fontStyle }">
            <p class="text-2xl">Título de ejemplo</p>
            <p class="text-lg">Subtítulo de ejemplo</p>
            <p class="text-base">Este es un párrafo de ejemplo con la fuente seleccionada.</p>
          </div>
        </div>
      </div>

      <!-- Simplified Form -->
      <form @submit.prevent="handleFontUpload" class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-stone-600 mb-2">
              Nombre de la Fuente *
            </label>
            <input
              v-model="uploadForm.name"
              type="text"
              required
              class="w-full px-3 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-stone-500"
              :placeholder="fontPreview?.name || 'Ej: Mi Fuente Personalizada'"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-stone-600 mb-2">
              Familia de Fuente (CSS) *
            </label>
            <input
              v-model="uploadForm.fontFamily"
              type="text"
              required
              class="w-full px-3 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-stone-500"
              :placeholder="fontPreview?.fontFamily || 'Ej: MiFuentePersonalizada'"
            />
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-stone-600 mb-2">
              Peso
            </label>
            <select
              v-model="uploadForm.fontWeight"
              class="w-full px-3 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-stone-500"
            >
              <option value="normal">Normal</option>
              <option value="bold">Bold</option>
              <option value="100">100</option>
              <option value="200">200</option>
              <option value="300">300</option>
              <option value="400">400</option>
              <option value="500">500</option>
              <option value="600">600</option>
              <option value="700">700</option>
              <option value="800">800</option>
              <option value="900">900</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-stone-600 mb-2">
              Estilo
            </label>
            <select
              v-model="uploadForm.fontStyle"
              class="w-full px-3 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-stone-500"
            >
              <option value="normal">Normal</option>
              <option value="italic">Italic</option>
              <option value="oblique">Oblique</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          :disabled="isLoading || !selectedFile"
          class="w-full bg-stone-800 text-white py-3 px-4 rounded-md hover:bg-stone-700 focus:outline-none focus:ring-2 focus:ring-stone-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {{ isLoading ? 'Subiendo...' : 'Subir Fuente' }}
        </button>
      </form>
    </div>

    <!-- Font Preview -->
    <div class="bg-white rounded-xl shadow-lg p-6 mb-8 border border-stone-200">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-bold">
          Vista Previa de Fuente Activa
        </h2>
        <button
          v-if="assignedFonts.active"
          @click="deactivateAllFonts"
          class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 text-sm rounded transition-colors"
        >
          Desactivar Todas
        </button>
      </div>
      <div class="text-center space-y-6">
        <div>
          <h3 class="text-3xl font-bold" :style="{ fontFamily: assignedFonts.active?.fontFamily || 'var(--font-heading)' }">
            Título de Ejemplo
          </h3>
        </div>
        <div>
          <h4 class="text-xl font-semibold" :style="{ fontFamily: assignedFonts.active?.fontFamily || 'var(--font-primary)' }">
            Subtítulo de Ejemplo
          </h4>
        </div>
        <div class="max-w-md mx-auto">
          <p class="text-base leading-relaxed" :style="{ fontFamily: assignedFonts.active?.fontFamily || 'var(--font-primary)' }">
            Este es un párrafo de ejemplo para mostrar cómo se ve el texto con la fuente activa.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
          <p class="text-sm text-stone-500 mt-2">
            Fuente Activa: {{ assignedFonts.active?.name || 'Predeterminada (Inter)' }}
          </p>
        </div>
      </div>
    </div>

    <!-- All Fonts List -->
    <div class="bg-white rounded-xl shadow-lg p-6 border border-stone-200">
      <h2 class="text-2xl font-bold mb-6 text-center font-subtitle">
        Todas las Fuentes
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
          v-for="font in fonts"
          :key="font?.id || 'fallback'"
          class="border border-stone-200 rounded-lg p-4"
        >
          <div class="flex items-center justify-between mb-2">
            <h3 class="font-semibold">{{ font?.name || 'Fuente sin nombre' }}</h3>
            <span
              class="px-2 py-1 text-xs rounded"
              :class="{
                'bg-green-100 text-green-800': font?.fontType === 'active',
                'bg-gray-100 text-gray-800': font?.fontType !== 'active'
              }"
            >
              {{ font?.fontType === 'active' ? 'Activa' : 'Sin asignar' }}
            </span>
          </div>
          <p class="text-sm text-stone-600 mb-2">
            Familia: {{ font?.fontFamily || 'Sin familia' }}
          </p>
          <p class="text-sm text-stone-600 mb-2">
            Formato: {{ font?.fontFormat?.toUpperCase() || 'DESCONOCIDO' }}
          </p>
          <p class="text-sm text-stone-600 mb-4">
            Peso: {{ font?.fontWeight || 'normal' }} | Estilo: {{ font?.fontStyle || 'normal' }}
          </p>
          <div class="mt-2 p-2 bg-stone-50 rounded text-sm font-paragraph" :style="{ fontFamily: font?.fontFamily, fontWeight: font?.fontWeight, fontStyle: font?.fontStyle }">
            AaBbCc 123 - Vista previa
          </div>
          <div class="flex justify-between items-center gap-2">
            <button
              v-if="font?.fontType === 'active'"
              @click="deactivateFont(font)"
              class="bg-red-600 hover:bg-red-700 text-white px-3 py-1 text-sm rounded transition-colors"
            >
              Desactivar
            </button>
            <button
              v-else
              @click="activateFont(font)"
              class="bg-stone-600 hover:bg-stone-700 text-white px-3 py-1 text-sm rounded transition-colors"
            >
              Activar
            </button>
            <button
              @click="deleteFont(font?.id)"
              class="text-red-500 hover:text-red-700 text-sm"
            >
              Eliminar
            </button>
            <span class="text-xs text-stone-400">
              {{ font?.uploadedAt ? new Date(font.uploadedAt).toLocaleDateString() : 'Fecha desconocida' }}
            </span>
          </div>
        </div>
      </div>
    </div>

  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useFonts } from '~/composables/useFonts'

definePageMeta({ middleware: 'auth' })

// Composables
const {
  fonts,
  assignedFonts,
  isLoading,
  error,
  loadFonts,
  loadAssignedFonts,
  assignFontType,
  uploadFont,
  deleteFont: deleteFontFromService
} = useFonts()

// Form state
const uploadForm = ref({
  name: '',
  fontFamily: '',
  file: null,
  fontWeight: 'normal',
  fontStyle: 'normal'
})

// File handling
const selectedFile = ref(null)
const isDragOver = ref(false)
const fontPreview = ref(null)
const fileInput = ref(null)

// No modal needed anymore - simple activation

// Methods
const handleFileSelect = (event) => {
  const file = event.target.files[0]
  if (file) {
    processFile(file)
  }
}

const handleDrop = (event) => {
  isDragOver.value = false
  const file = event.dataTransfer.files[0]
  if (file) {
    processFile(file)
  }
}

const handleDragOver = (event) => {
  event.preventDefault()
  isDragOver.value = true
}

const handleDragLeave = (event) => {
  event.preventDefault()
  isDragOver.value = false
}

const processFile = async (file) => {
  // Validate file type
  const allowedTypes = ['font/ttf', 'font/otf', 'application/x-font-ttf', 'application/x-font-otf', 'font/woff', 'font/woff2']
  const allowedExtensions = ['.ttf', '.otf', '.woff', '.woff2']
  const fileExtension = file.name.toLowerCase().substring(file.name.lastIndexOf('.'))

  if (!allowedTypes.includes(file.type) && !allowedExtensions.includes(fileExtension)) {
    alert('Tipo de archivo no válido. Solo se permiten archivos .ttf, .otf, .woff, .woff2')
    return
  }

  // Validate file size (10MB)
  if (file.size > 10 * 1024 * 1024) {
    alert('El archivo es demasiado grande. El tamaño máximo es 10MB.')
    return
  }

  selectedFile.value = file
  uploadForm.value.file = file

  // Try to extract font info
  await extractFontInfo(file)
}

const extractFontInfo = async (file) => {
  try {
    // For now, we'll use basic extraction from filename
    const fileName = file.name.replace(/\.[^/.]+$/, '') // Remove extension
    const cleanName = fileName.replace(/[-_]/g, ' ').replace(/\b\w/g, l => l.toUpperCase())

    // Auto-generate font family name
    const fontFamily = fileName.replace(/[^a-zA-Z0-9]/g, '')

    // Try to detect weight from filename
    const weightPatterns = {
      'thin': '100',
      'extralight': '200',
      'light': '300',
      'regular': '400',
      'medium': '500',
      'semibold': '600',
      'bold': '700',
      'extrabold': '800',
      'black': '900'
    }

    let detectedWeight = 'normal'
    const lowerFileName = fileName.toLowerCase()
    for (const [pattern, weight] of Object.entries(weightPatterns)) {
      if (lowerFileName.includes(pattern)) {
        detectedWeight = weight
        break
      }
    }

    // Try to detect style
    let detectedStyle = 'normal'
    if (lowerFileName.includes('italic') || lowerFileName.includes('oblique')) {
      detectedStyle = 'italic'
    }

    // Create font face for preview
    const fontUrl = URL.createObjectURL(file)
    const fontFace = new FontFace(fontFamily, `url(${fontUrl})`)
    await fontFace.load()
    document.fonts.add(fontFace)

    fontPreview.value = {
      name: cleanName,
      fontFamily: fontFamily,
      fontWeight: detectedWeight,
      fontStyle: detectedStyle,
      fontUrl: fontUrl
    }

    // Auto-fill form
    uploadForm.value.name = cleanName
    uploadForm.value.fontFamily = fontFamily
    uploadForm.value.fontWeight = detectedWeight
    uploadForm.value.fontStyle = detectedStyle

  } catch (error) {
    console.error('Error extracting font info:', error)
    // Fallback to basic info
    const fileName = file.name.replace(/\.[^/.]+$/, '')
    fontPreview.value = {
      name: fileName,
      fontFamily: fileName.replace(/[^a-zA-Z0-9]/g, ''),
      fontWeight: 'normal',
      fontStyle: 'normal'
    }
    uploadForm.value.name = fileName
    uploadForm.value.fontFamily = fileName.replace(/[^a-zA-Z0-9]/g, '')
  }
}

const clearFile = () => {
  selectedFile.value = null
  uploadForm.value.file = null
  fontPreview.value = null
  uploadForm.value.name = ''
  uploadForm.value.fontFamily = ''
  uploadForm.value.fontWeight = 'normal'
  uploadForm.value.fontStyle = 'normal'

  if (fileInput.value) {
    fileInput.value.value = ''
  }
}

const handleFontUpload = async () => {
  if (!selectedFile.value) {
    alert('Por favor selecciona un archivo de fuente')
    return
  }

  const formData = new FormData()
  formData.append('name', uploadForm.value.name)
  formData.append('fontFamily', uploadForm.value.fontFamily)
  formData.append('fontFile', selectedFile.value)
  formData.append('fontWeight', uploadForm.value.fontWeight)
  formData.append('fontStyle', uploadForm.value.fontStyle)

  try {
    await uploadFont(formData)

    // Reset form
    clearFile()

    alert('Fuente subida exitosamente')
  } catch (err) {
    alert('Error al subir la fuente: ' + err.message)
  }
}

// Activate font (deactivates any other active font)
const activateFont = async (font) => {
  if (!font) return

  try {
    // First, deactivate any currently active font
    const activeFont = fonts.value.find(f => f.fontType === 'active')
    if (activeFont && activeFont.id !== font.id) {
      await assignFontType(activeFont.id, 'general')
    }

    // Then activate the selected font
    await assignFontType(font.id, 'active')
    alert('Fuente activada correctamente')
  } catch (err) {
    alert('Error al activar la fuente: ' + err.message)
  }
}

// Deactivate font
const deactivateFont = async (font) => {
  if (!font) return

  try {
    await assignFontType(font.id, 'general')
    alert('Fuente desactivada correctamente')
  } catch (err) {
    alert('Error al desactivar la fuente: ' + err.message)
  }
}

// Deactivate all fonts
const deactivateAllFonts = async () => {
  if (!assignedFonts.value.active) return

  try {
    await assignFontType(assignedFonts.value.active.id, 'general')
    alert('Todas las fuentes desactivadas. Se usarán las fuentes predeterminadas.')
  } catch (err) {
    alert('Error al desactivar las fuentes: ' + err.message)
  }
}

const deleteFont = async (fontId) => {
  if (!confirm('¿Estás seguro de que quieres eliminar esta fuente?')) {
    return
  }

  try {
    await deleteFontFromService(fontId)
    alert('Fuente eliminada exitosamente')
  } catch (err) {
    alert('Error al eliminar la fuente: ' + err.message)
  }
}

// Lifecycle
onMounted(async () => {
  document.body.classList.add('config-page')
  await loadFonts()
  await loadAssignedFonts()

  // Load fonts for preview
  if (fonts.value) {
    for (const font of fonts.value) {
      if (font.fontFilePath) {
        try {
          // Use anonymous path as per user indication
          const fileName = font.fontFilePath.split('/').pop()
          const fontUrl = `http://localhost:3001/uploads/fonts/anonymous/${fileName}`
          const response = await fetch(fontUrl)
          if (!response.ok) {
            throw new Error(`HTTP ${response.status}`)
          }
          const arrayBuffer = await response.arrayBuffer()
          const fontFace = new FontFace(font.fontFamily, arrayBuffer)
          await fontFace.load()
          document.fonts.add(fontFace)
        } catch (error) {
          console.error('Error loading font for preview:', error)
        }
      }
    }
  }
})

onUnmounted(() => {
  document.body.classList.remove('config-page')
})
</script>

<style scoped>
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

/* Override global styles for config page - prevent global color variables */
.config-button,
.config-heading,
.config-text,
.config-bg,
.config-icon,
.config-link,
.config-input {
  /* Use !important to override global styles */
  color: inherit !important;
  background-color: inherit !important;
  border-color: inherit !important;
}

/* Specific overrides for config page elements */
.config-button {
  background-color: var(--local-primary, #8B4513) !important;
  color: var(--local-secondary, #FFFFFF) !important;
  border-color: var(--local-primary, #8B4513) !important;
}

.config-heading {
  color: var(--local-accent, #DAA520) !important;
}

.config-text {
  color: var(--local-text, #2F1B14) !important;
}

.config-bg {
  background-color: var(--local-neutral, #F5F5DC) !important;
}

.config-icon {
  color: var(--local-primary, #8B4513) !important;
}

.config-link {
  color: var(--local-primary, #8B4513) !important;
}

.config-input {
  border-color: var(--local-primary, #8B4513) !important;
  color: var(--local-text, #2F1B14) !important;
}
</style>
