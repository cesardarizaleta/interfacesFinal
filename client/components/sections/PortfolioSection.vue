<template>
  <section class="portfolio-section">
    <div class="portfolio-container">
      <!-- Section Header -->
      <div class="section-header">
        <div class="section-badge">
          <Icon name="heroicons:photo" class="icon" />
          <span>Our Portfolio</span>
        </div>
        <h2 class="section-title">
          Captured <span class="title-accent">Moments</span> of Beauty
        </h2>
        <p class="section-subtitle">
          Explore our diverse collection of photography work across different styles and occasions. Each image tells a unique story.
        </p>
      </div>

      <!-- Filter Buttons -->
      <div class="filter-buttons">
        <button
          v-for="filter in filters"
          :key="filter.id"
          :class="['filter-btn', { active: activeFilter === filter.id }]"
          @click="setActiveFilter(filter.id)"
        >
          <i :class="filter.icon"></i>
          <span>{{ filter.label }}</span>
        </button>
      </div>

      <!-- Portfolio Grid -->
      <div class="portfolio-grid">
        <div
          v-for="item in filteredItems"
          :key="item.id"
          class="portfolio-item"
          @click="openLightbox(item)"
        >
          <div class="portfolio-image-container">
            <img :src="item.image" :alt="item.title" class="portfolio-image">
            <div class="portfolio-overlay">
              <div class="overlay-content">
                <div class="item-category">{{ item.category }}</div>
                <h3 class="item-title">{{ item.title }}</h3>
                <div class="view-icon">
                  <i class="fas fa-eye"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Load More Button -->
      <div class="load-more-container">
        <button class="load-more-btn" @click="loadMore">
          <span>Load More Photos</span>
          <i class="fas fa-plus"></i>
        </button>
      </div>

      <!-- Lightbox Modal -->
      <div v-if="lightboxOpen" class="lightbox-overlay" @click="closeLightbox">
        <div class="lightbox-content" @click.stop>
          <button class="lightbox-close" @click="closeLightbox">
            <i class="fas fa-times"></i>
          </button>
          <button class="lightbox-nav prev" @click="prevImage" :disabled="currentImageIndex === 0">
            <i class="fas fa-chevron-left"></i>
          </button>
          <button class="lightbox-nav next" @click="nextImage" :disabled="currentImageIndex === filteredItems.length - 1">
            <i class="fas fa-chevron-right"></i>
          </button>
          <img :src="currentImage.image" :alt="currentImage.title" class="lightbox-image">
          <div class="lightbox-info">
            <h3 class="lightbox-title">{{ currentImage.title }}</h3>
            <p class="lightbox-category">{{ currentImage.category }}</p>
          </div>
        </div>
      </div>

      <!-- Background Elements -->
      <div class="bg-shape shape-1"></div>
      <div class="bg-shape shape-2"></div>
      <div class="bg-shape shape-3"></div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import portfolio1Img from '~/assets/portfolio/portfolio1.jpg'
import portfolio2Img from '~/assets/portfolio/portfolio2.jpg'
import portfolio3Img from '~/assets/portfolio/portfolio3.jpg'
import portfolio4Img from '~/assets/portfolio/portfolio4.jpg'
import portfolio5Img from '~/assets/portfolio/portfolio5.jpg'
import portfolio6Img from '~/assets/portfolio/portfolio6.jpg'
import portfolio7Img from '~/assets/portfolio/portfolio7.jpg'
import portfolio8Img from '~/assets/portfolio/portfolio8.jpg'
import portfolio9Img from '~/assets/portfolio/portfolio9.jpg'
import portfolio10Img from '~/assets/portfolio/portfolio10.jpg'

interface PortfolioItem {
  id: number
  title: string
  category: string
  image: string
}

interface Filter {
  id: string
  label: string
  icon: string
}

// Reactive data
const activeFilter = ref('all')
const lightboxOpen = ref(false)
const currentImageIndex = ref(0)
const itemsPerPage = ref(9)
const currentPage = ref(1)

