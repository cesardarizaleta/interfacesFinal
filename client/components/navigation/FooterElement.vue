<template>
  <!-- Footer Section -->
  <footer class="photography-footer">
    <!-- Main Footer Content -->
    <div class="footer-container">
      <!-- Brand Information -->
      <div class="footer-brand">
        <div class="brand-title">
          <p class="brand-main">PHOTOGRAPHY</p>
          <p class="brand-sub">BY LANDING</p>
        </div>
        <p class="brand-description">Capturing special moments with art and passion.</p>
        
        <div class="social-links">
          <a href="#" class="social-icon" aria-label="Instagram">
            <i class="fab fa-instagram"></i>
          </a>
          <a href="#" class="social-icon" aria-label="LinkedIn">
            <i class="fab fa-linkedin"></i>
          </a>
          <a href="#" class="social-icon" aria-label="Facebook">
            <i class="fab fa-facebook"></i>
          </a>
          <a href="#" class="social-icon" aria-label="Dribbble">
            <i class="fab fa-dribbble"></i>
          </a>
        </div>
      </div>

      <!-- Quick Links -->
      <div class="footer-section">
        <h3 class="section-title">Quick Links</h3>
        <ul class="footer-links">
          <li><a href="#" class="footer-link">Home</a></li>
          <li><a href="#" class="footer-link">Portfolio</a></li>
          <li><a href="#" class="footer-link">Services</a></li>
          <li><a href="#" class="footer-link">About Me</a></li>
          <li><a href="#" class="footer-link">Contact</a></li>
          <li><a href="#" class="footer-link">Blog</a></li>
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
            <i class="fas fa-map-marker-alt contact-icon"></i>
            <span>123 Photography Street, Image City</span>
          </div>
          <div class="contact-item">
            <i class="fas fa-phone contact-icon"></i>
            <a href="tel:+1234567890" class="footer-link">+1 234 567 890</a>
          </div>
          <div class="contact-item">
            <i class="fas fa-envelope contact-icon"></i>
            <a href="mailto:info@landingphotography.com" class="footer-link">info@landingphoto.com</a>
          </div>
          <div class="contact-item">
            <i class="fas fa-clock contact-icon"></i>
            <span>Mon-Fri: 9:00 AM - 6:00 PM</span>
          </div>
        </address>

        <!-- Newsletter Subscription -->
        <div class="newsletter">
          <h4 class="newsletter-title">Subscribe to our newsletter</h4>
          <form class="newsletter-form">
            <input 
              type="email" 
              placeholder="Your email" 
              class="newsletter-input"
              aria-label="Email for newsletter subscription"
            >
            <button 
              type="submit" 
              class="newsletter-button"
              aria-label="Subscribe"
            >
              <i class="fas fa-paper-plane"></i>
            </button>
          </form>
        </div>
      </div>
    </div>

    <!-- Copyright and Legal -->
    <div class="copyright-section">
      <div class="copyright-container">
        <div class="copyright-text">
          &copy; {{ new Date().getFullYear() }} Landing Photography. All rights reserved.
        </div>
        <div class="legal-links">
          <a href="#" class="legal-link">Privacy Policy</a>
          <a href="#" class="legal-link">Terms of Service</a>
          <a href="#" class="legal-link">Cookie Policy</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'PhotographyFooter',
  data() {
    return {
      currentYear: new Date().getFullYear()
    }
  }
}
</script>

<style>
/* Base Styles */
.photography-footer {
  width: 100%;
  background-color: var(--bg-card);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: var(--text-primary);
  border-top: 1px solid var(--border-light);
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  background-color: var(--bg-card);
}

/* Brand Section */
.footer-brand {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
}

.brand-title {
  text-align: center;
}

.brand-main {
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  color: var(--text-primary);
  margin: 0;
}

.brand-sub {
  font-size: 1.25rem;
  font-weight: 300;
  letter-spacing: 0.05em;
  color: var(--text-secondary);
  margin: 0;
}

.brand-description {
  font-size: 0.875rem;
  color: var(--text-tertiary);
  text-align: center;
  margin: 0;
  max-width: 600px;
}

.social-links {
  display: flex;
  justify-content: center;
  gap: 1rem;
  padding-top: 0.5rem;
}

/* Footer Sections */
.footer-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  text-align: center;
}

.section-title {
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--color-text);
  margin: 0 0 1rem 0;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--color-primary);
}

.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;
}

/* Links */
.footer-link {
  font-size: 0.875rem;
  color: var(--color-text);
  text-decoration: none;
  transition: color 0.3s ease;
}

.footer-link:hover {
  color: var(--color-secondary);
}

/* Contact Info */
.contact-info {
  font-style: normal;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin: 0;
  align-items: center;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.875rem;
  color: var(--color-text);
}

.contact-icon {
  margin-top: 0.125rem;
  font-size: 0.875rem;
  color: var(--color-primary);
}

/* Newsletter */
.newsletter {
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.newsletter-title {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-text);
  margin-bottom: 0.5rem;
}

.newsletter-form {
  display: flex;
  max-width: 300px;
  width: 100%;
}

.newsletter-input {
  flex: 1;
  padding: 0.5rem 0.75rem;
  border: 1px solid var(--color-primary);
  border-right: none;
  border-radius: 0.25rem 0 0 0.25rem;
  font-size: 0.875rem;
  outline: none;
  color: var(--color-text);
  background-color: var(--color-background);
}

.newsletter-input:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 1px var(--color-primary);
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
  background-color: var(--color-secondary);
}

/* Social Icons */
.social-icon {
  color: var(--color-text);
  font-size: 1.25rem;
  transition: all 0.3s ease;
}

.social-icon:hover {
  color: var(--color-secondary);
  transform: translateY(-3px);
}

/* Copyright Section */
.copyright-section {
  background-color: var(--color-primary);
  opacity: 0.1;
  padding: 1rem;
  border-top: 1px solid var(--color-primary);
}

.copyright-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
}

.copyright-text {
  font-size: 0.75rem;
  color: var(--color-text);
  text-align: center;
}

.legal-links {
  display: flex;
  gap: 1rem;
}

.legal-link {
  font-size: 0.75rem;
  color: var(--color-text);
  text-decoration: none;
  transition: color 0.3s ease;
}

.legal-link:hover {
  color: var(--color-secondary);
}

/* Responsive Design */
@media (min-width: 640px) {
  .footer-container {
    padding: 3rem 2rem;
  }
  
  .copyright-container {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  
  .copyright-text {
    text-align: left;
  }
}

@media (min-width: 1024px) {
  .footer-container {
    gap: 3rem;
  }
  
  .brand-description,
  .footer-link,
  .contact-item,
  .newsletter-title {
    font-size: 1rem;
  }
  
  .copyright-text,
  .legal-link {
    font-size: 0.875rem;
  }
}
</style>