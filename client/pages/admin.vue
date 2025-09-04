<template>
  <section class="admin-dashboard">
    <div class="dashboard-header">
      <h1>Dashboard de Administrador</h1>
      <div class="header-actions">
        <button @click="exportUsers" class="export-btn">
          <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
          </svg>
          Exportar Excel
        </button>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon users">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
          </svg>
        </div>
        <div class="stat-content">
          <h3>{{ stats.total }}</h3>
          <p>Total Usuarios</p>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon admin">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
          </svg>
        </div>
        <div class="stat-content">
          <h3>{{ stats.admin }}</h3>
          <p>Administradores</p>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon moderator">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
          </svg>
        </div>
        <div class="stat-content">
          <h3>{{ stats.moderator }}</h3>
          <p>Moderadores</p>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon user">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
          </svg>
        </div>
        <div class="stat-content">
          <h3>{{ stats.user }}</h3>
          <p>Usuarios</p>
        </div>
      </div>
    </div>

    <!-- Users Table -->
    <div class="table-container">
      <div class="table-header">
        <h2>Gestión de Usuarios</h2>
        <div class="table-filters">
          <select v-model="roleFilter" @change="filterUsers" class="filter-select">
            <option value="">Todos los roles</option>
            <option value="admin">Administradores</option>
            <option value="moderator">Moderadores</option>
            <option value="user">Usuarios</option>
          </select>
        </div>
      </div>

      <div class="table-wrapper">
        <table class="users-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Rol</th>
              <th>Fecha Registro</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in filteredUsers" :key="user.id">
              <td>{{ user.id }}</td>
              <td>{{ user.firstName }} {{ user.lastName }}</td>
              <td>{{ user.email }}</td>
              <td>
                <span :class="`role-badge ${user.role}`">{{ user.role }}</span>
              </td>
              <td>{{ formatDate(user.createdAt) }}</td>
              <td>
                <div class="action-buttons">
                  <button @click="changeUserRole(user)" class="action-btn edit">
                    Cambiar Rol
                  </button>
                  <button @click="viewUserDetails(user)" class="action-btn view">
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
    <div v-if="showRoleModal" class="modal-overlay" @click="closeRoleModal">
      <div class="modal-content" @click.stop>
        <h3>Cambiar Rol de Usuario</h3>
        <p>Usuario: {{ selectedUser?.firstName }} {{ selectedUser?.lastName }}</p>
        <p>Email: {{ selectedUser?.email }}</p>

        <div class="role-selection">
          <label>
            <input type="radio" value="admin" v-model="newRole" />
            Administrador
          </label>
          <label>
            <input type="radio" value="moderator" v-model="newRole" />
            Moderador
          </label>
          <label>
            <input type="radio" value="user" v-model="newRole" />
            Usuario
          </label>
        </div>

        <div class="modal-actions">
          <button @click="confirmRoleChange" class="confirm-btn">Confirmar</button>
          <button @click="closeRoleModal" class="cancel-btn">Cancelar</button>
        </div>
      </div>
    </div>

    <!-- User Details Modal -->
    <div v-if="showUserModal" class="modal-overlay" @click="closeUserModal">
      <div class="modal-content user-details" @click.stop>
        <h3>Detalles del Usuario</h3>
        <div class="user-info-grid">
          <div class="info-item">
            <label>ID:</label>
            <span>{{ selectedUser?.id }}</span>
          </div>
          <div class="info-item">
            <label>Nombre:</label>
            <span>{{ selectedUser?.firstName }} {{ selectedUser?.lastName }}</span>
          </div>
          <div class="info-item">
            <label>Email:</label>
            <span>{{ selectedUser?.email }}</span>
          </div>
          <div class="info-item">
            <label>Rol:</label>
            <span :class="`role-badge ${selectedUser?.role}`">{{ selectedUser?.role }}</span>
          </div>
          <div class="info-item">
            <label>Edad:</label>
            <span>{{ selectedUser?.age || 'No especificado' }}</span>
          </div>
          <div class="info-item">
            <label>Género:</label>
            <span>{{ selectedUser?.gender || 'No especificado' }}</span>
          </div>
          <div class="info-item">
            <label>Teléfono:</label>
            <span>{{ selectedUser?.phone || 'No especificado' }}</span>
          </div>
          <div class="info-item">
            <label>Fecha de Nacimiento:</label>
            <span>{{ selectedUser?.birthDate || 'No especificado' }}</span>
          </div>
        </div>

        <div class="modal-actions">
          <button @click="closeUserModal" class="cancel-btn">Cerrar</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'

definePageMeta({
  middleware: 'auth'
})

const stats = ref({
  total: 0,
  admin: 0,
  moderator: 0,
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
    if (!token) return

    // Load stats
    const statsResponse = await fetch(`${API_BASE}/users/admin/stats`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })

    if (statsResponse.ok) {
      stats.value = await statsResponse.json()
    }

    // Load users
    const usersResponse = await fetch(`${API_BASE}/users/admin/all`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })

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
