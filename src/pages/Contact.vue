<script setup>
import { ref, computed } from 'vue'
import SectionHeader from '../components/SectionHeader.vue'

const COLORS = {
  bg: '#0b0b0b',
  panel: '#101010',
  gold: '#d6bf8e',
  goldSoft: '#bfa36e',
  text: '#e7e2d6',
  textDim: '#b8b3a6'
}

// form state
const name = ref('')
const email = ref('')
const topic = ref('Support')
const orderId = ref('')
const message = ref('')
const agree = ref(false)

// UX state
const sending = ref(false)
const sent = ref(false)
const error = ref('')

// basic validation
const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const errors = computed(() => {
  const e = {}
  if (!name.value.trim()) e.name = 'Please enter your name.'
  if (!emailRe.test(email.value)) e.email = 'Enter a valid email.'
  if (!message.value.trim()) e.message = 'Tell us what you need help with.'
  if (!agree.value) e.agree = 'Please accept the privacy terms.'
  // order id required if topic is Orders
  if (topic.value === 'Orders' && !orderId.value.trim()) e.orderId = 'Order ID is required for order inquiries.'
  return e
})
const isValid = computed(() => Object.keys(errors.value).length === 0)

// fake submit (swap with axios later)
async function onSubmit() {
  error.value = ''
  if (!isValid.value) return
  try {
    sending.value = true
    await new Promise(r => setTimeout(r, 900))
    // TODO: axios.post('/api/contact', { name: name.value, email: email.value, topic: topic.value, orderId: orderId.value, message: message.value })
    sent.value = true
    name.value = ''; email.value = ''; topic.value = 'Support'; orderId.value = ''; message.value = ''; agree.value = false
  } catch (e) {
    error.value = 'Something went wrong. Please try again.'
  } finally {
    sending.value = false
  }
}
</script>

