import { ref } from 'vue'

export const useToast = () => {
  const showToast = ref(false)
  const toastMessage = ref('')
  const toastType = ref('success')
  let timeout: NodeJS.Timeout | null = null

  const show = (message: string, type: 'success' | 'info' | 'warning' | 'error' = 'success', duration: number = 3000) => {
    // Clear any existing timeout
    if (timeout) {
      clearTimeout(timeout)
    }

    // Set new toast
    toastMessage.value = message
    toastType.value = type
    showToast.value = true

    // Auto hide after duration
    timeout = setTimeout(() => {
      showToast.value = false
    }, duration)
  }

  const hide = () => {
    showToast.value = false
    if (timeout) {
      clearTimeout(timeout)
    }
  }

  return {
    showToast,
    toastMessage,
    toastType,
    show,
    hide
  }
} 