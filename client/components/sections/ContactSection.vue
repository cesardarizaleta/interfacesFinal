<template>
  <section class="contact-section">
    <div class="contact-container">
      <!-- Section Header -->
      <div class="section-header">
        <div class="section-badge">
          <i class="fas fa-envelope"></i>
          <span>Contact Us</span>
        </div>
        <h2 class="section-title">
          Let's Create <span class="title-accent">Something Beautiful</span> Together
        </h2>
        <p class="section-subtitle">
          Ready to capture your special moments? Get in touch with us today and let's discuss how we can bring your vision to life.
        </p>
      </div>

      <!-- Contact Content -->
      <div class="contact-content">
        <!-- Contact Form -->
        <div class="contact-form-card">
          <div class="form-header">
            <h3 class="form-title">Send us a Message</h3>
            <p class="form-subtitle">We'll get back to you within 24 hours</p>
          </div>

          <form @submit.prevent="submitForm" class="contact-form">
            <div class="form-row">
              <div class="form-group">
                <label for="firstName" class="form-label">
                  <i class="fas fa-user"></i>
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  v-model="form.firstName"
                  class="form-input"
                  placeholder="John"
                  required
                >
              </div>
              <div class="form-group">
                <label for="lastName" class="form-label">
                  <i class="fas fa-user"></i>
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  v-model="form.lastName"
                  class="form-input"
                  placeholder="Doe"
                  required
                >
              </div>
            </div>

            <div class="form-group">
              <label for="email" class="form-label">
                <i class="fas fa-envelope"></i>
                Email Address
              </label>
              <input
                type="email"
                id="email"
                v-model="form.email"
                class="form-input"
                placeholder="john@example.com"
                required
              >
            </div>

            <div class="form-group">
              <label for="phone" class="form-label">
                <i class="fas fa-phone"></i>
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                v-model="form.phone"
                class="form-input"
                placeholder="+1 (555) 123-4567"
              >
            </div>

            <div class="form-group">
              <label for="service" class="form-label">
                <i class="fas fa-camera"></i>
                Service Interested In
              </label>
              <select id="service" v-model="form.service" class="form-select" required>
                <option value="">Select a service</option>
                <option value="wedding">Wedding Photography</option>
                <option value="portrait">Portrait Session</option>
                <option value="event">Event Coverage</option>
                <option value="family">Family Photography</option>
                <option value="corporate">Corporate Photography</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div class="form-group">
              <label for="message" class="form-label">
                <i class="fas fa-comment"></i>
                Message
              </label>
              <textarea
                id="message"
                v-model="form.message"
                class="form-textarea"
                placeholder="Tell us about your project, date, location, and any special requirements..."
                rows="5"
                required
              ></textarea>
            </div>

            <button type="submit" class="submit-button" :disabled="isSubmitting">
              <span v-if="isSubmitting">
                <i class="fas fa-spinner fa-spin"></i>
                Sending...
              </span>
              <span v-else>
                <i class="fas fa-paper-plane"></i>
                Send Message
              </span>
            </button>
          </form>
        </div>

        <!-- Contact Info & Visual -->
        <div class="contact-info-section">
          <!-- Contact Information -->
          <div class="contact-info-card">
            <h3 class="info-title">Get In Touch</h3>
            <div class="info-list">
              <div class="info-item">
                <div class="info-icon">
                  <i class="fas fa-map-marker-alt"></i>
                </div>
                <div class="info-content">
                  <h4 class="info-label">Location</h4>
                  <p class="info-text">123 Photography Street<br>Creative City, CC 12345</p>
                </div>
              </div>

              <div class="info-item">
                <div class="info-icon">
                  <i class="fas fa-phone"></i>
                </div>
                <div class="info-content">
                  <h4 class="info-label">Phone</h4>
                  <p class="info-text">+1 (555) 123-4567</p>
                </div>
              </div>

              <div class="info-item">
                <div class="info-icon">
                  <i class="fas fa-envelope"></i>
                </div>
                <div class="info-content">
                  <h4 class="info-label">Email</h4>
                  <p class="info-text">hello@photography.com</p>
                </div>
              </div>

              <div class="info-item">
                <div class="info-icon">
                  <i class="fas fa-clock"></i>
                </div>
                <div class="info-content">
                  <h4 class="info-label">Business Hours</h4>
                  <p class="info-text">Mon - Fri: 9AM - 6PM<br>Sat: 10AM - 4PM</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Social Media -->
          <div class="social-card">
            <h3 class="social-title">Follow Us</h3>
            <p class="social-subtitle">Stay updated with our latest work</p>
            <div class="social-links">
              <a href="#" class="social-link" aria-label="Facebook">
                <i class="fab fa-facebook-f"></i>
              </a>
              <a href="#" class="social-link" aria-label="Instagram">
                <i class="fab fa-instagram"></i>
              </a>
              <a href="#" class="social-link" aria-label="Twitter">
                <i class="fab fa-twitter"></i>
              </a>
              <a href="#" class="social-link" aria-label="Pinterest">
                <i class="fab fa-pinterest-p"></i>
              </a>
            </div>
          </div>

          <!-- Visual Element -->
          <div class="contact-visual">
            <div class="visual-image-container">
              <img src="~/assets/camera.png" alt="Professional Camera" class="visual-image">
              <div class="visual-overlay"></div>
            </div>
            <div class="visual-stats">
              <div class="stat-item">
                <div class="stat-number">500+</div>
                <div class="stat-label">Happy Clients</div>
              </div>
              <div class="stat-item">
                <div class="stat-number">1000+</div>
                <div class="stat-label">Photos Taken</div>
              </div>
            </div>
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
import { ref, reactive } from 'vue'

