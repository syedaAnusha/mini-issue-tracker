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

declare module 'react-hook-form' {
  export interface FieldError {
    type: string
    message?: string
  }

  export type Resolver<TFieldValues> = (values: TFieldValues) =>
    | Promise<{
        values: Partial<TFieldValues>
        errors: Record<string, FieldError>
      }>
    | {
        values: Partial<TFieldValues>
        errors: Record<string, FieldError>
      }

  export function useForm<
    TFieldValues extends Record<string, unknown>,
  >(options: {
    resolver: Resolver<TFieldValues>
    mode?: 'onChange' | 'onBlur' | 'onSubmit'
  }): {
    register: (name: keyof TFieldValues & string) => {
      name: string
      onChange: (event: { target: { value: string } }) => void
      onBlur: () => void
      ref: (element: HTMLInputElement | null) => void
    }
    handleSubmit: (
      onValid: (values: TFieldValues) => void,
    ) => (event?: { preventDefault: () => void }) => void
    formState: {
      errors: Partial<Record<keyof TFieldValues, FieldError>>
      isValid: boolean
    }
  }
}
