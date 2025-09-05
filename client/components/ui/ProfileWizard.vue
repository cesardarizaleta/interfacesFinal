<template>
  <div v-if="isOpen" class="profile-wizard-overlay" @click.self="$emit('close')">
    <div class="profile-wizard">
      <!-- Header -->
      <div class="wizard-header">
        <div class="header-content">
          <h1 class="wizard-title">Completar Perfil</h1>
          <p class="wizard-subtitle">Configura tu información profesional de manera organizada</p>
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
            :style="{ width: `${progressPercentage}%` }"
          ></div>
        </div>
        <div class="progress-info">
          <span class="progress-text">Paso {{ currentStep }} de {{ steps.length }}</span>
          <span class="progress-percentage">{{ progressPercentage }}% completado</span>
        </div>
      </div>

      <!-- Step Navigation -->
      <div class="step-navigation">
        <div class="step-indicators">
          <div
            v-for="(step, index) in steps"
            :key="step.id"
            class="step-indicator"
            :class="{
              active: currentStep === index + 1,
              completed: currentStep > index + 1,
              pending: currentStep < index + 1
            }"
          >
            <div class="step-icon">
              <Icon :name="step.icon" size="20" />
            </div>
            <div class="step-info">
              <span class="step-number">{{ index + 1 }}</span>
              <span class="step-label">{{ step.label }}</span>
            </div>
            <div v-if="currentStep > index + 1" class="step-check">
              <Icon name="heroicons:check" size="16" />
            </div>
          </div>
        </div>
      </div>

      <!-- Step Content -->
      <div class="step-content">
        <div class="content-header">
          <div class="step-icon-large">
            <Icon :name="currentStepData.icon" size="32" />
          </div>
          <div class="step-details">
            <h2 class="step-title">{{ currentStepData.title }}</h2>
            <p class="step-description">{{ currentStepData.description }}</p>
          </div>
        </div>

        <div class="content-body">
          <component
            :is="currentStepData.component"
            :profile="profile"
            :errors="errors"
            @update="updateField"
            @validate="validateStep"
          />
        </div>
      </div>

      <!-- Action Bar -->
      <div class="action-bar">
        <div class="action-info">
          <span v-if="lastSaved" class="last-saved">
            Último guardado: {{ formatLastSaved(lastSaved) }}
          </span>
        </div>
        <div class="action-buttons">
          <button @click="previousStep" :disabled="currentStep === 1" class="btn btn-secondary">
            <Icon name="heroicons:arrow-left" size="16" />
            Anterior
          </button>
          <button
            v-if="currentStep < steps.length"
            @click="nextStep"
            :disabled="!isStepValid"
            class="btn btn-primary"
          >
            Siguiente
            <Icon name="heroicons:arrow-right" size="16" />
          </button>
          <button
            v-else
            @click="saveProfile"
            :disabled="!isStepValid || isLoading"
            class="btn btn-accent"
          >
            <Icon v-if="isLoading" name="heroicons:arrow-path" size="16" class="spinning" />
            {{ isLoading ? 'Guardando...' : 'Completar Perfil' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import Modal from './Modal.vue'
import PersonalIdentityStep from './wizard/PersonalIdentityStep.vue'
import ContactInfoStep from './wizard/ContactInfoStep.vue'
import PersonalAddressStep from './wizard/PersonalAddressStep.vue'
import PhysicalCharacteristicsStep from './wizard/PhysicalCharacteristicsStep.vue'
import ProfessionalInfoStep from './wizard/ProfessionalInfoStep.vue'
import AdditionalInfoStep from './wizard/AdditionalInfoStep.vue'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  profile: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['close', 'save'])

const currentStep = ref(1)
const errors = ref({})
const isLoading = ref(false)

// tiny debounce for validations to avoid janky UI
let validateTimeout = null
let interactionTimeout = null
const recentInteraction = ref(false)

const steps = [
  {
    id: 'personal-identity',
    label: 'Personal',
    title: 'Información Personal',
    component: PersonalIdentityStep,
    description: 'Datos básicos de identificación',
    icon: 'heroicons:user'
  },
  {
    id: 'contact-info',
    label: 'Contacto',
    title: 'Información de Contacto',
    component: ContactInfoStep,
    description: 'Datos de comunicación y contacto',
    icon: 'heroicons:phone'
  },
  {
    id: 'personal-address',
    label: 'Dirección',
    title: 'Dirección Personal',
    component: PersonalAddressStep,
    description: 'Información de residencia',
    icon: 'heroicons:map-pin'
  },
  {
    id: 'physical-char',
    label: 'Físico',
    title: 'Características Físicas',
    component: PhysicalCharacteristicsStep,
    description: 'Apariencia y medidas físicas',
    icon: 'heroicons:identification'
  },
  {
    id: 'professional',
    label: 'Profesional',
    title: 'Información Profesional',
    component: ProfessionalInfoStep,
    description: 'Datos laborales y carrera',
    icon: 'heroicons:briefcase'
  },
  {
    id: 'additional',
    label: 'Adicional',
    title: 'Información Adicional',
    component: AdditionalInfoStep,
    description: 'Datos complementarios opcionales',
    icon: 'heroicons:document-plus'
  }
]

const currentStepData = computed(() => steps[currentStep.value - 1])

const isStepValid = computed(() => Object.keys(errors.value).length === 0)

const progressPercentage = computed(() => {
  return Math.round(((currentStep.value - 1) / (steps.length - 1)) * 100)
})

const lastSaved = ref(null)

const updateField = (field, value) => {
  emit('update', field, value)
  // mark that the user interacted so auto-advance can run
  recentInteraction.value = true
  clearTimeout(interactionTimeout)
  interactionTimeout = setTimeout(() => { recentInteraction.value = false }, 2500)
}

const nextStep = () => {
  if (currentStep.value < steps.length) currentStep.value++
}

const previousStep = () => {
  if (currentStep.value > 1) currentStep.value--
}

const goToStep = (index) => {
  if (index < 1 || index > steps.length) return
  currentStep.value = index
}

const saveProfile = async () => {
  if (!isStepValid.value) return

  isLoading.value = true
  try {
    await emit('save')
    lastSaved.value = new Date()
    emit('close')
  } catch (error) {
    console.error('Error saving profile:', error)
  } finally {
    isLoading.value = false
  }
}

const formatLastSaved = (date) => {
  return new Intl.DateTimeFormat('es-ES', {
    hour: '2-digit',
    minute: '2-digit'
  }).format(date)
}

// Keyboard navigation (left/right) and quick finish with Enter on last step
const onKey = (e) => {
  if (!props.isOpen) return
  if (e.key === 'ArrowRight') nextStep()
  if (e.key === 'ArrowLeft') previousStep()
  if (e.key === 'Enter' && currentStep.value === steps.length && isStepValid.value) saveProfile()
}

onMounted(() => window.addEventListener('keydown', onKey))
onBeforeUnmount(() => window.removeEventListener('keydown', onKey))

// Reset step when modal opens; keep existing profile in memory
watch(() => props.isOpen, (newValue) => {
  if (newValue) {
    currentStep.value = 1
    errors.value = {}
  }
})

// When a child validates and emits errors, update and maybe auto-advance
const validateStep = (stepErrors) => {
  clearTimeout(validateTimeout)
  validateTimeout = setTimeout(() => {
    errors.value = stepErrors || {}
    // Only auto-advance when the user recently interacted with the form to avoid
    // steps auto-validating on mount and causing the wizard to jump to the end.
    const isValid = Object.keys(errors.value).length === 0
    if (isValid && recentInteraction.value) {
      if (currentStep.value < steps.length) nextStep()
    }
  }, 200)
}
</script>

<style scoped>
/* Overlay */
.profile-wizard-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
}

