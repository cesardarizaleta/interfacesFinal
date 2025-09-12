 <template>
  <navbar-element></navbar-element>

  <section class="services-section">
    <div class="services-container">
      <div class="services-header">
        <h1 class="brand-title">LANDING</h1>
        <p class="brand-subtitle">PHOTOGRAPHY</p>
      </div>

      <div class="services-content">
        <h2>Nuestros Servicios</h2>
        <p>Ofrecemos una amplia gama de servicios fotográficos para todas tus necesidades</p>

        <div class="services-grid">
          <div class="service-card">
            <div class="service-icon">
              <img src="~/assets/services/wedding.png" alt="Bodas" />
            </div>
            <h3>Fotografía de Bodas</h3>
            <p>
              Capturamos los momentos más especiales de tu día especial.
              Desde la preparación hasta el último baile, documentamos cada
              instante con elegancia y profesionalismo.
            </p>
            <ul class="service-features">
              <li>Sesión de compromiso incluida</li>
              <li>Álbum digital de alta resolución</li>
              <li>Cobertura completa del evento</li>
              <li>Entrega en 2-3 semanas</li>
            </ul>
          </div>

          <div class="service-card">
            <div class="service-icon">
              <img src="~/assets/services/moments.png" alt="Momentos" />
            </div>
            <h3>Sesiones de Retratos</h3>
            <p>
              Sesiones personalizadas para capturar tu esencia única.
              Ya sea para tu perfil profesional, familiar o personal,
              creamos imágenes que te representan.
            </p>
            <ul class="service-features">
              <li>Consultoría de estilo incluida</li>
              <li>Múltiples looks y ubicaciones</li>
              <li>Retoque profesional</li>
              <li>Entrega digital inmediata</li>
            </ul>
          </div>

          <div class="service-card">
            <div class="service-icon">
              <img src="~/assets/services/lifestyle.png" alt="Estilo de Vida" />
            </div>
            <h3>Eventos Corporativos</h3>
            <p>
              Documentamos conferencias, lanzamientos de productos,
              eventos corporativos y celebraciones empresariales
              con un enfoque profesional y dinámico.
            </p>
            <ul class="service-features">
              <li>Cobertura en vivo opcional</li>
              <li>Imágenes para redes sociales</li>
              <li>Entrega rápida de imágenes</li>
              <li>Paquete de marketing digital</li>
            </ul>
          </div>
        </div>
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
.services-section {
  min-height: 100vh;
  background: var(--background-neutral);
  padding: 2rem 0;
}

.services-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.services-header {
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

.services-content {
  text-align: center;
}

.services-content h2 {
  font-size: 2.5rem;
  color: var(--color-text);
  margin: 0 0 1rem 0;
}

.services-content > p {
  font-size: 1.2rem;
  color: var(--color-text);
  margin: 0 0 3rem 0;
  opacity: 0.8;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.service-card {
  background: var(--color-secondary);
  border-radius: 0.5rem;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border: 1px solid var(--color-accent);
  transition: transform 0.3s ease;
}

.service-card:hover {
  transform: translateY(-5px);
}

.service-icon {
  width: 80px;
  height: 80px;
  margin: 0 auto 1.5rem auto;
  display: flex;
  align-items: center;
  justify-content: center;
}

.service-icon img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.service-card h3 {
  font-size: 1.5rem;
  color: var(--color-text);
  margin: 0 0 1rem 0;
  font-weight: 600;
}

.service-card p {
  font-size: 1rem;
  line-height: 1.6;
  color: var(--color-text);
  margin: 0 0 1.5rem 0;
  opacity: 0.8;
}

.service-features {
  list-style: none;
  padding: 0;
  margin: 0;
  text-align: left;
}

.service-features li {
  font-size: 0.9rem;
  color: var(--color-text);
  margin: 0 0 0.5rem 0;
  padding-left: 1.2rem;
  position: relative;
}

.service-features li:before {
  content: "✓";
  color: var(--color-primary);
  font-weight: bold;
  position: absolute;
  left: 0;
}

@media (max-width: 768px) {
  .services-container {
    padding: 0 1rem;
  }

  .services-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .brand-title {
    font-size: 2.5rem;
  }

  .services-content h2 {
    font-size: 2rem;
  }

  .service-card {
    padding: 1.5rem;
  }
}
</style>
