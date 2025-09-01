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
      <h1 class="uppercase text-3xl font-extrabold text-center text-stone-900">
        Gestión de Fuentes
      </h1>
    </div>

    <!-- Error Message -->
    <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
      {{ error }}
    </div>

    <!-- Upload Section -->
    <div class="bg-white rounded-xl shadow-lg p-6 mb-8 border border-stone-200">
      <h2 class="text-2xl font-bold mb-6 text-center">
        Subir Nueva Fuente
      </h2>
      <div class="max-w-md mx-auto">
        <form @submit.prevent="handleFontUpload" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-stone-600 mb-2">
              Nombre de la Fuente
            </label>
            <input
              v-model="uploadForm.name"
              type="text"
              required
              class="w-full px-3 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-stone-500"
              placeholder="Ej: Mi Fuente Personalizada"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-stone-600 mb-2">
              Familia de Fuente (CSS)
            </label>
            <input
              v-model="uploadForm.fontFamily"
              type="text"
              required
              class="w-full px-3 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-stone-500"
              placeholder="Ej: MiFuentePersonalizada"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-stone-600 mb-2">
              Archivo de Fuente (.ttf, .otf, .woff, .woff2)
            </label>
            <input
              type="file"
              accept=".ttf,.otf,.woff,.woff2"
              required
              @change="handleFileSelect"
              class="w-full px-3 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-stone-500"
            />
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
            :disabled="isLoading"
            class="w-full bg-stone-800 text-white py-2 px-4 rounded-md hover:bg-stone-700 focus:outline-none focus:ring-2 focus:ring-stone-500 disabled:opacity-50"
          >
            {{ isLoading ? 'Subiendo...' : 'Subir Fuente' }}
          </button>
        </form>
      </div>
    </div>

    <!-- Font Preview -->
    <div class="bg-white rounded-xl shadow-lg p-6 mb-8 border border-stone-200">
      <h2 class="text-2xl font-bold mb-6 text-center">
        Vista Previa
      </h2>
      <div class="text-center space-y-6">
        <div>
          <h3 class="text-3xl font-bold">
            Título de Ejemplo
          </h3>
          <p class="text-sm text-stone-500 mt-1">
            Fuente asignada: {{ assignedFonts.title?.name || 'Ninguna' }}
          </p>
        </div>
        <div>
          <h4 class="text-xl font-semibold">
            Subtítulo de Ejemplo
          </h4>
          <p class="text-sm text-stone-500 mt-1">
            Fuente asignada: {{ assignedFonts.subtitle?.name || 'Ninguna' }}
          </p>
        </div>
        <div class="max-w-md mx-auto">
          <p class="text-base leading-relaxed">
            Este es un párrafo de ejemplo para mostrar cómo se ve el texto con la fuente asignada.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
          <p class="text-sm text-stone-500 mt-2">
            Fuente asignada: {{ assignedFonts.paragraph?.name || 'Ninguna' }}
          </p>
        </div>
      </div>
    </div>
    <div class="bg-white rounded-xl shadow-lg p-6 mb-8 border border-stone-200">
      <h2 class="text-2xl font-bold mb-6 text-center">
        Vista Previa
      </h2>
      <div class="text-center space-y-6">
        <div>
          <h3 class="text-3xl font-bold" :style="{ fontFamily: assignedFonts.title?.fontFamily || 'inherit' }">
            Título de Ejemplo
          </h3>
          <p class="text-sm text-stone-500 mt-1">
            Fuente: {{ assignedFonts.title?.name || 'Predeterminada' }}
          </p>
        </div>
        <div>
          <h4 class="text-xl font-semibold" :style="{ fontFamily: assignedFonts.subtitle?.fontFamily || 'inherit' }">
            Subtítulo de Ejemplo
          </h4>
          <p class="text-sm text-stone-500 mt-1">
            Fuente: {{ assignedFonts.subtitle?.name || 'Predeterminada' }}
          </p>
        </div>
        <div class="max-w-md mx-auto">
          <p class="text-base leading-relaxed" :style="{ fontFamily: assignedFonts.paragraph?.fontFamily || 'inherit' }">
            Este es un párrafo de ejemplo para mostrar cómo se ve el texto con la fuente asignada.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
          <p class="text-sm text-stone-500 mt-2">
            Fuente: {{ assignedFonts.paragraph?.name || 'Predeterminada' }}
          </p>
        </div>
      </div>
    </div>

    <!-- All Fonts List -->
    <div class="bg-white rounded-xl shadow-lg p-6 border border-stone-200">
      <h2 class="text-2xl font-bold mb-6 text-center">
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
                'bg-blue-100 text-blue-800': font?.fontType === 'title',
                'bg-green-100 text-green-800': font?.fontType === 'subtitle',
                'bg-purple-100 text-purple-800': font?.fontType === 'paragraph',
                'bg-gray-100 text-gray-800': font?.fontType === 'general'
              }"
            >
              {{ font?.fontType === 'general' ? 'Sin asignar' : font?.fontType || 'Sin asignar' }}
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
          <div class="flex justify-between items-center gap-2">
            <button
              @click="openAssignModal(font)"
              class="bg-stone-600 text-white px-3 py-1 text-sm rounded hover:bg-stone-700 transition-colors"
            >
              Asignar
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

    <!-- Assignment Modal -->
    <div v-if="showAssignModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <h3 class="text-lg font-semibold mb-4">
          Asignar Fuente: {{ selectedFont?.name || 'Fuente sin nombre' }}
        </h3>
        <p class="text-sm text-stone-600 mb-4">
          Selecciona el tipo de fuente que quieres asignar:
        </p>
        <div class="space-y-3">
          <button
            @click="assignFontToType('title')"
            class="w-full text-left p-3 border border-stone-200 rounded hover:bg-stone-50 transition-colors"
          >
            <div class="font-semibold">Título</div>
            <div class="text-sm text-stone-500">Para encabezados principales</div>
          </button>
          <button
            @click="assignFontToType('subtitle')"
            class="w-full text-left p-3 border border-stone-200 rounded hover:bg-stone-50 transition-colors"
          >
            <div class="font-semibold">Subtítulo</div>
            <div class="text-sm text-stone-500">Para encabezados secundarios</div>
          </button>
          <button
            @click="assignFontToType('paragraph')"
            class="w-full text-left p-3 border border-stone-200 rounded hover:bg-stone-50 transition-colors"
          >
            <div class="font-semibold">Párrafo</div>
            <div class="text-sm text-stone-500">Para texto del cuerpo</div>
          </button>
          <button
            @click="assignFontToType('general')"
            class="w-full text-left p-3 border border-stone-200 rounded hover:bg-stone-50 transition-colors"
          >
            <div class="font-semibold">Sin asignar</div>
            <div class="text-sm text-stone-500">Quitar asignación actual</div>
          </button>
        </div>
        <div class="flex justify-end mt-6">
          <button
            @click="closeAssignModal"
            class="px-4 py-2 text-stone-600 hover:text-stone-800 transition-colors"
          >
            Cancelar
          </button>
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

