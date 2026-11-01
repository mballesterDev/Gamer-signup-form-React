import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Vite + React + Tailwind v4 (instalado y listo).
// El diseño está hecho con CSS propio en src/styles/*.css,
// pero puedes usar clases de Tailwind cuando quieras.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/Gamer-signup-form-React/',
})
