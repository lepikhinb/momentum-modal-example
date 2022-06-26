<script lang="ts" setup>
import { Head, useForm } from "@inertiajs/inertia-vue3"
import TextInput from "@/Shared/TextInput.vue"
import SelectInput from "@/Shared/SelectInput.vue"
import LoadingButton from "@/Shared/LoadingButton.vue"
import TrashedMessage from "@/Shared/TrashedMessage.vue"
import { Inertia } from "@inertiajs/inertia"
import Modal from "@/Shared/Modal.vue"

const props = defineProps<{ contact: Record<string, any>; organizations: any[] }>()
const form = useForm({
  first_name: props.contact.first_name,
  last_name: props.contact.last_name,
  organization_id: props.contact.organization_id,
  email: props.contact.email,
  phone: props.contact.phone,
  address: props.contact.address,
  city: props.contact.city,
  region: props.contact.region,
  country: props.contact.country,
  postal_code: props.contact.postal_code,
})

const update = () => {
  form.put(`/contacts/${props.contact.id}`, {
    preserveScroll: true,
  })
}

const destroy = () => {
  if (confirm("Are you sure you want to delete this contact?")) {
    Inertia.delete(`/contacts/${props.contact.id}`, {
      preserveScroll: true,
    })
  }
}

const restore = () => {
  if (confirm("Are you sure you want to restore this contact?")) {
    Inertia.put(
      `/contacts/${props.contact.id}/restore`,
      {},
      {
        preserveScroll: true,
      }
    )
  }
}
</script>

<template>
  <Modal>
    <Head v-once :title="`${form.first_name} ${form.last_name}`" />

    <template #title> Edit Contact </template>

    <form class="mt-6" @submit.prevent="update">
      <trashed-message v-if="contact.deleted_at" class="mb-6" @restore="restore">
        This contact has been deleted.
      </trashed-message>

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
        <button
          v-if="!contact.deleted_at"
          class="text-red-600 hover:underline"
          tabindex="-1"
          type="button"
          @click="destroy">
          Delete Contact
        </button>
        <loading-button :loading="form.processing" class="btn-indigo ml-auto" type="submit"
          >Update Contact</loading-button
        >
      </div>
    </form>
  </Modal>
</template>
