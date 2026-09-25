/// <reference types="vite/client" />

declare module 'lucide-react' {
  import type { ComponentType, SVGProps } from 'react'

  export const CheckCircle2: ComponentType<SVGProps<SVGSVGElement>>
  export const Layers3: ComponentType<SVGProps<SVGSVGElement>>
  export const ShieldCheck: ComponentType<SVGProps<SVGSVGElement>>
}

declare module '@tanstack/router-plugin/vite' {
  export function tanstackRouter(
    options?: Record<string, unknown>,
  ): import('vite').PluginOption
}

declare module '@tanstack/query-core' {
  export class QueryClient {
    constructor(config?: Record<string, unknown>)
  }
}
