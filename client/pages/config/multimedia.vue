<template>
  <div class="relative min-h-screen flex flex-col p-4 sm:p-6 md:p-8 lg:p-12 xl:p-16 bg-gradient-to-br from-stone-50 to-stone-200 text-stone-800 font-sans">
    <div class="absolute inset-0 overflow-hidden opacity-10">
      <img
        src="@/assets/image.jpg"
        alt="Photographer at work"
        class="w-full h-full object-cover object-center scale-110 blur-sm"
      />
    </div>

    <div class="relative z-10 w-full max-w-full mx-auto">
      <div class="text-center mb-8 sm:mb-10">
        <NuxtLink
          to="/config"
          class="absolute left-0 top-1/2 -translate-y-1/2 flex items-center text-stone-600 hover:text-stone-800 transition-colors duration-200 p-2 rounded-full hover:bg-stone-200"
          aria-label="Volver"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
            <path fill="currentColor" d="M10 22L0 12L10 2l1.775 1.775L3.55 12l8.225 8.225z" />
          </svg>
        </NuxtLink>
        <h1 class="text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase tracking-tight text-stone-900 mb-2">
          Gestión de Multimedia
        </h1>
        <p class="text-lg sm:text-xl font-light uppercase tracking-wide text-stone-600">
          Administra tus archivos multimedia
        </p>
      </div>

      <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
        {{ error }}
      </div>
      <div v-if="success" class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
        {{ success }}
      </div>

      <div class="mb-6 border-b border-stone-200">
        <nav class="-mb-px flex space-x-8" aria-label="Tabs">
          <button
            @click="activeTab = 'videos'"
            :class="[
              'whitespace-nowrap py-4 px-1 border-b-2 font-semibold text-sm transition-colors duration-200',
              activeTab === 'videos'
                ? 'border-stone-700 text-stone-900'
                : 'border-transparent text-stone-500 hover:text-stone-700 hover:border-stone-300'
            ]"
          >
            Videos
          </button>
          <button
            @click="activeTab = 'images'"
            :class="[
              'whitespace-nowrap py-4 px-1 border-b-2 font-semibold text-sm transition-colors duration-200',
              activeTab === 'images'
                ? 'border-stone-700 text-stone-900'
                : 'border-transparent text-stone-500 hover:text-stone-700 hover:border-stone-300'
            ]"
          >
            Imágenes
          </button>
        </nav>
      </div>

      <div v-if="activeTab === 'videos'">
        <div class="flex justify-center mb-8">
          <button
            @click="showVideoUploader = true"
            class="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-4 px-8 rounded-xl shadow-2xl hover:shadow-blue-500/25 hover:scale-105 transition-all duration-300 overflow-hidden group"
          >
            <span class="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            <span class="relative flex items-center gap-3">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
              Subir Nuevo Vídeo
            </span>
          </button>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <div
            v-for="video in videos"
            :key="video.id"
            class="bg-white shadow-xl rounded-xl overflow-hidden border border-stone-200 transition-all duration-300 hover:scale-105 hover:shadow-2xl group cursor-pointer"
            @click="openVideoModal(video)"
          >
            <div class="relative">
              <img :src="video.thumbnail" :alt="video.name" class="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110" />
              <div class="absolute inset-0 bg-stone-900 bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div class="bg-white/90 backdrop-blur-sm rounded-full p-4 shadow-lg">
                  <svg class="w-8 h-8 text-stone-800" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
              </div>
              <div class="absolute top-2 right-2 bg-stone-900/80 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">
                <svg class="w-3 h-3 inline mr-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
                Video
              </div>
            </div>
            <div class="p-4">
              <h3 class="font-semibold text-stone-800 truncate">{{ video.name }}</h3>
              <div class="text-sm text-stone-600 mt-2 space-y-1">
                <p><span class="font-medium text-stone-700">{{ video.dimensions || "N/A" }}</span></p>
                <p><span class="font-medium text-stone-700">{{ video.size || "N/A" }}</span> • <span class="font-medium text-stone-700">{{ video.format || "N/A" }}</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="activeTab === 'images'">
        <div class="flex justify-center mb-8">
          <button
            @click="openCropperModal"
            class="relative bg-gradient-to-r from-green-600 to-teal-600 text-white font-bold py-4 px-8 rounded-xl shadow-2xl hover:shadow-green-500/25 hover:scale-105 transition-all duration-300 overflow-hidden group"
          >
            <span class="absolute inset-0 bg-gradient-to-r from-green-400 to-teal-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            <span class="relative flex items-center gap-3">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
              Subir y Recortar Nueva Imagen
            </span>
          </button>
        </div>

        <h2 class="text-2xl font-bold text-stone-800 mb-4 mt-12">Galería de Imágenes</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <div
            v-for="image in images"
            :key="image.id"
            class="bg-white shadow-xl rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl border border-stone-200 group cursor-pointer"
            @click="openImageModal(image)"
          >
            <div class="relative">
              <img
                class="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                :src="image.url"
                :alt="image.name"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-stone-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                <div class="bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg">
                  <span class="text-stone-800 font-semibold flex items-center gap-2">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                    </svg>
                    Ver Imagen
                  </span>
                </div>
              </div>
            </div>
            <div class="p-4">
              <h3 class="font-semibold text-stone-800 truncate">{{ image.name }}</h3>
              <div class="text-sm text-stone-600 mt-2 space-y-1">
                <p><span class="font-medium text-stone-700">{{ image.dimensions }}</span></p>
                <p><span class="font-medium text-stone-700">{{ image.size }}</span> • <span class="font-medium text-stone-700">{{ image.format }}</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        v-if="showVideoModal && selectedVideo"
        class="fixed inset-0 bg-stone-900 bg-opacity-90 flex items-center justify-center z-50 p-4 cursor-pointer"
        @click="closeAllModals"
      >
        <div
          class="bg-white rounded-2xl overflow-hidden shadow-2xl max-w-5xl w-full transform transition-all duration-300 scale-100 hover:scale-105"
          @click.stop
        >
          <div class="flex justify-between items-center p-6 border-b border-stone-200 bg-gradient-to-r from-stone-50 to-stone-100">
            <h3 class="text-2xl font-bold text-stone-800">{{ selectedVideo.name }}</h3>
            <button
              @click="closeAllModals"
              class="text-stone-400 hover:text-stone-600 hover:bg-stone-200 rounded-full p-2 transition-all duration-200"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          <div class="p-6">
            <video
              ref="videoPlayer"
              :src="selectedVideo.url"
              class="w-full rounded-xl shadow-lg"
              controls
              autoplay
            >
              <track
                v-for="subtitle in selectedVideo.subtitles"
                :key="subtitle.srclang"
                kind="subtitles"
                :src="subtitle.src"
                :srclang="subtitle.srclang"
                :label="subtitle.label"
                :default="subtitle.srclang === 'es'"
              />
              <p class="text-stone-500">Tu navegador no soporta el tag de vídeo.</p>
            </video>
            <div class="mt-4 text-sm text-stone-600">
              <p><strong>Dimensiones:</strong> {{ selectedVideo.dimensions }}</p>
              <p><strong>Tamaño:</strong> {{ selectedVideo.size }}</p>
              <p><strong>Formato:</strong> {{ selectedVideo.format }}</p>
            </div>
          </div>
        </div>
      </div>

      <div
        v-if="showImageModal && selectedImage"
        class="fixed inset-0 bg-stone-900 bg-opacity-90 flex items-center justify-center z-50 p-4 cursor-pointer"
        @click="closeAllModals"
      >
        <div
          class="bg-white rounded-2xl overflow-hidden shadow-2xl w-full max-w-2xl max-h-[80vh] transform transition-all duration-300 scale-100"
          @click.stop
        >
          <div class="flex justify-between items-center p-4 border-b border-stone-200 bg-gradient-to-r from-stone-50 to-stone-100">
            <h3 class="text-lg font-bold text-stone-800">{{ selectedImage.name }}</h3>
            <button
              @click="closeAllModals"
              class="text-stone-400 hover:text-stone-600 hover:bg-stone-200 rounded-full p-2 transition-all duration-200 text-xl font-bold"
              title="Cerrar"
            >
              ✕
            </button>
          </div>
          <div class="p-4">
            <img
              :src="selectedImage.url"
              :alt="selectedImage.name"
              class="w-full rounded-xl shadow-lg max-h-96 object-contain"
            />
            <div class="mt-4 text-sm text-stone-600 space-y-1">
              <p><strong>Dimensiones:</strong> {{ selectedImage.dimensions }}</p>
              <p><strong>Tamaño:</strong> {{ selectedImage.size }}</p>
              <p><strong>Formato:</strong> {{ selectedImage.format }}</p>
            </div>
          </div>
        </div>
      </div>

      <div
        v-if="showImageCropper"
        class="fixed inset-0 bg-stone-900 bg-opacity-90 flex items-center justify-center z-50 p-4"
      >
        <div class="bg-white rounded-2xl overflow-hidden shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col">
          <div class="flex justify-between items-center p-6 border-b border-stone-200 bg-gradient-to-r from-stone-50 to-stone-100">
            <h3 class="text-2xl font-bold text-stone-800">Recortar Imagen</h3>
            <button
              @click="closeCropperModal"
              class="text-stone-400 hover:text-stone-600 hover:bg-stone-200 rounded-full p-2 transition-all duration-200 text-xl font-bold"
              title="Cerrar"
            >
              ✕
            </button>
          </div>

          <div class="p-6 flex-1 flex flex-col">
            <input
              ref="fileInput"
              type="file"
              accept="image/*"
              @change="handleFileSelect"
              class="mb-4 p-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-500"
            />

            <div class="flex-1 flex items-center justify-center min-h-[300px] bg-stone-50 rounded-lg border-2 border-dashed border-stone-300 relative">
              <img
                ref="imagePreview"
                :src="previewImage"
                :style="{ display: previewImage ? 'block' : 'none', maxWidth: '100%', maxHeight: '100%' }"
                class="rounded-lg"
              />
              <div v-if="!previewImage" class="text-center text-stone-500">
                <svg class="w-12 h-12 mx-auto mb-4 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
                <p>Selecciona una imagen para recortar</p>
              </div>

              <div v-if="previewImage" class="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded font-mono max-w-xs">
                <div>Cropper: {{ cropper ? '✅ Active' : '❌ Inactive' }}</div>
                <div v-if="cropper">Modern: {{ typeof cropper.getCropperCanvas }}</div>
                <div v-if="cropper">Legacy: {{ typeof cropper.getCroppedCanvas }}</div>
                <div v-if="cropper">Data: {{ typeof cropper.getData }}</div>
                <div>Preview: {{ previewImage ? '✅ Set' : '❌ Empty' }}</div>
              </div>
            </div>

            <div class="mt-6 flex justify-between items-center">
              <div class="text-sm text-stone-600">
                <input
                  v-model="imageName"
                  type="text"
                  placeholder="Nombre de la imagen"
                  class="px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-500"
                />
              </div>
              <div class="flex gap-3">
                <button
                  @click="closeCropperModal"
                  class="px-6 py-2 bg-stone-200 text-stone-800 rounded-lg hover:bg-stone-300 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  @click="cropAndSaveImage"
                  :disabled="!previewImage || !imageName.trim()"
                  :class="[
                    'px-6 py-2 rounded-lg transition-colors',
                    (!previewImage || !imageName.trim())
                      ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                      : 'bg-stone-700 text-white hover:bg-stone-800'
                  ]"
                >
                  Recortar y Guardar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import Cropper from 'cropperjs'
