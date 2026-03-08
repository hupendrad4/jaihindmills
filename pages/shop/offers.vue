<template>
  <div>
    <!-- Offers Hero — Electric energy, sale vibes -->
    <div class="relative bg-gradient-to-br from-crimson-dark via-crimson to-primary overflow-hidden py-12 px-4">
      <div class="absolute inset-0 mandala-bg opacity-15"></div>
      <!-- Floating % badges decoration -->
      <div v-for="(badge, i) in floatingBadges" :key="i"
        :style="{ top: badge.top, left: badge.left, fontSize: badge.size, animationDelay: badge.delay }"
        class="absolute text-white/10 font-bold animate-bounce pointer-events-none select-none"
      >{{ badge.text }}</div>

      <div class="relative max-w-7xl mx-auto text-center">
        <div class="inline-flex items-center gap-2 bg-white/10 px-4 py-1.5 rounded-full mb-4 border border-white/20">
          <span class="text-yellow-300 animate-pulse text-sm">⚡</span>
          <span class="text-white text-xs font-bold uppercase tracking-widest">Mega Sale — Biggest Discounts of the Year</span>
          <span class="text-yellow-300 animate-pulse text-sm">⚡</span>
        </div>
        <h1 class="font-serif text-5xl lg:text-6xl font-bold text-white mb-2">Sale &amp; <span class="text-yellow-300">Offers</span></h1>
        <p class="text-white/70 mb-5">Up to 60% off on 100+ products. Authentic sarees, salwar suits & lehengas at unbelievable prices.</p>

        <!-- Live deal counters -->
        <div class="flex flex-wrap items-center justify-center gap-4 mb-4">
          <div v-for="counter in dealCounters" :key="counter.label"
            class="bg-white/10 border border-white/20 rounded-xl px-5 py-3 text-center min-w-24">
            <p class="font-serif text-2xl font-bold text-yellow-300">{{ counter.value }}</p>
            <p class="text-white/60 text-xs">{{ counter.label }}</p>
          </div>
        </div>

        <!-- Flash Sale Timer -->
        <div class="inline-flex items-center gap-3 bg-black/30 rounded-2xl px-6 py-3">
          <span class="text-white/70 text-xs font-medium uppercase tracking-wider">Flash Sale Ends:</span>
          <div class="flex items-center gap-2">
            <div v-for="(unit, key) in timeUnits" :key="key" class="flex flex-col items-center">
              <div class="bg-white/10 border border-yellow-300/40 rounded-lg px-3 py-1.5 min-w-10 text-center">
                <span class="font-serif text-xl font-bold text-yellow-300 tabular-nums">{{ unit.value }}</span>
              </div>
              <span class="text-white/40 text-xs mt-0.5">{{ unit.label }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Breadcrumb -->
    <div class="bg-white border-b border-gray-100 px-4 py-2.5">
      <div class="max-w-7xl mx-auto flex items-center gap-2 text-xs text-gray-500">
        <NuxtLink to="/" class="hover:text-primary">Home</NuxtLink> <span>›</span>
        <NuxtLink to="/shop" class="hover:text-primary">Shop</NuxtLink> <span>›</span>
        <span class="text-crimson font-medium">Offers & Sale</span>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 lg:px-6 py-8">

      <!-- Discount Range Filters -->
      <div class="bg-white rounded-2xl shadow-card p-4 mb-6">
        <p class="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-3">Filter by Discount</p>
        <div class="flex flex-wrap gap-3">
          <button
            @click="discountFilter = 0"
            :class="['px-4 py-2 rounded-full text-sm font-medium border transition-all', discountFilter === 0 ? 'bg-crimson text-white border-crimson' : 'border-gray-200 hover:border-crimson text-gray-600']"
          >All Deals ({{ offerProducts.length }})</button>
          <button
            v-for="range in discountRanges"
            :key="range.min"
            @click="discountFilter = range.min"
            :class="['px-4 py-2 rounded-full text-sm font-semibold border transition-all', discountFilter === range.min ? 'bg-crimson text-white border-crimson' : 'border-gray-200 hover:border-crimson text-gray-600']"
          >{{ range.label }} ({{ offerProducts.filter(p => p.discount >= range.min && p.discount < range.max).length }})</button>
        </div>
      </div>

      <!-- Top Deals Banner Strip -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div v-for="deal in topDealBanners" :key="deal.title"
          class="rounded-2xl p-5 relative overflow-hidden"
          :style="{ background: deal.bg }"
        >
          <div class="absolute right-3 top-3 font-serif font-bold text-white/20 text-6xl">{{ deal.disc }}</div>
          <p class="text-white/80 text-xs uppercase tracking-wider mb-1">{{ deal.tag }}</p>
          <h3 class="font-serif font-bold text-white text-lg">{{ deal.title }}</h3>
          <p class="text-white/60 text-xs mt-1 mb-3">{{ deal.desc }}</p>
          <span class="text-xs font-bold text-white bg-white/20 px-3 py-1.5 rounded-full">Starting ₹{{ deal.from }}</span>
        </div>
      </div>

      <!-- Sort + Count -->
      <div class="flex items-center justify-between mb-5 flex-wrap gap-3">
        <p class="text-sm text-gray-500">
          <span class="font-semibold text-gray-800">{{ filteredProducts.length }}</span> deals found
        </p>
        <select v-model="sortBy" class="text-sm border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-gold bg-white">
          <option value="discount">Best Discount First</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="popularity">Most Popular</option>
          <option value="newest">Newest First</option>
        </select>
      </div>

      <!-- Products Grid -->
      <div v-if="filteredProducts.length > 0" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        <ProductCard v-for="product in filteredProducts" :key="product.id" :product="product" />
      </div>

      <!-- Coupon Codes Section -->
      <div class="mt-12 bg-primary rounded-2xl overflow-hidden">
        <div class="bg-gradient-to-r from-gold to-yellow-500 py-3 px-5 text-center">
          <p class="text-primary font-bold text-sm uppercase tracking-wider">🏷️ Exclusive Coupon Codes — Save More!</p>
        </div>
        <div class="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div v-for="coupon in coupons" :key="coupon.code"
            class="bg-white/10 border border-dashed border-gold/40 rounded-xl p-4 flex items-center gap-4 group hover:bg-white/15 transition-colors"
          >
            <div class="text-3xl flex-shrink-0">{{ coupon.icon }}</div>
            <div class="flex-1">
              <p class="text-gray-500 text-xs mb-1">{{ coupon.desc }}</p>
              <p class="font-mono font-bold text-xl text-gold tracking-widest">{{ coupon.code }}</p>
            </div>
            <button @click="copyCoupon(coupon.code)" class="bg-gold/20 hover:bg-gold text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap">
              {{ copiedCode === coupon.code ? '✓ Copied!' : 'Copy' }}
            </button>
          </div>
        </div>
      </div>

      <!-- Original Site Prices Reference -->
      <div class="mt-8 bg-cream-dark rounded-2xl p-6">
        <h3 class="font-serif font-bold text-gray-800 mb-1 flex items-center gap-2"><span class="text-gold">✦</span> Our Price Promise</h3>
        <p class="text-gray-500 text-sm leading-relaxed">
          At JaihindMill, we source directly from weavers across Varanasi, Kanchipuram, Yeola and Surat — cutting out middlemen to pass maximum savings to you.
          All prices shown are the actual selling prices; the "original" prices are manufacturer's suggested retail prices.
          Call <a href="tel:+918793747967" class="text-primary font-semibold hover:underline">+91 87937 47967</a> for bulk/wholesale inquiries.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { offerProducts } from '~/data/products'
import { useToastStore } from '~/stores/toast'

useHead({ title: 'Sale & Offers — Up to 60% Off — JaihindMill' })

const toast = useToastStore()
const discountFilter = ref(0)
const sortBy = ref('discount')
const copiedCode = ref('')

// Countdown timer (same as flash sale popup — 3hr 47min)
const endTime = new Date()
endTime.setHours(endTime.getHours() + 3, endTime.getMinutes() + 47, endTime.getSeconds() + 0)
const timeUnits = reactive({
  hours: { value: '03', label: 'Hrs' },
  mins: { value: '47', label: 'Min' },
  secs: { value: '00', label: 'Sec' },
})
onMounted(() => {
  const interval = setInterval(() => {
    const diff = endTime.getTime() - Date.now()
    if (diff <= 0) { clearInterval(interval); return }
    const h = Math.floor(diff / 3600000), m = Math.floor((diff % 3600000) / 60000), s = Math.floor((diff % 60000) / 1000)
    timeUnits.hours.value = String(h).padStart(2, '0')
    timeUnits.mins.value = String(m).padStart(2, '0')
    timeUnits.secs.value = String(s).padStart(2, '0')
  }, 1000)
  onUnmounted(() => clearInterval(interval))
})

const discountRanges = [
  { min: 50, max: 100, label: '50%+ Off' },
  { min: 40, max: 50, label: '40–50% Off' },
  { min: 30, max: 40, label: '30–40% Off' },
]

const filteredProducts = computed(() => {
  let result = offerProducts.filter(p => p.discount >= (discountFilter.value || 30))
  switch (sortBy.value) {
    case 'discount': result = [...result].sort((a, b) => b.discount - a.discount); break
    case 'price-low': result = [...result].sort((a, b) => a.price - b.price); break
    case 'price-high': result = [...result].sort((a, b) => b.price - a.price); break
    case 'popularity': result = [...result].sort((a, b) => b.reviews - a.reviews); break
    case 'newest': result = [...result].sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)); break
  }
  return result
})