// Form data
const form = reactive({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  service: '',
  message: ''
})

const isSubmitting = ref(false)

// Methods
const submitForm = async () => {
  if (isSubmitting.value) return

  isSubmitting.value = true

  try {
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000))

    // Reset form
    form.firstName = ''
    form.lastName = ''
    form.email = ''
    form.phone = ''
    form.service = ''
    form.message = ''

    // Show success message (you can implement a toast notification here)
    alert('Thank you for your message! We\'ll get back to you soon.')

  } catch (error) {
    console.error('Form submission error:', error)
    alert('There was an error sending your message. Please try again.')
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
.contact-section {
  padding: var(--spacing-4xl) 0;
  background: var(--bg-page);
  position: relative;
  overflow: hidden;
}

.contact-container {
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
  background: rgba(239, 68, 68, 0.1);
  color: var(--color-error);
  padding: var(--spacing-xs) var(--spacing-md);
  border-radius: var(--radius-full);
  font-size: var(--text-xs);
  font-weight: var(--font-semibold);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: var(--spacing-lg);
  border: 1px solid rgba(239, 68, 68, 0.2);
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
  background: linear-gradient(135deg, var(--color-error), var(--color-primary));
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
  background: linear-gradient(135deg, var(--color-error), var(--color-primary));
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

/* Contact Content */
.contact-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-4xl);
  align-items: start;
}

/* Contact Form Card */
.contact-form-card {
  background: var(--bg-card);
  border-radius: var(--radius-2xl);
  border: 1px solid var(--border-light);
  box-shadow: var(--shadow-lg);
  padding: var(--spacing-3xl);
  position: relative;
  overflow: hidden;
}

.contact-form-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, rgba(239, 68, 68, 0.05), rgba(59, 130, 246, 0.05));
  pointer-events: none;
}

.form-header {
  text-align: center;
  margin-bottom: var(--spacing-2xl);
  position: relative;
  z-index: 1;
}

.form-title {
  font-family: var(--font-heading);
  font-size: var(--text-2xl);
  font-weight: var(--font-bold);
  color: var(--text-primary);
  margin-bottom: var(--spacing-sm);
}

