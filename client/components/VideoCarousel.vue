<template>
  <div class="video-carousel-container px-4 lg:px-8 py-16 relative">
    <!-- Título del carrusel -->
    <div class="text-center mb-12">
      <h2 class="text-4xl lg:text-5xl font-semibold mb-4 text-primary">
        Featured Videos
      </h2>
      <p class="text-secondary max-w-2xl mx-auto">
        Explore our cinematic video work through this interactive gallery
      </p>
    </div>

    <div class="relative max-w-7xl mx-auto">
      <swiper
        ref="swiperRef"
        :slides-per-view="1"
        :space-between="0"
        :loop="true"
        :autoplay="{
          delay: 8000,
          disableOnInteraction: false,
        }"
        :pagination="{
          el: '.swiper-pagination-custom',
          clickable: true,
        }"
        :navigation="{
          nextEl: '.swiper-button-next-custom',
          prevEl: '.swiper-button-prev-custom',
        }"
        :breakpoints="{
          320: {
            slidesPerView: 1,
            spaceBetween: 0,
          },
          640: {
            slidesPerView: 1,
            spaceBetween: 0,
          },
          1024: {
            slidesPerView: 1,
            spaceBetween: 0,
          },
        }"
        @slide-change="onSlideChange"
        @swiper="onSwiper"
        class="video-carousel"
      >
        <swiper-slide
          v-for="(video, index) in videos"
          :key="index"
          class="video-slide"
          @click="openVideoModal(video)"
        >
          <div class="video-wrapper" @click.stop="toggleVideoPlay(index)">
            <video
              :src="video.src"
              :poster="video.thumbnail"
              preload="metadata"
              :alt="video.alt"
              muted
              playsinline
              loop
              class="w-full h-80 lg:h-96 object-cover rounded-lg"
            />
            <div class="play-button">
              <svg class="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd" />
              </svg>
            </div>
          </div>
        </swiper-slide>
      </swiper>

      <!-- Custom Navigation -->
      <div class="swiper-button-prev-custom">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </div>
      <div class="swiper-button-next-custom">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </div>

      <!-- Custom Pagination -->
      <div class="swiper-pagination-custom"></div>
    </div>

    <!-- Modal de Video -->
    <div v-if="showModal" class="modal" @click="closeModal">
      <div class="modal-content" @click.stop>
        <span class="close-button" @click="closeModal">&times;</span>
        <h3>{{ selectedVideo?.title }}</h3>
        <div class="video-wrapper">
          <video
            v-if="selectedVideo && !isYouTubeVideo(selectedVideo.src)"
            ref="modalVideo"
            :src="selectedVideo.src"
            controls
            autoplay
            class="w-full h-full"
          />
          <iframe
            v-else-if="selectedVideo && isYouTubeVideo(selectedVideo.src)"
            :src="getYouTubeEmbedUrl(selectedVideo.src)"
            frameborder="0"
            allow="autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
            class="w-full h-full"
          />
        </div>
        <div class="video-details">
          <h4>Detalles del video:</h4>
          <p><strong>Formato:</strong> <span>{{ videoDetails.format }}</span></p>
          <p><strong>Dimensiones:</strong> <span>{{ videoDetails.dimensions }}</span></p>
          <p><strong>Duración:</strong> <span>{{ videoDetails.duration }}</span></p>
          <p><strong>Tamaño:</strong> <span>{{ videoDetails.size }}</span></p>
          <p><strong>Nombre:</strong> <span>{{ videoDetails.name }}</span></p>
        </div>
      </div>
    </div>

    <!-- Círculo decorativo -->
    <div
      class="bg-neutral h-32 w-32 rounded-full absolute -top-10 -right-10 -z-10 opacity-50"
    ></div>
  </div>
</template>

<script>
// Import Swiper components
import SwiperCore from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/vue'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

// Configure Swiper modules
SwiperCore.use([])

// Import your actual videos
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