const dealCounters = [
  { value: `${offerProducts.length}+`, label: 'Deals Active' },
  { value: 'Up to 60%', label: 'Max Discount' },
  { value: '₹249', label: 'Lowest Price' },
  { value: 'Free', label: 'Shipping ₹999+' },
]

const topDealBanners = [
  { tag: 'Flash Deal', title: 'Sarees Under ₹500', desc: 'Premium silk & chiffon sarees', disc: '%', from: '250', bg: 'linear-gradient(135deg, #8B1635, #A82040)' },
  { tag: 'Best Value', title: 'Paithani Sale', desc: 'Authentic Yeola Paithani', disc: '%', from: '699', bg: 'linear-gradient(135deg, #0B6B6B, #0E8585)' },
  { tag: 'Trending', title: 'Coord Sets', desc: 'Matching top-bottom sets', disc: '%', from: '399', bg: 'linear-gradient(135deg, #C9910A, #E5A90F)' },
]

const coupons = [
  { code: 'SAVE10', desc: 'Get 10% off on your order', icon: '🎁' },
  { code: 'WELCOME20', desc: '20% off for new customers', icon: '🌟' },
  { code: 'FLAT500', desc: '₹500 flat off on ₹2000+', icon: '💰' },
]

const floatingBadges = [
  { text: '40%', top: '10%', left: '5%', size: '3rem', delay: '0s' },
  { text: '50%', top: '20%', left: '85%', size: '4rem', delay: '0.3s' },
  { text: '60%', top: '60%', left: '90%', size: '3.5rem', delay: '0.7s' },
  { text: '30%', top: '70%', left: '2%', size: '3rem', delay: '0.5s' },
]

const copyCoupon = (code: string) => {
  navigator.clipboard.writeText(code).catch(() => {})
  copiedCode.value = code
  toast.success(`Coupon "${code}" copied to clipboard!`)
  setTimeout(() => { copiedCode.value = '' }, 3000)
}
</script>
