<template>
  <div class="tab-content">
    <div class="section-header">
      <div class="section-icon">
        <Icon name="heroicons:shield-check" size="24" />
      </div>
      <div class="section-info">
        <h3 class="section-title">Seguridad de la Cuenta</h3>
        <p class="section-description">Configura la seguridad de tu cuenta</p>
      </div>
    </div>

    <div class="security-grid">
      <div class="security-card">
        <div class="card-header">
          <Icon name="heroicons:key" size="20" />
          <h4>Cambiar Contraseña</h4>
        </div>
        <div class="card-content">
          <div class="form-group">
            <label for="currentPassword" class="form-label">Contraseña Actual</label>
            <input
              id="currentPassword"
              v-model="localData.currentPassword"
              type="password"
              class="form-input"
              placeholder="Ingresa tu contraseña actual"
            />
          </div>
          <div class="form-group">
            <label for="newPassword" class="form-label">Nueva Contraseña</label>
            <input
              id="newPassword"
              v-model="localData.newPassword"
              type="password"
              class="form-input"
              :class="{ error: errors.newPassword }"
              placeholder="Mínimo 8 caracteres"
              @input="validatePassword"
            />
            <span v-if="errors.newPassword" class="error-message">{{ errors.newPassword }}</span>
          </div>
          <div class="form-group">
            <label for="confirmPassword" class="form-label">Confirmar Contraseña</label>
            <input
              id="confirmPassword"
              v-model="localData.confirmPassword"
              type="password"
              class="form-input"
              :class="{ error: errors.confirmPassword }"
              placeholder="Repite la nueva contraseña"
              @input="validatePassword"
            />
            <span v-if="errors.confirmPassword" class="error-message">{{ errors.confirmPassword }}</span>
          </div>
          <button @click="changePassword" class="btn-primary" :disabled="!canChangePassword">
            Cambiar Contraseña
          </button>
        </div>
      </div>

      <div class="security-card">
        <div class="card-header">
          <Icon name="heroicons:device-phone-mobile" size="20" />
          <h4>Autenticación de Dos Factores</h4>
        </div>
        <div class="card-content">
          <div class="security-status">
            <div class="status-indicator" :class="{ active: twoFactorEnabled }">
              <Icon :name="twoFactorEnabled ? 'heroicons:check' : 'heroicons:x-mark'" size="16" />
            </div>
            <div class="status-info">
              <h5>{{ twoFactorEnabled ? 'Activado' : 'Desactivado' }}</h5>
              <p>{{ twoFactorEnabled ? 'Tu cuenta está protegida con 2FA' : 'Activa 2FA para mayor seguridad' }}</p>
            </div>
          </div>
          <button @click="toggleTwoFactor" class="btn-secondary">
            {{ twoFactorEnabled ? 'Desactivar' : 'Activar' }} 2FA
          </button>
        </div>
      </div>

      <div class="security-card danger">
        <div class="card-header">
          <Icon name="heroicons:exclamation-triangle" size="20" />
          <h4>Zona de Peligro</h4>
        </div>
        <div class="card-content">
          <p class="danger-text">Estas acciones no se pueden deshacer</p>
          <button @click="deleteAccount" class="btn-danger">
            Eliminar Cuenta
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'

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
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})

const localErrors = ref({})
const twoFactorEnabled = ref(false)

const canChangePassword = computed(() => {
  return localData.value.currentPassword &&
         localData.value.newPassword &&
         localData.value.confirmPassword &&
         !localErrors.value.newPassword &&
         !localErrors.value.confirmPassword
})

const validatePassword = () => {
  const { newPassword, confirmPassword } = localData.value
  localErrors.value = {}

  if (newPassword && newPassword.length < 8) {
    localErrors.value.newPassword = 'La contraseña debe tener al menos 8 caracteres'
  }

  if (newPassword && confirmPassword && newPassword !== confirmPassword) {
    localErrors.value.confirmPassword = 'Las contraseñas no coinciden'
  }

  emit('validate', 'security', localErrors.value)
}

const changePassword = () => {
  if (!canChangePassword.value) return
  // Implementar cambio de contraseña
  console.log('Changing password...')
}

const toggleTwoFactor = () => {
  twoFactorEnabled.value = !twoFactorEnabled.value
  // Implementar toggle 2FA
}

const deleteAccount = () => {
  if (confirm('¿Estás seguro de que quieres eliminar tu cuenta? Esta acción no se puede deshacer.')) {
    // Implementar eliminación de cuenta
    console.log('Deleting account...')
  }
}

onMounted(() => {
  // Initialize with profile data
  twoFactorEnabled.value = props.profile.twoFactorEnabled || false
})

watch(() => props.profile, (newProfile) => {
  twoFactorEnabled.value = newProfile.twoFactorEnabled || false
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

.security-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}

.security-card {
  background: #FFFFFF;
  border: 1px solid rgba(139, 69, 19, 0.1);
  border-radius: 0.75rem;
  overflow: hidden;
  transition: all 0.2s ease;
}

.security-card:hover {
  box-shadow: 0 4px 12px rgba(139, 69, 19, 0.1);
}

.security-card.danger {
  border-color: rgba(220, 38, 38, 0.2);
}

.card-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1.25rem 1.5rem;
  background: rgba(139, 69, 19, 0.02);
  border-bottom: 1px solid rgba(139, 69, 19, 0.08);
}

.card-header h4 {
  font-size: 1rem;
  font-weight: 700;
  color: #2F1B14;
  margin: 0;
  font-family: 'Inter', sans-serif;
}

.card-content {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-label {
  font-size: 0.875rem;
  font-weight: 600;
  color: #2F1B14;
  font-family: 'Inter', sans-serif;
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

.error-message {
  font-size: 0.75rem;
  color: #dc2626;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
}

.security-status {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: rgba(139, 69, 19, 0.02);
  border-radius: 0.5rem;
}

.status-indicator {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background: rgba(220, 38, 38, 0.1);
  color: #dc2626;
  transition: all 0.2s ease;
}

.status-indicator.active {
  background: rgba(34, 197, 94, 0.1);
  color: #16a34a;
}

.status-info h5 {
  font-size: 0.875rem;
  font-weight: 700;
  color: #2F1B14;
  margin: 0 0 0.25rem 0;
  font-family: 'Inter', sans-serif;
}

.status-info p {
  font-size: 0.8125rem;
  color: #8B7355;
  margin: 0;
  font-family: 'Inter', sans-serif;
}

.btn-primary, .btn-secondary, .btn-danger {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 600;
  font-family: 'Inter', sans-serif;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid transparent;
}

.btn-primary {
  background: #8B4513;
  color: #FFFFFF;
  border-color: #8B4513;
}

.btn-primary:hover:not(:disabled) {
  background: #5D2A0C;
  border-color: #5D2A0C;
  transform: translateY(-1px);
}

.btn-primary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-secondary {
  background: #F3F4F6;
  color: #6B7280;
  border-color: #D1D5DB;
}

.btn-secondary:hover {
  background: #E5E7EB;
  border-color: #9CA3AF;
}

.btn-danger {
  background: #dc2626;
  color: #FFFFFF;
  border-color: #dc2626;
}

.btn-danger:hover {
  background: #b91c1c;
  border-color: #b91c1c;
}

.danger-text {
  font-size: 0.8125rem;
  color: #dc2626;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  margin: 0 0 1rem 0;
}

@media (max-width: 768px) {
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

  .card-header {
    padding: 1rem;
  }

  .card-content {
    padding: 1rem;
  }

  .security-status {
    padding: 0.75rem;
  }
}
</style>
