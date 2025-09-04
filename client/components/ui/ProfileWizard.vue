<template>
  <Modal
    :is-open="isOpen"
    :title="currentStepData.title"
    :show-footer="false"
    @close="$emit('close')"
  >
    <!-- Progress indicator -->
    <div class="wizard-progress">
      <div class="progress-bar">
        <div
          class="progress-fill"
          :style="{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }"
        ></div>
      </div>
      <div class="step-indicators">
        <div
          v-for="(step, index) in steps"
          :key="step.id"
          class="step-indicator"
          :class="{ active: currentStep === index + 1, completed: currentStep > index + 1 }"
        >
          <span class="step-number">{{ index + 1 }}</span>
          <span class="step-label">{{ step.label }}</span>
        </div>
      </div>
    </div>

    <!-- Step content -->
    <div class="wizard-content">
      <component
        :is="currentStepData.component"
        :profile="profile"
        :errors="errors"
        @update="updateField"
        @validate="validateStep"
      />
    </div>

    <!-- Navigation -->
    <div class="wizard-footer">
      <div class="wizard-actions">
        <button
          @click="previousStep"
          :disabled="currentStep === 1"
          class="btn-secondary"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="15,18 9,12 15,6"></polyline>
          </svg>
          Anterior
        </button>

        <div class="step-info">
          Paso {{ currentStep }} de {{ steps.length }}
        </div>

        <button
          v-if="currentStep < steps.length"
          @click="nextStep"
          :disabled="!isStepValid"
          class="btn-primary"
        >
          Siguiente
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="9,18 15,12 9,6"></polyline>
          </svg>
        </button>

        <button
          v-else
          @click="saveProfile"
          :disabled="!isStepValid || isLoading"
          class="btn-primary"
        >
          {{ isLoading ? 'Guardando...' : 'Guardar Perfil' }}
        </button>
      </div>
    </div>
  </Modal>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import Modal from './Modal.vue'
import BasicInfoStep from './wizard/BasicInfoStep.vue'
import PhysicalInfoStep from './wizard/PhysicalInfoStep.vue'
import AddressInfoStep from './wizard/AddressInfoStep.vue'
import ProfessionalInfoStep from './wizard/ProfessionalInfoStep.vue'

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

const steps = [
  {
    id: 'basic',
    label: 'Básico',
    title: 'Información Básica',
    component: BasicInfoStep
  },
  {
    id: 'physical',
    label: 'Físico',
    title: 'Información Física',
    component: PhysicalInfoStep
  },
  {
    id: 'address',
    label: 'Dirección',
    title: 'Dirección y Contacto',
    component: AddressInfoStep
  },
  {
    id: 'professional',
    label: 'Profesional',
    title: 'Información Profesional',
    component: ProfessionalInfoStep
  }
]

const currentStepData = computed(() => steps[currentStep.value - 1])

const isStepValid = computed(() => {
  return Object.keys(errors.value).length === 0
})

const updateField = (field, value) => {
  emit('update', field, value)
}

const validateStep = (stepErrors) => {
  errors.value = stepErrors
}

const nextStep = () => {
  if (currentStep.value < steps.length) {
    currentStep.value++
  }
}

const previousStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--
  }
}

const saveProfile = async () => {
  if (!isStepValid.value) return

  isLoading.value = true
  try {
    await emit('save')
    emit('close')
  } catch (error) {
    console.error('Error saving profile:', error)
  } finally {
    isLoading.value = false
  }
}

// Reset step when modal opens
watch(() => props.isOpen, (newValue) => {
  if (newValue) {
    currentStep.value = 1
    errors.value = {}
  }
})
</script>

<style scoped>
.wizard-progress {
  margin-bottom: 2rem;
}

.progress-bar {
  width: 100%;
  height: 4px;
  background: var(--border-light);
  border-radius: 2px;
  margin-bottom: 1rem;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: var(--bg-primary);
  transition: width 0.3s ease;
}

.step-indicators {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.step-indicator {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  opacity: 0.5;
  transition: all var(--transition-fast);
}

.step-indicator.active {
  opacity: 1;
}

.step-indicator.completed {
  opacity: 0.8;
}

.step-number {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--border-light);
  color: var(--color-text-light);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.875rem;
  font-weight: 600;
  transition: all var(--transition-fast);
}

.step-indicator.active .step-number {
  background: var(--bg-primary);
  color: var(--color-primary-contrast);
}

.step-indicator.completed .step-number {
  background: var(--color-secondary);
  color: white;
}

.step-label {
  font-size: 0.75rem;
  color: var(--color-text-light);
  font-weight: 500;
  text-align: center;
}

.wizard-content {
  min-height: 400px;
}

.wizard-footer {
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid var(--border-light);
}

.wizard-actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.step-info {
  font-size: 0.875rem;
  color: var(--color-text-light);
  font-weight: 500;
}

.btn-primary,
.btn-secondary {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: var(--radius);
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition-fast);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.btn-primary {
  background: var(--bg-primary);
  color: var(--color-primary-contrast);
}

.btn-primary:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px var(--shadow-primary);
}

.btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.btn-secondary {
  background: var(--color-muted);
  color: white;
}

.btn-secondary:hover:not(:disabled) {
  background: var(--color-text);
  transform: translateY(-1px);
}

.btn-secondary:disabled {
  opacity: 0.4;
  cursor: not-allowed;
  transform: none;
}

@media (max-width: 768px) {
  .step-indicators {
    flex-wrap: wrap;
    gap: 1rem;
  }

  .wizard-actions {
    flex-direction: column;
    align-items: stretch;
  }

  .step-info {
    order: -1;
    text-align: center;
  }

  .btn-primary,
  .btn-secondary {
    justify-content: center;
  }
}
</style>
