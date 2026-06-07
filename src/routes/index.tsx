import { createFileRoute, Link } from "@tanstack/react-router";
import { Car, ShieldCheck, CalendarClock, Handshake, MessageCircle, MapPin, Play, ArrowUpRight, ExternalLink } from "lucide-react";
import logo from "@/assets/logo.png";
import showroom from "@/assets/showroom.jpg";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { VehicleCard } from "@/components/VehicleCard";
import { getLatestVehicles, WHATSAPP_BASE } from "@/lib/vehicles";

export const Route = createFileRoute("/")({
  component: Index,
});

const BENEFITS = [
  { icon: Car, title: "Unidades seleccionadas", text: "Elegimos solo vehículos que cumplen con nuestros más altos estándares." },
  { icon: ShieldCheck, title: "Transparencia total", text: "Asesoramiento claro, información verificada y procesos confiables." },
  { icon: CalendarClock, title: "Cita previa personalizada", text: "Atención privada y dedicada para una experiencia exclusiva." },
  { icon: Handshake, title: "Postventa premium", text: "Acompañamiento continuo antes, durante y después de tu compra." },
];

const GOOGLE_MAPS_URL = "https://www.google.com/maps/search/?api=1&query=Mariano+Castex+1987+Edificio+Vista+Golf";

function Index() {
  const latest = getLatestVehicles(6);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* HERO */}
      <section id="inicio" className="relative h-screen min-h-[720px] w-full overflow-hidden">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster="/hero-poster.jpg"
        >
          <source src="/hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-background/60" />

        <Navbar overlay />

        <div className="relative z-10 mx-auto flex h-[calc(100%-7rem)] max-w-7xl flex-col justify-center px-6 lg:px-10">
          <div className="max-w-2xl">
            <h1 className="font-display text-5xl leading-[1.05] text-foreground sm:text-6xl lg:text-7xl">
              Vehículos exclusivos.<br />Atención personalizada.
            </h1>
            <p className="mt-8 max-w-md text-base leading-relaxed text-foreground/70">
              Una experiencia premium para descubrir unidades seleccionadas y coordinar tu visita de forma privada.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href={WHATSAPP_BASE}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-3 bg-[var(--gradient-gold)] px-7 py-4 text-[11px] font-medium uppercase tracking-[0.22em] text-primary-foreground shadow-[var(--shadow-gold)] transition-transform hover:-translate-y-0.5"
              >
                <MessageCircle className="h-4 w-4" />
                Coordinar por WhatsApp
              </a>
              <Link
                to="/catalogo"
                className="inline-flex items-center gap-3 border border-gold/60 px-7 py-4 text-[11px] font-medium uppercase tracking-[0.22em] text-gold transition-colors hover:bg-gold/10"
              >
                Ver catálogo
              </Link>
            </div>

            <a href="#nosotros" className="group mt-16 inline-flex items-center gap-4">
              <span className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/60 text-gold transition-colors group-hover:bg-gold/10">
                <Play className="h-4 w-4 fill-gold" />
              </span>
              <span>
                <span className="block text-[11px] font-medium uppercase tracking-[0.22em] text-foreground">Ver showroom</span>
                <span className="mt-1 block text-xs text-foreground/60">Recorré nuestra selección exclusiva.</span>
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* LATEST UNITS */}
      <section id="catalogo-home" className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow">Últimas unidades</p>
            <h2 className="mt-4 font-display text-4xl sm:text-5xl lg:text-6xl">Seleccionadas para vos.</h2>
          </div>
          <Link
            to="/catalogo"
            className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-gold transition-all hover:gap-3"
          >
            Ver todo el catálogo <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {latest.map((v) => <VehicleCard key={v.id} v={v} />)}
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="nosotros" className="mx-auto max-w-7xl px-6 pb-24 lg:px-10 lg:pb-32">
        <div className="bg-surface border border-border/60 p-10 lg:p-16">
          <div className="grid gap-12 lg:grid-cols-[1fr_2fr] lg:gap-16">
            <div>
              <p className="eyebrow">Experiencia Sanfilippo</p>
              <h2 className="mt-4 font-display text-4xl sm:text-5xl">Más que vender autos, creamos experiencias.</h2>
              <p className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground">
                En Sanfilippo Exclusivos cuidamos cada detalle para que encontrar tu próximo vehículo sea un proceso simple, seguro y totalmente personalizado.
              </p>
              <a
                href="#contacto"
                className="mt-10 inline-flex items-center gap-3 border border-gold/60 px-6 py-3 text-[11px] uppercase tracking-[0.22em] text-gold transition-colors hover:bg-gold/10"
              >
                Conocé más sobre nosotros
              </a>
            </div>

            <div id="servicios" className="grid grid-cols-2 gap-10 lg:grid-cols-4">
              {BENEFITS.map((b) => (
                <div key={b.title} className="text-center lg:text-left">
                  <b.icon className="mx-auto h-10 w-10 text-gold lg:mx-0" strokeWidth={1.2} />
                  <h3 className="mt-6 text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground">{b.title}</h3>
                  <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{b.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contacto" className="mx-auto max-w-7xl px-6 pb-24 lg:px-10 lg:pb-32">
        <div className="bg-surface border border-border/60 overflow-hidden">
          <div className="grid lg:grid-cols-2">
            <div className="p-10 lg:p-16">
              <p className="eyebrow">Contacto y ubicación</p>
              <h2 className="mt-4 font-display text-4xl sm:text-5xl">Coordiná tu cita previa personalizada para verla.</h2>

              <ul className="mt-10 space-y-6">
                <li className="flex items-start gap-4">
                  <span className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gold/60 text-gold">
                    <MessageCircle className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.22em] text-gold">WhatsApp</p>
                    <p className="mt-1 text-sm text-foreground">WhatsApp: 11 3685-5346</p>
                  </div>
                </li>
                <li id="ubicacion" className="flex items-start gap-4">
                  <span className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gold/60 text-gold">
                    <MapPin className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.22em] text-gold">Showroom</p>
                    <p className="mt-1 text-sm text-foreground">Mariano Castex 1987 - Edificio Vista Golf (1er subsuelo)</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <span className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gold/60 text-gold">
                    <CalendarClock className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.22em] text-gold">Atención</p>
                    <p className="mt-1 text-sm text-foreground">Visitas con cita previa, de lunes a sábado.</p>
                  </div>
                </li>
              </ul>

              <div className="mt-10 flex flex-wrap gap-4">
                <a
                  href={WHATSAPP_BASE}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-3 bg-[var(--gradient-gold)] px-6 py-3 text-[11px] font-medium uppercase tracking-[0.22em] text-primary-foreground shadow-[var(--shadow-gold)] transition-transform hover:-translate-y-0.5"
                >
                  <MessageCircle className="h-4 w-4" /> Enviar WhatsApp
                </a>
                <a
                  href={GOOGLE_MAPS_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-3 border border-gold/60 px-6 py-3 text-[11px] font-medium uppercase tracking-[0.22em] text-gold transition-colors hover:bg-gold/10"
                >
                  <ExternalLink className="h-4 w-4" /> Abrir en Google Maps
                </a>
              </div>
            </div>
            <div className="relative min-h-[360px] lg:min-h-full">
              <img
                src={showroom}
                alt="Showroom Sanfilippo Exclusivos"
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-background/60 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
