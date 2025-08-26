<script setup>
import Hero from "../components/Hero.vue"
import FeatureCard from "../components/FeatureCard.vue"
import ProductCard from "../components/ProductCard.vue"
import BannerCTA from "../components/BannerCTA.vue"
import Testimonials from "../components/Testimonials.vue"

import heroImg from "../assets/hero-gotham.png"
import batIcon from "../assets/bat-icon.png"

const features = [
  { icon: "bolt",   title: "Sti-ant\nDesigns" },
  { icon: "heart",  title: "Quality\nMaterials" },
  { icon: "shield", title: "Premium\nquality" },
]

const products = [
  { id: 1, title: "Stealth Designs", price: null, img: "https://picsum.photos/seed/hoodie/800/600", big: true },
  { id: 2, title: "Hoodie", price: 75, img: "https://picsum.photos/seed/tee1/800/600" },
  { id: 3, title: "T-shirt", price: 85, img: "https://picsum.photos/seed/tee2/800/600" },
  { id: 4, title: "Cap", price: 28, img: "https://picsum.photos/seed/cap/800/600" },
]

const footerCols = [
  { head: "Company", links: ["About", "Careers", "Press"] },
  { head: "Shop", links: ["Men’s", "Women’s", "Accessories"] },
  { head: "Help", links: ["FAQs", "Shipping", "Returns"] },
]
</script>

