<template>
  <div>
    <!-- Bridal-themed Hero -->
    <div class="relative bg-primary overflow-hidden min-h-72 flex items-center px-4 py-14">
      <div class="absolute inset-0 mandala-bg opacity-20"></div>
      <div class="absolute inset-0 bg-gradient-to-br from-primary via-primary to-primary-dark"></div>
      <!-- Decorative gold rings -->
      <div class="absolute -right-16 -top-16 w-72 h-72 border-4 border-gold/15 rounded-full"></div>
      <div class="absolute -right-8 -top-8 w-56 h-56 border-2 border-gold/10 rounded-full"></div>
      <div class="absolute -left-16 -bottom-16 w-72 h-72 border-4 border-gold/15 rounded-full"></div>

      <div class="relative max-w-7xl mx-auto w-full">
        <div class="max-w-xl">
          <div class="flex items-center gap-2 mb-3">
            <div class="h-px w-8 bg-gold/60"></div>
            <span class="text-gold text-xs font-semibold uppercase tracking-widest">Bridal & Festive Collection</span>
            <div class="h-px w-8 bg-gold/60"></div>
          </div>
          <h1 class="font-serif text-4xl lg:text-5xl font-bold text-white mb-3">
            Lehengas &<br/><span class="text-gold">Chaniya Choli</span>
          </h1>
          <p class="text-white/60 mb-5">Exquisite bridal lehengas, festive chaniya cholis and heavy ethnic wear. Crafted for your most special moments.</p>

          <!-- Occasion Pills -->
          <div class="flex flex-wrap gap-2">
            <button
              v-for="occ in occasions"
              :key="occ.label"
              @click="activeOccasion === occ.label ? activeOccasion = '' : activeOccasion = occ.label"
              :class="[
                'flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all border',
                activeOccasion === occ.label
                  ? 'bg-gold border-gold text-white'
                  : 'border-white/30 text-white/70 hover:border-gold hover:text-gold'
              ]"
            >
              <span>{{ occ.icon }}</span> {{ occ.label }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Breadcrumb -->
    <div class="bg-white border-b border-gray-100 px-4 py-2.5">
      <div class="max-w-7xl mx-auto flex items-center gap-2 text-xs text-gray-500">
        <NuxtLink to="/" class="hover:text-primary">Home</NuxtLink>
        <span>›</span>
        <NuxtLink to="/shop" class="hover:text-primary">Shop</NuxtLink>
        <span>›</span>
        <span class="text-primary font-medium">Lehengas</span>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 lg:px-6 py-8">

      <!-- Special Occasion Banners -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div v-for="banner in occasionBanners" :key="banner.title"
          :style="{ background: banner.gradient }"
          class="rounded-2xl p-5 text-white cursor-pointer hover:scale-[1.02] transition-transform"
          @click="activeOccasion = banner.tag"
        >
          <div class="text-3xl mb-2">{{ banner.icon }}</div>
          <h3 class="font-serif font-bold text-lg">{{ banner.title }}</h3>
          <p class="text-white/70 text-xs mt-1">{{ banner.desc }}</p>
          <span class="text-xs font-bold mt-2 block underline">Shop Now →</span>
        </div>
      </div>

      <!-- Toolbar -->
      <div class="flex items-center justify-between mb-5 flex-wrap gap-3">
        <div class="flex items-center gap-3">
          <p class="text-sm text-gray-500">
            <span class="font-semibold text-gray-800">{{ filteredProducts.length }}</span> styles
          </p>
          <span v-if="activeOccasion" class="bg-primary/10 text-primary text-xs px-3 py-1 rounded-full flex items-center gap-1">
            {{ activeOccasion }}
            <button @click="activeOccasion = ''" class="hover:text-crimson ml-1">×</button>
          </span>
        </div>
        <select v-model="sortBy" class="text-sm border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-gold bg-white">
          <option value="popularity">Most Popular</option>
          <option value="newest">Newest First</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="discount">Best Discount</option>
        </select>
      </div>

      <!-- Products Grid -->
      <div v-if="filteredProducts.length > 0" class="grid grid-cols-2 md:grid-cols-3 gap-5 lg:gap-6">
        <ProductCard v-for="product in filteredProducts" :key="product.id" :product="product" />
      </div>
      <div v-else class="text-center py-20">
        <p class="text-5xl mb-3">💃</p>
        <h3 class="font-serif text-xl font-bold text-gray-600 mb-2">No lehengas found for "{{ activeOccasion }}"</h3>
        <button @click="activeOccasion = ''" class="btn-primary mt-3">Show All Lehengas</button>
      </div>

      <!-- Styling Tips -->
      <div class="mt-12 bg-cream-dark rounded-2xl p-6 mandala-bg">
        <h2 class="section-title text-2xl mb-2">How to Choose Your Lehenga</h2>
        <div class="divider-gold mb-6"></div>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-5">
          <div v-for="tip in stylingTips" :key="tip.title" class="text-center">
            <div class="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-2xl mx-auto mb-3">{{ tip.icon }}</div>
            <h4 class="font-semibold text-gray-800 text-sm mb-1">{{ tip.title }}</h4>
            <p class="text-gray-500 text-xs leading-relaxed">{{ tip.desc }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { lehengas } from '~/data/products'

useHead({ title: 'Lehengas & Chaniya Choli — JaihindMill' })

const activeOccasion = ref('')
const sortBy = ref('popularity')

const occasions = [
  { label: 'Bridal', icon: '👰' },
  { label: 'Reception', icon: '🎊' },
  { label: 'Sangeet', icon: '🎵' },
  { label: 'Navratri', icon: '💃' },
  { label: 'Party', icon: '✨' },
]

const occasionBanners = [
  {
    title: 'Bridal Collection',
    desc: 'Heavy silk & banarasi bridal lehengas',
    icon: '👰',
    tag: 'Bridal',
    gradient: 'linear-gradient(135deg, #8B1635, #A82040)',
  },
  {
    title: 'Navratri Special',
    desc: 'Chaniya Choli for Garba & Dandiya',
    icon: '💃',
    tag: 'Navratri',
    gradient: 'linear-gradient(135deg, #0B6B6B, #0E8585)',
  },
  {
    title: 'Party Wear',
    desc: 'Georgette & net for receptions',
    icon: '🎉',
    tag: 'Party',
    gradient: 'linear-gradient(135deg, #C9910A, #E5A90F)',
  },
]

const filteredProducts = computed(() => {
  let result = [...lehengas]
  if (activeOccasion.value) {
    result = result.filter(p =>
      p.occasion.some(o => o.toLowerCase().includes(activeOccasion.value.toLowerCase())) ||
      p.subcategory.toLowerCase().includes(activeOccasion.value.toLowerCase())
    )
  }
  switch (sortBy.value) {
    case 'newest': result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)); break
    case 'price-low': result.sort((a, b) => a.price - b.price); break
    case 'price-high': result.sort((a, b) => b.price - a.price); break
    case 'discount': result.sort((a, b) => b.discount - a.discount); break
    default: result.sort((a, b) => b.reviews - a.reviews)
  }
  return result
})

const stylingTips = [
  { icon: '📏', title: 'Right Length', desc: 'Choose floor-length for formal events, knee-length for casual occasions' },
  { icon: '🎨', title: 'Color by Season', desc: 'Bright colors for Navratri, pastels for Haldi, rich jewels for weddings' },
  { icon: '✨', title: 'Heavy vs Light', desc: 'Silk and velvet for winter weddings, georgette and net for summer events' },
  { icon: '💍', title: 'Accessorize Right', desc: 'Kundan jewelry for Banarasi, silver for chaniya choli, gold for Kanjivaram' },
]
</script>