// Portfolio items data
const portfolioItems = ref<PortfolioItem[]>([
  { id: 1, title: 'Wedding Ceremony', category: 'Wedding', image: portfolio1Img },
  { id: 2, title: 'Bridal Portrait', category: 'Wedding', image: portfolio2Img },
  { id: 3, title: 'Family Gathering', category: 'Family', image: portfolio3Img },
  { id: 4, title: 'Portrait Session', category: 'Portrait', image: portfolio4Img },
  { id: 5, title: 'Landscape View', category: 'Landscape', image: portfolio5Img },
  { id: 6, title: 'Event Photography', category: 'Events', image: portfolio6Img },
  { id: 7, title: 'Fashion Shoot', category: 'Fashion', image: portfolio7Img },
  { id: 8, title: 'Nature Photography', category: 'Landscape', image: portfolio8Img },
  { id: 9, title: 'Corporate Event', category: 'Events', image: portfolio9Img },
  { id: 10, title: 'Lifestyle Portrait', category: 'Portrait', image: portfolio10Img }
])

// Filter options
const filters = ref<Filter[]>([
  { id: 'all', label: 'All', icon: 'fas fa-th' },
  { id: 'wedding', label: 'Wedding', icon: 'fas fa-heart' },
  { id: 'portrait', label: 'Portrait', icon: 'fas fa-user' },
  { id: 'events', label: 'Events', icon: 'fas fa-calendar' },
  { id: 'landscape', label: 'Landscape', icon: 'fas fa-mountain' },
  { id: 'fashion', label: 'Fashion', icon: 'fas fa-tshirt' }
])

// Computed properties
const filteredItems = computed(() => {
  if (activeFilter.value === 'all') {
    return portfolioItems.value.slice(0, itemsPerPage.value * currentPage.value)
  }
  return portfolioItems.value
    .filter(item => item.category.toLowerCase() === activeFilter.value)
    .slice(0, itemsPerPage.value * currentPage.value)
})

const currentImage = computed(() => {
  return filteredItems.value[currentImageIndex.value] || portfolioItems.value[0]
})

// Methods
const setActiveFilter = (filterId: string) => {
  activeFilter.value = filterId
  currentPage.value = 1
  currentImageIndex.value = 0
}

const openLightbox = (item: PortfolioItem) => {
  const index = filteredItems.value.findIndex(img => img.id === item.id)
  currentImageIndex.value = index
  lightboxOpen.value = true
  document.body.style.overflow = 'hidden'
}

const closeLightbox = () => {
  lightboxOpen.value = false
  document.body.style.overflow = 'auto'
}

const prevImage = () => {
  if (currentImageIndex.value > 0) {
    currentImageIndex.value--
  }
}

const nextImage = () => {
  if (currentImageIndex.value < filteredItems.value.length - 1) {
    currentImageIndex.value++
  }
}

const loadMore = () => {
  currentPage.value++
}

// Keyboard navigation
const handleKeydown = (event: KeyboardEvent) => {
  if (!lightboxOpen.value) return

  switch (event.key) {
    case 'Escape':
      closeLightbox()
      break
    case 'ArrowLeft':
      prevImage()
      break
    case 'ArrowRight':
      nextImage()
      break
  }
}

// Lifecycle
onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

// Cleanup
const cleanup = () => {
  document.removeEventListener('keydown', handleKeydown)
}

// Expose cleanup for component unmount
defineExpose({ cleanup })
</script>

<style scoped>
.portfolio-section {
  padding: var(--spacing-4xl) 0;
  background: var(--bg-page);
  position: relative;
  overflow: hidden;
}

.portfolio-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--spacing-lg);
}

/* Section Header */
.section-header {
  text-align: center;
  margin-bottom: var(--spacing-4xl);
}

