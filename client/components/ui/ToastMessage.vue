<template>
  <Transition name="slide-fade">
    <div v-if="show" class="toast" :class="type">
      <div class="toast-content">
        <i :class="icon"></i>
        <span>{{ message }}</span>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  type: {
    type: String,
    default: 'success',
    validator: (value) => ['success', 'info', 'warning', 'error'].includes(value)
  },
  message: {
    type: String,
    required: true
  }
})

const icon = computed(() => {
  const icons = {
    success: 'fas fa-check-circle',
    info: 'fas fa-info-circle',
    warning: 'fas fa-exclamation-triangle',
    error: 'fas fa-times-circle'
  }
  return icons[props.type]
})
</script>

<style scoped>
.toast {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  padding: 1rem 1.5rem;
  border-radius: 0.5rem;
  background-color: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 9999;
  min-width: 200px;
  max-width: 300px;
}

.toast-content {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.toast i {
  font-size: 1.25rem;
}

.toast span {
  font-size: 0.875rem;
  line-height: 1.4;
}

/* Toast Types */
.toast.success {
  background-color: #ecfdf5;
  color: #065f46;
  border-left: 4px solid #10b981;
}

.toast.info {
  background-color: #eff6ff;
  color: #1e40af;
  border-left: 4px solid #3b82f6;
}

.toast.warning {
  background-color: #fffbeb;
  color: #92400e;
  border-left: 4px solid #f59e0b;
}

.toast.error {
  background-color: #fef2f2;
  color: #991b1b;
  border-left: 4px solid #ef4444;
}

/* Animation */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
</style> 