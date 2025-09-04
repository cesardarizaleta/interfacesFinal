<template>
  <div class="step-content">
    <div class="form-grid">
      <div class="form-group">
        <label for="bloodGroup">Grupo Sanguíneo</label>
        <select
          id="bloodGroup"
          v-model="localProfile.bloodGroup"
          class="form-input"
          @change="updateField('bloodGroup', $event.target.value)"
        >
          <option value="">Seleccionar</option>
          <option value="A+">A+</option>
          <option value="A-">A-</option>
          <option value="B+">B+</option>
          <option value="B-">B-</option>
          <option value="AB+">AB+</option>
          <option value="AB-">AB-</option>
          <option value="O+">O+</option>
          <option value="O-">O-</option>
        </select>
      </div>

      <div class="form-group">
        <label for="height">Altura (cm)</label>
        <input
          id="height"
          v-model.number="localProfile.height"
          type="number"
          step="0.01"
          min="0"
          class="form-input"
          @input="updateField('height', parseFloat($event.target.value) || null)"
        />
      </div>

      <div class="form-group">
        <label for="weight">Peso (kg)</label>
        <input
          id="weight"
          v-model.number="localProfile.weight"
          type="number"
          step="0.01"
          min="0"
          class="form-input"
          @input="updateField('weight', parseFloat($event.target.value) || null)"
        />
      </div>

      <div class="form-group">
        <label for="eyeColor">Color de Ojos</label>
        <input
          id="eyeColor"
          v-model="localProfile.eyeColor"
          type="text"
          class="form-input"
          @input="updateField('eyeColor', $event.target.value)"
        />
      </div>

      <div class="form-group">
        <label for="hairColor">Color de Pelo</label>
        <input
          id="hairColor"
          v-model="localProfile.hairColor"
          type="text"
          class="form-input"
          @input="updateField('hairColor', $event.target.value)"
        />
      </div>

      <div class="form-group">
        <label for="hairType">Tipo de Pelo</label>
        <select
          id="hairType"
          v-model="localProfile.hairType"
          class="form-input"
          @change="updateField('hairType', $event.target.value)"
        >
          <option value="">Seleccionar</option>
          <option value="Straight">Liso</option>
          <option value="Wavy">Ondulado</option>
          <option value="Curly">Rizado</option>
          <option value="Coily">Muy Rizado</option>
        </select>
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

@media (max-width: 768px) {
  .form-grid {
    grid-template-columns: 1fr;
  }
}
</style>
