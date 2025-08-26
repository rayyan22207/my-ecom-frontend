<script setup>
const props = defineProps({
  title: { type: String, required: true },
  linkText: { type: String, default: 'Discover All' },
  linkTo: { type: String, default: '/shop' },
})
</script>

<template>
  <div class="flex items-center justify-between px-1">
    <h3 class="text-xs tracking-[0.25em] text-gray-300 uppercase">{{ title }}</h3>
    <RouterLink :to="linkTo" class="text-sm text-gray-300 hover:text-white inline-flex items-center gap-2">
      {{ linkText }}
      <svg viewBox="0 0 24 24" class="h-4 w-4" fill="currentColor"><path d="M8 5l7 7-7 7"/></svg>
    </RouterLink>
  </div>
</template>
