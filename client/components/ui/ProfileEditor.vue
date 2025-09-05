<template>
  <div class="profile-editor">
    <!-- Header -->
    <div class="editor-header">
      <div class="header-content">
        <h1 class="editor-title">Editar Perfil</h1>
        <p class="editor-subtitle">Gestiona tu información personal de forma organizada</p>
      </div>
      <button @click="$emit('close')" class="close-btn">
        <Icon name="heroicons:x-mark" size="24" />
      </button>
    </div>

    <!-- Progress Indicator -->
    <div class="progress-container">
      <div class="progress-bar">
        <div
          class="progress-fill"
          :style="{ width: `${completionPercentage}%` }"
        ></div>
      </div>
      <span class="progress-text">{{ completionPercentage }}% completado</span>
    </div>

    <!-- Tab Navigation -->
    <div class="tabs-container">
      <nav class="tabs-nav" role="tablist">
        <button
          v-for="(tab, index) in tabs"
          :key="tab.id"
          :class="[
            'tab-button',
            { active: activeTab === tab.id, completed: tab.completed, hasErrors: tab.hasErrors }
          ]"
          @click="setActiveTab(tab.id)"
          :aria-selected="activeTab === tab.id"
          :aria-controls="`tab-${tab.id}`"
          role="tab"
        >
          <div class="tab-icon">
            <Icon :name="tab.icon" size="20" />
            <div v-if="tab.hasErrors" class="error-indicator"></div>
            <div v-if="tab.completed && !tab.hasErrors" class="completed-indicator">
              <Icon name="heroicons:check" size="12" />
            </div>
          </div>
          <span class="tab-label">{{ tab.label }}</span>
        </button>
      </nav>
    </div>

    <!-- Tab Content -->
    <div class="tabs-content">
      <div
        v-for="tab in tabs"
        :key="tab.id"
        :id="`tab-${tab.id}`"
        :class="['tab-panel', { active: activeTab === tab.id }]"
        role="tabpanel"
        :aria-labelledby="`tab-${tab.id}`"
      >
        <component
          :is="tab.component"
          :profile="profile"
          :errors="tab.errors"
          @update="updateField"
          @validate="validateTab"
        />
      </div>
    </div>

    <!-- Action Bar -->
    <div class="action-bar">
      <div class="action-info">
        <span class="last-saved" v-if="lastSaved">
          Último guardado: {{ formatLastSaved(lastSaved) }}
        </span>
      </div>
      <div class="action-buttons">
        <button @click="$emit('close')" class="btn btn-secondary">
          Cancelar
        </button>
        <button @click="saveAll" :disabled="isSaving || hasErrors" class="btn btn-primary">
          <Icon v-if="isSaving" name="heroicons:arrow-path" size="16" class="spinning" />
          {{ isSaving ? 'Guardando...' : 'Guardar Cambios' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import PersonalTab from './tabs/PersonalTab.vue'
import ContactTab from './tabs/ContactTab.vue'
import AddressTab from './tabs/AddressTab.vue'
import SecurityTab from './tabs/SecurityTab.vue'
import PreferencesTab from './tabs/PreferencesTab.vue'

const props = defineProps({
  profile: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['close', 'save'])

const activeTab = ref('personal')
const isSaving = ref(false)
const lastSaved = ref(null)
const changes = ref({})

const tabs = ref([
  {
    id: 'personal',
    label: 'Personal',
    icon: 'heroicons:user',
    component: PersonalTab,
    completed: false,
    hasErrors: false,
    errors: {}
  },
  {
    id: 'contact',
    label: 'Contacto',
    icon: 'heroicons:phone',
    component: ContactTab,
    completed: false,
    hasErrors: false,
    errors: {}
  },
  {
    id: 'address',
    label: 'Dirección',
    icon: 'heroicons:map-pin',
    component: AddressTab,
    completed: false,
    hasErrors: false,
    errors: {}
  },
  {
    id: 'security',
    label: 'Seguridad',
    icon: 'heroicons:shield-check',
    component: SecurityTab,
    completed: false,
    hasErrors: false,
    errors: {}
  },
  {
    id: 'preferences',
    label: 'Preferencias',
    icon: 'heroicons:cog-6-tooth',
    component: PreferencesTab,
    completed: false,
    hasErrors: false,
    errors: {}
  }
])

const completionPercentage = computed(() => {
  const completedTabs = tabs.value.filter(tab => tab.completed).length
  return Math.round((completedTabs / tabs.value.length) * 100)
})

const hasErrors = computed(() => {
  return tabs.value.some(tab => tab.hasErrors)
})

const updateField = (field, value) => {
  changes.value[field] = value
  emit('update', field, value)
}

const validateTab = (tabId, errors) => {
  const tab = tabs.value.find(t => t.id === tabId)
  if (tab) {
    tab.errors = errors
    tab.hasErrors = Object.keys(errors).length > 0
    tab.completed = Object.keys(errors).length === 0
  }
}

const setActiveTab = async (tabId) => {
  // Auto-save when changing tabs
  if (Object.keys(changes.value).length > 0) {
    await autoSave()
  }
  activeTab.value = tabId
}

const autoSave = async () => {
  try {
    await emit('save')
    lastSaved.value = new Date()
    changes.value = {}
  } catch (error) {
    console.error('Auto-save failed:', error)
  }
}

const saveAll = async () => {
  if (hasErrors.value) return

  isSaving.value = true
  try {
    await emit('save')
    lastSaved.value = new Date()
    changes.value = {}
    emit('close')
  } catch (error) {
    console.error('Save failed:', error)
  } finally {
    isSaving.value = false
  }
}

const formatLastSaved = (date) => {
  return new Intl.DateTimeFormat('es-ES', {
    hour: '2-digit',
    minute: '2-digit'
  }).format(date)
}

// Keyboard navigation
const handleKeydown = (event) => {
  if (event.key === 'Escape') {
    emit('close')
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

// Cleanup
const cleanup = () => {
  document.removeEventListener('keydown', handleKeydown)
}

watch(() => props.profile, () => {
  // Reset changes when profile updates
  changes.value = {}
}, { deep: true })

// Expose cleanup function
defineExpose({ cleanup })
</script>

<style scoped>
/* Layout */
.profile-editor {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: #FFFFFF;
  border-radius: 0.75rem;
  overflow: hidden;
  box-shadow: 0 20px 25px -5px rgba(139, 69, 19, 0.1), 0 10px 10px -5px rgba(139, 69, 19, 0.04);
}

/* Header */
.editor-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 2rem;
  background: linear-gradient(135deg, #F5F5DC 0%, rgba(139, 69, 19, 0.02) 100%);
  border-bottom: 1px solid rgba(139, 69, 19, 0.08);
}

.header-content {
  flex: 1;
}

.editor-title {
  font-size: 1.875rem;
  font-weight: 700;
  color: #8B4513;
  margin: 0 0 0.5rem 0;
  font-family: 'Playfair Display', serif;
}

.editor-subtitle {
  font-size: 0.875rem;
  color: #8B7355;
  margin: 0;
  font-family: 'Inter', sans-serif;
}

.close-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.5rem;
  background: rgba(139, 69, 19, 0.05);
  border: 1px solid rgba(139, 69, 19, 0.1);
  color: #8B4513;
  transition: all 0.2s ease;
  cursor: pointer;
}

.close-btn:hover {
  background: #8B4513;
  color: #FFFFFF;
  transform: rotate(90deg);
}

/* Progress */
.progress-container {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 2rem;
  background: #FFFFFF;
  border-bottom: 1px solid rgba(139, 69, 19, 0.08);
}

.progress-bar {
  flex: 1;
  height: 0.5rem;
  background: rgba(139, 69, 19, 0.1);
  border-radius: 0.25rem;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #8B4513 0%, #DAA520 100%);
  border-radius: 0.25rem;
  transition: width 0.3s ease;
}

.progress-text {
  font-size: 0.75rem;
  font-weight: 600;
  color: #8B4513;
  font-family: 'Inter', sans-serif;
}

/* Tabs Navigation */
.tabs-container {
  background: #FFFFFF;
  border-bottom: 1px solid rgba(139, 69, 19, 0.08);
}

.tabs-nav {
  display: flex;
  padding: 0 2rem;
  gap: 0.5rem;
}

.tab-button {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 1.5rem;
  background: transparent;
  border: none;
  border-bottom: 3px solid transparent;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  min-width: 5rem;
}

.tab-button:hover {
  background: rgba(139, 69, 19, 0.02);
}

.tab-button.active {
  border-bottom-color: #8B4513;
  background: rgba(139, 69, 19, 0.05);
}

.tab-button.completed:not(.hasErrors) {
  border-bottom-color: #16a34a;
}

.tab-button.hasErrors {
  border-bottom-color: #dc2626;
}

.tab-icon {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.5rem;
  background: rgba(139, 69, 19, 0.05);
  color: #8B7355;
  transition: all 0.2s ease;
}

.tab-button.active .tab-icon {
  background: #8B4513;
  color: #FFFFFF;
}

.tab-button.completed:not(.hasErrors) .tab-icon {
  background: #16a34a;
  color: #FFFFFF;
}

.tab-button.hasErrors .tab-icon {
  background: #dc2626;
  color: #FFFFFF;
}

.error-indicator {
  position: absolute;
  top: -2px;
  right: -2px;
  width: 0.5rem;
  height: 0.5rem;
  background: #dc2626;
  border-radius: 50%;
  border: 2px solid #FFFFFF;
}

.completed-indicator {
  position: absolute;
  bottom: -2px;
  right: -2px;
  width: 1rem;
  height: 1rem;
  background: #16a34a;
  border-radius: 50%;
  border: 2px solid #FFFFFF;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #FFFFFF;
}

.tab-label {
  font-size: 0.75rem;
  font-weight: 600;
  color: #8B7355;
  text-align: center;
  font-family: 'Inter', sans-serif;
}

.tab-button.active .tab-label {
  color: #8B4513;
}

.tab-button.completed:not(.hasErrors) .tab-label {
  color: #16a34a;
}

.tab-button.hasErrors .tab-label {
  color: #dc2626;
}

/* Tab Content */
.tabs-content {
  flex: 1;
  padding: 2rem;
  background: #FFFFFF;
}

.tab-panel {
  display: none;
  animation: fadeIn 0.3s ease;
}

.tab-panel.active {
  display: block;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Action Bar */
.action-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  background: #F9FAFB;
  border-top: 1px solid rgba(139, 69, 19, 0.08);
}

.action-info {
  flex: 1;
}

.last-saved {
  font-size: 0.75rem;
  color: #8B7355;
  font-family: 'Inter', sans-serif;
}

.action-buttons {
  display: flex;
  gap: 1rem;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 600;
  font-family: 'Inter', sans-serif;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid transparent;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-secondary {
  background: #F3F4F6;
  color: #6B7280;
  border-color: #D1D5DB;
}

.btn-secondary:hover:not(:disabled) {
  background: #E5E7EB;
  border-color: #9CA3AF;
}

.btn-primary {
  background: #8B4513;
  color: #FFFFFF;
  border-color: #8B4513;
}

.btn-primary:hover:not(:disabled) {
  background: #5D2A0C;
  border-color: #5D2A0C;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(139, 69, 19, 0.3);
}

.spinning {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* Responsive */
@media (max-width: 768px) {
  .editor-header {
    padding: 1.5rem;
  }

  .editor-title {
    font-size: 1.5rem;
  }

  .tabs-nav {
    padding: 0 1rem;
    gap: 0.25rem;
    overflow-x: auto;
  }

  .tab-button {
    min-width: 4rem;
    padding: 0.75rem 1rem;
  }

  .tab-label {
    font-size: 0.6875rem;
  }

  .tabs-content {
    padding: 1.5rem;
  }

  .action-bar {
    padding: 1rem 1.5rem;
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }

  .action-buttons {
    justify-content: flex-end;
  }
}

@media (max-width: 640px) {
  .editor-header {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }

  .close-btn {
    align-self: flex-end;
  }

  .tabs-nav {
    padding: 0 0.5rem;
  }

  .tab-button {
    min-width: 3.5rem;
    padding: 0.5rem 0.75rem;
  }

  .tab-icon {
    width: 2rem;
    height: 2rem;
  }

  .tab-label {
    display: none;
  }
}
</style>
