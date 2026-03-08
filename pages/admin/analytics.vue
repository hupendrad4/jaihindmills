<template>
  <div class="space-y-6">

    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="font-serif text-2xl font-bold text-gray-800">Analytics</h1>
        <p class="text-gray-400 text-sm mt-0.5">Store performance overview</p>
      </div>
      <span class="text-xs text-gray-400 bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-lg">Mar 2024 – Present</span>
    </div>

    <!-- Top KPIs -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div v-for="kpi in kpis" :key="kpi.label" class="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 relative overflow-hidden">
        <div class="absolute top-0 right-0 w-20 h-20 rounded-full -mr-6 -mt-6 opacity-10" :style="{ backgroundColor: kpi.color }"></div>
        <p class="text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">{{ kpi.label }}</p>
        <p class="text-xl font-bold text-gray-800 truncate">{{ kpi.value }}</p>
        <p v-if="kpi.sub" class="text-xs text-gray-400 mt-1">{{ kpi.sub }}</p>
      </div>
    </div>

    <!-- Revenue Trend + Conversion -->
    <div class="grid grid-cols-1 xl:grid-cols-3 gap-6">

      <!-- Revenue Bar Chart (full width style) -->
      <div class="xl:col-span-2 bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-gray-100">
        <div class="flex flex-wrap items-start justify-between gap-3 mb-5">
          <div>
            <h2 class="font-semibold text-gray-800">Revenue Trend</h2>
            <p class="text-xs text-gray-400 mt-0.5">Monthly revenue in ₹</p>
          </div>
          <div class="flex items-center gap-3 text-xs text-gray-400 flex-shrink-0">
            <span class="flex items-center gap-1.5"><span class="w-3 h-3 rounded bg-primary inline-block"></span>Revenue</span>
            <span class="flex items-center gap-1.5"><span class="w-3 h-3 rounded bg-gold inline-block"></span>Orders</span>
          </div>
        </div>

        <!-- Scrollable chart wrapper -->
        <div class="overflow-x-auto">
          <div class="flex items-end gap-3 min-w-[320px]" style="height: 180px;">
            <div v-for="(month, idx) in adminStore.monthlyRevenue" :key="month.month"
              class="flex-1 flex flex-col items-center gap-1.5 group cursor-pointer relative h-full min-w-[36px]">

              <!-- Tooltip -->
              <div class="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2.5 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
                <p class="font-semibold">₹{{ month.revenue.toLocaleString('en-IN') }}</p>
                <p class="text-gray-300">{{ month.orders }} orders</p>
              </div>

              <!-- Bars -->
              <div class="w-full flex gap-0.5 items-end flex-1">
                <!-- Revenue bar -->
                <div class="flex-1 rounded-t-md bg-primary/15 relative overflow-hidden h-full">
                  <div class="absolute bottom-0 left-0 right-0 bg-primary rounded-t-md transition-all duration-700 delay-100"
                    :style="{ height: `${(month.revenue / maxRevenue) * 100}%` }"></div>
                </div>
                <!-- Orders bar -->
                <div class="flex-1 rounded-t-md bg-gold/10 relative overflow-hidden h-full">
                  <div class="absolute bottom-0 left-0 right-0 bg-gold rounded-t-md transition-all duration-700"
                    :style="{ height: `${(month.orders / maxOrders) * 100}%` }"></div>
                </div>
              </div>

              <span class="text-xs text-gray-500 font-medium whitespace-nowrap">{{ month.month }}</span>
            </div>
          </div>
        </div>

        <!-- Summary row -->
        <div class="mt-5 pt-5 border-t border-gray-100 grid grid-cols-3 gap-4 text-center">
          <div>
            <p class="text-base md:text-lg font-bold text-primary truncate">₹{{ totalRevenue.toLocaleString('en-IN') }}</p>
            <p class="text-xs text-gray-400">Total Revenue</p>
          </div>
          <div>
            <p class="text-base md:text-lg font-bold text-gold">{{ totalOrderCount }}</p>
            <p class="text-xs text-gray-400">Total Orders</p>
          </div>
          <div>
            <p class="text-base md:text-lg font-bold text-teal-600 truncate">₹{{ avgOrderVal.toLocaleString('en-IN') }}</p>
            <p class="text-xs text-gray-400">Avg. Order</p>
          </div>
        </div>
      </div>

      <!-- Funnel / Conversion -->
      <div class="bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-gray-100">
        <h2 class="font-semibold text-gray-800 mb-1">Order Funnel</h2>
        <p class="text-xs text-gray-400 mb-5">Conversion stages</p>
        <div class="space-y-3">
          <div v-for="stage in funnel" :key="stage.label" class="relative">
            <div class="flex justify-between text-sm mb-1.5">
              <span class="text-gray-600 truncate pr-2">{{ stage.label }}</span>
              <span class="font-semibold text-gray-800 flex-shrink-0">{{ stage.count }}</span>
            </div>
            <div class="h-3 bg-gray-100 rounded-full overflow-hidden">
              <div class="h-full rounded-full transition-all duration-700"
                :style="{ width: `${stage.pct}%`, backgroundColor: stage.color }"></div>
            </div>
            <span class="text-xs text-gray-400">{{ stage.pct }}%</span>
          </div>
        </div>

        <!-- Payment mix -->
        <div class="mt-6 pt-5 border-t border-gray-100">
          <p class="text-sm font-semibold text-gray-700 mb-3">Payment Methods</p>
          <div class="space-y-2">
            <div v-for="pm in paymentMix" :key="pm.method" class="flex items-center gap-2">
              <span class="text-xs text-gray-500 w-20 flex-shrink-0">{{ pm.method }}</span>
              <div class="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div class="h-full bg-primary/60 rounded-full" :style="{ width: `${pm.pct}%` }"></div>
              </div>
              <span class="text-xs text-gray-600 font-medium w-8 text-right flex-shrink-0">{{ pm.pct }}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Category Breakdown + State Revenue -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">

      <!-- Category Revenue -->
      <div class="bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-gray-100">
        <h2 class="font-semibold text-gray-800 mb-1">Revenue by Category</h2>
        <p class="text-xs text-gray-400 mb-5">Based on completed orders</p>
        <div class="space-y-4">
          <div v-for="(cat, idx) in adminStore.categoryBreakdown" :key="cat.name">
            <div class="flex justify-between items-center mb-1.5 gap-2">
              <div class="flex items-center gap-2 min-w-0">
                <span class="text-lg flex-shrink-0">{{ catIcons[cat.name] || '🛍️' }}</span>
                <span class="text-sm font-medium text-gray-700 truncate">{{ cat.name }}</span>
              </div>
              <div class="text-right flex-shrink-0">
                <span class="text-sm font-bold text-gray-800 whitespace-nowrap">₹{{ cat.revenue.toLocaleString('en-IN') }}</span>
                <span class="text-xs text-gray-400 ml-1.5">{{ cat.count }} sold</span>
              </div>
            </div>
            <div class="h-2.5 bg-gray-100 rounded-full overflow-hidden">
              <div class="h-full rounded-full transition-all duration-700"
                :style="{ width: `${(cat.revenue / adminStore.categoryBreakdown[0].revenue) * 100}%`, backgroundColor: catColors[idx] }"></div>
            </div>
            <p class="text-xs text-gray-400 mt-1">{{ Math.round((cat.revenue / totalRevenue) * 100) }}% of total revenue</p>
          </div>
        </div>
      </div>

      <!-- State Revenue Table -->
      <div class="bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-gray-100">
        <h2 class="font-semibold text-gray-800 mb-1">Revenue by State</h2>
        <p class="text-xs text-gray-400 mb-5">Geographic distribution</p>
        <div class="space-y-3">
          <div v-for="(item, idx) in adminStore.stateBreakdown" :key="item.state" class="flex items-center gap-3">
            <div class="w-6 h-6 rounded-lg text-xs font-bold flex items-center justify-center flex-shrink-0"
              :style="{ backgroundColor: `hsl(${340 - idx * 25}, 60%, 92%)`, color: `hsl(${340 - idx * 25}, 60%, 35%)` }">
              {{ idx + 1 }}
            </div>
            <div class="flex-1 min-w-0">
              <div class="flex justify-between text-sm mb-1 gap-2">
                <span class="font-medium text-gray-700 truncate">{{ item.state }}</span>
                <span class="font-bold text-gray-800 flex-shrink-0 whitespace-nowrap">₹{{ item.revenue.toLocaleString('en-IN') }}</span>
              </div>
              <div class="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div class="h-full bg-primary rounded-full"
                  :style="{ width: `${(item.revenue / adminStore.stateBreakdown[0].revenue) * 100}%` }"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Top Products -->
    <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div class="px-5 md:px-6 py-4 border-b border-gray-100 flex items-center justify-between">
        <h2 class="font-semibold text-gray-800">Top Products by Revenue</h2>
        <NuxtLink to="/admin/products" class="text-xs text-primary hover:underline flex-shrink-0">Manage →</NuxtLink>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full min-w-[600px]">
          <thead class="bg-gray-50">
            <tr>
              <th class="text-left text-xs font-medium text-gray-400 px-5 md:px-6 py-3">#</th>
              <th class="text-left text-xs font-medium text-gray-400 px-4 py-3">Product</th>
              <th class="text-left text-xs font-medium text-gray-400 px-4 py-3">Category</th>
              <th class="text-left text-xs font-medium text-gray-400 px-4 py-3">Price</th>
              <th class="text-left text-xs font-medium text-gray-400 px-4 py-3">Rating</th>
              <th class="text-left text-xs font-medium text-gray-400 px-4 py-3">Stock</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-50">
            <tr v-for="(product, idx) in topProducts" :key="product.id" class="hover:bg-gray-50/50">
              <td class="px-5 md:px-6 py-4">
                <span class="text-sm font-bold" :class="idx < 3 ? 'text-gold' : 'text-gray-400'">{{ idx + 1 }}</span>
              </td>
              <td class="px-4 py-4">
                <div class="flex items-center gap-3">
                  <img :src="product.images[0]" class="w-10 h-10 rounded-lg object-cover flex-shrink-0" />
                  <p class="text-sm font-medium text-gray-800 max-w-[160px] truncate">{{ product.name }}</p>
                </div>
              </td>
              <td class="px-4 py-4">
                <span class="text-xs bg-primary/5 text-primary px-2 py-1 rounded capitalize whitespace-nowrap">{{ product.category }}</span>
              </td>
              <td class="px-4 py-4">
                <p class="text-sm font-semibold text-gray-800 whitespace-nowrap">₹{{ product.price.toLocaleString('en-IN') }}</p>
              </td>
              <td class="px-4 py-4">
                <div class="flex items-center gap-1 text-xs">
                  <span class="text-gold">★</span>
                  <span class="font-medium text-gray-700">{{ product.rating }}</span>
                  <span class="text-gray-400">({{ product.reviews }})</span>
                </div>
              </td>
              <td class="px-4 py-4">
                <span :class="['text-xs font-medium px-2 py-1 rounded-full whitespace-nowrap', product.inStock ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-500']">
                  {{ product.inStock ? 'In Stock' : 'Out of Stock' }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin' })

import { useAdminStore } from '~/stores/admin'

const adminStore = useAdminStore()

const totalRevenue = computed(() => adminStore.totalRevenue)
const totalOrderCount = computed(() => adminStore.monthlyRevenue.reduce((s, m) => s + m.orders, 0))
const avgOrderVal = computed(() => adminStore.avgOrderValue)

const maxRevenue = computed(() => Math.max(...adminStore.monthlyRevenue.map(m => m.revenue)))
const maxOrders = computed(() => Math.max(...adminStore.monthlyRevenue.map(m => m.orders)))

const kpis = computed(() => [
  { label: 'Total Revenue', value: `₹${totalRevenue.value.toLocaleString('en-IN')}`, sub: 'All paid orders', color: '#8B1635' },
  { label: 'Total Products', value: adminStore.totalProducts, sub: `${adminStore.inStockCount} in stock`, color: '#C9910A' },
  { label: 'Avg Order Value', value: `₹${avgOrderVal.value.toLocaleString('en-IN')}`, sub: 'Per paid order', color: '#0B6B6B' },
  { label: 'Delivered Rate', value: `${Math.round((adminStore.deliveredOrders / adminStore.totalOrders) * 100)}%`, sub: `${adminStore.deliveredOrders} of ${adminStore.totalOrders}`, color: '#10B981' },
])

const funnel = computed(() => {
  const total = adminStore.totalOrders
  const stages = [
    { label: 'Orders Placed', count: total, color: '#3B82F6' },
    { label: 'Confirmed', count: adminStore.orders.filter(o => !['placed'].includes(o.status)).length, color: '#8B5CF6' },
    { label: 'Shipped', count: adminStore.orders.filter(o => ['shipped','out-for-delivery','delivered'].includes(o.status)).length, color: '#0B6B6B' },
    { label: 'Delivered', count: adminStore.deliveredOrders, color: '#10B981' },
  ]
  return stages.map(s => ({ ...s, pct: Math.round((s.count / total) * 100) }))
})

const paymentMix = computed(() => {
  const counts: Record<string, number> = {}
  adminStore.orders.forEach(o => { counts[o.paymentMethod] = (counts[o.paymentMethod] || 0) + 1 })
  const total = adminStore.totalOrders
  return Object.entries(counts).map(([method, count]) => ({
    method,
    count,
    pct: Math.round((count / total) * 100),
  })).sort((a, b) => b.count - a.count)
})

const catColors = ['#8B1635', '#C9910A', '#0B6B6B', '#3B82F6', '#8B5CF6']
const catIcons: Record<string, string> = {
  sarees: '🥻',
  'salwar-suits': '👗',
  lehengas: '💃',
  Other: '🛍️',
}

const topProducts = computed(() =>
  [...adminStore.adminProducts]
    .sort((a, b) => b.rating * b.reviews - a.rating * a.reviews)
    .slice(0, 8)
)
</script>
