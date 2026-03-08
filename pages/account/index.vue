<template>
  <div class="min-h-screen bg-cream">

    <!-- Profile Header Banner (Image 6 reference — rich maroon) -->
    <div class="bg-primary py-8 px-4 mandala-bg relative overflow-hidden">
      <!-- Gold corner decorations -->
      <div class="absolute top-0 left-0 w-24 h-24 border-r-4 border-b-4 border-gold/30 rounded-br-3xl"></div>
      <div class="absolute top-0 right-0 w-24 h-24 border-l-4 border-b-4 border-gold/30 rounded-bl-3xl"></div>

      <div class="max-w-7xl mx-auto">
        <div class="flex flex-col md:flex-row items-center md:items-start gap-5">
          <!-- Avatar -->
          <div class="relative">
            <div class="w-20 h-20 bg-gold rounded-full flex items-center justify-center font-serif font-bold text-3xl text-white ring-4 ring-gold/30">
              {{ user.name[0] }}
            </div>
            <div class="absolute bottom-0 right-0 w-6 h-6 bg-teal rounded-full flex items-center justify-center text-white text-xs">✓</div>
          </div>

          <!-- User Info -->
          <div class="text-center md:text-left flex-1">
            <h1 class="font-serif text-2xl font-bold text-white">{{ user.name }}</h1>
            <p class="text-white/60 text-sm mt-0.5 flex items-center gap-1.5 justify-center md:justify-start">
              <span class="text-gold">📍</span> {{ user.location }}
              <span class="text-white/30">·</span>
              <span class="text-white/60">{{ user.loyaltyPoints }} Jaihind Points</span>
            </p>
            <p class="text-white/40 text-xs mt-1">{{ user.email }}</p>

            <!-- Profile Tabs -->
            <div class="flex gap-3 mt-4 justify-center md:justify-start flex-wrap">
              <button
                v-for="tab in profileTabs"
                :key="tab.key"
                @click="activeTab = tab.key"
                :class="[
                  'px-4 py-1.5 rounded-full text-xs font-medium transition-all',
                  activeTab === tab.key ? 'bg-gold text-white' : 'bg-white/10 text-white/70 hover:bg-white/20'
                ]"
              >{{ tab.label }}</button>
            </div>
          </div>

          <!-- Loyalty Stats -->
          <div class="bg-white/10 rounded-2xl p-4 text-white min-w-48">
            <p class="text-xs text-white/60 mb-3 flex items-center gap-1"><span class="text-gold">★</span> Order Star Points</p>
            <div class="space-y-2">
              <div class="flex justify-between text-sm">
                <span class="text-white/70">Loyalty Points</span>
                <span class="text-gold font-bold">{{ user.loyaltyPoints }}</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-white/70">Total Orders</span>
                <span class="font-bold">{{ mockOrders.length }}</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-white/70">Member Since</span>
                <span class="font-bold">{{ user.memberSince }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Content -->
    <div class="max-w-7xl mx-auto px-4 lg:px-6 py-8">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">

        <!-- Main Content (Orders / Summary) -->
        <div class="lg:col-span-2">

          <!-- Summary Tab -->
          <div v-if="activeTab === 'summary'">
            <div class="flex items-center justify-between mb-4">
              <h2 class="font-serif text-xl font-bold text-primary">Order History</h2>
              <NuxtLink to="/orders" class="text-crimson text-sm hover:underline flex items-center gap-1">
                View All <span>›</span>
              </NuxtLink>
            </div>

            <!-- Orders List -->
            <div class="space-y-4">
              <div
                v-for="order in mockOrders"
                :key="order.id"
                class="bg-white rounded-2xl p-4 shadow-card flex gap-4 items-center"
              >
                <!-- Product Image -->
                <img
                  :src="order.image"
                  :alt="order.name"
                  class="w-16 h-20 object-cover rounded-xl flex-shrink-0"
                />

                <!-- Order Details -->
                <div class="flex-1 min-w-0">
                  <p class="text-xs text-gray-400 mb-0.5">{{ order.id }}</p>
                  <p class="font-semibold text-gray-800 text-sm line-clamp-1">{{ order.name }}</p>
                  <p class="text-xs text-gray-500 mt-0.5">{{ order.date }} · {{ order.items }} item{{ order.items > 1 ? 's' : '' }}</p>
                  <div class="flex items-center gap-3 mt-2">
                    <span class="font-bold text-primary text-sm">₹{{ order.amount.toLocaleString('en-IN') }}</span>
                    <span class="line-through text-gray-400 text-xs">₹{{ order.originalAmount.toLocaleString('en-IN') }}</span>
                  </div>
                </div>

                <!-- Status -->
                <div class="flex flex-col items-end gap-2">
                  <span :class="[
                    'text-xs font-semibold px-3 py-1.5 rounded-full',
                    order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                    order.status === 'Processing' ? 'bg-blue-100 text-blue-700' :
                    order.status === 'Shipped' ? 'bg-orange-100 text-orange-700' :
                    'bg-gray-100 text-gray-600'
                  ]">{{ order.status }}</span>
                  <NuxtLink :to="`/orders`" class="text-teal text-xs hover:underline">Track →</NuxtLink>
                </div>
              </div>
            </div>
          </div>

          <!-- Profile/Settings Tab -->
          <div v-if="activeTab === 'profile'">
            <h2 class="font-serif text-xl font-bold text-primary mb-5">Edit Profile</h2>
            <div class="bg-white rounded-2xl p-6 shadow-card space-y-4">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="form-label">Full Name</label>
                  <input v-model="editForm.name" type="text" class="form-input" />
                </div>
                <div>
                  <label class="form-label">Email</label>
                  <input v-model="editForm.email" type="email" class="form-input" />
                </div>
                <div>
                  <label class="form-label">Phone</label>
                  <input v-model="editForm.phone" type="tel" class="form-input" />
                </div>
                <div>
                  <label class="form-label">Date of Birth</label>
                  <input v-model="editForm.dob" type="date" class="form-input" />
                </div>
              </div>
              <button class="btn-primary">Save Changes</button>
            </div>
          </div>
        </div>

        <!-- Sidebar: Address Management -->
        <div class="space-y-5">
          <div class="bg-white rounded-2xl p-5 shadow-card">
            <div class="flex items-center justify-between mb-4">
              <h3 class="font-serif font-bold text-gray-800">Saved Addresses</h3>
              <button class="text-teal text-xs font-medium hover:underline">+ Add New</button>
            </div>

            <div class="space-y-3">
              <div
                v-for="(addr, i) in addresses"
                :key="i"
                :class="[
                  'border rounded-xl p-3.5 cursor-pointer transition-all',
                  addr.isPrimary ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-primary/50'
                ]"
              >
                <div class="flex items-start justify-between gap-2">
                  <div>
                    <p class="font-semibold text-sm text-gray-800 flex items-center gap-1.5">
                      {{ addr.label }}
                      <span v-if="addr.isPrimary" class="text-xs bg-primary text-white px-1.5 py-0.5 rounded-full">Primary</span>
                    </p>
                    <p class="text-gray-500 text-xs mt-1 leading-relaxed">{{ addr.address }}</p>
                    <p class="text-gray-500 text-xs">{{ addr.city }}, {{ addr.state }} {{ addr.pincode }}</p>
                  </div>
                  <button class="text-gold text-sm hover:text-primary">✏</button>
                </div>
              </div>
            </div>
          </div>

          <!-- Quick Stats -->
          <div class="bg-white rounded-2xl p-5 shadow-card">
            <h3 class="font-serif font-bold text-gray-800 mb-4">My Statistics</h3>
            <div class="space-y-3">
              <div v-for="stat in userStats" :key="stat.label" class="flex items-center justify-between">
                <span class="text-sm text-gray-600 flex items-center gap-2"><span>{{ stat.icon }}</span>{{ stat.label }}</span>
                <span class="font-bold text-primary text-sm">{{ stat.value }}</span>
              </div>
            </div>
          </div>

          <!-- Actions -->
          <div class="bg-white rounded-2xl p-5 shadow-card space-y-2">
            <NuxtLink to="/orders" class="flex items-center gap-3 p-2.5 hover:bg-cream rounded-xl transition-colors text-sm text-gray-700">
              <span class="text-gold text-lg">📦</span> Track Orders
            </NuxtLink>
            <NuxtLink to="/wishlist" class="flex items-center gap-3 p-2.5 hover:bg-cream rounded-xl transition-colors text-sm text-gray-700">
              <span class="text-gold text-lg">♡</span> My Wishlist
            </NuxtLink>
            <button @click="logout" class="flex items-center gap-3 p-2.5 hover:bg-red-50 rounded-xl transition-colors text-sm text-crimson w-full text-left">
              <span class="text-lg">🚪</span> Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({ title: 'My Account — JaihindMill' })

