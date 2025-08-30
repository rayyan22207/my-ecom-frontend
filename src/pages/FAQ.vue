<script setup>
import { ref, computed } from 'vue'
import SectionHeader from '../components/SectionHeader.vue'

// Palette (kept local for clarity)
const COLORS = {
  bg: '#0b0b0b',
  panel: '#101010',
  gold: '#d6bf8e',
  goldSoft: '#bfa36e',
  text: '#e7e2d6',
  textDim: '#b8b3a6'
}

// FAQ content (swap with real copy later)
const ALL_FAQS = [
  { id: 1, cat: 'Orders',   q: 'Where is my order?', a: 'Most EU orders ship within 24–48h and arrive in 3–7 business days. You\'ll receive tracking via email as soon as it leaves our warehouse.' },
  { id: 2, cat: 'Sizing',   q: 'How do I pick my size?', a: 'Our lasts run true-to-size. If you’re between sizes, go down for loafers and up for boots. See our size guide for exact mm lengths.' },
  { id: 3, cat: 'Returns',  q: 'What is your return policy?', a: '30 days, unworn and uncreased. Free return labels in the EU; outside EU you\'ll see the best-rate carrier at checkout.' },
  { id: 4, cat: 'Care',     q: 'How do I care for the leather?', a: 'Brush after wear, condition every 6–8 weeks, and use trees. For deep shine, cream then wax, buffing between thin coats.' },
  { id: 5, cat: 'Warranty', q: 'Do you offer a warranty?', a: '1-year manufacturing warranty. Outsoles and wear & tear aren’t covered, but we can help arrange resoles with our repair partners.' },
  { id: 6, cat: 'Shipping', q: 'Do you ship internationally?', a: 'Yes. Duties are shown at checkout for transparency. Delivery times vary by region—most arrive in 5–10 business days.' },
  { id: 7, cat: 'Materials',q: 'What leathers do you use?', a: 'Full-grain calf for uppers, veg-tanned lining, leather outsoles, cork mid-layer, and a steel shank—no cardboard fillers.' },
  { id: 8, cat: 'Orders',   q: 'Can I change or cancel an order?', a: 'If it hasn’t shipped, yes—contact support ASAP with your order number and we’ll try to intercept it.' },
]

// UI state
const search = ref('')
const cat = ref('All')
const openIds = ref(new Set()) // multi-open accordion

const CATS = computed(() => ['All', ...Array.from(new Set(ALL_FAQS.map(f => f.cat)))])

const filtered = computed(() => {
  let arr = ALL_FAQS
  if (cat.value !== 'All') arr = arr.filter(f => f.cat === cat.value)
  if (search.value.trim()) {
    const s = search.value.toLowerCase()
    arr = arr.filter(f => f.q.toLowerCase().includes(s) || f.a.toLowerCase().includes(s))
  }
  return arr
})

const isOpen = (id) => openIds.value.has(id)
const toggle = (id) => {
  const next = new Set(openIds.value)
  next.has(id) ? next.delete(id) : next.add(id)
  openIds.value = next
}
const expandAll = () => { openIds.value = new Set(filtered.value.map(f => f.id)) }
const collapseAll = () => { openIds.value = new Set() }
</script>

