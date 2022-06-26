<script lang="ts" setup>
import { Link } from "@inertiajs/inertia-vue3"

defineProps<{ links: any[] }>()
</script>

<template>
  <div v-if="links.length > 3">
    <div class="-mb-1 flex flex-wrap">
      <template v-for="(link, key) in links">
        <div
          v-if="link.url === null"
          :key="key"
          class="mb-1 mr-1 rounded border px-4 py-3 text-sm leading-4 text-gray-400"
          v-html="link.label" />
        <Link
          v-else
          :key="`link-${key}`"
          class="mb-1 mr-1 rounded border px-4 py-3 text-sm leading-4 hover:bg-white focus:border-indigo-500 focus:text-indigo-500"
          :class="{ 'bg-white': link.active }"
          :href="link.url"
          v-html="link.label" />
      </template>
    </div>
  </div>
</template>
