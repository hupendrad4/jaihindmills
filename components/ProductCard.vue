<template>
  <div class="card-product group" @click="navigateToProduct">
    <!-- Image -->
    <div class="relative img-zoom aspect-[3/4] bg-gray-50">
      <img
        :src="product.images[0]"
        :alt="product.name"
        class="w-full h-full object-cover"
        loading="lazy"
      />

      <!-- Badge -->
      <span v-if="product.badge" :class="[
        'absolute top-3 left-3 text-xs font-bold px-2.5 py-1 rounded-full',
        product.badge === 'New' ? 'badge-new' :
        product.badge === 'Best' ? 'badge-best' :
        'badge-sale'
      ]">{{ product.badge }}</span>

      <!-- Discount -->
      <span v-if="product.discount >= 30 && !product.badge"
        class="absolute top-3 left-3 bg-crimson text-white text-xs font-bold px-2.5 py-1 rounded-full">
        -{{ product.discount }}%
      </span>

      <!-- Wishlist Button -->
      <button
        @click.stop="toggleWishlist"
        :class="[
          'absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center shadow-md transition-all duration-200',
          inWishlist ? 'bg-crimson text-white' : 'bg-white/90 text-gray-400 hover:text-crimson hover:bg-white'
        ]"
      >
        <svg class="w-4 h-4" :fill="inWishlist ? 'currentColor' : 'none'" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
        </svg>
      </button>

      <!-- Quick Add on hover -->
      <div class="absolute bottom-0 left-0 right-0 bg-primary/90 text-white text-xs font-semibold py-2.5 text-center
        translate-y-full group-hover:translate-y-0 transition-transform duration-300">
        Quick View
      </div>
    </div>

    <!-- Details -->
    <div class="p-3.5">
      <!-- Category -->
      <p class="text-gold text-xs font-medium mb-1 truncate">{{ product.fabric }} · {{ product.origin }}</p>

      <!-- Name -->
      <h3 class="font-serif font-semibold text-gray-800 text-sm leading-snug mb-2 line-clamp-2 group-hover:text-primary transition-colors">
        {{ product.name }}
      </h3>

      <!-- Rating -->
      <div class="flex items-center gap-1.5 mb-2">
        <div class="flex gap-0.5">
          <span v-for="i in 5" :key="i" :class="['text-xs', i <= Math.round(product.rating) ? 'text-gold' : 'text-gray-200']">★</span>
        </div>
        <span class="text-gray-400 text-xs">({{ product.reviews }})</span>
      </div>

      <!-- Price -->
      <div class="flex items-center gap-2 mb-3">
        <span class="font-bold text-primary text-base">₹{{ product.price.toLocaleString('en-IN') }}</span>
        <span class="text-gray-400 text-xs line-through">₹{{ product.originalPrice.toLocaleString('en-IN') }}</span>
        <span class="text-green-600 text-xs font-semibold">{{ product.discount }}% off</span>
      </div>

      <!-- Color Swatches -->
      <div class="flex items-center gap-1.5 mb-3">
        <span
          v-for="color in product.colors.slice(0, 5)"
          :key="color.hex"
          :style="{ backgroundColor: color.hex }"
          :title="color.name"
          class="w-4 h-4 rounded-full border border-gray-200 cursor-pointer hover:scale-125 transition-transform"
        ></span>
        <span v-if="product.colors.length > 5" class="text-gray-400 text-xs">+{{ product.colors.length - 5 }}</span>
      </div>

      <!-- Buttons -->
      <div class="flex gap-2">
        <button
          @click.stop="addToCart"
          class="flex-1 bg-crimson hover:bg-crimson-dark text-white text-xs font-semibold py-2.5 rounded-lg transition-colors duration-200 active:scale-95"
        >
          {{ inCart ? '✓ Added' : 'Add to Cart' }}
        </button>
        <button
          @click.stop="navigateToProduct"
          class="flex-1 border border-primary text-primary hover:bg-primary hover:text-white text-xs font-semibold py-2.5 rounded-lg transition-colors duration-200"
        >
          View Details
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Product } from '~/data/products'
import { useCartStore } from '~/stores/cart'
import { useWishlistStore } from '~/stores/wishlist'
import { useToastStore } from '~/stores/toast'

const props = defineProps<{ product: Product }>()

const router = useRouter()
const cartStore = useCartStore()
const wishlistStore = useWishlistStore()
const toast = useToastStore()

const inCart = computed(() => cartStore.isInCart(props.product.id))
const inWishlist = computed(() => wishlistStore.isInWishlist(props.product.id))

const navigateToProduct = () => {
  router.push(`/product/${props.product.id}`)
}

const addToCart = () => {
  cartStore.addItem(props.product)
  toast.success(`${props.product.name} added to cart!`)
}

const toggleWishlist = () => {
  const added = wishlistStore.toggleItem(props.product)
  toast[added ? 'success' : 'info'](
    added ? 'Added to wishlist!' : 'Removed from wishlist'
  )
}
</script>
