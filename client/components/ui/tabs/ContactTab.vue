<template>
  <div class="tab-content">
    <div class="section-header">
      <div class="section-icon">
        <Icon name="heroicons:phone" size="24" />
      </div>
      <div class="section-info">
        <h3 class="section-title">Información de Contacto</h3>
        <p class="section-description">Datos para comunicarnos contigo</p>
      </div>
    </div>

    <div class="form-grid">
      <div class="form-group">
        <label for="email" class="form-label">
          Correo Electrónico <span class="required">*</span>
        </label>
        <input
          id="email"
          v-model="localData.email"
          type="email"
          class="form-input"
          :class="{ error: errors.email }"
          placeholder="tu@email.com"
          @input="handleInput('email', $event.target.value)"
          @blur="validateField('email')"
        />
        <span v-if="errors.email" class="error-message">{{ errors.email }}</span>
      </div>

      <div class="form-group">
        <label for="phone" class="form-label">
          Teléfono
        </label>
        <input
          id="phone"
          v-model="localData.phone"
          type="tel"
          class="form-input"
          :class="{ error: errors.phone }"
          placeholder="+57 300 123 4567"
          @input="handleInput('phone', $event.target.value)"
          @blur="validateField('phone')"
        />
        <span v-if="errors.phone" class="error-message">{{ errors.phone }}</span>
      </div>

      <div class="form-group">
        <label for="emergencyContact" class="form-label">
          Contacto de Emergencia
        </label>
        <input
          id="emergencyContact"
          v-model="localData.emergencyContact"
          type="text"
          class="form-input"
          :class="{ error: errors.emergencyContact }"
          placeholder="Nombre del contacto"
          @input="handleInput('emergencyContact', $event.target.value)"
          @blur="validateField('emergencyContact')"
        />
        <span v-if="errors.emergencyContact" class="error-message">{{ errors.emergencyContact }}</span>
      </div>

      <div class="form-group">
        <label for="emergencyPhone" class="form-label">
          Teléfono de Emergencia
        </label>
        <input
          id="emergencyPhone"
          v-model="localData.emergencyPhone"
          type="tel"
          class="form-input"
          :class="{ error: errors.emergencyPhone }"
          placeholder="+57 300 123 4567"
          @input="handleInput('emergencyPhone', $event.target.value)"
          @blur="validateField('emergencyPhone')"
        />
        <span v-if="errors.emergencyPhone" class="error-message">{{ errors.emergencyPhone }}</span>
      </div>
    </div>

    <div class="contact-notice">
      <div class="notice-icon">
        <Icon name="heroicons:information-circle" size="20" />
      </div>
      <div class="notice-content">
        <h4>Privacidad de Datos</h4>
        <p>Tu información de contacto se utiliza únicamente para fines de comunicación y verificación de cuenta.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'

const props = defineProps({
  profile: {
    type: Object,
    default: () => ({})
  },
  errors: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['update', 'validate'])

const localData = ref({
  email: '',
  phone: '',
  emergencyContact: '',
  emergencyPhone: ''
})

const localErrors = ref({})

const handleInput = (field, value) => {
  localData.value[field] = value
  emit('update', field, value)
  validateField(field)
}

const validateField = (field) => {
  const value = localData.value[field]
  let error = ''

  switch (field) {
    case 'email':
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!value || !emailRegex.test(value)) {
        error = 'Ingresa un correo electrónico válido'
      }
      break
    case 'phone':
      if (value && value.length < 10) {
        error = 'El teléfono debe tener al menos 10 dígitos'
      }
      break
    case 'emergencyPhone':
      if (localData.value.emergencyContact && (!value || value.length < 10)) {
        error = 'El teléfono de emergencia es requerido si hay un contacto'
      }
      break
  }

  localErrors.value[field] = error
  emit('validate', 'contact', localErrors.value)
}

const validateAll = () => {
  ['email', 'phone', 'emergencyContact', 'emergencyPhone'].forEach(field => {
    validateField(field)
  })
}

onMounted(() => {
  localData.value = {
    email: props.profile.email || '',
    phone: props.profile.phone || '',
    emergencyContact: props.profile.emergencyContact || '',
    emergencyPhone: props.profile.emergencyPhone || ''
  }
  validateAll()
})

watch(() => props.profile, (newProfile) => {
  localData.value = {
    email: newProfile.email || '',
    phone: newProfile.phone || '',
    emergencyContact: newProfile.emergencyContact || '',
    emergencyPhone: newProfile.emergencyPhone || ''
  }
}, { deep: true })
</script>

<style scoped>
.tab-content {
  max-width: 100%;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--color-accent);
}

.section-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  border-radius: 0.75rem;
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%);
  color: var(--color-text-light);
}

.section-info {
  flex: 1;
}

.section-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--color-primary);
  margin: 0 0 0.25rem 0;
  font-family: 'Playfair Display', serif;
}

.section-description {
  font-size: 0.875rem;
  color: var(--color-text);
  margin: 0;
  font-family: 'Inter', sans-serif;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-label {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-text);
  font-family: 'Inter', sans-serif;
}

.required {
  color: var(--color-accent);
}

.form-input {
  padding: 0.75rem 1rem;
  border: 1px solid var(--color-accent);
  border-radius: 0.5rem;
  background: var(--color-secondary);
  color: var(--color-text);
  font-size: 0.875rem;
  font-family: 'Inter', sans-serif;
  transition: all 0.2s ease;
}

.form-input:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.1);
}

.form-input.error {
  border-color: var(--color-accent);
  box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.1);
}

.form-input::placeholder {
  color: var(--color-text-light);
}

.error-message {
  font-size: 0.75rem;
  color: var(--color-accent);
  font-family: 'Inter', sans-serif;
  font-weight: 500;
}

.contact-notice {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.5rem;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.05) 0%, rgba(0, 0, 0, 0.02) 100%);
  border: 1px solid var(--color-accent);
  border-radius: 0.75rem;
}

.notice-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.5rem;
  background: rgba(0, 0, 0, 0.1);
  color: var(--color-primary);
  flex-shrink: 0;
}

.notice-content h4 {
  font-size: 0.875rem;
  font-weight: 700;
  color: var(--color-text);
  margin: 0 0 0.5rem 0;
  font-family: 'Inter', sans-serif;
}

.notice-content p {
  font-size: 0.8125rem;
  color: var(--color-text);
  margin: 0;
  line-height: 1.5;
  font-family: 'Inter', sans-serif;
}

@media (max-width: 768px) {
  .form-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .section-header {
    gap: 0.75rem;
  }

  .section-icon {
    width: 2.5rem;
    height: 2.5rem;
  }

  .section-title {
    font-size: 1.125rem;
  }

  .contact-notice {
    padding: 1rem;
    gap: 0.75rem;
  }

  .notice-icon {
    width: 2rem;
    height: 2rem;
  }
}
</style>
