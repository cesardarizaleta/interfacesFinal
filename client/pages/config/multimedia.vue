<template>
  <div class="relative min-h-screen flex flex-col p-6 sm:p-8 md:p-12 lg:p-16 xl:p-20 bg-gradient-to-br from-stone-50 to-stone-200 text-stone-800 font-sans overflow-y-auto">
    <div class="absolute inset-0 overflow-hidden opacity-10">
      <img
        src="@/assets/image.jpg"
        alt="Photographer at work"
        class="w-full h-full object-cover object-center scale-110 blur-sm"
      />
    </div>

    <div class="relative z-10 w-full max-w-7xl mx-auto">
      <!-- Back Button -->
      <div class="absolute left-0 top-0 z-20">
        <NuxtLink
          to="/config"
          class="group relative inline-flex items-center gap-3 bg-gradient-to-r from-stone-800 to-stone-900 text-white font-semibold py-4 px-6 rounded-2xl shadow-2xl hover:shadow-stone-500/25 transition-all duration-300 transform hover:scale-105 overflow-hidden"
          aria-label="Volver a Configuración"
        >
          <!-- Background gradient effect -->
          <div class="absolute inset-0 bg-gradient-to-r from-stone-700 to-stone-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

          <!-- Animated background shine -->
          <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>

          <!-- Icon with rotation effect -->
          <svg
            class="relative w-5 h-5 transform group-hover:-translate-x-1 transition-transform duration-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>

          <!-- Text -->
          <span class="relative text-sm tracking-wide">VOLVER</span>

          <!-- Decorative elements -->
          <div class="absolute -top-1 -right-1 w-2 h-2 bg-amber-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
        </NuxtLink>
      </div>

      <div class="text-center mb-12 sm:mb-16">
        <h1 class="text-4xl sm:text-5xl md:text-6xl font-extrabold uppercase tracking-tight text-stone-900 mb-4">
          Gestión de Multimedia
        </h1>
        <p class="text-xl sm:text-2xl font-light uppercase tracking-wide text-stone-600 max-w-2xl mx-auto">
          Administra tus archivos multimedia
        </p>
      </div>

      <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
        {{ error }}
      </div>
      <div v-if="success" class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
        {{ success }}
      </div>

      <div class="mb-8 border-b border-stone-200 bg-white/50 backdrop-blur-sm rounded-t-xl p-4">
        <nav class="-mb-px flex space-x-12 justify-center" aria-label="Tabs">
          <button
            @click="activeTab = 'videos'"
            :class="[
              'whitespace-nowrap py-3 px-6 border-b-3 font-bold text-lg rounded-t-lg transition-all duration-300 transform',
              activeTab === 'videos'
                ? 'border-stone-700 text-stone-900 bg-white shadow-lg scale-105'
                : 'border-transparent text-stone-500 hover:text-stone-700 hover:border-stone-300 hover:bg-white/70 hover:scale-102'
            ]"
          >
            🎬 Videos
          </button>
          <button
            @click="activeTab = 'images'"
            :class="[
              'whitespace-nowrap py-3 px-6 border-b-3 font-bold text-lg rounded-t-lg transition-all duration-300 transform',
              activeTab === 'images'
                ? 'border-stone-700 text-stone-900 bg-white shadow-lg scale-105'
                : 'border-transparent text-stone-500 hover:text-stone-700 hover:border-stone-300 hover:bg-white/70 hover:scale-102'
            ]"
          >
            🖼️ Imágenes
          </button>
        </nav>
      </div>

      <div v-if="activeTab === 'videos'">
        <div class="flex justify-center mb-12">
          <button
            @click="showVideoUploader = true"
            class="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-5 px-10 rounded-2xl shadow-2xl hover:shadow-blue-500/25 hover:scale-105 transition-all duration-300 overflow-hidden group text-lg"
          >
            <span class="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            <span class="relative flex items-center gap-4">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
              Subir Nuevo Vídeo
            </span>
          </button>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 mb-12">
          <div
            v-for="video in videos"
            :key="video.id"
            class="bg-white shadow-xl rounded-2xl overflow-hidden border border-stone-200 transition-all duration-300 hover:scale-105 hover:shadow-2xl group cursor-pointer"
            @click="openVideoModal(video)"
          >
            <div class="relative">
              <img
                :src="video.thumbnail"
                :alt="video.name"
                class="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <video
                :src="video.url"
                class="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-110"
                muted
                preload="metadata"
                style="display: none;"
                @loadeddata="onVideoLoaded($event, video.id)"
              ></video>
              <!-- Play button overlay -->
              <div class="absolute inset-0 bg-stone-900 bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div class="bg-white/90 backdrop-blur-sm rounded-full p-5 shadow-xl">
                  <svg class="w-10 h-10 text-stone-800" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
              </div>
              <!-- Video indicator -->
              <div class="absolute top-3 right-3 bg-stone-900/80 text-white text-xs px-3 py-2 rounded-full backdrop-blur-sm font-semibold flex items-center gap-2">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
                Video
              </div>
              <div class="absolute top-3 right-3 bg-stone-900/80 text-white text-xs px-3 py-2 rounded-full backdrop-blur-sm font-semibold flex items-center gap-2">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
                Video
              </div>
              <!-- Edit button -->
              <button
                @click.stop="openVideoEditor(video)"
                class="absolute bottom-3 right-3 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full shadow-lg transition-colors"
                title="Editar video"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                </svg>
              </button>
            </div>
            <div class="p-6">
              <h3 class="font-bold text-stone-800 truncate text-lg mb-3">{{ video.name }}</h3>
              <div class="text-sm text-stone-600 space-y-2">
                <p><span class="font-semibold text-stone-700">{{ video.dimensions || "N/A" }}</span></p>
                <p><span class="font-semibold text-stone-700">{{ video.size || "N/A" }}</span> • <span class="font-semibold text-stone-700">{{ video.format || "N/A" }}</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="activeTab === 'images'">
        <div class="flex justify-center mb-12">
          <button
            @click="openCropperModal"
            class="relative bg-gradient-to-r from-green-600 to-teal-600 text-white font-bold py-5 px-10 rounded-2xl shadow-2xl hover:shadow-green-500/25 hover:scale-105 transition-all duration-300 overflow-hidden group text-lg"
          >
            <span class="absolute inset-0 bg-gradient-to-r from-green-400 to-teal-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            <span class="relative flex items-center gap-4">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
              Subir y Recortar Nueva Imagen
            </span>
          </button>
        </div>

        <div class="bg-white/70 backdrop-blur-sm rounded-2xl p-8 mb-8">
          <h2 class="text-3xl font-bold text-stone-800 mb-2 text-center">🖼️ Galería de Imágenes</h2>
          <p class="text-stone-600 text-center text-lg">Todas tus imágenes organizadas y listas para usar</p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 mb-12">
          <div
            v-for="image in images"
            :key="image.id"
            class="bg-white shadow-xl rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl border border-stone-200 group cursor-pointer"
            @click="openImageModal(image)"
          >
            <div class="relative">
              <img
                class="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-110"
                :src="image.url"
                :alt="image.name"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-stone-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                <div class="bg-white/90 backdrop-blur-sm rounded-full px-6 py-3 shadow-xl">
                  <span class="text-stone-800 font-bold flex items-center gap-3 text-lg">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                    </svg>
                    Ver Imagen
                  </span>
                </div>
              </div>
            </div>
            <div class="p-6">
              <h3 class="font-bold text-stone-800 truncate text-lg mb-3">{{ image.name }}</h3>
              <div class="text-sm text-stone-600 space-y-2">
                <p><span class="font-semibold text-stone-700">{{ image.dimensions }}</span></p>
                <p><span class="font-semibold text-stone-700">{{ image.size }}</span> • <span class="font-semibold text-stone-700">{{ image.format }}</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        v-if="showVideoModal && selectedVideo"
        class="fixed inset-0 bg-stone-900 bg-opacity-95 flex items-center justify-center z-50 p-6 cursor-pointer overflow-y-auto"
        @click="closeAllModals"
      >
        <div
          class="bg-white rounded-3xl overflow-hidden shadow-2xl max-w-6xl w-full transform transition-all duration-300 scale-100 hover:scale-105 max-h-[95vh] flex flex-col"
          @click.stop
        >
          <div class="flex justify-between items-center p-8 border-b border-stone-200 bg-gradient-to-r from-stone-50 to-stone-100">
            <div>
              <h3 class="text-3xl font-bold text-stone-800 mb-2">{{ selectedVideo.name }}</h3>
              <p class="text-stone-600 text-lg">Reproduciendo vídeo</p>
            </div>
            <button
              @click="closeAllModals"
              class="text-stone-400 hover:text-stone-600 hover:bg-stone-200 rounded-full p-3 transition-all duration-200 text-2xl font-bold shadow-lg"
            >
              ✕
            </button>
          </div>
          <div class="p-8 flex-1 overflow-y-auto">
            <video
              ref="videoPlayer"
              :src="selectedVideo.url"
              class="w-full rounded-2xl shadow-2xl mb-6"
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
              <p class="text-stone-500 text-center py-8">Tu navegador no soporta el tag de vídeo.</p>
            </video>
            <div class="bg-stone-50 rounded-2xl p-6">
              <h4 class="text-xl font-bold text-stone-800 mb-4">📊 Información del Vídeo</h4>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-6 text-stone-700">
                <div class="text-center">
                  <div class="text-2xl font-bold text-stone-800 mb-2">{{ selectedVideo.dimensions }}</div>
                  <div class="text-sm text-stone-600">Dimensiones</div>
                </div>
                <div class="text-center">
                  <div class="text-2xl font-bold text-stone-800 mb-2">{{ selectedVideo.size }}</div>
                  <div class="text-sm text-stone-600">Tamaño</div>
                </div>
                <div class="text-center">
                  <div class="text-2xl font-bold text-stone-800 mb-2">{{ selectedVideo.format }}</div>
                  <div class="text-sm text-stone-600">Formato</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        v-if="showImageModal && selectedImage"
        class="fixed inset-0 bg-stone-900 bg-opacity-95 flex items-center justify-center z-50 p-6 cursor-pointer overflow-y-auto"
        @click="closeAllModals"
      >
        <div
          class="bg-white rounded-3xl overflow-hidden shadow-2xl w-full max-w-5xl max-h-[95vh] transform transition-all duration-300 scale-100 hover:scale-105 flex flex-col"
          @click.stop
        >
          <div class="flex justify-between items-center p-8 border-b border-stone-200 bg-gradient-to-r from-stone-50 to-stone-100">
            <div>
              <h3 class="text-3xl font-bold text-stone-800 mb-2">{{ selectedImage.name }}</h3>
              <p class="text-stone-600 text-lg">Vista completa de la imagen</p>
            </div>
            <button
              @click="closeAllModals"
              class="text-stone-400 hover:text-stone-600 hover:bg-stone-200 rounded-full p-3 transition-all duration-200 text-2xl font-bold shadow-lg"
              title="Cerrar"
            >
              ✕
            </button>
          </div>
          <div class="p-8 flex-1 overflow-y-auto">
            <img
              :src="selectedImage.url"
              :alt="selectedImage.name"
              class="w-full rounded-2xl shadow-2xl mb-6 max-h-[60vh] object-contain"
            />
            <div class="bg-stone-50 rounded-2xl p-6">
              <h4 class="text-xl font-bold text-stone-800 mb-4">📊 Información de la Imagen</h4>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-6 text-stone-700">
                <div class="text-center">
                  <div class="text-2xl font-bold text-stone-800 mb-2">{{ selectedImage.dimensions }}</div>
                  <div class="text-sm text-stone-600">Dimensiones</div>
                </div>
                <div class="text-center">
                  <div class="text-2xl font-bold text-stone-800 mb-2">{{ selectedImage.size }}</div>
                  <div class="text-sm text-stone-600">Tamaño</div>
                </div>
                <div class="text-center">
                  <div class="text-2xl font-bold text-stone-800 mb-2">{{ selectedImage.format }}</div>
                  <div class="text-sm text-stone-600">Formato</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Video Uploader Modal -->
      <div
        v-if="showVideoUploader"
        class="fixed inset-0 bg-stone-900 bg-opacity-95 flex items-center justify-center z-50 p-6 overflow-y-auto"
      >
        <div class="bg-white rounded-3xl overflow-hidden shadow-2xl w-full max-w-4xl max-h-[95vh] flex flex-col">
          <div class="flex justify-between items-center p-8 border-b border-stone-200 bg-gradient-to-r from-stone-50 to-stone-100">
            <div>
              <h3 class="text-3xl font-bold text-stone-800 mb-2">🎬 Subir Nuevo Vídeo</h3>
              <p class="text-stone-600 text-lg">Selecciona y sube tu vídeo</p>
            </div>
            <button
              @click="closeAllModals"
              class="text-stone-400 hover:text-stone-600 hover:bg-stone-200 rounded-full p-3 transition-all duration-200 text-2xl font-bold shadow-lg"
            >
              ✕
            </button>
          </div>

          <div class="p-8 flex-1 flex flex-col overflow-y-auto">
            <div class="mb-8">
              <label class="block text-lg font-semibold text-stone-800 mb-3">Seleccionar Vídeo</label>
              <input
                ref="videoInput"
                type="file"
                accept="video/*"
                @change="handleVideoSelect"
                class="w-full p-4 border-2 border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-stone-500 focus:border-stone-500 transition-all duration-200 text-lg"
              />
            </div>

            <div class="mb-8">
              <label class="block text-lg font-semibold text-stone-800 mb-3">Nombre del Vídeo</label>
              <input
                v-model="videoName"
                type="text"
                placeholder="Ej: Mi vídeo increíble"
                class="w-full px-4 py-3 border-2 border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-stone-500 focus:border-stone-500 transition-all duration-200 text-lg"
              />
            </div>

            <div v-if="selectedVideoFile" class="bg-stone-50 rounded-2xl p-6 mb-6">
              <h4 class="text-xl font-bold text-stone-800 mb-4">📊 Información del Vídeo</h4>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-6 text-stone-700">
                <div class="text-center">
                  <div class="text-2xl font-bold text-stone-800 mb-2">{{ videoDimensions || 'Cargando...' }}</div>
                  <div class="text-sm text-stone-600">Dimensiones</div>
                </div>
                <div class="text-center">
                  <div class="text-2xl font-bold text-stone-800 mb-2">{{ videoFileSize }}</div>
                  <div class="text-sm text-stone-600">Tamaño</div>
                </div>
                <div class="text-center">
                  <div class="text-2xl font-bold text-stone-800 mb-2">{{ videoFileType }}</div>
                  <div class="text-sm text-stone-600">Formato</div>
                </div>
                <div class="text-center">
                  <div class="text-2xl font-bold text-stone-800 mb-2">{{ videoDuration || 'Cargando...' }}</div>
                  <div class="text-sm text-stone-600">Duración</div>
                </div>
              </div>
            </div>

            <div class="bg-stone-50 rounded-2xl p-6 mb-6">
              <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                <div class="flex-1">
                  <h4 class="text-lg font-semibold text-stone-800 mb-3">Vista Previa</h4>
                  <div v-if="videoThumbnail" class="bg-stone-200 rounded-xl overflow-hidden">
                    <img
                      :src="videoThumbnail"
                      :alt="videoName || 'Vista previa del video'"
                      class="w-full max-h-64 object-contain"
                    />
                    <div class="absolute top-3 right-3 bg-stone-900/80 text-white text-xs px-3 py-2 rounded-full backdrop-blur-sm font-semibold flex items-center gap-2">
                      <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                      Thumbnail
                    </div>
                  </div>
                  <div v-else-if="videoPreview" class="bg-stone-200 rounded-xl overflow-hidden relative">
                    <video
                      :src="videoPreview"
                      class="w-full max-h-64 object-contain"
                      controls
                      muted
                      preload="metadata"
                    ></video>
                    <div class="absolute top-3 right-3 bg-stone-900/80 text-white text-xs px-3 py-2 rounded-full backdrop-blur-sm font-semibold">
                      Generando thumbnail...
                    </div>
                  </div>
                  <div v-else class="bg-stone-200 rounded-xl p-8 text-center text-stone-500">
                    <svg class="w-16 h-16 mx-auto mb-4 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                    </svg>
                    <p class="text-lg">Selecciona un vídeo para ver la vista previa</p>
                  </div>
                </div>
              </div>
            </div>

            <div class="bg-stone-50 rounded-2xl p-6 mb-6">
              <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                <div class="flex-1">
                  <label class="block text-lg font-semibold text-stone-800 mb-3">Nombre del Vídeo</label>
                  <input
                    v-model="videoName"
                    type="text"
                    placeholder="Ej: Mi vídeo increíble"
                    class="w-full px-4 py-3 border-2 border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-stone-500 focus:border-stone-500 transition-all duration-200 text-lg"
                  />
                </div>
                <div class="flex gap-4">
                  <button
                    @click="closeAllModals"
                    class="px-8 py-3 bg-stone-200 text-stone-800 rounded-xl hover:bg-stone-300 transition-colors font-semibold text-lg shadow-lg"
                  >
                    Cancelar
                  </button>
                  <button
                    @click="uploadVideo"
                    :disabled="!selectedVideoFile || !videoName.trim()"
                    :class="[
                      'px-8 py-3 rounded-xl transition-all duration-200 font-bold text-lg shadow-lg transform',
                      (!selectedVideoFile || !videoName.trim())
                        ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                        : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 hover:scale-105'
                    ]"
                  >
                    🎬 Subir Vídeo
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        v-if="showImageCropper"
        class="fixed inset-0 bg-stone-900 bg-opacity-95 flex items-center justify-center z-50 p-6 overflow-y-auto"
      >
        <div class="bg-white rounded-3xl overflow-hidden shadow-2xl w-full max-w-6xl max-h-[95vh] flex flex-col">
          <div class="flex justify-between items-center p-8 border-b border-stone-200 bg-gradient-to-r from-stone-50 to-stone-100">
            <div>
              <h3 class="text-3xl font-bold text-stone-800 mb-2">✂️ Recortar Imagen</h3>
              <p class="text-stone-600 text-lg">Ajusta el área de recorte y guarda tu imagen</p>
            </div>
            <button
              @click="closeCropperModal"
              class="text-stone-400 hover:text-stone-600 hover:bg-stone-200 rounded-full p-3 transition-all duration-200 text-2xl font-bold shadow-lg"
              title="Cerrar"
            >
              ✕
            </button>
          </div>

          <div class="p-8 flex-1 flex flex-col overflow-y-auto">
            <div class="mb-8">
              <label class="block text-lg font-semibold text-stone-800 mb-3">Seleccionar Imagen</label>
              <input
                ref="fileInput"
                type="file"
                accept="image/*"
                @change="handleFileSelect"
                class="w-full p-4 border-2 border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-stone-500 focus:border-stone-500 transition-all duration-200 text-lg"
              />
            </div>

            <div
              class="drop-zone flex-1 flex items-center justify-center min-h-[400px] bg-stone-50 rounded-2xl border-2 border-dashed border-stone-300 relative mb-8 overflow-hidden cursor-pointer transition-all duration-200"
              @click="triggerFileInput"
              @dragover="handleDragOver"
              @dragleave="handleDragLeave"
              @drop="handleDrop"
            >
              <img
                ref="imagePreview"
                :src="previewImage"
                :style="{ display: previewImage ? 'block' : 'none', maxWidth: '100%', maxHeight: '100%' }"
                class="rounded-xl shadow-lg"
              />
              <div v-if="!previewImage" class="text-center text-stone-500">
                <svg class="w-20 h-20 mx-auto mb-6 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
                <p class="text-xl font-semibold">Selecciona una imagen para recortar</p>
                <p class="text-stone-400 mt-2">Arrastra y suelta o haz clic para seleccionar</p>
                <div class="mt-4 px-4 py-2 bg-stone-200 text-stone-600 rounded-lg text-sm font-medium">
                  📁 Haz clic aquí para abrir el explorador de archivos
                </div>
              </div>
              <div v-else class="absolute bottom-4 left-4 right-4 text-center">
                <div class="px-4 py-2 bg-black/70 text-white rounded-lg text-sm font-medium backdrop-blur-sm">
                  ✂️ Arrastra las esquinas para recortar • Usa la rueda para zoom
                </div>
              </div>

              <div v-if="previewImage" class="absolute top-4 right-4 bg-black/80 text-white text-sm px-4 py-2 rounded-xl font-mono backdrop-blur-sm shadow-lg">
                <div class="font-bold mb-2">Estado del Cropper:</div>
                <div>🟢 Activo: {{ cropper ? 'Sí' : 'No' }}</div>
                <div v-if="cropper">📊 Datos: {{ typeof cropper.getData }}</div>
                <div>🖼️ Vista previa: {{ previewImage ? 'Lista' : 'Pendiente' }}</div>
              </div>
            </div>

            <div class="bg-stone-50 rounded-2xl p-6 mb-6">
              <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                <div class="flex-1">
                  <label class="block text-lg font-semibold text-stone-800 mb-3">Nombre de la Imagen</label>
                  <input
                    v-model="imageName"
                    type="text"
                    placeholder="Ej: Mi hermosa foto recortada"
                    class="w-full px-4 py-3 border-2 border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-stone-500 focus:border-stone-500 transition-all duration-200 text-lg"
                  />
                </div>
                <div class="flex gap-4">
                  <button
                    @click="closeCropperModal"
                    class="px-8 py-3 bg-stone-200 text-stone-800 rounded-xl hover:bg-stone-300 transition-colors font-semibold text-lg shadow-lg"
                  >
                    Cancelar
                  </button>
                  <button
                    @click="cropAndSaveImage"
                    :disabled="!previewImage || !imageName.trim()"
                    :class="[
                      'px-8 py-3 rounded-xl transition-all duration-200 font-bold text-lg shadow-lg transform',
                      (!previewImage || !imageName.trim())
                        ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                        : 'bg-gradient-to-r from-stone-700 to-stone-800 text-white hover:from-stone-800 hover:to-stone-900 hover:scale-105'
                    ]"
                  >
                    ✨ Recortar y Guardar
                  </button>
                </div>
              </div>
            </div>

            <div v-if="previewImage" class="bg-blue-50 border border-blue-200 rounded-2xl p-6">
              <div class="flex items-center gap-3 mb-3">
                <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <h4 class="text-lg font-semibold text-blue-800">Instrucciones</h4>
              </div>
              <ul class="text-blue-700 space-y-2 text-sm">
                <li>• Arrastra las esquinas para ajustar el área de recorte</li>
                <li>• Usa la rueda del mouse para hacer zoom</li>
                <li>• Mantén presionado para mover la imagen</li>
                <li>• El área seleccionada será la imagen final</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- Video Editor Modal -->
      <div
        v-if="showVideoEditor"
        class="fixed inset-0 bg-stone-900 bg-opacity-95 flex items-center justify-center z-50 p-6 overflow-y-auto"
      >
        <div class="bg-white rounded-3xl overflow-hidden shadow-2xl w-full max-w-6xl max-h-[95vh] flex flex-col">
          <div class="flex justify-between items-center p-8 border-b border-stone-200 bg-gradient-to-r from-stone-50 to-stone-100">
            <div>
              <h3 class="text-3xl font-bold text-stone-800 mb-2">🎬 Editar Vídeo</h3>
              <p class="text-stone-600 text-lg">Añade subtítulos y audio a tu vídeo</p>
            </div>
            <button
              @click="closeVideoEditor"
              class="text-stone-400 hover:text-stone-600 hover:bg-stone-200 rounded-full p-3 transition-all duration-200 text-2xl font-bold shadow-lg"
            >
              ✕
            </button>
          </div>

          <div class="p-8 flex-1 flex flex-col overflow-y-auto">
            <!-- Video Preview -->
            <div class="mb-8">
              <h4 class="text-xl font-bold text-stone-800 mb-4">Vista Previa del Vídeo</h4>
              <div class="bg-stone-100 rounded-2xl p-6">
                <video
                  ref="editorVideoPlayer"
                  :src="editingVideo?.url"
                  class="w-full rounded-xl shadow-lg"
                  controls
                  muted
                  preload="metadata"
                  crossorigin="anonymous"
                >
                  <!-- Dynamic subtitle tracks -->
                  <track
                    v-for="(subtitle, index) in currentSubtitles"
                    :key="`subtitle-${index}`"
                    kind="subtitles"
                    :src="subtitle.blobUrl"
                    :srclang="subtitle.lang"
                    :label="getLanguageLabel(subtitle.lang)"
                    :default="subtitle.lang === 'es'"
                  />
                </video>

                <!-- Subtitle Controls -->
                <div v-if="currentSubtitles.length > 0" class="mt-4 flex items-center gap-4">
                  <span class="text-sm font-medium text-stone-700">Subtítulos:</span>
                  <select
                    v-model="selectedSubtitleTrack"
                    @change="updateSubtitleTrack"
                    class="px-3 py-1 text-sm border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-stone-500"
                  >
                    <option value="-1">Desactivados</option>
                    <option
                      v-for="(subtitle, index) in currentSubtitles"
                      :key="`option-${index}`"
                      :value="index"
                    >
                      {{ getLanguageLabel(subtitle.lang) }}
                    </option>
                  </select>
                  <span class="text-xs text-stone-500">
                    {{ currentSubtitles.length }} subtítulo(s) disponible(s)
                  </span>
                </div>
              </div>
            </div>

            <!-- Subtitles Section -->
            <div class="mb-8">
              <h4 class="text-xl font-bold text-stone-800 mb-4">📝 Subtítulos</h4>
              <div class="bg-stone-50 rounded-2xl p-6">
                <div class="mb-4">
                  <button
                    @click="addSubtitle"
                    class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                    </svg>
                    Añadir Subtítulo
                  </button>
                </div>

                <div class="space-y-4">
                  <div
                    v-for="(subtitle, index) in videoSubtitles"
                    :key="index"
                    class="bg-white rounded-lg p-4 border border-stone-200"
                  >
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label class="block text-sm font-medium text-stone-700 mb-1">Texto del Subtítulo</label>
                        <input
                          v-model="subtitle.text"
                          type="text"
                          class="w-full px-3 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-stone-500"
                          placeholder="Texto del subtítulo"
                        />
                      </div>
                      <div>
                        <label class="block text-sm font-medium text-stone-700 mb-1">Idioma</label>
                        <select
                          v-model="subtitle.lang"
                          class="w-full px-3 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-stone-500"
                        >
                          <option value="es">Español</option>
                          <option value="en">Inglés</option>
                          <option value="fr">Francés</option>
                          <option value="de">Alemán</option>
                          <option value="it">Italiano</option>
                        </select>
                      </div>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <label class="block text-sm font-medium text-stone-700 mb-1">Inicio (segundos)</label>
                        <input
                          v-model.number="subtitle.start"
                          type="number"
                          step="0.1"
                          min="0"
                          class="w-full px-3 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-stone-500"
                        />
                      </div>
                      <div>
                        <label class="block text-sm font-medium text-stone-700 mb-1">Fin (segundos)</label>
                        <input
                          v-model.number="subtitle.end"
                          type="number"
                          step="0.1"
                          min="0"
                          class="w-full px-3 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-stone-500"
                        />
                      </div>
                      <div>
                        <label class="block text-sm font-medium text-stone-700 mb-1">Fuente</label>
                        <select
                          v-model="subtitle.fontFamily"
                          class="w-full px-3 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-stone-500"
                        >
                          <option :value="assignedFonts?.active?.fontFamily || 'Arial'">Fuente Activa ({{ assignedFonts?.active?.name || 'Predeterminada' }})</option>
                          <option value="Arial">Arial</option>
                          <option value="Helvetica">Helvetica</option>
                          <option value="Times New Roman">Times New Roman</option>
                          <option value="Courier New">Courier New</option>
                          <option value="Georgia">Georgia</option>
                        </select>
                      </div>
                    </div>

                    <div class="flex justify-between items-center">
                      <div class="text-sm text-stone-600">
                        Vista previa: <span :style="{ fontFamily: subtitle.fontFamily }" class="font-semibold">{{ subtitle.text || 'Texto del subtítulo' }}</span>
                      </div>
                      <button
                        @click="removeSubtitle(index)"
                        class="text-red-600 hover:text-red-700 text-sm font-medium"
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Audio Section -->
            <div class="mb-8">
              <h4 class="text-xl font-bold text-stone-800 mb-4">🎵 Audio</h4>
              <div class="bg-stone-50 rounded-2xl p-6">
                <div class="mb-4">
                  <label class="block text-lg font-semibold text-stone-800 mb-3">Seleccionar Audio</label>
                  <input
                    ref="audioInput"
                    type="file"
                    accept="audio/*"
                    @change="handleAudioSelect"
                    class="w-full p-4 border-2 border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-stone-500 focus:border-stone-500 transition-all duration-200 text-lg"
                  />
                </div>

                <div v-if="selectedAudioFile" class="bg-white rounded-lg p-4 border border-stone-200">
                  <div class="flex items-center justify-between mb-4">
                    <div>
                      <h5 class="font-semibold text-stone-800">{{ selectedAudioFile.name }}</h5>
                      <p class="text-sm text-stone-600">{{ (selectedAudioFile.size / 1024 / 1024).toFixed(2) }} MB</p>
                    </div>
                    <button
                      @click="removeAudio"
                      class="text-red-600 hover:text-red-700 text-sm font-medium"
                    >
                      Eliminar
                    </button>
                  </div>

                  <audio
                    ref="audioPreview"
                    :src="audioPreviewUrl"
                    controls
                    class="w-full"
                  ></audio>
                </div>

                <div v-else class="text-center text-stone-500 py-8">
                  <svg class="w-16 h-16 mx-auto mb-4 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"/>
                  </svg>
                  <p class="text-lg">Selecciona un archivo de audio para añadir al vídeo</p>
                  <p class="text-sm text-stone-400 mt-2">Nota: El audio se guardará pero no se previsualizará en el editor</p>
                </div>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="flex justify-end gap-4">
              <button
                @click="closeVideoEditor"
                class="px-8 py-3 bg-stone-200 text-stone-800 rounded-xl hover:bg-stone-300 transition-colors font-semibold text-lg shadow-lg"
              >
                Cancelar
              </button>
              <button
                @click="saveVideoEdits"
                :disabled="isSavingVideo"
                class="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-bold text-lg shadow-lg transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg v-if="isSavingVideo" class="w-5 h-5 animate-spin mr-2" fill="none" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" class="opacity-25"></circle>
                  <path fill="currentColor" class="opacity-75" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {{ isSavingVideo ? 'Guardando...' : 'Guardar Cambios' }}
              </button>
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
import { useFonts } from '~/composables/useFonts'
import weddingImg from '~/assets/carousel/wedding.webp'
import portraitImg from '~/assets/carousel/horses.webp'
import landscapeImg from '~/assets/carousel/landscape.webp'
import eventsImg from '~/assets/carousel/events.webp'
import familyImg from '~/assets/carousel/family.webp'
import fashionImg from '~/assets/carousel/fashion.webp'

