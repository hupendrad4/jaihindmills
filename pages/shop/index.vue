<template>
  <div>
    <!-- Page Header Banner -->
    <div class="bg-primary py-12 px-4 relative overflow-hidden">
      <div class="absolute inset-0 mandala-bg opacity-20"></div>
      <!-- Decorative mandala corners -->
      <div class="absolute left-0 top-0 w-40 h-40 opacity-30">
        <div class="w-full h-full bg-gold/20 rounded-br-full"></div>
      </div>
      <div class="absolute right-0 bottom-0 w-40 h-40 opacity-30">
        <div class="w-full h-full bg-gold/20 rounded-tl-full"></div>
      </div>
      <div class="relative text-center">
        <h1 class="font-serif text-4xl lg:text-5xl font-bold text-white mb-2">Sarees &amp; Ethnic Wear</h1>
        <div class="flex items-center justify-center gap-2 mt-3">
          <span class="text-gold text-lg">✦</span>
          <div class="h-px w-16 bg-gold/40"></div>
          <span class="text-gold text-lg">✦</span>
        </div>
        <p class="text-white/60 mt-2 text-sm">{{ filteredProducts.length }} products found</p>
      </div>
    </div>

    <!-- Breadcrumb -->
    <div class="bg-white border-b border-gray-100 px-4 py-2.5">
      <div class="max-w-7xl mx-auto flex items-center gap-2 text-xs text-gray-500">
        <NuxtLink to="/" class="hover:text-primary">Home</NuxtLink>
        <span>›</span>
        <span class="text-primary font-medium">Shop</span>
        <span v-if="activeCategory">›</span>
        <span v-if="activeCategory" class="text-primary font-medium">{{ activeCategory }}</span>
      </div>
    </div>

    <!-- Active Filters -->
    <div v-if="activeFilterTags.length" class="bg-white border-b border-gray-100 px-4 py-2.5">
      <div class="max-w-7xl mx-auto flex flex-wrap gap-2 items-center">
        <span class="text-xs text-gray-500 font-medium">Active:</span>
        <span
          v-for="tag in activeFilterTags"
          :key="tag"
          class="bg-primary/10 text-primary text-xs px-3 py-1 rounded-full flex items-center gap-1.5"
        >
          {{ tag }}
          <button @click="removeFilterTag(tag)" class="hover:text-crimson">×</button>
        </span>
        <button @click="clearAllFilters" class="text-crimson text-xs hover:underline ml-2">Clear All</button>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 lg:px-6 py-8">
      <div class="flex gap-6 lg:gap-8">

        <!-- Sidebar (Desktop) -->
        <div class="hidden lg:block">
          <FilterSidebar
            :model-fabrics="selectedFabrics"
            :model-colors="selectedColors"
            :model-price-range="priceRange"
            :model-occasions="selectedOccasions"
            :sort="sortBy"
            @update:fabrics="selectedFabrics = $event"
            @update:colors="selectedColors = $event"
            @update:priceRange="priceRange = $event"
            @update:occasions="selectedOccasions = $event"
            @update:sort="sortBy = $event"
            @apply="applyFilters"
          />
        </div>

        <!-- Main Content -->
        <div class="flex-1 min-w-0">

          <!-- Toolbar -->
          <div class="flex items-center justify-between mb-5 flex-wrap gap-3">
            <!-- Mobile filter button -->
            <button @click="showMobileFilter = true" class="lg:hidden flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:border-primary">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/>
              </svg>
              Filters
              <span v-if="activeFilterTags.length" class="bg-crimson text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">{{ activeFilterTags.length }}</span>
            </button>

            <p class="text-sm text-gray-500">
              Showing <span class="font-semibold text-gray-800">{{ filteredProducts.length }}</span> results
            </p>

            <!-- Sort dropdown (desktop) -->
            <div class="flex items-center gap-3">
              <label class="text-sm text-gray-500">Sort:</label>
              <select v-model="sortBy" class="text-sm border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-gold bg-white">
                <option value="popularity">Popularity</option>
                <option value="newest">Newest First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
                <option value="discount">Best Discount</option>
              </select>

              <!-- View toggle -->
              <div class="hidden md:flex gap-1 bg-white border border-gray-200 rounded-lg p-1">
                <button @click="viewMode = 'grid'" :class="['p-1.5 rounded transition-colors', viewMode === 'grid' ? 'bg-primary text-white' : 'text-gray-400 hover:text-gray-600']">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/>
                  </svg>
                </button>
                <button @click="viewMode = 'list'" :class="['p-1.5 rounded transition-colors', viewMode === 'list' ? 'bg-primary text-white' : 'text-gray-400 hover:text-gray-600']">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M3 4a1 1 0 000 2h14a1 1 0 100-2H3zm0 4a1 1 0 000 2h14a1 1 0 100-2H3zm0 4a1 1 0 000 2h14a1 1 0 100-2H3z" clip-rule="evenodd"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <!-- Product Grid -->
          <div v-if="filteredProducts.length > 0" :class="[
            'grid gap-5',
            viewMode === 'grid'
              ? 'grid-cols-2 md:grid-cols-3'
              : 'grid-cols-1'
          ]">
            <ProductCard
              v-for="product in paginatedProducts"
              :key="product.id"
              :product="product"
            />
          </div>

          <!-- Empty State -->
          <div v-else class="text-center py-24">
            <div class="text-6xl mb-4">🔍</div>
            <h3 class="font-serif text-xl font-bold text-gray-700 mb-2">No sarees found</h3>
            <p class="text-gray-500 text-sm mb-6">Try adjusting your filters or browse our full collection</p>
            <button @click="clearAllFilters" class="btn-primary">Clear Filters</button>
          </div>

          <!-- Pagination -->
          <div v-if="totalPages > 1" class="flex items-center justify-center gap-2 mt-10">
            <button
              @click="page--"
              :disabled="page === 1"
              class="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:border-primary hover:text-primary disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >‹</button>
            <button
              v-for="p in totalPages"
              :key="p"
              @click="page = p"
              :class="[
                'w-9 h-9 rounded-lg text-sm font-medium transition-colors',
                p === page ? 'bg-primary text-white' : 'border border-gray-200 text-gray-600 hover:border-primary hover:text-primary'
              ]"
            >{{ p }}</button>
            <button
              @click="page++"
              :disabled="page === totalPages"
              class="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:border-primary hover:text-primary disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >›</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile Filter Drawer -->
    <Teleport to="body">
      <Transition name="fade">
        <div v-if="showMobileFilter" class="fixed inset-0 bg-black/50 z-50 lg:hidden" @click.self="showMobileFilter = false">
          <div class="absolute right-0 top-0 bottom-0 w-80 bg-cream overflow-y-auto p-4">
            <div class="flex items-center justify-between mb-4">
              <h3 class="font-serif font-bold text-lg text-primary">Filters</h3>
              <button @click="showMobileFilter = false" class="text-2xl text-gray-400">×</button>
            </div>
            <FilterSidebar
              :model-fabrics="selectedFabrics"
              :model-colors="selectedColors"
              :model-price-range="priceRange"
              :model-occasions="selectedOccasions"
              :sort="sortBy"
              @update:fabrics="selectedFabrics = $event"
              @update:colors="selectedColors = $event"
              @update:priceRange="priceRange = $event"
              @update:occasions="selectedOccasions = $event"
              @update:sort="sortBy = $event"
              @apply="showMobileFilter = false"
            />
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { products, type Product } from '~/data/products'

