<template>
  <div class="tab-content">
    <div class="section-header">
      <div class="section-icon">
        <Icon name="heroicons:map-pin" size="24" />
      </div>
      <div class="section-info">
        <h3 class="section-title">Dirección Residencial</h3>
        <p class="section-description">Tu dirección completa para entregas y verificaciones</p>
      </div>
    </div>

    <div class="form-grid">
      <div class="form-group full-width">
        <div class="input-with-button">
          <label for="address" class="form-label">
            Dirección <span class="required">*</span>
          </label>
          <div class="input-container">
            <input
              id="address"
              v-model="localData.address"
              type="text"
              class="form-input"
              :class="{ error: errors.address }"
              placeholder="Calle, número, apartamento"
              @input="handleInput('address', $event.target.value)"
              @blur="validateField('address')"
            />
            <button @click="openMapModal" class="map-btn" type="button" title="Seleccionar ubicación en mapa">
              <Icon name="heroicons:map-pin" size="16" />
              <span class="map-btn-text">Mapa</span>
            </button>
          </div>
        </div>
        <span v-if="errors.address" class="error-message">{{ errors.address }}</span>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label for="city" class="form-label">
            Ciudad <span class="required">*</span>
          </label>
          <input
            id="city"
            v-model="localData.city"
            type="text"
            class="form-input"
            :class="{ error: errors.city }"
            placeholder="Ciudad"
            @input="handleInput('city', $event.target.value)"
            @blur="validateField('city')"
          />
          <span v-if="errors.city" class="error-message">{{ errors.city }}</span>
        </div>

        <div class="form-group">
          <label for="state" class="form-label">
            Estado/Provincia
          </label>
          <input
            id="state"
            v-model="localData.state"
            type="text"
            class="form-input"
            :class="{ error: errors.state }"
            placeholder="Estado"
            @input="handleInput('state', $event.target.value)"
            @blur="validateField('state')"
          />
          <span v-if="errors.state" class="error-message">{{ errors.state }}</span>
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label for="country" class="form-label">
            País <span class="required">*</span>
          </label>
          <select
            id="country"
            v-model="localData.country"
            class="form-input"
            :class="{ error: errors.country }"
            @change="handleInput('country', $event.target.value)"
            @blur="validateField('country')"
          >
            <option value="">Seleccionar país</option>
            <option value="colombia">Colombia</option>
            <option value="mexico">México</option>
            <option value="argentina">Argentina</option>
            <option value="espana">España</option>
            <option value="otros">Otros</option>
          </select>
          <span v-if="errors.country" class="error-message">{{ errors.country }}</span>
        </div>

        <div class="form-group">
          <label for="postalCode" class="form-label">
            Código Postal
          </label>
          <input
            id="postalCode"
            v-model="localData.postalCode"
            type="text"
            class="form-input"
            :class="{ error: errors.postalCode }"
            placeholder="12345"
            @input="handleInput('postalCode', $event.target.value)"
            @blur="validateField('postalCode')"
          />
          <span v-if="errors.postalCode" class="error-message">{{ errors.postalCode }}</span>
        </div>
      </div>
    </div>

    <!-- Map Modal -->
    <MapModal
      :is-open="showMapModal"
      :initial-location="getInitialLocation()"
      @close="closeMapModal"
      @confirm="handleMapConfirm"
    />
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import MapModal from '../MapModal.vue'

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
  address: '',
  city: '',
  state: '',
  country: '',
  postalCode: ''
})

const localErrors = ref({})
const showMapModal = ref(false)

const handleInput = (field, value) => {
  localData.value[field] = value
  emit('update', field, value)
  validateField(field)
}

const validateField = (field) => {
  const value = localData.value[field]
  let error = ''

  switch (field) {
    case 'address':
      if (!value || value.trim().length < 5) {
        error = 'La dirección debe tener al menos 5 caracteres'
      }
      break
    case 'city':
      if (!value || value.trim().length < 2) {
        error = 'La ciudad debe tener al menos 2 caracteres'
      }
      break
    case 'country':
      if (!value) {
        error = 'El país es requerido'
      }
      break
  }

  localErrors.value[field] = error
  emit('validate', 'address', localErrors.value)
}

const validateAll = () => {
  ['address', 'city', 'state', 'country', 'postalCode'].forEach(field => {
    validateField(field)
  })
}

