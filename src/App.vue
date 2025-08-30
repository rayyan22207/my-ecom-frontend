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
    <!-- <footer class="py-6 text-center border-t border-bat-grey text-bat-lightgrey bg-bat-dark">
      <span class="text-bat-pink font-semibold">© {{ new Date().getFullYear() }} Gotham Ecom</span>  
      <span class="ml-2 text-bat-red">— All rights reserved</span>
    </footer> -->
  </div>
</template>