.section-badge {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-xs);
  background: rgba(16, 185, 129, 0.1);
  color: var(--color-success);
  padding: var(--spacing-xs) var(--spacing-md);
  border-radius: var(--radius-full);
  font-size: var(--text-xs);
  font-weight: var(--font-semibold);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: var(--spacing-lg);
  border: 1px solid rgba(16, 185, 129, 0.2);
}

.section-badge i {
  font-size: var(--text-sm);
}

.section-title {
  font-family: var(--font-heading);
  font-size: clamp(var(--text-3xl), 4vw, var(--text-5xl));
  font-weight: var(--font-black);
  line-height: 1.2;
  color: var(--text-primary);
  margin-bottom: var(--spacing-lg);
  letter-spacing: -0.02em;
}

.title-accent {
  background: linear-gradient(135deg, var(--color-success), var(--color-primary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  position: relative;
}

.title-accent::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: linear-gradient(135deg, var(--color-success), var(--color-primary));
  border-radius: var(--radius-sm);
  opacity: 0.3;
}

.section-subtitle {
  font-size: var(--text-lg);
  line-height: 1.6;
  color: var(--text-secondary);
  max-width: 600px;
  margin: 0 auto;
}

/* Filter Buttons */
.filter-buttons {
  display: flex;
  justify-content: center;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-3xl);
  flex-wrap: wrap;
}

.filter-btn {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-md) var(--spacing-xl);
  background: var(--bg-card);
  border: 2px solid var(--border-light);
  border-radius: var(--radius-lg);
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  color: var(--text-secondary);
  cursor: pointer;
  transition: all var(--transition-fast);
  box-shadow: var(--shadow-sm);
}

.filter-btn:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.filter-btn.active {
  background: linear-gradient(135deg, var(--color-primary), var(--color-primary-dark));
  color: white;
  border-color: var(--color-primary);
  box-shadow: var(--shadow-md);
}

.filter-btn.active:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.filter-btn i {
  font-size: var(--text-base);
}

/* Portfolio Grid */
.portfolio-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: var(--spacing-xl);
  margin-bottom: var(--spacing-3xl);
}

/* Portfolio Items */
.portfolio-item {
  cursor: pointer;
  border-radius: var(--radius-xl);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  transition: all var(--transition-normal);
  position: relative;
}

.portfolio-item:hover {
  transform: translateY(-10px);
  box-shadow: var(--shadow-xl);
}

.portfolio-image-container {
  position: relative;
  height: 280px;
  overflow: hidden;
}

.portfolio-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--transition-slow);
}

.portfolio-item:hover .portfolio-image {
  transform: scale(1.1);
}

.portfolio-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, rgba(59, 130, 246, 0.9), rgba(245, 158, 11, 0.9));
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity var(--transition-normal);
}

.portfolio-item:hover .portfolio-overlay {
  opacity: 1;
}

.overlay-content {
  text-align: center;
  color: white;
  padding: var(--spacing-lg);
}

.item-category {
  font-size: var(--text-xs);
  font-weight: var(--font-semibold);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: var(--spacing-sm);
  opacity: 0.9;
}

.item-title {
  font-family: var(--font-heading);
  font-size: var(--text-xl);
  font-weight: var(--font-bold);
  margin-bottom: var(--spacing-lg);
  line-height: 1.2;
}

.view-icon {
  width: 48px;
  height: 48px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: var(--radius-full);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--text-xl);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
}

/* Load More Button */
.load-more-container {
  text-align: center;
  margin-bottom: var(--spacing-4xl);
}

.load-more-btn {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-sm);
  background: linear-gradient(135deg, var(--color-primary), var(--color-primary-dark));
  color: white;
  padding: var(--spacing-md) var(--spacing-xl);
  border-radius: var(--radius-lg);
  font-size: var(--text-base);
  font-weight: var(--font-semibold);
  border: none;
  cursor: pointer;
  transition: all var(--transition-fast);
  box-shadow: var(--shadow-md);
  position: relative;
  overflow: hidden;
}

.load-more-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left var(--transition-normal);
}

.load-more-btn:hover::before {
  left: 100%;
}

