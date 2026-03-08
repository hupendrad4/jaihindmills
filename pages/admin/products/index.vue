<template>
  <div class="space-y-5">

    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      <div>
        <h1 class="font-serif text-2xl font-bold text-gray-800">Products</h1>
        <p class="text-gray-400 text-sm mt-0.5">{{ adminStore.totalProducts }} total · {{ adminStore.inStockCount }} in stock</p>
      </div>
      <div class="flex gap-3">
        <button @click="exportCSV" class="flex items-center gap-2 border border-gray-200 text-gray-600 hover:bg-gray-50 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors">
          📥 Export CSV
        </button>
        <NuxtLink to="/admin/products/add" class="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-4 py-2.5 rounded-xl text-sm font-medium transition-colors">
          ➕ Add Product
        </NuxtLink>
      </div>
    </div>

    <!-- Filters Bar -->
    <div class="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
      <div class="flex flex-col sm:flex-row gap-3">
        <div class="relative flex-1 min-w-0">
          <input
            v-model="search"
            type="text"
            placeholder="Search products by name, category..."
            class="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-sm outline-none focus:border-primary transition-colors"
          />
          <span class="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔍</span>
        </div>
        <div class="flex gap-3 flex-shrink-0">
          <select v-model="filterCategory" class="border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-600 outline-none focus:border-primary flex-1 sm:flex-none">
            <option value="">All Categories</option>
            <option value="sarees">Sarees</option>
            <option value="salwar-suits">Salwar Suits</option>
            <option value="lehengas">Lehengas</option>
          </select>
          <select v-model="filterStock" class="border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-600 outline-none focus:border-primary flex-1 sm:flex-none">
            <option value="">All Stock</option>
            <option value="in">In Stock</option>
            <option value="out">Out of Stock</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Products Table -->
    <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full min-w-[700px]">
          <thead class="bg-gray-50 border-b border-gray-100">
            <tr>
              <th class="text-left text-xs font-medium text-gray-400 px-5 md:px-6 py-3.5 w-10">
                <input type="checkbox" class="rounded" @change="toggleSelectAll" />
              </th>
              <th class="text-left text-xs font-medium text-gray-400 px-4 py-3.5">Product</th>
              <th class="text-left text-xs font-medium text-gray-400 px-4 py-3.5 whitespace-nowrap">Category</th>
              <th class="text-left text-xs font-medium text-gray-400 px-4 py-3.5 whitespace-nowrap">Price</th>
              <th class="text-left text-xs font-medium text-gray-400 px-4 py-3.5 whitespace-nowrap">Rating</th>
              <th class="text-left text-xs font-medium text-gray-400 px-4 py-3.5 whitespace-nowrap">Stock</th>
              <th class="text-left text-xs font-medium text-gray-400 px-4 py-3.5 whitespace-nowrap">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-50">
            <tr v-if="filteredProducts.length === 0">
              <td colspan="7" class="px-6 py-12 text-center text-gray-400 text-sm">No products found</td>
            </tr>
            <tr v-for="product in paginatedProducts" :key="product.id" class="hover:bg-gray-50/50 transition-colors group">
              <td class="px-5 md:px-6 py-4">
                <input type="checkbox" :value="product.id" v-model="selected" class="rounded" />
              </td>
              <td class="px-4 py-4">
                <div class="flex items-center gap-3">
                  <img :src="product.images[0]" :alt="product.name" class="w-10 h-10 rounded-lg object-cover flex-shrink-0" />
                  <div class="min-w-0">
                    <p class="text-sm font-medium text-gray-800 truncate max-w-[200px]">{{ product.name }}</p>
                    <p class="text-xs text-gray-400 mt-0.5 whitespace-nowrap">{{ product.fabric }} · {{ product.origin || 'India' }}</p>
                    <div class="flex gap-1 mt-1">
                      <span v-if="product.isNew" class="text-xs bg-green-50 text-green-600 px-1.5 py-0.5 rounded">New</span>
                      <span v-if="product.isBestSeller" class="text-xs bg-gold/10 text-yellow-700 px-1.5 py-0.5 rounded">Best</span>
                    </div>
                  </div>
                </div>
              </td>
              <td class="px-4 py-4">
                <span class="text-xs bg-primary/5 text-primary px-2 py-1 rounded-lg capitalize whitespace-nowrap">{{ product.category }}</span>
              </td>
              <td class="px-4 py-4">
                <p class="text-sm font-semibold text-gray-800 whitespace-nowrap">₹{{ product.price.toLocaleString('en-IN') }}</p>
                <p v-if="product.originalPrice" class="text-xs text-gray-400 line-through whitespace-nowrap">₹{{ product.originalPrice.toLocaleString('en-IN') }}</p>
              </td>
              <td class="px-4 py-4">
                <div class="flex items-center gap-1 text-xs">
                  <span class="text-gold">★</span>
                  <span class="text-gray-700 font-medium">{{ product.rating }}</span>
                  <span class="text-gray-400">({{ product.reviews }})</span>
                </div>
              </td>
              <td class="px-4 py-4">
                <div class="flex items-center gap-2">
                  <button @click="adminStore.toggleStock(product.id)"
                    :class="['relative inline-flex h-5 w-9 items-center rounded-full transition-colors flex-shrink-0', product.inStock ? 'bg-green-500' : 'bg-gray-300']">
                    <span :class="['inline-block h-3 w-3 transform rounded-full bg-white transition-transform mx-1', product.inStock ? 'translate-x-4' : 'translate-x-0']"></span>
                  </button>
                  <span class="text-xs whitespace-nowrap" :class="product.inStock ? 'text-green-600' : 'text-gray-400'">
                    {{ product.inStock ? 'In Stock' : 'Out' }}
                  </span>
                </div>
              </td>
              <td class="px-4 py-4">
                <div class="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <NuxtLink :to="`/product/${product.id}`" target="_blank"
                    class="p-1.5 rounded-lg text-gray-400 hover:text-primary hover:bg-primary/5 transition-colors" title="View">
                    👁️
                  </NuxtLink>
                  <NuxtLink :to="`/admin/products/add?edit=${product.id}`"
                    class="p-1.5 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors" title="Edit">
                    ✏️
                  </NuxtLink>
                  <button @click="confirmDelete(product)"
                    class="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors" title="Delete">
                    🗑️
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div v-if="totalPages > 1" class="border-t border-gray-100 px-5 md:px-6 py-4 flex items-center justify-between gap-4 flex-wrap">
        <p class="text-xs text-gray-400 flex-shrink-0">
          Showing {{ (page - 1) * perPage + 1 }}–{{ Math.min(page * perPage, filteredProducts.length) }} of {{ filteredProducts.length }}
        </p>
        <div class="flex gap-1.5 flex-wrap">
          <button v-for="p in totalPages" :key="p" @click="page = p"
            :class="['w-8 h-8 rounded-lg text-sm font-medium transition-colors', p === page ? 'bg-primary text-white' : 'text-gray-500 hover:bg-gray-100']">
            {{ p }}
          </button>
        </div>
      </div>
    </div>

    <!-- Delete Confirm Modal -->
    <Teleport to="body">
      <div v-if="deleteTarget" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <div class="bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full">
          <div class="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-2xl mx-auto mb-4">🗑️</div>
          <h3 class="font-semibold text-gray-800 text-center mb-2">Delete Product?</h3>
          <p class="text-sm text-gray-500 text-center mb-6">
            Are you sure you want to delete <strong>{{ deleteTarget?.name }}</strong>? This action cannot be undone.
          </p>
          <div class="flex gap-3">
            <button @click="deleteTarget = null" class="flex-1 border border-gray-200 text-gray-600 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors">
              Cancel
            </button>
            <button @click="doDelete" class="flex-1 bg-red-500 hover:bg-red-600 text-white py-2.5 rounded-xl text-sm font-medium transition-colors">
              Delete
            </button>
          </div>
        </div>
      </div>
    </Teleport>

  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin' })

