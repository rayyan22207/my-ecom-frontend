<script setup>
const props = defineProps({
  text: { type: String, required: true },
  subIcon: { type: String, default: "bat-icon.png" }, // /src/assets/bat-icon.png
  // optional: tweak heights per breakpoint if you want
  h: { type: String, default: "h-48 sm:h-56 md:h-64" },
})
</script>

<template>
  <div
    :class="[
      'relative overflow-hidden rounded-3xl text-center text-white',
      // fixed height so content size never changes
      h,
      // goth gradient
      'bg-gradient-to-r from-bat-red via-bat-black to-bat-red',
      'shadow-[0_30px_80px_rgba(255,46,136,.35)]'
    ]"
  >
    <!-- subtle glow -->
    <div class="pointer-events-none absolute inset-0">
      <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-56 w-56 rounded-full bg-bat-pink/15 blur-3xl"></div>
    </div>

    <!-- Headline centered; doesn't affect banner height beyond the fixed h-* -->
    <div class="absolute inset-0 grid place-items-center px-6">
      <h3 class="relative z-10 text-3xl sm:text-4xl font-extrabold">
        {{ text }}
      </h3>
    </div>

    <!-- Bat icon: absolutely positioned & scalable; won't change banner height -->
    <div class="absolute inset-x-0 bottom-2 sm:bottom-4 flex justify-center">
      <img
        :src="`/src/assets/${subIcon}`"
        alt="Batman Icon"
        class="pointer-events-none h-28 sm:h-32 md:h-36 w-auto opacity-85 drop-shadow-[0_8px_24px_rgba(0,0,0,.45)]"
      />
    </div>
  </div>
</template>