// Fonts composable
const { assignedFonts } = useFonts()

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
const showVideoEditor = ref(false)
const selectedVideo = ref(null)
const selectedImage = ref(null)
const editingVideo = ref(null)
const videoSubtitles = ref([])
const currentSubtitles = ref([])
const selectedSubtitleTrack = ref('-1')
const selectedAudioFile = ref(null)
const audioPreviewUrl = ref('')
const isSavingVideo = ref(false)

// Cropper related data
const previewImage = ref('')
const imageName = ref('')
const cropper = ref(null)
const fileInput = ref(null)
const imagePreview = ref(null)

// Video uploader related data
const videoInput = ref(null)
const audioInput = ref(null)
const editorVideoPlayer = ref(null)
const audioPreview = ref(null)
const videoName = ref('')
const selectedVideoFile = ref(null)
const videoPreview = ref('')
const videoThumbnail = ref('')
const videoFileSize = ref('')
const videoFileType = ref('')
const videoDuration = ref('')
const videoDimensions = ref('')

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
    console.log('Fetching properties for:', url)

    // For local blob URLs or data URLs, we need a different approach
    if (url.startsWith('blob:') || url.startsWith('data:')) {
      return new Promise((resolve) => {
        const img = new Image()
        img.onload = () => {
          console.log('Image loaded, dimensions:', img.width, 'x', img.height)
          resolve({
            size: 'N/A (Blob)',
            dimensions: `${img.width} x ${img.height} px`,
            format: url.startsWith('data:image/') ? url.split(';')[0].split('/')[1].toUpperCase() : 'N/A',
          })
        }
        img.onerror = (error) => {
          console.error('Image load error:', error)
          resolve({ size: "N/A", dimensions: "N/A", format: "N/A" })
        }
        img.src = url
      })
    }

    // For regular URLs, try to fetch
    const response = await fetch(url, { mode: 'cors' })
    const blob = await response.blob()
    const sizeInKB = (blob.size / 1024).toFixed(2)
    const format = blob.type.split('/')[1]?.toUpperCase() || 'N/A'

    console.log('Blob size:', blob.size, 'Format:', format)

    return new Promise((resolve) => {
      const img = new Image()
      img.onload = () => {
        console.log('Image loaded from URL, dimensions:', img.width, 'x', img.height)
        resolve({
          size: `${sizeInKB} KB`,
          dimensions: `${img.width} x ${img.height} px`,
          format: format,
        })
      }
      img.onerror = (error) => {
        console.error('Image load error for URL:', error)
        resolve({
          size: `${sizeInKB} KB`,
          dimensions: "N/A",
          format: format
        })
      }
      img.crossOrigin = 'anonymous'
      img.src = url
    })
  } catch (e) {
    console.error("Error al obtener las propiedades del archivo:", e)

    // Fallback: try to get basic info from URL
    if (url.startsWith('data:image/')) {
      return new Promise((resolve) => {
        const img = new Image()
        img.onload = () => {
          resolve({
            size: `${(url.length * 0.75 / 1024).toFixed(2)} KB (est.)`,
            dimensions: `${img.width} x ${img.height} px`,
            format: url.split(';')[0].split('/')[1].toUpperCase(),
          })
        }
        img.onerror = () => resolve({ size: "N/A", dimensions: "N/A", format: "N/A" })
        img.src = url
      })
    }

    return { size: "N/A", dimensions: "N/A", format: "N/A" }
  }
}

