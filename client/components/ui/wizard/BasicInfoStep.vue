<template>
  <div class="step-content">
    <div class="form-grid">
      <div class="form-group">
        <label for="firstName">Nombre</label>
        <input
          id="firstName"
          v-model="localProfile.firstName"
          type="text"
          class="form-input"
          @input="updateField('firstName', $event.target.value)"
          @blur="validateField('firstName')"
        />
        <span v-if="errors.firstName" class="error-message">{{ errors.firstName }}</span>
      </div>

      <div class="form-group">
        <label for="lastName">Apellido</label>
        <input
          id="lastName"
          v-model="localProfile.lastName"
          type="text"
          class="form-input"
          @input="updateField('lastName', $event.target.value)"
          @blur="validateField('lastName')"
        />
        <span v-if="errors.lastName" class="error-message">{{ errors.lastName }}</span>
      </div>

      <div class="form-group">
        <label for="maidenName">Apellido de Soltera</label>
        <input
          id="maidenName"
          v-model="localProfile.maidenName"
          type="text"
          class="form-input"
          @input="updateField('maidenName', $event.target.value)"
        />
      </div>

      <div class="form-group">
        <label for="age">Edad</label>
        <input
          id="age"
          v-model.number="localProfile.age"
          type="number"
          min="1"
          max="150"
          class="form-input"
          @input="updateField('age', parseInt($event.target.value) || null)"
          @blur="validateField('age')"
        />
        <span v-if="errors.age" class="error-message">{{ errors.age }}</span>
      </div>

      <div class="form-group">
        <label for="gender">Género</label>
        <select
          id="gender"
          v-model="localProfile.gender"
          class="form-input"
          @change="updateField('gender', $event.target.value)"
        >
          <option value="">Seleccionar</option>
          <option value="male">Masculino</option>
          <option value="female">Femenino</option>
          <option value="other">Otro</option>
        </select>
      </div>

      <div class="form-group">
        <label for="phone">Teléfono</label>
        <input
          id="phone"
          v-model="localProfile.phone"
          type="tel"
          class="form-input"
          @input="updateField('phone', $event.target.value)"
          @blur="validateField('phone')"
        />
        <span v-if="errors.phone" class="error-message">{{ errors.phone }}</span>
      </div>

      <div class="form-group">
        <label for="username">Nombre de Usuario</label>
        <input
          id="username"
          v-model="localProfile.username"
          type="text"
          class="form-input"
          @input="updateField('username', $event.target.value)"
          @blur="validateField('username')"
        />
        <span v-if="errors.username" class="error-message">{{ errors.username }}</span>
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

const localProfile = ref({ ...props.profile })

const updateField = (field, value) => {
  localProfile.value[field] = value
  emit('update', field, value)
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

    case 'age':
      if (localProfile.value.age && (localProfile.value.age < 1 || localProfile.value.age > 150)) {
        newErrors.age = 'La edad debe estar entre 1 y 150 años'
      } else {
        delete newErrors.age
      }
      break

    case 'phone':
      if (localProfile.value.phone && localProfile.value.phone.length > 20) {
        newErrors.phone = 'El teléfono no puede tener más de 20 caracteres'
      } else {
        delete newErrors.phone
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
onMounted(() => {
  validateField('firstName')
  validateField('lastName')
  validateField('age')
  validateField('phone')
  validateField('username')
})
</script>

<style scoped>
.step-content {
  width: 100%;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
}

.form-input {
  padding: 0.75rem 1rem;
  border: 2px solid var(--border-light);
  border-radius: var(--radius);
  font-size: 1rem;
  transition: all var(--transition-fast);
  background: var(--bg-light);
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

.error-message {
  color: #ef4444;
  font-size: 0.75rem;
  margin-top: 0.25rem;
  font-weight: 500;
}

@media (max-width: 768px) {
  .form-grid {
    grid-template-columns: 1fr;
  }
}
</style>
