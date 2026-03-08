<template>
  <div class="min-h-screen bg-cream">
    <!-- Header Banner -->
    <div class="bg-primary py-10 px-4 mandala-bg">
      <div class="max-w-7xl mx-auto text-center">
        <h1 class="font-serif text-4xl font-bold text-white mb-1">My Wishlist</h1>
        <p class="text-white/60 text-sm">{{ wishlistStore.itemCount }} saved items</p>
      </div>
    </div>

    <!-- Filter Tags (like Image 4) -->
    <div class="bg-white border-b border-gray-100 px-4 py-3">
      <div class="max-w-7xl mx-auto flex items-center gap-3 flex-wrap">
        <button
          v-for="filter in quickFilters"
          :key="filter"
          @click="activeFilter === filter ? activeFilter = '' : activeFilter = filter"
          :class="[
            'px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200',
            activeFilter === filter
              ? 'bg-teal text-white'
              : 'bg-cream-dark text-gray-600 hover:bg-cream-darker'
          ]"
        >{{ filter }}</button>
        <button v-if="activeFilter" @click="activeFilter = ''" class="text-crimson text-sm hover:underline">
          Remove Filter ✕
        </button>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 lg:px-6 py-8">

      <!-- Empty Wishlist -->
      <div v-if="wishlistStore.items.length === 0" class="text-center py-24">
        <div class="text-7xl mb-4">♡</div>
        <h2 class="font-serif text-2xl font-bold text-gray-700 mb-3">Your wishlist is empty</h2>
        <p class="text-gray-500 mb-6">Save sarees you love and come back to them later</p>
        <NuxtLink to="/shop" class="btn-primary">Explore Sarees</NuxtLink>
      </div>

      <!-- Wishlist Grid -->
      <div v-else>
        <div class="flex items-center justify-between mb-5">
          <p class="text-sm text-gray-500">{{ filteredItems.length }} items</p>
          <button @click="wishlistStore.clearWishlist()" class="text-crimson text-sm hover:underline">Clear All</button>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          <div v-for="product in filteredItems" :key="product.id" class="card-product group relative">
            <!-- Image -->
            <div class="relative img-zoom aspect-[3/4]">
              <img :src="product.images[0]" :alt="product.name" class="w-full h-full object-cover" loading="lazy" />

              <!-- Wishlist Remove -->
              <button
                @click="wishlistStore.removeItem(product.id)"
                class="absolute top-3 right-3 w-8 h-8 bg-crimson text-white rounded-full flex items-center justify-center shadow hover:bg-crimson-dark transition-colors"
                title="Remove from wishlist"
              >
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                </svg>
              </button>

              <span v-if="product.badge" :class="[
                'absolute top-3 left-3 text-xs font-bold px-2.5 py-1 rounded-full',
                product.badge === 'New' ? 'badge-new' : product.badge === 'Best' ? 'badge-best' : 'badge-sale'
              ]">{{ product.badge }}</span>
            </div>

            <!-- Details -->
            <div class="p-3.5">
              <p class="text-gold text-xs mb-1">{{ product.fabric }}</p>
              <NuxtLink :to="`/product/${product.id}`" class="font-serif font-semibold text-sm text-gray-800 hover:text-primary block mb-2 line-clamp-2 transition-colors">
                {{ product.name }}
              </NuxtLink>

              <!-- Rating -->
              <div class="flex items-center gap-1 mb-2">
                <span v-for="i in 5" :key="i" :class="['text-xs', i <= Math.round(product.rating) ? 'text-gold' : 'text-gray-200']">★</span>
                <span class="text-gray-400 text-xs">({{ product.reviews }})</span>
              </div>

              <!-- Price -->
              <div class="flex items-center gap-2 mb-3">
                <span class="font-bold text-primary">₹{{ product.price.toLocaleString('en-IN') }}</span>
                <span class="text-gray-400 text-xs line-through">₹{{ product.originalPrice.toLocaleString('en-IN') }}</span>
              </div>

              <!-- Actions -->
              <div class="flex gap-2">
                <button
                  @click="moveToCart(product)"
                  class="flex-1 bg-teal hover:bg-teal-dark text-white text-xs font-semibold py-2.5 rounded-lg transition-colors"
                >
                  Add to Cart
                </button>
                <button
                  @click="wishlistStore.removeItem(product.id)"
                  class="border border-gray-200 hover:border-crimson text-gray-400 hover:text-crimson text-xs font-semibold px-3 py-2.5 rounded-lg transition-colors"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- CTA -->
        <div class="text-center mt-10">
          <NuxtLink to="/shop" class="btn-outline">Continue Shopping →</NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useWishlistStore } from '~/stores/wishlist'
import { useCartStore } from '~/stores/cart'
import { useToastStore } from '~/stores/toast'
import type { Product } from '~/data/products'

useHead({ title: 'My Wishlist — JaihindMill' })

const wishlistStore = useWishlistStore()
const cartStore = useCartStore()
const toast = useToastStore()

const activeFilter = ref('')

const quickFilters = ['Silk', 'Cotton', 'Banarasi', 'Wedding', 'New Arrivals', 'Best Sellers']

const filteredItems = computed(() => {
  if (!activeFilter.value) return wishlistStore.items
  const f = activeFilter.value.toLowerCase()
  return wishlistStore.items.filter(p =>
    p.fabric.toLowerCase().includes(f) ||
    p.subcategory.toLowerCase().includes(f) ||
    p.occasion.some(o => o.toLowerCase().includes(f)) ||
    (f === 'new arrivals' && p.isNew) ||
    (f === 'best sellers' && p.isBestSeller)
  )
})

const moveToCart = (product: Product) => {
  cartStore.addItem(product)
  toast.success(`${product.name} added to cart!`)
}
</script>
