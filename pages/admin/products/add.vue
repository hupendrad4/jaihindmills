<template>
  <div class="space-y-6">

    <!-- Header -->
    <div class="flex items-center gap-4">
      <NuxtLink to="/admin/products" class="p-2 rounded-xl border border-gray-200 hover:bg-gray-50 text-gray-500 transition-colors">
        ← Back
      </NuxtLink>
      <div>
        <h1 class="font-serif text-2xl font-bold text-gray-800">{{ editId ? 'Edit Product' : 'Add New Product' }}</h1>
        <p class="text-gray-400 text-sm mt-0.5">{{ editId ? 'Update product details' : 'Fill in details to list a new product' }}</p>
      </div>
    </div>

    <form @submit.prevent="saveProduct" class="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">

      <!-- Left: Main fields -->
      <div class="lg:col-span-2 space-y-5">

        <!-- Basic Info -->
        <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-4">
          <h2 class="font-semibold text-gray-800 text-sm uppercase tracking-wider">Basic Information</h2>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1.5">Product Name *</label>
            <input v-model="form.name" type="text" placeholder="e.g. Kanjivaram Silk Saree in Magenta" required
              class="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-colors" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1.5">Description *</label>
            <textarea v-model="form.description" rows="4" placeholder="Detailed product description..."
              class="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-colors resize-none"></textarea>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1.5">Category *</label>
              <select v-model="form.category" required class="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-primary transition-colors">
                <option value="">Select category</option>
                <option value="sarees">Sarees</option>
                <option value="salwar-suits">Salwar Suits</option>
                <option value="lehengas">Lehengas</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1.5">Sub-category</label>
              <input v-model="form.subcategory" type="text" placeholder="e.g. Paithani, Banarasi"
                class="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-primary transition-colors" />
            </div>
          </div>
        </div>

        <!-- Pricing -->
        <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-4">
          <h2 class="font-semibold text-gray-800 text-sm uppercase tracking-wider">Pricing</h2>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1.5">Selling Price (₹) *</label>
              <input v-model.number="form.price" type="number" min="0" placeholder="799" required
                class="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-primary transition-colors" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1.5">Original MRP (₹)</label>
              <input v-model.number="form.originalPrice" type="number" min="0" placeholder="1299"
                class="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-primary transition-colors" />
            </div>
          </div>
          <div v-if="discount > 0" class="bg-green-50 rounded-xl px-4 py-3 flex items-center gap-2">
            <span class="text-green-600 text-sm font-semibold">🏷️ {{ discount }}% off — Customer saves ₹{{ (form.originalPrice - form.price).toLocaleString('en-IN') }}</span>
          </div>
        </div>

        <!-- Fabric & Origin -->
        <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-4">
          <h2 class="font-semibold text-gray-800 text-sm uppercase tracking-wider">Fabric & Origin</h2>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1.5">Fabric *</label>
              <select v-model="form.fabric" class="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-primary transition-colors">
                <option value="">Select fabric</option>
                <option>Silk</option>
                <option>Cotton</option>
                <option>Georgette</option>
                <option>Crepe</option>
                <option>Linen</option>
                <option>Chiffon</option>
                <option>Net</option>
                <option>Velvet</option>
                <option>Banarasi</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1.5">Weave Type</label>
              <input v-model="form.weave" type="text" placeholder="e.g. Handloom, Zari"
                class="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-primary transition-colors" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1.5">Origin</label>
              <input v-model="form.origin" type="text" placeholder="e.g. Varanasi, Yeola"
                class="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-primary transition-colors" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1.5">Badge</label>
              <select v-model="form.badge" class="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-primary transition-colors">
                <option value="">None</option>
                <option value="New">New</option>
                <option value="Best Seller">Best Seller</option>
                <option value="Sale">Sale</option>
                <option value="Trending">Trending</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Colors -->
        <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-3">
          <h2 class="font-semibold text-gray-800 text-sm uppercase tracking-wider">Available Colors</h2>
          <div class="flex flex-wrap gap-2">
            <span v-for="(color, idx) in form.colors" :key="idx"
              class="flex items-center gap-1.5 bg-gray-100 text-gray-700 text-xs px-3 py-1.5 rounded-lg">
              {{ color }}
              <button type="button" @click="form.colors.splice(idx, 1)" class="text-gray-400 hover:text-red-500 text-xs">✕</button>
            </span>
          </div>
          <div class="flex gap-2">
            <input v-model="newColor" type="text" placeholder="Add color (e.g. Magenta, Navy)"
              @keydown.enter.prevent="addColor"
              class="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-primary transition-colors" />
            <button type="button" @click="addColor" class="bg-primary text-white px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors">
              Add
            </button>
          </div>
        </div>

        <!-- Product Images -->
        <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-3">
          <h2 class="font-semibold text-gray-800 text-sm uppercase tracking-wider">Product Images</h2>

          <!-- Drag and Drop Zone -->
          <div
            @dragover.prevent="dragOver = true"
            @dragleave="dragOver = false"
            @drop.prevent="handleDrop"
            :class="['border-2 border-dashed rounded-xl p-8 text-center transition-colors cursor-pointer', dragOver ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-gray-300']"
            @click="$refs.fileInput.click()"
          >
            <div class="text-4xl mb-2">🖼️</div>
            <p class="text-sm font-medium text-gray-600">Drag & drop images here or click to browse</p>
            <p class="text-xs text-gray-400 mt-1">PNG, JPG, WebP up to 5MB each · First image = main thumbnail</p>
            <input ref="fileInput" type="file" multiple accept="image/*" class="hidden" @change="handleFileInput" />
          </div>

          <!-- Image URL input as alternative -->
          <div class="flex gap-2">
            <input v-model="newImageUrl" type="url" placeholder="Or paste image URL..."
              class="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-primary transition-colors" />
            <button type="button" @click="addImageUrl" class="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors">
              Add URL
            </button>
          </div>

          <!-- Preview grid -->
          <div v-if="form.images.length" class="grid grid-cols-4 gap-3">
            <div v-for="(img, idx) in form.images" :key="idx" class="relative group aspect-square">
              <img :src="img" class="w-full h-full object-cover rounded-xl" />
              <div v-if="idx === 0" class="absolute top-1 left-1 bg-primary text-white text-xs px-1.5 py-0.5 rounded">Main</div>
              <button type="button" @click="form.images.splice(idx, 1)"
                class="absolute top-1 right-1 bg-red-500 text-white w-5 h-5 rounded-full text-xs opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                ✕
              </button>
            </div>
          </div>
        </div>

        <!-- Product Details bullets -->
        <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-3">
          <h2 class="font-semibold text-gray-800 text-sm uppercase tracking-wider">Product Highlights</h2>
          <div class="space-y-2">
            <div v-for="(detail, idx) in form.details" :key="idx" class="flex gap-2">
              <input v-model="form.details[idx]" type="text" :placeholder="`Highlight ${idx + 1}`"
                class="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-primary transition-colors" />
              <button type="button" @click="form.details.splice(idx, 1)" class="text-gray-400 hover:text-red-500 transition-colors text-xl leading-none">×</button>
            </div>
          </div>
          <button type="button" @click="form.details.push('')" class="text-sm text-primary hover:underline font-medium">+ Add highlight</button>
        </div>
      </div>

      <!-- Right sidebar — sticky on desktop -->
      <div class="space-y-5 lg:sticky lg:top-20">

        <!-- Publish box -->
        <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-4">
          <h2 class="font-semibold text-gray-800 text-sm uppercase tracking-wider">Visibility</h2>
          <div class="flex items-center justify-between">
            <span class="text-sm text-gray-600">In Stock</span>
            <button type="button" @click="form.inStock = !form.inStock"
              :class="['relative inline-flex h-6 w-11 items-center rounded-full transition-colors', form.inStock ? 'bg-green-500' : 'bg-gray-300']">
              <span :class="['inline-block h-4 w-4 transform rounded-full bg-white transition-transform mx-1', form.inStock ? 'translate-x-5' : 'translate-x-0']"></span>
            </button>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-sm text-gray-600">New Arrival</span>
            <button type="button" @click="form.isNew = !form.isNew"
              :class="['relative inline-flex h-6 w-11 items-center rounded-full transition-colors', form.isNew ? 'bg-primary' : 'bg-gray-300']">
              <span :class="['inline-block h-4 w-4 transform rounded-full bg-white transition-transform mx-1', form.isNew ? 'translate-x-5' : 'translate-x-0']"></span>
            </button>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-sm text-gray-600">Best Seller</span>
            <button type="button" @click="form.isBestSeller = !form.isBestSeller"
              :class="['relative inline-flex h-6 w-11 items-center rounded-full transition-colors', form.isBestSeller ? 'bg-gold' : 'bg-gray-300']">
              <span :class="['inline-block h-4 w-4 transform rounded-full bg-white transition-transform mx-1', form.isBestSeller ? 'translate-x-5' : 'translate-x-0']"></span>
            </button>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-sm text-gray-600">Featured</span>
            <button type="button" @click="form.isFeatured = !form.isFeatured"
              :class="['relative inline-flex h-6 w-11 items-center rounded-full transition-colors', form.isFeatured ? 'bg-teal-500' : 'bg-gray-300']">
              <span :class="['inline-block h-4 w-4 transform rounded-full bg-white transition-transform mx-1', form.isFeatured ? 'translate-x-5' : 'translate-x-0']"></span>
            </button>
          </div>
        </div>

        <!-- Occasions -->
        <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-3">
          <h2 class="font-semibold text-gray-800 text-sm uppercase tracking-wider">Occasions</h2>
          <div class="flex flex-wrap gap-2">
            <button
              v-for="occ in occasions"
              :key="occ"
              type="button"
              @click="toggleOccasion(occ)"
              :class="['text-xs px-3 py-1.5 rounded-lg border transition-colors', form.occasion.includes(occ) ? 'bg-primary border-primary text-white' : 'border-gray-200 text-gray-600 hover:border-gray-300']"
            >
              {{ occ }}
            </button>
          </div>
        </div>

        <!-- Slug -->
        <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-3">
          <h2 class="font-semibold text-gray-800 text-sm uppercase tracking-wider">SEO</h2>
          <div>
            <label class="block text-xs font-medium text-gray-500 mb-1">URL Slug</label>
            <input v-model="form.slug" type="text" placeholder="auto-generated-from-name"
              class="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-primary transition-colors" />
          </div>
        </div>

        <!-- Save button -->
        <button type="submit" :disabled="saving"
          class="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-4 rounded-2xl text-sm transition-colors disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg">
          <span v-if="saving" class="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
          {{ saving ? 'Saving...' : editId ? '✓ Update Product' : '✓ Publish Product' }}
        </button>

        <button v-if="editId" type="button" @click="navigateTo('/admin/products')"
          class="w-full border border-gray-200 text-gray-600 hover:bg-gray-50 py-3 rounded-2xl text-sm font-medium transition-colors">
          Discard Changes
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin' })

