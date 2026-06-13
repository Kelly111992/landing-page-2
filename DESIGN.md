---
name: H2PRO Clear Protein
description: El primer protein water mexicano — landing editorial oscura, ligera, honesta.
colors:
  ink: "#0a0e12"
  ink-soft: "#101820"
  paper: "#f0ede8"
  paper-warm: "#ece8e1"
  ice: "#d3d9dc"
  mist: "#e8edf0"
  h2pro: "#0086d6"
  h2pro-deep: "#00609a"
  h2pro-glow: "#4ab4f0"
  limonada: "#f4e04d"
  limonada-deep: "#b89c1f"
  blueberry: "#5b6fb8"
  blueberry-accent: "#7d8fd6"
  blueberry-deep: "#2c3a72"
typography:
  display:
    fontFamily: "Manrope, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.4rem, 5.4vw, 4.6rem)"
    fontWeight: 800
    lineHeight: 0.92
    letterSpacing: "-0.04em"
  display-hero:
    fontFamily: "Manrope, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.7rem, 6.2vw, 5.4rem)"
    fontWeight: 800
    lineHeight: 0.95
    letterSpacing: "-0.04em"
  editorial:
    fontFamily: "Instrument Serif, ui-serif, Georgia, serif"
    fontSize: "clamp(1.3rem, 2.4vw, 2.4rem)"
    fontWeight: 400
    lineHeight: 1.05
    letterSpacing: "normal"
  body:
    fontFamily: "Manrope, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  label:
    fontFamily: "Manrope, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.78rem"
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "0.18em"
  eyebrow:
    fontFamily: "Manrope, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.7rem"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "0.28em"
  micro:
    fontFamily: "Manrope, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.62rem"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "0.28em"
rounded:
  none: "0px"
  card: "28px"
  pill: "9999px"
spacing:
  xs: "0.5rem"
  sm: "0.75rem"
  md: "1.25rem"
  lg: "2.5rem"
  xl: "5rem"
  section: "clamp(7rem, 12vw, 10rem)"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.pill}"
    padding: "0.875rem 1.75rem"
    typography: "{typography.label}"
  button-primary-hover:
    backgroundColor: "{colors.h2pro-deep}"
    textColor: "{colors.paper}"
  button-accent:
    backgroundColor: "{colors.h2pro-deep}"
    textColor: "{colors.paper}"
    rounded: "{rounded.pill}"
    padding: "0.625rem 1.25rem"
    typography: "{typography.label}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "0 0"
    typography: "{typography.label}"
  nav-fixed:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    height: "5rem"
    padding: "0 2.5rem"
  nutrition-panel:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.none}"
    padding: "2rem 3rem"
  modal-lightbox:
    backgroundColor: "{colors.paper-warm}"
    textColor: "{colors.ink}"
    rounded: "{rounded.card}"
    padding: "0"
---

# Design System: H2PRO Clear Protein

## 1. Overview

**Creative North Star: "The Aquatic Editorial, Lights Down"**

H2PRO se diseña como una *revista editorial* sobre una bebida funcional, no como un panfleto de suplemento. La metáfora rectora es "agua clara fotografiada en un estudio oscuro": la claridad literal del producto se vuelve protagonista al recortarse contra la tinta, no contra el papel.

A diferencia de versiones tempranas (claro por defecto), la página vive hoy **mayoritariamente en oscuro**: solo el hero y el nav respiran sobre `paper`; todo lo demás —WhyClear, Manifiesto, banner táctil, Claims, Equivalencias, Sabores, Nutrimental, Contacto— es `ink`. La transición clara→oscura justo después del hero es el primer gesto editorial: bajamos las luces y empieza el ensayo. El azul de marca, los gradientes cálidos de sabor y los halos atmosféricos cortan esa oscuridad con energía puntual.

**Anti-feel**: pasillo de suplementos GNC, wellness pastel con blobs 3D, SaaS purple-gradient, gym bro before/after. Si una decisión visual cabría en cualquiera de esos cuatro mundos, hay que rehacerla.

**Key Characteristics:**
- Oscuro-dominante con un único respiro claro (hero + nav).
- Tipografía display enorme (Manrope 800) como estructura; serif italic como puntuación rara.
- Jerarquía por escala + peso, nunca por color.
- Tonal-first: las superficies no flotan; solo el producto físico y el modal proyectan sombra.
- Editorial asimétrico: encabezados a la izquierda en las secciones de lectura, centrado reservado para los momentos de espectáculo.

## 2. Colors