<template>
  <div class="space-y-10">
    <!-- HERO -->
    <Hero
      :image="heroImg"
      title="Welcome to Gotham"
      subtitle="Minimal. Elegant. Built for the night."
      :badges="['vibrant style', 'crafted for edge']"
      primary-text="Shop Now"
      primary-to="/shop"
      secondary-text="Collection"
      secondary-to="/shop?collection=featured"
      height="h-[65vh]"
      height-sm="sm:h-[75vh]"
    />

    <!-- FEATURE CHIPS -->
    <section class="max-w-7xl mx-auto px-6 grid gap-4 sm:grid-cols-3">
      <FeatureCard
        v-for="(f,i) in features"
        :key="i"
        :icon="f.icon"
        :title="f.title"
      />
    </section>

    <!-- PRODUCT GRID -->
    <section class="max-w-7xl mx-auto px-6">
      <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <!-- big spotlight card spans 2x2 on lg -->
        <ProductCard v-for="p in products" :key="p.id" :product="p" />
      </div>
    </section>

    <!-- NEON BANNER -->
    <section class="max-w-7xl mx-auto px-6">
      <BannerCTA text="Unleash Your Dark Side" sub-icon="../assets/bat-icon.png" />
    </section>

    <!-- TESTIMONIALS + FOOTER LINKS -->
    <section class="max-w-7xl mx-auto px-6">
      <Testimonials />

      <div class="mt-10 grid gap-8 sm:grid-cols-3 text-sm text-bat-lightgrey">
        <div v-for="(col,idx) in footerCols" :key="idx">
          <h4 class="mb-3 font-semibold text-white">{{ col.head }}</h4>
          <ul class="space-y-2">
            <li v-for="(l,i) in col.links" :key="i">
              <a href="#" class="hover:text-bat-pink transition">{{ l }}</a>
            </li>
          </ul>
        </div>

        <div class="sm:col-span-3 mt-8 flex items-center gap-3 text-bat-lightgrey/80">
          <span class="text-sm">Testimonials</span>
          <div class="flex items-center gap-2">
            <a href="#" class="h-8 w-8 inline-flex items-center justify-center rounded-lg bg-bat-grey/30 hover:bg-bat-grey/50 transition">
              <svg viewBox="0 0 24 24" class="h-4 w-4" fill="currentColor"><path d="M22.46 6c-.77.35-1.6.58-2.46.69a4.28 4.28 0 0 0 1.88-2.37 8.6 8.6 0 0 1-2.72 1.05A4.27 4.27 0 0 0 12 8.46c0 .33.04.66.11.97A12.1 12.1 0 0 1 3.15 5.1a4.28 4.28 0 0 0 1.32 5.7c-.62-.02-1.2-.19-1.71-.47v.05a4.27 4.27 0 0 0 3.43 4.18c-.29.08-.6.12-.92.12-.22 0-.44-.02-.65-.06a4.28 4.28 0 0 0 3.99 2.96A8.58 8.58 0 0 1 2 19.54a12.08 12.08 0 0 0 6.55 1.92c7.86 0 12.17-6.51 12.17-12.17 0-.19 0-.39-.01-.58A8.69 8.69 0 0 0 24 5.5a8.5 8.5 0 0 1-2.54.7z"/></svg>
            </a>
            <a href="#" class="h-8 w-8 inline-flex items-center justify-center rounded-lg bg-bat-grey/30 hover:bg-bat-grey/50 transition">
              <svg viewBox="0 0 24 24" class="h-4 w-4" fill="currentColor"><path d="M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.9.2 2.4.4.6.2 1 .4 1.4.8.4.4.6.8.8 1.4.2.5.3 1.2.4 2.4.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.2 1.9-.4 2.4-.2.6-.4 1-.8 1.4-.4.4-.8.6-1.4.8-.5.2-1.2.3-2.4.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.9-.2-2.4-.4-.6-.2-1-.4-1.4-.8-.4-.4-.6-.8-.8-1.4-.2-.5-.3-1.2-.4-2.4C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c.1-1.2.2-1.9.4-2.4.2-.6.4-1 .8-1.4.4-.4.8-.6 1.4-.8.5-.2 1.2-.3 2.4-.4C8.4 2.2 8.8 2.2 12 2.2m0 2.2c-3.1 0-3.5 0-4.8.1-1 .1-1.6.2-2 .3-.5.2-.8.3-1 .6-.3.3-.4.5-.6 1-.1.4-.2 1-.3 2-.1 1.3-.1 1.7-.1 4.8s0 3.5.1 4.8c.1 1 .2 1.6.3 2 .2.5.3.8.6 1 .3.3.5.4 1 .6.4.1 1 .2 2 .3 1.3.1 1.7.1 4.8.1s3.5 0 4.8-.1c1-.1 1.6-.2 2-.3.5-.2.8-.3 1-.6.3-.3.4-.5.6-1 .1-.4.2-1 .3-2 .1-1.3.1-1.7.1-4.8s0-3.5-.1-4.8c-.1-1-.2-1.6-.3-2-.2-.5-.3-.8-.6-1-.3-.3-.5-.4-1-.6-.4-.1-1-.2-2-.3-1.3-.1-1.7-.1-4.8-.1m0 3.3a6.3 6.3 0 1 1 0 12.6 6.3 6.3 0 0 1 0-12.6m0 2.2a4.1 4.1 0 1 0 0 8.2 4.1 4.1 0 0 0 0-8.2z"/></svg>
            </a>
            <a href="#" class="h-8 w-8 inline-flex items-center justify-center rounded-lg bg-bat-grey/30 hover:bg-bat-grey/50 transition">
              <svg viewBox="0 0 24 24" class="h-4 w-4" fill="currentColor"><path d="M22.54 6.42c-.2-.74-.78-1.32-1.52-1.52C19.78 4.5 12 4.5 12 4.5s-7.78 0-9.02.4c-.74.2-1.32.78-1.52 1.52C1 7.66 1 12 1 12s0 4.34.46 5.58c.2.74.78 1.32 1.52 1.52 1.24.4 9.02.4 9.02.4s7.78 0 9.02-.4c.74-.2 1.32-.78 1.52-1.52C23 16.34 23 12 23 12s0-4.34-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z"/></svg>
            </a>
          </div>
        </div>
      </div>

    </section>
  </div>
</template>
