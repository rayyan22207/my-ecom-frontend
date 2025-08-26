<script setup>
const props = defineProps({
  text: { type: String, required: true },
  subIcon: { type: String, default: "bat-icon.png" }, // default file
})
</script>

<template>
  <div
    class="rounded-3xl p-10 text-center text-white
           bg-gradient-to-r from-bat-red via-bat-black to-bat-red
           shadow-[0_30px_80px_rgba(255,46,136,.35)]"
  >
    <!-- Heading -->
    <h3 class="text-3xl sm:text-4xl font-extrabold">{{ text }}</h3>

    <!-- Bat Icon (image file) -->
    <div class="mt-4 flex justify-center">
      <img
        :src="`/src/assets/${subIcon}`"
        alt="Batman Icon"
        class="h-16 w-50 opacity-80"
      />
    </div>
  </div>
</template>
