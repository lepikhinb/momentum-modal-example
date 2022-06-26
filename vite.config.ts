import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import laravel from 'vite-plugin-laravel'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'
import nesting from 'tailwindcss/nesting';

export default defineConfig({
  plugins: [
    vue(),
    laravel({
      postcss: [nesting(), tailwindcss(), autoprefixer()],
    }),
  ],
})