// Modal state
const showAssignModal = ref(false)
const selectedFont = ref(null)

// Methods
const handleFileSelect = (event) => {
  uploadForm.value.file = event.target.files[0]
}

const handleFontUpload = async () => {
  if (!uploadForm.value.file) {
    alert('Por favor selecciona un archivo de fuente')
    return
  }

  const formData = new FormData()
  formData.append('name', uploadForm.value.name)
  formData.append('fontFamily', uploadForm.value.fontFamily)
  formData.append('fontFile', uploadForm.value.file)
  formData.append('fontWeight', uploadForm.value.fontWeight)
  formData.append('fontStyle', uploadForm.value.fontStyle)

  try {
    await uploadFont(formData)

    // Reset form
    uploadForm.value = {
      name: '',
      fontFamily: '',
      file: null,
      fontWeight: 'normal',
      fontStyle: 'normal'
    }

    // Reset file input
    const fileInput = document.querySelector('input[type="file"]')
    if (fileInput) fileInput.value = ''

    alert('Fuente subida exitosamente')
  } catch (err) {
    alert('Error al subir la fuente: ' + err.message)
  }
}

// Modal methods
const openAssignModal = (font) => {
  selectedFont.value = font
  showAssignModal.value = true
}

const closeAssignModal = () => {
  showAssignModal.value = false
  selectedFont.value = null
}

const assignFontToType = async (fontType) => {
  if (!selectedFont.value) return

  try {
    await assignFontType(selectedFont.value.id, fontType)
    closeAssignModal()
    alert(`Fuente asignada como ${fontType}`)
  } catch (err) {
    alert('Error al asignar la fuente: ' + err.message)
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
  await loadFonts()
  await loadAssignedFonts()
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
</style>
