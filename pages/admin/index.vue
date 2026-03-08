<template>
  <div class="space-y-6">

    <!-- Page Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="font-serif text-2xl font-bold text-gray-800">Dashboard</h1>
        <p class="text-gray-400 text-sm mt-0.5">Welcome back! Here's what's happening today.</p>
      </div>
      <div class="text-sm text-gray-400">{{ today }}</div>
    </div>

    <!-- KPI Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div v-for="kpi in kpiCards" :key="kpi.label" class="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
        <div class="flex items-center justify-between mb-3">
          <span class="text-2xl">{{ kpi.icon }}</span>
          <span :class="['text-xs font-medium px-2 py-0.5 rounded-full', kpi.trend > 0 ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-500']">
            {{ kpi.trend > 0 ? '+' : '' }}{{ kpi.trend }}%
          </span>
        </div>
        <p class="text-xl font-bold text-gray-800 truncate">{{ kpi.value }}</p>
        <p class="text-xs text-gray-400 mt-0.5">{{ kpi.label }}</p>
      </div>
    </div>

    <!-- Revenue Chart + Order Status -->
    <div class="grid grid-cols-1 xl:grid-cols-3 gap-6">

      <!-- Monthly Revenue Bar Chart -->
      <div class="xl:col-span-2 bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-gray-100">
        <div class="flex items-center justify-between mb-5">
          <h2 class="font-semibold text-gray-800">Monthly Revenue</h2>
          <span class="text-xs text-gray-400 bg-gray-50 px-3 py-1 rounded-lg flex-shrink-0">Last 6 months</span>
        </div>

        <!-- Scrollable chart wrapper to prevent horizontal overflow -->
        <div class="overflow-x-auto">
          <div class="flex gap-2 min-w-[320px]" style="min-height: 160px;">
            <div
              v-for="month in adminStore.monthlyRevenue"
              :key="month.month"
              class="flex-1 flex flex-col items-center gap-1.5 min-w-[40px]"
            >
              <!-- Value label above bar -->
              <span class="text-xs font-semibold text-gray-600 whitespace-nowrap">₹{{ (month.revenue / 1000).toFixed(0) }}k</span>

              <!-- Bar track, bar grows from bottom -->
              <div class="w-full rounded-t-lg bg-primary/10 relative flex-1">
                <div
                  class="absolute bottom-0 left-0 right-0 bg-primary rounded-t-lg transition-all duration-700 hover:bg-crimson"
                  :style="{ height: `${Math.round((month.revenue / maxRevenue) * 100)}%` }"
                ></div>
              </div>

              <!-- Month and orders below bar -->
              <span class="text-xs text-gray-500 font-medium whitespace-nowrap">{{ month.month }}</span>
              <span class="text-xs text-gray-300 whitespace-nowrap">{{ month.orders }} orders</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Order Status -->
      <div class="bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-gray-100">
        <h2 class="font-semibold text-gray-800 mb-5">Order Status</h2>
        <div class="space-y-3">
          <div v-for="status in orderStatusBreakdown" :key="status.label" class="flex items-center gap-3">
            <div class="w-3 h-3 rounded-full flex-shrink-0" :style="{ backgroundColor: status.color }"></div>
            <div class="flex-1 min-w-0">
              <div class="flex justify-between text-sm mb-1">
                <span class="text-gray-600 capitalize truncate pr-1">{{ status.label.replace(/-/g, ' ') }}</span>
                <span class="font-semibold text-gray-800 flex-shrink-0">{{ status.count }}</span>
              </div>
              <div class="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div class="h-full rounded-full" :style="{ width: `${status.pct}%`, backgroundColor: status.color }"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Recent Orders + Top Categories -->
    <div class="grid grid-cols-1 xl:grid-cols-3 gap-6">

      <!-- Recent Orders -->
      <div class="xl:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div class="flex items-center justify-between px-5 md:px-6 py-4 border-b border-gray-100">
          <h2 class="font-semibold text-gray-800">Recent Orders</h2>
          <NuxtLink to="/admin/orders" class="text-xs text-primary hover:underline font-medium flex-shrink-0">View all →</NuxtLink>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full min-w-[480px]">
            <thead class="bg-gray-50">
              <tr>
                <th class="text-left text-xs font-medium text-gray-400 px-5 md:px-6 py-3">Order</th>
                <th class="text-left text-xs font-medium text-gray-400 px-4 py-3">Customer</th>
                <th class="text-left text-xs font-medium text-gray-400 px-4 py-3">Amount</th>
                <th class="text-left text-xs font-medium text-gray-400 px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-50">
              <tr v-for="order in recentOrders" :key="order.id" class="hover:bg-gray-50/50 transition-colors">
                <td class="px-5 md:px-6 py-3.5">
                  <p class="text-sm font-medium text-gray-800">{{ order.orderNo }}</p>
                  <p class="text-xs text-gray-400">{{ order.date }}</p>
                </td>
                <td class="px-4 py-3.5">
                  <p class="text-sm text-gray-700">{{ order.customer }}</p>
                  <p class="text-xs text-gray-400">{{ order.city }}</p>
                </td>
                <td class="px-4 py-3.5">
                  <p class="text-sm font-semibold text-gray-800 whitespace-nowrap">₹{{ order.total.toLocaleString('en-IN') }}</p>
                </td>
                <td class="px-4 py-3.5">
                  <span :class="statusClass(order.status)" class="text-xs font-medium px-2.5 py-1 rounded-full capitalize whitespace-nowrap">
                    {{ order.status.replace(/-/g, ' ') }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Top Categories -->
      <div class="bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-gray-100">
        <div class="flex items-center justify-between mb-5">
          <h2 class="font-semibold text-gray-800">Top Categories</h2>
          <NuxtLink to="/admin/analytics" class="text-xs text-primary hover:underline flex-shrink-0">Details →</NuxtLink>
        </div>
        <div class="space-y-4">
          <div v-for="cat in adminStore.categoryBreakdown.slice(0, 5)" :key="cat.name">
            <div class="flex justify-between text-sm mb-1.5 gap-2">
              <span class="text-gray-600 font-medium truncate">{{ cat.name }}</span>
              <span class="text-gray-800 font-semibold flex-shrink-0 whitespace-nowrap">₹{{ cat.revenue.toLocaleString('en-IN') }}</span>
            </div>
            <div class="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                class="h-full bg-primary rounded-full"
                :style="{ width: `${(cat.revenue / maxCatRevenue) * 100}%` }"
              ></div>
            </div>
            <p class="text-xs text-gray-400 mt-0.5">{{ cat.count }} items sold</p>
          </div>
        </div>

        <!-- Quick stats -->
        <div class="mt-6 pt-5 border-t border-gray-100 grid grid-cols-2 gap-3">
          <div class="bg-primary/5 rounded-xl p-3 text-center">
            <p class="text-xl font-bold text-primary">{{ adminStore.inStockCount }}</p>
            <p class="text-xs text-gray-400 mt-0.5">In Stock</p>
          </div>
          <div class="bg-red-50 rounded-xl p-3 text-center">
            <p class="text-xl font-bold text-red-500">{{ adminStore.totalProducts - adminStore.inStockCount }}</p>
            <p class="text-xs text-gray-400 mt-0.5">Out of Stock</p>
          </div>
        </div>
      </div>
    </div>

    <!-- State Revenue -->
    <div class="bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-gray-100">
      <div class="flex items-center justify-between mb-5">
        <h2 class="font-semibold text-gray-800">Revenue by State</h2>
        <span class="text-xs text-gray-400 flex-shrink-0">{{ adminStore.stateBreakdown.length }} states</span>
      </div>
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
        <div
          v-for="(item, idx) in adminStore.stateBreakdown"
          :key="item.state"
          class="rounded-xl p-3 text-center"
          :style="{ backgroundColor: `hsl(${340 - idx * 15}, 60%, ${96 - idx * 2}%)` }"
        >
          <p class="font-bold text-sm text-gray-800 whitespace-nowrap">₹{{ (item.revenue / 1000).toFixed(1) }}k</p>
          <p class="text-xs text-gray-500 mt-0.5 truncate">{{ item.state }}</p>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin' })

import { useAdminStore } from '~/stores/admin'

const adminStore = useAdminStore()

const today = new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })

