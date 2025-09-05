<template>
  <div class="admin-layout">
    <!-- Navbar -->
    <NavbarElement />

    <section class="admin-content">
      <!-- Background Image -->
      <div class="background-overlay">
        <img
          src="@/assets/image.jpg"
          alt="Photographer at work"
          class="background-image"
        />
      </div>

      <!-- Main Content -->
      <div class="content-wrapper">
        <!-- Header -->
        <div class="page-header">
          <div class="header-content">
            <div class="header-top">
              <NuxtLink
                to="/"
                class="back-link-btn"
              >
                <Icon name="heroicons:arrow-left" size="16" />
                Volver al inicio
              </NuxtLink>
            </div>
            <h1 class="page-title">
              Panel de Administración
            </h1>
            <p class="page-subtitle">
              Gestiona usuarios, estadísticas y configuraciones del sistema
            </p>
          </div>
        </div>

        <!-- Quick Stats Bar -->
        <div class="stats-bar">
          <div class="stats-grid">
            <div class="stat-item">
              <div class="stat-icon">
                <Icon name="heroicons:users" size="20" />
              </div>
              <div class="stat-info">
                <span class="stat-number">{{ stats.total }}</span>
                <span class="stat-label">Total Usuarios</span>
              </div>
            </div>
            <div class="stat-item">
              <div class="stat-icon">
                <Icon name="heroicons:shield-check" size="20" />
              </div>
              <div class="stat-info">
                <span class="stat-number">{{ stats.admin }}</span>
                <span class="stat-label">Administradores</span>
              </div>
            </div>
            <div class="stat-item">
              <div class="stat-icon">
                <Icon name="heroicons:user" size="20" />
              </div>
              <div class="stat-info">
                <span class="stat-number">{{ stats.user }}</span>
                <span class="stat-label">Usuarios</span>
              </div>
            </div>
            <div class="stat-item">
              <div class="stat-icon">
                <Icon name="heroicons:photo" size="20" />
              </div>
              <div class="stat-info">
                <span class="stat-number">{{ stats.gallery || 0 }}</span>
                <span class="stat-label">Galería</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Main Dashboard Content -->
        <div class="dashboard-main">
          <!-- Users Management Section -->
          <div class="main-section">
            <div class="section-header">
              <div class="section-info">
                <h2 class="section-title">Gestión de Usuarios</h2>
                <p class="section-description">Administra los usuarios del sistema</p>
              </div>
              <div class="section-actions">
                <select
                  v-model="roleFilter"
                  @change="filterUsers"
                  class="filter-select"
                >
                  <option value="">Todos los roles</option>
                  <option value="admin">Administradores</option>
                  <option value="user">Usuarios</option>
                </select>
                <button
                  @click="exportUsers"
                  class="export-btn"
                >
                  <Icon name="heroicons:arrow-down-tray" size="16" />
                  Exportar Excel
                </button>
              </div>
            </div>

            <!-- Users Table -->
            <div class="table-container">
              <div class="table-wrapper">
                <table class="users-table">
                  <thead class="table-header">
                    <tr>
                      <th class="table-header-cell">
                        <div class="header-content">
                          <span class="header-text">ID</span>
                        </div>
                      </th>
                      <th class="table-header-cell">
                        <div class="header-content">
                          <span class="header-text">Nombre Completo</span>
                        </div>
                      </th>
                      <th class="table-header-cell">
                        <div class="header-content">
                          <span class="header-text">Correo Electrónico</span>
                        </div>
                      </th>
                      <th class="table-header-cell">
                        <div class="header-content">
                          <span class="header-text">Rol</span>
                        </div>
                      </th>
                      <th class="table-header-cell">
                        <div class="header-content">
                          <span class="header-text">Fecha de Registro</span>
                        </div>
                      </th>
                      <th class="table-header-cell">
                        <div class="header-content">
                          <span class="header-text">Acciones</span>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody class="table-body">
                    <tr
                      v-for="user in filteredUsers"
                      :key="user.id"
                      class="table-row"
                    >
                      <td class="table-cell">
                        <div class="cell-content">
                          <span class="user-id">{{ user.id }}</span>
                        </div>
                      </td>
                      <td class="table-cell">
                        <div class="cell-content">
                          <div class="user-info">
                            <span class="user-name">{{ user.firstName }} {{ user.lastName }}</span>
                            <span class="user-role-mobile">{{ user.role }}</span>
                          </div>
                        </div>
                      </td>
                      <td class="table-cell">
                        <div class="cell-content">
                          <span class="user-email">{{ user.email }}</span>
                        </div>
                      </td>
                      <td class="table-cell">
                        <div class="cell-content">
                          <span
                            :class="[
                              'role-badge',
                              user.role === 'admin' ? 'role-admin' :
                              user.role === 'moderator' ? 'role-moderator' : 'role-user'
                            ]"
                          >
                            <Icon
                              :name="user.role === 'admin' ? 'heroicons:shield-check' :
                                    user.role === 'moderator' ? 'heroicons:user-group' : 'heroicons:user'"
                              size="14"
                            />
                            {{ user.role }}
                          </span>
                        </div>
                      </td>
                      <td class="table-cell">
                        <div class="cell-content">
                          <span class="user-date">{{ formatDate(user.createdAt) }}</span>
                        </div>
                      </td>
                      <td class="table-cell">
                        <div class="cell-content">
                          <div class="action-buttons">
                            <button
                              @click="changeUserRole(user)"
                              class="action-btn action-edit"
                              title="Cambiar Rol"
                            >
                              <Icon name="heroicons:arrow-path-rounded-square" size="16" />
                              <span class="btn-text">Editar</span>
                            </button>
                            <button
                              @click="viewUserDetails(user)"
                              class="action-btn action-view"
                              title="Ver Detalles"
                            >
                              <Icon name="heroicons:eye" size="16" />
                              <span class="btn-text">Ver</span>
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Role Change Modal -->
    <div
      v-if="showRoleModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      @click="closeRoleModal"
    >
      <div
        class="bg-white rounded-xl shadow-lg max-w-sm w-full p-4 sm:p-6 border border-stone-200"
        @click.stop
      >
        <h3 class="text-lg sm:text-xl font-bold text-stone-900 mb-3">Cambiar Rol de Usuario</h3>
        <div class="mb-4">
          <p class="text-stone-700 mb-1 text-sm"><strong>Usuario:</strong> {{ selectedUser?.firstName }} {{ selectedUser?.lastName }}</p>
          <p class="text-stone-700 text-sm"><strong>Email:</strong> {{ selectedUser?.email }}</p>
        </div>

        <div class="space-y-2 mb-4">
          <label class="flex items-center gap-2 cursor-pointer">
            <input type="radio" value="admin" v-model="newRole" class="text-stone-600 focus:ring-stone-500" />
            <span class="text-stone-700 text-sm">Administrador</span>
          </label>
          <label class="flex items-center gap-2 cursor-pointer">
            <input type="radio" value="user" v-model="newRole" class="text-stone-600 focus:ring-stone-500" />
            <span class="text-stone-700 text-sm">Usuario</span>
          </label>
        </div>

        <div class="flex gap-2 justify-end">
          <button
            @click="closeRoleModal"
            class="px-3 py-2 text-stone-600 hover:text-stone-800 transition-colors duration-200 text-sm"
          >
            Cancelar
          </button>
          <button
            @click="confirmRoleChange"
            class="bg-stone-700 text-white px-3 py-2 rounded-lg hover:bg-stone-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-stone-500 focus:ring-opacity-75 text-sm"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>

    <!-- User Details Modal -->
    <div
      v-if="showUserModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      @click="closeUserModal"
    >
      <div
        class="bg-white rounded-xl shadow-lg max-w-lg w-full max-h-[80vh] overflow-y-auto p-4 sm:p-6 border border-stone-200"
        @click.stop
      >
        <h3 class="text-lg sm:text-xl font-bold text-stone-900 mb-4">Detalles del Usuario</h3>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
          <div class="bg-stone-50 rounded-lg p-3">
            <label class="block text-xs font-medium text-stone-600 mb-1">ID</label>
            <span class="text-stone-900 text-sm">{{ selectedUser?.id }}</span>
          </div>
          <div class="bg-stone-50 rounded-lg p-3">
            <label class="block text-xs font-medium text-stone-600 mb-1">Nombre Completo</label>
            <span class="text-stone-900 text-sm">{{ selectedUser?.firstName }} {{ selectedUser?.lastName }}</span>
          </div>
          <div class="bg-stone-50 rounded-lg p-3">
            <label class="block text-xs font-medium text-stone-600 mb-1">Email</label>
            <span class="text-stone-900 text-sm">{{ selectedUser?.email }}</span>
          </div>
          <div class="bg-stone-50 rounded-lg p-4">
            <label class="block text-sm font-medium text-stone-600 mb-1">Rol</label>
            <span
              :class="[
                'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                selectedUser?.role === 'admin' ? 'bg-red-100 text-red-800' :
                selectedUser?.role === 'moderator' ? 'bg-blue-100 text-blue-800' :
                'bg-green-100 text-green-800'
              ]"
            >
              {{ selectedUser?.role }}
            </span>
          </div>
          <div class="bg-stone-50 rounded-lg p-3">
            <label class="block text-xs font-medium text-stone-600 mb-1">Edad</label>
            <span class="text-stone-900 text-sm">{{ selectedUser?.age || 'No especificado' }}</span>
          </div>
          <div class="bg-stone-50 rounded-lg p-3">
            <label class="block text-xs font-medium text-stone-600 mb-1">Género</label>
            <span class="text-stone-900 text-sm">{{ selectedUser?.gender || 'No especificado' }}</span>
          </div>
          <div class="bg-stone-50 rounded-lg p-3">
            <label class="block text-xs font-medium text-stone-600 mb-1">Teléfono</label>
            <span class="text-stone-900 text-sm">{{ selectedUser?.phone || 'No especificado' }}</span>
          </div>
          <div class="bg-stone-50 rounded-lg p-3">
            <label class="block text-xs font-medium text-stone-600 mb-1">Fecha de Nacimiento</label>
            <span class="text-stone-900 text-sm">{{ selectedUser?.birthDate || 'No especificado' }}</span>
          </div>
        </div>

        <div class="flex justify-end">
          <button
            @click="closeUserModal"
            class="bg-stone-700 text-white px-4 py-2 rounded-lg hover:bg-stone-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-stone-500 focus:ring-opacity-75 text-sm"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

