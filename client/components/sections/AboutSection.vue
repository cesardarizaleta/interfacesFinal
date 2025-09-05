<template>
  <section class="about-section">
    <div class="about-container">
      <!-- Section Header -->
      <div class="section-header">
        <div class="section-badge">
          <Icon name="heroicons:information-circle" class="icon" />
          <span>About Us</span>
        </div>
        <h2 class="section-title">
          Crafting <span class="title-accent">Memories</span> That Last Forever
        </h2>
        <p class="section-subtitle">
          We are passionate photographers dedicated to capturing life's most precious moments with artistry, professionalism, and attention to detail.
        </p>
      </div>

      <!-- About Content Grid -->
      <div class="about-grid">
        <!-- Main Content -->
        <div class="about-content">
          <div class="content-block">
            <h3 class="content-title">
              <Icon name="heroicons:camera" class="icon" />
              Our Story
            </h3>
            <p class="content-text">
              Founded with a vision to redefine photography, we've been creating stunning visual narratives for over a decade. Our journey began with a simple belief: every moment deserves to be captured beautifully.
            </p>
          </div>

          <div class="content-block">
            <h3 class="content-title">
              <Icon name="heroicons:heart" class="icon" />
              Our Passion
            </h3>
            <p class="content-text">
              We combine technical expertise with artistic vision to deliver photographs that not only document events but tell compelling stories. Each click of the shutter is an opportunity to create something extraordinary.
            </p>
          </div>

          <div class="content-block">
            <h3 class="content-title">
              <Icon name="heroicons:trophy" class="icon" />
              Our Commitment
            </h3>
            <p class="content-text">
              Excellence is not just a goal—it's our standard. We work tirelessly to exceed expectations, delivering high-quality results that our clients cherish for generations.
            </p>
          </div>
        </div>

        <!-- Stats & Visual -->
        <div class="about-visual">
          <div class="stats-grid">
            <div class="stat-card">
              <div class="stat-number">500+</div>
              <div class="stat-label">Happy Clients</div>
            </div>
            <div class="stat-card">
              <div class="stat-number">1000+</div>
              <div class="stat-label">Photos Taken</div>
            </div>
            <div class="stat-card">
              <div class="stat-number">50+</div>
              <div class="stat-label">Events Covered</div>
            </div>
            <div class="stat-card">
              <div class="stat-number">10+</div>
              <div class="stat-label">Years Experience</div>
            </div>
          </div>

          <!-- Decorative Elements -->
          <div class="decorative-circle circle-1"></div>
          <div class="decorative-circle circle-2"></div>
          <div class="decorative-circle circle-3"></div>
        </div>
      </div>

      <!-- CTA Section -->
      <div class="about-cta">
        <div class="cta-content">
          <h3 class="cta-title">Ready to Create Your Story?</h3>
          <p class="cta-text">Let's discuss how we can capture your special moments.</p>
          <a href="#contact" class="cta-button">
            <span>Get In Touch</span>
            <Icon name="heroicons:arrow-right" class="icon" />
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about-section {
  padding: var(--spacing-4xl) 0;
  background: linear-gradient(135deg, rgba(139, 69, 19, 0.02) 0%, var(--background-neutral) 100%);
  position: relative;
  overflow: hidden;
}

.about-container {
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
  background: rgba(var(--color-primary-rgb, 87, 83, 78), 0.1);
  color: var(--color-primary);
  padding: var(--spacing-xs) var(--spacing-md);
  border-radius: var(--radius-full);
  font-size: var(--text-xs);
  font-weight: var(--font-semibold);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: var(--spacing-lg);
  border: 1px solid rgba(var(--color-primary-rgb, 87, 83, 78), 0.2);
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
  background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
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
  background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
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

/* About Grid */
.about-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: var(--spacing-4xl);
  margin-bottom: var(--spacing-4xl);
  align-items: start;
}

/* About Content */
.about-content {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-2xl);
}

.content-block {
  background: var(--bg-card);
  padding: var(--spacing-2xl);
  border-radius: var(--radius-xl);
  border: 1px solid var(--border-light);
  box-shadow: var(--shadow-sm);
  transition: all var(--transition-normal);
  position: relative;
  overflow: hidden;
}

