<script setup>
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'

// Try to use a Pinia store if you have one; else fallback to local state
let store
try {
  // import { useCart } from '@/stores/cart'
  // store = useCart()
  throw new Error('no-store') // comment this line when you have a real store
} catch {
  store = {
    items: ref([
      { id: 1, title: 'Oxford Classic',  price: 249, img: 'https://picsum.photos/seed/ox/1200/900', variant: 'Black · 42', qty: 1 },
      { id: 2, title: 'Loafer Penny',   price: 199, img: 'https://picsum.photos/seed/lf/1200/900', variant: 'Brown · 41', qty: 2 },
    ])
  }
}

const COLORS = {
  panel: '#101010',
  gold: '#d6bf8e',
  goldSoft: '#bfa36e',
  text: '#e7e2d6',
  textDim: '#b8b3a6'
}
const currency = 'EUR'
const fmt = (n) => new Intl.NumberFormat('en-GB', { style: 'currency', currency }).format(n)

// Promo code (simple demo: GOTHAM10 = 10% off)
const code = ref('')
const codeMsg = ref('')
const discountPct = ref(0)

function applyCode() {
  const val = code.value.trim().toUpperCase()
  if (!val) { codeMsg.value = ''; discountPct.value = 0; return }
  if (val === 'GOTHAM10') { discountPct.value = 10; codeMsg.value = '10% discount applied.' }
  else { discountPct.value = 0; codeMsg.value = 'Code not recognized.' }
}

// Shipping selection (demo)
const shipping = ref('standard') // standard | express
const shippingCost = computed(() => {
  if (subtotal.value >= 400) return 0
  return shipping.value === 'express' ? 19 : 9
})

// Totals
const subtotal = computed(() =>
  store.items.value.reduce((sum, it) => sum + it.price * it.qty, 0)
)
const discount = computed(() => Math.round((subtotal.value * discountPct.value) / 100))
const tax = computed(() => 0) // add VAT rules later if needed
const total = computed(() => Math.max(0, subtotal.value - discount.value) + shippingCost.value + tax.value)

// Item ops
function inc(it) { it.qty = Math.min(10, it.qty + 1) }
function dec(it) { it.qty = Math.max(1, it.qty - 1) }
function setQty(it, val) {
  const n = Number(val)
  if (Number.isFinite(n)) it.qty = Math.min(10, Math.max(1, Math.floor(n)))
}
function removeItem(id) {
  store.items.value = store.items.value.filter(i => i.id !== id)
}
</script>

