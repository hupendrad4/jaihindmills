// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  nitro: {
    preset: 'vercel',
  },
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
  ],
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      title: 'JaihindMill - Premium Indian Sarees & Ethnic Wear',
      htmlAttrs: { lang: 'en' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Shop premium Indian sarees, salwar suits, lehengas and ethnic wear at JaihindMill. Authentic Banarasi, Kanjivaram, Chanderi and more with free shipping.' },
        { name: 'keywords', content: 'sarees, indian sarees, banarasi sarees, kanjivaram sarees, silk sarees, ethnic wear, indian fashion, salwar suits, lehengas' },
        { property: 'og:title', content: 'JaihindMill - Premium Indian Sarees' },
        { property: 'og:description', content: 'Explore the finest collection of Indian sarees and ethnic wear.' },
        { property: 'og:type', content: 'website' },
        { name: 'theme-color', content: '#8B1635' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Poppins:wght@300;400;500;600;700&display=swap'
        },
      ],
    },
    pageTransition: { name: 'page', mode: 'out-in' },
  },
  tailwindcss: {
    cssPath: '~/assets/css/main.css',
    configPath: '~/tailwind.config.ts',
  },
  runtimeConfig: {
    public: {
      clerkPublishableKey: process.env.CLERK_PUBLISHABLE_KEY || '',
      convexUrl: process.env.CONVEX_URL || '',
      razorpayKeyId: process.env.RAZORPAY_KEY_ID || '',
    },
  },
})