.content-block::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 100%;
  background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
  opacity: 0;
  transition: opacity var(--transition-normal);
}

.content-block:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-lg);
}

.content-block:hover::before {
  opacity: 1;
}

.content-title {
  font-family: var(--font-heading);
  font-size: var(--text-xl);
  font-weight: var(--font-bold);
  color: var(--text-primary);
  margin-bottom: var(--spacing-md);
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.content-title i {
  color: var(--color-primary);
  font-size: var(--text-lg);
}

.content-text {
  font-size: var(--text-base);
  line-height: 1.6;
  color: var(--text-secondary);
}

/* About Visual */
.about-visual {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xl);
}

.stats-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-lg);
}

.stat-card {
  background: var(--bg-card);
  padding: var(--spacing-xl);
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-light);
  text-align: center;
  box-shadow: var(--shadow-sm);
  transition: all var(--transition-normal);
}

.stat-card:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-md);
}

.stat-number {
  font-family: var(--font-heading);
  font-size: var(--text-4xl);
  font-weight: var(--font-black);
  color: var(--color-primary);
  line-height: 1;
  margin-bottom: var(--spacing-xs);
}

.stat-label {
  font-size: var(--text-sm);
  font-weight: var(--font-semibold);
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

/* Decorative Circles */
.decorative-circle {
  position: absolute;
  border-radius: var(--radius-full);
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(245, 158, 11, 0.1));
  animation: float 6s ease-in-out infinite;
}

.decorative-circle.circle-1 {
  width: 120px;
  height: 120px;
  top: -20px;
  right: -20px;
  animation-delay: 0s;
}

.decorative-circle.circle-2 {
  width: 80px;
  height: 80px;
  bottom: 20px;
  left: -10px;
  animation-delay: 2s;
}

.decorative-circle.circle-3 {
  width: 60px;
  height: 60px;
  top: 50%;
  right: -15px;
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

/* CTA Section */
.about-cta {
  background: linear-gradient(135deg, var(--bg-secondary), var(--bg-card));
  border-radius: var(--radius-2xl);
  padding: var(--spacing-3xl);
  text-align: center;
  border: 1px solid var(--border-light);
  box-shadow: var(--shadow-lg);
  position: relative;
  overflow: hidden;
}

.about-cta::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, rgba(59, 130, 246, 0.05), rgba(245, 158, 11, 0.05));
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
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
}

.cta-button {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-sm);
  background: linear-gradient(135deg, var(--color-primary), var(--color-primary-dark));
  color: white;
  padding: var(--spacing-md) var(--spacing-xl);
  border-radius: var(--radius-lg);
  font-size: var(--text-base);
  font-weight: var(--font-semibold);
  text-decoration: none;
  transition: all var(--transition-fast);
  box-shadow: var(--shadow-md);
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

.cta-button:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-xl);
}

.cta-button i {
  transition: transform var(--transition-fast);
}

.cta-button:hover i {
  transform: translateX(3px);
}

/* Responsive Design */
@media (max-width: 1024px) {
  .about-grid {
    grid-template-columns: 1fr;
    gap: var(--spacing-3xl);
  }

  .about-visual {
    order: -1;
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .about-section {
    padding: var(--spacing-3xl) 0;
  }

  .about-container {
    padding: 0 var(--spacing-md);
  }

  .section-title {
    font-size: clamp(var(--text-2xl), 6vw, var(--text-4xl));
  }

  .about-grid {
    gap: var(--spacing-2xl);
  }

  .content-block {
    padding: var(--spacing-xl);
  }

  .about-cta {
    padding: var(--spacing-2xl);
  }
}

@media (max-width: 480px) {
  .section-header {
    margin-bottom: var(--spacing-3xl);
  }

  .content-block {
    padding: var(--spacing-lg);
  }

  .stat-card {
    padding: var(--spacing-lg);
  }

  .stat-number {
    font-size: var(--text-3xl);
  }
}
</style>