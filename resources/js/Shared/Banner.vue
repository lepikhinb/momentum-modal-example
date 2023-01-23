<script setup lang="ts">
import { ref } from "vue"

const show = ref(!localStorage.getItem("hide-banner"))

const hide = () => {
  show.value = false

  localStorage.setItem("hide-banner", "1")
}
</script>

<template>
  <div v-if="show" class="relative bg-[#ffcd62]">
    <div class="mx-auto max-w-7xl py-3 px-3 sm:px-6 lg:px-8">
      <div class="pr-16 sm:px-16 sm:text-center">
        <p class="text-sm font-medium text-black">
          <span class="font-semibold">Advanced Inertia</span> is out now! Take your Inertia.js skills to the next level.
          <span class="block sm:ml-2 sm:inline-block">
            <a href="#" class="font-bold text-black underline">
              Learn more
              <span aria-hidden="true"> →</span>
            </a>
          </span>
        </p>
      </div>
      <div class="absolute inset-y-0 right-0 flex items-start pt-1 pr-1 sm:items-center sm:pt-0 sm:pr-2">
        <button type="button" class="flex rounded-md p-2 transition hover:bg-black/5 focus:outline-none" @click="hide">
          <span class="sr-only">Dismiss</span>
          <svg
            class="h-4 w-4 text-black"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>