.profile-wizard {
  background: #FFFFFF;
  border-radius: 1rem;
  box-shadow: 0 20px 40px rgba(139, 69, 19, 0.15);
  max-width: 900px;
  width: 100%;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

/* Header */
.wizard-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2rem;
  border-bottom: 1px solid rgba(139, 69, 19, 0.1);
  background: linear-gradient(135deg, #FFFFFF 0%, rgba(139, 69, 19, 0.02) 100%);
}

.header-content {
  flex: 1;
}

.wizard-title {
  font-size: 2rem;
  font-weight: 700;
  color: #8B4513;
  margin: 0 0 0.5rem 0;
  font-family: 'Playfair Display', serif;
  letter-spacing: -0.02em;
}

.wizard-subtitle {
  font-size: 1rem;
  color: #8B7355;
  margin: 0;
  font-family: 'Inter', sans-serif;
  font-weight: 400;
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
  cursor: pointer;
  transition: all 0.2s ease;
}

.close-btn:hover {
  background: rgba(139, 69, 19, 0.1);
  transform: scale(1.05);
}

/* Progress */
.progress-container {
  padding: 0 2rem 1.5rem;
}

.progress-bar {
  width: 100%;
  height: 6px;
  background: rgba(139, 69, 19, 0.1);
  border-radius: 3px;
  overflow: hidden;
  margin-bottom: 1rem;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #8B4513 0%, #DAA520 100%);
  border-radius: 3px;
  transition: width 0.4s ease;
}

.progress-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.875rem;
  color: #8B7355;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
}