Estrategia: **Committed-oscuro con escapadas de acento.** La superficie base es `ink`; el `paper` es el invitado raro (hero, nav, lightbox del modal). El azul `h2pro` y los colores de sabor entran como acento puntual, nunca como relleno. Todos los neutrales arrastran un trazo de hue azul para que `paper` e `ink` se sientan del mismo aire.

### Primary
- **H2PRO Blue** (`#0086d6`): acento de marca. Italic display ("Mera mecánica cuántica."), barra de progreso de scroll, halos atmosféricos, dot de sabor.
- **H2PRO Deep** (`#00609a`): estado de reposo de botones azules (CTA hero en hover, "Hablemos" del footer). Contraste `paper` sobre este azul = 5.73:1.
- **H2PRO Glow** (`#4ab4f0`): acentos sobre fondo oscuro (signo ≃ de equivalencias, eyebrows en el manifiesto).

### Secondary (sabores — Drenched local)
- **Limonada** (`#f4e04d`) / **Limonada Deep** (`#b89c1f`): sección de sabor cítrico.
- **Blueberry** (`#5b6fb8`) / **Blueberry Accent** (`#7d8fd6`, variante clara para dot y nombre sobre fondo oscuro) / **Blueberry Deep** (`#2c3a72`).

### Neutral
- **Ink** (`#0a0e12`): fondo por defecto de casi toda la página; texto sobre paper.
- **Ink Soft** (`#101820`): segundo tono oscuro en gradientes de estudio.
- **Paper** (`#f0ede8`): superficie clara del hero, nav scrolled, overlay del menú móvil.
- **Paper Warm** (`#ece8e1`): base del ciclorama del lightbox 360°.
- **Ice** (`#d3d9dc`) / **Mist** (`#e8edf0`): borders y divisores cuando hacen falta.

### Named Rules
**The Lights-Down Rule.** El `paper` aparece solo en hero, nav y el lightbox del modal. Cualquier otra sección clara rompe la narrativa oscura y debe justificarse.
**The Color-Is-Punctuation Rule.** El azul y los sabores son acento, no superficie. Sobre `ink`, mantén el azul por debajo del ~10% del área visible salvo en las dos secciones de sabor.

## 3. Typography

**Display Font:** Manrope (con ui-sans-serif, system-ui, sans-serif)
**Editorial Font:** Instrument Serif italic (con ui-serif, Georgia, serif)

**Character:** Manrope carga el 95% del peso —humanista, segura, con `font-feature-settings: "ss01","cv11"` global para personalidad en la `a`, `g` y números—. Instrument Serif italic entra como puntuación tipográfica: palabras sueltas que evocan la cabeza de un artículo, nunca un párrafo.

### Hierarchy
- **Display / Hero** (800, `clamp(2.7rem, 6.2vw, 5.4rem)`, LH 0.95, −0.04em): el titular del hero. Domina por encima de cualquier header de sección en todos los anchos.
- **Display / Sección** (800, `clamp(2.4rem, 5.4vw, 4.6rem)`, LH 0.92, −0.04em): headers de WhyClear, Claims, Equivalencias, Sabores, Nutrimental. El Manifiesto sube a `clamp(2.6rem, 5.8vw, 5.6rem)` por ser la declaración mayor.
- **Editorial** (400, `clamp(1.3rem, 2.4vw, 2.4rem)`, LH 1.05, italic): acentos dentro del display, descriptores de sabor ("Cítrico fresco."), la firma "Mera mecánica cuántica." Máximo tres apariciones por página.
- **Body** (400, ~1–1.1rem, LH 1.6): párrafos. Ancho máximo 65–75ch (`max-w-md`/`max-w-2xl`).
- **Label** (500, `0.78rem`, `0.18em`, mayúsculas): botones, links de nav, CTAs, el código Cofepris.
- **Eyebrow** (600, `0.7rem`, `0.28em`, mayúsculas): kickers, índices `01–05`, headers de columnas de la tabla.
- **Micro** (600, `0.62rem`, `0.28em`, mayúsculas): pies de escena, captions de sello, especificaciones finas del modal.

### Named Rules
**The Three-Step Label Rule.** Los micro-textos en mayúscula viven en exactamente tres tamaños: `0.62 / 0.7 / 0.78rem`. Inventar tamaños intermedios (0.65, 0.68, 0.72…) es ruido, no jerarquía.
**The Two-Track Rule.** El `letter-spacing` en mayúsculas usa dos valores: `0.18em` (acción: botones, nav) y `0.28em` (etiqueta: eyebrows, micro). Nada más.
**The Italic-Is-Rare Rule.** El serif italic nunca es body. Solo una palabra/frase corta (≤4 palabras), siempre como acento.

