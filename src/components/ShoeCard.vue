<script setup>
const props = defineProps({
  product: {
    type: Object, required: true,
    // { id, title, price, img, badge?: 'New' }
  }
})
</script>

<template>
  <div class="rounded-2xl overflow-hidden bg-bat-black border border-bat-grey/50">
    <div class="relative aspect-[4/3] bg-bat-dark/60">
      <img :src="product.img" :alt="product.title" class="h-full w-full object-cover">
      <span v-if="product.badge"
        class="absolute left-3 top-3 text-xs tracking-wider text-gray-300">
        {{ product.badge }}
      </span>
    </div>
    <div class="p-4">
      <div class="flex items-start justify-between">
        <h4 class="text-white font-medium">{{ product.title }}</h4>
        <span class="text-gray-300">€ {{ product.price }}</span>
      </div>
    </div>
  </div>
</template>
