<template>
  <navbar-element></navbar-element>

  <section class="portfolio-section">
    <div class="portfolio-container">
      <div class="portfolio-header">
        <h1 class="brand-title">LANDING</h1>
        <p class="brand-subtitle">PHOTOGRAPHY</p>
      </div>

      <div class="portfolio-content">
        <h2>Nuestro Portafolio</h2>
        <p>Descubre nuestra colección de trabajos fotográficos</p>

        <div class="portfolio-grid">
          <div class="portfolio-item" v-for="image in portfolioImages" :key="image.id">
            <img :src="image.src" :alt="image.alt" class="portfolio-image" />
            <div class="portfolio-overlay">
              <h3>{{ image.title }}</h3>
              <p>{{ image.category }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <footer-element></footer-element>
  <palette-loader></palette-loader>
</template>

<script setup>
import { ref } from 'vue'
import NavbarElement from "@/components/navigation/NavbarElement.vue";
import FooterElement from "@/components/navigation/FooterElement.vue";
import PaletteLoader from "@/components/ui/PaletteLoader.vue";
import "@/style/style.css";

const portfolioImages = ref([
  {
    id: 1,
    src: '/portfolio/portfolio1.jpg',
    alt: 'Sesión de fotos de boda',
    title: 'Boda Elegante',
    category: 'Bodas'
  },
  {
    id: 2,
    src: '/portfolio/portfolio2.jpg',
    alt: 'Retrato familiar',
    title: 'Familia Feliz',
    category: 'Retratos'
  },
  {
    id: 3,
    src: '/portfolio/portfolio3.jpg',
    alt: 'Evento corporativo',
    title: 'Conferencia Anual',
    category: 'Eventos'
  },
  {
    id: 4,
    src: '/portfolio/portfolio4.jpg',
    alt: 'Sesión de fotos de maternidad',
    title: 'Maternidad',
    category: 'Retratos'
  },
  {
    id: 5,
    src: '/portfolio/portfolio5.jpg',
    alt: 'Boda al atardecer',
    title: 'Atardecer Romántico',
    category: 'Bodas'
  },
  {
    id: 6,
    src: '/portfolio/portfolio6.jpg',
    alt: 'Graduación universitaria',
    title: 'Graduación 2024',
    category: 'Eventos'
  }
])
</script>

<style scoped>
.portfolio-section {
  min-height: 100vh;
  background: var(--bg-page);
  padding: 2rem 0;
}

.portfolio-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.portfolio-header {
  text-align: center;
  margin-bottom: 3rem;
}

.brand-title {
  font-size: 3rem;
  font-weight: 700;
  color: var(--color-primary);
  margin: 0;
  letter-spacing: 0.1em;
}

.brand-subtitle {
  font-size: 1.2rem;
  color: var(--color-text);
  margin: 0.5rem 0 0 0;
  letter-spacing: 0.2em;
  font-weight: 300;
}

.portfolio-content {
  text-align: center;
}

.portfolio-content h2 {
  font-size: 2.5rem;
  color: var(--color-text);
  margin: 0 0 1rem 0;
}

.portfolio-content > p {
  font-size: 1.2rem;
  color: var(--color-text);
  margin: 0 0 3rem 0;
  opacity: 0.8;
}

.portfolio-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.portfolio-item {
  position: relative;
  border-radius: var(--radius);
  overflow: hidden;
  box-shadow: 0 4px 6px var(--shadow-primary);
  transition: transform var(--transition-fast);
  cursor: pointer;
}

.portfolio-item:hover {
  transform: translateY(-5px);
}

.portfolio-image {
  width: 100%;
  height: 250px;
  object-fit: cover;
  display: block;
}

.portfolio-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
  padding: 2rem 1rem 1rem 1rem;
  color: white;
}

.portfolio-overlay h3 {
  font-size: 1.2rem;
  margin: 0 0 0.5rem 0;
  font-weight: 600;
}

.portfolio-overlay p {
  font-size: 0.9rem;
  margin: 0;
  opacity: 0.9;
}

@media (max-width: 768px) {
  .portfolio-container {
    padding: 0 1rem;
  }

  .portfolio-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .brand-title {
    font-size: 2.5rem;
  }

  .portfolio-content h2 {
    font-size: 2rem;
  }
}
</style>
