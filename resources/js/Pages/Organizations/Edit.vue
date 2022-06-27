<script lang="ts" setup>
import { Head, useForm } from "@inertiajs/inertia-vue3"
import TextInput from "@/Shared/TextInput.vue"
import SelectInput from "@/Shared/SelectInput.vue"
import LoadingButton from "@/Shared/LoadingButton.vue"
import TrashedMessage from "@/Shared/TrashedMessage.vue"
import { Inertia } from "@inertiajs/inertia"
import Slideover from "@/Shared/Slideover.vue"

const props = defineProps<{ organization: Record<string, any> }>()
const form = useForm({
  name: props.organization.name,
  email: props.organization.email,
  phone: props.organization.phone,
  address: props.organization.address,
  city: props.organization.city,
  region: props.organization.region,
  country: props.organization.country,
  postal_code: props.organization.postal_code,
})

const update = () => {
  form.put(`/organizations/${props.organization.id}`, {
    preserveScroll: true,
  })
}

const destroy = () => {
  if (confirm("Are you sure you want to delete this organization?")) {
    Inertia.delete(`/organizations/${props.organization.id}`)
  }
}

const restore = () => {
  if (confirm("Are you sure you want to restore this organization?")) {
    Inertia.put(`/organizations/${props.organization.id}/restore`)
  }
}
</script>

<template>
  <Slideover>
    <Head :title="form.name" />
    <template #title> Edit Organization </template>

    <form class="mt-6" @submit.prevent="update">
      <trashed-message v-if="organization.deleted_at" class="mb-6" @restore="restore">
        This organization has been deleted.
      </trashed-message>

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
        <button
          v-if="!organization.deleted_at"
          class="text-red-600 hover:underline"
          tabindex="-1"
          type="button"
          @click="destroy">
          Delete Organization
        </button>
        <loading-button :loading="form.processing" class="btn-indigo ml-auto" type="submit">Update</loading-button>
      </div>
    </form>
  </Slideover>
</template>
