<script lang="ts" setup>
import { Head, useForm } from "@inertiajs/vue3"
import TextInput from "@/Shared/TextInput.vue"
import SelectInput from "@/Shared/SelectInput.vue"
import LoadingButton from "@/Shared/LoadingButton.vue"
import Slideover from "@/Shared/Slideover.vue"

const form = useForm({
  name: null,
  email: null,
  phone: null,
  address: null,
  city: null,
  region: null,
  country: null,
  postal_code: null,
})

const store = () => {
  form.post("/organizations", {
    preserveScroll: true,
  })
}
</script>

<template>
  <Slideover>
    <Head title="Create Organization" />
    <template #title> Create Organization </template>
    <form class="'mt-6'" @submit.prevent="store">
      <div class="grid grid-cols-2 gap-x-6 gap-y-8">
        <text-input v-model="form.name" :error="form.errors.name" label="Name" />
        <text-input v-model="form.email" :error="form.errors.email" label="Email" />
        <text-input v-model="form.phone" :error="form.errors.phone" label="Phone" />
        <text-input v-model="form.address" :error="form.errors.address" label="Address" />
        <text-input v-model="form.city" :error="form.errors.city" label="City" />
        <text-input v-model="form.region" :error="form.errors.region" label="Province/State" />
        <select-input v-model="form.country" :error="form.errors.country" label="Country">
          <option :value="null" />
          <option value="CA">Canada</option>
          <option value="US">United States</option>
        </select-input>
        <text-input v-model="form.postal_code" :error="form.errors.postal_code" label="Postal code" />
      </div>
      <div class="mt-6 flex justify-between">
        <loading-button :loading="form.processing" class="btn-indigo ml-auto" type="submit">
          Create Organization
        </loading-button>
      </div>
    </form>
  </Slideover>
</template>
