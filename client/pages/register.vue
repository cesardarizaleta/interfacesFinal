<template>
  <palette-loader></palette-loader>
  <section class="relative h-screen w-screen overflow-hidden bg-stone-100 flex items-center justify-center">

    <div class="w-full max-w-md bg-white rounded-lg shadow-xl p-12 max-md:w-[80%]">
      <div class="mb-8 text-center">
        <h1 class="text-3xl font-bold uppercase tracking-widest text-stone-800">LANDING</h1>
        <p class="text-2xl font-light uppercase tracking-widest text-stone-600">PHOTOGRAPHY</p>
      </div>

      <form class="space-y-6" @submit.prevent="handleRegister">
        <div>
          <h2 class="text-2xl font-semibold text-stone-800">Create an Account</h2>
          <p class="text-sm text-stone-500">Sign up to get started</p>
        </div>

        <div class="space-y-4">
          <div>
            <label for="email" class="block text-sm font-medium text-stone-600 mb-1">Email *</label>
            <input
              type="email"
              id="email"
              v-model="email"
              placeholder="your@email.com"
              required
              class="w-full px-4 py-3 border border-stone-300 rounded focus:outline-none focus:ring-1 focus:ring-stone-500 text-sm"
            >
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-stone-600 mb-1">Password *</label>
            <input
              type="password"
              id="password"
              v-model="password"
              placeholder="••••••••"
              required
              minlength="8"
              class="w-full px-4 py-3 border border-stone-300 rounded focus:outline-none focus:ring-1 focus:ring-stone-500 text-sm"
            >
          </div>

          <div>
            <label for="confirm-password" class="block text-sm font-medium text-stone-600 mb-1">Confirm Password *</label>
            <input
              type="password"
              id="confirm-password"
              v-model="confirmPassword"
              placeholder="••••••••"
              required
              class="w-full px-4 py-3 border border-stone-300 rounded focus:outline-none focus:ring-1 focus:ring-stone-500 text-sm"
            >
          </div>
        </div>

        <button type="submit" class="w-full bg-stone-700 text-white py-3 rounded hover:bg-stone-800 transition transform hover:-translate-y-0.5 shadow-md px-4" :disabled="loading">
          {{ loading ? 'Registrando...' : 'Register' }}
        </button>

        <p v-if="error" class="text-red-500 text-center text-sm">{{ error }}</p>
        <p v-if="successMessage" class="text-green-600 text-center text-sm">{{ successMessage }}</p>


        <NuxtLink to="/" class="block text-center text-stone-600 hover:text-stone-800 mt-4 hover:underline">
          Volver a la página principal
        </NuxtLink>

        <p class="text-center text-sm text-stone-600">
          Already have an account?
          <NuxtLink to="login" class="font-medium text-stone-800 hover:text-stone-900">Sign in</NuxtLink>
        </p>
      </form>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import { navigateTo } from '#app'; // Importa navigateTo de Nuxt
import PaletteLoader from "@/components/ui/PaletteLoader.vue";

// Estados reactivos para los campos del formulario y el manejo de la UI
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const loading = ref(false);
const error = ref(null);
const successMessage = ref(null);

const handleRegister = async () => {
  loading.value = true;
  error.value = null; // Limpiar errores previos
  successMessage.value = null; // Limpiar mensajes de éxito previos

  if (password.value !== confirmPassword.value) {
    error.value = 'Las contraseñas no coinciden.';
    loading.value = false;
    return;
  }

  try {
    const response = await fetch(`${useRuntimeConfig().public.BACKEND_URL}/api/users`, { // ¡CAMBIA ESTO POR TU ENDPOINT REAL!
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
      throw new Error(errorData.message || 'Error al registrar el usuario. Inténtalo de nuevo.');
    }

    const data = await response.json();

    if (data.token) {
      localStorage.setItem('token', data.token);
      successMessage.value = '¡Registro exitoso! Redirigiendo...';
      await navigateTo('/');
    } else {
      successMessage.value = '¡Registro exitoso! Por favor, inicia sesión.';
      await navigateTo('/login');
    }

  } catch (err) {
    console.error('Error durante el registro:', err);
    error.value = err.message || 'Ocurrió un error inesperado al registrar el usuario.';
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
/* Override Tailwind classes with palette colors */
.bg-stone-100 { background-color: var(--background-neutral); }
.bg-white { background-color: var(--color-secondary); }
.text-stone-800 { color: var(--color-primary); }
.text-stone-600 { color: var(--color-text); }
.text-stone-500 { color: var(--color-text-light); }
.border-stone-300 { border-color: var(--color-accent); }
.focus\:ring-stone-500:focus { --tw-ring-color: var(--color-primary); }
.bg-stone-700 { background-color: var(--color-primary); }
.hover\:bg-stone-800:hover { background-color: var(--color-accent); }
.text-red-500 { color: var(--color-accent); }
.text-green-600 { color: var(--color-primary); }
.hover\:text-stone-800:hover { color: var(--color-accent); }
.text-stone-900 { color: var(--color-primary); }
.hover\:text-stone-900:hover { color: var(--color-primary); }
</style>