const fetchVideoProperties = async (videoItem) => {
  try {
    console.log('Fetching video properties for:', videoItem.name)

    const video = document.createElement("video")
    video.preload = 'metadata'
    video.src = videoItem.url

    // Set a timeout for loading metadata
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Timeout loading video metadata')), 10000)
    })

    await Promise.race([
      new Promise((resolve, reject) => {
        video.onloadedmetadata = () => {
          console.log('Video metadata loaded:', video.videoWidth, 'x', video.videoHeight)
          resolve()
        }
        video.onerror = (e) => {
          console.error('Video load error:', e)
          reject(new Error("Error al cargar metadatos del video."))
        }
      }),
      timeoutPromise
    ])

    const dimensions = `${video.videoWidth} x ${video.videoHeight} px`
    const format = videoItem.url.split(".").pop()?.toUpperCase() || "N/A"

    // Try to get file size
    let size = "N/A"
    try {
      const response = await fetch(videoItem.url, { method: 'HEAD' })
      const contentLength = response.headers.get('content-length')
      if (contentLength) {
        const sizeInMB = (parseInt(contentLength) / (1024 * 1024)).toFixed(2)
        size = `${sizeInMB} MB`
      }
    } catch (sizeError) {
      console.warn('Could not get video file size:', sizeError)
      size = "N/A"
    }

    console.log('Video properties:', { dimensions, size, format })

    return {
      ...videoItem,
      dimensions: dimensions,
      size: size,
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
  showVideoEditor.value = false
  selectedVideo.value = null
  selectedImage.value = null
  editingVideo.value = null
  resetVideoUploader()
  resetVideoEditor()
}

