import "@inertiajs/vue3"
import { Page } from "@inertiajs/core"

interface PageProps {
  flash?: { success: string; error: string }
  auth: any
}

declare module "@inertiajs/vue3" {
  export function usePage(): Page<PageProps>
}

export {}
