<template>
  <section class="min-h-screen px-4 sm:px-6 md:px-10 lg:px-24 py-12 sm:py-16 bg-gradient-to-br from-stone-50 to-stone-200 text-stone-800 font-sans relative">
    <div class="absolute inset-0 overflow-hidden opacity-10 -z-10">
      <img src="@/assets/image.jpg" alt="Photographer at work" class="w-full h-full object-cover object-center scale-110 blur-sm">
    </div>
    <div class="relative flex items-center justify-center mb-8 sm:mb-10">
      <NuxtLink
        to="/config"
        class="absolute left-0 top-1/2 -translate-y-1/2
               flex items-center text-stone-600 hover:text-stone-800
               transition-colors duration-200
               text-lg sm:text-xl md:text-2xl lg:text-3xl p-2 rounded-full
               hover:bg-stone-200 focus:outline-none focus:ring-2 z-[60] focus:ring-stone-500 focus:ring-opacity-50"
        aria-label="Volver al panel principal de configuración"
      >
          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M10 22L0 12L10 2 1.775 1.775L3.55 12l8.225 8.225z" /></svg>
      </NuxtLink>
      <h1 class="uppercase text-3xl sm:text-4xl md:text-5xl font-extrabold text-center text-stone-900 leading-tight">
        Configuración de Colores
      </h1>
    </div>
    <div class="bg-white rounded-xl shadow-lg p-6 sm:p-8 md:p-10 mb-8 sm:mb-12 border border-stone-200">
      <h2 class="text-2xl sm:text-3xl font-bold mb-6 text-center text-stone-800">Vista Previa en Vivo</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 items-center justify-items-center">
        <div class="flex flex-col items-center text-center w-full px-2">
          <button
            :style="{ backgroundColor: primaryColor, color: secondaryColor }"
            class="py-2.5 px-6 sm:py-3 sm:px-8 rounded-lg shadow-md transition-all duration-300 ease-in-out hover:opacity-90 text-sm sm:text-base font-semibold config-button"
          >
            Botón de Muestra
          </button>
          <p class="text-xs sm:text-sm mt-2 text-stone-500">Fondo Principal, Texto Secundario</p>
        </div>
        <div class="text-center w-full px-2">
          <h3 class="text-xl sm:text-2xl md:text-3xl font-extrabold mb-1 config-heading" :style="{ color: accentColor }">Título de Ejemplo</h3>
          <p class="text-sm sm:text-base config-text" :style="{ color: textColor }">Texto del cuerpo para previsualizar el color.</p>
          <p class="text-xs sm:text-sm mt-2 text-stone-500">Título de Acento, Texto del Cuerpo</p>
        </div>
        <div class="flex flex-col items-center text-center w-full px-2">
          <div
            class="h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 rounded-full flex items-center justify-center shadow-lg config-bg"
            :style="{ backgroundColor: neutralColor }"
          >
            <i class="fas fa-star text-3xl sm:text-4xl config-icon" :style="{ color: primaryColor }"></i>
          </div>
          <p class="text-xs sm:text-sm mt-2 text-stone-500">Fondo Neutro, Icono Principal</p>
        </div>
        <div class="flex flex-col items-center text-center w-full px-2">
          <button
            :style="{ backgroundColor: accentColor, color: secondaryColor }"
            class="py-2.5 px-6 sm:py-3 sm:px-8 rounded-lg border-2 transition-all duration-300 ease-in-out hover:opacity-90 text-sm sm:text-base font-semibold config-button"
          >
            Otro Botón
          </button>
          <p class="text-xs sm:text-sm mt-2 text-stone-500">Fondo de Acento, Texto Secundario</p>
        </div>
        <div class="text-center w-full px-2">
          <a href="#" class="font-medium text-base sm:text-lg hover:underline transition-colors duration-200 config-link" :style="{ color: primaryColor }">
            Enlace de Muestra
          </a>
          <p class="text-xs sm:text-sm mt-2 text-stone-500">Color de Enlace Principal</p>
        </div>
        <div class="flex flex-col items-center w-full max-w-xs px-2">
            <input
                type="text"
                placeholder="Entrada de Texto"
                :style="{ borderColor: primaryColor, color: textColor }"
                class="w-full px-3 py-2 sm:py-2.5 border rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-opacity-75 transition-all duration-300 text-sm sm:text-base focus:ring-stone-500 config-input"
            >
            <p class="text-xs sm:text-sm mt-2 text-stone-500">Borde Principal, Color de Texto</p>
        </div>
      </div>
    </div>
    <div class="bg-white rounded-xl shadow-lg p-6 sm:p-8 md:p-10 mb-8 border border-stone-200">
      <h2 class="text-2xl sm:text-3xl font-bold mb-6 text-center text-stone-800">Ajustar Colores</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 sm:gap-8">
        <div>
          <label for="primaryColor" class="block text-sm font-medium text-stone-600 mb-2">Color Primario</label>
          <input
            type="color"
            id="primaryColor"
            v-model="primaryColor"
            class="w-full h-10 sm:h-12 rounded-md cursor-pointer border border-stone-300 shadow-sm transition-shadow duration-200 hover:shadow-md"
          >
          <span class="block text-center text-xs mt-1 text-stone-500">{{ primaryColor }}</span>
        </div>
        <div>
          <label for="secondaryColor" class="block text-sm font-medium text-stone-600 mb-2">Color Secundario</label>
          <input
            type="color"
            id="secondaryColor"
            v-model="secondaryColor"
            class="w-full h-10 sm:h-12 rounded-md cursor-pointer border border-stone-300 shadow-sm transition-shadow duration-200 hover:shadow-md"
          >
          <span class="block text-center text-xs mt-1 text-stone-500">{{ secondaryColor }}</span>
        </div>
        <div>
          <label for="accentColor" class="block text-sm font-medium text-stone-600 mb-2">Color de Acento</label>
          <input
            type="color"
            id="accentColor"
            v-model="accentColor"
            class="w-full h-10 sm:h-12 rounded-md cursor-pointer border border-stone-300 shadow-sm transition-shadow duration-200 hover:shadow-md"
          >
          <span class="block text-center text-xs mt-1 text-stone-500">{{ accentColor }}</span>
        </div>
        <div>
          <label for="textColor" class="block text-sm font-medium text-stone-600 mb-2">Color de Texto</label>
          <input
            type="color"
            id="textColor"
            v-model="textColor"
            class="w-full h-10 sm:h-12 rounded-md cursor-pointer border border-stone-300 shadow-sm transition-shadow duration-200 hover:shadow-md"
          >
          <span class="block text-center text-xs mt-1 text-stone-500">{{ textColor }}</span>
        </div>
        <div>
          <label for="neutralColor" class="block text-sm font-medium text-stone-600 mb-2">Fondo Neutro</label>
          <input
            type="color"
            id="neutralColor"
            v-model="neutralColor"
            class="w-full h-10 sm:h-12 rounded-md cursor-pointer border border-stone-300 shadow-sm transition-shadow duration-200 hover:shadow-md"
          >
          <span class="block text-center text-xs mt-1 text-stone-500">{{ neutralColor }}</span>
        </div>
      </div>
      <div class="mt-8 flex justify-center">
        <button
          @click="openSavePaletteModal"
          class="px-6 py-3 bg-stone-800 text-white rounded-lg shadow-md hover:bg-stone-700 transition-colors duration-200 flex items-center space-x-2"
        >
          <i class="fas fa-save mr-2"></i>
          <span>Guardar Paleta Actual</span>
        </button>
      </div>
    </div>
    <div v-if="showSaveModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <h3 class="text-lg font-medium text-stone-900 mb-4">Guardar Paleta</h3>
        <div class="mb-4">
          <label for="paletteName" class="block text-sm font-medium text-stone-600 mb-2">Nombre de la Paleta</label>
          <input
            type="text"
            id="paletteName"
            v-model="newPaletteName"
            placeholder="Ej: Paleta Minimalista"
            class="w-full px-3 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-stone-500 focus:ring-opacity-50"
          >
          <p v-if="paletteNameError" class="text-red-500 text-xs mt-1">{{ paletteNameError }}</p>
        </div>
        <div class="flex justify-end space-x-3">
          <button
            @click="cancelSave"
            class="px-4 py-2 bg-stone-200 text-stone-800 rounded hover:bg-stone-300 transition-colors"
          >
            Cancelar
          </button>
          <button
            @click="savePalette"
            class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
    <div v-if="showDeleteModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <h3 class="text-lg font-medium text-stone-900 mb-4">Confirmar eliminación</h3>
        <p class="text-stone-600 mb-6">
          ¿Realmente desea eliminar la paleta <span class="font-semibold">{{ paletteToDelete?.name }}</span>?
        </p>
        <div class="flex justify-end space-x-3">
          <button
            @click="cancelDelete"
            class="px-4 py-2 bg-stone-200 text-stone-800 rounded hover:bg-stone-300 transition-colors"
          >
            Cancelar
          </button>
          <button
            @click="confirmDelete"
            class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
    <div v-if="showRenameModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <h3 class="text-lg font-medium text-stone-900 mb-4">Renombrar Paleta</h3>
        <div class="mb-4">
          <label for="newPaletteName" class="block text-sm font-medium text-stone-600 mb-2">Nuevo Nombre</label>
          <input
            type="text"
            id="newPaletteName"
            v-model="newPaletteName"
            placeholder="Ingrese un nuevo nombre"
            class="w-full px-3 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-stone-500 focus:ring-opacity-50"
          >
          <p v-if="paletteNameError" class="text-red-500 text-xs mt-1">{{ paletteNameError }}</p>
        </div>
        <div class="flex justify-end space-x-3">
          <button
            @click="cancelRename"
            class="px-4 py-2 bg-stone-200 text-stone-800 rounded hover:bg-stone-300 transition-colors"
          >
            Cancelar
          </button>
          <button
            @click="renamePalette"
            class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
    <div class="bg-white rounded-xl shadow-lg p-6 sm:p-8 md:p-10 mb-8 border border-stone-200">
      <h2 class="text-2xl sm:text-3xl font-bold mb-6 text-center text-stone-800">Paletas de Colores</h2>
      <div class="overflow-x-auto">
        <table class="w-full table-auto">
          <thead>
            <tr class="border-b border-stone-200">
              <th class="text-left py-3 px-4 font-semibold text-stone-700">Nombre</th>
              <th class="text-left py-3 px-4 font-semibold text-stone-700">Vista Previa</th>
              <th class="text-left py-3 px-4 font-semibold text-stone-700">Estado</th>
              <th class="text-center py-3 px-4 font-semibold text-stone-700">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="loadingPalettes">
              <td colspan="4" class="text-center py-8 text-stone-500">
                Cargando paletas...
              </td>
            </tr>
            <tr v-else-if="paletteFetchError">
              <td colspan="4" class="text-center py-8 text-red-500">
                Error al cargar las paletas: {{ paletteFetchError }}
              </td>
            </tr>
            <tr v-else-if="palettes.length === 0">
              <td colspan="4" class="text-center py-8 text-stone-500">
                No hay paletas guardadas
              </td>
            </tr>
            <tr v-for="palette in palettes" :key="palette.id" class="border-b border-stone-200">
              <td class="py-4 px-4">
                <div class="flex items-center space-x-2">
                  <i 
                    :class="[
                      'fas',
                      palette.isDefault ? 'fa-palette' : 'fa-swatchbook',
                      'text-stone-400'
                    ]"
                  ></i>
                  <div>
                    <p class="font-medium text-stone-900">{{ palette.name }}</p>
                    <p class="text-xs text-stone-500">
                      {{ palette.isDefault ? 'Predeterminada' : 'Personalizada' }}
                    </p>
                  </div>
                </div>
              </td>
              <td class="py-4 px-4">
                <div class="flex gap-2">
                  <div class="w-6 h-6 rounded-full border border-stone-200" :style="{ backgroundColor: palette.colorPrimary }"></div>
                  <div class="w-6 h-6 rounded-full border border-stone-200" :style="{ backgroundColor: palette.colorSecondary }"></div>
                  <div class="w-6 h-6 rounded-full border border-stone-200" :style="{ backgroundColor: palette.colorAccent }"></div>
                  <div class="w-6 h-6 rounded-full border border-stone-200" :style="{ backgroundColor: palette.colorText }"></div>
                  <div class="w-6 h-6 rounded-full border border-stone-200" :style="{ backgroundColor: palette.backgroundNeutral }"></div>
                </div>
              </td>
              <td class="py-4 px-4">
                <span v-if="isActivePalette(palette)" class="text-green-600 font-medium">Activa</span>
                <span v-else class="text-stone-500">Inactiva</span>
              </td>
              <td class="py-4 px-4 text-center">
                <button
                  @click="activatePalette(palette)"
                  :class="[
                    'px-3 py-1 rounded text-xs font-medium transition-colors mr-2',
                    isActivePalette(palette)
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-blue-500 text-white hover:bg-blue-600'
                  ]"
                  :disabled="isActivePalette(palette)"
                >
                  <i class="fas fa-check-circle mr-1"></i>
                  {{ isActivePalette(palette) ? 'Activa' : 'Aplicar' }}
                </button>
                <button
                  v-if="!palette.isDefault"
                  @click="openRenameModal(palette)"
                  class="px-3 py-1 bg-stone-500 text-white rounded text-xs font-medium hover:bg-stone-600 transition-colors mr-2"
                >
                  <i class="fas fa-edit mr-1"></i>
                  Renombrar
                </button>
                <button
                  v-if="!palette.isDefault"
                  @click="confirmDeletePalette(palette)"
                  class="px-3 py-1 bg-red-500 text-white rounded text-xs font-medium hover:bg-red-600 transition-colors"
                >
                  <i class="fas fa-trash mr-1"></i>
                  Eliminar
                </button>
                <span
                  v-if="palette.isDefault"
                  class="px-3 py-1 bg-gray-100 text-gray-500 rounded text-xs font-medium cursor-not-allowed"
                >
                  <i class="fas fa-lock mr-1"></i>
                  Predeterminada
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>

  <ToastMessage
    :show="showToast"
    :type="toastType"
    :message="toastMessage"
  />
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useToast } from '~/composables/useToast'
import { usePalette } from '~/composables/usePalette'
import ToastMessage from '~/components/ui/ToastMessage.vue'

