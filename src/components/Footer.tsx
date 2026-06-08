import { Link } from "@tanstack/react-router";
import { Instagram, MessageCircle, MapPin, CalendarClock } from "lucide-react";
import logo from "@/assets/logo.png";
import { WHATSAPP_BASE } from "@/lib/vehicles";
import { useCatalogData } from "@/hooks/useCatalogData";

const WHATSAPP_DISPLAY = "11 3685-5346";

export function Footer() {

  const { data } = useCatalogData();
  const businessLogo = data?.business.logoUrl || logo;
  const businessName = data?.business.name || "Sanfilippo Exclusivos";
  const whatsappHref = data?.whatsappHref ?? WHATSAPP_BASE;
  const whatsappDisplay = data?.whatsappDisplay ?? "11 3685-5346";

  return (
    <footer className="border-t border-border/60 bg-[oklch(0.10_0.005_60)]">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3">
              <img src={businessLogo} alt={businessName} />
            </div>

            <p className="mt-6 text-xs leading-relaxed text-muted-foreground">
              Vehículos exclusivos. Atención personalizada.
            </p>
          </div>

          {/* Nav */}
          <div>
            <p className="eyebrow">Navegación</p>

            <ul className="mt-6 space-y-3 text-sm text-foreground/80">
              <li>
                <Link to="/" className="transition-colors hover:text-gold">
                  Inicio
                </Link>
              </li>
              <li>
                <Link to="/catalogo" className="transition-colors hover:text-gold">
                  Catálogo
                </Link>
              </li>
              <li>
                <Link to="/" hash="nosotros" className="transition-colors hover:text-gold">
                  Nosotros
                </Link>
              </li>
              <li>
                <Link to="/" hash="servicios" className="transition-colors hover:text-gold">
                  Servicios
                </Link>
              </li>
              <li>
                <Link to="/" hash="ubicacion" className="transition-colors hover:text-gold">
                  Ubicación
                </Link>
              </li>
              <li>
                <Link to="/" hash="contacto" className="transition-colors hover:text-gold">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="eyebrow">Contacto</p>

            <ul className="mt-6 space-y-4 text-sm text-foreground/80">
              <li className="flex items-start gap-3">
                <MessageCircle className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <a href={whatsappHref} target="_blank" rel="noreferrer">
                  WhatsApp: {whatsappDisplay}
                </a>
              </li>

              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <span>
                  Mariano Castex 1987
                  <br />
                  Edificio Vista Golf, 1er subsuelo
                </span>
              </li>

              <li className="flex items-start gap-3">
                <CalendarClock className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <span>Atención con cita previa</span>
              </li>
            </ul>
          </div>

          {/* Actions */}
          <div>
            <p className="eyebrow">Acciones</p>

            <div className="mt-6 flex flex-col gap-4">
              <a
                href={WHATSAPP_BASE}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 border border-gold/60 bg-gold px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-black shadow-[var(--shadow-gold)] transition-all hover:-translate-y-0.5 hover:bg-gold/90"
              >
                <MessageCircle className="h-4 w-4" />
                Coordinar cita
              </a>

              <a
                href="https://www.instagram.com/sanfilippo_exclusivos/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 text-sm text-foreground/80 transition-colors hover:text-gold"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-gold/50 text-gold">
                  <Instagram className="h-4 w-4" />
                </span>
                @sanfilippo_exclusivos
              </a>
            </div>
          </div>
        </div>

        <div className="mt-14 border-t border-border/60 pt-6 text-center text-xs text-muted-foreground">
          © 2026 Sanfilippo Exclusivos. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}