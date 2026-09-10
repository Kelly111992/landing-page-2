// La tarjeta de X/Twitter reusa la misma imagen generada que Open Graph. Sin
// este archivo, `twitter:image` caía en el PNG estático de la identidad crema
// anterior y la tarjeta salía distinta a la de WhatsApp.
// `runtime` va declarado aquí: Next lo lee en tiempo de compilación y no
// admite que se reexporte.
export const runtime = "nodejs";
export { default, size, contentType } from "./opengraph-image";
