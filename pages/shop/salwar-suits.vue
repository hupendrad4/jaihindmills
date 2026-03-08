<template>
  <div>
    <!-- Hero Banner -->
    <div class="relative bg-primary overflow-hidden py-14 px-4">
      <div class="absolute inset-0 mandala-bg opacity-20"></div>
      <div class="absolute right-0 top-0 h-full w-2/5 hidden lg:block">
        <img src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&h=400&fit=crop" alt="Salwar Suits" class="w-full h-full object-cover opacity-30" />
        <div class="absolute inset-0 bg-gradient-to-r from-primary to-transparent"></div>
      </div>
      <!-- Gold corners -->
      <div class="absolute top-0 left-0 w-28 h-28 border-r-4 border-b-4 border-gold/30 rounded-br-3xl"></div>
      <div class="absolute bottom-0 right-0 w-28 h-28 border-l-4 border-t-4 border-gold/30 rounded-tl-3xl"></div>

      <div class="relative max-w-7xl mx-auto">
        <span class="text-gold text-xs font-semibold uppercase tracking-widest">{{ salwarSuits.length }}+ Styles Available</span>
        <h1 class="font-serif text-4xl lg:text-5xl font-bold text-white mt-2 mb-3">Salwar Suits & <br class="hidden md:block"/>Women's Wear</h1>
        <p class="text-white/60 max-w-md leading-relaxed">Coord sets, anarkalis, kurtis, gowns and more. Contemporary Indian fashion for every occasion.</p>

        <!-- Category Pills -->
        <div class="flex flex-wrap gap-3 mt-5">
          <button
            v-for="sub in subcategories"
            :key="sub"
            @click="activeSubcat === sub ? activeSubcat = '' : activeSubcat = sub"
            :class="[
              'px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border',
              activeSubcat === sub
                ? 'bg-gold border-gold text-white'
                : 'border-white/30 text-white/70 hover:border-gold hover:text-gold'
            ]"
          >{{ sub }}</button>
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
        <span class="text-primary font-medium">Salwar Suits</span>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 lg:px-6 py-8">

      <!-- Featured Banner: Trending Coord Sets -->
      <div class="bg-gradient-to-r from-teal/20 to-teal/5 border border-teal/20 rounded-2xl p-5 mb-8 flex flex-col md:flex-row items-center gap-4">
        <div class="text-4xl">✨</div>
        <div class="flex-1 text-center md:text-left">
          <p class="text-teal font-bold text-sm uppercase tracking-wider mb-0.5">Trending Now</p>
          <h3 class="font-serif text-xl font-bold text-gray-800">Coord Sets are the hottest style this season!</h3>
          <p class="text-gray-500 text-sm mt-0.5">Shop matching top + bottom sets — up to 55% off</p>
        </div>
        <button @click="activeSubcat = 'Coord Set'" class="btn-teal whitespace-nowrap">Shop Coord Sets →</button>
      </div>

      <!-- Toolbar -->
      <div class="flex items-center justify-between mb-5 flex-wrap gap-3">
        <p class="text-sm text-gray-500">
          Showing <span class="font-semibold text-gray-800">{{ filteredProducts.length }}</span> styles
        </p>
        <select v-model="sortBy" class="text-sm border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-gold bg-white">
          <option value="popularity">Most Popular</option>
          <option value="newest">Newest First</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="discount">Best Discount</option>
        </select>
      </div>

      <!-- Products Grid -->
      <div v-if="filteredProducts.length > 0" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        <ProductCard v-for="product in filteredProducts" :key="product.id" :product="product" />
      </div>
      <div v-else class="text-center py-20">
        <p class="text-4xl mb-3">👗</p>
        <h3 class="font-serif text-xl font-bold text-gray-600 mb-2">No styles found</h3>
        <button @click="activeSubcat = ''" class="btn-primary mt-3">Show All Styles</button>
      </div>

      <!-- Style Guide Banner -->
      <div class="mt-12 grid grid-cols-1 md:grid-cols-3 gap-5">
        <div v-for="guide in styleGuides" :key="guide.title" class="bg-white rounded-2xl p-5 shadow-card text-center hover:shadow-card-hover transition-shadow">
          <div class="text-3xl mb-3">{{ guide.icon }}</div>
          <h3 class="font-serif font-bold text-gray-800 mb-2">{{ guide.title }}</h3>
          <p class="text-gray-500 text-sm leading-relaxed">{{ guide.desc }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { salwarSuits } from '~/data/products'

useHead({ title: 'Salwar Suits & Women\'s Wear — JaihindMill' })

const activeSubcat = ref('')
const sortBy = ref('popularity')

const subcategories = [...new Set(salwarSuits.map(p => p.subcategory))]

const filteredProducts = computed(() => {
  let result = [...salwarSuits]
  if (activeSubcat.value) result = result.filter(p => p.subcategory === activeSubcat.value)
  switch (sortBy.value) {
    case 'newest': result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)); break
    case 'price-low': result.sort((a, b) => a.price - b.price); break
    case 'price-high': result.sort((a, b) => b.price - a.price); break
    case 'discount': result.sort((a, b) => b.discount - a.discount); break
    default: result.sort((a, b) => b.reviews - a.reviews)
  }
  return result
})

const styleGuides = [
  { icon: '🌸', title: 'Coord Sets', desc: 'Matching top-bottom sets in trending prints. Perfect for casual outings, parties and office.' },
  { icon: '💃', title: 'Anarkali & Gowns', desc: 'Floor-length flowy anarkali suits and gowns for festivals and celebrations.' },
  { icon: '✂️', title: 'Kurti Sets', desc: '3-piece kurti sets with palazzo/pants and dupatta. Elegant and easy to wear.' },
]
</script>
