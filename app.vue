<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>

    <!-- Global Toast Notifications -->
    <Teleport to="body">
      <div class="fixed bottom-6 right-6 z-[9999] flex flex-col gap-2 pointer-events-none">
        <TransitionGroup name="toast">
          <div
            v-for="toast in toastStore.toasts"
            :key="toast.id"
            :class="[
              'pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-xl shadow-xl text-white text-sm font-medium min-w-64 max-w-sm',
              toast.type === 'success' ? 'bg-teal' :
              toast.type === 'error' ? 'bg-crimson' :
              toast.type === 'warning' ? 'bg-gold' : 'bg-primary'
            ]"
          >
            <span class="text-lg flex-shrink-0">
              {{ toast.type === 'success' ? '✓' : toast.type === 'error' ? '✕' : toast.type === 'warning' ? '⚠' : 'ℹ' }}
            </span>
            <span class="flex-1">{{ toast.message }}</span>
            <button
              @click="toastStore.remove(toast.id)"
              class="flex-shrink-0 opacity-70 hover:opacity-100 text-lg leading-none"
            >×</button>
          </div>
        </TransitionGroup>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { useToastStore } from '~/stores/toast'

const toastStore = useToastStore()
</script>
