<template>
  <div class="min-h-screen bg-cream">

    <!-- Header -->
    <div class="bg-white border-b border-gray-100 px-4 py-2.5">
      <div class="max-w-7xl mx-auto text-xs text-gray-500 flex items-center gap-2">
        <NuxtLink to="/" class="hover:text-primary">Home</NuxtLink>
        <span>›</span>
        <span class="text-primary font-medium">Contact Us</span>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 lg:px-6 py-12">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">

        <!-- Left: Contact Form (Image 9 reference) -->
        <div>
          <h1 class="font-serif text-4xl font-bold text-primary mb-2">Get in Touch</h1>
          <p class="text-gray-500 mb-8">We'd love to hear from you. Send us a message and we'll respond within 24 hours.</p>

          <form @submit.prevent="sendMessage" class="space-y-5">
            <div>
              <label class="form-label">Name <span class="text-crimson">*</span></label>
              <input v-model="form.name" type="text" placeholder="Your full name" class="form-input" required />
            </div>

            <div>
              <label class="form-label">Email <span class="text-crimson">*</span></label>
              <input v-model="form.email" type="email" placeholder="your@email.com" class="form-input" required />
            </div>

            <div>
              <label class="form-label">Phone Number</label>
              <input v-model="form.phone" type="tel" placeholder="+91 98765 43210" class="form-input" />
            </div>

            <div>
              <label class="form-label">Subject</label>
              <select v-model="form.subject" class="form-input">
                <option value="">Select a topic</option>
                <option>Order Inquiry</option>
                <option>Product Question</option>
                <option>Return/Exchange</option>
                <option>Wholesale Inquiry</option>
                <option>Custom Order</option>
                <option>Other</option>
              </select>
            </div>

            <div>
              <label class="form-label">Message <span class="text-crimson">*</span></label>
              <textarea
                v-model="form.message"
                placeholder="Write your message here..."
                rows="5"
                class="form-input resize-none"
                required
              ></textarea>
            </div>

            <button type="submit" :disabled="sending" class="w-full btn-primary py-3.5 text-base justify-center disabled:opacity-60">
              <span v-if="sending">Sending Message...</span>
              <span v-else-if="sent">✓ Message Sent!</span>
              <span v-else>Send Message</span>
            </button>

            <p v-if="sent" class="text-center text-teal text-sm">
              ✓ Thank you! We'll get back to you within 24 hours.
            </p>
          </form>
        </div>

        <!-- Right: Store Locations + Map -->
        <div class="space-y-6">
          <!-- Store Locations -->
          <div>
            <h2 class="font-serif text-2xl font-bold text-primary mb-5">Store Locations</h2>

            <div class="space-y-4">
              <div v-for="store in stores" :key="store.city" class="bg-white rounded-2xl p-5 shadow-card hover:shadow-card-hover transition-shadow">
                <h3 class="font-serif font-bold text-lg text-primary mb-3">{{ store.city }}</h3>
                <div class="space-y-2">
                  <div class="flex items-start gap-2.5 text-sm text-gray-600">
                    <svg class="w-4 h-4 text-gold mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"/>
                    </svg>
                    <span>{{ store.address }}</span>
                  </div>
                  <div class="flex items-center gap-2.5 text-sm text-gray-600">
                    <svg class="w-4 h-4 text-gold flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                    </svg>
                    <a :href="`tel:${store.phone}`" class="hover:text-primary">{{ store.phone }}</a>
                  </div>
                  <div class="flex items-center gap-2.5 text-sm text-gray-600">
                    <span class="text-gold">⏰</span>
                    <span>{{ store.hours }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Contact Info -->
          <div class="bg-white rounded-2xl p-5 shadow-card">
            <h3 class="font-serif font-bold text-gray-800 mb-4">Quick Contact</h3>
            <div class="space-y-3">
              <a href="tel:+918793747967" class="flex items-center gap-3 text-sm text-gray-600 hover:text-primary transition-colors">
                <div class="w-9 h-9 bg-green-100 rounded-full flex items-center justify-center text-lg">📞</div>
                <div>
                  <p class="font-medium">+91 87937 47967</p>
                  <p class="text-xs text-gray-400">Mon–Sat 10AM–7PM</p>
                </div>
              </a>
              <a href="https://wa.me/918793003000" target="_blank" class="flex items-center gap-3 text-sm text-gray-600 hover:text-teal transition-colors">
                <div class="w-9 h-9 bg-green-100 rounded-full flex items-center justify-center text-lg">💬</div>
                <div>
                  <p class="font-medium">+91 87930 03000</p>
                  <p class="text-xs text-gray-400">WhatsApp Support (CRM)</p>
                </div>
              </a>
              <a href="https://www.instagram.com/jaihind_mill/" target="_blank" class="flex items-center gap-3 text-sm text-gray-600 hover:text-primary transition-colors">
                <div class="w-9 h-9 bg-pink-100 rounded-full flex items-center justify-center text-lg">📷</div>
                <div>
                  <p class="font-medium">@jaihind_mill</p>
                  <p class="text-xs text-gray-400">Follow us on Instagram</p>
                </div>
              </a>
            </div>
          </div>

          <!-- Map placeholder -->
          <div class="bg-white rounded-2xl overflow-hidden shadow-card">
            <div class="p-4 border-b border-gray-100 flex items-center gap-2">
              <span class="text-gold">📍</span>
              <span class="font-semibold text-gray-700 text-sm">Flagship Store — Surat, Gujarat</span>
            </div>
            <!-- Map embed placeholder -->
            <div class="bg-gray-100 h-56 flex items-center justify-center relative overflow-hidden">
              <div class="text-center text-gray-400">
                <div class="text-4xl mb-2">🗺️</div>
                <p class="text-sm font-medium">Google Maps</p>
                <p class="text-xs">123 Silk Route, Surat, Gujarat</p>
              </div>
              <!-- In production, replace with actual Google Maps iframe -->
              <!-- <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!..."
                width="100%" height="224" class="border-0" allowfullscreen loading="lazy"
              ></iframe> -->
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom Links (Image 9 footer strip) -->
    <div class="bg-white border-t border-gray-100 py-4 px-4">
      <div class="max-w-7xl mx-auto flex items-center justify-center gap-6 text-sm text-gray-500">
        <NuxtLink to="/" class="hover:text-primary">Home</NuxtLink>
        <span class="text-gray-200">—</span>
        <NuxtLink to="/shop" class="hover:text-primary">Sarees</NuxtLink>
        <span class="text-gray-200">—</span>
        <NuxtLink to="/shop" class="hover:text-primary">Collections</NuxtLink>
        <span class="text-gray-200">—</span>
        <NuxtLink to="/about" class="hover:text-primary font-bold text-gray-700">About</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({ title: 'Contact Us — JaihindMill' })

const sending = ref(false)
const sent = ref(false)

const form = reactive({
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
})

const stores = [
  {
    city: 'Pune (Head Office)',
    address: 'Sai Krushna Complex, Sane Chowk, Chikhali Akurdi Road, Pune – 411019, Maharashtra',
    phone: '+91 87937 47967',
    hours: 'Mon–Sat 10AM–7PM',
  },
  {
    city: 'Online Store',
    address: 'Serving all over India with Free Shipping above ₹999. Orders dispatched within 24 hrs.',
    phone: '+91 87930 03000',
    hours: '24/7 Online Orders',
  },
]

const sendMessage = async () => {
  sending.value = true
  await new Promise(r => setTimeout(r, 1500))
  sending.value = false
  sent.value = true

  // Reset form
  form.name = ''
  form.email = ''
  form.phone = ''
  form.subject = ''
  form.message = ''

  setTimeout(() => { sent.value = false }, 5000)
}
</script>
