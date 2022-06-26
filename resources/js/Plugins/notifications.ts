import { App, Plugin, ref } from "vue"
import { Inertia } from "@inertiajs/inertia"
import { usePage } from "@inertiajs/inertia-vue3"
import { useToast } from "vue-toastification"

const { success } = useToast()

export const notifications: Plugin = {
  install(app: App) {
    Inertia.on("finish", (event) => {
      const { props } = usePage<{ flash?: { success: string } }>()
      const flash = props.value.flash?.success

      if (flash) {
        success(flash)
      }
    })
  },
}
