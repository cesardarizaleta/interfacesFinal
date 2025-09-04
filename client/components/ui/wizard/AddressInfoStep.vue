<template>
  <div class="step-content">
    <div class="form-section">
      <h4>Dirección</h4>
      <div class="form-grid">
        <div class="form-group full-width">
          <label for="address">Dirección</label>
          <input
            id="address"
            v-model="localProfile.address"
            type="text"
            class="form-input"
            @input="updateField('address', $event.target.value)"
          />
        </div>

        <div class="form-group">
          <label for="city">Ciudad</label>
          <input
            id="city"
            v-model="localProfile.city"
            type="text"
            class="form-input"
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
            @input="updateField('state', $event.target.value)"
          />
        </div>

        <div class="form-group">
          <label for="stateCode">Código de Estado</label>
          <input
            id="stateCode"
            v-model="localProfile.stateCode"
            type="text"
            class="form-input"
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
            @input="updateField('postalCode', $event.target.value)"
          />
        </div>

        <div class="form-group">
          <label for="country">País</label>
          <input
            id="country"
            v-model="localProfile.country"
            type="text"
            class="form-input"
            @input="updateField('country', $event.target.value)"
          />
        </div>
      </div>
    </div>

    <div class="form-section">
      <h4>Información Adicional</h4>
      <div class="form-grid">
        <div class="form-group">
          <label for="university">Universidad</label>
          <input
            id="university"
            v-model="localProfile.university"
            type="text"
            class="form-input"
            @input="updateField('university', $event.target.value)"
          />
        </div>

        <div class="form-group">
          <label for="ip">Dirección IP</label>
          <input
            id="ip"
            v-model="localProfile.ip"
            type="text"
            class="form-input"
            @input="updateField('ip', $event.target.value)"
          />
        </div>

        <div class="form-group">
          <label for="macAddress">Dirección MAC</label>
          <input
            id="macAddress"
            v-model="localProfile.macAddress"
            type="text"
            class="form-input"
            @input="updateField('macAddress', $event.target.value)"
          />
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

.form-section {
  margin-bottom: 2rem;
}

.form-section h4 {
  font-size: 1.1rem;
  color: var(--color-text);
  margin: 0 0 1.5rem 0;
  font-weight: 600;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid var(--color-primary);
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

.form-group.full-width {
  grid-column: 1 / -1;
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

@media (max-width: 768px) {
  .form-grid {
    grid-template-columns: 1fr;
  }
}
</style>
