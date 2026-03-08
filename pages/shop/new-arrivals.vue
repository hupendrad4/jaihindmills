<template>
  <div>
    <!-- Animated Hero -->
    <div class="relative bg-gradient-to-br from-teal-dark via-teal to-primary overflow-hidden py-14 px-4">
      <div class="absolute inset-0 mandala-bg opacity-15"></div>
      <!-- Animated sparkles -->
      <div class="absolute top-8 left-1/4 text-gold/30 text-5xl animate-bounce" style="animation-delay:0s">✦</div>
      <div class="absolute top-12 right-1/3 text-gold/20 text-3xl animate-bounce" style="animation-delay:0.5s">✦</div>
      <div class="absolute bottom-8 left-1/3 text-gold/25 text-4xl animate-bounce" style="animation-delay:1s">✦</div>

      <div class="relative max-w-7xl mx-auto text-center">
        <div class="inline-flex items-center gap-2 bg-gold/20 border border-gold/40 px-4 py-1.5 rounded-full mb-4">
          <span class="w-2 h-2 bg-gold rounded-full animate-pulse"></span>
          <span class="text-gold text-xs font-bold uppercase tracking-widest">Just Dropped</span>
          <span class="w-2 h-2 bg-gold rounded-full animate-pulse"></span>
        </div>
        <h1 class="font-serif text-4xl lg:text-5xl font-bold text-white mb-3">New Arrivals</h1>
        <p class="text-white/60 max-w-md mx-auto">Fresh from the loom — the latest sarees, salwar suits and lehengas added this season.</p>

        <!-- Stats row -->
        <div class="flex items-center justify-center gap-8 mt-6">
          <div v-for="stat in arrivalStats" :key="stat.label" class="text-center">
            <p class="font-serif text-2xl font-bold text-gold">{{ stat.value }}</p>
            <p class="text-white/50 text-xs">{{ stat.label }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Breadcrumb -->
    <div class="bg-white border-b border-gray-100 px-4 py-2.5">
      <div class="max-w-7xl mx-auto flex items-center gap-2 text-xs text-gray-500">
        <NuxtLink to="/" class="hover:text-primary">Home</NuxtLink> <span>›</span>
        <NuxtLink to="/shop" class="hover:text-primary">Shop</NuxtLink> <span>›</span>
        <span class="text-primary font-medium">New Arrivals</span>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 lg:px-6 py-8">

      <!-- Filter by Category -->
      <div class="flex items-center gap-3 mb-6 overflow-x-auto pb-2">
        <span class="text-xs text-gray-500 font-medium whitespace-nowrap">Filter by:</span>
        <button
          @click="activeFilter = ''"
          :class="['px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap border', activeFilter === '' ? 'bg-primary text-white border-primary' : 'border-gray-200 text-gray-600 hover:border-primary']"
        >All New ({{ newProducts.length }})</button>
        <button
          v-for="cat in newCategories"
          :key="cat.label"
          @click="activeFilter = cat.label"
          :class="['px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap border', activeFilter === cat.label ? 'bg-primary text-white border-primary' : 'border-gray-200 text-gray-600 hover:border-primary']"
        >{{ cat.icon }} {{ cat.label }} ({{ cat.count }})</button>
      </div>

      <!-- Trending Now Banner -->
      <div class="bg-gradient-to-r from-primary/10 to-transparent border-l-4 border-primary rounded-r-xl p-4 mb-6 flex items-center gap-4">
        <span class="text-3xl">🔥</span>
        <div>
          <p class="font-semibold text-primary text-sm">Trending This Week</p>
          <p class="text-gray-500 text-xs">Makar Sankranti Special Sarees &amp; Navratri Chaniya Choli are flying off the shelves!</p>
        </div>
        <NuxtLink to="/shop/lehengas" class="ml-auto btn-primary text-xs whitespace-nowrap">Shop Trending →</NuxtLink>
      </div>

      <!-- Sort -->
      <div class="flex items-center justify-between mb-5">
        <p class="text-sm text-gray-500"><span class="font-semibold text-gray-800">{{ filteredProducts.length }}</span> new items</p>
        <select v-model="sortBy" class="text-sm border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-gold bg-white">
          <option value="newest">Newest First</option>
          <option value="popularity">Most Popular</option>
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
        <p class="text-4xl mb-3">✨</p>
        <h3 class="font-serif text-xl font-bold text-gray-600 mb-2">No new arrivals in this category yet</h3>
        <button @click="activeFilter = ''" class="btn-primary mt-3">Show All New Arrivals</button>
      </div>

      <!-- Newsletter for New Arrivals -->
      <div class="mt-12 bg-primary rounded-2xl p-8 mandala-bg text-center">
        <div class="text-3xl mb-3">🔔</div>
        <h2 class="font-serif text-2xl font-bold text-white mb-2">Be the First to Know</h2>
        <p class="text-white/60 text-sm mb-5">Get instant alerts when new sarees and ethnic wear drop. Subscribe for exclusive early access.</p>
        <form @submit.prevent="subscribe" class="flex gap-3 max-w-md mx-auto">
          <input v-model="email" type="email" placeholder="Your email address" required class="flex-1 bg-white/10 border border-white/20 text-white placeholder-white/40 rounded-xl px-4 py-3 text-sm outline-none focus:border-gold" />
          <button type="submit" class="btn-gold whitespace-nowrap">Notify Me</button>
        </form>
        <p v-if="subscribed" class="text-gold text-sm mt-3">✓ You're on the list! We'll notify you first.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { products } from '~/data/products'
import { useToastStore } from '~/stores/toast'

useHead({ title: 'New Arrivals — JaihindMill' })

const toast = useToastStore()
const activeFilter = ref('')
const sortBy = ref('newest')
const email = ref('')
const subscribed = ref(false)

const newProducts = computed(() => products.filter(p => p.isNew))

const newCategories = computed(() => {
  const cats = [
    { label: 'Sarees', icon: '👘', count: newProducts.value.filter(p => p.category === 'Sarees').length },
    { label: 'Salwar Suits', icon: '👗', count: newProducts.value.filter(p => p.category === 'Salwar Suits').length },
    { label: 'Lehengas', icon: '💃', count: newProducts.value.filter(p => p.category === 'Lehengas').length },
  ]
  return cats.filter(c => c.count > 0)
})

const filteredProducts = computed(() => {
  let result = newProducts.value
  if (activeFilter.value) result = result.filter(p => p.category === activeFilter.value)
  switch (sortBy.value) {
    case 'popularity': result = [...result].sort((a, b) => b.reviews - a.reviews); break
    case 'price-low': result = [...result].sort((a, b) => a.price - b.price); break
    case 'price-high': result = [...result].sort((a, b) => b.price - a.price); break
    case 'discount': result = [...result].sort((a, b) => b.discount - a.discount); break
  }
  return result
})

const arrivalStats = [
  { value: `${products.filter(p => p.isNew).length}+`, label: 'New Styles' },
  { value: 'This Week', label: 'Last Updated' },
  { value: '3 Categories', label: 'Updated' },
]

const subscribe = () => {
  subscribed.value = true
  toast.success('✓ Subscribed for new arrival alerts!')
  email.value = ''
  setTimeout(() => { subscribed.value = false }, 4000)
}
</script>
