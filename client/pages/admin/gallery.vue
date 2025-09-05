<template>
  <navbar-element></navbar-element>

  <section class="gallery-section">
    <div class="gallery-container">
      <div class="gallery-header">
        <h1 class="brand-title">LANDING</h1>
        <p class="brand-subtitle">PHOTOGRAPHY</p>
      </div>

      <div class="gallery-content">
        <div class="page-header">
          <h2>Galería Profesional</h2>
          <p>Sube y organiza las fotos profesionales del estudio</p>
        </div>

        <!-- Upload Section -->
        <div class="upload-section">
          <div class="upload-card">
            <div class="upload-header">
              <Icon name="heroicons:cloud-arrow-up" size="32" />
              <h3>Subir Archivos</h3>
              <p>Arrastra y suelta o haz clic para seleccionar</p>
            </div>

            <div class="upload-area" @dragover.prevent @drop.prevent="handleDrop">
              <input
                ref="fileInput"
                type="file"
                multiple
                accept="image/*,video/*"
                @change="handleFileSelect"
                class="file-input"
              />

              <div v-if="!isUploading" class="upload-zone" @click="$refs.fileInput.click()">
                <Icon name="heroicons:photo" size="48" />
                <p class="upload-text">Haz clic para seleccionar archivos</p>
                <p class="upload-subtext">o arrastra y suelta aquí</p>
                <p class="upload-limits">Máximo 10MB por archivo • JPG, PNG, MP4, MOV</p>
              </div>

              <div v-else class="upload-progress">
                <div class="progress-spinner">
                  <Icon name="heroicons:arrow-path" size="32" class="spinning" />
                </div>
                <p>Subiendo archivos...</p>
                <div class="progress-bar">
                  <div class="progress-fill" :style="{ width: `${uploadProgress}%` }"></div>
                </div>
                <span class="progress-text">{{ uploadProgress }}%</span>
              </div>
            </div>

            <div class="upload-actions">
              <button @click="$refs.fileInput.click()" class="btn btn-primary">
                <Icon name="heroicons:folder-plus" size="16" />
                Seleccionar Archivos
              </button>
              <button @click="clearSelection" v-if="selectedFiles.length > 0" class="btn btn-secondary">
                Limpiar Selección
              </button>
            </div>
          </div>

          <!-- Selected Files Preview -->
          <div v-if="selectedFiles.length > 0" class="selected-files">
            <h4>Archivos Seleccionados ({{ selectedFiles.length }})</h4>
            <div class="files-grid">
              <div
                v-for="(file, index) in selectedFiles"
                :key="index"
                class="file-preview"
              >
                <div class="file-thumbnail">
                  <img
                    v-if="file.type.startsWith('image/')"
                    :src="file.preview"
                    :alt="file.name"
                  />
                  <div v-else class="video-thumbnail">
                    <Icon name="heroicons:video-camera" size="24" />
                  </div>
                </div>
                <div class="file-info">
                  <p class="file-name">{{ file.name }}</p>
                  <p class="file-size">{{ formatFileSize(file.size) }}</p>
                </div>
                <button @click="removeFile(index)" class="remove-file">
                  <Icon name="heroicons:x-mark" size="16" />
                </button>
              </div>
            </div>
            <div class="selected-actions">
              <button @click="uploadFiles" :disabled="isUploading" class="btn btn-accent">
                <Icon name="heroicons:cloud-arrow-up" size="16" />
                {{ isUploading ? 'Subiendo...' : 'Subir Archivos' }}
              </button>
            </div>
          </div>
        </div>

        <!-- Gallery Grid -->
        <div class="gallery-grid-section">
          <div class="gallery-controls">
            <div class="filter-tabs">
              <button
                v-for="filter in filters"
                :key="filter.id"
                :class="['filter-tab', { active: activeFilter === filter.id }]"
                @click="setActiveFilter(filter.id)"
              >
                <Icon :name="filter.icon" size="16" />
                {{ filter.label }}
                <span class="count" v-if="filter.count > 0">({{ filter.count }})</span>
              </button>
            </div>

            <div class="view-options">
              <button
                :class="['view-btn', { active: viewMode === 'grid' }]"
                @click="viewMode = 'grid'"
              >
                <Icon name="heroicons:viewfinder-circle" size="16" />
              </button>
              <button
                :class="['view-btn', { active: viewMode === 'list' }]"
                @click="viewMode = 'list'"
              >
                <Icon name="heroicons:list-bullet" size="16" />
              </button>
            </div>
          </div>

          <!-- Gallery Items -->
          <div v-if="filteredItems.length > 0" :class="['gallery-items', viewMode]">
            <div
              v-for="item in filteredItems"
              :key="item.id"
              :class="['gallery-item', item.type]"
              @click="openLightbox(item)"
            >
              <div class="item-thumbnail">
                <img
                  v-if="item.type === 'image'"
                  :src="item.url"
                  :alt="item.title"
                  loading="lazy"
                />
                <div v-else class="video-overlay">
                  <Icon name="heroicons:play" size="32" />
                  <img :src="item.thumbnail" :alt="item.title" />
                </div>
              </div>

              <div class="item-info">
                <h4 class="item-title">{{ item.title }}</h4>
                <p class="item-date">{{ formatDate(item.createdAt) }}</p>
                <div class="item-actions">
                  <button @click.stop="downloadItem(item)" class="action-btn">
                    <Icon name="heroicons:arrow-down-tray" size="16" />
                  </button>
                  <button @click.stop="deleteItem(item)" class="action-btn danger">
                    <Icon name="heroicons:trash" size="16" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Empty State -->
          <div v-else class="empty-gallery">
            <Icon name="heroicons:photo" size="64" />
            <h3>No hay archivos en la galería profesional</h3>
            <p>Sube las primeras fotos del estudio para comenzar</p>
            <button @click="$refs.fileInput.click()" class="btn btn-primary">
              Subir Archivos
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Lightbox Modal -->
  <div v-if="lightboxOpen" class="lightbox-overlay" @click="closeLightbox">
    <div class="lightbox-content" @click.stop>
      <button @click="closeLightbox" class="lightbox-close">
        <Icon name="heroicons:x-mark" size="24" />
      </button>

      <div v-if="currentItem" class="lightbox-media">
        <img
          v-if="currentItem.type === 'image'"
          :src="currentItem.url"
          :alt="currentItem.title"
        />
        <video
          v-else
          :src="currentItem.url"
          controls
          autoplay
        ></video>
      </div>

      <div class="lightbox-info">
        <h3>{{ currentItem?.title }}</h3>
        <p>{{ currentItem?.description }}</p>
        <div class="lightbox-meta">
          <span>Subido: {{ formatDate(currentItem?.createdAt) }}</span>
          <span>Tamaño: {{ formatFileSize(currentItem?.size) }}</span>
        </div>
      </div>
    </div>
  </div>

  <footer-element></footer-element>
  <palette-loader></palette-loader>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import NavbarElement from "@/components/navigation/NavbarElement.vue"
