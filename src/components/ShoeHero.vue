<script setup>
const props = defineProps({
  image: { type: String, required: true },
  year:  { type: String, default: '2024' },
  ctaText: { type: String, default: 'Shop Now' },
  ctaTo:   { type: String, default: '/shop' },

  // layout
  h: { type: String, default: 'h-[56vh] md:h-[62vh] lg:h-[68vh]' },

  // fine-tune image focal point (percentages)
  focalX: { type: String, default: '50%' },   // left/right
  focalY: { type: String, default: '35%' },   // top/down — increase to push image DOWN
  // quick tone controls
  brightness: { type: String, default: 'brightness-[1.05]' },
  contrast:   { type: String, default: 'contrast-[1.05]' },
  // overlay strength 0..100
  overlayTop: { type: Number, default: 12 },   // top fade
  overlayAll: { type: Number, default: 0 },    // global dark veil
})
</script>

<template>
  <section :class="['relative rounded-3xl overflow-hidden', h]">
    <!-- IMAGE -->
    <img
      :src="image" alt=""
      class="absolute inset-0 h-full w-full object-cover"
      :style="{ objectPosition: `${focalX} ${focalY}` }"
      :class="[brightness, contrast]"
    />

    <!-- very light top vignette only (so it’s not too dark) -->
    <div
      class="absolute inset-0 pointer-events-none"
      :style="{
        backgroundImage:
          'linear-gradient(to bottom, rgba(0,0,0,' + (overlayTop/100) + ') 0%, rgba(0,0,0,0) 40%)',
        backgroundColor: 'rgba(0,0,0,' + (overlayAll/100) + ')'
      }"
    />

    <!-- top labels -->
    <div class="absolute left-6 top-6 text-bat-pink tracking-wide text-sm select-none">NEW</div>
    <div class="absolute right-6 top-6 text-gray-300 tracking-wide text-sm select-none">{{ year }}</div>

    <!-- CTA centered near plinth -->
    <div class="absolute inset-0 flex items-end justify-center pb-12">
      <RouterLink
        :to="ctaTo"
        class="rounded-md bg-bat-burgundy px-6 py-3 font-semibold text-white
               shadow-[0_10px_30px_rgba(0,0,0,.45)] hover:bg-bat-burgundy2 transition"
      >
        {{ ctaText }}
      </RouterLink>
    </div>

    <!-- bottom separator fade so next section blends like the reference -->
    <div class="pointer-events-none absolute inset-x-0 bottom-0 h-12
                bg-gradient-to-b from-transparent to-bat-dark/95"></div>
  </section>
</template>