useHead({ title: 'Shop Sarees & Ethnic Wear — JaihindMill' })

const route = useRoute()

// Filters
const selectedFabrics = ref<string[]>([])
const selectedColors = ref<string[]>([])
const priceRange = ref<[number, number]>([0, 15000])
const selectedOccasions = ref<string[]>([])
const sortBy = ref('popularity')
const viewMode = ref<'grid' | 'list'>('grid')
const showMobileFilter = ref(false)
const page = ref(1)
const perPage = 12

// Read query params
onMounted(() => {
  const q = route.query
  if (q.fabric) selectedFabrics.value = [q.fabric as string]
  if (q.occasion) selectedOccasions.value = [q.occasion as string]
  if (q.filter === 'new') sortBy.value = 'newest'
  if (q.filter === 'sale') sortBy.value = 'discount'
})

const activeCategory = computed(() => {
  const cat = route.query.category as string
  return cat ? cat.split('-').map(w => w[0].toUpperCase() + w.slice(1)).join(' ') : ''
})

const filteredProducts = computed(() => {
  let result = [...products]

  // Search
  const search = (route.query.search as string || '').toLowerCase()
  if (search) {
    result = result.filter(p =>
      p.name.toLowerCase().includes(search) ||
      p.fabric.toLowerCase().includes(search) ||
      p.subcategory.toLowerCase().includes(search) ||
      p.origin.toLowerCase().includes(search)
    )
  }

  // Fabric filter
  if (selectedFabrics.value.length) {
    result = result.filter(p =>
      selectedFabrics.value.some(f => p.fabric.toLowerCase().includes(f.toLowerCase()))
    )
  }

  // Occasion filter
  if (selectedOccasions.value.length) {
    result = result.filter(p =>
      p.occasion.some(o => selectedOccasions.value.includes(o))
    )
  }

  // Price filter
  result = result.filter(p =>
    p.price >= priceRange.value[0] && p.price <= priceRange.value[1]
  )

  // Query filters
  if (route.query.filter === 'new') result = result.filter(p => p.isNew)
  if (route.query.filter === 'sale') result = result.filter(p => p.discount >= 30)

  // Sort
  switch (sortBy.value) {
    case 'newest': result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)); break
    case 'price-low': result.sort((a, b) => a.price - b.price); break
    case 'price-high': result.sort((a, b) => b.price - a.price); break
    case 'rating': result.sort((a, b) => b.rating - a.rating); break
    case 'discount': result.sort((a, b) => b.discount - a.discount); break
    default: result.sort((a, b) => b.reviews - a.reviews)
  }

  return result
})

const totalPages = computed(() => Math.ceil(filteredProducts.value.length / perPage))

const paginatedProducts = computed(() =>
  filteredProducts.value.slice((page.value - 1) * perPage, page.value * perPage)
)

// Reset page on filter change
watch([selectedFabrics, selectedColors, priceRange, selectedOccasions, sortBy], () => {
  page.value = 1
})

const activeFilterTags = computed(() => {
  const tags: string[] = []
  selectedFabrics.value.forEach(f => tags.push(f))
  selectedOccasions.value.forEach(o => tags.push(o))
  if (priceRange.value[1] < 15000) tags.push(`Under ₹${priceRange.value[1].toLocaleString('en-IN')}`)
  return tags
})

const removeFilterTag = (tag: string) => {
  selectedFabrics.value = selectedFabrics.value.filter(f => f !== tag)
  selectedOccasions.value = selectedOccasions.value.filter(o => o !== tag)
  if (tag.startsWith('Under')) priceRange.value = [0, 15000]
}

const clearAllFilters = () => {
  selectedFabrics.value = []
  selectedColors.value = []
  priceRange.value = [0, 15000]
  selectedOccasions.value = []
  page.value = 1
}

const applyFilters = () => {
  showMobileFilter.value = false
}
</script>
