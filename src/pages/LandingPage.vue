<script setup>
import { onMounted } from "vue";
import gsap from "gsap";

onMounted(() => {
  gsap.from(".hero-text", {
    y: -50,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
  });
});
</script>

<template>
  <section class="bg-bat-black text-center py-20 shadow-smooth">
  <h1 class="text-5xl font-bold text-bat-pink">Welcome to Gotham</h1>
  <p class="mt-4 text-bat-lightgrey">Dark, sleek, and stylish e-commerce experience.</p>
  <button class="mt-6 px-6 py-3 bg-bat-red text-white rounded-lg shadow-neon hover:bg-bat-pink transition">
    Shop Now
  </button>
</section>
<SwiperSlide>
  <div class="relative">
    <img src="https://picsum.photos/1000/400?1" class="w-full" />
    <div class="absolute inset-0 bg-bat-black/50 flex items-center justify-center">
      <h2 class="text-4xl font-bold text-bat-pink">New Arrivals</h2>
    </div>
  </div>
</SwiperSlide>


  
</template>
