<script setup>
import { computed } from "vue";

const props = defineProps({
  /** Background image (import or URL) */
  image: { type: String, default: "" },

  /** Headline + sub */
  title: { type: String, default: "Welcome to Gotham" },
  subtitle: { type: String, default: "" },

  /** Small label chips under the title */
  badges: {
    type: Array,
    default: () => ["vibrant style", "crafted for edge"],
  },

  /** Primary / Secondary CTA */
  primaryText: { type: String, default: "Shop Now" },
  primaryTo: { type: String, default: "/shop" },
  secondaryText: { type: String, default: "Collection" },
  secondaryTo: { type: String, default: "/shop?collection=featured" },

  /** Height (desktop / mobile) */
  height: { type: String, default: "h-[60vh]" },     // desktop
  heightSm: { type: String, default: "sm:h-[70vh]" } // small+ / tweak as you like
});

const bgStyle = computed(() => ({
  backgroundImage: props.image ? `url('${props.image}')` : "none",
}));
</script>

<template>
  <section
    class="relative w-full overflow-hidden rounded-3xl border border-bat-grey/50 bg-bat-black shadow-[0_20px_80px_rgba(0,0,0,0.6)]"
    :class="[height, heightSm]"
  >
    <!-- Background image -->
    <div
      class="absolute inset-0 bg-center bg-cover"
      :style="bgStyle"
      aria-hidden="true"
    />

    <!-- Gradient overlay (no text baked into image) -->
    <div
      class="absolute inset-0 bg-gradient-to-b from-bat-black/40 via-bat-black/55 to-bat-black/80"
      aria-hidden="true"
    />
    <!-- Pink/Red vignette edges -->
    <div class="pointer-events-none absolute inset-0">
      <div class="absolute -left-40 top-1/4 h-72 w-72 rounded-full bg-bat-pink/25 blur-3xl"></div>
      <div class="absolute -right-40 bottom-1/4 h-72 w-72 rounded-full bg-bat-red/25 blur-3xl"></div>
    </div>

    <!-- Content -->
    <div
      class="relative z-10 mx-auto flex h-full max-w-7xl flex-col items-center justify-center px-6 text-center"
    >
      <!-- Title -->
      <h1
        v-motion="{
          initial: { opacity: 0, y: 20 },
          enter: { opacity: 1, y: 0, transition: { duration: 600 } }
        }"
        class="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white drop-shadow-[0_2px_8px_rgba(0,0,0,.6)]"
      >
        {{ title }}
      </h1>

      <!-- Subtitle -->
      <p
        v-if="subtitle"
        v-motion="{
          initial: { opacity: 0, y: 16 },
          enter: { opacity: 1, y: 0, transition: { delay: 120, duration: 500 } }
        }"
        class="mt-3 max-w-2xl text-bat-lightgrey"
      >
        {{ subtitle }}
      </p>

      <!-- Badges -->
      <div
        v-if="badges?.length"
        v-motion="{
          initial: { opacity: 0, y: 12 },
          enter: { opacity: 1, y: 0, transition: { delay: 180, duration: 450 } }
        }"
        class="mt-6 flex flex-wrap items-center justify-center gap-3"
      >
        <span
          v-for="(b, i) in badges"
          :key="i"
          class="rounded-full border border-bat-grey/60 bg-bat-black/40 px-3 py-1 text-sm text-bat-lightgrey backdrop-blur
                 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.02)]"
        >
          {{ b }}
        </span>
      </div>

      <!-- CTAs -->
      <div
        v-motion="{
          initial: { opacity: 0, y: 10 },
          enter: { opacity: 1, y: 0, transition: { delay: 260, duration: 400 } }
        }"
        class="mt-8 flex flex-wrap items-center justify-center gap-4"
      >
        <RouterLink
          :to="primaryTo"
          class="inline-flex items-center justify-center rounded-xl bg-bat-pink px-6 py-3 font-semibold text-bat-black
                 shadow-[0_10px_25px_rgba(255,46,136,.35)] transition hover:brightness-110 focus:outline-none
                 focus:ring-2 focus:ring-bat-pink/60"
        >
          {{ primaryText }}
        </RouterLink>

        <RouterLink
          :to="secondaryTo"
          class="inline-flex items-center justify-center rounded-xl border border-bat-pink/60 bg-transparent px-6 py-3
                 font-semibold text-white transition hover:bg-bat-pink/10 focus:outline-none
                 focus:ring-2 focus:ring-bat-pink/60"
        >
          {{ secondaryText }}
        </RouterLink>
      </div>

      <!-- Optional slot (e.g., tiny chips row, trust badges) -->
      <div class="mt-6">
        <slot />
      </div>
    </div>
  </section>
</template>