import { useAdminStore } from '~/stores/admin'
import { useToastStore } from '~/stores/toast'

const adminStore = useAdminStore()
const toast = useToastStore()
const route = useRoute()

const editId = computed(() => route.query.edit as string | undefined)

const defaultForm = () => ({
  name: '',
  description: '',
  category: '' as any,
  subcategory: '',
  fabric: '' as any,
  weave: '',
  origin: '',
  price: 0,
  originalPrice: 0,
  discount: 0,
  colors: [] as string[],
  images: [] as string[],
  occasion: [] as string[],
  rating: 4.5,
  reviews: 0,
  isNew: true,
  isBestSeller: false,
  isFeatured: false,
  isTrending: false,
  inStock: true,
  slug: '',
  badge: '',
  details: [''] as string[],
})

const form = reactive(defaultForm())
const saving = ref(false)
const dragOver = ref(false)
const newColor = ref('')
const newImageUrl = ref('')
const fileInput = ref<HTMLInputElement>()

const occasions = ['Wedding', 'Festive', 'Casual', 'Party', 'Office', 'Bridal', 'Navratri', 'Diwali', 'Puja']

const discount = computed(() => {
  if (form.originalPrice > form.price) {
    return Math.round(((form.originalPrice - form.price) / form.originalPrice) * 100)
  }
  return 0
})