import { useAdminStore } from '~/stores/admin'
import type { Product } from '~/data/products'

const adminStore = useAdminStore()
const search = ref('')
const filterCategory = ref('')
const filterStock = ref('')
const page = ref(1)
const perPage = 12
const selected = ref<string[]>([])
const deleteTarget = ref<Product | null>(null)

const filteredProducts = computed(() => {
  let list = adminStore.adminProducts
  if (search.value) {
    const q = search.value.toLowerCase()
    list = list.filter(p => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q))
  }
  if (filterCategory.value) list = list.filter(p => p.category === filterCategory.value)
  if (filterStock.value === 'in') list = list.filter(p => p.inStock)
  if (filterStock.value === 'out') list = list.filter(p => !p.inStock)
  return list
})

const totalPages = computed(() => Math.ceil(filteredProducts.value.length / perPage))
const paginatedProducts = computed(() => filteredProducts.value.slice((page.value - 1) * perPage, page.value * perPage))

watch([search, filterCategory, filterStock], () => { page.value = 1 })

const toggleSelectAll = (e: Event) => {
  const checked = (e.target as HTMLInputElement).checked
  selected.value = checked ? paginatedProducts.value.map(p => p.id) : []
}

const confirmDelete = (p: Product) => { deleteTarget.value = p }
const doDelete = () => {
  if (deleteTarget.value) {
    adminStore.deleteProduct(deleteTarget.value.id)
    deleteTarget.value = null
  }
}

const exportCSV = () => {
  const rows = [
    ['ID', 'Name', 'Category', 'Price', 'Original Price', 'In Stock', 'Rating', 'Reviews'],
    ...adminStore.adminProducts.map(p => [
      p.id, p.name, p.category, p.price, p.originalPrice || '', p.inStock, p.rating, p.reviews
    ])
  ]
  const csv = rows.map(r => r.join(',')).join('\n')
  const blob = new Blob([csv], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'jaihindmill-products.csv'
  a.click()
}
</script>