## 4. Elevation

H2PRO es **tonal-first, shadow-only-on-product**. Las superficies de UI no flotan: se separan por contraste de tono (`ink` → `paper` → sabor) y por borders de 1px. La sombra real se reserva para lo que físicamente flota.

### Shadow Vocabulary
- **Product** (`drop-shadow(0 40px 60px rgba(0,0,0,0.28)) drop-shadow(0 8px 14px rgba(0,0,0,0.18))`): botellas.
- **Lightbox** (`0 50px 90px -28px rgba(0,0,0,0.85)` + aro de 1px del color de sabor): la vitrina del video 360° dentro del modal.
- **Glow** (`radial-gradient blur-3xl opacity-30–50`): halos fríos/azules detrás de botellas y como atmósfera en manifiesto, contacto y equivalencias. Es atmósfera, no profundidad: vive detrás del contenido, no debajo.
- **Grain** (`feTurbulence` SVG `mix-blend-overlay opacity-0.55`): textura de película sobre las secciones oscuras.

### Named Rules
**The Flat-By-Default Rule.** Ningún `box-shadow` para "darle dimensión" a un card. Si no se distingue del fondo, cámbialo de tono o ponle un border de 1px. La sombra solo cuando la cosa flota de verdad (botella, modal).

## 5. Components

### Nav (`Nav.tsx`)
Fixed, full width. **Sobre el hero**: `bg-ink/85 backdrop-blur-xl` con logo blanco. **Tras 24px de scroll**: transiciona a `bg-paper/85 backdrop-blur-xl border-b border-ink/5` con el logo a dos tonos. Links estilo eyebrow con indicador de sección activa (subrayado `layoutId` animado, `aria-current="page"`) vía IntersectionObserver. Móvil: overlay `paper` a pantalla completa, items display 2rem con índice, cierre por Escape y bloqueo de scroll. Sin CTA de compra (la conversión es WhatsApp/IG/correo).

### Hero (`Hero.tsx`)
La **única** sección `paper`. Móvil: foto completa (`hero-bottles.jpg`, contain) arriba con fundido vertical, texto debajo. Desktop: split asimétrico —texto a la izquierda (40–44%), foto a sangre a la derecha con fundido `paper` en el borde izquierdo y arriba/abajo—. Ken Burns lento (scale 1.1→1) al cargar. Titular en dos líneas, dos CTAs: "Conoce los sabores" (pill `ink`, hover `h2pro-deep` + scale) y "Quiénes somos" (ghost con línea).

### WhyClear (`WhyClear.tsx`)
`ink`, grain, halo frío azul. **Alineado a la izquierda** (`max-w-3xl`): h2 "¿Por qué H2PRO es clara?", body explicativo, y cierre editorial en `h2pro`: "Mera mecánica cuántica."

### Manifesto (`Manifesto.tsx`)
`ink`, grain, dos halos azules opuestos. Grid 7/5: izquierda, h2 con reveal línea por línea (clip-path) "La proteína no tiene que ser pesada, lenta ni complicada" + body; derecha, botella `manifesto-float.jpg` flotando con parallax y máscara radial. Marquee inferior (`animate-shimmer`, `aria-hidden`) con keywords.

### TactileBanner (`TactileBanner.tsx`)
`ink`. Imagen a sangre `macro-hands.jpg` con parallax y overlay degradado oscuro. Texto editorial sobreimpreso: eyebrow "Solo destapa y disfruta" + display "Sin polvos que disolver, sin grumos, sin pretextos".

### Claims (`Claims.tsx`)
`ink`. **Header a la izquierda** "Lo esencial, cero compromisos". Spread editorial 8/4: a la izquierda el número héroe `20`g con CountUp y entrada en blur (clamp 8–22rem, "por 500 ml"); a la derecha un riel con border-l de cuatro claims numerados (BCAA · 0 azúcar · 0 lactosa · Clean Label), índices `01–05`.

### ProteinEquivalences (`ProteinEquivalences.tsx`)
`ink`, grain. **Centrado a propósito** (escena de espectáculo). Secuencia auto-reproducida en pantalla: el número rueda 20→100 y se re-proyecta por alimento (Pollo/Res/Pescado) con su nombre gigante en outline detrás; halo azul que pulsa. `prefers-reduced-motion` → ecuación estática `20g ≃ 100g`. Texto `sr-only` + `aria-label` describen la equivalencia para lectores de pantalla.