definePageMeta({
  middleware: 'auth'
})

const { $navigateTo } = useNuxtApp()
const navigateTo = $navigateTo || ((path) => window.location.href = path)

const stats = ref({
  total: 0,
  admin: 0,
  user: 0,
  gallery: 0
})

const users = ref([])
const filteredUsers = ref([])
const roleFilter = ref('')
const showRoleModal = ref(false)
const showUserModal = ref(false)
const selectedUser = ref(null)
const newRole = ref('')

const API_BASE = 'http://localhost:4000/api'

onMounted(async () => {
  await loadDashboardData()
})

const loadDashboardData = async () => {
  try {
    const token = localStorage.getItem('token')
    const user = JSON.parse(localStorage.getItem('user') || '{}')

    console.log('Current user:', user)
    console.log('Current token:', token)

    if (!token) {
      console.warn('No token found, redirecting to login')
      await navigateTo('/login')
      return
    }

    // Load stats
    const statsResponse = await fetch(`${API_BASE}/users/admin/stats`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })

    if (statsResponse.status === 403) {
      console.error('Access denied: User does not have admin permissions')
      alert('No tienes permisos de administrador. Serás redirigido al inicio.')
      await navigateTo('/')
      return
    }

    if (statsResponse.ok) {
      const statsData = await statsResponse.json()
      stats.value = {
        ...statsData,
        gallery: 0 // TODO: Add gallery stats endpoint
      }
    }

    // Load users
    const usersResponse = await fetch(`${API_BASE}/users/`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })

    if (usersResponse.status === 403) {
      console.error('Access denied: User does not have admin permissions')
      alert('No tienes permisos de administrador. Serás redirigido al inicio.')
      await navigateTo('/')
      return
    }

    if (usersResponse.ok) {
      users.value = await usersResponse.json()
      filteredUsers.value = users.value
    }
  } catch (error) {
    console.error('Error loading dashboard data:', error)
  }
}

