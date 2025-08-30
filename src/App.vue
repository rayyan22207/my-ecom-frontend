<script setup>
import Navbar from './components/Navbar.vue'
</script>

<template>
  <div class="min-h-screen bg-bat-black text-bat-lightgrey flex flex-col">
    <!-- Navbar (always visible) -->
    <Navbar />
    

    <!-- Page content (changes via RouterView) -->
    <main class="flex-grow bg-bat-dark">
      <RouterView />
    </main>

    <!-- Footer (global too, optional) -->
    <footer
  class="relative mt-12 border-t text-sm"
  :style="{
    borderColor: 'rgba(191,163,110,0.25)', /* goldSoft hairline */
    background: '#0f0f0f'
  }"
>
  <!-- faint vignette overlay -->
  <div class="pointer-events-none absolute inset-0"
       :style="{ background: 'radial-gradient(100% 120% at 50% 120%, rgba(0,0,0,.6), transparent 70%)' }"></div>

  <div class="relative mx-auto max-w-7xl px-6 py-8 flex flex-col items-center gap-3 md:flex-row md:justify-between">
    <!-- Left: brand -->
    <span
      class="font-semibold tracking-wide"
      :style="{ color: '#d6bf8e', fontFamily: 'ui-serif, Georgia, Cambria, Times New Roman, Times, serif' }"
    >
      © {{ new Date().getFullYear() }} Gotham Ecom
    </span>

    <!-- Right: links -->
    <div class="flex items-center gap-6">
      <RouterLink
        to="/privacy"
        class="transition-colors duration-200 hover:underline"
        :style="{ color: '#b8b3a6' }"
      >
        Privacy
      </RouterLink>
      <RouterLink
        to="/terms"
        class="transition-colors duration-200 hover:underline"
        :style="{ color: '#b8b3a6' }"
      >
        Terms
      </RouterLink>
      <span class="text-xs" :style="{ color: '#bfa36e' }">All rights reserved</span>
    </div>
  </div>

  <!-- bottom gold hairline -->
  <div class="h-[1px] w-full" :style="{ background: 'rgba(191,163,110,0.18)' }"></div>
</footer>

  </div>
</template>
