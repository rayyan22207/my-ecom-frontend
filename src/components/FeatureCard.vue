<script setup>
const props = defineProps({
  icon: { type: String, required: true }, // "bolt" | "heart" | "shield"
  title: { type: String, required: true },
})
</script>

<template>
  <div class="rounded-2xl border border-bat-grey/50 bg-bat-black/60 backdrop-blur px-4 py-5 shadow-[0_10px_30px_rgba(0,0,0,.35)]">
    <div class="flex items-start gap-3">
      <div class="h-9 w-9 rounded-xl bg-bat-grey/40 flex items-center justify-center">
        <svg v-if="icon==='bolt'" viewBox="0 0 24 24" class="h-5 w-5 text-bat-pink" fill="currentColor"><path d="M13 2L3 14h6l-1 8 11-13h-6l1-7z"/></svg>
        <svg v-else-if="icon==='heart'" viewBox="0 0 24 24" class="h-5 w-5 text-bat-pink" fill="currentColor"><path d="M12 21s-6.7-4.6-9.3-7.2A5.6 5.6 0 0 1 12 5.6 5.6 5.6 0 0 1 21.3 13.8C18.7 16.4 12 21 12 21z"/></svg>
        <svg v-else viewBox="0 0 24 24" class="h-5 w-5 text-bat-pink" fill="currentColor"><path d="M12 2l7 4v6c0 5-3.5 9-7 10-3.5-1-7-5-7-10V6l7-4z"/></svg>
      </div>
      <p class="whitespace-pre-line text-bat-lightgrey leading-tight">
        <span class="text-white font-semibold">{{ title.split('\n')[0] }}</span>
        <br v-if="title.includes('\n')" />
        <span v-if="title.includes('\n')">{{ title.split('\n')[1] }}</span>
      </p>
    </div>
  </div>
</template>
