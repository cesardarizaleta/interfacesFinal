<template>
  <div class="step-content">
    <div class="form-intro">
      <div class="intro-icon">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
        </svg>
      </div>
      <h4>¿Cómo contactarte?</h4>
      <p>Agrega tu información de contacto para que puedan comunicarse contigo</p>
    </div>

    <div class="form-grid">
      <!-- Required fields -->
      <div class="form-section required-section">
        <h5>Información Requerida</h5>
              <div class="form-group">
                <label for="phone">
                  Teléfono <span class="required">*</span>
                </label>
                <input
                  id="phone"
                  ref="phoneInput"
                  v-model="localProfile.phone"
                  type="tel"
                  class="form-input required"
                  placeholder="+1 (555) 123-4567"
                  @input="onPhoneInput($event.target.value)"
                  @blur="validateField('phone')"
                />
                <span v-if="errors.phone" class="error-message">{{ errors.phone }}</span>
              </div>
      </div>

      <!-- Optional fields -->
      <div class="form-section optional-section">
        <h5>Información Opcional</h5>
        <div class="form-group">
          <label for="age">Edad</label>
          <input
            id="age"
            v-model.number="localProfile.age"
            type="number"
            min="1"
            max="150"
            class="form-input"
            placeholder="Tu edad actual"
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
            <option value="">Seleccionar género</option>
            <option value="male">Masculino</option>
            <option value="female">Femenino</option>
            <option value="other">Otro</option>
            <option value="prefer-not-to-say">Prefiero no decirlo</option>
          </select>
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
const phoneInput = ref(null)

const updateField = (field, value) => {
  localProfile.value[field] = value
  emit('update', field, value)
}

let phoneTimeout = null
const onPhoneInput = (value) => {
  updateField('phone', value)
  clearTimeout(phoneTimeout)
  phoneTimeout = setTimeout(() => validateField('phone'), 200)
}

const validateField = (field) => {
  const newErrors = { ...props.errors }

  switch (field) {
    case 'phone':
      if (localProfile.value.phone && localProfile.value.phone.length > 20) {
        newErrors.phone = 'El teléfono no puede tener más de 20 caracteres'
      } else {
        delete newErrors.phone
      }
      break

    case 'age':
      if (localProfile.value.age && (localProfile.value.age < 1 || localProfile.value.age > 150)) {
        newErrors.age = 'La edad debe estar entre 1 y 150 años'
      } else {
        delete newErrors.age
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
  if (phoneInput.value && typeof phoneInput.value.focus === 'function') phoneInput.value.focus()
  validateField('phone')
  validateField('age')
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
