<template>
  <nav class="navbar">
    <div class="navbar-container">
      <!-- Logo/Brand -->
      <div class="navbar-brand">
        <NuxtLink to="/" class="brand-link">
          <div class="brand-logo">
            <div class="logo-icon">
              <Icon name="heroicons:camera" class="icon" />
            </div>
            <div class="brand-text">
              <span class="brand-main">LANDING</span>
              <span class="brand-sub">Photography</span>
            </div>
          </div>
        </NuxtLink>
      </div>

      <!-- Desktop Navigation -->
      <div class="navbar-menu">
        <div class="navbar-links">
          <NuxtLink to="/" class="nav-link" exact>
            <Icon name="heroicons:home" class="icon" />
            <span>Home</span>
          </NuxtLink>
          <NuxtLink to="/about" class="nav-link">
            <Icon name="heroicons:user" class="icon" />
            <span>About</span>
          </NuxtLink>
          <NuxtLink to="/portfolio" class="nav-link">
            <Icon name="heroicons:photo" class="icon" />
            <span>Portfolio</span>
          </NuxtLink>
          <NuxtLink to="/gallery" class="nav-link" v-if="isLoggedIn">
            <Icon name="heroicons:rectangle-stack" class="icon" />
            <span>Mi Galería</span>
          </NuxtLink>
          <NuxtLink to="/services" class="nav-link">
            <Icon name="heroicons:briefcase" class="icon" />
            <span>Services</span>
          </NuxtLink>
          <NuxtLink to="/config" class="nav-link" v-if="isLoggedIn">
            <Icon name="heroicons:cog-6-tooth" class="icon" />
            <span>Config</span>
          </NuxtLink>
        </div>

        <!-- User Actions -->
        <div class="navbar-actions">
          <template v-if="!isLoggedIn">
            <NuxtLink to="/login" class="btn btn-outline">
              <Icon name="heroicons:arrow-right-on-rectangle" class="icon" />
              <span>Login</span>
            </NuxtLink>
            <NuxtLink to="/register" class="btn btn-primary">
              <Icon name="heroicons:user-plus" class="icon" />
              <span>Register</span>
            </NuxtLink>
          </template>
          <template v-else>
            <div class="user-menu">
              <button @click="toggleUserDropdown" class="user-button">
                <div class="user-avatar">
                  <Icon name="heroicons:user" class="icon" />
                </div>
                <span class="user-name">{{ userName || 'User' }}</span>
                <Icon name="heroicons:chevron-down" :class="{ 'rotate-180': isUserDropdownOpen }" class="icon" />
              </button>

              <!-- User Dropdown -->
              <div v-if="isUserDropdownOpen" class="user-dropdown">
                <NuxtLink to="/profile" class="dropdown-item">
                  <Icon name="heroicons:user-circle" class="icon" />
                  <span>Profile</span>
                </NuxtLink>
                <NuxtLink v-if="userRole === 'admin'" to="/admin/users" class="dropdown-item">
                  <Icon name="heroicons:chart-bar" class="icon" />
                  <span>Usuarios</span>
                </NuxtLink>
                <NuxtLink v-if="userRole === 'admin'" to="/admin/gallery" class="dropdown-item">
                  <Icon name="heroicons:photo" class="icon" />
                  <span>Galería</span>
                </NuxtLink>
                <div class="dropdown-divider"></div>
                <button @click="handleLogout" class="dropdown-item text-error">
                  <Icon name="heroicons:arrow-left-on-rectangle" class="icon" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </template>
        </div>
      </div>

      <!-- Mobile Menu Button -->
      <button class="mobile-menu-button" @click="toggleMobileMenu" :aria-expanded="isMobileMenuOpen">
        <span class="menu-icon" :class="{ 'open': isMobileMenuOpen }"></span>
      </button>
    </div>

    <!-- Mobile Menu Overlay -->
    <div v-if="isMobileMenuOpen" class="mobile-menu-overlay" @click="closeMobileMenu"></div>

    <!-- Mobile Menu -->
    <div v-if="isMobileMenuOpen" class="mobile-menu">
      <div class="mobile-menu-header">
        <div class="mobile-brand">
          <Icon name="heroicons:camera" class="icon" />
          <span>LANDING</span>
        </div>
        <button @click="closeMobileMenu" class="mobile-close">
          <Icon name="heroicons:x-mark" class="icon" />
        </button>
      </div>

      <div class="mobile-menu-content">
        <NuxtLink to="/" class="mobile-link" @click="closeMobileMenu">
          <Icon name="heroicons:home" class="icon" />
          <span>Home</span>
        </NuxtLink>
        <NuxtLink to="/about" class="mobile-link" @click="closeMobileMenu">
          <Icon name="heroicons:user" class="icon" />
          <span>About</span>
        </NuxtLink>
        <NuxtLink to="/portfolio" class="mobile-link" @click="closeMobileMenu">
          <Icon name="heroicons:photo" class="icon" />
          <span>Portfolio</span>
        </NuxtLink>
        <NuxtLink to="/services" class="mobile-link" @click="closeMobileMenu">
          <Icon name="heroicons:briefcase" class="icon" />
          <span>Services</span>
        </NuxtLink>
        <NuxtLink to="/config" class="mobile-link" @click="closeMobileMenu" v-if="isLoggedIn">
          <Icon name="heroicons:cog-6-tooth" class="icon" />
          <span>Config</span>
        </NuxtLink>

        <div class="mobile-divider"></div>

        <template v-if="!isLoggedIn">
          <NuxtLink to="/login" class="mobile-link" @click="closeMobileMenu">
            <Icon name="heroicons:arrow-right-on-rectangle" class="icon" />
            <span>Login</span>
          </NuxtLink>
          <NuxtLink to="/register" class="mobile-link primary" @click="closeMobileMenu">
            <Icon name="heroicons:user-plus" class="icon" />
            <span>Register</span>
          </NuxtLink>
        </template>
        <template v-else>
          <NuxtLink to="/profile" class="mobile-link" @click="closeMobileMenu">
            <Icon name="heroicons:user-circle" class="icon" />
            <span>Profile</span>
          </NuxtLink>
          <NuxtLink v-if="userRole === 'admin'" to="/admin/users" class="mobile-link" @click="closeMobileMenu">
            <Icon name="heroicons:chart-bar" class="icon" />
            <span>Usuarios</span>
          </NuxtLink>
          <NuxtLink v-if="userRole === 'admin'" to="/admin/gallery" class="mobile-link" @click="closeMobileMenu">
            <Icon name="heroicons:photo" class="icon" />
            <span>Galería</span>
          </NuxtLink>
          <button @click="handleLogoutAndClose" class="mobile-link text-error">
            <Icon name="heroicons:arrow-left-on-rectangle" class="icon" />
            <span>Logout</span>
          </button>
        </template>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isMobileMenuOpen = ref(false)
