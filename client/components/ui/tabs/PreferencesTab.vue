<template>
  <div class="tab-content">
    <div class="section-header">
      <div class="section-icon">
        <Icon name="heroicons:cog-6-tooth" size="24" />
      </div>
      <div class="section-info">
        <h3 class="section-title">Preferencias de Usuario</h3>
        <p class="section-description">Personaliza tu experiencia en la plataforma</p>
      </div>
    </div>

    <div class="preferences-grid">
      <div class="preference-card">
        <div class="card-header">
          <Icon name="heroicons:language" size="20" />
          <h4>Idioma y Región</h4>
        </div>
        <div class="card-content">
          <div class="form-group">
            <label for="language" class="form-label">Idioma</label>
            <select
              id="language"
              v-model="localData.language"
              class="form-select"
            >
              <option value="es">Español</option>
              <option value="en">English</option>
              <option value="fr">Français</option>
              <option value="de">Deutsch</option>
            </select>
          </div>
          <div class="form-group">
            <label for="timezone" class="form-label">Zona Horaria</label>
            <select
              id="timezone"
              v-model="localData.timezone"
              class="form-select"
            >
              <option value="America/Mexico_City">México (GMT-6)</option>
              <option value="America/New_York">Nueva York (GMT-5)</option>
              <option value="Europe/Madrid">Madrid (GMT+1)</option>
              <option value="Europe/London">Londres (GMT+0)</option>
            </select>
          </div>
        </div>
      </div>

      <div class="preference-card">
        <div class="card-header">
          <Icon name="heroicons:bell-alert" size="20" />
          <h4>Notificaciones</h4>
        </div>
        <div class="card-content">
          <div class="toggle-group">
            <div class="toggle-item">
              <div class="toggle-info">
                <h5>Notificaciones por Email</h5>
                <p>Recibe actualizaciones por correo electrónico</p>
              </div>
              <label class="toggle-switch">
                <input
                  type="checkbox"
                  v-model="localData.emailNotifications"
                />
                <span class="toggle-slider"></span>
              </label>
            </div>
            <div class="toggle-item">
              <div class="toggle-info">
                <h5>Notificaciones Push</h5>
                <p>Recibe notificaciones en el navegador</p>
              </div>
              <label class="toggle-switch">
                <input
                  type="checkbox"
                  v-model="localData.pushNotifications"
                />
                <span class="toggle-slider"></span>
              </label>
            </div>
            <div class="toggle-item">
              <div class="toggle-info">
                <h5>Notificaciones de Marketing</h5>
                <p>Recibe ofertas y promociones especiales</p>
              </div>
              <label class="toggle-switch">
                <input
                  type="checkbox"
                  v-model="localData.marketingNotifications"
                />
                <span class="toggle-slider"></span>
              </label>
            </div>
          </div>
        </div>
      </div>

      <div class="preference-card">
        <div class="card-header">
          <Icon name="heroicons:eye" size="20" />
          <h4>Privacidad</h4>
        </div>
        <div class="card-content">
          <div class="toggle-group">
            <div class="toggle-item">
              <div class="toggle-info">
                <h5>Perfil Público</h5>
                <p>Permitir que otros usuarios vean tu perfil</p>
              </div>
              <label class="toggle-switch">
                <input
                  type="checkbox"
                  v-model="localData.publicProfile"
                />
                <span class="toggle-slider"></span>
              </label>
            </div>
            <div class="toggle-item">
              <div class="toggle-info">
                <h5>Mostrar Actividad</h5>
                <p>Mostrar tu actividad reciente en el perfil</p>
              </div>
              <label class="toggle-switch">
                <input
                  type="checkbox"
                  v-model="localData.showActivity"
                />
                <span class="toggle-slider"></span>
              </label>
            </div>
            <div class="toggle-item">
              <div class="toggle-info">
                <h5>Datos Analíticos</h5>
                <p>Permitir el uso de datos para mejorar el servicio</p>
              </div>
              <label class="toggle-switch">
                <input
                  type="checkbox"
                  v-model="localData.analyticsData"
                />
                <span class="toggle-slider"></span>
              </label>
            </div>
          </div>
        </div>
      </div>

      <div class="preference-card">
        <div class="card-header">
          <Icon name="heroicons:swatch" size="20" />
          <h4>Apariencia</h4>
        </div>
        <div class="card-content">
          <div class="form-group">
            <label for="theme" class="form-label">Tema</label>
            <select
              id="theme"
              v-model="localData.theme"
              class="form-select"
            >
              <option value="light">Claro</option>
              <option value="dark">Oscuro</option>
              <option value="auto">Automático</option>
            </select>
          </div>
          <div class="form-group">
            <label for="fontSize" class="form-label">Tamaño de Fuente</label>
            <select
              id="fontSize"
              v-model="localData.fontSize"
              class="form-select"
            >
              <option value="small">Pequeño</option>
              <option value="medium">Mediano</option>
              <option value="large">Grande</option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <div class="actions-section">
      <button @click="savePreferences" class="btn-primary">
        Guardar Preferencias
      </button>
      <button @click="resetPreferences" class="btn-secondary">
        Restablecer Valores
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'

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
  language: 'es',
  timezone: 'America/Mexico_City',
  emailNotifications: true,
  pushNotifications: true,
  marketingNotifications: false,
  publicProfile: true,
  showActivity: true,
  analyticsData: true,
  theme: 'light',
  fontSize: 'medium'
})