const openMapModal = () => {
  showMapModal.value = true
}

const closeMapModal = () => {
  showMapModal.value = false
}

const getInitialLocation = () => {
  // Try to get coordinates from current address or use default
  // For now, return default location (Bogotá, Colombia)
  return { lat: 4.6097, lng: -74.0817 }
}

const handleMapConfirm = (data) => {
  const { location, address, parsedAddress } = data

  // Update address field with the formatted address
  if (address) {
    handleInput('address', address)
  }

  // Fill individual fields using parsed address components
  if (parsedAddress) {
    // Fill city (second part of display name, usually the city)
    if (parsedAddress.locality && !localData.value.city) {
      handleInput('city', parsedAddress.locality)
    }

    // Fill state/province (third part, usually the state/province)
    if (parsedAddress.administrative_area_level_1 && !localData.value.state) {
      handleInput('state', parsedAddress.administrative_area_level_1)
    }

    // Fill country (last part, usually the country)
    if (parsedAddress.country && !localData.value.country) {
      // Map to our select options
      const countryMap = {
        'Colombia': 'colombia',
        'México': 'mexico',
        'Argentina': 'argentina',
        'España': 'espana'
      }
      const mappedCountry = countryMap[parsedAddress.country] || 'otros'
      handleInput('country', mappedCountry)
    }

    // Fill postal code if available
    if (parsedAddress.postal_code && !localData.value.postalCode) {
      handleInput('postalCode', parsedAddress.postal_code)
    }
  }

  closeMapModal()
}

onMounted(() => {
  localData.value = {
    address: props.profile.address || '',
    city: props.profile.city || '',
    state: props.profile.state || '',
    country: props.profile.country || '',
    postalCode: props.profile.postalCode || ''
  }
  validateAll()
})

watch(() => props.profile, (newProfile) => {
  localData.value = {
    address: newProfile.address || '',
    city: newProfile.city || '',
    state: newProfile.state || '',
    country: newProfile.country || '',
    postalCode: newProfile.postalCode || ''
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
  border-bottom: 1px solid rgba(139, 69, 19, 0.1);
}

.section-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  border-radius: 0.75rem;
  background: linear-gradient(135deg, #8B4513 0%, #DAA520 100%);
  color: #FFFFFF;
}

.section-info {
  flex: 1;
}

.section-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #8B4513;
  margin: 0 0 0.25rem 0;
  font-family: 'Playfair Display', serif;
}

.section-description {
  font-size: 0.875rem;
  color: #8B7355;
  margin: 0;
  font-family: 'Inter', sans-serif;
}

.form-grid {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group.full-width {
  width: 100%;
}

.form-label {
  font-size: 0.875rem;
  font-weight: 600;
  color: #2F1B14;
  font-family: 'Inter', sans-serif;
}

.required {
  color: #dc2626;
}

.form-input {
  padding: 0.75rem 1rem;
  border: 1px solid rgba(139, 69, 19, 0.2);
  border-radius: 0.5rem;
  background: #FFFFFF;
  color: #2F1B14;
  font-size: 0.875rem;
  font-family: 'Inter', sans-serif;
  transition: all 0.2s ease;
}

.form-input:focus {
  outline: none;
  border-color: #8B4513;
  box-shadow: 0 0 0 3px rgba(139, 69, 19, 0.1);
}

.form-input.error {
  border-color: #dc2626;
  box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);
}

.form-input::placeholder {
  color: #8B7355;
}

.error-message {
  font-size: 0.75rem;
  color: #dc2626;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
}

.input-with-button {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.input-container {
  display: flex;
  gap: 0.5rem;
  align-items: stretch;
}

.form-input {
  flex: 1;
}

.map-btn {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.75rem 1rem;
  background: linear-gradient(135deg, #8B4513 0%, #DAA520 100%);
  color: white;
  border: 1px solid #8B4513;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.map-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(139, 69, 19, 0.3);
}

.map-btn-text {
  display: none;
}

@media (min-width: 640px) {
  .map-btn-text {
    display: inline;
  }
}

@media (max-width: 768px) {
  .form-row {
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

  .input-container {
    flex-direction: column;
  }

  .map-btn {
    justify-content: center;
  }
}
</style>
