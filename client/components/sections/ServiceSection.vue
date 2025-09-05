<template>
  <section class="services-section">
    <div class="services-container">
      <!-- Section Header -->
      <div class="section-header">
        <div class="section-badge">
          <i class="fas fa-concierge-bell"></i>
          <span>Our Services</span>
        </div>
        <h2 class="section-title">
          Professional <span class="title-accent">Photography</span> Services
        </h2>
        <p class="section-subtitle">
          We offer comprehensive photography services tailored to capture your most precious moments with creativity and professionalism.
        </p>
      </div>

      <!-- Services Grid -->
      <div class="services-grid">
        <!-- Wedding Service -->
        <div class="service-card">
          <div class="service-icon">
            <i class="fas fa-heart"></i>
          </div>
          <div class="service-image-container">
            <img src="~/assets/services/wedding.png" alt="Wedding Photography" class="service-image">
            <div class="service-overlay"></div>
          </div>
          <div class="service-content">
            <h3 class="service-title">Wedding Photography</h3>
            <p class="service-description">
              Capture the magic of your special day with our expert wedding photography. From intimate ceremonies to grand celebrations, we document every precious moment.
            </p>
            <div class="service-features">
              <span class="feature-tag">Full Day Coverage</span>
              <span class="feature-tag">Engagement Session</span>
              <span class="feature-tag">Online Gallery</span>
            </div>
          </div>
        </div>

        <!-- Lifestyle Service -->
        <div class="service-card">
          <div class="service-icon">
            <i class="fas fa-camera"></i>
          </div>
          <div class="service-image-container">
            <img src="~/assets/services/lifestyle.png" alt="Lifestyle Photography" class="service-image">
            <div class="service-overlay"></div>
          </div>
          <div class="service-content">
            <h3 class="service-title">Lifestyle Photography</h3>
            <p class="service-description">
              Natural, authentic photography that tells your unique story. Perfect for family portraits, personal branding, and lifestyle documentation.
            </p>
            <div class="service-features">
              <span class="feature-tag">Natural Settings</span>
              <span class="feature-tag">Personal Branding</span>
              <span class="feature-tag">Family Portraits</span>
            </div>
          </div>
        </div>

        <!-- Moments Service -->
        <div class="service-card">
          <div class="service-icon">
            <i class="fas fa-clock"></i>
          </div>
          <div class="service-image-container">
            <img src="~/assets/services/moments.png" alt="Special Moments Photography" class="service-image">
            <div class="service-overlay"></div>
          </div>
          <div class="service-content">
            <h3 class="service-title">Special Moments</h3>
            <p class="service-description">
              Preserve life's fleeting moments with our specialized photography. Birthdays, anniversaries, corporate events, and milestone celebrations.
            </p>
            <div class="service-features">
              <span class="feature-tag">Event Coverage</span>
              <span class="feature-tag">Corporate Events</span>
              <span class="feature-tag">Milestone Moments</span>
            </div>
          </div>
        </div>
      </div>

      <!-- CTA Section -->
      <div class="services-cta">
        <div class="cta-content">
          <h3 class="cta-title">Ready to Book Your Session?</h3>
          <p class="cta-text">Contact us today to discuss your photography needs and create unforgettable memories.</p>
          <div class="cta-buttons">
            <a href="#contact" class="cta-button primary">
              <span>Get Quote</span>
              <i class="fas fa-arrow-right"></i>
            </a>
            <a href="#portfolio" class="cta-button secondary">
              <span>View Portfolio</span>
              <i class="fas fa-images"></i>
            </a>
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

<style scoped>
.services-section {
  padding: var(--spacing-4xl) 0;
  background: var(--bg-page);
  position: relative;
  overflow: hidden;
}

.services-container {
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
  background: rgba(245, 158, 11, 0.1);
  color: var(--color-accent);
  padding: var(--spacing-xs) var(--spacing-md);
  border-radius: var(--radius-full);
  font-size: var(--text-xs);
  font-weight: var(--font-semibold);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: var(--spacing-lg);
  border: 1px solid rgba(245, 158, 11, 0.2);
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
  background: linear-gradient(135deg, var(--color-accent), var(--color-primary));
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
  background: linear-gradient(135deg, var(--color-accent), var(--color-primary));
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

/* Services Grid */
.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: var(--spacing-2xl);
  margin-bottom: var(--spacing-4xl);
}

/* Service Cards */
.service-card {
  background: var(--bg-card);
  border-radius: var(--radius-2xl);
  border: 1px solid var(--border-light);
  box-shadow: var(--shadow-sm);
  overflow: hidden;
  transition: all var(--transition-normal);
  position: relative;
}

.service-card:hover {
  transform: translateY(-10px);
  box-shadow: var(--shadow-xl);
  border-color: var(--color-primary);
}

.service-icon {
  position: absolute;
  top: var(--spacing-lg);
  right: var(--spacing-lg);
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
  border-radius: var(--radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: var(--text-xl);
  z-index: 2;
  box-shadow: var(--shadow-md);
}

.service-image-container {
  position: relative;
  height: 250px;
  overflow: hidden;
}

.service-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--transition-slow);
}