const onVideoLoaded = (event, videoId) => {
  console.log('Video loaded for thumbnail:', videoId)
  // El video se carga automáticamente como thumbnail sin reproducirse
  // gracias a preload="metadata" y muted
}

const handleVideoSelect = (event) => {
  console.log('handleVideoSelect called')
  const file = event.target.files[0]
  console.log('Selected video file:', file)

  if (file) {
    // Validate file type
    const allowedTypes = ['video/mp4', 'video/avi', 'video/mov', 'video/wmv', 'video/flv', 'video/webm']
    const allowedExtensions = ['.mp4', '.avi', '.mov', '.wmv', '.flv', '.webm']
    const fileExtension = file.name.toLowerCase().substring(file.name.lastIndexOf('.'))

    if (!allowedTypes.includes(file.type) && !allowedExtensions.includes(fileExtension)) {
      alert('Tipo de archivo no válido. Solo se permiten archivos de vídeo: MP4, AVI, MOV, WMV, FLV, WebM')
      return
    }

    // Validate file size (max 100MB for videos)
    const maxSize = 100 * 1024 * 1024 // 100MB
    if (file.size > maxSize) {
      alert('El archivo es demasiado grande. El tamaño máximo es 100MB.')
      return
    }

    selectedVideoFile.value = file

    // Set file info
    videoFileSize.value = (file.size / (1024 * 1024)).toFixed(2) + ' MB'
    videoFileType.value = fileExtension.toUpperCase().replace('.', '')

    // Create preview URL
    const reader = new FileReader()
    reader.onload = (e) => {
      videoPreview.value = e.target.result

      // Get video metadata and create thumbnail
      const video = document.createElement('video')
      video.preload = 'metadata'
      video.src = e.target.result
      video.currentTime = 1 // Seek to 1 second to get a frame (not the first frame which might be black)

      video.onloadedmetadata = () => {
        // Get duration
        const duration = video.duration
        const minutes = Math.floor(duration / 60)
        const seconds = Math.floor(duration % 60)
        videoDuration.value = `${minutes}:${seconds.toString().padStart(2, '0')}`

        // Get dimensions
        const width = video.videoWidth
        const height = video.videoHeight
        videoDimensions.value = `${width} x ${height} px`
      }

      video.onseeked = () => {
        // Create thumbnail from video frame
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')

        // Set canvas size (maintain aspect ratio, max 320px width)
        const aspectRatio = video.videoWidth / video.videoHeight
        canvas.width = Math.min(320, video.videoWidth)
        canvas.height = canvas.width / aspectRatio

        // Draw video frame to canvas
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height)

        // Convert to data URL for thumbnail
        videoThumbnail.value = canvas.toDataURL('image/jpeg', 0.8)
      }
    }
    reader.readAsDataURL(file)

    // Auto-fill name if empty
    if (!videoName.value.trim()) {
      videoName.value = file.name.replace(/\.[^/.]+$/, '')
    }
  } else {
    console.log('No video file selected')
  }
}

