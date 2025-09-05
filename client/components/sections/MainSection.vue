<template>
  <!-- Hero Section -->
  <section class="hero-section">
    <div class="hero-container">
      <!-- Hero Content -->
      <div class="hero-content">
        <div class="hero-badge">
          <i class="fas fa-star"></i>
          <span>Professional Photography Studio</span>
        </div>

        <h1 class="hero-title">
          Capturing Life's
          <span class="hero-title-accent">Beautiful</span>
          Moments
        </h1>

        <p class="hero-description">
          We transform ordinary moments into extraordinary memories through
          professional photography that tells your unique story with elegance
          and artistic vision.
        </p>

        <!-- CTA Buttons -->
        <div class="hero-actions">
          <NuxtLink to="/portfolio" class="btn btn-primary">
            <i class="fas fa-images"></i>
            <span>View Our Work</span>
          </NuxtLink>
          <NuxtLink to="/services" class="btn btn-outline">
            <i class="fas fa-concierge-bell"></i>
            <span>Our Services</span>
          </NuxtLink>
        </div>

        <!-- Stats -->
        <div class="hero-stats">
          <div class="stat-item">
            <div class="stat-number">500+</div>
            <div class="stat-label">Happy Clients</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">1000+</div>
            <div class="stat-label">Photos Taken</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">50+</div>
            <div class="stat-label">Events Covered</div>
          </div>
        </div>
      </div>

      <!-- Hero Visual -->
      <div class="hero-visual">
        <div class="hero-image-container">
          <img
            src="~/assets/image.jpg"
            alt="Professional Photographer"
            class="hero-image"
          />
          <div class="hero-image-overlay"></div>
        </div>

        <!-- Floating Cards -->
        <div class="floating-card card-1">
          <div class="floating-icon">
            <i class="fas fa-camera"></i>
          </div>
          <div class="floating-text">
            <div class="floating-title">Professional</div>
            <div class="floating-subtitle">Equipment</div>
          </div>
        </div>

        <div class="floating-card card-2">
          <div class="floating-icon">
            <i class="fas fa-award"></i>
          </div>
          <div class="floating-text">
            <div class="floating-title">Award</div>
            <div class="floating-subtitle">Winning</div>
          </div>
        </div>

        <div class="floating-card card-3">
          <div class="floating-icon">
            <i class="fas fa-users"></i>
          </div>
          <div class="floating-text">
            <div class="floating-title">Expert</div>
            <div class="floating-subtitle">Team</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Background Elements -->
    <div class="hero-bg-shape shape-1"></div>
    <div class="hero-bg-shape shape-2"></div>
    <div class="hero-bg-shape shape-3"></div>

    <!-- Scroll Indicator -->
    <div class="scroll-indicator">
      <div class="scroll-text">Scroll to explore</div>
      <div class="scroll-mouse">
        <div class="scroll-wheel"></div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero-section {
  min-height: 100vh;
  background: linear-gradient(135deg, var(--bg-page));
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  padding: var(--spacing-3xl) 0;
}

.hero-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--spacing-lg);
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-3xl);
  align-items: center;
}

/* Hero Content */
.hero-content {
  position: relative;
  z-index: 2;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-xs);
  background: rgba(245, 158, 11, 0.1);
  color: var(--color-secondary);
  padding: var(--spacing-xs) var(--spacing-md);
  border-radius: var(--radius-full);
  font-size: var(--text-xs);
  font-weight: var(--font-semibold);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: var(--spacing-lg);
  border: 1px solid rgba(245, 158, 11, 0.2);
}

.hero-badge i {
  font-size: var(--text-sm);
}

.hero-title {
  font-family: var(--font-heading);
  font-size: clamp(var(--text-4xl), 5vw, var(--text-7xl));
  font-weight: var(--font-black);
  line-height: 1.1;
  color: var(--text-primary);
  margin-bottom: var(--spacing-lg);
  letter-spacing: -0.02em;
}

.hero-title-accent {
  background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  position: relative;
}

.hero-title-accent::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
  border-radius: var(--radius-sm);
  opacity: 0.3;
}

.hero-description {
  font-size: var(--text-lg);
  line-height: 1.6;
  color: var(--text-secondary);
  margin-bottom: var(--spacing-2xl);
  max-width: 500px;
}

/* Hero Actions */
.hero-actions {
  display: flex;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-3xl);
  flex-wrap: wrap;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-md) var(--spacing-xl);
  border-radius: var(--radius-lg);
  font-size: var(--text-base);
  font-weight: var(--font-semibold);
  text-decoration: none;
  transition: all var(--transition-fast);
  cursor: pointer;
  border: 2px solid transparent;
  position: relative;
  overflow: hidden;
}

.btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left var(--transition-normal);
}

.btn:hover::before {
  left: 100%;
}

.btn-primary {
  background: linear-gradient(135deg, var(--color-primary), var(--color-primary-dark));
  color: white;
  box-shadow: var(--shadow-lg);
}

.btn-primary:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-xl);
}

.btn-outline {
  background: transparent;
  color: var(--text-primary);
  border-color: var(--border-medium);
}

.btn-outline:hover {
  background: var(--bg-secondary);
  border-color: var(--color-primary);
  color: var(--color-primary);
  transform: translateY(-2px);
}

