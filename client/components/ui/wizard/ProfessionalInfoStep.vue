<template>
  <div class="step-content">
    <div class="form-section">
      <h4>Información Profesional</h4>
      <div class="form-grid">
        <div class="form-group">
          <label for="department">Departamento</label>
          <input
            id="department"
            v-model="localProfile.department"
            type="text"
            class="form-input"
            @input="updateField('department', $event.target.value)"
          />
        </div>

        <div class="form-group">
          <label for="companyName">Nombre de Empresa</label>
          <input
            id="companyName"
            v-model="localProfile.companyName"
            type="text"
            class="form-input"
            @input="updateField('companyName', $event.target.value)"
          />
        </div>

        <div class="form-group">
          <label for="title">Título/Cargo</label>
          <input
            id="title"
            v-model="localProfile.title"
            type="text"
            class="form-input"
            @input="updateField('title', $event.target.value)"
          />
        </div>
      </div>
    </div>

    <div class="form-section">
      <h4>Dirección de Empresa</h4>
      <div class="form-grid">
        <div class="form-group full-width">
          <label for="companyAddress">Dirección de Empresa</label>
          <input
            id="companyAddress"
            v-model="localProfile.companyAddress"
            type="text"
            class="form-input"
            @input="updateField('companyAddress', $event.target.value)"
          />
        </div>

        <div class="form-group">
          <label for="companyCity">Ciudad</label>
          <input
            id="companyCity"
            v-model="localProfile.companyCity"
            type="text"
            class="form-input"
            @input="updateField('companyCity', $event.target.value)"
          />
        </div>

        <div class="form-group">
          <label for="companyState">Estado</label>
          <input
            id="companyState"
            v-model="localProfile.companyState"
            type="text"
            class="form-input"
            @input="updateField('companyState', $event.target.value)"
          />
        </div>

        <div class="form-group">
          <label for="companyStateCode">Código de Estado</label>
          <input
            id="companyStateCode"
            v-model="localProfile.companyStateCode"
            type="text"
            class="form-input"
            @input="updateField('companyStateCode', $event.target.value)"
          />
        </div>

        <div class="form-group">
          <label for="companyPostalCode">Código Postal</label>
          <input
            id="companyPostalCode"
            v-model="localProfile.companyPostalCode"
            type="text"
            class="form-input"
            @input="updateField('companyPostalCode', $event.target.value)"
          />
        </div>

        <div class="form-group">
          <label for="companyCountry">País</label>
          <input
            id="companyCountry"
            v-model="localProfile.companyCountry"
            type="text"
            class="form-input"
            @input="updateField('companyCountry', $event.target.value)"
          />
        </div>
      </div>
    </div>

    <div class="form-section">
      <h4>Información Financiera</h4>
      <div class="form-grid">
        <div class="form-group">
          <label for="cardExpire">Vencimiento de Tarjeta</label>
          <input
            id="cardExpire"
            v-model="localProfile.cardExpire"
            type="text"
            placeholder="MM/YY"
            class="form-input"
            @input="updateField('cardExpire', $event.target.value)"
          />
        </div>

        <div class="form-group">
          <label for="cardNumber">Número de Tarjeta</label>
          <input
            id="cardNumber"
            v-model="localProfile.cardNumber"
            type="text"
            class="form-input"
            @input="updateField('cardNumber', $event.target.value)"
          />
        </div>

        <div class="form-group">
          <label for="cardType">Tipo de Tarjeta</label>
          <input
            id="cardType"
            v-model="localProfile.cardType"
            type="text"
            class="form-input"
            @input="updateField('cardType', $event.target.value)"
          />
        </div>

        <div class="form-group">
          <label for="currency">Moneda</label>
          <input
            id="currency"
            v-model="localProfile.currency"
            type="text"
            placeholder="USD"
            class="form-input"
            @input="updateField('currency', $event.target.value)"
          />
        </div>

        <div class="form-group">
          <label for="iban">IBAN</label>
          <input
            id="iban"
            v-model="localProfile.iban"
            type="text"
            class="form-input"
            @input="updateField('iban', $event.target.value)"
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
