<template>
  <div class="min-h-screen bg-primary flex items-center justify-center p-4 mandala-bg">
    <div class="w-full max-w-md">
      <!-- Logo -->
      <div class="text-center mb-8">
        <div class="w-16 h-16 bg-gold rounded-full flex items-center justify-center font-serif font-bold text-2xl text-white mx-auto mb-4">J</div>
        <h1 class="font-serif text-3xl font-bold text-white">JaihindMill</h1>
        <p class="text-white/50 text-sm mt-1">Admin Panel</p>
      </div>

      <!-- Card -->
      <div class="bg-white rounded-2xl shadow-2xl p-8">
        <h2 class="font-serif text-2xl font-bold text-primary mb-2">Welcome back</h2>
        <p class="text-gray-400 text-sm mb-6">Sign in to manage your store</p>

        <form @submit.prevent="handleLogin" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
            <div class="relative">
              <input
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="Enter admin password"
                class="w-full border border-gray-200 rounded-xl px-4 py-3 pr-12 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-colors"
                required
              />
              <button type="button" @click="showPassword = !showPassword"
                class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                {{ showPassword ? '🙈' : '👁️' }}
              </button>
            </div>
          </div>

          <div v-if="error" class="bg-red-50 border border-red-200 rounded-xl px-4 py-3 flex items-center gap-2">
            <span class="text-red-500 text-sm">⚠️ {{ error }}</span>
          </div>

          <button
            type="submit"
            :disabled="loading"
            class="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3.5 rounded-xl transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <span v-if="loading" class="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            {{ loading ? 'Signing in...' : 'Sign In' }}
          </button>
        </form>

        <div class="mt-6 pt-6 border-t border-gray-100 text-center">
          <p class="text-xs text-gray-400">Protected admin area · JaihindMill © {{ new Date().getFullYear() }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: false })

import { useAdminStore } from '~/stores/admin'

const adminStore = useAdminStore()
const password = ref('')
const showPassword = ref(false)
const loading = ref(false)
const error = ref('')

const handleLogin = async () => {
  loading.value = true
  error.value = ''
  await new Promise(r => setTimeout(r, 600))
  const ok = adminStore.login(password.value)
  if (ok) {
    navigateTo('/admin')
  } else {
    error.value = 'Incorrect password. Please try again.'
    password.value = ''
  }
  loading.value = false
}

onMounted(() => {
  if (adminStore.isAuthenticated) navigateTo('/admin')
})
</script>
