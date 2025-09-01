<template>
  <section
    class="min-h-screen px-4 sm:px-6 md:px-10 lg:px-24 py-12 bg-gradient-to-br from-stone-50 to-stone-200 text-stone-800 font-sans relative"
  >
    <!-- Loading Overlay -->
    <div v-if="loading" class="loading-overlay">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
    </div>

    <!-- Background -->
    <div class="absolute inset-0 overflow-hidden opacity-10 -z-10">
      <img
        src="@/assets/image.jpg"
        alt="Fondo decorativo"
        class="w-full h-full object-cover scale-110 blur-sm"
      />
    </div>

    <!-- Volver -->
    <div class="relative flex items-center justify-center mb-8">
      <NuxtLink
        to="/config"
        class="absolute left-0 top-1/2 -translate-y-1/2 flex items-center text-stone-600 hover:text-stone-800 transition-colors duration-200 p-2 rounded-full hover:bg-stone-200"
        aria-label="Volver"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M10 22L0 12L10 2l1.775 1.775L3.55 12l8.225 8.225z"
          />
        </svg>
      </NuxtLink>
      <h1 class="uppercase text-3xl font-extrabold text-center text-stone-900">
        Configuración de Fuentes
      </h1>
    </div>

    <!-- Vista previa -->
    <div class="bg-white rounded-xl shadow-lg p-6 mb-8 border border-stone-200">
      <h2 class="text-2xl font-bold mb-6 text-center">
        Vista Previa de Fuentes
      </h2>
      <div class="grid grid-cols-1 gap-8 items-center justify-items-center">
        <div class="text-center w-full">
          <h3
            :style="{
              fontSize: currentFontConfig.titleSize + 'px',
              fontFamily: currentFontConfig.fontFamily,
            }"
            class="preview-text font-bold mb-2 text-4xl"
          >
            Título Principal
          </h3>
          <p class="text-xs text-stone-500">
            Fuente: {{ currentFontConfig.name }} | Tamaño:
            {{ currentFontConfig.titleSize }}px
          </p>
        </div>
        <div class="text-center w-full">
          <h4
            :style="{
              fontSize: currentFontConfig.subtitleSize + 'px',
              fontFamily: currentFontConfig.fontFamily,
            }"
            class="preview-text font-semibold mb-2 text-2xl"
          >
            Subtítulo
          </h4>
          <p class="text-xs text-stone-500">
            Fuente: {{ currentFontConfig.name }} | Tamaño:
            {{ currentFontConfig.subtitleSize }}px
          </p>
        </div>
        <div class="text-center w-full max-w-xl">
          <p
            :style="{
              fontSize: currentFontConfig.paragraphSize + 'px',
              fontFamily: currentFontConfig.fontFamily,
            }"
            class="preview-text leading-relaxed text-base"
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
          <p class="text-xs text-stone-500 mt-2">
            Tamaño: {{ currentFontConfig.paragraphSize }}px
          </p>
        </div>
      </div>
    </div>

    <!-- Ajustes de tamaño y subida de fuentes -->
    <div class="bg-white rounded-xl shadow-lg p-6 mb-8 border border-stone-200">
      <h2 class="text-2xl font-bold mb-6 text-center">
        Ajustes de Tamaño y Subida de Fuentes
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 class="text-xl font-semibold mb-4">Ajustes de Tamaño</h3>
          <div class="grid grid-cols-1 gap-4">
            <div>
              <label
                for="titleSize"
                class="block text-sm font-medium text-stone-600 mb-2"
                >Tamaño de Título (px)</label
              >
              <input
                v-model.number="currentFontConfig.titleSize"
                type="number"
                min="1"
                max="72"
                class="w-full px-3 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-stone-500"
              />
            </div>
            <div>
              <label
                for="subtitleSize"
                class="block text-sm font-medium text-stone-600 mb-2"
                >Tamaño de Subtítulo (px)</label
              >
              <input
                v-model.number="currentFontConfig.subtitleSize"
                type="number"
                min="1"
                max="48"
                class="w-full px-3 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-stone-500"
              />
            </div>
            <div>
              <label
                for="paragraphSize"
                class="block text-sm font-medium text-stone-600 mb-2"
                >Tamaño de Párrafo (px)</label
              >
              <input
                v-model.number="currentFontConfig.paragraphSize"
                type="number"
                min="1"
                max="24"
                class="w-full px-3 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-stone-500"
              />
            </div>
          </div>
        </div>

        <div>
          <h3 class="text-xl font-semibold mb-4">
            Subir Fuentes Personalizadas
          </h3>
          <div class="space-y-4">
            <label
              class="upload-area flex flex-col items-center cursor-pointer bg-blue-50 hover:bg-blue-100 p-4 rounded border-dashed border-2 border-blue-300"
            >
              <i class="fas fa-upload mr-2"></i> Subir Fuente para Títulos
              (.ttf)
              <input
                type="file"
                accept=".ttf"
                @change="handleTitleFontUpload"
                hidden
                ref="titleFontFileInput"
              />
            </label>
            <label
              class="upload-area flex flex-col items-center cursor-pointer bg-blue-50 hover:bg-blue-100 p-4 rounded border-dashed border-2 border-blue-300"
            >
              <i class="fas fa-upload mr-2"></i> Subir Fuente para
              Subtítulos/Párrafos (.ttf)
              <input
                type="file"
                accept=".ttf"
                @change="handleSubtitleFontUpload"
                hidden
                ref="subtitleFontFileInput"
              />
            </label>
            <p
              v-if="uploadMessage"
              :class="[
                uploadSuccess ? 'text-green-600' : 'text-red-600',
                'status-message mt-2 text-center text-sm'
              ]"
            >
              {{ uploadMessage }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Nombre de Configuración -->
    <div class="bg-white rounded-xl shadow-lg p-6 mb-8 border border-stone-200">
      <h2 class="text-2xl font-bold mb-6 text-center">
        Nombre de Configuración
      </h2>
      <div class="grid grid-cols-1 gap-6">
        <div>
          <label
            for="fontName"
            class="block text-sm font-medium text-stone-600 mb-2"
            >Nombre de Configuración</label
          >
          <input
            v-model="currentFontConfig.name"
            type="text"
            placeholder="Ejemplo: Mi Estilo de Fuente"
            class="w-full px-3 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-stone-500"
          />
        </div>
        <div>
          <label
            for="fontFamily"
            class="block text-sm font-medium text-stone-600 mb-2"
          >
            Familia de Fuente
            <span class="text-xs text-stone-500">(Ejemplo: "Poppins, sans-serif" o "Roboto, Arial, sans-serif")</span>
          </label>
          <input 
            v-model="currentFontConfig.fontFamily" 
            type="text" 
            placeholder="Ejemplo: Poppins, sans-serif" 
            class="w-full px-3 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-stone-500"
          />
          <p class="mt-1 text-xs text-stone-500">
            Escribe el nombre exacto de la fuente como debe aparecer en CSS, incluyendo fallbacks si lo deseas
          </p>
        </div>
      </div>
    </div>

    <!-- Botones de acción -->
    <div
      class="bg-white rounded-xl shadow-lg p-6 mb-8 border border-stone-200 text-center space-x-4"
    >
      <button
        @click="saveFontConfig"
        class="action-button px-6 py-3 bg-green-500 text-white rounded hover:bg-green-600 transition-colors inline-flex items-center"
      >
        <i class="fas fa-save mr-2"></i>
        Guardar Configuración
      </button>
      <button
        @click="resetToDefault"
        class="action-button px-6 py-3 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors inline-flex items-center"
      >
        <i class="fas fa-undo mr-2"></i>
        Restablecer Predeterminados
      </button>
    </div>

    <!-- Historial de configuraciones -->
    <div class="bg-white rounded-xl shadow-lg p-6 mb-8 border border-stone-200">
      <h2 class="text-2xl font-bold mb-6 text-center">
        Configuraciones Guardadas
      </h2>
      <div class="overflow-x-auto">
        <table class="w-full config-table">
          <thead>
            <tr>
              <th class="text-left py-3 px-4">Nombre</th>
              <th class="text-left py-3 px-4">Título</th>
              <th class="text-left py-3 px-4">Subtítulo</th>
              <th class="text-left py-3 px-4">Párrafo</th>
              <th class="text-center py-3 px-4">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="fontConfigs.length === 0">
              <td colspan="5" class="text-center py-8 text-stone-500">
                No hay configuraciones guardadas
              </td>
            </tr>
            <tr
              v-for="config in fontConfigs"
              :key="config.id"
              class="border-b hover:bg-stone-50 transition-colors"
              :class="{ 'bg-blue-50': config.id === currentFontConfig.id }"
            >
              <td class="py-4 px-4 font-medium">{{ config.name }}</td>
              <td class="py-4 px-4">{{ config.titleSize }}px</td>
              <td class="py-4 px-4">{{ config.subtitleSize }}px</td>
              <td class="py-4 px-4">{{ config.paragraphSize }}px</td>
              <td class="py-4 px-4">
                <div class="flex justify-center space-x-2">
                  <button
                    @click="loadFontConfig(config)"
                    :disabled="config.id === currentFontConfig.id"
                    class="table-action-button"
                    :class="[
                      config.id === currentFontConfig.id
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-blue-500 text-white hover:bg-blue-600'
                    ]"
                  >
                    <i class="fas fa-check mr-1"></i>
                    {{
                      config.id === currentFontConfig.id
                        ? "Activa"
                        : "Seleccionar"
                    }}
                  </button>
                  <button
                    @click="confirmDeleteConfig(config)"
                    class="table-action-button bg-red-500 text-white hover:bg-red-600"
                  >
                    <i class="fas fa-trash mr-1"></i>
                    Eliminar
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modal eliminar -->
    <div
      v-if="showDeleteModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    >
      <div
        class="bg-white rounded-lg shadow-xl max-w-md w-full p-6 transform transition-all"
      >
        <h3 class="text-lg font-medium mb-4">Confirmar eliminación</h3>
        <p class="mb-6">
          ¿Eliminar la configuración "{{ configToDelete?.name }}"?
        </p>
        <div class="flex justify-end space-x-3">
          <button
            @click="cancelDelete"
            class="action-button px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Cancelar
          </button>
          <button
            @click="deleteConfig"
            class="action-button px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Eliminar
          </button>
        </div>
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
import { ref, onMounted } from "vue";
import { useToast } from '~/composables/useToast'

