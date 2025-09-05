<template>
  <div class="step-content">
    <div class="form-intro">
      <div class="intro-icon">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
          <circle cx="12" cy="10" r="3"></circle>
        </svg>
      </div>
      <h4>¿Dónde vives?</h4>
      <p>Ingresa tu dirección residencial completa</p>
    </div>

    <div class="form-grid">
      <div class="form-section">
        <h5>Dirección Residencial</h5>

        <div class="form-group full-width">
          <label for="address">
            Dirección <span class="required">*</span>
          </label>
          <input
            id="address"
            v-model="localProfile.address"
            type="text"
            class="form-input required"
            placeholder="Calle, número, colonia/barrio"
            @input="updateField('address', $event.target.value)"
          />
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="city">Ciudad</label>
            <input
              id="city"
              v-model="localProfile.city"
              type="text"
              class="form-input"
              placeholder="Ciudad"
              @input="updateField('city', $event.target.value)"
            />
          </div>

          <div class="form-group">
            <label for="state">Estado/Provincia</label>
            <input
              id="state"
              v-model="localProfile.state"
              type="text"
              class="form-input"
              placeholder="Estado"
              @input="updateField('state', $event.target.value)"
            />
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="stateCode">Código de Estado</label>
            <input
              id="stateCode"
              v-model="localProfile.stateCode"
              type="text"
              class="form-input"
              placeholder="Ej: CA, TX"
              @input="updateField('stateCode', $event.target.value)"
            />
          </div>

          <div class="form-group">
            <label for="postalCode">Código Postal</label>
            <input
              id="postalCode"
              v-model="localProfile.postalCode"
              type="text"
              class="form-input"
              placeholder="Código postal"
              @input="updateField('postalCode', $event.target.value)"
            />
          </div>
        </div>

        <div class="form-group">
          <label for="country">País</label>
          <select
            id="country"
            v-model="localProfile.country"
            class="form-input"
            @change="updateField('country', $event.target.value)"
          >
            <option value="">Seleccionar país</option>
            <option value="MX">México</option>
            <option value="US">Estados Unidos</option>
            <option value="CA">Canadá</option>
            <option value="ES">España</option>
            <option value="AR">Argentina</option>
            <option value="CO">Colombia</option>
            <option value="PE">Perú</option>
            <option value="CL">Chile</option>
            <option value="EC">Ecuador</option>
            <option value="VE">Venezuela</option>
            <option value="UY">Uruguay</option>
            <option value="PY">Paraguay</option>
            <option value="BO">Bolivia</option>
            <option value="other">Otro</option>
          </select>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

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

// Sync with parent profile changes
watch(() => props.profile, (newProfile) => {
  localProfile.value = { ...newProfile }
}, { deep: true })

// This step doesn't have required validations, so we emit empty errors
emit('validate', {})
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

.form-section h5 {
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-text);
  margin: 0 0 1.5rem 0;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid var(--color-primary);
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 1.5rem;
}

.form-group.full-width {
  grid-column: 1 / -1;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1.5rem;
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

@media (max-width: 768px) {
  .form-intro {
    padding: 1rem;
  }

  .form-section {
    padding: 1rem;
  }

  .form-row {
    grid-template-columns: 1fr;
    gap: 0;
  }

  .form-grid {
    gap: 1.5rem;
  }
}
</style>
