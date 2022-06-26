import { App, Plugin, ref } from "vue"
import { Inertia } from "@inertiajs/inertia"
import { usePage } from "@inertiajs/inertia-vue3"
import { useToast } from "vue-toastification"

const { success, error } = useToast()

export const notifications: Plugin = {
  install(app: App) {
    Inertia.on("finish", (event) => {
      const { props } = usePage<{ flash?: { success: string; error: string } }>()

      if (props.value.flash?.success) {
        success(props.value.flash?.success)
      }

      if (props.value.flash?.error) {
        error(props.value.flash?.error)
      }
    })
  },
}
