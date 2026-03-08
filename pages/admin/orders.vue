<template>
  <div class="space-y-5">

    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      <div>
        <h1 class="font-serif text-2xl font-bold text-gray-800">Orders</h1>
        <p class="text-gray-400 text-sm mt-0.5">{{ adminStore.totalOrders }} total · {{ adminStore.activeOrders }} active</p>
      </div>
      <button @click="exportOrdersCSV" class="flex items-center gap-2 border border-gray-200 text-gray-600 hover:bg-gray-50 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors self-start">
        📥 Export CSV
      </button>
    </div>

    <!-- Status Tabs -->
    <div class="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
      <button
        v-for="tab in statusTabs"
        :key="tab.value"
        @click="activeTab = tab.value"
        :class="['flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-colors flex-shrink-0',
          activeTab === tab.value ? 'bg-primary text-white shadow-sm' : 'bg-white text-gray-500 hover:bg-gray-50 border border-gray-200']"
      >
        {{ tab.icon }} {{ tab.label }}
        <span v-if="tab.count" :class="['text-xs px-1.5 py-0.5 rounded-full', activeTab === tab.value ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500']">
          {{ tab.count }}
        </span>
      </button>
    </div>

    <!-- Search & Filter -->
    <div class="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
      <div class="flex flex-col sm:flex-row gap-3">
        <div class="relative flex-1 min-w-0">
          <input v-model="search" type="text" placeholder="Search by order #, customer name, city..."
            class="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-sm outline-none focus:border-primary transition-colors" />
          <span class="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔍</span>
        </div>
        <select v-model="filterPayment" class="border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-600 outline-none focus:border-primary flex-shrink-0">
          <option value="">All Payments</option>
          <option value="UPI">UPI</option>
          <option value="Card">Card</option>
          <option value="COD">COD</option>
          <option value="NetBanking">Net Banking</option>
        </select>
      </div>
    </div>

    <!-- Orders Table -->
    <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full min-w-[780px]">
          <thead class="bg-gray-50 border-b border-gray-100">
            <tr>
              <th class="text-left text-xs font-medium text-gray-400 px-5 md:px-6 py-3.5 whitespace-nowrap">Order</th>
              <th class="text-left text-xs font-medium text-gray-400 px-4 py-3.5 whitespace-nowrap">Customer</th>
              <th class="text-left text-xs font-medium text-gray-400 px-4 py-3.5 whitespace-nowrap">Items</th>
              <th class="text-left text-xs font-medium text-gray-400 px-4 py-3.5 whitespace-nowrap">Amount</th>
              <th class="text-left text-xs font-medium text-gray-400 px-4 py-3.5 whitespace-nowrap">Payment</th>
              <th class="text-left text-xs font-medium text-gray-400 px-4 py-3.5 whitespace-nowrap">Status</th>
              <th class="text-left text-xs font-medium text-gray-400 px-4 py-3.5 whitespace-nowrap">Update</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-50">
            <tr v-if="filteredOrders.length === 0">
              <td colspan="7" class="px-6 py-12 text-center text-gray-400 text-sm">No orders found</td>
            </tr>
            <tr v-for="order in paginatedOrders" :key="order.id" class="hover:bg-gray-50/40 transition-colors">
              <td class="px-5 md:px-6 py-4">
                <p class="text-sm font-semibold text-gray-800 whitespace-nowrap">{{ order.orderNo }}</p>
                <p class="text-xs text-gray-400 mt-0.5 whitespace-nowrap">{{ order.date }}</p>
              </td>
              <td class="px-4 py-4">
                <p class="text-sm font-medium text-gray-800 whitespace-nowrap">{{ order.customer }}</p>
                <p class="text-xs text-gray-400 whitespace-nowrap">{{ order.city }}, {{ order.state }}</p>
                <p class="text-xs text-gray-400">{{ order.phone }}</p>
              </td>
              <td class="px-4 py-4">
                <div class="space-y-1 w-[160px]">
                  <div v-for="item in order.items" :key="item.productId" class="text-xs text-gray-600 truncate">
                    {{ item.qty }}× {{ item.name }}
                  </div>
                </div>
              </td>
              <td class="px-4 py-4">
                <p class="text-sm font-bold text-gray-800 whitespace-nowrap">₹{{ order.total.toLocaleString('en-IN') }}</p>
                <span :class="['text-xs font-medium', order.paymentStatus === 'Paid' ? 'text-green-600' : order.paymentStatus === 'Failed' ? 'text-red-500' : 'text-amber-600']">
                  {{ order.paymentStatus }}
                </span>
              </td>
              <td class="px-4 py-4">
                <span class="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-lg whitespace-nowrap">{{ order.paymentMethod }}</span>
              </td>
              <td class="px-4 py-4">
                <span :class="statusBadge(order.status)" class="text-xs font-medium px-2.5 py-1 rounded-full capitalize whitespace-nowrap">
                  {{ order.status.replace(/-/g, ' ') }}
                </span>
                <p v-if="order.deliveryDate" class="text-xs text-gray-400 mt-1 whitespace-nowrap">Delivered {{ order.deliveryDate }}</p>
              </td>
              <td class="px-4 py-4">
                <select
                  :value="order.status"
                  @change="(e) => adminStore.updateOrderStatus(order.id, (e.target as HTMLSelectElement).value as any)"
                  class="border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs text-gray-600 outline-none focus:border-primary transition-colors w-full min-w-[130px]"
                >
                  <option value="placed">Placed</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="out-for-delivery">Out for Delivery</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div v-if="totalPages > 1" class="border-t border-gray-100 px-5 md:px-6 py-4 flex items-center justify-between gap-4 flex-wrap">
        <p class="text-xs text-gray-400 flex-shrink-0">
          Showing {{ (page - 1) * perPage + 1 }}–{{ Math.min(page * perPage, filteredOrders.length) }} of {{ filteredOrders.length }}
        </p>
        <div class="flex gap-1.5 flex-wrap">
          <button v-for="p in totalPages" :key="p" @click="page = p"
            :class="['w-8 h-8 rounded-lg text-sm font-medium transition-colors', p === page ? 'bg-primary text-white' : 'text-gray-500 hover:bg-gray-100']">
            {{ p }}
          </button>
        </div>
      </div>
    </div>

    <!-- Order Detail Modal -->
    <Teleport to="body">
      <div v-if="viewOrder" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" @click.self="viewOrder = null">
        <div class="bg-white rounded-2xl shadow-2xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto">
          <div class="flex items-center justify-between mb-5">
            <h3 class="font-semibold text-gray-800">{{ viewOrder.orderNo }}</h3>
            <button @click="viewOrder = null" class="text-gray-400 hover:text-gray-600 text-xl">✕</button>
          </div>
          <!-- Order details... -->
          <div class="space-y-3 text-sm">
            <div class="grid grid-cols-2 gap-2">
              <div class="bg-gray-50 rounded-xl p-3">
                <p class="text-xs text-gray-400">Customer</p>
                <p class="font-semibold">{{ viewOrder.customer }}</p>
                <p class="text-gray-400 text-xs">{{ viewOrder.email }}</p>
                <p class="text-gray-400 text-xs">{{ viewOrder.phone }}</p>
              </div>
              <div class="bg-gray-50 rounded-xl p-3">
                <p class="text-xs text-gray-400">Delivery</p>
                <p class="font-semibold">{{ viewOrder.city }}, {{ viewOrder.state }}</p>
                <p class="text-gray-400 text-xs capitalize">{{ viewOrder.status.replace(/-/g,' ') }}</p>
              </div>
            </div>
            <div class="border border-gray-100 rounded-xl overflow-hidden">
              <div class="bg-gray-50 px-4 py-2.5 text-xs font-medium text-gray-500">Items Ordered</div>
              <div class="divide-y divide-gray-50">
                <div v-for="item in viewOrder.items" :key="item.productId" class="flex justify-between px-4 py-3">
                  <span class="text-gray-700">{{ item.qty }}× {{ item.name }} <span class="text-gray-400">({{ item.color }})</span></span>
                  <span class="font-semibold">₹{{ (item.price * item.qty).toLocaleString('en-IN') }}</span>
                </div>
                <div class="flex justify-between px-4 py-3 font-semibold bg-primary/5">
                  <span>Total</span>
                  <span class="text-primary">₹{{ viewOrder.total.toLocaleString('en-IN') }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin' })

import { useAdminStore } from '~/stores/admin'
import type { AdminOrder } from '~/stores/admin'

const adminStore = useAdminStore()
const activeTab = ref('all')
const search = ref('')
const filterPayment = ref('')
const page = ref(1)
const perPage = 8
const viewOrder = ref<AdminOrder | null>(null)

const statusTabs = computed(() => [
  { value: 'all', label: 'All', icon: '📋', count: adminStore.totalOrders },
  { value: 'placed', label: 'Placed', icon: '🆕', count: adminStore.orders.filter(o => o.status === 'placed').length },
  { value: 'processing', label: 'Processing', icon: '⚙️', count: adminStore.orders.filter(o => o.status === 'processing').length },
  { value: 'shipped', label: 'Shipped', icon: '🚢', count: adminStore.orders.filter(o => o.status === 'shipped').length },
  { value: 'out-for-delivery', label: 'Out for Delivery', icon: '🏍️', count: adminStore.orders.filter(o => o.status === 'out-for-delivery').length },
  { value: 'delivered', label: 'Delivered', icon: '✅', count: adminStore.deliveredOrders },
  { value: 'cancelled', label: 'Cancelled', icon: '❌', count: adminStore.orders.filter(o => o.status === 'cancelled').length },
])

const filteredOrders = computed(() => {
  let list = adminStore.orders
  if (activeTab.value !== 'all') list = list.filter(o => o.status === activeTab.value)
  if (search.value) {
    const q = search.value.toLowerCase()
    list = list.filter(o => o.orderNo.toLowerCase().includes(q) || o.customer.toLowerCase().includes(q) || o.city.toLowerCase().includes(q))
  }
  if (filterPayment.value) list = list.filter(o => o.paymentMethod === filterPayment.value)
  return list
})

const totalPages = computed(() => Math.ceil(filteredOrders.value.length / perPage))
const paginatedOrders = computed(() => filteredOrders.value.slice((page.value - 1) * perPage, page.value * perPage))

watch([activeTab, search, filterPayment], () => { page.value = 1 })

const statusBadge = (status: string) => ({
  placed: 'bg-blue-50 text-blue-600',
  confirmed: 'bg-violet-50 text-violet-600',
  processing: 'bg-amber-50 text-amber-600',
  shipped: 'bg-teal-50 text-teal-600',
  'out-for-delivery': 'bg-cyan-50 text-cyan-600',
  delivered: 'bg-green-50 text-green-600',
  cancelled: 'bg-red-50 text-red-500',
}[status] || 'bg-gray-50 text-gray-500')

const exportOrdersCSV = () => {
  const rows = [
    ['Order No', 'Customer', 'Email', 'Phone', 'City', 'State', 'Items', 'Total', 'Payment Method', 'Payment Status', 'Order Status', 'Date'],
    ...adminStore.orders.map(o => [
      o.orderNo, o.customer, o.email, o.phone, o.city, o.state,
      o.items.map(i => `${i.qty}x ${i.name}`).join(' | '),
      o.total, o.paymentMethod, o.paymentStatus, o.status, o.date
    ])
  ]
  const csv = rows.map(r => r.map(v => `"${v}"`).join(',')).join('\n')
  const blob = new Blob([csv], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'jaihindmill-orders.csv'
  a.click()
}
</script>
