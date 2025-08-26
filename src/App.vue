<script setup>
import { ref, onMounted } from "vue";

const dark = ref(true);

function toggleDark() {
  dark.value = !dark.value;
  document.documentElement.classList.toggle("dark", dark.value);
}

// make sure initial dark mode applies
onMounted(() => {
  document.documentElement.classList.toggle("dark", dark.value);
});
</script>

<template>
  <div class="min-h-screen bg-gotham-900 text-gray-100 flex flex-col items-center justify-center gap-6 p-8">
    <!-- Title -->
    <h1 class="text-3xl font-bold">🚀 Vue + Vite + Tailwind + Flowbite Test</h1>

    <!-- Flowbite button -->
    <button @click="toggleDark"
      class="text-white bg-accent-500 hover:bg-yellow-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
      Toggle Dark Mode
    </button>

    <!-- Flowbite-style card -->
    <div class="w-full max-w-sm rounded-lg border border-gotham-700 bg-gotham-800 shadow-smooth">
      <img class="rounded-t-lg" src="https://picsum.photos/400/200" alt="demo" />
      <div class="p-5">
        <h5 class="mb-2 text-2xl font-bold tracking-tight">Test Product</h5>
        <p class="mb-3 font-normal text-gray-400">This is a demo card styled with Flowbite + Tailwind.</p>
        <button
          class="text-gray-900 bg-accent-500 hover:bg-yellow-300 font-medium rounded-lg text-sm px-4 py-2">
          Add to Cart
        </button>
      </div>
    </div>
  </div>
</template>
