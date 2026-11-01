# 01 · Gamer sign-up form (versión "Voltrix")

Inspirado en el reto **Gamer sign-up form** de Frontend Mentor (nivel Junior).
👉 https://www.frontendmentor.io/challenges/gamer-sign-up-form

El diseño está **terminado** (CSS propio en `src/styles/app.css`). Tailwind v4 está instalado por si quieres usarlo.
Tu trabajo es la **lógica**.

## Arrancar
```bash
npm install
npm run dev
```

## Estructura
- `App.tsx` → monta el panel de marca y el formulario.
- `components/BrandPanel.tsx` → ficha "ID de jugador" con el estado de cada campo.
- `components/SignUpForm.tsx` → el formulario completo, contraseñas incluidas (sin estado).
- `components/SuccessPanel.tsx` → pantalla de éxito (todavía no se muestra).

## Lo que tienes que programar
1. **Estado del formulario**: convierte los inputs en controlados (`useState` con `{ alias, email, password, confirm, terms }`).
2. **Validación** (al enviar y, si quieres, al salir de cada campo con `onBlur`):
   - Alias: 3–16 caracteres, solo `[A-Za-z0-9_-]`.
   - Email: formato válido.
   - Contraseña: mínimo 8 caracteres, 1 mayus 1 minus y 1 caracter especial.
   - Confirmar: igual a la contraseña.
   - Términos: marcado.
   - Si hay error, añade `field--error` al `.field` y pon el mensaje en `.field__hint`. Usa `aria-invalid="true"` en el input.
3. **Mostrar/ocultar contraseña**: en `SignUpForm`, un `useState` que cambie `type` entre `password` y `text`, y actualice `aria-pressed` y el `aria-label`.
4. **Ficha en vivo** (`BrandPanel`): pasa el estado como props; cada fila cambia a `ok` (clase `card-id__status--ok`) cuando su campo es válido; el contador "0/5 listo" sube; "SIN ASIGNAR" pasa a mostrar el alias.
5. **Envío simulado**: en `onSubmit` haz `preventDefault`, valida, pon la clase `btn--loading` en el botón, espera ~1,5 s con `setTimeout` y muestra `<SuccessPanel alias={alias} />` en lugar del formulario.
6. **Accesibilidad**: mueve el foco al primer campo con error; el panel de éxito ya tiene `role="status"`.

## Extras
- Añade la clase `shake` al formulario cuando el envío sea inválido (ya respeta `prefers-reduced-motion`).
- Avisa si Bloq Mayús está activado (`event.getModifierState('CapsLock')`).
- Haz el formulario de login a juego.

## TypeScript
- `src/types.ts` ya define los tipos del proyecto: `FormValues`, `FormErrors`, `FieldStatus`. Impórtalos con `import type { ... } from './types.ts'`.
- Cada componente tiene su tipo de props (`type NombreProps = { ... }`). Las props comentadas (`// onToggle?: ...`) son las que tendrás que **descomentar y usar** al programar la lógica.
- Tipa el estado cuando el valor inicial no basta para inferirlo: `useState<string[]>([])`, `useState<Filter>('all')`, `useState<number | null>(null)`.
- Eventos: `(e: React.ChangeEvent<HTMLInputElement>) => ...`, `(e: React.FormEvent<HTMLFormElement>) => ...`, `(e: KeyboardEvent) => ...` en listeners de `window`.
- Para `fetch`: `const data = (await res.json()) as MiTipo`.
- `npm run typecheck` comprueba los tipos sin compilar; `npm run build` también los comprueba antes de generar la versión final.