definePageMeta({
  middleware: ['auth']
});

// Configuración
const config = useRuntimeConfig();
const BACKEND_URL = config.public.BACKEND_URL;

// Estados reactivos
const primaryColor = ref('#57534E');
const secondaryColor = ref('#FFFFFF');
const accentColor = ref('#44403C');
const textColor = ref('#78716C');
const neutralColor = ref('#E7E5E4');

const palettes = ref([]);
const activePaletteId = ref(null);
const loadingPalettes = ref(true);
const paletteFetchError = ref(null);

// Estados de modales
const showSaveModal = ref(false);
const showDeleteModal = ref(false);
const showRenameModal = ref(false);
const newPaletteName = ref('');
const paletteNameError = ref('');
const paletteToDelete = ref(null);
const paletteToRename = ref(null);

// Toast notifications
const { showToast, toastMessage, toastType, show: showToastMessage } = useToast()

// Palette composable
const { setActivePalette, applyColorsToPage } = usePalette()

// Funciones de utilidad
const isActivePalette = (palette) => palette.id === activePaletteId.value;

// Funciones de carga de datos
const fetchUserPalettes = async () => {
  loadingPalettes.value = true;
  paletteFetchError.value = null;

  try {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    if (!user) throw new Error('Usuario no encontrado');

    const userData = JSON.parse(user);
    const response = await fetch(`${BACKEND_URL}/api/colors/user/${userData.id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) throw new Error('Error al cargar las paletas');

    const data = await response.json();
    palettes.value = data;

    // Encontrar la paleta activa
    const activePalette = data.find(p => p.isActive);
    if (activePalette) {
      activePaletteId.value = activePalette.id;
      applyPalette(activePalette);
      // Aplicar colores globalmente cuando se carga la página
      applyColorsToPage(activePalette);
    }
  } catch (error) {
    console.error('Error:', error);
    paletteFetchError.value = error.message;
  } finally {
    loadingPalettes.value = false;
  }
};

// Funciones de manejo de paletas
const applyPalette = (palette) => {
  if (!palette) return;

  // Solo aplicar localmente en la página de configuración, no globalmente
  primaryColor.value = palette.colorPrimary || '#57534E';
  secondaryColor.value = palette.colorSecondary || '#FFFFFF';
  accentColor.value = palette.colorAccent || '#44403C';
  textColor.value = palette.colorText || '#78716C';
  neutralColor.value = palette.backgroundNeutral || '#E7E5E4';
};

const activatePalette = async (palette) => {
  if (isActivePalette(palette)) return;

  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${BACKEND_URL}/api/colors/${palette.id}/activate`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) throw new Error('Error al activar la paleta');

    const activatedPalette = await response.json();

    // Actualizar la paleta activa
    activePaletteId.value = activatedPalette.id;
    applyPalette(activatedPalette);

    // Aplicar colores globalmente a toda la aplicación
    applyColorsToPage(activatedPalette);

    // Actualizar la lista de paletas
    const index = palettes.value.findIndex(p => p.id === activatedPalette.id);
    if (index !== -1) {
      palettes.value[index] = activatedPalette;
    }

    showToastMessage('Paleta activada exitosamente', 'success');
  } catch (error) {
    console.error('Error al activar la paleta:', error);
    showToastMessage('Error al activar la paleta', 'error');
  }
};

