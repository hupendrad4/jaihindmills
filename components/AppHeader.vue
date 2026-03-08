<template>
  <header class="sticky top-0 z-50">
    <!-- Top bar -->
    <div class="bg-primary-dark text-white/80 text-xs py-1.5 text-center font-sans hidden md:block">
      Free shipping on orders above ₹999 &nbsp;|&nbsp; Easy 7-day returns &nbsp;|&nbsp; Authentic Indian handloom
    </div>

    <!-- Main Header -->
    <nav class="bg-primary shadow-lg">
      <div class="max-w-7xl mx-auto px-4 lg:px-6">
        <div class="flex items-center justify-between h-16 gap-4">

          <!-- Logo -->
          <NuxtLink to="/" class="flex items-center gap-2.5 flex-shrink-0 group">
            <div class="w-9 h-9 bg-gold rounded-full flex items-center justify-center text-white font-serif font-bold text-lg group-hover:scale-105 transition-transform">
              J
            </div>
            <div class="hidden sm:block">
              <span class="font-serif text-xl font-bold text-white leading-none">Jaihind</span>
              <span class="font-serif text-xl font-bold text-gold leading-none">Mill</span>
            </div>
          </NuxtLink>

          <!-- Desktop Navigation -->
          <ul class="hidden lg:flex items-center gap-6">
            <li v-for="link in navLinks" :key="link.to">
              <NuxtLink
                :to="link.to"
                :class="['nav-link', { 'active': route.path === link.to || route.path.startsWith(link.to + '/') }]"
              >{{ link.label }}</NuxtLink>
            </li>
          </ul>

          <!-- Search + Icons -->
          <div class="flex items-center gap-2 md:gap-3">
            <!-- Desktop Search -->
            <div class="hidden md:flex items-center bg-white/10 hover:bg-white/15 rounded-lg px-3 py-1.5 gap-2 transition-colors cursor-pointer" @click="showSearch = true">
              <svg class="w-4 h-4 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
              <span class="text-white/60 text-sm font-sans w-32">Search sarees...</span>
            </div>

            <!-- Mobile Search -->
            <button class="md:hidden text-white/80 hover:text-white p-1.5" @click="showSearch = true">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
            </button>

            <!-- Wishlist -->
            <NuxtLink to="/wishlist" class="relative text-white/80 hover:text-white p-1.5 transition-colors">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
              </svg>
              <span v-if="wishlistStore.itemCount > 0"
                class="absolute -top-1 -right-1 bg-gold text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {{ wishlistStore.itemCount }}
              </span>
            </NuxtLink>

            <!-- Cart -->
            <NuxtLink to="/cart" class="relative text-white/80 hover:text-white p-1.5 transition-colors">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
              </svg>
              <span v-if="cartStore.itemCount > 0"
                class="absolute -top-1 -right-1 bg-crimson text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {{ cartStore.itemCount }}
              </span>
            </NuxtLink>

            <!-- User -->
            <NuxtLink to="/account" class="text-white/80 hover:text-white p-1.5 transition-colors">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
              </svg>
            </NuxtLink>

            <!-- Mobile Hamburger -->
            <button class="lg:hidden text-white/80 hover:text-white p-1.5 ml-1" @click="mobileMenuOpen = !mobileMenuOpen">
              <svg v-if="!mobileMenuOpen" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
              </svg>
              <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Mobile Menu -->
      <Transition name="menu">
        <div v-if="mobileMenuOpen" class="lg:hidden bg-primary-dark border-t border-white/10 px-4 py-3">
          <ul class="space-y-1">
            <li v-for="link in navLinks" :key="link.to">
              <NuxtLink
                :to="link.to"
                @click="mobileMenuOpen = false"
                class="block py-2.5 px-3 text-white/80 hover:text-white hover:bg-white/10 rounded-lg text-sm font-medium transition-colors"
              >{{ link.label }}</NuxtLink>
            </li>
          </ul>
        </div>
      </Transition>
    </nav>

    <!-- Search Modal -->
    <Transition name="fade">
      <div v-if="showSearch" class="fixed inset-0 bg-black/60 z-[100] flex items-start justify-center pt-20 px-4" @click.self="showSearch = false">
        <div class="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden">
          <div class="flex items-center gap-3 px-5 py-4 border-b border-gray-100">
            <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
            <input
              ref="searchInputRef"
              v-model="searchQuery"
              type="text"
              placeholder="Search for sarees, fabrics, occasions..."
              class="flex-1 text-base outline-none font-sans"
              @keydown.enter="doSearch"
            />
            <button @click="showSearch = false" class="text-gray-400 hover:text-gray-600 text-xl font-light">×</button>
          </div>
          <!-- Quick suggestions -->
          <div class="p-4">
            <p class="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-3">Popular Searches</p>
            <div class="flex flex-wrap gap-2">
              <button
                v-for="tag in popularSearches"
                :key="tag"
                @click="searchQuery = tag; doSearch()"
                class="bg-cream text-primary text-sm px-3 py-1.5 rounded-full hover:bg-primary hover:text-white transition-colors"
              >{{ tag }}</button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </header>
</template>

<script setup lang="ts">
import { useCartStore } from '~/stores/cart'
import { useWishlistStore } from '~/stores/wishlist'

const route = useRoute()
const router = useRouter()
const cartStore = useCartStore()
const wishlistStore = useWishlistStore()

const mobileMenuOpen = ref(false)
const showSearch = ref(false)
const searchQuery = ref('')
const searchInputRef = ref<HTMLInputElement | null>(null)

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Sarees', to: '/shop' },
  { label: 'Salwar Suits', to: '/shop/salwar-suits' },
  { label: 'Lehengas', to: '/shop/lehengas' },
  { label: 'New Arrivals', to: '/shop/new-arrivals' },
  { label: 'Offers', to: '/shop/offers' },
]

const popularSearches = [
  'Banarasi Silk', 'Kanjivaram', 'Wedding Sarees', 'Cotton Sarees',
  'Chanderi', 'Georgette', 'Tussar Silk', 'Festival Special'
]

const doSearch = () => {
  if (searchQuery.value.trim()) {
    showSearch.value = false
    router.push(`/shop?search=${encodeURIComponent(searchQuery.value.trim())}`)
    searchQuery.value = ''
  }
}

// Auto-focus search input
watch(showSearch, async (val) => {
  if (val) {
    await nextTick()
    searchInputRef.value?.focus()
  }
})

// Close mobile menu on route change
watch(() => route.path, () => {
  mobileMenuOpen.value = false
})
</script>
