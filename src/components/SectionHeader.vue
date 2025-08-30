<script setup>
const props = defineProps({
  title: { type: String, required: true },
  linkText: { type: String, default: 'Discover All' },
  linkTo: { type: String, default: '/shop' },
})

// palette (kept local; map to Tailwind tokens later if you want)
const COLORS = {
  gold:     '#d6bf8e',
  goldSoft: '#bfa36e',
  text:     '#e7e2d6',
  textDim:  '#b8b3a6'
}
</script>

<template>
  <div class="relative mx-auto w-full">
    <!-- top hairline -->
    <div class="h-px w-full opacity-15" :style="{ background: COLORS.goldSoft }"></div>

    <div class="flex items-end justify-between gap-4 py-4">
      <!-- Title -->
      <h3
        class="text-[11px] tracking-[0.32em] uppercase select-none"
        :style="{ color: COLORS.textDim, letterSpacing: '0.32em' }"
      >
        {{ title }}
      </h3>

      <!-- Link -->
      <RouterLink
        :to="linkTo"
        class="group inline-flex items-center gap-2 text-sm font-medium"
        :style="{ color: COLORS.textDim }"
      >
        <span
          class="relative"
          :style="{ transition: 'color .2s ease' }"
        >
          {{ linkText }}
          <!-- subtle underline that grows on hover -->
          <span
            class="absolute -bottom-[4px] left-0 h-[1px] w-full origin-left scale-x-0 transition-transform duration-200"
            :style="{ background: `linear-gradient(90deg, ${COLORS.gold}, ${COLORS.goldSoft})` }"
          ></span>
        </span>

        <!-- arrow -->
        <svg
          viewBox="0 0 24 24"
          class="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
          :style="{ color: COLORS.gold }"
          fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"
        >
          <path d="M5 12h13"></path>
          <path d="M12 5l7 7-7 7"></path>
        </svg>
      </RouterLink>
    </div>

    <!-- bottom hairline (thicker, fades out to the right for a premium feel) -->
    <div
      class="h-px w-full"
      :style="{
        background: `linear-gradient(90deg, ${COLORS.goldSoft}, rgba(191,163,110,0.0))`,
        opacity: .25
      }"
    ></div>
  </div>
</template>
