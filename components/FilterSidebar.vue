<template>
  <aside class="w-64 flex-shrink-0">
    <div class="bg-white rounded-xl shadow-card p-5 sticky top-24">

      <!-- Header -->
      <div class="flex items-center justify-between mb-5">
        <div class="flex items-center gap-2">
          <svg class="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/>
          </svg>
          <span class="font-semibold text-gray-800 text-sm">Filters</span>
        </div>
        <button
          v-if="hasActiveFilters"
          @click="clearAllFilters"
          class="text-crimson text-xs font-medium hover:underline"
        >Clear All</button>
      </div>

      <!-- Sort By -->
      <div class="mb-5">
        <h3 class="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2.5">Sort By</h3>
        <select
          v-model="localSort"
          @change="$emit('update:sort', localSort)"
          class="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-gold bg-white"
        >
          <option value="popularity">Popularity</option>
          <option value="newest">Newest First</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating">Top Rated</option>
          <option value="discount">Best Discount</option>
        </select>
      </div>

      <hr class="hr-gold mb-5" />

      <!-- Fabric -->
      <div class="mb-5">
        <button
          @click="sections.fabric = !sections.fabric"
          class="flex items-center justify-between w-full text-left mb-3"
        >
          <h3 class="text-xs font-semibold text-gray-600 uppercase tracking-wider">Fabric</h3>
          <svg :class="['w-4 h-4 text-gray-400 transition-transform', sections.fabric ? 'rotate-180' : '']" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
          </svg>
        </button>
        <div v-if="sections.fabric" class="space-y-2">
          <label v-for="fabric in fabrics" :key="fabric.value" class="flex items-center gap-2.5 cursor-pointer group">
            <input
              type="checkbox"
              :value="fabric.value"
              v-model="localFabrics"
              @change="$emit('update:fabrics', localFabrics)"
              class="w-4 h-4 accent-crimson rounded"
            />
            <span class="text-sm text-gray-700 group-hover:text-primary transition-colors">{{ fabric.label }}</span>
            <span class="ml-auto text-xs text-gray-400">{{ fabric.count }}</span>
          </label>
        </div>
      </div>

      <hr class="hr-gold mb-5" />

      <!-- Color -->
      <div class="mb-5">
        <button
          @click="sections.color = !sections.color"
          class="flex items-center justify-between w-full text-left mb-3"
        >
          <h3 class="text-xs font-semibold text-gray-600 uppercase tracking-wider">Color</h3>
          <svg :class="['w-4 h-4 text-gray-400 transition-transform', sections.color ? 'rotate-180' : '']" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
          </svg>
        </button>
        <div v-if="sections.color">
          <div class="grid grid-cols-6 gap-2 mb-3">
            <button
              v-for="color in colorSwatches"
              :key="color.hex"
              :title="color.name"
              :style="{ backgroundColor: color.hex }"
              :class="[
                'w-7 h-7 rounded-full border-2 transition-all duration-150 hover:scale-110',
                localColors.includes(color.name)
                  ? 'border-primary scale-110 ring-2 ring-primary ring-offset-1'
                  : 'border-transparent'
              ]"
              @click="toggleColor(color.name)"
            ></button>
          </div>
          <div v-if="localColors.length" class="flex flex-wrap gap-1">
            <span v-for="c in localColors" :key="c" class="bg-cream text-primary text-xs px-2 py-0.5 rounded-full flex items-center gap-1">
              {{ c }}
              <button @click="toggleColor(c)" class="text-gray-400 hover:text-crimson">×</button>
            </span>
          </div>
        </div>
      </div>

      <hr class="hr-gold mb-5" />

      <!-- Price Range -->
      <div class="mb-5">
        <button
          @click="sections.price = !sections.price"
          class="flex items-center justify-between w-full text-left mb-3"
        >
          <h3 class="text-xs font-semibold text-gray-600 uppercase tracking-wider">Price Range</h3>
          <svg :class="['w-4 h-4 text-gray-400 transition-transform', sections.price ? 'rotate-180' : '']" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
          </svg>
        </button>
        <div v-if="sections.price">
          <div class="flex justify-between text-xs text-gray-500 mb-2">
            <span>₹{{ localPriceRange[0].toLocaleString('en-IN') }}</span>
            <span>₹{{ localPriceRange[1].toLocaleString('en-IN') }}</span>
          </div>
          <input
            type="range"
            min="0"
            max="15000"
            step="500"
            v-model.number="localPriceRange[1]"
            @change="$emit('update:priceRange', localPriceRange)"
            class="w-full"
          />
          <div class="grid grid-cols-2 gap-2 mt-3">
            <label v-for="range in priceRanges" :key="range.label" class="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                :value="range.value"
                name="priceRange"
                class="accent-crimson"
                @change="setPriceRange(range.value)"
              />
              <span class="text-xs text-gray-600">{{ range.label }}</span>
            </label>
          </div>
        </div>
      </div>

      <hr class="hr-gold mb-5" />

      <!-- Occasion -->
      <div class="mb-5">
        <button
          @click="sections.occasion = !sections.occasion"
          class="flex items-center justify-between w-full text-left mb-3"
        >
          <h3 class="text-xs font-semibold text-gray-600 uppercase tracking-wider">Occasion</h3>
          <svg :class="['w-4 h-4 text-gray-400 transition-transform', sections.occasion ? 'rotate-180' : '']" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
          </svg>
        </button>
        <div v-if="sections.occasion" class="space-y-2">
          <label v-for="occasion in occasions" :key="occasion" class="flex items-center gap-2.5 cursor-pointer group">
            <input
              type="checkbox"
              :value="occasion"
              v-model="localOccasions"
              @change="$emit('update:occasions', localOccasions)"
              class="w-4 h-4 accent-crimson rounded"
            />
            <span class="text-sm text-gray-700 group-hover:text-primary transition-colors">{{ occasion }}</span>
          </label>
        </div>
      </div>

      <!-- Apply Button (mobile) -->
      <button
        @click="$emit('apply')"
        class="w-full btn-primary justify-center"
      >
        Apply Filters
      </button>
    </div>
  </aside>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelFabrics?: string[]
  modelColors?: string[]
  modelPriceRange?: [number, number]
  modelOccasions?: string[]
  sort?: string
}>()

