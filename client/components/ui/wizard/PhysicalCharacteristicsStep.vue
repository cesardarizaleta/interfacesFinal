<template>
  <div class="step-content">
    <div class="form-intro">
      <div class="intro-icon">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
        </svg>
      </div>
      <h4>¿Cómo eres físicamente?</h4>
      <p>Describe tus características físicas y medidas corporales</p>
    </div>

    <div class="form-grid">
      <!-- Measurements -->
      <div class="form-section">
        <h5>Medidas Corporales</h5>
        <div class="form-row">
          <div class="form-group">
            <label for="height">Altura</label>
            <div class="input-with-unit">
              <input
                id="height"
                v-model.number="localProfile.height"
                type="number"
                step="0.01"
                min="0"
                class="form-input"
                placeholder="1.75"
                @input="updateField('height', parseFloat($event.target.value) || null)"
              />
              <span class="unit">m</span>
            </div>
          </div>

          <div class="form-group">
            <label for="weight">Peso</label>
            <div class="input-with-unit">
              <input
                id="weight"
                v-model.number="localProfile.weight"
                type="number"
                step="0.01"
                min="0"
                class="form-input"
                placeholder="70"
                @input="updateField('weight', parseFloat($event.target.value) || null)"
              />
              <span class="unit">kg</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Appearance -->
      <div class="form-section">
        <h5>Apariencia</h5>
        <div class="form-row">
          <div class="form-group">
            <label for="eyeColor">Color de Ojos</label>
            <select
              id="eyeColor"
              v-model="localProfile.eyeColor"
              class="form-input"
              @change="updateField('eyeColor', $event.target.value)"
            >
              <option value="">Seleccionar</option>
              <option value="brown">Marrón</option>
              <option value="blue">Azul</option>
              <option value="green">Verde</option>
              <option value="hazel">Avellana</option>
              <option value="gray">Gris</option>
              <option value="black">Negro</option>
              <option value="other">Otro</option>
            </select>
          </div>

          <div class="form-group">
            <label for="hairColor">Color de Pelo</label>
            <select
              id="hairColor"
              v-model="localProfile.hairColor"
              class="form-input"
              @change="updateField('hairColor', $event.target.value)"
            >
              <option value="">Seleccionar</option>
              <option value="black">Negro</option>
              <option value="brown">Marrón</option>
              <option value="blonde">Rubio</option>
              <option value="red">Rojo</option>
              <option value="gray">Gris</option>
              <option value="white">Blanco</option>
              <option value="other">Otro</option>
            </select>
          </div>
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
            <option value="Bald">Calvo</option>
          </select>
        </div>
      </div>

      <!-- Health -->
      <div class="form-section">
        <h5>Salud</h5>
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
            <option value="unknown">No lo sé</option>
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
}

.input-with-unit {
  display: flex;
  align-items: center;
  position: relative;
}

.input-with-unit .form-input {
  padding-right: 3rem;
}

.unit {
  position: absolute;
  right: 1rem;
  color: var(--color-text-light);
  font-weight: 600;
  font-size: 0.875rem;
  pointer-events: none;
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
