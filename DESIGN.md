---
name: H2PRO Clear Protein
description: El primer protein water mexicano — landing editorial, ligero, honesto.
colors:
  ink: "#0a0e12"
  ink-soft: "#101820"
  paper: "#f5f7f8"
  paper-warm: "#fafbf8"
  ice: "#d3d9dc"
  mist: "#e8edf0"
  h2pro: "#0086d6"
  h2pro-deep: "#00609a"
  h2pro-glow: "#4ab4f0"
  limonada: "#f4e04d"
  limonada-deep: "#b89c1f"
  blueberry: "#5b6fb8"
  blueberry-deep: "#2c3a72"
typography:
  display:
    fontFamily: "Manrope, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.4rem, 7vw, 7.4rem)"
    fontWeight: 800
    lineHeight: 0.92
    letterSpacing: "-0.04em"
  editorial:
    fontFamily: "Instrument Serif, ui-serif, Georgia, serif"
    fontSize: "clamp(1.4rem, 2.4vw, 2.2rem)"
    fontWeight: 400
    lineHeight: 1.05
    letterSpacing: "normal"
  body:
    fontFamily: "Manrope, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  eyebrow:
    fontFamily: "Manrope, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.7rem"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "0.22em"
  label:
    fontFamily: "Manrope, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.78rem"
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "0.18em"
rounded:
  none: "0px"
  pill: "9999px"
spacing:
  xs: "0.5rem"
  sm: "0.75rem"
  md: "1.25rem"
  lg: "2.5rem"
  xl: "5rem"
  section: "clamp(7rem, 12vw, 11rem)"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.pill}"
    padding: "0.875rem 1.75rem"
    typography: "{typography.label}"
  button-primary-hover:
    backgroundColor: "{colors.h2pro}"
    textColor: "{colors.paper}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "0 0"
    typography: "{typography.label}"
  card-claim:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "2rem 2.5rem"
  card-persona:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "2rem 3rem"
  nav-fixed:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    height: "5rem"
    padding: "0 2.5rem"
  contact-tile:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.none}"
    padding: "1.5rem"
  contact-tile-hover:
    backgroundColor: "{colors.h2pro-deep}"
    textColor: "{colors.paper}"
  input-line:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "0.75rem 0"
  modal-panel:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "0"
---

# Design

## 1. Overview: The Aquatic Editorial

H2PRO se diseña como una *revista editorial* sobre una bebida funcional, no como un panfleto de suplemento. La metáfora rectora es "agua que atraviesa una mesa de luz blanca" — claridad literal del producto convertida en lenguaje visual.

Tres tensiones definen el sistema:

1. **Quietud / energía**: las superficies son mayormente claras y tipográficamente espaciosas (quietud editorial), pero los gradientes de los sabores, el dark manifesto y el azul `#0086d6` cortan con energía puntual. Nunca los dos al mismo tiempo en la misma sección.
2. **Sans humanista / serif italic**: Manrope (sans, sustituto licencia-libre de Avenir del brandboard) carga el 95% del peso. Instrument Serif Italic aparece quirúrgicamente — palabras solas, *clara,*  *Mora silvestre.*, *cero compromisos.* — para evocar la cabeza de un artículo, no un blog post.
3. **Blanco / tinta**: nunca `#fff` ni `#000`. Paper `#f5f7f8` está apenas tibio; ink `#0a0e12` está apenas azulado. Ambos arrastran un trazo del azul de marca para que paper y ink se sientan parte del mismo universo.

**Anti-feel**: GNC supplement aisle, wellness pastel blob, generic SaaS purple-gradient, gym bro before/after. Si una decisión visual cabría en cualquiera de esos cuatro mundos, hay que rehacerla.

**Vibe en una frase**: *Cereal Magazine si publicara una bebida proteica clara.*

## 2. Colors: The Glass-and-Ink Palette

