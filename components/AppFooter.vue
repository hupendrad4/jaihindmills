<template>
  <footer class="bg-primary text-white">
    <!-- Gold divider -->
    <div class="h-1 bg-gradient-to-r from-transparent via-gold to-transparent"></div>

    <!-- Newsletter -->
    <div class="bg-primary-dark py-10 mandala-bg">
      <div class="max-w-7xl mx-auto px-4 lg:px-6 text-center">
        <div class="inline-flex items-center justify-center w-12 h-12 bg-gold/20 rounded-full mb-4">
          <span class="text-gold text-xl">✉</span>
        </div>
        <h3 class="font-serif text-2xl font-bold mb-2">Stay in Touch with Tradition</h3>
        <p class="text-white/60 text-sm mb-6">Subscribe for exclusive offers, new arrivals, and festive collections</p>
        <form @submit.prevent="subscribe" class="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            v-model="email"
            type="email"
            placeholder="Your email address"
            class="flex-1 bg-white/10 border border-white/20 text-white placeholder-white/40 rounded-lg px-4 py-3 text-sm outline-none focus:border-gold transition-colors"
            required
          />
          <button type="submit" class="btn-gold whitespace-nowrap justify-center">
            Subscribe
          </button>
        </form>
        <p v-if="subscribed" class="text-gold text-sm mt-3">✓ Thank you! You're subscribed.</p>
      </div>
    </div>

    <!-- Main Footer -->
    <div class="py-12">
      <div class="max-w-7xl mx-auto px-4 lg:px-6">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">

          <!-- Brand -->
          <div class="col-span-2 md:col-span-1">
            <div class="flex items-center gap-2 mb-4">
              <div class="w-10 h-10 bg-gold rounded-full flex items-center justify-center font-serif font-bold text-xl text-white">J</div>
              <div>
                <span class="font-serif text-xl font-bold text-white">Jaihind</span>
                <span class="font-serif text-xl font-bold text-gold">Mill</span>
              </div>
            </div>
            <p class="text-white/60 text-sm leading-relaxed mb-5">
              Celebrating India's rich textile heritage since 1985. Premium sarees, authentic handlooms, and ethnic wear for every occasion.
            </p>
            <!-- Social Links -->
            <div class="flex gap-3">
              <a v-for="social in socials" :key="social.name" :href="social.href" target="_blank" rel="noopener"
                class="w-9 h-9 bg-white/10 hover:bg-gold rounded-lg flex items-center justify-center text-sm transition-colors"
                :aria-label="social.name">
                {{ social.icon }}
              </a>
            </div>
          </div>

          <!-- Quick Links -->
          <div>
            <h4 class="font-semibold text-gold mb-4 text-sm uppercase tracking-wider">Shop</h4>
            <ul class="space-y-2.5">
              <li v-for="link in shopLinks" :key="link.to">
                <NuxtLink :to="link.to" class="text-white/60 hover:text-white text-sm transition-colors">{{ link.label }}</NuxtLink>
              </li>
            </ul>
          </div>

          <!-- Company -->
          <div>
            <h4 class="font-semibold text-gold mb-4 text-sm uppercase tracking-wider">Company</h4>
            <ul class="space-y-2.5">
              <li v-for="link in companyLinks" :key="link.to">
                <NuxtLink :to="link.to" class="text-white/60 hover:text-white text-sm transition-colors">{{ link.label }}</NuxtLink>
              </li>
            </ul>
          </div>

          <!-- Contact -->
          <div>
            <h4 class="font-semibold text-gold mb-4 text-sm uppercase tracking-wider">Contact</h4>
            <ul class="space-y-3">
              <li class="flex items-start gap-2 text-white/60 text-sm">
                <span class="text-gold mt-0.5">📍</span>
                <span>Sai Krushna Complex, Sane Chowk, Chikhali Akurdi Road, Pune – 411019</span>
              </li>
              <li class="flex items-center gap-2 text-white/60 text-sm">
                <span class="text-gold">📞</span>
                <a href="tel:+918793747967" class="hover:text-white transition-colors">+91 87937 47967</a>
              </li>
              <li class="flex items-center gap-2 text-white/60 text-sm">
                <span class="text-gold">💬</span>
                <a href="https://wa.me/918793003000" target="_blank" class="hover:text-white transition-colors">+91 87930 03000 (WhatsApp)</a>
              </li>
              <li class="flex items-center gap-2 text-white/60 text-sm">
                <span class="text-gold">📷</span>
                <a href="https://www.instagram.com/jaihind_mill/" target="_blank" class="hover:text-white transition-colors">@jaihind_mill</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- Payment Icons -->
    <div class="border-t border-white/10 py-6">
      <div class="max-w-7xl mx-auto px-4 lg:px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div class="flex items-center gap-3 flex-wrap justify-center">
          <span class="text-white/40 text-xs">We Accept:</span>
          <div v-for="payment in paymentMethods" :key="payment"
            class="bg-white/10 text-white/70 text-xs px-3 py-1.5 rounded font-medium">
            {{ payment }}
          </div>
        </div>
        <div class="flex items-center gap-4 text-white/40 text-xs">
          <span>🔒 Secure Checkout</span>
          <span>🚚 Free Shipping</span>
          <span>↩ Easy Returns</span>
        </div>
      </div>
    </div>

    <!-- Copyright -->
    <div class="bg-primary-dark py-4 text-center">
      <p class="text-white/40 text-xs">
        © {{ new Date().getFullYear() }} JaihindMill. All rights reserved.
        &nbsp;·&nbsp;
        <NuxtLink to="/privacy" class="hover:text-white/60">Privacy Policy</NuxtLink>
        &nbsp;·&nbsp;
        <NuxtLink to="/terms" class="hover:text-white/60">Terms of Service</NuxtLink>
        &nbsp;·&nbsp;
        <NuxtLink to="/sitemap" class="hover:text-white/60">Sitemap</NuxtLink>
      </p>
    </div>
  </footer>
