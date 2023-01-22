import { App, Plugin } from "vue"
import { usePage, router } from "@inertiajs/vue3"
import { useToast } from "vue-toastification"

const { success, error } = useToast()

export const notifications: Plugin = {
  install(app: App) {
    router.on("finish", (event) => {
      const { props } = usePage()

      if (props.flash?.success) {
        success(props.flash?.success)
      }

      if (props.flash?.error) {
        error(props.flash?.error)
      }
    })
  },
}