export default {
  name: "VideoCarousel",
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      videos: [],
      showModal: false,
      selectedVideo: null,
      swiperRef: null,
      currentVideoIndex: 0,
      videoElements: [],
      videoDetails: {
        format: 'N/A',
        dimensions: 'N/A',
        duration: 'N/A',
        size: 'N/A',
        name: 'N/A'
      }
    };
  },
  mounted() {
    this.loadVideos();
    // Listen for storage changes to update carousel dynamically
    window.addEventListener('storage', this.handleStorageChange);
  },
  beforeUnmount() {
    window.removeEventListener('storage', this.handleStorageChange);
  },
  methods: {
    loadVideos() {
      // Static videos using imported video files
      const staticVideos = [
        {
          src: dog1,
          thumbnail: "/images/video-thumb1.jpg",
          alt: "Dog Video 1",
          title: "Dog Adventures 1",
          description: "Beautiful dog moments captured in stunning quality",
          category: "Pets",
          duration: "2:30",
          fallbackUrl: null
        },
        {
          src: dog2,
          thumbnail: "/images/video-thumb2.jpg",
          alt: "Dog Video 2",
          title: "Dog Adventures 2",
          description: "Playful dog scenes in natural settings",
          category: "Pets",
          duration: "5:15",
          fallbackUrl: null
        },
        {
          src: dog3,
          thumbnail: "/images/video-thumb3.jpg",
          alt: "Dog Video 3",
          title: "Dog Adventures 3",
          description: "Heartwarming dog stories and moments",
          category: "Pets",
          duration: "3:45",
          fallbackUrl: null
        },
        {
          src: dog4,
          thumbnail: "/images/video-thumb4.jpg",
          alt: "Dog Video 4",
          title: "Dog Adventures 4",
          description: "Adorable dog behaviors and interactions",
          category: "Pets",
          duration: "4:20",
          fallbackUrl: null
        },
        {
          src: dog5,
          thumbnail: "/images/video-thumb5.jpg",
          alt: "Dog Video 5",
          title: "Dog Adventures 5",
          description: "Fun dog activities and adventures",
          category: "Pets",
          duration: "6:10",
          fallbackUrl: null
        },
        {
          src: dog6,
          thumbnail: "/images/video-thumb6.jpg",
          alt: "Dog Video 6",
          title: "Dog Adventures 6",
          description: "Cute dog moments and expressions",
          category: "Pets",
          duration: "3:30",
          fallbackUrl: null
        },
        {
          src: forest,
          thumbnail: "/images/video-thumb7.jpg",
          alt: "Forest Video",
          title: "Forest Journey",
          description: "Immersive journey through breathtaking forest landscapes",
          category: "Nature",
          duration: "4:45",
          fallbackUrl: null
        },
        {
          src: sunshine,
          thumbnail: "/images/video-thumb8.jpg",
          alt: "Sunshine Video",
          title: "Sunshine Moments",
          description: "Beautiful scenes captured in golden sunlight",
          category: "Nature",
          duration: "5:50",
          fallbackUrl: null
        },
        {
          src: mountain,
          thumbnail: "/images/video-thumb9.jpg",
          alt: "Mountain Video",
          title: "Mountain Views",
          description: "Stunning mountain landscapes and vistas",
          category: "Nature",
          duration: "3:15",
          fallbackUrl: null
        },
        {
          src: mountain2,
          thumbnail: "/images/video-thumb10.jpg",
          alt: "Mountain Video 2",
          title: "Mountain Adventures",
          description: "Epic mountain scenes and explorations",
          category: "Nature",
          duration: "7:20",
          fallbackUrl: null
        },
      ];

      // Load uploaded videos from localStorage
      const uploadedVideos = JSON.parse(localStorage.getItem('uploadedVideos') || '[]');

      // Transform uploaded videos to carousel format
      const transformedUploadedVideos = uploadedVideos.map(video => ({
        src: video.url,
        thumbnail: video.thumbnail || '/images/video-thumb-default.jpg',
        alt: video.name || 'Uploaded Video',
        title: video.name || 'Custom Video',
        description: `Video personalizado - ${video.dimensions || 'Sin dimensiones'}`,
        category: "Custom",
        duration: video.duration || 'N/A',
        fallbackUrl: null
      }));

      // Combine static and uploaded videos
      this.videos = [...staticVideos, ...transformedUploadedVideos];

      console.log('Video carousel loaded:', this.videos.length);
    },

    handleStorageChange(event) {
      if (event.key === 'uploadedVideos') {
        console.log('Uploaded videos changed, updating carousel...');
        this.loadVideos();
        // Swiper will automatically update when videos array changes
        this.$nextTick(() => {
          if (this.swiperRef) {
            this.swiperRef.$el.swiper.update();
          }
        });
      }
    },
  },
  mounted() {
    this.loadVideos();
    // Listen for storage changes to update carousel dynamically
    window.addEventListener('storage', this.handleStorageChange);
  },
  beforeUnmount() {
    window.removeEventListener('storage', this.handleStorageChange);
  },
  methods: {
    loadVideos() {
      // Static videos using imported video files
      const staticVideos = [
        {
          src: dog1,
          thumbnail: "/images/video-thumb1.jpg",
          alt: "Dog Video 1",
          title: "Dog Adventures 1",
          description: "Beautiful dog moments captured in stunning quality",
          category: "Pets",
          duration: "2:30",
          fallbackUrl: null
        },
        {
          src: dog2,
          thumbnail: "/images/video-thumb2.jpg",
          alt: "Dog Video 2",
          title: "Dog Adventures 2",
          description: "Playful dog scenes in natural settings",
          category: "Pets",
          duration: "5:15",
          fallbackUrl: null
        },
        {
          src: dog3,
          thumbnail: "/images/video-thumb3.jpg",
          alt: "Dog Video 3",
          title: "Dog Adventures 3",
          description: "Heartwarming dog stories and moments",
          category: "Pets",
          duration: "3:45",
          fallbackUrl: null
        },
        {
          src: dog4,
          thumbnail: "/images/video-thumb4.jpg",
          alt: "Dog Video 4",
          title: "Dog Adventures 4",
          description: "Adorable dog behaviors and interactions",
          category: "Pets",
          duration: "4:20",
          fallbackUrl: null
        },
        {
          src: dog5,
          thumbnail: "/images/video-thumb5.jpg",
          alt: "Dog Video 5",
          title: "Dog Adventures 5",
          description: "Fun dog activities and adventures",
          category: "Pets",
          duration: "6:10",
          fallbackUrl: null
        },
        {
          src: dog6,
          thumbnail: "/images/video-thumb6.jpg",
          alt: "Dog Video 6",
          title: "Dog Adventures 6",
          description: "Cute dog moments and expressions",
          category: "Pets",
          duration: "3:30",
          fallbackUrl: null
        },
        {
          src: forest,
          thumbnail: "/images/video-thumb7.jpg",
          alt: "Forest Video",
          title: "Forest Journey",
          description: "Immersive journey through breathtaking forest landscapes",
          category: "Nature",
          duration: "4:45",
          fallbackUrl: null
        },
        {
          src: sunshine,
          thumbnail: "/images/video-thumb8.jpg",
          alt: "Sunshine Video",
          title: "Sunshine Moments",
          description: "Beautiful scenes captured in golden sunlight",
          category: "Nature",
          duration: "5:50",
          fallbackUrl: null
        },
        {
          src: mountain,
          thumbnail: "/images/video-thumb9.jpg",
          alt: "Mountain Video",
          title: "Mountain Views",
          description: "Stunning mountain landscapes and vistas",
          category: "Nature",
          duration: "3:15",
          fallbackUrl: null
        },
        {
          src: mountain2,
          thumbnail: "/images/video-thumb10.jpg",
          alt: "Mountain Video 2",
          title: "Mountain Adventures",
          description: "Epic mountain scenes and explorations",
          category: "Nature",
          duration: "7:20",
          fallbackUrl: null
        },
      ];

      // Load uploaded videos from localStorage
      const uploadedVideos = JSON.parse(localStorage.getItem('uploadedVideos') || '[]');

      // Transform uploaded videos to carousel format
      const transformedUploadedVideos = uploadedVideos.map(video => ({
        src: video.url,
        thumbnail: video.thumbnail || '/images/video-thumb-default.jpg',
        alt: video.name || 'Uploaded Video',
        title: video.name || 'Custom Video',
        description: `Video personalizado - ${video.dimensions || 'Sin dimensiones'}`,
        category: "Custom",
        duration: video.duration || 'N/A',
        fallbackUrl: null
      }));

      // Combine static and uploaded videos
      this.videos = [...staticVideos, ...transformedUploadedVideos];

      console.log('Video carousel loaded:', this.videos.length);
    },

    handleStorageChange(event) {
      if (event.key === 'uploadedVideos') {
        console.log('Uploaded videos changed, updating carousel...');
        this.loadVideos();
        // Swiper will automatically update when videos array changes
        this.$nextTick(() => {
          if (this.swiperRef) {
            this.swiperRef.$el.swiper.update();
          }
        });
      }
    },

    async openVideoModal(video) {
      this.selectedVideo = video;
      this.showModal = true;

      // Reset video details
      this.videoDetails = {
        format: 'N/A',
        dimensions: 'N/A',
        duration: 'N/A',
        size: 'N/A',
        name: video.title
      };

      // Handle video loading and details
      if (!this.isYouTubeVideo(video.src)) {
        try {
          const details = await this.getVideoDetails(video.src, video.fallbackUrl);
          this.videoDetails = details;
        } catch (error) {
          console.error('Error loading video details:', error);
        }
      } else {
        this.videoDetails.format = 'YouTube';
        this.videoDetails.name = this.getVideoName(video.src);
      }
    },

    closeModal() {
      this.showModal = false;
      this.selectedVideo = null;

      // Stop video playback
      if (this.$refs.modalVideo) {
        this.$refs.modalVideo.pause();
        this.$refs.modalVideo.currentTime = 0;
      }
    },

    async getVideoDetails(videoUrl, fallbackUrl = null) {
      return new Promise((resolve, reject) => {
        const video = document.createElement('video');
        video.src = videoUrl;
        video.preload = 'metadata';

        video.onloadedmetadata = async () => {
          const format = videoUrl.split('.').pop().toUpperCase();
          const dimensions = `${video.videoWidth}x${video.videoHeight}`;
          const duration = this.formatDuration(video.duration);

          let size = 'N/A';
          try {
            const response = await fetch(video.currentSrc, { method: 'HEAD' });
            const contentLength = response.headers.get('content-length');
            if (contentLength) {
              size = this.formatBytes(contentLength);
            }
          } catch (error) {
            console.error('Error getting file size:', error);
          }

          const name = videoUrl.includes('/') ? videoUrl.substring(videoUrl.lastIndexOf('/') + 1) : videoUrl;

          resolve({
            format,
            dimensions,
            duration,
            size,
            name
          });
        };

        video.onerror = () => {
          if (fallbackUrl) {
            console.warn(`Error loading video from "${videoUrl}". Trying fallback: "${fallbackUrl}"`);
            video.src = fallbackUrl;
            video.load();
          } else {
            reject(new Error(`Could not load video from "${videoUrl}"`));
          }
        };
      });
    },

    isYouTubeVideo(url) {
      return url.includes('youtube.com') || url.includes('youtu.be');
    },

    getYouTubeEmbedUrl(url) {
      // Convert YouTube URL to embed URL
      const videoId = this.extractYouTubeId(url);
      return `https://www.youtube.com/embed/${videoId}`;
    },

    extractYouTubeId(url) {
      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
      const match = url.match(regExp);
      return (match && match[2].length == 11) ? match[2] : null;
    },

    getVideoName(url) {
      if (this.isYouTubeVideo(url)) {
        return 'YouTube Video';
      }
      return url.includes('/') ? url.substring(url.lastIndexOf('/') + 1) : url;
    },

    formatDuration(seconds) {
      if (isNaN(seconds)) return 'N/A';
      const h = Math.floor(seconds / 3600);
      const m = Math.floor((seconds % 3600) / 60);
      const s = Math.floor(seconds % 60);
      return [h, m, s]
        .map(v => v < 10 ? "0" + v : v)
        .filter((v, i) => v !== "00" || i > 0)
        .join(":");
    },

    formatBytes(bytes, decimals = 2) {
      if (bytes === 0) return '0 Bytes';
      const k = 1024;
      const dm = decimals < 0 ? 0 : decimals;
      const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    },

    onSwiper(swiper) {
      this.swiperRef = swiper;
      this.$nextTick(() => {
        this.initializeVideoAutoplay();
      });
    },

    onSlideChange(swiper) {
      this.currentVideoIndex = swiper.activeIndex;
      this.pauseAllVideos();
      this.playCurrentVideo();
    },

    initializeVideoAutoplay() {
      this.$nextTick(() => {
        const videoElements = this.$el.querySelectorAll('video');
        this.videoElements = Array.from(videoElements);

        // Configurar autoplay para el primer video
        if (this.videoElements.length > 0) {
          this.setupVideoAutoplay(this.videoElements[0], 0);
        }
      });
    },

    setupVideoAutoplay(videoElement, index) {
      if (!videoElement) return;

      // Configurar el video para autoplay
      videoElement.muted = true; // Necesario para autoplay en la mayoría de navegadores
      videoElement.playsInline = true; // Para móviles
      videoElement.preload = 'metadata';

      // Intentar reproducir el video
      const playPromise = videoElement.play();

      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            console.log(`Video ${index} autoplay started`);
          })
          .catch(error => {
            console.log(`Video ${index} autoplay failed:`, error);
            // Mostrar play button si autoplay falla
            const playButton = videoElement.parentElement.querySelector('.play-button');
            if (playButton) {
              playButton.style.display = 'flex';
            }
          });
      }

      // Manejar eventos del video
      videoElement.addEventListener('ended', () => {
        // Cuando termina el video, pasar al siguiente slide
        if (this.swiperRef) {
          this.swiperRef.slideNext();
        }
      });

      videoElement.addEventListener('play', () => {
        // Ocultar play button cuando el video está reproduciendo
        const playButton = videoElement.parentElement.querySelector('.play-button');
        if (playButton) {
          playButton.style.display = 'none';
        }
      });

      videoElement.addEventListener('pause', () => {
        // Mostrar play button cuando el video está pausado
        const playButton = videoElement.parentElement.querySelector('.play-button');
        if (playButton) {
          playButton.style.display = 'flex';
        }
      });
    },

    playCurrentVideo() {
      if (this.videoElements[this.currentVideoIndex]) {
        const video = this.videoElements[this.currentVideoIndex];
        video.muted = true;
        video.play().catch(error => {
          console.log('Error playing current video:', error);
        });
      }
    },

    pauseAllVideos() {
      this.videoElements.forEach(video => {
        if (video && !video.paused) {
          video.pause();
        }
      });
    },

    toggleVideoPlay(index) {
      const video = this.videoElements[index];
      if (video) {
        if (video.paused) {
          video.muted = false; // Quitar mute cuando el usuario hace click
          video.play();
        } else {
          video.pause();
        }
      }
    },
  },
};
</script>

