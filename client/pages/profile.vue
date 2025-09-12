<template>
  <navbar-element></navbar-element>

        <button @click="openWizard" class="edit-profile-btn">
          <Icon name="heroicons:pencil-square" size="20" />
          Editar Perfil
        </button>

  <section class="profile-section">
    <div class="profile-container">
      <div class="profile-header">
        <h1 class="brand-title">LANDING</h1>
        <p class="brand-subtitle">PHOTOGRAPHY</p>
      </div>

      <div class="profile-content">
      <div class="page-header">
        <h2>Mi Perfil</h2>
        <p>Gestiona tu información personal</p>
      </div>

      <!-- Profile Summary -->
      <div class="profile-summary">
        <div class="summary-card">
          <div class="summary-avatar">
            <div class="avatar-placeholder">
              {{ profile.firstName?.charAt(0) }}{{ profile.lastName?.charAt(0) }}
            </div>
          </div>
          <div class="summary-info">
            <h3>{{ profile.firstName }} {{ profile.lastName }}</h3>
            <p>{{ profile.email }}</p>
            <p v-if="profile.title">{{ profile.title }}</p>
          </div>
        </div>

        <button @click="openEditor" class="edit-profile-btn">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
          </svg>
          Editar Perfil
        </button>
      </div>

      <!-- Profile Editor Modal -->
      <ProfileEditor
        :is-open="isEditorOpen"
        :profile="profile"
        @close="closeEditor"
        @update="updateProfileField"
        @save="saveProfile"
      />
      </div>
    </div>
  </section>

  <footer-element></footer-element>
  <palette-loader></palette-loader>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import NavbarElement from "@/components/navigation/NavbarElement.vue";
import FooterElement from "@/components/navigation/FooterElement.vue";
import PaletteLoader from "@/components/ui/PaletteLoader.vue";
import ProfileEditor from "@/components/ui/ProfileEditor.vue";
import "@/style/style.css";

definePageMeta({
  middleware: 'auth'
})

const profile = ref({
  firstName: '',
  lastName: '',
  maidenName: '',
  age: null,
  gender: '',
  phone: '',
  username: '',
  email: '',
  birthDate: '',
  bloodGroup: '',
  height: null,
  weight: null,
  eyeColor: '',
  hairColor: '',
  hairType: '',
  address: '',
  city: '',
  state: '',
  stateCode: '',
  postalCode: '',
  country: '',
  university: '',
  department: '',
  companyName: '',
  title: '',
  twoFactorEnabled: false,
  preferences: {}
})

const originalProfile = ref({})
const isLoading = ref(false)
const API_BASE = 'http://localhost:3000/api'

onMounted(async () => {
  await loadUserProfile()
})

const loadUserProfile = async () => {
  try {
    const token = localStorage.getItem('token')
    const user = localStorage.getItem('user')

    if (!token || !user) return

    const userData = JSON.parse(user)

    // Load full profile from server
    const response = await fetch(`${API_BASE}/users/${userData.id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })

    if (response.ok) {
      const userProfile = await response.json()

      // Populate form with existing data
      profile.value = {
        firstName: userProfile.firstName || '',
        lastName: userProfile.lastName || '',
        maidenName: userProfile.maidenName || '',
        age: userProfile.age || null,
        gender: userProfile.gender || '',
        phone: userProfile.phone || '',
        username: userProfile.username || '',
        email: userProfile.email || '',
        birthDate: userProfile.birthDate || '',
        bloodGroup: userProfile.bloodGroup || '',
        height: userProfile.height || null,
        weight: userProfile.weight || null,
        eyeColor: userProfile.eyeColor || '',
        hairColor: userProfile.hair?.color || '',
        hairType: userProfile.hair?.type || '',
        address: userProfile.address?.address || '',
        city: userProfile.address?.city || '',
        state: userProfile.address?.state || '',
        stateCode: userProfile.address?.stateCode || '',
        postalCode: userProfile.address?.postalCode || '',
        country: userProfile.address?.country || '',
        university: userProfile.university || '',
        department: userProfile.company?.department || '',
        companyName: userProfile.company?.name || '',
        title: userProfile.company?.title || '',
        twoFactorEnabled: userProfile.twoFactorEnabled || false,
        preferences: userProfile.preferences || {}
      }

      // Store original data for reset
      originalProfile.value = { ...profile.value }
    }
  } catch (error) {
    console.error('Error loading user profile:', error)
  }
}

const updateProfile = async () => {
  try {
    isLoading.value = true

    const token = localStorage.getItem('token')
    const user = localStorage.getItem('user')

    if (!token || !user) return

    const userData = JSON.parse(user)

    const response = await fetch(`${API_BASE}/users/${userData.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(profile.value)
    })

    if (response.ok) {
      alert('Perfil actualizado exitosamente')
      await loadUserProfile() // Reload to get updated data
    } else {
      alert('Error al actualizar el perfil')
    }
  } catch (error) {
    console.error('Error updating profile:', error)
    alert('Error al actualizar el perfil')
  } finally {
    isLoading.value = false
  }
}

