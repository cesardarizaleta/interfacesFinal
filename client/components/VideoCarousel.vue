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
      <div ref="slickContainer" class="video-carousel">
        <div
          v-for="(video, index) in videos"
          :key="index"
          class="video-slide"
          :data-video-url="video.src"
          :data-fallback-url="video.fallbackUrl"
          :data-title="video.title"
          @click="openVideoModal(video)"
        >
          <video
            :src="video.src"
            :poster="video.thumbnail"
            preload="metadata"
            :alt="video.alt"
            class="w-full h-80 lg:h-96 object-cover"
          />
          <div class="play-button">
            <span>Play</span>
          </div>
        </div>
      </div>
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
  data() {
    return {
      videos: [],
      showModal: false,
      selectedVideo: null,
      videoDetails: {
        format: 'N/A',
        dimensions: 'N/A',
        duration: 'N/A',
        size: 'N/A',
        name: 'N/A'
      }
    };
  },
  async mounted() {
    this.loadVideos();
    await this.initSlick();

    // Listen for storage changes to update carousel dynamically
    window.addEventListener('storage', this.handleStorageChange);
  },
  beforeUnmount() {
    window.removeEventListener('storage', this.handleStorageChange);
    // Destroy Slick carousel if it exists
    if (this.$refs.slickContainer && window.jQuery) {
      window.jQuery(this.$refs.slickContainer).slick('unslick');
    }
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
        // Reinitialize slick with new videos
        this.$nextTick(() => {
          this.initSlick();
        });
      }
    },

    async initSlick() {
      // Wait for jQuery and Slick to be available
      if (!window.jQuery) {
        console.warn('jQuery not available, trying to load...');
        await this.loadJQuery();
      }

      if (!window.jQuery.fn.slick) {
        console.warn('Slick not available, trying to load...');
        await this.loadSlick();
      }

      if (this.$refs.slickContainer && window.jQuery && window.jQuery.fn.slick) {
        window.jQuery(this.$refs.slickContainer).slick({
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
          arrows: true,
          prevArrow: '<button type="button" class="slick-prev">Anterior</button>',
          nextArrow: '<button type="button" class="slick-next">Siguiente</button>',
          responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 2
              }
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 1
              }
            }
          ]
        });
      } else {
        console.error('Slick carousel could not be initialized');
      }
    },

    async loadJQuery() {
      return new Promise((resolve, reject) => {
        if (window.jQuery) {
          resolve();
          return;
        }

        const script = document.createElement('script');
        script.src = 'https://code.jquery.com/jquery-3.6.0.min.js';
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
      });
    },

    async loadSlick() {
      return new Promise((resolve, reject) => {
        if (window.jQuery && window.jQuery.fn.slick) {
          resolve();
          return;
        }

        // Load Slick CSS
        const cssLink = document.createElement('link');
        cssLink.rel = 'stylesheet';
        cssLink.type = 'text/css';
        cssLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min.css';
        document.head.appendChild(cssLink);

        const themeLink = document.createElement('link');
        themeLink.rel = 'stylesheet';
        themeLink.type = 'text/css';
        themeLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick-theme.min.css';
        document.head.appendChild(themeLink);

        // Load Slick JS
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min.js';
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
      });
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
.swiper {
  padding: 0 0 60px 0;
  overflow: visible;
  width: 100%;
  max-width: 100%;
}

.swiper-wrapper {
  width: 100%;
}

.swiper-slide {
  height: auto;
  transition: transform 0.3s ease;
  width: auto;
}

.swiper-slide:not(.swiper-slide-active) {
  transform: scale(0.9);
  opacity: 0.7;
}

.swiper-slide-active {
  transform: scale(1);
  opacity: 1;
}

/* Video specific styles */
video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 1rem;
}

/* Contenedor del carrusel con límites */
.relative.max-w-7xl {
  max-width: 100%;
  overflow: hidden;
}

/* Personalización de la paginación */
:deep(.swiper-pagination-custom .swiper-pagination-bullet) {
  background: #d1d5db;
  opacity: 1;
  margin: 0 4px;
}

:deep(.swiper-pagination-custom .swiper-pagination-bullet-active) {
  background: var(--color-primary);
  transform: scale(1.2);
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
}

/* Animaciones suaves */
.swiper-button-prev-custom,
.swiper-button-next-custom {
  transition: all 0.3s ease;
}

.swiper-button-prev-custom:hover,
.swiper-button-next-custom:hover {
  transform: translateY(-50%) scale(1.1);
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
  color: var(--text-primary);
}

.text-secondary {
  color: var(--text-secondary);
}

.text-accent {
  color: var(--color-accent);
}

.bg-neutral {
  background-color: var(--background-neutral);
}

.bg-secondary {
  background-color: var(--color-secondary);
}
</style>