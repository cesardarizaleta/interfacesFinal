<template>
  <div class="step-content">
    <div class="form-intro">
      <div class="intro-icon">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
      </div>
      <h4>¿Quién eres?</h4>
      <p>Comencemos con tu información básica de identificación</p>
    </div>

    <div class="form-grid">
      <!-- Required fields -->
      <div class="form-section required-section">
        <h5>Información Requerida</h5>
        <div class="form-group">
          <label for="firstName">
            Nombre <span class="required">*</span>
          </label>
          <input
            id="firstName"
            ref="firstNameInput"
            v-model="localProfile.firstName"
            type="text"
            class="form-input required"
            placeholder="Ingresa tu nombre"
            @input="onFirstNameInput($event.target.value)"
            @blur="validateField('firstName')"
          />
          <span v-if="errors.firstName" class="error-message">{{ errors.firstName }}</span>
        </div>

        <div class="form-group">
          <label for="lastName">
            Apellido <span class="required">*</span>
          </label>
          <input
            id="lastName"
            v-model="localProfile.lastName"
            type="text"
            class="form-input required"
            placeholder="Ingresa tu apellido"
            @input="updateField('lastName', $event.target.value)"
            @blur="validateField('lastName')"
          />
          <span v-if="errors.lastName" class="error-message">{{ errors.lastName }}</span>
        </div>

        <div class="form-group">
          <label for="username">
            Nombre de Usuario <span class="required">*</span>
          </label>
          <input
            id="username"
            v-model="localProfile.username"
            type="text"
            class="form-input required"
            placeholder="Elige un nombre de usuario único"
            @input="updateField('username', $event.target.value)"
            @blur="validateField('username')"
          />
          <span v-if="errors.username" class="error-message">{{ errors.username }}</span>
        </div>
      </div>

      <!-- Optional fields -->
      <div class="form-section optional-section">
        <h5>Información Opcional</h5>
        <div class="form-group">
          <label for="maidenName">Apellido de Soltera</label>
          <input
            id="maidenName"
            v-model="localProfile.maidenName"
            type="text"
            class="form-input"
            placeholder="Si aplica"
            @input="updateField('maidenName', $event.target.value)"
          />
        </div>

        <div class="form-group">
          <label for="birthDate">Fecha de Nacimiento</label>
          <input
            id="birthDate"
            v-model="localProfile.birthDate"
            type="date"
            class="form-input"
            @change="updateField('birthDate', $event.target.value)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, nextTick } from 'vue'

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


const localProfile = ref({ ...props.profile })
const firstNameInput = ref(null)

const updateField = (field, value) => {
  localProfile.value[field] = value
  emit('update', field, value)
}

let firstNameTimeout = null
const onFirstNameInput = (value) => {
  updateField('firstName', value)
  clearTimeout(firstNameTimeout)
  firstNameTimeout = setTimeout(() => validateField('firstName'), 150)
}

const validateField = (field) => {
  const newErrors = { ...props.errors }

  switch (field) {
    case 'firstName':
      if (!localProfile.value.firstName?.trim()) {
        newErrors.firstName = 'El nombre es requerido'
      } else if (localProfile.value.firstName.length < 1) {
        newErrors.firstName = 'El nombre debe tener al menos 1 carácter'
      } else if (localProfile.value.firstName.length > 50) {
        newErrors.firstName = 'El nombre no puede tener más de 50 caracteres'
      } else {
        delete newErrors.firstName
      }
      break

    case 'lastName':
      if (!localProfile.value.lastName?.trim()) {
        newErrors.lastName = 'El apellido es requerido'
      } else if (localProfile.value.lastName.length < 1) {
        newErrors.lastName = 'El apellido debe tener al menos 1 carácter'
      } else if (localProfile.value.lastName.length > 50) {
        newErrors.lastName = 'El apellido no puede tener más de 50 caracteres'
      } else {
        delete newErrors.lastName
      }
      break

    case 'username':
      if (!localProfile.value.username?.trim()) {
        newErrors.username = 'El nombre de usuario es requerido'
      } else if (localProfile.value.username.length < 3) {
        newErrors.username = 'El nombre de usuario debe tener al menos 3 caracteres'
      } else if (localProfile.value.username.length > 30) {
        newErrors.username = 'El nombre de usuario no puede tener más de 30 caracteres'
      } else {
        delete newErrors.username
      }
      break
  }

  emit('validate', newErrors)
}

// Sync with parent profile changes
watch(() => props.profile, (newProfile) => {
  localProfile.value = { ...newProfile }
}, { deep: true })

// Validate all fields on mount
onMounted(async () => {
  await nextTick()
  if (firstNameInput.value && typeof firstNameInput.value.focus === 'function') {
    firstNameInput.value.focus()
  }
  validateField('firstName')
  validateField('lastName')
  validateField('username')
})
</script>

<style scoped>
.step-content {
  width: 100%;
}

.form-intro {
  text-align: center;
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: linear-gradient(135deg, var(--bg-light), rgba(30, 64, 175, 0.05));
  border-radius: var(--radius);
  border: 1px solid var(--border-light);
}

.intro-icon {
  color: var(--color-primary);
  margin-bottom: 1rem;
  display: inline-block;
}

.form-intro h4 {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--color-text);
  margin: 0 0 0.5rem 0;
}

.form-intro p {
  font-size: 0.875rem;
  color: var(--color-text-light);
  margin: 0;
  font-weight: 500;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
}

.form-section {
  background: var(--bg-light);
  padding: 1.5rem;
  border-radius: var(--radius);
  border: 1px solid var(--border-light);
}

.required-section {
  border-color: var(--color-primary);
  border-width: 2px;
  background: linear-gradient(135deg, var(--bg-light), rgba(30, 64, 175, 0.02));
}

.optional-section {
  border-color: var(--color-secondary);
  background: linear-gradient(135deg, var(--bg-light), rgba(16, 185, 129, 0.02));
}

.form-section h5 {
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-text);
  margin: 0 0 1.5rem 0;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid currentColor;
}

.required-section h5 {
  color: var(--color-primary);
}

.optional-section h5 {
  color: var(--color-secondary);
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 1.5rem;
}

.form-group:last-child {
  margin-bottom: 0;
}

.form-group label {
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.required {
  color: var(--color-error);
  font-weight: 700;
}

.form-input {
  padding: 0.875rem 1rem;
  border: 2px solid var(--border-light);
  border-radius: var(--radius);
  font-size: 1rem;
  transition: all var(--transition-fast);
  background: white;
  color: var(--color-text);
}

.form-input:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(30, 64, 175, 0.1);
}

.form-input:hover {
  border-color: var(--color-secondary);
}

.form-input.required:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(30, 64, 175, 0.15);
}

.error-message {
  color: var(--color-error);
  font-size: 0.75rem;
  margin-top: 0.25rem;
  font-weight: 500;
}

@media (max-width: 768px) {
  .form-intro {
    padding: 1rem;
  }

  .form-section {
    padding: 1rem;
  }

  .form-grid {
    gap: 1.5rem;
  }
}
</style>
