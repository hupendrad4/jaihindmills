<template>
  <div>
    <!-- Flash Sale Popup (auto-shows after 4s) -->
    <FlashSalePopup />

    <!-- Hero Banner -->
    <section class="relative min-h-[580px] lg:min-h-[680px] bg-primary overflow-hidden flex items-center">
      <!-- Background pattern -->
      <div class="absolute inset-0 mandala-bg opacity-30"></div>
      <!-- Gradient overlay -->
      <div class="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-transparent"></div>

      <!-- Right side decorative image -->
      <div class="absolute right-0 top-0 bottom-0 w-1/2 hidden lg:block">
        <img
          src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=900&h=800&fit=crop"
          alt="Beautiful Indian Sarees"
          class="w-full h-full object-cover opacity-60"
        />
        <div class="absolute inset-0 bg-gradient-to-r from-primary via-primary/60 to-transparent"></div>
      </div>

      <!-- Content -->
      <div class="relative max-w-7xl mx-auto px-4 lg:px-6 py-20 z-10">
        <div class="max-w-xl">
          <!-- Tag -->
          <span class="inline-block bg-gold/20 border border-gold/40 text-gold text-xs font-semibold px-4 py-1.5 rounded-full mb-5 tracking-wider uppercase">
            New Festive Collection 2025
          </span>

          <!-- Heading -->
          <h1 class="font-serif text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight mb-5">
            Celebrate <br/>
            <span class="text-gradient-gold">India's</span><br/>
            Finest Silk
          </h1>

          <!-- Subtext -->
          <p class="text-white/70 text-lg leading-relaxed mb-8 max-w-sm">
            Handcrafted sarees from master weavers across India. Banarasi, Kanjivaram, Chanderi and more — for every celebration.
          </p>

          <!-- CTAs -->
          <div class="flex flex-wrap gap-4">
            <NuxtLink to="/shop" class="btn-gold text-base px-8 py-3.5">
              Shop Now
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>
            </NuxtLink>
            <NuxtLink to="/shop?filter=new" class="border-2 border-white/40 text-white hover:bg-white hover:text-primary px-8 py-3.5 rounded-md font-semibold text-base transition-all duration-200">
              New Arrivals
            </NuxtLink>
          </div>

          <!-- Stats -->
          <div class="flex gap-8 mt-10">
            <div v-for="stat in stats" :key="stat.label" class="text-center">
              <p class="font-serif text-2xl font-bold text-gold">{{ stat.value }}</p>
              <p class="text-white/50 text-xs mt-0.5">{{ stat.label }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Scroll indicator -->
      <div class="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/40 animate-bounce">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
        </svg>
      </div>
    </section>

    <!-- Category Strips -->
    <section class="bg-primary-dark py-3">
      <div class="max-w-7xl mx-auto px-4 flex items-center justify-center gap-4 flex-wrap">
        <NuxtLink
          v-for="cat in quickCategories"
          :key="cat.label"
          :to="cat.to"
          class="flex items-center gap-2 bg-white/10 hover:bg-gold text-white text-xs font-medium px-4 py-2 rounded-full transition-all duration-200"
        >
          <span>{{ cat.icon }}</span>
          {{ cat.label }}
        </NuxtLink>
      </div>
    </section>

    <!-- Featured Categories -->
    <section class="py-16 px-4">
      <div class="max-w-7xl mx-auto">
        <h2 class="section-title mb-1">Shop by Category</h2>
        <p class="section-subtitle mb-3">Explore India's finest textile traditions</p>
        <div class="divider-gold"></div>

        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <NuxtLink
            v-for="category in categories"
            :key="category.id"
            :to="`/shop?category=${category.id}`"
            class="group text-center"
          >
            <div class="aspect-[3/4] rounded-2xl overflow-hidden mb-3 shadow-card group-hover:shadow-card-hover transition-all duration-300">
              <img
                :src="category.image"
                :alt="category.name"
                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
            </div>
            <p class="font-semibold text-gray-800 text-sm group-hover:text-primary transition-colors">{{ category.name }}</p>
            <p class="text-gray-400 text-xs">{{ category.count }}+ items</p>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Trending Banner -->
    <section class="py-10 px-4 bg-gradient-to-r from-primary to-primary-dark text-white relative overflow-hidden">
      <div class="absolute inset-0 mandala-bg opacity-20"></div>
      <!-- Decorative border top/bottom -->
      <div class="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold to-transparent"></div>
      <div class="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold to-transparent"></div>

      <div class="relative max-w-7xl mx-auto text-center">
        <p class="text-gold text-sm font-semibold uppercase tracking-widest mb-2">Limited Time Offer</p>
        <h2 class="font-serif text-3xl lg:text-4xl font-bold mb-3">Wedding Season Sale — Up to 50% Off</h2>
        <p class="text-white/70 mb-6 max-w-md mx-auto">Premium Banarasi, Kanjivaram, and Chanderi sarees at exceptional prices. Perfect for your special occasions.</p>
        <NuxtLink to="/shop?filter=sale" class="btn-gold text-sm px-8 py-3">
          Shop the Sale →
        </NuxtLink>
      </div>
    </section>

    <!-- Best Sellers -->
    <section class="py-16 px-4">
      <div class="max-w-7xl mx-auto">
        <h2 class="section-title mb-1">Best Sellers</h2>
        <p class="section-subtitle mb-3">Our most loved sarees, loved by thousands</p>
        <div class="divider-gold"></div>

        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 lg:gap-6">
          <ProductCard v-for="product in bestSellers" :key="product.id" :product="product" />
        </div>

        <div class="text-center mt-8">
          <NuxtLink to="/shop" class="btn-outline">
            View All Sarees
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
            </svg>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Why Choose Us -->
    <section class="py-14 px-4 bg-cream-dark">
      <div class="max-w-7xl mx-auto">
        <h2 class="section-title mb-1">Why JaihindMill?</h2>
        <p class="section-subtitle mb-3">Trusted by over 1 lakh happy customers</p>
        <div class="divider-gold"></div>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
          <div v-for="feature in features" :key="feature.title" class="text-center">
            <div class="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4">
              {{ feature.icon }}
            </div>
            <h3 class="font-semibold text-gray-800 text-sm mb-1.5">{{ feature.title }}</h3>
            <p class="text-gray-500 text-xs leading-relaxed">{{ feature.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- New Arrivals -->
    <section class="py-16 px-4">
      <div class="max-w-7xl mx-auto">
        <div class="flex items-center justify-between mb-2">
          <h2 class="section-title">New Arrivals</h2>
          <NuxtLink to="/shop?filter=new" class="text-crimson text-sm font-medium hover:underline hidden md:block">View All →</NuxtLink>
        </div>
        <p class="section-subtitle mb-3">Fresh from the loom to your wardrobe</p>
        <div class="divider-gold"></div>

        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 lg:gap-6">
          <ProductCard v-for="product in newArrivals" :key="product.id" :product="product" />
        </div>
      </div>
    </section>

    <!-- Cultural Heritage Banner -->
    <section class="py-16 px-4 bg-cream-dark mandala-bg">
      <div class="max-w-4xl mx-auto text-center">
        <span class="text-gold text-3xl">✦</span>
        <h2 class="font-serif text-3xl lg:text-4xl font-bold text-primary mt-3 mb-4">
          Weaving India's Heritage, Thread by Thread
        </h2>
        <p class="text-gray-600 leading-relaxed mb-6 max-w-2xl mx-auto">
          Each saree at JaihindMill is a story of India's master weavers — artisans who have passed down their craft through generations. From the silk looms of Varanasi to the cotton fields of Gujarat, we bring you authentic, ethically sourced handlooms.
        </p>
        <div class="flex flex-wrap justify-center gap-4">
          <NuxtLink to="/about" class="btn-primary">Our Story</NuxtLink>
          <NuxtLink to="/shop?weave=Handloom" class="btn-outline">Shop Handlooms</NuxtLink>
        </div>
      </div>
    </section>

    <!-- Testimonials -->
    <section class="py-16 px-4 bg-white">
      <div class="max-w-7xl mx-auto">
        <h2 class="section-title mb-1">What Our Customers Say</h2>
        <p class="section-subtitle mb-3">Real stories from real saree lovers</p>
        <div class="divider-gold"></div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div v-for="review in testimonials" :key="review.name" class="bg-cream rounded-2xl p-6 relative">
            <span class="text-gold text-5xl font-serif absolute top-4 right-6 opacity-30">"</span>
            <div class="flex gap-0.5 mb-3">
              <span v-for="i in 5" :key="i" class="text-gold text-sm">★</span>
            </div>
            <p class="text-gray-700 text-sm leading-relaxed mb-4 italic">"{{ review.comment }}"</p>
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center font-serif font-bold text-primary">
                {{ review.name[0] }}
              </div>
              <div>
                <p class="font-semibold text-gray-800 text-sm">{{ review.name }}</p>
                <p class="text-gray-400 text-xs">{{ review.location }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { categories, getBestSellers, getNewArrivals } from '~/data/products'

useHead({
  title: 'JaihindMill - Premium Indian Sarees & Ethnic Wear',
  meta: [
    { name: 'description', content: 'Shop the finest Indian sarees — Banarasi, Kanjivaram, Chanderi, Cotton and more. Authentic handlooms with free shipping over ₹999.' }
  ]
})

const bestSellers = getBestSellers().slice(0, 4)
const newArrivals = getNewArrivals().slice(0, 4)

const stats = [
  { value: '50K+', label: 'Happy Customers' },
  { value: '1200+', label: 'Saree Designs' },
  { value: '38', label: 'Years of Heritage' },
  { value: '4.9★', label: 'Avg. Rating' },
]

const quickCategories = [
  { label: 'Paithani', to: '/shop', icon: '🌺' },
  { label: 'Banarasi', to: '/shop', icon: '✨' },
  { label: 'Salwar Suits', to: '/shop/salwar-suits', icon: '👗' },
  { label: 'Lehengas', to: '/shop/lehengas', icon: '💃' },
  { label: 'New Arrivals', to: '/shop/new-arrivals', icon: '🆕' },
  { label: 'Offers 60% Off', to: '/shop/offers', icon: '🏷️' },
]

const features = [
  { icon: '🔒', title: 'Secure Payments', desc: 'UPI, Cards, Net Banking, EMI, COD — all 100% secure' },
  { icon: '🚚', title: 'Free Shipping', desc: 'Free delivery on all orders above ₹999 across India' },
  { icon: '↩', title: 'Easy Returns', desc: '7-day hassle-free returns and exchanges' },
  { icon: '🏺', title: '100% Authentic', desc: 'Direct from master weavers and trusted mills' },
]

const testimonials = [
  {
    name: 'Priya Sharma',
    location: 'Mumbai, Maharashtra',
    comment: 'The Banarasi silk saree I ordered was absolutely stunning! The zari work was exquisite and the fabric quality was exactly as described. Will definitely order again for my daughter\'s wedding.'
  },
  {
    name: 'Lakshmi Devi',
    location: 'Chennai, Tamil Nadu',
    comment: 'Best Kanjivaram sarees online! I was skeptical ordering silk online but JaihindMill\'s quality exceeded my expectations. The colors were vibrant and delivery was super fast.'
  },
  {
    name: 'Anjali Gupta',
    location: 'Jaipur, Rajasthan',
    comment: 'I ordered three sarees for our family function and every single one was perfect. The packaging was beautiful and the sarees arrived in pristine condition. Highly recommend!'
  },
]
</script>
