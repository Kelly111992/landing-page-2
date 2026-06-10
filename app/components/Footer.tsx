import Image from "next/image";
import Link from "next/link";
import H2ProLogo from "./H2ProLogo";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-t border-paper/10 bg-ink">
      {/* ============ Upper level — editorial columns ============ */}
      <div className="mx-auto max-w-[1480px] px-6 md:px-10 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-10">
          {/* Brand column */}
          <div className="md:col-span-5">
            <Link
              href="/"
              aria-label="H2PRO — inicio"
              className="inline-block text-paper"
            >
              <H2ProLogo className="h-9 w-auto" />
            </Link>

            {/* Sellos */}
            <div className="mt-8 flex items-start gap-6">
              <div className="shrink-0">
                <Image
                  src="/brand/hecho-en-mexico.png"
                  alt="Hecho en México — sello oficial"
                  width={64}
                  height={64}
                  className="w-14 h-14"
                  style={{ filter: "brightness(0) invert(1)" }}
                />
              </div>
              <div className="border-l border-paper/15 pl-5 py-1">
                <span className="block text-[0.6rem] tracking-[0.32em] uppercase text-paper/45">
                  Aviso de funcionamiento Cofepris
                </span>
                <span className="block text-[0.82rem] tracking-[0.16em] uppercase text-paper/75 font-medium mt-2">
                  2614105019X00016
                </span>
              </div>
            </div>
          </div>

          {/* Producto column */}
          <div className="md:col-span-2">
            <h4 className="eyebrow text-paper/40 mb-6">Producto</h4>
            <ul className="space-y-3 text-[0.92rem]">
              <FooterLink href="/#sabores">Sabores</FooterLink>
              <FooterLink href="/#nutrimental">Etiqueta</FooterLink>
              <FooterLink href="/#manifiesto">Quiénes somos</FooterLink>
            </ul>
          </div>

          {/* Contacto column */}
          <div className="md:col-span-3">
            <h4 className="eyebrow text-paper/40 mb-6">Contacto</h4>
            <ul className="space-y-3 text-[0.92rem]">
              <FooterLink href="mailto:info@h2pro.fit">info@h2pro.fit</FooterLink>
              <FooterLink href="https://instagram.com/h2pro.fit">@h2pro.fit</FooterLink>
              <li className="text-paper/55">Zapopan, Jalisco · México</li>
            </ul>
          </div>

          {/* Redes column */}
          <div className="md:col-span-2">
            <h4 className="eyebrow text-paper/40 mb-6">Síguenos</h4>
            <div className="flex items-center gap-3">
              <SocialIcon
                href="https://instagram.com/h2pro.fit"
                label="Instagram"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-[18px] h-[18px]"
                  aria-hidden
                >
                  <rect x="2.5" y="2.5" width="19" height="19" rx="5" />
                  <circle cx="12" cy="12" r="4.2" />
                  <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none" />
                </svg>
              </SocialIcon>
              <SocialIcon href="https://www.h2pro.fit" label="Sitio web">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-[18px] h-[18px]"
                  aria-hidden
                >
                  <circle cx="12" cy="12" r="9" />
                  <path d="M3 12h18" />
                  <path d="M12 3c2.8 3 2.8 15 0 18M12 3c-2.8 3-2.8 15 0 18" />
                </svg>
              </SocialIcon>
            </div>

            <Link
              href="/#contacto"
              className="mt-8 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-h2pro hover:bg-h2pro-deep text-paper text-[0.66rem] tracking-[0.22em] uppercase transition-colors"
            >
              Hablemos
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </div>

      {/* ============ Lower level — compact legal strip ============ */}
      <div className="border-t border-paper/10">
        <div className="mx-auto max-w-[1480px] px-6 md:px-10 py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-[0.72rem] text-paper/45">
          <span>
            © {year} H2PRO — Protein Water. Todos los derechos reservados.
            {/* Manifiesto empresarial — sutil, junto a la razón social */}
            <span className="block mt-1 text-paper/40">
              Lo tenemos claro: nutrir a México con productos disruptivos
              creciendo de forma responsable con el medio ambiente.
            </span>
            <span className="block mt-1 text-paper/30">
              Suplementos Disruptivos S.A. de C.V. · Zapopan, Jalisco
            </span>
          </span>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <a
              href="mailto:info@h2pro.fit?subject=Solicitud%20de%20aviso%20de%20privacidad"
              className="hover:text-paper transition-colors"
            >
              Aviso de privacidad
            </a>
            <a
              href="mailto:info@h2pro.fit?subject=Solicitud%20de%20t%C3%A9rminos"
              className="hover:text-paper transition-colors"
            >
              Términos
            </a>
            <span className="text-paper/30">Diseñado en Guadalajara · MX</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const external = href.startsWith("http");
  return (
    <li>
      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener" : undefined}
        className="text-paper/75 hover:text-paper transition-colors"
      >
        {children}
      </a>
    </li>
  );
}

function SocialIcon({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener"
      aria-label={label}
      className="w-10 h-10 rounded-full border border-paper/20 flex items-center justify-center text-paper/70 hover:bg-h2pro hover:border-h2pro hover:text-paper transition-all"
    >
      {children}
    </a>
  );
}