const uploadVideo = async () => {
  if (!selectedVideoFile.value || !videoName.value.trim()) {
    alert('Por favor selecciona un vídeo y proporciona un nombre')
    return
  }

  try {
    console.log('Uploading video:', videoName.value)

    // Create video object
    const newVideo = {
      id: `v-${Date.now()}`,
      url: videoPreview.value,
      name: videoName.value.trim(),
      dimensions: videoDimensions.value || 'N/A',
      size: videoFileSize.value,
      format: videoFileType.value,
      duration: videoDuration.value,
      thumbnail: videoThumbnail.value || videoPreview.value, // Use real thumbnail or fallback to video
      subtitles: []
    }

    // Add to videos array
    videos.value.unshift(newVideo)
    console.log('Video added to array, new length:', videos.value.length)

    // Save to localStorage for persistence
    const savedVideos = JSON.parse(localStorage.getItem('uploadedVideos') || '[]')
    savedVideos.unshift(newVideo)
    localStorage.setItem('uploadedVideos', JSON.stringify(savedVideos))

    // Show success message
    success.value = `Vídeo "${videoName.value}" subido exitosamente`
    setTimeout(() => success.value = '', 3000)

    // Close modal and reset
    closeAllModals()
    resetVideoUploader()

  } catch (error) {
    console.error('Error uploading video:', error)
    error.value = 'Error al subir el vídeo: ' + error.message
    setTimeout(() => error.value = '', 3000)
  }
}

