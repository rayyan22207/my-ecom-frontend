<script setup>
import { ref, h, computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

// Optional cart store (safe fallback if Pinia store not wired yet)
const cart = (() => { try { return useCart() } catch { return { count: 0 } } })()

const open = ref(false)
const toggle = () => (open.value = !open.value)
const close  = () => (open.value = false)

const route = useRoute()
const cartCount = computed(() => (typeof cart.count === 'number' ? cart.count : 0))

// Luxe palette
const COLORS = {
  bg:        '#0b0b0b',
  panel:     '#0f0f0f',
  gold:      '#d6bf8e',
  goldSoft:  '#bfa36e',
  text:      '#e7e2d6',
  textDim:   '#b8b3a6'
}

/** Reusable NavLink: subtle gold underline, active => gold text */
const NavLink = (props, { emit }) => {
  const isActive = props.exact ? route.path === props.to : route.path.startsWith(props.to)

  const base =
    'group relative inline-flex items-center font-medium tracking-wide ' +
    (props.block ? 'w-full py-2 px-2 rounded-md hover:bg-white/5 ' : '')

  const textColor  = isActive ? 'text-[var(--gold)]' : 'text-[var(--textDim)]'
  const hoverColor = 'group-hover:text-[var(--gold)]'

  return h(
    RouterLink,
    {
      to: props.to,
      class: `${base} ${textColor} ${hoverColor} transition-colors duration-150`,
      onClick: () => emit?.('click'),
      style: { '--gold': COLORS.gold, '--textDim': COLORS.textDim }
    },
    {
      default: () => [
        h('span', { class: 'relative' }, [
          props.label,
          h('span', {
            class:
              'pointer-events-none absolute -bottom-[6px] left-0 h-[1px] w-full ' +
              'origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-200',
            style: {
              background: isActive
                ? `linear-gradient(90deg, ${COLORS.gold}, ${COLORS.goldSoft})`
                : `linear-gradient(90deg, transparent, ${COLORS.goldSoft})`,
              transform: isActive ? 'scaleX(1)' : undefined
            }
          })
        ])
      ]
    }
  )
}
NavLink.props = {
  to: { type: String, required: true },
  label: { type: String, required: true },
  block: { type: Boolean, default: false },
  exact: { type: Boolean, default: false }
}
</script>

<template>
  <nav
    class="sticky top-0 z-50 border-b backdrop-blur overflow-hidden"
    :style="{
      background: 'rgba(11,11,11,0.86)',
      borderColor: 'rgba(191,163,110,0.28)',
      boxShadow: '0 8px 22px rgba(0,0,0,.35)'
    }"
  >
    <!-- thin top hairline -->
    <div class="h-[1px] w-full" :style="{ background: 'rgba(191,163,110,0.18)' }"></div>

    <div class="mx-auto max-w-7xl px-4">
      <div class="grid h-16 grid-cols-12 items-center gap-3">
        <!-- Left: Logo & Brand (mobile-safe) -->
        <div class="col-span-6 md:col-span-3 flex min-w-0 items-center">
          <RouterLink to="/" class="flex items-center gap-3" @click="close" aria-label="Home">
            <span class="relative inline-flex items-center justify-center">
              <span class="h-2.5 w-2.5 rounded-full" :style="{ background: COLORS.gold }"></span>
            </span>

            <!-- Mobile brand (short) -->
            <span
              class="sm:hidden text-base font-semibold leading-none whitespace-nowrap truncate max-w-[56vw]"
              :style="{
                color: COLORS.text,
                fontFamily: 'ui-serif, Georgia, Cambria, Times New Roman, Times, serif',
                letterSpacing: '0.3px'
              }"
            >
              Gotham
            </span>

            <!-- Desktop brand (full) -->
            <span
              class="hidden sm:inline text-lg font-semibold leading-none"
              :style="{
                color: COLORS.text,
                fontFamily: 'ui-serif, Georgia, Cambria, Times New Roman, Times, serif',
                letterSpacing: '0.5px'
              }"
            >
              Gotham
            </span>
          </RouterLink>
        </div>

        <!-- Center: Desktop nav -->
        <div class="col-span-6 hidden items-center justify-center gap-8 md:flex">
          <NavLink to="/" label="Home" exact />
          <NavLink to="/shop" label="Shop" />
          <NavLink to="/about" label="About" />
          <NavLink to="/faq" label="FAQ" />
          <NavLink to="/contact" label="Contact" />
        </div>

        <!-- Right: Cart + Burger -->
        <div class="col-span-6 md:col-span-3 flex items-center justify-end gap-3">
          <!-- Cart -->
          <RouterLink
            to="/cart"
            class="relative inline-flex items-center justify-center rounded-md p-2 transition"
            :style="{ border: '1px solid rgba(191,163,110,0.25)' }"
            aria-label="Cart"
          >
            <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" stroke-width="1.6"
                 stroke-linecap="round" stroke-linejoin="round"
                 :style="{ color: COLORS.text }">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 12.39a2 2 0 0 0 2 1.61h7.72a2 2 0 0 0 2-1.61L21 6H6"></path>
            </svg>
            <span
              v-if="cartCount > 0"
              class="absolute -right-1 -top-1 rounded-full px-1.5 py-0.5 text-[10px] font-semibold text-black"
              :style="{ background: COLORS.gold, boxShadow: '0 0 10px rgba(214,191,142,.55)' }"
            >
              {{ cartCount }}
            </span>
          </RouterLink>

          <!-- Burger -->
          <button
            class="md:hidden inline-flex items-center justify-center rounded-md p-2 transition"
            :style="{ color: COLORS.text, background: 'transparent' }"
            :aria-expanded="open.toString()" aria-controls="mobile-menu" @click="toggle"
          >
            <svg v-if="!open" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                 class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="1.6"
                 stroke-linecap="round" stroke-linejoin="round">
              <path d="M3 6h18M3 12h18M3 18h18"/>
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                 class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="1.6"
                 stroke-linecap="round" stroke-linejoin="round">
              <path d="M6 6l12 12M6 18L18 6"/>
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile drawer -->
    <transition
      enter-active-class="duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div
        v-show="open"
        id="mobile-menu"
        class="md:hidden border-t"
        :style="{ borderColor: 'rgba(191,163,110,0.28)' }"
      >
        <div class="space-y-3 px-4 py-3">
          <div class="relative">
            <input
              type="text"
              placeholder="Search"
              class="w-full rounded-md border bg-transparent px-3 py-2 outline-none transition"
              :style="{
                borderColor: 'rgba(191,163,110,0.25)',
                color: COLORS.text,
                caretColor: COLORS.gold,
                boxShadow: 'inset 0 0 0 9999px rgba(255,255,255,0.02)'
              }"
            />
            <svg class="pointer-events-none absolute right-2 top-2.5 h-4 w-4"
                 viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"
                 stroke-linecap="round" stroke-linejoin="round"
                 :style="{ color: 'rgba(232,226,214,0.65)' }">
              <circle cx="11" cy="11" r="7"></circle><path d="M21 21l-4.3-4.3"></path>
            </svg>
          </div>

          <div class="space-y-1 pt-1">
            <NavLink to="/" label="Home" block exact @click.native="close" />
            <NavLink to="/shop" label="Shop" block @click.native="close" />
            <NavLink to="/about" label="About" block @click.native="close" />
            <NavLink to="/faq" label="FAQ" block @click.native="close" />
            <NavLink to="/contact" label="Contact" block @click.native="close" />
          </div>

          <div class="flex items-center gap-2 pt-2">
            <RouterLink
              to="/cart"
              class="relative inline-flex items-center justify-center rounded-md p-2 transition"
              :style="{ border: '1px solid rgba(191,163,110,0.25)' }"
              @click="close"
            >
              <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none"
                   stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"
                   :style="{ color: COLORS.text }">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 12.39a2 2 0 0 0 2 1.61h7.72a2 2 0 0 0 2-1.61L21 6H6"></path>
              </svg>
              <span
                v-if="cartCount > 0"
                class="absolute -right-1 -top-1 rounded-full px-1.5 py-0.5 text-[10px] font-semibold text-black"
                :style="{ background: COLORS.gold, boxShadow: '0 0 10px rgba(214,191,142,.55)' }"
              >
                {{ cartCount }}
              </span>
            </RouterLink>
          </div>
        </div>
      </div>
    </transition>

    <!-- thin bottom hairline -->
    <div class="h-[1px] w-full" :style="{ background: 'rgba(191,163,110,0.18)' }"></div>
  </nav>
</template>

<style scoped>
/* underline anim from left */
.group span > span { transform-origin: left; }
</style>