.load-more-btn:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-xl);
}

.load-more-btn i {
  transition: transform var(--transition-fast);
}

.load-more-btn:hover i {
  transform: rotate(90deg);
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
  backdrop-filter: blur(5px);
}

.lightbox-content {
  position: relative;
  max-width: 90vw;
  max-height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.lightbox-close {
  position: absolute;
  top: -50px;
  right: 0;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: var(--radius-full);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all var(--transition-fast);
  backdrop-filter: blur(10px);
}

.lightbox-close:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: scale(1.1);
}

.lightbox-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: none;
  width: 50px;
  height: 50px;
  border-radius: var(--radius-full);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all var(--transition-fast);
  backdrop-filter: blur(10px);
  font-size: var(--text-lg);
}

.lightbox-nav:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-50%) scale(1.1);
}

.lightbox-nav:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.lightbox-nav.prev {
  left: -70px;
}

.lightbox-nav.next {
  right: -70px;
}

.lightbox-image {
  max-width: 100%;
  max-height: 80vh;
  object-fit: contain;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-2xl);
}

.lightbox-info {
  position: absolute;
  bottom: -80px;
  left: 0;
  right: 0;
  text-align: center;
  color: white;
}

.lightbox-title {
  font-family: var(--font-heading);
  font-size: var(--text-xl);
  font-weight: var(--font-bold);
  margin-bottom: var(--spacing-xs);
}

.lightbox-category {
  font-size: var(--text-sm);
  opacity: 0.8;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

/* Background Shapes */
.bg-shape {
  position: absolute;
  border-radius: var(--radius-full);
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(59, 130, 246, 0.1));
  animation: float 6s ease-in-out infinite;
}

.bg-shape.shape-1 {
  width: 250px;
  height: 250px;
  top: 15%;
  left: -5%;
  animation-delay: 0s;
}

.bg-shape.shape-2 {
  width: 180px;
  height: 180px;
  bottom: 25%;
  right: -3%;
  animation-delay: 2s;
}

.bg-shape.shape-3 {
  width: 120px;
  height: 120px;
  top: 50%;
  left: 15%;
  animation-delay: 4s;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
}

/* Responsive Design */
@media (max-width: 1024px) {
  .portfolio-grid {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: var(--spacing-lg);
  }

  .lightbox-nav {
    width: 40px;
    height: 40px;
  }

  .lightbox-nav.prev {
    left: -50px;
  }

  .lightbox-nav.next {
    right: -50px;
  }
}

@media (max-width: 768px) {
  .portfolio-section {
    padding: var(--spacing-3xl) 0;
  }

  .portfolio-container {
    padding: 0 var(--spacing-md);
  }

  .section-title {
    font-size: clamp(var(--text-2xl), 6vw, var(--text-4xl));
  }

  .filter-buttons {
    gap: var(--spacing-sm);
  }

  .filter-btn {
    padding: var(--spacing-sm) var(--spacing-lg);
    font-size: var(--text-xs);
  }

  .portfolio-grid {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: var(--spacing-md);
  }

  .portfolio-image-container {
    height: 220px;
  }

  .lightbox-content {
    max-width: 95vw;
    max-height: 95vh;
  }

  .lightbox-close {
    top: -40px;
    width: 35px;
    height: 35px;
  }

  .lightbox-nav {
    display: none;
  }

  .lightbox-info {
    bottom: -60px;
  }

  .bg-shape {
    display: none;
  }
}

@media (max-width: 480px) {
  .section-header {
    margin-bottom: var(--spacing-3xl);
  }

  .filter-buttons {
    flex-direction: column;
    align-items: center;
  }

  .filter-btn {
    width: 100%;
    max-width: 200px;
    justify-content: center;
  }

  .portfolio-grid {
    grid-template-columns: 1fr;
  }

  .portfolio-image-container {
    height: 250px;
  }

  .overlay-content {
    padding: var(--spacing-md);
  }

  .item-title {
    font-size: var(--text-lg);
  }
}
</style>