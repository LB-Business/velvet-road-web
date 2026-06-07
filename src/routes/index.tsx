import { createFileRoute } from "@tanstack/react-router";
import { Car, ShieldCheck, CalendarClock, Handshake, Instagram, Facebook, MessageCircle, MapPin, Play, ArrowUpRight } from "lucide-react";
import logo from "@/assets/logo.png";
import car1 from "@/assets/car-1.jpg";
import car2 from "@/assets/car-2.jpg";
import car3 from "@/assets/car-3.jpg";
import showroom from "@/assets/showroom.jpg";

export const Route = createFileRoute("/")({
  component: Index,
});

const NAV = [
  { label: "Inicio", href: "#inicio" },
  { label: "Stock", href: "#stock" },
  { label: "Nosotros", href: "#nosotros" },
  { label: "Servicios", href: "#servicios" },
  { label: "Ubicación", href: "#ubicacion" },
  { label: "Contacto", href: "#contacto" },
];

const CARS = [
  { year: "2023", name: "Can-Am Maverick X3 Turbo RR", specs: "4X4 · 195 HP · 1.000 KM", img: car1 },
  { year: "2021", name: "Audi A5 Sportback S Line", specs: "2.0 TFSI · 190 HP · 28.000 KM", img: car2 },
  { year: "2022", name: "Ford F-150 Raptor", specs: "3.5 V6 EcoBoost · 450 HP · 15.000 KM", img: car3 },
];

const BENEFITS = [
  { icon: Car, title: "Unidades seleccionadas", text: "Elegimos solo vehículos que cumplen con nuestros más altos estándares." },
  { icon: ShieldCheck, title: "Transparencia total", text: "Asesoramiento claro, información verificada y procesos confiables." },
  { icon: CalendarClock, title: "Cita previa personalizada", text: "Atención privada y dedicada para una experiencia exclusiva." },
  { icon: Handshake, title: "Postventa premium", text: "Acompañamiento continuo antes, durante y después de tu compra." },
];

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* HERO with video background */}
      <section id="inicio" className="relative h-screen min-h-[720px] w-full overflow-hidden">
        {/* Video background — replace src with your real video file */}
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
        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-background/60" />

        {/* Header */}
        <header className="relative z-20">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-10 lg:py-8">
            <a href="#inicio" className="flex items-center gap-3">
              <img src={logo} alt="Sanfilippo Exclusivos" className="h-14 w-14 rounded-full object-cover" />
            </a>
            <nav className="hidden items-center gap-10 lg:flex">
              {NAV.map((n, i) => (
                <a
                  key={n.label}
                  href={n.href}
                  className={`text-[11px] tracking-[0.22em] uppercase transition-colors ${
                    i === 0 ? "text-gold" : "text-foreground/80 hover:text-gold"
                  }`}
                >
                  {n.label}
                  {i === 0 && <span className="mx-auto mt-2 block h-px w-6 bg-gold" />}
                </a>
              ))}
            </nav>
          </div>
        </header>

        {/* Hero content */}
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
                href="https://wa.me/541136855346"
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-3 bg-[var(--gradient-gold)] px-7 py-4 text-[11px] font-medium uppercase tracking-[0.22em] text-primary-foreground shadow-[var(--shadow-gold)] transition-transform hover:-translate-y-0.5"
              >
                <MessageCircle className="h-4 w-4" />
                Coordinar cita por WhatsApp
              </a>
              <a
                href="#stock"
                className="inline-flex items-center gap-3 border border-gold/60 px-7 py-4 text-[11px] font-medium uppercase tracking-[0.22em] text-gold transition-colors hover:bg-gold/10"
              >
                Ver unidades
              </a>
            </div>

            <a href="#stock" className="group mt-16 inline-flex items-center gap-4">
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

      {/* STOCK */}
      <section id="stock" className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="eyebrow">Unidades destacadas</p>
            <h2 className="mt-4 font-display text-4xl sm:text-5xl lg:text-6xl">Seleccionadas para vos.</h2>
          </div>
          <a href="#stock" className="hidden items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-gold hover:gap-3 transition-all md:inline-flex">
            Ver todo el stock <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {CARS.map((c) => (
            <article key={c.name} className="group bg-surface border border-border/60 overflow-hidden transition-colors hover:border-gold/60">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={c.img}
                  alt={c.name}
                  loading="lazy"
                  width={1024}
                  height={1024}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute bottom-4 left-4 bg-background/80 px-3 py-1 text-[10px] tracking-[0.2em] text-gold">
                  {c.year}
                </span>
              </div>
              <div className="p-6">
                <h3 className="font-display text-2xl">{c.name}</h3>
                <p className="mt-2 text-xs tracking-wider text-muted-foreground">{c.specs}</p>
                <div className="mt-6 flex items-center justify-between border-t border-border/60 pt-5">
                  <span className="text-[11px] uppercase tracking-[0.22em] text-foreground/80">Ver detalles</span>
                  <ArrowUpRight className="h-4 w-4 text-gold transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>
              </div>
            </article>
          ))}
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

            <div className="grid grid-cols-2 gap-10 lg:grid-cols-4">
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
                    <p className="mt-1 text-sm text-foreground">11 3685-5346</p>
                  </div>
                </li>
                <li className="flex items-start gap-4" id="ubicacion">
                  <span className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gold/60 text-gold">
                    <MapPin className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.22em] text-gold">Showroom</p>
                    <p className="mt-1 text-sm text-foreground">Mariano Castex 1987 — Edificio Vista Golf (1er subsuelo)</p>
                  </div>
                </li>
                <li className="flex items-start gap-4" id="servicios">
                  <span className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gold/60 text-gold">
                    <CalendarClock className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.22em] text-gold">Atención</p>
                    <p className="mt-1 text-sm text-foreground">Visitas con cita previa, de lunes a sábado.</p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="relative min-h-[360px] lg:min-h-full">
              <img
                src={showroom}
                alt="Showroom Sanfilippo Exclusivos"
                loading="lazy"
                width={1024}
                height={1024}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-background/60 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border/60">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-10 lg:grid-cols-3 lg:items-center lg:px-10">
          <div className="flex items-center gap-3 justify-center lg:justify-start">
            <img src={logo} alt="Sanfilippo Exclusivos" className="h-12 w-12 rounded-full object-cover" />
          </div>
          <div className="text-center">
            <p className="text-xs text-muted-foreground">Vehículos exclusivos. Atención personalizada.</p>
            <div className="mt-4 flex items-center justify-center gap-3">
              {[Instagram, Facebook, MessageCircle].map((Ic, i) => (
                <a key={i} href="#" className="flex h-9 w-9 items-center justify-center rounded-full border border-gold/50 text-gold transition-colors hover:bg-gold/10">
                  <Ic className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
          <div className="text-center text-xs text-muted-foreground lg:text-right">
            © 2026 Sanfilippo Exclusivos<br />Todos los derechos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
}
