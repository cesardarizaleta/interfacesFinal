<template>
  <div class="tab-content">
    <div class="section-header">
      <div class="section-icon">
        <Icon name="heroicons:user" size="24" />
      </div>
      <div class="section-info">
        <h3 class="section-title">Información Personal</h3>
        <p class="section-description">Tu información básica de identificación</p>
      </div>
    </div>

    <div class="form-grid">
      <div class="form-group">
        <label for="firstName" class="form-label">
          Nombre <span class="required">*</span>
        </label>
        <input
          id="firstName"
          v-model="localData.firstName"
          type="text"
          class="form-input"
          :class="{ error: errors.firstName }"
          placeholder="Ingresa tu nombre"
          @input="handleInput('firstName', $event.target.value)"
          @blur="validateField('firstName')"
        />
        <span v-if="errors.firstName" class="error-message">{{ errors.firstName }}</span>
      </div>

      <div class="form-group">
        <label for="lastName" class="form-label">
          Apellido <span class="required">*</span>
        </label>
        <input
          id="lastName"
          v-model="localData.lastName"
          type="text"
          class="form-input"
          :class="{ error: errors.lastName }"
          placeholder="Ingresa tu apellido"
          @input="handleInput('lastName', $event.target.value)"
          @blur="validateField('lastName')"
        />
        <span v-if="errors.lastName" class="error-message">{{ errors.lastName }}</span>
      </div>

      <div class="form-group">
        <label for="birthDate" class="form-label">
          Fecha de Nacimiento
        </label>
        <input
          id="birthDate"
          v-model="localData.birthDate"
          type="date"
          class="form-input"
          :class="{ error: errors.birthDate }"
          @input="handleInput('birthDate', $event.target.value)"
          @blur="validateField('birthDate')"
        />
        <span v-if="errors.birthDate" class="error-message">{{ errors.birthDate }}</span>
      </div>

      <div class="form-group">
        <label for="gender" class="form-label">
          Género
        </label>
        <select
          id="gender"
          v-model="localData.gender"
          class="form-input"
          :class="{ error: errors.gender }"
          @change="handleInput('gender', $event.target.value)"
          @blur="validateField('gender')"
        >
          <option value="">Seleccionar género</option>
          <option value="masculino">Masculino</option>
          <option value="femenino">Femenino</option>
          <option value="otro">Otro</option>
          <option value="prefiero-no-decir">Prefiero no decir</option>
        </select>
        <span v-if="errors.gender" class="error-message">{{ errors.gender }}</span>
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
  firstName: '',
  lastName: '',
  birthDate: '',
  gender: ''
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
    case 'firstName':
      if (!value || value.trim().length < 2) {
        error = 'El nombre debe tener al menos 2 caracteres'
      }
      break
    case 'lastName':
      if (!value || value.trim().length < 2) {
        error = 'El apellido debe tener al menos 2 caracteres'
      }
      break
    case 'birthDate':
      if (value) {
        const birthDate = new Date(value)
        const today = new Date()
        const age = today.getFullYear() - birthDate.getFullYear()
        if (age < 13 || age > 120) {
          error = 'La edad debe estar entre 13 y 120 años'
        }
      }
      break
  }

  localErrors.value[field] = error
  emit('validate', 'personal', localErrors.value)
}

const validateAll = () => {
  ['firstName', 'lastName', 'birthDate', 'gender'].forEach(field => {
    validateField(field)
  })
}

onMounted(() => {
  // Initialize with profile data
  localData.value = {
    firstName: props.profile.firstName || '',
    lastName: props.profile.lastName || '',
    birthDate: props.profile.birthDate || '',
    gender: props.profile.gender || ''
  }
  validateAll()
})

watch(() => props.profile, (newProfile) => {
  localData.value = {
    firstName: newProfile.firstName || '',
    lastName: newProfile.lastName || '',
    birthDate: newProfile.birthDate || '',
    gender: newProfile.gender || ''
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
}
</style>
