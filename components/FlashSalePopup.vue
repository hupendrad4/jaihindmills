<template>
  <Teleport to="body">
    <Transition name="popup">
      <div v-if="isVisible" class="fixed inset-0 z-[200] flex items-center justify-center p-4" @click.self="close">
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

        <!-- Popup Card -->
        <div class="relative z-10 w-full max-w-2xl bg-primary rounded-3xl overflow-hidden shadow-2xl border border-gold/30">

          <!-- Decorative top gradient -->
          <div class="h-1.5 bg-gradient-to-r from-gold via-yellow-300 to-gold"></div>

          <!-- Close button -->
          <button @click="close" class="absolute top-4 right-4 z-20 w-8 h-8 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>

          <!-- Background mandala pattern -->
          <div class="absolute inset-0 mandala-bg opacity-15 pointer-events-none"></div>

          <div class="relative p-6 lg:p-8">
            <!-- Header -->
            <div class="text-center mb-6">
              <div class="inline-flex items-center gap-2 bg-gold/20 border border-gold/40 px-4 py-1.5 rounded-full mb-3">
                <span class="text-gold text-sm font-bold animate-pulse">⚡</span>
                <span class="text-gold text-xs font-bold uppercase tracking-widest">Flash Sale — Limited Time Only!</span>
                <span class="text-gold text-sm font-bold animate-pulse">⚡</span>
              </div>
              <h2 class="font-serif text-3xl lg:text-4xl font-bold text-white mb-1">
                Up to <span class="text-gold">60% OFF</span>
              </h2>
              <p class="text-white/70 text-sm">On Premium Sarees, Paithani & Lehengas</p>
            </div>

            <!-- Countdown Timer -->
            <div class="flex items-center justify-center gap-3 mb-6">
              <span class="text-white/60 text-xs font-medium uppercase tracking-wider">Ends in:</span>
              <div class="flex items-center gap-2">
                <div v-for="(unit, key) in timeUnits" :key="key" class="flex flex-col items-center">
                  <div class="bg-gold/20 border border-gold/40 rounded-xl px-3 py-2 min-w-12 text-center">
                    <span class="font-serif text-2xl font-bold text-gold tabular-nums">{{ unit.value }}</span>
                  </div>
                  <span class="text-white/40 text-xs mt-1">{{ unit.label }}</span>
                </div>
                <span class="text-gold font-bold text-2xl mb-4">:</span>
              </div>
            </div>

            <!-- Flash Sale Products -->
            <div class="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
              <div
                v-for="product in flashProducts"
                :key="product.id"
                @click="goToProduct(product.id)"
                class="bg-white/10 hover:bg-white/15 rounded-2xl overflow-hidden cursor-pointer transition-all duration-200 group border border-white/10 hover:border-gold/40"
              >
                <div class="aspect-[3/4] overflow-hidden relative">
                  <img :src="product.images[0]" :alt="product.name" class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" loading="lazy" />
                  <div class="absolute top-2 left-2 bg-crimson text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    -{{ product.discount }}%
                  </div>
                </div>
                <div class="p-2.5">
                  <p class="text-white text-xs font-semibold line-clamp-1">{{ product.name }}</p>
                  <div class="flex items-center gap-1.5 mt-1">
                    <span class="text-gold font-bold text-sm">₹{{ product.price.toLocaleString('en-IN') }}</span>
                    <span class="text-white/40 text-xs line-through">₹{{ product.originalPrice.toLocaleString('en-IN') }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- CTA + Newsletter -->
            <div class="flex flex-col sm:flex-row gap-3 items-center">
              <NuxtLink to="/shop?filter=sale" @click="close" class="flex-1 bg-gold hover:bg-gold-light text-white font-bold py-3.5 rounded-xl transition-colors text-center text-sm">
                🛍️ Shop All Deals →
              </NuxtLink>
              <div class="flex-1 flex gap-2">
                <input
                  v-model="couponInput"
                  type="text"
                  placeholder="Enter coupon code"
                  class="flex-1 bg-white/10 border border-white/20 text-white placeholder-white/40 rounded-xl px-3 py-3 text-sm outline-none focus:border-gold"
                />
                <button @click="applyCoupon" class="bg-white/15 hover:bg-white/25 text-white text-sm font-semibold px-4 rounded-xl transition-colors whitespace-nowrap">
                  Apply
                </button>
              </div>
            </div>

            <!-- Quick coupon hint -->
            <p class="text-center text-white/40 text-xs mt-3">
              Use code <span class="text-gold font-bold cursor-pointer hover:underline" @click="couponInput='SAVE10'">SAVE10</span> for 10% off ·
              <span class="text-gold font-bold cursor-pointer hover:underline" @click="couponInput='WELCOME20'">WELCOME20</span> for 20% off ·
              <span class="text-gold font-bold cursor-pointer hover:underline" @click="couponInput='FLAT500'">FLAT500</span> for ₹500 off
            </p>

            <!-- Don't show again -->
            <div class="flex items-center justify-center gap-2 mt-4">
              <label class="flex items-center gap-2 cursor-pointer text-white/40 text-xs hover:text-white/60">
                <input type="checkbox" v-model="dontShowAgain" class="accent-gold" />
                Don't show this again today
              </label>
            </div>
          </div>

          <!-- Bottom strip -->
          <div class="bg-gold/10 border-t border-gold/20 py-2 px-4 text-center">
            <p class="text-white/50 text-xs">🔒 Secure payment · 🚚 Free shipping above ₹999 · ↩ 7-day returns</p>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { flashSaleProducts } from '~/data/products'
import { useToastStore } from '~/stores/toast'
import { useCartStore } from '~/stores/cart'

const router = useRouter()
const toast = useToastStore()
const cartStore = useCartStore()

const isVisible = ref(false)
const couponInput = ref('')
const dontShowAgain = ref(false)
const flashProducts = flashSaleProducts.slice(0, 4)

// ── Countdown Timer ──
const endTime = new Date()
endTime.setHours(endTime.getHours() + 3, endTime.getMinutes() + 47, endTime.getSeconds() + 13)

const timeUnits = reactive({
  hours: { value: '03', label: 'Hrs' },
  mins: { value: '47', label: 'Min' },
  secs: { value: '13', label: 'Sec' },
})

let timerInterval: ReturnType<typeof setInterval> | null = null

const updateTimer = () => {
  const now = new Date()
  const diff = endTime.getTime() - now.getTime()
  if (diff <= 0) {
    timerInterval && clearInterval(timerInterval)
    return
  }
  const h = Math.floor(diff / 3600000)
  const m = Math.floor((diff % 3600000) / 60000)
  const s = Math.floor((diff % 60000) / 1000)
  timeUnits.hours.value = String(h).padStart(2, '0')
  timeUnits.mins.value = String(m).padStart(2, '0')
  timeUnits.secs.value = String(s).padStart(2, '0')
}

// Show popup after 4 seconds on mount
onMounted(() => {
  const dismissed = localStorage.getItem('flashSaleDismissed')
  const dismissedAt = dismissed ? new Date(dismissed) : null
  const today = new Date().toDateString()

  if (!dismissedAt || dismissedAt.toDateString() !== today) {
    setTimeout(() => {
      isVisible.value = true
      updateTimer()
      timerInterval = setInterval(updateTimer, 1000)
    }, 4000)
  }
})

onUnmounted(() => {
  timerInterval && clearInterval(timerInterval)
})

const close = () => {
  isVisible.value = false
  if (dontShowAgain.value) {
    localStorage.setItem('flashSaleDismissed', new Date().toISOString())
  }
}

const goToProduct = (id: string) => {
  close()
  router.push(`/product/${id}`)
}

const applyCoupon = () => {
  if (!couponInput.value.trim()) return
  const success = cartStore.applyCoupon(couponInput.value)
  if (success) {
    toast.success(`✓ Coupon "${couponInput.value.toUpperCase()}" saved! Applied at checkout.`)
    close()
  } else {
    toast.error('Invalid coupon code. Try SAVE10, WELCOME20 or FLAT500')
  }
}
</script>

<style scoped>
.popup-enter-active { transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1); }
.popup-leave-active { transition: all 0.2s ease-in; }
.popup-enter-from { opacity: 0; transform: scale(0.85) translateY(30px); }
.popup-leave-to { opacity: 0; transform: scale(0.95) translateY(10px); }
</style>
