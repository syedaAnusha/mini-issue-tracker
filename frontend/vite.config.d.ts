declare module '@tanstack/router-plugin/vite' {
  export function tanstackRouter(
    options?: Record<string, unknown>,
  ): import('vite').PluginOption
}