import FooterElement from "@/components/navigation/FooterElement.vue"
import PaletteLoader from "@/components/ui/PaletteLoader.vue"

definePageMeta({
  middleware: 'admin'
})

// Reactive data
const selectedFiles = ref([])
const galleryItems = ref([])
const isUploading = ref(false)
const uploadProgress = ref(0)
const activeFilter = ref('all')
const viewMode = ref('grid')
const lightboxOpen = ref(false)
const currentItem = ref(null)

const API_BASE = 'http://localhost:4000/api'

// Filters
const filters = computed(() => [
  {
    id: 'all',
    label: 'Todos',
    icon: 'heroicons:viewfinder-circle',
    count: galleryItems.value.length
  },
  {
    id: 'images',
    label: 'Fotos',
    icon: 'heroicons:photo',
    count: galleryItems.value.filter(item => item.type === 'image').length
  },
  {
    id: 'videos',
    label: 'Videos',
    icon: 'heroicons:video-camera',
    count: galleryItems.value.filter(item => item.type === 'video').length
  }
])

// Filtered items
const filteredItems = computed(() => {
  if (activeFilter.value === 'all') return galleryItems.value
  if (activeFilter.value === 'images') return galleryItems.value.filter(item => item.type === 'image')
  if (activeFilter.value === 'videos') return galleryItems.value.filter(item => item.type === 'video')
  return galleryItems.value
})

