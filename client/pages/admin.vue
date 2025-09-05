<template>
  <section
    class="relative min-h-screen flex flex-col p-4 sm:p-6 md:p-8 lg:p-12 xl:p-16 bg-gradient-to-br from-stone-50 to-stone-200 text-stone-800 font-sans"
  >
    <!-- Background Image -->
    <div class="absolute inset-0 overflow-hidden opacity-10">
      <img
        src="@/assets/image.jpg"
        alt="Photographer at work"
        class="w-full h-full object-cover object-center scale-110 blur-sm"
      />
    </div>

    <!-- Header -->
    <div class="relati/* Responsive adjustments */
@media (max-width: 640px) {
  .grid-cols-1.sm\\:grid-cols-2.lg\\:grid-cols-3 {
    grid-template-columns: repeat(1, 1fr);
  }
}

@media (max-width: 480px) {
  .grid-cols-1.sm\\:grid-cols-2.lg\\:grid-cols-3 {
    grid-template-columns: 1fr;
  }
} sm:mb-10 md:mb-12">
      <div class="text-center">
        <h1
          class="text-2xl sm:text-3xl md:text-5xl font-extrabold uppercase tracking-tight text-stone-900 mb-2 sm:mb-3 leading-tight"
        >
          Panel de Administración
        </h1>
        <p
          class="text-base sm:text-lg md:text-xl font-light uppercase tracking-wide text-stone-600 max-w-2xl mx-auto"
        >
          Gestiona usuarios, estadísticas y configuraciones del sistema
        </p>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-10 md:mb-12">
      <div
        class="bg-white rounded-2xl shadow-xl p-4 sm:p-6 md:p-8 text-center border border-stone-200 transform transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-2"
      >
        <div class="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-stone-700 to-stone-900 rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
          <svg class="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
          </svg>
        </div>
        <h3 class="text-2xl sm:text-3xl font-bold text-stone-900 mb-1">{{ stats.total }}</h3>
        <p class="text-stone-600 font-medium uppercase tracking-wide text-sm">Total Usuarios</p>
      </div>

      <div
        class="bg-white rounded-2xl shadow-xl p-4 sm:p-6 md:p-8 text-center border border-stone-200 transform transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-2"
      >
        <div class="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-red-600 to-red-800 rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
          <svg class="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
          </svg>
        </div>
        <h3 class="text-2xl sm:text-3xl font-bold text-stone-900 mb-1">{{ stats.admin }}</h3>
        <p class="text-stone-600 font-medium uppercase tracking-wide text-sm">Administradores</p>
      </div>

      <div
        class="bg-white rounded-2xl shadow-xl p-4 sm:p-6 md:p-8 text-center border border-stone-200 transform transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-2"
      >
        <div class="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-green-600 to-green-800 rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
          <svg class="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
          </svg>
        </div>
        <h3 class="text-2xl sm:text-3xl font-bold text-stone-900 mb-1">{{ stats.user }}</h3>
        <p class="text-stone-600 font-medium uppercase tracking-wide text-sm">Usuarios</p>
      </div>
    </div>

    <!-- Users Management Section -->
    <div class="relative z-10 bg-white rounded-2xl shadow-xl p-4 sm:p-6 md:p-8 border border-stone-200">
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8">
        <div>
          <h2 class="text-xl sm:text-2xl md:text-3xl font-bold text-stone-900 mb-2">Gestión de Usuarios</h2>
          <p class="text-stone-600">Administra los usuarios del sistema</p>
        </div>
        <div class="flex flex-col sm:flex-row gap-3 mt-4 sm:mt-0">
          <select
            v-model="roleFilter"
            @change="filterUsers"
            class="px-4 py-2 border border-stone-300 rounded-lg bg-stone-50 text-stone-700 focus:outline-none focus:ring-2 focus:ring-stone-500 focus:border-transparent"
          >
            <option value="">Todos los roles</option>
            <option value="admin">Administradores</option>
            <option value="user">Usuarios</option>
          </select>
          <button
            @click="exportUsers"
            class="flex items-center gap-2 bg-stone-700 text-white px-4 py-2 rounded-lg hover:bg-stone-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-stone-500 focus:ring-opacity-75"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
            Exportar Excel
          </button>
        </div>
      </div>

      <!-- Users Table -->
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="border-b border-stone-200">
              <th class="text-left py-3 px-4 font-semibold text-stone-900">ID</th>
              <th class="text-left py-3 px-4 font-semibold text-stone-900">Nombre</th>
              <th class="text-left py-3 px-4 font-semibold text-stone-900">Email</th>
              <th class="text-left py-3 px-4 font-semibold text-stone-900">Rol</th>
              <th class="text-left py-3 px-4 font-semibold text-stone-900">Registro</th>
              <th class="text-left py-3 px-4 font-semibold text-stone-900">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="user in filteredUsers"
              :key="user.id"
              class="border-b border-stone-100 hover:bg-stone-50 transition-colors duration-200"
            >
              <td class="py-3 px-4 text-stone-700">{{ user.id }}</td>
              <td class="py-3 px-4 text-stone-900 font-medium">{{ user.firstName }} {{ user.lastName }}</td>
              <td class="py-3 px-4 text-stone-700">{{ user.email }}</td>
              <td class="py-3 px-4">
                <span
                  :class="[
                    'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                    user.role === 'admin' ? 'bg-red-100 text-red-800' :
                    user.role === 'moderator' ? 'bg-blue-100 text-blue-800' :
                    'bg-green-100 text-green-800'
                  ]"
                >
                  {{ user.role }}
                </span>
              </td>
              <td class="py-3 px-4 text-stone-700">{{ formatDate(user.createdAt) }}</td>
              <td class="py-3 px-4">
                <div class="flex gap-2">
                  <button
                    @click="changeUserRole(user)"
                    class="bg-stone-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-stone-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-stone-500 focus:ring-opacity-75"
                  >
                    Cambiar Rol
                  </button>
                  <button
                    @click="viewUserDetails(user)"
                    class="bg-stone-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-stone-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-stone-500 focus:ring-opacity-75"
                  >
                    Ver Detalles
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Role Change Modal -->
    <div
      v-if="showRoleModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      @click="closeRoleModal"
    >
      <div
        class="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 sm:p-8 border border-stone-200"
        @click.stop
      >
        <h3 class="text-xl sm:text-2xl font-bold text-stone-900 mb-4">Cambiar Rol de Usuario</h3>
        <div class="mb-6">
          <p class="text-stone-700 mb-2"><strong>Usuario:</strong> {{ selectedUser?.firstName }} {{ selectedUser?.lastName }}</p>
          <p class="text-stone-700"><strong>Email:</strong> {{ selectedUser?.email }}</p>
        </div>

        <div class="space-y-3 mb-6">
          <label class="flex items-center gap-3 cursor-pointer">
            <input type="radio" value="admin" v-model="newRole" class="text-stone-600 focus:ring-stone-500" />
            <span class="text-stone-700">Administrador</span>
          </label>
          <label class="flex items-center gap-3 cursor-pointer">
            <input type="radio" value="user" v-model="newRole" class="text-stone-600 focus:ring-stone-500" />
            <span class="text-stone-700">Usuario</span>
          </label>
        </div>

        <div class="flex gap-3 justify-end">
          <button
            @click="closeRoleModal"
            class="px-4 py-2 text-stone-600 hover:text-stone-800 transition-colors duration-200"
          >
            Cancelar
          </button>
          <button
            @click="confirmRoleChange"
            class="bg-stone-700 text-white px-4 py-2 rounded-lg hover:bg-stone-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-stone-500 focus:ring-opacity-75"
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
        class="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 border border-stone-200"
        @click.stop
      >
        <h3 class="text-xl sm:text-2xl font-bold text-stone-900 mb-6">Detalles del Usuario</h3>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div class="bg-stone-50 rounded-lg p-4">
            <label class="block text-sm font-medium text-stone-600 mb-1">ID</label>
            <span class="text-stone-900">{{ selectedUser?.id }}</span>
          </div>
          <div class="bg-stone-50 rounded-lg p-4">
            <label class="block text-sm font-medium text-stone-600 mb-1">Nombre Completo</label>
            <span class="text-stone-900">{{ selectedUser?.firstName }} {{ selectedUser?.lastName }}</span>
          </div>
          <div class="bg-stone-50 rounded-lg p-4">
            <label class="block text-sm font-medium text-stone-600 mb-1">Email</label>
            <span class="text-stone-900">{{ selectedUser?.email }}</span>
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
          <div class="bg-stone-50 rounded-lg p-4">
            <label class="block text-sm font-medium text-stone-600 mb-1">Edad</label>
            <span class="text-stone-900">{{ selectedUser?.age || 'No especificado' }}</span>
          </div>
          <div class="bg-stone-50 rounded-lg p-4">
            <label class="block text-sm font-medium text-stone-600 mb-1">Género</label>
            <span class="text-stone-900">{{ selectedUser?.gender || 'No especificado' }}</span>
          </div>
          <div class="bg-stone-50 rounded-lg p-4">
            <label class="block text-sm font-medium text-stone-600 mb-1">Teléfono</label>
            <span class="text-stone-900">{{ selectedUser?.phone || 'No especificado' }}</span>
          </div>
          <div class="bg-stone-50 rounded-lg p-4">
            <label class="block text-sm font-medium text-stone-600 mb-1">Fecha de Nacimiento</label>
            <span class="text-stone-900">{{ selectedUser?.birthDate || 'No especificado' }}</span>
          </div>
        </div>

        <div class="flex justify-end">
          <button
            @click="closeUserModal"
            class="bg-stone-700 text-white px-6 py-2 rounded-lg hover:bg-stone-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-stone-500 focus:ring-opacity-75"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>

    <!-- Back to Home Link -->
    <div class="relative z-10 text-center mt-8 sm:mt-10 md:mt-12">
      <NuxtLink
        to="/"
        class="inline-flex items-center gap-2 text-stone-600 hover:text-stone-800 transition-colors duration-200 text-sm sm:text-base md:text-lg font-medium"
      >
        <svg class="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
        </svg>
        Volver al inicio
      </NuxtLink>
    </div>
  </section>
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
  user: 0
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
      stats.value = await statsResponse.json()
    }

    // Load users
    const usersResponse = await fetch(`${API_BASE}/users/admin/all`, {
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
/* Custom radio button styles */
input[type="radio"] {
  appearance: none;
  -webkit-appearance: none;
  width: 18px;
  height: 18px;
  border: 2px solid #d1d5db;
  border-radius: 50%;
  outline: none;
  cursor: pointer;
  position: relative;
  transition: all 0.2s ease;
}

input[type="radio"]:checked {
  border-color: #292524;
  background-color: #292524;
}

input[type="radio"]:checked::after {
  content: '';
  position: absolute;
  top: 3px;
  left: 3px;
  width: 6px;
  height: 6px;
  background-color: white;
  border-radius: 50%;
}

input[type="radio"]:hover {
  border-color: #292524;
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .grid-cols-1.sm\:grid-cols-2.lg\:grid-cols-4 {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .grid-cols-1.sm\:grid-cols-2.lg\:grid-cols-4 {
    grid-template-columns: 1fr;
  }
}
</style>

<style scoped>
.admin-dashboard {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem;
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  color: white;
}

.dashboard-header h1 {
  font-size: 2.5rem;
  font-weight: bold;
  margin: 0;
}

.header-actions {
  display: flex;
  gap: 1rem;
}

.export-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.export-btn:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
}

.icon {
  width: 1rem;
  height: 1rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.stat-card {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 1rem;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
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

.stat-icon.users { background: linear-gradient(135deg, #667eea, #764ba2); }
.stat-icon.admin { background: linear-gradient(135deg, #f093fb, #f5576c); }
.stat-icon.moderator { background: linear-gradient(135deg, #4facfe, #00f2fe); }
.stat-icon.user { background: linear-gradient(135deg, #43e97b, #38f9d7); }

.stat-icon svg {
  width: 1.5rem;
  height: 1.5rem;
}

.stat-content h3 {
  font-size: 2rem;
  font-weight: bold;
  margin: 0;
  color: #333;
}

.stat-content p {
  margin: 0.25rem 0 0 0;
  color: #666;
  font-size: 0.875rem;
}

.table-container {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
}

.table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.table-header h2 {
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
  margin: 0;
}

.table-filters {
  display: flex;
  gap: 1rem;
}

.filter-select {
  padding: 0.5rem 1rem;
  border: 1px solid #ddd;
  border-radius: 0.5rem;
  background: white;
  font-size: 0.875rem;
}

.table-wrapper {
  overflow-x: auto;
}

.users-table {
  width: 100%;
  border-collapse: collapse;
}

.users-table th,
.users-table td {
  padding: 0.75rem 1rem;
  text-align: left;
  border-bottom: 1px solid #eee;
}

.users-table th {
  background: #f8f9fa;
  font-weight: 600;
  color: #333;
}

.role-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: capitalize;
}

.role-badge.admin {
  background: #fef3c7;
  color: #d97706;
}

.role-badge.moderator {
  background: #dbeafe;
  color: #2563eb;
}

.role-badge.user {
  background: #d1fae5;
  color: #065f46;
}

.action-buttons {
  display: flex;
  gap: 0.5rem;
}

.action-btn {
  padding: 0.375rem 0.75rem;
  border: none;
  border-radius: 0.375rem;
  font-size: 0.75rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.action-btn.edit {
  background: #3b82f6;
  color: white;
}

.action-btn.edit:hover {
  background: #2563eb;
}

.action-btn.view {
  background: #10b981;
  color: white;
}

.action-btn.view:hover {
  background: #059669;
}

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
}

.modal-content {
  background: white;
  border-radius: 0.75rem;
  padding: 2rem;
  max-width: 500px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-content h3 {
  margin-top: 0;
  color: #333;
}

.role-selection {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 1.5rem 0;
}

.role-selection label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
}

.modal-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 1.5rem;
}

.confirm-btn {
  background: #10b981;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  cursor: pointer;
  font-weight: 500;
}

.confirm-btn:hover {
  background: #059669;
}

.cancel-btn {
  background: #6b7280;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  cursor: pointer;
  font-weight: 500;
}

.cancel-btn:hover {
  background: #4b5563;
}

.user-details .user-info-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin: 1.5rem 0;
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.info-item label {
  font-weight: 600;
  color: #374151;
  font-size: 0.875rem;
}

.info-item span {
  color: #6b7280;
}

@media (max-width: 768px) {
  .dashboard-header {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }

  .table-header {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }

  .user-details .user-info-grid {
    grid-template-columns: 1fr;
  }
}
</style>