import weddingImg from '~/assets/carousel/wedding.webp'
import portraitImg from '~/assets/carousel/horses.webp'
import landscapeImg from '~/assets/carousel/landscape.webp'
import eventsImg from '~/assets/carousel/events.webp'
import familyImg from '~/assets/carousel/family.webp'
import fashionImg from '~/assets/carousel/fashion.webp'

// Reactive data
const activeTab = ref('videos')
const videos = ref([])
const images = ref([])
const loading = ref(true)
const error = ref('')
const success = ref('')
const showVideoModal = ref(false)
const showImageModal = ref(false)
const showImageCropper = ref(false)
const showVideoUploader = ref(false)
const selectedVideo = ref(null)
const selectedImage = ref(null)

// Cropper related data
const previewImage = ref('')
const imageName = ref('')
const cropper = ref(null)
const fileInput = ref(null)
const imagePreview = ref(null)

// Static videos data - Replace with your actual video imports
import dog1 from '~/assets/videos/dog1.mp4'
import dog2 from '~/assets/videos/dog2.mp4'
import dog3 from '~/assets/videos/dog3.mp4'
import dog4 from '~/assets/videos/dog4.mp4'
import dog5 from '~/assets/videos/dog5.mp4'
import dog6 from '~/assets/videos/dog6.mp4'
import forest from '~/assets/videos/forest.mp4'
import sunshine from '~/assets/videos/sunshine.mp4'
import mountain from '~/assets/videos/mountain.mp4'
import mountain2 from '~/assets/videos/mountain2.mp4'