const activeTab = ref('summary')

const profileTabs = [
  { key: 'summary', label: 'Summary' },
  { key: 'profile', label: 'Profile' },
]

const user = reactive({
  name: 'Jaihind Mill',
  email: 'user@jaihindmill.com',
  location: 'Mumbai, Maharashtra',
  loyaltyPoints: 578,
  memberSince: 'Jan 2022',
})

const editForm = reactive({
  name: 'Jaihind Mill',
  email: 'user@jaihindmill.com',
  phone: '+91 98765 43210',
  dob: '',
})

const mockOrders = [
  {
    id: 'ORD-20240101',
    name: 'Crimson Banarasi Silk Saree',
    date: 'Jan 25, 2024',
    items: 1,
    amount: 4999,
    originalAmount: 8500,
    status: 'Delivered',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=100&h=130&fit=crop',
  },
  {
    id: 'ORD-20240215',
    name: 'Royal Kanjivaram Silk Saree',
    date: 'Feb 15, 2024',
    items: 2,
    amount: 6999,
    originalAmount: 12000,
    status: 'Processing',
    image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=100&h=130&fit=crop',
  },
  {
    id: 'ORD-20240310',
    name: 'Teal Chanderi Silk Saree',
    date: 'Mar 10, 2024',
    items: 1,
    amount: 2299,
    originalAmount: 3999,
    status: 'Shipped',
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=100&h=130&fit=crop',
  },
]

const addresses = [
  {
    label: 'Home',
    address: '123, Silk Mill Road, Andheri West',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400053',
    isPrimary: true,
  },
  {
    label: 'Office',
    address: '456, Business Park, Powai',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400072',
    isPrimary: false,
  },
]

const userStats = [
  { icon: '📦', label: 'Total Orders', value: '12' },
  { icon: '💰', label: 'Total Spent', value: '₹45,680' },
  { icon: '♡', label: 'Wishlist Items', value: '8' },
  { icon: '⭐', label: 'Reviews Given', value: '5' },
]

const logout = () => {
  navigateTo('/auth/login')
}
</script>