const resetVideoUploader = () => {
  videoName.value = ''
  selectedVideoFile.value = null
  videoPreview.value = ''
  videoThumbnail.value = ''
  videoFileSize.value = ''
  videoFileType.value = ''
  videoDuration.value = ''
  videoDimensions.value = ''

  // Clear file input
  if (videoInput.value) {
    videoInput.value.value = ''
  }
}

// Video Editor Methods
const openVideoEditor = (video) => {
  editingVideo.value = { ...video }
  videoSubtitles.value = [...(video.subtitles || [])]

  // Generate blob URLs for current subtitles
  generateSubtitleBlobs()

  selectedAudioFile.value = null
  audioPreviewUrl.value = ''
  selectedSubtitleTrack.value = '-1'
  showVideoEditor.value = true
}

const closeVideoEditor = () => {
  showVideoEditor.value = false
  editingVideo.value = null

  // Clean up blob URLs
  currentSubtitles.value.forEach(subtitle => {
    if (subtitle.blobUrl) {
      URL.revokeObjectURL(subtitle.blobUrl)
    }
  })

  resetVideoEditor()
}

const resetVideoEditor = () => {
  videoSubtitles.value = []
  selectedAudioFile.value = null
  audioPreviewUrl.value = ''
  isSavingVideo.value = false
}