const emit = defineEmits([
  'update:fabrics', 'update:colors', 'update:priceRange',
  'update:occasions', 'update:sort', 'apply'
])

const localFabrics = ref<string[]>(props.modelFabrics || [])
const localColors = ref<string[]>(props.modelColors || [])
const localPriceRange = ref<[number, number]>(props.modelPriceRange || [0, 15000])
const localOccasions = ref<string[]>(props.modelOccasions || [])
const localSort = ref(props.sort || 'popularity')

const sections = reactive({ fabric: true, color: true, price: true, occasion: false })

const hasActiveFilters = computed(() =>
  localFabrics.value.length > 0 ||
  localColors.value.length > 0 ||
  localOccasions.value.length > 0 ||
  localPriceRange.value[1] < 15000
)

const fabrics = [
  { value: 'Silk', label: 'Silk', count: 180 },
  { value: 'Cotton', label: 'Cotton', count: 95 },
  { value: 'Georgette', label: 'Georgette', count: 72 },
  { value: 'Chiffon', label: 'Chiffon', count: 48 },
  { value: 'Chanderi', label: 'Chanderi', count: 36 },
  { value: 'Tussar', label: 'Tussar Silk', count: 29 },
  { value: 'Organza', label: 'Organza', count: 21 },
  { value: 'Linen', label: 'Linen', count: 15 },
]

const colorSwatches = [
  { name: 'Red', hex: '#C41E3A' },
  { name: 'Maroon', hex: '#800000' },
  { name: 'Pink', hex: '#FF69B4' },
  { name: 'Orange', hex: '#FF6B00' },
  { name: 'Yellow', hex: '#FFD700' },
  { name: 'Gold', hex: '#C9910A' },
  { name: 'Green', hex: '#1B4332' },
  { name: 'Teal', hex: '#0B6B6B' },
  { name: 'Blue', hex: '#1E3A8A' },
  { name: 'Purple', hex: '#6A0DAD' },
  { name: 'Black', hex: '#1a1a1a' },
  { name: 'White', hex: '#F5F5F5' },
]

const priceRanges = [
  { label: 'Under ₹1,000', value: [0, 1000] },
  { label: '₹1,000–₹3,000', value: [1000, 3000] },
  { label: '₹3,000–₹6,000', value: [3000, 6000] },
  { label: 'Above ₹6,000', value: [6000, 15000] },
]

const occasions = ['Wedding', 'Festival', 'Party', 'Casual', 'Office', 'Daily Wear', 'Reception', 'Religious']

const toggleColor = (colorName: string) => {
  const idx = localColors.value.indexOf(colorName)
  if (idx === -1) {
    localColors.value.push(colorName)
  } else {
    localColors.value.splice(idx, 1)
  }
  emit('update:colors', localColors.value)
}

const setPriceRange = (range: number[]) => {
  localPriceRange.value = [range[0], range[1]] as [number, number]
  emit('update:priceRange', localPriceRange.value)
}

const clearAllFilters = () => {
  localFabrics.value = []
  localColors.value = []
  localPriceRange.value = [0, 15000]
  localOccasions.value = []
  emit('update:fabrics', [])
  emit('update:colors', [])
  emit('update:priceRange', [0, 15000])
  emit('update:occasions', [])
}
</script>