// Funciones de guardado
const openSavePaletteModal = () => {
  newPaletteName.value = '';
  paletteNameError.value = '';
  showSaveModal.value = true;
};

const cancelSave = () => {
  showSaveModal.value = false;
  newPaletteName.value = '';
  paletteNameError.value = '';
};

const savePalette = async () => {
  if (!newPaletteName.value.trim()) {
    paletteNameError.value = 'El nombre es obligatorio';
    return;
  }

  try {
    const token = localStorage.getItem('token');
    const newPaletteData = {
      name: newPaletteName.value.trim(),
      colorPrimary: primaryColor.value,
      colorSecondary: secondaryColor.value,
      colorAccent: accentColor.value,
      colorText: textColor.value,
      backgroundNeutral: neutralColor.value
    };

    const response = await fetch(`${BACKEND_URL}/api/colors`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(newPaletteData)
    });

    if (!response.ok) throw new Error('Error al guardar la paleta');

    const savedPalette = await response.json();
    palettes.value.push(savedPalette);
    showSaveModal.value = false;
    newPaletteName.value = '';
    showToastMessage('Paleta guardada exitosamente', 'success');
  } catch (error) {
    console.error('Error al guardar la paleta:', error);
    paletteNameError.value = error.message;
    showToastMessage('Error al guardar la paleta', 'error');
  }
};