// Auto-generate slug from name
watch(() => form.name, (val) => {
  if (!editId.value) {
    form.slug = val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
  }
})

// Load product for edit
onMounted(() => {
  if (editId.value) {
    const p = adminStore.adminProducts.find(p => p.id === editId.value)
    if (p) {
      Object.assign(form, { ...p })
    }
  }
})

const addColor = () => {
  if (newColor.value.trim() && !form.colors.includes(newColor.value.trim())) {
    form.colors.push(newColor.value.trim())
    newColor.value = ''
  }
}

const toggleOccasion = (occ: string) => {
  const idx = form.occasion.indexOf(occ)
  if (idx >= 0) form.occasion.splice(idx, 1)
  else form.occasion.push(occ)
}

const handleDrop = (e: DragEvent) => {
  dragOver.value = false
  const files = Array.from(e.dataTransfer?.files || [])
  processFiles(files)
}

const handleFileInput = (e: Event) => {
  const files = Array.from((e.target as HTMLInputElement).files || [])
  processFiles(files)
}

const processFiles = (files: File[]) => {
  files.forEach(file => {
    if (!file.type.startsWith('image/')) return
    const reader = new FileReader()
    reader.onload = (e) => {
      form.images.push(e.target?.result as string)
    }
    reader.readAsDataURL(file)
  })
}

const addImageUrl = () => {
  if (newImageUrl.value.trim()) {
    form.images.push(newImageUrl.value.trim())
    newImageUrl.value = ''
  }
}

const saveProduct = async () => {
  if (!form.name || !form.price || !form.category) {
    toast.error('Please fill in required fields')
    return
  }
  if (form.images.length === 0) {
    toast.error('Please add at least one product image')
    return
  }

  saving.value = true
  await new Promise(r => setTimeout(r, 800))

  const productData = {
    ...form,
    discount: discount.value,
    details: form.details.filter(Boolean),
  }

  if (editId.value) {
    adminStore.updateProduct(editId.value, productData)
    toast.success('Product updated successfully!')
  } else {
    adminStore.addProduct(productData)
    toast.success('Product published successfully!')
  }

  saving.value = false
  navigateTo('/admin/products')
}
</script>
