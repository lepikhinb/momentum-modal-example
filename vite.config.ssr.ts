import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import laravel from "vite-plugin-laravel"
import tailwindcss from "tailwindcss"
import autoprefixer from "autoprefixer"
import nesting from "tailwindcss/nesting"

export default defineConfig({
  build: {
    ssr: true,
    target: "node17",
    outDir: "public/ssr",
    rollupOptions: {
      input: "resources/js/ssr.ts",
    },
  },
  plugins: [
    vue(),
    laravel({
      postcss: [nesting(), tailwindcss(), autoprefixer()],
    }),
  ],
})