definePageMeta({ middleware: ["auth"] });

// Toast notifications
const { showToast, toastMessage, toastType, show: showToastMessage } = useToast()

// --- Configuración ---
const runtimeConfig = useRuntimeConfig();
const BACKEND_URL = runtimeConfig.public.BACKEND_URL;
const userId = JSON.parse(localStorage.getItem("user"))?.id;
const token = localStorage.getItem("token");

// --- Estado reactivo ---
const defaultFontConfig = {
  id: null,
  userId: userId,
  name: "Nueva Configuración",
  titleSize: 36,
  subtitleSize: 24,
  paragraphSize: 16,
  fontFamily: "Poppins, sans-serif",
  fontTitleFilePath: null,
  fontSubtitleFilePath: null,
};

// Lista de fuentes disponibles
const availableFonts = [
  { name: 'Poppins', value: 'Poppins' },
  { name: 'Roboto', value: 'Roboto' },
  { name: 'Open Sans', value: 'Open Sans' },
  { name: 'Montserrat', value: 'Montserrat' },
  { name: 'Lato', value: 'Lato' },
  { name: 'Raleway', value: 'Raleway' },
  { name: 'Nunito', value: 'Nunito' },
  { name: 'Playfair Display', value: 'Playfair Display' },
];

const currentFontConfig = ref({ ...defaultFontConfig });
const fontConfigs = ref([]);

