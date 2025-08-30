<script setup>
import { ref, computed, watch } from 'vue'
import SectionHeader from '../components/SectionHeader.vue'
import ShoeCard from '../components/ShoeCard.vue'

// --- Mock products (replace with API later) ---
const ALL = [
  { id:1, title:'Oxford Classic',  price:249, img:'https://picsum.photos/seed/ox/1200/900',  badge:'New',  cat:'Oxford',  colors:['Black','Brown'] },
  { id:2, title:'Loafer Penny',   price:199, img:'https://picsum.photos/seed/lf/1200/900',  badge:'New',  cat:'Loafer',  colors:['Black'] },
  { id:3, title:'Derby Plain',    price:229, img:'https://picsum.photos/seed/db/1200/900',              cat:'Derby',   colors:['Brown'] },
  { id:4, title:'Monk Strap',     price:269, img:'https://picsum.photos/seed/mk/1200/900',              cat:'Monk',    colors:['Black','Tan'] },
  { id:5, title:'Chelsea Boot',   price:289, img:'https://picsum.photos/seed/ch/1200/900',              cat:'Boots',   colors:['Black'] },
  { id:6, title:'Wholecut',       price:319, img:'https://picsum.photos/seed/wc/1200/900',              cat:'Oxford',  colors:['Oxblood'] },
  { id:7, title:'Tassel Loafer',  price:239, img:'https://picsum.photos/seed/tl/1200/900',              cat:'Loafer',  colors:['Brown'] },
  { id:8, title:'Wingtip Brogue', price:279, img:'https://picsum.photos/seed/bg/1200/900',              cat:'Derby',   colors:['Tan'] },
  { id:9, title:'Cap-Toe Oxford', price:259, img:'https://picsum.photos/seed/ct/1200/900',              cat:'Oxford',  colors:['Black'] },
]

// --- UI State ---
const showFilters = ref(false)
const q = ref('')                       // search
const category = ref('All')
const color = ref('All')
const min = ref(0)
const max = ref(500)
const sort = ref('featured')             // featured | price-asc | price-desc | name-asc | name-desc
const page = ref(1)
const pageSize = ref(9)

// --- Options ---
const CATS = ['All','Oxford','Derby','Loafer','Monk','Boots']
const COLORS = ['All','Black','Brown','Tan','Oxblood']

// --- Filtering & sorting ---
const filtered = computed(() => {
  let arr = ALL.slice()

  // search
  if (q.value.trim()) {
    const s = q.value.toLowerCase()
    arr = arr.filter(p => p.title.toLowerCase().includes(s))
  }
  // category
  if (category.value !== 'All') {
    arr = arr.filter(p => p.cat === category.value)
  }
  // color
  if (color.value !== 'All') {
    arr = arr.filter(p => (p.colors || []).includes(color.value))
  }
  // price
  arr = arr.filter(p => p.price >= min.value && p.price <= max.value)

  // sort
  switch (sort.value) {
    case 'price-asc':  arr.sort((a,b)=>a.price-b.price); break
    case 'price-desc': arr.sort((a,b)=>b.price-a.price); break
    case 'name-asc':   arr.sort((a,b)=>a.title.localeCompare(b.title)); break
    case 'name-desc':  arr.sort((a,b)=>b.title.localeCompare(a.title)); break
    default: break // featured = no-op for now
  }
  return arr
})

// --- Pagination ---
const total = computed(()=> filtered.value.length)
const pages = computed(()=> Math.max(1, Math.ceil(total.value / pageSize.value)))
const items = computed(()=>{
  const start = (page.value - 1) * pageSize.value
  return filtered.value.slice(start, start + pageSize.value)
})

// reset page when filters change
watch([q,category,color,min,max,sort], ()=> { page.value = 1 })
</script>
<style scoped>
/* Force dark dropdown + options where supported */
select {
  background-color: #0f0f0f;
  color: #e7e2d6;
}
select option {
  background-color: #0f0f0f;
  color: #e7e2d6;
}
/* Improve focus without halo blowout */
select:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(214,191,142,.35);
  border-color: rgba(214,191,142,.55);
}
</style>

<template>
  <div class="mx-auto w-full max-w-7xl px-6 py-8 space-y-8">
    <SectionHeader title="Shop" link-text="Reset Filters" link-to="/shop" />

    <!-- Toolbar -->
    <div class="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
      <div class="flex items-center gap-2">
        <button
          class="inline-flex items-center rounded-md px-3 py-2 text-sm transition md:hidden"
          :style="{ border:'1px solid rgba(191,163,110,0.25)', color:'#e7e2d6' }"
          @click="showFilters = !showFilters"
        >
          Filters
          <svg class="ml-2 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
            <path d="M22 3H2l7 9v7l6 2v-9l7-9z"></path>
          </svg>
        </button>
        <div class="hidden md:flex items-center gap-2">
          <input
            v-model="q"
            type="text" placeholder="Search shoes"
            class="rounded-md border bg-transparent px-3 py-2 text-sm outline-none transition"
            :style="{ borderColor:'rgba(191,163,110,0.25)', color:'#e7e2d6', caretColor:'#d6bf8e', boxShadow:'inset 0 0 0 9999px rgba(255,255,255,0.02)' }"
          />
        </div>
      </div>

      <!-- Sort -->