const STATIC_VIDEOS = [
  {
    id: "v1",
    url: dog1,
    name: "Dog Adventures 1",
    subtitles: [],
    thumbnail: "/images/video-thumb1.jpg"
  },
  {
    id: "v2",
    url: dog2,
    name: "Dog Adventures 2",
    subtitles: [],
    thumbnail: "/images/video-thumb2.jpg"
  },
  {
    id: "v3",
    url: dog3,
    name: "Dog Adventures 3",
    subtitles: [],
    thumbnail: "/images/video-thumb3.jpg"
  },
  {
    id: "v4",
    url: dog4,
    name: "Dog Adventures 4",
    subtitles: [],
    thumbnail: "/images/video-thumb4.jpg"
  },
  {
    id: "v5",
    url: dog5,
    name: "Dog Adventures 5",
    subtitles: [],
    thumbnail: "/images/video-thumb5.jpg"
  },
  {
    id: "v6",
    url: dog6,
    name: "Dog Adventures 6",
    subtitles: [],
    thumbnail: "/images/video-thumb6.jpg"
  },
  {
    id: "v7",
    url: forest,
    name: "Forest Journey",
    subtitles: [],
    thumbnail: "/images/video-thumb7.jpg"
  },
  {
    id: "v8",
    url: sunshine,
    name: "Sunshine Moments",
    subtitles: [],
    thumbnail: "/images/video-thumb8.jpg"
  },
  {
    id: "v9",
    url: mountain,
    name: "Mountain Views",
    subtitles: [],
    thumbnail: "/images/video-thumb9.jpg"
  },
  {
    id: "v10",
    url: mountain2,
    name: "Mountain Adventures",
    subtitles: [],
    thumbnail: "/images/video-thumb10.jpg"
  },
]