const isUserDropdownOpen = ref(false)
const isLoggedIn = ref(false)
const userRole = ref('')
const userName = ref('')

onMounted(() => {
  // Verificar si hay un token en localStorage
  const token = localStorage.getItem('token')
  const user = localStorage.getItem('user')

  if (token) {
    isLoggedIn.value = true
    if (user) {
      try {
        const userData = JSON.parse(user)
        userRole.value = userData.role || 'user'
        userName.value = userData.firstName || userData.email || 'User'
      } catch (error) {
        console.error('Error parsing user data:', error)
        userRole.value = 'user'
        userName.value = 'User'
      }
    }
  }
})

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
  if (isUserDropdownOpen.value) {
    isUserDropdownOpen.value = false
  }
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

const toggleUserDropdown = () => {
  isUserDropdownOpen.value = !isUserDropdownOpen.value
}

const handleLogout = () => {
  // Eliminar el token y actualizar el estado
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  isLoggedIn.value = false
  isUserDropdownOpen.value = false
  // Redirigir al login
  router.push('/login')
}

const handleLogoutAndClose = () => {
  handleLogout()
  closeMobileMenu()
}
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: var(--bg-navbar);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--border-light);
  transition: all var(--transition-normal);
}

.navbar-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--spacing-lg);
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 70px;
}

