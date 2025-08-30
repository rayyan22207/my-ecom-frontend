<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'
import gsap from 'gsap'

const props = defineProps({
  image: { type: String, required: true },
  year:  { type: String, default: '2025' },
  ctaText: { type: String, default: 'Shop Now' },
  ctaTo:   { type: String, default: '/shop' },
  fit: { type: String, default: 'contain' },
  brightness: { type: String, default: 'brightness-[1.0]' },
  contrast:   { type: String, default: 'contrast-[1.05]' },

  eyebrow: { type: String, default: 'ECOM SHOE STORE' },
  title:   { type: String, default: 'ELEGANT\nFOOTWEAR' },
  subtitle:{ type: String, default: 'Discover timeless styles crafted with premium materials.' },
})

const COLORS = {
  bg: '#0b0b0b',
  gold: '#d6bf8e',
  goldSoft: '#bfa36e',
  text: '#e7e2d6',
  textDim: '#b8b3a6'
}

// Refs for GSAP bits
const heroRef = ref(null)
const shoeRef = ref(null)
const haloRef = ref(null)
let mm, cleanupFns = []

onMounted(() => {
  // Float animation loop for the shoe (very gentle)
  const floatTl = gsap.timeline({ repeat: -1, yoyo: true })
    .to(shoeRef.value, { y: -6, rotate: -2.5, duration: 3.2, ease: 'sine.inOut' })
    .to(shoeRef.value, { y: 0, rotate: -2, duration: 3.2, ease: 'sine.inOut' })
  cleanupFns.push(() => floatTl.kill())

  // Halo pulse
  const haloTl = gsap.timeline({ repeat: -1, yoyo: true })
    .to(haloRef.value, { opacity: 0.28, duration: 2.8, ease: 'sine.inOut' })
    .to(haloRef.value, { opacity: 0.18, duration: 2.8, ease: 'sine.inOut' })
  cleanupFns.push(() => haloTl.kill())

  // Parallax on pointer
  const onMove = (e) => {
    const rect = heroRef.value.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    gsap.to(shoeRef.value, {
      x: x * 12, y: y * 8, rotate: -2 + x * 1.2, duration: 0.5, ease: 'sine.out'
    })
  }
  heroRef.value.addEventListener('pointermove', onMove)
  cleanupFns.push(() => heroRef.value?.removeEventListener('pointermove', onMove))
})

onBeforeUnmount(() => cleanupFns.forEach(fn => fn()))
</script>

