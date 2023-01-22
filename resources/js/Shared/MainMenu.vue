<template>
  <div>
    <div class="mb-4">
      <Link class="group flex items-center py-3" href="/">
        <icon
          name="dashboard"
          class="mr-2 h-4 w-4"
          :class="isUrl('') ? 'fill-white' : 'fill-indigo-400 group-hover:fill-white'" />
        <div :class="isUrl('') ? 'text-white' : 'text-indigo-300 group-hover:text-white'">Dashboard</div>
      </Link>
    </div>
    <div class="mb-4">
      <Link class="group flex items-center py-3" href="/organizations">
        <icon
          name="office"
          class="mr-2 h-4 w-4"
          :class="isUrl('organizations') ? 'fill-white' : 'fill-indigo-400 group-hover:fill-white'" />
        <div :class="isUrl('organizations') ? 'text-white' : 'text-indigo-300 group-hover:text-white'">Slideover</div>
      </Link>
    </div>
    <div class="mb-4">
      <Link class="group flex items-center py-3" href="/contacts">
        <icon
          name="users"
          class="mr-2 h-4 w-4"
          :class="isUrl('contacts') ? 'fill-white' : 'fill-indigo-400 group-hover:fill-white'" />
        <div :class="isUrl('contacts') ? 'text-white' : 'text-indigo-300 group-hover:text-white'">Modal</div>
      </Link>
    </div>
    <div class="mb-4">
      <Link class="group flex items-center py-3" href="/profile" preserve-scroll>
        <icon
          name="printer"
          class="mr-2 h-4 w-4"
          :class="isUrl('profile') ? 'fill-white' : 'fill-indigo-400 group-hover:fill-white'" />
        <div :class="isUrl('profile') ? 'text-white' : 'text-indigo-300 group-hover:text-white'">Profile</div>
      </Link>
    </div>
  </div>
</template>

<script>
import { Link } from "@inertiajs/vue3"
import Icon from "@/Shared/Icon.vue"

export default {
  components: {
    Icon,
    Link,
  },
  methods: {
    isUrl(...urls) {
      let currentUrl = this.$page.url.substr(1)
      if (urls[0] === "") {
        return currentUrl === ""
      }
      return urls.filter((url) => currentUrl.startsWith(url)).length
    },
  },
}
</script>
