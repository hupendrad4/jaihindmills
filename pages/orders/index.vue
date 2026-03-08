<template>
  <div class="min-h-screen bg-cream">
    <!-- Header -->
    <div class="bg-primary py-10 px-4 mandala-bg">
      <div class="max-w-7xl mx-auto">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="font-serif text-3xl font-bold text-white">Order History &amp; Tracking</h1>
            <p class="text-white/60 text-sm mt-1">Track and manage all your orders</p>
          </div>
          <!-- Search orders -->
          <div class="hidden md:flex items-center bg-white/10 rounded-xl px-4 py-2.5 gap-2">
            <svg class="w-4 h-4 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
            <input type="text" placeholder="Search orders..." class="bg-transparent text-white placeholder-white/40 text-sm outline-none w-40" />
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 lg:px-6 py-8">
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">

        <!-- Left: Order Tracking Timeline (Image 7) -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-2xl shadow-card overflow-hidden sticky top-24">
            <!-- Current order header -->
            <div class="bg-primary-dark p-4">
              <p class="text-white/60 text-xs">Tracking Order</p>
              <p class="text-white font-bold text-sm mt-0.5">{{ selectedOrder?.id || 'Select an order' }}</p>
              <p v-if="selectedOrder" class="text-white/50 text-xs mt-1">{{ selectedOrder.date }}</p>
            </div>

            <div class="p-5">
              <OrderTimeline v-if="selectedOrder" :current-status="selectedOrder.trackingStatus" />

              <div v-else class="text-center py-8 text-gray-400 text-sm">
                <p class="text-3xl mb-2">📦</p>
                Select an order to track
              </div>
            </div>
          </div>
        </div>

        <!-- Right: Orders List -->
        <div class="lg:col-span-3">

          <!-- Filter -->
          <div class="flex items-center gap-3 mb-5 flex-wrap">
            <button
              v-for="status in statusFilters"
              :key="status"
              @click="activeStatus = status"
              :class="[
                'px-4 py-1.5 rounded-full text-sm font-medium transition-all',
                activeStatus === status ? 'bg-primary text-white' : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
              ]"
            >{{ status }}</button>

            <select class="ml-auto text-sm border border-gray-200 rounded-lg px-3 py-1.5 bg-white outline-none focus:border-gold">
              <option>All Time</option>
              <option>Last 30 Days</option>
              <option>Last 3 Months</option>
              <option>Last Year</option>
            </select>
          </div>

          <!-- Orders -->
          <div class="space-y-4">
            <div
              v-for="order in filteredOrders"
              :key="order.id"
              @click="selectedOrder = order"
              :class="[
                'bg-white rounded-2xl p-5 shadow-card cursor-pointer transition-all duration-200 border-2',
                selectedOrder?.id === order.id ? 'border-primary shadow-card-hover' : 'border-transparent hover:border-primary/30'
              ]"
            >
              <div class="flex gap-4">
                <!-- Product Image -->
                <div class="relative flex-shrink-0">
                  <img
                    :src="order.image"
                    :alt="order.name"
                    class="w-20 h-24 object-cover rounded-xl"
                  />
                  <div class="absolute -bottom-2 -right-2 bg-white rounded-full p-1.5 shadow-md">
                    <span class="text-lg">{{ statusIcons[order.trackingStatus] || '📦' }}</span>
                  </div>
                </div>

                <!-- Order Info -->
                <div class="flex-1 min-w-0">
                  <div class="flex items-start justify-between gap-2 mb-1">
                    <p class="text-gray-400 text-xs">{{ order.id }}</p>
                    <span :class="[
                      'text-xs font-semibold px-2.5 py-1 rounded-full flex-shrink-0',
                      order.trackingStatus === 'delivered' ? 'bg-green-100 text-green-700' :
                      order.trackingStatus === 'shipped' || order.trackingStatus === 'out-for-delivery' ? 'bg-orange-100 text-orange-700' :
                      order.trackingStatus === 'processing' || order.trackingStatus === 'confirmed' ? 'bg-blue-100 text-blue-700' :
                      'bg-gray-100 text-gray-600'
                    ]">{{ statusLabels[order.trackingStatus] }}</span>
                  </div>

                  <h3 class="font-semibold text-gray-800 text-sm leading-snug mb-1 line-clamp-2">{{ order.name }}</h3>
                  <p class="text-xs text-gray-500">{{ order.date }} · {{ order.items }} item{{ order.items > 1 ? 's' : '' }}</p>

                  <!-- Progress bar -->
                  <div class="mt-3">
                    <div class="flex justify-between text-xs text-gray-400 mb-1">
                      <span>Order Progress</span>
                      <span>{{ statusPercent[order.trackingStatus] }}%</span>
                    </div>
                    <div class="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        :style="{ width: `${statusPercent[order.trackingStatus]}%` }"
                        :class="[
                          'h-full rounded-full transition-all duration-500',
                          order.trackingStatus === 'delivered' ? 'bg-teal' :
                          order.trackingStatus === 'out-for-delivery' ? 'bg-orange-400' :
                          'bg-gold'
                        ]"
                      ></div>
                    </div>
                  </div>
                </div>

                <!-- Amount -->
                <div class="text-right flex-shrink-0">
                  <p class="font-bold text-primary">₹{{ order.amount.toLocaleString('en-IN') }}</p>
                  <p class="text-xs text-gray-400 line-through">₹{{ order.originalAmount.toLocaleString('en-IN') }}</p>
                  <div class="mt-3 space-y-1.5">
                    <button @click.stop="selectedOrder = order" class="block text-xs text-teal hover:underline">Track</button>
                    <button class="block text-xs text-gray-400 hover:text-crimson">Return</button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Empty State -->
            <div v-if="filteredOrders.length === 0" class="text-center py-20 bg-white rounded-2xl shadow-card">
              <div class="text-5xl mb-4">📭</div>
              <h3 class="font-serif text-xl font-bold text-gray-600 mb-2">No {{ activeStatus !== 'All' ? activeStatus.toLowerCase() : '' }} orders</h3>
              <NuxtLink to="/shop" class="btn-primary mt-4 inline-flex">Start Shopping</NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({ title: 'My Orders — JaihindMill' })

