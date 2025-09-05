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
      <!-- Header -->
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

      <!-- Error/Success Messages -->
      <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
        {{ error }}
      </div>
      <div v-if="success" class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
        {{ success }}
      </div>

      <!-- Tabs -->
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

      <!-- Videos Tab -->
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

      <!-- Images Tab -->
      <div v-if="activeTab === 'images'">
        <div class="flex justify-center mb-8">
          <button
            @click="showImageCropper = true"
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

      <!-- Video Modal -->
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

      <!-- Image Modal -->
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

      <!-- Image Cropper Modal -->
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

            <div class="flex-1 flex items-center justify-center min-h-[300px] bg-stone-50 rounded-lg border-2 border-dashed border-stone-300">
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

// Static videos data (simplified version)
const STATIC_VIDEOS = [
  {
    id: "v1",
    url: "/videos/sample1.mp4", // You'll need to add actual video files
    name: "Video de Muestra 1",
    subtitles: [],
    thumbnail: "/images/video-thumb1.jpg"
  },
  {
    id: "v2",
    url: "/videos/sample2.mp4", // You'll need to add actual video files
    name: "Video de Muestra 2",
    subtitles: [],
    thumbnail: "/images/video-thumb2.jpg"
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

const closeCropperModal = () => {
  showImageCropper.value = false
  if (cropper.value && typeof cropper.value.destroy === 'function') {
    try {
      cropper.value.destroy()
    } catch (error) {
      console.warn('Error destroying cropper:', error)
    }
    cropper.value = null
  }
  previewImage.value = ''
  imageName.value = ''
  // Clear file input
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}

const handleFileSelect = (event) => {
  console.log('handleFileSelect called')
  const file = event.target.files[0]
  console.log('Selected file:', file)

  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      console.log('File loaded, setting preview image')
      previewImage.value = e.target.result
      nextTick(() => {
        console.log('Initializing cropper...')
        if (cropper.value) {
          console.log('Destroying existing cropper')
          cropper.value.destroy()
          cropper.value = null
        }
        const image = imagePreview.value
        console.log('Image element:', image)
        if (image) {
          console.log('Creating new cropper instance')
          try {
            cropper.value = new Cropper(image, {
              aspectRatio: 16 / 9,
              viewMode: 1,
              autoCropArea: 0.8,
              responsive: true,
              restore: false,
            })
            console.log('Cropper created successfully')
            console.log('Cropper instance type:', typeof cropper.value)
            console.log('Cropper has getCroppedCanvas:', typeof cropper.value.getCroppedCanvas)
          } catch (error) {
            console.error('Error creating cropper:', error)
            cropper.value = null
          }
        } else {
          console.error('Image element not found')
        }
      })
    }
    reader.readAsDataURL(file)
  } else {
    console.log('No file selected')
  }
}

const cropAndSaveImage = async () => {
  console.log('cropAndSaveImage called')
  console.log('cropper.value:', cropper.value)
  console.log('imageName.value:', imageName.value)

  if (!cropper.value) {
    console.error('No cropper instance found')
    error.value = 'No hay instancia de cropper. Por favor selecciona una imagen primero.'
    setTimeout(() => error.value = '', 3000)
    return
  }

  if (!imageName.value.trim()) {
    console.error('No image name provided')
    error.value = 'Por favor ingresa un nombre para la imagen'
    setTimeout(() => error.value = '', 3000)
    return
  }

  try {
    console.log('Cropper instance type:', typeof cropper.value)
    console.log('Cropper instance:', cropper.value)

    // Check if cropper has the expected methods
    if (!cropper.value || typeof cropper.value !== 'object') {
      console.error('Invalid cropper instance')
      throw new Error('Instancia de cropper inválida')
    }

    // Try to get cropped canvas with different approaches
    let croppedCanvas = null

    if (typeof cropper.value.getCroppedCanvas === 'function') {
      console.log('Using getCroppedCanvas method')
      croppedCanvas = cropper.value.getCroppedCanvas({
        width: 800,
        height: 450,
        fillColor: '#fff',
      })
    } else {
      console.log('getCroppedCanvas method not available, trying alternative approach')
      // Fallback: create canvas from original image
      const img = new Image()
      img.src = previewImage.value
      await new Promise(resolve => {
        img.onload = resolve
      })

      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      canvas.width = 800
      canvas.height = 450

      // Simple center crop
      const aspectRatio = img.width / img.height
      let sourceWidth = img.width
      let sourceHeight = img.height
      let sourceX = 0
      let sourceY = 0

      if (aspectRatio > 16/9) {
        sourceWidth = img.height * (16/9)
        sourceX = (img.width - sourceWidth) / 2
      } else {
        sourceHeight = img.width / (16/9)
        sourceY = (img.height - sourceHeight) / 2
      }

      ctx.drawImage(img, sourceX, sourceY, sourceWidth, sourceHeight, 0, 0, 800, 450)
      croppedCanvas = canvas
    }

    if (croppedCanvas) {
      console.log('Converting to data URL...')
      const croppedDataUrl = croppedCanvas.toDataURL('image/png', 0.9)
      console.log('Data URL length:', croppedDataUrl.length)

      // Create new image object
      const newImage = {
        id: `img-${Date.now()}`,
        url: croppedDataUrl,
        name: imageName.value.trim(),
        dimensions: `${croppedCanvas.width} x ${croppedCanvas.height} px`,
        size: `${((croppedDataUrl.length * 3) / 4 / 1024).toFixed(2)} KB`,
        format: 'PNG',
      }

      console.log('New image object:', newImage)

      // Add to images array
      images.value.unshift(newImage)
      console.log('Image added to array, new length:', images.value.length)

      // Save to localStorage for persistence
      const savedImages = JSON.parse(localStorage.getItem('uploadedImages') || '[]')
      savedImages.unshift(newImage)
      localStorage.setItem('uploadedImages', JSON.stringify(savedImages))
      console.log('Image saved to localStorage')

      // Show success message
      success.value = `Imagen "${imageName.value}" guardada exitosamente`
      setTimeout(() => success.value = '', 3000)

      // Close modal
      closeCropperModal()
      console.log('Modal closed')
    } else {
      throw new Error('No se pudo crear el canvas recortado')
    }
  } catch (error) {
    console.error('Error cropping image:', error)

    // Fallback: save original image
    console.log('Attempting fallback with original image...')
    if (previewImage.value) {
      const newImage = {
        id: `img-${Date.now()}`,
        url: previewImage.value,
        name: imageName.value.trim(),
        dimensions: 'Original',
        size: 'Original',
        format: 'Original',
      }

      images.value.unshift(newImage)
      const savedImages = JSON.parse(localStorage.getItem('uploadedImages') || '[]')
      savedImages.unshift(newImage)
      localStorage.setItem('uploadedImages', JSON.stringify(savedImages))

      success.value = `Imagen "${imageName.value}" guardada (sin recorte)`
      setTimeout(() => success.value = '', 3000)
      closeCropperModal()
      console.log('Fallback save completed')
      return
    }

    error.value = 'Error al procesar la imagen: ' + error.message
    setTimeout(() => error.value = '', 3000)
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
  document.body.classList.remove('config-page')
  // Clean up cropper instance
  if (cropper.value && typeof cropper.value.destroy === 'function') {
    try {
      cropper.value.destroy()
    } catch (error) {
      console.warn('Error destroying cropper on unmount:', error)
    }
    cropper.value = null
  }
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