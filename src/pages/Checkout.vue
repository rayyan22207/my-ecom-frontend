<script setup>
import { ref, computed } from 'vue'
import { RouterLink, useRouter } from 'vue-router'

const router = useRouter()

// Try Pinia cart if present; otherwise use a safe fallback
let store
try {
  // import { useCart } from '@/stores/cart'
  // store = useCart()
  throw new Error('no-store') // remove when wiring real store
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
const fmt = (n) => new Intl.NumberFormat('en-GB', { style:'currency', currency }).format(n)

// --- FORM STATE ---
const email = ref('')
const phone = ref('')
const shipFirst = ref('')
const shipLast  = ref('')
const shipAddr1 = ref('')
const shipAddr2 = ref('')
const shipCity  = ref('')
const shipZip   = ref('')
const shipCountry = ref('Germany')

const billSameAsShip = ref(true)
const billFirst = ref('')
const billLast  = ref('')
const billAddr1 = ref('')
const billAddr2 = ref('')
const billCity  = ref('')
const billZip   = ref('')
const billCountry = ref('Germany')

const shipping = ref('standard') // standard | express
const cardName = ref('')
const cardNumber = ref('')
const cardExp = ref('')   // MM/YY
const cardCvc = ref('')
const agree = ref(false)

// promo
const code = ref('')
const codeMsg = ref('')
const discountPct = ref(0)
function applyCode() {
  const v = code.value.trim().toUpperCase()
  if (!v) { codeMsg.value=''; discountPct.value = 0; return }
  if (v === 'GOTHAM10') { discountPct.value = 10; codeMsg.value = '10% discount applied.' }
  else { discountPct.value = 0; codeMsg.value = 'Code not recognized.' }
}

// --- TOTALS ---
const subtotal = computed(() =>
  store.items.value.reduce((s, it) => s + it.price * it.qty, 0)
)
const discount = computed(() => Math.round((subtotal.value * discountPct.value) / 100))
const shippingCost = computed(() => {
  if (subtotal.value >= 400) return 0
  return shipping.value === 'express' ? 19 : 9
})
const tax = computed(() => 0) // plug your VAT logic later
const total = computed(() => Math.max(0, subtotal.value - discount.value) + shippingCost.value + tax.value)

// --- VALIDATION ---
const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const cardRe  = /^[0-9 ]{12,22}$/
const expRe   = /^(0[1-9]|1[0-2])\/\d{2}$/
const cvcRe   = /^\d{3,4}$/

const errors = computed(() => {
  const e = {}
  if (!emailRe.test(email.value)) e.email = 'Enter a valid email.'
  if (!shipFirst.value.trim()) e.shipFirst = 'Required.'
  if (!shipLast.value.trim())  e.shipLast = 'Required.'
  if (!shipAddr1.value.trim()) e.shipAddr1 = 'Required.'
  if (!shipCity.value.trim())  e.shipCity = 'Required.'
  if (!shipZip.value.trim())   e.shipZip = 'Required.'

  if (!billSameAsShip.value) {
    if (!billFirst.value.trim()) e.billFirst = 'Required.'
    if (!billLast.value.trim())  e.billLast = 'Required.'
    if (!billAddr1.value.trim()) e.billAddr1 = 'Required.'
    if (!billCity.value.trim())  e.billCity = 'Required.'
    if (!billZip.value.trim())   e.billZip = 'Required.'
  }

  if (!cardName.value.trim())       e.cardName = 'Name on card is required.'
  if (!cardRe.test(cardNumber.value)) e.cardNumber = 'Card number looks off.'
  if (!expRe.test(cardExp.value))     e.cardExp = 'Use MM/YY.'
  if (!cvcRe.test(cardCvc.value))     e.cardCvc = '3–4 digits.'
  if (!agree.value)                   e.agree = 'Please accept the terms.'
  return e
})
const isValid = computed(() => Object.keys(errors.value).length === 0)

// --- SUBMIT ---
const placing = ref(false)
const placed = ref(false)
async function placeOrder() {
  if (!isValid.value) return
  placing.value = true
  try {
    // TODO: call backend here
    await new Promise(r => setTimeout(r, 1200))
    placed.value = true
    // optionally clear cart here
    // store.items.value = []
  } finally {
    placing.value = false
  }
}
</script>

<template>
  <div class="mx-auto w-full max-w-7xl px-6 py-8 space-y-8">
    <!-- Header -->
    <div class="relative">
      <div class="h-px w-full opacity-20" :style="{ background: COLORS.goldSoft }"></div>
      <div class="flex items-end justify-between py-4">
        <h1 class="text-[28px] md:text-[34px] font-semibold leading-none"
            :style="{ color: COLORS.text, fontFamily: 'ui-serif, Georgia, Cambria, Times New Roman, Times, serif' }">
          Checkout
        </h1>
        <RouterLink
          to="/cart"
          class="group inline-flex items-center gap-2 text-sm font-medium px-2 py-1 rounded-md hover:bg-white/5"
          :style="{ color: COLORS.textDim }"
        >
          Back to Cart
          <svg viewBox="0 0 24 24" class="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1"
               fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"
               :style="{ color: COLORS.gold }">
            <path d="M19 12H6"/><path d="M12 5l-7 7 7 7"/>
          </svg>
        </RouterLink>
      </div>
      <div class="h-px w-full opacity-15" :style="{ background: COLORS.goldSoft }"></div>
    </div>

    <!-- Success -->
    <div v-if="placed" class="rounded-2xl border p-8 text-center"
         :style="{ borderColor:'rgba(191,163,110,0.25)', background: COLORS.panel }">
      <h2 class="text-xl font-semibold" :style="{ color: COLORS.text }">Order Confirmed</h2>
      <p class="mt-2 text-sm" :style="{ color: COLORS.textDim }">
        We’ve emailed your receipt and will notify you when your order ships.
      </p>
      <RouterLink
        to="/"
        class="mt-5 inline-flex items-center rounded-md px-5 py-2.5 text-sm font-semibold transition
               shadow-[0_8px_22px_rgba(0,0,0,.45)] hover:shadow-[0_12px_28px_rgba(0,0,0,.6)]"
        :style="{ background: COLORS.gold, color: '#161616' }"
      >
        Continue Shopping
      </RouterLink>
    </div>

    <!-- Main grid -->
    <div v-else class="grid gap-6 lg:grid-cols-[1fr_420px]">
      <!-- Left: forms -->
      <section class="space-y-6">
        <!-- Contact -->
        <div class="rounded-2xl border p-5 md:p-6"
             :style="{ borderColor:'rgba(191,163,110,0.25)', background: COLORS.panel }">
          <div class="mb-3 text-[11px] uppercase tracking-[0.28em]" :style="{ color: COLORS.goldSoft }">Contact</div>
          <div class="grid gap-4 md:grid-cols-2">
            <div class="md:col-span-1">
              <label class="mb-1 block text-xs tracking-wider" :style="{ color: COLORS.textDim }">Email</label>
              <input v-model="email" type="email"
                     class="w-full rounded-md border bg-transparent px-3 py-2 text-sm outline-none transition"
                     :style="{ borderColor: errors.email ? 'rgba(255,80,80,0.45)' : 'rgba(191,163,110,0.25)', color: COLORS.text,
                               boxShadow:'inset 0 0 0 9999px rgba(255,255,255,0.02)' }" />
              <p v-if="errors.email" class="mt-1 text-xs" style="color:#ff9a9a">{{ errors.email }}</p>
            </div>
            <div class="md:col-span-1">
              <label class="mb-1 block text-xs tracking-wider" :style="{ color: COLORS.textDim }">Phone (optional)</label>
              <input v-model="phone" type="tel"
                     class="w-full rounded-md border bg-transparent px-3 py-2 text-sm outline-none transition"
                     :style="{ borderColor:'rgba(191,163,110,0.25)', color: COLORS.text,
                               boxShadow:'inset 0 0 0 9999px rgba(255,255,255,0.02)' }" />
            </div>
          </div>
        </div>

        <!-- Shipping address -->
        <div class="rounded-2xl border p-5 md:p-6"
             :style="{ borderColor:'rgba(191,163,110,0.25)', background: COLORS.panel }">
          <div class="mb-3 text-[11px] uppercase tracking-[0.28em]" :style="{ color: COLORS.goldSoft }">Shipping Address</div>
          <div class="grid gap-4 md:grid-cols-2">
            <div>
              <label class="mb-1 block text-xs tracking-wider" :style="{ color: COLORS.textDim }">First name</label>
              <input v-model="shipFirst" type="text" class="w-full rounded-md border bg-transparent px-3 py-2 text-sm outline-none"
                     :style="{ borderColor: errors.shipFirst ? 'rgba(255,80,80,0.45)' : 'rgba(191,163,110,0.25)', color: COLORS.text,
                               boxShadow:'inset 0 0 0 9999px rgba(255,255,255,0.02)' }" />
              <p v-if="errors.shipFirst" class="mt-1 text-xs" style="color:#ff9a9a">{{ errors.shipFirst }}</p>
            </div>
            <div>
              <label class="mb-1 block text-xs tracking-wider" :style="{ color: COLORS.textDim }">Last name</label>
              <input v-model="shipLast" type="text" class="w-full rounded-md border bg-transparent px-3 py-2 text-sm outline-none"
                     :style="{ borderColor: errors.shipLast ? 'rgba(255,80,80,0.45)' : 'rgba(191,163,110,0.25)', color: COLORS.text,
                               boxShadow:'inset 0 0 0 9999px rgba(255,255,255,0.02)' }" />
              <p v-if="errors.shipLast" class="mt-1 text-xs" style="color:#ff9a9a">{{ errors.shipLast }}</p>
            </div>

            <div class="md:col-span-2">
              <label class="mb-1 block text-xs tracking-wider" :style="{ color: COLORS.textDim }">Address line 1</label>
              <input v-model="shipAddr1" type="text" class="w-full rounded-md border bg-transparent px-3 py-2 text-sm outline-none"
                     :style="{ borderColor: errors.shipAddr1 ? 'rgba(255,80,80,0.45)' : 'rgba(191,163,110,0.25)', color: COLORS.text,
                               boxShadow:'inset 0 0 0 9999px rgba(255,255,255,0.02)' }" />
              <p v-if="errors.shipAddr1" class="mt-1 text-xs" style="color:#ff9a9a">{{ errors.shipAddr1 }}</p>
            </div>

            <div class="md:col-span-2">
              <label class="mb-1 block text-xs tracking-wider" :style="{ color: COLORS.textDim }">Address line 2 (optional)</label>
              <input v-model="shipAddr2" type="text" class="w-full rounded-md border bg-transparent px-3 py-2 text-sm outline-none"
                     :style="{ borderColor:'rgba(191,163,110,0.25)', color: COLORS.text,
                               boxShadow:'inset 0 0 0 9999px rgba(255,255,255,0.02)' }" />
            </div>

            <div>
              <label class="mb-1 block text-xs tracking-wider" :style="{ color: COLORS.textDim }">City</label>
              <input v-model="shipCity" type="text" class="w-full rounded-md border bg-transparent px-3 py-2 text-sm outline-none"
                     :style="{ borderColor: errors.shipCity ? 'rgba(255,80,80,0.45)' : 'rgba(191,163,110,0.25)', color: COLORS.text,
                               boxShadow:'inset 0 0 0 9999px rgba(255,255,255,0.02)' }" />
              <p v-if="errors.shipCity" class="mt-1 text-xs" style="color:#ff9a9a">{{ errors.shipCity }}</p>
            </div>
            <div>
              <label class="mb-1 block text-xs tracking-wider" :style="{ color: COLORS.textDim }">Postal code</label>
              <input v-model="shipZip" type="text" class="w-full rounded-md border bg-transparent px-3 py-2 text-sm outline-none"
                     :style="{ borderColor: errors.shipZip ? 'rgba(255,80,80,0.45)' : 'rgba(191,163,110,0.25)', color: COLORS.text,
                               boxShadow:'inset 0 0 0 9999px rgba(255,255,255,0.02)' }" />
              <p v-if="errors.shipZip" class="mt-1 text-xs" style="color:#ff9a9a">{{ errors.shipZip }}</p>
            </div>

            <div class="md:col-span-2">
              <label class="mb-1 block text-xs tracking-wider" :style="{ color: COLORS.textDim }">Country</label>
              <div class="relative">
                <select v-model="shipCountry"
                        class="appearance-none w-full rounded-md border px-3 py-2 pr-9 text-sm outline-none"
                        :style="{ background:'#0f0f0f', color: COLORS.text, borderColor:'rgba(191,163,110,0.25)',
                                  boxShadow:'inset 0 0 0 9999px rgba(255,255,255,0.02)' }">
                  <option>Germany</option>
                  <option>France</option>
                  <option>Spain</option>
                  <option>Italy</option>
                  <option>Netherlands</option>
                </select>
                <svg class="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4"
                     viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"
                     stroke-linecap="round" stroke-linejoin="round"
                     :style="{ color: 'rgba(232,226,214,0.7)' }">
                  <path d="M6 9l6 6 6-6"/>
                </svg>
              </div>
            </div>
          </div>
        </div>

        <!-- Billing -->
        <div class="rounded-2xl border p-5 md:p-6"
             :style="{ borderColor:'rgba(191,163,110,0.25)', background: COLORS.panel }">
          <div class="mb-3 flex items-center justify-between">
            <div class="text-[11px] uppercase tracking-[0.28em]" :style="{ color: COLORS.goldSoft }">Billing</div>
            <label class="flex items-center gap-2 text-xs" :style="{ color: COLORS.textDim }">
              <input type="checkbox" v-model="billSameAsShip" />
              Same as shipping
            </label>
          </div>

          <div v-if="!billSameAsShip" class="grid gap-4 md:grid-cols-2">
            <div>
              <label class="mb-1 block text-xs tracking-wider" :style="{ color: COLORS.textDim }">First name</label>
              <input v-model="billFirst" type="text" class="w-full rounded-md border bg-transparent px-3 py-2 text-sm outline-none"
                     :style="{ borderColor: errors.billFirst ? 'rgba(255,80,80,0.45)' : 'rgba(191,163,110,0.25)', color: COLORS.text,
                               boxShadow:'inset 0 0 0 9999px rgba(255,255,255,0.02)' }" />
              <p v-if="errors.billFirst" class="mt-1 text-xs" style="color:#ff9a9a">{{ errors.billFirst }}</p>
            </div>
            <div>
              <label class="mb-1 block text-xs tracking-wider" :style="{ color: COLORS.textDim }">Last name</label>
              <input v-model="billLast" type="text" class="w-full rounded-md border bg-transparent px-3 py-2 text-sm outline-none"
                     :style="{ borderColor: errors.billLast ? 'rgba(255,80,80,0.45)' : 'rgba(191,163,110,0.25)', color: COLORS.text,
                               boxShadow:'inset 0 0 0 9999px rgba(255,255,255,0.02)' }" />
              <p v-if="errors.billLast" class="mt-1 text-xs" style="color:#ff9a9a">{{ errors.billLast }}</p>
            </div>

            <div class="md:col-span-2">
              <label class="mb-1 block text-xs tracking-wider" :style="{ color: COLORS.textDim }">Address line 1</label>
              <input v-model="billAddr1" type="text" class="w-full rounded-md border bg-transparent px-3 py-2 text-sm outline-none"
                     :style="{ borderColor: errors.billAddr1 ? 'rgba(255,80,80,0.45)' : 'rgba(191,163,110,0.25)', color: COLORS.text,
                               boxShadow:'inset 0 0 0 9999px rgba(255,255,255,0.02)' }" />
              <p v-if="errors.billAddr1" class="mt-1 text-xs" style="color:#ff9a9a">{{ errors.billAddr1 }}</p>
            </div>

            <div class="md:col-span-2">
              <label class="mb-1 block text-xs tracking-wider" :style="{ color: COLORS.textDim }">Address line 2 (optional)</label>
              <input v-model="billAddr2" type="text" class="w-full rounded-md border bg-transparent px-3 py-2 text-sm outline-none"
                     :style="{ borderColor:'rgba(191,163,110,0.25)', color: COLORS.text,
                               boxShadow:'inset 0 0 0 9999px rgba(255,255,255,0.02)' }" />
            </div>

            <div>
              <label class="mb-1 block text-xs tracking-wider" :style="{ color: COLORS.textDim }">City</label>
              <input v-model="billCity" type="text" class="w-full rounded-md border bg-transparent px-3 py-2 text-sm outline-none"
                     :style="{ borderColor: errors.billCity ? 'rgba(255,80,80,0.45)' : 'rgba(191,163,110,0.25)', color: COLORS.text,
                               boxShadow:'inset 0 0 0 9999px rgba(255,255,255,0.02)' }" />
              <p v-if="errors.billCity" class="mt-1 text-xs" style="color:#ff9a9a">{{ errors.billCity }}</p>
            </div>
            <div>
              <label class="mb-1 block text-xs tracking-wider" :style="{ color: COLORS.textDim }">Postal code</label>
              <input v-model="billZip" type="text" class="w-full rounded-md border bg-transparent px-3 py-2 text-sm outline-none"
                     :style="{ borderColor: errors.billZip ? 'rgba(255,80,80,0.45)' : 'rgba(191,163,110,0.25)', color: COLORS.text,
                               boxShadow:'inset 0 0 0 9999px rgba(255,255,255,0.02)' }" />
              <p v-if="errors.billZip" class="mt-1 text-xs" style="color:#ff9a9a">{{ errors.billZip }}</p>
            </div>

            <div class="md:col-span-2">
              <label class="mb-1 block text-xs tracking-wider" :style="{ color: COLORS.textDim }">Country</label>
              <div class="relative">
                <select v-model="billCountry"
                        class="appearance-none w-full rounded-md border px-3 py-2 pr-9 text-sm outline-none"
                        :style="{ background:'#0f0f0f', color: COLORS.text, borderColor:'rgba(191,163,110,0.25)',
                                  boxShadow:'inset 0 0 0 9999px rgba(255,255,255,0.02)' }">
                  <option>Germany</option>
                  <option>France</option>
                  <option>Spain</option>
                  <option>Italy</option>
                  <option>Netherlands</option>
                </select>
                <svg class="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4"
                     viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"
                     stroke-linecap="round" stroke-linejoin="round"
                     :style="{ color: 'rgba(232,226,214,0.7)' }">
                  <path d="M6 9l6 6 6-6"/>
                </svg>
              </div>
            </div>
          </div>
        </div>

        <!-- Delivery method -->
        <div class="rounded-2xl border p-5 md:p-6"
             :style="{ borderColor:'rgba(191,163,110,0.25)', background: COLORS.panel }">
          <div class="mb-3 text-[11px] uppercase tracking-[0.28em]" :style="{ color: COLORS.goldSoft }">Delivery</div>
          <div class="grid gap-3">
            <label class="flex items-start gap-3 rounded-md border p-3 cursor-pointer"
                   :style="{ borderColor: shipping==='standard' ? COLORS.gold : 'rgba(191,163,110,0.25)' }">
              <input type="radio" value="standard" v-model="shipping" class="mt-1" />
              <div class="flex w-full items-center justify-between">
                <div>
                  <div class="text-sm" :style="{ color: COLORS.text }">Standard</div>
                  <div class="text-xs" :style="{ color: COLORS.textDim }">3–5 business days</div>
                </div>
                <div class="text-sm" :style="{ color: COLORS.text }">
                  {{ subtotal >= 400 ? 'Free' : fmt(9) }}
                </div>
              </div>
            </label>

            <label class="flex items-start gap-3 rounded-md border p-3 cursor-pointer"
                   :style="{ borderColor: shipping==='express' ? COLORS.gold : 'rgba(191,163,110,0.25)' }">
              <input type="radio" value="express" v-model="shipping" class="mt-1" />
              <div class="flex w-full items-center justify-between">
                <div>
                  <div class="text-sm" :style="{ color: COLORS.text }">Express</div>
                  <div class="text-xs" :style="{ color: COLORS.textDim }">1–2 business days</div>
                </div>
                <div class="text-sm" :style="{ color: COLORS.text }">
                  {{ subtotal >= 400 ? 'Free' : fmt(19) }}
                </div>
              </div>
            </label>
          </div>
        </div>

        <!-- Payment -->
        <div class="rounded-2xl border p-5 md:p-6"
             :style="{ borderColor:'rgba(191,163,110,0.25)', background: COLORS.panel }">
          <div class="mb-3 text-[11px] uppercase tracking-[0.28em]" :style="{ color: COLORS.goldSoft }">Payment</div>
          <div class="grid gap-4 md:grid-cols-2">
            <div class="md:col-span-2">
              <label class="mb-1 block text-xs tracking-wider" :style="{ color: COLORS.textDim }">Name on card</label>
              <input v-model="cardName" type="text" class="w-full rounded-md border bg-transparent px-3 py-2 text-sm outline-none"
                     :style="{ borderColor: errors.cardName ? 'rgba(255,80,80,0.45)' : 'rgba(191,163,110,0.25)', color: COLORS.text,
                               boxShadow:'inset 0 0 0 9999px rgba(255,255,255,0.02)' }" />
              <p v-if="errors.cardName" class="mt-1 text-xs" style="color:#ff9a9a">{{ errors.cardName }}</p>
            </div>

            <div class="md:col-span-2">
              <label class="mb-1 block text-xs tracking-wider" :style="{ color: COLORS.textDim }">Card number</label>
              <input v-model="cardNumber" inputmode="numeric" autocomplete="cc-number" placeholder="1234 5678 9012 3456"
                     class="w-full rounded-md border bg-transparent px-3 py-2 text-sm outline-none"
                     :style="{ borderColor: errors.cardNumber ? 'rgba(255,80,80,0.45)' : 'rgba(191,163,110,0.25)', color: COLORS.text,
                               boxShadow:'inset 0 0 0 9999px rgba(255,255,255,0.02)' }" />
              <p v-if="errors.cardNumber" class="mt-1 text-xs" style="color:#ff9a9a">{{ errors.cardNumber }}</p>
            </div>

            <div>
              <label class="mb-1 block text-xs tracking-wider" :style="{ color: COLORS.textDim }">Expiry (MM/YY)</label>
              <input v-model="cardExp" placeholder="MM/YY" class="w-full rounded-md border bg-transparent px-3 py-2 text-sm outline-none"
                     :style="{ borderColor: errors.cardExp ? 'rgba(255,80,80,0.45)' : 'rgba(191,163,110,0.25)', color: COLORS.text,
                               boxShadow:'inset 0 0 0 9999px rgba(255,255,255,0.02)' }" />
              <p v-if="errors.cardExp" class="mt-1 text-xs" style="color:#ff9a9a">{{ errors.cardExp }}</p>
            </div>

            <div>
              <label class="mb-1 block text-xs tracking-wider" :style="{ color: COLORS.textDim }">CVC</label>
              <input v-model="cardCvc" inputmode="numeric" placeholder="123"
                     class="w-full rounded-md border bg-transparent px-3 py-2 text-sm outline-none"
                     :style="{ borderColor: errors.cardCvc ? 'rgba(255,80,80,0.45)' : 'rgba(191,163,110,0.25)', color: COLORS.text,
                               boxShadow:'inset 0 0 0 9999px rgba(255,255,255,0.02)' }" />
              <p v-if="errors.cardCvc" class="mt-1 text-xs" style="color:#ff9a9a">{{ errors.cardCvc }}</p>
            </div>
          </div>

          <div class="mt-4 flex items-start gap-2">
            <input id="agree" type="checkbox" v-model="agree" class="mt-0.5 h-4 w-4 rounded border"
                   :style="{ borderColor:'rgba(191,163,110,0.4)' }" />
            <label for="agree" class="text-xs leading-relaxed"
                   :style="{ color: errors.agree ? '#ff9a9a' : COLORS.textDim }">
              I agree to the Terms and Privacy Policy.
            </label>
          </div>

          <button
            class="mt-5 w-full rounded-md px-5 py-2.5 text-sm font-semibold transition
                   shadow-[0_8px_22px_rgba(0,0,0,.45)] hover:shadow-[0_12px_28px_rgba(0,0,0,.6)] disabled:opacity-50"
            :style="{ background: COLORS.gold, color: '#161616' }"
            :disabled="placing || !isValid"
            @click="placeOrder"
          >
            {{ placing ? 'Placing order…' : `Pay ${fmt(total)}` }}
          </button>
        </div>
      </section>

      <!-- Right: summary -->
      <aside class="lg:sticky lg:top-20 h-max space-y-4">
        <div class="rounded-2xl border p-5"
             :style="{ borderColor:'rgba(191,163,110,0.25)', background: COLORS.panel }">
          <div class="mb-3 text-[11px] uppercase tracking-[0.28em]" :style="{ color: COLORS.goldSoft }">Order Summary</div>

          <div class="space-y-3">
            <div v-for="it in store.items.value" :key="it.id" class="grid grid-cols-[64px_1fr_auto] items-center gap-3">
              <div class="overflow-hidden rounded-md border h-16"
                   :style="{ borderColor:'rgba(191,163,110,0.25)', background:'#0e0e0e' }">
                <img :src="it.img" :alt="it.title" class="h-full w-full object-cover" />
              </div>
              <div>
                <div class="text-sm font-medium" :style="{ color: COLORS.text }">{{ it.title }}</div>
                <div class="text-xs" :style="{ color: COLORS.textDim }">{{ it.variant }}</div>
                <div class="text-xs" :style="{ color: COLORS.textDim }">Qty {{ it.qty }}</div>
              </div>
              <div class="text-sm font-semibold" :style="{ color: COLORS.text }">{{ fmt(it.price * it.qty) }}</div>
            </div>
          </div>

          <div class="h-px my-3" :style="{ background:'rgba(191,163,110,0.18)' }"></div>

          <!-- promo -->
          <div>
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
              >Apply</button>
            </div>
            <p v-if="codeMsg" class="mt-1 text-xs" :style="{ color: discountPct ? COLORS.goldSoft : '#ff9a9a' }">
              {{ codeMsg }}
            </p>
          </div>

          <div class="h-px my-3" :style="{ background:'rgba(191,163,110,0.18)' }"></div>

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
            <div class="flex items-center justify-between">
              <span :style="{ color: COLORS.textDim }">Tax</span>
              <span :style="{ color: COLORS.text }">{{ fmt(tax) }}</span>
            </div>

            <div class="h-px my-2" :style="{ background:'rgba(191,163,110,0.18)' }"></div>

            <div class="flex items-center justify-between text-[15px] font-semibold">
              <span :style="{ color: COLORS.text }">Total</span>
              <span :style="{ color: COLORS.text }">{{ fmt(total) }}</span>
            </div>
          </div>
        </div>

        <div class="rounded-2xl border p-5"
             :style="{ borderColor:'rgba(191,163,110,0.25)', background: COLORS.panel }">
          <div class="text-xs" :style="{ color: COLORS.textDim }">We accept major cards. All payments are encrypted.</div>
        </div>
      </aside>
    </div>
  </div>
</template>

<style scoped>
/* Dark selects + options where the engine allows */
select { background-color:#0f0f0f; color:#e7e2d6; }
select option { background-color:#0f0f0f; color:#e7e2d6; }
</style>
