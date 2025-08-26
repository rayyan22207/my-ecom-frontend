<script setup>
import { computed } from "vue";

const props = defineProps({
  image: { type: String, default: "" },

  /** content */
  title: { type: String, default: "Welcome to Gotham" },
  subtitle: { type: String, default: "" },
  badges: { type: Array, default: () => ["vibrant style", "crafted for edge"] },

  /** ctas */
  primaryText: { type: String, default: "Shop Now" },
  primaryTo: { type: String, default: "/shop" },
  secondaryText: { type: String, default: "Collection" },
  secondaryTo: { type: String, default: "/shop?collection=featured" },

  /** layout */
  height: { type: String, default: "h-[68vh]" },
  heightSm: { type: String, default: "sm:h-[78vh]" },
  align: { type: String, default: "center" }, // "center" | "left"

  /** styling extras */
  overlay: { type: Number, default: 70 },     // 0-100, darkness strength
  gradient: { type: Boolean, default: true },
  showBat: { type: Boolean, default: true },  // faint bat silhouette
});

const bgStyle = computed(() => ({
  backgroundImage: props.image ? `url('${props.image}')` : "none",
}));

const containerAlign = computed(() =>
  props.align === "left"
    ? "items-start text-left"
    : "items-center text-center"
);
</script>

<template>
  <section
    class="relative w-full overflow-hidden rounded-3xl border border-bat-grey/50 bg-bat-black
           shadow-[0_30px_120px_rgba(0,0,0,0.6)]"
    :class="[height, heightSm]"
  >
    <!-- Background image -->
    <div class="absolute inset-0 bg-center bg-cover" :style="bgStyle" aria-hidden="true" />

    <!-- Film-grain -->
    <div class="pointer-events-none absolute inset-0 opacity-[0.12] mix-blend-soft-light"
         style="background-image: url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22400%22><filter id=%22f%22><feTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%222%22/></filter><rect width=%22400%22 height=%22400%22 filter=%22url(%23f)%22/></svg>');">
    </div>

    <!-- Vignette & overlay -->
    <div
      class="absolute inset-0"
      :class="gradient ? 'bg-gradient-to-b from-transparent via-bat-black/40 to-bat-black/80' : ''"
      :style="{ backgroundColor: `rgba(0,0,0,${overlay/100})` }"
      aria-hidden="true"
    />

    <!-- Neon vignettes -->
    <div class="pointer-events-none absolute inset-0">
      <div class="absolute -left-40 top-1/4 h-80 w-80 rounded-full bg-bat-pink/25 blur-[90px]"></div>
      <div class="absolute -right-40 bottom-1/4 h-80 w-80 rounded-full bg-bat-red/25 blur-[90px]"></div>
    </div>

    <!-- Subtle bat silhouette -->
    <svg v-if="showBat"
         class="pointer-events-none absolute inset-x-0 bottom-[18%] mx-auto h-24 w-40 text-bat-black/40"
         viewBox="0 0 512 512" fill="currentColor" aria-hidden="true">
      <path d="M256 112c-23 34-56 44-88 40 10 10 18 30 16 48-22-8-46-5-72 16 6 0 14 6 16 16-30 8-58 30-74 64 50-22 90-8 120 16 22 18 43 42 82 42s60-24 82-42c30-24 70-38 120-16-16-34-44-56-74-64 2-10 10-16 16-16-26-21-50-24-72-16-2-18 6-38 16-48-32 4-65-6-88-40z"/>
    </svg>

    <!-- Content -->
    <div class="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-center px-6 sm:px-8">
      <div :class="['flex flex-col gap-5 sm:gap-6 md:gap-7', containerAlign]">
        <!-- Title -->
        <h1
          v-motion="{
            initial: { opacity: 0, y: 20, filter: 'blur(2px)' },
            enter: { opacity: 1, y: 0, filter: 'blur(0)', transition: { duration: 600 } }
          }"
          class="text-white text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight
                 drop-shadow-[0_2px_10px_rgba(0,0,0,0.65)]"
        >
          {{ title }}
        </h1>

        <!-- Subtitle -->
        <p
          v-if="subtitle"
          v-motion="{
            initial: { opacity: 0, y: 12 },
            enter: { opacity: 1, y: 0, transition: { delay: 110, duration: 450 } }
          }"
          class="max-w-2xl text-bat-lightgrey"
          :class="align === 'left' ? '' : 'mx-auto'"
        >
          {{ subtitle }}
        </p>

        <!-- Badges -->
        <div
          v-if="badges?.length"
          v-motion="{
            initial: { opacity: 0, y: 10 },
            enter: { opacity: 1, y: 0, transition: { delay: 160, duration: 400 } }
          }"
          class="flex flex-wrap items-center gap-3"
          :class="align === 'left' ? '' : 'justify-center'"
        >
          <span
            v-for="(b, i) in badges"
            :key="i"
            class="rounded-full border border-bat-grey/60 bg-bat-black/30 backdrop-blur
                   px-3 py-1 text-sm text-bat-lightgrey shadow-[inset_0_0_0_1px_rgba(255,255,255,0.02)]
                   hover:border-bat-pink/60 transition"
          >
            {{ b }}
          </span>
        </div>

        <!-- CTAs -->
        <div
          v-motion="{
            initial: { opacity: 0, y: 8 },
            enter: { opacity: 1, y: 0, transition: { delay: 230, duration: 380 } }
          }"
          class="flex flex-wrap gap-4"
          :class="align === 'left' ? '' : 'justify-center'"
        >
          <RouterLink
            :to="primaryTo"
            class="inline-flex items-center justify-center rounded-xl bg-bat-pink px-6 py-3 font-semibold text-bat-black
                   shadow-[0_12px_30px_rgba(255,46,136,.38)] hover:shadow-[0_16px_40px_rgba(255,46,136,.5)]
                   hover:-translate-y-0.5 transition will-change-transform focus:outline-none
                   focus:ring-2 focus:ring-bat-pink/60"
          >
            {{ primaryText }}
          </RouterLink>

          <RouterLink
            :to="secondaryTo"
            class="inline-flex items-center justify-center rounded-xl border border-bat-pink/60 bg-transparent px-6 py-3
                   font-semibold text-white hover:bg-bat-pink/10 hover:border-bat-pink
                   focus:outline-none focus:ring-2 focus:ring-bat-pink/60 transition"
          >
            {{ secondaryText }}
          </RouterLink>
        </div>
      </div>
    </div>

    <!-- bottom soft fade so content below connects nicely -->
    <div class="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-bat-dark/90"></div>
  </section>
</template>
