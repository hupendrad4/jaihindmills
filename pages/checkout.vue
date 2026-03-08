<template>
  <div class="min-h-screen bg-cream py-8 px-4">
    <div class="max-w-6xl mx-auto">

      <!-- Header with logo -->
      <div class="flex items-center justify-between mb-8">
        <NuxtLink to="/" class="flex items-center gap-2">
          <div class="w-9 h-9 bg-primary rounded-full flex items-center justify-center font-serif font-bold text-white text-lg">J</div>
          <span class="font-serif text-xl font-bold text-primary">Jaihind<span class="text-gold">Mill</span></span>
        </NuxtLink>
        <!-- Progress Steps -->
        <div class="hidden md:flex items-center gap-2 text-sm">
          <span v-for="(step, i) in checkoutSteps" :key="step" :class="[
            'px-3 py-1 rounded-full font-medium',
            i === currentStep ? 'bg-primary text-white' :
            i < currentStep ? 'bg-teal/20 text-teal' :
            'text-gray-400'
          ]">
            {{ i < currentStep ? '✓' : `${i+1}.` }} {{ step }}
          </span>
        </div>
        <NuxtLink to="/cart" class="text-sm text-gray-500 hover:text-primary">← Back to Cart</NuxtLink>
      </div>

      <div v-if="cartStore.items.length === 0" class="text-center py-20">
        <p class="text-5xl mb-4">🛒</p>
        <h2 class="font-serif text-2xl font-bold text-gray-700 mb-4">Your cart is empty</h2>
        <NuxtLink to="/shop" class="btn-primary">Start Shopping</NuxtLink>
      </div>

      <div v-else class="grid grid-cols-1 lg:grid-cols-5 gap-8">

        <!-- Left: Forms (3/5) -->
        <div class="lg:col-span-3 space-y-6">

          <!-- Delivery Address -->
          <div class="bg-white rounded-2xl p-6 shadow-card">
            <h2 class="font-serif text-xl font-bold text-gray-800 mb-5 flex items-center gap-2">
              <span class="w-7 h-7 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
              Checkout Address
            </h2>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="md:col-span-2">
                <label class="form-label">Full Name *</label>
                <input v-model="form.name" type="text" placeholder="Enter your full name" class="form-input" />
              </div>
              <div>
                <label class="form-label">Phone Number *</label>
                <input v-model="form.phone" type="tel" placeholder="+91 98765 43210" class="form-input" />
              </div>
              <div>
                <label class="form-label">Email</label>
                <input v-model="form.email" type="email" placeholder="your@email.com" class="form-input" />
              </div>
              <div class="md:col-span-2">
                <label class="form-label">Address *</label>
                <input v-model="form.address" type="text" placeholder="House/Flat/Block No., Street, Area" class="form-input" />
              </div>
              <div>
                <label class="form-label">City *</label>
                <input v-model="form.city" type="text" placeholder="City" class="form-input" />
              </div>
              <div>
                <label class="form-label">State *</label>
                <select v-model="form.state" class="form-input">
                  <option value="">Select State</option>
                  <option v-for="s in indianStates" :key="s">{{ s }}</option>
                </select>
              </div>
              <div>
                <label class="form-label">Pincode *</label>
                <input v-model="form.pincode" type="text" placeholder="6-digit pincode" maxlength="6" class="form-input" />
              </div>
              <div>
                <label class="form-label">Country</label>
                <select v-model="form.country" class="form-input">
                  <option value="India">India</option>
                  <option value="USA">United States</option>
                  <option value="UK">United Kingdom</option>
                  <option value="Canada">Canada</option>
                </select>
              </div>
            </div>
          </div>

          <!-- Payment Method -->
          <div class="bg-white rounded-2xl p-6 shadow-card">
            <h2 class="font-serif text-xl font-bold text-gray-800 mb-5 flex items-center gap-2">
              <span class="w-7 h-7 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
              Payment Method
            </h2>

            <!-- Payment Tabs -->
            <div class="flex gap-3 mb-5 flex-wrap">
              <button
                v-for="method in paymentMethods"
                :key="method.key"
                @click="selectedPayment = method.key"
                :class="[
                  'flex items-center gap-2.5 px-4 py-3 rounded-xl border-2 transition-all duration-200 text-sm font-medium flex-1 min-w-24 justify-center',
                  selectedPayment === method.key
                    ? 'border-primary bg-primary/5 text-primary'
                    : 'border-gray-200 text-gray-600 hover:border-gray-300'
                ]"
              >
                <span class="text-xl">{{ method.icon }}</span>
                <span>{{ method.label }}</span>
              </button>
            </div>

            <!-- UPI Form -->
            <div v-if="selectedPayment === 'upi'" class="bg-cream rounded-xl p-4">
              <label class="form-label">UPI ID</label>
              <input v-model="upiId" type="text" placeholder="yourname@paytm / yourname@upi" class="form-input" />
              <p class="text-gray-400 text-xs mt-2">Enter your UPI ID (PhonePe, Google Pay, Paytm etc.)</p>
            </div>

            <!-- Card Form -->
            <div v-if="selectedPayment === 'card'" class="space-y-4 bg-cream rounded-xl p-4">
              <div>
                <label class="form-label">Card Number</label>
                <input v-model="cardNumber" type="text" placeholder="1234 5678 9012 3456" maxlength="19" class="form-input" />
              </div>
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="form-label">Expiry Date</label>
                  <input v-model="cardExpiry" type="text" placeholder="MM/YY" maxlength="5" class="form-input" />
                </div>
                <div>
                  <label class="form-label">CVV</label>
                  <input v-model="cardCvv" type="password" placeholder="•••" maxlength="4" class="form-input" />
                </div>
              </div>
            </div>

            <!-- COD -->
            <div v-if="selectedPayment === 'cod'" class="bg-cream rounded-xl p-4">
              <div class="flex items-start gap-3">
                <span class="text-2xl">💵</span>
                <div>
                  <p class="font-semibold text-gray-700 text-sm">Cash on Delivery</p>
                  <p class="text-gray-500 text-xs mt-1">Pay with cash when your saree arrives at your doorstep. Please keep exact change ready.</p>
                  <p class="text-gold text-xs mt-1 font-medium">⚠ COD available on orders under ₹10,000</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Trust Badges -->
          <div class="flex gap-4 justify-center flex-wrap">
            <span v-for="badge in trustBadges" :key="badge" class="flex items-center gap-1.5 text-gray-500 text-sm">
              <span class="text-teal">✓</span> {{ badge }}
            </span>
          </div>
        </div>

        <!-- Right: Order Summary (2/5) -->
        <div class="lg:col-span-2">
          <div class="bg-white rounded-2xl p-5 shadow-card sticky top-24">
            <h3 class="font-serif font-bold text-xl text-gray-800 mb-4 flex items-center gap-2">
              Order Summary
            </h3>

            <!-- Cart Items -->
            <div class="space-y-3 max-h-64 overflow-y-auto mb-4">
              <div v-for="item in cartStore.items" :key="`${item.product.id}-${item.selectedColor}`" class="flex gap-3">
                <div class="relative flex-shrink-0">
                  <img :src="item.product.images[0]" :alt="item.product.name" class="w-14 h-16 object-cover rounded-lg" />
                  <span class="absolute -top-1.5 -right-1.5 bg-primary text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">{{ item.quantity }}</span>
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-medium text-gray-700 line-clamp-1">{{ item.product.name }}</p>
                  <p class="text-xs text-gray-400">{{ item.selectedColor }}</p>
                  <p class="text-sm font-bold text-primary mt-1">₹{{ (item.product.price * item.quantity).toLocaleString('en-IN') }}</p>
                </div>
              </div>
            </div>

            <hr class="hr-gold mb-4" />

            <!-- Pricing Breakdown -->
            <div class="space-y-2.5 text-sm mb-4">
              <div class="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>₹{{ cartStore.subtotal.toLocaleString('en-IN') }}</span>
              </div>
              <div v-if="cartStore.discountAmount > 0" class="flex justify-between text-green-600">
                <span>Discount</span>
                <span>−₹{{ cartStore.discountAmount.toLocaleString('en-IN') }}</span>
              </div>
              <div class="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span :class="cartStore.shippingCost === 0 ? 'text-green-600 font-semibold' : ''">
                  {{ cartStore.shippingCost === 0 ? 'FREE ✓' : `₹${cartStore.shippingCost}` }}
                </span>
              </div>
              <hr class="hr-gold" />
              <div class="flex justify-between font-bold text-base text-gray-900">
                <span>Grand Total</span>
                <span class="text-primary text-lg">₹{{ cartStore.total.toLocaleString('en-IN') }}</span>
              </div>
            </div>

            <!-- Place Order -->
            <button
              @click="placeOrder"
              :disabled="isPlacing"
              class="w-full btn-primary py-4 text-base justify-center disabled:opacity-60"
            >
              <span v-if="isPlacing">Placing Order...</span>
              <span v-else>Order Submit — ₹{{ cartStore.total.toLocaleString('en-IN') }}</span>
            </button>

            <p class="text-center text-gray-400 text-xs mt-3">
              🔒 Secured by 256-bit SSL encryption
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Success Modal -->
    <Teleport to="body">
      <Transition name="fade">
        <div v-if="orderPlaced" class="fixed inset-0 bg-black/60 z-50 flex items-center justify-center px-4">
          <div class="bg-white rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl">
            <div class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-4xl mx-auto mb-5">🎊</div>
            <h2 class="font-serif text-2xl font-bold text-gray-800 mb-2">Order Placed!</h2>
            <p class="text-gray-600 mb-1">Order #{{ orderNumber }}</p>
            <p class="text-gray-500 text-sm mb-6">Your beautiful saree will arrive in 5-7 business days. You'll receive an SMS/email confirmation shortly.</p>
            <NuxtLink to="/orders" @click="orderPlaced = false" class="w-full btn-primary justify-center py-3 mb-3 flex">
              Track Your Order
            </NuxtLink>
            <NuxtLink to="/shop" @click="orderPlaced = false" class="w-full btn-outline justify-center py-3 flex">
              Continue Shopping
            </NuxtLink>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from '~/stores/cart'
