<template>
  <div class="space-y-0">
    <div
      v-for="(step, index) in steps"
      :key="step.key"
      class="flex gap-4"
    >
      <!-- Icon + Line -->
      <div class="flex flex-col items-center">
        <div :class="[
          'w-10 h-10 rounded-full flex items-center justify-center text-lg flex-shrink-0 z-10 border-2 transition-all',
          step.status === 'completed' ? 'bg-teal border-teal text-white' :
          step.status === 'active' ? 'bg-gold border-gold text-white animate-pulse-slow' :
          'bg-white border-gray-200 text-gray-300'
        ]">
          {{ step.icon }}
        </div>
        <!-- Connector line -->
        <div v-if="index < steps.length - 1" :class="[
          'w-0.5 flex-1 mt-0.5 min-h-8',
          step.status === 'completed' ? 'bg-teal' : 'bg-gray-200'
        ]"></div>
      </div>

      <!-- Content -->
      <div class="pb-6 flex-1">
        <div class="flex items-center gap-3">
          <h4 :class="[
            'font-semibold text-sm',
            step.status === 'completed' ? 'text-teal' :
            step.status === 'active' ? 'text-gold' :
            'text-gray-400'
          ]">{{ step.label }}</h4>
          <span v-if="step.status === 'completed'" class="text-xs text-teal bg-teal/10 px-2 py-0.5 rounded-full">✓ Done</span>
          <span v-if="step.status === 'active'" class="text-xs text-gold bg-gold/10 px-2 py-0.5 rounded-full">In Progress</span>
        </div>
        <p v-if="step.date" class="text-xs text-gray-500 mt-0.5">{{ step.date }}</p>
        <p v-if="step.description" class="text-xs text-gray-500 mt-1">{{ step.description }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  currentStatus: string
}>()

const allSteps = [
  { key: 'placed', label: 'Order Placed', icon: '🛒', description: 'Your order has been received' },
  { key: 'confirmed', label: 'Order Confirmed', icon: '✅', description: 'Payment confirmed and order approved' },
  { key: 'processing', label: 'Processing', icon: '⚙️', description: 'Weaving and packaging your saree' },
  { key: 'shipped', label: 'Shipped', icon: '📦', description: 'Your saree is on its way' },
  { key: 'out-for-delivery', label: 'Out for Delivery', icon: '🚚', description: 'Delivery partner is en route' },
  { key: 'delivered', label: 'Delivered', icon: '🎁', description: 'Package delivered successfully' },
]

const statusOrder = ['placed', 'confirmed', 'processing', 'shipped', 'out-for-delivery', 'delivered']

const steps = computed(() => {
  const currentIdx = statusOrder.indexOf(props.currentStatus)
  return allSteps.map((step, idx) => ({
    ...step,
    status: idx < currentIdx ? 'completed' : idx === currentIdx ? 'active' : 'pending',
    date: idx < currentIdx ? 'Completed' : idx === currentIdx ? 'In Progress' : '',
  }))
})
</script>
