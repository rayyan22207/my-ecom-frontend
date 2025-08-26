<script setup>
import Hero from "../components/Hero.vue";
import heroImg from "../assets/hero-gotham.png"; // your generated image
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
  </div>
</template>