// Initial images - All carousel images
const initialImages = [
  {
    id: "i1",
    url: portraitImg,
    name: "Retrato de Caballos",
    dimensions: "",
    size: "",
    format: "",
  },
  {
    id: "i2",
    url: weddingImg,
    name: "Foto de Boda",
    dimensions: "",
    size: "",
    format: "",
  },
  {
    id: "i3",
    url: landscapeImg,
    name: "Paisaje con Montañas",
    dimensions: "",
    size: "",
    format: "",
  },
  {
    id: "i4",
    url: eventsImg,
    name: "Evento Especial",
    dimensions: "",
    size: "",
    format: "",
  },
  {
    id: "i5",
    url: familyImg,
    name: "Retrato Familiar",
    dimensions: "",
    size: "",
    format: "",
  },
  {
    id: "i6",
    url: fashionImg,
    name: "Sesión de Moda",
    dimensions: "",
    size: "",
    format: "",
  },
]

// Methods
const fetchImageProperties = async (url) => {
  try {
    const response = await fetch(url)
    const blob = await response.blob()
    const sizeInKB = (blob.size / 1024).toFixed(2)
    const format = blob.type.split('/')[1].toUpperCase()

    return new Promise((resolve) => {
      const img = new Image()
      img.onload = () => {
        resolve({
          size: `${sizeInKB} KB`,
          dimensions: `${img.width} x ${img.height} px`,
          format: format,
        })
      }
      img.onerror = () => resolve({ size: "N/A", dimensions: "N/A", format: "N/A" })
      img.src = url
    })
  } catch (e) {
    console.error("Error al obtener las propiedades del archivo:", e)
    return { size: "N/A", dimensions: "N/A", format: "N/A" }
  }
}

const fetchVideoProperties = async (videoItem) => {
  try {
    const video = document.createElement("video")
    video.src = videoItem.url

    await new Promise((resolve, reject) => {
      video.onloadedmetadata = resolve
      video.onerror = () => reject("Error al cargar metadatos del video.")
    })

    const dimensions = `${video.videoWidth} x ${video.videoHeight} px`
    const format = videoItem.url.split(".").pop().toUpperCase() || "N/A"

    const response = await fetch(videoItem.url)
    const blob = await response.blob()
    const sizeInMB = (blob.size / (1024 * 1024)).toFixed(2)

    return {
      ...videoItem,
      dimensions: dimensions,
      size: `${sizeInMB} MB`,
      format: format,
      views: Math.floor(Math.random() * 5000),
      uniqueViews: Math.floor(Math.random() * 2000),
    }
  } catch (error) {
    console.error("Error en fetchVideoProperties:", error)
    return {
      ...videoItem,
      dimensions: "N/A",
      size: "N/A",
      format: "N/A",
      views: 0,
      uniqueViews: 0,
      subtitles: [],
    }
  }
}

const openVideoModal = (video) => {
  selectedVideo.value = video
  showVideoModal.value = true
}

const openImageModal = (image) => {
  selectedImage.value = image
  showImageModal.value = true
}

const closeAllModals = () => {
  showVideoModal.value = false
  showImageModal.value = false
  showImageCropper.value = false
  showVideoUploader.value = false
  selectedVideo.value = null
  selectedImage.value = null
}

const openCropperModal = () => {
  console.log('Opening cropper modal')
  resetCropperState()
  showImageCropper.value = true
  console.log('Cropper modal opened with clean state')
}

const closeCropperModal = () => {
  console.log('Closing cropper modal')
  showImageCropper.value = false

  // Properly destroy cropper instance
  if (cropper.value) {
    console.log('Destroying cropper instance')
    if (typeof cropper.value.destroy === 'function') {
      try {
        cropper.value.destroy()
        console.log('Cropper destroyed successfully')
      } catch (error) {
        console.warn('Error destroying cropper:', error)
      }
    }
    cropper.value = null
  }

  // Reset all cropper-related state
  previewImage.value = ''
  imageName.value = ''

  // Clear file input
  if (fileInput.value) {
    fileInput.value.value = ''
  }

  console.log('Cropper modal closed and state reset')
}

