<template>
  <div v-if="isOpen" class="modal-overlay" @click="closeModal">
    <div class="modal-content" @click.stop>
      <div class="modal-header">
        <h3>Seleccionar Ubicación</h3>
        <button @click="closeModal" class="close-btn">
          <Icon name="heroicons:x-mark" size="24" />
        </button>
      </div>

      <div class="modal-body">
        <div class="instructions">
          <Icon name="heroicons:map-pin" size="20" />
          <span>Haz clic en el mapa para seleccionar tu ubicación</span>
        </div>

        <div ref="mapContainer" class="map-container"></div>

        <div v-if="selectedLocation" class="location-info">
          <h4>Ubicación Seleccionada:</h4>
          <p><strong>Latitud:</strong> {{ selectedLocation.lat.toFixed(6) }}</p>
          <p><strong>Longitud:</strong> {{ selectedLocation.lng.toFixed(6) }}</p>
          <p v-if="addressInfo"><strong>Dirección:</strong> {{ addressInfo }}</p>
          <p v-if="isLoadingAddress" class="loading-text">Obteniendo dirección...</p>
        </div>
      </div>

      <div class="modal-footer">
        <button @click="closeModal" class="btn btn-secondary">Cancelar</button>
        <button @click="confirmLocation" :disabled="!selectedLocation || isLoadingAddress" class="btn btn-primary">
          <Icon v-if="isLoadingAddress" name="heroicons:arrow-path" size="16" class="spinning" />
          {{ isLoadingAddress ? 'Cargando...' : 'Confirmar Ubicación' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  initialLocation: {
    type: Object,
    default: () => ({ lat: 4.6097, lng: -74.0817 }) // Bogotá, Colombia as default
  }
})

const emit = defineEmits(['close', 'confirm'])

const mapContainer = ref(null)
const map = ref(null)
const marker = ref(null)
const selectedLocation = ref(null)
const addressInfo = ref('')
const isLoadingAddress = ref(false)

const closeModal = () => {
  emit('close')
}

const confirmLocation = async () => {
  if (selectedLocation.value) {
    emit('confirm', {
      location: selectedLocation.value,
      address: addressInfo.value,
      parsedAddress: parseAddressFromDisplayName(addressInfo.value)
    })
    closeModal()
  }
}

const initMap = () => {
  if (!window.L || !mapContainer.value) return

  // Initialize map
  map.value = window.L.map(mapContainer.value).setView([props.initialLocation.lat, props.initialLocation.lng], 12)

  // Add OpenStreetMap tiles
  window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',
    maxZoom: 19
  }).addTo(map.value)

  // Add click listener
  map.value.on('click', async (event) => {
    const latLng = {
      lat: event.latlng.lat,
      lng: event.latlng.lng
    }

    placeMarker(latLng)
    selectedLocation.value = latLng

    // Get address info
    isLoadingAddress.value = true
    await reverseGeocode(latLng)
    isLoadingAddress.value = false
  })

  // Place initial marker if location provided
  if (props.initialLocation) {
    placeMarker(props.initialLocation)
    selectedLocation.value = props.initialLocation
    reverseGeocode(props.initialLocation)
  }
}

const placeMarker = (location) => {
  if (marker.value) {
    map.value.removeLayer(marker.value)
  }

  marker.value = window.L.marker([location.lat, location.lng], {
    draggable: true
  }).addTo(map.value)

  // Add drag listener
  marker.value.on('dragend', async (event) => {
    const latLng = {
      lat: event.target.getLatLng().lat,
      lng: event.target.getLatLng().lng
    }
    selectedLocation.value = latLng

    // Get address info
    isLoadingAddress.value = true
    await reverseGeocode(latLng)
    isLoadingAddress.value = false
  })
}

const reverseGeocode = async (location) => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${location.lat}&lon=${location.lng}&addressdetails=1`,
      {
        headers: {
          'User-Agent': 'LandinPhotography/1.0'
        }
      }
    )

    if (response.ok) {
      const data = await response.json()
      if (data && data.display_name) {
        addressInfo.value = data.display_name
      } else {
        addressInfo.value = 'Dirección no encontrada'
      }
    } else {
      addressInfo.value = 'Error al obtener dirección'
    }
  } catch (error) {
    console.error('Reverse geocoding error:', error)
    addressInfo.value = 'Error de conexión'
  }
}

const parseAddressFromDisplayName = (displayName) => {
  if (!displayName) return {}

  // Parse display name from Nominatim
  // Format is typically: "Street, City, State, Country"
  const parts = displayName.split(', ')

  return {
    street_number: '',
    route: parts[0] || '',
    locality: parts[1] || '',
    administrative_area_level_1: parts[2] || '',
    country: parts[parts.length - 1] || '',
    postal_code: ''
  }
}

watch(() => props.isOpen, (isOpen) => {
  if (isOpen) {
    // Wait for DOM update and Leaflet to load
    setTimeout(() => {
      initMap()
    }, 200)
  } else {
    // Clean up when closing
    if (map.value) {
      map.value.remove()
      map.value = null
      marker.value = null
    }
  }
})

onMounted(() => {
  if (props.isOpen) {
    setTimeout(() => {
      initMap()
    }, 200)
  }
})

onUnmounted(() => {
  if (map.value) {
    map.value.remove()
  }
})
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
}

.modal-content {
  background: white;
  border-radius: 0.75rem;
  width: 100%;
  max-width: 800px;
  height: 90vh;
  max-height: 600px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid #e5e7eb;
}

.modal-header h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
}

.close-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border-radius: 0.375rem;
  background: #f3f4f6;
  border: none;
  color: #6b7280;
  cursor: pointer;
  transition: all 0.2s;
}

.close-btn:hover {
  background: #e5e7eb;
  color: #374151;
}

.modal-body {
  padding: 1.5rem;
  flex: 1;
  overflow-y: auto;
  min-height: 0;
}

.instructions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  background: #f0f9ff;
  border: 1px solid #bae6fd;
  border-radius: 0.5rem;
  color: #0369a1;
  font-size: 0.875rem;
  margin-bottom: 1rem;
}

.map-container {
  width: 100%;
  height: 300px;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  overflow: hidden;
  flex-shrink: 0;
}

.location-info {
  margin-top: 1rem;
  padding: 1rem;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
}

.location-info h4 {
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
  margin: 0 0 0.5rem 0;
}

.location-info p {
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0.25rem 0;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  padding: 1.5rem;
  border-top: 1px solid #e5e7eb;
  flex-shrink: 0;
  background: white;
  border-radius: 0 0 0.75rem 0.75rem;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid transparent;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-secondary {
  background: #f3f4f6;
  color: #374151;
  border-color: #d1d5db;
}

.btn-secondary:hover:not(:disabled) {
  background: #e5e7eb;
}

.btn-primary {
  background: #8b4513;
  color: white;
  border-color: #8b4513;
}

.btn-primary:hover:not(:disabled) {
  background: #5d2a0c;
}

.spinning {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@media (max-width: 768px) {
  .modal-overlay {
    padding: 0.5rem;
  }

  .modal-content {
    max-width: 95vw;
    height: 95vh;
    max-height: 500px;
  }

  .map-container {
    height: 250px;
  }

  .modal-body {
    padding: 1rem;
  }

  .modal-footer {
    padding: 1rem;
    flex-direction: column;
  }

  .btn {
    width: 100%;
    justify-content: center;
  }
}
</style>