/* Brand Styles */
.navbar-brand .brand-link {
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  transition: transform var(--transition-fast);
}

.navbar-brand .brand-link:hover {
  transform: translateY(-1px);
}

.brand-logo {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.logo-icon {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
  border-radius: var(--radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: var(--text-lg);
  box-shadow: var(--shadow-md);
}

.brand-text {
  display: flex;
  flex-direction: column;
  line-height: 1.2;
}

.brand-main {
  font-family: var(--font-heading);
  font-size: var(--text-xl);
  font-weight: var(--font-bold);
  color: var(--text-primary);
  letter-spacing: -0.02em;
}

.brand-sub {
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

/* Navigation Links */
.navbar-menu {
  display: flex;
  align-items: center;
  gap: var(--spacing-2xl);
}

.navbar-links {
  display: flex;
  align-items: center;
  gap: var(--spacing-lg);
}

.nav-link {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-sm) var(--spacing-md);
  color: var(--text-secondary);
  text-decoration: none;
  font-weight: var(--font-medium);
  font-size: var(--text-sm);
  border-radius: var(--radius-md);
  transition: all var(--transition-fast);
  position: relative;
  overflow: hidden;
}

.nav-link::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, var(--color-primary-10), transparent);
  transition: left var(--transition-normal);
}

.nav-link:hover::before {
  left: 100%;
}

.nav-link:hover {
  color: var(--text-primary);
  background: var(--bg-secondary);
  transform: translateY(-1px);
}

.nav-link.nuxt-link-active {
  color: var(--color-primary);
  background: var(--color-primary-10);
}

.nav-link i {
  font-size: var(--text-base);
}

/* User Menu */
.user-menu {
  position: relative;
}

.user-button {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm) var(--spacing-md);
  background: var(--bg-secondary);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-lg);
  cursor: pointer;
  transition: all var(--transition-fast);
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
}

.user-button:hover {
  background: var(--bg-tertiary);
  border-color: var(--border-medium);
  transform: translateY(-1px);
  box-shadow: var(--shadow-sm);
}

.user-avatar {
  width: 32px;
  height: 32px;
  background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
  border-radius: var(--radius-full);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: var(--text-sm);
}

.user-name {
  color: var(--text-primary);
  max-width: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.user-button i:last-child {
  color: var(--text-muted);
  font-size: var(--text-xs);
  transition: transform var(--transition-fast);
}

.user-button i:last-child.rotate-180 {
  transform: rotate(180deg);
}

/* User Dropdown */
.user-dropdown {
  position: absolute;
  top: calc(100% + var(--spacing-sm));
  right: 0;
  min-width: 200px;
  background: var(--bg-card);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-xl);
  overflow: hidden;
  animation: slideDown var(--transition-normal) ease-out;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-md);
  color: var(--text-secondary);
  text-decoration: none;
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  transition: all var(--transition-fast);
  border: none;
  background: none;
  width: 100%;
  text-align: left;
  cursor: pointer;
}

.dropdown-item:hover {
  background: var(--bg-secondary);
  color: var(--text-primary);
}

.dropdown-item.text-error {
  color: var(--color-error);
}

.dropdown-item.text-error:hover {
  background: var(--color-error-light);
  color: var(--color-error);
}

.dropdown-divider {
  height: 1px;
  background: var(--border-light);
  margin: var(--spacing-xs) 0;
}

/* Button Styles */
.btn {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-sm) var(--spacing-lg);
  border-radius: var(--radius-lg);
  font-size: var(--text-sm);
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
  box-shadow: var(--shadow-md);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
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
  transform: translateY(-1px);
}