.form-subtitle {
  font-size: var(--text-base);
  color: var(--text-secondary);
}

/* Contact Form */
.contact-form {
  position: relative;
  z-index: 1;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-lg);
}

.form-group {
  margin-bottom: var(--spacing-lg);
}

.form-label {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  color: var(--text-primary);
  margin-bottom: var(--spacing-sm);
}

.form-label i {
  color: var(--color-primary);
  font-size: var(--text-base);
}

.form-input,
.form-textarea,
.form-select {
  width: 100%;
  padding: var(--spacing-md) var(--spacing-lg);
  border: 2px solid var(--border-light);
  border-radius: var(--radius-lg);
  font-size: var(--text-base);
  color: var(--text-primary);
  background: var(--bg-page);
  transition: all var(--transition-fast);
  outline: none;
}

.form-input:focus,
.form-textarea:focus,
.form-select:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  transform: translateY(-1px);
}

.form-input::placeholder,
.form-textarea::placeholder {
  color: var(--text-secondary);
  opacity: 0.7;
}

.form-textarea {
  min-height: 120px;
  resize: vertical;
  line-height: 1.5;
}

.form-select {
  cursor: pointer;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e");
  background-position: right var(--spacing-md) center;
  background-repeat: no-repeat;
  background-size: 1.5em 1.5em;
  padding-right: var(--spacing-3xl);
}

.submit-button {
  width: 100%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-sm);
  background: linear-gradient(135deg, var(--color-primary), var(--color-primary-dark));
  color: white;
  padding: var(--spacing-lg) var(--spacing-xl);
  border: none;
  border-radius: var(--radius-lg);
  font-size: var(--text-base);
  font-weight: var(--font-semibold);
  cursor: pointer;
  transition: all var(--transition-fast);
  box-shadow: var(--shadow-md);
  position: relative;
  overflow: hidden;
}

.submit-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left var(--transition-normal);
}

.submit-button:hover:not(:disabled)::before {
  left: 100%;
}

.submit-button:hover:not(:disabled) {
  transform: translateY(-3px);
  box-shadow: var(--shadow-xl);
}

.submit-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}

.submit-button i {
  transition: transform var(--transition-fast);
}

.submit-button:hover:not(:disabled) i {
  transform: translateX(3px);
}

/* Contact Info Section */
.contact-info-section {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xl);
}

/* Contact Info Card */
.contact-info-card {
  background: var(--bg-card);
  border-radius: var(--radius-2xl);
  border: 1px solid var(--border-light);
  box-shadow: var(--shadow-lg);
  padding: var(--spacing-3xl);
}

.info-title {
  font-family: var(--font-heading);
  font-size: var(--text-2xl);
  font-weight: var(--font-bold);
  color: var(--text-primary);
  margin-bottom: var(--spacing-xl);
  text-align: center;
}

.info-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xl);
}

.info-item {
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-lg);
  padding: var(--spacing-lg);
  background: var(--bg-secondary);
  border-radius: var(--radius-lg);
  transition: all var(--transition-normal);
}

.info-item:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-md);
}

.info-icon {
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

.info-content {
  flex: 1;
}

.info-label {
  font-size: var(--text-base);
  font-weight: var(--font-semibold);
  color: var(--text-primary);
  margin-bottom: var(--spacing-xs);
}

.info-text {
  font-size: var(--text-sm);
  color: var(--text-secondary);
  line-height: 1.5;
  margin: 0;
}

/* Social Card */
.social-card {
  background: var(--bg-card);
  border-radius: var(--radius-2xl);
  border: 1px solid var(--border-light);
  box-shadow: var(--shadow-lg);
  padding: var(--spacing-3xl);
  text-align: center;
}

.social-title {
  font-family: var(--font-heading);
  font-size: var(--text-xl);
  font-weight: var(--font-bold);
  color: var(--text-primary);
  margin-bottom: var(--spacing-sm);
}

.social-subtitle {
  font-size: var(--text-sm);
  color: var(--text-secondary);
  margin-bottom: var(--spacing-xl);
}

.social-links {
  display: flex;
  justify-content: center;
  gap: var(--spacing-md);
}

.social-link {
  width: 50px;
  height: 50px;
  background: var(--bg-secondary);
  border-radius: var(--radius-full);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-secondary);
  text-decoration: none;
  transition: all var(--transition-fast);
  border: 2px solid var(--border-light);
}

