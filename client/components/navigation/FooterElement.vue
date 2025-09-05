<template>
  <!-- Footer Section -->
  <footer class="footer">
    <div class="footer-container">
      <div class="footer-content">
        <!-- Brand Section -->
        <div class="footer-section">
          <div class="footer-brand">
            <div class="brand-logo">
              <Icon name="heroicons:camera" class="icon" />
              <span class="brand-text">LANDING</span>
            </div>
            <p class="brand-description">
              Professional photography services capturing life's beautiful moments with creativity and excellence.
            </p>
          </div>
        </div>

        <!-- Quick Links -->
        <div class="footer-section">
          <h3 class="section-title">Quick Links</h3>
          <ul class="footer-links">
            <li><a href="/" class="footer-link">Home</a></li>
            <li><a href="/about" class="footer-link">About</a></li>
            <li><a href="/services" class="footer-link">Services</a></li>
            <li><a href="/portfolio" class="footer-link">Portfolio</a></li>
            <li><a href="/contact" class="footer-link">Contact</a></li>
          </ul>
        </div>

        <!-- Services -->
        <div class="footer-section">
          <h3 class="section-title">Services</h3>
          <ul class="footer-links">
            <li><a href="#" class="footer-link">Wedding Photography</a></li>
            <li><a href="#" class="footer-link">Portrait Sessions</a></li>
            <li><a href="#" class="footer-link">Product Photography</a></li>
            <li><a href="#" class="footer-link">Corporate Events</a></li>
            <li><a href="#" class="footer-link">Family Sessions</a></li>
            <li><a href="#" class="footer-link">Aerial Photography</a></li>
          </ul>
        </div>

        <!-- Contact Information -->
        <div class="footer-section">
          <h3 class="section-title">Contact Us</h3>
          <address class="contact-info">
            <div class="contact-item">
              <Icon name="heroicons:map-pin" class="contact-icon" />
              <span>123 Photography Street, Image City</span>
            </div>
            <div class="contact-item">
              <Icon name="heroicons:phone" class="contact-icon" />
              <a href="tel:+1234567890" class="footer-link">+1 234 567 890</a>
            </div>
            <div class="contact-item">
              <Icon name="heroicons:envelope" class="contact-icon" />
              <a href="mailto:info@landingphotography.com" class="footer-link">info@landingphoto.com</a>
            </div>
            <div class="contact-item">
              <Icon name="heroicons:clock" class="contact-icon" />
              <span>Mon-Fri: 9:00 AM - 6:00 PM</span>
            </div>
          </address>
        </div>

        <!-- Newsletter -->
        <div class="footer-section">
          <h3 class="section-title">Stay Updated</h3>
          <p class="newsletter-text">Subscribe to our newsletter for the latest updates and photography tips.</p>
          <form class="newsletter-form">
            <input
              type="email"
              placeholder="Enter your email"
              class="newsletter-input"
              required
            >
            <button
              type="submit"
              class="newsletter-button"
              aria-label="Subscribe"
            >
              <Icon name="heroicons:paper-airplane" class="icon" />
            </button>
          </form>
        </div>
      </div>

      <!-- Copyright and Legal -->
      <div class="footer-bottom">
        <div class="copyright">
          <p>&copy; 2024 LANDING Photography. All rights reserved.</p>
        </div>
        <div class="footer-legal">
          <a href="/privacy" class="footer-link">Privacy Policy</a>
          <a href="/terms" class="footer-link">Terms of Service</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
// Footer component logic can be added here if needed
</script>

<style scoped>
.footer {
  background-color: var(--bg-secondary);
  border-top: 1px solid var(--border-light);
  margin-top: auto;
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 1rem 1rem;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

.footer-brand {
  text-align: center;
}

.brand-logo {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.brand-text {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-primary);
}

.brand-description {
  color: var(--color-text);
  font-size: 0.9rem;
  line-height: 1.5;
}

.footer-section h3 {
  color: var(--color-primary);
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 1rem;
  text-align: center;
}

.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.footer-links li {
  text-align: center;
}

.footer-link {
  color: var(--color-text);
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.3s ease;
}

.footer-link:hover {
  color: var(--color-accent);
}

.contact-info {
  font-style: normal;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
  justify-content: center;
}

.contact-item:last-child {
  margin-bottom: 0;
}

.contact-icon {
  color: var(--color-accent);
  flex-shrink: 0;
}

.newsletter-text {
  color: var(--color-text);
  font-size: 0.9rem;
  margin-bottom: 1rem;
  text-align: center;
}

.newsletter-form {
  display: flex;
  max-width: 300px;
  margin: 0 auto;
}

.newsletter-input {
  flex: 1;
  padding: 0.5rem 0.75rem;
  border: 1px solid var(--border-light);
  border-right: none;
  border-radius: 0.25rem 0 0 0.25rem;
  font-size: 0.9rem;
  outline: none;
  color: var(--color-text);
  background-color: var(--bg-primary);
}

.newsletter-input:focus {
  border-color: var(--color-primary);
}

.newsletter-button {
  background-color: var(--color-primary);
  color: white;
  border: none;
  padding: 0 1rem;
  border-radius: 0 0.25rem 0.25rem 0;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.newsletter-button:hover {
  background-color: var(--color-accent);
}

.footer-bottom {
  border-top: 1px solid var(--border-light);
  padding-top: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.copyright {
  font-size: 0.8rem;
  color: var(--color-text);
}

.footer-legal {
  display: flex;
  gap: 1rem;
}

.footer-legal .footer-link {
  font-size: 0.8rem;
}

/* Responsive */
@media (max-width: 768px) {
  .footer-content {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .footer-bottom {
    flex-direction: column;
    text-align: center;
  }

  .footer-legal {
    justify-content: center;
  }
}
</style>