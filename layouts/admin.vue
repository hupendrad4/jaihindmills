<template>
  <div class="min-h-screen bg-gray-50">

    <!-- Mobile overlay backdrop -->
    <Transition name="fade">
      <div
        v-if="sidebarOpen && isMobile"
        class="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm"
        @click="sidebarOpen = false"
      ></div>
    </Transition>

    <!-- Sidebar -->
    <aside :class="[
      'fixed inset-y-0 left-0 z-40 flex flex-col bg-primary transition-all duration-300 overflow-hidden',
      sidebarOpen ? 'w-60' : 'w-0 md:w-16'
    ]">
      <!-- Logo -->
      <div class="flex items-center gap-3 px-4 py-4 border-b border-white/10 flex-shrink-0 min-w-[240px] md:min-w-0">
        <div class="w-8 h-8 bg-gold rounded-full flex items-center justify-center font-serif font-bold text-white flex-shrink-0">J</div>
        <div :class="['overflow-hidden transition-all duration-300', sidebarOpen ? 'opacity-100 w-auto' : 'opacity-0 w-0 md:hidden']">
          <p class="font-serif font-bold text-white text-sm leading-none whitespace-nowrap">JaihindMill</p>
          <p class="text-white/40 text-xs whitespace-nowrap">Admin Panel</p>
        </div>
      </div>

      <!-- Nav Links -->
      <nav class="flex-1 py-4 overflow-y-auto overflow-x-hidden">
        <NuxtLink
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          @click="isMobile && (sidebarOpen = false)"
          :class="[
            'flex items-center gap-3 px-4 py-3 mx-2 rounded-xl transition-all duration-200 group relative',
            isActive(item.to) ? 'bg-white/15 text-white' : 'text-white/60 hover:bg-white/10 hover:text-white'
          ]"
        >
          <!-- Active indicator -->
          <div v-if="isActive(item.to)" class="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-gold rounded-r-full"></div>
          <span class="text-xl flex-shrink-0 w-6 text-center">{{ item.icon }}</span>
          <span :class="['text-sm font-medium whitespace-nowrap transition-all duration-300 overflow-hidden', sidebarOpen ? 'opacity-100 max-w-xs' : 'opacity-0 max-w-0']">{{ item.label }}</span>
          <!-- Badge -->
          <span v-if="sidebarOpen && item.badge" class="ml-auto bg-crimson text-white text-xs px-1.5 py-0.5 rounded-full flex-shrink-0">{{ item.badge }}</span>
          <!-- Tooltip when collapsed (desktop only) -->
          <div v-if="!sidebarOpen" class="hidden md:block absolute left-full ml-3 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
            {{ item.label }}
          </div>
        </NuxtLink>
      </nav>

      <!-- User + Logout -->
      <div class="border-t border-white/10 p-3 flex-shrink-0">
        <button @click="adminStore.logout" class="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-white/50 hover:text-white hover:bg-white/10 transition-all">
          <span class="text-lg flex-shrink-0 w-6 text-center">🚪</span>
          <span :class="['text-sm font-medium whitespace-nowrap transition-all duration-300 overflow-hidden', sidebarOpen ? 'opacity-100 max-w-xs' : 'opacity-0 max-w-0']">Logout</span>
        </button>
      </div>
    </aside>

    <!-- Main area — offset by sidebar width only on md+ -->
    <div :class="['flex flex-col min-h-screen transition-all duration-300', sidebarOpen ? 'md:pl-60' : 'md:pl-16']">

      <!-- Top Header -->
      <header class="sticky top-0 z-20 bg-white border-b border-gray-100 px-4 md:px-6 py-3 flex items-center justify-between gap-4 shadow-sm">
        <div class="flex items-center gap-3">
          <!-- Toggle sidebar -->
          <button @click="sidebarOpen = !sidebarOpen" class="p-2 rounded-lg hover:bg-gray-100 text-gray-500 transition-colors flex-shrink-0">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
          </button>
          <!-- Breadcrumb -->
          <div class="text-sm text-gray-500 hidden sm:flex items-center gap-1.5 min-w-0">
            <NuxtLink to="/admin" class="hover:text-primary flex-shrink-0">Admin</NuxtLink>
            <span class="flex-shrink-0">›</span>
            <span class="text-gray-800 font-medium truncate">{{ pageTitle }}</span>
          </div>
        </div>

        <div class="flex items-center gap-2 md:gap-3 flex-shrink-0">
          <!-- Live store link -->
          <a href="/" target="_blank" class="hidden lg:flex items-center gap-1.5 text-xs text-gray-500 hover:text-primary border border-gray-200 rounded-lg px-3 py-1.5 transition-colors whitespace-nowrap">
            <span>🌐</span> View Store
          </a>
          <!-- Notifications -->
          <button class="relative p-2 rounded-lg hover:bg-gray-100 text-gray-500 transition-colors">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
            </svg>
            <span class="absolute top-1.5 right-1.5 w-2 h-2 bg-crimson rounded-full"></span>
          </button>
          <!-- Admin avatar -->
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">A</div>
            <div class="hidden md:block">
              <p class="text-xs font-semibold text-gray-700 leading-tight">Admin</p>
              <p class="text-xs text-gray-400 leading-tight">JaihindMill</p>
            </div>
          </div>
        </div>
      </header>

      <!-- Page Content -->
      <main class="flex-1 p-4 md:p-6 overflow-x-hidden">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAdminStore } from '~/stores/admin'

const route = useRoute()
const adminStore = useAdminStore()
const sidebarOpen = ref(true)
const isMobile = ref(false)

const navItems = computed(() => [
  { label: 'Dashboard', to: '/admin', icon: '📊' },
  { label: 'Products', to: '/admin/products', icon: '👘', badge: adminStore.totalProducts },
  { label: 'Add Product', to: '/admin/products/add', icon: '➕' },
  { label: 'Orders', to: '/admin/orders', icon: '📦', badge: adminStore.activeOrders || undefined },
  { label: 'Analytics', to: '/admin/analytics', icon: '📈' },
  { label: 'View Store', to: '/', icon: '🌐' },
])

const isActive = (path: string) => {
  if (path === '/admin') return route.path === '/admin'
  return route.path.startsWith(path)
}

const pageTitle = computed(() => {
  const found = navItems.value.find(i => isActive(i.to))
  return found?.label || 'Admin'
})

const checkMobile = () => {
  isMobile.value = window.innerWidth < 768
  if (isMobile.value) sidebarOpen.value = false
  else sidebarOpen.value = true
}

onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
