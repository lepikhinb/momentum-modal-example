import { createApp, h } from "vue"
import { InertiaProgress } from "@inertiajs/progress"
import { createInertiaApp } from "@inertiajs/inertia-vue3"
import { notifications } from "./Plugins/notifications"
import Toast from "vue-toastification"
import { modal, ModalPluginOptions } from "momentum-modal"

import "vue-toastification/dist/index.css"
import "../css/app.css"

InertiaProgress.init()

function resolvePageComponent(name: string, pages: Record<string, any>) {
  for (const path in pages) {
    if (path.endsWith(`${name.replace(".", "/")}.vue`)) {
      return typeof pages[path] === "function" ? pages[path]() : pages[path]
    }
  }

  throw new Error(`Page not found: ${name}`)
}

createInertiaApp({
  resolve: (name) => resolvePageComponent(name, import.meta.glob("./Pages/**/*.vue")),
  title: (title) => (title ? `${title} - Ping CRM` : "Ping CRM"),
  setup({ el, app, props, plugin }) {
    createApp({ render: () => h(app, props) })
      .use(modal, {
        resolve: (name) => resolvePageComponent(name, import.meta.glob("./Pages/**/*.vue")),
      } as ModalPluginOptions)
      .use(Toast, { timeout: 2000 })
      .use(notifications)
      .use(plugin)
      .mount(el)
  },
})