/* Hero Stats */
.hero-stats {
  display: flex;
  gap: var(--spacing-xl);
  flex-wrap: wrap;
}

.stat-item {
  text-align: center;
  min-width: 80px;
}

.stat-number {
  font-family: var(--font-heading);
  font-size: var(--text-3xl);
  font-weight: var(--font-bold);
  color: var(--color-primary);
  line-height: 1;
  margin-bottom: var(--spacing-xs);
}

.stat-label {
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

/* Hero Visual */
.hero-visual {
  position: relative;
  z-index: 2;
}

.hero-image-container {
  position: relative;
  border-radius: var(--radius-2xl);
  overflow: hidden;
  box-shadow: var(--shadow-2xl);
  transform: rotate(-2deg);
  transition: transform var(--transition-normal);
}

.hero-image-container:hover {
  transform: rotate(0deg) scale(1.02);
}

.hero-image {
  width: 100%;
  height: 500px;
  object-fit: cover;
  transition: transform var(--transition-slow);
}

.hero-image:hover {
  transform: scale(1.05);
}

.hero-image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, rgba(26, 54, 93, 0.1), rgba(59, 130, 246, 0.1));
  pointer-events: none;
}

/* Floating Cards */
.floating-card {
  position: absolute;
  background: var(--bg-card);
  border-radius: var(--radius-xl);
  padding: var(--spacing-lg);
  box-shadow: var(--shadow-xl);
  border: 1px solid var(--border-light);
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  backdrop-filter: blur(10px);
  animation: float 6s ease-in-out infinite;
}

.floating-card.card-1 {
  top: -20px;
  right: -20px;
  animation-delay: 0s;
}

.floating-card.card-2 {
  bottom: 20px;
  left: -40px;
  animation-delay: 2s;
}

.floating-card.card-3 {
  top: 50%;
  right: -30px;
  animation-delay: 4s;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

.floating-icon {
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
  border-radius: var(--radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: var(--text-xl);
  flex-shrink: 0;
}

.floating-text {
  line-height: 1.2;
}

.floating-title {
  font-weight: var(--font-bold);
  color: var(--text-primary);
  font-size: var(--text-sm);
}

.floating-subtitle {
  font-size: var(--text-xs);
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-weight: var(--font-medium);
}

/* Background Shapes */
.hero-bg-shape {
  position: absolute;
  border-radius: var(--radius-full);
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(245, 158, 11, 0.1));
  animation: pulse 4s ease-in-out infinite;
}

.hero-bg-shape.shape-1 {
  width: 300px;
  height: 300px;
  top: 10%;
  right: 10%;
  animation-delay: 0s;
}

.hero-bg-shape.shape-2 {
  width: 200px;
  height: 200px;
  bottom: 20%;
  left: 5%;
  animation-delay: 1s;
}

.hero-bg-shape.shape-3 {
  width: 150px;
  height: 150px;
  top: 60%;
  right: 20%;
  animation-delay: 2s;
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
    opacity: 0.5;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.8;
  }
}

/* Scroll Indicator */
.scroll-indicator {
  position: absolute;
  bottom: var(--spacing-xl);
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-sm);
  color: var(--text-secondary);
  font-size: var(--text-xs);
  font-weight: var(--font-medium);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateX(-50%) translateY(0);
  }
  40% {
    transform: translateX(-50%) translateY(-10px);
  }
  60% {
    transform: translateX(-50%) translateY(-5px);
  }
}

.scroll-mouse {
  width: 24px;
  height: 36px;
  border: 2px solid var(--text-secondary);
  border-radius: var(--radius-full);
  position: relative;
}

.scroll-wheel {
  width: 4px;
  height: 8px;
  background: var(--text-secondary);
  border-radius: var(--radius-sm);
  position: absolute;
  top: 6px;
  left: 50%;
  transform: translateX(-50%);
  animation: scroll 2s infinite;
}

@keyframes scroll {
  0% {
    opacity: 0;
    transform: translateX(-50%) translateY(0);
  }
  50% {
    opacity: 1;
    transform: translateX(-50%) translateY(8px);
  }
  100% {
    opacity: 0;
    transform: translateX(-50%) translateY(16px);
  }
}

/* Responsive Design */
@media (max-width: 1024px) {
  .hero-container {
    grid-template-columns: 1fr;
    gap: var(--spacing-2xl);
    text-align: center;
  }

  .hero-visual {
    order: -1;
  }

  .hero-description {
    max-width: none;
  }

  .floating-card {
    display: none;
  }
}

@media (max-width: 768px) {
  .hero-section {
    padding: var(--spacing-2xl) 0;
  }

  .hero-container {
    padding: 0 var(--spacing-md);
  }

  .hero-title {
    font-size: clamp(var(--text-3xl), 8vw, var(--text-5xl));
  }

  .hero-actions {
    justify-content: center;
  }

  .hero-stats {
    justify-content: center;
  }

  .hero-image {
    height: 350px;
  }

  .hero-bg-shape {
    display: none;
  }
}

@media (max-width: 480px) {
  .hero-actions {
    flex-direction: column;
    align-items: center;
  }

  .btn {
    width: 100%;
    justify-content: center;
  }

  .hero-stats {
    flex-direction: column;
    align-items: center;
  }

  .stat-item {
    min-width: auto;
  }
}
</style>