</template>

<script setup lang="ts">
const email = ref('')
const subscribed = ref(false)

const subscribe = () => {
  if (email.value) {
    subscribed.value = true
    email.value = ''
    setTimeout(() => { subscribed.value = false }, 4000)
  }
}

const socials = [
  { name: 'Facebook', icon: 'f', href: 'https://www.facebook.com/profile.php?id=61559879375542' },
  { name: 'Instagram', icon: '📷', href: 'https://www.instagram.com/jaihind_mill/' },
  { name: 'YouTube', icon: '▶', href: 'https://www.youtube.com/channel/UC6sqBJHWQ6RpifdMtxBl8Dg' },
  { name: 'WhatsApp', icon: '💬', href: 'https://whatsapp.com/channel/0029Vansscp4Y9luh9ennK0I' },
]

const shopLinks = [
  { label: 'All Sarees', to: '/shop' },
  { label: 'Salwar Suits', to: '/shop/salwar-suits' },
  { label: 'Lehengas', to: '/shop/lehengas' },
  { label: 'New Arrivals', to: '/shop/new-arrivals' },
  { label: 'Offers & Sale', to: '/shop/offers' },
  { label: 'Banarasi Silk', to: '/shop?fabric=Banarasi' },
  { label: 'Paithani Collection', to: '/shop?subcategory=Paithani' },
]

const companyLinks = [
  { label: 'About Us', to: '/about' },
  { label: 'Blog & Stories', to: '/blog' },
  { label: 'Careers', to: '/careers' },
  { label: 'Contact Us', to: '/contact' },
  { label: 'Store Locator', to: '/stores' },
  { label: 'Track Order', to: '/orders' },
]

const paymentMethods = ['UPI', 'Visa', 'Mastercard', 'Rupay', 'Net Banking', 'COD', 'EMI']
</script>