const filterUsers = () => {
  if (roleFilter.value) {
    filteredUsers.value = users.value.filter(user => user.role === roleFilter.value)
  } else {
    filteredUsers.value = users.value
  }
}

const exportUsers = async () => {
  try {
    const token = localStorage.getItem('token')
    if (!token) return

    const response = await fetch(`${API_BASE}/users/admin/export`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })

    if (response.ok) {
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'usuarios.xlsx'
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    }
  } catch (error) {
    console.error('Error exporting users:', error)
  }
}

const changeUserRole = (user) => {
  selectedUser.value = user
  newRole.value = user.role
  showRoleModal.value = true
}

const confirmRoleChange = async () => {
  try {
    const token = localStorage.getItem('token')
    if (!token) return

    const response = await fetch(`${API_BASE}/users/${selectedUser.value.id}/role`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ role: newRole.value })
    })

    if (response.ok) {
      await loadDashboardData()
      closeRoleModal()
      alert('Rol actualizado exitosamente')
    }
  } catch (error) {
    console.error('Error updating role:', error)
  }
}

const closeRoleModal = () => {
  showRoleModal.value = false
  selectedUser.value = null
  newRole.value = ''
}

const viewUserDetails = (user) => {
  selectedUser.value = user
  showUserModal.value = true
}

