<script setup>
import SectionHeader from '../components/SectionHeader.vue'
import { ref } from 'vue'

// Content (swap with real copy/assets later)
const hero = {
  title: 'Crafted for the long run',
  subtitle: 'Gotham makes timeless footwear with full-grain leathers, noble construction, and obsessive finishing. Built to age beautifully—not expire.'
}

const values = [
  {
    title: 'Timeless Design',
    body: 'Shapes and proportions that outlast trends. Elegant today, elegant in ten years.',
    icon: 'clock'
  },
  {
    title: 'Honest Materials',
    body: 'Full-grain leather, natural cork, metal shanks, leather outsoles—no shortcuts.',
    icon: 'leaf'
  },
  {
    title: 'Precision Craft',
    body: 'Tight tolerances, hand burnishing, and finishing that passes the white-glove test.',
    icon: 'compass'
  }
]

const steps = [
  { n: '01', title: 'Pattern & Lasting',    body: 'We start at the last. Fit is refined in millimeters, pattern pieces are balanced for elegant lines and minimal stress.' },
  { n: '02', title: 'Cut & Stitch',         body: 'Full-grain uppers are cut with grain direction in mind. Seams are taped, stitched tight, then edge-tinted.' },
  { n: '03', title: 'Welting & Build',      body: 'Goodyear welt or Blake—selected per model. Cork mid-layer, steel shank, stacked leather heel.' },
  { n: '04', title: 'Finish & Burnish',     body: 'Edges are dyed and waxed, uppers are cream-finished and buffed by hand for depth and character.' }
]

const materials = [
  'Full-grain calf', 'Vegetable-tanned lining', 'Goodyear welt', 'Leather outsole',
  'Cork mid-layer', 'Steel shank', 'Bee-waxed threads', 'Metal eyelets'
]

// Luxe palette
const COLORS = {
  bg: '#0b0b0b',
  panel: '#101010',
  gold: '#d6bf8e',
  goldSoft: '#bfa36e',
  text: '#e7e2d6',
  textDim: '#b8b3a6'
}
</script>

