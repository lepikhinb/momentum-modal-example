import { createSSRApp, h } from "vue"
import { renderToString } from "@vue/server-renderer"
import { createInertiaApp } from "@inertiajs/inertia-vue3"
import createServer from "@inertiajs/server"
import { modal } from "momentum-modal"

function resolvePageComponent(name: string, pages: Record<string, any>) {
  for (const path in pages) {
    if (path.endsWith(`${name.replace(".", "/")}.vue`)) {
      return typeof pages[path] === "function" ? pages[path]() : pages[path]
    }
  }

  throw new Error(`Page not found: ${name}`)
}

createServer((page) =>
  createInertiaApp({
    page,
    render: renderToString,
    resolve: (name) => resolvePageComponent(name, import.meta.glob("./Pages/**/*.vue")),
    title: (title) => (title ? `${title} - Ping CRM` : "Ping CRM"),
    setup({ app, props, plugin }) {
      return createSSRApp({
        render: () => h(app, props),
      })
        .use(modal, {
          resolve: (name: string) => resolvePageComponent(name, import.meta.glob("./Pages/**/*.vue")),
        })
        .use(plugin)
    },
  })
)