const closeUserModal = () => {
  showUserModal.value = false
  selectedUser.value = null
}

const formatDate = (dateString) => {
  if (!dateString) return 'N/A'
  return new Date(dateString).toLocaleDateString('es-ES')
}
</script>

<style scoped>
/* Layout */
.admin-layout {
  min-height: 100vh;
  background: linear-gradient(135deg, #F5F5DC 0%, rgba(139, 69, 19, 0.02) 100%);
}

.admin-content {
  position: relative;
  min-height: 100vh;
}

.background-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  overflow: hidden;
}

.background-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.05;
  filter: blur(1px);
}

.content-wrapper {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
}

/* Header */
.page-header {
  text-align: center;
  margin-bottom: 2rem;
}

.header-content {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 4px 6px -1px rgba(139, 69, 19, 0.1);
  border: 1px solid rgba(139, 69, 19, 0.1);
}

.header-top {
  display: flex;
  justify-content: flex-start;
  margin-bottom: 1rem;
}

.page-title {
  font-size: 2.5rem;
  font-weight: 800;
  color: #8B4513;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-family: 'Playfair Display', serif;
}

.page-subtitle {
  font-size: 1.1rem;
  color: #8B7355;
  font-weight: 300;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-family: 'Inter', sans-serif;
}

/* Stats Bar */
.stats-bar {
  margin-bottom: 2rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

.stat-item {
  background: #FFFFFF;
  border-radius: 0.75rem;
  padding: 1.5rem;
  box-shadow: 0 1px 3px 0 rgba(139, 69, 19, 0.1);
  border: 1px solid rgba(139, 69, 19, 0.1);
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: all 0.2s ease;
}

.stat-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px 0 rgba(139, 69, 19, 0.15);
}

