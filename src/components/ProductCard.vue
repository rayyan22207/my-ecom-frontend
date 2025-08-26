<script setup>
const props = defineProps({
  product: { type: Object, required: true },
})
</script>

<template>
  <div
    :class="[
      'rounded-2xl border border-bat-grey/50 bg-bat-black/60 shadow-[0_10px_30px_rgba(0,0,0,.35)] overflow-hidden',
      product.big ? 'lg:col-span-2 lg:row-span-2' : ''
    ]"
  >
    <div class="aspect-[4/3] w-full bg-bat-dark/70">
      <img :src="product.img" :alt="product.title" class="h-full w-full object-cover object-center" />
    </div>

    <div class="p-4">
      <div class="flex items-start justify-between">
        <h3 class="text-white font-semibold">{{ product.title }}</h3>
        <span v-if="product.price" class="text-sm text-bat-lightgrey/80">${{ product.price }}</span>
      </div>

      <button
        v-if="product.price"
        class="mt-3 inline-flex items-center rounded-xl bg-bat-pink px-4 py-2 text-sm font-semibold text-bat-black
               shadow-[0_8px_24px_rgba(255,46,136,.35)] hover:brightness-110 transition"
      >
        Add to cart
      </button>
    </div>
  </div>
</template>