<template>
  <div class="mx-auto w-full max-w-7xl px-6 py-8 space-y-8">
    <SectionHeader title="FAQ" link-text="Still need help?" link-to="/contact" />

    <!-- Controls -->
    <div class="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
      <!-- search -->
      <div class="flex items-center gap-2">
        <div class="relative">
          <input
            v-model="search"
            type="text"
            placeholder="Search answers"
            class="rounded-md border bg-transparent px-3 py-2 text-sm outline-none transition w-72"
            :style="{
              borderColor:'rgba(191,163,110,0.25)',
              color:'#e7e2d6',
              caretColor:'#d6bf8e',
              boxShadow:'inset 0 0 0 9999px rgba(255,255,255,0.02)'
            }"
          />
          <svg class="pointer-events-none absolute right-2 top-2.5 h-4 w-4"
               viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"
               stroke-linecap="round" stroke-linejoin="round"
               :style="{ color: 'rgba(232,226,214,0.7)' }">
            <circle cx="11" cy="11" r="7"></circle><path d="M21 21l-4.3-4.3"></path>
          </svg>
        </div>
      </div>

      <!-- chips + bulk actions -->
      <div class="flex flex-wrap items-center gap-2">
        <button
          v-for="c in CATS" :key="c"
          class="rounded-md px-3 py-1.5 text-sm transition"
          :style="{
            color: cat===c ? '#161616' : '#e7e2d6',
            background: cat===c ? '#d6bf8e' : 'transparent',
            border: '1px solid rgba(191,163,110,0.25)'
          }"
          @click="cat = c"
        >{{ c }}</button>

        <span class="ml-2 hidden h-4 w-px md:inline-block" :style="{ background:'rgba(191,163,110,0.25)' }"></span>

        <button
          class="rounded-md px-3 py-1.5 text-sm transition"
          :style="{ border:'1px solid rgba(191,163,110,0.25)', color:'#e7e2d6' }"
          @click="expandAll"
        >Expand all</button>
        <button
          class="rounded-md px-3 py-1.5 text-sm transition"
          :style="{ border:'1px solid rgba(191,163,110,0.25)', color:'#e7e2d6' }"
          @click="collapseAll"
        >Collapse all</button>
      </div>
    </div>

    <!-- FAQ list -->
    <div class="space-y-3">
      <article
        v-for="(f, i) in filtered" :key="f.id"
        v-motion
        :initial="{ opacity: 0, y: 10 }"
        :enter="{ opacity: 1, y: 0, transition: { delay: i * 0.04, duration: .3 } }"
        class="overflow-hidden rounded-2xl border"
        :style="{ borderColor:'rgba(191,163,110,0.25)', background: COLORS.panel }"
      >
        <!-- header / button -->
        <button
          class="flex w-full items-center justify-between gap-4 px-4 py-4 text-left"
          :aria-expanded="isOpen(f.id)"
          :aria-controls="`faq-panel-${f.id}`"
          @click="toggle(f.id)"
          @keyup.enter.prevent="toggle(f.id)"
          @keyup.space.prevent="toggle(f.id)"
          :style="{ color: COLORS.text }"
        >
          <div class="flex items-center gap-3">
            <span class="text-[11px] uppercase tracking-[0.28em]" :style="{ color: COLORS.goldSoft }">{{ f.cat }}</span>
            <h3 class="text-[15px] md:text-[16px] font-semibold">{{ f.q }}</h3>
          </div>

          <!-- chevron -->
          <svg
            class="h-5 w-5 flex-none transition-transform duration-200"
            :class="isOpen(f.id) ? 'rotate-180' : ''"
            viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"
            stroke-linecap="round" stroke-linejoin="round"
            :style="{ color: COLORS.gold }"
          >
            <path d="M6 9l6 6 6-6"/>
          </svg>
        </button>

        <!-- divider -->
        <div class="h-px" :style="{ background:'rgba(191,163,110,0.18)' }"></div>

        <!-- panel -->
        <transition
          enter-active-class="duration-200 ease-out"
          enter-from-class="opacity-0 -translate-y-1"
          enter-to-class="opacity-100 translate-y-0"
          leave-active-class="duration-150 ease-in"
          leave-from-class="opacity-100 translate-y-0"
          leave-to-class="opacity-0 -translate-y-1"
        >
          <div
            v-show="isOpen(f.id)"
            :id="`faq-panel-${f.id}`"
            class="px-4 pb-4 text-[14px] leading-relaxed"
            :style="{ color: COLORS.textDim }"
          >
            {{ f.a }}
          </div>
        </transition>
      </article>
    </div>

    <!-- CTA -->
    <section class="pt-6">
      <div class="relative overflow-hidden rounded-2xl border p-6 text-center"
           :style="{ borderColor:'rgba(191,163,110,0.25)', background:'#0f0f0f' }">
        <div class="pointer-events-none absolute inset-0"
             :style="{ background:'radial-gradient(700px 260px at 50% 120%, rgba(214,191,142,0.12), transparent 70%)' }"></div>
        <h4 class="text-[18px] md:text-[20px] font-semibold" :style="{ color: COLORS.text }">
          Didn’t find what you were looking for?
        </h4>
        <p class="mt-1 text-[14px]" :style="{ color: COLORS.textDim }">We usually reply within one business day.</p>
        <RouterLink
          to="/contact"
          class="mt-4 inline-flex items-center rounded-md px-5 py-2.5 text-sm font-semibold transition
                 shadow-[0_8px_22px_rgba(0,0,0,.45)] hover:shadow-[0_12px_28px_rgba(0,0,0,.6)]"
          :style="{ background: COLORS.gold, color: '#161616' }"
        >
          Contact Support
        </RouterLink>
      </div>
    </section>
  </div>
</template>
