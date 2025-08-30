<script setup>
import ShoeHero from '../components/ShoeHero.vue'
import SectionHeader from '../components/SectionHeader.vue'
import ShoeCard from '../components/ShoeCard.vue'

// hero image (use your own high-res shoe image)
import heroImg from '../assets/shoe.webp'

const arrivals = [
  { id: 1, title: 'Oxford', price: 249, img: 'https://picsum.photos/seed/oxford/960/720', badge: 'New' },
  { id: 2, title: 'Loafer', price: 199, img: 'https://picsum.photos/seed/loafer/960/720', badge: 'New' },
  { id: 3, title: 'Derby',  price: 229, img: 'https://picsum.photos/seed/derby/960/720',  badge: 'New' },
]
</script>

<template>
  <div class="space-y-10">
    <ShoeHero :image="heroImg" year="2024" cta-text="Shop Now" cta-to="/shop" />


    <section class="max-w-7xl mx-auto px-6 space-y-5">
      <SectionHeader title="New Arrivals" link-text="Discover All" link-to="/shop" />
      <div class="grid gap-5 md:grid-cols-3">
        <ShoeCard v-for="p in arrivals" :key="p.id" :product="p" />
      </div>
    </section>

    <section></section> 

    <!-- Wear Quality / Step in Style blocks can be added later as separate components -->
  </div>
</template>
