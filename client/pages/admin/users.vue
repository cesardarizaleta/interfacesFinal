<template>
  <navbar-element></navbar-element>
  <div class="min-h-screen pt-20 py-12" :style="{ background: 'linear-gradient(135deg, var(--background-neutral) 0%, rgba(139, 69, 19, 0.02) 100%)' }">
    <div class="container mx-auto px-6">
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-amber-900 mb-4">Gestión de Usuarios</h1>
        <p class="text-amber-700 text-lg">Administra los usuarios del sistema de manera eficiente</p>
      </div>

      <div class="bg-white rounded-lg shadow-lg p-8">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-2xl font-semibold text-amber-900">Lista de Usuarios</h2>
          <div class="flex gap-4">
            <button @click="openCreateModal" class="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-colors">
              <Icon name="heroicons:plus" class="w-5 h-5" />
              Crear Usuario
            </button>
            <button @click="exportUsers" class="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-colors">
              <Icon name="heroicons:arrow-down-tray" class="w-5 h-5" />
              Exportar Usuarios
            </button>
          </div>
        </div>

        <div v-if="loading" class="text-center py-8">
          <Icon name="heroicons:arrow-path" class="w-8 h-8 animate-spin text-amber-600 mx-auto mb-4" />
          <p class="text-amber-600">Cargando usuarios...</p>
        </div>

        <div v-else-if="users.length === 0" class="text-center py-8">
          <Icon name="heroicons:users" class="w-16 h-16 text-amber-300 mx-auto mb-4" />
          <p class="text-amber-600">No hay usuarios registrados</p>
        </div>

        <div v-else class="overflow-x-auto">
          <table class="w-full table-auto border-collapse">
            <thead>
              <tr class="bg-amber-50">
                <th class="px-6 py-3 text-left text-xs font-medium text-amber-700 uppercase tracking-wider">ID</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-amber-700 uppercase tracking-wider">Nombre</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-amber-700 uppercase tracking-wider">Email</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-amber-700 uppercase tracking-wider">Rol</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-amber-700 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-amber-100">
              <tr v-for="user in users" :key="user.id" class="hover:bg-amber-25">
                <td class="px-6 py-4 whitespace-nowrap text-sm text-amber-900">{{ user.id }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-amber-900">{{ user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : user.email }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-amber-900">{{ user.email }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-amber-900">
                  <span :class="user.role === 'admin' ? 'bg-yellow-100 text-yellow-800' : 'bg-amber-100 text-amber-800'" class="px-2 py-1 rounded-full text-xs font-medium">
                    {{ user.role }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button @click="editUser(user)" class="text-amber-600 hover:text-amber-900 mr-4">
                    <Icon name="heroicons:pencil" class="w-5 h-5" />
                  </button>
                  <button @click="deleteUser(user)" class="text-red-600 hover:text-red-900">
                    <Icon name="heroicons:trash" class="w-5 h-5" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Modal para editar/crear usuario -->
      <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white rounded-lg p-8 w-full max-w-md mx-4">
          <h3 class="text-xl font-bold text-amber-900 mb-6">{{ isEditing ? 'Editar Usuario' : 'Crear Usuario' }}</h3>
          <form @submit.prevent="saveUser" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-amber-700 mb-1">Nombre</label>
              <input v-model="formData.firstName" type="text" class="w-full px-3 py-2 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500" required>
            </div>
            <div>
              <label class="block text-sm font-medium text-amber-700 mb-1">Apellido</label>
              <input v-model="formData.lastName" type="text" class="w-full px-3 py-2 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500" required>
            </div>
            <div>
              <label class="block text-sm font-medium text-amber-700 mb-1">Email</label>
              <input v-model="formData.email" type="email" class="w-full px-3 py-2 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500" required>
            </div>
            <div>
              <label class="block text-sm font-medium text-amber-700 mb-1">Rol</label>
              <select v-model="formData.role" class="w-full px-3 py-2 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500" required>
                <option value="user">Usuario</option>
                <option value="admin">Administrador</option>
              </select>
            </div>
            <div v-if="!isEditing">
              <label class="block text-sm font-medium text-amber-700 mb-1">Contraseña</label>
              <input v-model="formData.password" type="password" class="w-full px-3 py-2 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500" required>
            </div>
            <div class="flex gap-4 pt-4">
              <button type="submit" class="flex-1 bg-amber-600 hover:bg-amber-700 text-white py-2 rounded-lg transition-colors">{{ isEditing ? 'Guardar' : 'Crear' }}</button>
              <button type="button" @click="closeModal" class="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-2 rounded-lg transition-colors">Cancelar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  <footer-element></footer-element>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue';
import NavbarElement from "@/components/navigation/NavbarElement.vue";
import FooterElement from "@/components/navigation/FooterElement.vue";
import { useToast } from '~/composables/useToast';
import { usePalette } from '~/composables/usePalette';
import { useFonts } from '~/composables/useFonts';

definePageMeta({
  middleware: ['admin']
});

const users = ref([]);
const loading = ref(true);
const showModal = ref(false);
const isEditing = ref(false);
const editingUser = ref(null);
const formData = ref({
  firstName: '',
  lastName: '',
  email: '',
  role: 'user',
  password: ''
});
const { show } = useToast();
const { setActivePalette, activePalette, defaultPalette, applyColorsToPage } = usePalette();
const { loadAssignedFonts, applyFontsToPage } = useFonts();

// Referencia para el listener de autenticación
const authListenerRef = ref(null);

// Configuración de colores por defecto
const defaultColors = {
  colorPrimary: '#8B4513',
  backgroundNeutral: '#F5F5DC',
  colorAccent: '#DAA520',
  colorSecondary: '#FFFFFF',
  colorText: '#2F1B14',
  colorTextLight: '#8B7355'
};

// Configuración de fuentes por defecto
const defaultFonts = {
  fontFamily: 'Poppins, Calibri, sans-serif',
  titleSize: 8,
  subtitleSize: 6,
  paragraphSize: 10,
  fontTitleFilePath: null,
  fontSubtitleFilePath: null
};

// Función para aplicar variables CSS de colores
const applyColors = (colors) => {
  const root = document.documentElement;
  const colorMapping = {
    colorPrimary: '--color-primary',
    backgroundNeutral: '--background-neutral',
    colorAccent: '--color-accent',
    colorSecondary: '--color-secondary',
    colorText: '--color-text',
    colorTextLight: '--color-text-light',
    // Mapeos adicionales para compatibilidad
    bgPrimary: '--bg-primary',
    bgSecondary: '--bg-secondary',
    bgAccent: '--bg-accent',
    bgNeutral: '--bg-neutral',
    borderPrimary: '--border-primary',
    borderSecondary: '--border-secondary',
    borderAccent: '--border-accent'
  };

  // Aplicar colores principales
  Object.entries(colors).forEach(([key, value]) => {
    const cssVar = colorMapping[key];
    if (cssVar && value) {
      root.style.setProperty(cssVar, value);
    }
  });

  // Aplicar colores derivados
  if (colors.colorPrimary) {
    root.style.setProperty('--bg-primary', colors.colorPrimary);
    root.style.setProperty('--border-primary', colors.colorPrimary);
  }
  if (colors.colorSecondary) {
    root.style.setProperty('--bg-secondary', colors.colorSecondary);
    root.style.setProperty('--border-secondary', colors.colorSecondary);
  }
  if (colors.colorAccent) {
    root.style.setProperty('--bg-accent', colors.colorAccent);
    root.style.setProperty('--border-accent', colors.colorAccent);
  }
  if (colors.backgroundNeutral) {
    root.style.setProperty('--bg-neutral', colors.backgroundNeutral);
  }

  // Forzar actualización de elementos dinámicos
  setTimeout(() => {
    const event = new CustomEvent('colorsUpdated', { detail: colors });
    document.dispatchEvent(event);
  }, 100);
};

// Función para inicializar colores y fuentes
const initializeTheme = async () => {
  try {
    // Aplicar colores por defecto
    applyColors(defaultColors);

    // Cargar y aplicar fuentes
    await loadAssignedFonts();
    applyFontsToPage(defaultFonts);
  } catch (error) {
    console.error('Error initializing theme:', error);
  }
};

const fetchUsers = async () => {
  try {
    const response = await fetch(`${useRuntimeConfig().public.BACKEND_URL}/users`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    if (response.ok) {
      users.value = await response.json();
    } else {
      show('Error al cargar usuarios', 'error');
    }
  } catch (error) {
    show('Error de conexión', 'error');
  } finally {
    loading.value = false;
  }
};

const openCreateModal = () => {
  isEditing.value = false;
  editingUser.value = null;
  formData.value = {
    firstName: '',
    lastName: '',
    email: '',
    role: 'user',
    password: ''
  };
  showModal.value = true;
};

const deleteUser = async (user) => {
  const userName = user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : user.email;
  if (confirm(`¿Estás seguro de eliminar al usuario ${userName}?`)) {
    try {
      const response = await fetch(`${useRuntimeConfig().public.BACKEND_URL}/users/${user.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.ok) {
        users.value = users.value.filter(u => u.id !== user.id);
        show('Usuario eliminado correctamente', 'success');
      } else {
        show('Error al eliminar usuario', 'error');
      }
    } catch (error) {
      show('Error de conexión', 'error');
    }
  }
};

const closeModal = () => {
  showModal.value = false;
  isEditing.value = false;
  editingUser.value = null;
};

const saveUser = async () => {
  try {
    const dataToSend = { ...formData.value };
    if (!dataToSend.password) {
      delete dataToSend.password;
    }

    let response;
    if (isEditing.value) {
      response = await fetch(`${useRuntimeConfig().public.BACKEND_URL}/users/${editingUser.value.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(dataToSend)
      });
    } else {
      response = await fetch(`${useRuntimeConfig().public.BACKEND_URL}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(dataToSend)
      });
    }

    if (response.ok) {
      const updatedUser = await response.json();
      if (isEditing.value) {
        const index = users.value.findIndex(u => u.id === editingUser.value.id);
        users.value[index] = updatedUser;
        show('Usuario actualizado correctamente', 'success');
      } else {
        users.value.push(updatedUser);
        show('Usuario creado correctamente', 'success');
      }
      closeModal();
    } else {
      show('Error al guardar usuario', 'error');
    }
  } catch (error) {
    show('Error de conexión', 'error');
  }
};

const exportUsers = () => {
  // Crear un enlace temporal para descargar el archivo
  const link = document.createElement('a');
  link.href = `${useRuntimeConfig().public.BACKEND_URL}/users/admin/export`;
  link.setAttribute('download', 'usuarios_landing_photography.xlsx');
  link.setAttribute('target', '_blank');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  show('Exportando usuarios...', 'info');
};

onMounted(async () => {
  await initializeTheme();
  fetchUsers();
});
</script>