const resetCropperState = () => {
  console.log('Resetting cropper state for new use')

  // Destroy existing cropper
  if (cropper.value) {
    if (typeof cropper.value.destroy === 'function') {
      try {
        cropper.value.destroy()
      } catch (error) {
        console.warn('Error destroying cropper during reset:', error)
      }
    }
    cropper.value = null
  }

  // Reset all state variables
  previewImage.value = ''
  imageName.value = ''
  error.value = ''
  success.value = ''

  // Clear file input
  if (fileInput.value) {
    fileInput.value.value = ''
  }

  console.log('Cropper state reset completed')
}

const handleFileSelect = (event) => {
  console.log('handleFileSelect called')
  const file = event.target.files[0]
  console.log('Selected file:', file)

  if (file) {
    // First, clean up any existing cropper
    if (cropper.value) {
      console.log('Cleaning up existing cropper before new file')
      if (typeof cropper.value.destroy === 'function') {
        try {
          cropper.value.destroy()
          console.log('Existing cropper destroyed')
        } catch (error) {
          console.warn('Error destroying existing cropper:', error)
        }
      }
      cropper.value = null
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      console.log('File loaded, setting preview image')
      console.log('Preview image data length:', e.target.result.length)
      previewImage.value = e.target.result

      // Use nextTick to ensure DOM is updated
      nextTick(() => {
        console.log('Initializing cropper after DOM update...')
        const image = imagePreview.value
        console.log('Image element:', image)
        console.log('Image element complete:', image?.complete)
        console.log('Image element src:', image?.src?.substring(0, 50) + '...')

        if (image) {
          // Ensure image is fully loaded before creating cropper
          const initializeCropper = () => {
            console.log('Image loaded, creating cropper...')
            createCropper(image)
          }

          if (image.complete) {
            console.log('Image already complete, initializing immediately')
            initializeCropper()
          } else {
            console.log('Image not complete, waiting for load...')
            image.onload = () => {
              console.log('Image onload triggered')
              initializeCropper()
            }
            image.onerror = () => {
              console.error('Image failed to load')
              error.value = 'Error al cargar la imagen'
              setTimeout(() => error.value = '', 3000)
            }
          }
        } else {
          console.error('Image element not found')
          error.value = 'Elemento de imagen no encontrado'
          setTimeout(() => error.value = '', 3000)
        }
      })
    }

    reader.onerror = () => {
      console.error('File reading error')
      error.value = 'Error al leer el archivo'
      setTimeout(() => error.value = '', 3000)
    }

    reader.readAsDataURL(file)
  } else {
    console.log('No file selected')
  }
}

const createCropper = (image) => {
  console.log('Creating new cropper instance')
  console.log('Image dimensions:', image.naturalWidth, 'x', image.naturalHeight)
  console.log('Image src length:', image.src.length)

  try {
    // Ensure image has proper dimensions
    if (image.naturalWidth === 0 || image.naturalHeight === 0) {
      throw new Error('Image has no dimensions')
    }

    const cropperOptions = {
      aspectRatio: 16 / 9,
      viewMode: 1,
      autoCropArea: 0.8,
      responsive: true,
      restore: false,
      checkCrossOrigin: false,
      checkOrientation: false,
      modal: true,
      guides: true,
      center: true,
      highlight: false,
      background: false,
      scalable: true,
      zoomable: true,
      zoomOnTouch: true,
      zoomOnWheel: true,
      wheelZoomRatio: 0.1,
      cropBoxMovable: true,
      cropBoxResizable: true,
      toggleDragModeOnDblclick: true,
      ready: function() {
        console.log('🎉 Cropper ready event fired - cropper is fully initialized')
        // Mark cropper as ready
        if (cropper.value) {
          cropper.value._ready = true
        }
      },
      crop: function(event) {
        console.log('✂️ Crop event:', {
          x: Math.round(event.detail.x),
          y: Math.round(event.detail.y),
          width: Math.round(event.detail.width),
          height: Math.round(event.detail.height)
        })
      }
    }

    console.log('Creating cropper with options:', cropperOptions)
    cropper.value = new Cropper(image, cropperOptions)

    console.log('Cropper created successfully')
    console.log('Cropper instance type:', typeof cropper.value)
    console.log('Available methods:', Object.getOwnPropertyNames(Cropper.prototype))
    console.log('getCropperCanvas available:', typeof cropper.value.getCropperCanvas)
    console.log('getCroppedCanvas available:', typeof cropper.value.getCroppedCanvas)
    console.log('getData available:', typeof cropper.value.getData)

    // Verify cropper is working after a short delay
    setTimeout(() => {
      if (cropper.value) {
        try {
          // Use the correct method for the modern API
          const data = cropper.value.getCropperSelection()
          console.log('✅ Cropper data after creation:', data)
          console.log('Cropper ready state:', cropper.value._ready || 'checking...')
        } catch (e) {
          console.warn('⚠️ Could not get cropper data:', e)
        }
      }
    }, 200)

  } catch (error) {
    console.error('❌ Error creating cropper:', error)
    console.error('Error stack:', error.stack)
    cropper.value = null
    error.value = 'Error al crear el recortador de imagen: ' + error.message
    setTimeout(() => error.value = '', 3000)
  }
}

