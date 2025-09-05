<template>
  <div class="step-content">
    <div class="form-intro">
      <div class="intro-icon">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
          <path d="M12 17h.01"></path>
        </svg>
      </div>
      <h4>Información Adicional</h4>
      <p>Completa estos datos opcionales para tener un perfil más completo</p>
    </div>

    <div class="form-grid">
      <!-- Academic Information -->
      <div class="form-section">
        <h5>Información Académica</h5>
        <div class="form-group">
          <label for="university">Universidad</label>
          <input
            id="university"
            v-model="localProfile.university"
            type="text"
            class="form-input"
            placeholder="Nombre de tu universidad"
            @input="updateField('university', $event.target.value)"
          />
        </div>
      </div>

      <!-- Technical Information -->
      <div class="form-section">
        <h5>Información Técnica</h5>
        <div class="form-row">
          <div class="form-group">
            <label for="ip">Dirección IP</label>
            <input
              id="ip"
              v-model="localProfile.ip"
              type="text"
              class="form-input"
              placeholder="192.168.1.1"
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
              placeholder="00:1B:44:11:3A:B7"
              @input="updateField('macAddress', $event.target.value)"
            />
          </div>
        </div>
      </div>

      <!-- Financial Information -->
      <div class="form-section">
        <h5>Información Financiera</h5>
        <div class="form-row">
          <div class="form-group">
            <label for="cardNumber">Número de Tarjeta</label>
            <input
              id="cardNumber"
              v-model="localProfile.cardNumber"
              type="text"
              class="form-input"
              placeholder="**** **** **** ****"
              @input="updateField('cardNumber', $event.target.value)"
            />
          </div>

          <div class="form-group">
            <label for="cardExpire">Vencimiento</label>
            <input
              id="cardExpire"
              v-model="localProfile.cardExpire"
              type="text"
              class="form-input"
              placeholder="MM/YY"
              @input="updateField('cardExpire', $event.target.value)"
            />
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="cardType">Tipo de Tarjeta</label>
            <select
              id="cardType"
              v-model="localProfile.cardType"
              class="form-input"
              @change="updateField('cardType', $event.target.value)"
            >
              <option value="">Seleccionar</option>
              <option value="visa">Visa</option>
              <option value="mastercard">Mastercard</option>
              <option value="amex">American Express</option>
              <option value="discover">Discover</option>
              <option value="other">Otro</option>
            </select>
          </div>

          <div class="form-group">
            <label for="currency">Moneda</label>
            <select
              id="currency"
              v-model="localProfile.currency"
              class="form-input"
              @change="updateField('currency', $event.target.value)"
            >
              <option value="">Seleccionar</option>
              <option value="USD">USD - Dólar estadounidense</option>
              <option value="EUR">EUR - Euro</option>
              <option value="MXN">MXN - Peso mexicano</option>
              <option value="CAD">CAD - Dólar canadiense</option>
              <option value="GBP">GBP - Libra esterlina</option>
              <option value="other">Otra</option>
            </select>
          </div>
        </div>

        <div class="form-group">
          <label for="iban">IBAN</label>
          <input
            id="iban"
            v-model="localProfile.iban"
            type="text"
            class="form-input"
            placeholder="Código IBAN internacional"
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