// File handling
const handleFileSelect = (event) => {
  const files = Array.from(event.target.files)
  processFiles(files)
}

const handleDrop = (event) => {
  const files = Array.from(event.dataTransfer.files)
  processFiles(files)
}

const processFiles = (files) => {
  const validFiles = files.filter(file => {
    const isValidType = file.type.startsWith('image/') || file.type.startsWith('video/')
    const isValidSize = file.size <= 10 * 1024 * 1024 // 10MB
    return isValidType && isValidSize
  })

  validFiles.forEach(file => {
    const reader = new FileReader()
    reader.onload = (e) => {
      selectedFiles.value.push({
        file,
        name: file.name,
        size: file.size,
        type: file.type,
        preview: e.target.result
      })
    }
    reader.readAsDataURL(file)
  })
}

const removeFile = (index) => {
  selectedFiles.value.splice(index, 1)
}

const clearSelection = () => {
  selectedFiles.value = []
}

const uploadFiles = async () => {
  if (selectedFiles.value.length === 0) return

  isUploading.value = true
  uploadProgress.value = 0

  try {
    const token = localStorage.getItem('token')
    const formData = new FormData()

    selectedFiles.value.forEach(item => {
      formData.append('files', item.file)
    })

    const response = await fetch(`${API_BASE}/gallery/upload`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData
    })

    if (response.ok) {
      const result = await response.json()
      galleryItems.value.unshift(...result.files)
      selectedFiles.value = []
      showToast('Archivos subidos exitosamente', 'success')
    } else {
      throw new Error('Error al subir archivos')
    }
  } catch (error) {
    console.error('Upload error:', error)
    showToast('Error al subir archivos', 'error')
  } finally {
    isUploading.value = false
    uploadProgress.value = 0
  }
}

// Gallery management
const setActiveFilter = (filterId) => {
  activeFilter.value = filterId
}

const openLightbox = (item) => {
  currentItem.value = item
  lightboxOpen.value = true
}

const closeLightbox = () => {
  lightboxOpen.value = false
  currentItem.value = null
}

const downloadItem = async (item) => {
  try {
    const response = await fetch(item.url)
    const blob = await response.blob()
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = item.title
    a.click()
    window.URL.revokeObjectURL(url)
  } catch (error) {
    console.error('Download error:', error)
    showToast('Error al descargar archivo', 'error')
  }
}

