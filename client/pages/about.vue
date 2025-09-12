<template>
  <navbar-element></navbar-element>

  <section class="about-section">
    <div class="about-container">
      <div class="about-header">
        <h1 class="brand-title">LANDING</h1>
        <p class="brand-subtitle">PHOTOGRAPHY</p>
      </div>

      <div class="about-content">
        <h2>Sobre Nosotros</h2>
        <p>
          Somos un equipo apasionado de fotógrafos profesionales dedicados a capturar
          los momentos más importantes de tu vida. Con años de experiencia en el arte
          de la fotografía, nos especializamos en bodas, retratos, eventos corporativos
          y sesiones familiares.
        </p>
        <p>
          Nuestra misión es crear imágenes que no solo documenten momentos, sino que
          también cuenten historias y preserven recuerdos para toda la vida.
        </p>
      </div>
    </div>
  </section>

  <footer-element></footer-element>
  <palette-loader></palette-loader>
</template>

<script setup>
import NavbarElement from "@/components/navigation/NavbarElement.vue";
import FooterElement from "@/components/navigation/FooterElement.vue";
import PaletteLoader from "@/components/ui/PaletteLoader.vue";
import "@/style/style.css";
</script>

<style scoped>
.about-section {
  min-height: 100vh;
  background: var(--background-neutral);
  padding: 2rem 0;
}

.about-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.about-header {
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

.about-content {
  background: var(--color-secondary);
  border-radius: 0.5rem;
  padding: 3rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border: 1px solid var(--color-accent);
}

.about-content h2 {
  font-size: 2.5rem;
  color: var(--color-primary);
  margin: 0 0 2rem 0;
  text-align: center;
}

.about-content p {
  font-size: 1.1rem;
  line-height: 1.6;
  color: var(--color-text);
  margin: 0 0 1.5rem 0;
  text-align: justify;
}

@media (max-width: 768px) {
  .about-container {
    padding: 0 1rem;
  }

  .about-content {
    padding: 2rem 1.5rem;
  }

  .brand-title {
    font-size: 2.5rem;
  }

  .about-content h2 {
    font-size: 2rem;
  }
}
</style>