const resetForm = () => {
  profile.value = { ...originalProfile.value }
}

// Editor modal state
const isEditorOpen = ref(false)

// Editor functions
const openEditor = () => {
  isEditorOpen.value = true
}

const closeEditor = () => {
  isEditorOpen.value = false
}

const updateProfileField = (field, value) => {
  profile.value[field] = value
}

const saveProfile = async (profileData) => {
  try {
    isLoading.value = true

    const token = localStorage.getItem('token')
    const user = localStorage.getItem('user')

    if (!token || !user) return

    const userData = JSON.parse(user)

    const response = await fetch(`${API_BASE}/users/${userData.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(profileData)
    })

    if (response.ok) {
      alert('Perfil actualizado exitosamente')
      await loadUserProfile() // Reload to get updated data
      closeWizard()
    } else {
      alert('Error al actualizar el perfil')
    }
  } catch (error) {
    console.error('Error updating profile:', error)
    alert('Error al actualizar el perfil')
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.profile-section {
  min-height: 100vh;
  background: var(--bg-page);
  padding: 2rem 0;
}

.profile-container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 2rem;
}

.profile-header {
  text-align: center;
  margin-bottom: 3rem;
}

.brand-title {
  font-size: 3.5rem;
  font-weight: 900;
  color: var(--color-primary);
  margin: 0;
  letter-spacing: -0.02em;
  text-transform: uppercase;
}

.brand-subtitle {
  font-size: 1.2rem;
  color: var(--color-text-light);
  margin: 0.5rem 0 0 0;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  font-weight: 500;
}

.page-header {
  text-align: center;
  margin-bottom: 3rem;
}

.page-header h2 {
  font-size: 2.5rem;
  color: var(--color-text);
  margin: 0 0 1rem 0;
  font-weight: 700;
}

.page-header p {
  font-size: 1.1rem;
  color: var(--color-text-light);
  margin: 0;
}

.profile-content {
  background: var(--bg-light);
  border-radius: var(--radius);
  padding: 3rem;
  box-shadow: 0 4px 6px var(--shadow-primary);
  border: 1px solid var(--border-light);
}

.profile-form {
  max-width: 100%;
}

.form-section {
  margin-bottom: 3rem;
}

.form-section h3 {
  font-size: 1.5rem;
  color: var(--color-text);
  margin: 0 0 2rem 0;
  font-weight: 600;
  border-bottom: 2px solid var(--color-primary);
  padding-bottom: 0.5rem;
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

.form-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 2px solid var(--border-light);
}

.save-btn,
.reset-btn {
  padding: 1rem 2rem;
  border: none;
  border-radius: var(--radius);
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition-fast);
  min-width: 150px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.save-btn {
  background: var(--bg-primary);
  color: var(--color-primary-contrast);
}

.save-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px var(--shadow-primary);
}

.save-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.reset-btn {
  background: var(--color-muted);
  color: white;
}

.reset-btn:hover {
  background: var(--color-text);
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .profile-container {
    padding: 0 1rem;
  }

  .profile-content {
    padding: 2rem 1.5rem;
  }

  .brand-title {
    font-size: 2.5rem;
  }

  .page-header h2 {
    font-size: 2rem;
  }

  .form-grid {
    grid-template-columns: 1fr;
  }

  .form-actions {
    flex-direction: column;
    align-items: center;
  }

  .save-btn,
  .reset-btn {
    width: 100%;
    max-width: 300px;
  }
}

/* Profile Summary Styles */
.profile-summary {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--bg-light);
  border-radius: var(--radius);
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 2px 4px var(--shadow-primary);
  border: 1px solid var(--border-light);
}

.summary-card {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.summary-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: var(--color-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 2rem;
  font-weight: 600;
}

.summary-info h3 {
  margin: 0 0 0.5rem 0;
  color: var(--color-text);
  font-size: 1.5rem;
}

.summary-info p {
  margin: 0;
  color: var(--color-text-muted);
  font-size: 1rem;
}

.edit-profile-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.875rem 1.75rem;
  background: linear-gradient(135deg, #8B4513 0%, #DAA520 100%);
  color: #FFFFFF;
  border: 1px solid #8B4513;
  border-radius: 0.75rem;
  font-size: 1rem;
  font-weight: 600;
  font-family: 'Inter', sans-serif;
  cursor: pointer;
  transition: all 0.2s ease;
  text-decoration: none;
  box-shadow: 0 2px 8px rgba(139, 69, 19, 0.2);
}

.edit-profile-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(139, 69, 19, 0.3);
}

.edit-profile-btn:active {
  transform: translateY(0);
}

.edit-profile-btn svg {
  width: 20px;
  height: 20px;
}

@media (max-width: 768px) {
  .profile-summary {
    flex-direction: column;
    gap: 1.5rem;
    text-align: center;
  }

  .summary-card {
    flex-direction: column;
    gap: 1rem;
  }

  .edit-profile-btn {
    width: 100%;
    justify-content: center;
  }
}
</style>
