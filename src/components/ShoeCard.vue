<script setup>
const props = defineProps({
  product: {
    type: Object,
    required: true,
    // { id, title, price, img, badge?: 'New' }
  }
})

const COLORS = {
  bg: '#0b0b0b',
  panel: '#121212',
  gold: '#d6bf8e',
  goldSoft: '#bfa36e',
  text: '#e7e2d6',
  textDim: '#b8b3a6'
}
</script>

<template>
  <div
    class="group relative flex flex-col overflow-hidden rounded-2xl border transition"
    :style="{
      background: COLORS.panel,
      borderColor: 'rgba(191,163,110,0.25)'
    }"
  >
    <!-- Image -->
    <div class="relative aspect-[4/3] overflow-hidden">
      <img
        :src="product.img"
        :alt="product.title"
        class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
      />

      <!-- Badge -->
      <span
        v-if="product.badge"
        class="absolute left-3 top-3 rounded-full px-3 py-1 text-[11px] font-medium tracking-wide"
        :style="{
          background: 'rgba(11,11,11,0.7)',
          border: `1px solid ${COLORS.goldSoft}`,
          color: COLORS.gold
        }"
      >
        {{ product.badge }}
      </span>
    </div>

    <!-- Info -->
    <div class="flex flex-col gap-2 p-4">
      <h4
        class="truncate font-medium transition-colors"
        :style="{ color: COLORS.text }"
      >
        {{ product.title }}
      </h4>

      <span
        class="text-sm font-semibold transition-colors"
        :style="{ color: COLORS.textDim }"
      >
        € {{ product.price }}
      </span>
    </div>

    <!-- Glow effect on hover -->
    <div
      class="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      :style="{
        boxShadow: '0 0 25px rgba(214,191,142,.25), 0 8px 20px rgba(0,0,0,.6)'
      }"
    ></div>
  </div>
</template>