<div class="flex items-center gap-2">
  <label class="text-xs" :style="{ color:'#b8b3a6' }">Sort</label>

  <!-- wrapper so we can inject a chevron -->
  <div class="relative">
    <select
      v-model="sort"
      class="appearance-none rounded-md border px-2 py-1.5 pr-8 text-sm outline-none transition
             focus:ring-2"
      :style="{
        background: '#0f0f0f',                // dark bg (popup too on most engines)
        color: '#e7e2d6',                     // light text
        borderColor: 'rgba(191,163,110,0.25)',// goldSoft border
        boxShadow: 'inset 0 0 0 9999px rgba(255,255,255,0.02)', // faint tint
        caretColor: '#d6bf8e'                 // gold caret
      }"
    >
      <option value="featured">Featured</option>
      <option value="price-asc">Price ↑</option>
      <option value="price-desc">Price ↓</option>
      <option value="name-asc">Name A–Z</option>
      <option value="name-desc">Name Z–A</option>
    </select>

    <!-- chevron -->
    <svg
      class="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4"
      viewBox="0 0 24 24" fill="none"
      stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"
      :style="{ color: 'rgba(232,226,214,0.7)' }"
    >
      <path d="M6 9l6 6 6-6"/>
    </svg>
  </div>

  <span class="ml-3 text-xs" :style="{ color:'#bfa36e' }">{{ filtered.length }} items</span>
</div>

    </div>

    <!-- Body: Sidebar + Grid -->
    <div class="grid grid-cols-1 gap-6 md:grid-cols-[260px_1fr]">
      <!-- Sidebar (desktop) / Drawer (mobile) -->
      <aside
        class="md:sticky md:top-20 space-y-6 rounded-2xl border p-4"
        :class="{ 'hidden md:block': !showFilters }"
        :style="{ borderColor:'rgba(191,163,110,0.25)', background:'#101010' }"
      >
        <!-- Search (mobile only) -->
        <div class="md:hidden">
          <input
            v-model="q"
            type="text" placeholder="Search shoes"
            class="w-full rounded-md border bg-transparent px-3 py-2 text-sm outline-none"
            :style="{ borderColor:'rgba(191,163,110,0.25)', color:'#e7e2d6', caretColor:'#d6bf8e', boxShadow:'inset 0 0 0 9999px rgba(255,255,255,0.02)' }"
          />
        </div>

        <!-- Category -->
        <div>
          <div class="mb-2 text-[11px] uppercase tracking-[0.28em]" :style="{ color:'#b8b3a6' }">Category</div>
          <div class="space-y-1">
            <button
              v-for="c in CATS" :key="c"
              class="w-full rounded-md px-3 py-2 text-left text-sm transition"
              :style="{
                color: category===c ? '#161616' : '#e7e2d6',
                background: category===c ? '#d6bf8e' : 'transparent'
              }"
              @click="category = c"
            >{{ c }}</button>
          </div>
        </div>

        <!-- Color -->
        <div>
          <div class="mb-2 text-[11px] uppercase tracking-[0.28em]" :style="{ color:'#b8b3a6' }">Color</div>
          <div class="flex flex-wrap gap-2">
            <button
              v-for="co in COLORS" :key="co"
              class="rounded-md px-3 py-1.5 text-sm transition"
              :style="{
                color: color===co ? '#161616' : '#e7e2d6',
                background: color===co ? '#d6bf8e' : 'transparent',
                border: '1px solid rgba(191,163,110,0.25)'
              }"
              @click="color = co"
            >{{ co }}</button>
          </div>
        </div>

        <!-- Price -->
        <div>
          <div class="mb-2 text-[11px] uppercase tracking-[0.28em]" :style="{ color:'#b8b3a6' }">Price</div>
          <div class="flex items-center gap-2">
            <input v-model.number="min" type="number" min="0" class="w-20 rounded-md border bg-transparent px-2 py-1 text-sm"
                   :style="{ borderColor:'rgba(191,163,110,0.25)', color:'#e7e2d6' }" />
            <span :style="{ color:'#b8b3a6' }">—</span>
            <input v-model.number="max" type="number" min="0" class="w-24 rounded-md border bg-transparent px-2 py-1 text-sm"
                   :style="{ borderColor:'rgba(191,163,110,0.25)', color:'#e7e2d6' }" />
          </div>
        </div>
      </aside>

      <!-- Grid -->
      <div>
        <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <ShoeCard
            v-for="(p, i) in items"
            :key="p.id"
            :product="p"
            v-motion
            :initial="{ opacity: 0, y: 12 }"
            :enter="{ opacity: 1, y: 0, transition: { delay: i * 0.05, duration: 0.35 } }"
          />
        </div>

        <!-- Pagination -->
        <div class="mt-6 flex items-center justify-center gap-2">
          <button
            class="rounded-md px-3 py-2 text-sm transition"
            :disabled="page===1"
            :style="{ color:'#e7e2d6', border:'1px solid rgba(191,163,110,0.25)', opacity: page===1 ? .4 : 1 }"
            @click="page = Math.max(1, page-1)"
          >
            Prev
          </button>
          <span class="text-xs" :style="{ color:'#bfa36e' }">Page {{ page }} / {{ pages }}</span>
          <button
            class="rounded-md px-3 py-2 text-sm transition"
            :disabled="page===pages"
            :style="{ color:'#e7e2d6', border:'1px solid rgba(191,163,110,0.25)', opacity: page===pages ? .4 : 1 }"
            @click="page = Math.min(pages, page+1)"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
