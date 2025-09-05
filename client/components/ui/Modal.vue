<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="isOpen"
        class="modal-overlay"
        @click="closeOnBackdrop ? closeModal() : null"
      >
        <div
          class="modal-container"
          ref="modalRef"
          :class="[`size-${size}`]"
          role="dialog"
          :aria-modal="true"
          :aria-labelledby="headingId"
          :aria-describedby="descId"
          @click.stop
          @keydown.tab.prevent="handleTab"
        >
          <div class="modal-header">
            <div class="header-titles">
              <h2 :id="headingId">{{ title }}</h2>
              <p v-if="description" :id="descId" class="modal-subtitle">{{ description }}</p>
            </div>
            <button @click="closeModal" class="close-btn" aria-label="Cerrar">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          <div class="modal-body">
            <slot></slot>
          </div>

          <div class="modal-footer" v-if="showFooter">
            <slot name="footer">
              <div class="modal-actions">
                <button @click="closeModal" class="btn-secondary">
                  Cancelar
                </button>
                <button @click="$emit('confirm')" class="btn-primary">
                  Confirmar
                </button>
              </div>
            </slot>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { defineEmits, defineProps, onMounted, onBeforeUnmount, watch, nextTick, computed, ref } from 'vue'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  showFooter: {
    type: Boolean,
    default: true
  },
  size: {
    type: String,
    default: 'lg' // sm | md | lg | xl
  },
  closeOnBackdrop: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['close', 'confirm'])

const closeModal = () => {
  emit('close')
}

 // Close on Escape for better keyboard UX
const onKeydown = (e) => {
  if (e.key === 'Escape' || e.key === 'Esc') {
    emit('close')
  }
}

// Focus trap helpers
let focusables = []
const modalRef = ref(null)
const headingId = computed(() => `modal-heading-${Math.random().toString(36).slice(2, 8)}`)
const descId = computed(() => `modal-desc-${Math.random().toString(36).slice(2, 8)}`)

const collectFocusables = (root) => {
  if (!root) return []
  return Array.from(root.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'))
    .filter(el => !el.hasAttribute('disabled') && !el.getAttribute('aria-hidden'))
}

const handleTab = (e) => {
  const root = modalRef.value
  focusables = collectFocusables(root)
  if (focusables.length === 0) return
  const first = focusables[0]
  const last = focusables[focusables.length - 1]
  const active = document.activeElement
  if (e.shiftKey) {
    if (active === first) {
      last.focus()
    } else {
      const idx = focusables.indexOf(active)
      const prev = focusables[idx - 1] || last
      prev.focus()
    }
  } else {
    if (active === last) {
      first.focus()
    } else {
      const idx = focusables.indexOf(active)
      const next = focusables[idx + 1] || first
      next.focus()
    }
  }
}

watch(() => props.isOpen, async (open) => {
  if (open) {
    // small timeout to ensure DOM is rendered and focusable elements exist
    await nextTick()
    const el = modalRef.value
    if (el) {
      // focus first input/select/textarea/button inside modal for quick keyboard entry
      const focusable = el.querySelector('input, select, textarea, button')
      if (focusable && typeof focusable.focus === 'function') focusable.focus()
    }
    window.addEventListener('keydown', onKeydown)
    // lock body scroll
    if (document && document.body) document.body.style.overflow = 'hidden'
  } else {
    window.removeEventListener('keydown', onKeydown)
    if (document && document.body) document.body.style.overflow = ''
  }
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeydown)
  if (document && document.body) document.body.style.overflow = ''
})
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--bg-overlay);
  backdrop-filter: saturate(120%) blur(2px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
}

.modal-container {
  background: var(--bg-light);
  border-radius: var(--radius);
  box-shadow: 0 20px 40px var(--shadow-primary);
  /* base size; size classes adjust width */
  width: min(1100px, 95vw);
  height: 96vh;
  max-height: 96vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.modal-container.size-sm { width: min(480px, 95vw); }
.modal-container.size-md { width: min(720px, 95vw); }
.modal-container.size-lg { width: min(960px, 95vw); }
.modal-container.size-xl { width: min(1100px, 95vw); }

.modal-header {
  padding: 1rem 1.25rem;
  border-bottom: 1px solid var(--border-light);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.modal-header h2 {
  margin: 0;
  color: var(--color-text);
  font-size: 1.25rem;
  font-weight: 600;
}

.modal-subtitle {
  margin: 0.25rem 0 0;
  color: var(--color-text-light);
  font-size: 0.9rem;
}

.close-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: var(--radius);
  color: var(--color-text-light);
  transition: all var(--transition-fast);
}

.close-btn:hover {
  background: var(--bg-neutral);
  color: var(--color-text);
}

.modal-body {
  padding: 0.75rem 1rem 1rem;
  overflow: visible; /* no internal scroll */
  flex: 1 1 auto;
}

.modal-footer {
  padding: 0.75rem 1.25rem;
  border-top: 1px solid var(--border-light);
  background: var(--bg-neutral);
}

.modal-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
}

.btn-primary,
.btn-secondary {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: var(--radius);
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition-fast);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.btn-primary {
  background: var(--bg-primary);
  color: var(--color-primary-contrast);
}

.btn-primary:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px var(--shadow-primary);
}

.btn-secondary {
  background: var(--color-muted);
  color: white;
}

.btn-secondary:hover {
  background: var(--color-text);
  transform: translateY(-1px);
}

/* Modal animations */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .modal-container,
.modal-leave-active .modal-container {
  transition: transform 0.2s ease;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  transform: scale(0.96) translateY(-8px);
}

@media (max-width: 768px) {
  .modal-container {
    max-width: 95vw;
    max-height: 95vh;
  }

  .modal-header,
  .modal-body,
  .modal-footer {
    padding: 1rem 1.5rem;
  }

  .modal-actions {
    flex-direction: column;
  }

  .btn-primary,
  .btn-secondary {
    width: 100%;
  }
}
</style>