Estrategia: **Restrained con escapadas Drenched**. La superficie por defecto es paper sobre tinta (≤10% de acento azul). Pero las dos secciones de sabor son **Drenched** — el color del sabor es la sección entera, sin compromiso.

Todos los neutrales arrastran un poco de hue azul (chroma ≈0.005) para que paper y ink se sientan parte del mismo aire.

| Token | Hex | OKLCH equivalente | Rol |
|---|---|---|---|
| `ink` | `#0a0e12` | `oklch(0.165 0.012 245)` | Fondo dark de manifiesto, nutrimental, contacto |
| `ink-soft` | `#101820` | `oklch(0.205 0.014 245)` | Texto sobre paper |
| `paper` | `#f5f7f8` | `oklch(0.965 0.004 230)` | Superficie por defecto |
| `paper-warm` | `#fafbf8` | `oklch(0.978 0.005 100)` | Hover de cards (apenas perceptible) |
| `ice` | `#d3d9dc` | `oklch(0.873 0.008 230)` | Borders y divisores |
| `mist` | `#e8edf0` | `oklch(0.928 0.006 230)` | Backgrounds de secciones intermedias |
| `h2pro` | `#0086d6` | `oklch(0.605 0.165 244)` | **Acento de marca**. Italic display, badges, hover de botón primario |
| `h2pro-deep` | `#00609a` | `oklch(0.476 0.135 244)` | Estados pressed/hover de superficies dark |
| `h2pro-glow` | `#4ab4f0` | `oklch(0.745 0.13 240)` | Acentos sobre fondo dark, eyebrows en manifiesto |
| `limonada` | `#f4e04d` | `oklch(0.91 0.165 100)` | Drenched de sección Sabor 01 |
| `limonada-deep` | `#b89c1f` | `oklch(0.7 0.135 95)` | Eyebrow y notes sobre limonada |
| `blueberry` | `#5b6fb8` | `oklch(0.555 0.115 275)` | Drenched de sección Sabor 02 |
| `blueberry-deep` | `#2c3a72` | `oklch(0.345 0.105 275)` | Texto sobre blueberry |

**Reglas del color**:

- Restrained es la línea base. Cuando uses azul `h2pro` sobre paper, mantenelo bajo 10% de la superficie visible.
- Drenched está autorizado **sólo** en las dos secciones de sabor. No se aplica a hero, manifiesto, claims, nutrimental, personas o contacto.
- El italic serif con `h2pro` es la firma de la marca — *clara,* / *cero compromisos.* / *lo que hay.* Tres apariciones por página máximo. Si quieres un cuarto, replantea el copy.

## 3. Typography: Sans Humanista + Italic Editorial

Dos familias, cinco roles. Manrope hace el 95% del trabajo; Instrument Serif italic aparece como puntuación tipográfica.

| Rol | Familia | Tamaño | Peso | LH | Tracking | Uso |
|---|---|---|---|---|---|---|
| `display` | Manrope | clamp(2.4rem, 7vw, 7.4rem) | 800 | 0.92 | -0.04em | Hero, manifiesto, headers de sección |
| `editorial` | Instrument Serif italic | clamp(1.4rem, 2.4vw, 2.2rem) | 400 | 1.05 | normal | Acentos dentro del display, quotes de personas, descriptores de sabor |
| `body` | Manrope | 1rem (1.05rem md+) | 400 | 1.6 | normal | Párrafos descriptivos |
| `eyebrow` | Manrope | 0.7rem | 600 | 1 | 0.22em | `[ 01 ] Manifiesto`, `Sabor 01 · Limonada` |
| `label` | Manrope | 0.78rem | 500 | 1.2 | 0.18em | Botones, nav links, footers de sección |

**Reglas**:

- Hierarchy por escala + peso, no por color. Display 800 vs body 400 ya genera contraste suficiente.
- Italic serif **nunca** se usa para body. Solo para una palabra/frase corta dentro de un display, una quote, o un descriptor (≤4 palabras).
- Anchos de párrafo nunca exceden 65-75ch. En la práctica: `max-w-md` o `max-w-xl` con padding generoso.
- Mayúsculas con tracking `0.18-0.32em` solo en eyebrows y botones. **Nunca** en headers.
- `font-feature-settings: "ss01", "cv11"` activado globalmente (Manrope) para los stylistic sets que dan personalidad a la `a`, `g`, y números.

## 4. Elevation: Tonal antes que Shadow

H2PRO es **tonal-first, shadow-only-on-product**. Las superficies de UI no flotan: se separan por contraste de tono y por borders de 1 px en `ice`. Sólo las botellas y los modales tienen shadow real.

| Nivel | Implementación | Uso |
|---|---|---|
| `flat` | Sin sombra. Border `1px solid {colors.ice}` cuando hace falta separar. | Cards, nav, formularios, contact tiles |
| `tonal` | Cambio de fondo `paper → ink` o `paper → drenched`. Sin sombra. | Transición entre secciones |
| `product` | `drop-shadow(0 40px 60px rgba(0,0,0,0.28)) drop-shadow(0 8px 14px rgba(0,0,0,0.18))` | Botellas en hero y flavors |
| `modal` | `bg-ink/85 backdrop-blur-sm` (backdrop) + panel paper plano | Modal 360° |
| `glow` | `radial-gradient blur-3xl opacity-40-50` detrás de elementos focales | Halos atrás de botellas, gradientes atmosféricos en manifiesto/contacto |

**Reglas**:

- No usar `box-shadow` para "darle dimensión" a un card. Si el card no se distingue de su fondo, cámbialo de tono o agrégale un border de 1px en `ice`.
- Sombras solo cuando la cosa flota *físicamente* (una botella sobre una mesa, un modal sobre la página). Nada más.
- Los halos `radial-gradient blur-3xl` son atmósfera —no profundidad—. Vivien atrás del contenido, no debajo.

## 5. Components

### Nav (`Nav.tsx`)
Fixed top, full width. Estado **transparent** sobre el hero; estado **scrolled** con `bg-paper/85 backdrop-blur-xl border-b border-ink/5` después de 24px de scroll. Logo wordmark `H2PRO` (display 1.6-1.8rem, letter-spacing -0.05em) con el "2" en `h2pro`. Links como `eyebrow` con hover a ink full. CTA "Pedidos" como `button-primary` pill.

### Hero (`Hero.tsx`)
Split-screen vertical (50/50). Lado izquierdo: gradient radial limonada centrado al 30/40%; derecho: gradient radial blueberry centrado al 70/40%. Línea divisoria `1px bg-ink/10` al centro. Dos botellas con parallax `useTransform` (left -120px, right -160px en scroll). Display central con tres líneas: `Proteína / clara, / sin pesadez.` — la segunda línea es `editorial` con `h2pro`. Stats ribbon `bg-paper/40 backdrop-blur-md` al fondo. Eyebrows en las dos esquinas superiores.

### Manifesto (`Manifesto.tsx`)
Fondo `ink`, texturada con `grain` (SVG noise overlay). Dos halos azul radiales blur opuestos. Grid 12 cols: eyebrow al col 1-2, display al col 3-9, botella blueberry flotando col 10-12. Marquee inferior (`animate-shimmer`) con keywords.

### Claims grid (`Claims.tsx`)
4 cards en grid `grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-ink/10 border border-ink/10`. Cada card: número display (3-3.6rem) arriba-izq, índice `01-04` arriba-der, título sm + body 0.88rem abajo. Hover sube background a `paper-warm`.

### Flavors (`Flavors.tsx`)
Dos `<article>` Drenched. Layout 12-col asimétrico que alterna: limonada texto-derecha, blueberry texto-izquierda. Botella es un `<button>` con halo radial blur, con motion vertical (drift `y: [0,-14,0]` 6s loop). Click abre `Bottle360Modal`. CTA pill secundaria "Ver en 360° ↻" en color `flavor.text` con texto en color `flavor.bg`.