<style scoped>
/* Contenedor principal sin overflow */
.video-carousel-container {
  overflow-x: hidden;
  max-width: 100vw;
}

/* Estilos personalizados para el carrusel */
:deep(.swiper) {
  padding: 0 0 60px 0;
  overflow: visible;
  width: 100%;
  max-width: 100%;
}

:deep(.swiper-wrapper) {
  width: 100%;
}

:deep(.swiper-slide) {
  height: auto;
  transition: transform 0.3s ease;
  width: auto;
}

:deep(.swiper-slide:not(.swiper-slide-active)) {
  transform: scale(0.9);
  opacity: 0.7;
}

:deep(.swiper-slide-active) {
  transform: scale(1);
  opacity: 1;
}

/* Video specific styles */
.video-wrapper {
  position: relative;
  overflow: hidden;
  border-radius: 1rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
}

.video-wrapper:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

.video-slide video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 1rem;
  display: block;
}

/* Play button overlay */
.play-button {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.7);
  border-radius: 50%;
  padding: 1rem;
  transition: all 0.3s ease;
  z-index: 10;
  display: none; /* Initially hidden, shown when needed */
  align-items: center;
  justify-content: center;
}

.play-button:hover {
  background: rgba(0, 0, 0, 0.9);
  transform: translate(-50%, -50%) scale(1.1);
}

