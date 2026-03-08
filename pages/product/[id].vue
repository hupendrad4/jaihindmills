<template>
  <div v-if="product" class="min-h-screen bg-cream">
    <!-- Breadcrumb -->
    <div class="bg-white border-b border-gray-100 px-4 py-2.5">
      <div class="max-w-7xl mx-auto flex items-center gap-2 text-xs text-gray-500">
        <NuxtLink to="/" class="hover:text-primary">Home</NuxtLink>
        <span>›</span>
        <NuxtLink to="/shop" class="hover:text-primary">Shop</NuxtLink>
        <span>›</span>
        <span class="text-primary font-medium truncate max-w-48">{{ product.name }}</span>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 lg:px-6 py-8 lg:py-12">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14">

        <!-- Left: Image Gallery -->
        <div class="space-y-4">
          <!-- Main Image -->
          <div class="aspect-[3/4] rounded-2xl overflow-hidden bg-white shadow-card relative group">
            <img
              :src="product.images[activeImageIndex]"
              :alt="product.name"
              class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <!-- Nav arrows -->
            <button
              v-if="product.images.length > 1"
              @click="prevImage"
              class="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity"
            >‹</button>
            <button
              v-if="product.images.length > 1"
              @click="nextImage"
              class="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity"
            >›</button>

            <!-- Badge -->
            <span v-if="product.badge" :class="[
              'absolute top-4 left-4 text-sm font-bold px-3 py-1.5 rounded-full',
              product.badge === 'New' ? 'badge-new' : product.badge === 'Best' ? 'badge-best' : 'badge-sale'
            ]">{{ product.badge }}</span>
          </div>

          <!-- Thumbnails -->
          <div v-if="product.images.length > 1" class="flex gap-3">
            <button
              v-for="(img, i) in product.images"
              :key="i"
              @click="activeImageIndex = i"
              :class="[
                'flex-1 aspect-square rounded-xl overflow-hidden border-2 transition-all duration-200',
                i === activeImageIndex ? 'border-primary shadow-md' : 'border-transparent hover:border-gray-300'
              ]"
            >
              <img :src="img" :alt="`${product.name} ${i+1}`" class="w-full h-full object-cover" />
            </button>
          </div>
        </div>

        <!-- Right: Product Details -->
        <div>
          <!-- Sub-category tag -->
          <p class="text-gold text-sm font-semibold mb-2 uppercase tracking-wide">{{ product.subcategory }}</p>

          <!-- Name -->
          <h1 class="font-serif text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-3">{{ product.name }}</h1>

          <!-- Rating -->
          <div class="flex items-center gap-3 mb-4">
            <div class="flex gap-0.5">
              <span v-for="i in 5" :key="i" :class="['text-lg', i <= Math.round(product.rating) ? 'text-gold' : 'text-gray-200']">★</span>
            </div>
            <span class="font-semibold text-gray-700">{{ product.rating }}</span>
            <span class="text-gray-400 text-sm">({{ product.reviews }} reviews)</span>
            <span class="text-green-600 text-sm font-medium">In Stock</span>
          </div>

          <!-- Tags -->
          <div class="flex flex-wrap gap-2 mb-5">
            <span v-for="tag in ['Fabric', 'Weave', 'Origin', 'Occasion']" :key="tag"
              class="bg-cream-dark text-gray-600 text-xs font-medium px-3 py-1.5 rounded-full border border-gray-200">
              {{ tag }}: <span class="text-primary font-semibold">{{
                tag === 'Fabric' ? product.fabric :
                tag === 'Weave' ? product.weave :
                tag === 'Origin' ? product.origin :
                product.occasion[0]
              }}</span>
            </span>
          </div>

          <!-- Price -->
          <div class="bg-white rounded-xl p-4 mb-5 shadow-card">
            <div class="flex items-center gap-3 mb-1">
              <span class="font-serif text-3xl font-bold text-primary">₹{{ product.price.toLocaleString('en-IN') }}</span>
              <span class="text-gray-400 text-lg line-through">₹{{ product.originalPrice.toLocaleString('en-IN') }}</span>
              <span class="bg-green-100 text-green-700 text-sm font-bold px-2.5 py-1 rounded-full">{{ product.discount }}% OFF</span>
            </div>
            <p class="text-gray-500 text-xs">Inclusive of all taxes · Free shipping on this order</p>
          </div>

          <!-- Color Selection -->
          <div class="mb-5">
            <p class="text-sm font-semibold text-gray-700 mb-2.5">
              Color: <span class="text-primary font-bold">{{ selectedColor }}</span>
            </p>
            <div class="flex gap-3">
              <button
                v-for="color in product.colors"
                :key="color.hex"
                @click="selectedColor = color.name"
                :title="color.name"
                :style="{ backgroundColor: color.hex }"
                :class="[
                  'w-9 h-9 rounded-full border-4 transition-all duration-200 hover:scale-110',
                  selectedColor === color.name
                    ? 'border-primary ring-2 ring-primary ring-offset-2 scale-110'
                    : 'border-gray-100 hover:border-gray-300'
                ]"
              ></button>
            </div>
          </div>

          <!-- Quantity -->
          <div class="mb-6">
            <p class="text-sm font-semibold text-gray-700 mb-2.5">Quantity:</p>
            <div class="flex items-center gap-3">
              <div class="flex items-center border border-gray-200 rounded-xl overflow-hidden">
                <button @click="qty = Math.max(1, qty - 1)" class="w-10 h-10 flex items-center justify-center hover:bg-gray-50 text-gray-600 text-lg transition-colors">−</button>
                <span class="w-12 text-center font-semibold text-gray-800">{{ qty }}</span>
                <button @click="qty++" class="w-10 h-10 flex items-center justify-center hover:bg-gray-50 text-gray-600 text-lg transition-colors">+</button>
              </div>
              <span class="text-gray-500 text-sm">Only a few left!</span>
            </div>
          </div>

          <!-- CTA Buttons -->
          <div class="flex gap-3 mb-6">
            <button @click="addToCart" class="flex-1 btn-gold py-3.5 text-base justify-center">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
              </svg>
              {{ inCart ? 'Added to Cart ✓' : 'Add to Cart' }}
            </button>
            <button @click="toggleWishlist" :class="[
              'flex items-center gap-2 px-5 py-3.5 rounded-md font-semibold border-2 transition-all duration-200',
              inWishlist
                ? 'bg-crimson border-crimson text-white'
                : 'border-gray-300 text-gray-600 hover:border-crimson hover:text-crimson'
            ]">
              <svg class="w-5 h-5" :fill="inWishlist ? 'currentColor' : 'none'" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
              </svg>
              <span class="hidden sm:inline">{{ inWishlist ? 'Wishlisted' : 'Wishlist' }}</span>
            </button>
          </div>

          <!-- Buy Now -->
          <NuxtLink to="/checkout" @click="addToCart" class="w-full btn-primary py-3.5 text-base justify-center flex mb-6">
            Buy Now — ₹{{ (product.price * qty).toLocaleString('en-IN') }}
          </NuxtLink>

          <!-- Trust Badges -->
          <div class="grid grid-cols-3 gap-3 mb-6">
            <div v-for="trust in trustBadges" :key="trust.label" class="bg-cream rounded-xl p-3 text-center">
              <div class="text-xl mb-1">{{ trust.icon }}</div>
              <p class="text-xs font-medium text-gray-600">{{ trust.label }}</p>
            </div>
          </div>

          <!-- Description -->
          <div class="border-t border-gray-100 pt-5">
            <h3 class="font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <span class="text-gold">✦</span> Product Details
            </h3>
            <p class="text-gray-600 text-sm leading-relaxed mb-4">{{ product.description }}</p>
            <ul class="space-y-2">
              <li v-for="detail in product.details" :key="detail" class="flex items-start gap-2 text-sm text-gray-600">
                <span class="text-gold mt-0.5 flex-shrink-0">•</span>
                {{ detail }}
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Related Products -->
      <div class="mt-16">
        <h2 class="section-title mb-1">You May Also Like</h2>
        <p class="section-subtitle mb-3">More beautiful sarees curated for you</p>
        <div class="divider-gold"></div>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-5 lg:gap-6 mt-6">
          <ProductCard v-for="p in relatedProducts" :key="p.id" :product="p" />
        </div>
      </div>
    </div>
  </div>

  <!-- Not Found -->
  <div v-else class="min-h-screen flex items-center justify-center">
    <div class="text-center">
      <p class="text-6xl mb-4">😔</p>
      <h2 class="font-serif text-2xl font-bold text-primary mb-3">Product not found</h2>
      <NuxtLink to="/shop" class="btn-primary">Back to Shop</NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getProductById, getRelatedProducts } from '~/data/products'