// Funciones de eliminación
const confirmDeletePalette = (palette) => {
  paletteToDelete.value = palette;
  showDeleteModal.value = true;
};

const cancelDelete = () => {
  showDeleteModal.value = false;
  paletteToDelete.value = null;
};

const confirmDelete = async () => {
  if (!paletteToDelete.value) return;

  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${BACKEND_URL}/api/colors/${paletteToDelete.value.id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) throw new Error('Error al eliminar la paleta');

    palettes.value = palettes.value.filter(p => p.id !== paletteToDelete.value.id);
    if (activePaletteId.value === paletteToDelete.value.id) {
      activePaletteId.value = null;
    }
    showDeleteModal.value = false;
    paletteToDelete.value = null;
    showToastMessage('Paleta eliminada exitosamente', 'success');
  } catch (error) {
    console.error('Error al eliminar la paleta:', error);
    showToastMessage('Error al eliminar la paleta', 'error');
  }
};

// Funciones de renombrado
const openRenameModal = (palette) => {
  paletteToRename.value = palette;
  newPaletteName.value = palette.name;
  paletteNameError.value = '';
  showRenameModal.value = true;
};

const cancelRename = () => {
  showRenameModal.value = false;
  paletteToRename.value = null;
  newPaletteName.value = '';
  paletteNameError.value = '';
};