<template>
  <div class="mx-auto w-full max-w-7xl px-6 py-8 space-y-8">
    <!-- Header -->
    <div class="relative">
      <div class="h-px w-full opacity-20" :style="{ background: COLORS.goldSoft }"></div>
      <div class="flex items-end justify-between py-4">
        <h1
          class="text-[28px] md:text-[34px] font-semibold leading-none"
          :style="{ color: COLORS.text, fontFamily: 'ui-serif, Georgia, Cambria, Times New Roman, Times, serif' }"
        >
          Your Cart
        </h1>
        <RouterLink
          to="/shop"
          class="group inline-flex items-center gap-2 text-sm font-medium px-2 py-1 rounded-md hover:bg-white/5"
          :style="{ color: COLORS.textDim }"
        >
          Continue Shopping
          <svg viewBox="0 0 24 24" class="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
               fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"
               :style="{ color: COLORS.gold }">
            <path d="M5 12h13"/><path d="M12 5l7 7-7 7"/>
          </svg>
        </RouterLink>
      </div>
      <div class="h-px w-full opacity-15" :style="{ background: COLORS.goldSoft }"></div>
    </div>

    <!-- Empty state -->
    <div v-if="store.items.value.length === 0" class="rounded-2xl border p-8 text-center"
         :style="{ borderColor: 'rgba(191,163,110,0.25)', background: COLORS.panel }">
      <p class="text-sm" :style="{ color: COLORS.textDim }">Your cart is empty.</p>
      <RouterLink
        to="/shop"
        class="mt-4 inline-flex items-center rounded-md px-5 py-2.5 text-sm font-semibold transition
               shadow-[0_8px_22px_rgba(0,0,0,.45)] hover:shadow-[0_12px_28px_rgba(0,0,0,.6)]"
        :style="{ background: COLORS.gold, color: '#161616' }"
      >
        Shop New Arrivals
      </RouterLink>
    </div>

    <!-- Cart -->
    <div v-else class="grid gap-6 md:grid-cols-[1fr_360px]">
      <!-- Items -->
      <section class="space-y-3">
        <article
          v-for="(it, i) in store.items.value" :key="it.id"
          class="relative overflow-hidden rounded-2xl border"
          :style="{ borderColor: 'rgba(191,163,110,0.25)', background: COLORS.panel }"
        >
          <div class="grid grid-cols-[110px_1fr] gap-4 p-4 md:grid-cols-[140px_1fr] md:gap-6 md:p-5">
            <!-- image -->
            <div class="relative overflow-hidden rounded-xl border h-[88px] md:h-[110px]"
                 :style="{ borderColor: 'rgba(191,163,110,0.25)', background:'#0e0e0e' }">
              <img :src="it.img" :alt="it.title" class="h-full w-full object-cover" loading="lazy" decoding="async" />
            </div>

            <!-- info -->
            <div class="flex flex-col justify-between">
              <div>
                <h3 class="text-[15px] md:text-[16px] font-semibold" :style="{ color: COLORS.text }">
                  {{ it.title }}
                </h3>
                <p class="mt-0.5 text-xs" :style="{ color: COLORS.textDim }">
                  {{ it.variant || '—' }}
                </p>
              </div>

              <div class="mt-3 flex flex-wrap items-center justify-between gap-3">
                <!-- qty controls -->
                <div class="inline-flex items-center rounded-md border"
                     :style="{ borderColor:'rgba(191,163,110,0.25)' }">
                  <button
                    class="px-2 py-1 text-sm"
                    :style="{ color: COLORS.text }"
                    @click="dec(it)"
                    aria-label="Decrease quantity"
                  >–</button>
                  <input
                    :value="it.qty"
                    @input="setQty(it, $event.target.value)"
                    class="w-10 bg-transparent text-center text-sm outline-none"
                    :style="{ color: COLORS.text }"
                    inputmode="numeric"
                  />
                  <button
                    class="px-2 py-1 text-sm"
                    :style="{ color: COLORS.text }"
                    @click="inc(it)"
                    aria-label="Increase quantity"
                  >+</button>
                </div>

                <!-- prices -->
                <div class="text-right">
                  <div class="text-sm" :style="{ color: COLORS.textDim }">
                    Unit: {{ fmt(it.price) }}
                  </div>
                  <div class="text-sm font-semibold" :style="{ color: COLORS.text }">
                    {{ fmt(it.price * it.qty) }}
                  </div>
                </div>
              </div>

              <!-- remove -->
              <button
                class="mt-3 inline-flex items-center gap-1 text-xs underline-offset-2 hover:underline"
                :style="{ color: COLORS.goldSoft }"
                @click="removeItem(it.id)"
                aria-label="Remove item"
              >
                Remove
              </button>
            </div>
          </div>

          <!-- subtle hover edge -->
          <div class="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 hover:opacity-100"
               :style="{ boxShadow: 'inset 0 0 0 1px rgba(214,191,142,.22)' }"></div>
        </article>
      </section>

      <!-- Summary -->
      <aside class="md:sticky md:top-20 h-max">
        <div class="relative overflow-hidden rounded-2xl border p-5"
             :style="{ borderColor:'rgba(191,163,110,0.25)', background: COLORS.panel }">
          <div class="mb-3 text-[11px] uppercase tracking-[0.28em]" :style="{ color: COLORS.goldSoft }">Summary</div>

          <div class="space-y-2 text-sm">
            <div class="flex items-center justify-between">
              <span :style="{ color: COLORS.textDim }">Subtotal</span>
              <span :style="{ color: COLORS.text }">{{ fmt(subtotal) }}</span>
            </div>

            <div class="flex items-center justify-between">
              <span :style="{ color: COLORS.textDim }">Discount</span>
              <span :style="{ color: COLORS.text }">- {{ fmt(discount) }}</span>
            </div>

            <div class="flex items-center justify-between">
              <span :style="{ color: COLORS.textDim }">Shipping</span>
              <span :style="{ color: COLORS.text }">{{ shippingCost ? fmt(shippingCost) : 'Free' }}</span>
            </div>

            <div class="h-px my-2" :style="{ background:'rgba(191,163,110,0.18)' }"></div>

            <div class="flex items-center justify-between text-[15px] font-semibold">
              <span :style="{ color: COLORS.text }">Total</span>
              <span :style="{ color: COLORS.text }">{{ fmt(total) }}</span>
            </div>
          </div>

          <!-- shipping method -->
          <div class="mt-4 space-y-2 text-sm">
            <div class="text-xs" :style="{ color: COLORS.textDim }">Shipping method</div>
            <label class="flex items-center gap-2">
              <input type="radio" value="standard" v-model="shipping" />
              <span :style="{ color: COLORS.text }">Standard ({{ subtotal >= 400 ? 'Free' : fmt(9) }})</span>
            </label>
            <label class="flex items-center gap-2">
              <input type="radio" value="express" v-model="shipping" />
              <span :style="{ color: COLORS.text }">Express ({{ subtotal >= 400 ? 'Free' : fmt(19) }})</span>
            </label>
          </div>

          <!-- promo -->
          <div class="mt-4">
            <div class="text-xs mb-1" :style="{ color: COLORS.textDim }">Promo code</div>
            <div class="flex items-center gap-2">
              <input
                v-model="code"
                type="text"
                placeholder="GOTHAM10"
                class="flex-1 rounded-md border bg-transparent px-3 py-2 text-sm outline-none transition"
                :style="{ borderColor:'rgba(191,163,110,0.25)', color: COLORS.text,
                          boxShadow:'inset 0 0 0 9999px rgba(255,255,255,0.02)' }"
                @keyup.enter="applyCode"
              />
              <button
                class="rounded-md px-3 py-2 text-sm font-semibold"
                :style="{ background: COLORS.gold, color: '#161616' }"
                @click="applyCode"
              >
                Apply
              </button>
            </div>
            <p v-if="codeMsg" class="mt-1 text-xs" :style="{ color: discountPct ? COLORS.goldSoft : '#ff9a9a' }">
              {{ codeMsg }}
            </p>
          </div>

          <!-- checkout -->
          <RouterLink
            to="/checkout"
            class="mt-5 inline-flex w-full items-center justify-center rounded-md px-5 py-2.5 text-sm font-semibold transition
                   shadow-[0_8px_22px_rgba(0,0,0,.45)] hover:shadow-[0_12px_28px_rgba(0,0,0,.6)] disabled:opacity-50"
            :style="{ background: COLORS.gold, color: '#161616' }"
            :class="{ 'pointer-events-none opacity-50': store.items.value.length === 0 }"
          >
            Proceed to Checkout
          </RouterLink>

          <div class="mt-2 text-xs" :style="{ color: COLORS.textDim }">
            Taxes calculated at checkout. Free shipping on orders €400+.
          </div>
        </div>
      </aside>
    </div>
  </div>
</template>