// UI State
const showDeleteModal = ref(false);
const configToDelete = ref(null);
const uploadMessage = ref("");
const uploadSuccess = ref(false);
const titleFontFileInput = ref(null);
const subtitleFontFileInput = ref(null);
const loading = ref(false);

// --- Funciones ---
async function fetchFontConfigs() {
  if (!userId || !token) return;
  loading.value = true;

  try {
    const response = await fetch(`${BACKEND_URL}/api/fonts`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error('Error al cargar configuraciones');
    }

    const data = await response.json();
    fontConfigs.value = data || [];

    // Cargar la última configuración usada
    const lastUsedResponse = await fetch(`${BACKEND_URL}/api/profile/lastFontUsed`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (lastUsedResponse.ok) {
      const lastUsed = await lastUsedResponse.json();
      if (lastUsed) {
        currentFontConfig.value = {
          ...defaultFontConfig,
          ...lastUsed,
          id: lastUsed.id,
        };
      }
    }
  } catch (error) {
    console.error("Error fetching font configs:", error);
    alert(`Error al cargar configuraciones: ${error.message}`);
  } finally {
    loading.value = false;
  }
}

async function loadFontConfig(config) {
  loading.value = true;
  try {
    // Actualizar la configuración actual
    currentFontConfig.value = {
      ...defaultFontConfig,
      ...config,
      id: config.id,
    };

    // Actualizar timestamp de último uso usando la ruta correcta
    const response = await fetch(`${BACKEND_URL}/api/profile/my-fonts/${config.id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error('Error al activar la configuración');
    }

    // Recargar la lista para actualizar el estado
    await fetchFontConfigs();
    
    uploadMessage.value = "✅ Configuración activada correctamente";
    uploadSuccess.value = true;
    setTimeout(() => {
      uploadMessage.value = "";
    }, 3000);
  } catch (error) {
    console.error("Error loading font config:", error);
    uploadMessage.value = `❌ Error al activar: ${error.message}`;
    uploadSuccess.value = false;
  } finally {
    loading.value = false;
  }
}

async function saveFontConfig() {
  loading.value = true;
  try {
    const formData = new FormData();
    
    // Validar datos antes de enviar
    if (!currentFontConfig.value.name) {
      throw new Error('El nombre de la configuración es requerido');
    }

    if (!currentFontConfig.value.titleSize || !currentFontConfig.value.subtitleSize || !currentFontConfig.value.paragraphSize) {
      throw new Error('Todos los tamaños de fuente son requeridos');
    }

    // Agregar datos básicos
    formData.append("name", currentFontConfig.value.name);
    formData.append("titleSize", currentFontConfig.value.titleSize.toString());
    formData.append("subtitleSize", currentFontConfig.value.subtitleSize.toString());
    formData.append("paragraphSize", currentFontConfig.value.paragraphSize.toString());
    formData.append("fontFamily", currentFontConfig.value.fontFamily || 'Poppins');

    // Agregar archivos solo si existen
    if (titleFontFileInput.value?.files?.length > 0) {
      const titleFile = titleFontFileInput.value.files[0];
      if (titleFile.size > 5 * 1024 * 1024) {
        throw new Error('El archivo de título es demasiado grande (máximo 5MB)');
      }
      formData.append("fontTitleFilePath", titleFile);
    }

    if (subtitleFontFileInput.value?.files?.length > 0) {
      const subtitleFile = subtitleFontFileInput.value.files[0];
      if (subtitleFile.size > 5 * 1024 * 1024) {
        throw new Error('El archivo de subtítulo es demasiado grande (máximo 5MB)');
      }
      formData.append("fontSubtitleFilePath", subtitleFile);
    }

    // Enviar petición
    const response = await fetch(`${BACKEND_URL}/api/fonts`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Error al guardar la configuración');
    }

    const data = await response.json();
    
    // Actualizar la configuración actual
    currentFontConfig.value = { 
      ...currentFontConfig.value, 
      ...data,
      id: data.id 
    };

    // Limpiar los inputs de archivo
    if (titleFontFileInput.value) titleFontFileInput.value.value = '';
    if (subtitleFontFileInput.value) subtitleFontFileInput.value.value = '';

    // Recargar la lista
    await fetchFontConfigs();
    
    uploadMessage.value = "✅ Configuración guardada correctamente";
    uploadSuccess.value = true;
    setTimeout(() => {
      uploadMessage.value = "";
    }, 3000);

    showToastMessage('Configuración guardada exitosamente', 'success')
  } catch (error) {
    console.error("Error saving font config:", error);
    uploadMessage.value = `❌ ${error.message || 'Error al guardar la configuración'}`;
    uploadSuccess.value = false;
    showToastMessage('Error al guardar la configuración', 'error')
  } finally {
    loading.value = false;
  }
}

function resetToDefault() {
  currentFontConfig.value = { ...defaultFontConfig };
  if (titleFontFileInput.value) titleFontFileInput.value.value = "";
  if (subtitleFontFileInput.value) subtitleFontFileInput.value.value = "";
  uploadMessage.value = "";
}

function confirmDeleteConfig(config) {
  configToDelete.value = config;
  showDeleteModal.value = true;
}

function cancelDelete() {
  showDeleteModal.value = false;
  configToDelete.value = null;
}

async function deleteConfig() {
  if (!configToDelete.value) return;

  try {
    await fetch(`${BACKEND_URL}/api/fonts/${configToDelete.value.id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    // If we're deleting the currently loaded config, reset to default
    if (currentFontConfig.value.id === configToDelete.value.id) {
      resetToDefault();
    }

    // Refresh the list
    await fetchFontConfigs();
    showDeleteModal.value = false;
    configToDelete.value = null;
  } catch (error) {
    console.error("Error deleting font config:", error);
    alert(`❌ Error al eliminar: ${error.message}`);
  }
}

function handleTitleFontUpload(event) {
  handleFontUpload(event, "title");
}

function handleSubtitleFontUpload(event) {
  handleFontUpload(event, "subtitle");
}

function handleFontUpload(event, type) {
  const file = event.target.files[0];
  if (!file) return;

  // Validate file
  if (!file.name.toLowerCase().endsWith(".ttf")) {
    uploadMessage.value = "Solo se permiten archivos .ttf";
    uploadSuccess.value = false;
    resetFileInput(type);
    return;
  }

  if (file.size > 5 * 1024 * 1024) {
    uploadMessage.value = "El archivo es demasiado grande (máximo 5MB)";
    uploadSuccess.value = false;
    resetFileInput(type);
    return;
  }

  uploadMessage.value = `Archivo "${file.name}" seleccionado para ${
    type === "title" ? "títulos" : "subtítulos"
  }`;
  uploadSuccess.value = true;
}

function resetFileInput(type) {
  if (type === "title" && titleFontFileInput.value) {
    titleFontFileInput.value.value = "";
  } else if (type === "subtitle" && subtitleFontFileInput.value) {
    subtitleFontFileInput.value.value = "";
  }
}

// --- Lifecycle Hooks ---
onMounted(() => {
  if (userId && token) {
    fetchFontConfigs();
  } else {
    console.error("User ID or token not found");
  }
});
</script>

<style scoped>
/* Estilos base para inputs y textos */
input[type="text"],
input[type="number"],
select {
  color: #1f2937 !important; /* text-gray-800 */
  background-color: white !important;
}

label {
  color: #4b5563 !important; /* text-gray-600 */
}

.text-stone-500 {
  color: #6b7280 !important;
}

.text-stone-600 {
  color: #4b5563 !important;
}

.text-stone-800 {
  color: #1f2937 !important;
}

/* Estilos específicos para la página de configuración */
.config-page {
  color: #1f2937 !important;
}

.config-page h1,
.config-page h2,
.config-page h3 {
  color: #111827 !important; /* text-gray-900 */
}

/* Estilos para la vista previa */
.preview-text {
  transition: all 0.3s ease;
  color: inherit !important;
}

/* Estilos para los inputs de tamaño */
input[type="number"] {
  -moz-appearance: textfield;
}

input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Estilos para los botones de acción */
.action-button {
  transition: all 0.2s ease;
}

.action-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Estilos para el área de subida de archivos */
.upload-area {
  transition: all 0.2s ease;
}

.upload-area:hover {
  border-color: #3b82f6;
  background-color: #eff6ff;
}

/* Estilos para el mensaje de estado */
.status-message {
  transition: all 0.3s ease;
}

/* Estilos para la tabla */
.config-table th {
  background-color: #f8fafc;
  font-weight: 600;
  color: #1f2937 !important;
}

.config-table td {
  color: #1f2937 !important;
}

.config-table tr:hover {
  background-color: #f1f5f9;
}

/* Estilos para el modal */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

/* Estilos para el indicador de carga */
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

/* Asegurar que los botones mantengan sus colores */
.bg-green-500 {
  background-color: #22c55e !important;
}

.bg-blue-500 {
  background-color: #3b82f6 !important;
}

.bg-red-500 {
  background-color: #ef4444 !important;
}

.text-white {
  color: white !important;
}

/* Asegurar que los bordes mantengan sus colores */
.border-stone-200 {
  border-color: #e5e7eb !important;
}

.border-stone-300 {
  border-color: #d1d5db !important;
}
</style>
