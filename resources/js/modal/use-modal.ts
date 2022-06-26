import { usePage } from "@inertiajs/inertia-vue3"
import { Inertia } from "@inertiajs/inertia"
import { computed, ref, shallowRef } from "@vue/reactivity"
import { defineAsyncComponent, h, nextTick, watch } from "vue"
import axios from "axios"
import resolver from "./resolver"

interface Modal {
  component: string
  baseURL: string
  redirectURL: string | null
  props: Record<string, any>
  key: string
  nonce: string
}

const response = usePage<{ modal: Modal }>().props
const modal = computed(() => response.value?.modal)
const props = computed(() => modal.value?.props)

const componentName = ref()
const component = shallowRef()
const show = ref(false)
const key = computed(() => modal.value?.key)
const vnode = ref()

// Inertia preserves props on the Page object
// even if they are not present on the current response
// when `only` persists on the request
// so we have the `nonce`, which should be unique for every request
const nonce = ref()

const setHeaders = (values: Record<string, string | null>) => {
  Object.entries(values).forEach(([key, value]) =>
    ["post", "put", "patch", "delete"].forEach((method) => {
      axios.defaults.headers[method][key] = value
    })
  )
}

const resetHeaders = () =>
  setHeaders({
    "X-Inertia-Modal-Key": null,
    "X-Inertia-Modal-Redirect": null,
  })

const updateHeaders = () =>
  setHeaders({
    "X-Inertia-Modal-Key": key.value,
    "X-Inertia-Modal-Redirect": modal.value?.redirectURL,
  })

const close = (shouldRedirect: boolean = false) => {
  show.value = false

  resetHeaders()

  if (shouldRedirect) {
    redirect()
  }
}

const resolveComponent = () => {
  if (nonce.value == modal.value?.nonce || !modal.value?.component) {
    return close()
  }

  if (componentName.value != modal.value?.component) {
    componentName.value = modal.value.component

    if (componentName.value) {
      component.value = defineAsyncComponent(() => resolver.resolve(componentName.value))
    } else {
      component.value = false
    }
  }

  nonce.value = modal.value?.nonce
  vnode.value = component.value
    ? h(component.value, {
        key: key.value,
        ...props.value,
      })
    : ""

  nextTick(() => (show.value = true))
}

resolveComponent()

watch(() => modal, resolveComponent, { deep: true })
watch(() => key.value, updateHeaders)

const redirect = () => {
  var redirectURL = modal.value?.redirectURL ?? modal.value?.baseURL

  if (!redirectURL) {
    return
  }

  return Inertia.visit(redirectURL, {
    preserveScroll: true,
    preserveState: true,
  })
}

export const useModal = () => {
  return {
    show,
    vnode,
    close,
    redirect,
  }
}
