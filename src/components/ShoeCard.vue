<script setup>
import { RouterLink } from 'vue-router'

const props = defineProps({
  product: {
    type: Object,
    required: true,
    // { id, title, price, img, badge?: 'New', href?: '/product/1' }
  },
  currency: { type: String, default: 'EUR' },
})

const COLORS = {
  panel: '#121212',
  gold:  '#d6bf8e',
  goldSoft: '#bfa36e',
  text:  '#e7e2d6',
  textDim:'#b8b3a6'
}

const emit = defineEmits(['add'])
const fmt = (n, c) => new Intl.NumberFormat('en-GB', { style:'currency', currency: c }).format(n)
</script>

<template>
  <article
    class="group relative flex flex-col overflow-hidden rounded-2xl border transition-shadow duration-500 focus-within:ring-2"
    :style="{
      background: COLORS.panel,
      borderColor: 'rgba(191,163,110,0.25)'
    }"
  >
    <!-- Media -->
    <div class="relative aspect-[4/3] overflow-hidden">
      <RouterLink v-if="product.href" :to="product.href" class="absolute inset-0 z-[2]" aria-label="View product"></RouterLink>

      <picture>
        <!-- If your image service supports it, these query params help; else they’re harmless -->
        <source :srcset="`${product.img}?w=1200&format=webp 1200w, ${product.img}?w=800&format=webp 800w, ${product.img}?w=600&format=webp 600w`" type="image/webp" />
        <img
          :src="product.img"
          :alt="product.title"
          loading="lazy"
          decoding="async"
          class="h-full w-full object-cover transition-transform duration-600 ease-[cubic-bezier(.2,.65,.25,1)] group-hover:scale-[1.06]"
        />
      </picture>

      <!-- Soft top vignette for readability -->
      <div class="pointer-events-none absolute inset-0"
           :style="{ background: 'linear-gradient(to bottom, rgba(0,0,0,.25), transparent 30%)' }"></div>

      <!-- Badge -->
      <span
        v-if="product.badge"
        class="absolute left-3 top-3 z-[3] rounded-full px-3 py-1 text-[11px] font-medium tracking-wide backdrop-blur-[2px]"
        :style="{
          background: 'rgba(11,11,11,0.55)',
          border: `1px solid ${COLORS.goldSoft}`,
          color: COLORS.gold
        }"
      >
        {{ product.badge }}
      </span>

      <!-- Subtle gold edge on hover -->
      <div
        class="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        :style="{ boxShadow: 'inset 0 0 0 1px rgba(214,191,142,.25)' }"
      ></div>
    </div>

    <!-- Info -->
    <div class="relative z-[1] flex flex-col gap-1.5 p-4">
      <h4
        class="truncate font-medium"
        :style="{ color: COLORS.text, fontFamily: 'ui-sans-serif, system-ui' }"
        :title="product.title"
      >
        {{ product.title }}
      </h4>

      <div class="flex items-center justify-between">
        <span
  class="price text-sm font-semibold transition-colors duration-300
         text-[#b8b3a6] group-hover:text-black group-focus-within:text-black"
>
  {{ fmt(product.price, currency) }}
</span>

        <!-- Optional quick view icon reserved space (keeps alignment future-proof) -->
        <span class="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-xs"
              :style="{ color: COLORS.goldSoft }">
          View →
        </span>
      </div>
    </div>

    <!-- Slide-up CTA -->
    <button
      type="button"
      class="absolute inset-x-3 bottom-3 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100
             transition-all duration-300 rounded-md px-3 py-2 text-sm font-semibold focus:outline-none focus-visible:ring-2"
      :style="{
        background: COLORS.gold,
        color: '#161616',
        boxShadow: '0 10px 28px rgba(0,0,0,.45)'
      }"
      @click.stop="emit('add', product)"
      aria-label="Add to Cart"
    >
      Add to Cart
    </button>

    <!-- Premium glow on hover -->
    <div
      class="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      :style="{ boxShadow: '0 0 24px rgba(214,191,142,.18), 0 10px 22px rgba(0,0,0,.55)' }"
    ></div>
  </article>
</template>
