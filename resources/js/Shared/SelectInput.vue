<script lang="ts" setup>
import { v4 as uuid } from "uuid"
import { ref, useAttrs, watch } from "vue"

const attrs = useAttrs()

const props = withDefaults(
  defineProps<{
    id?: string
    error?: string
    label?: string
    modelValue: string | number | boolean | null
  }>(),
  {
    id: `select-input-${uuid()}`,
  }
)

const emit = defineEmits(["update:modelValue"])
const selected = ref(props.modelValue)
watch(
  () => selected.value,
  () => emit("update:modelValue", selected.value)
)

const input = ref()

const focus = () => {
  input.value.focus()
}

const select = () => {
  input.value.select()
}

defineExpose({ focus, select })
</script>

<template>
  <div :class="attrs.class">
    <label v-if="label" class="form-label" :for="id">{{ label }}:</label>
    <select
      :id="id"
      ref="input"
      v-model="selected"
      v-bind="{ ...attrs, class: null }"
      class="form-select"
      :class="{ error: error }">
      <slot />
    </select>
    <div v-if="error" class="form-error">{{ error }}</div>
  </div>
</template>