const handleAudioSelect = (event) => {
  const file = event.target.files[0]
  if (file) {
    // Validate file type
    const allowedTypes = ['audio/mp3', 'audio/wav', 'audio/m4a', 'audio/aac', 'audio/ogg']
    const allowedExtensions = ['.mp3', '.wav', '.m4a', '.aac', '.ogg']
    const fileExtension = file.name.toLowerCase().substring(file.name.lastIndexOf('.'))

    if (!allowedTypes.includes(file.type) && !allowedExtensions.includes(fileExtension)) {
      alert('Tipo de archivo no válido. Solo se permiten archivos de audio: MP3, WAV, M4A, AAC, OGG')
      return
    }

    // Validate file size (max 50MB for audio)
    const maxSize = 50 * 1024 * 1024 // 50MB
    if (file.size > maxSize) {
      alert('El archivo es demasiado grande. El tamaño máximo es 50MB.')
      return
    }

    selectedAudioFile.value = file
    audioPreviewUrl.value = URL.createObjectURL(file)
  }
}

const removeAudio = () => {
  selectedAudioFile.value = null
  audioPreviewUrl.value = ''
  if (audioInput.value) {
    audioInput.value.value = ''
  }
}

const saveVideoEdits = async () => {
  if (!editingVideo.value) return

  isSavingVideo.value = true

  try {
    // Create VTT files for subtitles
    const subtitleFiles = []
    for (let i = 0; i < videoSubtitles.value.length; i++) {
      const subtitle = videoSubtitles.value[i]
      if (subtitle.text.trim()) {
        const vttContent = `WEBVTT

${(i + 1).toString().padStart(2, '0')}
${formatTime(subtitle.start)} --> ${formatTime(subtitle.end)}
${subtitle.text}
`
        const blob = new Blob([vttContent], { type: 'text/vtt' })
        const file = new File([blob], `subtitle_${i + 1}_${subtitle.lang}.vtt`, { type: 'text/vtt' })
        subtitleFiles.push({
          file,
          lang: subtitle.lang,
          label: getLanguageLabel(subtitle.lang),
          fontFamily: subtitle.fontFamily
        })
      }
    }

    // Update video object with new data
    const updatedVideo = {
      ...editingVideo.value,
      subtitles: subtitleFiles.map(s => ({
        src: '', // Will be set after upload
        srclang: s.lang,
        label: s.label,
        fontFamily: s.fontFamily
      })),
      audioFile: selectedAudioFile.value
    }

    // Here you would typically upload the subtitle files and audio to the server
    // For now, we'll just update the local video object
    const videoIndex = videos.value.findIndex(v => v.id === editingVideo.value.id)
    if (videoIndex !== -1) {
      videos.value[videoIndex] = updatedVideo

      // Save to localStorage
      const savedVideos = JSON.parse(localStorage.getItem('uploadedVideos') || '[]')
      const savedIndex = savedVideos.findIndex(v => v.id === editingVideo.value.id)
      if (savedIndex !== -1) {
        savedVideos[savedIndex] = updatedVideo
        localStorage.setItem('uploadedVideos', JSON.stringify(savedVideos))
      }
    }

    // Regenerate subtitle blobs for immediate preview
    generateSubtitleBlobs()

    success.value = 'Vídeo editado exitosamente'
    setTimeout(() => success.value = '', 3000)
    closeVideoEditor()

  } catch (error) {
    console.error('Error saving video edits:', error)
    error.value = 'Error al guardar los cambios del vídeo'
    setTimeout(() => error.value = '', 3000)
  } finally {
    isSavingVideo.value = false
  }
}

const formatTime = (seconds) => {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const secs = Math.floor(seconds % 60)
  const ms = Math.floor((seconds % 1) * 1000)

  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}.${ms.toString().padStart(3, '0')}`
}

const getLanguageLabel = (lang) => {
  const labels = {
    es: 'Español',
    en: 'English',
    fr: 'Français',
    de: 'Deutsch',
    it: 'Italiano'
  }
  return labels[lang] || lang
}

const generateSubtitleBlobs = () => {
  // Clean up previous blob URLs
  currentSubtitles.value.forEach(subtitle => {
    if (subtitle.blobUrl) {
      URL.revokeObjectURL(subtitle.blobUrl)
    }
  })

  currentSubtitles.value = []

  // Generate new blob URLs for current subtitles
  videoSubtitles.value.forEach((subtitle, index) => {
    if (subtitle.text && subtitle.text.trim()) {
      const vttContent = `WEBVTT

