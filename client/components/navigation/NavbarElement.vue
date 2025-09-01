<template>
  <nav class="navbar">
    <div class="navbar-container">
      <div class="navbar-brand">
        <p class="brand-main">Photography</p>
        <p class="brand-sub">Studio</p>
      </div>

      <div class="navbar-menu">
        <div class="navbar-links">
          <NuxtLink to="/" class="navbar-link">Home</NuxtLink>
          <NuxtLink to="/about" class="navbar-link">About</NuxtLink>
          <NuxtLink to="/portfolio" class="navbar-link">Portfolio</NuxtLink>
          <NuxtLink to="/services" class="navbar-link">Services</NuxtLink>
          <NuxtLink to="/config" class="navbar-link">Config</NuxtLink>
        </div>

        <div class="navbar-actions">
          <template v-if="!isLoggedIn">
            <NuxtLink to="/login" class="login-button">Login</NuxtLink>
            <NuxtLink to="/register" class="register-button">Register</NuxtLink>
          </template>
          <button v-else @click="handleLogout" class="logout-button">Logout</button>
        </div>
      </div>

      <button class="mobile-menu-button" @click="toggleMobileMenu">
        <span class="menu-icon"></span>
      </button>
    </div>

    <div v-if="isMobileMenuOpen" class="mobile-menu">
      <NuxtLink to="/" class="mobile-link" @click="closeMobileMenu">Home</NuxtLink>
      <NuxtLink to="/about" class="mobile-link" @click="closeMobileMenu">About</NuxtLink>
      <NuxtLink to="/portfolio" class="mobile-link" @click="closeMobileMenu">Portfolio</NuxtLink>
      <NuxtLink to="/services" class="mobile-link" @click="closeMobileMenu">Services</NuxtLink>
      <NuxtLink to="/config" class="mobile-link" @click="closeMobileMenu">Config</NuxtLink>
      <template v-if="!isLoggedIn">
        <NuxtLink to="/login" class="mobile-link" @click="closeMobileMenu">Login</NuxtLink>
        <NuxtLink to="/register" class="mobile-link" @click="closeMobileMenu">Register</NuxtLink>
      </template>
      <button v-else @click="handleLogout" class="mobile-link">Logout</button>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isMobileMenuOpen = ref(false)
const isLoggedIn = ref(false)

onMounted(() => {
  // Verificar si hay un token en localStorage
  const token = localStorage.getItem('token')
  isLoggedIn.value = !!token
})

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

const handleLogout = () => {
  // Eliminar el token y actualizar el estado
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  isLoggedIn.value = false
  // Redirigir al login
  router.push('/login')
}
</script>

<style scoped>
.navbar {
  width: 100%;
  background-color: var(--color-background);
  padding: 1rem;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.navbar-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.navbar-brand {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.brand-main {
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  color: var(--color-primary);
  margin: 0;
  transition: color var(--transition-normal);
}

.brand-sub {
  font-size: 1.25rem;
  font-weight: 300;
  letter-spacing: 0.05em;
  color: var(--color-text);
  margin: 0;
  transition: color var(--transition-normal);
}

.navbar-menu {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.navbar-links {
  display: flex;
  gap: 1.5rem;
}

.navbar-link {
  color: var(--color-text);
  text-decoration: none;
  font-size: 1rem;
  font-weight: 500;
  transition: all var(--transition-normal);
  position: relative;
}

.navbar-link:hover {
  color: var(--color-primary);
}

.navbar-link::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 0;
  height: 2px;
  background-color: var(--color-primary);
  transition: width var(--transition-normal);
}

.navbar-link:hover::after {
  width: 100%;
}

.navbar-actions {
  display: flex;
  gap: 1rem;
}

.login-button,
.register-button,
.logout-button {
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all var(--transition-normal);
  text-decoration: none;
  display: inline-block;
  border: 2px solid transparent;
}

.login-button {
  background-color: var(--bg-primary);
  color: var(--color-text-light);
  border-color: var(--border-primary);
}

.login-button:hover {
  background-color: var(--bg-secondary);
  border-color: var(--border-secondary);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px var(--shadow-primary);
}

.register-button {
  background-color: transparent;
  color: var(--color-text);
  border-color: var(--border-primary);
}

.register-button:hover {
  background-color: var(--bg-primary);
  color: var(--color-text-light);
  border-color: var(--border-primary);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px var(--shadow-primary);
}

.logout-button {
  background-color: var(--bg-accent);
  color: var(--color-text-light);
  border-color: var(--border-accent);
}

.logout-button:hover {
  background-color: var(--bg-primary);
  border-color: var(--border-primary);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px var(--shadow-accent);
}

.logout-button {
  background-color: transparent;
  color: var(--color-text);
  border: 1px solid var(--color-primary);
}

.logout-button:hover {
  background-color: var(--color-primary);
  color: white;
}

.mobile-menu-button {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
}

.menu-icon {
  display: block;
  width: 24px;
  height: 2px;
  background-color: var(--color-text);
  position: relative;
  transition: background-color 0.3s ease;
}

.menu-icon::before,
.menu-icon::after {
  content: '';
  position: absolute;
  width: 24px;
  height: 2px;
  background-color: var(--color-text);
  transition: transform 0.3s ease;
}

.menu-icon::before {
  top: -6px;
}

.menu-icon::after {
  bottom: -6px;
}

.mobile-menu {
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: var(--color-background);
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.mobile-link {
  display: block;
  padding: 0.75rem 0;
  color: var(--color-text);
  text-decoration: none;
  font-size: 1rem;
  transition: color 0.3s ease;
}

.mobile-link:hover {
  color: var(--color-secondary);
}

@media (max-width: 768px) {
  .navbar-menu {
    display: none;
  }

  .mobile-menu-button {
    display: block;
  }

  .mobile-menu {
    display: flex;
    flex-direction: column;
  }
}
</style>