/* Mobile Menu */
.mobile-menu-button {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: var(--spacing-sm);
  border-radius: var(--radius-md);
  transition: background var(--transition-fast);
}

.mobile-menu-button:hover {
  background: var(--bg-secondary);
}

.menu-icon {
  display: block;
  width: 24px;
  height: 2px;
  background: var(--text-primary);
  position: relative;
  transition: all var(--transition-fast);
}

.menu-icon::before,
.menu-icon::after {
  content: '';
  position: absolute;
  width: 24px;
  height: 2px;
  background: var(--text-primary);
  transition: all var(--transition-fast);
}

.menu-icon::before {
  top: -8px;
}

.menu-icon::after {
  bottom: -8px;
}

.menu-icon.open {
  background: transparent;
}

.menu-icon.open::before {
  transform: rotate(45deg) translate(6px, 6px);
}

.menu-icon.open::after {
  transform: rotate(-45deg) translate(6px, -6px);
}

/* Mobile Menu Overlay */
.mobile-menu-overlay {
  position: fixed;
  top: 70px;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  z-index: 999;
}

/* Mobile Menu */
.mobile-menu {
  position: fixed;
  top: 70px;
  left: 0;
  right: 0;
  background: var(--bg-card);
  border-top: 1px solid var(--border-light);
  box-shadow: var(--shadow-xl);
  z-index: 1000;
  animation: slideDownMobile var(--transition-normal) ease-out;
}

@keyframes slideDownMobile {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.mobile-menu-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-lg);
  border-bottom: 1px solid var(--border-light);
}

.mobile-brand {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  font-family: var(--font-heading);
  font-weight: var(--font-bold);
  color: var(--text-primary);
}

.mobile-brand i {
  color: var(--color-primary);
}

.mobile-close {
  background: none;
  border: none;
  cursor: pointer;
  padding: var(--spacing-sm);
  border-radius: var(--radius-md);
  color: var(--text-secondary);
  transition: all var(--transition-fast);
}

.mobile-close:hover {
  background: var(--bg-secondary);
  color: var(--text-primary);
}

.mobile-menu-content {
  padding: var(--spacing-lg);
}

.mobile-link {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-md);
  color: var(--text-secondary);
  text-decoration: none;
  font-size: var(--text-base);
  font-weight: var(--font-medium);
  border-radius: var(--radius-md);
  transition: all var(--transition-fast);
  margin-bottom: var(--spacing-xs);
}

.mobile-link:hover {
  background: var(--bg-secondary);
  color: var(--text-primary);
  transform: translateX(4px);
}

.mobile-link.primary {
  background: linear-gradient(135deg, var(--color-primary), var(--color-primary-dark));
  color: white;
  margin-top: var(--spacing-md);
}

.mobile-link.primary:hover {
  background: linear-gradient(135deg, var(--color-primary-dark), var(--color-primary));
  transform: translateX(4px);
}

.mobile-link.text-error {
  color: var(--color-error);
}

.mobile-link.text-error:hover {
  background: var(--color-error-light);
  color: var(--color-error);
}

.mobile-divider {
  height: 1px;
  background: var(--border-light);
  margin: var(--spacing-lg) 0;
}

/* Responsive Design */
@media (max-width: 768px) {
  .navbar-menu {
    display: none;
  }

  .mobile-menu-button {
    display: flex;
  }

  .navbar-container {
    padding: 0 var(--spacing-md);
  }

  .brand-main {
    font-size: var(--text-lg);
  }

  .brand-sub {
    font-size: var(--text-xs);
  }
}

@media (max-width: 480px) {
  .navbar-container {
    height: 60px;
  }

  .mobile-menu {
    top: 60px;
  }

  .mobile-menu-overlay {
    top: 60px;
  }

  .logo-icon {
    width: 36px;
    height: 36px;
  }

  .brand-main {
    font-size: var(--text-base);
  }
}
</style>