const renamePalette = async () => {
  if (!paletteToRename.value || !newPaletteName.value.trim()) {
    paletteNameError.value = 'El nombre es obligatorio';
    return;
  }

  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${BACKEND_URL}/api/colors/${paletteToRename.value.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ name: newPaletteName.value.trim() })
    });

    if (!response.ok) throw new Error('Error al renombrar la paleta');

    const updatedPalette = await response.json();
    const index = palettes.value.findIndex(p => p.id === updatedPalette.id);
    if (index !== -1) {
      palettes.value[index] = updatedPalette;
    }
    showRenameModal.value = false;
    paletteToRename.value = null;
    newPaletteName.value = '';
    showToastMessage('Paleta renombrada exitosamente', 'success');
  } catch (error) {
    console.error('Error al renombrar la paleta:', error);
    paletteNameError.value = error.message;
    showToastMessage('Error al renombrar la paleta', 'error');
  }
};

// Inicialización
onMounted(() => {
  document.body.classList.add('config-page')
  fetchUserPalettes();
});

onUnmounted(() => {
  document.body.classList.remove('config-page')
})
</script>

<style scoped>
/* Estilos para la tabla */
table {
  border-collapse: collapse;
}
/* Responsive table */
@media (max-width: 768px) {
  .overflow-x-auto {
    overflow-x: auto;
  }
  table {
    min-width: 600px;
  }
}
/* Animaciones para modales */
.fixed {
  animation: fadeIn 0.2s ease-out;
}
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
.transform {
  animation: scaleIn 0.2s ease-out;
}
@keyframes scaleIn {
  from { transform: scale(0.95); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}
/* Estilos para los inputs de color */
input[type="color"] {
  appearance: none;
  border: none;
  padding: 0;
}
input[type="color"]::-webkit-color-swatch-wrapper {
  padding: 0;
}
input[type="color"]::-webkit-color-swatch {
  border: none;
  border-radius: 0.375rem;
}

/* Override global styles for config page - prevent global color variables */
.config-button,
.config-heading,
.config-text,
.config-bg,
.config-icon,
.config-link,
.config-input {
  /* Use !important to override global styles */
  color: inherit !important;
  background-color: inherit !important;
  border-color: inherit !important;
}

/* Specific overrides for config page elements */
.config-button {
  background-color: var(--local-primary, #8B4513) !important;
  color: var(--local-secondary, #FFFFFF) !important;
  border-color: var(--local-primary, #8B4513) !important;
}

.config-heading {
  color: var(--local-accent, #DAA520) !important;
}

.config-text {
  color: var(--local-text, #2F1B14) !important;
}

.config-bg {
  background-color: var(--local-neutral, #F5F5DC) !important;
}

.config-icon {
  color: var(--local-primary, #8B4513) !important;
}

.config-link {
  color: var(--local-primary, #8B4513) !important;
}

.config-input {
  border-color: var(--local-primary, #8B4513) !important;
  color: var(--local-text, #2F1B14) !important;
}
</style>