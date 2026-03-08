<template>
  <!-- Full-page with dark teal paisley background (Image 5 reference) -->
  <div class="min-h-screen bg-teal-dark relative flex items-center justify-center px-4 py-10 overflow-hidden">
    <!-- Paisley background pattern -->
    <div class="absolute inset-0 overflow-hidden">
      <!-- Large decorative circles / paisley motifs -->
      <div class="absolute -top-32 -left-32 w-96 h-96 border-4 border-gold/15 rounded-full"></div>
      <div class="absolute -top-16 -left-16 w-64 h-64 border-2 border-gold/10 rounded-full"></div>
      <div class="absolute -bottom-32 -right-32 w-96 h-96 border-4 border-gold/15 rounded-full"></div>
      <div class="absolute top-1/4 right-8 w-40 h-40 border-2 border-gold/10 rounded-full"></div>

      <!-- Gold mandala decorative SVG -->
      <svg class="absolute top-10 right-10 w-48 h-48 text-gold/20 fill-current" viewBox="0 0 200 200">
        <circle cx="100" cy="100" r="90" stroke="currentColor" stroke-width="2" fill="none"/>
        <circle cx="100" cy="100" r="70" stroke="currentColor" stroke-width="1.5" fill="none"/>
        <circle cx="100" cy="100" r="50" stroke="currentColor" stroke-width="1" fill="none"/>
        <circle cx="100" cy="100" r="30" stroke="currentColor" stroke-width="1" fill="none"/>
        <line x1="100" y1="10" x2="100" y2="190" stroke="currentColor" stroke-width="0.5"/>
        <line x1="10" y1="100" x2="190" y2="100" stroke="currentColor" stroke-width="0.5"/>
        <line x1="36" y1="36" x2="164" y2="164" stroke="currentColor" stroke-width="0.5"/>
        <line x1="164" y1="36" x2="36" y2="164" stroke="currentColor" stroke-width="0.5"/>
      </svg>
      <svg class="absolute bottom-10 left-10 w-48 h-48 text-gold/20 fill-current" viewBox="0 0 200 200">
        <circle cx="100" cy="100" r="90" stroke="currentColor" stroke-width="2" fill="none"/>
        <circle cx="100" cy="100" r="65" stroke="currentColor" stroke-width="1.5" fill="none"/>
        <circle cx="100" cy="100" r="40" stroke="currentColor" stroke-width="1" fill="none"/>
        <line x1="100" y1="10" x2="100" y2="190" stroke="currentColor" stroke-width="0.5"/>
        <line x1="10" y1="100" x2="190" y2="100" stroke="currentColor" stroke-width="0.5"/>
      </svg>

      <!-- Center paisley -->
      <div class="absolute top-8 left-1/2 -translate-x-1/2 text-gold/10 text-9xl font-serif">✦</div>
    </div>

    <!-- Auth Card -->
    <div class="relative z-10 w-full max-w-md">
      <!-- Logo above card -->
      <div class="text-center mb-6">
        <NuxtLink to="/" class="inline-flex items-center gap-2">
          <div class="w-12 h-12 bg-gold rounded-full flex items-center justify-center font-serif font-bold text-xl text-white">J</div>
          <span class="font-serif text-2xl font-bold text-white">Jaihind<span class="text-gold">Mill</span></span>
        </NuxtLink>
      </div>

      <div class="bg-white rounded-2xl shadow-2xl overflow-hidden">
        <!-- Tab Switcher -->
        <div class="flex">
          <button
            @click="mode = 'login'"
            :class="[
              'flex-1 py-4 font-semibold text-sm transition-all duration-200',
              mode === 'login' ? 'bg-crimson text-white' : 'text-gray-500 hover:text-gray-700'
            ]"
          >Login</button>
          <button
            @click="mode = 'register'"
            :class="[
              'flex-1 py-4 font-semibold text-sm transition-all duration-200',
              mode === 'register' ? 'bg-crimson text-white' : 'text-gray-500 hover:text-gray-700'
            ]"
          >Register</button>
        </div>

        <div class="p-6 lg:p-8">
          <!-- Title -->
          <p class="text-gray-500 text-sm text-center mb-6">
            {{ mode === 'login' ? 'Welcome back! Sign in to your account' : 'Create your JaihindMill account' }}
          </p>

          <!-- Form -->
          <form @submit.prevent="handleSubmit" class="space-y-4">
            <!-- Name (Register only) -->
            <div v-if="mode === 'register'">
              <label class="form-label">Full Name</label>
              <div class="relative">
                <input v-model="form.name" type="text" placeholder="Your full name" class="form-input pl-10" required />
                <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">👤</span>
              </div>
            </div>

            <!-- Email -->
            <div>
              <label class="form-label">Email {{ mode === 'login' ? '@ JaihindMill' : '' }}</label>
              <div class="relative">
                <input v-model="form.email" type="email" :placeholder="mode === 'login' ? 'Email @ JaihindMill' : 'your@email.com'" class="form-input pl-10" required />
                <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">✉</span>
              </div>
            </div>

            <!-- Password -->
            <div>
              <label class="form-label">Password</label>
              <div class="relative">
                <input v-model="form.password" :type="showPassword ? 'text' : 'password'" placeholder="••••••••" class="form-input pl-10 pr-10" required />
                <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔒</span>
                <button type="button" @click="showPassword = !showPassword" class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs">
                  {{ showPassword ? 'Hide' : 'Show' }}
                </button>
              </div>
            </div>

            <!-- Confirm Password (Register) -->
            <div v-if="mode === 'register'">
              <label class="form-label">Confirm Password</label>
              <div class="relative">
                <input v-model="form.confirmPassword" :type="showPassword ? 'text' : 'password'" placeholder="••••••••" class="form-input pl-10" required />
                <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔒</span>
              </div>
            </div>

            <!-- Forgot Password (Login) -->
            <div v-if="mode === 'login'" class="text-right">
              <a href="#" class="text-teal text-xs hover:underline">Forgot password?</a>
            </div>

            <!-- Error -->
            <p v-if="error" class="text-crimson text-sm bg-red-50 border border-red-100 rounded-lg px-3 py-2">{{ error }}</p>

            <!-- Submit CTA -->
            <button type="submit" :disabled="loading" class="w-full bg-crimson hover:bg-crimson-dark text-white font-bold py-3.5 rounded-xl transition-colors disabled:opacity-60 text-sm">
              <span v-if="loading">{{ mode === 'login' ? 'Logging in...' : 'Creating account...' }}</span>
              <span v-else>{{ mode === 'login' ? 'Login to JaihindMill' : 'Create Account' }}</span>
            </button>

            <!-- Clerk SSO Button -->
            <button type="button" class="w-full bg-teal hover:bg-teal-light text-white font-semibold py-3.5 rounded-xl transition-colors text-sm flex items-center justify-center gap-2">
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10"/></svg>
              Continue with Clerk SSO
            </button>

            <!-- Social Divider -->
            <div class="flex items-center gap-3">
              <hr class="flex-1 border-gray-200" />
              <span class="text-gray-400 text-xs">or continue with</span>
              <hr class="flex-1 border-gray-200" />
            </div>

            <!-- Social Buttons -->
            <div class="grid grid-cols-2 gap-3">
              <button type="button" class="flex items-center gap-2 justify-center border border-gray-200 hover:border-gray-300 rounded-xl py-3 text-sm font-medium text-gray-700 transition-colors">
                <svg class="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue with Google
              </button>
              <button type="button" class="flex items-center gap-2 justify-center border border-gray-200 hover:border-gray-300 rounded-xl py-3 text-sm font-medium text-gray-700 transition-colors">
                <svg class="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Continue with Facebook
              </button>
            </div>
          </form>
        </div>

        <!-- Footer links -->
        <div class="bg-gray-50 border-t border-gray-100 py-3 px-6 flex justify-center gap-6 text-xs text-gray-400">
          <a href="#" class="hover:text-gray-600">Privacy</a>
          <a href="#" class="hover:text-gray-600">Terms</a>
          <a href="#" class="hover:text-gray-600">Help</a>
        </div>
      </div>

      <p class="text-center text-teal-light/60 text-xs mt-4">
        Protected by Clerk Authentication
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: false }) // No header/footer on auth page

useHead({ title: 'Login — JaihindMill' })

const mode = ref<'login' | 'register'>('login')
const loading = ref(false)
const error = ref('')
const showPassword = ref(false)

const form = reactive({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
})

const handleSubmit = async () => {
  error.value = ''

  if (mode.value === 'register') {
    if (!form.name.trim()) { error.value = 'Please enter your name'; return }
    if (form.password !== form.confirmPassword) { error.value = 'Passwords do not match'; return }
    if (form.password.length < 6) { error.value = 'Password must be at least 6 characters'; return }
  }

  loading.value = true
  await new Promise(r => setTimeout(r, 1500)) // Simulate API

  // In production: integrate Clerk authentication here
  loading.value = false
  navigateTo('/')
}
</script>