.play-button svg {
  color: white;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
  width: 2rem;
  height: 2rem;
}

/* Contenedor del carrusel con límites */
.relative.max-w-7xl {
  max-width: 100%;
  overflow: hidden;
}

/* Personalización de la paginación */
:deep(.swiper-pagination) {
  bottom: 20px !important;
}

:deep(.swiper-pagination-bullet) {
  background: #d1d5db;
  opacity: 1;
  margin: 0 4px;
  width: 12px;
  height: 12px;
  transition: all 0.3s ease;
}

:deep(.swiper-pagination-bullet-active) {
  background: var(--color-primary, #3b82f6);
  transform: scale(1.2);
}

/* Custom Navigation */
.swiper-button-prev-custom,
.swiper-button-next-custom {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
}

.swiper-button-prev-custom {
  left: -25px;
}

.swiper-button-next-custom {
  right: -25px;
}

.swiper-button-prev-custom:hover,
.swiper-button-next-custom:hover {
  background: rgba(255, 255, 255, 1);
  transform: translateY(-50%) scale(1.1);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

/* Ocultar navegación en móvil */
@media (max-width: 768px) {
  .swiper-button-prev-custom,
  .swiper-button-next-custom {
    display: none;
  }

  /* Ajustes adicionales para móvil */
  .video-carousel-container {
    padding-left: 1rem;
    padding-right: 1rem;
  }

  :deep(.swiper) {
    padding-bottom: 40px;
  }
}

/* Modal styles */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: fadeIn 0.3s ease;
}

.modal-content {
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  max-width: 90vw;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}

.close-button {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  color: #666;
  transition: color 0.3s ease;
}

.close-button:hover {
  color: #333;
}

.video-wrapper video {
  width: 100%;
  height: auto;
  max-height: 70vh;
  border-radius: 0.5rem;
}

.video-details {
  margin-top: 1rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 0.5rem;
}

.video-details h4 {
  margin-bottom: 0.5rem;
  color: #333;
}

.video-details p {
  margin: 0.25rem 0;
  color: #666;
}

/* Animations */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* Prevenir overflow en el body */
:global(body) {
  overflow-x: hidden;
}

/* Asegurar que el contenedor padre no cause overflow */
:global(.swiper-container-horizontal) {
  overflow: visible !important;
}

/* Clases de color dinámicas */
.text-primary {
  color: var(--text-primary, #1f2937);
}

.text-secondary {
  color: var(--text-secondary, #6b7280);
}

.text-accent {
  color: var(--color-accent, #3b82f6);
}

.bg-neutral {
  background-color: var(--background-neutral, #f9fafb);
}

.bg-secondary {
  background-color: var(--color-secondary, #e5e7eb);
}
</style>