.social-link:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-md);
  color: var(--color-primary);
  border-color: var(--color-primary);
}

.social-link i {
  font-size: var(--text-lg);
}

/* Contact Visual */
.contact-visual {
  background: var(--bg-card);
  border-radius: var(--radius-2xl);
  border: 1px solid var(--border-light);
  box-shadow: var(--shadow-lg);
  padding: var(--spacing-3xl);
  text-align: center;
  position: relative;
  overflow: hidden;
}

.visual-image-container {
  position: relative;
  margin-bottom: var(--spacing-xl);
  border-radius: var(--radius-xl);
  overflow: hidden;
  box-shadow: var(--shadow-lg);
}

.visual-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  transition: transform var(--transition-normal);
}

.visual-image:hover {
  transform: scale(1.05);
}

.visual-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, rgba(59, 130, 246, 0.1), rgba(245, 158, 11, 0.1));
  pointer-events: none;
}

.visual-stats {
  display: flex;
  justify-content: center;
  gap: var(--spacing-xl);
}

.stat-item {
  text-align: center;
}

.stat-number {
  font-family: var(--font-heading);
  font-size: var(--text-3xl);
  font-weight: var(--font-black);
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

/* Background Shapes */
.bg-shape {
  position: absolute;
  border-radius: var(--radius-full);
  background: linear-gradient(135deg, rgba(239, 68, 68, 0.1), rgba(59, 130, 246, 0.1));
  animation: float 6s ease-in-out infinite;
}

.bg-shape.shape-1 {
  width: 300px;
  height: 300px;
  top: 10%;
  left: -5%;
  animation-delay: 0s;
}

.bg-shape.shape-2 {
  width: 200px;
  height: 200px;
  bottom: 20%;
  right: -3%;
  animation-delay: 2s;
}

.bg-shape.shape-3 {
  width: 150px;
  height: 150px;
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
  .contact-content {
    grid-template-columns: 1fr;
    gap: var(--spacing-3xl);
  }

  .contact-info-section {
    order: -1;
  }
}

@media (max-width: 768px) {
  .contact-section {
    padding: var(--spacing-3xl) 0;
  }

  .contact-container {
    padding: 0 var(--spacing-md);
  }

  .section-title {
    font-size: clamp(var(--text-2xl), 6vw, var(--text-4xl));
  }

  .contact-form-card,
  .contact-info-card,
  .social-card,
  .contact-visual {
    padding: var(--spacing-2xl);
  }

  .form-row {
    grid-template-columns: 1fr;
    gap: var(--spacing-md);
  }

  .info-list {
    gap: var(--spacing-lg);
  }

  .info-item {
    padding: var(--spacing-md);
  }

  .visual-stats {
    flex-direction: column;
    gap: var(--spacing-lg);
  }

  .bg-shape {
    display: none;
  }
}

@media (max-width: 480px) {
  .section-header {
    margin-bottom: var(--spacing-3xl);
  }

  .contact-form-card,
  .contact-info-card,
  .social-card,
  .contact-visual {
    padding: var(--spacing-xl);
  }

  .form-header {
    margin-bottom: var(--spacing-xl);
  }

  .social-links {
    gap: var(--spacing-sm);
  }

  .social-link {
    width: 45px;
    height: 45px;
  }

  .visual-image {
    height: 150px;
  }
}
</style>