import { defineStore } from 'pinia'
import type { Product } from '~/data/products'

export const useWishlistStore = defineStore('wishlist', () => {
  const items = ref<Product[]>([])

  const itemCount = computed(() => items.value.length)

  const isInWishlist = (productId: string) =>
    items.value.some(p => p.id === productId)

  const addItem = (product: Product) => {
    if (!isInWishlist(product.id)) {
      items.value.push(product)
    }
  }

  const removeItem = (productId: string) => {
    const idx = items.value.findIndex(p => p.id === productId)
    if (idx !== -1) items.value.splice(idx, 1)
  }

  const toggleItem = (product: Product): boolean => {
    if (isInWishlist(product.id)) {
      removeItem(product.id)
      return false
    } else {
      addItem(product)
      return true
    }
  }

  const clearWishlist = () => {
    items.value = []
  }

  // Persist to localStorage
  if (import.meta.client) {
    const saved = localStorage.getItem('jaihindmill-wishlist')
    if (saved) {
      try {
        items.value = JSON.parse(saved)
      } catch {}
    }
    watch(items, (val) => {
      localStorage.setItem('jaihindmill-wishlist', JSON.stringify(val))
    }, { deep: true })
  }

  return {
    items,
    itemCount,
    isInWishlist,
    addItem,
    removeItem,
    toggleItem,
    clearWishlist,
  }
})