const activeStatus = ref('All')
const statusFilters = ['All', 'Active', 'Delivered', 'Cancelled']

const statusLabels: Record<string, string> = {
  placed: 'Order Placed',
  confirmed: 'Confirmed',
  processing: 'Processing',
  shipped: 'Shipped',
  'out-for-delivery': 'Out for Delivery',
  delivered: 'Delivered',
}

const statusIcons: Record<string, string> = {
  placed: '🛒',
  confirmed: '✅',
  processing: '⚙️',
  shipped: '📦',
  'out-for-delivery': '🚚',
  delivered: '🎁',
}

const statusPercent: Record<string, number> = {
  placed: 10,
  confirmed: 25,
  processing: 45,
  shipped: 70,
  'out-for-delivery': 90,
  delivered: 100,
}

const orders = [
  {
    id: 'JHM-20240125-1001',
    name: 'Crimson Banarasi Silk Saree — Wedding Collection',
    date: 'Jan 25, 2024',
    items: 1,
    amount: 4999,
    originalAmount: 8500,
    trackingStatus: 'delivered',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=120&h=150&fit=crop',
  },
  {
    id: 'JHM-20240215-1002',
    name: 'Royal Kanjivaram Silk Saree — Peacock Blue',
    date: 'Feb 15, 2024',
    items: 2,
    amount: 6999,
    originalAmount: 12000,
    trackingStatus: 'out-for-delivery',
    image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=120&h=150&fit=crop',
  },
  {
    id: 'JHM-20240310-1003',
    name: 'Teal Chanderi Silk Saree + Blouse Set',
    date: 'Mar 10, 2024',
    items: 1,
    amount: 2299,
    originalAmount: 3999,
    trackingStatus: 'shipped',
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=120&h=150&fit=crop',
  },
  {
    id: 'JHM-20240320-1004',
    name: 'Magenta Organza Saree — Festival Special',
    date: 'Mar 20, 2024',
    items: 1,
    amount: 1899,
    originalAmount: 3200,
    trackingStatus: 'processing',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=120&h=150&fit=crop',
  },
  {
    id: 'JHM-20240325-1005',
    name: 'Mustard Patola Silk Saree — Heritage Edition',
    date: 'Mar 25, 2024',
    items: 1,
    amount: 8999,
    originalAmount: 15000,
    trackingStatus: 'placed',
    image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=120&h=150&fit=crop',
  },
]

const selectedOrder = ref(orders[0])

const filteredOrders = computed(() => {
  if (activeStatus.value === 'All') return orders
  if (activeStatus.value === 'Active') return orders.filter(o => o.trackingStatus !== 'delivered')
  if (activeStatus.value === 'Delivered') return orders.filter(o => o.trackingStatus === 'delivered')
  if (activeStatus.value === 'Cancelled') return []
  return orders
})
</script>
