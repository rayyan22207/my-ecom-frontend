<script setup>
import Hero from "../components/Hero.vue";
import heroImg from "../assets/hero-gotham.png"; // ← your generated image
</script>

<template>
  <div class="space-y-10">
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

    <!-- More sections here (features, product grid, banner...) -->
     <section>
    <div class="mx-auto max-w-7xl px-6 py-16 text-center">
      <h2 class="text-3xl font-bold text-bat-lightgrey sm:text-4xl">
        Discover the Dark Elegance of Gotham
      </h2>
      <p class="mt-4 text-bat-grey">
        Explore our exclusive collection of apparel and accessories inspired by the
        enigmatic allure of Gotham City. Crafted for those who dare to embrace the night.
      </p>
      <RouterLink
        to="/shop"
        class="mt-6 inline-block rounded-lg bg-bat-pink px-5 py-3 font-semibold text-white hover:bg-bat-pink/90 transition"
      >
        Start Shopping
      </RouterLink>
    </div>
     </section>
  </div>
</template>