<template>
  <div class="mx-auto w-full max-w-7xl px-6 py-8 space-y-8">
    <SectionHeader title="Contact" link-text="FAQ" link-to="/faq" />

    <!-- Hero-ish intro strip -->
    <section
      class="relative overflow-hidden rounded-2xl"
      :style="{ background: COLORS.panel, border: '1px solid rgba(191,163,110,0.25)' }"
    >
      <div class="pointer-events-none absolute inset-0"
           :style="{ background: 'radial-gradient(900px 300px at 70% 120%, rgba(214,191,142,0.12), transparent 70%)' }"></div>

      <div class="relative grid gap-6 p-6 md:grid-cols-2 md:p-8">
        <div>
          <div class="mb-2 text-[11px] uppercase tracking-[0.28em]" :style="{ color: COLORS.goldSoft }">Support</div>
          <h1 class="text-[26px] md:text-[34px] font-semibold leading-tight"
              :style="{ color: COLORS.text, fontFamily: 'ui-serif, Georgia, Cambria, Times New Roman, Times, serif' }">
            We’re here to help
          </h1>
          <p class="mt-2 text-[14px]" :style="{ color: COLORS.textDim }">
            Questions about sizing, orders, or care? Send us a note—most messages get a reply within one business day.
          </p>
          <div class="mt-4 grid gap-3 sm:grid-cols-2">
            <div class="rounded-xl border p-4" :style="{ borderColor: 'rgba(191,163,110,0.25)', background:'#0f0f0f' }">
              <div class="text-xs tracking-wider" :style="{ color: COLORS.goldSoft }">Email</div>
              <a href="mailto:support@gotham-ecom.com" class="text-sm underline"
                 :style="{ color: COLORS.text }">support@gotham-ecom.com</a>
            </div>
            <div class="rounded-xl border p-4" :style="{ borderColor: 'rgba(191,163,110,0.25)', background:'#0f0f0f' }">
              <div class="text-xs tracking-wider" :style="{ color: COLORS.goldSoft }">Hours</div>
              <div class="text-sm" :style="{ color: COLORS.text }">Mon–Fri · 9:00–17:00 CET</div>
            </div>
          </div>
        </div>

        <!-- slim map / image placeholder -->
        <div class="relative overflow-hidden rounded-xl border"
             :style="{ borderColor:'rgba(191,163,110,0.25)', background:'#0e0e0e', minHeight:'200px' }">
          <img
            src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1600&auto=format&fit=crop"
            alt="Showroom"
            class="h-full w-full object-cover"
            loading="lazy"
            decoding="async"
          />
          <div class="pointer-events-none absolute inset-0"
               :style="{ background: 'linear-gradient(to top, rgba(0,0,0,.35), transparent 40%)' }"></div>
        </div>
      </div>

      <div class="absolute inset-x-0 top-0 h-px opacity-20" :style="{ background: COLORS.goldSoft }"></div>
      <div class="absolute inset-x-0 bottom-0 h-px opacity-15" :style="{ background: COLORS.goldSoft }"></div>
    </section>

    <!-- Form + info -->
    <section class="grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
      <!-- Form -->
      <form
        class="relative overflow-hidden rounded-2xl border p-6 md:p-8"
        :style="{ borderColor: 'rgba(191,163,110,0.25)', background: '#101010' }"
        novalidate
        @submit.prevent="onSubmit"
      >
        <!-- success -->
        <div v-if="sent"
             class="mb-4 rounded-md px-4 py-3 text-sm"
             :style="{ background:'rgba(214,191,142,0.12)', color: COLORS.text }">
          Thank you—your message has been sent. We’ll get back to you shortly.
        </div>
        <!-- error -->
        <div v-if="error"
             class="mb-4 rounded-md px-4 py-3 text-sm"
             :style="{ background:'rgba(255,60,60,0.12)', color: COLORS.text }">
          {{ error }}
        </div>

        <div class="grid gap-4 sm:grid-cols-2">
          <!-- Name -->
          <div>
            <label class="mb-1 block text-xs tracking-wider" :style="{ color: COLORS.textDim }">Name</label>
            <input
              v-model="name"
              type="text"
              required
              class="w-full rounded-md border bg-transparent px-3 py-2 text-sm outline-none transition"
              :style="{
                borderColor: errors.name ? 'rgba(255,80,80,0.45)' : 'rgba(191,163,110,0.25)',
                color: COLORS.text,
                boxShadow:'inset 0 0 0 9999px rgba(255,255,255,0.02)'
              }"
              :aria-invalid="!!errors.name"
              :aria-describedby="errors.name ? 'err-name' : undefined"
            />
            <p v-if="errors.name" id="err-name" class="mt-1 text-xs" style="color:#ff9a9a">{{ errors.name }}</p>
          </div>

          <!-- Email -->
          <div>
            <label class="mb-1 block text-xs tracking-wider" :style="{ color: COLORS.textDim }">Email</label>
            <input
              v-model="email"
              type="email"
              required
              class="w-full rounded-md border bg-transparent px-3 py-2 text-sm outline-none transition"
              :style="{
                borderColor: errors.email ? 'rgba(255,80,80,0.45)' : 'rgba(191,163,110,0.25)',
                color: COLORS.text,
                boxShadow:'inset 0 0 0 9999px rgba(255,255,255,0.02)'
              }"
              :aria-invalid="!!errors.email"
              :aria-describedby="errors.email ? 'err-email' : undefined"
            />
            <p v-if="errors.email" id="err-email" class="mt-1 text-xs" style="color:#ff9a9a">{{ errors.email }}</p>
          </div>
        </div>

        <!-- Topic + Order ID -->
        <div class="mt-4 grid gap-4 sm:grid-cols-2">
          <!-- custom-styled select -->
          <div class="relative">
            <label class="mb-1 block text-xs tracking-wider" :style="{ color: COLORS.textDim }">Topic</label>
            <div class="relative">
              <select
                v-model="topic"
                class="appearance-none w-full rounded-md border px-3 py-2 pr-9 text-sm outline-none transition focus:ring-2"
                :style="{
                  background: '#0f0f0f',
                  color: COLORS.text,
                  borderColor: 'rgba(191,163,110,0.25)',
                  boxShadow:'inset 0 0 0 9999px rgba(255,255,255,0.02)'
                }"
              >
                <option>Support</option>
                <option>Orders</option>
                <option>Sizing</option>
                <option>Returns</option>
                <option>Wholesale</option>
                <option>Other</option>
              </select>
              <svg class="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4"
                   viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"
                   stroke-linecap="round" stroke-linejoin="round"
                   :style="{ color: 'rgba(232,226,214,0.7)' }">
                <path d="M6 9l6 6 6-6"/>
              </svg>
            </div>
          </div>

          <div>
            <label class="mb-1 block text-xs tracking-wider" :style="{ color: COLORS.textDim }">
              Order ID <span v-if="topic==='Orders'" :style="{ color: COLORS.goldSoft }">(required)</span>
            </label>
            <input
              v-model="orderId"
              type="text"
              placeholder="e.g. #GTHM-4821"
              class="w-full rounded-md border bg-transparent px-3 py-2 text-sm outline-none transition"
              :style="{
                borderColor: errors.orderId ? 'rgba(255,80,80,0.45)' : 'rgba(191,163,110,0.25)',
                color: COLORS.text,
                boxShadow:'inset 0 0 0 9999px rgba(255,255,255,0.02)'
              }"
              :aria-invalid="!!errors.orderId"
              :aria-describedby="errors.orderId ? 'err-order' : undefined"
            />
            <p v-if="errors.orderId" id="err-order" class="mt-1 text-xs" style="color:#ff9a9a">{{ errors.orderId }}</p>
          </div>
        </div>

        <!-- Message -->
        <div class="mt-4">
          <label class="mb-1 block text-xs tracking-wider" :style="{ color: COLORS.textDim }">Message</label>
          <textarea
            v-model="message"
            rows="6"
            class="w-full resize-y rounded-md border bg-transparent px-3 py-2 text-sm outline-none transition"
            :style="{
              borderColor: errors.message ? 'rgba(255,80,80,0.45)' : 'rgba(191,163,110,0.25)',
              color: COLORS.text,
              boxShadow:'inset 0 0 0 9999px rgba(255,255,255,0.02)'
            }"
            :aria-invalid="!!errors.message"
            :aria-describedby="errors.message ? 'err-msg' : undefined"
          ></textarea>
          <p v-if="errors.message" id="err-msg" class="mt-1 text-xs" style="color:#ff9a9a">{{ errors.message }}</p>
        </div>

        <!-- Consent -->
        <div class="mt-4 flex items-start gap-2">
          <input id="agree" v-model="agree" type="checkbox" class="mt-0.5 h-4 w-4 rounded border"
                 :style="{ borderColor:'rgba(191,163,110,0.4)' }" />
          <label for="agree" class="text-xs leading-relaxed"
                 :style="{ color: errors.agree ? '#ff9a9a' : COLORS.textDim }">
            I agree to the processing of my information as described in the Privacy Policy.
          </label>
        </div>

        <div class="mt-6 flex items-center gap-3">
          <button
            type="submit"
            class="rounded-md px-5 py-2.5 text-sm font-semibold transition
                   shadow-[0_8px_22px_rgba(0,0,0,.45)] hover:shadow-[0_12px_28px_rgba(0,0,0,.6)] disabled:opacity-50"
            :style="{ background: COLORS.gold, color: '#161616' }"
            :disabled="sending || !isValid"
          >
            {{ sending ? 'Sending…' : 'Send Message' }}
          </button>
          <span class="text-xs" :style="{ color: COLORS.goldSoft }">
            We usually reply within one business day.
          </span>
        </div>
      </form>

      <!-- Contact details / quick links -->
      <aside class="space-y-4">
        <div class="rounded-2xl border p-6"
             :style="{ borderColor:'rgba(191,163,110,0.25)', background:'#0f0f0f' }">
          <div class="mb-2 text-[11px] uppercase tracking-[0.28em]" :style="{ color: COLORS.goldSoft }">Quick links</div>
          <ul class="space-y-2 text-sm">
            <li><RouterLink to="/faq" class="hover:underline" :style="{ color: COLORS.text }">FAQ</RouterLink></li>
            <li><RouterLink to="/returns" class="hover:underline" :style="{ color: COLORS.text }">Returns & Exchanges</RouterLink></li>
            <li><RouterLink to="/care" class="hover:underline" :style="{ color: COLORS.text }">Care & Polishing</RouterLink></li>
            <li><RouterLink to="/shipping" class="hover:underline" :style="{ color: COLORS.text }">Shipping & Duties</RouterLink></li>
          </ul>
        </div>

        <div class="rounded-2xl border p-6"
             :style="{ borderColor:'rgba(191,163,110,0.25)', background:'#0f0f0f' }">
          <div class="mb-2 text-[11px] uppercase tracking-[0.28em]" :style="{ color: COLORS.goldSoft }">Follow</div>
          <div class="flex items-center gap-3">
            <a href="#" class="rounded-md p-2 transition hover:bg-white/5" :style="{ color: COLORS.text }" aria-label="Instagram">
              <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="3" width="18" height="18" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.5" y2="6.5"/></svg>
            </a>
            <a href="#" class="rounded-md p-2 transition hover:bg-white/5" :style="{ color: COLORS.text }" aria-label="Twitter">
              <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M22 5.8c-.7.3-1.4.5-2.2.6.8-.5 1.3-1.2 1.6-2.1-.7.4-1.5.8-2.3.9-.7-.7-1.7-1.1-2.7-1.1-2.2 0-4 1.9-4 4.1 0 .3 0 .6.1.9-3.3-.2-6.3-1.8-8.3-4.2-.3.6-.5 1.2-.5 1.9 0 1.4.7 2.6 1.7 3.3-.6 0-1.2-.2-1.7-.5 0 2 1.4 3.7 3.2 4.1-.3.1-.7.1-1 .1-.2 0-.5 0-.7-.1.5 1.7 2.1 3 4 3-1.5 1.2-3.4 1.9-5.4 1.9H2c2 1.3 4.4 2 6.9 2 8.3 0 12.8-7 12.8-13.1v-.6c.9-.6 1.6-1.3 2.3-2.1z"/></svg>
            </a>
            <a href="#" class="rounded-md p-2 transition hover:bg-white/5" :style="{ color: COLORS.text }" aria-label="YouTube">
              <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M22.54 6.42a2.8 2.8 0 0 0-2-2C18.88 4 12 4 12 4s-6.88 0-8.54.42a2.8 2.8 0 0 0-2 2A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.8 2.8 0 0 0 2 2C5.12 20 12 20 12 20s6.88 0 8.54-.42a2.8 2.8 0 0 0 2-2A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><path d="M9.75 15.02 15.5 12 9.75 8.98v6.04z"/></svg>
            </a>
          </div>
        </div>
      </aside>
    </section>
  </div>
</template>

<style scoped>
/* Dark select dropdown/options (where supported) */
select { background-color:#0f0f0f; color:#e7e2d6; }
select option { background-color:#0f0f0f; color:#e7e2d6; }
</style>