const cropAndSaveImage = async () => {
  console.log('=== cropAndSaveImage called ===')
  console.log('cropper.value exists:', !!cropper.value)
  console.log('imageName.value:', imageName.value)
  console.log('previewImage.value exists:', !!previewImage.value)

  if (!cropper.value) {
    console.error('❌ No cropper instance found')
    error.value = 'No hay instancia de cropper. Por favor selecciona una imagen primero.'
    setTimeout(() => error.value = '', 3000)
    return
  }

  if (!imageName.value.trim()) {
    console.error('❌ No image name provided')
    error.value = 'Por favor ingresa un nombre para la imagen'
    setTimeout(() => error.value = '', 3000)
    return
  }

  try {
    // Small delay to ensure cropper is ready
    console.log('⏳ Waiting for cropper to be ready...')
    await new Promise(resolve => setTimeout(resolve, 200))

    console.log('🔍 Checking cropper instance...')
    console.log('Cropper type:', typeof cropper.value)
    console.log('Cropper constructor:', cropper.value?.constructor?.name)

    if (!cropper.value || typeof cropper.value !== 'object') {
      console.error('❌ Invalid cropper instance')
      throw new Error('Instancia de cropper inválida')
    }

    // Get cropper data first (try different methods)
    console.log('📊 Getting cropper data...')
    let cropperData;
    try {
      // Try getData first (legacy)
      if (typeof cropper.value.getData === 'function') {
        cropperData = cropper.value.getData();
        console.log('✅ Cropper data (legacy):', cropperData);
      } else if (typeof cropper.value.getCropperSelection === 'function') {
        cropperData = cropper.value.getCropperSelection();
        console.log('✅ Cropper selection data:', cropperData);
      }

      if (cropperData && (cropperData.width === 0 || cropperData.height === 0)) {
        console.warn('⚠️ Cropper data seems invalid');
      }
    } catch (dataError) {
      console.warn('⚠️ Could not get cropper data:', dataError);
    }

    // Try to get cropped canvas - simplified approach
    let croppedCanvas = null;

    console.log('🎯 Attempting to get cropped canvas...');

    // Try getCroppedCanvas first (legacy method)
    if (typeof cropper.value.getCroppedCanvas === 'function') {
      console.log('🔄 Using getCroppedCanvas (legacy method)');
      try {
        croppedCanvas = cropper.value.getCroppedCanvas({
          width: 800,
          height: 450,
          fillColor: '#fff',
          imageSmoothingEnabled: true,
          imageSmoothingQuality: 'high'
        });
        console.log('✅ getCroppedCanvas succeeded');
      } catch (cropError) {
        console.error('❌ getCroppedCanvas failed:', cropError.message);
      }
    }

    // If getCroppedCanvas failed or not available, try getCropperCanvas
    if (!croppedCanvas && typeof cropper.value.getCropperCanvas === 'function') {
      console.log('🎯 Using getCropperCanvas (modern method)');
      try {
        croppedCanvas = cropper.value.getCropperCanvas({
          width: 800,
          height: 450,
          minWidth: 256,
          minHeight: 256,
          maxWidth: 4096,
          maxHeight: 4096,
          fillColor: '#fff',
          imageSmoothingEnabled: true,
          imageSmoothingQuality: 'high'
        });
        console.log('✅ getCropperCanvas succeeded');
      } catch (cropError) {
        console.error('❌ getCropperCanvas failed:', cropError.message);
      }
    }

    // If still no canvas, try to create one manually
    if (!croppedCanvas) {
      console.log('🔧 Attempting manual canvas creation...');
      try {
        // Get cropper data to create canvas manually
        const cropData = cropper.value.getData();
        console.log('Crop data:', cropData);

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = 800;
        canvas.height = 450;

        // Create image from preview
        const img = new Image();
        img.src = previewImage.value;

        await new Promise((resolve, reject) => {
          img.onload = resolve;
          img.onerror = () => reject(new Error('Failed to load image'));
        });

        // Calculate crop dimensions
        const scaleX = img.width / cropData.naturalWidth;
        const scaleY = img.height / cropData.naturalHeight;

        const cropX = cropData.x * scaleX;
        const cropY = cropData.y * scaleY;
        const cropWidth = cropData.width * scaleX;
        const cropHeight = cropData.height * scaleY;

        // Draw cropped image
        ctx.drawImage(
          img,
          cropX, cropY, cropWidth, cropHeight,
          0, 0, canvas.width, canvas.height
        );

        croppedCanvas = canvas;
        console.log('✅ Manual canvas creation succeeded');
      } catch (manualError) {
        console.error('❌ Manual canvas creation failed:', manualError.message);
        throw new Error('No se pudo crear el canvas recortado');
      }
    }

    console.log('Canvas type:', croppedCanvas?.constructor?.name);
    console.log('Canvas dimensions:', croppedCanvas?.width, 'x', croppedCanvas?.height);

    if (croppedCanvas) {
      console.log('🖼️ Converting to data URL...');

      // Ensure we have a proper HTML5 canvas
      let finalCanvas = croppedCanvas;

      // If it's not a canvas element, try to get the actual canvas
      if (croppedCanvas.tagName !== 'CANVAS') {
        console.log('🔍 Canvas is not a native element, attempting to extract...');

        // Try different methods to get the actual canvas
        if (croppedCanvas.canvas) {
          finalCanvas = croppedCanvas.canvas;
          console.log('✅ Found canvas via .canvas property');
        } else if (croppedCanvas.querySelector) {
          const foundCanvas = croppedCanvas.querySelector('canvas');
          if (foundCanvas) {
            finalCanvas = foundCanvas;
            console.log('✅ Found canvas via querySelector');
          }
        } else if (croppedCanvas.shadowRoot) {
          const foundCanvas = croppedCanvas.shadowRoot.querySelector('canvas');
          if (foundCanvas) {
            finalCanvas = foundCanvas;
            console.log('✅ Found canvas via shadowRoot');
          }
        }
      }

      // Convert to data URL
      const croppedDataUrl = finalCanvas.toDataURL('image/png', 0.9);
      console.log('✅ Data URL created, length:', croppedDataUrl.length);

      // Create new image object
      const newImage = {
        id: `img-${Date.now()}`,
        url: croppedDataUrl,
        name: imageName.value.trim(),
        dimensions: `${croppedCanvas.width} x ${croppedCanvas.height} px`,
        size: `${((croppedDataUrl.length * 3) / 4 / 1024).toFixed(2)} KB`,
        format: 'PNG',
      };

      console.log('📦 New image object created:', newImage);

      // Add to images array
      images.value.unshift(newImage);
      console.log('✅ Image added to array, new length:', images.value.length);

      // Save to localStorage for persistence
      const savedImages = JSON.parse(localStorage.getItem('uploadedImages') || '[]');
      savedImages.unshift(newImage);
      localStorage.setItem('uploadedImages', JSON.stringify(savedImages));

      // Trigger storage event to update carousel
      window.dispatchEvent(new StorageEvent('storage', {
        key: 'uploadedImages',
        newValue: JSON.stringify(savedImages),
        oldValue: JSON.stringify(savedImages.slice(1)),
        storageArea: localStorage
      }));

      console.log('💾 Image saved to localStorage and carousel updated');

      // Show success message
      success.value = `Imagen "${imageName.value}" guardada exitosamente`;
      setTimeout(() => success.value = '', 3000);

      // Close modal
      closeCropperModal();
      console.log('✅ Modal closed - Process completed successfully');
    } else {
      console.error('❌ No cropped canvas returned');
      throw new Error('No se pudo crear el canvas recortado');
    }
  } catch (error) {
    console.error('❌ Error cropping image:', error);
    console.error('Error stack:', error.stack);

    // Fallback: save original image
    console.log('🔄 Attempting fallback with original image...');
    if (previewImage.value) {
      const newImage = {
        id: `img-${Date.now()}`,
        url: previewImage.value,
        name: imageName.value.trim(),
        dimensions: 'Original',
        size: 'Original',
        format: 'Original',
      };

      images.value.unshift(newImage);
      const savedImages = JSON.parse(localStorage.getItem('uploadedImages') || '[]');
      savedImages.unshift(newImage);
      localStorage.setItem('uploadedImages', JSON.stringify(savedImages));

      // Trigger storage event to update carousel
      window.dispatchEvent(new StorageEvent('storage', {
        key: 'uploadedImages',
        newValue: JSON.stringify(savedImages),
        oldValue: JSON.stringify(savedImages.slice(1)),
        storageArea: localStorage
      }));

      success.value = `Imagen "${imageName.value}" guardada (sin recorte)`;
      setTimeout(() => success.value = '', 3000);
      closeCropperModal();
      console.log('✅ Fallback save completed');
      return;
    }

    error.value = 'Error al procesar la imagen: ' + error.message;
    setTimeout(() => error.value = '', 3000);
  }
}

