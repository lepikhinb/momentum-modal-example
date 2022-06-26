<script lang="ts" setup>
import { Head, useForm } from "@inertiajs/inertia-vue3"
import TextInput from "@/Shared/TextInput.vue"
import SelectInput from "@/Shared/SelectInput.vue"
import LoadingButton from "@/Shared/LoadingButton.vue"
import Modal from "@/Shared/Modal.vue"

defineProps<{ organizations: any[] }>()
const form = useForm({
  first_name: "",
  last_name: "",
  organization_id: null,
  email: "",
  phone: "",
  address: "",
  city: "",
  region: "",
  country: "",
  postal_code: "",
})

const store = () => {
  form.post("/contacts", {
    preserveScroll: true,
  })
}
</script>

<template>
  <Modal>
    <Head title="Create Contact" />

    <template #title> Create Contact </template>

    <form class="mt-6" @submit.prevent="store">
      <div class="grid grid-cols-2 gap-x-6 gap-y-8">
        <text-input v-model="form.first_name" :error="form.errors.first_name" label="First name" />
        <text-input v-model="form.last_name" :error="form.errors.last_name" label="Last name" />
        <select-input v-model="form.organization_id" :error="form.errors.organization_id" label="Organization">
          <option :value="null" />
          <option v-for="organization in organizations" :key="organization.id" :value="organization.id">
            {{ organization.name }}
          </option>
        </select-input>
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
        <loading-button :loading="form.processing" class="btn-indigo" type="submit">Create Contact</loading-button>
      </div>
    </form>
  </Modal>
</template>