const deleteItem = async (item) => {
  if (!confirm('¿Estás seguro de que quieres eliminar este archivo?')) return

  try {
    const token = localStorage.getItem('token')
    const response = await fetch(`${API_BASE}/gallery/${item.id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })

    if (response.ok) {
      const index = galleryItems.value.findIndex(i => i.id === item.id)
      if (index > -1) {
        galleryItems.value.splice(index, 1)
      }
      showToast('Archivo eliminado exitosamente', 'success')
    } else {
      throw new Error('Error al eliminar archivo')
    }
  } catch (error) {
    console.error('Delete error:', error)
    showToast('Error al eliminar archivo', 'error')
  }
}

// Utility functions
const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

const formatDate = (dateString) => {
  return new Intl.DateTimeFormat('es-ES', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(new Date(dateString))
}

const showToast = (message, type = 'info') => {
  // Implement toast notification
  console.log(`${type}: ${message}`)
}

// Load gallery items on mount
onMounted(async () => {
  try {
    const token = localStorage.getItem('token')
    const response = await fetch(`${API_BASE}/gallery`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })

    if (response.ok) {
      const data = await response.json()
      galleryItems.value = data.files || []
    }
  } catch (error) {
    console.error('Error loading gallery:', error)
  }
})
</script>

<style scoped>
/* Layout */
.gallery-section {
  min-height: 100vh;
  background: linear-gradient(135deg, #FAF7F2 0%, #F5F1EB 100%);
  padding: 2rem 0;
}

.gallery-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
}

.gallery-header {
  text-align: center;
  margin-bottom: 3rem;
}

.brand-title {
  font-size: 3.5rem;
  font-weight: 900;
  color: #8B4513;
  margin: 0;
  letter-spacing: -0.02em;
  text-transform: uppercase;
  font-family: 'Playfair Display', serif;
}

.brand-subtitle {
  font-size: 1.2rem;
  color: #8B7355;
  margin: 0.5rem 0 0 0;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  font-weight: 500;
  font-family: 'Inter', sans-serif;
}

.page-header {
  text-align: center;
  margin-bottom: 3rem;
}

.page-header h2 {
  font-size: 2.5rem;
  color: #2F1B14;
  margin: 0 0 1rem 0;
  font-weight: 700;
  font-family: 'Playfair Display', serif;
}

.page-header p {
  font-size: 1.1rem;
  color: #8B7355;
  margin: 0;
  font-family: 'Inter', sans-serif;
}

/* Upload Section */
.upload-section {
  margin-bottom: 3rem;
}

.upload-card {
  background: #FFFFFF;
  border: 1px solid rgba(139, 69, 19, 0.1);
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(139, 69, 19, 0.08);
}

.upload-header {
  text-align: center;
  margin-bottom: 2rem;
}

.upload-header h3 {
  font-size: 1.5rem;
  color: #8B4513;
  margin: 1rem 0 0.5rem 0;
  font-family: 'Playfair Display', serif;
  font-weight: 700;
}

.upload-header p {
  color: #8B7355;
  margin: 0;
  font-family: 'Inter', sans-serif;
}

.upload-area {
  position: relative;
  border: 2px dashed rgba(139, 69, 19, 0.2);
  border-radius: 0.75rem;
  padding: 3rem 2rem;
  text-align: center;
  transition: all 0.2s ease;
  background: rgba(139, 69, 19, 0.02);
}

.upload-area:hover {
  border-color: #8B4513;
  background: rgba(139, 69, 19, 0.05);
}

.file-input {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
}

.upload-zone {
  cursor: pointer;
}

.upload-zone .upload-text {
  font-size: 1.125rem;
  font-weight: 600;
  color: #8B4513;
  margin: 1rem 0 0.5rem 0;
  font-family: 'Inter', sans-serif;
}

.upload-zone .upload-subtext {
  font-size: 0.875rem;
  color: #8B7355;
  margin: 0 0 1rem 0;
  font-family: 'Inter', sans-serif;
}

.upload-limits {
  font-size: 0.75rem;
  color: #8B7355;
  font-family: 'Inter', sans-serif;
  opacity: 0.8;
}

.upload-progress {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.progress-spinner {
  color: #8B4513;
}

.progress-bar {
  width: 200px;
  height: 6px;
  background: rgba(139, 69, 19, 0.1);
  border-radius: 3px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #8B4513 0%, #DAA520 100%);
  border-radius: 3px;
  transition: width 0.3s ease;
}

.progress-text {
  font-size: 0.875rem;
  color: #8B4513;
  font-weight: 600;
  font-family: 'Inter', sans-serif;
}

.upload-actions {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
}

/* Selected Files */
.selected-files {
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(139, 69, 19, 0.1);
}

.selected-files h4 {
  font-size: 1.125rem;
  color: #8B4513;
  margin: 0 0 1.5rem 0;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
}

.files-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
}

.file-preview {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: rgba(139, 69, 19, 0.02);
  border: 1px solid rgba(139, 69, 19, 0.08);
  border-radius: 0.5rem;
}

.file-thumbnail {
  width: 60px;
  height: 60px;
  border-radius: 0.375rem;
  overflow: hidden;
  flex-shrink: 0;
}

.file-thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.video-thumbnail {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #8B4513 0%, #DAA520 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #FFFFFF;
}

.file-info {
  flex: 1;
  min-width: 0;
}

.file-name {
  font-size: 0.875rem;
  font-weight: 600;
  color: #2F1B14;
  margin: 0 0 0.25rem 0;
  font-family: 'Inter', sans-serif;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.file-size {
  font-size: 0.75rem;
  color: #8B7355;
  margin: 0;
  font-family: 'Inter', sans-serif;
}

.remove-file {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(220, 38, 38, 0.1);
  border: 1px solid rgba(220, 38, 38, 0.2);
  color: #dc2626;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.remove-file:hover {
  background: #dc2626;
  color: #FFFFFF;
}

.selected-actions {
  display: flex;
  justify-content: center;
}

/* Gallery Grid */
.gallery-grid-section {
  background: #FFFFFF;
  border: 1px solid rgba(139, 69, 19, 0.1);
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(139, 69, 19, 0.08);
}

.gallery-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid rgba(139, 69, 19, 0.1);
}

.filter-tabs {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.filter-tab {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 2rem;
  background: rgba(139, 69, 19, 0.05);
  border: 1px solid rgba(139, 69, 19, 0.1);
  color: #8B7355;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.875rem;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
}

.filter-tab:hover {
  background: rgba(139, 69, 19, 0.1);
  border-color: #8B4513;
}

.filter-tab.active {
  background: linear-gradient(135deg, #8B4513 0%, #DAA520 100%);
  border-color: #8B4513;
  color: #FFFFFF;
}

.count {
  opacity: 0.8;
}

.view-options {
  display: flex;
  gap: 0.5rem;
}

.view-btn {
  width: 40px;
  height: 40px;
  border-radius: 0.5rem;
  background: rgba(139, 69, 19, 0.05);
  border: 1px solid rgba(139, 69, 19, 0.1);
  color: #8B7355;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.view-btn:hover {
  background: rgba(139, 69, 19, 0.1);
  border-color: #8B4513;
}

.view-btn.active {
  background: linear-gradient(135deg, #8B4513 0%, #DAA520 100%);
  border-color: #8B4513;
  color: #FFFFFF;
}

/* Gallery Items */
.gallery-items.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
}

.gallery-items.list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.gallery-item {
  background: #FFFFFF;
  border: 1px solid rgba(139, 69, 19, 0.08);
  border-radius: 0.75rem;
  overflow: hidden;
  transition: all 0.2s ease;
  cursor: pointer;
}

.gallery-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(139, 69, 19, 0.15);
  border-color: rgba(139, 69, 19, 0.2);
}

.item-thumbnail {
  position: relative;
  width: 100%;
  height: 200px;
  overflow: hidden;
}

.item-thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.2s ease;
}

.gallery-item:hover .item-thumbnail img {
  transform: scale(1.05);
}

.video-overlay {
  position: relative;
  width: 100%;
  height: 100%;
}

.video-overlay::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, rgba(0,0,0,0.3) 0%, transparent 50%);
  z-index: 1;
}

.video-overlay .play {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #8B4513;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.item-info {
  padding: 1.5rem;
}

.item-title {
  font-size: 1rem;
  font-weight: 600;
  color: #2F1B14;
  margin: 0 0 0.5rem 0;
  font-family: 'Inter', sans-serif;
}

.item-date {
  font-size: 0.875rem;
  color: #8B7355;
  margin: 0 0 1rem 0;
  font-family: 'Inter', sans-serif;
}

.item-actions {
  display: flex;
  gap: 0.5rem;
}

/* Empty State */
.empty-gallery {
  text-align: center;
  padding: 4rem 2rem;
}

.empty-gallery svg {
  color: rgba(139, 69, 19, 0.3);
  margin-bottom: 2rem;
}

.empty-gallery h3 {
  font-size: 1.5rem;
  color: #8B4513;
  margin: 0 0 1rem 0;
  font-family: 'Playfair Display', serif;
  font-weight: 600;
}

.empty-gallery p {
  color: #8B7355;
  margin: 0 0 2rem 0;
  font-family: 'Inter', sans-serif;
}

/* Lightbox */
.lightbox-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 2rem;
}

.lightbox-content {
  max-width: 90vw;
  max-height: 90vh;
  background: #FFFFFF;
  border-radius: 1rem;
  overflow: hidden;
  position: relative;
}

.lightbox-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.7);
  border: none;
  color: #FFFFFF;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  transition: all 0.2s ease;
}

.lightbox-close:hover {
  background: rgba(0, 0, 0, 0.9);
  transform: scale(1.1);
}

.lightbox-media {
  max-height: 70vh;
  overflow: hidden;
}

.lightbox-media img,
.lightbox-media video {
  width: 100%;
  height: auto;
  max-height: 70vh;
  object-fit: contain;
}

.lightbox-info {
  padding: 2rem;
}

.lightbox-info h3 {
  font-size: 1.5rem;
  color: #2F1B14;
  margin: 0 0 1rem 0;
  font-family: 'Playfair Display', serif;
  font-weight: 600;
}

.lightbox-info p {
  color: #8B7355;
  margin: 0 0 1.5rem 0;
  font-family: 'Inter', sans-serif;
  line-height: 1.6;
}

.lightbox-meta {
  display: flex;
  gap: 2rem;
  font-size: 0.875rem;
  color: #8B7355;
  font-family: 'Inter', sans-serif;
}

/* Buttons */
.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 600;
  font-family: 'Inter', sans-serif;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid transparent;
  text-decoration: none;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-primary {
  background: linear-gradient(135deg, #8B4513 0%, #DAA520 100%);
  color: #FFFFFF;
  border-color: #8B4513;
}

.btn-primary:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(139, 69, 19, 0.3);
}

.btn-secondary {
  background: #F3F4F6;
  color: #6B7280;
  border-color: #D1D5DB;
}

.btn-secondary:hover:not(:disabled) {
  background: #E5E7EB;
  border-color: #9CA3AF;
}

.btn-accent {
  background: linear-gradient(135deg, #8B4513 0%, #DAA520 100%);
  color: #FFFFFF;
  border-color: #8B4513;
}

.btn-accent:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(139, 69, 19, 0.3);
}

.action-btn {
  width: 32px;
  height: 32px;
  border-radius: 0.375rem;
  background: rgba(139, 69, 19, 0.05);
  border: 1px solid rgba(139, 69, 19, 0.1);
  color: #8B7355;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.action-btn:hover {
  background: rgba(139, 69, 19, 0.1);
  border-color: #8B4513;
  color: #8B4513;
}

.action-btn.danger:hover {
  background: rgba(220, 38, 38, 0.1);
  border-color: #dc2626;
  color: #dc2626;
}

/* Animations */
.spinning {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* Responsive */
@media (max-width: 768px) {
  .gallery-container {
    padding: 0 1rem;
  }

  .brand-title {
    font-size: 2.5rem;
  }

  .page-header h2 {
    font-size: 2rem;
  }

  .upload-card {
    padding: 1.5rem;
  }

  .upload-area {
    padding: 2rem 1rem;
  }

  .files-grid {
    grid-template-columns: 1fr;
  }

  .gallery-controls {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }

  .filter-tabs {
    justify-content: center;
  }

  .view-options {
    justify-content: center;
  }

  .gallery-items.grid {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1rem;
  }

  .lightbox-content {
    max-width: 95vw;
    max-height: 95vh;
  }

  .lightbox-info {
    padding: 1.5rem;
  }

  .lightbox-meta {
    flex-direction: column;
    gap: 0.5rem;
  }
}

@media (max-width: 480px) {
  .gallery-items.grid {
    grid-template-columns: 1fr;
  }

  .filter-tabs {
    flex-direction: column;
    align-items: center;
  }

  .upload-actions,
  .selected-actions {
    flex-direction: column;
  }

  .btn {
    width: 100%;
    justify-content: center;
  }
}
</style>
