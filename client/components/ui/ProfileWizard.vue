<template>
  <Modal
    :is-open="isOpen"
    :title="'Personaliza tu perfil'"
    :description="currentStepData.description"
    size="xl"
    :show-footer="false"
    :close-on-backdrop="true"
    @close="$emit('close')"
  >
    <!-- Top progress bar -->
    <div class="progress-bar" aria-hidden="true">
      <div
        class="progress-fill"
        :style="{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }"
      />
    </div>

    <div class="wizard-layout" role="region" :aria-label="`Paso ${currentStep} de ${steps.length}`">
      <!-- Left rail: steps -->
      <nav class="wizard-rail" aria-label="Pasos del asistente">
        <button
          v-for="(step, index) in steps"
          :key="step.id"
          class="rail-step"
          :class="{ active: currentStep === index + 1, completed: currentStep > index + 1 }"
          @click="goToStep(index + 1)"
          :aria-current="currentStep === index + 1 ? 'step' : undefined"
        >
          <span class="rail-index" aria-hidden="true">{{ index + 1 }}</span>
          <span class="rail-label">{{ step.label }}</span>
          <span class="rail-check" v-if="currentStep > index + 1" aria-hidden="true">✓</span>
        </button>
      </nav>

      <!-- Main content -->
      <section class="wizard-main" tabindex="0">
        <header class="wizard-head">
          <h3 class="wizard-title">{{ currentStepData.title }}</h3>
          <span class="mini-step-counter">{{ currentStep }} / {{ steps.length }}</span>
        </header>

        <div class="wizard-content">
          <component
            :is="currentStepData.component"
            :profile="profile"
            :errors="errors"
            @update="updateField"
            @validate="validateStep"
          />
        </div>

        <footer class="wizard-footer" aria-hidden="false">
          <div class="wizard-actions">
            <button @click="previousStep" :disabled="currentStep === 1" class="btn btn-outline" aria-label="Anterior">
              Anterior
            </button>

            <div class="step-counter mobile-hidden">
              <span class="current-step">{{ currentStep }}</span>
              <span class="step-separator">de</span>
              <span class="total-steps">{{ steps.length }}</span>
            </div>

            <div class="actions">
              <button v-if="currentStep < steps.length" @click="nextStep" :disabled="!isStepValid" class="btn btn-primary">Siguiente</button>
              <button v-else @click="saveProfile" :disabled="!isStepValid || isLoading" class="btn btn-accent">{{ isLoading ? 'Guardando...' : 'Completar Perfil' }}</button>
            </div>
          </div>
        </footer>
      </section>
    </div>
  </Modal>
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
    label: 'Identidad',
    title: 'Información Personal Básica',
    component: PersonalIdentityStep,
    description: 'Tu nombre, apellido y datos de identificación'
  },
  {
    id: 'contact-info',
    label: 'Contacto',
    title: 'Información de Contacto',
    component: ContactInfoStep,
    description: 'Teléfono, email y datos de comunicación'
  },
  {
    id: 'personal-address',
    label: 'Dirección',
    title: 'Dirección Personal',
    component: PersonalAddressStep,
    description: 'Tu dirección residencial completa'
  },
  {
    id: 'physical-char',
    label: 'Físico',
    title: 'Características Físicas',
    component: PhysicalCharacteristicsStep,
    description: 'Tu apariencia y medidas físicas'
  },
  {
    id: 'professional',
    label: 'Profesional',
    title: 'Información Profesional',
    component: ProfessionalInfoStep,
    description: 'Tu trabajo y carrera profesional'
  },
  {
    id: 'additional',
    label: 'Adicional',
    title: 'Información Adicional',
    component: AdditionalInfoStep,
    description: 'Datos complementarios opcionales'
  }
]

const currentStepData = computed(() => steps[currentStep.value - 1])

const isStepValid = computed(() => Object.keys(errors.value).length === 0)

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
    emit('close')
  } catch (error) {
    console.error('Error saving profile:', error)
  } finally {
    isLoading.value = false
  }
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
/* layout */
.wizard-layout {
  display: grid;
  grid-template-columns: 220px 1fr;
  gap: 1rem;
  align-items: start;
}

.wizard-rail {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding-right: 0.5rem;
  border-right: 1px dashed var(--border-light);
}

.rail-step {
  display: grid;
  grid-template-columns: 28px 1fr auto;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.5rem;
  border-radius: 8px;
  border: 1px solid transparent;
  background: transparent;
  color: var(--color-text);
  text-align: left;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.rail-step:hover { background: var(--bg-muted); }
.rail-step.active { border-color: var(--color-primary); background: var(--bg-light); }
.rail-step.completed { opacity: 0.9; }

.rail-index {
  width: 24px;
  height: 24px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  font-size: 0.8rem;
  font-weight: 700;
  background: var(--border-light);
  color: var(--color-text-light);
}

.rail-step.active .rail-index { background: var(--color-primary); color: white; }
.rail-step.completed .rail-index { background: var(--color-secondary); color: white; }

.rail-label { font-weight: 600; font-size: 0.9rem; }
.rail-check { color: var(--color-secondary); font-weight: 700; }

.wizard-main { display: flex; flex-direction: column; gap: 0.5rem; }

.wizard-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.wizard-title {
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--color-text);
  margin: 0;
}

.mini-step-counter {
  font-size: 0.9rem;
  color: var(--color-text-light);
  background: var(--bg-muted);
  padding: 0.25rem 0.5rem;
  border-radius: 6px;
  border: 1px solid var(--border-light);
}

.progress-bar {
  width: 100%;
  height: 4px;
  background: var(--border-light);
  border-radius: 3px;
  margin-bottom: 0.75rem;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--color-primary), var(--color-secondary));
  transition: width 0.4s ease;
  border-radius: 3px;
}

.wizard-content {
  overflow: visible; /* no internal scroll */
  margin-bottom: 0.25rem;
}

.wizard-footer {
  margin-top: 0.25rem;
  padding-top: 0.5rem;
  border-top: 1px solid var(--border-light);
  background: transparent;
  padding: 0.4rem 0.25rem;
}

.wizard-actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.step-counter {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  color: var(--color-text);
  background: var(--bg-muted);
  padding: 0.35rem 0.75rem;
  border-radius: 16px;
  border: 1px solid var(--border-light);
}

.current-step { font-size: 1.1rem; color: var(--color-primary); }
.step-separator { color: var(--color-text-light); font-size: 0.875rem; }
.total-steps { font-size: 1.1rem; color: var(--color-text); }

/* rely on global .btn, .btn-primary, .btn-outline, .btn-accent from style.css */

@media (max-width: 768px) {
  .wizard-layout {
    grid-template-columns: 1fr;
  }

  .wizard-rail {
    flex-direction: row;
    border-right: none;
    border-bottom: 1px dashed var(--border-light);
    padding-bottom: 0.5rem;
    overflow-x: auto;
    gap: 0.5rem;
  }

  .rail-step { grid-template-columns: 24px 1fr auto; }

  .wizard-actions {
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
  }

  .step-counter {
    order: -1;
    align-self: center;
  }

  .btn-primary,
  .btn-secondary,
  .btn-success { min-width: auto; }
}

/* hide some elements on small screens */
.mobile-hidden { display: inline-flex; }
@media (max-width: 560px) {
  .mobile-hidden { display: none; }
}
</style>
