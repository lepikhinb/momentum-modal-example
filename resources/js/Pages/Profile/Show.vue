<script lang="ts" setup>
import { Head, Link, useForm } from "@inertiajs/inertia-vue3"
import TextInput from "@/Shared/TextInput.vue"
import FileInput from "@/Shared/FileInput.vue"
import SelectInput from "@/Shared/SelectInput.vue"
import LoadingButton from "@/Shared/LoadingButton.vue"
import Modal from "@/Shared/Modal.vue"

const props = defineProps<{ user: Record<string, any> }>()
const form = useForm({
  _method: "put",
  first_name: props.user.first_name,
  last_name: props.user.last_name,
  email: props.user.email,
  password: "",
  owner: props.user.owner,
  photo: null,
})

const update = () =>
  form.post(`/profile`, {
    onSuccess: () => form.reset("password", "photo"),
    preserveScroll: true,
  })
</script>

<template>
  <Modal>
    <Head :title="`${form.first_name} ${form.last_name}`" />

    <template #title> Profile </template>

    <form class="mt-6" @submit.prevent="update">
      <div class="grid grid-cols-2 gap-x-6 gap-y-8">
        <text-input v-model="form.first_name" :error="form.errors.first_name" label="First name" />
        <text-input v-model="form.last_name" :error="form.errors.last_name" label="Last name" />
        <text-input v-model="form.email" :error="form.errors.email" label="Email" />
        <text-input
          v-model="form.password"
          :error="form.errors.password"
          type="password"
          autocomplete="new-password"
          label="Password" />
      </div>
      <div class="mt-6 flex justify-between">
        <loading-button :loading="form.processing" class="btn-indigo ml-auto" type="submit">Update</loading-button>
      </div>
    </form>
  </Modal>
</template>