import { useCartStore } from '~/stores/cart'
import { useWishlistStore } from '~/stores/wishlist'
import { useToastStore } from '~/stores/toast'

const route = useRoute()
const cartStore = useCartStore()
const wishlistStore = useWishlistStore()
const toast = useToastStore()

const product = computed(() => getProductById(route.params.id as string))
const relatedProducts = computed(() => product.value ? getRelatedProducts(product.value) : [])

const activeImageIndex = ref(0)
const selectedColor = ref('')
const qty = ref(1)

watch(product, (p) => {
  if (p) selectedColor.value = p.colors[0]?.name ?? ''
}, { immediate: true })

useHead(() => ({
  title: product.value ? `${product.value.name} — JaihindMill` : 'Product — JaihindMill',
  meta: [{
    name: 'description',
    content: product.value?.description ?? ''
  }]
}))

const inCart = computed(() => product.value ? cartStore.isInCart(product.value.id) : false)
const inWishlist = computed(() => product.value ? wishlistStore.isInWishlist(product.value.id) : false)

const prevImage = () => {
  if (product.value) {
    activeImageIndex.value = activeImageIndex.value === 0 ? product.value.images.length - 1 : activeImageIndex.value - 1
  }
}

const nextImage = () => {
  if (product.value) {
    activeImageIndex.value = (activeImageIndex.value + 1) % product.value.images.length
  }
}

const addToCart = () => {
  if (product.value) {
    cartStore.addItem(product.value, qty.value, selectedColor.value)
    toast.success('Added to cart!')
  }
}

const toggleWishlist = () => {
  if (product.value) {
    const added = wishlistStore.toggleItem(product.value)
    toast[added ? 'success' : 'info'](added ? 'Added to wishlist!' : 'Removed from wishlist')
  }
}

const trustBadges = [
  { icon: '🔒', label: 'Secure Payment' },
  { icon: '🚚', label: 'Free Shipping' },
  { icon: '↩', label: '7-Day Returns' },
]
</script>
