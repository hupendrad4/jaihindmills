<template>
  <div class="min-h-screen">

    <!-- Hero Section (Image 8 reference — dark maroon + woman in saree) -->
    <section class="relative min-h-[480px] flex items-end bg-primary overflow-hidden">
      <div class="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=1400&h=600&fit=crop"
          alt="About JaihindMill"
          class="w-full h-full object-cover opacity-40"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-primary via-primary/70 to-transparent"></div>
      </div>

      <div class="relative z-10 max-w-7xl mx-auto px-4 lg:px-6 pb-14 pt-20">
        <span class="text-gold text-sm font-semibold uppercase tracking-widest">Est. 1985</span>
        <h1 class="font-serif text-5xl lg:text-6xl font-bold text-white mt-2 mb-4">About Us</h1>
        <p class="text-white/70 text-lg max-w-2xl leading-relaxed">
          Extraordinary sarees, a heritage of artisanship, and a love for India's glorious textile traditions. At JaihindMill, we bring living heritage to your wardrobe.
        </p>
      </div>

      <!-- Decorative gold border -->
      <div class="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold to-transparent"></div>
    </section>

    <!-- Brand Story Stats -->
    <section class="bg-cream-dark py-10 px-4">
      <div class="max-w-7xl mx-auto">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div v-for="stat in brandStats" :key="stat.label" class="text-center">
            <p class="font-serif text-4xl font-bold text-primary">{{ stat.value }}</p>
            <p class="text-gray-600 text-sm mt-1">{{ stat.label }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Our Story -->
    <section class="py-16 px-4 bg-white">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-12">
          <h2 class="section-title">Our Story</h2>
          <div class="divider-gold"></div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 class="font-serif text-2xl font-bold text-primary mb-4">From a Small Loom to a National Legacy</h3>
            <p class="text-gray-600 leading-relaxed mb-4">
              JaihindMill was born in 1985 in the heart of Surat's textile district. What began as a family-owned weaving enterprise with three looms has grown into one of India's most trusted names in authentic handloom sarees.
            </p>
            <p class="text-gray-600 leading-relaxed mb-4">
              Our founder, Shri Rameshbhai Patel, believed that every Indian woman deserves to drape herself in the finest silks — crafted by master artisans who pour generations of knowledge into every thread. That belief drives us today.
            </p>
            <p class="text-gray-600 leading-relaxed mb-6">
              We work directly with weaver communities across Varanasi, Kanchipuram, Chanderi, Bhagalpur and Pochampally — ensuring fair wages, preserving dying crafts, and bringing the most authentic handlooms to your doorstep.
            </p>
            <NuxtLink to="/shop" class="btn-primary">Explore Our Collection</NuxtLink>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <img src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=300&h=350&fit=crop" alt="Our Weavers" class="rounded-2xl w-full h-48 object-cover shadow-card" />
            <img src="https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=300&h=350&fit=crop" alt="Fabric Collection" class="rounded-2xl w-full h-48 object-cover shadow-card mt-8" />
            <img src="https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=300&h=350&fit=crop" alt="Artisans at Work" class="rounded-2xl w-full h-48 object-cover shadow-card -mt-4" />
            <img src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=300&h=350&fit=crop" alt="Saree Collection" class="rounded-2xl w-full h-48 object-cover shadow-card mt-4" />
          </div>
        </div>
      </div>
    </section>

    <!-- Team / Founders -->
    <section class="py-16 px-4 bg-cream mandala-bg">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-12">
          <h2 class="section-title">Meet Our Team</h2>
          <p class="section-subtitle">The passionate people behind JaihindMill</p>
          <div class="divider-gold"></div>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
          <div v-for="member in team" :key="member.name" class="text-center group">
            <div class="relative inline-block mb-4">
              <div class="w-24 h-24 rounded-full mx-auto overflow-hidden border-4 border-white shadow-card group-hover:border-gold transition-colors duration-300">
                <img :src="member.avatar" :alt="member.name" class="w-full h-full object-cover" />
              </div>
              <div class="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-gold text-white text-xs px-2.5 py-0.5 rounded-full whitespace-nowrap">
                {{ member.role }}
              </div>
            </div>
            <div class="mt-4">
              <h4 class="font-serif font-bold text-gray-800">{{ member.name }}</h4>
              <p class="text-gray-500 text-xs mt-1 leading-relaxed px-2">{{ member.bio }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Mission Statement -->
    <section class="py-16 px-4 bg-primary text-white relative overflow-hidden">
      <div class="absolute inset-0 mandala-bg opacity-20"></div>
      <div class="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold to-transparent"></div>
      <div class="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold to-transparent"></div>

      <div class="relative max-w-4xl mx-auto text-center">
        <span class="text-gold text-4xl">✦</span>
        <h2 class="font-serif text-3xl lg:text-4xl font-bold mt-3 mb-5">Mission Statement</h2>
        <p class="text-white/80 text-lg leading-relaxed max-w-2xl mx-auto mb-8">
          Our mission is to celebrate India's incredible textile heritage by connecting artisan communities with modern buyers — creating sustainable livelihoods, preserving dying crafts, and putting authentic handlooms in every Indian home.
        </p>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div v-for="pillar in missionPillars" :key="pillar.title" class="bg-white/10 rounded-2xl p-5">
            <div class="text-3xl mb-3">{{ pillar.icon }}</div>
            <h3 class="font-serif font-bold text-lg text-gold mb-2">{{ pillar.title }}</h3>
            <p class="text-white/70 text-sm leading-relaxed">{{ pillar.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Team Photo Grid -->
    <section class="py-16 px-4 bg-white">
      <div class="max-w-7xl mx-auto">
        <h2 class="section-title mb-3">Our Artisan Partners</h2>
        <div class="divider-gold mb-8"></div>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div v-for="(artisan, i) in artisans" :key="i" class="relative group overflow-hidden rounded-2xl aspect-square">
            <img :src="artisan.image" :alt="artisan.city" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <div class="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent"></div>
            <div class="absolute bottom-3 left-3 text-white">
              <p class="font-semibold text-sm">{{ artisan.city }}</p>
              <p class="text-white/70 text-xs">{{ artisan.craft }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
useHead({ title: 'About Us — JaihindMill' })

const brandStats = [
  { value: '1985', label: 'Year Founded' },
  { value: '50,000+', label: 'Happy Customers' },
  { value: '1,200+', label: 'Saree Designs' },
  { value: '200+', label: 'Artisan Families' },
]

const team = [
  {
    name: 'Rameshbhai Patel',
    role: 'Founder',
    bio: 'Visionary textile entrepreneur who built JaihindMill from three looms to a national brand',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop&faces=true',
  },
  {
    name: 'Priya Patel',
    role: 'CEO',
    bio: 'Second-generation leader driving digital transformation while honoring traditional craftsmanship',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop&faces=true',
  },
  {
    name: 'Vikram Shah',
    role: 'Head of Design',
    bio: 'NID graduate with 15 years of expertise blending traditional motifs with contemporary aesthetics',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&faces=true',
  },
  {
    name: 'Meera Krishnan',
    role: 'Artisan Relations',
    bio: 'Passionate advocate for weaver communities, ensuring fair wages and preserving heritage crafts',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop&faces=true',
  },
]

const missionPillars = [
  {
    icon: '🏺',
    title: 'Preserve Heritage',
    desc: 'Documenting and promoting ancient weaving techniques from across India'
  },
  {
    icon: '🤝',
    title: 'Empower Artisans',
    desc: 'Fair trade practices ensuring 200+ weaver families earn dignified livelihoods'
  },
  {
    icon: '🌿',
    title: 'Sustainable Fashion',
    desc: 'Eco-friendly natural dyes, organic cotton, and zero-waste packaging'
  },
]

const artisans = [
  { city: 'Varanasi', craft: 'Banarasi Silk', image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=300&h=300&fit=crop' },
  { city: 'Kanchipuram', craft: 'Kanjivaram Silk', image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=300&h=300&fit=crop' },
  { city: 'Chanderi', craft: 'Chanderi Silk', image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=300&h=300&fit=crop' },
  { city: 'Pochampally', craft: 'Ikat Weave', image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=300&h=300&fit=crop' },
]
</script>