<template>
  <section
    ref="heroRef"
    class="relative overflow-hidden rounded-2xl"
    :style="{ backgroundColor: COLORS.bg, minHeight: 'clamp(460px, 60svh, 700px)' }"
  >
    <!-- BG lighting + grain -->
    <div class="pointer-events-none absolute inset-0">
      <div class="absolute inset-0"
           :style="{ background:
             `radial-gradient(900px 520px at 78% 58%, rgba(255,255,255,0.07), transparent 60%),
              radial-gradient(800px 380px at 30% -5%, rgba(0,0,0,0.42), transparent 70%)`
           }" />
      <div class="absolute inset-0 mix-blend-soft-light opacity-[0.06]"
           :style="{ backgroundImage:
             'url(data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%224%22 height=%224%22><rect width=%224%22 height=%224%22 fill=%22%23000%22/><circle cx=%222%22 cy=%222%22 r=%221%22 fill=%22%23fff%22 opacity=%220.12%22/></svg>)'
           }" />
    </div>

    <!-- Content -->
    <div class="relative mx-auto h-full w-full max-w-7xl px-6 md:px-10 lg:px-14">
      <div class="grid h-full items-center gap-8 md:grid-cols-2">
        <!-- LEFT: Copy (VueUse Motion) -->
        <div
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :enter="{ opacity: 1, y: 0, transition: { delay: 0.05, duration: 0.5, easing: 'ease-out' } }"
          class="z-10"
        >
          <div class="mb-3 text-[11px] tracking-[0.28em] uppercase" :style="{ color: COLORS.goldSoft }">
            {{ eyebrow }}
          </div>

          <h1
            v-motion
            :initial="{ opacity: 0, y: 12 }"
            :enter="{ opacity: 1, y: 0, transition: { delay: 0.12, duration: 0.55 } }"
            class="whitespace-pre-line font-semibold leading-[1.02] text-[30px] md:text-[42px] lg:text-[50px]"
            :style="{ color: COLORS.text, fontFamily: 'ui-serif, Georgia, Cambria, Times New Roman, Times, serif' }"
          >
            {{ title }}
          </h1>

          <div
            v-motion
            :initial="{ scaleX: 0, opacity: 0 }"
            :enter="{ scaleX: 1, opacity: 1, transition: { delay: 0.22, duration: 0.45 } }"
            class="mt-4 h-px w-16 origin-left opacity-30"
            :style="{ background: COLORS.goldSoft }"
          ></div>

          <p
            v-motion
            :initial="{ opacity: 0, y: 10 }"
            :enter="{ opacity: 1, y: 0, transition: { delay: 0.3, duration: 0.45 } }"
            class="mt-4 max-w-lg text-[14px] md:text-[15px] leading-relaxed"
            :style="{ color: COLORS.textDim }"
          >
            {{ subtitle }}
          </p>

          <div
            v-motion
            :initial="{ opacity: 0, y: 8 }"
            :enter="{ opacity: 1, y: 0, transition: { delay: 0.38, duration: 0.4 } }"
            class="mt-6 flex items-center gap-4"
          >
            <RouterLink
              :to="ctaTo"
              class="rounded-md px-5 py-2.5 text-sm font-semibold transition
                     shadow-[0_8px_22px_rgba(0,0,0,.45)]
                     hover:shadow-[0_12px_28px_rgba(0,0,0,.6)]
                     ring-1 ring-transparent hover:ring-[rgba(214,191,142,0.35)] hover:-translate-y-[1px] active:translate-y-0"
              :style="{ backgroundColor: COLORS.gold, color: '#161616' }"
            >
              {{ ctaText }}
            </RouterLink>

            <span class="hidden md:inline text-[12px] tracking-wider" :style="{ color: COLORS.goldSoft }">
              {{ year }}
            </span>
          </div>
        </div>

        <!-- RIGHT: Shoe (GSAP float + motion entrance) -->
        <div class="relative flex items-center justify-center">
          <div ref="haloRef" class="absolute right-4 top-6 h-28 w-28 rounded-full opacity-20 blur-[2px]"
               :style="{ border: `1px solid ${COLORS.goldSoft}` }" />
          <div class="absolute bottom-8 left-1/2 -translate-x-1/2 h-6 w-2/3 rounded-full opacity-40 blur-[10px]"
               :style="{ background: 'linear-gradient(to bottom, rgba(0,0,0,.55), rgba(0,0,0,0))' }" />
          <img
            ref="shoeRef"
            v-motion
            :initial="{ opacity: 0, x: 30, rotate: -4 }"
            :enter="{ opacity: 1, x: 0, rotate: -2, transition: { delay: 0.18, duration: 0.6, easing: 'ease-out' } }"
            :src="image"
            alt="Elegant shoe"
            :class="[
              'relative z-10 mx-auto select-none drop-shadow-2xl will-change-transform',
              fit === 'contain' ? 'h-auto w-[62%] md:w-[66%] lg:w-[64%]' : 'w-auto object-cover',
              brightness, contrast
            ]"
            :style="{
              maxHeight: 'min(100%, 540px)',
              objectPosition: fit === 'cover' ? '55% 55%' : undefined,
              transform: fit === 'cover' ? undefined : 'translateY(4px) rotate(-2deg)'
            }"
            draggable="false"
          />
        </div>
      </div>
    </div>

    <!-- hairline borders -->
    <div class="absolute inset-x-0 top-0 h-px opacity-20" :style="{ background: COLORS.goldSoft }"></div>
    <div class="absolute inset-x-0 bottom-0 h-px opacity-15" :style="{ background: COLORS.goldSoft }"></div>
  </section>
</template>