${(index + 1).toString().padStart(2, '00')}
${formatTime(subtitle.start)} --> ${formatTime(subtitle.end)}
${subtitle.text}
`

      const blob = new Blob([vttContent], { type: 'text/vtt' })
      const blobUrl = URL.createObjectURL(blob)

      currentSubtitles.value.push({
        ...subtitle,
        blobUrl: blobUrl
      })
    }
  })
}

const updateSubtitleTrack = () => {
  const video = editorVideoPlayer.value
  if (!video) return

  // Disable all subtitle tracks
  const tracks = video.textTracks
  for (let i = 0; i < tracks.length; i++) {
    tracks[i].mode = 'disabled'
  }

  // Enable selected track
  if (selectedSubtitleTrack.value !== '-1') {
    const trackIndex = parseInt(selectedSubtitleTrack.value)
    if (tracks[trackIndex]) {
      tracks[trackIndex].mode = 'showing'
    }
  }
}

const addSubtitle = () => {
  videoSubtitles.value.push({
    text: '',
    lang: 'es',
    start: 0,
    end: 5,
    fontFamily: assignedFonts.value?.active?.fontFamily || 'Arial'
  })

  // Regenerate blobs after adding
  generateSubtitleBlobs()
}

const removeSubtitle = (index) => {
  // Clean up blob URL before removing
  if (currentSubtitles.value[index]?.blobUrl) {
    URL.revokeObjectURL(currentSubtitles.value[index].blobUrl)
  }

  videoSubtitles.value.splice(index, 1)
  currentSubtitles.value.splice(index, 1)

  // Update selected track if necessary
  if (selectedSubtitleTrack.value !== '-1' && parseInt(selectedSubtitleTrack.value) >= index) {
    if (parseInt(selectedSubtitleTrack.value) === index) {
      selectedSubtitleTrack.value = '-1'
    } else {
      selectedSubtitleTrack.value = (parseInt(selectedSubtitleTrack.value) - 1).toString()
    }
  }
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

const triggerFileInput = () => {
  console.log('Triggering file input click')

  // Only open file browser if no image is currently loaded
  if (!previewImage.value) {
    if (fileInput.value) {
      fileInput.value.click()
    } else {
      console.warn('File input not found')
    }
  } else {
    console.log('Image already loaded, not opening file browser')
  }
}

const handleDragOver = (event) => {
  event.preventDefault()
  event.currentTarget.classList.add('drag-over')
  console.log('Drag over detected')
}

const handleDragLeave = (event) => {
  event.preventDefault()
  event.currentTarget.classList.remove('drag-over')
  console.log('Drag leave detected')
}

const handleDrop = (event) => {
  event.preventDefault()
  event.currentTarget.classList.remove('drag-over')

  const files = event.dataTransfer.files
  if (files.length > 0) {
    const file = files[0]
    console.log('File dropped:', file.name)
    handleFileSelect({ target: { files: [file] } })
  }
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

      // Calculate actual dimensions from the cropped canvas
      const actualWidth = croppedCanvas.width || 800
      const actualHeight = croppedCanvas.height || 450

      // Calculate size more accurately
      const sizeInBytes = croppedDataUrl.length * 0.75 // Base64 encoding overhead
      const sizeInKB = (sizeInBytes / 1024).toFixed(2)

      // Create new image object
      const newImage = {
        id: `img-${Date.now()}`,
        url: croppedDataUrl,
        name: imageName.value.trim(),
        dimensions: `${actualWidth} x ${actualHeight} px`,
        size: `${sizeInKB} KB`,
        format: 'PNG',
      };

      console.log('New cropped image properties:', newImage);

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
      // Try to get dimensions from the original image
      const img = new Image()
      img.src = previewImage.value

      const fallbackImage = await new Promise((resolve) => {
        img.onload = () => {
          const sizeInKB = (previewImage.value.length * 0.75 / 1024).toFixed(2)
          resolve({
            id: `img-${Date.now()}`,
            url: previewImage.value,
            name: imageName.value.trim(),
            dimensions: `${img.width} x ${img.height} px`,
            size: `${sizeInKB} KB`,
            format: previewImage.value.startsWith('data:image/') ?
              previewImage.value.split(';')[0].split('/')[1].toUpperCase() : 'N/A',
          })
        }
        img.onerror = () => resolve({
          id: `img-${Date.now()}`,
          url: previewImage.value,
          name: imageName.value.trim(),
          dimensions: 'N/A',
          size: 'N/A',
          format: 'N/A',
        })
      })

      images.value.unshift(fallbackImage);
      const savedImages = JSON.parse(localStorage.getItem('uploadedImages') || '[]');
      savedImages.unshift(fallbackImage);
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
    console.log('🎬 Loading multimedia data...')

    // Load image properties for initial images
    console.log('🖼️ Processing initial images...')
    const processedImages = await Promise.all(
      initialImages.map(async (img) => {
        console.log('Processing image:', img.name, 'URL:', img.url.substring(0, 50) + '...')
        const properties = await fetchImageProperties(img.url)
        console.log('Image properties for', img.name, ':', properties)
        return { ...img, ...properties }
      })
    )

    // Load saved images from localStorage
    const savedImages = JSON.parse(localStorage.getItem('uploadedImages') || '[]')
    console.log('📦 Loaded saved images:', savedImages.length)

    // Load saved videos from localStorage
    const savedVideos = JSON.parse(localStorage.getItem('uploadedVideos') || '[]')
    console.log('🎬 Loaded saved videos:', savedVideos.length)

    // Combine initial images with saved images
    images.value = [...processedImages, ...savedImages]
    console.log('✅ Total images loaded:', images.value.length)

    // Load video properties
    console.log('🎥 Processing videos...')
    const processedVideos = await Promise.all(
      STATIC_VIDEOS.map(video => fetchVideoProperties(video))
    )

    // Combine static videos with saved videos
    videos.value = [...processedVideos, ...savedVideos]
    console.log('✅ Total videos loaded:', videos.value.length)

    loading.value = false
    console.log('🎉 Multimedia loading completed!')
  } catch (err) {
    console.error('❌ Error loading multimedia:', err)
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
  videoName.value = ''
  selectedVideoFile.value = null
  videoPreview.value = ''
  videoThumbnail.value = ''
  videoFileSize.value = ''
  videoFileType.value = ''
  videoDuration.value = ''
  videoDimensions.value = ''
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

/* Drop zone styles */
.drop-zone {
  transition: all 0.2s ease;
}

.drop-zone:hover {
  border-color: #a8a29e !important;
  background-color: #f9fafb !important;
}

.drop-zone.drag-over {
  border-color: #78716c !important;
  background-color: #f3f4f6 !important;
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