import { useToastStore } from '~/stores/toast'

useHead({ title: 'Checkout — JaihindMill' })

const cartStore = useCartStore()
const toast = useToastStore()

const currentStep = ref(0)
const checkoutSteps = ['Address', 'Payment', 'Review']

const isPlacing = ref(false)
const orderPlaced = ref(false)
const orderNumber = ref('')
const selectedPayment = ref('upi')
const upiId = ref('')
const cardNumber = ref('')
const cardExpiry = ref('')
const cardCvv = ref('')

const form = reactive({
  name: '',
  phone: '',
  email: '',
  address: '',
  city: '',
  state: '',
  pincode: '',
  country: 'India',
})

const paymentMethods = [
  { key: 'upi', label: 'UPI', icon: '📱' },
  { key: 'card', label: 'Credit/Debit Card', icon: '💳' },
  { key: 'cod', label: 'Cash on Delivery', icon: '💵' },
]

const trustBadges = ['Secure Payment', 'Easy Return', 'Origin Products', 'Verified Seller']

const indianStates = [
  'Andhra Pradesh', 'Assam', 'Bihar', 'Delhi', 'Goa', 'Gujarat',
  'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala',
  'Madhya Pradesh', 'Maharashtra', 'Odisha', 'Punjab', 'Rajasthan',
  'Tamil Nadu', 'Telangana', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
]

const placeOrder = async () => {
  if (!form.name || !form.phone || !form.address || !form.city || !form.state || !form.pincode) {
    toast.error('Please fill all required address fields')
    return
  }

  isPlacing.value = true
  await new Promise(r => setTimeout(r, 2000)) // Simulate API call

  orderNumber.value = 'JHM' + Date.now().toString().slice(-8)
  orderPlaced.value = true
  cartStore.clearCart()
  isPlacing.value = false
}
</script>
