/// <reference types="vite/client" />

// Permite usar variables CSS en la prop `style`, p. ej. style={{ '--c': color }}
import 'react'
declare module 'react' {
  interface CSSProperties {
    [key: `--${string}`]: string | number | undefined
  }
}