.stat-icon {
  width: 3rem;
  height: 3rem;
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.stat-icon:nth-child(1) { background: linear-gradient(135deg, #8B4513, #A0551F); }
.stat-icon:nth-child(2) { background: linear-gradient(135deg, #DAA520, #B8860B); }
.stat-icon:nth-child(3) { background: linear-gradient(135deg, #2F1B14, #5D2A0C); }
.stat-icon:nth-child(4) { background: linear-gradient(135deg, #8B7355, #5D4E37); }

.stat-info {
  flex: 1;
}

.stat-number {
  font-size: 1.875rem;
  font-weight: 700;
  color: #8B4513;
  line-height: 1;
}

.stat-label {
  font-size: 0.875rem;
  color: #8B7355;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-top: 0.25rem;
}

/* Main Dashboard */
.dashboard-main {
  background: #FFFFFF;
  border-radius: 0.75rem;
  box-shadow: 0 1px 3px 0 rgba(139, 69, 19, 0.1), 0 1px 2px 0 rgba(139, 69, 19, 0.06);
  border: 1px solid rgba(139, 69, 19, 0.08);
  overflow: hidden;
  margin-top: 1.5rem;
}

.main-section {
  padding: 2rem;
  background: linear-gradient(135deg, #FFFFFF 0%, rgba(245, 245, 220, 0.1) 100%);
}

/* Section Header */
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2rem;
  gap: 1rem;
}

.section-info {
  flex: 1;
}

.section-title {
  font-size: 1.875rem;
  font-weight: 700;
  color: #8B4513;
  margin-bottom: 0.5rem;
  font-family: 'Playfair Display', serif;
}

.section-description {
  color: #8B7355;
  font-size: 1rem;
  font-family: 'Inter', sans-serif;
}

.section-actions {
  display: flex;
  gap: 1rem;
  align-items: center;
}

/* Filters and Actions */
.filter-select {
  padding: 0.5rem 1rem;
  border: 1px solid rgba(139, 69, 19, 0.2);
  border-radius: 0.5rem;
  background: #FFFFFF;
  color: #2F1B14;
  font-size: 0.875rem;
  min-width: 150px;
  font-family: 'Inter', sans-serif;
}

.export-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: #8B4513;
  color: #FFFFFF;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.2s ease;
  border: 1px solid #8B4513;
  font-family: 'Inter', sans-serif;
}

.export-btn:hover {
  background: #5D2A0C;
  border-color: #5D2A0C;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(139, 69, 19, 0.3);
}

/* Table */
.table-container {
  margin-top: 1.5rem;
  background: #FFFFFF;
  border-radius: 0.75rem;
  border: 1px solid rgba(139, 69, 19, 0.08);
  overflow: hidden;
  box-shadow: 0 1px 3px 0 rgba(139, 69, 19, 0.1), 0 1px 2px 0 rgba(139, 69, 19, 0.06);
}

.table-wrapper {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

.users-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  font-family: 'Inter', sans-serif;
}

.table-header {
  background: linear-gradient(135deg, #F5F5DC 0%, rgba(139, 69, 19, 0.02) 100%);
  border-bottom: 2px solid rgba(139, 69, 19, 0.1);
}

.table-header-cell {
  padding: 0;
  border: none;
  position: relative;
}

.table-header-cell:not(:last-child)::after {
  content: '';
  position: absolute;
  right: 0;
  top: 20%;
  height: 60%;
  width: 1px;
  background: rgba(139, 69, 19, 0.1);
}

.header-content {
  padding: 1.25rem 1.5rem;
  display: flex;
  align-items: center;
  min-height: 3rem;
}

.header-text {
  font-size: 0.8125rem;
  font-weight: 700;
  color: #2F1B14;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-family: 'Inter', sans-serif;
}

.table-body {
  background: #FFFFFF;
}

.table-row {
  transition: all 0.2s ease;
  border-bottom: 1px solid rgba(139, 69, 19, 0.06);
}

.table-row:hover {
  background: linear-gradient(135deg, rgba(245, 245, 220, 0.3) 0%, rgba(139, 69, 19, 0.02) 100%);
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(139, 69, 19, 0.08);
}

.table-row:last-child {
  border-bottom: none;
}

.table-cell {
  padding: 0;
  border: none;
  vertical-align: middle;
}

.cell-content {
  padding: 1.25rem 1.5rem;
  display: flex;
  align-items: center;
  min-height: 4rem;
}

.user-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.user-id {
  font-size: 0.875rem;
  font-weight: 700;
  color: #8B4513;
  font-family: 'Inter', sans-serif;
  background: rgba(139, 69, 19, 0.08);
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  display: inline-block;
  min-width: 2rem;
  text-align: center;
}

.user-name {
  font-size: 0.9375rem;
  font-weight: 600;
  color: #2F1B14;
  font-family: 'Inter', sans-serif;
  line-height: 1.4;
}

.user-role-mobile {
  font-size: 0.75rem;
  color: #8B7355;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-weight: 500;
}

.user-email {
  font-size: 0.875rem;
  color: #8B7355;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
}

.user-date {
  font-size: 0.8125rem;
  color: #8B7355;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  background: rgba(139, 69, 19, 0.04);
  padding: 0.375rem 0.75rem;
  border-radius: 0.375rem;
  border: 1px solid rgba(139, 69, 19, 0.08);
}

/* Role Badges */
.role-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.375rem 0.75rem;
  border-radius: 0.5rem;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-family: 'Inter', sans-serif;
  border: 1px solid transparent;
  transition: all 0.2s ease;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}

.role-admin {
  background: linear-gradient(135deg, rgba(218, 165, 32, 0.1) 0%, rgba(184, 134, 11, 0.05) 100%);
  color: #B8860B;
  border-color: rgba(218, 165, 32, 0.2);
}

.role-admin:hover {
  background: linear-gradient(135deg, rgba(218, 165, 32, 0.15) 0%, rgba(184, 134, 11, 0.08) 100%);
  transform: translateY(-1px);
  box-shadow: 0 2px 4px 0 rgba(218, 165, 32, 0.1);
}

.role-moderator {
  background: linear-gradient(135deg, rgba(139, 115, 85, 0.1) 0%, rgba(93, 78, 55, 0.05) 100%);
  color: #5D4E37;
  border-color: rgba(139, 115, 85, 0.2);
}

.role-moderator:hover {
  background: linear-gradient(135deg, rgba(139, 115, 85, 0.15) 0%, rgba(93, 78, 55, 0.08) 100%);
  transform: translateY(-1px);
  box-shadow: 0 2px 4px 0 rgba(139, 115, 85, 0.1);
}

.role-user {
  background: linear-gradient(135deg, rgba(139, 69, 19, 0.1) 0%, rgba(93, 42, 12, 0.05) 100%);
  color: #8B4513;
  border-color: rgba(139, 69, 19, 0.2);
}

.role-user:hover {
  background: linear-gradient(135deg, rgba(139, 69, 19, 0.15) 0%, rgba(93, 42, 12, 0.08) 100%);
  transform: translateY(-1px);
  box-shadow: 0 2px 4px 0 rgba(139, 69, 19, 0.1);
}

/* Action Buttons */
.action-buttons {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.action-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.5rem 0.875rem;
  border-radius: 0.5rem;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  transition: all 0.2s ease;
  border: 1px solid transparent;
  cursor: pointer;
  font-family: 'Inter', sans-serif;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  position: relative;
  overflow: hidden;
}

.action-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s;
}

.action-btn:hover::before {
  left: 100%;
}

.btn-text {
  font-size: 0.6875rem;
  font-weight: 700;
}

.action-edit {
  background: linear-gradient(135deg, #8B4513 0%, #A0551F 100%);
  color: #FFFFFF;
  border-color: #8B4513;
}

.action-edit:hover {
  background: linear-gradient(135deg, #5D2A0C 0%, #8B4513 100%);
  border-color: #5D2A0C;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(139, 69, 19, 0.3);
}

.action-view {
  background: linear-gradient(135deg, #DAA520 0%, #B8860B 100%);
  color: #FFFFFF;
  border-color: #DAA520;
}

.action-view:hover {
  background: linear-gradient(135deg, #B8860B 0%, #DAA520 100%);
  border-color: #B8860B;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(218, 165, 32, 0.3);
}

/* Back Link */
.back-link-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #8B4513;
  text-decoration: none;
  font-size: 0.875rem;
  font-weight: 600;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  background: rgba(218, 165, 32, 0.1);
  border: 1px solid rgba(218, 165, 32, 0.2);
  transition: all 0.2s ease;
  font-family: 'Inter', sans-serif;
}

.back-link-btn:hover {
  color: #FFFFFF;
  background: #8B4513;
  border-color: #8B4513;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(139, 69, 19, 0.3);
}

/* Modals */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(47, 27, 20, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
}

.modal-content {
  background: #FFFFFF;
  border-radius: 0.75rem;
  padding: 2rem;
  max-width: 500px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 25px -5px rgba(139, 69, 19, 0.2);
  border: 1px solid rgba(139, 69, 19, 0.1);
}

.modal-large {
  max-width: 700px;
}

.modal-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #8B4513;
  margin-bottom: 1.5rem;
  font-family: 'Playfair Display', serif;
}

.modal-body {
  margin-bottom: 1.5rem;
}

.modal-text {
  color: #2F1B14;
  margin-bottom: 0.5rem;
  font-family: 'Inter', sans-serif;
}

.role-options {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
}

.role-option {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
}

.role-radio {
  width: 1.25rem;
  height: 1.25rem;
  accent-color: #8B4513;
}

.role-label {
  color: #2F1B14;
  font-weight: 500;
  font-family: 'Inter', sans-serif;
}

.user-details-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
}

.detail-card {
  background: #F5F5DC;
  padding: 1rem;
  border-radius: 0.5rem;
  border: 1px solid rgba(139, 69, 19, 0.1);
}

.detail-label {
  display: block;
  font-size: 0.75rem;
  font-weight: 600;
  color: #8B7355;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.5rem;
  font-family: 'Inter', sans-serif;
}

.detail-value {
  color: #2F1B14;
  font-weight: 500;
  font-family: 'Inter', sans-serif;
}

.modal-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
}

.modal-btn {
  padding: 0.5rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
  font-family: 'Inter', sans-serif;
}

.modal-cancel {
  background: #F5F5DC;
  color: #8B7355;
}

.modal-cancel:hover {
  background: rgba(245, 245, 220, 0.8);
}

.modal-confirm {
  background: #8B4513;
  color: white;
}

.modal-confirm:hover {
  background: #5D2A0C;
}

/* Table Enhancements */
.table-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(139, 69, 19, 0.1), transparent);
}

.table-row:last-child {
  position: relative;
}

.table-row:last-child::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(139, 69, 19, 0.05), transparent);
}

/* Subtle animations */
.table-row {
  animation: fadeIn 0.3s ease-out;
}

.table-row:nth-child(odd) {
  animation-delay: 0.05s;
}

.table-row:nth-child(even) {
  animation-delay: 0.1s;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Focus states for accessibility */
.action-btn:focus {
  outline: 2px solid rgba(139, 69, 19, 0.5);
  outline-offset: 2px;
}

.role-badge:focus {
  outline: 2px solid rgba(139, 69, 19, 0.5);
  outline-offset: 2px;
}

/* Print styles */
@media print {
  .table-container {
    box-shadow: none;
    border: 1px solid #000;
  }

  .action-buttons {
    display: none;
  }

  .table-row:hover {
    background: transparent !important;
    transform: none !important;
  }
}

/* Responsive Table */
@media (max-width: 1024px) {
  .header-text {
    font-size: 0.75rem;
  }

  .cell-content {
    padding: 1rem 1.25rem;
  }

  .user-name {
    font-size: 0.875rem;
  }
}

@media (max-width: 768px) {
  .table-container {
    margin-top: 1rem;
    border-radius: 0.5rem;
  }

  .header-content {
    padding: 1rem;
  }

  .cell-content {
    padding: 1rem;
    min-height: 3.5rem;
  }

  .user-id {
    font-size: 0.8125rem;
    padding: 0.1875rem 0.375rem;
  }

  .user-name {
    font-size: 0.8125rem;
  }

  .user-email {
    font-size: 0.8125rem;
  }

  .user-date {
    font-size: 0.75rem;
    padding: 0.25rem 0.5rem;
  }

  .role-badge {
    font-size: 0.6875rem;
    padding: 0.25rem 0.5rem;
  }

  .action-btn {
    padding: 0.375rem 0.625rem;
    font-size: 0.6875rem;
  }

  .btn-text {
    display: none;
  }
}

@media (max-width: 640px) {
  .action-buttons {
    flex-direction: column;
    gap: 0.25rem;
  }

  .action-btn {
    width: 100%;
    justify-content: center;
  }
}

/* Table States */
.table-loading {
  padding: 3rem 1.5rem;
  text-align: center;
  color: #8B7355;
  font-family: 'Inter', sans-serif;
  background: linear-gradient(135deg, rgba(245, 245, 220, 0.3) 0%, rgba(139, 69, 19, 0.02) 100%);
  border-radius: 0.5rem;
  margin: 1rem 0;
}

.table-loading-icon {
  width: 2rem;
  height: 2rem;
  margin: 0 auto 1rem;
  opacity: 0.6;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.table-empty {
  padding: 3rem 1.5rem;
  text-align: center;
  color: #8B7355;
  font-family: 'Inter', sans-serif;
  background: linear-gradient(135deg, rgba(245, 245, 220, 0.2) 0%, rgba(139, 69, 19, 0.01) 100%);
  border-radius: 0.5rem;
  margin: 1rem 0;
  border: 1px solid rgba(139, 69, 19, 0.08);
}

.table-empty-icon {
  width: 3rem;
  height: 3rem;
  margin: 0 auto 1rem;
  opacity: 0.4;
}

.table-empty-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #2F1B14;
  margin-bottom: 0.5rem;
}

.table-empty-text {
  font-size: 0.875rem;
  color: #8B7355;
  max-width: 300px;
  margin: 0 auto;
}

/* Table sorting indicators */
.table-header-cell.sortable {
  cursor: pointer;
  user-select: none;
}

.table-header-cell.sortable:hover .header-content {
  background: rgba(139, 69, 19, 0.05);
  border-radius: 0.375rem;
  margin: 0.125rem;
}

.sort-indicator {
  margin-left: 0.5rem;
  opacity: 0.5;
  transition: opacity 0.2s ease;
}

.table-header-cell.sortable:hover .sort-indicator {
  opacity: 1;
}

.sort-indicator.active {
  opacity: 1;
  color: #8B4513;
}
</style>