/* Step Navigation */
.step-navigation {
  padding: 0 2rem 1.5rem;
}

.step-indicators {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.step-indicator {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  border-radius: 0.75rem;
  background: rgba(139, 69, 19, 0.02);
  border: 1px solid rgba(139, 69, 19, 0.08);
  transition: all 0.2s ease;
  min-width: 120px;
  position: relative;
}

.step-indicator.active {
  background: linear-gradient(135deg, #8B4513 0%, #DAA520 100%);
  border-color: #8B4513;
  color: #FFFFFF;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(139, 69, 19, 0.2);
}

.step-indicator.completed {
  background: rgba(34, 197, 94, 0.1);
  border-color: rgba(34, 197, 94, 0.2);
  color: #16a34a;
}

.step-indicator.pending {
  opacity: 0.6;
}

.step-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border-radius: 0.5rem;
  background: rgba(255, 255, 255, 0.2);
  color: inherit;
}

.step-indicator.active .step-icon {
  background: rgba(255, 255, 255, 0.3);
}

.step-indicator.completed .step-icon {
  background: rgba(34, 197, 94, 0.2);
}

.step-info {
  flex: 1;
  text-align: center;
}

.step-number {
  display: block;
  font-size: 0.75rem;
  font-weight: 700;
  opacity: 0.8;
  margin-bottom: 0.125rem;
}

.step-label {
  display: block;
  font-size: 0.875rem;
  font-weight: 600;
  font-family: 'Inter', sans-serif;
}

.step-check {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  background: #16a34a;
  color: #FFFFFF;
}

/* Step Content */
.step-content {
  padding: 0 2rem 2rem;
  flex: 1;
  overflow-y: auto;
}

.content-header {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid rgba(139, 69, 19, 0.1);
}

.step-icon-large {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 4rem;
  height: 4rem;
  border-radius: 1rem;
  background: linear-gradient(135deg, #8B4513 0%, #DAA520 100%);
  color: #FFFFFF;
  flex-shrink: 0;
}

.step-details {
  flex: 1;
}

.step-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #8B4513;
  margin: 0 0 0.5rem 0;
  font-family: 'Playfair Display', serif;
}

.step-description {
  font-size: 1rem;
  color: #8B7355;
  margin: 0;
  font-family: 'Inter', sans-serif;
  font-weight: 400;
}

.content-body {
  max-height: 400px;
  overflow-y: auto;
  padding-right: 0.5rem;
}

/* Action Bar */
.action-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem 2rem;
  border-top: 1px solid rgba(139, 69, 19, 0.1);
  background: rgba(139, 69, 19, 0.02);
}

.action-info {
  flex: 1;
}

.last-saved {
  font-size: 0.875rem;
  color: #8B7355;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
}

.action-buttons {
  display: flex;
  align-items: center;
  gap: 1rem;
}

/* Buttons */
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
  text-decoration: none;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
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

.btn-secondary {
  background: #F3F4F6;
  color: #6B7280;
  border-color: #D1D5DB;
}

.btn-secondary:hover:not(:disabled) {
  background: #E5E7EB;
  border-color: #9CA3AF;
}

.btn-accent {
  background: linear-gradient(135deg, #8B4513 0%, #DAA520 100%);
  color: #FFFFFF;
  border-color: #8B4513;
}

.btn-accent:hover:not(:disabled) {
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
  .profile-wizard {
    margin: 0;
    max-height: 100vh;
    border-radius: 0;
  }

  .wizard-header {
    padding: 1.5rem;
  }

  .wizard-title {
    font-size: 1.5rem;
  }

  .wizard-subtitle {
    font-size: 0.875rem;
  }

  .progress-container,
  .step-navigation,
  .step-content {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }

  .step-indicators {
    gap: 0.5rem;
  }

  .step-indicator {
    min-width: 100px;
    padding: 0.5rem 0.75rem;
  }

  .step-icon-large {
    width: 3rem;
    height: 3rem;
  }

  .step-title {
    font-size: 1.25rem;
  }

  .content-body {
    max-height: 300px;
  }

  .action-bar {
    padding: 1rem 1.5rem;
    flex-direction: column;
    gap: 1rem;
  }

  .action-buttons {
    width: 100%;
    justify-content: space-between;
  }

  .btn {
    flex: 1;
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .step-indicators {
    flex-direction: column;
    gap: 0.25rem;
  }

  .step-indicator {
    width: 100%;
    justify-content: center;
  }

  .content-header {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  }

  .action-buttons {
    flex-direction: column;
    gap: 0.5rem;
  }

  .btn {
    width: 100%;
  }
}
</style>
