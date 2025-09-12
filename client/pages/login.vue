<template>
  <section class="login-section">

    <div class="login-container">
      <div class="login-header">
        <h1 class="brand-title">LANDING</h1>
        <p class="brand-subtitle">PHOTOGRAPHY</p>
      </div>

      <form class="login-form" @submit.prevent="handleLogin">
        <div class="form-header">
          <h2>Welcome Back</h2>
          <p>Sign in to your account</p>
        </div>

        <div class="form-content">
          <div class="form-group">
            <label for="email">Email</label>
            <input
              type="email"
              id="email"
              v-model="email"
              placeholder="your@email.com"
              required
            >
          </div>

          <div class="form-group">
            <label for="password">Password</label>
            <input
              type="password"
              id="password"
              v-model="password"
              placeholder="••••••••"
              required
            >
          </div>
        </div>

        <button type="submit" class="submit-button" :disabled="loading">
          {{ loading ? 'Iniciando sesión...' : 'Sign In' }}
        </button>

        <p v-if="error" class="error-message">{{ error }}</p>

        <NuxtLink to="/" class="home-link">
          Volver a la página principal
        </NuxtLink>

        <p class="register-text">
          Don't have an account?
          <NuxtLink to="/register" class="register-link">Sign up</NuxtLink>
        </p>
      </form>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import { navigateTo } from '#app';
import { useToast } from '~/composables/useToast';

const { show } = useToast();

const email = ref('');
const password = ref('');
const loading = ref(false);
const error = ref(null);

const handleLogin = async () => {
  loading.value = true;
  error.value = null;

  try {
    const response = await fetch(`${useRuntimeConfig().public.BACKEND_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email.value,
        password: password.value,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Credenciales inválidas. Inténtalo de nuevo.');
    }

    const data = await response.json();

    if (data.token) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      show('Inicio de sesión exitoso', 'success');
      await navigateTo('/');
    } else {
      throw new Error('Token no recibido de la API.');
    }

  } catch (err) {
    const errorMessage = err.message || 'Ocurrió un error inesperado al iniciar sesión.';
    show(errorMessage, 'error');
    error.value = errorMessage;
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.login-section {
  position: relative;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  background-color: var(--color-background);
  display: flex;
  align-items: center;
  justify-content: center;
}

.background-image {
  position: absolute;
  bottom: 0;
  right: 0;
  overflow: hidden;
  height: 60%;
  z-index: 0;
}

.background-image img {
  height: 100%;
  object-fit: cover;
}

.login-container {
  width: 100%;
  max-width: 28rem;
  background-color: var(--color-background);
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 3rem;
  position: relative;
  z-index: 1;
}

.login-header {
  margin-bottom: 2rem;
  text-align: center;
}

.brand-title {
  font-size: 1.875rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--color-text);
  margin: 0;
}

.brand-subtitle {
  font-size: 1.5rem;
  font-weight: 300;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--color-text);
  margin: 0;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-header {
  margin-bottom: 1rem;
}

.form-header h2 {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--color-text);
  margin: 0 0 0.25rem 0;
}

.form-header p {
  font-size: 0.875rem;
  color: var(--color-text);
  margin: 0;
}

.form-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.form-group label {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-text);
}

.form-group input {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid var(--color-primary);
  border-radius: 0.25rem;
  font-size: 0.875rem;
  color: var(--color-text);
  background-color: var(--color-background);
  transition: all 0.3s ease;
}

.form-group input::placeholder {
  color: #6b7280;
  opacity: 1;
}

.form-group input:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 2px var(--color-primary);
}

.submit-button {
  width: 100%;
  padding: 0.75rem;
  background-color: var(--color-primary);
  color: white;
  border: none;
  border-radius: 0.25rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.submit-button:hover:not(:disabled) {
  background-color: var(--color-secondary);
  transform: translateY(-1px);
}

.submit-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.error-message {
  color: #ef4444;
  font-size: 0.875rem;
  text-align: center;
}

.home-link {
  display: block;
  text-align: center;
  color: var(--color-text);
  text-decoration: none;
  font-size: 0.875rem;
  transition: color 0.3s ease;
}

.home-link:hover {
  color: var(--color-secondary);
  text-decoration: underline;
}

.register-text {
  text-align: center;
  font-size: 0.875rem;
  color: var(--color-text);
}

.register-link {
  color: var(--color-primary);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
}

.register-link:hover {
  color: var(--color-secondary);
}

@media (max-width: 768px) {
  .login-container {
    width: 80%;
    padding: 2.5rem;
  }
}
</style>