const kpiCards = computed(() => [
  { label: 'Total Revenue', value: `₹${adminStore.totalRevenue.toLocaleString('en-IN')}`, icon: '💰', trend: 12.5 },
  { label: 'Total Orders', value: adminStore.totalOrders, icon: '📦', trend: 8.2 },
  { label: 'Active Orders', value: adminStore.activeOrders, icon: '🚚', trend: -3.1 },
  { label: 'Avg. Order Value', value: `₹${adminStore.avgOrderValue.toLocaleString('en-IN')}`, icon: '📊', trend: 5.7 },
])

const maxRevenue = computed(() => Math.max(...adminStore.monthlyRevenue.map(m => m.revenue)))
const maxCatRevenue = computed(() => adminStore.categoryBreakdown[0]?.revenue || 1)

const recentOrders = computed(() => adminStore.orders.slice(0, 6))

const statusColors: Record<string, string> = {
  placed: '#3B82F6',
  confirmed: '#8B5CF6',
  processing: '#F59E0B',
  shipped: '#0B6B6B',
  'out-for-delivery': '#06B6D4',
  delivered: '#10B981',
  cancelled: '#EF4444',
}

const orderStatusBreakdown = computed(() => {
  const counts: Record<string, number> = {}
  adminStore.orders.forEach(o => { counts[o.status] = (counts[o.status] || 0) + 1 })
  const total = adminStore.totalOrders
  return Object.entries(counts).map(([label, count]) => ({
    label,
    count,
    pct: Math.round((count / total) * 100),
    color: statusColors[label] || '#9CA3AF',
  }))
})

const statusClass = (status: string) => ({
  placed: 'bg-blue-50 text-blue-600',
  confirmed: 'bg-violet-50 text-violet-600',
  processing: 'bg-amber-50 text-amber-600',
  shipped: 'bg-teal-50 text-teal-600',
  'out-for-delivery': 'bg-cyan-50 text-cyan-600',
  delivered: 'bg-green-50 text-green-600',
  cancelled: 'bg-red-50 text-red-500',
}[status] || 'bg-gray-50 text-gray-500')
</script>