const savePreferences = () => {
  emit('update', 'preferences', localData.value)
  // Implementar guardado de preferencias
  console.log('Saving preferences...', localData.value)
}

const resetPreferences = () => {
  if (confirm('¿Estás seguro de que quieres restablecer todas las preferencias?')) {
    localData.value = {
      language: 'es',
      timezone: 'America/Mexico_City',
      emailNotifications: true,
      pushNotifications: true,
      marketingNotifications: false,
      publicProfile: true,
      showActivity: true,
      analyticsData: true,
      theme: 'light',
      fontSize: 'medium'
    }
  }
}

onMounted(() => {
  // Initialize with profile data
  if (props.profile.preferences) {
    Object.assign(localData.value, props.profile.preferences)
  }
})

watch(() => props.profile, (newProfile) => {
  if (newProfile.preferences) {
    Object.assign(localData.value, newProfile.preferences)
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
  border-bottom: 1px solid var(--color-accent);
}

.section-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  border-radius: 0.75rem;
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%);
  color: var(--color-text-light);
}

.section-info {
  flex: 1;
}

.section-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--color-primary);
  margin: 0 0 0.25rem 0;
  font-family: 'Playfair Display', serif;
}

.section-description {
  font-size: 0.875rem;
  color: var(--color-text);
  margin: 0;
  font-family: 'Inter', sans-serif;
}

.preferences-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.preference-card {
  background: var(--color-secondary);
  border: 1px solid var(--color-accent);
  border-radius: 0.75rem;
  overflow: hidden;
  transition: all 0.2s ease;
}

.preference-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.card-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1.25rem 1.5rem;
  background: rgba(0, 0, 0, 0.02);
  border-bottom: 1px solid var(--color-accent);
}

.card-header h4 {
  font-size: 1rem;
  font-weight: 700;
  color: var(--color-text);
  margin: 0;
  font-family: 'Inter', sans-serif;
}

.card-content {
  padding: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.form-group:last-child {
  margin-bottom: 0;
}

.form-label {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-text);
  font-family: 'Inter', sans-serif;
}

.form-select {
  padding: 0.75rem 1rem;
  border: 1px solid var(--color-accent);
  border-radius: 0.5rem;
  background: var(--color-secondary);
  color: var(--color-text);
  font-size: 0.875rem;
  font-family: 'Inter', sans-serif;
  transition: all 0.2s ease;
  cursor: pointer;
}

.form-select:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.1);
}

.toggle-group {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.toggle-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem;
  background: rgba(139, 69, 19, 0.02);
  border-radius: 0.5rem;
}

.toggle-info h5 {
  font-size: 0.875rem;
  font-weight: 700;
  color: #2F1B14;
  margin: 0 0 0.25rem 0;
  font-family: 'Inter', sans-serif;
}

.toggle-info p {
  font-size: 0.8125rem;
  color: #8B7355;
  margin: 0;
  font-family: 'Inter', sans-serif;
}

.toggle-switch {
  position: relative;
  display: inline-block;
  width: 3rem;
  height: 1.5rem;
  cursor: pointer;
}

.toggle-switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.toggle-slider {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #ccc;
  border-radius: 1.5rem;
  transition: 0.3s;
}

.toggle-slider:before {
  position: absolute;
  content: "";
  height: 1.125rem;
  width: 1.125rem;
  left: 0.1875rem;
  bottom: 0.1875rem;
  background: white;
  border-radius: 50%;
  transition: 0.3s;
}

input:checked + .toggle-slider {
  background: var(--color-primary);
}

input:checked + .toggle-slider:before {
  transform: translateX(1.5rem);
}

.actions-section {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  padding-top: 2rem;
  border-top: 1px solid rgba(139, 69, 19, 0.1);
}

.btn-primary, .btn-secondary {
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
  background: var(--color-primary);
  color: var(--color-text-light);
  border-color: var(--color-primary);
}

.btn-primary:hover {
  background: var(--color-accent);
  border-color: var(--color-accent);
  transform: translateY(-1px);
}

.btn-secondary {
  background: var(--color-secondary);
  color: var(--color-text);
  border-color: var(--color-accent);
}

.btn-secondary:hover {
  background: var(--background-neutral);
  border-color: var(--color-primary);
}

@media (max-width: 768px) {
  .preferences-grid {
    grid-template-columns: 1fr;
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

  .toggle-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
  }

  .actions-section {
    flex-direction: column;
  }

  .btn-primary, .btn-secondary {
    width: 100%;
  }
}
</style>
