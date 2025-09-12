<template>
  <div class="image-carousel-container px-4 lg:px-8 py-16 relative">
    <!--Verdad-->
    <!-- Título del carrusel -->
    <div class="text-center mb-12">
      <h2 class="text-4xl lg:text-5xl font-semibold mb-4 text-primary">
        Featured Gallery
      </h2>
      <p class="text-secondary max-w-2xl mx-auto">
        Explore our most stunning photography work through this interactive
        gallery
      </p>
    </div>

    <div class="relative max-w-7xl mx-auto">
      <div ref="swiperContainer" class="swiper">
        <div class="swiper-wrapper">
          <div
            v-for="(image, index) in images"
            :key="index"
            class="swiper-slide"
          >
            <div
              class="relative overflow-hidden rounded-2xl group cursor-pointer bg-neutral"
            >
              <img
                :src="image.src"
                :alt="image.alt"
                class="w-full h-80 lg:h-96 object-cover transition-transform duration-700 group-hover:scale-105"
                @error="handleImageError"
              />
              <!-- Overlay con información -->
              <div
                class="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                <div class="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 class="text-xl lg:text-2xl font-semibold mb-2">
                    {{ image.title }}
                  </h3>
                  <p class="text-sm lg:text-base opacity-90">
                    {{ image.description }}
                  </p>
                </div>
              </div>

              <!-- Badge de categoría -->
              <div
                class="absolute top-4 left-4 bg-secondary/90 backdrop-blur-sm px-3 py-1 rounded-full"
              >
                <span class="text-xs font-medium text-primary">{{
                  image.category
                }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Navegación personalizada -->
        <div
          class="swiper-button-prev-custom absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-secondary/90 backdrop-blur-sm rounded-full flex items-center justify-center cursor-pointer shadow-lg hover:bg-secondary transition-all duration-300 group"
        >
          <svg
            class="w-5 h-5 text-primary group-hover:text-accent transition-colors"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 19l-7-7 7-7"
            ></path>
          </svg>
        </div>

        <div
          class="swiper-button-next-custom absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-secondary/90 backdrop-blur-sm rounded-full flex items-center justify-center cursor-pointer shadow-lg hover:bg-secondary transition-all duration-300 group"
        >
          <svg
            class="w-5 h-5 text-primary group-hover:text-accent transition-colors"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5l7 7-7 7"
            ></path>
          </svg>
        </div>

        <!-- Paginación personalizada -->
        <div
          class="swiper-pagination-custom flex justify-center mt-8 space-x-2"
        ></div>
      </div>
    </div>

    <!-- Círculo decorativo -->
    <div
      class="bg-neutral h-32 w-32 rounded-full absolute -top-10 -right-10 -z-10 opacity-50"
    ></div>
  </div>
</template>

<script>
import portraitImg from "~/assets/carousel/horses.webp";
import weddingImg from "~/assets/carousel/wedding.webp";
import landscapeImg from "~/assets/carousel/landscape.webp";
import eventsImg from "~/assets/carousel/events.webp";
import fashionImg from "~/assets/carousel/fashion.webp";
import familyImg from "~/assets/carousel/family.webp";
import climbImg from "~/assets/carousel/climb.webp"
import landscapeWaterImg from "~/assets/carousel/landscapeWater.webp"
import montainImg from "~/assets/carousel/mountain-climbing.webp"
import veneciaImg from "~/assets/carousel/venecia.webp"

export default {
  name: "ImageCarousel",
  data() {
    return {
      swiper: null,
      images: [],
    };
  },
  async mounted() {
    this.loadImages();
    await this.initSwiper();

    // Listen for storage changes to update carousel dynamically
    window.addEventListener('storage', this.handleStorageChange);
  },
  beforeUnmount() {
    if (this.swiper) {
      this.swiper.destroy(true, true);
    }
    window.removeEventListener('storage', this.handleStorageChange);
  },
  methods: {
    loadImages() {
      // Static images
      const staticImages = [
        {
          src: weddingImg,
          alt: "Wedding Photography 1",
          title: "Romantic Wedding",
          description: "Beautiful moments captured on their special day",
          category: "Wedding",
        },
        {
          src: portraitImg,
          alt: "Portrait Photography",
          title: "Professional Portrait",
          description: "Stunning professional headshots and portraits",
          category: "Portrait",
        },
        {
          src: landscapeImg,
          alt: "Landscape Photography",
          title: "Nature Landscape",
          description: "Breathtaking natural landscapes and scenery",
          category: "Landscape",
        },
        {
          src: eventsImg,
          alt: "Event Photography",
          title: "Corporate Event",
          description: "Professional event and corporate photography",
          category: "Events",
        },
        {
          src: fashionImg,
          alt: "Fashion Photography",
          title: "Fashion Shoot",
          description: "High-end fashion and lifestyle photography",
          category: "Fashion",
        },
        {
          src: familyImg,
          alt: "Family Photography",
          title: "Family Moments",
          description: "Precious family memories captured forever",
          category: "Family",
        },
        {
          src: climbImg,
          alt: "Climb Photography",
          title: "Beautiful Moments",
          description: "Precious motains memories captured forever",
          category: "Montain",
        },
        {
          src: landscapeWaterImg,
          alt: "Climb Photography",
          title: "Beautiful Moments",
          description: "Precious motains memories captured forever",
          category: "Montain",
        },
        {
          src: montainImg,
          alt: "Climb Photography",
          title: "Beautiful Moments",
          description: "Precious motains memories captured forever",
          category: "Montain",
        },
        {
          src: veneciaImg,
          alt: "Climb Photography",
          title: "Beautiful Moments",
          description: "Precious motains memories captured forever",
          category: "Montain",
        },
      ];

      // Load uploaded images from localStorage
      const uploadedImages = JSON.parse(localStorage.getItem('uploadedImages') || '[]');

      // Transform uploaded images to carousel format
      const transformedUploadedImages = uploadedImages.map(img => ({
        src: img.url,
        alt: img.name || 'Uploaded Image',
        title: img.name || 'Custom Image',
        description: `Imagen personalizada - ${img.dimensions || 'Sin dimensiones'}`,
        category: "Custom",
      }));

      // Combine static and uploaded images
      this.images = [...staticImages, ...transformedUploadedImages];

      console.log('Carousel images loaded:', this.images.length);
    },

    handleStorageChange(event) {
      if (event.key === 'uploadedImages') {
        console.log('Uploaded images changed, updating carousel...');
        this.loadImages();
        // Reinitialize swiper with new images
        this.$nextTick(() => {
          if (this.swiper) {
            this.swiper.destroy(true, true);
          }
          this.initSwiper();
        });
      }
    },
    async initSwiper() {
      try {
        // Importación dinámica para Nuxt
        const { Swiper } = await import("swiper");
        const { Navigation, Pagination, Autoplay } = await import(
          "swiper/modules"
        );

        // Importar estilos
        await import("swiper/css");
        await import("swiper/css/navigation");
        await import("swiper/css/pagination");

        this.swiper = new Swiper(this.$refs.swiperContainer, {
          modules: [Navigation, Pagination, Autoplay],
          slidesPerView: 1,
          spaceBetween: 20,
          loop: true,
          centeredSlides: true,
          autoplay: {
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          },
          navigation: {
            nextEl: ".swiper-button-next-custom",
            prevEl: ".swiper-button-prev-custom",
          },
          pagination: {
            el: ".swiper-pagination-custom",
            clickable: true,
            renderBullet: function (index, className) {
              return `<span class="${className} w-3 h-3 bg-gray-300 rounded-full cursor-pointer transition-all duration-300 hover:bg-gray-500"></span>`;
            },
          },
          breakpoints: {
            640: {
              slidesPerView: 1.5,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
            1024: {
              slidesPerView: 2.5,
              spaceBetween: 30,
            },
            1280: {
              slidesPerView: 3,
              spaceBetween: 40,
            },
          },
          speed: 800,
          effect: "slide",
          grabCursor: true,
          watchOverflow: true,
          // Configuraciones adicionales para prevenir overflow
          watchSlidesProgress: true,
          watchSlidesVisibility: true,
          preventInteractionOnTransition: true,
          resistance: true,
          resistanceRatio: 0.85,
        });
      } catch (error) {
        console.error("Error initializing Swiper:", error);
      }
    },
    handleImageError(event) {
      // Fallback en caso de error de imagen
      event.target.src =
        "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDgwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI4MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0zOTkuNSAyMDBMMzUwIDI1MEg0NTBMMzk5LjUgMjAwWiIgZmlsbD0iIzlDQTNBRiIvPgo8L3N2Zz4K";
    },
  },
};
</script>

<style scoped>
/* Contenedor principal sin overflow */
.image-carousel-container {
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

/* Contenedor del carrusel con límites */
.relative.max-w-7xl {
  max-width: 100%;
  overflow: hidden;
}

/* Personalización de la paginación */
:deep(.swiper-pagination-custom .swiper-pagination-bullet) {
  background: var(--color-gray-300);
  opacity: 1;
  margin: 0 4px;
  transition: all var(--transition-fast);
}

:deep(.swiper-pagination-custom .swiper-pagination-bullet:hover) {
  background: var(--color-gray-500);
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
  .image-carousel-container {
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