.service-card:hover .service-image {
  transform: scale(1.1);
}

.service-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, rgba(59, 130, 246, 0.1), rgba(245, 158, 11, 0.1));
  opacity: 0;
  transition: opacity var(--transition-normal);
}

.service-card:hover .service-overlay {
  opacity: 1;
}

.service-content {
  padding: var(--spacing-2xl);
}

.service-title {
  font-family: var(--font-heading);
  font-size: var(--text-2xl);
  font-weight: var(--font-bold);
  color: var(--text-primary);
  margin-bottom: var(--spacing-md);
}

.service-description {
  font-size: var(--text-base);
  line-height: 1.6;
  color: var(--text-secondary);
  margin-bottom: var(--spacing-xl);
}

.service-features {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-sm);
}

.feature-tag {
  background: rgba(59, 130, 246, 0.1);
  color: var(--color-primary);
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--radius-sm);
  font-size: var(--text-xs);
  font-weight: var(--font-medium);
  border: 1px solid rgba(59, 130, 246, 0.2);
}

/* CTA Section */
.services-cta {
  background: linear-gradient(135deg, var(--bg-secondary), var(--bg-card));
  border-radius: var(--radius-2xl);
  padding: var(--spacing-3xl);
  text-align: center;
  border: 1px solid var(--border-light);
  box-shadow: var(--shadow-lg);
  position: relative;
  overflow: hidden;
}

.services-cta::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, rgba(245, 158, 11, 0.05), rgba(59, 130, 246, 0.05));
  pointer-events: none;
}

.cta-content {
  position: relative;
  z-index: 1;
}

.cta-title {
  font-family: var(--font-heading);
  font-size: var(--text-2xl);
  font-weight: var(--font-bold);
  color: var(--text-primary);
  margin-bottom: var(--spacing-md);
}

.cta-text {
  font-size: var(--text-base);
  color: var(--text-secondary);
  margin-bottom: var(--spacing-2xl);
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
}

.cta-buttons {
  display: flex;
  gap: var(--spacing-md);
  justify-content: center;
  flex-wrap: wrap;
}

.cta-button {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-md) var(--spacing-xl);
  border-radius: var(--radius-lg);
  font-size: var(--text-base);
  font-weight: var(--font-semibold);
  text-decoration: none;
  transition: all var(--transition-fast);
  position: relative;
  overflow: hidden;
}

.cta-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left var(--transition-normal);
}

.cta-button:hover::before {
  left: 100%;
}

.cta-button.primary {
  background: linear-gradient(135deg, var(--color-primary), var(--color-primary-dark));
  color: white;
  box-shadow: var(--shadow-md);
}

.cta-button.primary:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-xl);
}

.cta-button.secondary {
  background: transparent;
  color: var(--text-primary);
  border: 2px solid var(--border-medium);
}

.cta-button.secondary:hover {
  background: var(--bg-secondary);
  border-color: var(--color-primary);
  color: var(--color-primary);
  transform: translateY(-2px);
}

.cta-button i {
  transition: transform var(--transition-fast);
}

.cta-button:hover i {
  transform: translateX(3px);
}

/* Background Shapes */
.bg-shape {
  position: absolute;
  border-radius: var(--radius-full);
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(245, 158, 11, 0.1));
  animation: float 6s ease-in-out infinite;
}

.bg-shape.shape-1 {
  width: 200px;
  height: 200px;
  top: 10%;
  left: -5%;
  animation-delay: 0s;
}

.bg-shape.shape-2 {
  width: 150px;
  height: 150px;
  bottom: 20%;
  right: -3%;
  animation-delay: 2s;
}

.bg-shape.shape-3 {
  width: 100px;
  height: 100px;
  top: 60%;
  left: 10%;
  animation-delay: 4s;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-15px);
  }
}

/* Responsive Design */
@media (max-width: 1024px) {
  .services-grid {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: var(--spacing-xl);
  }
}

@media (max-width: 768px) {
  .services-section {
    padding: var(--spacing-3xl) 0;
  }

  .services-container {
    padding: 0 var(--spacing-md);
  }

  .section-title {
    font-size: clamp(var(--text-2xl), 6vw, var(--text-4xl));
  }

  .services-grid {
    grid-template-columns: 1fr;
    gap: var(--spacing-xl);
  }

  .service-image-container {
    height: 200px;
  }

  .service-content {
    padding: var(--spacing-xl);
  }

  .cta-buttons {
    flex-direction: column;
    align-items: center;
  }

  .cta-button {
    width: 100%;
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .section-header {
    margin-bottom: var(--spacing-3xl);
  }

  .service-content {
    padding: var(--spacing-lg);
  }

  .service-title {
    font-size: var(--text-xl);
  }

  .services-cta {
    padding: var(--spacing-2xl);
  }

  .bg-shape {
    display: none;
  }
}
</style>