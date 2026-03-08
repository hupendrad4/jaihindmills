<template>
  <div class="min-h-screen bg-cream py-8 px-4">
    <div class="max-w-6xl mx-auto">

      <!-- Header -->
      <div class="flex items-center justify-between mb-6">
        <h1 class="font-serif text-3xl font-bold text-primary">My Cart</h1>
        <NuxtLink to="/shop" class="btn-ghost text-sm">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16l-4-4m0 0l4-4m-4 4h18"/>
          </svg>
          Continue Shopping
        </NuxtLink>
      </div>

      <!-- Empty Cart -->
      <div v-if="cartStore.items.length === 0" class="text-center py-24">
        <div class="text-7xl mb-4">🛒</div>
        <h2 class="font-serif text-2xl font-bold text-gray-700 mb-3">Your cart is empty</h2>
        <p class="text-gray-500 mb-6">Add some beautiful sarees to get started!</p>
        <NuxtLink to="/shop" class="btn-primary">Start Shopping</NuxtLink>
      </div>

      <!-- Cart Content -->
      <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-8">

        <!-- Cart Items -->
        <div class="lg:col-span-2 space-y-4">
          <!-- Jaihind Mill branding card -->
          <div class="bg-primary text-white rounded-2xl p-4 flex items-center gap-3 mandala-bg">
            <div class="w-10 h-10 bg-gold rounded-full flex items-center justify-center font-serif font-bold text-xl">J</div>
            <div>
              <p class="font-serif font-bold text-lg">Jaihind Mill</p>
              <p class="text-white/60 text-xs">{{ cartStore.itemCount }} item{{ cartStore.itemCount > 1 ? 's' : '' }} in your cart</p>
            </div>
            <div class="ml-auto text-right">
              <p class="text-xs text-white/50">Subtotal</p>
              <p class="font-bold text-gold text-lg">₹{{ cartStore.subtotal.toLocaleString('en-IN') }}</p>
            </div>
          </div>

          <!-- Items List -->
          <div class="space-y-3">
            <div
              v-for="item in cartStore.items"
              :key="`${item.product.id}-${item.selectedColor}`"
              class="bg-white rounded-2xl p-4 flex gap-4 shadow-card"
            >
              <!-- Image -->
              <NuxtLink :to="`/product/${item.product.id}`" class="flex-shrink-0">
                <img
                  :src="item.product.images[0]"
                  :alt="item.product.name"
                  class="w-20 h-24 object-cover rounded-xl"
                />
              </NuxtLink>

              <!-- Details -->
              <div class="flex-1 min-w-0">
                <NuxtLink :to="`/product/${item.product.id}`" class="font-semibold text-gray-800 text-sm leading-tight hover:text-primary transition-colors line-clamp-2">
                  {{ item.product.name }}
                </NuxtLink>
                <p class="text-gray-400 text-xs mt-1">{{ item.product.fabric }} · {{ item.product.origin }}</p>

                <!-- Color & Size -->
                <div class="flex items-center gap-2 mt-2">
                  <div
                    :style="{ backgroundColor: item.product.colors.find(c => c.name === item.selectedColor)?.hex || '#ccc' }"
                    class="w-4 h-4 rounded-full border border-gray-200"
                  ></div>
                  <span class="text-xs text-gray-600">{{ item.selectedColor }}</span>
                  <span class="text-gray-300">·</span>
                  <span class="text-xs text-gray-600">Coll. Pose 6.3m</span>
                </div>

                <!-- Price + Qty -->
                <div class="flex items-center justify-between mt-3">
                  <div>
                    <span class="font-bold text-primary">₹{{ (item.product.price * item.quantity).toLocaleString('en-IN') }}</span>
                    <span class="text-gray-400 text-xs ml-1.5 line-through">₹{{ (item.product.originalPrice * item.quantity).toLocaleString('en-IN') }}</span>
                  </div>

                  <div class="flex items-center gap-2">
                    <!-- Quantity -->
                    <div class="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                      <button
                        @click="cartStore.updateQuantity(item.product.id, item.selectedColor, item.quantity - 1)"
                        class="w-7 h-7 flex items-center justify-center hover:bg-gray-50 text-gray-600 transition-colors"
                      >−</button>
                      <span class="w-8 text-center text-sm font-semibold">{{ item.quantity }}</span>
                      <button
                        @click="cartStore.updateQuantity(item.product.id, item.selectedColor, item.quantity + 1)"
                        class="w-7 h-7 flex items-center justify-center hover:bg-gray-50 text-gray-600 transition-colors"
                      >+</button>
                    </div>

                    <!-- Remove -->
                    <button
                      @click="cartStore.removeItem(item.product.id, item.selectedColor)"
                      class="text-gray-300 hover:text-crimson transition-colors text-sm"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Coupon Code -->
          <div class="bg-white rounded-2xl p-5 shadow-card">
            <h3 class="font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <span class="text-gold">🏷️</span> Coupon Code
            </h3>
            <div v-if="!cartStore.couponCode">
              <div class="flex gap-3">
                <input
                  v-model="couponInput"
                  type="text"
                  placeholder="Enter coupon code"
                  class="form-input flex-1"
                  @keydown.enter="applyCoupon"
                />
                <button @click="applyCoupon" class="btn-primary whitespace-nowrap">Apply</button>
              </div>
              <p v-if="couponError" class="text-crimson text-xs mt-2">{{ couponError }}</p>
              <p class="text-gray-400 text-xs mt-2">Try: SAVE10, WELCOME20, FLAT500</p>
            </div>
            <div v-else class="flex items-center justify-between bg-green-50 border border-green-200 rounded-lg px-4 py-3">
              <div>
                <p class="font-semibold text-green-700 text-sm">✓ Coupon "{{ cartStore.couponCode }}" applied!</p>
                <p class="text-green-600 text-xs">You save ₹{{ cartStore.discountAmount.toLocaleString('en-IN') }}</p>
              </div>
              <button @click="cartStore.removeCoupon()" class="text-gray-400 hover:text-crimson text-sm">✕</button>
            </div>
          </div>
        </div>

        <!-- Order Summary -->
        <div class="space-y-4">
          <div class="bg-white rounded-2xl p-5 shadow-card sticky top-24">
            <h3 class="font-serif font-bold text-xl text-gray-800 mb-5">Order Summary</h3>

            <div class="space-y-3 text-sm">
              <div class="flex justify-between text-gray-600">
                <span>Items ({{ cartStore.itemCount }})</span>
                <span>₹{{ cartStore.subtotal.toLocaleString('en-IN') }}</span>
              </div>
              <div v-if="cartStore.discountAmount > 0" class="flex justify-between text-green-600">
                <span>Discount</span>
                <span>−₹{{ cartStore.discountAmount.toLocaleString('en-IN') }}</span>
              </div>
              <div class="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span :class="cartStore.shippingCost === 0 ? 'text-green-600 font-semibold' : ''">
                  {{ cartStore.shippingCost === 0 ? 'FREE' : `₹${cartStore.shippingCost}` }}
                </span>
              </div>
              <hr class="hr-gold" />
              <div class="flex justify-between font-bold text-lg text-gray-900">
                <span>Grand Total</span>
                <span class="text-primary">₹{{ cartStore.total.toLocaleString('en-IN') }}</span>
              </div>
            </div>

            <p v-if="cartStore.shippingCost > 0" class="text-gray-400 text-xs mt-3">
              Add ₹{{ (999 - cartStore.subtotal).toLocaleString('en-IN') }} more for free shipping
            </p>

            <NuxtLink to="/checkout" class="w-full btn-primary justify-center mt-5 py-3.5 text-base">
              Proceed to Checkout
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>
            </NuxtLink>

            <!-- Payment icons -->
            <div class="mt-4 flex flex-wrap gap-1.5 justify-center">
              <span v-for="m in ['UPI', 'Visa', 'Mastercard', 'COD']" :key="m"
                class="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded">{{ m }}</span>
            </div>

            <p class="text-center text-gray-400 text-xs mt-3">🔒 100% Secure & Encrypted</p>
          </div>

          <!-- Additional Info -->
          <div class="bg-cream-dark rounded-2xl p-4">
            <div class="space-y-2.5">
              <div v-for="info in cartInfo" :key="info.text" class="flex items-center gap-3 text-sm text-gray-600">
                <span class="text-gold">{{ info.icon }}</span>
                <span>{{ info.text }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from '~/stores/cart'
import { useToastStore } from '~/stores/toast'

useHead({ title: 'My Cart — JaihindMill' })

const cartStore = useCartStore()
const toast = useToastStore()

const couponInput = ref('')
const couponError = ref('')

const applyCoupon = () => {
  if (!couponInput.value.trim()) return
  const success = cartStore.applyCoupon(couponInput.value)
  if (success) {
    toast.success(`Coupon applied! You save ₹${cartStore.discountAmount}`)
    couponInput.value = ''
    couponError.value = ''
  } else {
    couponError.value = 'Invalid coupon code. Try SAVE10, WELCOME20, or FLAT500'
  }
}

const cartInfo = [
  { icon: '🚚', text: 'Free shipping on orders above ₹999' },
  { icon: '↩', text: 'Easy 7-day return policy' },
  { icon: '🏺', text: '100% authentic handloom products' },
  { icon: '🔒', text: 'Secure encrypted checkout' },
]
</script>
