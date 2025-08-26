<script setup>
import { ref, h, computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
// import { useCart } from '@/stores/cart' // if you don't have it yet, comment this line + the uses below

const cart = (() => { try { return useCart() } catch { return { count: 0 } } })()

const open = ref(false)
const toggle = () => (open.value = !open.value)
const close = () => (open.value = false)

const route = useRoute()
const cartCount = computed(() => (typeof cart.count === 'number' ? cart.count : 0))

/** Reusable NavLink with animated underline + active color */
const NavLink = (props, { emit }) => {
  const isActive = route.path === props.to
  const base =
    'group relative inline-flex items-center ' +
    (props.block ? 'w-full py-2 px-2 rounded-lg hover:bg-bat-grey/40 ' : '')

  const textColor = isActive
    ? (props.pink ? 'text-bat-pink' : 'text-bat-red')
    : 'text-bat-lightgrey'

  const hoverColor = props.pink ? 'group-hover:text-bat-pink' : 'group-hover:text-bat-red'
  const underlineColor = props.pink ? 'bg-bat-pink' : 'bg-bat-red'

  return h(
    RouterLink,
    {
      to: props.to,
      class: `${base} ${textColor} ${hoverColor} transition-colors duration-150`,
      onClick: () => emit?.('click'),
    },
    {
      default: () => [
        h('span', { class: 'relative' }, [
          props.label,
          h('span', {
            class:
              `pointer-events-none absolute -bottom-1 left-0 h-0.5 ${underlineColor} w-full origin-left ` +
              `${isActive ? 'scale-x-100' : 'scale-x-0'} group-hover:scale-x-100 transition-transform duration-200`,
          }),
        ]),
      ],
    }
  )
}
NavLink.props = {
  to: { type: String, required: true },
  label: { type: String, required: true },
  pink: { type: Boolean, default: false },
  block: { type: Boolean, default: false },
}
</script>

<template>
  <nav
    class="sticky top-0 z-50 bg-bat-dark/90 backdrop-blur border-b border-bat-grey/70 text-bat-lightgrey shadow-[0_6px_20px_rgba(0,0,0,0.35)]"
  >
    <div class="max-w-7xl mx-auto px-4">
      <div class="grid grid-cols-12 items-center h-16 gap-3">
        <!-- Left: Logo -->
        <div class="col-span-6 md:col-span-3 flex items-center">
          <RouterLink to="/" class="flex items-center gap-2" @click="close">
            <span class="h-9 w-9 rounded-full bg-bat-pink shadow-[0_0_14px_rgba(255,46,136,.6)]"></span>
            <span class="hidden sm:inline text-lg font-bold text-bat-pink">Gotham</span>
          </RouterLink>
        </div>

        <!-- Center: Desktop nav -->
        <div class="hidden md:flex col-span-6 items-center justify-center gap-8">
          <NavLink to="/" label="Home" />
          <NavLink to="/shop" label="Shop" pink />
          <NavLink to="/cart" label="Cart" />
        </div>

        <!-- Right: Search + CTAs (desktop) / Burger (mobile) -->
        <div class="col-span-6 md:col-span-3 flex items-center justify-end gap-3">
          <!-- Search (desktop) -->
          <div class="hidden lg:flex items-center gap-2">
            <div class="relative">
              <input
                type="text"
                placeholder="Search"
                class="w-44 xl:w-56 rounded-lg border border-bat-grey bg-bat-black/70 placeholder-bat-lightgrey/50
                       px-3 py-2 outline-none focus:ring-2 focus:ring-bat-pink focus:border-bat-pink transition"
              />
              <svg class="absolute right-2 top-2.5 h-4 w-4 text-bat-lightgrey/70" viewBox="0 0 24 24" fill="none"
                   stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="11" cy="11" r="7"></circle><path d="M21 21l-4.3-4.3"></path>
              </svg>
            </div>
          </div>

          <!-- Sign in -->
          <RouterLink
            to="/signin"
            class="hidden md:inline-flex items-center justify-center rounded-lg border border-bat-grey px-3 py-2
                   hover:bg-bat-grey/40 transition text-sm"
          >
            Sign in
          </RouterLink>

          <!-- Cart button with badge -->
          <RouterLink
            to="/cart"
            class="relative inline-flex items-center justify-center rounded-lg border border-bat-grey p-2
                   hover:bg-bat-grey/40 transition"
            aria-label="Cart"
          >
            <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 12.39a2 2 0 0 0 2 1.61h7.72a2 2 0 0 0 2-1.61L21 6H6"></path>
            </svg>
            <span
              v-if="cartCount > 0"
              class="absolute -top-1 -right-1 rounded-full bg-bat-red text-white text-[10px] font-semibold px-1.5 py-0.5
                     shadow-[0_0_10px_rgba(255,23,68,.6)]"
            >
              {{ cartCount }}
            </span>
          </RouterLink>

          <!-- Burger -->
          <button
            class="md:hidden inline-flex items-center justify-center rounded-lg p-2 hover:bg-bat-grey/50 transition"
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

    <!-- Mobile menu -->
    <transition
      enter-active-class="duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div v-show="open" id="mobile-menu" class="md:hidden border-t border-bat-grey/60">
        <div class="px-4 py-3 space-y-3">
          <div class="relative">
            <input
              type="text"
              placeholder="Search"
              class="w-full rounded-lg border border-bat-grey bg-bat-black/70 placeholder-bat-lightgrey/50
                     px-3 py-2 outline-none focus:ring-2 focus:ring-bat-pink focus:border-bat-pink transition"
            />
            <svg class="absolute right-2 top-2.5 h-4 w-4 text-bat-lightgrey/70" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="7"></circle><path d="M21 21l-4.3-4.3"></path>
            </svg>
          </div>

          <div class="pt-1 space-y-1">
            <NavLink to="/" label="Home" block @click.native="close" />
            <NavLink to="/shop" label="Shop" pink block @click.native="close" />
            <NavLink to="/cart" label="Cart" block @click.native="close" />
          </div>

          <div class="pt-2 flex items-center gap-2">
            <RouterLink
              to="/signin"
              class="inline-flex flex-1 items-center justify-center rounded-lg border border-bat-grey px-3 py-2
                     hover:bg-bat-grey/40 transition text-sm"
              @click="close"
            >
              Sign in
            </RouterLink>

            <RouterLink
              to="/cart"
              class="relative inline-flex items-center justify-center rounded-lg border border-bat-grey p-2
                     hover:bg-bat-grey/40 transition"
              @click="close"
            >
              <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none"
                   stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 12.39a2 2 0 0 0 2 1.61h7.72a2 2 0 0 0 2-1.61L21 6H6"></path>
              </svg>
              <span
                v-if="cartCount > 0"
                class="absolute -top-1 -right-1 rounded-full bg-bat-red text-white text-[10px] font-semibold px-1.5 py-0.5
                       shadow-[0_0_10px_rgba(255,23,68,.6)]"
              >
                {{ cartCount }}
              </span>
            </RouterLink>
          </div>
        </div>
      </div>
    </transition>
  </nav>
</template>

<style scoped>
.group span > span { transform-origin: left; }
</style>