<template>
  <div class="min-h-screen">
    <!-- HERO (subtle, elegant) -->
    <section
      class="relative overflow-hidden rounded-2xl mx-auto max-w-7xl mt-6"
      :style="{ backgroundColor: COLORS.bg, minHeight: 'clamp(420px, 50svh, 640px)' }"
    >
      <!-- light & grain -->
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

      <div class="relative mx-auto h-full w-full max-w-6xl px-6 md:px-10 lg:px-14 py-12 md:py-16">
        <div
          v-motion
          :initial="{ opacity: 0, y: 14 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 0.5 } }"
          class="max-w-3xl"
        >
          <div class="mb-3 text-[11px] tracking-[0.28em] uppercase" :style="{ color: COLORS.goldSoft }">
            About Us
          </div>
          <h1 class="font-semibold leading-[1.03] text-[30px] md:text-[42px] lg:text-[50px]"
              :style="{ color: COLORS.text, fontFamily: 'ui-serif, Georgia, Cambria, Times New Roman, Times, serif' }">
            {{ hero.title }}
          </h1>
          <p class="mt-4 max-w-2xl text-[14px] md:text-[15px] leading-relaxed" :style="{ color: COLORS.textDim }">
            {{ hero.subtitle }}
          </p>
          <RouterLink
            to="/shop"
            class="mt-6 inline-flex items-center rounded-md px-5 py-2.5 text-sm font-semibold transition
                   shadow-[0_8px_22px_rgba(0,0,0,.45)]
                   hover:shadow-[0_12px_28px_rgba(0,0,0,.6)]
                   ring-1 ring-transparent hover:ring-[rgba(214,191,142,0.35)]"
            :style="{ backgroundColor: COLORS.gold, color: '#161616' }"
          >
            Explore the Collection
          </RouterLink>
        </div>
      </div>

      <!-- hairlines -->
      <div class="absolute inset-x-0 top-0 h-px opacity-20" :style="{ background: COLORS.goldSoft }"></div>
      <div class="absolute inset-x-0 bottom-0 h-px opacity-15" :style="{ background: COLORS.goldSoft }"></div>
    </section>

    <!-- STORY -->
    <section class="mx-auto w-full max-w-7xl px-6 py-12 md:py-16">
      <div class="grid items-center gap-8 md:grid-cols-2">
        <div
          v-motion
          :initial="{ opacity: 0, y: 12 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: .45 } }"
        >
          <SectionHeader title="Our Story" link-text="Discover All" link-to="/shop" />
          <h3 class="mt-4 text-[22px] md:text-[28px] font-semibold"
              :style="{ color: COLORS.text, fontFamily: 'ui-serif, Georgia, Cambria, Times New Roman, Times, serif' }">
            From a small workshop to a standard of elegance
          </h3>
          <p class="mt-3 text-[14px] leading-relaxed" :style="{ color: COLORS.textDim }">
            Gotham began with a simple brief: build shoes we’d be proud to wear for decades. We chose
            traditional construction, sourced honest materials, and sweated the details—because the details
            are what you live with.
          </p>
          <p class="mt-3 text-[14px] leading-relaxed" :style="{ color: COLORS.textDim }">
            Today, we still prototype by hand, still reject more pairs than we keep, and still finish
            every shoe with a final human inspection. That’s the promise.
          </p>
        </div>

        <!-- Placeholder brand image -->
        <div
          v-motion
          :initial="{ opacity: 0, y: 12 }"
          :enter="{ opacity: 1, y: 0, transition: { delay: .1, duration: .45 } }"
          class="relative overflow-hidden rounded-2xl border"
          :style="{ borderColor: 'rgba(191,163,110,0.25)', background: COLORS.panel }"
        >
          <img
            src="https://images.unsplash.com/photo-1512034400317-de97d7d6c3ed?q=80&w=1600&auto=format&fit=crop"
            alt="Workshop"
            class="h-full w-full object-cover"
            loading="lazy"
            decoding="async"
          />
          <div class="pointer-events-none absolute inset-0"
               :style="{ background: 'linear-gradient(to top, rgba(0,0,0,.35), transparent 40%)' }"></div>
        </div>
      </div>
    </section>

    <!-- VALUES -->
    <section class="mx-auto w-full max-w-7xl px-6 py-8">
      <SectionHeader title="Values" link-text="Read More" link-to="/faq" />
      <div class="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <article
          v-for="(v,i) in values" :key="v.title"
          v-motion
          :initial="{ opacity: 0, y: 10 }"
          :enter="{ opacity: 1, y: 0, transition: { delay: i*0.06, duration: .35 } }"
          class="rounded-2xl border p-5"
          :style="{ borderColor: 'rgba(191,163,110,0.25)', background: '#101010' }"
        >
          <div class="mb-3 h-6 w-6" :style="{ color: COLORS.gold }">
            <!-- tiny icons -->
            <svg v-if="v.icon==='clock'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" class="h-6 w-6">
              <circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/>
            </svg>
            <svg v-else-if="v.icon==='leaf'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" class="h-6 w-6">
              <path d="M11 3C7 3 3 7 3 11c0 6 5 10 9 10 7 0 9-8 9-12 0-4-4-6-10-6z"/><path d="M12 22C12 12 12 12 12 2"/>
            </svg>
            <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" class="h-6 w-6">
              <circle cx="12" cy="12" r="10"/><path d="M19 12H5M12 5v14"/>
            </svg>
          </div>
          <h4 class="text-[16px] font-semibold" :style="{ color: COLORS.text }">{{ v.title }}</h4>
          <p class="mt-2 text-[13.5px] leading-relaxed" :style="{ color: COLORS.textDim }">{{ v.body }}</p>
        </article>
      </div>
    </section>

    <!-- CRAFT PROCESS -->
    <section class="mx-auto w-full max-w-7xl px-6 py-10">
      <SectionHeader title="Craftsmanship" link-text="See the Collection" link-to="/shop" />
      <div class="relative mt-6 grid gap-6 md:grid-cols-2">
        <div
          v-for="(s,i) in steps" :key="s.n"
          v-motion
          :initial="{ opacity: 0, y: 12 }"
          :enter="{ opacity: 1, y: 0, transition: { delay: i*0.06, duration: .4 } }"
          class="relative rounded-2xl border p-5"
          :style="{ borderColor: 'rgba(191,163,110,0.25)', background: '#101010' }"
        >
          <div class="mb-2 text-[11px] tracking-[0.28em] uppercase" :style="{ color: COLORS.goldSoft }">
            {{ s.n }}
          </div>
          <h5 class="text-[16px] font-semibold" :style="{ color: COLORS.text }">{{ s.title }}</h5>
          <p class="mt-2 text-[13.5px] leading-relaxed" :style="{ color: COLORS.textDim }">{{ s.body }}</p>
          <div class="absolute inset-x-0 bottom-0 h-px opacity-15" :style="{ background: COLORS.goldSoft }"></div>
        </div>
      </div>
    </section>

    <!-- MATERIALS CHIPS -->
    <section class="mx-auto w-full max-w-7xl px-6 py-6">
      <SectionHeader title="Materials" link-text="Why it matters" link-to="/about" />
      <div class="mt-4 flex flex-wrap gap-2">
        <span
          v-for="m in materials" :key="m"
          class="rounded-md px-3 py-1.5 text-sm"
          :style="{
            color: '#e7e2d6',
            border: '1px solid rgba(191,163,110,0.25)',
            background: '#0f0f0f'
          }"
        >{{ m }}</span>
      </div>
    </section>

    <!-- CTA STRIP -->
    <section class="mx-auto w-full max-w-7xl px-6 py-12">
      <div class="relative overflow-hidden rounded-2xl border p-6 md:p-8 text-center"
           :style="{ borderColor: 'rgba(191,163,110,0.25)', background: '#0f0f0f' }">
        <div class="pointer-events-none absolute inset-0"
             :style="{ background: 'radial-gradient(800px 320px at 50% 120%, rgba(214,191,142,0.12), transparent 70%)' }"></div>
        <h4 class="text-[22px] md:text-[26px] font-semibold"
            :style="{ color: COLORS.text, fontFamily: 'ui-serif, Georgia, Cambria, Times New Roman, Times, serif' }">
          Step into elegance—every day.
        </h4>
        <p class="mt-2 text-[14px]" :style="{ color: COLORS.textDim }">
          Explore core styles, seasonal colors, and limited runs.
        </p>
        <RouterLink
          to="/shop"
          class="mt-5 inline-flex items-center rounded-md px-5 py-2.5 text-sm font-semibold transition
                 shadow-[0_8px_22px_rgba(0,0,0,.45)] hover:shadow-[0_12px_28px_rgba(0,0,0,.6)]"
          :style="{ background: COLORS.gold, color: '#161616' }"
        >
          Shop Now
        </RouterLink>
      </div>
    </section>
  </div>
</template>
