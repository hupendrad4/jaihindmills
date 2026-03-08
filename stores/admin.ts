import { defineStore } from 'pinia'
import { products as baseProducts, type Product } from '~/data/products'

export interface AdminOrder {
  id: string
  orderNo: string
  customer: string
  email: string
  phone: string
  items: { productId: string; name: string; qty: number; price: number; color: string }[]
  total: number
  status: 'placed' | 'confirmed' | 'processing' | 'shipped' | 'out-for-delivery' | 'delivered' | 'cancelled'
  paymentMethod: 'UPI' | 'Card' | 'COD' | 'NetBanking'
  paymentStatus: 'Paid' | 'Pending' | 'Failed'
  city: string
  state: string
  date: string
  deliveryDate?: string
}

export const useAdminStore = defineStore('admin', () => {
  // ── Auth ──────────────────────────────────────────────
  const isAuthenticated = ref(false)

  const login = (password: string): boolean => {
    if (password === 'jaihind@2025') {
      isAuthenticated.value = true
      if (import.meta.client) localStorage.setItem('jhm-admin-auth', 'true')
      return true
    }
    return false
  }

  const logout = () => {
    isAuthenticated.value = false
    if (import.meta.client) localStorage.removeItem('jhm-admin-auth')
    navigateTo('/admin/login')
  }

  // ── Products ──────────────────────────────────────────
  const adminProducts = ref<Product[]>([...baseProducts])

  const addProduct = (product: Omit<Product, 'id'>) => {
    const newProduct = { ...product, id: `custom-${Date.now()}` } as Product
    adminProducts.value.unshift(newProduct)
    return newProduct
  }

  const updateProduct = (id: string, updates: Partial<Product>) => {
    const idx = adminProducts.value.findIndex(p => p.id === id)
    if (idx !== -1) adminProducts.value[idx] = { ...adminProducts.value[idx], ...updates }
  }

  const deleteProduct = (id: string) => {
    adminProducts.value = adminProducts.value.filter(p => p.id !== id)
  }

  const toggleStock = (id: string) => {
    const p = adminProducts.value.find(p => p.id === id)
    if (p) p.inStock = !p.inStock
  }

  // ── Orders (mock realistic data) ─────────────────────
  const orders = ref<AdminOrder[]>([
    {
      id: '1', orderNo: 'JHM-20240325-1001', customer: 'Priya Sharma', email: 'priya@gmail.com', phone: '+91 98765 43210',
      items: [{ productId: 's1', name: 'Kanjivaram Silk Saree', qty: 1, price: 799, color: 'Magenta' }],
      total: 799, status: 'delivered', paymentMethod: 'UPI', paymentStatus: 'Paid',
      city: 'Mumbai', state: 'Maharashtra', date: '2024-03-25', deliveryDate: '2024-03-30',
    },
    {
      id: '2', orderNo: 'JHM-20240324-1002', customer: 'Lakshmi Devi', email: 'lakshmi@gmail.com', phone: '+91 87654 32109',
      items: [
        { productId: 's3', name: 'Prajakta Paithani', qty: 1, price: 1200, color: 'Peacock Green' },
        { productId: 'ss2', name: 'Trending Cord Set', qty: 1, price: 750, color: 'Lilac' },
      ],
      total: 1950, status: 'shipped', paymentMethod: 'Card', paymentStatus: 'Paid',
      city: 'Chennai', state: 'Tamil Nadu', date: '2024-03-24',
    },
    {
      id: '3', orderNo: 'JHM-20240323-1003', customer: 'Anjali Gupta', email: 'anjali@outlook.com', phone: '+91 76543 21098',
      items: [{ productId: 'l2', name: 'Banarasi Bridal Lehenga', qty: 1, price: 4999, color: 'Bridal Red' }],
      total: 4999, status: 'processing', paymentMethod: 'UPI', paymentStatus: 'Paid',
      city: 'Jaipur', state: 'Rajasthan', date: '2024-03-23',
    },
    {
      id: '4', orderNo: 'JHM-20240322-1004', customer: 'Meena Iyer', email: 'meena@yahoo.com', phone: '+91 65432 10987',
      items: [{ productId: 's9', name: 'Nishigandha Paithani', qty: 1, price: 3400, color: 'Deep Green' }],
      total: 3400, status: 'confirmed', paymentMethod: 'NetBanking', paymentStatus: 'Paid',
      city: 'Pune', state: 'Maharashtra', date: '2024-03-22',
    },
    {
      id: '5', orderNo: 'JHM-20240321-1005', customer: 'Rohini Patil', email: 'rohini@gmail.com', phone: '+91 54321 09876',
      items: [
        { productId: 'l4', name: 'Chaniya Choli Navratri', qty: 2, price: 999, color: 'Multi Red' },
        { productId: 'ss4', name: 'Butterfly Anarkali Dress', qty: 1, price: 800, color: 'Magenta' },
      ],
      total: 2798, status: 'placed', paymentMethod: 'COD', paymentStatus: 'Pending',
      city: 'Nagpur', state: 'Maharashtra', date: '2024-03-21',
    },
    {
      id: '6', orderNo: 'JHM-20240320-1006', customer: 'Sunita Verma', email: 'sunita@gmail.com', phone: '+91 43210 98765',
      items: [{ productId: 's2', name: 'Banarasi Silk Saree', qty: 1, price: 699, color: 'Crimson' }],
      total: 699, status: 'delivered', paymentMethod: 'UPI', paymentStatus: 'Paid',
      city: 'Lucknow', state: 'Uttar Pradesh', date: '2024-03-20', deliveryDate: '2024-03-24',
    },
    {
      id: '7', orderNo: 'JHM-20240319-1007', customer: 'Kavya Nair', email: 'kavya@gmail.com', phone: '+91 32109 87654',
      items: [{ productId: 's8', name: 'Haati Ghoda Bandhani Saree', qty: 1, price: 600, color: 'Multi' }],
      total: 600, status: 'cancelled', paymentMethod: 'Card', paymentStatus: 'Failed',
      city: 'Kochi', state: 'Kerala', date: '2024-03-19',
    },
    {
      id: '8', orderNo: 'JHM-20240318-1008', customer: 'Deepika Joshi', email: 'deepika@outlook.com', phone: '+91 21098 76543',
      items: [
        { productId: 's4', name: 'Kalanjali Paithani with Blouse', qty: 1, price: 2399, color: 'Green' },
        { productId: 'ss1', name: '3-Piece Designer Kurti Set', qty: 1, price: 1200, color: 'Navy' },
      ],
      total: 3599, status: 'out-for-delivery', paymentMethod: 'UPI', paymentStatus: 'Paid',
      city: 'Hyderabad', state: 'Telangana', date: '2024-03-18',
    },
    {
      id: '9', orderNo: 'JHM-20240317-1009', customer: 'Pooja Singh', email: 'pooja@gmail.com', phone: '+91 10987 65432',
      items: [{ productId: 'l3', name: 'Net Embroidered Lehenga', qty: 1, price: 2200, color: 'Rose Gold' }],
      total: 2200, status: 'delivered', paymentMethod: 'Card', paymentStatus: 'Paid',
      city: 'Delhi', state: 'Delhi', date: '2024-03-17', deliveryDate: '2024-03-22',
    },
    {
      id: '10', orderNo: 'JHM-20240316-1010', customer: 'Rekha Sharma', email: 'rekha@gmail.com', phone: '+91 99887 76655',
      items: [{ productId: 's13', name: 'Pashmina Silk Saree', qty: 1, price: 950, color: 'Cream' }],
      total: 950, status: 'delivered', paymentMethod: 'COD', paymentStatus: 'Paid',
      city: 'Srinagar', state: 'J&K', date: '2024-03-16', deliveryDate: '2024-03-23',
    },
  ])

  const updateOrderStatus = (id: string, status: AdminOrder['status']) => {
    const order = orders.value.find(o => o.id === id)
    if (order) order.status = status
  }

  // ── Analytics (computed from real data) ──────────────
  const totalRevenue = computed(() =>
    orders.value.filter(o => o.paymentStatus === 'Paid').reduce((sum, o) => sum + o.total, 0)
  )
  const totalOrders = computed(() => orders.value.length)
  const activeOrders = computed(() => orders.value.filter(o => !['delivered', 'cancelled'].includes(o.status)).length)
  const deliveredOrders = computed(() => orders.value.filter(o => o.status === 'delivered').length)
  const totalProducts = computed(() => adminProducts.value.length)
  const inStockCount = computed(() => adminProducts.value.filter(p => p.inStock).length)
  const avgOrderValue = computed(() =>
    orders.value.length ? Math.round(totalRevenue.value / orders.value.filter(o => o.paymentStatus === 'Paid').length) : 0
  )

  // Monthly revenue mock data
  const monthlyRevenue = [
    { month: 'Oct', revenue: 18500, orders: 22 },
    { month: 'Nov', revenue: 24300, orders: 31 },
    { month: 'Dec', revenue: 41200, orders: 54 },
    { month: 'Jan', revenue: 29800, orders: 38 },
    { month: 'Feb', revenue: 35600, orders: 45 },
    { month: 'Mar', revenue: 22196, orders: 10 },
  ]

  const categoryBreakdown = computed(() => {
    const cats: Record<string, { count: number; revenue: number }> = {}
    orders.value.forEach(order => {
      order.items.forEach(item => {
        const product = adminProducts.value.find(p => p.id === item.productId)
        const cat = product?.category || 'Other'
        if (!cats[cat]) cats[cat] = { count: 0, revenue: 0 }
        cats[cat].count += item.qty
        cats[cat].revenue += item.price * item.qty
      })
    })
    return Object.entries(cats).map(([name, data]) => ({ name, ...data }))
      .sort((a, b) => b.revenue - a.revenue)
  })

  const stateBreakdown = computed(() => {
    const states: Record<string, number> = {}
    orders.value.forEach(o => {
      states[o.state] = (states[o.state] || 0) + o.total
    })
    return Object.entries(states)
      .map(([state, revenue]) => ({ state, revenue }))
      .sort((a, b) => b.revenue - a.revenue)
  })

  // Init auth check
  if (import.meta.client) {
    isAuthenticated.value = localStorage.getItem('jhm-admin-auth') === 'true'
  }

  return {
    isAuthenticated, login, logout,
    adminProducts, addProduct, updateProduct, deleteProduct, toggleStock,
    orders, updateOrderStatus,
    totalRevenue, totalOrders, activeOrders, deliveredOrders,
    totalProducts, inStockCount, avgOrderValue,
    monthlyRevenue, categoryBreakdown, stateBreakdown,
  }
})
