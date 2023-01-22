import { createSSRApp, h } from "vue"
import { renderToString } from "@vue/server-renderer"
import { createInertiaApp } from "@inertiajs/vue3"
/** @ts-expect-error */
import createServer from "@inertiajs/vue3/server"

function resolvePageComponent(name: string, pages: Record<string, any>) {
  for (const path in pages) {
    if (path.endsWith(`${name.replace(".", "/")}.vue`)) {
      return typeof pages[path] === "function" ? pages[path]() : pages[path]
    }
  }

  throw new Error(`Page not found: ${name}`)
}

createServer((page: any) =>
  createInertiaApp({
    page,
    render: renderToString,
    resolve: (name) => resolvePageComponent(name, import.meta.glob("./Pages/**/*.vue")),
    title: (title) => (title ? `${title} - Ping CRM` : "Ping CRM"),
    setup({ App, props, plugin }) {
      return createSSRApp({
        render: () => h(App, props),
      }).use(plugin)
    },
  })
)