// Navigation functions
const navigateToImages = () => {
  activeTab.value = 'images'
}

const navigateToVideos = () => {
  activeTab.value = 'videos'
}

// Initialize data
onMounted(async () => {
  document.body.classList.add('config-page')

  try {
    // Load image properties for initial images
    const processedImages = await Promise.all(
      initialImages.map(async (img) => {
        const properties = await fetchImageProperties(img.url)
        return { ...img, ...properties }
      })
    )

    // Load saved images from localStorage
    const savedImages = JSON.parse(localStorage.getItem('uploadedImages') || '[]')

    // Combine initial images with saved images
    images.value = [...processedImages, ...savedImages]

    // Load video properties
    const processedVideos = await Promise.all(
      STATIC_VIDEOS.map(video => fetchVideoProperties(video))
    )
    videos.value = processedVideos

    loading.value = false
  } catch (err) {
    console.error('Error loading multimedia:', err)
    error.value = 'Error al cargar los archivos multimedia'
    loading.value = false
  }
})

onUnmounted(() => {
  console.log('Component unmounting, cleaning up...')
  document.body.classList.remove('config-page')

  // Clean up cropper instance
  if (cropper.value) {
    console.log('Destroying cropper instance on unmount')
    if (typeof cropper.value.destroy === 'function') {
      try {
        cropper.value.destroy()
        console.log('Cropper destroyed successfully on unmount')
      } catch (error) {
        console.warn('Error destroying cropper on unmount:', error)
      }
    }
    cropper.value = null
  }

  // Clear all reactive refs to prevent memory leaks
  previewImage.value = ''
  imageName.value = ''
  error.value = ''
  success.value = ''

  console.log('Component cleanup completed')
})
</script>

