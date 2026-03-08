import { defineStore } from 'pinia'
import type { Product } from '~/data/products'

export interface CartItem {
  product: Product
  quantity: number
  selectedColor: string
  totalPrice: number
}

export const useCartStore = defineStore('cart', () => {
  const items = ref<CartItem[]>([])
  const couponCode = ref('')
  const couponDiscount = ref(0)
  const isOpen = ref(false)

  // Computed
  const itemCount = computed(() => items.value.reduce((sum, item) => sum + item.quantity, 0))

  const subtotal = computed(() =>
    items.value.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  )

  const shippingCost = computed(() => (subtotal.value >= 999 ? 0 : 99))

  const discountAmount = computed(() => {
    if (couponCode.value === 'SAVE10') return Math.round(subtotal.value * 0.1)
    if (couponCode.value === 'WELCOME20') return Math.round(subtotal.value * 0.2)
    if (couponCode.value === 'FLAT500' && subtotal.value >= 2000) return 500
    return couponDiscount.value
  })

  const total = computed(() => subtotal.value - discountAmount.value + shippingCost.value)

  // Actions
  const addItem = (product: Product, quantity = 1, color = '') => {
    const selectedColor = color || (product.colors[0]?.name ?? '')
    const existing = items.value.find(
      i => i.product.id === product.id && i.selectedColor === selectedColor
    )
    if (existing) {
      existing.quantity += quantity
      existing.totalPrice = existing.product.price * existing.quantity
    } else {
      items.value.push({
        product,
        quantity,
        selectedColor,
        totalPrice: product.price * quantity,
      })
    }
  }

  const removeItem = (productId: string, color: string) => {
    const idx = items.value.findIndex(
      i => i.product.id === productId && i.selectedColor === color
    )
    if (idx !== -1) items.value.splice(idx, 1)
  }

  const updateQuantity = (productId: string, color: string, quantity: number) => {
    const item = items.value.find(
      i => i.product.id === productId && i.selectedColor === color
    )
    if (item) {
      if (quantity <= 0) {
        removeItem(productId, color)
      } else {
        item.quantity = quantity
        item.totalPrice = item.product.price * quantity
      }
    }
  }

  const applyCoupon = (code: string): boolean => {
    const validCodes = ['SAVE10', 'WELCOME20', 'FLAT500']
    if (validCodes.includes(code.toUpperCase())) {
      couponCode.value = code.toUpperCase()
      return true
    }
    return false
  }

  const removeCoupon = () => {
    couponCode.value = ''
    couponDiscount.value = 0
  }

  const clearCart = () => {
    items.value = []
    couponCode.value = ''
    couponDiscount.value = 0
  }

  const toggleCart = () => {
    isOpen.value = !isOpen.value
  }

  const isInCart = (productId: string) =>
    items.value.some(i => i.product.id === productId)

  // Persist to localStorage
  if (import.meta.client) {
    const saved = localStorage.getItem('jaihindmill-cart')
    if (saved) {
      try {
        items.value = JSON.parse(saved)
      } catch {}
    }
    watch(items, (val) => {
      localStorage.setItem('jaihindmill-cart', JSON.stringify(val))
    }, { deep: true })
  }

  return {
    items,
    couponCode,
    itemCount,
    subtotal,
    shippingCost,
    discountAmount,
    total,
    isOpen,
    addItem,
    removeItem,
    updateQuantity,
    applyCoupon,
    removeCoupon,
    clearCart,
    toggleCart,
    isInCart,
  }
})