### Flavors (`Flavors.tsx`)
`ink`, grain. Header centrado "Dos perfiles. Una promesa de claridad" + hairline central. Dos paneles (Limonada, Blueberry): cada botella es un `<button>` accesible (foto enmascarada con feather, Ken Burns ligado al scroll) con invitación premium **"Girar 360°"** (visible en móvil; hover/focus en desktop) que abre el modal. Dot del color de sabor + nombre display + descriptor editorial.

### NutritionLabel (`NutritionLabel.tsx`)
`ink`. **Header a la izquierda** "Lo que ves es lo que hay" + intro. Panel con `border-2 paper`: tabla nutrimental tipográfica (Por porción · 100ml · 500ml) con grid de 3 columnas, `tabular-nums` y la fila Proteínas resaltada. Etiqueta "NOM 051". Disclaimer legal debajo.

### Contact + Footer (`Contact.tsx`, `Footer.tsx`)
`ink`. Contact ya no tiene formulario: renderiza el Footer. Footer editorial: columna de marca con sello "Hecho en México" y aviso Cofepris; columnas Producto / Contacto / Síguenos; íconos sociales de 44px; pill "Hablemos" (`h2pro-deep`, hover por elevación) a WhatsApp. Tira legal inferior con la línea de manifiesto empresarial.

### Bottle 360° Modal (`Bottle360Modal.tsx`) — componente firma
Pantalla completa vía `createPortal`. Apertura con clip-path circular expansivo. Fondo de estudio oscuro con glow del color de sabor, rejilla técnica, línea de escaneo, ticks en las esquinas y una órbita girando. El video (grabado sobre blanco) vive en un **lightbox**: ciclorama cálido marfil (`paper-warm`) + `mix-blend-multiply`, así el blanco plano adopta el degradado de estudio y la botella se ve limpia. Sello "360° · VISTA COMPLETA" rotando. Cierre por ESC, click fuera o botón; bloquea el scroll del body.

### Floating (`ScrollProgress.tsx`, `WhatsAppFloat.tsx`)
Barra de progreso `h2pro` de 2px arriba (oculta con reduced-motion). Botón flotante de WhatsApp `ink` abajo-derecha, consciente de `safe-area-inset`.

## 6. Do's and Don'ts

### Do:
- **Do** mantener `ink` como superficie por defecto; `paper` solo en hero, nav y lightbox.
- **Do** dejar respirar: padding vertical de sección `clamp(7rem, 12vw, 10rem)`.
- **Do** alinear a la izquierda los encabezados de las secciones de lectura (WhyClear, Claims, Nutrimental) y reservar el centrado para el espectáculo (Equivalencias, Sabores).
- **Do** usar el serif italic como puntuación, máximo tres veces por página, siempre con `h2pro` o un derivado.
- **Do** respetar la escala de labels de tres pasos (`0.62 / 0.7 / 0.78rem`) y el tracking de dos vías (`0.18em` acción, `0.28em` etiqueta).
- **Do** separar superficies por tono o border de 1px, no por sombra.
- **Do** respetar `prefers-reduced-motion`: parallax, Ken Burns, shimmer y la escena de equivalencias se quedan estáticos.
- **Do** mantener contraste WCAG AA (texto ≥4.5:1): botones azules sobre `h2pro-deep`, no `h2pro`.

### Don't:
- **Don't** parecerse a un pasillo de suplementos GNC: tipografía agresiva, fotos de músculos, iconografía de pesas.
- **Don't** caer en wellness pastel saturado (rosa/menta, blobs 3D, copy en lowercase juguetón).
- **Don't** lifestyle aspiracional vacío sin información ni claims; la página educa, no contempla.
- **Don't** usar "antes y después", "transforma tu cuerpo" ni "el suplemento #1".
- **Don't** genérico AI-slop: gradientes purple-to-pink, glassmorphism por reflejo, Inter/Roboto, rounded-2xl universal, shadow-lg por defecto, Lucide como decoración.
- **Don't** signos de exclamación en el copy. Excepción cero.
- **Don't** `#000` ni `#fff`: usar `ink` y `paper`. (El blanco del video del modal se neutraliza con el ciclorama marfil + multiply.)
- **Don't** italic serif para body, ni mayúsculas en headers display.
- **Don't** box-shadow en UI: solo en producto físico (botellas) y modal.
- **Don't** esconder ingredientes ni la tabla nutrimental. La transparencia es el producto.