<style scoped>
/* Enhanced button animations */
button:hover {
  transform: translateY(-2px);
}

button:active {
  transform: translateY(0);
}

/* Tab animations */
.tab-button {
  position: relative;
  overflow: hidden;
}

.tab-button::before {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, #8B4513, #DAA520);
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

.tab-button.active::before {
  transform: scaleX(1);
}

/* Card hover effects */
.image-card, .video-card {
  position: relative;
}

.image-card::before, .video-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%);
  transform: translateX(-100%);
  transition: transform 0.6s ease;
}

.image-card:hover::before, .video-card:hover::before {
  transform: translateX(100%);
}

/* Modal backdrop blur effect */
.modal-backdrop {
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

/* Loading animation */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.loading {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* Gradient text effects */
.gradient-text {
  background: linear-gradient(135deg, #8B4513, #DAA520);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Enhanced shadows */
.shadow-glow {
  box-shadow: 0 0 20px rgba(139, 69, 19, 0.1);
}

.shadow-glow:hover {
  box-shadow: 0 0 30px rgba(139, 69, 19, 0.2);
}

/* Cropper.js styles */
.cropper-container {
  font-size: 0;
  line-height: 0;
  position: relative;
  user-select: none;
  direction: ltr;
  touch-action: none;
}

.cropper-modal,
.cropper-canvas,
.cropper-crop-box,
.cropper-point {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

.cropper-canvas {
  background-color: #fafafa;
}

.cropper-modal {
  background-color: #000;
  opacity: 0.5;
}

.cropper-crop-box {
  background-color: transparent;
}

.cropper-face,
.cropper-center,
.cropper-line,
.cropper-point {
  display: block;
  width: 100%;
  height: 100%;
  position: absolute;
}

.cropper-face {
  background-color: #fff;
  opacity: 0.3;
}

.cropper-line {
  background-color: #39f;
}

.cropper-line.line-e {
  cursor: e-resize;
  right: -3px;
  width: 6px;
}

.cropper-line.line-n {
  cursor: n-resize;
  top: -3px;
  height: 6px;
}

.cropper-line.line-w {
  cursor: w-resize;
  left: -3px;
  width: 6px;
}

.cropper-line.line-s {
  cursor: s-resize;
  bottom: -3px;
  height: 6px;
}

.cropper-point {
  width: 6px;
  height: 6px;
  background-color: #39f;
  opacity: 0.75;
}

.cropper-point.point-e {
  cursor: e-resize;
  right: -3px;
  top: 50%;
  margin-top: -3px;
}

.cropper-point.point-n {
  cursor: n-resize;
  top: -3px;
  left: 50%;
  margin-left: -3px;
}

.cropper-point.point-w {
  cursor: w-resize;
  left: -3px;
  top: 50%;
  margin-top: -3px;
}

.cropper-point.point-s {
  cursor: s-resize;
  bottom: -3px;
  left: 50%;
  margin-left: -3px;
}

.cropper-point.point-ne {
  cursor: ne-resize;
  top: -3px;
  right: -3px;
}

.cropper-point.point-nw {
  cursor: nw-resize;
  top: -3px;
  left: -3px;
}

.cropper-point.point-sw {
  cursor: sw-resize;
  bottom: -3px;
  left: -3px;
}

.cropper-point.point-se {
  cursor: se-resize;
  bottom: -3px;
  right: -3px;
}

.cropper-point.point-se::before {
  content: ' ';
  position: absolute;
  right: -50%;
  bottom: -50%;
  width: 200%;
  height: 200%;
  opacity: 0;
  background-color: #39f;
}
</style>