### Nutrition Label (`NutritionLabel.tsx`)
**El momento brutalist editorial**. Fondo `ink`, panel grande con border-2 paper. Grid 7/5 cols. Lado izq: tabla nutrimental tipográfica (label · 100ml · 500ml) con la fila Proteínas resaltada en display 1.2rem `h2pro-glow`. Lado der: 5 ingredientes numerados 01-05 en lista vertical. Pie con specs (vida de anaquel, presentación). Disclaimer pequeño debajo.

### Personas (`Personas.tsx`)
3 cards en grid 3-cols con `gap-px bg-ink/15 border border-ink/15`. Cada card: dot color (limonada/h2pro/blueberry) + perfil 01/02/03 + edad alineada-derecha; nombre display 2.4-2.8rem + rol body; quote en `editorial` 1.4-1.55rem con comillas tipográficas; "Su momento" abajo separado por border-t.

### Contact (`Contact.tsx`)
Fondo `ink` con halo h2pro al top. Grid 7/5: izquierda manifiesto + 4 contact-tiles en grid 2x2 `bg-paper/15 border border-paper/15`; derecha formulario en panel `bg-paper`. Submit usa `mailto:` armado dinámicamente con `formData`. Footer minimal abajo con border-t paper/10.

### Bottle 360° Modal (`Bottle360Modal.tsx`)
Backdrop `bg-ink/85 backdrop-blur-sm`. Panel paper centrado con corner ticks decorativos en las 4 esquinas. Header con eyebrow + cerrar. Stage radial-gradient white→paper que disuelve el fondo blanco del video. Cierre por ESC, click fuera, o botón. Bloquea scroll del body mientras está abierto.

## 6. Do's and Don'ts

### ✅ Do

- **Dejar respirar.** El `padding-y` de sección es `clamp(7rem, 12vw, 11rem)`. No achiques.
- **Usar italic serif como puntuación.** Tres apariciones por página máximo, siempre con `h2pro` o un derivado, siempre en una palabra/frase corta.
- **Numerar las secciones.** `[ 01 ] Manifiesto`, `[ 02 ] Composición`. El número convierte la página en un índice editorial.
- **Resaltar 20 g.** Es el dato que importa. Aparece en hero stats, en claims, y en la fila de Proteínas con `h2pro-glow display`.
- **Botellas con halo radial atrás.** Limonada con halo cálido, blueberry con halo frío. Da volumen sin sombra.
- **Border 1px ice** para separar cards en grids. No `gap-4 bg-paper`. Sí `gap-px bg-ink/10`.
- **Respetar `prefers-reduced-motion`**. Parallax, drift y shimmer se quedan estáticos.

### ❌ Don't

- **No sombras box-shadow** en UI. Solo en producto físico (botellas) o modal.
- **No `#000` ni `#fff`**. Usar `ink` y `paper`. Si necesitas blanco puro para algo (ej. radial-gradient stage del modal), justifícalo.
- **No italic serif para body**. Solo para acentos.
- **No mayúsculas en headers display**. Mayúsculas son territorio de eyebrows y botones.
- **No glassmorphism universal**. El backdrop-blur sólo aparece en nav scrolled y modal backdrop. No lo apliques a cards ni botones.
- **No gradient purple-to-pink** en ningún lado. Los gradientes permitidos son: limonada (amarillo cálido), blueberry (azul violáceo), h2pro halo (azul atmosférico). Cualquier otro requiere justificación.
- **No genéricos AI-slop**: no rounded-2xl en todo, no shadow-lg por reflejo, no Inter, no Lucide-icons como decoración.
- **No copy con signos de exclamación.** Excepción cero. Si el copy lo pide, el copy está mal.
- **No "antes y después"**, no "transforma tu cuerpo", no "el suplemento #1". El brief lo veta.
- **No esconder ingredientes ni tabla nutrimental**. La transparencia es el producto.
