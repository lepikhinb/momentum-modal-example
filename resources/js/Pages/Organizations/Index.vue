<template>
  <div>
    <Head title="Organizations" />
    <h1 class="mb-8 text-3xl font-bold">Organizations</h1>
    <div class="mb-6 flex items-center justify-between">
      <search-filter v-model="form.search" class="mr-4 w-full max-w-md" @reset="reset">
        <label class="block text-gray-700">Trashed:</label>
        <select v-model="form.trashed" class="form-select mt-1 w-full">
          <option :value="null" />
          <option value="with">With Trashed</option>
          <option value="only">Only Trashed</option>
        </select>
      </search-filter>
      <Link class="btn-indigo" href="/organizations/create">
        <span>Create</span>
        <span class="hidden md:inline">&nbsp;Organization</span>
      </Link>
    </div>
    <div class="overflow-x-auto rounded-md bg-white shadow">
      <table class="w-full whitespace-nowrap">
        <thead>
          <tr class="text-left font-bold">
            <th class="px-6 pb-4 pt-6">Name</th>
            <th class="px-6 pb-4 pt-6">City</th>
            <th class="px-6 pb-4 pt-6" colspan="2">Phone</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="organization in organizations.data"
            :key="organization.id"
            class="focus-within:bg-gray-100 hover:bg-gray-100">
            <td class="border-t">
              <Link
                class="flex items-center px-6 py-4 focus:text-indigo-500"
                :href="`/organizations/${organization.id}/edit`"
                preserve-scroll>
                {{ organization.name }}
                <icon v-if="organization.deleted_at" name="trash" class="ml-2 h-3 w-3 flex-shrink-0 fill-gray-400" />
              </Link>
            </td>
            <td class="border-t">
              <Link
                class="flex items-center px-6 py-4"
                :href="`/organizations/${organization.id}/edit`"
                tabindex="-1"
                preserve-scroll>
                {{ organization.city }}
              </Link>
            </td>
            <td class="border-t">
              <Link
                class="flex items-center px-6 py-4"
                :href="`/organizations/${organization.id}/edit`"
                tabindex="-1"
                preserve-scroll>
                {{ organization.phone }}
              </Link>
            </td>
            <td class="w-px border-t">
              <Link
                class="flex items-center px-4"
                :href="`/organizations/${organization.id}/edit`"
                tabindex="-1"
                preserve-scroll>
                <icon name="cheveron-right" class="block h-6 w-6 fill-gray-400" />
              </Link>
            </td>
          </tr>
          <tr v-if="organizations.data.length === 0">
            <td class="border-t px-6 py-4" colspan="4">No organizations found.</td>
          </tr>
        </tbody>
      </table>
    </div>
    <pagination class="mt-6" :links="organizations.links" />
  </div>
</template>

<script>
import { Head, Link } from "@inertiajs/vue3"
import Icon from "@/Shared/Icon.vue"
import pickBy from "lodash/pickBy"
import Layout from "@/Shared/Layout.vue"
import throttle from "lodash/throttle"
import mapValues from "lodash/mapValues"
import Pagination from "@/Shared/Pagination.vue"
import SearchFilter from "@/Shared/SearchFilter.vue"

export default {
  components: {
    Head,
    Icon,
    Link,
    Pagination,
    SearchFilter,
  },
  layout: Layout,
  props: {
    filters: Object,
    organizations: Object,
  },
  data() {
    return {
      form: {
        search: this.filters.search,
        trashed: this.filters.trashed,
      },
    }
  },
  watch: {
    form: {
      deep: true,
      handler: throttle(function () {
        this.$inertia.get("/organizations", pickBy(this.form), { preserveState: true })
      }, 150),
    },
  },
  methods: {
    reset() {
      this.form = mapValues(this.form, () => null)
    },
  },
}
</script>
