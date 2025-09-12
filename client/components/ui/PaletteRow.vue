<template>
  <tr 
    class="border-b border-stone-100 hover:bg-stone-50 transition-colors"
    :class="{ 'bg-blue-50': isActive }"
  >
    <td class="py-4 px-4">
      <div class="flex items-center space-x-3">
        <i 
          :class="[
            'fas',
            palette.isDefault ? 'fa-palette' : 'fa-swatchbook'
          ]"
          :style="{ color: 'var(--color-text)' }"
        ></i>
        <div>
          <p class="font-medium text-stone-900">{{ palette.name }}</p>
          <p class="text-xs text-stone-500">
            {{ palette.isDefault ? 'Paleta predefinida' : 'Paleta personalizada' }}
          </p>
        </div>
      </div>
    </td>
    <td class="py-4 px-4">
      <div class="flex items-center space-x-2">
        <div class="w-6 h-6 rounded-full border border-stone-200" :style="{ backgroundColor: palette.colorPrimary }"></div>
        <div class="w-6 h-6 rounded-full border border-stone-200" :style="{ backgroundColor: palette.colorSecondary }"></div>
        <div class="w-6 h-6 rounded-full border border-stone-200" :style="{ backgroundColor: palette.colorAccent }"></div>
        <div class="w-6 h-6 rounded-full border border-stone-200" :style="{ backgroundColor: palette.colorText }"></div>
        <div class="w-6 h-6 rounded-full border border-stone-200" :style="{ backgroundColor: palette.backgroundNeutral }"></div>
      </div>
    </td>
    <td class="py-4 px-4">
      <div class="flex items-center space-x-2">
        <i 
          v-if="isActive" 
          class="fas fa-check-circle text-green-500"
        ></i>
        <span 
          :class="[
            'text-sm font-medium',
            isActive ? 'text-green-600' : 'text-stone-500'
          ]"
        >
          {{ isActive ? 'Activa' : 'Inactiva' }}
        </span>
      </div>
    </td>
    <td class="py-4 px-4">
      <div class="flex justify-center space-x-2">
        <button
          @click="$emit('select-palette', palette)"
          :disabled="isActive"
          :class="[
            'px-3 py-1 rounded text-xs font-medium transition-colors',
            isActive
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-blue-500 text-white hover:bg-blue-600'
          ]"
        >
          <i class="fas fa-check mr-1"></i>
          {{ isActive ? 'Activa' : 'Aplicar' }}
        </button>
        <button
          v-if="!palette.isDefault"
          @click="$emit('open-rename-modal', palette)"
          class="px-3 py-1 bg-stone-500 text-white rounded text-xs font-medium hover:bg-stone-600 transition-colors"
        >
          <i class="fas fa-edit mr-1"></i>
          Renombrar
        </button>
        <button
          v-if="!palette.isDefault"
          @click="$emit('confirm-delete-palette', palette)"
          class="px-3 py-1 bg-red-500 text-white rounded text-xs font-medium hover:bg-red-600 transition-colors"
        >
          <i class="fas fa-trash mr-1"></i>
          Eliminar
        </button>
        <span
          v-if="palette.isDefault"
          class="px-3 py-1 bg-gray-100 text-gray-500 rounded text-xs font-medium cursor-not-allowed"
        >
          <i class="fas fa-lock mr-1"></i>
          Predefinida
        </span>
      </div>
    </td>
  </tr>
</template>

<script>
export default {
  props: {
    palette: {
      type: Object,
      required: true
    },
    isActive: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
/* Puedes mover los estilos específicos de la fila aquí si lo deseas */
</style>